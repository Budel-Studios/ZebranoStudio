import Link from "next/link";
import { AssistantPanel } from "@/components/site/assistant-panel";
import { MockStage, SampleSpread } from "@/components/site/book-mock";
import { AccessoryCards, MaterialCovers, StepsBlock } from "@/components/site/sections";
import { button } from "@/components/ui/button";
import { container, CtaSection, NumberedGrid, SectionHeading } from "@/components/ui/primitives";
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
 * Home page. The page is the book: the closed cover (hero), the book opening
 * on the first paper section, the pages (why a book, the chapters, the
 * written stories, the steps, the design assistant, print and materials,
 * accessories, photographers) and the back cover (CTA, then the footer).
 */
export default function HomePage() {
  return (
    <>
      <Cover />
      <Opening />
      <Chapters />
      <Stories />
      <StepsBlock
        title="Van eerste foto tot laatste bladzijde."
        text="Jullie fotograaf heeft de beelden, jullie hebben de woorden. In vier stappen wordt dat één boek."
        steps={stappen}
        actions={
          <Link href="/werkwijze" className={button({ variant: "text" })}>
            De werkwijze in detail
          </Link>
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

/**
 * The closed cover: blue book cloth, the title stamped in white foil. The
 * title is the image. The menu bar floats on top; the ribbon marker hangs in
 * the right-hand gutter (components/site/ribbon.tsx).
 */
function Cover() {
  return (
    <section className="cloth-weave relative bg-cloth text-cloth-foreground">
      {/* Hinge groove of the cover, along the spine side */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-y-0 left-[clamp(0.5rem,2.2vw,2.25rem)] w-[clamp(4px,0.5vw,8px)]"
        style={{ background: "linear-gradient(to right, rgb(8 14 36 / 0.38), rgb(8 14 36 / 0.08) 60%, rgb(255 255 255 / 0.1))" }}
      />
      <div className={cn(container, "flex min-h-svh flex-col pt-28 sm:pt-32")}>
        <div className="my-auto py-8">
          <h1 className="foil-stamp animate-foil text-cover font-[450] leading-[0.9] tracking-[-0.035em] max-[400px]:text-[3.5rem]">
            Jullie dag,
            <br />
            als boek.
          </h1>
          <p className="mt-8 max-w-[34rem] text-lead text-cloth-muted sm:mt-10">
            Geen album, maar een boek met hoofdstukken. Met jullie foto&apos;s én jullie woorden: de geloften, de speeches, de
            brief van je moeder. Samengesteld met jullie fotograaf.
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-x-7 gap-y-4">
            <Link href={primaryCta.href} className={button({ size: "lg" })}>
              {primaryCta.label}
            </Link>
            <Link href="/het-boek" className="link-line text-[0.9375rem] font-medium text-cloth-foreground">
              Bekijk het boek
            </Link>
          </div>
        </div>
        {/* Imprint line, as at the foot of a cover */}
        <div className="border-t border-cloth-line py-5 text-sm text-cloth-muted">
          <p>Trouwboeken en reisboeken. Gedrukt en gebonden in Italië.</p>
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

/** The book opens: the first paper page, with the open spread and why a book. */
function Opening() {
  return (
    <section className={cn(container, "py-20 lg:py-28")}>
      <div className="mx-auto max-w-[1180px] pb-[4%]">
        <SampleSpread kind="opener" />
      </div>
      <p className="mx-auto mt-4 max-w-[1180px] text-small text-muted-foreground">
        Een voorbeeld: de opening van hoofdstuk drie, de ceremonie. Namen en tekst zijn verzonnen; het grijze vlak is de plek van een foto.
      </p>

      <div className="mt-20 grid gap-8 lg:mt-28 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-5">
          <h2>
            Een album laat zien.
            <br />
            Een boek vertelt.
          </h2>
        </div>
        <div className="lg:col-span-6 lg:col-start-7">
          <p className="text-lead text-muted-foreground">
            Van een trouwdag blijven honderden foto&apos;s over. Wat er werd gezegd, verdwijnt meestal: de geloften op een
            verfrommeld briefje, de speech van je vader in iemands telefoon. In een boek van {BRAND.name} komt het samen. Je
            bladert niet alleen door wat je zag, je leest ook terug wat je hoorde.
          </p>
        </div>
      </div>
      <NumberedGrid items={REASONS} className="mt-14" />
    </section>
  );
}

/* ------------------------------------------------------------------ */

const ROMAN = ["I", "II", "III", "IV", "V", "VI", "VII", "VIII", "IX", "X", "XI", "XII"];

function Chapters() {
  return (
    <section className="bg-linen">
      <div className={cn(container, "py-20 lg:py-28")}>
        <SectionHeading
          title={
            <>
              Een dag heeft een begin,
              <br />
              een midden en een einde.
            </>
          }
          titleClassName="max-w-none"
          action={
            <Link href="/hoofdstukken" className={button({ variant: "outline", size: "sm" })}>
              Alle hoofdstukken
            </Link>
          }
        />

        <div className="mt-12 grid gap-12 lg:grid-cols-12 lg:gap-16">
          {/* Set like the contents page of a book */}
          <div className="lg:col-span-5">
            <p className="eyebrow">Inhoud</p>
            <ol className="mt-3 border-t border-foreground">
              {hoofdstukken.map((h, i) => (
                <li key={h.id} className="flex items-baseline gap-4 border-b border-foreground/15 py-3">
                  <span className="w-9 text-sm tabular-nums text-muted-foreground">{ROMAN[i]}</span>
                  <span className="font-display text-[1.625rem] leading-none">{h.name}</span>
                </li>
              ))}
            </ol>
            <p className="mt-5 max-w-md text-small text-muted-foreground">
              Een voorbeeld. Jullie kiezen zelf welke hoofdstukken het boek krijgt en hoe ze heten: geen first look gehad, wel
              een afterparty? Dan ziet de inhoud er anders uit.
            </p>
          </div>

          <div className="lg:col-span-7">
            <MockStage tone="paper" className="aspect-[4/3]">
              <SampleSpread kind="tijdlijn" className="w-[86%]" />
            </MockStage>
            <div className="mt-5 grid grid-cols-2 gap-5">
              <MockStage tone="paper" className="aspect-[4/3]">
                <SampleSpread kind="opener" className="w-[84%]" />
              </MockStage>
              <MockStage tone="paper" className="aspect-[4/3]">
                <SampleSpread kind="feest" className="w-[84%]" />
              </MockStage>
            </div>
            <p className="mt-3 text-small text-muted-foreground">Voorbeeldspreads met voorbeeldtekst. De grijze vlakken zijn de plek van jullie foto&apos;s.</p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */

function Stories() {
  return (
    <section className={cn(container, "py-20 lg:py-28")}>
      <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-7">
          <MockStage tone="board" className="aspect-[4/3]" caption="Voorbeeld: de geloften">
            <SampleSpread kind="geloften" className="w-[88%]" />
          </MockStage>
        </div>
        <div className="lg:col-span-5">
          <h2>De woorden horen erbij.</h2>
          <p className="mt-6 text-lead text-muted-foreground">
            Wat jullie elkaar beloofden. Wat je vader zei, en waar de zaal om moest lachen. De brief die je die ochtend kreeg. In
            het boek krijgen die teksten een eigen plek, gezet met dezelfde zorg als de foto&apos;s.
          </p>
          <ul className="mt-8 grid grid-cols-2 gap-x-6 border-t text-[0.9375rem]">
            {verhaalvormen.map((v) => (
              <li key={v.id} className="border-b">
                <Link href={`/hoofdstukken#${v.id}`} className="block py-2.5 hover:underline hover:underline-offset-4">
                  {v.name}
                </Link>
              </li>
            ))}
          </ul>
          <Link href="/hoofdstukken#verhalen" className={cn(button({ variant: "text" }), "mt-8")}>
            Alle verhaalvormen
          </Link>
        </div>
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
    <section className={cn(container, "py-20 lg:py-28")}>
      <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <p className="eyebrow mb-4">De ontwerpassistent</p>
          <h2>
            Stelt voor.
            <br />
            Jullie kiezen.
          </h2>
          <p className="mt-6 text-lead text-muted-foreground">
            In de studio werkt een AI-ontwerpassistent mee. Die maakt van jullie keuzes een opmaak op maat, spread voor spread,
            in plaats van een vast sjabloon. Het is een hulpmiddel, geen ontwerper die het van jullie overneemt: het doet
            voorstellen, en die kunnen ook gewoon niet goed zijn. Dan vraag je een ander.
          </p>
          {/* A real sequence: direction, proposal, decision. */}
          <ol className="mt-10 border-t">
            {ASSISTANT_POINTS.map(([t, d], i) => (
              <li key={t} className="flex gap-5 border-b py-5">
                <span className="w-5 font-display text-2xl leading-[1.15] text-cloth" aria-hidden="true">
                  {i + 1}
                </span>
                <div>
                  <h3 className="text-2xl">{t}</h3>
                  <p className="mt-1.5 text-small text-muted-foreground">{d}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
        <div className="lg:col-span-7">
          <AssistantPanel />
          <p className="mt-3 text-small text-muted-foreground">Illustratie van het idee, geen schermafbeelding van de studio.</p>
        </div>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */

function Print() {
  return (
    <section className="bg-linen">
      <div className={cn(container, "py-20 lg:py-28")}>
        <div className="grid gap-8 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-5">
            <h2>
              Gedrukt en gebonden
              <br />
              in Italië.
            </h2>
          </div>
          <div className="lg:col-span-6 lg:col-start-7">
            <p className="text-lead text-muted-foreground">
              De boeken worden gedrukt en gebonden in Italië door {BRAND.printer} ({BRAND.printerLine}). Jullie kiezen het
              formaat en het omslag: linnen, leer, suède, fluweel, katoen of canvas, met de titel in het materiaal gedrukt.
            </p>
            <Link href="/het-boek#materialen" className={cn(button({ variant: "text" }), "mt-6")}>
              Formaten en materialen
            </Link>
          </div>
        </div>
        <MaterialCovers className="mt-14" />
        <p className="mt-6 text-small text-muted-foreground">Getekende voorbeelden. Kleuren en structuur zijn ter illustratie; de echte stalen zien jullie bij het voorstel.</p>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------ */

function Accessories() {
  return (
    <section className={cn(container, "py-20 lg:py-28")}>
      <SectionHeading
        title="Alles rond het boek."
        action={
          <Link href="/accessoires" className={button({ variant: "outline", size: "sm" })}>
            Alle accessoires
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
    <section className={cn(container, "pb-20 lg:pb-28")}>
      <div className="grid items-center gap-8 border-y border-foreground py-12 lg:grid-cols-12">
        <div className="lg:col-span-7">
          <h2 className="max-w-[24ch] text-h3 sm:text-[2.25rem] sm:leading-[1.1]">
            Fotograaf? Je krijgt een eigen studio, waarin je het boek samen met je bruidspaar samenstelt.
          </h2>
        </div>
        <div className="flex flex-wrap items-center gap-x-7 gap-y-4 lg:col-span-5 lg:justify-end">
          <Link href="/voor-fotografen" className={button({ variant: "cloth", size: "lg" })}>
            Voor fotografen
          </Link>
          <Link href="/studio" className={button({ variant: "text" })}>
            Open de studio
          </Link>
        </div>
      </div>
    </section>
  );
}
