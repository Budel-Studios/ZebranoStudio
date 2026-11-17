import Link from "next/link";
import type { ReactNode } from "react";
import { AccessoryArt } from "@/components/site/accessory-art";
import { BookCover } from "@/components/site/book-mock";
import { container } from "@/components/ui/primitives";
import { accessoires, priceLabel } from "@/data/accessoires";
import { formaten, materialen } from "@/data/boek";
import { cn } from "@/lib/utils";

/**
 * Sections used on more than one page: the numbered steps, the row of cover
 * materials, the three formats and the accessory list.
 */

/**
 * The steps of a process on linen, numbered because the order matters.
 * `eyebrow` is optional and only shown when it adds something to the title.
 */
export function StepsBlock({
  eyebrow,
  title,
  text,
  steps,
  actions,
  id,
}: {
  eyebrow?: string;
  title: ReactNode;
  text?: string;
  steps: Array<{ title: string; text: string }>;
  actions?: ReactNode;
  id?: string;
}) {
  return (
    <section id={id} className="scroll-mt-24 bg-linen">
      <div className={cn(container, "py-20 lg:py-28")}>
        <div className="grid gap-8 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-6">
            {eyebrow && <p className="eyebrow mb-4">{eyebrow}</p>}
            <h2 className="max-w-[17ch]">{title}</h2>
          </div>
          {text && (
            <div className="flex flex-col justify-end lg:col-span-5 lg:col-start-8">
              <p className="text-lead text-muted-foreground">{text}</p>
            </div>
          )}
        </div>

        <ol className={cn("mt-14 grid gap-x-10 sm:grid-cols-2", steps.length === 3 ? "lg:grid-cols-3" : "lg:grid-cols-4")}>
          {steps.map((s, i) => (
            <li key={s.title} className="border-t border-foreground py-7">
              <p className="font-display text-5xl leading-none text-cloth" aria-hidden="true">
                {i + 1}
              </p>
              <h3 className="mt-8">
                <span className="sr-only">Stap {i + 1}: </span>
                {s.title}
              </h3>
              <p className="mt-3 text-small text-muted-foreground">{s.text}</p>
            </li>
          ))}
        </ol>

        {actions && <div className="mt-8 flex flex-wrap items-center gap-x-7 gap-y-4">{actions}</div>}
      </div>
    </section>
  );
}

/** The six cover materials as small sample covers on greyboard. Colours are illustrative. */
export function MaterialCovers({ withText = false, className }: { withText?: boolean; className?: string }) {
  return (
    <ul className={cn("grid grid-cols-2 gap-x-5 gap-y-10 sm:grid-cols-3", withText ? "lg:grid-cols-3" : "lg:grid-cols-6", className)}>
      {materialen.map((m) => (
        <li key={m.id}>
          <div className="flex aspect-[4/5] items-center justify-center bg-board">
            <BookCover color={m.color} texture={m.texture} label={`Voorbeeldomslag in ${m.name.toLowerCase()}`} className="w-[62%]" />
          </div>
          <h3 className={cn("mt-4", !withText && "text-2xl")}>{m.name}</h3>
          {withText && <p className="mt-2 text-small text-muted-foreground">{m.text}</p>}
        </li>
      ))}
    </ul>
  );
}

/** The three formats, drawn to scale next to each other. */
export function FormatRow({ className }: { className?: string }) {
  return (
    <ul className={cn("grid gap-x-6 gap-y-12 sm:grid-cols-3", className)}>
      {formaten.map((f) => (
        <li key={f.id}>
          <div className="flex aspect-[5/4] items-end justify-center bg-board px-6 pb-[9%] pt-6">
            <div style={{ width: `${(f.w / 30) * 60}%` }}>
              <BookCover ratio={`${f.w} / ${f.h}`} label={`Voorbeeldomslag in het formaat ${f.name}`} />
            </div>
          </div>
          <h3 className="mt-5 tabular-nums">{f.name}</h3>
          <p className="mt-2 text-small text-muted-foreground">{f.text}</p>
        </li>
      ))}
    </ul>
  );
}

/** Accessories, linking to their block on /accessoires. */
export function AccessoryCards({ className }: { className?: string }) {
  return (
    <ul className={cn("grid gap-x-5 gap-y-12 sm:grid-cols-2 lg:grid-cols-5", className)}>
      {accessoires.map((a) => (
        <li key={a.id}>
          <Link href={`/accessoires#${a.id}`} className="group block">
            <div className="flex aspect-[4/5] items-center justify-center overflow-hidden bg-board">
              <AccessoryArt id={a.id} className="w-[84%]" />
            </div>
            <h3 className="mt-5 text-2xl group-hover:underline group-hover:decoration-1 group-hover:underline-offset-4">{a.name}</h3>
            <p className="mt-2 text-small text-muted-foreground">{a.tagline}</p>
            <p className="mt-2 text-small font-medium">{priceLabel(a)}</p>
          </Link>
        </li>
      ))}
    </ul>
  );
}
