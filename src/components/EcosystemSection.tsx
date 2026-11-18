import RevealText from "@/components/ui/RevealText";
import ServiceFeature from "@/components/ui/service-feature";

/**
 * "A Complete Financial Ecosystem" — a compact header, then the six services as a feature block:
 * each card carries a small live, interactive picture (drawn in SVG/CSS, no images) and links to its section.
 */
export default function EcosystemSection() {
  return (
    <section id="services" className="sec-tight relative overflow-hidden bg-paper" aria-labelledby="services-title">
      <div className="wrap relative">
        <div className="grid items-end gap-4 lg:grid-cols-12 lg:gap-12">
          <h2 id="services-title" className="lg:col-span-8">
            <span className="eyebrow">Our Services</span>
            <RevealText
              as="span"
              className="mt-4 block text-balance text-[clamp(1.75rem,2.8vw,2.4rem)] font-semibold leading-[1.12] tracking-[-0.03em]"
              parts={["A Complete Financial Ecosystem"]}
            />
          </h2>
          <p className="t-body !text-[1.02rem] lg:col-span-4 lg:pb-1" data-rv="up">
            Everything you need to manage, grow, and protect your wealth.
          </p>
        </div>

        <div className="mt-8 lg:mt-10">
          <ServiceFeature />
        </div>
      </div>
    </section>
  );
}
