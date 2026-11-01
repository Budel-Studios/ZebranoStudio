import Image from "next/image";
import Link from "next/link";
import { AboutAccordion, type AboutItem } from "@/components/home/about-accordion";
import { Arrow } from "@/components/ui/arrow";
import { button } from "@/components/ui/button";
import { container, Eyebrow } from "@/components/ui/primitives";
import { Reveal } from "@/components/ui/reveal";
import { collecties } from "@/data/collecties";
import { company } from "@/data/company";
import { merkfamilie } from "@/data/mtb-bouw";
import { IMAGES, PHOTOS } from "@/lib/images";
import { DOOR_TYPES, primaryCta } from "@/lib/navigation";
import { pageMetadata } from "@/lib/seo";
import { cn } from "@/lib/utils";

export const metadata = pageMetadata({
  absoluteTitle: "Exclusieve binnendeuren op maat | Zebrano Studio",
  description:
    "Zebrano Studio maakt taatsdeuren, schuifdeuren, wandvlakke deuren, roomdividers en boiserie op maat — exclusief design, bereikbaar gemaakt. Een merk van MTB Bouw.",
  path: "/",
});

/**
 * Homepage — the Lovable design section by section: hero, door types, why
 * Zebrano, "passie voor hout", way of working, collections, our story and the
 * MTB Bouw family.
 */
export default function HomePage() {
  return (
    <>
      <Hero />
      <DoorTypes />
      <WhyZebrano />
      <About />
      <Process />
      <Collections />
      <Story />
      <Family />
    </>
  );
}

/* ------------------------------------------------------------------ */

