import Link from "next/link";
import { button } from "@/components/ui/button";
import { container } from "@/components/ui/primitives";
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
      <div>
        <h1 className="max-w-[14ch]">Bedankt, je bericht is binnen.</h1>
        <p className="mt-8 max-w-md text-lead text-muted-foreground">
          We lezen het rustig door en nemen contact met je op. Je krijgt een bevestiging per e-mail; kijk ook even in je
          spamfolder als je die mist.
        </p>
        <div className="mt-10 flex flex-wrap items-center gap-x-7 gap-y-4">
          <Link href="/het-boek" className={button({ size: "lg" })}>
            Bekijk het boek
          </Link>
          <Link href="/hoofdstukken" className={button({ variant: "text" })}>
            Hoofdstukken en verhalen
          </Link>
        </div>
      </div>
    </section>
  );
}
