"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * One IntersectionObserver for every [data-rv] element on the page.
 * Marks them data-in once, when they scroll into view; CSS does the motion
 * (compositor-only transform/opacity/clip-path). Re-scans on route change and
 * when client components mount new elements.
 */
export default function RevealObserver() {
  const pathname = usePathname();

  useEffect(() => {
    const root = document.documentElement;
    root.setAttribute("data-rv-ready", "");
    root.classList.remove("rv-off");

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) continue;
          entry.target.setAttribute("data-in", "");
          io.unobserve(entry.target);
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0 },
    );

    const scan = () => {
      document.querySelectorAll("[data-rv]:not([data-in])").forEach((el) => io.observe(el));
    };
    scan();

    let frame = 0;
    const mo = new MutationObserver((records) => {
      const added = records.some((r) => Array.from(r.addedNodes).some((n) => n.nodeType === 1));
      if (!added || frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        scan();
      });
    });
    mo.observe(document.body, { childList: true, subtree: true });

    return () => {
      io.disconnect();
      mo.disconnect();
      if (frame) cancelAnimationFrame(frame);
    };
  }, [pathname]);

  return null;
}
