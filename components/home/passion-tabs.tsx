"use client";

import Image from "next/image";
import { useId, useState } from "react";
import { MinusIcon, PlusIcon } from "@/components/icons";
import { cn } from "@/lib/utils";

export type PassionItem = {
  label: string;
  title: string;
  text: string;
  image: { src: string; alt: string };
};

/**
 * "Passie voor hout. Precisie in design." — accordion on the left, the image
 * on the right follows the open item (as on the original homepage).
 */
export function PassionTabs({ items }: { items: PassionItem[] }) {
  const [active, setActive] = useState(0);
  const baseId = useId();
  return (
    <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
      <div className="divide-y divide-line/40 border-y border-line/40">
        {items.map((item, i) => {
          const open = active === i;
          return (
            <div key={item.label}>
              <button
                type="button"
                aria-expanded={open}
                aria-controls={`${baseId}-${i}`}
                onClick={() => setActive(i)}
                className="flex w-full items-center justify-between gap-4 py-5 text-left"
              >
                <span className="font-sans text-sm font-semibold uppercase tracking-[0.14em] text-bark">{item.label}</span>
                {open ? <MinusIcon className="size-5 text-forest" /> : <PlusIcon className="size-5 text-forest" />}
              </button>
              <div
                id={`${baseId}-${i}`}
                inert={!open}
                className={cn("grid transition-[grid-template-rows] duration-500 ease-zebrano", open ? "grid-rows-[1fr]" : "grid-rows-[0fr]")}
              >
                <div className="min-h-0 overflow-hidden">
                  <div className="pb-6">
                    <h3 className="font-display text-2xl font-light text-ink sm:text-3xl">{item.title}</h3>
                    <p className="mt-3 max-w-lg leading-relaxed text-ink/80">{item.text}</p>
                    <div className="relative mt-6 aspect-[4/3] overflow-hidden rounded-lg lg:hidden">
                      <Image src={item.image.src} alt={item.image.alt} fill sizes="100vw" className="object-cover" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div className="relative hidden aspect-[4/5] overflow-hidden rounded-lg lg:block">
        {items.map((item, i) => (
          <Image
            key={item.image.src}
            src={item.image.src}
            alt={active === i ? item.image.alt : ""}
            aria-hidden={active !== i}
            fill
            sizes="45vw"
            className={cn("object-cover transition-opacity duration-700", active === i ? "opacity-100" : "opacity-0")}
          />
        ))}
      </div>
    </div>
  );
}