function Hero() {
  return (
    <section className={cn(container, "pt-24 sm:pt-28")}>
      <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
        <div className="flex flex-col justify-between lg:col-span-5 lg:min-h-[calc(100svh-9rem)] lg:py-6">
          <div className="animate-rise">
            <Eyebrow>Binnendeuren op maat · Enschede</Eyebrow>
            <h1 className="mt-8 text-[clamp(3rem,6.4vw,6.75rem)] leading-[0.95] tracking-[-0.03em]">
              Luxe deuren,
              <br />
              <span className="text-muted-foreground">op maat</span> gemaakt.
            </h1>
          </div>

          <div className="mt-10 animate-rise [animation-delay:200ms]">
            <p className="max-w-sm text-lg leading-relaxed text-muted-foreground">
              Exclusiviteit, nu binnen handbereik. Ontworpen voor jouw ruimte, gemaakt van de mooiste materialen.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link href={primaryCta.href} className={button({ size: "lg" })}>
                {primaryCta.label} <Arrow />
              </Link>
              <Link href="/collecties" className={button({ variant: "outline", size: "lg" })}>
                Bekijk de collecties
              </Link>
            </div>

            <dl className="mt-12 grid grid-cols-3 border-t text-sm">
              {[
                ["Ontwerp", "Op jouw maat"],
                ["Materiaal", "Hout, fineer, glas"],
                ["Montage", "Door vakmensen"],
              ].map(([k, v]) => (
                <div key={k} className="border-r py-4 pr-4 last:border-r-0 [&:not(:first-child)]:pl-4">
                  <dt className="text-[0.6875rem] uppercase tracking-[0.2em] text-muted-foreground">{k}</dt>
                  <dd className="mt-1.5">{v}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>

        <div className="relative lg:col-span-7">
          <div className="relative h-[70svh] min-h-[480px] overflow-hidden rounded-sm bg-muted lg:h-[calc(100svh-9rem)]">
            <Image
              src={IMAGES.heroTaats.src}
              alt={IMAGES.heroTaats.alt}
              fill
              priority
              sizes="(min-width: 1024px) 58vw, 100vw"
              className="animate-unveil object-cover"
            />
            <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between gap-4">
              <Link
                href="/taatsdeuren"
                className="group flex items-center gap-3 rounded-sm bg-background/90 px-4 py-3 text-sm backdrop-blur"
              >
                <span className="size-1.5 rounded-full bg-copper" />
                Taatsdeur in notenhout
                <Arrow diagonal={false} className="text-muted-foreground" />
              </Link>
              <span className="hidden rounded-sm bg-background/90 px-3 py-2 text-[0.6875rem] uppercase tracking-[0.2em] backdrop-blur sm:block">
                Een merk van MTB Bouw
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */

function DoorTypes() {
  return (
    <section className={cn(container, "py-24 lg:py-32")}>
      <Reveal className="flex flex-wrap items-end justify-between gap-6">
        <div>
          <Eyebrow>Deurtypes</Eyebrow>
          <h2 className="mt-5 text-4xl sm:text-5xl">Elke opening verdient een eigen deur.</h2>
        </div>
        <Link href="/materialen" className={button({ variant: "text" })}>
          Bekijk materialen
        </Link>
      </Reveal>

      <div className="no-scrollbar -mx-4 mt-12 flex snap-x gap-4 overflow-x-auto px-4 sm:-mx-8 sm:px-8 lg:mx-0 lg:grid lg:grid-cols-5 lg:overflow-visible lg:px-0">
        {DOOR_TYPES.map((d, i) => (
          <Reveal key={d.slug} delay={i * 70} className="w-[68vw] shrink-0 snap-start sm:w-[42vw] lg:w-auto">
            <Link href={`/${d.slug}`} className="group block">
              <div className="relative aspect-[3/4.4] overflow-hidden rounded-sm bg-muted">
                <Image
                  src={d.image.src}
                  alt={d.label}
                  fill
                  sizes="(min-width: 1024px) 20vw, (min-width: 640px) 42vw, 68vw"
                  className="img-zoom object-cover"
                />
              </div>
              <div className="mt-4 flex items-start justify-between gap-3">
                <div>
                  <p className="text-[0.6875rem] tabular-nums text-muted-foreground">{String(i + 1).padStart(2, "0")}</p>
                  <p className="mt-1 font-display text-xl">
                    <span className="link-line">{d.label}</span>
                  </p>
                  <p className="mt-1 text-sm text-muted-foreground">{d.note}</p>
                </div>
                <Arrow diagonal={false} className="mt-6 text-muted-foreground" />
              </div>
            </Link>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */

const REASONS = [
  ["Maatwerk ontwerp", "Vormen, afwerkingen en materialen, volledig afgestemd op jouw idee en jouw ruimte."],
  ["Bereikbare luxe", "Hoogwaardig vakmanschap en bijzondere materialen, bereikbaar gemaakt voor elk project."],
  ["Eenvoudig kiezen", "Een helder proces met zorgvuldig gekozen opties, zodat kiezen moeiteloos blijft."],
  ["Precisie in vakmanschap", "Deuren die een leven lang meegaan, met oog voor elk detail."],
  ["Eindeloze inspiratie", "Talloze ontwerpmogelijkheden om jouw ruimte onvergetelijk te maken."],
];

function WhyZebrano() {
  return (
    <section className={cn(container, "pb-24 lg:pb-32")}>
      <div className="grid gap-10 border-t pt-14 lg:grid-cols-12">
        <Reveal className="lg:col-span-5">
          <Eyebrow>Waarom Zebrano</Eyebrow>
          <h2 className="mt-5 max-w-[14ch] text-4xl leading-[1.08] sm:text-5xl">Luxe hoeft niet onbereikbaar te zijn.</h2>
        </Reveal>
        <Reveal delay={100} className="lg:col-span-6 lg:col-start-7">
          <p className="text-lg leading-relaxed text-muted-foreground">
            Onze deuren worden gemaakt met dezelfde precisie en materialen als de mooiste interieurs ter wereld, maar zijn
            ontworpen voor ieder huis. Van de eerste schets tot de laatste installatie brengen we high-end design in je dagelijks
            leven, zonder concessies.
          </p>
        </Reveal>
      </div>

      <div className="mt-16 grid sm:grid-cols-2 lg:grid-cols-5">
        {REASONS.map(([title, text], i) => (
          <Reveal
            key={title}
            delay={i * 60}
            className="border-t py-8 sm:pr-8 lg:border-l lg:border-t-0 lg:px-6 lg:py-2 lg:first:border-l-0 lg:first:pl-0"
          >
            <p className="text-[0.6875rem] tabular-nums tracking-[0.2em] text-copper">{String(i + 1).padStart(2, "0")}</p>
            <h3 className="mt-4 text-xl">{title}</h3>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{text}</p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */

const ABOUT: AboutItem[] = [
  {
    label: "Maatwerk",
    title: "Exclusieve houten deuren",
    text: "Zebrano ontwerpt taats-, schuif- en draaideuren op maat, gemaakt van hoogwaardige materialen en afgewerkt met exclusieve details.",
    image: IMAGES.heroTaats,
  },
  {
    label: "Unieke details",
    title: "Materialen met een verhaal",
    text: "Van bijzondere houtsoorten tot handgeselecteerde steen en ambachtelijk glas: elk materiaal is gekozen om zijn karakter, herkomst en natuurlijke schoonheid.",
    image: IMAGES.colFineer,
  },
  {
    label: "Grenzeloos ontwerp",
    title: "Ontwerp zonder grenzen",
    text: "We gaan verder dan standaardmaten en -afwerkingen, en maken deuren die naadloos aansluiten bij jouw architectuur en persoonlijke stijl.",
    image: IMAGES.col3d,
  },
  {
    label: "Bewust vakmanschap",
    title: "Vakmanschap & duurzaamheid",
    text: "We bouwen ze zo goed, dat je ze misschien vaker laat zien dan je nieuwe keuken.",
    image: IMAGES.colAtelier,
  },
];

function About() {
  return (
    <section className="bg-sand">
      <div className={cn(container, "py-24 lg:py-32")}>
        <Reveal>
          <Eyebrow>Over Zebrano</Eyebrow>
          <h2 className="mt-5 text-4xl leading-[1.05] sm:text-6xl">
            Passie voor hout.
            <br />
            <span className="text-muted-foreground">Precisie in design.</span>
          </h2>
        </Reveal>
        <AboutAccordion items={ABOUT} />
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */

const STEPS = [
  ["Kennismaking", "We bespreken je ruimte, je stijl en je wensen. Bij jou thuis of op afspraak in Enschede."],
  ["Ontwerp & advies", "Je ontvangt een helder voorstel met tekening, materialen en afwerking."],
  ["Productie op maat", "Elke deur wordt met precisie gemaakt, exact passend in jouw opening."],
  ["Plaatsing", "Onze vakmensen monteren en stellen af tot alles perfect draait of schuift."],
];

function Process() {
  return (
    <section className="px-3 sm:px-4">
      <div className="mx-auto max-w-[1600px] rounded-sm bg-forest text-forest-foreground">
        <div className="mx-auto max-w-[1600px] px-6 py-24 sm:px-10 lg:px-14 lg:py-32">
          <div className="grid gap-10 lg:grid-cols-12">
            <Reveal className="lg:col-span-6">
              <p className="eyebrow text-forest-muted">Werkwijze</p>
              <h2 className="mt-5 max-w-[14ch] text-4xl leading-[1.08] sm:text-5xl">Van eerste schets tot laatste scharnier.</h2>
            </Reveal>
            <Reveal delay={100} className="flex flex-col justify-end lg:col-span-5 lg:col-start-8">
              <p className="text-lg leading-relaxed text-forest-muted">
                Eén aanspreekpunt, een helder proces en zorgvuldig gekozen opties. Zo blijft kiezen moeiteloos.
              </p>
            </Reveal>
          </div>

          <ol className="mt-16 grid gap-px overflow-hidden rounded-sm bg-forest-line sm:grid-cols-2 lg:grid-cols-4">
            {STEPS.map(([title, text], i) => (
              <Reveal as="li" key={title} delay={i * 80} className="bg-forest p-7 lg:p-8">
                <div className="flex items-center gap-3">
                  <span className="font-display text-4xl font-light">{String(i + 1).padStart(2, "0")}</span>
                  <span className="h-px flex-1 bg-forest-line" />
                </div>
                <h3 className="mt-10 text-2xl">{title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-forest-muted">{text}</p>
              </Reveal>
            ))}
          </ol>

          <div className="mt-12 flex flex-wrap items-center gap-4">
            <Link href="/contact" className={button({ variant: "light", size: "lg" })}>
              Plan een kennismaking <Arrow />
            </Link>
            <a href={`tel:${company.telefoonHref}`} className={button({ variant: "outlineLight", size: "lg" })}>
              Bel {company.telefoon}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */

function Collections() {
  return (
    <section className={cn(container, "py-24 lg:py-32")}>
      <Reveal className="flex flex-wrap items-end justify-between gap-6">
        <div>
          <Eyebrow>Collecties</Eyebrow>
          <h2 className="mt-5 text-4xl sm:text-5xl">Vier startpunten.</h2>
        </div>
        <Link href="/collecties" className={button({ variant: "outline", size: "sm" })}>
          Alle collecties <Arrow />
        </Link>
      </Reveal>

      <div className="mt-12 grid gap-x-5 gap-y-12 sm:grid-cols-2 lg:grid-cols-4">
        {collecties.map((c, i) => (
          <Reveal key={c.slug} delay={i * 70}>
            <Link href={`/collecties/${c.slug}`} className="group block">
              <div className="relative aspect-[4/5] overflow-hidden rounded-sm bg-muted">
                <Image
                  src={c.hero.src}
                  alt={c.hero.alt}
                  fill
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
  );
}

/* ------------------------------------------------------------------ */

function Story() {
  return (
    <section className={cn(container, "pb-24 lg:pb-32")}>
      <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
        <Reveal className="lg:col-span-6">
          <div className="grid grid-cols-5 gap-4">
            <div className="relative col-span-3 aspect-[3/4] overflow-hidden rounded-sm bg-muted">
              <Image src={PHOTOS.verhaalHero.src} alt={PHOTOS.verhaalHero.alt} fill sizes="(min-width: 1024px) 30vw, 60vw" className="object-cover" />
            </div>
            <div className="relative col-span-2 mt-16 aspect-[2/3] overflow-hidden rounded-sm bg-muted">
              <Image src={PHOTOS.homeHout.src} alt={PHOTOS.homeHout.alt} fill sizes="(min-width: 1024px) 20vw, 40vw" className="object-cover" />
            </div>
          </div>
        </Reveal>
        <Reveal delay={100} className="lg:col-span-5 lg:col-start-8">
          <Eyebrow>Ons verhaal</Eyebrow>
          <h2 className="mt-5 text-4xl leading-[1.08] sm:text-5xl">Gemaakt van het mooiste hout.</h2>
          <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
            Hout is voor ons meer dan een materiaal, het is onze passie. Elke nerf vertelt een verhaal. Elke afwerking wordt met
            liefde gedaan. Ontdek hoe twee broers via een reis door Zuidoost-Azië bij hun eerste eigen deur uitkwamen.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-6">
            <Link href="/ons-verhaal" className={button()}>
              Lees ons verhaal <Arrow />
            </Link>
            <Link href="/bewust-vakmanschap" className={button({ variant: "text" })}>
              Bewust vakmanschap
            </Link>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */

function Family() {
  return (
    <section className={cn(container, "pb-16 lg:pb-24")}>
      <Reveal className="grid items-center gap-8 border-y py-10 lg:grid-cols-12">
        <div className="lg:col-span-6">
          <Eyebrow>Een merk van MTB Bouw</Eyebrow>
          <p className="mt-4 max-w-xl font-display text-2xl font-light leading-snug sm:text-3xl">
            Achter Zebrano Studio staat MTB Bouw uit Enschede, ook voor het werk rond je deuren.
          </p>
        </div>
        <ul className="flex flex-wrap gap-2 lg:col-span-4">
          {merkfamilie.map((m) => (
            <li
              key={m.naam}
              className={cn(
                "rounded-sm border px-3 py-1.5 text-[0.8125rem]",
                m.href === "/" && "border-primary bg-primary text-primary-foreground",
              )}
            >
              {m.naam}
            </li>
          ))}
        </ul>
        <div className="lg:col-span-2 lg:text-right">
          <Link href="/mtb-bouw" className={button({ variant: "text" })}>
            Over de familie
          </Link>
        </div>
      </Reveal>
    </section>
  );
}
