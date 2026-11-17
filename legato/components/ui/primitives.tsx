import Link from "next/link";
import type { ReactNode } from "react";
import { button } from "@/components/ui/button";
import { breadcrumbSchema, jsonLd } from "@/lib/jsonld";
import { primaryCta } from "@/lib/navigation";
import { cn } from "@/lib/utils";

/**
 * Building blocks shared by every page: page container, label, page headers,
 * section headings and the cloth closing block (the back cover).
 *
 * Labels above headings ("eyebrow") are optional everywhere. Pass one only
 * when it says something the heading below does not (which chapter, which
 * step); a label that repeats the heading is left out.
 */

/**
 * Page width and side gutters. From 640px up the gutter is wide enough for
 * the ribbon marker (components/site/ribbon.tsx) to hang in it.
 */
export const container = "mx-auto w-full max-w-[1680px] px-5 sm:px-[clamp(3rem,7.5vw,7.5rem)]";

export function Container({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn(container, className)}>{children}</div>;
}

/** Quiet sentence-case label in Albert Sans. */
export function Eyebrow({ children, className }: { children: ReactNode; className?: string }) {
  return <p className={cn("eyebrow", className)}>{children}</p>;
}

export function JsonLd({ data }: { data: unknown }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(data) }} />;
}

/** Kept for imports: headings are one voice, so this renders its text unchanged. */
export function Soft({ children }: { children: ReactNode }) {
  return <>{children}</>;
}

export type Crumb = { name: string; path: string };

/**
 * BreadcrumbList JSON-LD on every page; visible only two levels deep, as a
 * quiet "parent / current" line.
 */
