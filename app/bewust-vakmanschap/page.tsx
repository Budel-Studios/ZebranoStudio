import Image from "next/image";
import Link from "next/link";
import { Arrow } from "@/components/ui/arrow";
import { button } from "@/components/ui/button";
import { container, CtaSection, Eyebrow, PageHero } from "@/components/ui/primitives";
import { Reveal } from "@/components/ui/reveal";
import { feit } from "@/data/feiten";
import { vakmanschap } from "@/data/over";
import { IMAGES } from "@/lib/images";
import { pageMetadata } from "@/lib/seo";
import { cn } from "@/lib/utils";

export const metadata = pageMetadata({
  title: vakmanschap.meta.title,
  description: vakmanschap.meta.description,
  path: "/bewust-vakmanschap",
});

export default function BewustVakmanschapPage() {
  return (
    <>
      <PageHero
        eyebrow="Zebrano"
        title={vakmanschap.h1}
        intro={<p>{vakmanschap.intro}</p>}
        image={IMAGES.doorTaats}
        crumbs={[{ name: "Bewust vakmanschap", path: "/bewust-vakmanschap" }]}
      >
        <p className="text-sm text-muted-foreground">We bouwen ze zo goed, dat je ze misschien vaker laat zien dan je nieuwe keuken.</p>
      </PageHero>

      <section className={cn(container, "pb-24 lg:pb-32")}>
        <div className="grid gap-12 border-t pt-14 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-28">
              <Eyebrow>Vijf principes</Eyebrow>
              <h2 className="mt-5 max-w-[14ch] text-4xl leading-[1.08] sm:text-5xl">Met zorg, respect en een duidelijk doel.</h2>
              <div className="relative mt-10 hidden aspect-[4/5] overflow-hidden rounded-sm bg-muted lg:block">
                <Image src="/images/afwerking-olie.webp" alt="Hout wordt met de hand geolied" fill sizes="35vw" className="object-cover" />
              </div>
            </div>
          </div>
          <ol className="lg:col-span-6 lg:col-start-7">
            {vakmanschap.principes.map((p, i) => {
              const extra = p.feit ? feit(p.feit) : null;
              return (
                <Reveal as="li" key={p.title} className="border-b py-10 first:pt-0">
                  <p className="text-[0.6875rem] tabular-nums tracking-[0.2em] text-copper">{String(i + 1).padStart(2, "0")}</p>
                  <h3 className="mt-4 text-3xl leading-[1.1]">{p.title}</h3>
                  <p className="mt-4 leading-relaxed text-muted-foreground">
                    {p.text}
                    {extra && <> {extra}</>}
                  </p>
                </Reveal>
              );
            })}
          </ol>
        </div>
      </section>

      <section className={cn(container, "pb-16 lg:pb-24")}>
        <Reveal className="grid items-center gap-8 border-y py-10 lg:grid-cols-12">
          <p className="font-display text-2xl font-light leading-snug sm:text-3xl lg:col-span-7">
            Geen standaarddeuren, maar deuren die een verhaal vertellen en een leven lang meegaan.
          </p>
          <div className="flex flex-wrap items-center gap-4 lg:col-span-5 lg:justify-end">
            <Link href="/collecties" className={button({ variant: "outline" })}>
              Bekijk de collecties <Arrow />
            </Link>
            <Link href="/materialen" className={button({ variant: "text" })}>
              Bekijk materialen
            </Link>
          </div>
        </Reveal>
      </section>

      <CtaSection />
    </>
  );
}
