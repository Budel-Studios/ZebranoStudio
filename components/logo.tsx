import { cn } from "@/lib/utils";

/**
 * Wordmark from the Lovable design: "ZEBRAN" in Jost with the door as the
 * "O". The leaf swings a little further open when the logo is hovered
 * (group/logo). The official lockups from the .ai file stay in
 * public/brand/ for print, social and the JSON-LD logo.
 */
export function DoorMark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 100 100" aria-hidden="true" className={cn("inline-block shrink-0 overflow-visible", className)}>
      <rect x="0" y="0" width="100" height="100" className="fill-current" />
      <rect x="21" y="17" width="58" height="83" style={{ fill: "var(--door-gap, var(--background))" }} />
      <g className="origin-[79px_58px] transition-transform duration-700 ease-door [transform:scaleX(0.74)] group-hover/logo:[transform:scaleX(0.5)]">
        <polygon points="21,22 79,17 79,100 21,95" className="fill-current" />
      </g>
      <circle
        cx="41"
        cy="59"
        r="2.8"
        style={{ fill: "var(--door-gap, var(--background))" }}
        className="transition-opacity duration-500 group-hover/logo:opacity-0"
      />
    </svg>
  );
}

export function Wordmark({ className, studio = true }: { className?: string; studio?: boolean }) {
  return (
    <span className={cn("group/logo inline-flex items-baseline gap-[0.18em] font-display leading-none", className)}>
      <span className="inline-flex items-baseline font-medium tracking-[0.02em]">
        ZEBRAN
        <DoorMark className="ml-[0.06em] h-[0.72em] w-[0.72em] translate-y-[0.01em]" />
      </span>
      {studio && <span className="font-light tracking-[0.06em]">STUDIO</span>}
    </span>
  );
}

/** Oversized wordmark that spans the full width of its container (footer). */
export function GiantWordmark({ className }: { className?: string }) {
  const letters = ["Z", "E", "B", "R", "A", "N"];
  return (
    <div
      role="img"
      aria-label="Zebrano Studio"
      className={cn("group/logo select-none font-display leading-[0.8] [--door-gap:var(--sage)]", className)}
    >
      <div className="flex items-end justify-between text-[17.5vw] font-medium xl:text-[16.5rem]" aria-hidden="true">
        {letters.map((l) => (
          <span key={l}>{l}</span>
        ))}
        <DoorMark className="mb-[0.04em] h-[0.7em] w-[0.7em]" />
      </div>
      <div className="mt-[2vw] flex items-baseline text-[5vw] font-normal tracking-[0.12em] xl:text-[4.5rem]" aria-hidden="true">
        STUDIO<span className="text-copper">.</span>
      </div>
    </div>
  );
}
