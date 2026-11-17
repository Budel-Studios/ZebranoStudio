import Link from "next/link";
import { Plus } from "lucide-react";
import { button } from "@/components/ui/button";
import { container, CtaSection, PageHeader } from "@/components/ui/primitives";
import { Reveal } from "@/components/ui/reveal";
import { faqGroups } from "@/data/faq";
import { pageMetadata } from "@/lib/seo";
import { cn } from "@/lib/utils";

export const metadata = pageMetadata({
  title: "Veelgestelde vragen",
  description:
    "Antwoorden op vragen over het boek, de formaten en materialen, de ontwerpassistent, de prijs en de levering, en over de studio voor fotografen.",
  path: "/veelgestelde-vragen",
});

export default function FaqPage() {
  return (
    <>
      <PageHeader
        eyebrow="Veelgestelde vragen"
        crumbs={[{ name: "Veelgestelde vragen", path: "/veelgestelde-vragen" }]}
        title="Goed om te weten."
        intro={<p>Over het boek, het maken ervan, de prijs en de studio voor fotografen. Staat je vraag er niet bij? Stel hem gerust.</p>}
      >
        <Link href="/contact" className={cn(button({ variant: "text" }), "mt-6")}>
          Stel je vraag
        </Link>
      </PageHeader>

      <section className={cn(container, "py-20 lg:py-28")}>
        <div className="space-y-20">
          {faqGroups.map((group) => (
            <div key={group.title} className="grid gap-8 lg:grid-cols-12">
              <Reveal className="lg:col-span-4">
                <h2 className="text-h3 sm:text-[2.25rem]">{group.title}</h2>
              </Reveal>
              <Reveal delay={80} className="border-t lg:col-span-8">
                {group.items.map((item) => (
                  <details key={item.q} className="group border-b">
                    <summary className="flex cursor-pointer items-center justify-between gap-6 py-5">
                      <h3 className="font-sans text-[1.0625rem] font-semibold leading-snug tracking-normal">{item.q}</h3>
                      <Plus strokeWidth={1.5} aria-hidden className="size-5 shrink-0 transition-transform duration-200 group-open:rotate-45" />
                    </summary>
                    <p className="pb-7 text-muted-foreground">{item.a}</p>
                  </details>
                ))}
              </Reveal>
            </div>
          ))}
        </div>
      </section>

      <CtaSection title="Nog een vraag over jullie boek?" text="Stuur ons een bericht. We antwoorden persoonlijk, en zeggen het ook eerlijk als we iets nog niet weten." cta={{ label: "Neem contact op", href: "/contact" }} />
    </>
  );
}
