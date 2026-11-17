import Link from "next/link";
import { AssistantPanel } from "@/components/site/assistant-panel";
import { MockStage, SampleSpread } from "@/components/site/book-mock";
import { StepsBlock } from "@/components/site/sections";
import { Arrow } from "@/components/ui/arrow";
import { button } from "@/components/ui/button";
import { container, CtaSection, Eyebrow, NumberedGrid, PageHero, Soft, SplitIntro } from "@/components/ui/primitives";
import { Reveal } from "@/components/ui/reveal";
import { BRAND } from "@/lib/brand";
import { pageMetadata } from "@/lib/seo";
import { cn } from "@/lib/utils";

export const metadata = pageMetadata({
  title: "Voor fotografen: een eigen studio voor trouwboeken",
  description:
    "Bied je bruidsparen een boek in plaats van een album. Je krijgt een eigen portaal waarin je het boek samen met het paar samenstelt, geholpen door een AI-ontwerpassistent. Gedrukt in Italië.",
  path: "/voor-fotografen",
});

const WHY: Array<[string, string]> = [
  ["Een eigen portaal", "Jouw studio, onder je eigen naam. Per bruiloft open je een boek en nodig je het paar uit om mee te kijken."],
  ["Minder opmaakwerk", "De ontwerpassistent zet een eerste opmaak neer op basis van jouw keuzes. Jij schaaft bij in plaats van bij nul te beginnen."],
  ["Meer dan foto's", "Geloften, speeches en brieven maken het boek persoonlijker dan een album. Dat is een ander gesprek met je paar."],
  ["Jij bepaalt je prijs", "Je koopt het boek bij ons in en verkoopt het aan je paar tegen je eigen prijs. Inkoopprijzen op aanvraag."],
];

const WORKFLOW = [
  { title: "Open een boek", text: "Maak in je studio een project aan voor het paar en laad je selectie." },
  { title: "Kies de richting", text: "Samen met het paar: hoofdstukken, stijl, dichtheid, typografie en palet." },
  { title: "Werk de voorstellen uit", text: "De assistent stelt per spread een opmaak voor. Jij en het paar kiezen en passen aan." },
  { title: "Laat drukken", text: "Na akkoord van het paar gaat het boek naar de drukker in Italië, met eventuele accessoires." },
];

