"use client";

import { useEffect, useRef } from "react";
import { startCursor } from "@/lib/cursor/cursor";

/**
 * Mounts the site-wide custom cursor once, from the root layout. Server markup
 * is inert and hidden; all movement is imperative (no React state), so pointer
 * movement never re-renders anything.
 */
export function GlobalCursor() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = ref.current;
    if (!root) return;
    return startCursor(root);
  }, []);

  return (
    <div ref={ref} className="cursor-root" data-on="false" aria-hidden="true">
      <div className="cursor-ring" />
      <div className="cursor-dot" />
    </div>
  );
}
