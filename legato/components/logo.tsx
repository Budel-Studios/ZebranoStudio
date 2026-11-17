import { BRAND } from "@/lib/brand";
import { cn } from "@/lib/utils";

/**
 * Brand mark: an open book seen from the edge, its two pages tied together by
 * a slur, the arc that means "legato" in music notation (and "bound" in
 * Italian). The slur is the gold accent; it redraws when the logo is hovered
 * (group/logo).
 */
export function BookMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 48 34" fill="none" aria-hidden="true" className={cn("inline-block shrink-0 overflow-visible", className)}>
      {/* Pages */}
      <path d="M3 30 V15.5 C9 11.5 17.5 11.5 24 16.5 C30.5 11.5 39 11.5 45 15.5 V30" stroke="currentColor" strokeWidth="2" strokeLinejoin="round" />
      <path d="M3 30 C9.5 26.6 17.5 26.6 24 30.8 C30.5 26.6 38.5 26.6 45 30" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M24 16.5 V30.8" stroke="currentColor" strokeWidth="2" />
      {/* Slur */}
      <path
        d="M9 7.5 C16 0.5 32 0.5 39 7.5"
        stroke="var(--gold)"
        strokeWidth="2"
        strokeLinecap="round"
        pathLength={1}
        strokeDasharray={1}
        className="[stroke-dashoffset:0] group-hover/logo:animate-[slur_0.9s_var(--ease-page)]"
      />
    </svg>
  );
}

/** Mark + name, for the menu bar. Scales with the font size of its parent. */
export function Wordmark({ className }: { className?: string }) {
  return (
    <span className={cn("group/logo inline-flex items-center gap-[0.42em] font-display leading-none", className)}>
      <BookMark className="h-[0.74em] w-auto" />
      <span className="translate-y-[-0.02em] font-medium tracking-[0.015em]">{BRAND.name}</span>
    </span>
  );
}

/** Oversized wordmark that spans the full width of its container (footer). */
export function GiantWordmark({ className }: { className?: string }) {
  const letters = BRAND.name.toUpperCase().split("");
  // Size follows the number of letters, so a new working name still fits.
  const size = `min(${(100 / letters.length).toFixed(2)}vw, ${(104 / letters.length).toFixed(2)}rem)`;
  return (
    <div role="img" aria-label={`${BRAND.name}, ${BRAND.descriptor}`} className={cn("group/logo select-none font-display leading-[0.78]", className)}>
      <div className="flex items-end justify-between font-medium" style={{ fontSize: size }} aria-hidden="true">
        {letters.map((l, i) => (
          <span key={i}>{l}</span>
        ))}
      </div>
      <div className="mt-[2.2vw] flex items-center gap-[0.5em] text-[5vw] xl:mt-8 xl:text-[4rem]" aria-hidden="true">
        <BookMark className="h-[0.62em] w-auto" />
        <span className="italic leading-none">
          {BRAND.descriptor}
          <span className="text-gold">.</span>
        </span>
      </div>
    </div>
  );
}
