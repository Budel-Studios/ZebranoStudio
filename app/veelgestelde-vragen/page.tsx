import { CtaBand } from "@/components/cta-band";
import { ConceptNotice } from "@/components/ui/concept-notice";
import { FaqList } from "@/components/ui/faq-list";
import { Container, PageIntro } from "@/components/ui/primitives";
import { isVerified } from "@/data/feiten";
import { faqCategories } from "@/data/service";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Veelgestelde vragen",
  description:
    "Antwoorden op veelgestelde vragen over maatwerk deuren van Zebrano Studio: materialen, inmeten, betaling, levering, installatie en garantie.",
  path: "/veelgestelde-vragen",
});

export default function FaqPage() {
  const categories = faqCategories
    .map((c) => ({ ...c, items: c.items.filter((i) => !i.feit || isVerified(i.feit)) }))
    .filter((c) => c.items.length > 0);
  return (
    <>
      <PageIntro eyebrow="Service" title="Veelgestelde vragen" crumbs={[{ name: "Veelgestelde vragen", path: "/veelgestelde-vragen" }]}>
        <p>Staat je vraag er niet tussen? Neem gerust contact op — we denken graag met je mee.</p>
      </PageIntro>
      <section className="py-14 sm:py-20">
        <Container>
          {!isVerified("servicevoorwaarden") && (
            <div className="mb-12 max-w-3xl">
              <ConceptNotice />
            </div>
          )}
          <div className="space-y-16">
            {categories.map((c) => (
              <section key={c.title} className="grid gap-6 lg:grid-cols-12">
                <h2 className="font-display text-2xl font-light text-ink sm:text-3xl lg:col-span-4">{c.title}</h2>
                <div className="lg:col-span-8">
                  <FaqList items={c.items} />
                </div>
              </section>
            ))}
          </div>
        </Container>
      </section>
      <CtaBand />
    </>
  );
}
