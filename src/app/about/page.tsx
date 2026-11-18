import Image from "next/image";
import { Mail, Phone } from "lucide-react";
import RevealText from "@/components/ui/RevealText";
import { CtaLink } from "@/components/ui/cta";
import ValuesSection from "@/components/ValuesSection";
import { TeamLanyardRail, type LanyardMember } from "@/components/ui/team-lanyard-rail";

const BELIEVE = [
  "Disciplined Financial Planning",
  "Long-Term Wealth Creation",
  "Goal-Oriented Strategies",
  "Transparent Communication",
  "Relationship-Focused Service",
  "Structured Financial Decision-Making",
];

const AVOID = [
  "Unrealistic Return Expectations",
  "Short-Term Speculation",
  "Product-Driven Recommendations",
  "One-Size-Fits-All Planning",
  "Misleading Financial Commitments",
];

const STATS = [
  { label: "Experience", value: "14+ Years", desc: "Of Market Expertise" },
  { label: "Client Impact", value: "400+", desc: "Families Catered" },
  { label: "Approach", value: "Client-Focused", desc: "Structured Planning" },
  { label: "Vision", value: "Long-Term", desc: "Wealth Guidance" },
];

const FOUNDERS = [
  {
    name: "Nitesh Luthra",
    role: "Founder",
    bio: "Qualified Certified Financial Planner and MBA (Finance) from SCMLD Pune. He has been educating and managing money for investors for 14 years. He covers investments, insurance, tax planning, goal planning and estate planning. He has taken 50+ sessions for companies like Hero and Summit Digital. His vision is to make people financially fit.",
    img: "/nitesh-luthra.jpeg",
  },
  {
    name: "Vaishali Choudhary",
    role: "Co-Founder",
    bio: "With over 6 years of experience in the financial services industry, Vaishali specializes in personal financial planning, client servicing, and operational management. She plays a key role in driving operations, client experience, and digital communication at Fintness Finserv Pvt. Ltd. Holding an MBA from Rajasthan University, her focus is on simplifying financial planning.",
    img: "/vaishali-choudhary.jpeg",
  },
];

const TEAM: LanyardMember[] = [
  {
    name: "Mehul Khandelwal",
    role: "Operations Head",
    bio: "Leads operations, process management, and client coordination, ensuring efficient workflows and a seamless client experience.",
    id: "mehul-khandelwal",
    image: "/mehul-khandelwal.jpeg",
    tone: 1,
  },
  {
    name: "Preksha Jain",
    role: "Insurance & Estate Planning Consultant",
    bio: "Focuses on insurance, estate planning, and financial protection solutions, while guiding clients on long-term financial products and policy planning.",
    id: "preksha-jain",
    image: "/preksha-jain.jpeg",
    imageClassName: "scale-x-[-1] object-[55%_center]",
    tone: 2,
  },
  {
    name: "Manish Sharma",
    role: "Certified Financial Planner & Portfolio Manager",
    bio: "Specializes in financial planning, investment advisory, and portfolio management, helping clients build disciplined, goal-based wealth strategies for long-term financial growth.",
    id: "manish-sharma",
    image: "/manish-sharma.jpeg",
    imageClassName: "object-[40%_30%]",
    tone: 3,
  },
  {
    name: "Vimla Parmanandani",
    role: "Service Relationship Manager",
    bio: "Handles client servicing and relationship support, ensuring smooth communication, timely assistance, and responsive query resolution.",
    id: "vimla-parmanandani",
    image: "/vimla-parmanandani.jpeg",
    tone: 4,
  },
];

