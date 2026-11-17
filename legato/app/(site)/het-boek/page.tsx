import Link from "next/link";
import { BookCover, MockStage, SampleSpread } from "@/components/site/book-mock";
import { FormatRow, MaterialCovers } from "@/components/site/sections";
import { Arrow } from "@/components/ui/arrow";
import { button } from "@/components/ui/button";
import { container, CtaSection, Eyebrow, PageHero, SectionHeading, Soft, SplitIntro } from "@/components/ui/primitives";
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
        eyebrow="Het boek"
        crumbs={[{ name: "Het boek", path: "/het-boek" }]}
        title={
          <>
            Een boek, <Soft>geen album.</Soft>
          </>
        }
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
          <MockStage tone="linen" className="aspect-[5/4] lg:aspect-[6/5]" caption="Voorbeeld · titelpagina">
            <div className="relative w-[86%]">
              <div className="absolute -top-[24%] left-[3%] w-[30%] -rotate-[5deg]">
                <BookCover color="oklch(0.33 0.08 18)" texture="nap" />
              </div>
              <SampleSpread kind="titel" className="relative" board="oklch(0.76 0.026 78)" />
            </div>
          </MockStage>
        }
      >
        <dl className="grid grid-cols-3 text-sm">
          {[
            ["Formaten", "Drie"],
            ["Omslag", "Zes materialen"],
            ["Druk", "Italië"],
          ].map(([k, v]) => (
            <div key={k} className="border-r pr-4 last:border-r-0 [&:not(:first-child)]:pl-4">
              <dt className="text-[0.6875rem] uppercase tracking-[0.2em] text-muted-foreground">{k}</dt>
              <dd className="mt-1.5">{v}</dd>
            </div>
          ))}
        </dl>
      </PageHero>

      {/* Formats */}
      <section id="formaten" className={cn(container, "scroll-mt-24 pb-24 lg:pb-32")}>
        <SplitIntro
          eyebrow="Formaten"
          title={
            <>
              Drie maten, <Soft>één idee.</Soft>
            </>
          }
        >
          <p>
            Het boek is er in drie formaten. Welk formaat past, hangt af van jullie beelden en van waar het boek komt te liggen:
            veel brede landschappen vragen om iets anders dan een dag vol portretten.
          </p>
          <p>Ouderboeken zijn kleinere uitvoeringen met dezelfde inhoud. Die vind je bij de accessoires.</p>
        </SplitIntro>
        <FormatRow className="mt-16" />
        <p className="mt-6 text-[0.8125rem] text-muted-foreground">
          Getekende voorbeelden, onderling op schaal. Maten zijn die van het gesloten boek.
        </p>
      </section>

      {/* Materials */}
      <section id="materialen" className="scroll-mt-24 bg-linen">
        <div className={cn(container, "py-24 lg:py-32")}>
          <SectionHeading
            eyebrow="Omslag en materiaal"
            title={
              <>
                Zes materialen, <Soft>de titel erin gedrukt.</Soft>
              </>
            }
            titleClassName="sm:text-6xl"
          />
          <Reveal className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground">
            <p>
              Het omslag is het eerste wat je voelt. Jullie kiezen uit linnen, leer, suède, fluweel, katoen en canvas. De titel
              wordt blind in het materiaal gedrukt (debossing): geen opdruk die slijt, maar een afdruk die blijft.
            </p>
          </Reveal>
          <MaterialCovers withText className="mt-14" />
          <p className="mt-8 text-[0.8125rem] text-muted-foreground">
            Getekende voorbeelden: kleur en structuur zijn ter illustratie. Welke kleuren er per materiaal zijn, laten we zien bij
            het voorstel.
          </p>
        </div>
      </section>

      {/* Inside */}
      <section id="opbouw" className={cn(container, "scroll-mt-24 py-24 lg:py-32")}>
        <SectionHeading
          eyebrow="Wat erin staat"
          title={
            <>
              Van schutblad <Soft>tot colofon.</Soft>
            </>
          }
          titleClassName="sm:text-6xl"
          action={
            <Link href="/hoofdstukken" className={button({ variant: "outline", size: "sm" })}>
              Hoofdstukken en verhalen <Arrow />
            </Link>
          }
        />
        <div className="mt-14 grid gap-x-8 gap-y-14 lg:grid-cols-3">
          {opbouw.map((part, i) => (
            <Reveal key={part.name} delay={i * 80}>
              <MockStage tone={i === 1 ? "board" : "linen"} className="aspect-[4/3]">
                <SampleSpread kind={(["titel", "quote", "colofon"] as const)[i]!} className="w-[86%]" />
              </MockStage>
              <div className="mt-6 flex items-baseline gap-4">
                <span className="text-[0.6875rem] tabular-nums tracking-[0.2em] text-ribbon">{String(i + 1).padStart(2, "0")}</span>
                <h3 className="text-3xl">{part.name}</h3>
              </div>
              <p className="mt-3 text-[0.9375rem] leading-relaxed text-muted-foreground">{part.text}</p>
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
      <section className={cn(container, "pb-24 lg:pb-32")}>
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
          <Reveal className="lg:col-span-6">
            <MockStage tone="cloth" className="aspect-[4/3]">
              <SampleSpread kind="colofon" className="w-[86%]" board="oklch(0.85 0.022 80)" />
            </MockStage>
          </Reveal>
          <Reveal delay={100} className="lg:col-span-5 lg:col-start-8">
            <Eyebrow>Exemplaar 1 van 1</Eyebrow>
            <h2 className="mt-5 text-4xl leading-[1.05] sm:text-5xl">
              Er is er <Soft>maar één van.</Soft>
            </h2>
            <div className="mt-6 space-y-4 text-lg leading-relaxed text-muted-foreground">
              <p>
                Elk boek wordt voor één paar ontworpen: eigen hoofdstukken, eigen teksten, eigen opmaak. Achterin staat het
                zwart op wit, in het colofon.
              </p>
              <p>
                De boeken worden gedrukt en gebonden in Italië door {BRAND.printer}, in de {BRAND.printerLine.replace(" · ", ", ")}.
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
