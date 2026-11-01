import Image from "next/image";
import Link from "next/link";
import { OntwerpCards } from "@/components/uitvoering/ontwerp-cards";
import { UitvoeringCards } from "@/components/uitvoering/uitvoering-cards";
import { UitvoeringTabs } from "@/components/uitvoering/uitvoering-tabs";
import { Arrow } from "@/components/ui/arrow";
import { button } from "@/components/ui/button";
import { container, CtaSection, Eyebrow, JsonLd, PageHero, SectionHeading } from "@/components/ui/primitives";
import { Reveal } from "@/components/ui/reveal";
import { company } from "@/data/company";
import type { DoorBlock, DoorPage } from "@/data/producten";
import { UITVOERINGEN, uitvoeringForPage } from "@/data/uitvoeringen";
import { serviceSchema } from "@/lib/jsonld";
import { primaryCta } from "@/lib/navigation";
import { cn } from "@/lib/utils";

/**
 * Template for the four uitvoering pages (taatsdeuren, schuifdeuren,
 * draaideuren, roomdividers) and boiserie, in the Lovable design.
 *
 * An uitvoering page says "every design, opened this way": hero with the four
 * uitvoeringen as tabs (this one filled), what it is / why, the wandvlak
 * option (draaideur only), every design with this uitvoering pre-chosen,
 * materials/hardware rows, the other three uitvoeringen and the green CTA.
 * Boiserie is not a door: no tabs or designs, and the four uitvoeringen as
 * matching doors at the bottom.
 */
export function DoorPageView({ page }: { page: DoorPage }) {
  const uitvoering = uitvoeringForPage(page.slug);
  const nr = uitvoering ? UITVOERINGEN.indexOf(uitvoering) + 1 : 0;
  const others = UITVOERINGEN.filter((u) => u !== uitvoering).map((u) => u.slug);
  const crumbs = uitvoering
    ? [{ name: page.name, path: `/${page.slug}` }]
    : [
        { name: "Collecties", path: "/collecties" },
        { name: page.name, path: `/${page.slug}` },
      ];

  return (
    <>
      <PageHero
        eyebrow={uitvoering ? `Uitvoering ${String(nr).padStart(2, "0")} / ${String(UITVOERINGEN.length).padStart(2, "0")}` : "Collecties · Wand"}
        title={page.h1}
        intro={<p>{page.intro}</p>}
        image={page.hero}
        crumbs={crumbs}
        top={uitvoering && <UitvoeringTabs current={uitvoering.slug} />}
      >
        <p className="text-sm text-muted-foreground">{page.teaser}</p>
        <div className="mt-5 flex flex-wrap items-center gap-4">
          <Link href={uitvoering ? `${primaryCta.href}?uitvoering=${uitvoering.slug}` : `${primaryCta.href}?product=boiserie`} className={button()}>
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

      {/* An option of this uitvoering with its own anchor: wandvlak on the draaideur */}
      {page.optie && (
        <section id={page.optie.id} className={cn(container, "scroll-mt-28 pb-24 lg:pb-32")}>
          <div className="grid items-center gap-10 border-t pt-14 lg:grid-cols-12 lg:gap-16">
            <Reveal className="lg:col-span-6">
              <div className="group relative aspect-[4/3] overflow-hidden rounded-sm bg-muted">
                <Image
                  src={page.optie.image.src}
                  alt={page.optie.image.alt}
                  fill
                  sizes="(min-width: 1024px) 45vw, 100vw"
                  className="img-zoom object-cover"
                />
              </div>
            </Reveal>
            <Reveal delay={100} className="lg:col-span-5 lg:col-start-8">
              <BlockText block={page.optie} />
              <ul className="mt-8 space-y-3 border-t pt-6">
                {page.optie.points.map((p) => (
                  <li key={p} className="flex gap-3 text-[0.9375rem]">
                    <span aria-hidden className="mt-[0.7em] h-px w-4 shrink-0 bg-copper" />
                    {p}
                  </li>
                ))}
              </ul>
              {uitvoering && (
                <Link href={`${primaryCta.href}?uitvoering=${uitvoering.slug}&optie=${page.optie.id}`} className={cn(button(), "mt-8")}>
                  Vraag een voorstel voor een wandvlakke deur <Arrow />
                </Link>
              )}
            </Reveal>
          </div>
        </section>
      )}

      {/* Every design, with this uitvoering already chosen */}
      {uitvoering && (
        <section className={cn(container, "pb-24 lg:pb-32")}>
          <SectionHeading
            eyebrow={`Elk ontwerp als ${uitvoering.label.toLowerCase()}`}
            title="Kies je ontwerp."
            action={
              <Link href="/collecties" className={button({ variant: "text" })}>
                Alle collecties
              </Link>
            }
          />
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground">
            Elk ontwerp uit onze collecties maken we ook als {uitvoering.label.toLowerCase()}. Kies er één: de{" "}
            {uitvoering.label.toLowerCase()} staat dan al voor je klaar in je aanvraag.
          </p>
          <OntwerpCards uitvoering={uitvoering} className="mt-12" />
        </section>
      )}

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

      {/* The other uitvoeringen (or, for boiserie, all four as matching doors) */}
      <section className={cn(container, "py-24 lg:py-32")}>
        <SectionHeading
          eyebrow={uitvoering ? "Andere uitvoeringen" : "Bijpassende deuren"}
          title={uitvoering ? "Hetzelfde ontwerp, anders open." : "Eén ontwerp, vier uitvoeringen."}
          action={
            <Link href="/materialen" className={button({ variant: "text" })}>
              Bekijk materialen
            </Link>
          }
        />
        <UitvoeringCards slugs={uitvoering ? others : undefined} className="mt-12" />
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
