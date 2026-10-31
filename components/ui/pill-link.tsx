import Link from "next/link";
import type { ComponentProps } from "react";
import { ArrowUpRightIcon } from "@/components/icons";
import { cn } from "@/lib/utils";

type Tone = "forest" | "paper" | "outline" | "outline-light";

const tones: Record<Tone, string> = {
  forest: "bg-forest text-paper hover:bg-forest-hover border-forest",
  paper: "bg-paper text-forest hover:bg-white border-paper",
  outline: "bg-transparent text-forest border-forest hover:bg-forest hover:text-paper",
  "outline-light": "bg-transparent text-paper border-paper/70 hover:bg-paper hover:text-forest",
};

/**
 * Rounded pill button with the sliding diagonal arrow from the original site
 * ("pro_btn"). Renders a Next.js Link.
 */
export function PillLink({
  href,
  children,
  tone = "forest",
  size = "md",
  className,
  ...rest
}: Omit<ComponentProps<typeof Link>, "href"> & {
  href: string;
  tone?: Tone;
  size?: "sm" | "md" | "lg";
}) {
  return (
    <Link
      href={href}
      className={cn(
        "group inline-flex w-fit items-center gap-2 whitespace-nowrap rounded-full border transition-colors duration-300",
        size === "sm" && "px-4 py-1.5 text-sm",
        size === "md" && "px-5 py-2 text-sm 2xl:text-base",
        size === "lg" && "px-6 py-3 text-base",
        tones[tone],
        className,
      )}
      {...rest}
    >
      <span>{children}</span>
      <span className="pill-arrow" aria-hidden>
        <ArrowUpRightIcon />
        <ArrowUpRightIcon />
      </span>
    </Link>
  );
}
