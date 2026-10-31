import type { AmbientStats } from "./hero-ambient";

type Options = {
  el: HTMLElement;
  layers: HTMLElement[];
  stats: AmbientStats;
  reduceMotion: MediaQueryList;
  test: boolean;
};

const TEST_FILLS = [
  "rgba(204, 24, 85, 0.35)", // crimson
  "rgba(35, 136, 204, 0.35)", // blue
  "rgba(240, 150, 180, 0.5)", // rose
];

/**
 * Development-only diagnostics for the hero ambient background, loaded via a
 * dynamic import that is stripped from production builds.
 *
 *   http://localhost:3000/?debug=ambient          live panel
 *   http://localhost:3000/?debug=ambient&test=1   + outlined, saturated layers
 *                                                   with doubled travel
 */
export function attachAmbientDebug({
  el,
  layers,
  stats,
  reduceMotion,
  test,
}: Options) {
  console.info("[HeroAmbient] mounted", { el, layers, test });

  const restore: Array<() => void> = [];
  if (test) {
    layers.forEach((layer, i) => {
      const blob = layer.firstElementChild as HTMLElement | null;
      if (!blob) return;
      const before = {
        background: blob.style.background,
        outline: blob.style.outline,
      };
      blob.style.background = TEST_FILLS[i] ?? TEST_FILLS[0];
      blob.style.outline = "2px dashed rgba(0, 17, 32, 0.7)";
      restore.push(() => {
        blob.style.background = before.background;
        blob.style.outline = before.outline;
      });
    });
  }

  const panel = document.createElement("pre");
  panel.style.cssText =
    "position:fixed;left:8px;bottom:8px;z-index:9999;margin:0;padding:8px 10px;" +
    "font:11px/1.45 ui-monospace,monospace;color:#fff;background:rgba(0,17,32,.9);" +
    "border-radius:8px;pointer-events:none;white-space:pre;max-width:96vw;overflow:hidden";
  document.body.append(panel);

  const mq = (q: string) => window.matchMedia(q).matches;
  const sup = (p: string, v: string) => CSS.supports(p, v);
  const n = (v: number) => Math.round(v);

  const timer = window.setInterval(() => {
    const lines = [
      `HeroAmbient debug${test ? "  [TEST MODE: outlines, 2x travel]" : ""}`,
      `mounted: true   reduced motion: ${reduceMotion.matches}   dark scheme: ${mq("(prefers-color-scheme: dark)")}`,
      `pointer fine/hover: ${mq("(pointer: fine)")}/${mq("(hover: hover)")}   any-pointer fine: ${mq("(any-pointer: fine)")}`,
      `color-mix supported: ${sup("color", "color-mix(in srgb, red 20%, transparent)")}   dpr: ${window.devicePixelRatio}`,
      `pointermove events: ${stats.events} (${stats.pointerType})   x,y: ${stats.x},${stats.y}   inside hero: ${stats.inside}`,
      `normalized nx,ny: ${stats.nx.toFixed(2)}, ${stats.ny.toFixed(2)}   --px,--py: ${el.style.getPropertyValue("--px") || "unset"}, ${el.style.getPropertyValue("--py") || "unset"}`,
    ];
    layers.forEach((layer, i) => {
      const blob = layer.firstElementChild as HTMLElement | null;
      const lr = layer.getBoundingClientRect();
      const cs = blob ? getComputedStyle(blob) : null;
      lines.push(
        `layer ${i} (${layer.className.split(" ")[1]}): left ${n(lr.left)} top ${n(lr.top)} ${n(lr.width)}px | ${layer.style.transform || "no inline transform"} | fill: ${cs ? (cs.backgroundImage !== "none" ? "gradient drawn" : cs.backgroundColor !== "rgba(0, 0, 0, 0)" ? "solid (test)" : "NONE - blob has no background") : "-"} | idle: ${cs?.animationName ?? "-"}`,
      );
    });
    panel.textContent = lines.join("\n");
  }, 100);

  return () => {
    window.clearInterval(timer);
    panel.remove();
    restore.forEach((fn) => fn());
  };
}
