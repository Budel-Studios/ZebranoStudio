import { company } from "@/data/company";

/**
 * Shown on pages whose terms still have to be confirmed or legally reviewed
 * (service terms, legal pages). Disappears once the matching flag/feit is set.
 */
export function ConceptNotice({ children }: { children?: React.ReactNode }) {
  return (
    <div role="note" className="rounded-lg border border-accent/40 bg-accent/5 px-5 py-4 text-sm leading-relaxed text-ink/85">
      <p className="font-sans">
        <strong className="font-semibold text-ink">Concept.</strong>{" "}
        {children ?? (
          <>
            Deze tekst wordt nog getoetst en kan wijzigen. Heb je een vraag over een lopende afspraak? Mail{" "}
            <a href={`mailto:${company.email}`} className="underline underline-offset-2">
              {company.email}
            </a>
            .
          </>
        )}
      </p>
    </div>
  );
}
