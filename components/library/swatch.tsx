import Image from "next/image";
import type { Material } from "@/data/materialenbibliotheek";
import { cn } from "@/lib/utils";

/** A material's swatch: a photo crop, or a colour chip for profiles and stone. Fills its (relative) parent. */
export function Swatch({ material, sizes, className, priority }: { material: Material; sizes: string; className?: string; priority?: boolean }) {
  if ("src" in material.swatch) {
    return (
      <Image
        src={material.swatch.src}
        alt={material.swatch.alt}
        fill
        priority={priority}
        sizes={sizes}
        className={cn("object-cover", className)}
      />
    );
  }
  return (
    <div
      role="img"
      aria-label={`Kleurstaal ${material.name}`}
      className={cn("absolute inset-0", className)}
      style={{ background: material.swatch.chip }}
    />
  );
}
