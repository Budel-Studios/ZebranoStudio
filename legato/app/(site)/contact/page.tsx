import { LogIn, Mail } from "lucide-react";
import Link from "next/link";
import { ContactForm } from "@/components/site/contact-form";
import { Breadcrumbs, container, Eyebrow } from "@/components/ui/primitives";
import { getAccessoire } from "@/data/accessoires";
import { BRAND } from "@/lib/brand";
import { pageMetadata } from "@/lib/seo";
import { cn } from "@/lib/utils";

export const metadata = pageMetadata({
  title: "Contact en voorstel aanvragen",
  description: `Vraag een voorstel aan voor een trouwboek of reisboek, of vraag als fotograaf een demo van de studio aan. Stuur ${BRAND.name} een bericht.`,
  path: "/contact",
});

const row = "group flex items-center gap-6 border-b py-5";

export default async function ContactPage({
  searchParams,
}: {
  searchParams: Promise<{ type?: string | string[]; accessoire?: string | string[]; onderwerp?: string | string[] }>;
}) {
  const sp = await searchParams;
  const one = (v: string | string[] | undefined) => (Array.isArray(v) ? v[0] : v);
  const fotograaf = one(sp.type) === "fotograaf";
  // Coming from an accessory or the travel books page: start the message and tick the interest.
  const accessoire = getAccessoire(one(sp.accessoire));
  const reisboek = one(sp.onderwerp) === "reisboek";
  const initialMessage = accessoire
    ? `We zijn geïnteresseerd in: ${accessoire.name.toLowerCase()}.\n\n`
    : reisboek
      ? "We willen graag een voorstel voor een reisboek.\n\n"
      : undefined;
  const initialInteresse = accessoire
    ? [accessoire.id === "ouderboeken" ? "ouderboeken" : "accessoires"]
    : reisboek
      ? ["reisboek"]
      : fotograaf
        ? ["studio"]
        : [];

  return (
    <section className={cn(container, "pb-20 pt-32 lg:pb-28 lg:pt-44")}>
      <Breadcrumbs items={[{ name: "Contact", path: "/contact" }]} />
      <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <div>
            <h1>
              {fotograaf ? (
                <>
                  Vraag een demo aan.
                </>
              ) : (
                <>
                  Vertel ons over jullie dag.
                </>
              )}
            </h1>
            <div className="mt-8 max-w-md space-y-4 text-lead text-muted-foreground">
              {fotograaf ? (
                <p>
                  Benieuwd of {BRAND.name} bij je studio past? Laat je gegevens achter, dan lopen we samen door de studio, de
                  ontwerpassistent en de inkoop.
                </p>
              ) : (
                <>
                  <p>
                    Trouwen jullie nog, of ligt de dag al achter jullie? Vertel wie de foto&apos;s maakt of maakte en welke
                    woorden jullie willen bewaren. Dan denken we mee en sturen we een voorstel.
                  </p>
                  <p>Ook voor een reisboek of een vraag over accessoires ben je hier aan het goede adres.</p>
                </>
              )}
            </div>
          </div>

          <div className="mt-12 border-t">
            <a href={`mailto:${BRAND.email}`} className={row}>
              <span className="flex items-center gap-4">
                <Mail strokeWidth={1.5} aria-hidden className="size-5 text-cloth" />
                <span>
                  <span className="block text-sm font-medium text-muted-foreground">Mail ons</span>
                  <span className="mt-1 block font-display text-2xl">
                    <span className="link-line break-all">{BRAND.email}</span>
                  </span>
                </span>
              </span>
            </a>
            <Link href="/studio" className={row}>
              <span className="flex items-center gap-4">
                <LogIn strokeWidth={1.5} aria-hidden className="size-5 text-cloth" />
                <span>
                  <span className="block text-sm font-medium text-muted-foreground">Fotograaf met een studio</span>
                  <span className="mt-1 block font-display text-2xl">
                    <span className="link-line">Inloggen studio</span>
                  </span>
                </span>
              </span>
            </Link>
            <p className="pt-5 text-small text-muted-foreground">
              We bewaren niets op deze website: je bericht komt als e-mail bij ons binnen. Meer in de{" "}
              <Link href="/privacy" className="link-line text-foreground">
                privacyverklaring
              </Link>
              .
            </p>
          </div>
        </div>

        <div className="lg:col-span-7">
          <div className="border bg-card p-6 sm:p-10 lg:p-12">
            <Eyebrow className="mb-3">{fotograaf ? "Vraag een demo aan" : "Vraag een voorstel"}</Eyebrow>
            <h2 className="mb-10 text-h3 sm:text-[2.25rem]">{fotograaf ? "Vertel ons over je studio." : "Waar mogen we mee helpen?"}</h2>
            <ContactForm key={fotograaf ? "fotograaf" : "paar"} initialType={fotograaf ? "fotograaf" : "paar"} initialMessage={initialMessage} initialInteresse={initialInteresse} />
          </div>
        </div>
      </div>
    </section>
  );
}
