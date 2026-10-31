import { Flowmap, Mesh, Program, Renderer, Triangle, Vec2 } from "ogl";
import { fragment, vertex } from "./shaders";

/**
 * Hero "current": OGL Flowmap + one display shader (see shaders.ts), plus the
 * pointer flow. (The cursor lives in cursor.ts and does not depend on this.)
 * Everything is scoped to the hero and disposed by
 * the returned function. If WebGL2 is unavailable or the context is lost, the
 * static CSS gradient layers underneath simply stay visible.
 */

type Options = { wrap: HTMLElement; host: HTMLElement };

export type CurrentState = {
  webgl: string;
  running: boolean;
  fps: number;
  dpr: number;
  canvas: string;
  time: number;
  pointer: string;
  velocity: string;
  displacement: string;
  inside: boolean;
  reduced: boolean;
  setTest: (v: boolean) => void;
};

const STEP = 1000 / 60; // flowmap decay is per step, so run it on a fixed clock
const MAX_V = 1.6; // px/ms
const DEAD_V = 0.03; // px/ms: ignore pointer jitter below this
const PUSH = 0.055; // hero heights of displacement per px/ms (about 43 px at 1 px/ms before the cap)
const CAP_PX = 40; // soft upper limit on displacement, about half a ribbon half-width
const failed = (wrap: HTMLElement, reason: string) => {
  wrap.dataset.gl = "failed";
  wrap.dataset.glReason = reason;
  console.warn(`[hero-current] WebGL current disabled: ${reason}. Showing the static gradient.`);
};

function token(name: string, fallback: [number, number, number]): [number, number, number] {
  const v = getComputedStyle(document.documentElement).getPropertyValue(name).trim();
  const m = /^#([0-9a-f]{6})$/i.exec(v);
  if (!m) return fallback;
  const n = parseInt(m[1], 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255].map((c) => c / 255) as [number, number, number];
}

