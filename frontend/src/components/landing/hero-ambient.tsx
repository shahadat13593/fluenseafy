"use client";

import { useEffect, useRef } from "react";

/**
 * Hero background. Server markup is the static gradient (three CSS layers,
 * globals.css), which is also the fallback if WebGL2 is unavailable or the
 * context is lost. After mount, a WebGL "current" (lib/hero-current) fades in
 * over it. (The custom cursor is global; see components/layout/cursor.tsx.)
 */
export function HeroAmbient() {
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    const host = wrap?.parentElement;
    if (!wrap || !host) return;

    let cancelled = false;
    let dispose = () => {};
    // Loaded after first paint so OGL stays out of the initial bundle.
    void import("@/lib/hero-current/current")
      .then((m) => {
        if (!cancelled) dispose = m.startCurrent({ wrap, host });
      })
      .catch((e) => {
        // e.g. a stale tab asking for a chunk from an older build
        wrap.dataset.gl = "failed";
        wrap.dataset.glReason = "chunk failed to load";
        console.warn("[hero-current] could not load the WebGL chunk; showing the static gradient.", e);
      });
    return () => {
      cancelled = true;
      dispose();
    };
  }, []);

  return (
    <div ref={wrapRef} className="hero-ambient" aria-hidden="true">
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
