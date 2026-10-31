/**
 * Global "fluid precision" cursor: an exact white dot plus a thin ring that
 * trails slightly and stretches with speed. One instance serves the whole app
 * (mounted once from the root layout, see components/layout/cursor.tsx).
 *
 * It does not depend on WebGL or on any frame loop for visibility: the dot is
 * positioned and shown straight from the pointer event. The native cursor is
 * hidden (`html.custom-cursor`) only after the dot has been placed, is kept
 * over links/buttons/inputs, and returns on leave, blur or touch. The ring's
 * animation loop runs only while the ring is still catching up.
 */
const CONTROLS =
  "a, button, input, select, textarea, summary, label, [role='button'], [contenteditable='true']";

let dispose: (() => void) | null = null;

export function startCursor(root: HTMLElement) {
  dispose?.(); // guarantee a single instance, even if mounted twice
  const dot = root.querySelector<HTMLElement>(".cursor-dot")!;
  const ring = root.querySelector<HTMLElement>(".cursor-ring")!;
  const html = document.documentElement;
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");

  let x = 0;
  let y = 0;
  let rx = 0;
  let ry = 0;
  let px = 0;
  let py = 0;
  let angle = 0;
  let stretch = 0;
  let shown = false;
  let frame = 0;
  let last = 0;

  const syncReduced = () => {
    if (reduce.matches) root.dataset.reduced = "true";
    else delete root.dataset.reduced;
  };
  syncReduced();

  const place = () => {
    dot.style.transform = `translate3d(${x.toFixed(1)}px, ${y.toFixed(1)}px, 0) rotate(${angle.toFixed(3)}rad) scale(${(1 + stretch * 0.5).toFixed(3)}, ${(1 - stretch * 0.25).toFixed(3)})`;
    ring.style.transform = `translate3d(${rx.toFixed(1)}px, ${ry.toFixed(1)}px, 0) rotate(${angle.toFixed(3)}rad) scale(${(1 + stretch).toFixed(3)}, ${(1 - stretch * 0.4).toFixed(3)})`;
  };

  const show = (on: boolean) => {
    if (on === shown) return;
    shown = on;
    root.dataset.on = on ? "true" : "false";
    if (on) {
      rx = px = x;
      ry = py = y;
      last = 0;
      place(); // positioned first, then the native cursor is hidden
    }
    html.classList.toggle("custom-cursor", on);
  };

  // Ring follow + stretch: runs only while there is something left to animate.
  const tick = (now: number) => {
    frame = 0;
    if (!shown) return;
    const dt = Math.min(now - (last || now - 16.7), 64);
    last = now;
    let settled = true;
    if (reduce.matches) {
      rx = x;
      ry = y;
      stretch = 0;
    } else {
      const kr = 1 - Math.exp(-dt / 48);
      rx += (x - rx) * kr;
      ry += (y - ry) * kr;
      const vx = (x - px) / Math.max(dt, 4);
      const vy = (y - py) / Math.max(dt, 4);
      px = x;
      py = y;
      const speed = Math.hypot(vx, vy);
      if (speed > 0.05) angle = Math.atan2(vy, vx);
      stretch += (Math.min(speed / 1.6, 1) * 0.28 - stretch) * (1 - Math.exp(-dt / 110));
      settled = Math.abs(x - rx) + Math.abs(y - ry) < 0.2 && stretch < 0.004;
    }
    place();
    if (!settled) schedule();
  };
  const schedule = () => {
    if (!frame) frame = requestAnimationFrame(tick);
  };

  const setTone = (target: Element) => {
    const tone = target.closest("[data-cursor-tone]")?.getAttribute("data-cursor-tone") ?? "light";
    if (root.dataset.tone !== tone) root.dataset.tone = tone;
  };

  const onMove = (e: PointerEvent) => {
    if (e.pointerType === "touch") {
      show(false);
      return;
    }
    x = e.clientX;
    y = e.clientY;
    const target = e.target as Element | null;
    if (!target || target.closest?.(CONTROLS)) {
      show(false);
      return;
    }
    setTone(target);
    if (!shown) show(true);
    place();
    schedule();
  };
  const hide = () => show(false);
  const onDown = () => (root.dataset.down = "true");
  const onUp = () => (root.dataset.down = "false");

  window.addEventListener("pointermove", onMove, { passive: true });
  window.addEventListener("pointerdown", onMove, { passive: true });
  window.addEventListener("pointerdown", onDown, { passive: true });
  window.addEventListener("pointerup", onUp, { passive: true });
  window.addEventListener("pointercancel", onUp, { passive: true });
  window.addEventListener("blur", hide);
  document.documentElement.addEventListener("pointerleave", hide);
  reduce.addEventListener("change", syncReduced);

  const stop = () => {
    cancelAnimationFrame(frame);
    show(false);
    window.removeEventListener("pointermove", onMove);
    window.removeEventListener("pointerdown", onMove);
    window.removeEventListener("pointerdown", onDown);
    window.removeEventListener("pointerup", onUp);
    window.removeEventListener("pointercancel", onUp);
    window.removeEventListener("blur", hide);
    document.documentElement.removeEventListener("pointerleave", hide);
    reduce.removeEventListener("change", syncReduced);
    if (dispose === stop) dispose = null;
  };
  dispose = stop;
  return stop;
}
