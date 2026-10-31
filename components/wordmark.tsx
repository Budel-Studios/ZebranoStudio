"use client";

import type { PointerEvent } from "react";
import { cn } from "@/lib/utils";

/**
 * The big "ZEBRAN▯" wordmark, cut out of the official logo
 * (public/brand/wordmark-zebrano.svg is used as a CSS mask). On hover a soft
 * spotlight in Zebrano green opens at the pointer and follows it through the
 * letters — the same idea as the "budel" wordmark on budelstudios.com.
 * Styling lives in app/globals.css (.spotlight-wordmark):
 * - tone "dark": near-black letters on white (hero), light-green spotlight;
 * - tone "light": white letters (footer on sage), forest-green spotlight;
 * - sweep: the spotlight crosses the logo once when the page opens.
 */
export function SpotlightWordmark({
  className,
  tone = "dark",
  sweep = false,
  decorative = false,
}: {
  className?: string;
  tone?: "dark" | "light";
  sweep?: boolean;
  /** Hide from assistive tech when a parent already names it (e.g. a link). */
  decorative?: boolean;
}) {
  const follow = (e: PointerEvent<HTMLDivElement>) => {
    const el = e.currentTarget;
    const r = el.getBoundingClientRect();
    el.style.setProperty("--spot-x", `${e.clientX - r.left}px`);
    el.style.setProperty("--spot-y", `${e.clientY - r.top}px`);
  };

  return (
    <div
      {...(decorative ? { "aria-hidden": true } : { role: "img", "aria-label": "Zebrano" })}
      onPointerEnter={follow}
      onPointerMove={follow}
      className={cn(
        "spotlight-wordmark",
        tone === "light" && "spotlight-wordmark--light",
        sweep && "spotlight-wordmark--sweep",
        className,
      )}
    />
  );
}

/**
 * "STUDIO" from the official logo with the round dot after it (after the
 * "Studios." of budelstudios.com). Set its size with a font size on the
 * element (className, e.g. text-[clamp(14px,2.6vw,34px)]): the letters are
 * 1em high and the dot scales along.
 */
export function StudioWordmark({
  className,
  letters = "bg-ink",
  dot = "bg-forest",
}: {
  className?: string;
  /** Background utility for the letters (they are a mask). */
  letters?: string;
  /** Background utility for the dot. */
  dot?: string;
}) {
  return (
    <div aria-hidden className={cn("relative w-fit", className)}>
      <div
        className={cn(
          "h-[1em] [mask:url(/brand/wordmark-studio.svg)_center/contain_no-repeat] [-webkit-mask:url(/brand/wordmark-studio.svg)_center/contain_no-repeat]",
          letters,
        )}
        style={{ aspectRatio: "486.68 / 86.08" }}
      />
      <span className={cn("absolute bottom-0 -right-[0.46em] size-[0.3em] rounded-full", dot)} />
    </div>
  );
}
