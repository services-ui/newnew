import RevealText from "@/components/ui/RevealText";
import { CtaLink } from "@/components/ui/cta";

export function ServicesHero() {
  return (
    <section aria-labelledby="services-hero-title" className="relative overflow-hidden bg-white pb-[clamp(40px,6vw,80px)] pt-[8.5rem] md:pt-44">
      {/* a soft light in the corner (a plain radial gradient — no blur filter to re-render while scrolling) */}
      <div
        aria-hidden
        className="pointer-events-none absolute -right-[15%] -top-[30%] h-[80%] w-[55%]"
        style={{ background: "radial-gradient(closest-side, rgb(0 140 255 / 0.13), transparent)" }}
      />
      <div className="wrap relative">
        <div className="grid items-end gap-10 lg:grid-cols-12 lg:gap-12">
          <RevealText
            as="h1"
            id="services-hero-title"
            on="load"
            delay={100}
            className="t-display uppercase tracking-[-0.02em] lg:col-span-7"
            parts={["OUR SERVICES"]}
          />
          <div className="lg:col-span-4">
            <p className="t-lead" data-rv-load-up style={{ ["--d" as string]: "600ms" } as React.CSSProperties}>
              Strategic financial planning and long-term wealth creation designed for modern families, professionals, and business owners.
            </p>
            <div className="mt-8" data-rv-load-up style={{ ["--d" as string]: "750ms" } as React.CSSProperties}>
              <CtaLink href="/contact" arrow>
                Get Started
              </CtaLink>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
