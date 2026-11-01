import Link from "next/link";
import { Swatch } from "@/components/library/swatch";
import { Arrow } from "@/components/ui/arrow";
import { getCategory, type Material } from "@/data/materialenbibliotheek";

/** Library card: swatch, name and code, then category · tone · intensity. */
export function MaterialCard({ material: m, priority }: { material: Material; priority?: boolean }) {
  return (
    <Link href={`/materialenbibliotheek/${m.slug}`} className="group block">
      <div className="relative aspect-[4/3] overflow-hidden rounded-sm bg-muted">
        <Swatch
          material={m}
          priority={priority}
          sizes="(min-width: 1280px) 25vw, (min-width: 640px) 45vw, 100vw"
          className="img-zoom"
        />
      </div>
      <div className="mt-4 flex items-baseline justify-between gap-4 border-b pb-3">
        <h3 className="text-2xl">
          <span className="link-line">{m.name}</span>
        </h3>
        <span className="flex items-center gap-3">
          <span className="text-[0.6875rem] tabular-nums tracking-[0.2em] text-copper">{m.code}</span>
          <Arrow className="text-muted-foreground" />
        </span>
      </div>
      <p className="mt-3 text-[0.8125rem] text-muted-foreground">
        {getCategory(m.category).label} · {m.tone.join(", ")} · {m.intensity}
      </p>
    </Link>
  );
}
