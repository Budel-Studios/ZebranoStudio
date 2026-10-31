import Image from "next/image";
import { CtaBand } from "@/components/cta-band";
import { PillLink } from "@/components/ui/pill-link";
import { Breadcrumbs, Container, Eyebrow } from "@/components/ui/primitives";
import { materialenPage as m } from "@/data/producten";
import { primaryCta } from "@/lib/navigation";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: m.meta.title,
  description: m.meta.description,
  path: "/materialen",
});

export default function MaterialenPage() {
  return (
    <>
      <section className="relative isolate flex min-h-[70svh] items-end overflow-hidden bg-forest text-paper">
        <Image src={m.hero.src} alt={m.hero.alt} fill priority sizes="100vw" className="-z-20 object-cover" />
        <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-t from-[rgb(20_24_18/0.8)] via-[rgb(20_24_18/0.4)] to-[rgb(20_24_18/0.2)]" />
        <Container className="pb-12 pt-32 sm:pb-16">
          <Breadcrumbs tone="light" items={[{ name: "Materialen", path: "/materialen" }]} className="mb-6" />
          <h1 className="max-w-4xl font-display text-5xl font-light leading-[1.02] tracking-tight sm:text-6xl">{m.h1}</h1>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-paper/85 sm:text-lg">{m.intro}</p>
        </Container>
      </section>

      <section className="py-20 sm:py-28">
        <Container>
          <Eyebrow>Waar we mee werken</Eyebrow>
          <h2 className="max-w-2xl font-display text-3xl font-light text-ink sm:text-4xl">Zeven bouwstenen voor elke deur</h2>
          <div className="mt-12 grid gap-x-8 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
            {m.materialen.map((mat, i) => (
              <article key={mat.title}>
                <div className="relative aspect-[4/3] overflow-hidden rounded-lg bg-sand">
                  {mat.image ? (
                    <Image
                      src={mat.image.src}
                      alt={mat.image.alt}
                      fill
                      sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
                      className="object-cover transition-transform duration-700 hover:scale-[1.04]"
                    />
                  ) : (
                    <div aria-hidden className="absolute inset-0 bg-[radial-gradient(circle_at_30%_30%,#ece7dc,#d9d1bf_60%,#c9bfa9)]" />
                  )}
                </div>
                <p className="mt-5 font-sans text-xs font-semibold uppercase tracking-[0.16em] text-bark/70">
                  {String(i + 1).padStart(2, "0")}
                </p>
                <h3 className="mt-1 font-display text-2xl font-light text-ink">{mat.title}</h3>
                <p className="mt-3 text-[15px] leading-relaxed text-ink/80">{mat.text}</p>
              </article>
            ))}
          </div>
        </Container>
      </section>

      <section className="bg-sand/60 py-20 sm:py-24">
        <Container className="grid gap-10 lg:grid-cols-2 lg:items-end">
          <div>
            <Eyebrow>Levensduur</Eyebrow>
            <h2 className="font-display text-3xl font-light text-ink sm:text-4xl">{m.levensduur.title}</h2>
          </div>
          <div>
            <p className="text-base leading-relaxed text-ink/80 sm:text-lg">{m.levensduur.text}</p>
            <div className="mt-6">
              <PillLink href={primaryCta.href}>{primaryCta.label}</PillLink>
            </div>
          </div>
        </Container>
      </section>

      <CtaBand title="Twijfel je tussen materialen?" text="We denken graag met je mee over wat bij jouw ruimte past — van houtsoort tot greep. Vertel ons wat je zoekt." />
    </>
  );
}
