import Image from "next/image";
import Link from "next/link";
import { Arrow } from "@/components/ui/arrow";
import { button } from "@/components/ui/button";
import { container, CtaSection, Eyebrow, PageHeader } from "@/components/ui/primitives";
import { Reveal } from "@/components/ui/reveal";
import { feit, isVerified } from "@/data/feiten";
import { makers } from "@/data/over";
import { IMAGES } from "@/lib/images";
import { pageMetadata } from "@/lib/seo";
import { cn } from "@/lib/utils";

export const metadata = pageMetadata({
  title: makers.meta.title,
  description: makers.meta.description,
  path: "/de-makers",
});

export default function DeMakersPage() {
  const onderEenDak = feit("onderEenDak");
  const dichtbij = feit("productieNederland") ?? makers.dichtbij.fallback;
  return (
    <>
      <PageHeader
        eyebrow="Ontmoet de makers"
        title={
          <>
            {makers.h1Delen[0]} <span className="text-muted-foreground">{makers.h1Delen[1]}</span> {makers.h1Delen[2]}
          </>
        }
        intro={
          <p>
            {makers.intro}
            {onderEenDak && <> {onderEenDak}</>}
          </p>
        }
        crumbs={[{ name: "Ontmoet de makers", path: "/de-makers" }]}
      />

      <section className={cn(container, "py-24 lg:py-32")}>
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
          <Reveal className="lg:col-span-6">
            <div className="relative aspect-[4/5] animate-unveil overflow-hidden rounded-sm bg-muted">
              <Image src={IMAGES.colAtelier.src} alt={IMAGES.colAtelier.alt} fill sizes="(min-width: 1024px) 45vw, 100vw" className="object-cover" />
            </div>
          </Reveal>
          <Reveal as="figure" delay={100} className="lg:col-span-5 lg:col-start-8">
            <p className="font-display text-5xl font-light uppercase leading-none tracking-[-0.02em] sm:text-6xl">
              {makers.quote.kop[0]}
              <br />
              <span className="text-muted-foreground">{makers.quote.kop[1]}</span>
            </p>
            <blockquote className="mt-8 text-lg leading-relaxed">
              <p>“{makers.quote.tekst}”</p>
            </blockquote>
            <figcaption className="mt-6 flex items-center gap-3 text-sm text-muted-foreground">
              <span className="h-px w-6 bg-copper" />
              <span>
                <span className="text-foreground">{makers.quote.naam}</span>, {makers.quote.rol}
              </span>
            </figcaption>
          </Reveal>
        </div>
      </section>

      <section className="bg-sand">
        <div className={cn(container, "grid gap-10 py-24 lg:grid-cols-12 lg:py-32")}>
          <Reveal className="lg:col-span-5">
            <Eyebrow>Vakmanschap</Eyebrow>
            <h2 className="mt-5 max-w-[16ch] text-4xl leading-[1.08] sm:text-5xl">{makers.dichtbij.title}</h2>
          </Reveal>
          <Reveal delay={100} className="flex flex-col justify-end lg:col-span-6 lg:col-start-7">
            <p className="text-lg leading-relaxed text-muted-foreground">{dichtbij}</p>
            <div className="mt-8">
              <Link href="/materialen" className={button({ variant: "outline" })}>
                Ontdek materialen <Arrow />
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      {isVerified("team") && (
        <section className={cn(container, "pt-24 lg:pt-32")}>
          <Reveal>
            <Eyebrow>Ons team</Eyebrow>
            <h2 className="mt-5 text-4xl sm:text-5xl">Ontmoet de mensen van Zebrano Studio.</h2>
          </Reveal>
          <ul className="mt-12 grid border-t sm:grid-cols-2 lg:grid-cols-5">
            {makers.team.map((t, i) => (
              <Reveal as="li" key={t.naam} delay={i * 60} className="border-b py-6 lg:border-b-0 lg:border-l lg:px-6 lg:py-8 lg:first:border-l-0 lg:first:pl-0">
                <p className="font-display text-2xl font-light">{t.naam}</p>
                <p className="mt-1 text-sm text-muted-foreground">{t.rol}</p>
              </Reveal>
            ))}
          </ul>
        </section>
      )}

      <section className={cn(container, "py-24 lg:py-32")}>
        <div className="grid gap-5 md:grid-cols-2">
          <Reveal className="flex">
            <div className="flex w-full flex-col justify-between rounded-sm border p-8 lg:p-10">
              <div>
                <Eyebrow>Samenwerken</Eyebrow>
                <h2 className="mt-5 text-3xl sm:text-4xl">Ben jij ontwerper?</h2>
                <p className="mt-4 max-w-md leading-relaxed text-muted-foreground">
                  Ons team staat klaar om samen met jou alle mogelijkheden te ontdekken.
                </p>
              </div>
              <div className="mt-10">
                <Link href="/architecten" className={button({ variant: "outline" })}>
                  Voor architecten <Arrow />
                </Link>
              </div>
            </div>
          </Reveal>
          <Reveal delay={100} className="flex">
            <div className="flex w-full flex-col justify-between rounded-sm border p-8 lg:p-10">
              <div>
                <Eyebrow>Advies</Eyebrow>
                <h2 className="mt-5 text-3xl sm:text-4xl">Advies nodig?</h2>
                <p className="mt-4 max-w-md leading-relaxed text-muted-foreground">
                  Vertel ons over je ruimte en je ideeën, we denken graag met je mee.
                </p>
              </div>
              <div className="mt-10">
                <Link href="/contact" className={button()}>
                  Neem contact op <Arrow />
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      <CtaSection />
    </>
  );
}
