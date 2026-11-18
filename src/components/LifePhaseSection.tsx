import Image from "next/image";
import RevealText from "@/components/ui/RevealText";

const PHASES = [
  {
    title: "Salaried Professionals",
    category: "Wealth Creation",
    categoryColor: "#0066FF",
    desc: "Optimization strategies for tax planning, wealth creation, and retirement mapping for high-earning experts.",
    bullets: [
      "Monthly Investment & Tax Planning",
      "Goal-Based & Retirement Planning",
      "Insurance & Risk Management",
    ],
    image: "/salaried-professionals.png",
    imagePosition: "object-center",
  },
  {
    title: "Business Owners & Entrepreneurs",
    category: "Asset Protection",
    categoryColor: "#00B2FF",
    desc: "Integrated cash flow management and robust protection plans to separate personal wealth from business risk.",
    bullets: [
      "Separating Personal & Business Finances",
      "Wealth Creation Outside the Business",
      "Emergency Funds for Business",
    ],
    image: "/business-owners.jpeg",
    imagePosition: "object-top",
  },
  {
    title: "Non-Resident Indians (NRIs)",
    category: "Global Mobility",
    categoryColor: "#0066FF",
    desc: "Seamless cross-border planning, NRE/NRO account optimization, and Indian market exposure management.",
    bullets: [
      "India-Focused Investment Planning",
      "Repatriation & Investment Structuring",
      "Managing Indian Assets Efficiently",
    ],
    image: "/nris.png",
    imagePosition: "object-center",
  },
  {
    title: "Modern Families",
    category: "Legacy Building",
    categoryColor: "#00B2FF",
    desc: "Comprehensive insurance layering and estate planning to ensure smooth wealth transition for the next generation.",
    bullets: [
      "Estate & Succession Planning",
      "Family Financial Literacy",
      "Multi-Generational Wealth Planning",
    ],
    image: "/modern-families.png",
    imagePosition: "object-center",
  },
];

/**
 * Who We Serve — each audience is a whole photograph (shown at its natural 3:2 proportions, never sliced
 * into a narrow strip), set with depth: a tinted plate behind it, a deep soft shadow, and a white plate
 * with the details overlapping its lower edge. The second column sits lower for rhythm.
 */
export default function LifePhaseSection() {
  return (
    <section className="sec relative overflow-hidden bg-white" aria-labelledby="serve-title">
      {/* a soft blue wash behind the grid so the shadows have something to fall on */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 bottom-0 top-[30%] bg-[linear-gradient(180deg,transparent,rgb(233_241_255/0.7)_35%,transparent)]"
      />
      <div className="wrap relative">
        <div className="grid items-end gap-6 lg:grid-cols-12 lg:gap-16">
          <RevealText
            as="h2"
            id="serve-title"
            className="text-balance text-[clamp(2.1rem,3.8vw,3.2rem)] font-semibold leading-[1.08] tracking-[-0.03em] lg:col-span-7"
            parts={["Who We Serve?"]}
          />
          <p className="t-lead !text-[clamp(1.05rem,1.3vw,1.2rem)] lg:col-span-5" data-rv="up">
            We specialize in solving the complex financial challenges of high-achieving individuals and families.
          </p>
        </div>

        <ul className="mt-14 grid gap-x-10 gap-y-16 md:grid-cols-2 lg:mt-20 lg:gap-x-14 lg:gap-y-20">
          {PHASES.map((phase, i) => (
            <li
              key={phase.title}
              data-rv="up"
              style={{ ["--d" as string]: `${(i % 2) * 120}ms` } as React.CSSProperties}
              className={`group ${i % 2 === 1 ? "md:mt-20" : ""}`}
            >
              <div className="relative">
                {/* the plate peeking out behind the photograph */}
                <span
                  aria-hidden
                  className={`absolute inset-0 rounded-[var(--r-l)] bg-[linear-gradient(135deg,rgb(0_102_255/0.2),rgb(0_178_255/0.12))] transition-transform duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] ${
                    i % 2 === 0
                      ? "translate-x-3.5 translate-y-3.5 rotate-[1.4deg] group-hover:translate-x-5 group-hover:translate-y-5"
                      : "-translate-x-3.5 translate-y-3.5 -rotate-[1.4deg] group-hover:-translate-x-5 group-hover:translate-y-5"
                  }`}
                />
                {/* the photograph: whole, 3:2, lit from above */}
                <div className="relative aspect-[3/2] overflow-hidden rounded-[var(--r-l)] bg-paper-2 shadow-[0_50px_70px_-34px_rgb(0_40_120/0.5),0_18px_30px_-18px_rgb(11_21_38/0.35),0_0_0_1px_rgb(11_21_38/0.06)]">
                  <Image
                    src={phase.image}
                    alt={phase.title}
                    fill
                    sizes="(min-width: 1024px) 560px, (min-width: 768px) 45vw, 100vw"
                    className={`object-cover ${phase.imagePosition} transition-transform duration-[1200ms] ease-[cubic-bezier(0.23,1,0.32,1)] motion-safe:group-hover:scale-[1.035]`}
                  />
                  {/* depth: a light edge and a soft sheen, not a dark wash */}
                  <div
                    aria-hidden
                    className="pointer-events-none absolute inset-0 rounded-[inherit] bg-[linear-gradient(160deg,rgb(255_255_255/0.22),transparent_38%)] shadow-[inset_0_1px_0_rgb(255_255_255/0.5),inset_0_-60px_80px_-60px_rgb(0_20_60/0.25)]"
                  />
                  <span
                    aria-hidden
                    className="tnum absolute left-5 top-5 flex h-10 w-10 items-center justify-center rounded-full bg-white/95 font-mono text-[0.85rem] font-semibold text-fin shadow-[0_8px_20px_-8px_rgb(0_0_0/0.4)]"
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>

                {/* the details: a white plate overlapping the photograph's lower edge */}
                <div
                  className={`relative z-10 -mt-12 rounded-[var(--r-m)] bg-white p-7 shadow-[0_30px_50px_-24px_rgb(0_40_120/0.45),0_0_0_1px_rgb(11_21_38/0.05)] transition-transform duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] motion-safe:group-hover:-translate-y-1.5 sm:p-8 ${
                    i % 2 === 0 ? "mr-6 sm:mr-12" : "ml-6 sm:ml-12"
                  }`}
                >
                  <h3 className="text-balance text-[1.5rem] font-semibold leading-[1.15] tracking-[-0.028em] text-ink sm:text-[1.65rem]">
                    {phase.title}
                  </h3>
                  <ul className="mt-5 grid gap-3 border-t border-hair pt-5">
                    {phase.bullets.map((bullet) => (
                      <li key={bullet} className="flex items-start gap-3 text-[1.05rem] font-medium leading-snug text-ink/80">
                        <svg className="mt-[3px] h-5 w-5 shrink-0" viewBox="0 0 20 20" fill="none" aria-hidden>
                          <circle cx="10" cy="10" r="10" fill={phase.categoryColor} fillOpacity="0.13" />
                          <path
                            d="M6.5 10.5L8.5 12.5L13.5 7.5"
                            stroke={phase.categoryColor}
                            strokeWidth="1.7"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                        <span>{bullet}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
