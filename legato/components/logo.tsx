import { BRAND } from "@/lib/brand";
import { cn } from "@/lib/utils";

/**
 * Brand mark: a closed, cloth-bound book seen from the spine, with the
 * ribbon marker hanging out at the foot. On paper the book is cloth blue; on
 * cloth (`onCloth`) it is drawn in paper white. The ribbon is always saffron.
 */
export function BookMark({ className, onCloth = false }: { className?: string; onCloth?: boolean }) {
  const body = onCloth ? "var(--paper)" : "var(--cloth)";
  const line = onCloth ? "var(--cloth-deep)" : "var(--paper)";
  return (
    <svg viewBox="0 0 20 36" fill="none" aria-hidden="true" className={cn("inline-block shrink-0", className)}>
      {/* Ribbon, behind the spine */}
      <path d="M11 24 H15.5 V36 L13.25 33.2 L11 36 Z" fill="var(--ribbon)" />
      {/* Spine */}
      <rect x="2" y="1" width="16" height="26" rx="1" fill={body} />
      {/* Stamped bands */}
      <path d="M2 6 H18 M2 22 H18" stroke={line} strokeWidth="1.2" />
      <path d="M2 8.4 H18" stroke={line} strokeWidth="0.6" />
    </svg>
  );
}

/** Mark + name, for the menu bar. Scales with the font size of its parent. */
export function Wordmark({ className, onCloth = false }: { className?: string; onCloth?: boolean }) {
  return (
    <span className={cn("inline-flex items-center gap-[0.36em] font-display leading-none", className)}>
      <BookMark onCloth={onCloth} className="h-[1.02em] w-auto translate-y-[0.1em]" />
      <span className="font-medium tracking-[-0.01em]">{BRAND.name}</span>
    </span>
  );
}

/**
 * Oversized wordmark that spans the width of its container (footer), stamped
 * into the cloth like the title on the front cover.
 */
export function GiantWordmark({ className }: { className?: string }) {
  // Size follows the number of letters, so a new working name still fits.
  const size = `${(92 / (BRAND.name.length * 0.5)).toFixed(1)}cqi`;
  return (
    <div role="img" aria-label={`${BRAND.name}, ${BRAND.descriptor}`} className={cn("select-none font-display [container-type:inline-size]", className)}>
      <div aria-hidden="true" className="foil-stamp whitespace-nowrap pb-[0.2em] font-normal leading-[0.8] tracking-[-0.03em]" style={{ fontSize: size }}>
        {BRAND.name}
      </div>
      <div aria-hidden="true" className="mt-[2.5cqi] flex items-center gap-[0.5em] text-[clamp(1.25rem,3.4cqi,3rem)]">
        <BookMark onCloth className="h-[1em] w-auto" />
        <span className="italic leading-none">{BRAND.descriptor}</span>
      </div>
    </div>
  );
}
