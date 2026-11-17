import Link from "next/link";
import { MockStage, SampleSpread } from "@/components/site/book-mock";
import { button } from "@/components/ui/button";
import { container, CtaSection, Eyebrow, NumberedGrid, PageHero, Soft, SplitIntro } from "@/components/ui/primitives";
import { Reveal } from "@/components/ui/reveal";
import { BRAND } from "@/lib/brand";
import { pageMetadata } from "@/lib/seo";
import { cn } from "@/lib/utils";

export const metadata = pageMetadata({
  title: `Over ${BRAND.name}`,
  description: `Waarom ${BRAND.name} boeken maakt in plaats van albums: omdat van een trouwdag niet alleen de beelden, maar ook de woorden het bewaren waard zijn.`,
  path: "/over",
});

const PRINCIPLES: Array<[string, string]> = [
  ["Woorden tellen mee", "Een foto laat zien hoe het eruitzag. Een gelofte vertelt wat het betekende. Wij willen beide bewaren."],
  ["De fotograaf is de maker", "Wij maken het gereedschap en het boek. De fotograaf kent het paar en de dag, en hoort aan het stuur."],
  ["Techniek op de achtergrond", "De AI-assistent neemt opmaakwerk uit handen. Smaak, keuzes en het laatste woord blijven bij mensen."],
  ["Eerlijk over wat we weten", "Geen verzonnen recensies, geen prijzen die niet kloppen, geen levertijden die we niet kunnen waarmaken."],
];

export default function OverPage() {
  return (
    <>
      <PageHero
        eyebrow={`Over ${BRAND.name}`}
        crumbs={[{ name: "Over ons", path: "/over" }]}
        title={
          <>
            Gebonden, <Soft>in elke betekenis.</Soft>
          </>
        }
        intro={
          <>
            <p>
              Legato is Italiaans voor gebonden. In de muziek betekent het: noten die in elkaar overlopen, zonder dat je ertussen
              ademhaalt. In de boekbinderij is het letterlijk wat er met de katernen gebeurt.
            </p>
            <p>Dat is wat we met een trouwdag willen doen: losse momenten tot één doorlopend verhaal binden.</p>
          </>
        }
        visual={
          <MockStage tone="cloth" className="aspect-[5/4] lg:aspect-[6/5]">
            <SampleSpread kind="quote" className="w-[86%]" board="oklch(0.85 0.022 80)" />
          </MockStage>
        }
      />

      <section className={cn(container, "pb-24 lg:pb-32")}>
        <SplitIntro
          eyebrow="Waarom een boek"
          title={
            <>
              Het album <Soft>mist de helft.</Soft>
            </>
          }
        >
          <p>
            Een goede trouwfotograaf legt een dag prachtig vast. Maar een dag bestaat niet alleen uit beeld. Er wordt gesproken,
            beloofd, voorgelezen, gezongen. Juist dat verdwijnt het snelst: in een notitie-app, op een papiertje in een
            binnenzak, in het geheugen van wie erbij was.
          </p>
          <p>
            {BRAND.name} is begonnen vanuit die ene gedachte: een boek waarin de foto&apos;s en de woorden samen de dag vertellen.
            Met hoofdstukken, zodat je erin kunt lezen. En gemaakt met de fotograaf, omdat die de dag van dichtbij heeft gezien.
          </p>
        </SplitIntro>
        <NumberedGrid items={PRINCIPLES} className="mt-16" />
      </section>

      <section className="bg-linen">
        <div className={cn(container, "py-24 lg:py-32")}>
          <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
            <Reveal className="lg:col-span-5">
              <Eyebrow>Hoe we werken</Eyebrow>
              <h2 className="mt-5 text-4xl leading-[1.05] sm:text-5xl">
                Software van nu, <Soft>bindwerk van vroeger.</Soft>
              </h2>
              <div className="mt-6 space-y-4 text-lg leading-relaxed text-muted-foreground">
                <p>
                  Het ontwerpen gebeurt in een studio in de browser, met een AI-assistent die opmaakvoorstellen doet. Het boek
                  zelf is ouderwets tastbaar: gedrukt en gebonden in Italië door {BRAND.printer}, met een omslag van stof of leer.
                </p>
                <p>
                  {BRAND.name} is jong. Deze website laat daarom getekende voorbeelden zien in plaats van foto&apos;s van
                  gemaakte boeken, en noemt geen aantallen of ervaringen die er nog niet zijn.
                </p>
              </div>
              <div className="mt-8 flex flex-wrap items-center gap-6">
                <Link href="/werkwijze" className={button({ variant: "text" })}>
                  De werkwijze
                </Link>
                <Link href="/voor-fotografen" className={button({ variant: "text" })}>
                  Voor fotografen
                </Link>
              </div>
            </Reveal>
            <Reveal delay={100} className="lg:col-span-7">
              <MockStage tone="paper" className="aspect-[4/3] border">
                <SampleSpread kind="colofon" className="w-[86%]" />
              </MockStage>
            </Reveal>
          </div>
        </div>
      </section>

      <div className="h-24 lg:h-32" />
      <CtaSection />
    </>
  );
}
