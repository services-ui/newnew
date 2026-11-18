import Image from "next/image";
import type { LucideIcon } from "lucide-react";

export type ServiceFeature = { text: string; icon: LucideIcon };

type Props = {
  id: string;
  /** 1-based position among the six chapters (decorative index). */
  n: number;
  title: string;
  question: string;
  intro: string;
  helpIntro: string;
  features: ServiceFeature[];
  image: string;
  imageAlt: string;
  /** Which side the illustration sits on at desktop widths. */
  side?: "left" | "right";
  tone?: "white" | "paper";
  /** Accent for the illustration glow and icon chips (brand-blue family only). */
  accent?: string;
};

/**
 * One service "chapter". All six share this structure, but alternate side and ground so the page has a
 * rhythm instead of one template stamped six times. The illustration is sticky on desktop: it stays
 * with you while you read the long column beside it.
 */
export function ServiceChapter({
  id,
  n,
  title,
  question,
  intro,
  helpIntro,
  features,
  image,
  imageAlt,
  side = "right",
  tone = "white",
  accent = "#0066FF",
}: Props) {
  const left = side === "left";
  return (
    <section id={id} aria-labelledby={`${id}-title`} className={`sec relative ${tone === "paper" ? "bg-paper" : "bg-white"}`}>
      <div className="wrap grid items-start gap-12 lg:grid-cols-12 lg:gap-16">
        {/* copy */}
        <div className={`lg:col-span-7 ${left ? "lg:order-2 lg:col-start-6" : ""}`}>
          <p aria-hidden className="tnum font-mono text-[0.75rem] tracking-[0.18em] text-ink/40">
            {String(n).padStart(2, "0")} <span className="text-ink/20">/ 06</span>
          </p>
          <h2 id={`${id}-title`} className="t-h1 mt-5" data-rv="up">
            {title}
          </h2>
          <h3 className="eyebrow mt-7" data-rv="up" style={{ ["--d" as string]: "60ms", color: accent } as React.CSSProperties}>
            {question}
          </h3>
          <p className="t-lead mt-5 max-w-[38rem] !text-ink/75" data-rv="up" style={{ ["--d" as string]: "100ms" } as React.CSSProperties}>
            {intro}
          </p>

          <div className="mt-12 border-t border-ink pt-8" data-rv="up">
            <h4 className="text-[1.35rem] font-semibold tracking-[-0.03em] text-ink">How We Help</h4>
            <p className="t-small mt-2 max-w-[34rem]">{helpIntro}</p>

            <ul className="mt-8 grid gap-x-10 sm:grid-cols-2">
              {features.map((f) => (
                <li key={f.text} className="flex items-start gap-4 border-b border-hair py-5">
                  <span
                    aria-hidden
                    className="mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-full"
                    style={{ background: `${accent}14`, color: accent }}
                  >
                    <f.icon className="h-[18px] w-[18px]" strokeWidth={1.7} />
                  </span>
                  <span className="text-[0.95rem] font-medium leading-[1.4] tracking-[-0.01em] text-ink">{f.text}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* illustration — sticks while the copy scrolls */}
        <div className={`lg:sticky lg:top-28 lg:col-span-5 ${left ? "lg:order-1 lg:col-start-1" : ""}`} data-rv="clip">
          <div className="relative mx-auto aspect-[4/5] w-full max-w-[28rem] overflow-hidden rounded-[var(--r-l)] bg-white shadow-[var(--shadow-card)] lg:max-w-none">
            <div
              aria-hidden
              className="absolute inset-[14%] rounded-full blur-3xl"
              style={{ background: `radial-gradient(closest-side, ${accent}30, transparent)` }}
            />
            <Image
              src={image}
              alt={imageAlt}
              fill
              sizes="(min-width: 1024px) 40vw, 90vw"
              className="relative scale-[1.22] object-contain"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
