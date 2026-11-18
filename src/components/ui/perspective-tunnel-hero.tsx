"use client";

import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
  useMotionValue,
  useSpring,
  type MotionValue,
} from "framer-motion";
import Image from "next/image";
import { useEffect, useMemo, useRef } from "react";
import { useHydrated, useMedia, useViewport } from "@/lib/useMedia";

/**
 * Perspective tunnel hero — adapted from the 21st.dev component.
 * What changed for this site:
 *  - driven by the page's own scroll (sticky stage inside a tall track) instead of preventDefault on the
 *    wheel, so the page is never trapped and touch/keyboard/scrollbar all work;
 *  - real event photographs (optimised) and the real event names as captions;
 *  - brand-blue palette, one light theme;
 *  - pointer parallax only for fine pointers; a calm static grid under prefers-reduced-motion.
 */

export interface TunnelImage {
  src: string;
  title: string;
}

interface TunnelCardData {
  item: TunnelImage;
  angleCos: number;
  angleSin: number;
  radiusFactorX: number;
  radiusFactorY: number;
  rotationZ: number;
  index: number;
}

function buildCards(images: TunnelImage[]): TunnelCardData[] {
  return images.map((item, i) => {
    const goldenAngle = i * 137.5 * (Math.PI / 180);
    return {
      item,
      angleCos: Math.cos(goldenAngle),
      angleSin: Math.sin(goldenAngle),
      radiusFactorX: 0.28 + (i % 3) * 0.08,
      radiusFactorY: 0.26 + (i % 2) * 0.09,
      rotationZ: (i % 2 === 0 ? 1 : -1) * (3 + (i % 5) * 2),
      index: i,
    };
  });
}

const SPRING_CONFIG = { stiffness: 60, damping: 25, mass: 0.5 };

interface StageDimensions {
  width: number;
  height: number;
  isMobile: boolean;
}

