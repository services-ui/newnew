"use client";

import { useEffect, useRef, useState } from "react";
import { Pause, Play } from "lucide-react";
import { gsap, ScrollTrigger, MQ, useGSAP } from "@/lib/gsap";
import { useHydrated, useMedia } from "@/lib/useMedia";

/**
 * Hero background. The poster (frame 0 of the video) paints immediately; the video
 * only streams in on the matching breakpoint, fades over it, and rests for users who
 * prefer reduced motion. Slow parallax on scroll; a visible pause control for the loop.
 */
export default function HeroMedia() {
  const rootRef = useRef<HTMLDivElement>(null);
  const layerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [ready, setReady] = useState(false);
  const [paused, setPaused] = useState(false);

  // exactly one source for this viewport (never download both); none for reduced motion; none until hydrated
  const hydrated = useHydrated();
  const reduce = useMedia(MQ.reduce);
  const wide = useMedia("(min-width: 768px)");
  const src = hydrated && !reduce ? (wide ? "/hero-video.mp4" : "/hero-video-mobile.mp4") : null;

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MQ.motionOk, () => {
        // entrance: the poster settles in from a slight zoom
        gsap.fromTo(layerRef.current, { scale: 1.06 }, { scale: 1, duration: 2.2, ease: "expo.out" });
        // parallax: the film drifts slower than the page
        gsap.to(layerRef.current, {
          yPercent: 9,
          ease: "none",
          scrollTrigger: { trigger: rootRef.current, start: "top top", end: "bottom top", scrub: true },
        });
      });
      return () => mm.revert();
    },
    { scope: rootRef },
  );

  // pause when scrolled out of view (saves battery), resume when back — unless the user paused it
  useEffect(() => {
    const v = videoRef.current;
    if (!v || !src) return;
    const st = ScrollTrigger.create({
      trigger: rootRef.current,
      start: "top bottom",
      end: "bottom top",
      onToggle: (self) => {
        if (self.isActive) {
          if (!paused) v.play().catch(() => {});
        } else v.pause();
      },
    });
    return () => st.kill();
  }, [src, paused]);

  const toggle = () => {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) {
      v.play().catch(() => {});
      setPaused(false);
    } else {
      v.pause();
      setPaused(true);
    }
  };

  return (
    <div ref={rootRef} className="absolute inset-0 z-0 overflow-hidden" aria-hidden={!src}>
      {/* mobile: the film sits in the lower part so the headline has clean paper above it */}
      <div
        ref={layerRef}
        className="absolute inset-x-0 bottom-0 top-[34%] will-change-transform md:inset-0 md:top-0"
      >
        <picture>
          <source media="(min-width: 768px)" srcSet="/hero-poster-desktop.jpg" />
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="/hero-poster-mobile.jpg"
            alt=""
            fetchPriority="high"
            decoding="async"
            className="absolute inset-0 h-full w-full object-cover object-[50%_58%] md:object-right"
          />
        </picture>
        {src && (
          <video
            key={src}
            ref={videoRef}
            src={src}
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            onPlaying={() => setReady(true)}
            className={`absolute inset-0 h-full w-full object-cover object-[50%_58%] transition-opacity duration-700 md:object-right ${
              ready ? "opacity-100" : "opacity-0"
            }`}
          />
        )}
      </div>

      {/* legibility wash behind the headline — paper to clear, never over the subject */}
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(90deg,#fff_0%,rgb(255_255_255/0.92)_28%,rgb(255_255_255/0.45)_48%,transparent_66%)] max-md:bg-[linear-gradient(180deg,#fff_0%,rgb(255_255_255/0.9)_34%,transparent_56%)]" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40 bg-gradient-to-t from-white to-transparent md:h-28" />

      {src && (
        <button
          type="button"
          onClick={toggle}
          aria-label={paused ? "Play background video" : "Pause background video"}
          className="pointer-events-auto absolute bottom-[calc(var(--hero-lap,7rem)+1rem)] right-[var(--gutter)] z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white/85 text-ink shadow-[0_0_0_1px_rgb(11_21_38/0.1),0_8px_20px_-10px_rgb(11_21_38/0.4)] backdrop-blur transition-transform duration-150 active:scale-95"
        >
          {paused ? <Play className="h-4 w-4 translate-x-[1px]" aria-hidden /> : <Pause className="h-4 w-4" aria-hidden />}
        </button>
      )}
    </div>
  );
}