export default function AboutPage() {
  return (
    <main id="main" className="w-full bg-white text-ink">
      {/* 1 — banner */}
      <section aria-labelledby="about-title" className="relative isolate overflow-hidden bg-ink">
        <div className="relative h-[clamp(26rem,68svh,46rem)]">
          <Image
            src="/about-us-hero.png"
            alt="Fintness Finserv Team"
            fill
            sizes="100vw"
            loading="eager"
            fetchPriority="high"
            className="object-cover object-[center_34%]"
          />
          <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-ink/90 via-ink/25 to-ink/10" />
          <div className="wrap relative flex h-full flex-col justify-end pb-10 md:pb-14">
            <RevealText
              as="h1"
              id="about-title"
              on="load"
              delay={120}
              className="t-display uppercase tracking-[-0.02em] text-white"
              parts={["About Us"]}
            />
          </div>
        </div>
      </section>

      {/* 2 — mission */}
      <section className="sec-tight" aria-labelledby="mission-title">
        <div className="wrap grid gap-10 lg:grid-cols-12 lg:gap-12">
          <h2 id="mission-title" className="lg:col-span-7">
            <span className="eyebrow">Our Mission</span>
            <RevealText as="span" className="t-h1 mt-6 block" parts={["Structured Planning for a Financially Fit Future"]} />
          </h2>
          <p className="t-lead self-end lg:col-span-4 lg:col-start-9" data-rv="up">
            Our mission is to help individuals and families become financially fit through disciplined planning, structured financial solutions, and long-term guidance.
          </p>
        </div>
      </section>

      {/* 3 — who we are */}
      <section className="sec-tight border-t border-hair" aria-labelledby="who-title">
        <div className="wrap grid gap-14 lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:gap-24">
          <div>
            <h2 id="who-title">
              <span className="eyebrow">Who We Are</span>
              <RevealText as="span" className="t-h2 mt-6 block" parts={["Simplifying Finance for Real-Life Goals"]} />
            </h2>
            <div className="mt-8 space-y-5" data-rv="up">
              <p className="t-body !text-[1.05rem]">
                Founded in 2024, Fintness Finserv Pvt. Ltd. was established with the vision of simplifying financial planning and helping individuals and families better understand finance through practical guidance and structured financial solutions.
              </p>
              <p className="t-body !text-[1.05rem]">
                We believe financial planning should be simple, transparent, and aligned with real-life goals rather than short-term market noise. Our purpose is to make financial decision-making easier for clients through disciplined planning, personalized support, and long-term relationship-focused service.
              </p>
              <p className="t-body !text-[1.05rem]">
                From investments and protection planning to wealth structuring and future financial security, we aim to help clients stay financially organized, confident, and prepared for every stage of life.
              </p>
            </div>
          </div>

          <ul className="self-start border-t border-ink/80" data-rv="up">
            {STATS.map((stat) => (
              <li key={stat.label} className="grid grid-cols-[7rem_1fr] items-baseline gap-4 border-b border-hair py-6 sm:grid-cols-[8.5rem_1fr]">
                <span className="t-label text-fin">{stat.label}</span>
                <span>
                  <span className="block text-[clamp(1.6rem,2.6vw,2.2rem)] font-semibold leading-none tracking-[-0.04em] text-ink">{stat.value}</span>
                  <span className="mt-2 block text-[0.9rem] font-medium text-ink/55">{stat.desc}</span>
                </span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* 4 — values: a dark band — principles on a connected rail, avoided practices struck through */}
      <ValuesSection believe={BELIEVE} avoid={AVOID} />

      {/* 5 — founders */}
      <section className="sec" aria-labelledby="experts-title">
        <div className="wrap">
          <RevealText
            as="h2"
            id="experts-title"
            className="t-h1 max-w-[16ch]"
            parts={["Meet the Experts Behind Fintness Finserv"]}
          />

          <div className="mt-16 space-y-20 lg:mt-24 lg:space-y-28">
            {FOUNDERS.map((member, idx) => (
              <article
                key={member.name}
                className="grid items-center gap-10 lg:grid-cols-12 lg:gap-16"
              >
                <div
                  data-rv="clip"
                  className={`relative aspect-[4/5] overflow-hidden rounded-[var(--r-l)] bg-paper-2 shadow-[var(--shadow-card)] lg:col-span-5 ${
                    idx % 2 === 1 ? "lg:order-2 lg:col-start-8" : ""
                  }`}
                >
                  <Image
                    src={member.img}
                    alt={member.name}
                    fill
                    sizes="(min-width: 1024px) 42vw, 100vw"
                    className="object-cover object-center"
                  />
                </div>
                <div className={`lg:col-span-6 ${idx % 2 === 1 ? "lg:order-1 lg:col-start-1" : "lg:col-start-7"}`} data-rv="up">
                  <p className="eyebrow">{member.role}</p>
                  <h3 className="t-h2 mt-5">{member.name}</h3>
                  <p className="t-body mt-6 max-w-[34rem] !text-[1.05rem]">{member.bio}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* 6 — core team: badges hanging from a rail — drag them, pull the strap, flip one for the bio */}
      <section className="pt-[clamp(48px,6vw,84px)] border-t border-hair" aria-labelledby="team-title">
        <div className="wrap">
          <RevealText as="h2" id="team-title" className="t-h2" parts={["Meet Our Core Team"]} />
        </div>
        <TeamLanyardRail
          items={TEAM}
          maxBadgeWidth={176}
          bioLines={8}
          className="mt-4 lg:mt-6"
        />
      </section>

      {/* 7 — call to action: the message on the left; the button and the real ways to reach us together on the right */}
      <section className="bg-night on-dark grain relative isolate overflow-hidden" aria-labelledby="about-cta-title">
        <div
          aria-hidden
          className="pointer-events-none absolute -right-[8%] -top-1/2 -z-10 h-[170%] w-[55%]"
          style={{ background: "radial-gradient(closest-side, rgb(0 102 255 / 0.34), transparent)" }}
        />
        <div className="wrap grid items-center gap-10 py-[clamp(52px,6.5vw,88px)] lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)] lg:gap-20">
          <div>
            <RevealText
              as="h2"
              id="about-cta-title"
              className="t-h1 max-w-[17ch] text-white"
              parts={["Start Your Financial Fitness Journey Today"]}
            />
            <p className="mt-6 max-w-[32rem] text-[clamp(1.05rem,1.35vw,1.2rem)] leading-[1.55] text-[var(--on-dark-soft)]" data-rv="up">
              Build a financially secure future with structured planning and personalized financial guidance.
            </p>
          </div>

          <div
            data-rv="up"
            style={{ ["--d" as string]: "120ms" } as React.CSSProperties}
            className="w-full max-w-[28rem] rounded-[var(--r-m)] border border-white/12 bg-white/[0.045] p-5 sm:p-6 lg:justify-self-end"
          >
            <CtaLink href="/contact" variant="light" arrow className="w-full">
              Schedule a Consultation
            </CtaLink>
            <ul className="mt-5 border-t border-white/12 pt-3">
              <li>
                <a
                  href="tel:+917852048886"
                  className="flex items-center gap-3.5 rounded-xl px-2 py-3 text-[1.02rem] font-medium text-white/85 transition-colors duration-200 hover:bg-white/[0.06] hover:text-white"
                >
                  <span aria-hidden className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/[0.08] text-[#6fb4ff]">
                    <Phone className="h-[1.05rem] w-[1.05rem]" strokeWidth={1.8} />
                  </span>
                  +91 78520 48886
                </a>
              </li>
              <li>
                <a
                  href="mailto:mail@fintness.in"
                  className="flex items-center gap-3.5 rounded-xl px-2 py-3 text-[1.02rem] font-medium text-white/85 transition-colors duration-200 hover:bg-white/[0.06] hover:text-white"
                >
                  <span aria-hidden className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/[0.08] text-[#6fb4ff]">
                    <Mail className="h-[1.05rem] w-[1.05rem]" strokeWidth={1.8} />
                  </span>
                  mail@fintness.in
                </a>
              </li>
            </ul>
          </div>
        </div>
      </section>
    </main>
  );
}
