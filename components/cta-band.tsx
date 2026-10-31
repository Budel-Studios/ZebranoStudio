import { PillLink } from "@/components/ui/pill-link";
import { Container } from "@/components/ui/primitives";
import { company } from "@/data/company";
import { primaryCta } from "@/lib/navigation";

/**
 * Closing call to action — green band, as the original site used Zebrano
 * green for its "Door Types" and partner sections.
 */
export function CtaBand({
  title = "Klaar voor een deur die jouw verhaal vertelt?",
  text = "Vertel ons over je ruimte en je ideeën. We denken mee over vorm, materiaal en beslag en sturen je een voorstel op maat.",
}: {
  title?: string;
  text?: string;
}) {
  return (
    <section className="px-3 pb-3">
      <div className="rounded-lg bg-forest py-16 text-paper sm:py-20">
        <Container className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <h2 className="font-display text-3xl font-light leading-tight sm:text-4xl">{title}</h2>
            <p className="mt-4 text-base leading-relaxed text-paper/80 sm:text-lg">{text}</p>
          </div>
          <div className="flex flex-wrap items-center gap-4">
            <PillLink href={primaryCta.href} tone="paper" size="lg">
              {primaryCta.label}
            </PillLink>
            <a
              href={`tel:${company.telefoonHref}`}
              className="text-sm text-paper/85 underline-offset-4 transition-colors hover:text-paper hover:underline"
            >
              of bel {company.telefoon}
            </a>
          </div>
        </Container>
      </div>
    </section>
  );
}
