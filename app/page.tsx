import Image from "next/image";
import Link from "next/link";
import { CtaBand } from "@/components/cta-band";
import { HomeHero } from "@/components/home/home-hero";
import { Preloader } from "@/components/preloader";
import { PassionTabs, type PassionItem } from "@/components/home/passion-tabs";
import { ArrowRightIcon, HingedDoorIcon, PivotDoorIcon, SlidingDoorIcon } from "@/components/icons";
import { PillLink } from "@/components/ui/pill-link";
import { Container, Eyebrow } from "@/components/ui/primitives";
import { collecties } from "@/data/collecties";
import { merkfamilie } from "@/data/mtb-bouw";
import { primaryCta } from "@/lib/navigation";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  absoluteTitle: "Exclusieve binnendeuren op maat | Zebrano Studio",
  description:
    "Zebrano Studio maakt taatsdeuren, schuifdeuren, wandvlakke deuren, roomdividers en boiserie op maat — exclusief design, bereikbaar gemaakt. Een merk van MTB Bouw.",
  path: "/",
});

const waarom = [
  { title: "Maatwerk ontwerp", text: "Vormen, afwerkingen en materialen, volledig afgestemd op jouw idee en jouw ruimte." },
  { title: "Bereikbare luxe", text: "Hoogwaardig vakmanschap en bijzondere materialen — bereikbaar gemaakt voor elk project." },
  { title: "Eenvoudig kiezen", text: "Een helder proces met zorgvuldig gekozen opties, zodat kiezen moeiteloos blijft." },
  { title: "Precisie in vakmanschap", text: "Deuren die een leven lang meegaan, met oog voor elk detail." },
  { title: "Eindeloze inspiratie", text: "Talloze ontwerpmogelijkheden om jouw ruimte onvergetelijk te maken." },
];

const passie: PassionItem[] = [
  {
    label: "Maatwerk",
    title: "Exclusieve houten deuren",
    text: "Zebrano ontwerpt taats-, schuif- en draaideuren op maat, gemaakt van hoogwaardige materialen en afgewerkt met exclusieve details.",
    image: { src: "/images/taatsdeur-visgraat.webp", alt: "Houten taatsdeur met visgraatpatroon" },
  },
  {
    label: "Unieke details",
    title: "Materialen met een verhaal",
    text: "Van bijzondere houtsoorten tot handgeselecteerde steen en ambachtelijk glas — elk materiaal is gekozen om zijn karakter, herkomst en natuurlijke schoonheid.",
    image: { src: "/images/fineer-rollen.webp", alt: "Rollen houtfineer in warme tinten" },
  },
  {
    label: "Grenzeloos ontwerp",
    title: "Ontwerp zonder grenzen",
    text: "We gaan verder dan standaardmaten en -afwerkingen, en maken deuren die naadloos aansluiten bij jouw architectuur en persoonlijke stijl.",
    image: { src: "/images/boiserie-1.webp", alt: "Klassieke boiserie met sierlijsten rond een hoge deur" },
  },
  {
    label: "Bewust vakmanschap",
    title: "Vakmanschap & duurzaamheid",
    text: "We bouwen ze zo goed, dat je ze misschien vaker laat zien dan je nieuwe keuken.",
    image: { src: "/images/afwerking-olie.webp", alt: "Hout wordt met de hand geolied" },
  },
];

const deurtypes = [
  {
    name: "Taatsdeuren",
    href: "/taatsdeuren",
    icon: PivotDoorIcon,
    text: "Een taatsdeur draait niet op scharnieren aan de zijkant, maar op een scharnierpunt in vloer en plafond. Zo ontstaat een vloeiende, bijna zwevende beweging.",
  },
  {
    name: "Schuifdeuren",
    href: "/schuifdeuren",
    icon: SlidingDoorIcon,
    text: "Glijden moeiteloos langs een rail — ideaal voor ruimtebesparende indelingen, als roomdivider, kastoplossing of vloeiende overgang.",
  },
  {
    name: "Draaideuren",
    href: "/draaideuren",
    icon: HingedDoorIcon,
    text: "De klassieke deur op zijscharnieren: enkel of dubbel, in elke stijl en afwerking.",
  },
];

