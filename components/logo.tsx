import { cn } from "@/lib/utils";
import {
  LOGO_HORIZONTAL_PATHS,
  LOGO_HORIZONTAL_VIEWBOX,
  LOGO_MARK_PATHS,
  LOGO_MARK_VIEWBOX,
  LOGO_STACKED_PATHS,
  LOGO_STACKED_VIEWBOX,
} from "@/components/logo-paths";

/**
 * Zebrano Studio logo, converted from the original vector file
 * ("Logo AI files (1).ai"). Paths only, coloured with currentColor, inlined
 * so it renders in the server HTML without an extra request.
 * Static SVG files for other uses live in public/brand/.
 */

type Variant = "horizontal" | "stacked" | "mark";

const VARIANTS: Record<Variant, { viewBox: string; paths: string[] }> = {
  horizontal: { viewBox: LOGO_HORIZONTAL_VIEWBOX, paths: LOGO_HORIZONTAL_PATHS },
  stacked: { viewBox: LOGO_STACKED_VIEWBOX, paths: LOGO_STACKED_PATHS },
  mark: { viewBox: LOGO_MARK_VIEWBOX, paths: LOGO_MARK_PATHS },
};

export function Logo({
  variant = "horizontal",
  className,
  title = "Zebrano Studio",
}: {
  variant?: Variant;
  className?: string;
  title?: string;
}) {
  const v = VARIANTS[variant];
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox={v.viewBox}
      fill="currentColor"
      role="img"
      aria-label={title}
      className={cn("block", className)}
    >
      {v.paths.map((d, i) => (
        <path key={i} d={d} />
      ))}
    </svg>
  );
}
