import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { OtherCollections } from "@/components/collection/other-collections";
import { UitvoeringPicker } from "@/components/uitvoering/uitvoering-picker";
import { Arrow } from "@/components/ui/arrow";
import { button } from "@/components/ui/button";
import { container, CtaSection, DotTitle, Eyebrow, PageHeader, SectionHeading } from "@/components/ui/primitives";
import { Reveal } from "@/components/ui/reveal";
import { collecties, getCollectie } from "@/data/collecties";
import { company } from "@/data/company";
import { primaryCta } from "@/lib/navigation";
import { pageMetadata } from "@/lib/seo";
import { cn } from "@/lib/utils";

/** The glass collection has its own pages (app/collecties/glas). */
const OWN_ROUTE = new Set(["glas"]);

export const dynamicParams = false;

export function generateStaticParams() {
  return collecties.filter((c) => !OWN_ROUTE.has(c.slug)).map((c) => ({ collectie: c.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ collectie: string }> }): Promise<Metadata> {
  const { collectie } = await params;
  const c = getCollectie(collectie);
  if (!c) return {};
  return pageMetadata({ title: c.meta.title, description: c.meta.description, path: `/collecties/${c.slug}` });
}

/**
 * Fineer-, 3D- and Ateliercollectie — laid out like the Lovable glass
 * collection, with "Kies je uitvoering" (all four, ?uitvoering= from a door
 * page pre-selects one) feeding the request.
 */
export default async function CollectiePage({ params }: { params: Promise<{ collectie: string }> }) {
  const { collectie } = await params;
  const c = getCollectie(collectie);
  if (!c || OWN_ROUTE.has(c.slug)) notFound();
  const short = c.name.replace(/-?collectie$/i, "");

  return (
    <>
      <PageHeader
        eyebrow={`Collecties · ${short}`}
        title={<DotTitle>{c.name}</DotTitle>}
        crumbs={[
          { name: "Collecties", path: "/collecties" },
          { name: c.name, path: `/collecties/${c.slug}` },
        ]}
        intro={
          <>
            <p className="text-foreground">{c.tagline}</p>
            <p>{c.text}</p>
          </>
        }
      >
        <div className="mt-8 flex flex-wrap items-center gap-4">
          <Link href={primaryCta.href} className={button()}>
            {primaryCta.label} <Arrow />
          </Link>
          <a href={`tel:${company.telefoonHref}`} className={button({ variant: "text" })}>
            of bel {company.telefoon}
          </a>
        </div>
      </PageHeader>

      <div className={cn(container, "pt-14")}>
        <div className="relative aspect-[4/5] animate-unveil overflow-hidden rounded-sm bg-muted sm:aspect-[16/10] lg:aspect-[21/9]">
          <Image src={c.hero.src} alt={c.hero.alt} fill priority sizes="100vw" className="object-cover" />
        </div>
      </div>

      <section className={cn(container, "py-24 lg:py-32")}>
        <SectionHeading eyebrow="Eén ontwerp, vier uitvoeringen" title="Kies hoe jouw deur opengaat." />
        <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground">
          Elke deur uit de {c.name} maken we als taatsdeur, schuifdeur, draaideur of roomdivider. Kies er één, dan nemen we
          die mee in je aanvraag.
        </p>
        <UitvoeringPicker subject={`de ${c.name}`} contactQuery={`collectie=${c.slug}`} className="mt-10" />
      </section>

      {c.gallery.length > 0 && (
        <section className={cn(container, "pb-24 lg:pb-32")}>
          <div className="grid gap-10 border-t pt-14 lg:grid-cols-12">
            <Reveal className="lg:col-span-4">
              <Eyebrow>Sfeer</Eyebrow>
              <h2 className="mt-5 text-4xl leading-[1.08] sm:text-5xl">Ter inspiratie.</h2>
            </Reveal>
            <ul className="grid gap-5 sm:grid-cols-3 lg:col-span-8">
              {c.gallery.map((g, i) => (
                <Reveal as="li" key={g.src} delay={i * 70} className={cn(i === 1 && "sm:mt-16")}>
                  <div className="group relative aspect-[3/4] overflow-hidden rounded-sm bg-muted">
                    <Image src={g.src} alt={g.alt} fill sizes="(min-width: 1024px) 22vw, (min-width: 640px) 33vw, 100vw" className="img-zoom object-cover" />
                  </div>
                </Reveal>
              ))}
            </ul>
          </div>
        </section>
      )}

      <OtherCollections current={c.slug} />
      <CtaSection />
    </>
  );
}
