import Link from "next/link";
import { AssistantPanel } from "@/components/site/assistant-panel";
import { BookCover, MockStage, SampleSpread } from "@/components/site/book-mock";
import { AccessoryCards, MaterialCovers, StepsBlock } from "@/components/site/sections";
import { Arrow } from "@/components/ui/arrow";
import { button } from "@/components/ui/button";
import { container, CtaSection, Eyebrow, NumberedGrid, SectionHeading, Soft } from "@/components/ui/primitives";
import { Reveal } from "@/components/ui/reveal";
import { hoofdstukken, verhaalvormen } from "@/data/hoofdstukken";
import { stappen } from "@/data/werkwijze";
import { BRAND } from "@/lib/brand";
import { primaryCta } from "@/lib/navigation";
import { pageMetadata } from "@/lib/seo";
import { cn } from "@/lib/utils";

export const metadata = pageMetadata({
  absoluteTitle: `${BRAND.name} — ${BRAND.tagline}`,
  description:
    "Geen album, maar een boek: jullie trouwdag in hoofdstukken, met de foto's én de geloften, speeches en brieven. Samengesteld met jullie fotograaf, gedrukt en gebonden in Italië.",
  path: "/",
});

/**
 * Home page, section by section in the build-up of the Zebrano Studio home:
 * hero, why a book, the chapters, the written stories, the four steps, the
 * design assistant, print and materials, accessories, photographers, CTA.
 */
