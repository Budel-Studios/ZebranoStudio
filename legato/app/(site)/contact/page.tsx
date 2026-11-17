import { ArrowUpRight, LogIn, Mail } from "lucide-react";
import Link from "next/link";
import { ContactForm } from "@/components/site/contact-form";
import { Breadcrumbs, container, Eyebrow, Soft } from "@/components/ui/primitives";
import { getAccessoire } from "@/data/accessoires";
import { BRAND } from "@/lib/brand";
import { pageMetadata } from "@/lib/seo";
import { cn } from "@/lib/utils";

export const metadata = pageMetadata({
  title: "Contact en voorstel aanvragen",
  description: `Vraag een voorstel aan voor een trouwboek of reisboek, of vraag als fotograaf een demo van de studio aan. Stuur ${BRAND.name} een bericht.`,
  path: "/contact",
});

const row = "group flex items-center justify-between gap-6 border-b py-5";
const rowIcon = "size-4 text-muted-foreground transition-transform duration-500 ease-page group-hover:-translate-y-0.5 group-hover:translate-x-0.5";

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
    <section className={cn(container, "pb-24 pt-32 lg:pb-32 lg:pt-40")}>
      <Breadcrumbs items={[{ name: "Contact", path: "/contact" }]} />
      <div className="grid gap-14 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <div className="animate-rise">
            <Eyebrow>Contact</Eyebrow>
            <h1 className="mt-6 text-5xl leading-[1] sm:text-6xl lg:text-7xl">
              {fotograaf ? (
                <>
                  Vraag een <Soft>demo aan.</Soft>
                </>
              ) : (
                <>
                  Vertel ons <Soft>over jullie dag.</Soft>
                </>
              )}
            </h1>
            <div className="mt-8 max-w-md space-y-4 text-lg leading-relaxed text-muted-foreground">
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

          <div className="mt-12 animate-rise border-t [animation-delay:150ms]">
            <a href={`mailto:${BRAND.email}`} className={row}>
              <span className="flex items-center gap-4">
                <Mail strokeWidth={1.25} aria-hidden className="size-5 text-ribbon" />
                <span>
                  <span className="block text-[0.6875rem] uppercase tracking-[0.2em] text-muted-foreground">Mail ons</span>
                  <span className="mt-1 block font-display text-2xl">
                    <span className="link-line break-all">{BRAND.email}</span>
                  </span>
                </span>
              </span>
              <ArrowUpRight strokeWidth={1.25} aria-hidden className={rowIcon} />
            </a>
            <Link href="/studio" className={row}>
              <span className="flex items-center gap-4">
                <LogIn strokeWidth={1.25} aria-hidden className="size-5 text-ribbon" />
                <span>
                  <span className="block text-[0.6875rem] uppercase tracking-[0.2em] text-muted-foreground">Fotograaf met een studio</span>
                  <span className="mt-1 block font-display text-2xl">
                    <span className="link-line">Inloggen studio</span>
                  </span>
                </span>
              </span>
              <ArrowUpRight strokeWidth={1.25} aria-hidden className={rowIcon} />
            </Link>
            <p className="pt-5 text-sm leading-relaxed text-muted-foreground">
              We bewaren niets op deze website: je bericht komt als e-mail bij ons binnen. Meer in de{" "}
              <Link href="/privacy" className="link-line text-foreground">
                privacyverklaring
              </Link>
              .
            </p>
          </div>
        </div>

        <div className="lg:col-span-7">
          <div className="animate-rise rounded-sm border bg-card p-6 [animation-delay:100ms] sm:p-10 lg:p-12">
            <Eyebrow>{fotograaf ? "Vraag een demo aan" : "Vraag een voorstel"}</Eyebrow>
            <h2 className="mb-10 mt-5 text-3xl sm:text-4xl">{fotograaf ? "Vertel ons over je studio." : "Waar mogen we mee helpen?"}</h2>
            <ContactForm key={fotograaf ? "fotograaf" : "paar"} initialType={fotograaf ? "fotograaf" : "paar"} initialMessage={initialMessage} initialInteresse={initialInteresse} />
          </div>
        </div>
      </div>
    </section>
  );
}
