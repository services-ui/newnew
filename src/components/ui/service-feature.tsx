"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import {
  ArrowUpRight,
  BadgeCheck,
  Banknote,
  Coins,
  IndianRupee,
  Landmark,
  Percent,
  ReceiptText,
  Scroll,
  ShieldCheck,
  Sparkle,
  TrendingUp,
  Wallet,
} from "lucide-react";
import { cn } from "@/lib/utils";

/**
 * Services as a "feature block": six cards, each with a short live picture that is also a toy.
 *   row 1  (1fr · 1.25fr · 1fr)   Wealth — a wallet that follows the cursor over a grid that lights up · Investment — a chart you scrub ·
 *                                 Risk — a shield that tilts toward the pointer
 *   row 2  (1fr · 1fr · 1fr)      Estate — a plan being written and signed · Tax — a dial you turn ·
 *                                 Loan — a belt of securities that pauses when you hover it
 * Every picture is drawn here (SVG + CSS) — no images. They loop gently on their own, stop while the section is
 * off-screen, and sit still (finished state) under reduced motion. Hover/pointer effects are mouse-only; every card
 * is a link to its section on /services.
 */

type Svc = { title: string; desc: string; href: string };

const SVC = {
  wealth: { title: "Wealth Management", desc: "Holistic strategies to preserve and grow your capital over time.", href: "/services#wealth-management" },
  invest: { title: "Investment Planning", desc: "Data-driven portfolio architecture aligned with your risk profile.", href: "/services#investment-planning" },
  risk: { title: "Risk Mitigation", desc: "Comprehensive protection strategies against market volatility.", href: "/services#risk-mitigation" },
  estate: { title: "Estate Planning", desc: "Structuring your legacy for seamless intergenerational wealth transfer.", href: "/services#estate-planning" },
  tax: { title: "Tax Optimization", desc: "Proactive tax planning to maximize your after-tax returns.", href: "/services#tax-optimization" },
  loan: { title: "Loan Against Securities", desc: "Leveraging your investments to provide smart and efficient access to capital.", href: "/services#loan-against-securities" },
} satisfies Record<string, Svc>;

const vars = (o: Record<string, string>) => o as React.CSSProperties;
const clamp = (n: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, n));

// ───────────────────────────── primitives ─────────────────────────────

function Card({
  svc,
  index,
  className,
  itemClassName,
  children,
}: {
  svc: Svc;
  index: number;
  className?: string;
  itemClassName?: string;
  children: React.ReactNode;
}) {
  return (
    <li data-rv="up" style={vars({ "--d": `${index * 70}ms` })} className={cn("flex", itemClassName)}>
      <Link
        href={svc.href}
        className={cn(
          "group relative flex w-full flex-col overflow-hidden rounded-[20px] border border-black/[0.06] bg-white shadow-[0_1px_2px_rgba(16,24,40,0.04)] transition-colors duration-300 hover:border-fin/35",
          className,
        )}
      >
        <span
          aria-hidden
          className="absolute right-3.5 top-3.5 z-20 flex size-8 items-center justify-center rounded-full border border-ink/12 bg-white/85 text-ink/55 transition-colors duration-300 group-hover:border-fin group-hover:bg-fin group-hover:text-white"
        >
          <ArrowUpRight strokeWidth={1.7} className="size-4" />
        </span>
        {children}
      </Link>
    </li>
  );
}

function Copy({ svc, className }: { svc: Svc; className?: string }) {
  return (
    <div className={cn("relative z-10 px-6 text-center", className)}>
      <h3 className="text-[1.2rem] font-semibold leading-7 tracking-[-0.02em] text-ink">{svc.title}</h3>
      <p className="t-small mx-auto mt-1.5 max-w-[21rem]">{svc.desc}</p>
    </div>
  );
}

// ───────────────────────────── 1 · wealth: a wallet that follows you, a grid that lights up around it ─────────────────────────────

const GRID_MASK = "radial-gradient(ellipse 75% 75% at 50% 50%, #000 35%, transparent 88%)";
const COLS = 5;
const ROWS = 3;

