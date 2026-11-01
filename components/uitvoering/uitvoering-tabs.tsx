import Link from "next/link";
import { UitvoeringIcon } from "@/components/uitvoering-icon";
import { UITVOERINGEN, UITVOERINGEN_ZIN, type UitvoeringSlug } from "@/data/uitvoeringen";
import { cn } from "@/lib/utils";

/**
 * The four uitvoeringen as tabs: shows at a glance that every design comes in
 * these four, and switches between their pages. The current one is filled.
 * `row` (glass collection): label + sentence above four columns. `grid`
 * (hero of a door page, narrow column): label above a 2×2 grid.
 */
export function UitvoeringTabs({
  current,
  variant = "row",
  className,
}: {
  current?: UitvoeringSlug;
  variant?: "row" | "grid";
  className?: string;
}) {
  const grid = variant === "grid";
  return (
    <nav aria-label="Uitvoeringen" className={className}>
      <div className="flex flex-wrap items-baseline justify-between gap-x-8 gap-y-2">
        <p className="text-[0.6875rem] font-medium uppercase tracking-[0.22em] text-muted-foreground">Eén ontwerp, vier uitvoeringen</p>
        {!grid && <p className="text-sm text-muted-foreground">{UITVOERINGEN_ZIN}</p>}
      </div>
      <ul className={cn("mt-4 grid grid-cols-2 gap-2", !grid && "sm:grid-cols-4")}>
        {UITVOERINGEN.map((u) => {
          const on = u.slug === current;
          return (
            <li key={u.slug}>
              <Link
                href={u.href}
                aria-current={on ? "page" : undefined}
                className={cn(
                  "group flex h-full items-center gap-3 rounded-sm border px-3 py-3 transition-colors duration-300 sm:px-4",
                  on ? "border-primary bg-primary text-primary-foreground" : "hover:border-foreground",
                )}
              >
                <UitvoeringIcon slug={u.slug} className={cn("size-9", !on && "text-foreground")} />
                <span className="min-w-0">
                  <span className="block font-display text-lg leading-tight">{u.label}</span>
                  <span
                    className={cn(
                      "mt-0.5 text-[0.75rem] leading-snug",
                      grid ? "hidden sm:block" : "hidden lg:block",
                      on ? "text-primary-foreground/70" : "text-muted-foreground",
                    )}
                  >
                    {u.beweging}
                  </span>
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
