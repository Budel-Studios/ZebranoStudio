import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import type { ReactNode } from "react";
import { Arrow } from "@/components/ui/arrow";
import { button } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";
import { breadcrumbSchema, jsonLd } from "@/lib/jsonld";
import { primaryCta } from "@/lib/navigation";
import { cn } from "@/lib/utils";

/**
 * Building blocks shared by every page (taken over from the Zebrano Studio
 * site, so both sites are built the same way): page container, eyebrow, page
 * headers, section headings and the wine-coloured closing block.
 */

/** Page width and side gutters (same as the menu bar). */
export const container = "mx-auto w-full max-w-[1600px] px-4 sm:px-8";

export function Container({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn(container, className)}>{children}</div>;
}

/** Small uppercase label with a gold rule in front. */
export function Eyebrow({ children, className }: { children: ReactNode; className?: string }) {
  return <p className={cn("eyebrow", className)}>{children}</p>;
}

export function JsonLd({ data }: { data: unknown }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(data) }} />;
}

/** Title with a gold full stop ("Het boek."). */
export function DotTitle({ children }: { children: string }) {
  const last = children.slice(-1);
  if (last === "?" || last === "!") return <>{children}</>;
  const base = last === "." ? children.slice(0, -1) : children;
  return (
    <>
      {base}
      <span className="text-gold">.</span>
    </>
  );
}

/** Second, softer half of a heading, set in the italic of the display face. */
export function Soft({ children }: { children: ReactNode }) {
  return <span className="italic text-muted-foreground">{children}</span>;
}

export type Crumb = { name: string; path: string };

/**
 * BreadcrumbList JSON-LD on every page; visible only two levels deep, as a
 * quiet "← parent / current" line.
 */
export function Breadcrumbs({ items, className }: { items: Crumb[]; className?: string }) {
  const all = [{ name: "Home", path: "/" }, ...items];
  const parent = items.length >= 2 ? items[items.length - 2] : null;
  const current = items[items.length - 1];
  return (
    <>
      {parent && current && (
        <nav aria-label="Kruimelpad" className={cn("flex items-center gap-3 text-[0.8125rem] text-muted-foreground", className)}>
          <Link href={parent.path} className="group inline-flex items-center gap-2 hover:text-foreground">
            <ArrowLeft strokeWidth={1.25} aria-hidden className="size-4 transition-transform duration-500 ease-page group-hover:-translate-x-0.5" />
            <span className="link-line">{parent.name}</span>
          </Link>
          <span aria-hidden="true">/</span>
          <span aria-current="page" className="text-foreground">
            {current.name}
          </span>
        </nav>
      )}
      <JsonLd data={breadcrumbSchema(all)} />
    </>
  );
}

/**
 * Page header with a large visual on the right: eyebrow, big title and intro
 * left, the visual unveiling from the top. There is no photography yet, so
 * `visual` is a drawn mock (components/site/book-mock.tsx) on a toned stage.
 * `children` go under a hairline at the bottom of the text column.
 */
export function PageHero({
  eyebrow,
  title,
  intro,
  visual,
  crumbs,
  children,
  titleClassName,
}: {
  eyebrow: string;
  title: ReactNode;
  intro?: ReactNode;
  visual: ReactNode;
  crumbs?: Crumb[];
  children?: ReactNode;
  titleClassName?: string;
}) {
  return (
    <section className={cn(container, "pb-24 pt-32 lg:pt-40")}>
      {crumbs && <Breadcrumbs items={crumbs} className="mb-8" />}
      <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
        {/* Size container: on large screens the title scales with its column, so long Dutch words never overflow. */}
        <div className="@container flex flex-col justify-between lg:col-span-5">
          <div className="animate-rise">
            <Eyebrow>{eyebrow}</Eyebrow>
            <h1 className={cn("mt-6 text-5xl leading-[1] sm:text-6xl lg:text-[min(5rem,14.5cqi)]", titleClassName)}>{title}</h1>
            {intro && <div className="mt-8 max-w-md space-y-4 text-lg leading-relaxed text-muted-foreground">{intro}</div>}
          </div>
          {children && <div className="mt-12 animate-rise border-t pt-6 [animation-delay:150ms]">{children}</div>}
        </div>
        <div className="animate-unveil lg:col-span-7">{visual}</div>
      </div>
    </section>
  );
}

