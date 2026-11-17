"use client";

import { useEffect, useState } from "react";
import { SpreadView } from "@/components/book/spread-view";
import { COVER_MATERIALS, formatOf } from "@/lib/book/catalog";
import { preflight } from "@/lib/book/preflight";
import { loadProject, loadStudio } from "@/lib/book/store";
import type { Project, StudioSettings } from "@/lib/book/types";
import { BRAND } from "@/lib/brand";
import { btnOutline, btnPrimary } from "./ui";

/**
 * Print file: one PDF page per spread at true size plus bleed. The browser's
 * "save as PDF" produces the file; photographs are the untouched originals.
 */
export function PrintView({ id }: { id: string }) {
  const [project, setProject] = useState<Project | null | undefined>(undefined);
  const [studio, setStudio] = useState<StudioSettings | null>(null);
  const [loaded, setLoaded] = useState(false);
  useEffect(() => {
    loadProject(id).then((p) => setProject(p ?? null));
    loadStudio().then(setStudio);
  }, [id]);

  useEffect(() => {
    if (!project) return;
    let alive = true;
    const check = async () => {
      await document.fonts.ready;
      const frames = project.spreads.flatMap((s) => s.frames).filter((f) => f.kind === "image" && f.photoId).length;
      const imgs = [...document.querySelectorAll<HTMLImageElement>(".lg-sheet img")];
      const done = imgs.length >= frames && imgs.every((i) => i.complete && i.naturalWidth > 0);
      if (!alive) return;
      if (done) setLoaded(true); else setTimeout(check, 400);
    };
    void check();
    return () => {
      alive = false;
    };
  }, [project]);

  if (project === undefined || !studio) return <p className="p-10 text-sm">Drukbestand opbouwen…</p>;
  if (project === null) return <p className="p-10 text-sm">Dit boek staat niet in deze browser.</p>;

  const blocking = preflight(project, studio).filter((i) => i.level === "blokkerend");
  const f = formatOf(project.formatId);
  const b = studio.bleedMm;
  const W = f.pageW * 2 + 2 * b, H = f.pageH + 2 * b;
  const material = COVER_MATERIALS.find((m) => m.id === project.cover.material);
  const color = material?.colors.find((c) => c.id === project.cover.color);

  return (
    <div className="bg-neutral-200 print:bg-white">
      <style>{`@page { size: ${W}mm ${H}mm; margin: 0 } @media print { html, body { background: #fff !important } .lg-sheet { margin: 0 !important; box-shadow: none !important } }`}</style>
      <div className="sticky top-0 z-10 flex flex-wrap items-center gap-4 border-b bg-background px-5 py-3 print:hidden">
        <div className="min-w-0 flex-1">
          <p className="font-display text-xl">{project.title}, drukbestand</p>
          <p className="text-xs text-muted-foreground">{project.spreads.length} spreads, pagina {W} × {H} mm (snijformaat {f.pageW * 2} × {f.pageH} mm + {b} mm afloop), omslag: {material?.name} {color?.name?.toLowerCase()}, {project.cover.debossing === "blind" ? "blinddruk" : `${project.cover.debossing}folie`} “{project.cover.title}”</p>
        </div>
        <button type="button" className={btnOutline} onClick={() => window.close()}>Sluiten</button>
        <button type="button" className={btnPrimary} onClick={() => window.print()} disabled={!loaded}>{loaded ? "Bewaar als PDF" : "Foto's laden…"}</button>
      </div>
      <p className="mx-auto max-w-3xl px-5 py-4 text-xs leading-relaxed text-neutral-600 print:hidden">
        Kies in het afdrukvenster &ldquo;Opslaan als PDF&rdquo;, marges &ldquo;Geen&rdquo; en zet &ldquo;Achtergrondafbeeldingen&rdquo; aan. Het papierformaat staat al goed. Controleer de maten tegen de sjablonen van {BRAND.printer} voordat je de eerste keer bestelt; de browser levert RGB zonder ingesloten profiel, dus laat een eerste proef drukken.
      </p>
      {blocking.length > 0 && (
        <p className="mx-auto mb-4 max-w-3xl border border-red-600 bg-red-50 px-4 py-3 text-sm text-red-800 print:hidden" role="alert">Dit bestand is nog niet drukklaar: {blocking.length} blokkerend{blocking.length === 1 ? " punt" : "e punten"} in de drukcontrole ({blocking[0].text}). Gebruik het alleen als proef.</p>
      )}
      {project.spreads.map((s) => (
        <div key={s.id} className="lg-sheet mx-auto mb-6 overflow-hidden bg-white shadow-lg" style={{ width: `${W}mm`, height: `${H}mm`, padding: `${b}mm`, breakAfter: "page", breakInside: "avoid" }}>
          <SpreadView spread={s} formatId={project.formatId} style={project.style} print={{ bleedMm: b }} />
        </div>
      ))}
    </div>
  );
}
