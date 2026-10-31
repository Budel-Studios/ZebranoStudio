import Link from "next/link";
import { CtaBand } from "@/components/cta-band";
import { ConceptNotice } from "@/components/ui/concept-notice";
import { FaqList } from "@/components/ui/faq-list";
import { Container, PageIntro } from "@/components/ui/primitives";
import { isVerified } from "@/data/feiten";
import { serviceTabs } from "@/data/service";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Service: bestelproces, levering, garantie en onderhoud",
  description:
    "Hoe bestellen werkt bij Zebrano Studio: van consult en inmeten tot levering, installatie, garantie en onderhoud van je maatwerk deur.",
  path: "/service",
});

export default function ServicePage() {
  return (
    <>
      <PageIntro eyebrow="Service" title="Service & voorwaarden" crumbs={[{ name: "Service", path: "/service" }]}>
        <p>
          Van eerste schets tot perfecte pasvorm: hier lees je hoe we plannen, wanneer we leveren, wat we garanderen en hoe je jouw
          Zebrano-stuk jarenlang mooi houdt. Duidelijke afspraken, een soepel verloop.
        </p>
      </PageIntro>

      <section className="py-14 sm:py-20">
        <Container>
          {!isVerified("servicevoorwaarden") && (
            <div className="mb-10 max-w-3xl">
              <ConceptNotice />
            </div>
          )}
          <nav aria-label="Onderwerpen" className="sticky top-[78px] z-10 -mx-1 mb-12 flex gap-2 overflow-x-auto bg-paper/90 px-1 py-3 backdrop-blur">
            {serviceTabs.map((t) => (
              <a
                key={t.slug}
                href={`#${t.slug}`}
                className="whitespace-nowrap rounded-full border border-line/50 px-5 py-2 text-sm transition-colors hover:border-forest hover:bg-forest hover:text-paper"
              >
                {t.title}
              </a>
            ))}
            <Link
              href="/veelgestelde-vragen"
              className="whitespace-nowrap rounded-full border border-line/50 px-5 py-2 text-sm transition-colors hover:border-forest hover:bg-forest hover:text-paper"
            >
              Veelgestelde vragen
            </Link>
          </nav>

          <div className="space-y-20">
            {serviceTabs.map((t) => (
              <section key={t.slug} id={t.slug} className="scroll-mt-40 grid gap-8 lg:grid-cols-12">
                <div className="lg:col-span-4">
                  <h2 className="font-display text-3xl font-light text-ink">{t.title}</h2>
                  <p className="mt-4 leading-relaxed text-ink/75">{t.intro}</p>
                </div>
                <div className="lg:col-span-8">
                  <FaqList items={t.items} />
                </div>
              </section>
            ))}
          </div>
        </Container>
      </section>

      <CtaBand title="Nog een vraag over je project?" text="Bel of mail ons, of vraag direct een voorstel aan. We nemen contact met je op." />
    </>
  );
}
