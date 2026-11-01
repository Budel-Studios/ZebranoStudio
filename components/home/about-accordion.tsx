"use client";

import Image from "next/image";
import Link from "next/link";
import { Minus, Plus } from "lucide-react";
import { useState } from "react";
import { Arrow } from "@/components/ui/arrow";
import { button } from "@/components/ui/button";
import type { Img } from "@/lib/images";
import { cn } from "@/lib/utils";

export type AboutItem = { label: string; title: string; text: string; image: Img };

/**
 * "Passie voor hout" — one item open at a time; the image on the right
 * cross-fades to the open item (Lovable design).
 */
export function AboutAccordion({ items }: { items: AboutItem[] }) {
  const [open, setOpen] = useState(0);

  return (
    <div className="mt-16 grid gap-12 lg:grid-cols-12 lg:gap-16">
      <div className="lg:col-span-5">
        <ul className="border-t border-foreground/15">
          {items.map((item, i) => {
            const isOpen = open === i;
            return (
              <li key={item.label} className="border-b border-foreground/15">
                <button
                  type="button"
                  onClick={() => setOpen(i)}
                  aria-expanded={isOpen}
                  aria-controls={`over-${i}`}
                  className="flex w-full items-center justify-between py-5 text-left text-[0.75rem] font-medium uppercase tracking-[0.2em]"
                >
                  <span className={cn("transition-colors", isOpen ? "text-foreground" : "text-muted-foreground")}>
                    {item.label}
                  </span>
                  {isOpen ? <Minus strokeWidth={1} className="size-4" /> : <Plus strokeWidth={1} className="size-4" />}
                </button>
                <div
                  id={`over-${i}`}
                  className={cn(
                    "grid transition-[grid-template-rows] duration-700 ease-door",
                    isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
                  )}
                >
                  <div className="overflow-hidden">
                    <div className="pb-7">
                      <h3 className="text-3xl">{item.title}</h3>
                      <p className="mt-3 max-w-md leading-relaxed text-muted-foreground">{item.text}</p>
                    </div>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
        <Link href="/collecties" className={cn(button({ variant: "primary" }), "mt-10")}>
          Bekijk de collecties <Arrow />
        </Link>
      </div>

      <div className="lg:col-span-7">
        <div className="relative aspect-[4/5] overflow-hidden rounded-sm bg-muted sm:aspect-[5/4] lg:aspect-[6/5]">
          {items.map((item, i) => (
            <Image
              key={item.label}
              src={item.image.src}
              alt={item.image.alt}
              fill
              sizes="(min-width: 1024px) 55vw, 100vw"
              className={cn(
                "object-cover transition-all duration-1000 ease-door",
                open === i ? "scale-100 opacity-100" : "scale-[1.02] opacity-0",
              )}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
