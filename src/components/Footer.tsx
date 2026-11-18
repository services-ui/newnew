"use client";

import Link from "next/link";
import Image from "next/image";
import { MapPin, Mail, Phone } from "lucide-react";

// Inline custom SVG icons to avoid lucide version mismatches
const LinkedinIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const InstagramIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
  </svg>
);

const FacebookIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

const YoutubeIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z" />
    <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" />
  </svg>
);

const linkCls =
  "ulink inline-block py-[4px] text-[0.98rem] font-medium text-white/75 transition-colors duration-200 hover:text-white";
const headCls = "mb-4 text-[0.82rem] font-semibold uppercase tracking-[0.14em] text-white/50";

export default function Footer() {
  const socialLinks = [
    { name: "Facebook", icon: FacebookIcon, href: "https://www.facebook.com/fintness.finserv" },
    { name: "Linkedin", icon: LinkedinIcon, href: "https://www.linkedin.com/company/team_fintness/" },
    { name: "Instagram", icon: InstagramIcon, href: "https://www.instagram.com/fintness_finserv?igsh=djhhM2gyN2luOGZ1&utm_source=qr" },
    { name: "Youtube", icon: YoutubeIcon, href: "https://www.youtube.com/@FINTNESSFINSERV" },
  ];

  return (
    <footer className="bg-night on-dark relative z-10 mt-auto w-full overflow-hidden border-t border-[var(--hair-dark)] text-white">
      {/* background only: the brand name at the base of the footer, cut by the bottom edge, with a soft brand-blue
          glow rising behind it. Absolutely positioned behind the content, so it adds no height and no spacing. */}
      <div aria-hidden className="pointer-events-none absolute inset-x-0 bottom-0 z-0 select-none overflow-hidden">
        {/* the glow: a low, wide bloom from the base, kept faint so the links and disclaimer stay easy to read */}
        <div
          className="absolute inset-x-0 bottom-0 h-[62%]"
          style={{
            background:
              "radial-gradient(60% 100% at 50% 100%, rgb(0 102 255 / 0.30) 0%, rgb(0 140 255 / 0.12) 45%, transparent 75%), radial-gradient(32% 70% at 50% 100%, rgb(0 178 255 / 0.16) 0%, transparent 100%)",
          }}
        />
        <p
          className="relative mx-auto w-fit translate-y-[30%] whitespace-nowrap text-center font-bold leading-[0.76] tracking-[-0.035em]"
          style={{
            fontSize: "clamp(4rem, 17.5vw, 17.5rem)",
            color: "rgb(125 170 255 / 0.13)",
            // brighter toward the base where the glow sits (-webkit- forms for Safari)
            backgroundImage: "linear-gradient(180deg, rgb(125 170 255 / 0.11) 0%, rgb(150 195 255 / 0.34) 100%)",
            WebkitBackgroundClip: "text",
            backgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
        >
          FINTNESS
        </p>
      </div>

      <div className="wrap relative z-10 pb-10 pt-14 md:pb-12 md:pt-20">
        {/* brand + navigation */}
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-3">
            <Link href="/" className="group flex items-center gap-3.5">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-white transition-transform duration-300 group-hover:scale-105">
                <Image src="/logo.png" alt="Fintness Finserv Logo" width={32} height={32} className="h-8 w-8 rounded-full object-contain" />
              </span>
              <span className="flex flex-col justify-center -space-y-0.5">
                <span className="text-[1.6rem] font-bold leading-none tracking-[-0.04em] text-white">FINTNESS</span>
                <span className="grad pl-0.5 text-[0.72rem] font-bold uppercase leading-none tracking-[0.3em]">Finserv</span>
              </span>
            </Link>

            <div className="mt-7 space-y-3">
              <a href="tel:+917852048886" className="flex items-center gap-2.5 text-[0.95rem] font-semibold text-white/90 transition-colors hover:text-[#6fb4ff]">
                <Phone className="h-4 w-4 shrink-0 text-[#6fb4ff]" aria-hidden />
                <span>+91 78520 48886</span>
              </a>
              <a href="mailto:mail@fintness.in" className="flex items-center gap-2.5 text-[0.95rem] font-semibold text-white/90 transition-colors hover:text-[#6fb4ff]">
                <Mail className="h-4 w-4 shrink-0 text-[#6fb4ff]" aria-hidden />
                <span>mail@fintness.in</span>
              </a>
            </div>

            <div className="mt-7 flex items-center gap-2">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.name}
                  className="flex h-10 w-10 items-center justify-center rounded-full text-white/70 shadow-[inset_0_0_0_1px_rgb(255_255_255/0.16)] transition-[color,box-shadow,scale] duration-200 active:scale-95 hover:text-white hover:shadow-[inset_0_0_0_1px_rgb(111_180_255/0.75)]"
                >
                  <social.icon className="h-[17px] w-[17px]" aria-hidden />
                </a>
              ))}
            </div>
          </div>

          <nav aria-label="Footer" className="grid grid-cols-2 gap-x-6 gap-y-10 sm:grid-cols-3 lg:col-span-9 lg:grid-cols-5">
            <div>
              <h3 className={headCls}>Company</h3>
              <ul>
                <li><Link href="/" className={linkCls}>Home</Link></li>
                <li><Link href="/about" className={linkCls}>About Us</Link></li>
                <li><Link href="/services" className={linkCls}>Services</Link></li>
                <li><Link href="/careers" className={linkCls}>Careers</Link></li>
                <li><Link href="/contact" className={linkCls}>Contact Us</Link></li>
                <li><Link href="/events" className={linkCls}>Events</Link></li>
              </ul>
            </div>

            <div>
              <h3 className={headCls}>Advisory</h3>
              <ul>
                <li><Link href="/services#wealth-management" className={linkCls}>Wealth Management</Link></li>
                <li><Link href="/services#investment-planning" className={linkCls}>Investment Planning</Link></li>
                <li><Link href="/services#risk-mitigation" className={linkCls}>Risk Mitigation</Link></li>
                <li><Link href="/services" className={linkCls}>Estate Planning</Link></li>
                <li><Link href="/services#tax-optimization" className={linkCls}>Tax Optimization</Link></li>
                <li><Link href="/services#loan-against-securities" className={linkCls}>Loan Against Securities</Link></li>
              </ul>
            </div>

            <div>
              <h3 className={headCls}>Resources</h3>
              <ul>
                <li><Link href="/#process" className={linkCls}>Our Process</Link></li>
                <li><Link href="/#events" className={linkCls}>Client Testimonials</Link></li>
              </ul>
            </div>

            <div>
              <h3 className={headCls}>Compliance</h3>
              <ul>
                <li><Link href="/privacy-policy" className={linkCls}>Privacy Policy</Link></li>
                <li><Link href="/terms-of-service" className={linkCls}>Terms &amp; Conditions</Link></li>
              </ul>
            </div>

            <div className="col-span-2 sm:col-span-1">
              <h3 className={headCls}>Registered Office</h3>
              <p className="flex items-start gap-2 text-[0.98rem] font-medium leading-relaxed text-white/75">
                <MapPin className="mt-[3px] h-3.5 w-3.5 shrink-0 text-[#6fb4ff]" aria-hidden />
                <span>House No. 164, Adarsh Nagar, Jaipur, Rajasthan – 302004</span>
              </p>
            </div>
          </nav>
        </div>

        {/* regulatory */}
        <div className="mt-14 border-t border-[var(--hair-dark)] pt-8 md:mt-20">
          <p className="max-w-[78rem] text-[0.78rem] leading-[1.75] text-white/55 md:text-[0.82rem]">
            <strong className="font-semibold text-white/85">Disclaimer:</strong> Investments in Mutual Funds are subject to Market Risks. Read all scheme related documents carefully before investing. Mutual Fund Schemes do not assure or guarantee any returns. Past performances of any Mutual Fund Scheme may or may not be sustained in future. There is no guarantee that the investment objective of any suggested scheme shall be achieved. All existing and prospective investors are advised to check and evaluate the Exit loads and other cost structure (TER) applicable at the time of making the investment before finalizing on any investment decision for Mutual Funds schemes. We deal in Regular Plans only for Mutual Fund Schemes and earn a Trailing Commission on client investments. Disclosure For Commission earnings is made to clients at the time of investments. Option of Direct Plan for every Mutual Fund Scheme is available to investors offering advantage of lower expense ratio. We are not entitled to earn any commission on Direct plans. Hence we do not deal in Direct Plans.
          </p>

          <p className="mt-7 flex flex-wrap items-center gap-x-3 gap-y-1.5 text-[0.7rem] font-medium text-white/70 md:text-xs">
            <span>{new Date().getFullYear()} © Copyright Reserved by Fintness Finserv Pvt. Ltd.</span>
            <span aria-hidden className="text-white/25">|</span>
            <span className="font-semibold text-white">AMFI Registered Sub Distributor</span>
            <span aria-hidden className="text-white/25">|</span>
            <span className="font-semibold text-white">EUIN NO- E104126</span>
            <span aria-hidden className="text-white/25">|</span>
            <span className="font-semibold text-white">Reg. Date: 25 Oct 2025</span>
            <span aria-hidden className="text-white/25">|</span>
            <span className="font-semibold text-white">Valid Till: 24 Oct 2028</span>
          </p>
        </div>
      </div>

    </footer>
  );
}