function WealthVisual() {
  const grid = useRef<HTMLDivElement>(null);
  const chip = useRef<HTMLSpanElement>(null);
  const heat = useRef<(HTMLSpanElement | null)[]>([]);
  const sim = useRef({ cell: 56, x: 0, y: 0, tx: 0, ty: 0, raf: 0, inside: false, ready: false });

  // The wallet eases toward the pointer (leaning into its motion); every cell glows by its distance from the wallet.
  const frame = () => {
    const s = sim.current;
    const el = chip.current;
    s.raf = 0;
    if (!el) return;
    const dx = s.tx - s.x;
    const dy = s.ty - s.y;
    s.x += dx * 0.2;
    s.y += dy * 0.2;
    el.style.transform = `translate3d(${s.x.toFixed(2)}px, ${s.y.toFixed(2)}px, 0) rotate(${clamp(dx * 0.1, -14, 14).toFixed(2)}deg)`;
    const cx = s.x + s.cell / 2;
    const cy = s.y + s.cell / 2;
    heat.current.forEach((h, i) => {
      if (!h) return;
      const d = Math.hypot(((i % COLS) + 0.5) * s.cell - cx, (Math.floor(i / COLS) + 0.5) * s.cell - cy);
      const k = Math.max(0, 1 - d / (s.cell * 2.3));
      h.style.opacity = (k * k).toFixed(3);
      h.style.transform = `scale(${(0.72 + 0.28 * k).toFixed(3)})`;
    });
    if (s.inside || Math.abs(dx) > 0.3 || Math.abs(dy) > 0.3) s.raf = requestAnimationFrame(frame);
  };
  const kick = () => {
    if (!sim.current.raf) sim.current.raf = requestAnimationFrame(frame);
  };
  useEffect(() => () => cancelAnimationFrame(sim.current.raf), []);

  const onEnter = (e: React.PointerEvent) => {
    const g = grid.current;
    if (e.pointerType !== "mouse" || !g) return;
    const s = sim.current;
    s.cell = g.offsetWidth / COLS;
    s.inside = true;
    if (!s.ready) {
      s.ready = true;
      s.x = s.tx = 2 * s.cell;
      s.y = s.ty = s.cell;
    }
    kick();
  };
  const onMove = (e: React.PointerEvent) => {
    const g = grid.current;
    if (e.pointerType !== "mouse" || !g) return;
    const s = sim.current;
    const b = g.getBoundingClientRect();
    s.tx = clamp(e.clientX - b.left - s.cell / 2, 0, b.width - s.cell);
    s.ty = clamp(e.clientY - b.top - s.cell / 2, 0, b.height - s.cell);
    kick();
  };
  const onLeave = () => {
    const s = sim.current;
    s.inside = false;
    s.tx = 2 * s.cell;
    s.ty = s.cell;
    kick();
  };

  return (
    <div className="relative flex min-h-[9.5rem] flex-1 items-center justify-center overflow-hidden sm:min-h-[11rem]" onPointerEnter={onEnter} onPointerMove={onMove} onPointerLeave={onLeave}>
      <div ref={grid} className="relative [--cell:3.5rem]" style={{ width: `calc(var(--cell) * ${COLS})`, height: `calc(var(--cell) * ${ROWS})` }}>
        <div
          className="absolute inset-0 grid"
          style={{ gridTemplateColumns: `repeat(${COLS}, var(--cell))`, gridTemplateRows: `repeat(${ROWS}, var(--cell))`, maskImage: GRID_MASK, WebkitMaskImage: GRID_MASK }}
        >
          {Array.from({ length: COLS * ROWS }).map((_, i) => {
            const c = i % COLS;
            const r = Math.floor(i / COLS);
            const dist = Math.abs(c - 2) + Math.abs(r - 1);
            return (
              <div key={i} className="relative border border-black/8">
                {/* a slow wave of tint rolling outward from the middle (its own idle loop) */}
                <span aria-hidden className="svc-a svc-wave absolute inset-0 bg-fin/10" style={vars({ "--dur": "4.8s", "--dl": `${dist * 0.45}s` })} />
                {/* the glow you cause: strongest in the cells nearest the wallet */}
                <span
                  aria-hidden
                  ref={(el) => {
                    heat.current[i] = el;
                  }}
                  className="absolute inset-[3px] rounded-md bg-fin/25 opacity-0"
                />
              </div>
            );
          })}
        </div>
        <span
          ref={chip}
          aria-hidden
          className="pointer-events-none absolute left-0 top-0 flex size-(--cell) items-center justify-center rounded-md border border-fin/45 bg-white shadow-[0_10px_22px_-8px_rgb(0_102_255/0.55)]"
          style={{ transform: "translate3d(calc(var(--cell) * 2), calc(var(--cell) * 1), 0)" }}
        >
          <Wallet className="size-7 text-fin" strokeWidth={1.7} />
        </span>
      </div>
    </div>
  );
}

