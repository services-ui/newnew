"use client";

import {
  TrendingUp,
  ShieldCheck,
  Mail,
  MapPin,
  User,
  Users,
  Briefcase,
  FileText,
  SearchX,
  Send,
  ChevronDown,
} from "lucide-react";
import { useState } from "react";
import RevealText from "@/components/ui/RevealText";

export default function CareersPage() {
  const [formStatus, setFormStatus] = useState<"idle" | "submitting" | "success">("idle");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus("submitting");
    // Simulate API call
    setTimeout(() => {
      setFormStatus("success");
      // Reset after a while
      setTimeout(() => setFormStatus("idle"), 4000);
    }, 1500);
  };

  const features = [
    {
      icon: TrendingUp,
      title: "Culture of Growth",
      subtitle: "We believe success is shared",
      desc: "Your professional growth matters as much as our firm's growth. We invest in continuous learning, mentorship, leadership development, and career advancement opportunities to help you build a rewarding future."
    },
    {
      icon: ShieldCheck,
      title: "Building Trusted Relationships",
      subtitle: "We work for our clients, not products",
      desc: "Our consultants take a holistic approach to wealth management, focusing on what is truly best for each client. You'll have the freedom to build trusted relationships and deliver meaningful financial guidance."
    },
    {
      icon: Users,
      title: "Shared Success",
      subtitle: "Win together, grow together",
      desc: "We foster a culture of collaboration, knowledge sharing, and mutual respect. Every team member's success contributes to the success of the entire organization, creating an environment where everyone can thrive."
    }
  ];

  return (
    <main id="main" className="bg-white text-ink">
      {/* Why join us */}
      <section aria-labelledby="careers-title" className="relative overflow-hidden pb-[clamp(64px,9vw,128px)] pt-[8.5rem] md:pt-44">
        <div
          aria-hidden
          className="pointer-events-none absolute -left-[10%] -top-[25%] h-[70%] w-[50%] rounded-full opacity-60 blur-[110px]"
          style={{ background: "radial-gradient(closest-side, rgb(0 140 255 / 0.18), transparent)" }}
        />
        <div className="wrap relative">
          <div className="grid items-end gap-8 lg:grid-cols-12 lg:gap-12">
            <RevealText
              as="h1"
              id="careers-title"
              on="load"
              delay={100}
              className="t-display lg:col-span-7"
              parts={["Why Join ", { t: "Us", className: "grad" }]}
            />
            <p className="t-lead lg:col-span-4 lg:col-start-9" data-rv-load-up style={{ ["--d" as string]: "600ms" } as React.CSSProperties}>
              We build more than portfolios; we build legacies. Our culture is the bedrock of our success.
            </p>
          </div>

          <ul className="mt-16 grid border-t border-ink md:grid-cols-3 lg:mt-24">
            {features.map((feature, idx) => {
              const Icon = feature.icon;
              return (
                <li
                  key={feature.title}
                  data-rv="up"
                  style={{ ["--d" as string]: `${idx * 100}ms` } as React.CSSProperties}
                  className={`group py-10 md:px-9 md:py-12 ${idx === 0 ? "md:pl-0" : "md:border-l md:border-hair"} ${idx === 2 ? "md:pr-0" : ""} ${idx > 0 ? "border-t border-hair md:border-t-0" : ""}`}
                >
                  <div className="flex items-center justify-between">
                    <span aria-hidden className="flex h-12 w-12 items-center justify-center rounded-full bg-fin/10 text-fin transition-colors duration-300 group-hover:bg-fin group-hover:text-white">
                      <Icon className="h-[22px] w-[22px]" strokeWidth={1.6} />
                    </span>
                    <span aria-hidden className="tnum font-mono text-[0.72rem] tracking-wide text-ink/35">
                      {String(idx + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <h2 className="t-h3 mt-8">{feature.title}</h2>
                  <p className="serif mt-3 text-[1.05rem] text-fin">
                    &ldquo;{feature.subtitle}&rdquo;
                  </p>
                  <p className="t-body mt-5">{feature.desc}</p>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      {/* Current openings */}
      <section aria-labelledby="openings-title" className="bg-paper py-[clamp(64px,8vw,112px)]">
        <div className="wrap">
          <div className="grid items-end gap-4 border-b border-ink pb-8 md:grid-cols-[1fr_auto]">
            <h2 id="openings-title" className="t-h2">Current Openings</h2>
            <p className="t-lead md:text-right">Find your place in our growing ecosystem.</p>
          </div>

          <div className="flex flex-col items-center px-4 py-16 text-center md:py-24" data-rv="up">
            <span aria-hidden className="flex h-20 w-20 items-center justify-center rounded-full bg-white text-ink/35 shadow-[var(--shadow-card)]">
              <SearchX className="h-8 w-8" strokeWidth={1.4} />
            </span>
            <h3 className="mt-7 text-[1.35rem] font-semibold tracking-[-0.025em]">No active openings right now</h3>
            <p className="t-body mt-3 max-w-[28rem]">
              We currently don&apos;t have any open positions that match our active recruitment cycle. However, Fintness Finserv is always evolving.
            </p>
          </div>
        </div>
      </section>

      {/* Start your journey */}
      <section aria-labelledby="journey-title" className="bg-night on-dark grain relative isolate overflow-hidden">
        <div
          aria-hidden
          className="pointer-events-none absolute -bottom-1/3 -left-[10%] -z-10 h-[90%] w-[55%] opacity-70 blur-[100px]"
          style={{ background: "radial-gradient(closest-side, rgb(0 102 255 / 0.45), transparent)" }}
        />
        <div className="wrap grid gap-14 py-[clamp(72px,10vw,144px)] lg:grid-cols-12 lg:gap-20">
          <div className="lg:col-span-5">
            <RevealText as="h2" id="journey-title" className="t-h1 text-white" parts={["Start Your Journey"]} />
            <p className="mt-7 max-w-[28rem] text-[1.1rem] leading-[1.6] text-[var(--on-dark-soft)]" data-rv="up">
              Don&apos;t see a role that fits? We are always looking for exceptional talent. Submit your credentials for our &quot;Architect Talent Pool.&quot;
            </p>

            <ul className="mt-12 space-y-7">
              <li className="flex items-center gap-4">
                <span aria-hidden className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full shadow-[inset_0_0_0_1px_rgb(255_255_255/0.2)]">
                  <Mail className="h-[18px] w-[18px] text-[#6fb4ff]" strokeWidth={1.8} />
                </span>
                <div>
                  <p className="t-label text-white/45">Email Us</p>
                  <a href="mailto:mail@fintness.in" className="ulink mt-1 inline-block text-[1rem] font-semibold text-white transition-colors hover:text-[#6fb4ff]">
                    mail@fintness.in
                  </a>
                </div>
              </li>
              <li className="flex items-center gap-4">
                <span aria-hidden className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full shadow-[inset_0_0_0_1px_rgb(255_255_255/0.2)]">
                  <MapPin className="h-[18px] w-[18px] text-[#6fb4ff]" strokeWidth={1.8} />
                </span>
                <div>
                  <p className="t-label text-white/45">Office</p>
                  <p className="mt-1 text-[1rem] font-semibold leading-snug text-white">
                    House No. 164, Adarsh Nagar,<br />
                    Jaipur, Rajasthan – 302004
                  </p>
                </div>
              </li>
            </ul>
          </div>

          <div className="lg:col-span-7">
            <form onSubmit={handleSubmit} className="space-y-6 rounded-[var(--r-l)] bg-white/[0.04] p-7 shadow-[inset_0_0_0_1px_rgb(255_255_255/0.1)] sm:p-10" data-rv="up">
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <div>
                  <label htmlFor="cr-name" className="field-label flex items-center gap-2">
                    <User className="h-3.5 w-3.5 text-[#6fb4ff]" aria-hidden /> Full Name
                  </label>
                  <input
                    id="cr-name"
                    type="text"
                    required
                    readOnly
                    placeholder="John Doe"
                    className="field cursor-not-allowed opacity-60"
                  />
                </div>
                <div>
                  <label htmlFor="cr-email" className="field-label flex items-center gap-2">
                    <Mail className="h-3.5 w-3.5 text-[#6fb4ff]" aria-hidden /> Email Address
                  </label>
                  <input
                    id="cr-email"
                    type="email"
                    required
                    readOnly
                    placeholder="john@company.com"
                    className="field cursor-not-allowed opacity-60"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="cr-role" className="field-label flex items-center gap-2">
                  <Briefcase className="h-3.5 w-3.5 text-[#6fb4ff]" aria-hidden /> Role of Interest
                </label>
                <div className="relative">
                  <select
                    id="cr-role"
                    required
                    defaultValue=""
                    className="field cursor-pointer appearance-none pr-11"
                  >
                    <option value="" disabled>Select an area of interest...</option>
                    <option value="wealth-advisor">Wealth Advisor</option>
                    <option value="financial-analyst">Financial Analyst</option>
                    <option value="compliance-officer">Compliance Officer</option>
                    <option value="institutional-growth">Institutional Growth</option>
                    <option value="other">Other / Spontaneous Application</option>
                  </select>
                  <ChevronDown aria-hidden className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-white/50" />
                </div>
              </div>

              <div>
                <label htmlFor="cr-note" className="field-label flex items-center gap-2">
                  <FileText className="h-3.5 w-3.5 text-[#6fb4ff]" aria-hidden /> Professional Bio / Cover Note
                </label>
                <textarea
                  id="cr-note"
                  required
                  rows={4}
                  placeholder="Tell us about your approach to finance..."
                  className="field min-h-[130px] resize-none"
                />
              </div>

              <button
                type="button"
                disabled={true}
                className="btn btn-ghost w-full opacity-50"
              >
                Submit Application
                <Send className="h-4 w-4" aria-hidden />
              </button>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
}
