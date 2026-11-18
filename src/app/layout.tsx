import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono, Playfair_Display } from "next/font/google";
import { Navbar } from "@/components/ui/mini-navbar";
import Footer from "@/components/Footer";
import FloatingContact from "@/components/FloatingContact";
import RevealObserver from "@/components/ui/RevealObserver";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Editorial serif — used only for pull-quotes.
const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  style: ["italic"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Fintness Finserv | Build a Fitter Financial Future",
  description: "Invest smarter. Grow consistently. Win long-term with Fintness Finserv. Empowering your financial growth every step of the way.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#ffffff",
};

// Runs before first paint: arms the reveal start-states only when JS is available,
// and drops them again if the observer never starts (fail-safe, content is never lost).
const armReveals = `document.documentElement.classList.add('js');setTimeout(function(){var d=document.documentElement;if(!d.hasAttribute('data-rv-ready'))d.classList.add('rv-off')},4500);`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${playfair.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: armReveals }} />
      </head>
      <body className="min-h-full flex flex-col" suppressHydrationWarning>
        <a
          href="#main"
          className="fixed left-4 top-4 z-[100] -translate-y-24 rounded-full bg-ink px-5 py-3 text-sm font-semibold text-white transition-transform duration-200 focus:translate-y-0"
        >
          Skip to content
        </a>
        <Navbar />
        {children}
        <FloatingContact />
        <Footer />
        <RevealObserver />
      </body>
    </html>
  );
}