export function startCurrent({ wrap, host }: Options) {
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
  const params = new URLSearchParams(window.location.search);
  const dev = process.env.NODE_ENV !== "production";
  const debug = dev && params.get("debug") === "current";
  let test = debug && params.get("test") === "1";
  const boost = debug ? Number(params.get("boost")) || 1 : 1;
  const freeze = debug && params.get("freeze") === "1"; // hold idle time still to isolate the pointer response

  const canvas = document.createElement("canvas");
  canvas.className = "hero-canvas";
  wrap.prepend(canvas);

  let renderer: Renderer;
  let flowmap: Flowmap;
  let mesh: Mesh;
  const rose = token("--brand-rose", [0.976, 0.914, 0.937]);
  const crimson = token("--primary", [0.8, 0.094, 0.333]);
  const blue = token("--brand-blue", [0.137, 0.533, 0.8]);
  const roseTint = rose.map((c, i) => c + (crimson[i] - c) * 0.3);
  const uniforms = {
    tFlow: { value: null as unknown },
    uSize: { value: [1, 1] },
    uTime: { value: 3 },
    uPush: { value: PUSH * boost },
    uCap: { value: 0.04 },
    uTest: { value: test ? 1 : 0 },
    uTextBox: { value: [0, 0, 0, 0] },
    uArtBox: { value: [0, 0, 0, 0] },
    uCrimson: { value: crimson },
    uBlue: { value: blue },
    uRose: { value: roseTint },
  };
  try {
    renderer = new Renderer({
      canvas,
      alpha: true,
      premultipliedAlpha: true,
      antialias: false,
      depth: false,
      webgl: 2,
      dpr: Math.min(window.devicePixelRatio || 1, 1.5),
      powerPreference: "low-power",
    });
    if (!renderer.isWebgl2) throw new Error("WebGL2 is not available");
    const gl = renderer.gl;
    gl.clearColor(0, 0, 0, 0);
    flowmap = new Flowmap(gl, { size: 128, falloff: 0.5, alpha: 0.3, dissipation: 0.967 });
    uniforms.tFlow = flowmap.uniform;
    mesh = new Mesh(gl, {
      geometry: new Triangle(gl),
      program: new Program(gl, { vertex, fragment, uniforms, depthTest: false, transparent: false }),
    });
  } catch (e) {
    canvas.remove();
    failed(wrap, e instanceof Error ? e.message : "initialisation error");
    return () => {};
  }
  const gl = renderer.gl;

  let w = 1;
  let h = 1;
  let dpr = renderer.dpr;
  let running = false;
  let visible = true;
  let frame = 0;
  let last = 0;
  let acc = 0;
  let time = 3;
  let fps = 0;
  let emaDt = 16.7;
  let slow = 0;
  let lost = false;

  // Raw pointer (viewport px) comes from events. A smoothed copy drives the
  // flow velocity (no jitter).
  const ptr = { x: 0, y: 0, type: "mouse", seen: false, inside: false };
  let sx = 0;
  let sy = 0;
  let havePrev = false;
  const targetV = new Vec2();

  const art = () => host.querySelector<HTMLElement>("[data-hero-art]");
  const textCol = () => host.querySelector("h1")?.parentElement ?? null;

  const measure = () => {
    const hr = host.getBoundingClientRect();
    const box = (el: Element | null) => {
      if (!el) return [0, 0, 0, 0];
      const r = el.getBoundingClientRect();
      return [r.left - hr.left + r.width / 2, hr.height - (r.top - hr.top + r.height / 2), r.width / 2, r.height / 2];
    };
    uniforms.uTextBox.value = box(textCol());
    uniforms.uArtBox.value = box(art());
  };

  const resize = () => {
    const r = host.getBoundingClientRect();
    w = Math.max(1, Math.round(r.width));
    h = Math.max(1, Math.round(r.height));
    renderer.setSize(w, h);
    uniforms.uSize.value = [w, h];
    uniforms.uCap.value = CAP_PX / h;
    flowmap.aspect = w / h;
    measure();
    if (!running) draw();
  };

  const draw = () => {
    renderer.render({ scene: mesh });
  };

  const tick = (now: number) => {
    frame = 0;
    if (!running || lost) return;
    const dt = Math.min(now - (last || now - STEP), 64);
    last = now;
    if (!freeze) time += dt / 1000;
    uniforms.uTime.value = time;

    // Adaptive quality: drop pixel density if frames stay slow.
    emaDt += (dt - emaDt) * 0.05;
    fps = Math.round(1000 / emaDt);
    slow = emaDt > 26 ? slow + 1 : 0;
    if (slow > 90 && dpr > 0.75) {
      dpr = dpr > 1 ? 1 : 0.75;
      renderer.dpr = dpr;
      renderer.setSize(w, h);
      slow = 0;
    }

    const hr = host.getBoundingClientRect();
    const usable = ptr.seen && ptr.type !== "touch" && !reduce.matches;
    const inside =
      usable && ptr.x >= hr.left && ptr.x <= hr.right && ptr.y >= hr.top && ptr.y <= hr.bottom;
    ptr.inside = inside;

    let speed = 0;
    let moving = false;
    if (inside) {
      if (!havePrev) {
        sx = ptr.x;
        sy = ptr.y;
        havePrev = true;
      }
      // Velocity from a smoothed position: frame-rate independent, no jitter.
      const k = 1 - Math.exp(-dt / 38);
      const px = sx;
      const py = sy;
      sx += (ptr.x - sx) * k;
      sy += (ptr.y - sy) * k;
      const dts = Math.max(dt, 4);
      let vx = (sx - px) / dts;
      let vy = (sy - py) / dts;
      speed = Math.hypot(vx, vy);
      if (speed > MAX_V) {
        vx *= MAX_V / speed;
        vy *= MAX_V / speed;
        speed = MAX_V;
      }
      moving = speed > DEAD_V;
      if (moving) {
        targetV.set(vx, vy);
      } else {
        targetV.set(0, 0);
      }
      // No stamp while still, so a resting pointer does not erase existing flow.
      if (moving) flowmap.mouse.set((sx - hr.left) / hr.width, 1 - (sy - hr.top) / hr.height);
      else flowmap.mouse.set(-1, -1);
    } else {
      havePrev = false;
      targetV.set(0, 0);
      flowmap.mouse.set(-1, -1);
    }

    acc += dt;
    for (let i = 0; acc >= STEP && i < 3; i++, acc -= STEP) {
      flowmap.velocity.lerp(targetV, moving ? 0.35 : 0.15);
      flowmap.update();
    }
    if (acc > STEP * 3) acc = 0;

    draw();
    if (wrap.dataset.gl !== "on") wrap.dataset.gl = "on";

    frame = requestAnimationFrame(tick);
  };

  const start = () => {
    if (running || lost || !visible || reduce.matches) return;
    running = true;
    last = 0;
    frame = requestAnimationFrame(tick);
  };
  const stop = () => {
    running = false;
    cancelAnimationFrame(frame);
    frame = 0;
  };
  /** Reduced motion: one calm static frame, no loop. */
  const settle = () => {
    stop();
    uniforms.uTime.value = 3;
    draw();
    wrap.dataset.gl = "on";
  };
  const sync = () => (reduce.matches ? settle() : start());

  const onMove = (e: PointerEvent) => {
    ptr.type = e.pointerType;
    ptr.seen = e.pointerType !== "touch";
    ptr.x = e.clientX;
    ptr.y = e.clientY;
  };
  const onLeave = () => {
    ptr.seen = false;
  };
  const onLost = (e: Event) => {
    e.preventDefault();
    lost = true;
    stop();
    failed(wrap, "WebGL context lost");
  };
  const onRestored = () => {
    lost = false;
    delete wrap.dataset.glReason;
    resize();
    sync();
  };

  window.addEventListener("pointermove", onMove, { passive: true });
  window.addEventListener("pointerdown", onMove, { passive: true });
  window.addEventListener("blur", onLeave);
  document.documentElement.addEventListener("pointerleave", onLeave);
  canvas.addEventListener("webglcontextlost", onLost);
  canvas.addEventListener("webglcontextrestored", onRestored);
  reduce.addEventListener("change", sync);

  const ro = new ResizeObserver(resize);
  ro.observe(host);
  const io = new IntersectionObserver(
    ([e]) => {
      visible = e.isIntersecting;
      if (visible) sync();
      else stop();
    },
    { rootMargin: "80px" },
  );
  io.observe(host);

  resize();
  sync();
  if (reduce.matches) settle();
  // Layout settles after fonts load; refresh the protected boxes then.
  void document.fonts?.ready.then(() => {
    measure();
    if (!running) draw();
  });

  let disposeDebug = () => {};
  let cancelled = false;
  if (dev && debug) {
    const state: CurrentState = {
      get webgl() { return `WebGL${renderer.isWebgl2 ? 2 : 1}${lost ? " (context lost)" : ""}`; },
      get running() { return running; },
      get fps() { return fps; },
      get dpr() { return dpr; },
      get canvas() { return `${canvas.width}x${canvas.height}`; },
      get time() { return time; },
      get pointer() { return `${Math.round(ptr.x)},${Math.round(ptr.y)} (${ptr.type})`; },
      get velocity() { return `${flowmap.velocity.x.toFixed(2)},${flowmap.velocity.y.toFixed(2)} px/ms`; },
      get displacement() {
        const m = Math.hypot(flowmap.velocity.x, flowmap.velocity.y) * PUSH * boost * h;
        return `${(CAP_PX * (1 - Math.exp(-m / CAP_PX))).toFixed(1)} px (cap ${CAP_PX})`;
      },
      get inside() { return ptr.inside; },
      get reduced() { return reduce.matches; },
      setTest: (v: boolean) => {
        test = v;
        uniforms.uTest.value = v ? 1 : 0;
        if (!running) draw();
      },
    };
    void import("./debug").then((m) => {
      if (!cancelled) disposeDebug = m.attachCurrentDebug(state, test, { text: () => uniforms.uTextBox.value, art: () => uniforms.uArtBox.value }, freeze);
    });
  }

  return () => {
    cancelled = true;
    disposeDebug();
    stop();
    io.disconnect();
    ro.disconnect();
    window.removeEventListener("pointermove", onMove);
    window.removeEventListener("pointerdown", onMove);
    window.removeEventListener("blur", onLeave);
    document.documentElement.removeEventListener("pointerleave", onLeave);
    canvas.removeEventListener("webglcontextlost", onLost);
    canvas.removeEventListener("webglcontextrestored", onRestored);
    reduce.removeEventListener("change", sync);
    delete wrap.dataset.gl;
    delete wrap.dataset.glReason;
    gl.getExtension("WEBGL_lose_context")?.loseContext(); // release GPU memory
    canvas.remove();
  };
}
