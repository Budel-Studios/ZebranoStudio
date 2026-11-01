import { company } from "@/data/company";

/**
 * Shown on pages whose terms still have to be confirmed or legally reviewed
 * (service terms, legal pages). Disappears once the matching flag/feit is set.
 */
export function ConceptNotice({ children }: { children?: React.ReactNode }) {
  return (
    <div role="note" className="rounded-sm border border-copper/40 bg-copper/5 px-5 py-4 text-sm leading-relaxed">
      <p>
        <span className="mr-2 text-[0.6875rem] font-medium uppercase tracking-[0.22em] text-copper">Concept</span>
        {children ?? (
          <>
            Deze tekst wordt nog getoetst en kan wijzigen. Heb je een vraag over een lopende afspraak? Mail{" "}
            <a href={`mailto:${company.email}`} className="link-line">
              {company.email}
            </a>
            .
          </>
        )}
      </p>
    </div>
  );
}
