import { CtaBand } from "@/components/cta-band";
import { ArrowUpRightIcon } from "@/components/icons";
import { PillLink } from "@/components/ui/pill-link";
import { Container, Eyebrow, PageIntro } from "@/components/ui/primitives";
import { company } from "@/data/company";
import { merkfamilie, mtbAllServices, mtbVoordelen, MTB_URL } from "@/data/mtb-bouw";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Een merk van MTB Bouw",
  description:
    "Zebrano Studio is een merk van MTB Bouw uit Enschede. Samen met MTB Bouw, Afbouwstudio en De Kozijnstudio één familie: van verbouw tot exclusieve binnendeur.",
  path: "/mtb-bouw",
});

export default function MtbBouwPage() {
  return (
    <>
      <PageIntro eyebrow="Over Zebrano Studio" title="Een merk van MTB Bouw" crumbs={[{ name: "MTB Bouw-familie", path: "/mtb-bouw" }]}>
        <p>
          Zebrano Studio is een handelsnaam van {company.entiteit} uit {company.plaats}. Daardoor staat achter elke Zebrano-deur een
          bouwbedrijf dat ook het werk eromheen kan oppakken — van sparing tot afwerking.
        </p>
      </PageIntro>

      <section className="py-20 sm:py-24">
        <Container>
          <Eyebrow>De familie</Eyebrow>
          <h2 className="font-display text-3xl font-light text-ink sm:text-4xl">Vier merken, één aanspreekpunt</h2>
          <ul className="mt-10 grid gap-px overflow-hidden rounded-lg border border-line/30 bg-line/30 sm:grid-cols-2 lg:grid-cols-4">
            {merkfamilie.map((m) => {
              const extern = m.href.startsWith("http");
              const self = m.href === "/";
              return (
                <li key={m.naam} className={self ? "bg-forest p-7 text-paper" : "bg-paper p-7"}>
                  <p className="font-display text-xl">{m.naam}</p>
                  <p className={self ? "mt-2 text-sm leading-relaxed text-paper/80" : "mt-2 text-sm leading-relaxed text-ink/75"}>{m.rol}</p>
                  {extern && (
                    <a
                      href={m.href}
                      className="group mt-5 inline-flex items-center gap-1.5 text-sm font-medium text-forest transition-colors hover:text-accent"
                    >
                      {m.href.replace(/^https?:\/\/(www\.)?/, "")}
                      <ArrowUpRightIcon className="size-3.5" />
                    </a>
                  )}
                </li>
              );
            })}
          </ul>
        </Container>
      </section>

      <section className="bg-sand/60 py-20 sm:py-24">
        <Container className="grid gap-12 lg:grid-cols-2">
          <div>
            <Eyebrow>Wat het voor jou betekent</Eyebrow>
            <ul className="mt-2 space-y-4">
              {mtbVoordelen.map((v) => (
                <li key={v} className="flex gap-3 text-lg leading-relaxed text-ink/85">
                  <span aria-hidden className="mt-3 h-px w-5 shrink-0 bg-accent" />
                  {v}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <Eyebrow>Diensten van MTB Bouw</Eyebrow>
            <ul className="mt-2 flex flex-wrap gap-2">
              {mtbAllServices.map((s) => (
                <li key={s} className="rounded-full border border-line/40 bg-paper px-4 py-2 text-sm">
                  {s}
                </li>
              ))}
            </ul>
            <div className="mt-8">
              <a
                href={MTB_URL}
                className="group inline-flex items-center gap-2 rounded-full border border-forest px-5 py-2 text-sm text-forest transition-colors hover:bg-forest hover:text-paper"
              >
                Naar mtbbouw.com
                <ArrowUpRightIcon className="size-3.5" />
              </a>
            </div>
          </div>
        </Container>
      </section>

      <section className="py-16 sm:py-20">
        <Container className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <p className="max-w-2xl font-display text-2xl font-light leading-snug text-ink sm:text-3xl">
            Verbouw je en wil je deuren die het verschil maken? Dan stemmen we het met MTB Bouw af in één planning.
          </p>
          <PillLink href="/contact">Vraag een voorstel</PillLink>
        </Container>
      </section>

      <CtaBand />
    </>
  );
}
