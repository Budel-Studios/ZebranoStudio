import Link from "next/link";
import type { ReactNode } from "react";
import { breadcrumbSchema, jsonLd } from "@/lib/jsonld";
import { cn } from "@/lib/utils";

/** Page-width container with the same side gutters as the menu bar. */
export function Container({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn("mx-auto w-full max-w-7xl px-5 sm:px-8 lg:px-12", className)}>{children}</div>;
}

/** Small label above a heading (the "caption" of the original site). */
export function Eyebrow({ children, className, tone = "dark" }: { children: ReactNode; className?: string; tone?: "dark" | "light" }) {
  return (
    <span
      className={cn(
        "mb-3 inline-flex items-center gap-2 font-sans text-xs font-semibold uppercase tracking-[0.16em]",
        tone === "dark" ? "text-bark/80" : "text-paper/80",
        className,
      )}
    >
      <span aria-hidden className={cn("h-px w-6", tone === "dark" ? "bg-accent" : "bg-paper/70")} />
      {children}
    </span>
  );
}

export function JsonLd({ data }: { data: unknown }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(data) }} />;
}

export type Crumb = { name: string; path: string };

/** Visible breadcrumbs + BreadcrumbList JSON-LD. Home is added automatically. */
export function Breadcrumbs({ items, tone = "dark", className }: { items: Crumb[]; tone?: "dark" | "light"; className?: string }) {
  const all = [{ name: "Home", path: "/" }, ...items];
  return (
    <>
      <nav aria-label="Kruimelpad" className={cn("text-sm", className)}>
        <ol className={cn("flex flex-wrap items-center gap-x-2 gap-y-1", tone === "dark" ? "text-ink/60" : "text-paper/75")}>
          {all.map((c, i) => (
            <li key={c.path} className="flex items-center gap-2">
              {i > 0 && <span aria-hidden>/</span>}
              {i < all.length - 1 ? (
                <Link href={c.path} className="transition-colors hover:text-accent">
                  {c.name}
                </Link>
              ) : (
                <span aria-current="page" className={tone === "dark" ? "text-ink" : "text-paper"}>
                  {c.name}
                </span>
              )}
            </li>
          ))}
        </ol>
      </nav>
      <JsonLd data={breadcrumbSchema(all)} />
    </>
  );
}

/** Plain intro block for pages without a photo hero (sits below the fixed menu bar). */
export function PageIntro({
  eyebrow,
  title,
  children,
  crumbs,
  className,
}: {
  eyebrow?: string;
  title: string;
  children?: ReactNode;
  crumbs?: Crumb[];
  className?: string;
}) {
  return (
    <section className={cn("bg-sand/60 pb-14 pt-32 sm:pb-20 sm:pt-36", className)}>
      <Container>
        {crumbs && <Breadcrumbs items={crumbs} className="mb-8" />}
        {eyebrow && <Eyebrow>{eyebrow}</Eyebrow>}
        <h1 className="max-w-4xl font-display text-4xl font-light leading-[1.08] tracking-tight text-ink sm:text-5xl lg:text-6xl">
          {title}
        </h1>
        {children && <div className="mt-6 max-w-3xl text-lg leading-relaxed text-ink/80">{children}</div>}
      </Container>
    </section>
  );
}