/** Text-only page header: title left, intro right, hairline below. */
export function PageHeader({
  eyebrow,
  title,
  intro,
  crumbs,
  children,
  className,
}: {
  eyebrow: string;
  title: ReactNode;
  intro?: ReactNode;
  crumbs?: Crumb[];
  children?: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn(container, "pt-32 lg:pt-40", className)}>
      {crumbs && <Breadcrumbs items={crumbs} className="mb-8" />}
      <header className="grid gap-8 border-b pb-12 lg:grid-cols-12 lg:items-end">
        <div className="animate-rise lg:col-span-7">
          <Eyebrow>{eyebrow}</Eyebrow>
          <h1 className="mt-6 text-5xl leading-[1] sm:text-6xl lg:text-7xl">{title}</h1>
        </div>
        {(intro || children) && (
          <div className="animate-rise [animation-delay:120ms] lg:col-span-5">
            {intro && <div className="space-y-4 text-lg leading-relaxed text-muted-foreground">{intro}</div>}
            {children}
          </div>
        )}
      </header>
    </div>
  );
}

/** Section heading: eyebrow + title left, optional action right. */
export function SectionHeading({
  eyebrow,
  title,
  action,
  className,
  titleClassName,
}: {
  eyebrow: string;
  title: ReactNode;
  action?: ReactNode;
  className?: string;
  titleClassName?: string;
}) {
  return (
    <Reveal className={cn("flex flex-wrap items-end justify-between gap-6", className)}>
      <div>
        <Eyebrow>{eyebrow}</Eyebrow>
        <h2 className={cn("mt-5 text-4xl leading-[1.05] sm:text-5xl", titleClassName)}>{title}</h2>
      </div>
      {action}
    </Reveal>
  );
}

/** Two-column intro: heading left (5 cols), text right (6 cols), hairline above. */
export function SplitIntro({
  eyebrow,
  title,
  children,
  className,
}: {
  eyebrow: string;
  title: ReactNode;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("grid gap-10 border-t pt-14 lg:grid-cols-12", className)}>
      <Reveal className="lg:col-span-5">
        <Eyebrow>{eyebrow}</Eyebrow>
        <h2 className="mt-5 max-w-[18ch] text-balance text-4xl leading-[1.05] sm:text-5xl">{title}</h2>
      </Reveal>
      <Reveal delay={100} className="lg:col-span-6 lg:col-start-7">
        <div className="space-y-5 text-lg leading-relaxed text-muted-foreground">{children}</div>
      </Reveal>
    </div>
  );
}

/** Numbered columns under a hairline (the "why" row of the home page). */
export function NumberedGrid({ items, className }: { items: Array<[title: string, text: string]>; className?: string }) {
  const cols = items.length >= 5 ? "lg:grid-cols-5" : items.length === 4 ? "lg:grid-cols-4" : "lg:grid-cols-3";
  return (
    <div className={cn("grid sm:grid-cols-2", cols, className)}>
      {items.map(([title, text], i) => (
        <Reveal key={title} delay={i * 60} className="border-t py-8 sm:pr-8 lg:border-l lg:border-t-0 lg:px-6 lg:py-2 lg:first:border-l-0 lg:first:pl-0">
          <p className="text-[0.6875rem] tabular-nums tracking-[0.2em] text-gold">{String(i + 1).padStart(2, "0")}</p>
          <h3 className="mt-4 text-2xl">{title}</h3>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{text}</p>
        </Reveal>
      ))}
    </div>
  );
}

/**
 * Closing block in wine: heading left, text and the two actions right.
 * Defaults speak to couples; pass props for photographers.
 */
export function CtaSection({
  eyebrow = "Vraag een voorstel",
  title = "Klaar om van jullie dag een boek te maken?",
  text = "Vertel ons over jullie dag en wie hem heeft vastgelegd. We denken mee over hoofdstukken, verhalen en omslag, en sturen een voorstel dat bij jullie past.",
  cta = primaryCta,
  secondary = { label: "Bekijk het boek", href: "/het-boek" },
}: {
  eyebrow?: string;
  title?: string;
  text?: string;
  cta?: { label: string; href: string };
  secondary?: { label: string; href: string } | null;
}) {
  return (
    <section className="px-3 pb-3 sm:px-4 sm:pb-4">
      <div className="mx-auto max-w-[1600px] rounded-sm bg-wine text-wine-foreground">
        <div className="grid gap-10 px-6 py-20 sm:px-10 lg:grid-cols-12 lg:px-14 lg:py-28">
          <Reveal className="lg:col-span-6">
            <p className="eyebrow text-wine-muted">{eyebrow}</p>
            <h2 className="mt-5 max-w-[19ch] text-balance text-4xl leading-[1.05] sm:text-6xl">{title}</h2>
          </Reveal>
          <Reveal delay={100} className="flex flex-col justify-end lg:col-span-5 lg:col-start-8">
            <p className="text-lg leading-relaxed text-wine-muted">{text}</p>
            <div className="mt-10 flex flex-wrap items-center gap-4">
              <Link href={cta.href} className={button({ variant: "light", size: "lg" })}>
                {cta.label} <Arrow />
              </Link>
              {secondary && (
                <Link href={secondary.href} className={button({ variant: "outlineLight", size: "lg" })}>
                  {secondary.label}
                </Link>
              )}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
