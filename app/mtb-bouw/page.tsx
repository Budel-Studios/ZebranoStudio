import { ArrowUpRight } from "lucide-react";
import { button } from "@/components/ui/button";
import { container, CtaSection, Eyebrow, PageHero } from "@/components/ui/primitives";
import { Reveal } from "@/components/ui/reveal";
import { company } from "@/data/company";
import { merkfamilie, mtbAllServices, mtbVoordelen, MTB_URL } from "@/data/mtb-bouw";
import { IMAGES } from "@/lib/images";
import { pageMetadata } from "@/lib/seo";
import { cn } from "@/lib/utils";

export const metadata = pageMetadata({
  title: "Een merk van MTB Bouw",
  description:
    "Zebrano Studio is een merk van MTB Bouw uit Enschede. Samen met MTB Bouw, Afbouwstudio en De Kozijnstudio één familie: van verbouw tot exclusieve binnendeur.",
  path: "/mtb-bouw",
});

export default function MtbBouwPage() {
  return (
    <>
      <PageHero
        eyebrow="Over Zebrano Studio"
        title="Een merk van MTB Bouw"
        intro={
          <p>
            Zebrano Studio is een handelsnaam van {company.entiteit} uit {company.plaats}. Daardoor staat achter elke Zebrano-deur
            een bouwbedrijf dat ook het werk eromheen kan oppakken, van sparing tot afwerking.
          </p>
        }
        image={IMAGES.colAtelier}
        crumbs={[{ name: "MTB Bouw-familie", path: "/mtb-bouw" }]}
      >
        <a href={MTB_URL} className={button({ variant: "outline" })}>
          Naar mtbbouw.com <ArrowUpRight strokeWidth={1.25} className="size-4" aria-hidden />
        </a>
      </PageHero>

      <section className={cn(container, "pb-24 lg:pb-32")}>
        <Reveal className="border-t pt-14">
          <Eyebrow>De familie</Eyebrow>
          <h2 className="mt-5 text-4xl sm:text-5xl">Vier merken, één aanspreekpunt.</h2>
        </Reveal>
        <ul className="mt-12 grid gap-px overflow-hidden rounded-sm border bg-border sm:grid-cols-2 lg:grid-cols-4">
          {merkfamilie.map((m, i) => {
            const extern = m.href.startsWith("http");
            const self = m.href === "/";
            return (
              <Reveal
                as="li"
                key={m.naam}
                delay={i * 70}
                className={cn("flex flex-col justify-between gap-10 p-7 lg:p-8", self ? "bg-forest text-forest-foreground" : "bg-background")}
              >
                <div>
                  <p className={cn("text-[0.6875rem] tabular-nums tracking-[0.2em]", self ? "text-forest-muted" : "text-copper")}>
                    {String(i + 1).padStart(2, "0")}
                  </p>
                  <h3 className="mt-6 text-2xl">{m.naam}</h3>
                  <p className={cn("mt-3 text-sm leading-relaxed", self ? "text-forest-muted" : "text-muted-foreground")}>{m.rol}</p>
                </div>
                {extern && (
                  <a href={m.href} className="group inline-flex items-center gap-1.5 self-start text-sm">
                    <span className="link-line">{m.href.replace(/^https?:\/\/(www\.)?/, "")}</span>
                    <ArrowUpRight strokeWidth={1.25} aria-hidden className="size-3.5 text-copper" />
                  </a>
                )}
                {self && <p className="text-sm text-forest-muted">Je bent hier</p>}
              </Reveal>
            );
          })}
        </ul>
      </section>

      <section className="bg-sand">
        <div className={cn(container, "grid gap-14 py-24 lg:grid-cols-12 lg:py-32")}>
          <Reveal className="lg:col-span-5">
            <Eyebrow>Wat het voor jou betekent</Eyebrow>
            <ul className="mt-8 border-t border-foreground/15">
              {mtbVoordelen.map((v) => (
                <li key={v} className="flex gap-4 border-b border-foreground/15 py-5 text-lg leading-relaxed">
                  <span aria-hidden className="mt-3.5 h-px w-5 shrink-0 bg-copper" />
                  {v}
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={100} className="lg:col-span-6 lg:col-start-7">
            <Eyebrow>Diensten van MTB Bouw</Eyebrow>
            <ul className="mt-8 flex flex-wrap gap-2">
              {mtbAllServices.map((s) => (
                <li key={s} className="rounded-sm border border-foreground/15 bg-background px-3 py-1.5 text-[0.8125rem]">
                  {s}
                </li>
              ))}
            </ul>
            <a href={MTB_URL} className={cn(button({ variant: "text" }), "mt-10")}>
              Alles over MTB Bouw op mtbbouw.com
            </a>
          </Reveal>
        </div>
      </section>

      <div className="h-3 sm:h-4" />
      <CtaSection
        eyebrow="Samen plannen"
        title="Verbouw je en wil je deuren die het verschil maken?"
        text="Dan stemmen we het met MTB Bouw af in één planning: je deuren en het bouwkundige werk eromheen, met één aanspreekpunt."
      />
    </>
  );
}
