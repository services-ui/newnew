"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { X } from "lucide-react";
import { CtaLink } from "@/components/ui/cta";

const navLinksData = [
  { label: "Home", href: "/" },
  { label: "About Us", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Careers", href: "/careers" },
  { label: "Contact Us", href: "/contact" },
  { label: "Events", href: "/events" },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [hovered, setHovered] = useState<string | null>(null);
  const pathname = usePathname();
  const barRef = useRef<HTMLElement>(null);
  const menuId = "site-menu";

  const crmUrl = process.env.NEXT_PUBLIC_CRM_URL || "https://crm.fintness.in";

  // Compact the bar after the first screen scroll. Toggles an attribute (no React state per scroll event).
  useEffect(() => {
    const el = barRef.current;
    if (!el) return;
    let raf = 0;
    const update = () => {
      raf = 0;
      el.toggleAttribute("data-scrolled", window.scrollY > 24);
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  // Close the sheet on navigation (state adjusted during render, not in an effect).
  const [seenPath, setSeenPath] = useState(pathname);
  if (seenPath !== pathname) {
    setSeenPath(pathname);
    setIsOpen(false);
  }

  // Lock page scroll + Esc to close while the sheet is open.
  useEffect(() => {
    if (!isOpen) return;
    const prev = document.documentElement.style.overflow;
    document.documentElement.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.documentElement.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [isOpen]);

  const isActive = (href: string) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

  return (
    <>
      {/* scrim — only the sheet is modal, the bar stays reachable */}
      <div
        aria-hidden
        onClick={() => setIsOpen(false)}
        className={`fixed inset-0 z-40 bg-ink/35 transition-opacity duration-300 lg:hidden ${
          isOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
      />

      <header
        ref={barRef}
        className="group/nav fixed left-1/2 top-2.5 z-50 w-[min(100%-1.5rem,1060px)] -translate-x-1/2 sm:top-3"
      >
        <div
          className="relative flex h-[50px] items-center justify-between gap-4 rounded-full bg-white/95 pl-2.5 pr-2
                     shadow-[0_0_0_1px_rgb(11_21_38/0.07),0_10px_30px_-14px_rgb(11_21_38/0.28)]
                     transition-[height,background-color,box-shadow] duration-300 ease-[cubic-bezier(0.23,1,0.32,1)]
                     group-data-[scrolled]/nav:h-[46px] group-data-[scrolled]/nav:bg-white
                     group-data-[scrolled]/nav:shadow-[0_0_0_1px_rgb(11_21_38/0.08),0_18px_40px_-16px_rgb(11_21_38/0.4)]"
        >
          <Link href="/" className="flex shrink-0 items-center gap-2 rounded-full py-1 pr-2" aria-label="Fintness Finserv — home">
            <Image src="/logo.png" alt="Fintness Finserv Logo" width={28} height={28} className="h-[28px] w-[28px] rounded-full object-contain" priority />
            <span className="text-[12.5px] font-semibold tracking-[-0.02em] text-ink sm:text-[14px]">FINTNESS FINSERV</span>
          </Link>

          <nav aria-label="Primary" className="hidden items-center lg:flex" onMouseLeave={() => setHovered(null)}>
            <ul className="flex items-center gap-0.5">
              {navLinksData.map((link) => {
                const active = isActive(link.href);
                return (
                  <li key={link.href} className="relative">
                    <Link
                      href={link.href}
                      aria-current={active ? "page" : undefined}
                      onMouseEnter={() => setHovered(link.href)}
                      onFocus={() => setHovered(link.href)}
                      onBlur={() => setHovered(null)}
                      className={`relative z-10 block rounded-full px-3 py-1.5 text-[13.5px] font-medium tracking-[-0.01em] transition-colors duration-200 ${
                        active ? "text-ink" : "text-ink/60 hover:text-ink"
                      }`}
                    >
                      {link.label}
                      {active && (
                        <span aria-hidden className="absolute bottom-[3px] left-1/2 h-1 w-1 -translate-x-1/2 rounded-full bg-fin" />
                      )}
                    </Link>
                    {hovered === link.href && (
                      <motion.span
                        layoutId="nav-hover"
                        aria-hidden
                        className="absolute inset-0 rounded-full bg-ink/[0.055]"
                        transition={{ type: "spring", duration: 0.38, bounce: 0 }}
                      />
                    )}
                  </li>
                );
              })}
            </ul>
          </nav>

          <div className="flex shrink-0 items-center gap-2">
            <CtaLink href="/contact" size="sm" className="[--h:36px] !px-4 !text-[13px] sm:!px-[1.1rem]">
              Get Started
            </CtaLink>
            <a
              href={crmUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-ghost btn-sm hidden [--h:36px] !px-4 !text-[13px] lg:inline-flex"
            >
              Login
            </a>
            <button
              type="button"
              className="relative flex h-[38px] w-[38px] items-center justify-center rounded-full text-ink shadow-[inset_0_0_0_1px_rgb(11_21_38/0.14)] transition-transform duration-150 active:scale-95 lg:hidden"
              onClick={() => setIsOpen((o) => !o)}
              aria-label={isOpen ? "Close Menu" : "Open Menu"}
              aria-expanded={isOpen}
              aria-controls={menuId}
            >
              {isOpen ? (
                <X className="h-[18px] w-[18px]" strokeWidth={2} aria-hidden />
              ) : (
                <span aria-hidden className="flex flex-col gap-[5px]">
                  <span className="block h-[1.6px] w-[18px] rounded-full bg-current" />
                  <span className="block h-[1.6px] w-[12px] rounded-full bg-current" />
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Mobile sheet — one entrance for the whole panel, its items are simply there */}
        <div
          id={menuId}
          data-open={isOpen || undefined}
          aria-hidden={!isOpen}
          inert={!isOpen}
          className="pointer-events-none mt-2 origin-top scale-[0.97] rounded-[28px] bg-white p-3 opacity-0 shadow-[0_0_0_1px_rgb(11_21_38/0.07),0_30px_60px_-20px_rgb(11_21_38/0.45)]
                     transition-[opacity,scale] duration-[160ms] ease-[cubic-bezier(0.23,1,0.32,1)]
                     data-[open]:pointer-events-auto data-[open]:scale-100 data-[open]:opacity-100 data-[open]:duration-[240ms] lg:hidden"
        >
          <nav aria-label="Mobile">
            <ul className="flex flex-col">
              {navLinksData.map((link) => {
                const active = isActive(link.href);
                return (
                  <li key={link.href} className="border-b border-hair last:border-0">
                    <Link
                      href={link.href}
                      onClick={() => setIsOpen(false)}
                      aria-current={active ? "page" : undefined}
                      className={`flex items-center justify-between rounded-xl px-4 py-[15px] text-[22px] font-semibold tracking-[-0.03em] ${
                        active ? "text-fin" : "text-ink"
                      }`}
                    >
                      {link.label}
                      {active && <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-fin" />}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </nav>
          <div className="mt-3 grid grid-cols-2 gap-2 p-1">
            <CtaLink href="/contact" onClick={() => setIsOpen(false)}>
              Get Started
            </CtaLink>
            <a href={crmUrl} target="_blank" rel="noopener noreferrer" className="btn btn-ghost">
              Login
            </a>
          </div>
        </div>
      </header>
    </>
  );
}
