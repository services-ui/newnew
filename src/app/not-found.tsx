import RevealText from "@/components/ui/RevealText";
import { CtaLink } from "@/components/ui/cta";

export default function NotFound() {
  return (
    <main id="main" className="relative flex min-h-[100svh] flex-col items-center justify-center overflow-hidden bg-paper px-6 pb-24 pt-36 text-center text-ink">
      <p
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-[12%] select-none text-center text-[34vw] font-semibold leading-none tracking-[-0.07em] text-transparent [-webkit-text-stroke:1px_rgb(11_21_38/0.1)] md:text-[24vw]"
      >
        404
      </p>
      <h1 className="sr-only">404</h1>
      <RevealText
        as="h2"
        on="load"
        className="t-h1 relative"
        parts={["Page Not Found"]}
      />
      <p className="t-lead relative mt-6 max-w-md" data-rv-load-up style={{ ["--d" as string]: "500ms" } as React.CSSProperties}>
        This section is currently under construction. Please check back later or start growing your wealth from our homepage.
      </p>
      <div className="relative mt-10" data-rv-load-up style={{ ["--d" as string]: "650ms" } as React.CSSProperties}>
        <CtaLink href="/" arrow>
          Return to Home
        </CtaLink>
      </div>
    </main>
  );
}