export default function HomePage() {
  return (
    <>
      <Preloader />
      <HomeHero />

      {/* Waarom Zebrano */}
      <section className="py-20 sm:py-28">
        <Container>
          <div className="grid gap-8 lg:grid-cols-2 lg:gap-16">
            <h2 className="font-display text-4xl font-light leading-tight text-ink sm:text-5xl">Waarom kiezen voor Zebrano Studio?</h2>
            <p className="text-lg leading-relaxed text-ink/80">
              Wij geloven dat luxe niet onbereikbaar hoeft te zijn. Onze deuren worden gemaakt met dezelfde precisie en materialen als de
              mooiste interieurs ter wereld, maar zijn ontworpen voor ieder huis. Van de eerste schets tot de laatste installatie brengen we
              high-end design in je dagelijks leven — zonder concessies.
            </p>
          </div>
          <ul className="mt-14 grid gap-px overflow-hidden rounded-lg border border-line/30 bg-line/30 sm:grid-cols-2 lg:grid-cols-5">
            {waarom.map((w, i) => (
              <li key={w.title} className="bg-paper p-6">
                <p className="font-sans text-xs font-semibold tracking-[0.16em] text-bark/70">{String(i + 1).padStart(2, "0")}</p>
                <h3 className="mt-3 font-display text-lg text-ink">{w.title}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-ink/75">{w.text}</p>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* Passie voor hout */}
      <section className="bg-sand/60 py-20 sm:py-28">
        <Container>
          <div className="mb-12 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <Eyebrow>Over Zebrano</Eyebrow>
              <h2 className="font-display text-4xl font-light leading-tight text-ink sm:text-5xl">
                Passie voor hout.
                <br />
                Precisie in design.
              </h2>
            </div>
            <PillLink href="/collecties" tone="outline">
              Bekijk de collecties
            </PillLink>
          </div>
          <PassionTabs items={passie} />
        </Container>
      </section>

      {/* Deurtypes — groen, zoals op de oude site */}
      <section className="px-3 pt-3">
        <div className="rounded-lg bg-forest py-20 text-paper sm:py-28">
          <Container>
            <div className="grid gap-8 lg:grid-cols-2 lg:items-end">
              <h2 className="font-display text-4xl font-light sm:text-5xl">Deurtypes</h2>
              <p className="text-lg leading-relaxed text-paper/80">
                Ontdek ons aanbod exclusieve houten deuren, elk met eigen voordelen in stijl, functie en ruimtegebruik. Van indrukwekkende
                entrees tot naadloze overgangen: er is een oplossing voor jouw huis.
              </p>
            </div>
            <div className="mt-14 grid gap-5 md:grid-cols-3">
              {deurtypes.map((d) => (
                <Link
                  key={d.href}
                  href={d.href}
                  className="group flex flex-col justify-between gap-8 rounded-2xl border border-paper/35 p-7 transition-colors duration-300 hover:bg-paper/5"
                >
                  <div>
                    <d.icon className="h-20 w-auto text-paper/85" />
                    <h3 className="mt-8 font-display text-2xl text-paper">{d.name}</h3>
                    <p className="mt-3 text-[15px] leading-relaxed text-paper/75">{d.text}</p>
                  </div>
                  <span className="inline-flex w-fit items-center gap-2 rounded-full bg-paper px-4 py-1.5 text-sm text-forest">
                    Bekijk {d.name.toLowerCase()}
                    <ArrowRightIcon className="size-4 transition-transform group-hover:translate-x-0.5" />
                  </span>
                </Link>
              ))}
            </div>
            <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-3 border-t border-paper/20 pt-8 text-[15px]">
              <span className="text-paper/70">Ook:</span>
              <Link href="/wandvlakke-deuren" className="underline-offset-4 hover:underline">
                Wandvlakke deuren
              </Link>
              <Link href="/roomdividers" className="underline-offset-4 hover:underline">
                Roomdividers
              </Link>
              <Link href="/boiserie" className="underline-offset-4 hover:underline">
                Boiserie
              </Link>
              <Link href="/materialen" className="underline-offset-4 hover:underline">
                Materialen
              </Link>
              <span className="ml-auto">
                <PillLink href={primaryCta.href} tone="paper">
                  {primaryCta.label}
                </PillLink>
              </span>
            </div>
          </Container>
        </div>
      </section>

      {/* Collecties */}
      <section className="py-20 sm:py-28">
        <Container>
          <div className="mb-12 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <Eyebrow>Collecties</Eyebrow>
              <h2 className="font-display text-4xl font-light text-ink sm:text-5xl">Vier startpunten</h2>
            </div>
            <PillLink href="/collecties" tone="outline">
              Alle collecties
            </PillLink>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {collecties.map((c) => (
              <Link key={c.slug} href={`/collecties/${c.slug}`} className="group">
                <div className="relative aspect-[3/4] overflow-hidden rounded-lg">
                  <Image
                    src={c.hero.src}
                    alt={c.hero.alt}
                    fill
                    sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-[1.05]"
                  />
                </div>
                <h3 className="mt-4 font-display text-xl text-ink">{c.name}</h3>
                <p className="mt-1 text-sm leading-relaxed text-ink/70">{c.tagline}</p>
              </Link>
            ))}
          </div>
        </Container>
      </section>

      {/* Inspiratie & inzichten → ons verhaal */}
      <section className="bg-sand/60 py-20 sm:py-28">
        <Container className="grid items-center gap-12 lg:grid-cols-2 lg:gap-20">
          <div className="relative aspect-[4/3] overflow-hidden rounded-lg">
            <Image src="/images/hout-planken.webp" alt="Gestapelde houten planken met zichtbare nerf" fill sizes="(min-width: 1024px) 45vw, 100vw" className="object-cover" />
          </div>
          <div>
            <Eyebrow>Inspiratie & inzichten</Eyebrow>
            <h2 className="font-display text-4xl font-light leading-tight text-ink sm:text-5xl">Gemaakt van het mooiste hout</h2>
            <p className="mt-6 text-lg leading-relaxed text-ink/80">
              Hout is voor ons meer dan een materiaal — het is onze passie. Elke nerf vertelt een verhaal. Elke afwerking wordt met liefde
              gedaan. Ontdek hoe twee broers via een reis door Zuidoost-Azië bij hun eerste eigen deur uitkwamen.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <PillLink href="/ons-verhaal">Lees ons verhaal</PillLink>
              <PillLink href="/bewust-vakmanschap" tone="outline">
                Bewust vakmanschap
              </PillLink>
            </div>
          </div>
        </Container>
      </section>

      {/* MTB Bouw-familie */}
      <section className="py-16 sm:py-20">
        <Container>
          <div className="flex flex-col gap-8 rounded-lg border border-line/30 p-8 sm:p-10 lg:flex-row lg:items-center lg:justify-between">
            <div className="max-w-xl">
              <Eyebrow>Een merk van MTB Bouw</Eyebrow>
              <p className="font-display text-2xl font-light leading-snug text-ink sm:text-3xl">
                Achter Zebrano Studio staat MTB Bouw uit Enschede — ook voor het werk rond je deuren.
              </p>
            </div>
            <ul className="flex flex-wrap gap-2">
              {merkfamilie.map((m) => (
                <li key={m.naam} className={m.href === "/" ? "rounded-full bg-forest px-4 py-2 text-sm text-paper" : "rounded-full border border-line/40 px-4 py-2 text-sm"}>
                  {m.naam}
                </li>
              ))}
            </ul>
            <PillLink href="/mtb-bouw" tone="outline">
              Over de familie
            </PillLink>
          </div>
        </Container>
      </section>

      <CtaBand />
    </>
  );
}
