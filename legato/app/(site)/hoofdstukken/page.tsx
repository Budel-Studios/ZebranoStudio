import Link from "next/link";
import { MockStage, SampleSpread } from "@/components/site/book-mock";
import { button } from "@/components/ui/button";
import { container, CtaSection, PageHero, SectionHeading, Soft } from "@/components/ui/primitives";
import { Reveal } from "@/components/ui/reveal";
import { hoofdstukken, verhaalvormen } from "@/data/hoofdstukken";
import { pageMetadata } from "@/lib/seo";
import { cn } from "@/lib/utils";

export const metadata = pageMetadata({
  title: "Hoofdstukken en verhalen",
  description:
    "Een trouwboek in hoofdstukken, van aankomst tot vertrek, met de geschreven verhalen erbij: geloften, speeches, gastenquotes, brieven, menu, playlist, tijdlijn, kaart en in memoriam.",
  path: "/hoofdstukken",
});

const ROMAN = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X", "XI", "XII"];

export default function HoofdstukkenPage() {
  const featured = verhaalvormen.filter((v) => v.spread);
  const plain = verhaalvormen.filter((v) => !v.spread);
  return (
    <>
      <PageHero
        eyebrow="Hoofdstukken en verhalen"
        crumbs={[{ name: "Hoofdstukken", path: "/hoofdstukken" }]}
        title={
          <>
            De dag, <Soft>in volgorde verteld.</Soft>
          </>
        }
        intro={
          <>
            <p>
              Een boek heeft hoofdstukken. Dat geeft rust: elke fase van de dag krijgt een eigen opening, een eigen ritme en de
              teksten die erbij horen.
            </p>
            <p>Hieronder de hoofdstukken die we vaak zien, en alle vormen waarin jullie woorden een plek kunnen krijgen.</p>
          </>
        }
        visual={
          <MockStage tone="blush" className="aspect-[5/4] lg:aspect-[6/5]" caption="Voorbeeld · tijdlijn">
            <SampleSpread kind="tijdlijn" className="w-[86%]" />
          </MockStage>
        }
      >
        <div className="flex flex-wrap gap-x-8 gap-y-3 text-sm">
          <a href="#hoofdstukken" className="link-line">
            De hoofdstukken
          </a>
          <a href="#verhalen" className="link-line">
            De verhaalvormen
          </a>
        </div>
      </PageHero>

      {/* Chapters */}
      <section id="hoofdstukken" className="scroll-mt-24 bg-linen">
        <div className={cn(container, "py-24 lg:py-32")}>
          <SectionHeading
            eyebrow="De hoofdstukken"
            title={
              <>
                Van aankomst <Soft>tot vertrek.</Soft>
              </>
            }
            titleClassName="sm:text-6xl"
          />
          <Reveal className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground">
            <p>
              Dit is geen vaste indeling. Jullie kiezen welke hoofdstukken het boek krijgt, in welke volgorde, en hoe ze heten.
              Een weekend in het buitenland heeft andere hoofdstukken dan een dag in de stad.
            </p>
          </Reveal>
          <ol className="mt-14 grid gap-x-10 border-t border-foreground/15 md:grid-cols-2">
            {hoofdstukken.map((h, i) => (
              <Reveal as="li" key={h.id} id={h.id === "geloften" ? undefined : h.id} delay={(i % 2) * 60} className="flex scroll-mt-28 gap-5 border-b border-foreground/15 py-7">
                <span className="w-10 shrink-0 pt-2 text-[0.6875rem] tabular-nums tracking-[0.16em] text-gold">{ROMAN[i]}</span>
                <div>
                  <h3 className="text-[2rem] leading-none">{h.name}</h3>
                  <p className="mt-3 max-w-md text-[0.9375rem] leading-relaxed text-muted-foreground">{h.text}</p>
                </div>
              </Reveal>
            ))}
          </ol>
        </div>
      </section>

      {/* Story types */}
      <section id="verhalen" className={cn(container, "scroll-mt-24 py-24 lg:py-32")}>
        <SectionHeading
          eyebrow="De verhaalvormen"
          title={
            <>
              Alles wat is gezegd <Soft>en geschreven.</Soft>
            </>
          }
          titleClassName="sm:text-6xl"
        />
        <Reveal className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground">
          <p>
            Dit maakt het verschil met een album. Elke tekst krijgt een vorm die erbij past: een speech leest anders dan een
            menu, een brief anders dan een quote uit het gastenboek. Niets is verplicht.
          </p>
        </Reveal>

        <div className="mt-16 space-y-20 lg:space-y-28">
          {featured.map((v, i) => (
            <div key={v.id} id={v.id} className="grid scroll-mt-28 items-center gap-10 lg:grid-cols-12 lg:gap-16">
              <Reveal className={cn("lg:col-span-7", i % 2 === 1 && "lg:order-2")}>
                <MockStage tone={(["linen", "blush", "paper"] as const)[i % 3]!} className={cn("aspect-[4/3]", i % 3 === 2 && "border")}>
                  <SampleSpread kind={v.spread!} className="w-[86%]" />
                </MockStage>
              </Reveal>
              <Reveal delay={100} className={cn("lg:col-span-4", i % 2 === 1 ? "lg:order-1 lg:col-start-1" : "lg:col-start-9")}>
                <p className="text-[0.6875rem] tabular-nums tracking-[0.2em] text-gold">{String(i + 1).padStart(2, "0")}</p>
                <h3 className="mt-4 text-4xl sm:text-5xl">{v.name}</h3>
                <p className="mt-5 text-lg leading-relaxed text-muted-foreground">{v.text}</p>
              </Reveal>
            </div>
          ))}
        </div>

        <div className="mt-20 grid border-t sm:grid-cols-3 lg:mt-28">
          {plain.map((v, i) => (
            <Reveal key={v.id} id={v.id} delay={i * 60} className="scroll-mt-28 border-b py-8 sm:border-b-0 sm:border-l sm:px-6 sm:first:border-l-0 sm:first:pl-0">
              <p className="text-[0.6875rem] tabular-nums tracking-[0.2em] text-gold">{String(featured.length + i + 1).padStart(2, "0")}</p>
              <h3 className="mt-4 text-3xl">{v.name}</h3>
              <p className="mt-3 text-[0.9375rem] leading-relaxed text-muted-foreground">{v.text}</p>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-16 flex flex-wrap items-center justify-between gap-6 border-y py-8">
          <p className="max-w-xl font-display text-2xl leading-snug sm:text-3xl">
            Staat jullie verhaal er niet tussen? Een gedicht, een recept, een tekening van een neefje: het kan allemaal een pagina krijgen.
          </p>
          <Link href="/contact" className={button({ variant: "text" })}>
            Vertel het ons
          </Link>
        </Reveal>
      </section>

      <CtaSection
        title="Welke hoofdstukken krijgt jullie boek?"
        text="Vertel ons hoe jullie dag eruitzag of gaat zien, en welke woorden jullie willen bewaren. We denken mee over de indeling."
        secondary={{ label: "Bekijk de werkwijze", href: "/werkwijze" }}
      />
    </>
  );
}