// ───────────────────────────── 2 · investment: a chart you scrub ─────────────────────────────

const LINE = "M26 150 C 86 142, 118 126, 168 108 S 248 88, 288 62 S 344 34, 374 24";
const BAR_H = [34, 50, 44, 66, 58, 84, 76, 104, 96];

function InvestVisual() {
  const svg = useRef<SVGSVGElement>(null);
  const path = useRef<SVGPathElement>(null);
  const clip = useRef<SVGRectElement>(null);
  const vline = useRef<SVGLineElement>(null);
  const hline = useRef<SVGLineElement>(null);
  const dot = useRef<SVGGElement>(null);
  const bars = useRef<(SVGRectElement | null)[]>([]);
  const pill = useRef<HTMLSpanElement>(null);
  const pts = useRef<{ x: number; y: number }[]>([]);

  // While the pointer is on the chart the loop stops and the chart is yours: the line is bright up to the cursor
  // and dim after it, the bars near the cursor rise, and a marker rides above the dot. Tracks 1:1 (no easing).
  const onMove = (e: React.PointerEvent) => {
    const s = svg.current;
    const p = path.current;
    if (e.pointerType !== "mouse" || !s || !p) return;
    if (!pts.current.length) {
      const len = p.getTotalLength();
      for (let i = 0; i <= 160; i++) {
        const q = p.getPointAtLength((len * i) / 160);
        pts.current.push({ x: q.x, y: q.y });
      }
    }
    const b = s.getBoundingClientRect();
    const x = ((e.clientX - b.left) / b.width) * 400;
    const arr = pts.current;
    let lo = 0;
    let hi = arr.length - 1;
    while (lo < hi) {
      const mid = (lo + hi) >> 1;
      if (arr[mid].x < x) lo = mid + 1;
      else hi = mid;
    }
    const q = arr[lo];
    s.dataset.hover = "on";
    clip.current?.setAttribute("width", String(q.x));
    if (vline.current) {
      vline.current.setAttribute("x1", String(q.x));
      vline.current.setAttribute("x2", String(q.x));
      vline.current.setAttribute("y1", String(q.y + 12));
    }
    if (hline.current) {
      hline.current.setAttribute("x2", String(q.x));
      hline.current.setAttribute("y1", String(q.y));
      hline.current.setAttribute("y2", String(q.y));
    }
    dot.current?.setAttribute("transform", `translate(${q.x} ${q.y})`);
    bars.current.forEach((r, i) => {
      if (!r) return;
      const k = Math.max(0, 1 - Math.abs(49 + i * 38 - q.x) / 66);
      r.style.transform = `scaleY(${(1 + 0.42 * k).toFixed(3)})`;
      r.style.fillOpacity = (0.11 + 0.5 * k).toFixed(3);
    });
    if (pill.current) {
      pill.current.style.left = `${(q.x / 400) * 100}%`;
      pill.current.style.top = `${(q.y / 190) * 100}%`;
      pill.current.style.opacity = "1";
    }
  };
  const onLeave = () => {
    const s = svg.current;
    if (s) delete s.dataset.hover;
    clip.current?.setAttribute("width", "0");
    if (pill.current) pill.current.style.opacity = "0";
    bars.current.forEach((r) => {
      if (!r) return;
      r.style.transform = "";
      r.style.fillOpacity = "";
    });
  };

  return (
    <div className="relative flex min-h-[9rem] flex-1 items-center px-4 pt-6 sm:min-h-[10.5rem]" onPointerMove={onMove} onPointerLeave={onLeave}>
      <div className="relative w-full">
        <svg ref={svg} data-smil viewBox="0 0 400 190" className="block h-auto w-full" aria-hidden>
          <defs>
            <linearGradient id="svc-line-g" x1="0" x2="1" y1="0" y2="0">
              <stop offset="0" stopColor="#0066ff" />
              <stop offset="1" stopColor="#00b2ff" />
            </linearGradient>
            <linearGradient id="svc-area-g" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0" stopColor="#0066ff" stopOpacity="0.22" />
              <stop offset="1" stopColor="#0066ff" stopOpacity="0" />
            </linearGradient>
            <linearGradient id="svc-area-g2" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0" stopColor="#0066ff" stopOpacity="0.4" />
              <stop offset="1" stopColor="#0066ff" stopOpacity="0.02" />
            </linearGradient>
            <clipPath id="svc-clip">
              <rect ref={clip} x="0" y="0" width="0" height="190" />
            </clipPath>
          </defs>
          {[50, 95, 140].map((y) => (
            <line key={y} x1="20" x2="380" y1={y} y2={y} stroke="#0b1526" strokeOpacity="0.07" strokeDasharray="3 5" />
          ))}
          <line x1="20" x2="380" y1="170" y2="170" stroke="#0b1526" strokeOpacity="0.1" />
          {BAR_H.map((h, i) => (
            <rect
              key={i}
              ref={(el) => {
                bars.current[i] = el;
              }}
              x={40 + i * 38}
              y={170 - h}
              width="18"
              height={h}
              rx="4"
              fill="#0066ff"
              fillOpacity="0.11"
              className="svc-a svc-bar"
              style={vars({ "--dur": "5.5s", "--dl": `${-i * 0.55}s` })}
            />
          ))}

          {/* the loop (hidden while you scrub) */}
          <path d={`${LINE} L374 170 L26 170 Z`} fill="url(#svc-area-g)" className="svc-a svc-area svc-auto" style={vars({ "--dur": "7s" })} />
          <path
            ref={path}
            d={LINE}
            pathLength={1}
            fill="none"
            stroke="url(#svc-line-g)"
            strokeWidth="3.5"
            strokeLinecap="round"
            className="svc-a svc-draw svc-auto"
            style={vars({ "--dur": "7s" })}
          />
          <g className="svc-auto motion-reduce:hidden">
            <animateMotion dur="7s" repeatCount="indefinite" calcMode="linear" keyPoints="0;1;1" keyTimes="0;0.55;1" path={LINE} />
            <animate attributeName="opacity" values="1;1;0;0" keyTimes="0;0.9;0.97;1" dur="7s" repeatCount="indefinite" />
            <circle r="7" fill="#fff" stroke="#0066ff" strokeWidth="3" />
          </g>

          {/* the scrub: dim whole curve, bright part up to the cursor */}
          <path d={`${LINE} L374 170 L26 170 Z`} fill="url(#svc-area-g)" fillOpacity="0.55" className="svc-hv" />
          <path d={`${LINE} L374 170 L26 170 Z`} fill="url(#svc-area-g2)" clipPath="url(#svc-clip)" className="svc-hv" />
          <path d={LINE} fill="none" stroke="#0066ff" strokeOpacity="0.2" strokeWidth="3.5" strokeLinecap="round" className="svc-hv" />
          <path d={LINE} fill="none" stroke="url(#svc-line-g)" strokeWidth="4" strokeLinecap="round" clipPath="url(#svc-clip)" className="svc-hv" />
          <line ref={hline} x1="26" x2="26" y1="150" y2="150" stroke="#0066ff" strokeOpacity="0.28" strokeDasharray="3 4" className="svc-hv" />
          <line ref={vline} x1="26" x2="26" y1="162" y2="170" stroke="#0066ff" strokeOpacity="0.28" strokeDasharray="3 4" className="svc-hv" />
          <g ref={dot} transform="translate(26 150)" className="svc-hv">
            <circle r="14" fill="#0066ff" fillOpacity="0.14" />
            <circle r="7" fill="#fff" stroke="#0066ff" strokeWidth="3" />
          </g>
        </svg>
        <span
          ref={pill}
          aria-hidden
          className="svc-hv-html pointer-events-none absolute left-0 top-0 flex size-7 -translate-x-1/2 -translate-y-[175%] items-center justify-center rounded-full bg-fin text-white opacity-0 shadow-[0_8px_18px_-6px_rgb(0_102_255/0.7)] transition-opacity duration-150"
        >
          <TrendingUp className="size-3.5" strokeWidth={2.4} />
        </span>
      </div>
    </div>
  );
}