export function Breadcrumbs({ items, className }: { items: Crumb[]; className?: string }) {
  const all = [{ name: "Home", path: "/" }, ...items];
  const parent = items.length >= 2 ? items[items.length - 2] : null;
  const current = items[items.length - 1];
  return (
    <>
      {parent && current && (
        <nav aria-label="Kruimelpad" className={cn("flex items-center gap-2 text-sm text-muted-foreground", className)}>
          <Link href={parent.path} className="link-line hover:text-foreground">
            {parent.name}
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
 * Page header with a large visual on the right: title and intro left, the
 * visual right. There is no photography yet, so `visual` is a drawn mock
 * (components/site/book-mock.tsx) on a toned stage. `children` go under a
 * hairline at the bottom of the text column.
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
  eyebrow?: string;
  title: ReactNode;
  intro?: ReactNode;
  visual: ReactNode;
  crumbs?: Crumb[];
  children?: ReactNode;
  titleClassName?: string;
}) {
  return (
    <section className={cn(container, "pb-20 pt-32 lg:pb-28 lg:pt-44")}>
      {crumbs && <Breadcrumbs items={crumbs} className="mb-8" />}
      <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
        {/* Size container: on large screens the title scales with its column, so long Dutch words never overflow. */}
        <div className="@container flex flex-col justify-between lg:col-span-5">
          <div>
            {eyebrow && <Eyebrow className="mb-5">{eyebrow}</Eyebrow>}
            <h1 className={cn("lg:text-[min(5.5rem,15cqi)]", titleClassName)}>{title}</h1>
            {intro && <div className="mt-8 max-w-[34rem] space-y-4 text-lead text-muted-foreground">{intro}</div>}
          </div>
          {children && <div className="mt-12 border-t pt-6">{children}</div>}
        </div>
        <div className="lg:col-span-7">{visual}</div>
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
  eyebrow?: string;
  title: ReactNode;
  intro?: ReactNode;
  crumbs?: Crumb[];
  children?: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn(container, "pt-32 lg:pt-44", className)}>
      {crumbs && <Breadcrumbs items={crumbs} className="mb-8" />}
      <header className="grid gap-8 border-b pb-12 lg:grid-cols-12 lg:items-end">
        <div className="lg:col-span-7">
          {eyebrow && <Eyebrow className="mb-5">{eyebrow}</Eyebrow>}
          <h1>{title}</h1>
        </div>
        {(intro || children) && (
          <div className="lg:col-span-5">
            {intro && <div className="space-y-4 text-lead text-muted-foreground">{intro}</div>}
            {children}
          </div>
        )}
      </header>
    </div>
  );
}

/** Section heading: title left, optional action right. */
export function SectionHeading({
  eyebrow,
  title,
  action,
  className,
  titleClassName,
}: {
  eyebrow?: string;
  title: ReactNode;
  action?: ReactNode;
  className?: string;
  titleClassName?: string;
}) {
  return (
    <div className={cn("flex flex-wrap items-end justify-between gap-6", className)}>
      <div>
        {eyebrow && <Eyebrow className="mb-4">{eyebrow}</Eyebrow>}
        <h2 className={cn("max-w-[20ch]", titleClassName)}>{title}</h2>
      </div>
      {action}
    </div>
  );
}

/** Two-column intro: heading left (5 cols), text right (6 cols), hairline above. */
export function SplitIntro({
  eyebrow,
  title,
  children,
  className,
}: {
  eyebrow?: string;
  title: ReactNode;
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={cn("grid gap-8 border-t pt-12 lg:grid-cols-12 lg:gap-10", className)}>
      <div className="lg:col-span-5">
        {eyebrow && <Eyebrow className="mb-4">{eyebrow}</Eyebrow>}
        <h2 className="max-w-[18ch]">{title}</h2>
      </div>
      <div className="lg:col-span-6 lg:col-start-7">
        <div className="space-y-5 text-lead text-muted-foreground">{children}</div>
      </div>
    </div>
  );
}

/**
 * Plain columns separated by hairlines. The name is historical: the items are
 * a set of reasons, not a sequence, so they carry no numbers.
 */
export function NumberedGrid({ items, className }: { items: Array<[title: string, text: string]>; className?: string }) {
  const cols = items.length >= 5 ? "lg:grid-cols-5" : items.length === 4 ? "lg:grid-cols-4" : "lg:grid-cols-3";
  return (
    <div className={cn("grid sm:grid-cols-2", cols, className)}>
      {items.map(([title, text]) => (
        <div key={title} className="border-t py-7 sm:pr-8 lg:border-l lg:border-t-0 lg:px-6 lg:py-1 lg:first:border-l-0 lg:first:pl-0">
          <h3>{title}</h3>
          <p className="mt-3 text-small text-muted-foreground">{text}</p>
        </div>
      ))}
    </div>
  );
}

/**
 * The back cover: a full-width cloth block that runs straight into the
 * footer. Heading left, text and the two actions right. Defaults speak to
 * couples; pass props for photographers.
 */
export function CtaSection({
  title = "Klaar om van jullie dag een boek te maken?",
  text = "Vertel ons over jullie dag en wie hem heeft vastgelegd. We denken mee over hoofdstukken, verhalen en omslag, en sturen een voorstel dat bij jullie past.",
  cta = primaryCta,
  secondary = { label: "Bekijk het boek", href: "/het-boek" },
}: {
  /** No longer shown: the label repeated the button. Accepted so callers keep compiling. */
  eyebrow?: string;
  title?: string;
  text?: string;
  cta?: { label: string; href: string };
  secondary?: { label: string; href: string } | null;
}) {
  return (
    <section className="cloth-weave bg-cloth text-cloth-foreground">
      <div className={cn(container, "grid gap-10 py-20 lg:grid-cols-12 lg:py-28")}>
        <div className="lg:col-span-6">
          <h2 className="max-w-[17ch]">{title}</h2>
        </div>
        <div className="flex flex-col justify-end lg:col-span-5 lg:col-start-8">
          <p className="text-lead text-cloth-muted">{text}</p>
          <div className="mt-9 flex flex-wrap items-center gap-x-7 gap-y-4">
            <Link href={cta.href} className={button({ variant: "light", size: "lg" })}>
              {cta.label}
            </Link>
            {secondary && (
              <Link href={secondary.href} className="link-line text-[0.9375rem] font-medium text-cloth-foreground">
                {secondary.label}
              </Link>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
