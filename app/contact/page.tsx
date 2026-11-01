import { ArrowUpRight, Phone } from "lucide-react";
import { AanvraagForm } from "@/components/aanvraag-form";
import { WhatsAppIcon } from "@/components/icons";
import { Breadcrumbs, container, Eyebrow } from "@/components/ui/primitives";
import { company } from "@/data/company";
import { pageMetadata } from "@/lib/seo";
import { cn } from "@/lib/utils";

export const metadata = pageMetadata({
  title: "Contact en voorstel aanvragen",
  description:
    "Neem contact op met Zebrano Studio of vraag een voorstel aan voor een maatwerk deur, roomdivider of boiserie. Particulier of zakelijk — we denken graag mee.",
  path: "/contact",
});

const row = "group flex items-center justify-between gap-6 border-b py-5";

export default async function ContactPage({ searchParams }: { searchParams: Promise<{ type?: string }> }) {
  const { type } = await searchParams;
  const initialType = type === "zakelijk" ? "zakelijk" : "particulier";
  return (
    <section className={cn(container, "pb-24 pt-32 lg:pb-32 lg:pt-40")}>
      <Breadcrumbs items={[{ name: "Contact", path: "/contact" }]} />
      <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <div className="animate-rise">
            <Eyebrow>Contact</Eyebrow>
            <h1 className="mt-6 text-5xl leading-[1.02] sm:text-6xl lg:text-7xl">Neem contact met ons op</h1>
            <div className="mt-8 max-w-md space-y-4 text-lg leading-relaxed text-muted-foreground">
              <p>
                Bij Zebrano Studio begonnen we met een simpel idee: luxe maatwerkdeuren bereikbaar maken, zonder grenzen. Elk huis
                verdient een vleugje design, en elke ruimte mag een verhaal vertellen.
              </p>
              <p>
                Droom je groots, werk je aan een bijzonder project of ben je gewoon nieuwsgierig naar de mogelijkheden? We horen graag
                van je, zeker als je wensen of ideeën hebt die verder gaan dan gewoon.
              </p>
            </div>
          </div>

          <div className="mt-12 animate-rise border-t [animation-delay:150ms]">
            <a href={`tel:${company.telefoonHref}`} className={row}>
              <span className="flex items-center gap-4">
                <Phone strokeWidth={1.25} aria-hidden className="size-5 text-copper" />
                <span>
                  <span className="block text-[0.6875rem] uppercase tracking-[0.2em] text-muted-foreground">Bel ons</span>
                  <span className="mt-1 block font-display text-2xl font-light">
                    <span className="link-line">{company.telefoon}</span>
                  </span>
                </span>
              </span>
              <ArrowUpRight strokeWidth={1.25} aria-hidden className="size-4 text-muted-foreground transition-transform duration-500 ease-door group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </a>
            <a href={`https://wa.me/${company.whatsappHref}`} target="_blank" rel="noopener noreferrer" className={row}>
              <span className="flex items-center gap-4">
                <WhatsAppIcon aria-hidden className="size-5 text-copper" />
                <span>
                  <span className="block text-[0.6875rem] uppercase tracking-[0.2em] text-muted-foreground">WhatsApp</span>
                  <span className="mt-1 block font-display text-2xl font-light">
                    <span className="link-line">{company.whatsapp}</span>
                  </span>
                </span>
              </span>
              <ArrowUpRight strokeWidth={1.25} aria-hidden className="size-4 text-muted-foreground transition-transform duration-500 ease-door group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </a>
            <p className="pt-5 text-sm leading-relaxed text-muted-foreground">
              {company.naam} · {company.adres}, {company.postcodePlaats} · bezoek op afspraak
              <br />
              <a href={`mailto:${company.email}`} className="link-line text-foreground">
                {company.email}
              </a>
            </p>
          </div>
        </div>

        <div className="lg:col-span-7">
          <div className="animate-rise rounded-sm border bg-card p-6 [animation-delay:100ms] sm:p-10 lg:p-12">
            <Eyebrow>Vraag een voorstel</Eyebrow>
            <h2 className="mb-10 mt-5 text-3xl sm:text-4xl">Vertel ons over je ruimte.</h2>
            <AanvraagForm initialType={initialType} />
          </div>
        </div>
      </div>
    </section>
  );
}
