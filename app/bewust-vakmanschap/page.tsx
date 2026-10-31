import Image from "next/image";
import { CtaBand } from "@/components/cta-band";
import { PillLink } from "@/components/ui/pill-link";
import { Container, PageIntro } from "@/components/ui/primitives";
import { feit } from "@/data/feiten";
import { vakmanschap } from "@/data/over";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: vakmanschap.meta.title,
  description: vakmanschap.meta.description,
  path: "/bewust-vakmanschap",
});

export default function BewustVakmanschapPage() {
  return (
    <>
      <PageIntro eyebrow="Zebrano" title={vakmanschap.h1} crumbs={[{ name: "Bewust vakmanschap", path: "/bewust-vakmanschap" }]}>
        <p>{vakmanschap.intro}</p>
      </PageIntro>

      <section className="py-20 sm:py-28">
        <div className="mx-auto grid max-w-7xl gap-12 px-5 sm:px-8 lg:grid-cols-12 lg:px-12">
          <div className="lg:col-span-5">
            <div className="relative aspect-[4/5] overflow-hidden rounded-lg lg:sticky lg:top-28">
              <Image src="/images/afwerking-olie.webp" alt="Hout wordt met de hand geolied" fill sizes="(min-width: 1024px) 40vw, 100vw" className="object-cover" />
            </div>
          </div>
          <ol className="space-y-12 lg:col-span-6 lg:col-start-7">
            {vakmanschap.principes.map((p, i) => {
              const extra = p.feit ? feit(p.feit) : null;
              return (
                <li key={p.title} className="border-t border-line/30 pt-8">
                  <p className="font-sans text-xs font-semibold tracking-[0.16em] text-bark/70">{String(i + 1).padStart(2, "0")}</p>
                  <h2 className="mt-2 font-display text-2xl font-light text-ink sm:text-3xl">{p.title}</h2>
                  <p className="mt-4 leading-relaxed text-ink/80">
                    {p.text}
                    {extra && <> {extra}</>}
                  </p>
                </li>
              );
            })}
          </ol>
        </div>
      </section>

      <section className="bg-sand/60 py-16 sm:py-20">
        <Container className="flex flex-col items-start gap-6 lg:flex-row lg:items-center lg:justify-between">
          <p className="max-w-2xl font-display text-2xl font-light leading-snug text-ink sm:text-3xl">
            Geen standaarddeuren, maar deuren die een verhaal vertellen en een leven lang meegaan.
          </p>
          <div className="flex flex-wrap gap-3">
            <PillLink href="/collecties" tone="outline">
              Bekijk de collecties
            </PillLink>
            <PillLink href="/materialen">Bekijk materialen</PillLink>
          </div>
        </Container>
      </section>

      <div className="h-3" />
      <CtaBand />
    </>
  );
}
