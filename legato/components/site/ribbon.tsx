"use client";

import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

/**
 * The ribbon marker (leeslint): a saffron silk ribbon hanging out of the top
 * of the page, in the right-hand gutter. It grows with scroll progress, like
 * a marker moving through the book: 12vh at the top, 82vh at the end.
 *
 * Decorative only (aria-hidden, no pointer events), hidden under 640px. With
 * "reduce motion" it keeps a fixed short length. On the home page it drops in
 * once, about a second after the cover title (the one page-load moment).
 */
export function Ribbon() {
  const ref = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  // Only a first load on the home page gets the drop; later navigation does not.
  const [drop] = useState(pathname === "/");

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    let frame = 0;

    const update = () => {
      frame = 0;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      const progress = reduce.matches || max <= 0 ? 0 : Math.min(1, Math.max(0, window.scrollY / max));
      el.style.setProperty("--ribbon-progress", progress.toFixed(4));
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };

    schedule();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    reduce.addEventListener("change", schedule);
    return () => {
      if (frame) cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      reduce.removeEventListener("change", schedule);
    };
    // Page height changes with the route, so measure again after navigation.
  }, [pathname]);

  return (
    <div
      ref={ref}
      aria-hidden="true"
      className={`pointer-events-none fixed top-0 z-40 hidden w-[14px] sm:block ${drop ? "animate-ribbon-drop" : ""}`}
      style={{
        right: "clamp(1rem, 4vw, 4rem)",
        height: "calc(12vh + var(--ribbon-progress, 0) * 70vh)",
        // Silk: a darker edge on the left, a faint sheen down the middle.
        background:
          "linear-gradient(90deg, rgb(120 78 0 / 0.38) 0 2px, transparent 2px), linear-gradient(90deg, transparent 40%, rgb(255 255 255 / 0.18) 55%, transparent 75%), var(--ribbon)",
        // Swallow-tail at the foot.
        clipPath: "polygon(0 0, 100% 0, 100% 100%, 50% calc(100% - 9px), 0 100%)",
        filter: "drop-shadow(0 1px 1px rgb(14 22 48 / 0.25))",
      }}
    />
  );
}
