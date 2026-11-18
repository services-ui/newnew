"use client";

import { useRef } from "react";
import Image from "next/image";
import { Award } from "lucide-react";
import { gsap, MQ, useGSAP } from "@/lib/gsap";

// Quote, split into words so each can light up as the visitor scrolls. Real text in the HTML.
const QUOTE: { t: string; hl?: boolean }[] = [
  { t: "We do not believe in selling financial products. We believe in " },
  { t: "understanding your goals", hl: true },
  { t: " and guiding you towards financial decisions that are right for you." },
];

export default function FoundersDesk() {
  const rootRef = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MQ.motionOk, () => {
        // Each word warms from dim to full as the quote scrolls through. It animates `color` (text-only repaint),
        // not opacity on gradient-clipped text, and the portrait no longer drifts: nothing here moves layers
        // against the scroll, so scrolling stays on the browser's own smooth path.
        const words = gsap.utils.toArray<HTMLElement>(".fd-w", rootRef.current);
        const isHl = (el: Element) => el.classList.contains("fd-hl");
        gsap.fromTo(
          words,
          { color: (_i: number, el: Element) => (isHl(el) ? "rgba(98,173,255,0.4)" : "rgba(255,255,255,0.34)") },
          {
            color: (_i: number, el: Element) => (isHl(el) ? "rgb(98,173,255)" : "rgb(255,255,255)"),
            ease: "none",
            stagger: 0.5,
            scrollTrigger: {
              trigger: ".fd-quote",
              start: "top 78%",
              end: "bottom 46%",
              scrub: 0.5,
            },
          },
        );
      });
      return () => mm.revert();
    },
    { scope: rootRef },
  );

  let wi = 0;
  return (
    <section ref={rootRef} className="bg-night on-dark grain relative overflow-hidden sec" aria-labelledby="founder-title">
      {/* a single cool light, low and to the side (a plain radial gradient: no blur filter to re-render) */}
      <div
        aria-hidden
        className="pointer-events-none absolute -left-[10%] top-[10%] h-[70%] w-[55%]"
        style={{ background: "radial-gradient(closest-side, rgb(0 102 255 / 0.17), transparent)" }}
      />

      <div className="wrap relative grid items-center gap-14 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-24">
        {/* portrait */}
        <div className="relative mx-auto w-full max-w-[26rem] lg:mx-0" data-rv="up">
          <div className="fd-photo relative aspect-[4/5] overflow-hidden rounded-[var(--r-l)] shadow-[0_0_0_1px_rgb(255_255_255/0.1),0_40px_80px_-30px_rgb(0_0_0/0.7)]">
            <Image
              src="/nitesh-luthra.jpeg"
              alt="Nitesh Luthra - Founder"
              fill
              sizes="(min-width: 1024px) 420px, 90vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink/85 via-ink/10 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 p-6 sm:p-8">
              <h3 className="text-[1.5rem] font-semibold leading-none tracking-[-0.025em] text-white">Nitesh Luthra</h3>
              <p className="mt-2 text-sm font-medium text-white/85">Founder, Fintness Finserv</p>
            </div>
          </div>

          <div className="absolute right-3 top-3 z-10 max-w-[170px] rounded-[var(--r-m)] bg-white p-4 text-ink shadow-[0_24px_50px_-18px_rgb(0_0_0/0.6)] sm:-bottom-8 sm:-right-8 sm:top-auto sm:max-w-[200px] sm:p-6">
            <Award className="mb-3 h-5 w-5 text-fin" strokeWidth={1.8} aria-hidden />
            <p className="tnum text-[2.2rem] font-semibold leading-none tracking-[-0.04em]">14+</p>
            <p className="mt-1.5 text-[0.82rem] font-semibold leading-tight text-ink/70">Years of Financial Expertise</p>
          </div>
        </div>

        {/* quote */}
        <div>
          <h2 id="founder-title" className="eyebrow">
            Founder&apos;s Desk
          </h2>
          <figure className="mt-8">
            <span aria-hidden className="serif block text-[3.6rem] leading-[0.7] text-fin/80 lg:text-[4.2rem]">
              &ldquo;
            </span>
            <blockquote className="fd-quote serif -mt-2 text-[clamp(1.4rem,2.3vw,2.05rem)] leading-[1.38] text-white">
              {QUOTE.map((seg, si) => (
                <span key={si}>
                  {seg.t.split(/(\s+)/).map((tok, ti) =>
                    /^\s+$/.test(tok) || tok === "" ? (
                      tok
                    ) : (
                      // the highlighted phrase is a solid light blue (no background-clip:text, which repaints expensively)
                      <span key={`${si}-${ti}`} className={seg.hl ? "fd-w fd-hl not-italic font-semibold text-[#62adff]" : "fd-w"} data-i={wi++}>
                        {tok}
                      </span>
                    ),
                  )}
                </span>
              ))}
            </blockquote>
          </figure>

          <div className="mt-10 flex items-center gap-3">
            {[
              {
                href: "https://www.linkedin.com/in/nitesh-luthra-b4934124?utm_source=share_via&utm_content=profile&utm_medium=member_android",
                label: "LinkedIn",
                d: <><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" /><rect x="2" y="9" width="4" height="12" /><circle cx="4" cy="4" r="2" /></>,
              },
              {
                href: "https://x.com/NITESHLUTH44019",
                label: "Twitter (X)",
                d: <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />,
              },
              {
                href: "https://www.instagram.com/nitesh_luthra?utm_source=qr&igsh=MWp1eGkyczg5dnRzNA==",
                label: "Instagram",
                d: <><rect x="2" y="2" width="20" height="20" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" y1="6.5" x2="17.51" y2="6.5" /></>,
              },
            ].map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.label}
                className="flex h-11 w-11 items-center justify-center rounded-full text-white/65 shadow-[inset_0_0_0_1px_rgb(255_255_255/0.16)] transition-[color,box-shadow,scale] duration-200 active:scale-95 hover:text-white hover:shadow-[inset_0_0_0_1px_rgb(111_180_255/0.7)]"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                  {s.d}
                </svg>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
