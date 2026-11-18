import * as React from "react";
import { cn } from "@/lib/utils";

export type Part = string | { t: string; className?: string };

type Props = {
  /** Heading content. Strings, or {t, className} parts so a few words can carry a style. */
  parts: Part[];
  as?: "h1" | "h2" | "h3" | "h4" | "p" | "div" | "span";
  className?: string;
  /** "load" plays immediately (hero); "view" plays when scrolled into view. */
  on?: "load" | "view";
  /** ms offset before the first word starts. */
  delay?: number;
  id?: string;
};

/**
 * Words rise out of a mask, staggered. Rendered on the server (real text, real
 * heading tag — SEO and screen readers see ordinary words); motion is pure CSS.
 */
export default function RevealText({ parts, as: Tag = "h2", className, on = "view", delay = 0, id }: Props) {
  let i = 0;
  const nodes: React.ReactNode[] = [];

  parts.forEach((part, pi) => {
    const text = typeof part === "string" ? part : part.t;
    const cls = typeof part === "string" ? undefined : part.className;
    // split on spaces but keep a real space node between words so wrapping stays natural
    const tokens = text.split(/(\s+)/);
    tokens.forEach((tok, ti) => {
      if (tok === "") return;
      if (/^\s+$/.test(tok)) {
        nodes.push(" ");
        return;
      }
      const idx = i++;
      nodes.push(
        <span className="rv-w" key={`${pi}-${ti}`}>
          <span className={cn("rv-wi", cls)} style={{ ["--i" as string]: idx } as React.CSSProperties}>
            {tok}
          </span>
        </span>,
      );
    });
  });

  const props =
    on === "load" ? { "data-rv-load": "" } : { "data-rv": "words" };

  return (
    <Tag
      id={id}
      className={className}
      {...props}
      style={delay ? ({ ["--d" as string]: `${delay}ms` } as React.CSSProperties) : undefined}
    >
      {nodes}
    </Tag>
  );
}
