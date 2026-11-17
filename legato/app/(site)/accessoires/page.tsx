import Link from "next/link";
import { AccessoryArt } from "@/components/site/accessory-art";
import { button } from "@/components/ui/button";
import { container, CtaSection, PageHeader } from "@/components/ui/primitives";
import { Reveal } from "@/components/ui/reveal";
import { accessoires, priceLabel } from "@/data/accessoires";
import { pageMetadata } from "@/lib/seo";
import { cn } from "@/lib/utils";

export const metadata = pageMetadata({
  title: "Accessoires bij het boek",
  description:
    "Boekenleggers, boekstandaards, een presentatiebox, ouderboeken en een slipcase: alles om jullie boek te bewaren, te laten zien en door te geven. Prijzen op aanvraag.",
  path: "/accessoires",
});

export default function AccessoiresPage() {
  return (
    <>
      <PageHeader
        eyebrow="Accessoires"
        crumbs={[{ name: "Accessoires", path: "/accessoires" }]}
        title="Alles rond het boek."
        intro={
          <p>
            Een boek dat je laat liggen, verdient een plek. En wie erbij was, wil er vaak zelf een. Deze accessoires stemmen we af
            op het formaat en het omslag van jullie boek.
          </p>
        }
      >
        <ul className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-sm">
          {accessoires.map((a) => (
            <li key={a.id}>
              <a href={`#${a.id}`} className="link-line">
                {a.name}
              </a>
            </li>
          ))}
        </ul>
      </PageHeader>

      <section className={cn(container, "py-20 lg:py-28")}>
        <div className="space-y-20 lg:space-y-28">
          {accessoires.map((a, i) => (
            <article key={a.id} id={a.id} className="grid scroll-mt-28 items-center gap-10 lg:grid-cols-12 lg:gap-16">
              <Reveal className={cn("lg:col-span-6", i % 2 === 1 && "lg:order-2 lg:col-start-7")}>
                <div className={"flex aspect-[4/3] items-center justify-center bg-board"}>
                  <AccessoryArt id={a.id} className="w-[62%]" />
                </div>
              </Reveal>
              <Reveal delay={100} className={cn("lg:col-span-5", i % 2 === 1 ? "lg:order-1 lg:col-start-1" : "lg:col-start-8")}>
                <h2>{a.name}</h2>
                <p className="mt-4 text-lead font-medium">{a.tagline}</p>
                <p className="mt-3 text-muted-foreground">{a.description}</p>
                <ul className="mt-6 border-t text-[0.9375rem]">
                  {a.points.map((p) => (
                    <li key={p} className="border-b py-2.5">
                      {p}
                    </li>
                  ))}
                </ul>
                <div className="mt-7 flex flex-wrap items-center justify-between gap-4">
                  <p className="text-sm font-medium">{priceLabel(a)}</p>
                  <Link href={`/contact?accessoire=${a.id}`} className={button({ variant: "outline", size: "sm" })}>
                    Vraag ernaar
                  </Link>
                </div>
              </Reveal>
            </article>
          ))}
        </div>
        <p className="mt-16 border-t pt-6 text-small text-muted-foreground">
          De tekeningen zijn illustraties, geen productfoto&apos;s. Uitvoering, materiaal en prijs stemmen we af in het voorstel.
        </p>
      </section>

      <CtaSection
        title="Het boek compleet maken?"
        text="Accessoires bestel je samen met het boek, of later los. Vertel ons wat jullie zoeken, dan nemen we het mee in het voorstel."
      />
    </>
  );
}
