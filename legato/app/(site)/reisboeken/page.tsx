import Link from "next/link";
import { BookCover, MockStage, SampleSpread } from "@/components/site/book-mock";
import { button } from "@/components/ui/button";
import { container, CtaSection, NumberedGrid, PageHero, SplitIntro } from "@/components/ui/primitives";
import { Reveal } from "@/components/ui/reveal";
import { pageMetadata } from "@/lib/seo";
import { cn } from "@/lib/utils";

export const metadata = pageMetadata({
  title: "Reisboeken: een bijzondere reis als boek",
  description:
    "Hetzelfde idee voor een bijzondere reis: een koffietafelboek met hoofdstukken per dag of per plek, met reisdagboek, kaart en route. Gedrukt en gebonden in Italië.",
  path: "/reisboeken",
});

const PARTS: Array<[string, string]> = [
  ["De route", "Een kaart voorin, met de plekken waar jullie waren. De rode draad van het boek."],
  ["Hoofdstukken per dag of plek", "Elke etappe een eigen opening: de pas, de kust, de stad waar jullie langer bleven."],
  ["Het reisdagboek", "Aantekeningen van onderweg, berichten naar huis, de zinnen die je anders vergeet."],
  ["De kleine dingen", "Het menu van dat ene restaurant, een treinkaartje, de naam van de gids."],
];

const KINDS = ["Huwelijksreis", "Jubileumreis", "Reis met het hele gezin", "Expeditie of safari", "Sabbatical", "Zeiltocht"];

export default function ReisboekenPage() {
  return (
    <>
      <PageHero
        eyebrow="Reisboeken"
        crumbs={[{ name: "Reisboeken", path: "/reisboeken" }]}
        title="Die ene reis, als boek."
        intro={
          <>
            <p>
              Sommige reizen maak je één keer. De huwelijksreis, de tocht voor je vijftigste, de maanden weg met het hele gezin.
              Daarvan blijven duizenden foto&apos;s over op een telefoon, en verhalen die elk jaar iets korter worden.
            </p>
            <p>Een reisboek werkt zoals het trouwboek: hoofdstukken, beeld en tekst, één exemplaar.</p>
          </>
        }
        visual={
          <MockStage tone="board" className="aspect-[5/4] lg:aspect-[6/5]" caption="Voorbeeld: reisboek">
            <div className="relative w-[86%]">
              <div className="absolute -top-[24%] right-[3%] w-[30%] rotate-[6deg]">
                <BookCover title="Over de pas" sub="Zeven dagen" />
              </div>
              <SampleSpread kind="reis" className="relative" />
            </div>
          </MockStage>
        }
      >
        <div className="flex flex-wrap items-center gap-x-7 gap-y-4">
          <Link href="/contact?onderwerp=reisboek" className={button({ size: "lg" })}>
            Vraag een voorstel
          </Link>
          <Link href="/het-boek" className={button({ variant: "text" })}>
            Formaten en materialen
          </Link>
        </div>
      </PageHero>

      <section className={cn(container, "pb-20 lg:pb-28")}>
        <SplitIntro title="Een reis heeft ook hoofdstukken.">
          <p>
            Waar een trouwboek de dag volgt, volgt een reisboek de route. Elke dag of elke plek wordt een hoofdstuk. De tekst
            komt uit jullie eigen aantekeningen: een reisdagboek, berichten naar het thuisfront, of wat jullie achteraf nog weten.
          </p>
          <p>De boeken zelf zijn dezelfde: zelfde formaten, zelfde materialen, gedrukt en gebonden in Italië.</p>
        </SplitIntro>
        <NumberedGrid items={PARTS} className="mt-14" />
      </section>

      <section className="bg-linen">
        <div className={cn(container, "py-20 lg:py-28")}>
          <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-16">
            <Reveal className="lg:col-span-7">
              <MockStage tone="paper" className="aspect-[4/3]">
                <SampleSpread kind="reisdag" className="w-[86%]" />
              </MockStage>
            </Reveal>
            <Reveal delay={100} className="lg:col-span-5">
              <h2>Reizen die je wilt navertellen.</h2>
              <p className="mt-6 text-lead text-muted-foreground">
                Een reisboek loont als er een verhaal in zit: een begin, een route, een thuiskomst. Reisde er een fotograaf mee,
                dan begint het daar. Zijn het jullie eigen foto&apos;s, vertel ons dan wat er ligt, dan kijken we wat mogelijk is.
              </p>
              <ul className="mt-8 border-t text-[0.9375rem]">
                {KINDS.map((k) => (
                  <li key={k} className="border-b py-2.5">
                    {k}
                  </li>
                ))}
              </ul>
            </Reveal>
          </div>
        </div>
      </section>

      <CtaSection
        title="Een reis die een boek verdient?"
        text="Vertel ons waar jullie waren, wie de foto's maakte en wat er aan tekst ligt. We denken mee over de hoofdstukken en sturen een voorstel."
        cta={{ label: "Vraag een voorstel", href: "/contact?onderwerp=reisboek" }}
      />
    </>
  );
}
