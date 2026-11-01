import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import type { ReactNode } from "react";
import { AmbientVideo } from "@/components/ui/ambient-video";
import { Arrow } from "@/components/ui/arrow";
import { button } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";
import { company } from "@/data/company";
import type { Img } from "@/lib/images";
import { breadcrumbSchema, jsonLd } from "@/lib/jsonld";
import { primaryCta } from "@/lib/navigation";
import { cn } from "@/lib/utils";

/**
 * Building blocks of the Lovable design, shared by every page so the whole
 * site moves and reads the same: page container, eyebrow, page headers,
 * section headings and the green closing block.
 */

/** Page width and side gutters (same as the menu bar). */
export const container = "mx-auto w-full max-w-[1600px] px-4 sm:px-8";

export function Container({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn(container, className)}>{children}</div>;
}

/** Small uppercase label with a copper rule in front. */
export function Eyebrow({ children, className }: { children: ReactNode; className?: string }) {
  return <p className={cn("eyebrow", className)}>{children}</p>;
}

export function JsonLd({ data }: { data: unknown }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd(data) }} />;
}

/** Title with the copper full stop of the design ("Glascollectie."). */
export function DotTitle({ children }: { children: string }) {
  const last = children.slice(-1);
  if (last === "?" || last === "!") return <>{children}</>;
  const base = last === "." ? children.slice(0, -1) : children;
  return (
    <>
      {base}
      <span className="text-copper">.</span>
    </>
  );
}

export type Crumb = { name: string; path: string };

/**
 * BreadcrumbList JSON-LD on every page; visible only two levels deep (a glass
 * design under its collection), as a quiet "← parent / current" line, as in
 * the Lovable design.
 */
export function Breadcrumbs({ items, className }: { items: Crumb[]; className?: string }) {
  const all = [{ name: "Home", path: "/" }, ...items];
  const parent = items.length > 2 ? items[items.length - 2] : null;
  const current = items[items.length - 1];
  return (
    <>
      {parent && current && (
        <nav aria-label="Kruimelpad" className={cn("flex items-center gap-3 text-[0.8125rem] text-muted-foreground", className)}>
          <Link href={parent.path} className="group inline-flex items-center gap-2 hover:text-foreground">
            <ArrowLeft
              strokeWidth={1.25}
              aria-hidden
              className="size-4 transition-transform duration-500 ease-door group-hover:-translate-x-0.5"
            />
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
 * Page header with a large image on the right (the Lovable content page):
 * eyebrow, big light title and intro left, image unveiling from the top.
 * `children` go under a hairline at the bottom of the text column.
 */
export function PageHero({
  eyebrow,
  title,
  intro,
  image,
  video,
  crumbs,
  children,
  imageClassName,
  titleClassName,
}: {
  eyebrow: string;
  title: ReactNode;
  intro?: ReactNode;
  /** The hero image; with `video` it is the poster that shows until (or instead of) the video. */
  image: Img;
  /** Optional muted ambient video over the image (see AmbientVideo). */
  video?: string;
  crumbs?: Crumb[];
  children?: ReactNode;
  imageClassName?: string;
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
            <h1 className={cn("mt-6 text-5xl leading-[1.02] sm:text-6xl lg:text-[min(4.5rem,13.5cqi)]", titleClassName)}>{title}</h1>
            {intro && <div className="mt-8 max-w-md text-lg leading-relaxed text-muted-foreground">{intro}</div>}
          </div>
          {children && <div className="mt-12 animate-rise border-t pt-6 [animation-delay:150ms]">{children}</div>}
        </div>
        <div className="lg:col-span-7">
          <div
            className={cn(
              "relative aspect-[4/5] w-full animate-unveil overflow-hidden rounded-sm bg-muted lg:aspect-[5/6]",
              imageClassName,
            )}
          >
            <Image src={image.src} alt={image.alt} fill priority sizes="(min-width: 1024px) 55vw, 100vw" className="object-cover" />
            {video && <AmbientVideo src={video} />}
          </div>
        </div>
      </div>
    </section>
  );
}

/** Text-only page header (the Lovable collection header): title left, intro right, hairline below. */
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
          <h1 className="mt-6 text-5xl leading-[1.02] sm:text-6xl lg:text-7xl">{title}</h1>
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
        <h2 className={cn("mt-5 text-4xl sm:text-5xl", titleClassName)}>{title}</h2>
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
        <h2 className="mt-5 max-w-[16ch] text-4xl leading-[1.08] sm:text-5xl">{title}</h2>
      </Reveal>
      <Reveal delay={100} className="lg:col-span-6 lg:col-start-7">
        <div className="space-y-5 text-lg leading-relaxed text-muted-foreground">{children}</div>
      </Reveal>
    </div>
  );
}

/**
 * Closing block in forest green (the "Werkwijze" block of the Lovable home):
 * heading left, text and the two actions right.
 */
export function CtaSection({
  eyebrow = "Vraag een voorstel",
  title = "Klaar voor een deur die jouw verhaal vertelt?",
  text = "Vertel ons over je ruimte en je ideeën. We denken mee over vorm, materiaal en beslag en sturen je een voorstel op maat.",
  cta = primaryCta,
}: {
  eyebrow?: string;
  title?: string;
  text?: string;
  cta?: { label: string; href: string };
}) {
  return (
    <section className="px-3 pb-3 sm:px-4 sm:pb-4">
      <div className="mx-auto max-w-[1600px] rounded-sm bg-forest text-forest-foreground">
        <div className="grid gap-10 px-6 py-20 sm:px-10 lg:grid-cols-12 lg:px-14 lg:py-28">
          <Reveal className="lg:col-span-6">
            <p className="eyebrow text-forest-muted">{eyebrow}</p>
            <h2 className="mt-5 max-w-[18ch] text-4xl leading-[1.08] sm:text-5xl">{title}</h2>
          </Reveal>
          <Reveal delay={100} className="flex flex-col justify-end lg:col-span-5 lg:col-start-8">
            <p className="text-lg leading-relaxed text-forest-muted">{text}</p>
            <div className="mt-10 flex flex-wrap items-center gap-4">
              <Link href={cta.href} className={button({ variant: "light", size: "lg" })}>
                {cta.label} <Arrow />
              </Link>
              <a href={`tel:${company.telefoonHref}`} className={button({ variant: "outlineLight", size: "lg" })}>
                Bel {company.telefoon}
              </a>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
