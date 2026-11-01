import Image from "next/image";
import Link from "next/link";
import { Arrow } from "@/components/ui/arrow";
import { button } from "@/components/ui/button";
import { container, PageHeader, SectionHeading } from "@/components/ui/primitives";
import { Reveal } from "@/components/ui/reveal";
import { collecties, startOpties } from "@/data/collecties";
import { company } from "@/data/company";
import { primaryCta } from "@/lib/navigation";
import { pageMetadata } from "@/lib/seo";
import { cn } from "@/lib/utils";

export const metadata = pageMetadata({
  title: "Collecties: glas, fineer, 3D en atelier",
  description:
    "Ontdek de vier collecties van Zebrano Studio — Glas, Fineer, 3D en Atelier — of stel je eigen deur samen. Exclusieve binnendeuren op maat.",
  path: "/collecties",
});

/** Collections overview: the four collections, two ways to start and the four choices. */
export default function CollectiesPage() {
  return (
    <>
      <PageHeader
        eyebrow="Collecties"
        title={startOpties.title}
        intro={<p>{startOpties.intro}</p>}
        crumbs={[{ name: "Collecties", path: "/collecties" }]}
      />

      <section className={cn(container, "py-16 lg:py-20")}>
        <div className="grid gap-5 md:grid-cols-2">
          {startOpties.opties.map((o, i) => (
            <Reveal key={o.title} delay={i * 100} className="flex">
              <div className="flex w-full flex-col justify-between rounded-sm border p-8 lg:p-10">
                <div>
                  <p className="text-[0.6875rem] tabular-nums tracking-[0.2em] text-copper">{o.label.toUpperCase()}</p>
                  <h2 className="mt-5 text-3xl sm:text-4xl">{o.title}</h2>
                  <p className="mt-4 max-w-lg leading-relaxed text-muted-foreground">{o.text}</p>
                </div>
                <div className="mt-10">
                  {i === 0 ? (
                    <Link href="#collecties" className={button({ variant: "outline" })}>
                      Bekijk de collecties <Arrow diagonal={false} className="rotate-90" />
                    </Link>
                  ) : (
                    <Link href={primaryCta.href} className={button()}>
                      {primaryCta.label} <Arrow />
                    </Link>
                  )}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      <section id="collecties" className={cn(container, "scroll-mt-24 pb-24 lg:pb-32")}>
        <SectionHeading eyebrow="Vier collecties" title="Kies je startpunt." className="border-t pt-14" />
        <div className="mt-12 grid gap-x-5 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
          {collecties.map((c, i) => (
            <Reveal key={c.slug} delay={i * 70}>
              <Link href={`/collecties/${c.slug}`} className="group block">
                <div className="relative aspect-[4/5] overflow-hidden rounded-sm bg-muted">
                  <Image
                    src={c.hero.src}
                    alt={c.hero.alt}
                    fill
                    priority={i < 4}
                    sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                    className="img-zoom object-cover"
                  />
                </div>
                <div className="mt-5 flex items-center justify-between border-b pb-4">
                  <h3 className="text-2xl">
                    <span className="link-line">{c.name}</span>
                  </h3>
                  <Arrow className="text-muted-foreground" />
                </div>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{c.tagline}</p>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      <section className="px-3 pb-3 sm:px-4 sm:pb-4">
        <div className="mx-auto max-w-[1600px] rounded-sm bg-forest text-forest-foreground">
          <div className="px-6 py-24 sm:px-10 lg:px-14 lg:py-32">
            <div className="grid gap-10 lg:grid-cols-12">
              <Reveal className="lg:col-span-6">
                <p className="eyebrow text-forest-muted">Zo ontstaat jouw deur</p>
                <h2 className="mt-5 max-w-[16ch] text-4xl leading-[1.08] sm:text-5xl">Vier keuzes, één deur die helemaal van jou is.</h2>
              </Reveal>
            </div>

            <ol className="mt-16 grid gap-px overflow-hidden rounded-sm bg-forest-line sm:grid-cols-2 lg:grid-cols-4">
              {startOpties.stappen.map((s, i) => (
                <Reveal as="li" key={s.title} delay={i * 80} className="flex flex-col justify-between bg-forest p-7 lg:p-8">
                  <div>
                    <div className="flex items-center gap-3">
                      <span className="font-display text-4xl font-light">{String(i + 1).padStart(2, "0")}</span>
                      <span className="h-px flex-1 bg-forest-line" />
                    </div>
                    <h3 className="mt-10 text-2xl">{s.title}</h3>
                    <p className="mt-1 text-sm text-forest-muted">{s.sub}</p>
                    <p className="mt-4 text-sm leading-relaxed text-forest-muted">{s.text}</p>
                  </div>
                  <Link href={s.href} className="group mt-8 inline-flex items-center gap-2 text-sm">
                    <span className="link-line">{s.cta}</span>
                    <Arrow diagonal={false} />
                  </Link>
                </Reveal>
              ))}
            </ol>

            <div className="mt-12 flex flex-wrap items-center gap-4">
              <Link href={primaryCta.href} className={button({ variant: "light", size: "lg" })}>
                {primaryCta.label} <Arrow />
              </Link>
              <a href={`tel:${company.telefoonHref}`} className={button({ variant: "outlineLight", size: "lg" })}>
                Bel {company.telefoon}
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
