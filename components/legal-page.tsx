import { ConceptNotice } from "@/components/ui/concept-notice";
import { container, PageHeader } from "@/components/ui/primitives";
import { LEGAL_LAST_UPDATED } from "@/data/company";
import type { LegalDoc } from "@/data/privacy";
import { cn } from "@/lib/utils";

/**
 * Legal documents are concepts until reviewed. Flip this to true after the
 * review (docs/releasechecklist.md) to remove the concept notice.
 */
export const LEGAL_REVIEWED = false;

/** Legal page: header, contents list on the left (sticky), numbered sections on the right. */
export function LegalPage({ doc, path }: { doc: LegalDoc; path: string }) {
  const anchor = (i: number) => `artikel-${i + 1}`;
  return (
    <>
      <PageHeader
        eyebrow="Juridisch"
        title={doc.title}
        crumbs={[{ name: doc.title, path }]}
        intro={
          <>
            <p>{doc.intro}</p>
            <p className="text-sm">Laatst bijgewerkt: {LEGAL_LAST_UPDATED}</p>
          </>
        }
      />

      <div className={cn(container, "pb-24 pt-12 lg:pb-32")}>
        {!LEGAL_REVIEWED && (
          <div className="mb-14 max-w-3xl">
            <ConceptNotice />
          </div>
        )}
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <nav aria-label="Inhoud" className="hidden lg:col-span-3 lg:block">
            <div className="sticky top-28">
              <p className="text-[0.6875rem] font-medium uppercase tracking-[0.22em] text-muted-foreground">Inhoud</p>
              <ol className="mt-5 space-y-2.5 text-[0.9375rem]">
                {doc.sections.map((s, i) => (
                  <li key={s.title} className="flex gap-3">
                    <span className="w-5 shrink-0 text-[0.75rem] tabular-nums text-copper">{i + 1}.</span>
                    <a href={`#${anchor(i)}`} className="link-line">
                      {s.title}
                    </a>
                  </li>
                ))}
              </ol>
            </div>
          </nav>

          <div className="space-y-14 lg:col-span-7 lg:col-start-5">
            {doc.sections.map((s, i) => (
              <section key={s.title} id={anchor(i)} className="scroll-mt-28 border-t pt-8">
                <h2 className="flex items-baseline gap-4 text-3xl leading-[1.1]">
                  <span className="text-[0.75rem] tabular-nums tracking-[0.2em] text-copper">{String(i + 1).padStart(2, "0")}</span>
                  {s.title}
                </h2>
                <div className="mt-5 space-y-3 leading-relaxed text-muted-foreground">
                  {s.paragraphs.map((p) => (
                    <p key={p}>{p}</p>
                  ))}
                </div>
                {s.items && s.items.length > 0 && (
                  <dl className="mt-6 border-t">
                    {s.items.map((it) => (
                      <div key={it.label + it.text} className="grid gap-1 border-b py-3.5 text-[0.9375rem] sm:grid-cols-3 sm:gap-4">
                        <dt>{it.label}</dt>
                        <dd className="leading-relaxed text-muted-foreground sm:col-span-2">{it.text}</dd>
                      </div>
                    ))}
                  </dl>
                )}
              </section>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
