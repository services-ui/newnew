import HeroMedia from "@/components/HeroMedia";
import RevealText from "@/components/ui/RevealText";
import { CtaLink } from "@/components/ui/cta";
import EcosystemSection from "@/components/EcosystemSection";
import ProcessSection from "@/components/ProcessSection";
import Testimonials from "@/components/Testimonials";
import WhyUsOrbital from "@/components/ui/WhyUsOrbital";
import FoundersDesk from "@/components/FoundersDesk";
import LifePhaseSection from "@/components/LifePhaseSection";
import FinalCTA from "@/components/FinalCTA";
import StatsBanner from "@/components/StatsBanner";

export default function Home() {
  return (
    <main id="main" className="bg-white text-ink">
      <section
        aria-labelledby="hero-title"
        className="relative isolate overflow-hidden bg-white [--hero-lap:5.5rem] md:[--hero-lap:6.5rem]"
      >
        <HeroMedia />

        <div className="wrap pointer-events-none relative z-10 flex min-h-[100svh] flex-col justify-start pb-[calc(var(--hero-lap)+3rem)] pt-[7.5rem] md:justify-center md:pt-28">
          <div className="pointer-events-auto max-w-[36rem]">
            <RevealText
              as="h1"
              id="hero-title"
              on="load"
              delay={150}
              className="t-display max-w-[9.6em]"
              parts={[
                "Let's Build Your ",
                { t: "Fitter Financial", className: "grad" },
                " ",
                { t: "Future", className: "grad" },
                " Together.",
              ]}
            />

            <p
              data-rv-load-up
              style={{ ["--d" as string]: "700ms" } as React.CSSProperties}
              className="t-lead mt-5 max-w-[26rem] md:mt-6"
            >
              Turning ambitions into achievements through personalized financial guidance and trusted expertise.
            </p>

            <div
              data-rv-load-up
              style={{ ["--d" as string]: "850ms" } as React.CSSProperties}
              className="mt-7 md:mt-8"
            >
              <CtaLink href="/contact" arrow>
                Talk to Advisor
              </CtaLink>
            </div>
          </div>
        </div>
      </section>

      <StatsBanner />
      <EcosystemSection />
      <ProcessSection />
      <WhyUsOrbital />
      <FoundersDesk />
      <LifePhaseSection />
      <Testimonials />
      <FinalCTA />
    </main>
  );
}
