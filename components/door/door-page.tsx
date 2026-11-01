import Image from "next/image";
import Link from "next/link";
import { DoorCards } from "@/components/door/door-cards";
import { Arrow } from "@/components/ui/arrow";
import { button } from "@/components/ui/button";
import { container, CtaSection, Eyebrow, JsonLd, PageHero, SectionHeading } from "@/components/ui/primitives";
import { Reveal } from "@/components/ui/reveal";
import { company } from "@/data/company";
import { doorPages, type DoorBlock, type DoorPage } from "@/data/producten";
import { serviceSchema } from "@/lib/jsonld";
import { primaryCta } from "@/lib/navigation";
import { cn } from "@/lib/utils";

/**
 * Template for every door-type page (taatsdeuren, schuifdeuren, …), in the
 * Lovable design: content-page hero with the big image, the two basics side
 * by side, three alternating image rows, the other door types as cards and
 * the green closing block.
 */
export function DoorPageView({ page }: { page: DoorPage }) {
  const others = doorPages.filter((p) => p.slug !== page.slug).map((p) => `/${p.slug}`);
  return (
    <>
      <PageHero eyebrow="Deuren" title={page.h1} intro={<p>{page.intro}</p>} image={page.hero} crumbs={[{ name: page.name, path: `/${page.slug}` }]}>
        <p className="text-sm text-muted-foreground">{page.teaser}</p>
        <div className="mt-5 flex flex-wrap items-center gap-4">
          <Link href={primaryCta.href} className={button()}>
            {primaryCta.label} <Arrow />
          </Link>
          <a href={`tel:${company.telefoonHref}`} className={button({ variant: "text" })}>
            of bel {company.telefoon}
          </a>
        </div>
      </PageHero>

      {/* What it is / why choose it */}
      <section className={cn(container, "pb-24 lg:pb-32")}>
        <div className="grid gap-14 border-t pt-14 lg:grid-cols-2 lg:gap-16">
          {page.basics.map((b, i) => (
            <Reveal key={b.title} delay={i * 100}>
              <BlockText block={b} />
            </Reveal>
          ))}
        </div>
      </section>

      {/* Materials, hardware, integration */}
      <section className="bg-sand">
        <div className={cn(container, "space-y-24 py-24 lg:space-y-32 lg:py-32")}>
          {page.rows.map((row, i) => (
            <div key={row.title} className="grid items-center gap-10 lg:grid-cols-12 lg:gap-16">
              {row.image && (
                <Reveal className={cn("lg:col-span-7", i % 2 === 1 && "lg:order-2 lg:col-start-6")}>
                  <div className="group relative aspect-[4/3] overflow-hidden rounded-sm bg-muted">
                    <Image
                      src={row.image.src}
                      alt={row.image.alt}
                      fill
                      sizes="(min-width: 1024px) 55vw, 100vw"
                      className="img-zoom object-cover"
                    />
                  </div>
                </Reveal>
              )}
              <Reveal
                delay={100}
                className={cn("lg:col-span-4", i % 2 === 1 ? "lg:order-1 lg:col-start-1 lg:row-start-1" : "lg:col-start-9")}
              >
                <p className="text-[0.6875rem] tabular-nums tracking-[0.2em] text-copper">{String(i + 1).padStart(2, "0")}</p>
                <BlockText block={row} className="mt-4" small />
              </Reveal>
            </div>
          ))}
        </div>
      </section>

      {/* The other door types */}
      <section className={cn(container, "py-24 lg:py-32")}>
        <SectionHeading
          eyebrow="Andere deurtypes"
          title="Ontdek ook."
          action={
            <Link href="/materialen" className={button({ variant: "text" })}>
              Bekijk materialen
            </Link>
          }
        />
        <DoorCards hrefs={others} className="mt-12" />
      </section>

      <CtaSection />
      <JsonLd data={serviceSchema({ name: page.h1, description: page.meta.description, path: `/${page.slug}` })} />
    </>
  );
}

function BlockText({ block, className, small = false }: { block: DoorBlock; className?: string; small?: boolean }) {
  return (
    <div className={className}>
      <Eyebrow>{block.label}</Eyebrow>
      <h2 className={cn("mt-5 leading-[1.08]", small ? "text-3xl sm:text-4xl" : "max-w-[16ch] text-4xl sm:text-5xl")}>
        {block.title}
      </h2>
      <p className="mt-5 max-w-xl text-lg leading-relaxed text-muted-foreground">{block.text}</p>
      {block.cta && (
        <Link href={block.cta.href} className={cn(button({ variant: "text" }), "mt-7")}>
          {block.cta.label}
          <Arrow diagonal={false} />
        </Link>
      )}
    </div>
  );
}
