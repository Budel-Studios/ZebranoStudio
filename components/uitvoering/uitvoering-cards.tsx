import Image from "next/image";
import Link from "next/link";
import { UitvoeringIcon } from "@/components/uitvoering-icon";
import { Arrow } from "@/components/ui/arrow";
import { Reveal } from "@/components/ui/reveal";
import { UITVOERINGEN, type UitvoeringSlug } from "@/data/uitvoeringen";
import { cn } from "@/lib/utils";

/**
 * The uitvoeringen as image cards (the Lovable "Deurtypes" cards): photo with
 * the line drawing in a chip — it shows the movement when you hover the
 * card — then number, name and how it opens. Scrolls sideways on mobile.
 */
export function UitvoeringCards({ slugs, className }: { slugs?: UitvoeringSlug[]; className?: string }) {
  const items = slugs ? UITVOERINGEN.filter((u) => slugs.includes(u.slug)) : UITVOERINGEN;
  return (
    <div
      className={cn(
        "no-scrollbar -mx-4 flex snap-x gap-4 overflow-x-auto px-4 sm:-mx-8 sm:px-8 lg:mx-0 lg:grid lg:overflow-visible lg:px-0",
        items.length === 4 ? "lg:grid-cols-4" : "lg:grid-cols-3",
        className,
      )}
    >
      {items.map((u, i) => (
        <Reveal key={u.slug} delay={i * 70} className="w-[68vw] shrink-0 snap-start sm:w-[42vw] lg:w-auto">
          <Link href={u.href} className="group block">
            <div className="relative aspect-[3/4] overflow-hidden rounded-sm bg-muted">
              <Image
                src={u.image.src}
                alt={u.image.alt}
                fill
                sizes="(min-width: 1024px) 25vw, (min-width: 640px) 42vw, 68vw"
                className="img-zoom object-cover"
              />
              <span className="absolute bottom-3 left-3 flex rounded-sm bg-background/90 p-1.5 text-foreground backdrop-blur">
                <UitvoeringIcon slug={u.slug} className="size-10" />
              </span>
            </div>
            <div className="mt-4 flex items-start justify-between gap-3">
              <div>
                <p className="text-[0.6875rem] tabular-nums text-muted-foreground">{String(i + 1).padStart(2, "0")}</p>
                <p className="mt-1 font-display text-2xl">
                  <span className="link-line">{u.label}</span>
                </p>
                <p className="mt-1 text-sm text-muted-foreground">{u.beweging}</p>
              </div>
              <Arrow diagonal={false} className="mt-6 text-muted-foreground" />
            </div>
          </Link>
        </Reveal>
      ))}
    </div>
  );
}
