import Image from "next/image";
import Link from "next/link";
import { Arrow } from "@/components/ui/arrow";
import { button } from "@/components/ui/button";
import { container, CtaSection, Eyebrow, PageHero } from "@/components/ui/primitives";
import { Reveal } from "@/components/ui/reveal";
import { feit, isVerified } from "@/data/feiten";
import { makers } from "@/data/over";
import { PHOTOS, type Img } from "@/lib/images";
import { pageMetadata } from "@/lib/seo";
import { cn } from "@/lib/utils";

export const metadata = pageMetadata({
  title: makers.meta.title,
  description: makers.meta.description,
  path: "/de-makers",
});

function Card({
  eyebrow,
  title,
  text,
  image,
  cta,
}: {
  eyebrow: string;
  title: string;
  text: string;
  image: Img;
  cta: React.ReactNode;
}) {
  return (
    <div className="flex w-full flex-col overflow-hidden rounded-sm border">
      <div className="relative aspect-[3/2] overflow-hidden bg-muted">
        <Image src={image.src} alt={image.alt} fill sizes="(min-width: 768px) 50vw, 100vw" className="object-cover" />
      </div>
      <div className="flex flex-1 flex-col justify-between p-8 lg:p-10">
        <div>
          <Eyebrow>{eyebrow}</Eyebrow>
          <h2 className="mt-5 text-3xl sm:text-4xl">{title}</h2>
          <p className="mt-4 max-w-md leading-relaxed text-muted-foreground">{text}</p>
        </div>
        <div className="mt-10">{cta}</div>
      </div>
    </div>
  );
}

export default function DeMakersPage() {
  const onderEenDak = feit("onderEenDak");
  const dichtbij = feit("productieNederland") ?? makers.dichtbij.fallback;
  return (
    <>
      <PageHero
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
        image={PHOTOS.makersHero}
        crumbs={[{ name: "Ontmoet de makers", path: "/de-makers" }]}
      />

      <section className={cn(container, "pb-24 lg:pb-32")}>
        <div className="grid items-center gap-12 border-t pt-24 lg:grid-cols-12 lg:gap-16 lg:pt-32">
          <Reveal className="lg:col-span-6">
            <div className="relative aspect-[4/5] overflow-hidden rounded-sm bg-muted">
              <Image
                src={makers.quote.image.src}
                alt={makers.quote.image.alt}
                fill
                sizes="(min-width: 1024px) 45vw, 100vw"
                className="object-cover"
              />
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
        <div className={cn(container, "grid items-center gap-12 py-24 lg:grid-cols-12 lg:gap-16 lg:py-32")}>
          <Reveal className="lg:col-span-5">
            <Eyebrow>Vakmanschap</Eyebrow>
            <h2 className="mt-5 max-w-[16ch] text-4xl leading-[1.08] sm:text-5xl">{makers.dichtbij.title}</h2>
            <p className="mt-6 text-lg leading-relaxed text-muted-foreground">{dichtbij}</p>
            <div className="mt-8">
              <Link href="/materialen" className={button({ variant: "outline" })}>
                Ontdek materialen <Arrow />
              </Link>
            </div>
          </Reveal>
          <Reveal delay={100} className="lg:col-span-6 lg:col-start-7">
            <div className="relative aspect-[3/2] overflow-hidden rounded-sm bg-muted">
              <Image
                src={makers.dichtbij.image.src}
                alt={makers.dichtbij.image.alt}
                fill
                sizes="(min-width: 1024px) 45vw, 100vw"
                className="object-cover"
              />
            </div>
          </Reveal>
        </div>
      </section>

      {isVerified("team") && (
        <section className={cn(container, "pt-24 lg:pt-32")}>
          <Reveal className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <Eyebrow>Ons team</Eyebrow>
              <h2 className="mt-5 text-4xl sm:text-5xl">Ontmoet de mensen van Zebrano Studio.</h2>
            </div>
          </Reveal>
          <ul className="mt-12 grid gap-x-5 gap-y-10 sm:grid-cols-3">
            {makers.team.map((t, i) => (
              <Reveal as="li" key={t.naam} delay={i * 80}>
                <div className="relative aspect-[4/5] overflow-hidden rounded-sm bg-muted">
                  <Image
                    src={t.foto}
                    alt={`Portret van ${t.naam}`}
                    fill
                    sizes="(min-width: 640px) 33vw, 100vw"
                    className="object-cover"
                  />
                </div>
                <div className="mt-5 flex items-baseline justify-between gap-4 border-b pb-4">
                  <p className="font-display text-3xl font-light">{t.naam}</p>
                  <p className="text-right text-sm text-muted-foreground">{t.rol}</p>
                </div>
              </Reveal>
            ))}
          </ul>
        </section>
      )}

      <section className={cn(container, "py-24 lg:py-32")}>
        <div className="grid gap-5 md:grid-cols-2">
          <Reveal className="flex">
            <Card
              eyebrow="Samenwerken"
              title="Ben jij ontwerper?"
              text="Ons team staat klaar om samen met jou alle mogelijkheden te ontdekken."
              image={PHOTOS.makersOntwerper}
              cta={
                <Link href="/architecten" className={button({ variant: "outline" })}>
                  Voor architecten <Arrow />
                </Link>
              }
            />
          </Reveal>
          <Reveal delay={100} className="flex">
            <Card
              eyebrow="Advies"
              title="Advies nodig?"
              text="Vertel ons over je ruimte en je ideeën, we denken graag met je mee."
              image={PHOTOS.makersAdvies}
              cta={
                <Link href="/contact" className={button()}>
                  Neem contact op <Arrow />
                </Link>
              }
            />
          </Reveal>
        </div>
      </section>

      <CtaSection />
    </>
  );
}
