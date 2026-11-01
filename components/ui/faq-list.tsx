import { Minus, Plus } from "lucide-react";
import type { QA } from "@/data/service";

/**
 * Accordion in the Lovable style (hairlines, light display type, plus/minus),
 * built on <details>: no client JS and every answer is in the HTML.
 */
export function FaqList({ items }: { items: QA[] }) {
  return (
    <div className="border-t border-foreground/15">
      {items.map((item) => (
        <details key={item.question} className="group border-b border-foreground/15">
          <summary className="flex cursor-pointer items-center justify-between gap-6 py-5 text-left">
            <span className="font-display text-xl font-light sm:text-[1.375rem]">{item.question}</span>
            <Plus strokeWidth={1} aria-hidden className="size-5 shrink-0 group-open:hidden" />
            <Minus strokeWidth={1} aria-hidden className="hidden size-5 shrink-0 group-open:block" />
          </summary>
          <div className="pb-7 pr-10">
            {item.answer.length === 1 ? (
              <p className="max-w-2xl leading-relaxed text-muted-foreground">{item.answer[0]}</p>
            ) : (
              <ul className="max-w-2xl space-y-2">
                {item.answer.map((a) => (
                  <li key={a} className="flex gap-3 leading-relaxed text-muted-foreground">
                    <span aria-hidden className="mt-3 h-px w-3 shrink-0 bg-copper" />
                    <p>{a}</p>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </details>
      ))}
    </div>
  );
}
