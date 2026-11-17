import { Check, RefreshCw, Sparkles } from "lucide-react";
import { SampleSpread } from "@/components/site/book-mock";
import { cn } from "@/lib/utils";

/**
 * Static illustration of the design assistant in the studio: the parameters
 * you set and one proposal with alternatives. Not a screenshot and not
 * interactive; it only shows the idea ("proposes, you decide").
 */

function Row({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between gap-4 border-b py-3">
      <span className="text-[0.625rem] font-medium uppercase tracking-[0.2em] text-muted-foreground">{label}</span>
      <span className="flex items-center gap-1.5">{children}</span>
    </div>
  );
}

function Chip({ children, on = false }: { children: React.ReactNode; on?: boolean }) {
  return (
    <span className={cn("rounded-sm border px-2 py-1 text-[0.6875rem] leading-none", on ? "border-primary bg-primary text-primary-foreground" : "bg-background text-foreground/70")}>
      {children}
    </span>
  );
}

export function AssistantPanel({ className }: { className?: string }) {
  return (
    <div
      role="img"
      aria-label="Illustratie van de ontwerpassistent: links de instellingen stijl, dichtheid, typografie, palet en hoofdstukken, rechts een opmaakvoorstel met twee alternatieven"
      className={cn("select-none rounded-sm border bg-card shadow-[var(--shadow-soft)]", className)}
    >
      <div aria-hidden className="grid sm:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]">
        {/* Parameters */}
        <div className="border-b p-5 sm:border-b-0 sm:border-r sm:p-6">
          <p className="flex items-center gap-2 text-[0.6875rem] uppercase tracking-[0.2em] text-muted-foreground">
            <Sparkles strokeWidth={1.25} className="size-3.5 text-ribbon" /> Ontwerpassistent
          </p>
          <div className="mt-3 border-t">
            <Row label="Stijl">
              <Chip>Klassiek</Chip>
              <Chip on>Editorial</Chip>
              <Chip>Modern</Chip>
            </Row>
            <Row label="Dichtheid">
              <span className="text-[0.6875rem] text-muted-foreground">Rustig</span>
              <span className="relative h-px w-16 bg-foreground/25 sm:w-20">
                <span className="absolute left-[30%] top-1/2 size-2.5 -translate-y-1/2 rounded-full bg-primary" />
              </span>
              <span className="text-[0.6875rem] text-muted-foreground">Rijk</span>
            </Row>
            <Row label="Typografie">
              <span className="font-display text-xl italic leading-none">Aa</span>
              <span className="text-[0.6875rem] text-muted-foreground">Schreef, cursief</span>
            </Row>
            <Row label="Palet">
              {["var(--paper)", "var(--linen)", "var(--board)", "var(--ribbon)", "var(--cloth)"].map((c) => (
                <span key={c} className="size-4 rounded-full border" style={{ background: c }} />
              ))}
            </Row>
            <Row label="Hoofdstukken">
              <span className="text-[0.8125rem]">9 gekozen</span>
            </Row>
          </div>
        </div>

        {/* Proposal */}
        <div className="p-5 sm:p-6">
          <p className="text-[0.6875rem] uppercase tracking-[0.2em] text-muted-foreground">Voorstel · De ceremonie</p>
          <div className="mt-4 rounded-sm bg-linen p-4 sm:p-5">
            <SampleSpread kind="opener" />
          </div>
          <p className="mt-4 font-display text-lg italic leading-snug">
            “Eén beeld paginagroot links, de titel rechts. Rustiger kan ook: zal ik de geloften een eigen spread geven?”
          </p>
          <div className="mt-4 grid grid-cols-2 gap-3">
            <div className="rounded-sm bg-linen p-2.5">
              <SampleSpread kind="geloften" />
            </div>
            <div className="rounded-sm bg-linen p-2.5">
              <SampleSpread kind="quote" />
            </div>
          </div>
          <div className="mt-4 flex flex-wrap gap-2">
            <span className="inline-flex h-8 items-center gap-2 rounded-sm bg-primary px-3 text-[0.75rem] text-primary-foreground">
              <Check strokeWidth={1.5} className="size-3.5" /> Dit voorstel kiezen
            </span>
            <span className="inline-flex h-8 items-center gap-2 rounded-sm border px-3 text-[0.75rem]">
              <RefreshCw strokeWidth={1.25} className="size-3.5 text-ribbon" /> Ander voorstel
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
