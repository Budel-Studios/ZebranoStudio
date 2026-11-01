import Link from "next/link";
import { ConceptNotice } from "@/components/ui/concept-notice";
import { FaqList } from "@/components/ui/faq-list";
import { container, CtaSection, PageHeader } from "@/components/ui/primitives";
import { Reveal } from "@/components/ui/reveal";
import { isVerified } from "@/data/feiten";
import { serviceTabs } from "@/data/service";
import { pageMetadata } from "@/lib/seo";
import { cn } from "@/lib/utils";

export const metadata = pageMetadata({
  title: "Service: bestelproces, levering, garantie en onderhoud",
  description:
    "Hoe bestellen werkt bij Zebrano Studio: van consult en inmeten tot levering, installatie, garantie en onderhoud van je maatwerk deur.",
  path: "/service",
});

const chip =
  "inline-flex h-9 items-center whitespace-nowrap rounded-sm border border-foreground/20 px-4 text-[0.8125rem] transition-colors duration-300 hover:border-foreground";

export default function ServicePage() {
  return (
    <>
      <PageHeader
        eyebrow="Service"
        title="Service & voorwaarden"
        crumbs={[{ name: "Service", path: "/service" }]}
        intro={
          <p>
            Van eerste schets tot perfecte pasvorm: hier lees je hoe we plannen, wanneer we leveren, wat we garanderen en hoe je
            jouw Zebrano-stuk jarenlang mooi houdt. Duidelijke afspraken, een soepel verloop.
          </p>
        }
      />

      <div className={cn(container, "pb-24 pt-10 lg:pb-32")}>
        {!isVerified("servicevoorwaarden") && (
          <div className="mb-10 max-w-3xl">
            <ConceptNotice />
          </div>
        )}

        <nav aria-label="Onderwerpen" className="no-scrollbar sticky top-[5.25rem] z-10 -mx-4 mb-16 flex gap-2 overflow-x-auto bg-background/90 px-4 py-3 backdrop-blur-md sm:-mx-8 sm:top-[5.75rem] sm:px-8">
          {serviceTabs.map((t) => (
            <a key={t.slug} href={`#${t.slug}`} className={chip}>
              {t.title}
            </a>
          ))}
          <Link href="/veelgestelde-vragen" className={chip}>
            Veelgestelde vragen
          </Link>
        </nav>

        <div className="space-y-20 lg:space-y-28">
          {serviceTabs.map((t, i) => (
            <section key={t.slug} id={t.slug} className="grid scroll-mt-44 gap-8 lg:grid-cols-12">
              <Reveal className="lg:col-span-4">
                <p className="text-[0.6875rem] tabular-nums tracking-[0.2em] text-copper">{String(i + 1).padStart(2, "0")}</p>
                <h2 className="mt-4 text-4xl leading-[1.08]">{t.title}</h2>
                <p className="mt-4 max-w-sm leading-relaxed text-muted-foreground">{t.intro}</p>
              </Reveal>
              <div className="lg:col-span-7 lg:col-start-6">
                <FaqList items={t.items} />
              </div>
            </section>
          ))}
        </div>
      </div>

      <CtaSection
        eyebrow="Service"
        title="Nog een vraag over je project?"
        text="Bel of mail ons, of vraag direct een voorstel aan. We nemen contact met je op."
      />
    </>
  );
}
