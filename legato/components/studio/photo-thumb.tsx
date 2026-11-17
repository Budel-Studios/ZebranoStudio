"use client";

import { usePhotoUrl } from "@/components/book/use-photo-url";
import { cn } from "@/lib/utils";

export function PhotoThumb({ id, className, draggable }: { id: string; className?: string; draggable?: boolean }) {
  const url = usePhotoUrl(id);
  return url ? (
    // eslint-disable-next-line @next/next/no-img-element -- object URL from IndexedDB
    <img src={url} alt="" loading="lazy" draggable={draggable} onDragStart={draggable ? (e) => e.dataTransfer.setData("text/photo-id", id) : undefined} className={cn("h-full w-full object-cover", className)} />
  ) : (
    <div className={cn("h-full w-full animate-pulse bg-linen", className)} />
  );
}