// ───────────────────────────── 3 · risk: a shield that tilts toward the pointer ─────────────────────────────

function RiskVisual() {
  const tile = useRef<HTMLSpanElement>(null);

  const onMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const t = tile.current;
    if (e.pointerType !== "mouse" || !t) return;
    const b = e.currentTarget.getBoundingClientRect();
    const nx = ((e.clientX - b.left) / b.width - 0.5) * 2;
    const ny = ((e.clientY - b.top) / b.height - 0.5) * 2;
    t.style.transition = "none"; // tracks the pointer 1:1…
    t.style.transform = `perspective(420px) rotateX(${(-ny * 16).toFixed(1)}deg) rotateY(${(nx * 20).toFixed(1)}deg) scale(1.08)`;
  };
  const onLeave = () => {
    const t = tile.current;
    if (!t) return;
    t.style.transition = "transform 420ms cubic-bezier(0.23, 1, 0.32, 1)"; // …and settles back when released
    t.style.transform = "";
  };

  return (
    <div className="relative flex min-h-[9rem] sm:min-h-[10.5rem] flex-1 items-center justify-center" onPointerMove={onMove} onPointerLeave={onLeave}>
      {[0, 1, 2].map((i) => (
        <span
          key={i}
          aria-hidden
          className="svc-a svc-ripple absolute size-24 rounded-full border border-fin/35"
          style={vars({ "--dur": "4.2s", "--dl": `${-i * 1.4}s`, "--s": String(1 + i * 0.45), "--o": String(0.28 - i * 0.08) })}
        />
      ))}
      <span
        ref={tile}
        aria-hidden
        className="relative flex size-16 items-center justify-center rounded-2xl bg-white shadow-[0_14px_30px_-10px_rgb(0_102_255/0.55)] ring-1 ring-fin/15"
      >
        <ShieldCheck className="size-8 text-fin" strokeWidth={1.7} />
      </span>
      {[
        { c: "left-[26%] top-[24%]", s: "size-3", d: "-0.4s" },
        { c: "right-[24%] top-[34%]", s: "size-2.5", d: "-1.3s" },
        { c: "left-[34%] bottom-[22%]", s: "size-2", d: "-2.1s" },
      ].map((sp) => (
        <Sparkle key={sp.c} aria-hidden className={cn("svc-a svc-twinkle absolute fill-fin/70 text-fin/70", sp.c, sp.s)} style={vars({ "--dur": "3.2s", "--dl": sp.d })} />
      ))}
    </div>
  );
}

