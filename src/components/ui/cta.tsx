import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

type Props = {
  href: string;
  variant?: "primary" | "ghost" | "light";
  size?: "md" | "sm";
  arrow?: boolean;
  /** Opens in a new tab with a safe rel. */
  external?: boolean;
  className?: string;
  children: React.ReactNode;
} & Omit<React.AnchorHTMLAttributes<HTMLAnchorElement>, "href" | "className" | "children">;

/** The site's one button pair, as a link. (A <button> inside an <a> is invalid HTML — never nest.) */
export function CtaLink({ href, variant = "primary", size = "md", arrow = false, external = false, className, children, ...rest }: Props) {
  const cls = cn("btn", `btn-${variant}`, size === "sm" && "btn-sm", className);
  const inner = (
    <>
      <span>{children}</span>
      {arrow && <ArrowRight className="btn-arrow" aria-hidden strokeWidth={2.2} />}
    </>
  );
  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={cls} {...rest}>
        {inner}
      </a>
    );
  }
  return (
    <Link href={href} className={cls} {...rest}>
      {inner}
    </Link>
  );
}
