import Link from "next/link";
import { AssistantPanel } from "@/components/site/assistant-panel";
import { MockStage, SampleSpread } from "@/components/site/book-mock";
import { AccessoryArt } from "@/components/site/accessory-art";
import { BookCover } from "@/components/site/book-mock";
import { button } from "@/components/ui/button";
import { container, CtaSection, PageHeader } from "@/components/ui/primitives";
import { Reveal } from "@/components/ui/reveal";
import { stappen } from "@/data/werkwijze";
import { pageMetadata } from "@/lib/seo";
import { cn } from "@/lib/utils";

export const metadata = pageMetadata({
  title: "Werkwijze: in vier stappen naar jullie boek",
  description:
    "Zo komt een boek tot stand: kennismaking, verhalen verzamelen, samen ontwerpen met de fotograaf en de ontwerpassistent, en druk en bindwerk in Italië.",
  path: "/werkwijze",
});

function Visual({ i }: { i: number }) {
  if (i === 0)
    return (
      <MockStage tone="board" className="aspect-[4/3]">
        <SampleSpread kind="titel" className="w-[84%]" />
      </MockStage>
    );
  if (i === 1)
    return (
      <MockStage tone="board" className="aspect-[4/3]">
        <SampleSpread kind="brief" className="w-[84%]" />
      </MockStage>
    );
  if (i === 2) return <AssistantPanel />;
  return (
    <MockStage tone="linen" className="aspect-[4/3]">
      <div className="flex w-[80%] items-end justify-center gap-[6%]">
        <BookCover className="w-[38%]" />
        <AccessoryArt id="presentatiebox" className="w-[52%]" />
      </div>
    </MockStage>
  );
}

export default function WerkwijzePage() {
  return (
    <>
      <PageHeader
        eyebrow="Werkwijze"
        crumbs={[{ name: "Werkwijze", path: "/werkwijze" }]}
        title="Van eerste foto tot laatste bladzijde."
        intro={
          <p>
            Een boek maak je met drie partijen: jullie, jullie fotograaf en wij. De fotograaf heeft de beelden en de studio,
            jullie hebben de woorden, wij zorgen voor het gereedschap en het boek zelf.
          </p>
        }
      />

      <section className={cn(container, "py-20 lg:py-28")}>
        <ol className="space-y-20 lg:space-y-28">
          {stappen.map((s, i) => (
            <li key={s.title} className="grid items-center gap-10 lg:grid-cols-12 lg:gap-16">
              <Reveal className={cn("lg:col-span-5", i % 2 === 1 && "lg:order-2 lg:col-start-8")}>
                <p className="eyebrow border-t border-foreground pt-4">Stap {i + 1} van {stappen.length}</p>
                <h2 className="mt-6">{s.title}</h2>
                <p className="mt-5 text-lead font-medium">{s.text}</p>
                <p className="mt-3 text-muted-foreground">{s.detail}</p>
              </Reveal>
              <Reveal delay={100} className={cn("lg:col-span-7", i % 2 === 1 ? "lg:order-1 lg:col-start-1" : "lg:col-start-6")}>
                <Visual i={i} />
              </Reveal>
            </li>
          ))}
        </ol>

        <Reveal className="mt-20 grid gap-8 border-y border-foreground py-10 lg:mt-28 lg:grid-cols-12 lg:items-center">
          <p className="max-w-[40rem] font-display text-h3 lg:col-span-8">
            Over planning en prijs doen we op deze pagina geen beloftes. Beide hangen af van jullie boek, en staan in het
            voorstel dat jullie krijgen.
          </p>
          <div className="lg:col-span-4 lg:text-right">
            <Link href="/veelgestelde-vragen" className={button({ variant: "text" })}>
              Veelgestelde vragen
            </Link>
          </div>
        </Reveal>
      </section>

      <CtaSection />
    </>
  );
}
