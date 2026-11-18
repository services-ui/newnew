"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Target, Fingerprint, Layers, Scale, TrendingUp, Users, Handshake } from "lucide-react";
import RevealText from "@/components/ui/RevealText";

const ITEMS = [
  {
    id: 1,
    icon: Target,
    title: "We Start With Your Life, Not Your Investments",
    description: "We take the time to understand your goals, aspirations, responsibilities, and concerns before recommending any financial solution.",
  },
  {
    id: 2,
    icon: Fingerprint,
    title: "Personalized, Not Trend-Driven",
    description: "We don't follow market trends or popular products. Every recommendation is tailored to your unique financial situation and long-term objectives.",
  },
  {
    id: 3,
    icon: Layers,
    title: "Comprehensive Financial Planning",
    description: "From investments and insurance to retirement and estate planning, we bring every aspect of your financial life under one roof.",
  },
  {
    id: 4,
    icon: Scale,
    title: "Unbiased Recommendations",
    description: "Our advice is driven by what is right for you—not by market noise, product popularity, or short-term trends.",
  },
  {
    id: 5,
    icon: TrendingUp,
    title: "Ongoing Guidance & Reviews",
    description: "Financial planning is not a one-time activity. We regularly review your portfolio and help you stay aligned with your goals.",
  },
  {
    id: 6,
    icon: Users,
    title: "Building Multi-Generational Financial Well-being",
    description: "We involve and educate family members and the next generation to create lasting financial awareness and continuity.",
  },
  {
    id: 7,
    icon: Handshake,
    title: "A Long-Term Partnership",
    description: "We measure success not by transactions, but by the achievement of your life goals and financial peace of mind.",
  },
];

/**
 * Why Us — seven principles, all readable at once: icon · title · explanation on one ruled row.
 * The heading stays beside them with a quiet counter that follows the row you are reading
 * (a scroll-spy; nothing is pinned, timed or auto-advanced).
 */
