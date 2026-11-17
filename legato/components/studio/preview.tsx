"use client";

import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { useEffect, useState } from "react";
import { SpreadView } from "@/components/book/spread-view";
import { formatOf } from "@/lib/book/catalog";
import type { Project } from "@/lib/book/types";
import { CoverMock } from "./cover-mock";

/** Full-screen proof: leaf through the book spread by spread. */
export function Preview({ project, onClose }: { project: Project; onClose: () => void }) {
  const [i, setI] = useState(-1);
  const max = project.spreads.length - 1;
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") setI((n) => Math.min(max, n + 1));
      if (e.key === "ArrowLeft") setI((n) => Math.max(-1, n - 1));
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [max, onClose]);
  const spread = project.spreads[i];
  const f = formatOf(project.formatId);
  const chapter = project.chapters.find((c) => c.id === spread?.chapterId);
  return (
    <div className="fixed inset-0 z-50 flex flex-col bg-[#161412] text-white/80" role="dialog" aria-modal="true" aria-label="Voorvertoning">
      <div className="flex items-center justify-between px-5 py-3 text-xs tracking-[0.14em]">
        <span className="uppercase">{i < 0 ? "Omslag" : `${chapter?.title ?? "Boek"} · pagina ${i * 2 + 1}–${i * 2 + 2} van ${project.spreads.length * 2}`}</span>
        <button type="button" onClick={onClose} className="flex items-center gap-2 uppercase hover:text-white"><X className="h-4 w-4" /> Sluiten</button>
      </div>
      <div className="flex min-h-0 flex-1 items-center justify-center gap-3 px-3 pb-6">
        <button type="button" onClick={() => setI((n) => Math.max(-1, n - 1))} disabled={i < 0} className="p-2 disabled:opacity-20" aria-label="Vorige"><ChevronLeft className="h-7 w-7" strokeWidth={1} /></button>
        <div className="flex h-full min-w-0 flex-1 items-center justify-center">
          {spread ? (
            <div className="w-full" style={{ maxWidth: "min(100%, calc((100dvh - 9rem) * var(--ar)))", ["--ar" as string]: String((f.pageW * 2) / f.pageH) }}>
              <SpreadView key={spread.id} spread={spread} formatId={project.formatId} style={project.style} />
            </div>
          ) : (
            <div className="h-[min(70dvh,34rem)]"><CoverMock project={project} /></div>
          )}
        </div>
        <button type="button" onClick={() => setI((n) => Math.min(max, n + 1))} disabled={i >= max} className="p-2 disabled:opacity-20" aria-label="Volgende"><ChevronRight className="h-7 w-7" strokeWidth={1} /></button>
      </div>
    </div>
  );
}
