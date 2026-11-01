import { ArrowRight, ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

/** Thin arrow that nudges on hover of its button (group/btn) or card (group). */
export function Arrow({ diagonal = true, className }: { diagonal?: boolean; className?: string }) {
  const Icon = diagonal ? ArrowUpRight : ArrowRight;
  return (
    <Icon
      aria-hidden
      strokeWidth={1.25}
      className={cn(
        "size-4 shrink-0 transition-transform duration-500 ease-door",
        diagonal
          ? "group-hover/btn:-translate-y-0.5 group-hover/btn:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
          : "group-hover/btn:translate-x-1 group-hover:translate-x-1",
        className,
      )}
    />
  );
}