export default function WhyUsOrbital() {
  // `target` is where the reading position says we are (computed from scroll, so it is never missed);
  // `active` is what is shown and steps toward it one row at a time, so a fast flick can't skip 02.
  const [active, setActive] = useState(0);
  const [target, setTarget] = useState(0);
  const listRef = useRef<HTMLOListElement>(null);

  useEffect(() => {
    const list = listRef.current;
    if (!list) return;
    let raf = 0;
    const measure = () => {
      raf = 0;
      const rows = Array.from(list.children) as HTMLElement[];
      const focus = window.innerHeight * 0.45; // the line we "read" along
      let best = 0;
      let bestDist = Infinity;
      rows.forEach((row, i) => {
        const r = row.getBoundingClientRect();
        // distance from the focus line to the row (0 when the line is inside it)
        const d = focus < r.top ? r.top - focus : focus > r.bottom ? focus - r.bottom : 0;
        if (d < bestDist) {
          bestDist = d;
          best = i;
        }
      });
      setTarget((prev) => (prev === best ? prev : best));
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(measure);
    };
    measure();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  // walk toward the target one step at a time (every number is shown, in order)
  useEffect(() => {
    if (active === target) return;
    const t = window.setTimeout(() => setActive((a) => a + Math.sign(target - a)), 130);
    return () => window.clearTimeout(t);
  }, [active, target]);

  return (
    <section className="sec bg-paper" aria-labelledby="why-title">
      <div className="wrap grid items-start gap-12 lg:grid-cols-12 lg:gap-16">
        {/* heading on top, the progress ring centred in the rest of the column; it stays put while you read */}
        <div className="lg:sticky lg:top-24 lg:col-span-4 lg:flex lg:h-[calc(100svh-8rem)] lg:min-h-[30rem] lg:flex-col">
          <RevealText as="h2" id="why-title" className="t-h1" parts={["Why Us?"]} />

          <div aria-hidden className="hidden flex-1 flex-col items-center justify-center gap-7 lg:flex">
            <div className="relative h-[15rem] w-[15rem] shrink-0 xl:h-[16.5rem] xl:w-[16.5rem]">
              {/* a soft light behind the ring so it never reads as an empty outline */}
              <div
                className="absolute inset-[-12%] rounded-full"
                style={{ background: "radial-gradient(closest-side, rgb(0 102 255 / 0.14), transparent)" }}
              />
              <svg viewBox="0 0 100 100" className="absolute inset-0 h-full w-full -rotate-90">
                <circle cx="50" cy="50" r="46" fill="none" stroke="var(--hair-strong)" strokeWidth="0.6" />
                <circle cx="50" cy="50" r="38" fill="none" stroke="var(--hair)" strokeWidth="0.4" strokeDasharray="0.8 2.2" />
                <circle
                  cx="50"
                  cy="50"
                  r="46"
                  fill="none"
                  stroke="var(--fin)"
                  strokeWidth="1.3"
                  strokeLinecap="round"
                  pathLength={1}
                  strokeDasharray={1}
                  strokeDashoffset={1 - (active + 1) / ITEMS.length}
                  style={{ transition: "stroke-dashoffset 700ms cubic-bezier(0.23, 1, 0.32, 1)" }}
                />
                {ITEMS.map((_, i) => {
                  const a = (i / ITEMS.length) * Math.PI * 2;
                  return (
                    <circle
                      key={i}
                      cx={50 + 46 * Math.cos(a)}
                      cy={50 + 46 * Math.sin(a)}
                      r="1.5"
                      fill={i <= active ? "var(--fin)" : "#fff"}
                      stroke={i <= active ? "var(--fin)" : "var(--hair-strong)"}
                      strokeWidth="0.6"
                      style={{ transition: "fill 400ms ease, stroke 400ms ease" }}
                    />
                  );
                })}
              </svg>
              <div className="absolute inset-[15%] flex items-center justify-center rounded-full bg-white shadow-[var(--shadow-lift)]">
                <Image src="/logo.png" alt="" width={96} height={96} className="h-[60%] w-[60%] object-contain" />
              </div>
            </div>

            <p className="tnum text-center font-mono text-[0.8rem] tracking-wide text-ink/45">
              <span className="text-[2.2rem] font-semibold leading-none tracking-[-0.035em] text-fin">
                {String(active + 1).padStart(2, "0")}
              </span>
              <span className="ml-2">of {String(ITEMS.length).padStart(2, "0")}</span>
            </p>
          </div>
        </div>

        {/* the seven principles */}
        <ol ref={listRef} className="border-t border-ink lg:col-span-8">
          {ITEMS.map((item, i) => {
            const on = active === i;
            return (
              <li
                key={item.id}
                data-rv="up"
                className="group relative grid grid-cols-[2.75rem_minmax(0,1fr)] gap-x-5 gap-y-3 border-b border-hair py-7 md:grid-cols-[2.75rem_minmax(0,0.95fr)_minmax(0,1.05fr)] md:gap-x-8 md:py-9"
              >
                {/* a rule that draws along the top of the row you are on */}
                <span
                  aria-hidden
                  className={`absolute -top-px left-0 h-px w-full origin-left bg-fin transition-transform duration-700 ease-[cubic-bezier(0.23,1,0.32,1)] ${
                    on ? "scale-x-100" : "scale-x-0"
                  }`}
                />
                <span
                  aria-hidden
                  className={`flex h-11 w-11 items-center justify-center rounded-full transition-[background-color,color] duration-300 ${
                    on ? "bg-fin text-white" : "bg-ink/[0.05] text-ink/55"
                  }`}
                >
                  <item.icon className="h-5 w-5" strokeWidth={1.6} />
                </span>
                <h3
                  className={`self-center text-[clamp(1.1rem,1.5vw,1.3rem)] font-semibold leading-[1.25] tracking-[-0.02em] transition-colors duration-300 ${
                    on ? "text-ink" : "text-ink/80"
                  }`}
                >
                  {item.title}
                </h3>
                <p className="t-body col-start-2 md:col-start-3 md:row-start-1 md:self-center">{item.description}</p>
              </li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
