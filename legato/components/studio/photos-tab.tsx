"use client";

import { Heart, Star, Trash2, Upload } from "lucide-react";
import { useRef, useState } from "react";
import { importFiles, removePhoto } from "@/lib/book/store";
import type { Photo } from "@/lib/book/types";
import { cn } from "@/lib/utils";
import type { TabProps } from "./editor";
import { PhotoThumb } from "./photo-thumb";
import { btnOutline, btnPrimary } from "./ui";

export function PhotosTab({ project, update, role }: TabProps) {
  const [filter, setFilter] = useState<string>("alle");
  const [picked, setPicked] = useState<Set<string>>(new Set());
  const [busy, setBusy] = useState<string | null>(null);
  const [over, setOver] = useState(false);
  const input = useRef<HTMLInputElement>(null);
  const photographer = role === "fotograaf";

  const shown = project.photos
    .filter((p) => filter === "alle" || (filter === "geen" ? !p.chapterId : filter === "favoriet" ? p.favorite : p.chapterId === filter))
    .sort((a, b) => a.takenAt - b.takenAt);
  const usedIds = new Set(project.spreads.flatMap((s) => s.frames.flatMap((f) => (f.kind === "image" && f.photoId ? [f.photoId] : []))));

  const add = async (files: File[]) => {
    const images = files.filter((f) => f.type.startsWith("image/"));
    if (!images.length) return;
    setBusy(`0/${images.length}`);
    const chapterId = project.chapters.some((c) => c.id === filter) ? filter : undefined;
    const photos = await importFiles(images, chapterId, (n) => setBusy(`${n}/${images.length}`));
    update((p) => ({ ...p, photos: [...p.photos, ...photos] }));
    setBusy(photos.length < images.length ? `${images.length - photos.length} bestand(en) konden niet worden gelezen` : null);
    if (photos.length < images.length) setTimeout(() => setBusy(null), 5000);
  };

  const patch = (ids: Iterable<string>, change: Partial<Photo>) => {
    const set = new Set(ids);
    update((p) => ({ ...p, photos: p.photos.map((ph) => (set.has(ph.id) ? { ...ph, ...change } : ph)) }));
  };
  const toggle = (id: string) => setPicked((s) => {
    const n = new Set(s);
    if (n.has(id)) n.delete(id); else n.add(id);
    return n;
  });
  const spreadEvenly = () => {
    if (!project.chapters.length) return;
    const loose = project.photos.filter((p) => !p.chapterId).sort((a, b) => a.takenAt - b.takenAt);
    const per = Math.ceil(loose.length / project.chapters.length);
    const map = new Map(loose.map((p, i) => [p.id, project.chapters[Math.min(project.chapters.length - 1, Math.floor(i / per))].id]));
    update((p) => ({ ...p, photos: p.photos.map((ph) => (map.has(ph.id) ? { ...ph, chapterId: map.get(ph.id) } : ph)) }));
  };
  const remove = async () => {
    if (!confirm(`${picked.size} foto('s) verwijderen uit dit boek?`)) return;
    const ids = new Set(picked);
    update((p) => ({
      ...p,
      photos: p.photos.filter((ph) => !ids.has(ph.id)),
      spreads: p.spreads.map((s) => ({ ...s, frames: s.frames.map((f) => (f.kind === "image" && f.photoId && ids.has(f.photoId) ? { ...f, photoId: undefined } : f)) })),
    }));
    await Promise.all([...ids].map(removePhoto));
    setPicked(new Set());
  };

  const chips: Array<{ id: string; label: string; n: number }> = [
    { id: "alle", label: "Alle", n: project.photos.length },
    { id: "favoriet", label: "Favorieten", n: project.photos.filter((p) => p.favorite).length },
    { id: "geen", label: "Zonder hoofdstuk", n: project.photos.filter((p) => !p.chapterId).length },
    ...project.chapters.map((c) => ({ id: c.id, label: c.title, n: project.photos.filter((p) => p.chapterId === c.id).length })),
  ];
  const looseCount = chips[2].n;

  return (
    <div className="mx-auto max-w-7xl p-5">
      {photographer && (
        <div onDragOver={(e) => { e.preventDefault(); setOver(true); }} onDragLeave={() => setOver(false)}
          onDrop={(e) => { e.preventDefault(); setOver(false); add([...e.dataTransfer.files]); }}
          className={cn("flex flex-col items-center gap-3 rounded-sm border border-dashed px-6 py-8 text-center transition-colors", over ? "border-primary bg-blush/30" : "bg-card")}>
          <Upload className="h-6 w-6 text-gold" strokeWidth={1.25} />
          <p className="text-sm">Sleep foto&apos;s hierheen of <button type="button" className="underline decoration-gold underline-offset-4" onClick={() => input.current?.click()}>kies bestanden</button></p>
          <p className="max-w-lg text-xs leading-relaxed text-muted-foreground">JPEG op volle resolutie, zoals je ze uit Lightroom exporteert. De originelen blijven onaangeroerd voor de druk{project.chapters.some((c) => c.id === filter) ? `; nieuwe foto's komen in “${project.chapters.find((c) => c.id === filter)?.title}”` : ""}.</p>
          {busy && <p className="text-xs font-medium" role="status">Importeren: {busy}</p>}
          <input ref={input} type="file" accept="image/*" multiple hidden onChange={(e) => { add([...(e.target.files ?? [])]); e.target.value = ""; }} />
        </div>
      )}

      <div className="mt-5 flex flex-wrap gap-1.5">
        {chips.map((c) => (
          <button key={c.id} type="button" onClick={() => setFilter(c.id)} className={cn("rounded-full border px-3 py-1 text-xs transition-colors", filter === c.id ? "border-foreground bg-foreground text-background" : "text-muted-foreground hover:border-foreground/50 hover:text-foreground")}>
            {c.label} <span className="opacity-60">{c.n}</span>
          </button>
        ))}
      </div>

      {photographer && (picked.size > 0 || looseCount > 0) && (
        <div className="sticky top-[5.6rem] z-20 mt-4 flex flex-wrap items-center gap-2 rounded-sm border bg-background/95 px-3 py-2 backdrop-blur">
          {picked.size > 0 ? (
            <>
              <span className="text-sm">{picked.size} geselecteerd</span>
              <select className="rounded-sm border border-input bg-card px-2 py-1.5 text-sm" value="" onChange={(e) => { if (e.target.value) { patch(picked, { chapterId: e.target.value === "-" ? undefined : e.target.value }); setPicked(new Set()); } }} aria-label="Wijs toe aan hoofdstuk">
                <option value="">Wijs toe aan hoofdstuk…</option>
                {project.chapters.map((c) => <option key={c.id} value={c.id}>{c.title}</option>)}
                <option value="-">Geen hoofdstuk</option>
              </select>
              <button type="button" className={btnOutline} onClick={() => setPicked(new Set())}>Selectie opheffen</button>
              <button type="button" className={btnOutline} onClick={remove}><Trash2 className="h-4 w-4" strokeWidth={1.5} /> Verwijder</button>
            </>
          ) : (
            <>
              <span className="text-sm">{looseCount} foto&apos;s zonder hoofdstuk</span>
              <button type="button" className={btnPrimary} onClick={spreadEvenly}>Verdeel op volgorde van opname</button>
              <span className="text-xs text-muted-foreground">Gelijkmatig over de hoofdstukken; daarna schuif je bij.</span>
            </>
          )}
          <button type="button" className={cn(btnOutline, "ml-auto")} onClick={() => setPicked(new Set(shown.map((p) => p.id)))}>Selecteer alles in beeld</button>
        </div>
      )}

      {project.photos.some((p) => p.placeholder) && <p className="mt-4 text-xs text-muted-foreground">Dit voorbeeldboek gebruikt geschilderde demobeelden, geen echte foto&apos;s.</p>}

      <ul className="mt-4 grid grid-cols-3 gap-2 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8">
        {shown.map((p) => {
          const chapter = project.chapters.find((c) => c.id === p.chapterId);
          return (
            <li key={p.id} className={cn("group relative aspect-square overflow-hidden rounded-sm bg-linen", picked.has(p.id) && "ring-2 ring-primary ring-offset-2 ring-offset-background")}>
              <button type="button" className="block h-full w-full" onClick={() => photographer && toggle(p.id)} aria-pressed={picked.has(p.id)} aria-label={`Foto ${p.name}`}><PhotoThumb id={p.id} /></button>
              <div className="pointer-events-none absolute inset-x-0 bottom-0 flex items-end justify-between bg-gradient-to-t from-black/55 to-transparent p-1.5 pt-6 text-[0.625rem] text-white">
                <span className="truncate">{chapter?.title ?? "—"}</span>
                {usedIds.has(p.id) && <span className="rounded-full bg-white/25 px-1.5">in boek</span>}
              </div>
              <div className="absolute right-1 top-1 flex gap-1">
                <button type="button" onClick={() => patch([p.id], { favorite: !p.favorite })} aria-pressed={Boolean(p.favorite)} aria-label="Favoriet van het bruidspaar" title="Favoriet van het bruidspaar: moet in het boek"
                  className={cn("flex h-6 w-6 items-center justify-center rounded-full bg-black/35 text-white transition-opacity", p.favorite ? "opacity-100" : "opacity-0 group-hover:opacity-100 focus:opacity-100")}>
                  <Heart className="h-3.5 w-3.5" fill={p.favorite ? "currentColor" : "none"} />
                </button>
                {photographer && (
                  <button type="button" onClick={() => patch([p.id], { hero: !p.hero })} aria-pressed={Boolean(p.hero)} aria-label="Keuze van de fotograaf" title="Keuze van de fotograaf: verdient een groot kader"
                    className={cn("flex h-6 w-6 items-center justify-center rounded-full bg-black/35 text-white transition-opacity", p.hero ? "opacity-100" : "opacity-0 group-hover:opacity-100 focus:opacity-100")}>
                    <Star className="h-3.5 w-3.5" fill={p.hero ? "currentColor" : "none"} />
                  </button>
                )}
              </div>
            </li>
          );
        })}
      </ul>
      {shown.length === 0 && <p className="mt-10 text-center text-sm text-muted-foreground">Geen foto&apos;s in deze selectie.</p>}
    </div>
  );
}
