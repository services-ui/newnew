"use client";

import { useSyncExternalStore } from "react";

/**
 * Browser state read the React-19 way: through useSyncExternalStore, not setState-in-effect.
 * Each hook takes the value to use on the server / first hydration render.
 */

const noop = () => () => {};

/** false on the server and during hydration, true afterwards — for things that must only render client-side. */
export function useHydrated(): boolean {
  return useSyncExternalStore(
    noop,
    () => true,
    () => false,
  );
}

/** Live `matchMedia(query).matches`. */
export function useMedia(query: string, serverValue = false): boolean {
  return useSyncExternalStore(
    (onChange) => {
      const mql = window.matchMedia(query);
      mql.addEventListener("change", onChange);
      return () => mql.removeEventListener("change", onChange);
    },
    () => window.matchMedia(query).matches,
    () => serverValue,
  );
}

function subscribeResize(onChange: () => void) {
  window.addEventListener("resize", onChange);
  return () => window.removeEventListener("resize", onChange);
}

/** Viewport size as two primitives (stable snapshots, so no extra renders). */
export function useViewport(serverWidth = 1440, serverHeight = 900): { width: number; height: number } {
  const width = useSyncExternalStore(subscribeResize, () => window.innerWidth, () => serverWidth);
  const height = useSyncExternalStore(subscribeResize, () => window.innerHeight, () => serverHeight);
  return { width, height };
}
