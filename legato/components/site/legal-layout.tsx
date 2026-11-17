import type { ReactNode } from "react";
import { container, PageHeader } from "@/components/ui/primitives";
import { cn } from "@/lib/utils";

/**
 * Shared layout for the legal pages. Both are drafts: the banner says so, and
 * unknown company details are shown as [placeholders] instead of invented.
 */
export function LegalLayout({
  title,
  path,
  intro,
  updated,
  sections,
}: {
  title: ReactNode;
  path: string;
  intro: string;
  /** Date of the draft, as text. */
  updated: string;
  sections: Array<{ heading: string; body: ReactNode }>;
}) {
  return (
    <>
      <PageHeader eyebrow="Juridisch concept" crumbs={[{ name: typeof title === "string" ? title : "Juridisch", path }]} title={title} intro={<p>{intro}</p>} />
      <section className={cn(container, "pb-20 pt-12 lg:pb-28")}>
        <div className="mx-auto max-w-3xl">
          <div role="note" className="border-l-4 border-ribbon bg-linen px-5 py-4 text-[0.9375rem]">
            <p className="font-semibold">Concept</p>
            <p className="mt-1">
              Dit is een concepttekst die nog juridisch getoetst moet worden. Gegevens tussen [vierkante haken] zijn nog niet
              ingevuld. Aan deze versie kunnen geen rechten worden ontleend. Versie van {updated}.
            </p>
          </div>
          <div className="mt-12 space-y-12">
            {sections.map((s, i) => (
              <section key={s.heading}>
                <h2 className="text-h3">
                  {i + 1}. {s.heading}
                </h2>
                <div className="mt-4 space-y-4 text-base text-muted-foreground [&_a]:text-foreground [&_li]:ml-5 [&_li]:list-disc [&_ul]:space-y-1.5">
                  {s.body}
                </div>
              </section>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
