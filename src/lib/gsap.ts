"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { useGSAP } from "@gsap/react";

// Register once, at module level (never inside a component that re-renders).
gsap.registerPlugin(ScrollTrigger, ScrollToPlugin, useGSAP);

// One easing family across the whole site (matches the CSS tokens in globals.css).
gsap.defaults({ ease: "expo.out", duration: 0.9 });

/** Media queries for gsap.matchMedia — every scene branches on these. */
export const MQ = {
  /** Pinned, scrubbed scenes only where there is room and the user hasn't asked for less motion. */
  scene: "(min-width: 1024px) and (prefers-reduced-motion: no-preference)",
  /** Anything that moves at all. */
  motionOk: "(prefers-reduced-motion: no-preference)",
  reduce: "(prefers-reduced-motion: reduce)",
  fine: "(hover: hover) and (pointer: fine)",
} as const;

/** Recalculate trigger positions once fonts and layout have settled. */
export function refreshWhenReady() {
  const run = () => ScrollTrigger.refresh();
  if (typeof document !== "undefined" && document.fonts?.ready) {
    document.fonts.ready.then(() => requestAnimationFrame(run));
  }
}

export { gsap, ScrollTrigger, ScrollToPlugin, useGSAP };
