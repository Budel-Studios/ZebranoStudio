import Link from "next/link";
import type { ReactNode } from "react";
import { AccessoryArt } from "@/components/site/accessory-art";
import { BookCover } from "@/components/site/book-mock";
import { Arrow } from "@/components/ui/arrow";
import { Reveal } from "@/components/ui/reveal";
import { accessoires, priceLabel } from "@/data/accessoires";
import { formaten, materialen } from "@/data/boek";
import { cn } from "@/lib/utils";

/**
 * Sections used on more than one page: the numbered steps block in wine, the
 * row of cover materials, the three formats and the accessory cards.
 */

/** Wine block with numbered steps (the "Werkwijze" block of the home page). */
export function StepsBlock({
  eyebrow,
  title,
  text,
  steps,
  actions,
  id,
}: {
  eyebrow: string;
  title: ReactNode;
  text?: string;
  steps: Array<{ title: string; text: string }>;
  actions?: ReactNode;
  id?: string;
}) {
  return (
    <section id={id} className="scroll-mt-24 px-3 sm:px-4">
      <div className="mx-auto max-w-[1600px] rounded-sm bg-wine px-6 py-24 text-wine-foreground sm:px-10 lg:px-14 lg:py-32">
        <div className="grid gap-10 lg:grid-cols-12">
          <Reveal className="lg:col-span-6">
            <p className="eyebrow text-wine-muted">{eyebrow}</p>
            <h2 className="mt-5 max-w-[17ch] text-balance text-4xl leading-[1.05] sm:text-6xl">{title}</h2>
          </Reveal>
          {text && (
            <Reveal delay={100} className="flex flex-col justify-end lg:col-span-5 lg:col-start-8">
              <p className="text-lg leading-relaxed text-wine-muted">{text}</p>
            </Reveal>
          )}
        </div>

        <ol className={cn("mt-16 grid gap-px overflow-hidden rounded-sm bg-wine-line sm:grid-cols-2", steps.length === 3 ? "lg:grid-cols-3" : "lg:grid-cols-4")}>
          {steps.map((s, i) => (
            <Reveal as="li" key={s.title} delay={i * 80} className="bg-wine p-7 lg:p-8">
              <div className="flex items-center gap-3">
                <span className="font-display text-5xl italic leading-none text-gold">{i + 1}</span>
                <span className="h-px flex-1 bg-wine-line" />
              </div>
              <h3 className="mt-10 text-[1.75rem] leading-tight">{s.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-wine-muted">{s.text}</p>
            </Reveal>
          ))}
        </ol>

        {actions && <div className="mt-12 flex flex-wrap items-center gap-4">{actions}</div>}
      </div>
    </section>
  );
}

/** The six cover materials as small sample covers. Colours are illustrative. */
export function MaterialCovers({ withText = false, className }: { withText?: boolean; className?: string }) {
  return (
    <ul className={cn("grid grid-cols-2 gap-x-5 gap-y-10 sm:grid-cols-3", withText ? "lg:grid-cols-3" : "lg:grid-cols-6", className)}>
      {materialen.map((m, i) => (
        <Reveal as="li" key={m.id} delay={i * 60} className="group">
          <div className="flex aspect-[4/5] items-center justify-center rounded-sm bg-linen">
            <BookCover
              color={m.color}
              texture={m.texture}
              label={`Voorbeeldomslag in ${m.name.toLowerCase()}`}
              className="img-zoom w-[62%]"
            />
          </div>
          <h3 className={cn("mt-4 border-b pb-3", withText ? "text-3xl" : "text-2xl")}>{m.name}</h3>
          {withText && <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{m.text}</p>}
        </Reveal>
      ))}
    </ul>
  );
}

/** The three formats, drawn to scale next to each other. */
export function FormatRow({ className }: { className?: string }) {
  return (
    <ul className={cn("grid gap-x-6 gap-y-12 sm:grid-cols-3", className)}>
      {formaten.map((f, i) => (
        <Reveal as="li" key={f.id} delay={i * 80}>
          <div className="flex aspect-[5/4] items-end justify-center rounded-sm bg-linen px-6 pb-[7%] pt-6">
            <div style={{ width: `${(f.w / 30) * 60}%` }}>
              <BookCover ratio={`${f.w} / ${f.h}`} label={`Voorbeeldomslag in het formaat ${f.name}`} />
            </div>
          </div>
          <div className="mt-5 flex items-baseline justify-between border-b pb-3">
            <h3 className="text-3xl">{f.name}</h3>
            <span className="text-[0.6875rem] tabular-nums tracking-[0.2em] text-gold">{String(i + 1).padStart(2, "0")}</span>
          </div>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{f.text}</p>
        </Reveal>
      ))}
    </ul>
  );
}

/** Accessory cards, linking to their block on /accessoires. */
export function AccessoryCards({ className }: { className?: string }) {
  return (
    <ul className={cn("grid gap-x-5 gap-y-12 sm:grid-cols-2 lg:grid-cols-5", className)}>
      {accessoires.map((a, i) => (
        <Reveal as="li" key={a.id} delay={i * 60}>
          <Link href={`/accessoires#${a.id}`} className="group block">
            <div className="flex aspect-[4/5] items-center justify-center overflow-hidden rounded-sm bg-linen">
              <AccessoryArt id={a.id} className="img-zoom w-[84%]" />
            </div>
            <div className="mt-5 flex items-center justify-between border-b pb-4">
              <h3 className="text-2xl">
                <span className="link-line">{a.name}</span>
              </h3>
              <Arrow className="text-muted-foreground" />
            </div>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{a.tagline}</p>
            <p className="mt-2 text-[0.6875rem] uppercase tracking-[0.2em] text-muted-foreground">{priceLabel(a)}</p>
          </Link>
        </Reveal>
      ))}
    </ul>
  );
}
