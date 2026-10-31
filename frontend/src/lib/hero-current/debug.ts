import type { CurrentState } from "./current";

/**
 * Development-only diagnostics (dynamic import, stripped from production).
 *   /?debug=current            live panel
 *   /?debug=current&test=1     flowmap visualisation + protected-box outlines
 *   /?debug=current&boost=2    scale the pointer's displacement
 *   /?debug=current&freeze=1   hold the idle motion still to isolate the pointer response
 */
export function attachCurrentDebug(
  s: CurrentState,
  test: boolean,
  boxes: { text: () => number[]; art: () => number[] },
  freeze = false,
) {
  const panel = document.createElement("pre");
  panel.setAttribute("data-current-debug", "");
  panel.style.cssText =
    "position:fixed;left:8px;bottom:8px;z-index:9999;margin:0;padding:8px 10px;" +
    "font:11px/1.45 ui-monospace,monospace;color:#fff;background:rgba(0,17,32,.92);" +
    "border-radius:8px;pointer-events:none;white-space:pre;max-width:96vw;overflow:hidden";
  document.body.append(panel);
  if (test) s.setTest(true);

  const r = (a: number[]) => a.map((n) => Math.round(n)).join(",");
  const timer = window.setInterval(() => {
    panel.textContent = [
      `Hero current debug${test ? "  [TEST: flowmap + boxes]" : ""}${freeze ? "  [FROZEN idle time]" : ""}`,
      `${s.webgl}   loop ${s.running ? "RUNNING" : "stopped"}   ~${s.fps || "-"} fps   dpr ${s.dpr}   canvas ${s.canvas}`,
      `reduced motion: ${s.reduced}   time ${s.time.toFixed(1)}s`,
      `pointer ${s.pointer}   inside hero: ${s.inside}   flow velocity ${s.velocity}`,
      `displacement now ${s.displacement}`,
      `text box (cx,cy,hw,hh) ${r(boxes.text())}   art box ${r(boxes.art())}`,
      `native cursor hidden: ${document.documentElement.classList.contains("custom-cursor")}`,
    ].join("\n");
  }, 100);

  return () => {
    window.clearInterval(timer);
    panel.remove();
  };
}
