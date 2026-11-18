"use client";

import React, { useState, useEffect, useEffectEvent, useRef } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import { Calendar, MapPin, X, ChevronLeft, ChevronRight, Maximize2 } from "lucide-react";
import PerspectiveTunnelHero from "@/components/ui/perspective-tunnel-hero";

interface EventItem {
  id: string;
  name: string;
  date: string;
  location: string;
  description: string;
  images: string[];
}

const eventsData: EventItem[] = [
  {
    id: "atharv-offshore",
    name: "Atharv Offshore Ahmedabad",
    date: "November 28, 2025",
    location: "Ahmedabad, Gujarat",
    description: "Conducted a Financial Awareness Session covering goal-based investing, financial planning, risk management, and wealth creation strategies for employees.",
    images: [
      "/events/atharv-2.jpeg",
    ]
  },
  {
    id: "bn-group",
    name: "BN Group India Summit",
    date: "May 30, 2024",
    location: "New Delhi",
    description: "An interactive financial wellness session focused on improving financial literacy, investment awareness, and long-term wealth-building habits.",
    images: [
      "/events/bn-group-1.jpeg",
      "/events/bn-group-2.jpeg",
      "/events/bn-group-3.jpeg",
      "/events/bn-group-4.jpeg",
    ]
  },
  {
    id: "mavericks",
    name: "Mavericks",
    date: "July 2, 2024",
    location: "Corporate Headquarters",
    description: "Educating employees on smart financial decision-making through discussions on investments, insurance, taxation, and retirement planning.",
    images: [
      "/events/mavericks-1.jpeg",
      "/events/mavericks-2.jpeg",
    ]
  },
  {
    id: "sq-fit",
    name: "SQ Fit Corporate Wellness",
    date: "May 30, 2024",
    location: "Wellness Arena",
    description: "Empowering employees with practical insights on budgeting, investing, risk protection, and financial independence.",
    images: [
      "/events/sq-fit-1.jpeg",
      "/events/sq-fit-2.jpeg",
    ]
  },
  {
    id: "sumit-digital",
    name: "Sumit Digital Integration",
    date: "June 3, 2024",
    location: "Digital HQ",
    description: "A corporate financial literacy program designed to help employees build stronger financial foundations and achieve their personal financial goals.",
    images: [
      "/events/sumit-1.jpeg",
      "/events/sumit-2.jpeg",
      "/events/sumit-3.jpeg",
    ]
  },
  {
    id: "hornblower",
    name: "Hornblower Corporate Session",
    date: "May 30, 2024",
    location: "Hornblower Yacht",
    description: "A knowledge-driven session aimed at helping employees understand personal finance, manage money effectively, and make informed investment decisions for their future.",
    images: [
      "/events/hornblower-1.jpeg",
      "/events/hornblower-2.jpeg",
    ]
  }
];

// The photographs that fly through the tunnel — real event photos, captioned with the real event names.
const TUNNEL_IMAGES = [
  { src: "/events/bn-group-1.jpeg", title: "BN Group India Summit" },
  { src: "/events/hornblower-1.jpeg", title: "Hornblower Corporate Session" },
  { src: "/events/sumit-1.jpeg", title: "Sumit Digital Integration" },
  { src: "/events/mavericks-1.jpeg", title: "Mavericks" },
  { src: "/events/sq-fit-1.jpeg", title: "SQ Fit Corporate Wellness" },
  { src: "/events/atharv-2.jpeg", title: "Atharv Offshore Ahmedabad" },
  { src: "/events/bn-group-3.jpeg", title: "BN Group India Summit" },
  { src: "/events/sumit-3.jpeg", title: "Sumit Digital Integration" },
  { src: "/events/hornblower-2.jpeg", title: "Hornblower Corporate Session" },
];

