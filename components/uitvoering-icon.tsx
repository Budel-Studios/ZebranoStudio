import { useId } from "react";
import type { UitvoeringSlug } from "@/data/uitvoeringen";
import { cn } from "@/lib/utils";

/**
 * Line drawings of the four uitvoeringen. On hover of the nearest `group`
 * they show how the door opens — the same idea as the door in the logo:
 * a pivot door turns around its off-centre axis, a sliding door slides
 * along its rail, a hinged door swings on its hinges, light moves through
 * a room divider. Decorative (aria-hidden); the label sits next to it.
 */
const line = { stroke: "currentColor", strokeWidth: 1.25, vectorEffect: "non-scaling-stroke" as const, fill: "none" };
const move = "transition-transform duration-700 ease-door";

export function UitvoeringIcon({ slug, className }: { slug: UitvoeringSlug; className?: string }) {
  const clip = `glas-${useId().replace(/[^a-zA-Z0-9_-]/g, "")}`;
  return (
    <svg viewBox="0 0 48 48" aria-hidden="true" className={cn("size-10 shrink-0 overflow-visible", className)}>
      <line x1="3" y1="42.5" x2="45" y2="42.5" {...line} />

      {slug === "taatsdeur" && (
        <>
          <rect x="13" y="6" width="22" height="36" {...line} strokeDasharray="2 2" opacity={0.45} />
          <g className={cn(move, "origin-[20px_24px] group-hover:[transform:scaleX(0.28)]")}>
            <rect x="13" y="6" width="22" height="36" {...line} fill="currentColor" fillOpacity={0.08} />
            <line x1="31" y1="21" x2="31" y2="27" {...line} />
          </g>
          {/* the pivot axis */}
          <line x1="20" y1="2.5" x2="20" y2="45.5" {...line} strokeDasharray="1.5 2" className="text-copper" />
        </>
      )}

      {slug === "schuifdeur" && (
        <>
          <line x1="3" y1="5.5" x2="45" y2="5.5" {...line} />
          <rect x="7" y="9" width="18" height="33" {...line} strokeDasharray="2 2" opacity={0.45} />
          <g className={cn(move, "group-hover:[transform:translateX(16px)]")}>
            <line x1="11" y1="5.5" x2="11" y2="9" {...line} />
            <line x1="21" y1="5.5" x2="21" y2="9" {...line} />
            <rect x="7" y="9" width="18" height="33" {...line} fill="currentColor" fillOpacity={0.08} />
            <line x1="21" y1="22" x2="21" y2="29" {...line} />
          </g>
        </>
      )}

      {slug === "draaideur" && (
        <>
          <rect x="13" y="6" width="22" height="36" {...line} strokeDasharray="2 2" opacity={0.45} />
          <g className={cn(move, "origin-[13px_24px] group-hover:[transform:scaleX(0.5)]")}>
            <rect x="13" y="6" width="22" height="36" {...line} fill="currentColor" fillOpacity={0.08} />
            <circle cx="31" cy="24.5" r="1.1" fill="currentColor" className="transition-opacity duration-500 group-hover:opacity-0" />
          </g>
          {/* hinges */}
          <line x1="11" y1="11" x2="13" y2="11" {...line} className="text-copper" />
          <line x1="11" y1="37" x2="13" y2="37" {...line} className="text-copper" />
        </>
      )}

      {slug === "roomdivider" && (
        <>
          <defs>
            <clipPath id={clip}>
              <rect x="4" y="6" width="40" height="36" />
            </clipPath>
          </defs>
          <rect x="4" y="6" width="40" height="36" {...line} fill="currentColor" fillOpacity={0.05} />
          <line x1="17.33" y1="6" x2="17.33" y2="42" {...line} />
          <line x1="30.67" y1="6" x2="30.67" y2="42" {...line} />
          {/* light passing through the glass */}
          <g clipPath={`url(#${clip})`}>
            <g className={cn("transition-transform duration-1000 ease-door group-hover:[transform:translateX(26px)]", "text-copper")}>
              <line x1="5" y1="35" x2="13" y2="15" {...line} />
              <line x1="9" y1="35" x2="15" y2="20" {...line} opacity={0.6} />
            </g>
          </g>
        </>
      )}
    </svg>
  );
}
