import { AanvraagForm } from "@/components/aanvraag-form";
import { PhoneIcon, WhatsAppIcon } from "@/components/icons";
import { Breadcrumbs, Container } from "@/components/ui/primitives";
import { company } from "@/data/company";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Contact en voorstel aanvragen",
  description:
    "Neem contact op met Zebrano Studio of vraag een voorstel aan voor een maatwerk deur, roomdivider of boiserie. Particulier of zakelijk — we denken graag mee.",
  path: "/contact",
});

export default async function ContactPage({ searchParams }: { searchParams: Promise<{ type?: string }> }) {
  const { type } = await searchParams;
  const initialType = type === "zakelijk" ? "zakelijk" : "particulier";
  return (
    <section className="bg-sand/60 pb-20 pt-32 sm:pb-28 sm:pt-36">
      <Container className="grid gap-14 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <Breadcrumbs items={[{ name: "Contact", path: "/contact" }]} className="mb-8" />
          <h1 className="font-display text-4xl font-light leading-[1.05] tracking-tight text-ink sm:text-5xl">Neem contact met ons op</h1>
          <div className="mt-6 space-y-4 text-lg leading-relaxed text-ink/80">
            <p>
              Bij Zebrano Studio begonnen we met een simpel idee: luxe maatwerkdeuren bereikbaar maken — zonder grenzen. Elk huis verdient
              een vleugje design, en elke ruimte mag een verhaal vertellen.
            </p>
            <p>
              Droom je groots, werk je aan een bijzonder project of ben je gewoon nieuwsgierig naar de mogelijkheden? We horen graag van je —
              zeker als je wensen of ideeën hebt die verder gaan dan gewoon.
            </p>
          </div>

          <div className="mt-10 space-y-3">
            <a
              href={`tel:${company.telefoonHref}`}
              className="flex items-center gap-4 rounded-lg border border-line/30 bg-paper px-5 py-4 transition-colors hover:border-forest"
            >
              <PhoneIcon className="size-5 text-forest" />
              <span>
                <span className="block text-sm text-ink/60">Bel ons</span>
                <span className="font-medium text-ink">{company.telefoon}</span>
              </span>
            </a>
            <a
              href={`https://wa.me/${company.whatsappHref}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-4 rounded-lg border border-line/30 bg-paper px-5 py-4 transition-colors hover:border-forest"
            >
              <WhatsAppIcon className="size-5 text-forest" />
              <span>
                <span className="block text-sm text-ink/60">WhatsApp</span>
                <span className="font-medium text-ink">{company.whatsapp}</span>
              </span>
            </a>
            <p className="px-1 pt-2 text-sm leading-relaxed text-ink/70">
              {company.naam} · {company.adres}, {company.postcodePlaats} · bezoek op afspraak
              <br />
              <a href={`mailto:${company.email}`} className="underline underline-offset-2 hover:text-accent">
                {company.email}
              </a>
            </p>
          </div>
        </div>

        <div className="lg:col-span-6 lg:col-start-7">
          <div className="rounded-lg bg-paper p-6 shadow-[0_20px_60px_-30px_rgb(47_58_42/0.35)] sm:p-10">
            <h2 className="mb-6 font-display text-2xl font-light text-ink">Vraag een voorstel aan</h2>
            <AanvraagForm initialType={initialType} />
          </div>
        </div>
      </Container>
    </section>
  );
}
