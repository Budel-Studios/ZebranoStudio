import Link from "next/link";
import { Arrow } from "@/components/ui/arrow";
import { button } from "@/components/ui/button";
import { container, CtaSection, Eyebrow, PageHero, SplitIntro } from "@/components/ui/primitives";
import { Reveal } from "@/components/ui/reveal";
import { company } from "@/data/company";
import { isVerified } from "@/data/feiten";
import { IMAGES } from "@/lib/images";
import { pageMetadata } from "@/lib/seo";
import { cn } from "@/lib/utils";

export const metadata = pageMetadata({
  title: "Voor architecten en interieurontwerpers",
  description:
    "Het partnerprogramma van Zebrano Studio voor architecten, ontwerpers en aannemers: ontwerpvrijheid, directe designondersteuning en één aanspreekpunt voor uitvoering.",
  path: "/architecten",
});

const voordelen = [
  {
    title: "Echte groothandelsprijzen",
    text: "Bij ons krijg je eerlijke groothandelsprijzen, zodat jouw bedrijf winstgevend en concurrerend kan groeien. Als jij groeit, groeien wij mee.",
    feit: "groothandelsprijzen" as const,
  },
  {
    title: "Onbeperkte ontwerpvrijheid",
    text: "Unieke vormen, bijzondere materiaalcombinaties of een speciale afwerking — wij zetten geen grenzen. Jij bedenkt het, wij maken het mogelijk.",
  },
  {
    title: "Directe designondersteuning",
    text: "Je hebt rechtstreeks contact met ons designteam. We denken mee en begeleiden je in elke stap, zodat jij je kunt richten op waar je het beste in bent: inspirerende ruimtes ontwerpen.",
  },
  {
    title: "Zekerheid door open communicatie",
    text: "Goede communicatie is onze basis. We houden je op de hoogte, betrekken je bij het proces en zorgen dat je je gesteund voelt — met gemoedsrust bij ieder project.",
  },
  {
    title: "Volledige ondersteuning",
    text: "We zijn meer dan een leverancier: we zijn je supportteam achter de schermen, met designadvies en coördinatie van de uitvoering. Alsof je een eigen team in huis hebt, zonder de vaste lasten.",
  },
  {
    title: "Bouwkundig werk in één hand",
    text: "Zebrano Studio is een merk van MTB Bouw. Sparingen, wanden en afwerking rond de deuren kunnen in dezelfde planning mee — één aanspreekpunt voor het hele traject.",
  },
] as const;

export default function ArchitectenPage() {
  const zichtbaar = voordelen.filter((v) => !("feit" in v) || isVerified(v.feit));
  return (
    <>
      <PageHero
        eyebrow="Samenwerken · Partnerprogramma"
        title="Voor architecten en ontwerpers"
        intro={<p>Word onderdeel van het verhaal van Zebrano Studio: ontwerp zonder beperkingen, met een maker die jouw visie net zo serieus neemt als jij.</p>}
        image={IMAGES.doorWandvlak}
        crumbs={[{ name: "Samenwerken", path: "/architecten" }]}
      >
        <div className="flex flex-wrap items-center gap-4">
          <Link href="/contact?type=zakelijk" className={button()}>
            Meld je aan als partner <Arrow />
          </Link>
          <a href={`tel:${company.telefoonHref}`} className={button({ variant: "text" })}>
            of bel {company.telefoon}
          </a>
        </div>
      </PageHero>

      <section className={cn(container, "pb-24 lg:pb-32")}>
        <SplitIntro eyebrow="Partner-first support" title="Een leverancier die jouw succes ondersteunt.">
          <p>
            Niet een leverancier die met je klanten concurreert. We hebben Zebrano opgericht omdat vakmensen een leverancier
            verdienen die hun succes ondersteunt. Jij houdt de relatie met je klant, verdient de marge die je verdient en richt je
            op waar je goed in bent.
          </p>
        </SplitIntro>
      </section>

      <section className="bg-sand">
        <div className={cn(container, "grid gap-10 py-24 lg:grid-cols-12 lg:py-32")}>
          <Reveal className="lg:col-span-5">
            <Eyebrow>Voor ontwerpers</Eyebrow>
            <h2 className="mt-5 max-w-[16ch] text-4xl leading-[1.08] sm:text-5xl">Ben jij een ontwerper die écht anders durft te denken?</h2>
          </Reveal>
          <Reveal delay={100} className="space-y-5 text-lg leading-relaxed text-muted-foreground lg:col-span-6 lg:col-start-7">
            <p>
              Heb je soms het gevoel dat je creativiteit wordt beperkt door wat mogelijk is — in materialen, afwerkingen of
              productie? Je bent niet de enige.
            </p>
            <p>
              Bij Zebrano geloven we dat goed design nooit beperkt mag worden door de uitvoering. Daarom krijg je bij ons de ruimte
              om te ontdekken, te experimenteren en je meest gedurfde ideeën tot leven te brengen — met onze steun in elke stap.
            </p>
            <p>
              Zoek je een partner die jouw visie net zo waardeert als jijzelf en zich inzet om het onmogelijke mogelijk te maken?
              Dan ben je hier aan het juiste adres.
            </p>
          </Reveal>
        </div>
      </section>

      <section className={cn(container, "py-24 lg:py-32")}>
        <Reveal>
          <Eyebrow>Wat je krijgt</Eyebrow>
          <h2 className="mt-5 text-4xl sm:text-5xl">Als Zebrano-partner.</h2>
        </Reveal>
        <div className="mt-16 grid sm:grid-cols-2 lg:grid-cols-3">
          {zichtbaar.map((v, i) => (
            <Reveal
              key={v.title}
              delay={(i % 3) * 60}
              className="border-t py-8 sm:pr-8 lg:px-6 lg:[&:nth-child(3n+1)]:pl-0 lg:[&:not(:nth-child(3n+1))]:border-l"
            >
              <p className="text-[0.6875rem] tabular-nums tracking-[0.2em] text-copper">{String(i + 1).padStart(2, "0")}</p>
              <h3 className="mt-4 text-2xl">{v.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{v.text}</p>
            </Reveal>
          ))}
        </div>
      </section>

      <CtaSection
        eyebrow="Partnerprogramma"
        title="Laten we samen grenzen verleggen."
        text="We horen graag over je ideeën, projecten of vragen. Geen druk, gewoon een goed gesprek om te ontdekken hoe we samen iets bijzonders kunnen maken. Stuur gerust je tekeningen mee."
        cta={{ label: "Start het gesprek", href: "/contact?type=zakelijk" }}
      />
    </>
  );
}
