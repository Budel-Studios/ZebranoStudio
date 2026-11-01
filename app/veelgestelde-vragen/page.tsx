import { ConceptNotice } from "@/components/ui/concept-notice";
import { FaqList } from "@/components/ui/faq-list";
import { container, CtaSection, PageHeader } from "@/components/ui/primitives";
import { Reveal } from "@/components/ui/reveal";
import { isVerified } from "@/data/feiten";
import { faqCategories } from "@/data/service";
import { pageMetadata } from "@/lib/seo";
import { cn } from "@/lib/utils";

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
      <PageHeader
        eyebrow="Service"
        title="Veelgestelde vragen"
        crumbs={[{ name: "Veelgestelde vragen", path: "/veelgestelde-vragen" }]}
        intro={<p>Staat je vraag er niet tussen? Neem gerust contact op, we denken graag met je mee.</p>}
      />

      <div className={cn(container, "pb-24 pt-10 lg:pb-32")}>
        {!isVerified("servicevoorwaarden") && (
          <div className="mb-16 max-w-3xl">
            <ConceptNotice />
          </div>
        )}
        <div className="space-y-20 lg:space-y-24">
          {categories.map((c, i) => (
            <section key={c.title} className="grid gap-8 lg:grid-cols-12">
              <Reveal className="lg:col-span-4">
                <p className="text-[0.6875rem] tabular-nums tracking-[0.2em] text-copper">{String(i + 1).padStart(2, "0")}</p>
                <h2 className="mt-4 text-3xl leading-[1.1] sm:text-4xl">{c.title}</h2>
              </Reveal>
              <div className="lg:col-span-7 lg:col-start-6">
                <FaqList items={c.items} />
              </div>
            </section>
          ))}
        </div>
      </div>

      <CtaSection />
    </>
  );
}
