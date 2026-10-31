import { ConceptNotice } from "@/components/ui/concept-notice";
import { Container, PageIntro } from "@/components/ui/primitives";
import { LEGAL_LAST_UPDATED } from "@/data/company";
import type { LegalDoc } from "@/data/privacy";

/**
 * Legal documents are concepts until reviewed. Flip this to true after the
 * review (docs/releasechecklist.md) to remove the concept notice.
 */
export const LEGAL_REVIEWED = false;

export function LegalPage({ doc, path }: { doc: LegalDoc; path: string }) {
  return (
    <>
      <PageIntro eyebrow="Juridisch" title={doc.title} crumbs={[{ name: doc.title, path }]}>
        <p>{doc.intro}</p>
        <p className="mt-4 text-sm text-ink/60">Laatst bijgewerkt: {LEGAL_LAST_UPDATED}</p>
      </PageIntro>
      <section className="py-14 sm:py-20">
        <Container className="max-w-3xl">
          {!LEGAL_REVIEWED && (
            <div className="mb-12">
              <ConceptNotice />
            </div>
          )}
          <div className="space-y-12">
            {doc.sections.map((s, i) => (
              <section key={s.title}>
                <h2 className="font-display text-2xl font-light text-ink">
                  <span className="mr-3 font-sans text-sm font-semibold text-bark/60">{i + 1}.</span>
                  {s.title}
                </h2>
                <div className="mt-4 space-y-3 leading-relaxed text-ink/80">
                  {s.paragraphs.map((p) => (
                    <p key={p}>{p}</p>
                  ))}
                </div>
                {s.items && s.items.length > 0 && (
                  <dl className="mt-4 space-y-3">
                    {s.items.map((it) => (
                      <div key={it.label + it.text} className="rounded-md border border-line/20 bg-white/50 px-4 py-3">
                        <dt className="font-medium text-ink">{it.label}</dt>
                        <dd className="mt-1 text-[15px] leading-relaxed text-ink/75">{it.text}</dd>
                      </div>
                    ))}
                  </dl>
                )}
              </section>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
