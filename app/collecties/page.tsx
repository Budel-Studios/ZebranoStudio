import Image from "next/image";
import Link from "next/link";
import { CtaBand } from "@/components/cta-band";
import { ArrowRightIcon } from "@/components/icons";
import { PillLink } from "@/components/ui/pill-link";
import { Container, Eyebrow, PageIntro } from "@/components/ui/primitives";
import { collecties, startOpties } from "@/data/collecties";
import { primaryCta } from "@/lib/navigation";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Collecties: glas, fineer, 3D en atelier",
  description:
    "Ontdek de vier collecties van Zebrano Studio — Glas, Fineer, 3D en Atelier — of stel je eigen deur samen. Exclusieve binnendeuren op maat.",
  path: "/collecties",
});

export default function CollectiesPage() {
  return (
    <>
      <PageIntro eyebrow="Collecties" title={startOpties.title} crumbs={[{ name: "Collecties", path: "/collecties" }]}>
        <p>{startOpties.intro}</p>
      </PageIntro>

      <section className="py-16 sm:py-20">
        <Container className="grid gap-6 md:grid-cols-2">
          {startOpties.opties.map((o, i) => (
            <div key={o.title} className="flex flex-col justify-between gap-8 rounded-lg border border-line/40 bg-white/60 p-8 sm:p-10">
              <div>
                <Eyebrow>{o.label}</Eyebrow>
                <h2 className="font-display text-3xl font-light text-ink">{o.title}</h2>
                <p className="mt-4 leading-relaxed text-ink/80">{o.text}</p>
              </div>
              {i === 0 ? (
                <PillLink href="#collecties" tone="outline">
                  Bekijk de collecties
                </PillLink>
              ) : (
                <PillLink href={primaryCta.href}>{primaryCta.label}</PillLink>
              )}
            </div>
          ))}
        </Container>
      </section>

      <section id="collecties" className="scroll-mt-24 pb-20 sm:pb-28">
        <Container>
          <Eyebrow>Vier collecties</Eyebrow>
          <h2 className="font-display text-3xl font-light text-ink sm:text-4xl">Kies je startpunt</h2>
          <div className="mt-10 grid gap-8 sm:grid-cols-2">
            {collecties.map((c) => (
              <Link key={c.slug} href={`/collecties/${c.slug}`} className="group block">
                <div className="relative aspect-[4/3] overflow-hidden rounded-lg">
                  <Image
                    src={c.hero.src}
                    alt={c.hero.alt}
                    fill
                    sizes="(min-width: 640px) 50vw, 100vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                  />
                </div>
                <div className="mt-5 flex items-start justify-between gap-6">
                  <div>
                    <h3 className="font-display text-2xl font-light text-ink">{c.name}</h3>
                    <p className="mt-2 max-w-md text-[15px] leading-relaxed text-ink/75">{c.tagline}</p>
                  </div>
                  <ArrowRightIcon className="mt-2 size-5 shrink-0 text-forest transition-transform duration-300 group-hover:translate-x-1 group-hover:text-accent" />
                </div>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-forest py-20 text-paper sm:py-28">
        <Container>
          <Eyebrow tone="light">Zo ontstaat jouw deur</Eyebrow>
          <h2 className="max-w-2xl font-display text-3xl font-light sm:text-4xl">Vier keuzes, één deur die helemaal van jou is</h2>
          <ol className="mt-12 grid gap-px overflow-hidden rounded-lg bg-paper/15 md:grid-cols-2 lg:grid-cols-4">
            {startOpties.stappen.map((s, i) => (
              <li key={s.title} className="flex flex-col justify-between gap-6 bg-forest p-7">
                <div>
                  <p className="font-sans text-xs font-semibold tracking-[0.16em] text-paper/60">{String(i + 1).padStart(2, "0")}</p>
                  <h3 className="mt-3 font-display text-xl text-paper">{s.title}</h3>
                  <p className="mt-1 text-sm text-paper/70">{s.sub}</p>
                  <p className="mt-4 text-[15px] leading-relaxed text-paper/85">{s.text}</p>
                </div>
                <Link href={s.href} className="group inline-flex items-center gap-2 text-sm font-medium text-paper hover:text-sand">
                  {s.cta}
                  <ArrowRightIcon className="size-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      <div className="h-3" />
      <CtaBand />
    </>
  );
}