// ───────────────────────────── 4 · estate: a plan being written and signed ─────────────────────────────

const SIGNATURE = "M4 26 C 14 6, 22 6, 20 22 S 34 30, 40 14 S 52 8, 56 22 C 60 30, 70 10, 76 18 S 92 28, 116 12";

function EstateVisual() {
  return (
    <div className="relative min-h-[9rem] sm:min-h-[10.5rem] flex-1">
      <div aria-hidden className="absolute inset-x-10 bottom-0 h-24" style={{ background: "radial-gradient(closest-side, rgb(0 102 255 / 0.16), transparent)" }} />
      <div className="absolute inset-x-6 -bottom-3 overflow-hidden rounded-2xl border border-b-0 border-black/[0.07] bg-white shadow-[0_-8px_30px_rgba(16,24,40,0.07)] transition-transform duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:-translate-y-3">
        <div className="flex items-center justify-between px-4 py-3">
          <div className="flex items-center gap-2.5">
            <Scroll className="size-4 text-fin" strokeWidth={1.8} aria-hidden />
            <span className="h-2 w-20 rounded-full bg-ink/[0.1]" />
          </div>
          <span className="h-2 w-9 rounded-full bg-fin/25" />
        </div>
        <div className="border-t border-black/[0.06]" />
        <div className="space-y-2.5 px-5 pb-5 pt-3.5">
          {["100%", "86%", "56%"].map((w, i) => (
            <div key={i} className="svc-a svc-line h-2 rounded-full bg-ink/[0.1]" style={{ width: w, ...vars({ "--dur": "8s", "--dl": `${i * 0.4}s` }) }} />
          ))}
          <div className="flex items-end justify-between pt-1.5">
            <svg viewBox="0 0 120 36" className="h-8 w-28" fill="none" aria-hidden>
              <path d={SIGNATURE} pathLength={1} stroke="#0066ff" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" className="svc-a svc-sign" style={vars({ "--dur": "8s" })} />
            </svg>
            <BadgeCheck aria-hidden className="svc-a svc-pop size-6 text-fin" strokeWidth={1.8} style={vars({ "--dur": "8s" })} />
          </div>
        </div>
      </div>
    </div>
  );
}

