"use client";

import * as React from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

export interface Testimonial {
  id: number | string;
  name: string;
  avatar?: string;
  role?: string;
  description: string;
}

export interface TestimonialCarouselProps extends React.HTMLAttributes<HTMLDivElement> {
  testimonials: Testimonial[];
  showArrows?: boolean;
  showDots?: boolean;
}

const getInitials = (name: string) =>
  name
    .split(" ")
    .map((n) => n[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

/**
 * Native scroll-snap track: the browser's own physics, 1:1 finger tracking, interruptible by default,
 * keyboard-reachable. Three columns on desktop (everything visible, nothing auto-rotating), one and a
 * bit per screen on phones with prev/next controls. No timer moves the content under the reader.
 */
export const TestimonialCarousel = React.forwardRef<HTMLDivElement, TestimonialCarouselProps>(
  ({ className, testimonials, showArrows = true, showDots = true, ...props }, ref) => {
    const trackRef = React.useRef<HTMLUListElement>(null);
    const [index, setIndex] = React.useState(0);

    const scrollToIndex = (i: number) => {
      const track = trackRef.current;
      if (!track) return;
      const clamped = Math.max(0, Math.min(testimonials.length - 1, i));
      const card = track.children[clamped] as HTMLElement | undefined;
      card?.scrollIntoView({ behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth", inline: "start", block: "nearest" });
    };

    // track which card is current from the scroll position (no per-frame React state: only when the index changes)
    React.useEffect(() => {
      const track = trackRef.current;
      if (!track) return;
      let raf = 0;
      const onScroll = () => {
        if (raf) return;
        raf = requestAnimationFrame(() => {
          raf = 0;
          const first = track.children[0] as HTMLElement | undefined;
          if (!first) return;
          const step = (track.children[1] as HTMLElement | undefined)?.offsetLeft ?? first.offsetWidth;
          const i = Math.round(track.scrollLeft / Math.max(1, step - first.offsetLeft));
          setIndex((prev) => (prev === i ? prev : i));
        });
      };
      track.addEventListener("scroll", onScroll, { passive: true });
      return () => {
        track.removeEventListener("scroll", onScroll);
        if (raf) cancelAnimationFrame(raf);
      };
    }, []);

    return (
      <div ref={ref} className={cn("relative w-full", className)} {...props}>
        <ul
          ref={trackRef}
          role="list"
          aria-label="Client testimonials"
          tabIndex={0}
          className="-mx-[var(--gutter)] flex snap-x snap-mandatory gap-5 overflow-x-auto px-[var(--gutter)] pb-2 [scrollbar-width:none] [touch-action:pan-x_pan-y] focus-visible:outline-offset-[-2px] lg:mx-0 lg:grid lg:grid-cols-3 lg:gap-6 lg:overflow-visible lg:px-0 [&::-webkit-scrollbar]:hidden"
        >
          {testimonials.map((t, i) => (
            <li
              key={t.id}
              data-rv="up"
              style={{ ["--d" as string]: `${i * 90}ms` } as React.CSSProperties}
              className="flex w-[86%] shrink-0 snap-start flex-col justify-between rounded-[var(--r-l)] bg-white p-7 shadow-[var(--shadow-card)] sm:w-[62%] md:w-[48%] lg:w-auto lg:p-9"
            >
              <figure className="flex flex-1 flex-col justify-between">
                <div>
                  <span aria-hidden className="serif block text-[3rem] leading-[0.7] text-fin/80">
                    &ldquo;
                  </span>
                  <blockquote className="serif mt-1 text-[1.05rem] leading-[1.6] text-ink sm:text-[1.1rem]">
                    <p>{t.description}</p>
                  </blockquote>
                </div>
                <figcaption className="mt-9 flex items-center gap-4 border-t border-hair pt-6">
                  <span
                    aria-hidden
                    className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-ink font-mono text-[0.8rem] font-medium tracking-wider text-white"
                  >
                    {getInitials(t.name)}
                  </span>
                  <span className="min-w-0">
                    <span className="block text-[1rem] font-semibold tracking-[-0.015em] text-ink">{t.name}</span>
                    {t.role && <span className="mt-0.5 block text-[0.8rem] leading-snug text-ink/55">{t.role}</span>}
                  </span>
                </figcaption>
              </figure>
            </li>
          ))}
        </ul>

        {(showArrows || showDots) && (
          <div className="mt-8 flex items-center justify-between lg:hidden">
            {showDots ? (
              <div className="flex gap-2" aria-hidden>
                {testimonials.map((t, i) => (
                  <span
                    key={t.id}
                    className={cn(
                      "h-1.5 rounded-full transition-[width,background-color] duration-300 ease-[cubic-bezier(0.23,1,0.32,1)]",
                      i === index ? "w-7 bg-fin" : "w-1.5 bg-ink/20",
                    )}
                  />
                ))}
              </div>
            ) : (
              <span />
            )}
            {showArrows && (
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => scrollToIndex(index - 1)}
                  disabled={index === 0}
                  aria-label="Previous testimonial"
                  className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-ink shadow-[inset_0_0_0_1px_var(--hair-strong)] transition-[scale,opacity] duration-150 active:scale-95 disabled:opacity-35"
                >
                  <ChevronLeft className="h-5 w-5" aria-hidden />
                </button>
                <button
                  type="button"
                  onClick={() => scrollToIndex(index + 1)}
                  disabled={index === testimonials.length - 1}
                  aria-label="Next testimonial"
                  className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-ink shadow-[inset_0_0_0_1px_var(--hair-strong)] transition-[scale,opacity] duration-150 active:scale-95 disabled:opacity-35"
                >
                  <ChevronRight className="h-5 w-5" aria-hidden />
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    );
  },
);
TestimonialCarousel.displayName = "TestimonialCarousel";
