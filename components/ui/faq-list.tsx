import { PlusIcon } from "@/components/icons";
import type { QA } from "@/data/service";

/** Accordion built on <details>: no client JS, all answers in the HTML. */
export function FaqList({ items }: { items: QA[] }) {
  return (
    <div className="divide-y divide-line/30 border-y border-line/30">
      {items.map((item) => (
        <details key={item.question} className="group">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-6 py-5 text-left [&::-webkit-details-marker]:hidden">
            <span className="font-display text-lg text-ink sm:text-xl">{item.question}</span>
            <PlusIcon className="size-5 shrink-0 text-forest transition-transform duration-300 group-open:rotate-45" />
          </summary>
          <div className="pb-6 pr-10">
            {item.answer.length === 1 ? (
              <p className="leading-relaxed text-ink/80">{item.answer[0]}</p>
            ) : (
              <ul className="space-y-2">
                {item.answer.map((a) => (
                  <li key={a} className="flex gap-3 leading-relaxed text-ink/80">
                    <span aria-hidden className="mt-3 h-px w-3 shrink-0 bg-accent" />
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