// ───────────────────────────── 5 · tax: a dial ─────────────────────────────

const TAX_REST = 62;
const dialAt = (kept: number) => {
  const a = ((-90 + kept * 3.6) * Math.PI) / 180;
  return `translate(${(80 + 56 * Math.cos(a)).toFixed(2)} ${(80 + 56 * Math.sin(a)).toFixed(2)})`;
};

function TaxVisual() {
  const wrap = useRef<HTMLDivElement>(null);
  const svg = useRef<SVGSVGElement>(null);
  const knob = useRef<SVGGElement>(null);
  const center = useRef<HTMLSpanElement>(null);
  const chipA = useRef<HTMLSpanElement>(null);
  const chipB = useRef<HTMLSpanElement>(null);
  const dial = useRef({ cur: TAX_REST, target: TAX_REST, raf: 0, active: false });

  // Go round the ring with the pointer: the kept (blue) arc ends where you point and a knob rides its end.
  // The value eases toward the pointer; on leaving, it eases back to rest before the idle loop resumes.
  const frame = () => {
    const d = dial.current;
    d.raf = 0;
    const diff = d.target - d.cur;
    d.cur += diff * 0.3;
    const s = svg.current;
    if (s) {
      s.style.setProperty("--kept", d.cur.toFixed(2));
      knob.current?.setAttribute("transform", dialAt(d.cur));
    }
    if (center.current) center.current.style.transform = `rotate(${((d.cur - TAX_REST) * 0.5).toFixed(1)}deg) scale(${(1 + (d.cur - TAX_REST) / 240).toFixed(3)})`;
    if (Math.abs(diff) > 0.15) d.raf = requestAnimationFrame(frame);
    else if (!d.active && s) {
      delete s.dataset.hover;
      s.style.removeProperty("--kept");
      if (center.current) center.current.style.transform = "";
    }
  };
  const kick = () => {
    if (!dial.current.raf) dial.current.raf = requestAnimationFrame(frame);
  };
  useEffect(() => () => cancelAnimationFrame(dial.current.raf), []);

  const onMove = (e: React.PointerEvent) => {
    const s = svg.current;
    const w = wrap.current;
    if (e.pointerType !== "mouse" || !s || !w) return;
    const d = dial.current;
    const b = s.getBoundingClientRect();
    const deg = (Math.atan2(e.clientY - (b.top + b.height / 2), e.clientX - (b.left + b.width / 2)) * 180) / Math.PI;
    let raw = (((deg + 90) % 360) + 360) % 360 / 3.6; // 0 at 12 o'clock, clockwise
    if (d.cur > 70 && raw < 25) raw = 100; // crossing the top: stay at the end instead of wrapping round
    if (d.cur < 30 && raw > 75) raw = 0;
    d.target = clamp(raw, 18, 96);
    if (!d.active) {
      d.active = true;
      d.cur = d.cur || TAX_REST;
    }
    s.dataset.hover = "on";
    if (knob.current) knob.current.style.opacity = "1";
    const wb = w.getBoundingClientRect();
    const nx = (e.clientX - wb.left) / wb.width - 0.5;
    const ny = (e.clientY - wb.top) / wb.height - 0.5;
    if (chipA.current) chipA.current.style.translate = `${(-nx * 22).toFixed(1)}px ${(-ny * 16).toFixed(1)}px`;
    if (chipB.current) chipB.current.style.translate = `${(nx * 20).toFixed(1)}px ${(ny * 14).toFixed(1)}px`;
    kick();
  };
  const onLeave = () => {
    const d = dial.current;
    d.active = false;
    d.target = TAX_REST;
    if (knob.current) knob.current.style.opacity = "0";
    if (chipA.current) chipA.current.style.translate = "";
    if (chipB.current) chipB.current.style.translate = "";
    kick();
  };

  return (
    <div ref={wrap} className="relative flex min-h-[9rem] flex-1 items-center justify-center pt-6 sm:min-h-[10.5rem]" onPointerMove={onMove} onPointerLeave={onLeave}>
      <div className="relative size-36">
        <svg ref={svg} viewBox="0 0 160 160" className="size-full overflow-visible" fill="none" aria-hidden>
          <defs>
            <linearGradient id="svc-tax-g" x1="0" x2="1" y1="0" y2="1">
              <stop offset="0" stopColor="#0066ff" />
              <stop offset="1" stopColor="#00b2ff" />
            </linearGradient>
          </defs>
          <circle cx="80" cy="80" r="56" stroke="#dbe7ff" strokeWidth="14" />
          <circle cx="80" cy="80" r="56" stroke="url(#svc-tax-g)" strokeWidth="14" pathLength={100} transform="rotate(-90 80 80)" className="svc-a svc-donut" style={vars({ "--dur": "6s" })} />
          {Array.from({ length: 24 }).map((_, i) => {
            const a = (i / 24) * Math.PI * 2;
            // rounded: server and browser Math.cos/sin differ in the last digits, which would trip hydration
            const p = (r: number, f: (n: number) => number) => Math.round((80 + f(a) * r) * 100) / 100;
            return <line key={i} x1={p(71, Math.cos)} y1={p(71, Math.sin)} x2={p(75, Math.cos)} y2={p(75, Math.sin)} stroke="#0b1526" strokeOpacity="0.14" strokeLinecap="round" />;
          })}
          <g ref={knob} transform={dialAt(TAX_REST)} style={{ opacity: 0, transition: "opacity 150ms" }}>
            <circle r="13" fill="#0066ff" fillOpacity="0.16" />
            <circle r="9" fill="#fff" stroke="url(#svc-tax-g)" strokeWidth="3.5" />
            <circle r="2.6" fill="#0066ff" />
          </g>
        </svg>
        <span
          ref={center}
          aria-hidden
          className="absolute inset-0 m-auto flex size-14 items-center justify-center rounded-full bg-white shadow-[0_10px_24px_-10px_rgb(0_40_120/0.45)]"
        >
          <ReceiptText className="size-6 text-fin" strokeWidth={1.7} />
        </span>
      </div>
      <span ref={chipA} aria-hidden className="absolute left-[14%] top-[34%] transition-[translate] duration-200 ease-out">
        <span className="svc-a svc-float flex size-9 items-center justify-center rounded-xl bg-white text-fin shadow-[0_8px_20px_-8px_rgb(0_40_120/0.4)] ring-1 ring-black/5" style={vars({ "--dur": "4.4s" })}>
          <Percent className="size-[1.1rem]" strokeWidth={2} />
        </span>
      </span>
      <span ref={chipB} aria-hidden className="absolute right-[14%] top-[56%] transition-[translate] duration-200 ease-out">
        <span className="svc-a svc-float flex size-9 items-center justify-center rounded-xl bg-white text-fin shadow-[0_8px_20px_-8px_rgb(0_40_120/0.4)] ring-1 ring-black/5" style={vars({ "--dur": "5.2s", "--dl": "-1.6s" })}>
          <IndianRupee className="size-[1.1rem]" strokeWidth={2} />
        </span>
      </span>
    </div>
  );
}

