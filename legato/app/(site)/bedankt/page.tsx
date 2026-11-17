import Link from "next/link";
import { Arrow } from "@/components/ui/arrow";
import { button } from "@/components/ui/button";
import { container, Eyebrow, Soft } from "@/components/ui/primitives";
import { pageMetadata } from "@/lib/seo";
import { cn } from "@/lib/utils";

export const metadata = pageMetadata({
  title: "Bedankt voor je bericht",
  description: "Je bericht is verstuurd. We nemen contact met je op.",
  path: "/bedankt",
  noindex: true,
});

/** Shown only after the mail service accepted the request (see contact/actions.ts). */
export default function BedanktPage() {
  return (
    <section className={cn(container, "flex min-h-[80svh] flex-col justify-center pb-24 pt-40")}>
      <div className="animate-rise">
        <Eyebrow>Verstuurd</Eyebrow>
        <h1 className="mt-6 max-w-[14ch] text-5xl leading-[1] sm:text-7xl">
          Bedankt, <Soft>je bericht is binnen.</Soft>
        </h1>
        <p className="mt-8 max-w-md text-lg leading-relaxed text-muted-foreground">
          We lezen het rustig door en nemen contact met je op. Je krijgt een bevestiging per e-mail; kijk ook even in je
          spamfolder als je die mist.
        </p>
        <div className="mt-10 flex flex-wrap gap-3">
          <Link href="/het-boek" className={button({ size: "lg" })}>
            Bekijk het boek <Arrow />
          </Link>
          <Link href="/hoofdstukken" className={button({ variant: "outline", size: "lg" })}>
            Hoofdstukken en verhalen
          </Link>
        </div>
      </div>
    </section>
  );
}
