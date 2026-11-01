import Image from "next/image";
import Link from "next/link";
import { Arrow } from "@/components/ui/arrow";
import { Reveal } from "@/components/ui/reveal";
import { NAV } from "@/lib/navigation";
import { cn } from "@/lib/utils";

/** Door types and boiserie as cards (image, number, name, one line) — the homepage "Deurtypes" cards. */
export function DoorCards({ hrefs, className }: { hrefs: string[]; className?: string }) {
  const all = NAV.find((g) => g.id === "deuren")?.items ?? [];
  const items = hrefs.map((h) => all.find((i) => i.href === h)).filter((i): i is (typeof all)[number] => !!i);
  return (
    <div
      className={cn(
        "no-scrollbar -mx-4 flex snap-x gap-4 overflow-x-auto px-4 sm:-mx-8 sm:px-8 lg:mx-0 lg:grid lg:overflow-visible lg:px-0",
        items.length >= 5 ? "lg:grid-cols-5" : items.length === 4 ? "lg:grid-cols-4" : "lg:grid-cols-3",
        className,
      )}
    >
      {items.map((d, i) => (
        <Reveal key={d.href} delay={i * 70} className="w-[68vw] shrink-0 snap-start sm:w-[42vw] lg:w-auto">
          <Link href={d.href} className="group block">
            <div className="relative aspect-[3/4.4] overflow-hidden rounded-sm bg-muted">
              {d.image && (
                <Image
                  src={d.image.src}
                  alt={d.image.alt}
                  fill
                  sizes="(min-width: 1024px) 20vw, (min-width: 640px) 42vw, 68vw"
                  className="img-zoom object-cover"
                />
              )}
            </div>
            <div className="mt-4 flex items-start justify-between gap-3">
              <div>
                <p className="text-[0.6875rem] tabular-nums text-muted-foreground">{String(i + 1).padStart(2, "0")}</p>
                <p className="mt-1 font-display text-xl">
                  <span className="link-line">{d.label}</span>
                </p>
                {d.note && <p className="mt-1 text-sm text-muted-foreground">{d.note}</p>}
              </div>
              <Arrow diagonal={false} className="mt-6 text-muted-foreground" />
            </div>
          </Link>
        </Reveal>
      ))}
    </div>
  );
}
