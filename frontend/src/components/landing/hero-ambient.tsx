"use client";

import { useEffect, useRef } from "react";

const TAU = 200; // ms: smoothing time constant (roughly 0.6s to settle)

// Pointer-driven travel in px at the hero's edges, one entry per layer in DOM
// order (crimson, blue, rose). Larger values read as "closer" (more parallax).
const DEPTH = [
  { x: 150, y: 80 },
  { x: 190, y: 100 },
  { x: 100, y: 60 },
];

export type AmbientStats = {
  events: number;
  pointerType: string;
  x: number;
  y: number;
  nx: number;
  ny: number;
  inside: boolean;
};

const clamp = (v: number) => Math.max(-1, Math.min(1, v));

/**
 * Decorative hero background. Static styles live in globals.css
 * (.hero-ambient); this component only moves the three layers.
 *
 * Responsibilities are split so nothing can cancel anything else:
 *  - outer `.ambient-layer`: pointer-driven position, written here as an
 *    inline `translate3d` (no CSS variable chain involved);
 *  - inner `.ambient-blob`: slow idle drift, a CSS animation.
 *
 * Pointer position is eased towards its target in a rAF loop; React never
 * re-renders, and the loop stops as soon as the position has settled.
 * The listener is on `window` with a bounds check, input is filtered by
 * `pointerType` ("touch" is ignored) rather than media queries, and
 * prefers-reduced-motion is respected.
 *
 * Development only: add ?debug=ambient for a live diagnostics panel,
 * &test=1 for outlined, saturated layers with doubled travel, and
 * &boost=N to scale pointer travel while keeping the real gradients.
 */
export function HeroAmbient() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    const host = el?.parentElement;
    if (!el || !host) return;

    const layers = Array.from(el.querySelectorAll<HTMLElement>(".ambient-layer"));
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const stats: AmbientStats = {
      events: 0,
      pointerType: "-",
      x: 0,
      y: 0,
      nx: 0,
      ny: 0,
      inside: false,
    };

    const params = new URLSearchParams(window.location.search);
    const dev = process.env.NODE_ENV !== "production";
    const debug = dev && params.get("debug") === "ambient";
    const test = debug && params.get("test") === "1";
    // Dev only: &boost=N scales pointer travel; test mode defaults it to 2.
    const boost = debug ? Number(params.get("boost")) || (test ? 2 : 1) : 1;

    let targetX = 0;
    let targetY = 0;
    let x = 0;
    let y = 0;
    let frame = 0;
    let last = 0;

    const apply = () => {
      el.style.setProperty("--px", x.toFixed(4)); // exposed for debugging
      el.style.setProperty("--py", y.toFixed(4));
      layers.forEach((layer, i) => {
        const d = DEPTH[i] ?? DEPTH[0];
        layer.style.transform = `translate3d(${(x * d.x * boost).toFixed(2)}px, ${(y * d.y * boost).toFixed(2)}px, 0)`;
      });
    };
    const tick = (now: number) => {
      const dt = Math.min(now - (last || now), 64);
      last = now;
      const k = 1 - Math.exp(-dt / TAU);
      x += (targetX - x) * k;
      y += (targetY - y) * k;
      apply();
      if (Math.abs(targetX - x) < 0.001 && Math.abs(targetY - y) < 0.001) {
        frame = 0;
        last = 0;
      } else {
        frame = requestAnimationFrame(tick);
      }
    };
    const aim = (nx: number, ny: number) => {
      targetX = nx;
      targetY = ny;
      if (!frame) frame = requestAnimationFrame(tick);
    };

    const onMove = (e: PointerEvent) => {
      stats.events++;
      stats.pointerType = e.pointerType;
      stats.x = Math.round(e.clientX);
      stats.y = Math.round(e.clientY);
      if (e.pointerType === "touch" || reduceMotion.matches) return;

      const r = host.getBoundingClientRect();
      stats.inside =
        e.clientX >= r.left &&
        e.clientX <= r.right &&
        e.clientY >= r.top &&
        e.clientY <= r.bottom;
      if (!stats.inside) {
        if (targetX || targetY) aim(0, 0);
        return;
      }
      stats.nx = clamp(((e.clientX - r.left) / r.width - 0.5) * 2);
      stats.ny = clamp(((e.clientY - r.top) / r.height - 0.5) * 2);
      aim(stats.nx, stats.ny);
    };
    const reset = () => aim(0, 0);

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("blur", reset);
    document.documentElement.addEventListener("pointerleave", reset);

    // Dev-only; `cancelled` guards against React Strict Mode's double effect.
    let disposeDebug = () => {};
    let cancelled = false;
    if (debug) {
      void import("./hero-ambient-debug").then((m) => {
        if (!cancelled) {
          disposeDebug = m.attachAmbientDebug({
            el,
            layers,
            stats,
            reduceMotion,
            test,
          });
        }
      });
    }

    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("blur", reset);
      document.documentElement.removeEventListener("pointerleave", reset);
      cancelAnimationFrame(frame);
      cancelled = true;
      disposeDebug();
    };
  }, []);

  return (
    <div ref={ref} className="hero-ambient" aria-hidden="true">
      <div className="ambient-layer ambient-crimson">
        <div className="ambient-blob" />
      </div>
      <div className="ambient-layer ambient-blue">
        <div className="ambient-blob" />
      </div>
      <div className="ambient-layer ambient-rose">
        <div className="ambient-blob" />
      </div>
    </div>
  );
}
