import Image from "next/image";
import Link from "next/link";
import { Arrow } from "@/components/ui/arrow";
import { button } from "@/components/ui/button";
import { container, CtaSection, Eyebrow, PageHero } from "@/components/ui/primitives";
import { Reveal } from "@/components/ui/reveal";
import { verhaal } from "@/data/over";
import { IMAGES } from "@/lib/images";
import { primaryCta } from "@/lib/navigation";
import { pageMetadata } from "@/lib/seo";
import { cn } from "@/lib/utils";

export const metadata = pageMetadata({
  title: verhaal.meta.title,
  description: verhaal.meta.description,
  path: "/ons-verhaal",
});

export default function OnsVerhaalPage() {
  return (
    <>
      <PageHero
        eyebrow="Zebrano"
        title={verhaal.h1}
        intro={<p>{verhaal.intro}</p>}
        image={IMAGES.colAtelier}
        crumbs={[{ name: "Ons verhaal", path: "/ons-verhaal" }]}
      >
        <p className="text-sm text-muted-foreground">Van een backpackreis in 2015 tot de eerste eigen deur in 2020.</p>
      </PageHero>

      <section className={cn(container, "pb-24 lg:pb-32")}>
        <ol className="border-t">
          {verhaal.tijdlijn.map((stap, i) => (
            <li key={stap.title} className="grid items-center gap-8 border-b py-14 lg:grid-cols-12 lg:gap-16 lg:py-20">
              <Reveal className="lg:col-span-2">
                <p className="font-display text-4xl font-light tabular-nums sm:text-5xl">{String(i + 1).padStart(2, "0")}</p>
              </Reveal>
              <Reveal delay={80} className="lg:col-span-5">
                {stap.jaar && (
                  <p className="mb-4 text-[0.6875rem] tabular-nums tracking-[0.2em] text-copper">{stap.jaar}</p>
                )}
                <h2 className="text-3xl leading-[1.1] sm:text-4xl">{stap.title}</h2>
                <p className="mt-5 leading-relaxed text-muted-foreground">{stap.text}</p>
              </Reveal>
              <Reveal delay={160} className="lg:col-span-4 lg:col-start-9">
                <div className="relative aspect-[4/3] overflow-hidden rounded-sm bg-muted">
                  <Image src={stap.image.src} alt={stap.image.alt} fill sizes="(min-width: 1024px) 28vw, 100vw" className="object-cover" />
                </div>
              </Reveal>
            </li>
          ))}
        </ol>
      </section>

      <section className="bg-sand">
        <div className={cn(container, "grid gap-10 py-24 lg:grid-cols-12 lg:py-32")}>
          <Reveal className="lg:col-span-6">
            <Eyebrow>Waar we voor staan</Eyebrow>
            <p className="mt-5 font-display text-3xl font-light leading-snug sm:text-4xl">{verhaal.slot.title}</p>
          </Reveal>
          <Reveal delay={100} className="lg:col-span-5 lg:col-start-8">
            <p className="text-lg leading-relaxed text-muted-foreground">{verhaal.slot.text}</p>
            <p className="mt-8 font-display text-2xl font-light">{verhaal.slot.vraag}</p>
            <div className="mt-6 flex flex-wrap items-center gap-6">
              <Link href={primaryCta.href} className={button()}>
                {primaryCta.label} <Arrow />
              </Link>
              <Link href="/bewust-vakmanschap" className={button({ variant: "text" })}>
                Bewust vakmanschap
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      <div className="h-3 sm:h-4" />
      <CtaSection />
    </>
  );
}