// ───────────────────────────── 6 · loan: a belt of securities, pauses on hover ─────────────────────────────

const BELT = "M-40 134C20 134 55 92 185.5 92C316 92 351 134 411 134";
const BELT_DUR = 24;
const RIDERS = [
  { Icon: Landmark, fill: "#0b1526" },
  { Icon: TrendingUp, fill: "#0066ff" },
  { Icon: Coins, fill: "#00a3ff" },
  { Icon: ReceiptText, fill: "#0b1526" },
  { Icon: Banknote, fill: "#0066ff" },
  { Icon: Wallet, fill: "#00a3ff" },
];

function LoanVisual() {
  const svg = useRef<SVGSVGElement>(null);

  const hold = (e: React.PointerEvent) => {
    if (e.pointerType === "mouse") svg.current?.pauseAnimations();
  };
  const release = (e: React.PointerEvent) => {
    const s = svg.current;
    if (e.pointerType !== "mouse" || !s) return;
    // stay paused if the whole section is currently off-screen / motion is reduced
    if (s.closest("[data-live]")?.getAttribute("data-live") === "on") s.unpauseAnimations();
  };

  return (
    <div className="relative min-h-[9rem] sm:min-h-[10.5rem] flex-1" onPointerEnter={hold} onPointerLeave={release}>
      <svg ref={svg} data-smil viewBox="0 0 371 200" preserveAspectRatio="xMidYMid slice" className="absolute inset-0 h-full w-full" aria-hidden>
        <path d={BELT} stroke="#0b1526" strokeOpacity="0.04" strokeWidth="66" strokeLinecap="round" fill="none" />
        <path d={BELT} stroke="#0b1526" strokeOpacity="0.16" strokeWidth="1.5" strokeDasharray="2 8" strokeLinecap="round" fill="none" />
        {RIDERS.map(({ Icon, fill }, i) => (
          <g key={i}>
            <animateMotion dur={`${BELT_DUR}s`} begin={`${-i * (BELT_DUR / RIDERS.length)}s`} repeatCount="indefinite" calcMode="linear" rotate="auto" path={BELT} />
            <rect x="-26" y="-20" width="52" height="52" rx="15" fill="#0b1526" fillOpacity="0.13" />
            <rect x="-26" y="-26" width="52" height="52" rx="15" fill={fill} />
            <Icon x={-13} y={-13} width={26} height={26} color="#ffffff" strokeWidth={1.8} />
          </g>
        ))}
      </svg>
    </div>
  );
}

