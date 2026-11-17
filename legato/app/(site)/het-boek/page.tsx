import Link from "next/link";
import { BookCover, MockStage, SampleSpread } from "@/components/site/book-mock";
import { FormatRow, MaterialCovers } from "@/components/site/sections";
import { button } from "@/components/ui/button";
import { container, CtaSection, PageHero, SectionHeading, SplitIntro } from "@/components/ui/primitives";
import { Reveal } from "@/components/ui/reveal";
import { opbouw } from "@/data/boek";
import { BRAND } from "@/lib/brand";
import { pageMetadata } from "@/lib/seo";
import { cn } from "@/lib/utils";

export const metadata = pageMetadata({
  title: "Het boek: formaten, materialen en opbouw",
  description:
    "Een koffietafelboek van jullie trouwdag: drie formaten, omslag in linnen, leer, suède, fluweel, katoen of canvas, en een opbouw van titelpagina tot colofon. Gedrukt en gebonden in Italië.",
  path: "/het-boek",
});

export default function HetBoekPage() {
  return (
    <>
      <PageHero
        crumbs={[{ name: "Het boek", path: "/het-boek" }]}
        title="Een boek, geen album."
        intro={
          <>
            <p>
              Koffietafelformaat, gebonden, met een omslag van stof of leer en de titel erin gedrukt. Binnenin: voorwerk,
              hoofdstukken en een colofon, zoals in elk boek dat met zorg is gemaakt.
            </p>
            <p>Alleen gaat dit boek over jullie, en bestaat er maar één van.</p>
          </>
        }
        visual={
          <MockStage tone="board" className="aspect-[5/4] lg:aspect-[6/5]" caption="Voorbeeld: titelpagina">
            <div className="relative w-[86%]">
              <div className="absolute -top-[24%] left-[3%] w-[30%] -rotate-[5deg]">
                <BookCover />
              </div>
              <SampleSpread kind="titel" className="relative" />
            </div>
          </MockStage>
        }
      >
        <p className="text-small text-muted-foreground">Drie formaten, zes omslagmaterialen. Gedrukt en gebonden in Italië.</p>
      </PageHero>

      {/* Formats */}
      <section id="formaten" className={cn(container, "scroll-mt-24 pb-20 lg:pb-28")}>
        <SplitIntro title="Drie maten, één idee.">
          <p>
            Het boek is er in drie formaten. Welk formaat past, hangt af van jullie beelden en van waar het boek komt te liggen:
            veel brede landschappen vragen om iets anders dan een dag vol portretten.
          </p>
          <p>Ouderboeken zijn kleinere uitvoeringen met dezelfde inhoud. Die vind je bij de accessoires.</p>
        </SplitIntro>
        <FormatRow className="mt-16" />
        <p className="mt-6 text-small text-muted-foreground">
          Getekende voorbeelden, onderling op schaal. Maten zijn die van het gesloten boek.
        </p>
      </section>

      {/* Materials */}
      <section id="materialen" className="scroll-mt-24 bg-linen">
        <div className={cn(container, "py-20 lg:py-28")}>
          <SectionHeading title="Zes materialen, de titel erin gedrukt." />
          <Reveal className="mt-6 max-w-2xl text-lead text-muted-foreground">
            <p>
              Het omslag is het eerste wat je voelt. Jullie kiezen uit linnen, leer, suède, fluweel, katoen en canvas. De titel
              wordt blind in het materiaal gedrukt (debossing): geen opdruk die slijt, maar een afdruk die blijft.
            </p>
          </Reveal>
          <MaterialCovers withText className="mt-14" />
          <p className="mt-8 text-small text-muted-foreground">
            Getekende voorbeelden: kleur en structuur zijn ter illustratie. Welke kleuren er per materiaal zijn, laten we zien bij
            het voorstel.
          </p>
        </div>
      </section>

      {/* Inside */}
      <section id="opbouw" className={cn(container, "scroll-mt-24 py-20 lg:py-28")}>
        <SectionHeading
          title="Van schutblad tot colofon."
          action={
            <Link href="/hoofdstukken" className={button({ variant: "outline", size: "sm" })}>
              Hoofdstukken en verhalen
            </Link>
          }
        />
        <div className="mt-14 grid gap-x-8 gap-y-14 lg:grid-cols-3">
          {opbouw.map((part, i) => (
            <Reveal key={part.name} delay={i * 80}>
              <MockStage tone="board" className="aspect-[4/3]">
                <SampleSpread kind={(["titel", "quote", "colofon"] as const)[i]!} className="w-[86%]" />
              </MockStage>
              <h3 className="mt-6">{part.name}</h3>
              <p className="mt-3 text-muted-foreground">{part.text}</p>
              <ul className="mt-5 border-t text-[0.9375rem]">
                {part.items.map((item) => (
                  <li key={item} className="border-b py-2.5">
                    {item}
                  </li>
                ))}
              </ul>
            </Reveal>
          ))}
        </div>
      </section>

      {/* One of one + print */}
      <section className={cn(container, "pb-20 lg:pb-28")}>
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
          <Reveal className="lg:col-span-6">
            <MockStage tone="cloth" className="aspect-[4/3]">
              <SampleSpread kind="colofon" className="w-[86%]" />
            </MockStage>
          </Reveal>
          <Reveal delay={100} className="lg:col-span-5 lg:col-start-8">
            <h2>Er is er maar één van.</h2>
            <div className="mt-6 space-y-4 text-lead text-muted-foreground">
              <p>
                Elk boek wordt voor één paar ontworpen: eigen hoofdstukken, eigen teksten, eigen opmaak. Achterin staat het
                zwart op wit, in het colofon.
              </p>
              <p>
                De boeken worden gedrukt en gebonden in Italië door {BRAND.printer}, in de {BRAND.printerLine}.
              </p>
            </div>
            <Link href="/werkwijze" className={cn(button({ variant: "text" }), "mt-8")}>
              Zo komt het boek tot stand
            </Link>
          </Reveal>
        </div>
      </section>

      <CtaSection secondary={{ label: "Bekijk de accessoires", href: "/accessoires" }} />
    </>
  );
}
