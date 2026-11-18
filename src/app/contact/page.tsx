"use client";

import { useState, useRef, useEffect } from "react";
import { Phone, Mail, Clock, MapPin, ChevronDown, CheckCircle2, Check, ArrowUpRight } from "lucide-react";
import RevealText from "@/components/ui/RevealText";

const SUBJECTS = [
  "Wealth Creation",
  "Retirement Planning",
  "Tax Optimization",
  "Investment Planning",
  "Risk Mitigation",
  "Estate Planning",
  "Asset Management",
  "General Support",
];

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: ["Wealth Creation"] as string[],
    message: "",
    agree: false,
  });

  const [subjectOpen, setSubjectOpen] = useState(false);
  const subjectRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const close = (e: MouseEvent) => {
      if (subjectRef.current && !subjectRef.current.contains(e.target as Node)) setSubjectOpen(false);
    };
    const esc = (e: KeyboardEvent) => { if (e.key === "Escape") setSubjectOpen(false); };
    document.addEventListener("mousedown", close);
    document.addEventListener("keydown", esc);
    return () => { document.removeEventListener("mousedown", close); document.removeEventListener("keydown", esc); };
  }, []);
  const toggleSubject = (name: string) =>
    setFormData((f) => ({ ...f, subject: f.subject.includes(name) ? f.subject.filter((x) => x !== name) : [...f.subject, name] }));
  const subjectText = formData.subject.length ? formData.subject.join(", ") : "General Support";

  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.agree) return;

    setIsSubmitting(true);
    setSubmitError("");

    // Construct a formatted text block of all fields for email display guarantee
    const emailBody = `
Client Details:
----------------------------------
Name: ${formData.name}
Email: ${formData.email}
Mobile Number: ${formData.phone}
Subject: ${subjectText}

Message:
----------------------------------
${formData.message}
`;

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY,
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          subject: `Fintness Inquiry: ${subjectText}`,
          inquiry_subject: subjectText,
          message: emailBody.trim(),
          from_name: "Fintness Finserv Website",
        }),
      });

      const result = await response.json();
      if (result.success) {
        setSubmitted(true);
        setFormData({
          name: "",
          email: "",
          phone: "",
          subject: ["Wealth Creation"] as string[],
          message: "",
          agree: false,
        });
        setTimeout(() => setSubmitted(false), 5000);
      } else {
        setSubmitError(result.message || "Something went wrong. Please try again.");
      }
    } catch (error) {
      setSubmitError("Failed to send message. Please check your internet connection.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main id="main" className="bg-white pt-[8rem] text-ink md:pt-40">
      {/* heading */}
      <header className="wrap">
        <div className="max-w-[58rem]">
          <RevealText
            as="h1"
            on="load"
            delay={100}
            className="t-display"
            parts={["Connected Precision. ", { t: "Let's architecturalize", className: "grad" }, " your future."]}
          />
          <p className="t-lead mt-8 max-w-[38rem]" data-rv-load-up style={{ ["--d" as string]: "650ms" } as React.CSSProperties}>
            Our global advisors are ready to translate your financial goals into structural realities. Reach out through our secure channels or visit our Jaipur office.
          </p>
        </div>
      </header>

      <div className="wrap mt-16 grid items-start gap-14 pb-[clamp(72px,9vw,128px)] lg:mt-24 lg:grid-cols-12 lg:gap-16">
        {/* channels */}
        <div className="lg:col-span-5 lg:order-1">
          <ul className="border-t border-ink" data-rv="up">
            <li className="flex items-start gap-5 border-b border-hair py-7">
              <span aria-hidden className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-fin/10 text-fin">
                <Phone className="h-[18px] w-[18px]" strokeWidth={1.8} />
              </span>
              <div>
                <p className="t-label text-ink/50">Direct Line</p>
                <a href="tel:+917852048886" className="ulink mt-2 inline-block text-[1.5rem] font-semibold tracking-[-0.03em] text-ink transition-colors hover:text-fin">
                  +91 78520 48886
                </a>
              </div>
            </li>
            <li className="flex items-start gap-5 border-b border-hair py-7">
              <span aria-hidden className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-fin/10 text-fin">
                <Mail className="h-[18px] w-[18px]" strokeWidth={1.8} />
              </span>
              <div>
                <p className="t-label text-ink/50">Digital Ledger</p>
                <a href="mailto:mail@fintness.in" className="ulink mt-2 inline-block text-[1.5rem] font-semibold tracking-[-0.03em] text-ink transition-colors hover:text-fin">
                  mail@fintness.in
                </a>
              </div>
            </li>
            <li className="flex items-start gap-5 border-b border-hair py-7">
              <span aria-hidden className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-fin/10 text-fin">
                <Clock className="h-[18px] w-[18px]" strokeWidth={1.8} />
              </span>
              <div>
                <p className="t-label text-ink/50">Office Hours</p>
                <p className="mt-2 text-[1.05rem] font-semibold tracking-[-0.015em] text-ink">Mon — Fri: 10:00 - 18:00 IST</p>
                <p className="mt-1 text-[0.85rem] italic text-ink/50">Saturday by prior appointment only.</p>
              </div>
            </li>
          </ul>

          <div className="bg-night on-dark grain relative mt-10 overflow-hidden rounded-[var(--r-l)] p-8" data-rv="up">
            <h2 className="eyebrow">Office</h2>
            <address className="mt-5 text-[1.2rem] font-semibold not-italic leading-[1.45] tracking-[-0.02em]">
              164, Frontier Colony, <br />
              Adarsh Nagar, <br />
              Jaipur, Rajasthan – 302004
            </address>
          </div>
        </div>

        {/* form */}
        <div className="lg:col-span-7 lg:order-2" data-rv="up" style={{ ["--d" as string]: "80ms" } as React.CSSProperties}>
          <div className="rounded-[var(--r-l)] bg-white p-7 shadow-[var(--shadow-lift)] sm:p-10">
            <h2 className="t-h3 mb-8">Contact Us</h2>

            {submitted ? (
              <div role="status" className="rounded-[var(--r-m)] bg-fin/[0.06] p-10 text-center">
                <CheckCircle2 className="mx-auto h-12 w-12 text-fin" strokeWidth={1.6} aria-hidden />
                <h3 className="mt-4 text-[1.35rem] font-semibold tracking-[-0.025em]">Inquiry Dispatched!</h3>
                <p className="t-body mt-2">Our financial architects will contact you shortly.</p>
              </div>
            ) : (
              <form className="space-y-6" onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <div>
                    <label htmlFor="c-name" className="field-label">Full Name</label>
                    <input
                      id="c-name"
                      required
                      autoComplete="name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="field"
                      placeholder="John Doe"
                      type="text"
                    />
                  </div>
                  <div>
                    <label htmlFor="c-email" className="field-label">Email</label>
                    <input
                      id="c-email"
                      required
                      autoComplete="email"
                      inputMode="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="field"
                      placeholder="john@company.com"
                      type="email"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                  <div>
                    <label htmlFor="c-phone" className="field-label">Mobile Number</label>
                    <input
                      id="c-phone"
                      required
                      autoComplete="tel"
                      inputMode="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="field"
                      placeholder="+91 98765 43210"
                      type="tel"
                    />
                  </div>
                  <div>
                    <span id="c-subject-label" className="field-label">Subject of Inquiry</span>
                    <div className="relative" ref={subjectRef}>
                      <button
                        type="button"
                        aria-haspopup="listbox"
                        aria-expanded={subjectOpen}
                        aria-labelledby="c-subject-label"
                        onClick={() => setSubjectOpen((o) => !o)}
                        className="field cursor-pointer pr-11 text-left"
                      >
                        {formData.subject.length ? (
                          <span className="flex flex-wrap gap-1.5">
                            {formData.subject.map((x) => (
                              <span key={x} className="rounded-full bg-fin/10 px-2.5 py-0.5 text-[0.78rem] font-semibold text-fin">{x}</span>
                            ))}
                          </span>
                        ) : (
                          <span className="text-ink/40">Select one or more</span>
                        )}
                      </button>
                      <ChevronDown
                        aria-hidden
                        className={`pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-ink/50 transition-transform duration-200 ${subjectOpen ? "rotate-180" : ""}`}
                      />
                      {subjectOpen && (
                        <ul
                          role="listbox"
                          aria-multiselectable="true"
                          className="absolute z-30 mt-2 max-h-72 w-full overflow-auto rounded-[14px] bg-white py-1.5 shadow-[var(--shadow-lift)]"
                        >
                          {SUBJECTS.map((name) => {
                            const on = formData.subject.includes(name);
                            return (
                              <li key={name} role="option" aria-selected={on}>
                                <button
                                  type="button"
                                  onClick={() => toggleSubject(name)}
                                  className="flex w-full items-center gap-3 px-4 py-3 text-left text-[0.95rem] font-medium text-ink transition-colors hover:bg-paper"
                                >
                                  <span className={`flex h-[18px] w-[18px] items-center justify-center rounded-[5px] ${on ? "bg-fin" : "shadow-[inset_0_0_0_1.5px_var(--hair-strong)]"}`}>
                                    {on && <Check className="h-3 w-3 text-white" strokeWidth={3} aria-hidden />}
                                  </span>
                                  {name}
                                </button>
                              </li>
                            );
                          })}
                        </ul>
                      )}
                    </div>
                  </div>
                </div>

                <div>
                  <label htmlFor="c-message" className="field-label">Detailed Message</label>
                  <textarea
                    id="c-message"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="field min-h-[140px] resize-none"
                    placeholder="How can our financial architects assist you today?"
                    rows={5}
                  />
                </div>

                <div className="flex items-start gap-3">
                  <input
                    required
                    id="agree-checkbox"
                    checked={formData.agree}
                    onChange={(e) => setFormData({ ...formData, agree: e.target.checked })}
                    className="mt-[3px] h-[18px] w-[18px] shrink-0 cursor-pointer accent-[#0066ff]"
                    type="checkbox"
                  />
                  <label htmlFor="agree-checkbox" className="cursor-pointer select-none text-[0.9rem] leading-snug text-ink/65">
                    I agree to the <a className="ulink font-semibold text-fin" href="/privacy-policy">Privacy Policy</a> regarding data handling.
                  </label>
                </div>

                {submitError && (
                  <p role="alert" className="text-sm font-semibold text-red-600">{submitError}</p>
                )}

                <button disabled={isSubmitting} className="btn btn-primary w-full md:w-auto" type="submit">
                  {isSubmitting ? "Sending..." : "Submit"}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* map */}
      <section aria-label="Office location" className="relative" data-rv="fade">
        <div className="group relative h-[clamp(22rem,56vw,34rem)] w-full overflow-hidden bg-paper-2">
          <iframe
            src="https://maps.google.com/maps?q=164,%20Frontier%20Colony,%20Adarsh%20Nagar,%20Jaipur,%20Rajasthan%20302004&t=&z=16&ie=UTF8&iwloc=&output=embed"
            className="h-full w-full border-0 grayscale contrast-[1.05] transition-[filter] duration-[1200ms] ease-out [@media(hover:hover)]:group-hover:grayscale-0 [@media(hover:none)]:grayscale-0"
            allowFullScreen
            loading="lazy"
            title="Fintness Finserv Office Map"
          />
          <div className="pointer-events-none absolute inset-x-0 bottom-0 p-4 sm:p-8 lg:left-[var(--gutter)] lg:right-auto">
            <div className="pointer-events-auto w-full max-w-[22rem] rounded-[var(--r-m)] bg-white p-6 shadow-[var(--shadow-lift)]">
              <span aria-hidden className="mb-4 flex h-10 w-10 items-center justify-center rounded-full bg-[image:var(--fin-grad)] text-white">
                <MapPin className="h-5 w-5" strokeWidth={1.8} />
              </span>
              <h3 className="text-[1.15rem] font-semibold tracking-[-0.025em]">Visit our Office</h3>
              <p className="t-small mt-1.5">
                164, Frontier Colony, Adarsh Nagar, <br />
                Jaipur, Rajasthan – 302004
              </p>
              <a
                className="btn btn-primary btn-sm mt-5 w-full"
                href="https://www.google.com/maps/place/164,+Frontier+Colony,+Adarsh+Nagar,+Jaipur,+Rajasthan+302004/@26.898986,75.8259343,17z/data=!3m1!4b1!4m6!3m5!1s0x396db69561b50927:0xafd01ffdd6135135!8m2!3d26.898986!4d75.8285092!16s%2Fg%2F11c1h40n3f?entry=ttu&g_ep=EgoyMDI2MDUyMC4wIKXMDSoASAFQAw%3D%3D"
                target="_blank"
                rel="noopener noreferrer"
              >
                Open in Google Maps
                <ArrowUpRight className="btn-arrow" aria-hidden />
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