// ───────────────────────────── the block ─────────────────────────────

export default function ServiceFeature() {
  const root = useRef<HTMLDivElement>(null);

  // Loops (CSS + SVG SMIL) run only while the section is on screen and motion isn't reduced.
  useEffect(() => {
    const el = root.current;
    if (!el) return;
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    let visible = false;
    const apply = () => {
      const on = visible && !mq.matches;
      el.dataset.live = on ? "on" : "off";
      el.querySelectorAll<SVGSVGElement>("svg[data-smil]").forEach((s) => (on ? s.unpauseAnimations() : s.pauseAnimations()));
    };
    const io = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        apply();
      },
      { rootMargin: "120px" },
    );
    io.observe(el);
    mq.addEventListener("change", apply);
    return () => {
      io.disconnect();
      mq.removeEventListener("change", apply);
    };
  }, []);

  return (
    <div ref={root} data-live="on" className="svc-live space-y-4 lg:space-y-5">
      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-[1fr_1.25fr_1fr] lg:gap-5">
        <Card svc={SVC.wealth} index={0} className="sm:min-h-[16.5rem] pt-7">
          <Copy svc={SVC.wealth} />
          <WealthVisual />
        </Card>
        <Card svc={SVC.invest} index={1} className="sm:min-h-[16.5rem] pb-7">
          <InvestVisual />
          <Copy svc={SVC.invest} />
        </Card>
        <Card svc={SVC.risk} index={2} itemClassName="sm:col-span-2 lg:col-span-1" className="sm:min-h-[16.5rem] pt-7">
          <Copy svc={SVC.risk} />
          <RiskVisual />
        </Card>
      </ul>

      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 lg:gap-5">
        <Card svc={SVC.estate} index={3} className="sm:min-h-[15.5rem] pt-7">
          <Copy svc={SVC.estate} />
          <EstateVisual />
        </Card>
        <Card svc={SVC.tax} index={4} className="sm:min-h-[15.5rem] pb-7">
          <TaxVisual />
          <Copy svc={SVC.tax} />
        </Card>
        <Card svc={SVC.loan} index={5} itemClassName="sm:col-span-2 lg:col-span-1" className="sm:min-h-[15.5rem] pt-7">
          <Copy svc={SVC.loan} />
          <LoanVisual />
        </Card>
      </ul>
    </div>
  );
}
