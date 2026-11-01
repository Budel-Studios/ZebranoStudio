import type { Metadata } from "next";
import Link from "next/link";
import { Arrow } from "@/components/ui/arrow";
import { button } from "@/components/ui/button";
import { DotTitle, Eyebrow } from "@/components/ui/primitives";
import { company } from "@/data/company";

export const metadata: Metadata = {
  title: "Bedankt voor je aanvraag",
  robots: { index: false, follow: true },
};

export default function BedanktPage() {
  return (
    <section className="flex min-h-[80vh] items-center justify-center px-4 pb-24 pt-36">
      <div className="max-w-xl animate-rise text-center">
        <Eyebrow className="justify-center">Aanvraag ontvangen</Eyebrow>
        <h1 className="mt-6 text-5xl leading-[1.02] sm:text-6xl">
          <DotTitle>Bedankt, je aanvraag is binnen.</DotTitle>
        </h1>
        <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
          We bekijken je wensen en nemen contact met je op om de volgende stap te bespreken. Je ontvangt ook een bevestiging per
          e-mail. Vragen in de tussentijd? Bel{" "}
          <a href={`tel:${company.telefoonHref}`} className="link-line text-foreground">
            {company.telefoon}
          </a>
          .
        </p>
        <div className="mt-10 flex flex-wrap justify-center gap-3">
          <Link href="/" className={button()}>
            Terug naar home <Arrow />
          </Link>
          <Link href="/collecties" className={button({ variant: "outline" })}>
            Bekijk de collecties
          </Link>
        </div>
      </div>
    </section>
  );
}
