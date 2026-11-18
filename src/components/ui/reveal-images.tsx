import Link from "next/link";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

export interface ImageSource {
  src: string;
  alt?: string;
}

export interface RevealImageItem {
  text: string;
  href: string;
  images: [ImageSource, ImageSource];
}

/**
 * Adapted from the 21st.dev "reveal images" list. Changes made for this site:
 *  - each row is a real link (service anchor), not an <h1>;
 *  - the images reveal on hover *and* keyboard focus, and only where hover exists (touch just gets the links);
 *  - no scale(0) start — images arrive from scale 0.9 + opacity, tilted, with a faster exit than entrance;
 *  - siblings dim while one row is active so the eye lands on it;
 *  - optimised <Image>, decorative alt text (the row's text already names the service).
 */
function RevealImageListItem({ text, href, images, index }: RevealImageItem & { index: number }) {
  // v4 animates translate/rotate/scale as their own properties — list them, not `transform`
  const tile =
    "absolute right-[7%] top-1/2 aspect-[4/5] w-[clamp(120px,15vw,210px)] -translate-y-1/2 overflow-hidden rounded-[var(--r-m)] bg-paper-2 opacity-0 shadow-[0_30px_60px_-24px_rgb(11_21_38/0.55)] ring-1 ring-black/5 transition-[opacity,translate,rotate,scale] duration-200 ease-[cubic-bezier(0.23,1,0.32,1)] max-[1023px]:hidden";
  const on = "[@media(hover:hover)]:group-hover:opacity-100 group-focus-visible:opacity-100 group-hover:[transition-duration:420ms] group-focus-visible:[transition-duration:420ms]";

  return (
    <li className="border-b border-hair first:border-t">
      <Link
        href={href}
        className="group relative flex items-center justify-between gap-6 py-7 outline-offset-[-4px] sm:py-9 lg:py-11"
      >
        <span className="flex min-w-0 items-baseline gap-5 sm:gap-8">
          <span aria-hidden className="tnum w-7 shrink-0 font-mono text-[0.72rem] tracking-wide text-ink/35 sm:w-9">
            {String(index + 1).padStart(2, "0")}
          </span>
          <span className="text-[clamp(1.9rem,5.6vw,4.9rem)] font-semibold leading-[1.02] tracking-[-0.045em] text-ink transition-[color,opacity] duration-300 group-hover/list:opacity-30 group-hover:opacity-100!">
            {text}
          </span>
        </span>

        <ArrowUpRight
          aria-hidden
          strokeWidth={1.5}
          className="h-7 w-7 shrink-0 text-ink/35 transition-[transform,color] duration-300 ease-[cubic-bezier(0.23,1,0.32,1)] group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-fin group-focus-visible:text-fin sm:h-9 sm:w-9 lg:hidden"
        />

        {/* hover/focus: two photographs tilt out from behind the title */}
        <span aria-hidden className={cn(tile, "translate-x-0 rotate-0 scale-90", on, "group-hover:-translate-x-6 group-hover:-rotate-[5deg] group-hover:scale-100 group-focus-visible:-translate-x-6 group-focus-visible:-rotate-[5deg] group-focus-visible:scale-100")}>
          <Image src={images[0].src} alt={images[0].alt ?? ""} fill sizes="210px" className="object-cover" />
        </span>
        <span aria-hidden className={cn(tile, "translate-x-0 rotate-0 scale-90 delay-[40ms]", on, "group-hover:translate-x-9 group-hover:translate-y-[-44%] group-hover:rotate-[7deg] group-hover:scale-100 group-focus-visible:translate-x-9 group-focus-visible:translate-y-[-44%] group-focus-visible:rotate-[7deg] group-focus-visible:scale-100")}>
          <Image src={images[1].src} alt={images[1].alt ?? ""} fill sizes="210px" className="object-cover" />
        </span>
      </Link>
    </li>
  );
}

export function RevealImageList({ items, label = "Services", className }: { items: RevealImageItem[]; label?: string; className?: string }) {
  return (
    <nav aria-label={label} className={className}>
      <ul className="group/list">
        {items.map((item, i) => (
          <RevealImageListItem key={item.href} index={i} {...item} />
        ))}
      </ul>
    </nav>
  );
}
