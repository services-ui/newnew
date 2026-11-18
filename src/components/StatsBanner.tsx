"use client";

import { useRef } from "react";
import { gsap, ScrollTrigger, MQ, useGSAP } from "@/lib/gsap";

interface StatItemProps {
  endValue: number;
  suffix?: string;
  title: string;
  subtitle: string;
  isAccent?: boolean;
}

const STATS: StatItemProps[] = [
  { endValue: 14, suffix: "+", title: "Years", subtitle: "Proven Expertise" },
  { endValue: 200, suffix: "+ Cr", title: "AUM", subtitle: "Assets Managed" },
  { endValue: 400, suffix: "+", title: "Families", subtitle: "Trusted Partners" },
  { endValue: 98, suffix: "%", title: "Success", subtitle: "Claim Settlement", isAccent: true },
];

/**
 * The ledger plate that overlaps the hero. Numbers are real text in the HTML (final values,
 * no-JS safe); with JS they count up once when the plate enters view. Tabular figures so the
 * digits never jitter while counting.
 */
export default function StatsBanner() {
  const rootRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const nums = gsap.utils.toArray<HTMLElement>("[data-count]", rootRef.current);
      const mm = gsap.matchMedia();

      mm.add(MQ.motionOk, () => {
        nums.forEach((el) => {
          const end = Number(el.dataset.count);
          const out = el.querySelector<HTMLElement>("[data-count-n]");
          if (!out) return;
          const o = { v: 0 };
          out.textContent = "0";
          el.setAttribute("data-counted", "");
          ScrollTrigger.create({
            trigger: rootRef.current,
            start: "top 92%",
            once: true,
            onEnter: () =>
              gsap.to(o, {
                v: end,
                duration: 1.9,
                ease: "power3.out",
                onUpdate: () => {
                  out.textContent = String(Math.round(o.v));
                },
                onComplete: () => {
                  out.textContent = String(end);
                },
              }),
          });
        });
      });
      mm.add(MQ.reduce, () => {
        nums.forEach((el) => el.setAttribute("data-counted", ""));
      });

      return () => mm.revert();
    },
    { scope: rootRef },
  );

  return (
    <div ref={rootRef} className="relative z-20 -mt-[var(--hero-lap,7rem)] pb-2">
      <div className="wrap">
        <ul
          className="grid grid-cols-2 rounded-[var(--r-l)] bg-white shadow-[var(--shadow-card)] md:grid-cols-4"
          data-rv="up"
        >
          {STATS.map((s, i) => (
            <li
              key={s.title}
              className={`px-5 py-6 sm:px-8 sm:py-7 ${i % 2 === 1 ? "border-l border-hair" : ""} ${
                i >= 2 ? "border-t border-hair md:border-t-0" : ""
              } ${i > 0 ? "md:border-l md:border-hair" : "md:border-l-0"}`}
            >
              <span
                data-count={s.endValue}
                className={`tnum flex items-baseline text-[clamp(1.9rem,3vw,2.6rem)] font-semibold leading-none tracking-[-0.035em] ${
                  s.isAccent ? "grad" : "text-ink"
                }`}
              >
                <span data-count-n>{s.endValue}</span>
                <span className="ml-0.5 text-[0.55em] tracking-[-0.03em]">{s.suffix}</span>
              </span>
              <p className="mt-3 text-[0.92rem] font-semibold tracking-[-0.01em] text-ink">{s.title}</p>
              <p className="mt-0.5 text-[0.8rem] leading-snug text-ink/50">{s.subtitle}</p>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
