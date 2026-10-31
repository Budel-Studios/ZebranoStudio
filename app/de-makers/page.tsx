import Image from "next/image";
import { CtaBand } from "@/components/cta-band";
import { PillLink } from "@/components/ui/pill-link";
import { Breadcrumbs, Container, Eyebrow } from "@/components/ui/primitives";
import { feit, isVerified } from "@/data/feiten";
import { makers } from "@/data/over";
import { pageMetadata } from "@/lib/seo";

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
      <section className="bg-sand/60 pb-16 pt-32 sm:pb-24 sm:pt-36">
        <Container>
          <Breadcrumbs items={[{ name: "Ontmoet de makers", path: "/de-makers" }]} className="mb-8" />
          <h1 className="max-w-5xl font-display text-4xl font-light leading-[1.08] tracking-tight text-ink sm:text-6xl">
            {makers.h1Delen[0]} <span className="italic text-forest">{makers.h1Delen[1]}</span>
            <br className="hidden sm:block" /> {makers.h1Delen[2]}
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-ink/80">
            {makers.intro}
            {onderEenDak && <> {onderEenDak}</>}
          </p>
        </Container>
      </section>

      <section className="py-20 sm:py-28">
        <Container className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <div className="relative aspect-[4/5] overflow-hidden rounded-lg">
            <Image src="/images/taatsdeur-relief.webp" alt="Dubbele houten deur met handgemaakt reliëf" fill sizes="(min-width: 1024px) 45vw, 100vw" className="object-cover" />
          </div>
          <figure>
            <p className="font-display text-5xl font-light uppercase leading-none tracking-tight text-ink sm:text-6xl">
              {makers.quote.kop[0]}
              <br />
              <span className="text-forest">{makers.quote.kop[1]}</span>
            </p>
            <blockquote className="mt-8 text-lg leading-relaxed text-ink/85">
              <p>“{makers.quote.tekst}”</p>
            </blockquote>
            <figcaption className="mt-6 font-sans text-sm text-ink/70">
              <span className="font-semibold text-ink">{makers.quote.naam}</span> — {makers.quote.rol}
            </figcaption>
          </figure>
        </Container>
      </section>

      <section className="bg-forest py-20 text-paper sm:py-24">
        <Container className="grid gap-10 lg:grid-cols-2 lg:items-end">
          <div>
            <Eyebrow tone="light">Vakmanschap</Eyebrow>
            <h2 className="font-display text-3xl font-light sm:text-4xl">{makers.dichtbij.title}</h2>
          </div>
          <div>
            <p className="text-lg leading-relaxed text-paper/85">{dichtbij}</p>
            <div className="mt-6">
              <PillLink href="/materialen" tone="paper">
                Ontdek materialen
              </PillLink>
            </div>
          </div>
        </Container>
      </section>

      {isVerified("team") && (
        <section className="py-20 sm:py-24">
          <Container>
            <Eyebrow>Ons team</Eyebrow>
            <h2 className="font-display text-3xl font-light text-ink sm:text-4xl">Ontmoet de mensen van Zebrano Studio</h2>
            <ul className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
              {makers.team.map((t) => (
                <li key={t.naam} className="rounded-lg border border-line/30 p-6">
                  <p className="font-display text-xl text-ink">{t.naam}</p>
                  <p className="mt-1 text-sm text-ink/70">{t.rol}</p>
                </li>
              ))}
            </ul>
          </Container>
        </section>
      )}

      <section className="py-20 sm:py-24">
        <Container className="grid gap-6 md:grid-cols-2">
          <div className="rounded-lg border border-line/40 bg-white/60 p-8 sm:p-10">
            <h2 className="font-display text-2xl font-light text-ink sm:text-3xl">Ben jij ontwerper?</h2>
            <p className="mt-3 leading-relaxed text-ink/80">Ons team staat klaar om samen met jou alle mogelijkheden te ontdekken.</p>
            <div className="mt-6">
              <PillLink href="/architecten" tone="outline">
                Voor architecten
              </PillLink>
            </div>
          </div>
          <div className="rounded-lg border border-line/40 bg-white/60 p-8 sm:p-10">
            <h2 className="font-display text-2xl font-light text-ink sm:text-3xl">Advies nodig?</h2>
            <p className="mt-3 leading-relaxed text-ink/80">Vertel ons over je ruimte en je ideeën — we denken graag met je mee.</p>
            <div className="mt-6">
              <PillLink href="/contact">Neem contact op</PillLink>
            </div>
          </div>
        </Container>
      </section>

      <CtaBand />
    </>
  );
}
