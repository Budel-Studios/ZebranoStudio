import Image from "next/image";
import { CtaBand } from "@/components/cta-band";
import { PillLink } from "@/components/ui/pill-link";
import { Container, Eyebrow, PageIntro } from "@/components/ui/primitives";
import { verhaal } from "@/data/over";
import { primaryCta } from "@/lib/navigation";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: verhaal.meta.title,
  description: verhaal.meta.description,
  path: "/ons-verhaal",
});

export default function OnsVerhaalPage() {
  return (
    <>
      <PageIntro eyebrow="Zebrano" title={verhaal.h1} crumbs={[{ name: "Ons verhaal", path: "/ons-verhaal" }]}>
        <p>{verhaal.intro}</p>
      </PageIntro>

      <section className="py-20 sm:py-28">
        <Container>
          <ol className="relative space-y-20 sm:space-y-28 lg:before:absolute lg:before:inset-y-0 lg:before:left-1/2 lg:before:w-px lg:before:bg-line/30">
            {verhaal.tijdlijn.map((stap, i) => (
              <li key={stap.title} className="relative grid items-center gap-8 lg:grid-cols-2 lg:gap-24">
                <span
                  aria-hidden
                  className="absolute left-1/2 top-1/2 hidden size-3 -translate-x-1/2 -translate-y-1/2 rounded-full border border-forest bg-paper lg:block"
                />
                <div className={i % 2 === 1 ? "lg:order-2" : ""}>
                  <div className="relative aspect-[16/9] overflow-hidden rounded-lg">
                    <Image src={stap.image.src} alt={stap.image.alt} fill sizes="(min-width: 1024px) 45vw, 100vw" className="object-cover" />
                  </div>
                </div>
                <div className={i % 2 === 1 ? "lg:order-1 lg:text-right" : ""}>
                  <p className="font-sans text-xs font-semibold uppercase tracking-[0.16em] text-bark/70">
                    {stap.jaar ?? String(i + 1).padStart(2, "0")}
                  </p>
                  <h2 className="mt-2 font-display text-3xl font-light text-ink">{stap.title}</h2>
                  <p className="mt-4 leading-relaxed text-ink/80">{stap.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      <section className="bg-sand/60 py-20 sm:py-28">
        <Container className="grid gap-10 lg:grid-cols-2">
          <div>
            <Eyebrow>Waar we voor staan</Eyebrow>
            <p className="font-display text-3xl font-light leading-snug text-ink sm:text-4xl">{verhaal.slot.title}</p>
          </div>
          <div>
            <p className="text-lg leading-relaxed text-ink/80">{verhaal.slot.text}</p>
            <p className="mt-6 font-display text-xl text-ink">{verhaal.slot.vraag}</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <PillLink href={primaryCta.href}>{primaryCta.label}</PillLink>
              <PillLink href="/bewust-vakmanschap" tone="outline">
                Bewust vakmanschap
              </PillLink>
            </div>
          </div>
        </Container>
      </section>

      <div className="h-3" />
      <CtaBand />
    </>
  );
}
