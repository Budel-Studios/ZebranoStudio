"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";
import { UitvoeringIcon } from "@/components/uitvoering-icon";
import { Arrow } from "@/components/ui/arrow";
import { button } from "@/components/ui/button";
import { getUitvoering, isUitvoering, UITVOERINGEN, type UitvoeringSlug } from "@/data/uitvoeringen";
import { cn } from "@/lib/utils";

type Props = {
  /** What the request is for, as it reads after "voor": "Jesse", "de Fineercollectie". */
  subject: string;
  /** Query that identifies the design on /contact, e.g. "ontwerp=jesse". */
  contactQuery: string;
  /** Pre-selected uitvoering (e.g. the one in the photo); `?uitvoering=` in the URL wins. */
  initial?: UitvoeringSlug;
  /** Extra line under the tiles, e.g. "Op de foto als taatsdeur." */
  note?: string;
  /** Narrow column (design page): tiles without the movement line. */
  compact?: boolean;
  className?: string;
};

/**
 * "Kies je uitvoering" on a design or collection: four tiles, one choice.
 * The request button follows the choice ("Vraag een voorstel voor Jesse als
 * taatsdeur") and pre-fills the form. Arriving from a door page with
 * ?uitvoering=… selects that one.
 */
export function UitvoeringPicker(props: Props) {
  return (
    <Suspense fallback={<PickerView {...props} />}>
      <PickerFromUrl {...props} />
    </Suspense>
  );
}

function PickerFromUrl(props: Props) {
  const fromUrl = useSearchParams().get("uitvoering");
  const initial = isUitvoering(fromUrl) ? fromUrl : props.initial;
  return <PickerView key={initial ?? "geen"} {...props} initial={initial} />;
}

function PickerView({ subject, contactQuery, initial, note, compact = false, className }: Props) {
  const [selected, setSelected] = useState<UitvoeringSlug | undefined>(initial);
  const u = getUitvoering(selected);
  const href = `/contact?${contactQuery}${u ? `&uitvoering=${u.slug}` : ""}`;

  return (
    <div className={className}>
      <fieldset>
        <legend className="text-[0.6875rem] font-medium uppercase tracking-[0.22em] text-muted-foreground">Kies je uitvoering</legend>
        <div className={cn("mt-4 grid grid-cols-2 gap-2", compact ? "sm:grid-cols-4" : "lg:grid-cols-4")}>
          {UITVOERINGEN.map((o) => {
            const on = o.slug === selected;
            return (
              <label
                key={o.slug}
                className={cn(
                  "group flex cursor-pointer rounded-sm border transition-colors duration-300 has-[:focus-visible]:ring-1 has-[:focus-visible]:ring-ring has-[:focus-visible]:ring-offset-2",
                  compact ? "flex-col items-start gap-2 p-3" : "items-center gap-4 p-4",
                  on ? "border-primary bg-primary text-primary-foreground" : "border-input bg-background hover:border-foreground",
                )}
              >
                <input
                  type="radio"
                  name="uitvoering"
                  value={o.slug}
                  checked={on}
                  onChange={() => setSelected(o.slug)}
                  className="sr-only"
                />
                <UitvoeringIcon slug={o.slug} className={compact ? "size-8" : "size-10"} />
                <span className="min-w-0">
                  <span className={cn("block font-display leading-tight", compact ? "text-base" : "text-xl")}>{o.label}</span>
                  {!compact && (
                    <span className={cn("mt-0.5 block text-[0.8125rem] leading-snug", on ? "text-primary-foreground/70" : "text-muted-foreground")}>
                      {o.beweging}
                    </span>
                  )}
                </span>
              </label>
            );
          })}
        </div>
      </fieldset>
      {note && <p className="mt-3 text-[0.8125rem] text-muted-foreground">{note}</p>}

      <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-4">
        <Link href={href} className={button({ size: "lg" })}>
          Vraag een voorstel voor {subject}
          {u ? ` als ${u.label.toLowerCase()}` : ""} <Arrow />
        </Link>
        {u && (
          <Link href={u.href} className={cn(button({ variant: "text" }))}>
            Meer over {u.plural.toLowerCase()}
          </Link>
        )}
      </div>
    </div>
  );
}