function useCameraParallax(enabled: boolean) {
  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const x = useSpring(rawX, SPRING_CONFIG);
  const y = useSpring(rawY, SPRING_CONFIG);

  useEffect(() => {
    if (!enabled) return;
    const onMove = (e: PointerEvent) => {
      rawX.set((e.clientX / window.innerWidth - 0.5) * 2);
      rawY.set((e.clientY / window.innerHeight - 0.5) * 2);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [enabled, rawX, rawY]);

  return { x, y };
}

interface TunnelCardProps {
  card: TunnelCardData;
  progress: MotionValue<number>;
  pointer: { x: MotionValue<number>; y: MotionValue<number> };
  total: number;
  stage: StageDimensions;
}

function TunnelCard({ card, progress, pointer, total, stage }: TunnelCardProps) {
  const staggerSpan = 0.55;
  const start = (card.index / total) * (1 - staggerSpan);
  const end = start + staggerSpan;

  const localProgress = useTransform(progress, [start, end], [0, 1]);

  const farZ = stage.isMobile ? -1200 : -1700;
  const nearZ = stage.isMobile ? 350 : 500;
  const z = useTransform(localProgress, [0, 1], [farZ, nearZ]);
  const opacity = useTransform(localProgress, [0, 0.18, 0.82, 0.98], [0, 1, 1, 0]);

  const cardWidth = stage.isMobile
    ? Math.max(130, Math.min(180, stage.width * 0.38))
    : Math.max(180, Math.min(270, stage.width * 0.18));

  const baseX = card.angleCos * (stage.width * card.radiusFactorX);
  const baseY = card.angleSin * (stage.height * card.radiusFactorY);
  const panStrength = stage.isMobile ? 20 : 45;

  const transform = useTransform([z, pointer.x, pointer.y], ([currZ, px, py]: number[]) => {
    const offsetX = baseX - px * panStrength;
    const offsetY = baseY - py * panStrength;
    return `translate3d(calc(-50% + ${offsetX}px), calc(-50% + ${offsetY}px), ${currZ}px) rotateZ(${card.rotationZ}deg)`;
  });

  return (
    <motion.div
      style={{ width: cardWidth, transform, opacity, zIndex: card.index + 1 }}
      className="absolute left-1/2 top-1/2 aspect-[4/5] select-none will-change-transform"
    >
      <figure className="relative h-full w-full overflow-hidden rounded-[var(--r-m)] bg-paper-2 shadow-[0_30px_60px_-24px_rgb(11_21_38/0.5)] ring-1 ring-black/10">
        <Image
          src={card.item.src}
          alt={card.item.title}
          fill
          sizes={stage.isMobile ? "180px" : "270px"}
          draggable={false}
          className="object-cover"
        />
        <figcaption className="absolute inset-0 flex items-end bg-gradient-to-t from-ink/80 via-ink/5 to-transparent p-4">
          <span className="font-mono text-[0.62rem] uppercase leading-snug tracking-[0.16em] text-white/95 sm:text-[0.68rem]">
            {card.item.title}
          </span>
        </figcaption>
      </figure>
    </motion.div>
  );
}

interface Props {
  images: TunnelImage[];
  /** The hero copy sits at the centre of the tunnel. */
  children: React.ReactNode;
  className?: string;
}

export default function PerspectiveTunnelHero({ images, children, className }: Props) {
  const trackRef = useRef<HTMLDivElement>(null);
  const prefersReduced = useReducedMotion();
  const hydrated = useHydrated();
  const reduce = hydrated && !!prefersReduced;
  const cards = useMemo(() => buildCards(images), [images]);

  const { width, height } = useViewport();
  const stage: StageDimensions = { width, height, isMobile: width < 768 };
  const finePointer = useMedia("(hover: hover) and (pointer: fine)");

  // The page's own scroll across the track drives the flight — nothing is intercepted.
  const { scrollYProgress } = useScroll({ target: trackRef, offset: ["start start", "end end"] });
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 80, damping: 30, restDelta: 0.0001 });

  const pointer = useCameraParallax(!reduce && finePointer);

  const titleScale = useTransform(smoothProgress, [0, 0.55, 1], [0.94, 1, 1.22]);
  const titleOpacity = useTransform(smoothProgress, [0, 0.82, 0.97], [1, 1, 0]);
  const cueOpacity = useTransform(smoothProgress, [0, 0.1], [1, 0]);

  return (
    <section
      ref={trackRef}
      className={`relative bg-paper ${reduce ? "pb-16 pt-36" : "h-[330svh]"} ${className ?? ""}`}
    >
      {reduce ? (
        // Reduced motion: no tunnel — the copy, then the photographs as a calm grid.
        <div className="wrap">
          <div className="mx-auto flex max-w-3xl flex-col items-center px-6 text-center">{children}</div>
          <ul className="mt-14 grid grid-cols-2 gap-4 md:grid-cols-3">
            {images.slice(0, 6).map((img) => (
              <li key={img.src} className="relative aspect-[4/5] overflow-hidden rounded-[var(--r-m)] bg-paper-2">
                <Image src={img.src} alt={img.title} fill sizes="(min-width: 768px) 30vw, 46vw" className="object-cover" />
              </li>
            ))}
          </ul>
        </div>
      ) : (
        <div
          className="sticky top-0 flex h-[100svh] w-full items-center justify-center overflow-hidden"
          style={{ perspective: stage.isMobile ? "900px" : "1200px", transformStyle: "preserve-3d" }}
        >
          {/* depth: a fine dot field and one cool light */}
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 opacity-60 [background-image:radial-gradient(rgb(11_21_38/0.16)_1px,transparent_1px)] [background-size:28px_28px] [mask-image:radial-gradient(ellipse_70%_70%_at_50%_50%,#000_55%,transparent_100%)]"
          />
          <div
            aria-hidden
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_center,rgb(0_102_255/0.13)_0%,transparent_70%)]"
          />
          <div aria-hidden className="pointer-events-none absolute h-[48vmin] w-[48vmin] rounded-full border border-fin/15" />
          <div aria-hidden className="pointer-events-none absolute h-[76vmin] w-[76vmin] rounded-full border border-dashed border-ink/15" />

          {/* centre: the page's real hero copy */}
          <motion.div
            style={{ scale: titleScale, opacity: titleOpacity }}
            className="relative z-0 flex max-w-2xl flex-col items-center px-6 text-center"
          >
            {children}
          </motion.div>

          {/* scroll cue — a line, no words */}
          <motion.div
            aria-hidden
            style={{ opacity: cueOpacity }}
            className="pointer-events-none absolute bottom-8 z-20 flex flex-col items-center gap-2"
          >
            <span className="h-10 w-px origin-top bg-gradient-to-b from-fin to-transparent motion-safe:animate-[tunnelcue_1.8s_ease-in-out_infinite]" />
          </motion.div>

          {/* z-space */}
          <div className="pointer-events-none absolute inset-0" style={{ transformStyle: "preserve-3d" }} aria-hidden>
            {cards.map((card) => (
              <TunnelCard
                key={card.item.src}
                card={card}
                progress={smoothProgress}
                pointer={pointer}
                total={cards.length}
                stage={stage}
              />
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
