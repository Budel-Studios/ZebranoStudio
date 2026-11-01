import Image from "next/image";
import Link from "next/link";
import { Arrow } from "@/components/ui/arrow";
import { button } from "@/components/ui/button";
import { container } from "@/components/ui/primitives";
import { Reveal } from "@/components/ui/reveal";
import { collecties } from "@/data/collecties";
import { cn } from "@/lib/utils";

/** "Andere collecties" — the other three collections, like "Andere ontwerpen" on a glass design page. */
export function OtherCollections({ current }: { current: string }) {
  const others = collecties.filter((c) => c.slug !== current);
  return (
    <section className={cn(container, "pb-24 lg:pb-32")}>
      <div className="border-t pt-12">
        <Reveal className="flex flex-wrap items-end justify-between gap-6">
          <h2 className="text-3xl sm:text-4xl">Andere collecties</h2>
          <Link href="/collecties" className={button({ variant: "outline", size: "sm" })}>
            Alle collecties <Arrow />
          </Link>
        </Reveal>
        <ul className="mt-10 grid gap-x-5 gap-y-10 sm:grid-cols-3">
          {others.map((c, i) => (
            <Reveal as="li" key={c.slug} delay={i * 70}>
              <Link href={`/collecties/${c.slug}`} className="group block">
                <div className="relative aspect-[4/3] overflow-hidden rounded-sm bg-muted">
                  <Image
                    src={c.hero.src}
                    alt={c.hero.alt}
                    fill
                    sizes="(min-width: 640px) 33vw, 100vw"
                    className="img-zoom object-cover"
                  />
                </div>
                <div className="mt-4 flex items-center justify-between gap-3 border-b pb-4">
                  <h3 className="text-2xl">
                    <span className="link-line">{c.name}</span>
                  </h3>
                  <Arrow className="text-muted-foreground" />
                </div>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{c.tagline}</p>
              </Link>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