export default function HomePage() {
  return (
    <>
      <Hero />
      <Difference />
      <Chapters />
      <Stories />
      <StepsBlock
        eyebrow="Werkwijze"
        title="Van eerste foto tot laatste bladzijde."
        text="Jullie fotograaf heeft de beelden, jullie hebben de woorden. In vier stappen wordt dat één boek."
        steps={stappen}
        actions={
          <>
            <Link href={primaryCta.href} className={button({ variant: "light", size: "lg" })}>
              {primaryCta.label} <Arrow />
            </Link>
            <Link href="/werkwijze" className={button({ variant: "outlineLight", size: "lg" })}>
              De werkwijze in detail
            </Link>
          </>
        }
      />
      <Assistant />
      <Print />
      <Accessories />
      <Photographers />
      <CtaSection />
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
            <Eyebrow>Trouwboeken · Reisboeken</Eyebrow>
            <h1 className="mt-8 text-[clamp(3.75rem,7.6vw,8rem)] leading-[0.88] tracking-[-0.02em]">
              Jullie dag,
              <br />
              <Soft>als boek.</Soft>
            </h1>
          </div>

          <div className="mt-10 animate-rise [animation-delay:200ms]">
            <p className="max-w-md text-lg leading-relaxed text-muted-foreground">
              Geen album, maar een boek met hoofdstukken. Met jullie foto&apos;s én jullie woorden: de geloften, de speeches, de
              brief van je moeder. Samengesteld met jullie fotograaf, gedrukt en gebonden in Italië.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link href={primaryCta.href} className={button({ size: "lg" })}>
                {primaryCta.label} <Arrow />
              </Link>
              <Link href="/het-boek" className={button({ variant: "outline", size: "lg" })}>
                Bekijk het boek
              </Link>
            </div>

            <dl className="mt-12 grid grid-cols-3 border-t text-sm">
              {[
                ["Formaat", "20×30 · 25×35 · 30×30"],
                ["Omslag", "Linnen, leer, fluweel"],
                ["Oplage", "Exemplaar 1 van 1"],
              ].map(([k, v]) => (
                <div key={k} className="border-r py-4 pr-4 last:border-r-0 [&:not(:first-child)]:pl-4">
                  <dt className="text-[0.6875rem] uppercase tracking-[0.2em] text-muted-foreground">{k}</dt>
                  <dd className="mt-1.5">{v}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>

        <div className="lg:col-span-7">
          <MockStage tone="linen" className="aspect-[5/4] animate-unveil sm:aspect-[4/3] lg:aspect-auto lg:h-[calc(100svh-9rem)] lg:min-h-[560px]">
            <div className="relative mt-[6%] w-[90%] max-w-[900px] sm:w-[84%] lg:mt-0">
              <div className="absolute -top-[31%] right-[2%] w-[31%] rotate-[6deg]">
                <BookCover />
              </div>
              <SampleSpread kind="opener" className="relative" />
            </div>
            <div className="absolute inset-x-3 bottom-3 flex items-end justify-between gap-4 sm:inset-x-4 sm:bottom-4">
              <Link href="/hoofdstukken" className="group hidden items-center gap-3 rounded-sm bg-background/90 px-4 py-3 text-sm backdrop-blur sm:flex">
                <span className="size-1.5 rounded-full bg-gold" />
                Hoofdstuk drie: de ceremonie
                <Arrow diagonal={false} className="text-muted-foreground" />
              </Link>
              <span className="hidden rounded-sm bg-background/90 px-3 py-2 text-[0.6875rem] uppercase tracking-[0.2em] backdrop-blur sm:block">
                Voorbeeld · Noor &amp; Daan
              </span>
            </div>
          </MockStage>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */

const REASONS: Array<[string, string]> = [
  ["Hoofdstukken", "De dag in de volgorde waarin hij gebeurde, van aankomst tot vertrek. Met een inhoudsopgave, zoals het hoort."],
  ["Woorden naast beeld", "Geloften, speeches, brieven en quotes van gasten staan in het boek, niet in een la."],
  ["Voor jullie ontworpen", "Geen sjabloon dat wordt gevuld. Elke spread wordt voor jullie verhaal opgemaakt."],
  ["Gemaakt om te liggen", "Koffietafelformaat, gebonden in linnen, leer of fluweel. Een boek dat je laat liggen en oppakt."],
];

function Difference() {
  return (
    <section className={cn(container, "py-24 lg:py-32")}>
      <div className="grid gap-10 border-t pt-14 lg:grid-cols-12">
        <Reveal className="lg:col-span-5">
          <Eyebrow>Waarom een boek</Eyebrow>
          <h2 className="mt-5 text-4xl leading-[1.05] sm:text-6xl">
            Een album laat zien.
            <br />
            <Soft>Een boek vertelt.</Soft>
          </h2>
        </Reveal>
        <Reveal delay={100} className="lg:col-span-6 lg:col-start-7">
          <p className="text-lg leading-relaxed text-muted-foreground">
            Van een trouwdag blijven honderden foto&apos;s over. Wat er werd gezegd, verdwijnt meestal: de geloften op een
            verfrommeld briefje, de speech van je vader in iemands telefoon. In een boek van {BRAND.name} komt het samen. Je
            bladert niet alleen door wat je zag, je leest ook terug wat je hoorde.
          </p>
        </Reveal>
      </div>
      <NumberedGrid items={REASONS} className="mt-16" />
    </section>
  );
}

/* ------------------------------------------------------------------ */

const ROMAN = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X", "XI", "XII"];

function Chapters() {
  return (
    <section className="bg-linen">
      <div className={cn(container, "py-24 lg:py-32")}>
        <SectionHeading
          eyebrow="De hoofdstukken"
          title={
            <>
              Een dag heeft een begin,
              <br />
              <Soft>een midden en een einde.</Soft>
            </>
          }
          titleClassName="sm:text-6xl"
          action={
            <Link href="/hoofdstukken" className={button({ variant: "outline", size: "sm" })}>
              Alle hoofdstukken <Arrow />
            </Link>
          }
        />

        <div className="mt-14 grid gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Set like the contents page of a book */}
          <Reveal className="lg:col-span-5">
            <p className="font-display text-2xl italic text-muted-foreground">Inhoud</p>
            <ol className="mt-4 border-t border-foreground/15">
              {hoofdstukken.map((h, i) => (
                <li key={h.id} className="flex items-baseline gap-4 border-b border-foreground/15 py-3">
                  <span className="w-9 text-[0.6875rem] tabular-nums tracking-[0.16em] text-gold">{ROMAN[i]}</span>
                  <span className="font-display text-[1.75rem] leading-none">{h.name}</span>
                  <span aria-hidden className="mb-1 flex-1 self-end border-b border-dotted border-foreground/30" />
                </li>
              ))}
            </ol>
            <p className="mt-5 max-w-md text-sm leading-relaxed text-muted-foreground">
              Een voorbeeld. Jullie kiezen zelf welke hoofdstukken het boek krijgt en hoe ze heten: geen first look gehad, wel
              een afterparty? Dan ziet de inhoud er anders uit.
            </p>
          </Reveal>

          <Reveal delay={120} className="lg:col-span-7">
            <MockStage tone="paper" className="aspect-[4/3] border">
              <SampleSpread kind="tijdlijn" className="w-[86%]" />
            </MockStage>
            <div className="mt-5 grid grid-cols-2 gap-5">
              <MockStage tone="paper" className="aspect-[4/3] border">
                <SampleSpread kind="opener" className="w-[84%]" />
              </MockStage>
              <MockStage tone="paper" className="aspect-[4/3] border">
                <SampleSpread kind="feest" className="w-[84%]" />
              </MockStage>
            </div>
            <p className="mt-3 text-[0.8125rem] text-muted-foreground">Voorbeeldspreads met voorbeeldtekst. De getinte vlakken zijn de plek van jullie foto&apos;s.</p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */

function Stories() {
  return (
    <section className={cn(container, "py-24 lg:py-32")}>
      <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
        <Reveal className="lg:col-span-7">
          <MockStage tone="blush" className="aspect-[4/3]" caption="Voorbeeld · geloften">
            <SampleSpread kind="geloften" className="w-[88%]" />
          </MockStage>
        </Reveal>
        <Reveal delay={100} className="lg:col-span-5">
          <Eyebrow>De verhalen</Eyebrow>
          <h2 className="mt-5 text-4xl leading-[1.05] sm:text-6xl">
            De woorden <Soft>horen erbij.</Soft>
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
            Wat jullie elkaar beloofden. Wat je vader zei, en waar de zaal om moest lachen. De brief die je die ochtend kreeg. In
            het boek krijgen die teksten een eigen plek, gezet met dezelfde zorg als de foto&apos;s.
          </p>
          <ul className="mt-8 flex flex-wrap gap-2">
            {verhaalvormen.map((v) => (
              <li key={v.id}>
                <Link
                  href={`/hoofdstukken#${v.id}`}
                  className="block rounded-sm border px-3 py-1.5 text-[0.8125rem] transition-colors duration-300 hover:border-foreground"
                >
                  {v.name}
                </Link>
              </li>
            ))}
          </ul>
          <Link href="/hoofdstukken#verhalen" className={cn(button({ variant: "text" }), "mt-8")}>
            Alle verhaalvormen
          </Link>
        </Reveal>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */

const ASSISTANT_POINTS: Array<[string, string]> = [
  ["Jullie geven de richting", "Stijl, dichtheid, typografie, palet en hoofdstukken. Daarmee gaat de assistent aan het werk."],
  ["De assistent stelt voor", "Per spread een opmaak: welk beeld groot, waar de tekst staat, waar het rustig wordt."],
  ["Jullie beslissen", "Kiezen, wisselen, aanpassen. Er gaat niets naar de drukker zonder jullie akkoord."],
];

function Assistant() {
  return (
    <section className={cn(container, "py-24 lg:py-32")}>
      <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
        <Reveal className="lg:col-span-5">
          <Eyebrow>De ontwerpassistent</Eyebrow>
          <h2 className="mt-5 text-4xl leading-[1.05] sm:text-6xl">
            Stelt voor.
            <br />
            <Soft>Jullie kiezen.</Soft>
          </h2>
          <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
            In de studio werkt een AI-ontwerpassistent mee. Die maakt van jullie keuzes een opmaak op maat, spread voor spread,
            in plaats van een vast sjabloon. Het is een hulpmiddel, geen ontwerper die het van jullie overneemt: het doet
            voorstellen, en die kunnen ook gewoon niet goed zijn. Dan vraag je een ander.
          </p>
          <ol className="mt-10 border-t">
            {ASSISTANT_POINTS.map(([t, d], i) => (
              <li key={t} className="flex gap-5 border-b py-5">
                <span className="w-6 pt-1.5 text-[0.6875rem] tabular-nums tracking-[0.2em] text-gold">{String(i + 1).padStart(2, "0")}</span>
                <div>
                  <h3 className="text-2xl">{t}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{d}</p>
                </div>
              </li>
            ))}
          </ol>
        </Reveal>
        <Reveal delay={120} className="lg:col-span-7">
          <AssistantPanel />
          <p className="mt-3 text-[0.8125rem] text-muted-foreground">Illustratie van het idee, geen schermafbeelding van de studio.</p>
        </Reveal>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */

function Print() {
  return (
    <section className="bg-linen">
      <div className={cn(container, "py-24 lg:py-32")}>
        <div className="grid gap-10 lg:grid-cols-12">
          <Reveal className="lg:col-span-5">
            <Eyebrow>Druk en materiaal</Eyebrow>
            <h2 className="mt-5 text-4xl leading-[1.05] sm:text-6xl">
              Gedrukt en gebonden
              <br />
              <Soft>in Italië.</Soft>
            </h2>
          </Reveal>
          <Reveal delay={100} className="lg:col-span-6 lg:col-start-7">
            <p className="text-lg leading-relaxed text-muted-foreground">
              De boeken worden gedrukt en gebonden in Italië door {BRAND.printer} ({BRAND.printerLine}). Jullie kiezen het
              formaat en het omslag: linnen, leer, suède, fluweel, katoen of canvas, met de titel in het materiaal gedrukt.
            </p>
            <Link href="/het-boek#materialen" className={cn(button({ variant: "text" }), "mt-6")}>
              Formaten en materialen
            </Link>
          </Reveal>
        </div>
        <MaterialCovers className="mt-16" />
        <p className="mt-6 text-[0.8125rem] text-muted-foreground">Getekende voorbeelden. Kleuren en structuur zijn ter illustratie; de echte stalen zien jullie bij het voorstel.</p>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */

function Accessories() {
  return (
    <section className={cn(container, "py-24 lg:py-32")}>
      <SectionHeading
        eyebrow="Accessoires"
        title={
          <>
            Alles rond <Soft>het boek.</Soft>
          </>
        }
        titleClassName="sm:text-6xl"
        action={
          <Link href="/accessoires" className={button({ variant: "outline", size: "sm" })}>
            Alle accessoires <Arrow />
          </Link>
        }
      />
      <AccessoryCards className="mt-12" />
    </section>
  );
}

/* ------------------------------------------------------------------ */

function Photographers() {
  return (
    <section className={cn(container, "pb-24 lg:pb-32")}>
      <Reveal className="grid items-center gap-8 border-y py-12 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <Eyebrow>Voor fotografen</Eyebrow>
          <p className="mt-4 max-w-2xl font-display text-3xl leading-[1.15] sm:text-4xl">
            Fotograaf? Je krijgt een eigen studio, waarin je het boek samen met je bruidspaar samenstelt.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-4 lg:col-span-5 lg:justify-end">
          <Link href="/voor-fotografen" className={button({ size: "lg" })}>
            Voor fotografen <Arrow />
          </Link>
          <Link href="/studio" className={button({ variant: "outline", size: "lg" })}>
            Open de studio
          </Link>
        </div>
      </Reveal>
    </section>
  );
}