export default function VoorFotografenPage() {
  return (
    <>
      <PageHero
        eyebrow="Voor fotografen"
        crumbs={[{ name: "Voor fotografen", path: "/voor-fotografen" }]}
        title={
          <>
            Jouw beelden, <Soft>hun verhaal, één boek.</Soft>
          </>
        }
        intro={
          <>
            <p>
              Je levert een galerij af en misschien een album. Maar wat er die dag is gezegd, raakt verspreid. Met {BRAND.name}{" "}
              bied je je bruidsparen een boek waarin het samenkomt, en stel je het in je eigen studio met ze samen.
            </p>
          </>
        }
        visual={
          <div className="rounded-sm bg-linen p-4 sm:p-8">
            <AssistantPanel />
          </div>
        }
      >
        <div className="flex flex-wrap items-center gap-3">
          <Link href="/studio" className={button({ size: "lg" })}>
            Open de studio <Arrow />
          </Link>
          <Link href="/contact?type=fotograaf" className={button({ variant: "outline", size: "lg" })}>
            Vraag een demo aan
          </Link>
        </div>
      </PageHero>

      <section className={cn(container, "pb-24 lg:pb-32")}>
        <SplitIntro
          eyebrow="Waarom"
          title={
            <>
              Een product dat <Soft>bij je werk past.</Soft>
            </>
          }
        >
          <p>
            Een boek vraagt meer dan foto&apos;s plaatsen: hoofdstukken, tekst, ritme. Dat is werk dat de meeste fotografen er niet
            naast kunnen doen. De studio is gemaakt om dat werk klein te houden, zonder dat elk boek op het vorige lijkt.
          </p>
        </SplitIntro>
        <NumberedGrid items={WHY} className="mt-16" />
      </section>

      <StepsBlock
        id="workflow"
        eyebrow="Zo werkt het"
        title="Van selectie tot drukklaar boek."
        text="Je werkt in je eigen studio, het paar kijkt en beslist mee. Wij zorgen voor de software en voor het boek."
        steps={WORKFLOW}
        actions={
          <>
            <Link href="/studio" className={button({ variant: "light", size: "lg" })}>
              Open de studio <Arrow />
            </Link>
            <Link href="/contact?type=fotograaf" className={button({ variant: "outlineLight", size: "lg" })}>
              Vraag een demo aan
            </Link>
          </>
        }
      />

      {/* Assistant */}
      <section id="assistent" className={cn(container, "scroll-mt-24 py-24 lg:py-32")}>
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <Reveal className="lg:col-span-5">
            <Eyebrow>De ontwerpassistent</Eyebrow>
            <h2 className="mt-5 text-balance text-4xl leading-[1.05] sm:text-6xl">
              Opmaak op maat, <Soft>geen sjabloon.</Soft>
            </h2>
            <div className="mt-6 space-y-4 text-lg leading-relaxed text-muted-foreground">
              <p>
                De assistent is een AI-model dat opmaak genereert uit parameters: stijl, dichtheid, typografie, palet en
                hoofdstukken. Daardoor is elke spread voor dit ene boek gemaakt, en niet uit een vaste set gekozen.
              </p>
              <p>
                Eerlijk is eerlijk: het is een assistent. Hij doet voorstellen, soms heel goede, soms niet. Jij blijft de
                maker, en jij en je paar beslissen wat er gedrukt wordt.
              </p>
            </div>
          </Reveal>
          <Reveal delay={120} className="lg:col-span-7">
            <div className="grid grid-cols-2 gap-5">
              {(["opener", "geloften", "speech", "feest"] as const).map((k, i) => (
                <MockStage key={k} tone={i % 3 === 0 ? "linen" : "paper"} className={cn("aspect-[4/3]", i % 3 !== 0 && "border")}>
                  <SampleSpread kind={k} className="w-[84%]" />
                </MockStage>
              ))}
            </div>
            <p className="mt-3 text-[0.8125rem] text-muted-foreground">Vier voorbeeldspreads uit één boek, met voorbeeldtekst.</p>
          </Reveal>
        </div>
      </section>

      {/* White label + margin */}
      <section className="bg-linen">
        <div className={cn(container, "grid gap-x-16 gap-y-14 py-24 lg:grid-cols-2 lg:py-32")}>
          <Reveal>
            <Eyebrow>Onder je eigen naam</Eyebrow>
            <h2 className="mt-5 text-4xl leading-[1.05] sm:text-5xl">
              Jouw studio, <Soft>jouw paar.</Soft>
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
              Het portaal draagt jouw studionaam. Het paar werkt met jou, niet met ons: jij voert het gesprek, jij levert het boek.
              In het colofon staat jouw naam als fotograaf.
            </p>
          </Reveal>
          <Reveal delay={100}>
            <Eyebrow>Inkoop en marge</Eyebrow>
            <h2 className="mt-5 text-4xl leading-[1.05] sm:text-5xl">
              Jij bepaalt <Soft>wat je vraagt.</Soft>
            </h2>
            <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
              Je koopt het boek en de accessoires bij ons in en bepaalt zelf je verkoopprijs. We zetten hier geen bedragen neer:
              inkoopprijzen hangen af van formaat, omvang en materiaal en bespreken we in een demo.
            </p>
            <Link href="/contact?type=fotograaf" className={cn(button({ variant: "text" }), "mt-6")}>
              Vraag de inkoopprijzen op
            </Link>
          </Reveal>
        </div>
      </section>

      <div className="h-24 lg:h-32" />
      <CtaSection
        eyebrow="Voor fotografen"
        title="Benieuwd of het bij je studio past?"
        text="Open de studio en kijk rond, of vraag een demo aan. Dan lopen we samen door een boek, de assistent en de inkoop."
        cta={{ label: "Vraag een demo aan", href: "/contact?type=fotograaf" }}
        secondary={{ label: "Open de studio", href: "/studio" }}
      />
    </>
  );
}
