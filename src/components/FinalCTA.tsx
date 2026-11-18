import RevealText from "@/components/ui/RevealText";
import { CtaLink } from "@/components/ui/cta";

export default function FinalCTA() {
  return (
    <section className="bg-night on-dark grain relative isolate overflow-hidden" aria-labelledby="cta-title">
      {/* one low blue light, rising from the floor; hairline grid fades out above it */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-[85%]"
        style={{
          background:
            "radial-gradient(60% 80% at 50% 120%, rgb(0 102 255 / 0.55), transparent 70%), radial-gradient(30% 50% at 78% 110%, rgb(0 178 255 / 0.35), transparent 70%)",
        }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 opacity-[0.07] [mask-image:linear-gradient(to_bottom,transparent,black_40%,transparent)]"
        style={{
          backgroundImage:
            "linear-gradient(rgb(255 255 255 / 0.9) 1px, transparent 1px), linear-gradient(90deg, rgb(255 255 255 / 0.9) 1px, transparent 1px)",
          backgroundSize: "72px 72px",
        }}
      />

      <div className="wrap-narrow py-[clamp(72px,9vw,128px)] text-center">
        <h2 id="cta-title">
          <span className="eyebrow justify-center">Take The First Step</span>
          <RevealText
            as="span"
            className="t-h1 mt-6 block text-white"
            parts={["Ready to take control of your financial future?"]}
          />
        </h2>
        <p className="mx-auto mt-6 max-w-[30rem] text-[1.02rem] leading-[1.65] text-[var(--on-dark-soft)]" data-rv="up">
          Join thousands who have transformed their relationship with money. Your journey starts with a single conversation.
        </p>
        <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row" data-rv="up" style={{ ["--d" as string]: "120ms" } as React.CSSProperties}>
          <CtaLink href="/contact" variant="light" arrow>
            Get Started
          </CtaLink>
          <CtaLink href="/services" variant="ghost">
            Learn More
          </CtaLink>
        </div>
      </div>
    </section>
  );
}
