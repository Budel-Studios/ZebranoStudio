import Image from "next/image";
import Link from "next/link";
import { Reveal } from "@/components/ui/reveal";
import { collecties } from "@/data/collecties";
import { GLASS_DOORS } from "@/data/glasdeuren";
import type { Uitvoering } from "@/data/uitvoeringen";
import { cn } from "@/lib/utils";

/**
 * "Elk ontwerp, ook als …" on a door page: the five glass designs and the
 * other collections, each linking to its page with this uitvoering already
 * chosen (?uitvoering=…), so the request button there matches.
 */
export function OntwerpCards({ uitvoering, className }: { uitvoering: Uitvoering; className?: string }) {
  const q = `?uitvoering=${uitvoering.slug}`;
  const items = [
    ...GLASS_DOORS.map((d) => ({
      key: d.slug,
      href: `/collecties/glas/${d.slug}${q}`,
      image: d.image,
      name: d.name,
      sub: `Glas · ${d.glass.toLowerCase()}`,
    })),
    ...collecties
      .filter((c) => c.slug !== "glas")
      .map((c) => ({ key: c.slug, href: `/collecties/${c.slug}${q}`, image: c.hero, name: c.name, sub: "Collectie" })),
  ];
  return (
    <ul
      className={cn(
        "no-scrollbar -mx-4 flex snap-x gap-4 overflow-x-auto px-4 sm:-mx-8 sm:px-8 lg:mx-0 lg:grid lg:grid-cols-4 lg:gap-x-5 lg:gap-y-10 lg:overflow-visible lg:px-0",
        className,
      )}
    >
      {items.map((it, i) => (
        <Reveal as="li" key={it.key} delay={(i % 4) * 70} className="w-[58vw] shrink-0 snap-start sm:w-[36vw] lg:w-auto">
          <Link href={it.href} className="group block">
            <div className="relative aspect-[4/5] overflow-hidden rounded-sm bg-muted">
              <Image
                src={it.image.src}
                alt={it.image.alt}
                fill
                sizes="(min-width: 1024px) 25vw, (min-width: 640px) 36vw, 58vw"
                className="img-zoom object-cover"
              />
            </div>
            <div className="mt-4 flex items-baseline justify-between gap-3 border-b pb-3">
              <h3 className="text-2xl">
                <span className="link-line">{it.name}</span>
              </h3>
              <span className="text-right text-[0.8125rem] text-muted-foreground">{it.sub}</span>
            </div>
          </Link>
        </Reveal>
      ))}
    </ul>
  );
}
