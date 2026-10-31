import Image from "next/image";
import { CtaBand } from "@/components/cta-band";
import { CheckIcon } from "@/components/icons";
import { PillLink } from "@/components/ui/pill-link";
import { Breadcrumbs, Container, Eyebrow } from "@/components/ui/primitives";
import { isVerified } from "@/data/feiten";
import { pageMetadata } from "@/lib/seo";

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
] as const;

export default function ArchitectenPage() {
  const zichtbaar = voordelen.filter((v) => !("feit" in v) || isVerified(v.feit));
  return (
    <>
      <section className="relative isolate flex min-h-[80svh] items-end overflow-hidden bg-forest text-paper">
        <Image src="/images/hero-paviljoen.webp" alt="Paviljoen met zwembad onder een houten kapconstructie" fill priority sizes="100vw" className="-z-20 object-cover" />
        <div aria-hidden className="absolute inset-0 -z-10 bg-gradient-to-t from-[rgb(20_24_18/0.82)] via-[rgb(20_24_18/0.4)] to-[rgb(20_24_18/0.2)]" />
        <Container className="pb-12 pt-32 sm:pb-16">
          <Breadcrumbs tone="light" items={[{ name: "Architecten", path: "/architecten" }]} className="mb-6" />
          <p className="mb-4 font-sans text-xs font-semibold uppercase tracking-[0.16em] text-paper/80">Partnerprogramma · Zakelijk</p>
          <h1 className="max-w-4xl font-display text-5xl font-light leading-[1.02] tracking-tight sm:text-6xl">
            Word onderdeel van het verhaal van Zebrano Studio
          </h1>
          <div className="mt-8">
            <PillLink href="/contact?type=zakelijk" tone="paper" size="lg">
              Meld je aan als partner
            </PillLink>
          </div>
        </Container>
      </section>

      <section className="py-20 sm:py-28">
        <Container className="grid gap-12 lg:grid-cols-2 lg:gap-20">
          <div>
            <Eyebrow>Partner-first support</Eyebrow>
            <h2 className="font-display text-3xl font-light leading-tight text-ink sm:text-4xl">
              Een leverancier die jouw succes ondersteunt — niet met je klanten concurreert.
            </h2>
            <p className="mt-6 leading-relaxed text-ink/80">
              We hebben Zebrano opgericht omdat vakmensen een leverancier verdienen die hun succes ondersteunt. Jij houdt de relatie met je klant, verdient de marge die je verdient en richt je op waar je goed in bent.
            </p>
          </div>
          <div className="space-y-5 text-[17px] leading-relaxed text-ink/80">
            <h3 className="font-display text-2xl font-light text-ink">Ben jij een ontwerper die écht anders durft te denken?</h3>
            <p>
              Heb je soms het gevoel dat je creativiteit wordt beperkt door wat mogelijk is — in materialen, afwerkingen of productie? Je bent niet de enige.
            </p>
            <p>
              Bij Zebrano geloven we dat goed design nooit beperkt mag worden door de uitvoering. Daarom krijg je bij ons de ruimte om te ontdekken, te experimenteren en je meest gedurfde ideeën tot leven te brengen — met onze steun in elke stap.
            </p>
            <p>
              Zoek je een partner die jouw visie net zo waardeert als jijzelf en zich inzet om het onmogelijke mogelijk te maken? Dan ben je hier aan het juiste adres.
            </p>
          </div>
        </Container>
      </section>

      <section className="bg-forest py-20 text-paper sm:py-28">
        <Container>
          <Eyebrow tone="light">Wat je krijgt</Eyebrow>
          <h2 className="font-display text-3xl font-light sm:text-4xl">Als Zebrano-partner</h2>
          <ul className="mt-12 grid gap-px overflow-hidden rounded-lg bg-paper/15 sm:grid-cols-2 lg:grid-cols-3">
            {zichtbaar.map((v) => (
              <li key={v.title} className="bg-forest p-7 sm:p-8">
                <CheckIcon className="size-6 text-sand" />
                <h3 className="mt-5 font-display text-xl text-paper">{v.title}</h3>
                <p className="mt-3 text-[15px] leading-relaxed text-paper/80">{v.text}</p>
              </li>
            ))}
            <li className={(zichtbaar.length + 1) % 3 === 2 ? "bg-forest p-7 sm:p-8 lg:col-span-2" : "bg-forest p-7 sm:p-8"}>
              <CheckIcon className="size-6 text-sand" />
              <h3 className="mt-5 font-display text-xl text-paper">Bouwkundig werk in één hand</h3>
              <p className="mt-3 text-[15px] leading-relaxed text-paper/80">
                Zebrano Studio is een merk van MTB Bouw. Sparingen, wanden en afwerking rond de deuren kunnen in dezelfde planning mee — één aanspreekpunt voor het hele traject.
              </p>
            </li>
          </ul>
        </Container>
      </section>

      <section className="py-20 sm:py-28">
        <Container className="grid gap-10 lg:grid-cols-2 lg:items-end">
          <div>
            <Eyebrow>Partnerprogramma</Eyebrow>
            <h2 className="font-display text-3xl font-light leading-tight text-ink sm:text-4xl">
              Laten we samen grenzen verleggen. Word partner en ontwerp zonder beperkingen.
            </h2>
          </div>
          <div>
            <p className="text-lg leading-relaxed text-ink/80">
              We horen graag over je ideeën, projecten of vragen. Geen druk — gewoon een goed gesprek om te ontdekken hoe we samen iets bijzonders kunnen maken.
            </p>
            <div className="mt-6">
              <PillLink href="/contact?type=zakelijk">Start het gesprek</PillLink>
            </div>
          </div>
        </Container>
      </section>

      <CtaBand title="Een project op de tekentafel?" text="Stuur ons je tekeningen of ideeën. We denken mee over uitvoering, materialen en beslag en komen met een voorstel." />
    </>
  );
}
