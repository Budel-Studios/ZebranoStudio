import Image from "next/image";
import Link from "next/link";
import { Arrow } from "@/components/ui/arrow";
import { button } from "@/components/ui/button";
import { container, CtaSection, PageHeader, SectionHeading, SplitIntro } from "@/components/ui/primitives";
import { Reveal } from "@/components/ui/reveal";
import { materialenPage as m } from "@/data/producten";
import type { CategorySlug } from "@/data/materialenbibliotheek";
import { primaryCta } from "@/lib/navigation";
import { isModuleOn } from "@/lib/site";
import { pageMetadata } from "@/lib/seo";
import { cn } from "@/lib/utils";

export const metadata = pageMetadata({
  title: m.meta.title,
  description: m.meta.description,
  path: "/materialen",
});

/** Which part of the materials library each family opens. */
const LIBRARY_CATEGORY: Record<string, CategorySlug> = {
  Hout: "massief-hout",
  Fineer: "houtfineer",
  Glas: "glas",
  Metaal: "metaal-profielen",
  "Steen & keramiek": "steen-keramiek",
  "Grepen & beslag": "metaal-profielen",
  "Afwerkingen & oliën": "lak-afwerking",
};

/**
 * Materials overview: the seven families. Each links into the
 * Materialenbibliotheek (/materialenbibliotheek) when that module is on.
 */
export default function MaterialenPage() {
  const library = isModuleOn("materialenbibliotheek");
  return (
    <>
      <PageHeader eyebrow="Materialen" title={m.h1} intro={<p>{m.intro}</p>} crumbs={[{ name: "Materialen", path: "/materialen" }]} />

      <div className={cn(container, "pt-14")}>
        <div className="relative aspect-[4/5] animate-unveil overflow-hidden rounded-sm bg-muted sm:aspect-[16/10] lg:aspect-[21/9]">
          {/* Wide photo in a box that is narrower on small screens: ask for a larger file there. */}
          <Image
            src={m.hero.src}
            alt={m.hero.alt}
            fill
            priority
            sizes="(min-width: 1024px) 100vw, (min-width: 640px) 135vw, 270vw"
            className="object-cover"
          />
        </div>
      </div>

      <section className={cn(container, "py-24 lg:py-32")}>
        <SectionHeading
          eyebrow="Waar we mee werken"
          title="Zeven bouwstenen voor elke deur."
          action={
            library ? (
              <Link href="/materialenbibliotheek" className={button({ variant: "outline", size: "sm" })}>
                Open de materialenbibliotheek <Arrow />
              </Link>
            ) : undefined
          }
        />
        <ul className="mt-12 grid gap-x-5 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
          {m.materialen.map((mat, i) => (
            <Reveal as="li" key={mat.title} delay={(i % 3) * 70}>
              <div className="group relative aspect-[4/3] overflow-hidden rounded-sm bg-sand">
                {mat.image ? (
                  <Image
                    src={mat.image.src}
                    alt={mat.image.alt}
                    fill
                    sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                    className="img-zoom object-cover"
                  />
                ) : (
                  <div aria-hidden className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,var(--bone),var(--sand)_60%,var(--sage))]" />
                )}
              </div>
              <div className="mt-5 flex items-baseline gap-4 border-b pb-4">
                <span className="text-[0.6875rem] tabular-nums tracking-[0.2em] text-copper">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="text-3xl">{mat.title}</h3>
              </div>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{mat.text}</p>
              {library && LIBRARY_CATEGORY[mat.title] && (
                <Link
                  href={`/materialenbibliotheek?categorie=${LIBRARY_CATEGORY[mat.title]}`}
                  className={cn(button({ variant: "text" }), "mt-4 text-[0.8125rem]")}
                >
                  Bekijk in de bibliotheek <Arrow diagonal={false} />
                </Link>
              )}
            </Reveal>
          ))}
        </ul>
      </section>

      <section className={cn(container, "pb-24 lg:pb-32")}>
        <SplitIntro eyebrow="Levensduur" title={m.levensduur.title}>
          <p>{m.levensduur.text}</p>
          <div className="pt-3">
            <Link href={primaryCta.href} className={button()}>
              {primaryCta.label} <Arrow />
            </Link>
          </div>
        </SplitIntro>
      </section>

      <CtaSection
        eyebrow="Advies"
        title="Twijfel je tussen materialen?"
        text="We denken graag met je mee over wat bij jouw ruimte past, van houtsoort tot greep. Vertel ons wat je zoekt."
      />
    </>
  );
}
