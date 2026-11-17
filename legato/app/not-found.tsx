import Link from "next/link";
import { SiteFooter } from "@/components/site/site-footer";
import { SiteHeader } from "@/components/site/site-header";
import { button } from "@/components/ui/button";
import { container, Eyebrow } from "@/components/ui/primitives";
import { cn } from "@/lib/utils";

export const metadata = { title: "Pagina niet gevonden", robots: { index: false, follow: true } };

/** Global 404, with the site chrome (it renders outside the (site) group). */
export default function NotFound() {
  return (
    <>
      <SiteHeader />
      <main className={cn(container, "flex min-h-[80svh] flex-col justify-center pb-24 pt-40")}>
        <Eyebrow className="mb-5">Pagina 404</Eyebrow>
        <h1 className="max-w-[14ch]">
          Deze bladzijde ontbreekt.
        </h1>
        <p className="mt-8 max-w-md text-lead text-muted-foreground">
          De pagina die je zoekt bestaat niet of is verplaatst. Blader terug naar het begin, of bekijk hoe een boek is opgebouwd.
        </p>
        <div className="mt-10 flex flex-wrap items-center gap-x-7 gap-y-4">
          <Link href="/" className={button({ size: "lg" })}>
            Naar de homepage
          </Link>
          <Link href="/het-boek" className={button({ variant: "text" })}>
            Het boek
          </Link>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
