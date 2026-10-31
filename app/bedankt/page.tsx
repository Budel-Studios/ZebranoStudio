import type { Metadata } from "next";
import { PillLink } from "@/components/ui/pill-link";
import { Container } from "@/components/ui/primitives";
import { company } from "@/data/company";

export const metadata: Metadata = {
  title: "Bedankt voor je aanvraag",
  robots: { index: false, follow: true },
};

export default function BedanktPage() {
  return (
    <section className="bg-sand/60 pb-24 pt-36">
      <Container className="max-w-3xl">
        <p className="font-sans text-xs font-semibold uppercase tracking-[0.16em] text-bark/70">Aanvraag ontvangen</p>
        <h1 className="mt-3 font-display text-4xl font-light leading-tight text-ink sm:text-5xl">Bedankt, je aanvraag is binnen.</h1>
        <p className="mt-6 text-lg leading-relaxed text-ink/80">
          We bekijken je wensen en nemen contact met je op om de volgende stap te bespreken. Je ontvangt ook een bevestiging per e-mail.
          Vragen in de tussentijd? Bel {company.telefoon}.
        </p>
        <div className="mt-10 flex flex-wrap gap-3">
          <PillLink href="/">Terug naar home</PillLink>
          <PillLink href="/collecties" tone="outline">
            Bekijk de collecties
          </PillLink>
        </div>
      </Container>
    </section>
  );
}
