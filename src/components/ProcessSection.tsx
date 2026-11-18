import { Check } from "lucide-react";
import RevealText from "@/components/ui/RevealText";

const PROCESS_PHASES = [
  {
    id: "process-1",
    num: "01",
    title: "Understand You",
    description:
      "We take time to understand your goals, lifestyle, income, and financial aspirations to build a strong foundation.",
  },
  {
    id: "process-2",
    num: "02",
    title: "Create a Plan",
    description:
      "We design a personalized financial roadmap balancing growth, protection, and long-term stability.",
  },
  {
    id: "process-3",
    num: "03",
    title: "Execute Strategy",
    description:
      "We implement the right investment, insurance, and financial solutions with full transparency.",
  },
  {
    id: "process-4",
    num: "04",
    title: "Review & Optimize",
    description:
      "We continuously monitor, review, and adjust your plan to keep you aligned with your goals.",
  },
  {
    id: "process-5",
    num: "05",
    title: "Achieve Your Goals",
    description:
      "Whether it's financial independence, retirement, your child's education, or legacy creation—we help you reach your goals with customized planning.",
  },
];

// Desktop geometry (px): the wave is 120px tall; milestones alternate between two heights along it.
const UP = 24;
const DOWN = 96;
const NODE = 56;

/**
 * The process as a journey: a winding line that draws itself, five milestones strung along it.
 * One list for every screen size — a horizontal wave on desktop, a vertical path on phones.
 * No pinning, no scroll-linked animation: it simply arrives.
 */
export default function ProcessSection() {
  return (
    <section id="process" className="sec relative overflow-hidden bg-white" aria-labelledby="process-title">
      <div className="wrap">
        <div className="mx-auto max-w-[48rem] text-center">
          <h2 id="process-title">
            <span className="eyebrow">Our Process</span>
            <RevealText
              as="span"
              className="mt-6 block text-balance text-[clamp(2.2rem,4vw,3.4rem)] font-semibold leading-[1.08] tracking-[-0.032em]"
              parts={["Planning your ", { t: "financial", className: "grad" }, " journey"]}
            />
          </h2>
          <p className="t-lead mx-auto mt-6 max-w-[36rem] !text-[clamp(1.05rem,1.3vw,1.2rem)]" data-rv="up">
            We engage in meaningful conversations to grasp your goals and build a foundation for everything that follows.
          </p>
        </div>

        <div className="relative mt-16 lg:mt-24">
          {/* desktop: the winding line the milestones sit on */}
          <svg
            aria-hidden
            viewBox="0 0 1000 120"
            preserveAspectRatio="none"
            className="pointer-events-none absolute left-0 top-0 hidden h-[120px] w-full overflow-visible lg:block"
          >
            <path
              d={`M0 ${UP} L100 ${UP} C200 ${UP} 200 ${DOWN} 300 ${DOWN} C400 ${DOWN} 400 ${UP} 500 ${UP} C600 ${UP} 600 ${DOWN} 700 ${DOWN} C800 ${DOWN} 800 ${UP} 900 ${UP} L1000 ${UP}`}
              fill="none"
              stroke="rgb(0 102 255 / 0.38)"
              strokeWidth="2"
              strokeLinecap="round"
              pathLength={1}
              vectorEffect="non-scaling-stroke"
              data-rv="path"
            />
          </svg>

          {/* phones: a vertical path */}
          <span
            aria-hidden
            data-rv="vline"
            className="absolute bottom-10 left-6 top-6 w-0.5 -translate-x-1/2 rounded-full bg-fin/35 lg:hidden"
          />

          <ol className="relative grid lg:grid-cols-5">
            {PROCESS_PHASES.map((phase, i) => {
              const down = i % 2 === 1;
              const last = i === PROCESS_PHASES.length - 1;
              return (
                <li
                  key={phase.id}
                  data-rv="up"
                  style={
                    {
                      ["--d" as string]: `${300 + i * 150}ms`,
                      ["--pt" as string]: `${(down ? DOWN : UP) + NODE / 2 + 26}px`,
                    } as React.CSSProperties
                  }
                  className="relative pb-12 pl-[4.5rem] last:pb-0 lg:px-5 lg:pb-0 lg:pl-5 lg:text-center lg:[padding-top:var(--pt)]"
                >
                  {/* the milestone */}
                  <span
                    aria-hidden
                    style={{ ["--ny" as string]: `${(down ? DOWN : UP) - NODE / 2}px` } as React.CSSProperties}
                    className={`tnum absolute left-0 top-0 flex h-12 w-12 items-center justify-center rounded-full font-mono text-[0.95rem] font-semibold shadow-[0_10px_24px_-10px_rgb(0_70_190/0.55)] lg:left-1/2 lg:h-14 lg:w-14 lg:-translate-x-1/2 lg:text-[1.05rem] lg:[top:var(--ny)] ${
                      last
                        ? "bg-[image:var(--fin-grad)] text-white"
                        : "bg-white text-fin shadow-[inset_0_0_0_2px_var(--fin),0_10px_24px_-10px_rgb(0_70_190/0.55)]"
                    }`}
                  >
                    {last ? <Check className="h-6 w-6" strokeWidth={2.6} /> : phase.num}
                  </span>

                  <h3 className="text-[1.35rem] font-semibold leading-snug tracking-[-0.025em] text-ink lg:text-[1.4rem]">
                    {phase.title}
                  </h3>
                  <p className="mt-3 text-[1.02rem] leading-[1.65] text-ink/65 lg:mx-auto lg:max-w-[17rem]">{phase.description}</p>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
}
