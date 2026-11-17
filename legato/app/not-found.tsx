import Link from "next/link";
import { SiteFooter } from "@/components/site/site-footer";
import { SiteHeader } from "@/components/site/site-header";
import { Arrow } from "@/components/ui/arrow";
import { button } from "@/components/ui/button";
import { container, Eyebrow, Soft } from "@/components/ui/primitives";
import { cn } from "@/lib/utils";

export const metadata = { title: "Pagina niet gevonden", robots: { index: false, follow: true } };

/** Global 404, with the site chrome (it renders outside the (site) group). */
export default function NotFound() {
  return (
    <>
      <SiteHeader />
      <main className={cn(container, "flex min-h-[80svh] flex-col justify-center pb-24 pt-40")}>
        <Eyebrow>Pagina 404</Eyebrow>
        <h1 className="mt-6 max-w-[14ch] text-5xl leading-[1] sm:text-7xl">
          Deze bladzijde <Soft>ontbreekt.</Soft>
        </h1>
        <p className="mt-8 max-w-md text-lg leading-relaxed text-muted-foreground">
          De pagina die je zoekt bestaat niet of is verplaatst. Blader terug naar het begin, of bekijk hoe een boek is opgebouwd.
        </p>
        <div className="mt-10 flex flex-wrap gap-3">
          <Link href="/" className={button({ size: "lg" })}>
            Naar de homepage <Arrow />
          </Link>
          <Link href="/het-boek" className={button({ variant: "outline", size: "lg" })}>
            Het boek
          </Link>
        </div>
      </main>
      <SiteFooter />
    </>
  );
}