export default function EventsPage() {
  const [lightbox, setLightbox] = useState<{
    isOpen: boolean;
    images: string[];
    index: number;
    eventName: string;
  }>({
    isOpen: false,
    images: [],
    index: 0,
    eventName: ""
  });

  const lastTrigger = useRef<HTMLElement | null>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);
  const touchStartX = useRef<number | null>(null);

  const openLightbox = (images: string[], index: number, eventName: string, trigger?: HTMLElement) => {
    lastTrigger.current = trigger ?? null;
    setLightbox({
      isOpen: true,
      images,
      index,
      eventName
    });
  };

  const closeLightbox = () => {
    setLightbox((prev) => ({ ...prev, isOpen: false }));
    // hand focus back to the tile that opened it
    requestAnimationFrame(() => lastTrigger.current?.focus());
  };

  const nextImage = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setLightbox((prev) => ({
      ...prev,
      index: (prev.index + 1) % prev.images.length
    }));
  };

  const prevImage = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    setLightbox((prev) => ({
      ...prev,
      index: (prev.index - 1 + prev.images.length) % prev.images.length
    }));
  };

  // Handle keyboard navigation for lightbox
  const onKeyDown = useEffectEvent((e: KeyboardEvent) => {
    if (!lightbox.isOpen) return;
    if (e.key === "Escape") closeLightbox();
    if (e.key === "ArrowRight") nextImage();
    if (e.key === "ArrowLeft") prevImage();
  });
  useEffect(() => {
    const handler = (e: KeyboardEvent) => onKeyDown(e);
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  // While open: lock the page behind it, and move focus into the dialog.
  useEffect(() => {
    if (!lightbox.isOpen) return;
    const prev = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";
    closeBtnRef.current?.focus();
    return () => {
      document.documentElement.style.overflow = prev;
    };
  }, [lightbox.isOpen]);

  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current == null || lightbox.images.length < 2) return;
    const dx = e.changedTouches[0].clientX - touchStartX.current;
    touchStartX.current = null;
    if (Math.abs(dx) > 60) (dx < 0 ? nextImage : prevImage)();
  };

  return (
    <main id="main" className="relative w-full bg-white text-ink">
      {/* HERO — the tunnel; the page's own words sit at its centre */}
      <PerspectiveTunnelHero images={TUNNEL_IMAGES}>
        <h1 className="t-display uppercase tracking-[-0.02em]">
          <span className="grad">OUR EVENTS</span>
        </h1>
        <h2 className="mt-5 text-[clamp(1.1rem,2vw,1.6rem)] font-semibold leading-snug tracking-[-0.025em] text-ink/85">
          Milestones, Moments, and Core Collaborations
        </h2>
        <p className="t-lead mt-4 max-w-[30rem]">
          A visual journey through our workshops, client meets, wellness activities, and corporate celebrations.
        </p>
      </PerspectiveTunnelHero>

      {/* EVENTS */}
      <section aria-label="Events" className="wrap pb-[clamp(72px,10vw,144px)] pt-[clamp(56px,8vw,112px)]">
        {eventsData.map((event, eventIdx) => {
          const n = event.images.length;
          return (
            <article
              key={event.id}
              className="grid items-start gap-8 border-t border-ink py-12 lg:grid-cols-12 lg:gap-16 lg:py-20"
            >
              <div className="lg:col-span-5 lg:sticky lg:top-28" data-rv="up">
                <p className="eyebrow tnum">Event {eventIdx + 1}</p>
                <h2 className="t-h2 mt-5">{event.name}</h2>

                <ul className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-[0.9rem] font-medium text-ink/65">
                  <li className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-fin" strokeWidth={1.8} aria-hidden />
                    {event.date}
                  </li>
                  <li className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-fin" strokeWidth={1.8} aria-hidden />
                    {event.location}
                  </li>
                </ul>

                <p className="t-body mt-6 max-w-[30rem] !text-[1.05rem]">{event.description}</p>
              </div>

              <ul className="grid grid-cols-2 gap-3 sm:gap-4 lg:col-span-7">
                {event.images.map((imgSrc, imgIdx) => {
                  const wide = n === 1 || (n === 3 && imgIdx === 0);
                  return (
                    <li
                      key={imgSrc}
                      className={wide ? "col-span-2" : undefined}
                    >
                      <button
                        type="button"
                        onClick={(e) => openLightbox(event.images, imgIdx, event.name, e.currentTarget)}
                        aria-label={`Open ${event.name} photo ${imgIdx + 1} of ${n}`}
                        data-rv="clip"
                        style={{ ["--d" as string]: `${imgIdx * 90}ms` } as React.CSSProperties}
                        className={`group relative block w-full overflow-hidden rounded-[var(--r-m)] bg-paper-2 ${
                          wide ? "aspect-[16/10]" : "aspect-[4/3]"
                        }`}
                      >
                        <Image
                          src={imgSrc}
                          alt={`${event.name} photo ${imgIdx + 1}`}
                          fill
                          sizes={wide ? "(min-width: 1024px) 58vw, 100vw" : "(min-width: 1024px) 29vw, 50vw"}
                          className="object-cover object-center transition-transform duration-[900ms] ease-[cubic-bezier(0.23,1,0.32,1)] motion-safe:group-hover:scale-[1.035]"
                        />
                        <span
                          aria-hidden
                          className="absolute bottom-3 right-3 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-ink opacity-100 shadow-[0_8px_20px_-8px_rgb(11_21_38/0.5)] transition-[opacity,scale] duration-200 [@media(hover:hover)]:opacity-0 [@media(hover:hover)]:group-hover:opacity-100 [@media(hover:hover)]:group-focus-visible:opacity-100"
                        >
                          <Maximize2 className="h-4 w-4" strokeWidth={1.8} />
                        </span>
                      </button>
                    </li>
                  );
                })}
              </ul>
            </article>
          );
        })}
      </section>

      {/* LIGHTBOX MODAL OVERLAY */}
      <AnimatePresence>
        {lightbox.isOpen && (
          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={`${lightbox.eventName} photos`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2, ease: [0.23, 1, 0.32, 1] }}
            onClick={closeLightbox}
            onTouchStart={onTouchStart}
            onTouchEnd={onTouchEnd}
            className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-ink/95 px-4 py-8 backdrop-blur-md"
          >
            {/* Close button */}
            <button
              ref={closeBtnRef}
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                closeLightbox();
              }}
              className="absolute right-4 top-4 flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white shadow-[inset_0_0_0_1px_rgb(255_255_255/0.14)] transition-[background-color,scale] duration-150 hover:bg-white/20 active:scale-95 sm:right-6 sm:top-6"
              aria-label="Close lightbox"
            >
              <X className="h-5 w-5" aria-hidden />
            </button>

            {/* Lightbox content wrapper */}
            <div className="relative flex aspect-[4/3] max-h-[75vh] w-full max-w-5xl items-center justify-center">
              {/* Previous Button */}
              {lightbox.images.length > 1 && (
                <button
                  type="button"
                  onClick={prevImage}
                  className="absolute left-2 z-10 flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white shadow-[inset_0_0_0_1px_rgb(255_255_255/0.14)] transition-[background-color,scale] duration-150 hover:bg-white/20 active:scale-95 sm:left-4"
                  aria-label="Previous image"
                >
                  <ChevronLeft className="h-6 w-6" aria-hidden />
                </button>
              )}

              {/* Central Image */}
              <motion.div
                key={lightbox.images[lightbox.index]}
                initial={{ opacity: 0, scale: 0.97 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.97 }}
                transition={{ duration: 0.22, ease: [0.23, 1, 0.32, 1] }}
                className="relative flex h-full w-full items-center justify-center"
                onClick={(e) => e.stopPropagation()} // Prevent closing when clicking the image
              >
                <Image
                  src={lightbox.images[lightbox.index]}
                  alt={`${lightbox.eventName} fullscreen view`}
                  fill
                  sizes="(min-width: 1024px) 1024px, 100vw"
                  className="rounded-[var(--r-m)] object-contain shadow-2xl"
                />
              </motion.div>

              {/* Next Button */}
              {lightbox.images.length > 1 && (
                <button
                  type="button"
                  onClick={nextImage}
                  className="absolute right-2 z-10 flex h-12 w-12 items-center justify-center rounded-full bg-white/10 text-white shadow-[inset_0_0_0_1px_rgb(255_255_255/0.14)] transition-[background-color,scale] duration-150 hover:bg-white/20 active:scale-95 sm:right-4"
                  aria-label="Next image"
                >
                  <ChevronRight className="h-6 w-6" aria-hidden />
                </button>
              )}
            </div>

            {/* Caption & Counter */}
            <div className="mt-6 space-y-2 text-center">
              <p className="text-lg font-medium text-white">{lightbox.eventName}</p>
              {lightbox.images.length > 1 && (
                <p className="tnum text-xs font-semibold uppercase tracking-wider text-white/50" aria-live="polite">
                  Image {lightbox.index + 1} of {lightbox.images.length}
                </p>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
