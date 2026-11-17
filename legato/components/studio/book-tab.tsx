"use client";

import { ArrowDown, ArrowUp, Check, Copy, ImagePlus, Lock, LockOpen, MessageSquare, Plus, Ruler, Sparkles, Trash2, Type } from "lucide-react";
import { useMemo, useRef, useState } from "react";
import { SpreadView } from "@/components/book/spread-view";
import { alternatives } from "@/lib/book/autodesign";
import { plansFromAi } from "@/lib/book/from-ai";
import { buildSpread, planOf, templateOf, TEMPLATES, uid } from "@/lib/book/templates";
import type { Frame, ImageFrame, Spread, SpreadBackground, TextFrame, TextRole } from "@/lib/book/types";
import { cn } from "@/lib/utils";
import type { TabProps } from "./editor";
import { PhotoThumb } from "./photo-thumb";
import { btnGhost, btnOutline, btnPrimary, Dialog, Field, iconBtn, inputCls, Segmented } from "./ui";

const ROLES: Array<{ value: TextRole; label: string }> = [
  { value: "title", label: "Titel" }, { value: "subtitle", label: "Ondertitel" }, { value: "kicker", label: "Bovenkop" }, { value: "body", label: "Leestekst" },
  { value: "quote", label: "Citaat" }, { value: "attribution", label: "Naam" }, { value: "caption", label: "Bijschrift" }, { value: "script", label: "Handschrift" }, { value: "list", label: "Lijst" },
];

const QUICK = ["Maak rustiger", "Meer wit", "Groter beeld", "Meer foto's", "Zwart-wit", "Verras me"];

export function BookTab({ project, update, role, studio, claude, goto, focusSpread }: TabProps & { focusSpread?: string }) {
  const [selId, setSelId] = useState<string | undefined>(focusSpread ?? project.spreads[0]?.id);
  const [frameId, setFrameId] = useState<string | undefined>();
  const [guides, setGuides] = useState(true);
  const [picker, setPicker] = useState(false);
  const [options, setOptions] = useState<{ title: string; spreads: Spread[] } | null>(null);
  const [instruction, setInstruction] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [comment, setComment] = useState("");
  const [draft, setDraft] = useState<Frame | null>(null);
  const listRef = useRef<HTMLOListElement>(null);
  const photographer = role === "fotograaf";

  const index = Math.max(0, project.spreads.findIndex((s) => s.id === selId));
  const stored = project.spreads[index];
  // While dragging, the moving frame is shown from local state; it is written on release.
  const spread = useMemo(() => (stored && draft ? { ...stored, frames: stored.frames.map((f) => (f.id === draft.id ? draft : f)) } : stored), [stored, draft]);
  const frame = spread?.frames.find((f) => f.id === frameId);
  const chapter = project.chapters.find((c) => c.id === spread?.chapterId);
  const usedIds = useMemo(() => new Set(project.spreads.flatMap((s) => s.frames.flatMap((f) => (f.kind === "image" && f.photoId ? [f.photoId] : [])))), [project.spreads]);
  const trayChapter = stored?.chapterId;
  const tray = useMemo(() => project.photos.filter((p) => !trayChapter || p.chapterId === trayChapter).sort((a, b) => Number(usedIds.has(a.id)) - Number(usedIds.has(b.id)) || a.takenAt - b.takenAt), [project.photos, trayChapter, usedIds]);

  if (!spread) {
    return (
      <div className="mx-auto max-w-md p-12 text-center">
        <h2 className="text-3xl">Nog geen ontwerp</h2>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{photographer ? "Kies de stijl en laat het boek ontwerpen. Daarna pas je hier elke spread aan." : "De fotograaf is nog bezig met het eerste ontwerp."}</p>
        {photographer && <button type="button" className={cn(btnPrimary, "mt-6")} onClick={() => goto("ontwerp")}>Naar ontwerp</button>}
      </div>
    );
  }

  const patchSpread = (id: string, fn: (s: Spread) => Spread, history = true) => update((p) => ({ ...p, spreads: p.spreads.map((s) => (s.id === id ? fn(s) : s)) }), { history });
  const patchFrame = (next: Frame) => patchSpread(spread.id, (s) => ({ ...s, frames: s.frames.map((f) => (f.id === next.id ? next : f)) }));
  const select = (id: string) => {
    setSelId(id);
    setFrameId(undefined);
    setDraft(null);
    setError(null);
  };
  const move = (d: number) => update((p) => {
    const j = index + d;
    if (j < 0 || j >= p.spreads.length) return p;
    const spreads = [...p.spreads];
    [spreads[index], spreads[j]] = [spreads[j], spreads[index]];
    return { ...p, spreads };
  });
  const remove = () => {
    const next = project.spreads[index + 1]?.id ?? project.spreads[index - 1]?.id;
    update((p) => ({ ...p, spreads: p.spreads.filter((s) => s.id !== spread.id) }));
    setSelId(next);
  };
  const insert = (template: string) => {
    const s = buildSpread({ template, chapterId: spread.chapterId, photoIds: [], texts: {}, background: "paper" }, project.formatId, project.style);
    update((p) => ({ ...p, spreads: [...p.spreads.slice(0, index + 1), s, ...p.spreads.slice(index + 1)] }));
    setPicker(false);
    select(s.id);
  };
  const duplicate = () => {
    const copy: Spread = { ...spread, id: uid("s"), frames: spread.frames.map((f) => ({ ...f, id: uid("f") })), comments: [], approved: undefined, locked: false };
    update((p) => ({ ...p, spreads: [...p.spreads.slice(0, index + 1), copy, ...p.spreads.slice(index + 1)] }));
    select(copy.id);
  };
  const retemplate = (template: string) => patchSpread(spread.id, (s) => ({ ...buildSpread({ ...planOf(s), template }, project.formatId, project.style, s.id), comments: s.comments, locked: s.locked }));
  const addFrame = (kind: "image" | "text") => {
    const f: Frame = kind === "image"
      ? { id: uid("i"), kind: "image", x: 58, y: 25, w: 30, h: 50, fx: 0.5, fy: 0.42 }
      : { id: uid("t"), kind: "text", role: "caption", text: "Nieuwe tekst", x: 10, y: 80, w: 30, h: 8, align: "left", valign: "top" };
    patchSpread(spread.id, (s) => ({ ...s, frames: [...s.frames, f] }));
    setFrameId(f.id);
  };
  const removeFrame = (id: string) => {
    patchSpread(spread.id, (s) => ({ ...s, frames: s.frames.filter((f) => f.id !== id) }));
    setFrameId(undefined);
  };
  const setPhoto = (fid: string, photoId: string) => patchSpread(spread.id, (s) => ({ ...s, frames: s.frames.map((f) => (f.id === fid && f.kind === "image" ? { ...f, photoId, fx: 0.5, fy: 0.42 } : f)) }));
  const placePhoto = (photoId: string) => {
    const target = frame?.kind === "image" ? frame : spread.frames.find((f): f is ImageFrame => f.kind === "image" && !f.photoId);
    if (target) setPhoto(target.id, photoId);
  };

  const localOptions = () => {
    const ids = alternatives(spread);
    setOptions({ title: "Andere opmaak voor deze spread", spreads: ids.map((t) => buildSpread({ ...planOf(spread), template: t }, project.formatId, project.style)) });
  };
  const askClaude = async (text: string) => {
    setBusy(true);
    setError(null);
    try {
      const r = await fetch("/api/design", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ project, spreadId: spread.id, instruction: text }) });
      const data = await r.json();
      if (!r.ok) throw new Error(data.error ?? "Er ging iets mis.");
      // Photos elsewhere in the book stay reserved; this spread's own photos are free to reuse.
      const own = new Set(spread.frames.flatMap((f) => (f.kind === "image" && f.photoId ? [f.photoId] : [])));
      const reserved = new Set([...usedIds].filter((id) => !own.has(id)));
      const spreads = (data.options ?? []).flatMap((o: never) => {
        const { plans } = plansFromAi([o], project, { reservedPhotos: new Set(reserved) });
        return plans[0] ? [buildSpread({ ...plans[0], chapterId: spread.chapterId }, project.formatId, project.style)] : [];
      });
      if (!spreads.length) throw new Error("Claude gaf geen bruikbaar voorstel.");
      setOptions({ title: text || "Voorstellen van Claude", spreads });
    } catch (e) {
      setError(e instanceof Error ? e.message : "Er ging iets mis.");
    } finally {
      setBusy(false);
    }
  };
  const applyOption = (o: Spread) => {
    patchSpread(spread.id, (s) => ({ ...o, id: s.id, comments: s.comments, locked: s.locked }));
    setOptions(null);
    setFrameId(undefined);
  };

  const addComment = () => {
    if (!comment.trim()) return;
    patchSpread(spread.id, (s) => ({ ...s, comments: [...s.comments, { id: uid("k"), role, text: comment.trim(), at: new Date().toISOString() }], approved: { ...s.approved, [role]: undefined } }));
    setComment("");
  };
  const approved = Boolean(spread.approved?.[role]);

  return (
    <div className="grid lg:h-[calc(100dvh-6.4rem)] lg:grid-cols-[13rem_minmax(0,1fr)_20rem]">
      {/* Storyboard */}
      <aside className="border-b bg-background lg:overflow-y-auto lg:border-b-0 lg:border-r">
        <ol ref={listRef} className="flex gap-2 overflow-x-auto p-3 lg:block lg:space-y-2 lg:overflow-visible">
          {project.spreads.map((s, i) => {
            const first = i === 0 || project.spreads[i - 1].chapterId !== s.chapterId;
            const open = s.comments.filter((c) => !c.resolved).length;
            return (
              <li key={s.id} className="shrink-0 lg:shrink">
                {first && <p className="mb-1.5 mt-3 hidden truncate text-[0.625rem] uppercase tracking-[0.16em] text-muted-foreground first:mt-0 lg:block">{project.chapters.find((c) => c.id === s.chapterId)?.title ?? (i === 0 ? "Voorwerk" : "Slot")}</p>}
                <button type="button" onClick={() => select(s.id)} aria-current={s.id === spread.id} className={cn("relative block w-36 rounded-[2px] p-0.5 lg:w-full", s.id === spread.id ? "ring-2 ring-primary" : "hover:ring-1 hover:ring-foreground/30")}>
                  <SpreadView spread={s} formatId={project.formatId} style={project.style} className="pointer-events-none" />
                  <span className="absolute left-1.5 top-1.5 rounded-sm bg-black/50 px-1 text-[0.5625rem] text-white">{i + 1}</span>
                  <span className="absolute right-1.5 top-1.5 flex gap-1">
                    {s.locked && <Lock className="h-3 w-3 rounded-sm bg-black/50 p-px text-white" />}
                    {open > 0 && <span className="rounded-sm bg-amber-500 px-1 text-[0.5625rem] text-black">{open}</span>}
                    {s.approved?.klant && <Check className="h-3 w-3 rounded-sm bg-emerald-600 p-px text-white" />}
                  </span>
                </button>
              </li>
            );
          })}
        </ol>
      </aside>

      {/* Canvas */}
      <section className="flex min-w-0 flex-col lg:overflow-y-auto">
        <div className="flex flex-wrap items-center gap-1 border-b bg-background px-3 py-1.5">
          <span className="mr-2 text-xs text-muted-foreground">Spread {index + 1}/{project.spreads.length} · p. {index * 2 + 1}–{index * 2 + 2} · {chapter?.title ?? "—"} · {templateOf(spread.template).name}</span>
          <span className="ml-auto flex items-center gap-0.5">
            <button type="button" className={iconBtn} onClick={() => setGuides((g) => !g)} aria-pressed={guides} title="Veilige marge en vouw tonen"><Ruler className={cn("h-4 w-4", guides && "text-primary")} strokeWidth={1.5} /></button>
            {photographer && (
              <>
                <button type="button" className={iconBtn} onClick={() => move(-1)} disabled={index === 0} title="Eerder in het boek"><ArrowUp className="h-4 w-4" /></button>
                <button type="button" className={iconBtn} onClick={() => move(1)} disabled={index === project.spreads.length - 1} title="Later in het boek"><ArrowDown className="h-4 w-4" /></button>
                <button type="button" className={iconBtn} onClick={() => patchSpread(spread.id, (s) => ({ ...s, locked: !s.locked }))} aria-pressed={Boolean(spread.locked)} title={spread.locked ? "Vergrendeld: blijft staan bij opnieuw ontwerpen" : "Vergrendel deze spread"}>{spread.locked ? <Lock className="h-4 w-4 text-primary" strokeWidth={1.5} /> : <LockOpen className="h-4 w-4" strokeWidth={1.5} />}</button>
                <button type="button" className={iconBtn} onClick={duplicate} title="Dupliceer"><Copy className="h-4 w-4" strokeWidth={1.5} /></button>
                <button type="button" className={iconBtn} onClick={() => setPicker(true)} title="Spread toevoegen na deze"><Plus className="h-4 w-4" /></button>
                <button type="button" className={iconBtn} onClick={remove} title="Verwijder spread"><Trash2 className="h-4 w-4" strokeWidth={1.5} /></button>
              </>
            )}
          </span>
        </div>

        <div className="flex-1 bg-linen/60 p-4 sm:p-8">
          <div className="mx-auto max-w-5xl">
            <SpreadView spread={spread} formatId={project.formatId} style={project.style} guides={guides ? { safeMm: studio.safeMm } : undefined}
              selectedId={photographer ? frameId : undefined}
              onSelect={photographer ? setFrameId : undefined}
              onFrameChange={photographer ? (f, commit) => { if (commit) { setDraft(null); patchFrame(f); } else setDraft(f); } : undefined}
              onDropPhoto={photographer ? setPhoto : undefined} />
            {spread.rationale && <p className="mt-3 text-center font-display text-base italic text-muted-foreground">{spread.rationale}</p>}
          </div>
        </div>

        {photographer && (
          <div className="border-t bg-background">
            <div className="flex flex-wrap items-center gap-2 px-3 py-2">
              <Sparkles className="h-4 w-4 shrink-0 text-ribbon" strokeWidth={1.5} />
              <form className="flex min-w-48 flex-1 gap-2" onSubmit={(e) => { e.preventDefault(); if (claude) askClaude(instruction); }}>
                <input className={cn(inputCls, "h-9 py-0")} value={instruction} onChange={(e) => setInstruction(e.target.value)} disabled={!claude || busy} placeholder={claude ? "Vraag Claude om deze spread anders te ontwerpen…" : "Claude is niet gekoppeld (ANTHROPIC_API_KEY ontbreekt)"} aria-label="Opdracht voor Claude" />
                <button type="submit" className={btnPrimary} disabled={!claude || busy}>{busy ? "Bezig…" : "Vraag"}</button>
              </form>
              {claude && QUICK.map((q) => <button key={q} type="button" className={cn(btnOutline, "h-8 px-2.5 text-xs")} disabled={busy} onClick={() => askClaude(q)}>{q}</button>)}
              <button type="button" className={cn(btnOutline, "h-8 px-2.5 text-xs")} onClick={localOptions}>Andere opmaak</button>
            </div>
            {error && <p className="px-3 pb-2 text-sm text-destructive" role="alert">{error}</p>}
            <div className="flex gap-1.5 overflow-x-auto px-3 pb-3 no-scrollbar" aria-label="Foto's van dit hoofdstuk">
              {tray.map((p) => (
                <button key={p.id} type="button" onClick={() => placePhoto(p.id)} title={usedIds.has(p.id) ? "Staat al in het boek" : "Klik of sleep naar een kader"} className={cn("relative h-16 shrink-0 overflow-hidden rounded-[2px]", usedIds.has(p.id) && "opacity-40")} style={{ aspectRatio: `${p.w} / ${p.h}` }}>
                  <PhotoThumb id={p.id} draggable />
                  {p.favorite && <span className="absolute right-0.5 top-0.5 text-[0.625rem] text-white drop-shadow">♥</span>}
                </button>
              ))}
              {tray.length === 0 && <p className="py-4 text-xs text-muted-foreground">Geen foto&apos;s in dit hoofdstuk.</p>}
            </div>
          </div>
        )}
      </section>

      {/* Inspector */}
      <aside className="space-y-5 border-t bg-background p-4 lg:overflow-y-auto lg:border-l lg:border-t-0">
        {photographer && frame?.kind === "image" && <ImageInspector frame={frame} onChange={patchFrame} onRemove={() => removeFrame(frame.id)} />}
        {photographer && frame?.kind === "text" && <TextInspector frame={frame} onChange={patchFrame} onRemove={() => removeFrame(frame.id)} />}
        {photographer && frame?.kind === "block" && (
          <div className="space-y-3">
            <p className="eyebrow">Kleurvlak</p>
            <Segmented value={frame.tone} onChange={(tone) => patchFrame({ ...frame, tone })} options={[{ value: "tint", label: "Tint" }, { value: "dark", label: "Donker" }, { value: "accent", label: "Accent" }]} />
            <button type="button" className={btnGhost} onClick={() => removeFrame(frame.id)}><Trash2 className="h-4 w-4" strokeWidth={1.5} /> Verwijder vlak</button>
          </div>
        )}
        {photographer && !frame && (
          <div className="space-y-4">
            <p className="eyebrow">Spread</p>
            <Field label="Sjabloon">
              <select className={inputCls} value={spread.template} onChange={(e) => retemplate(e.target.value)}>{TEMPLATES.map((t) => <option key={t.id} value={t.id}>{t.name} · {t.photos} foto{t.photos === 1 ? "" : "'s"}</option>)}</select>
            </Field>
            <p className="-mt-2 text-xs leading-relaxed text-muted-foreground">{templateOf(spread.template).use}</p>
            <Field label="Achtergrond"><Segmented<SpreadBackground> value={spread.background} onChange={(background) => patchSpread(spread.id, (s) => ({ ...s, background }))} options={[{ value: "paper", label: "Papier" }, { value: "tint", label: "Tint" }, { value: "dark", label: "Donker" }]} /></Field>
            <Field label="Hoofdstuk">
              <select className={inputCls} value={spread.chapterId ?? ""} onChange={(e) => patchSpread(spread.id, (s) => ({ ...s, chapterId: e.target.value || undefined }))}>
                <option value="">Voorwerk of slot</option>{project.chapters.map((c) => <option key={c.id} value={c.id}>{c.title}</option>)}
              </select>
            </Field>
            <div className="flex gap-2">
              <button type="button" className={btnOutline} onClick={() => addFrame("image")}><ImagePlus className="h-4 w-4" strokeWidth={1.5} /> Fotokader</button>
              <button type="button" className={btnOutline} onClick={() => addFrame("text")}><Type className="h-4 w-4" strokeWidth={1.5} /> Tekstkader</button>
            </div>
            <p className="text-xs leading-relaxed text-muted-foreground">Klik op een kader om het te bewerken. Sleep om te verplaatsen, trek aan het bolletje om de maat te wijzigen. Sleep een foto uit de strook naar een kader.</p>
          </div>
        )}

        <div className="space-y-3 border-t pt-4">
          <p className="eyebrow"><MessageSquare className="h-3.5 w-3.5" strokeWidth={1.5} /> Opmerkingen</p>
          {spread.comments.map((c) => (
            <div key={c.id} className={cn("rounded-sm border p-2.5 text-sm", c.resolved && "opacity-50")}>
              <p className="text-[0.6875rem] uppercase tracking-[0.14em] text-muted-foreground">{c.role === "klant" ? "Bruidspaar" : "Fotograaf"} · {new Date(c.at).toLocaleDateString("nl-NL", { day: "numeric", month: "short" })}</p>
              <p className="mt-1 whitespace-pre-line">{c.text}</p>
              {photographer && <button type="button" className="mt-1.5 text-xs underline decoration-ribbon underline-offset-4" onClick={() => patchSpread(spread.id, (s) => ({ ...s, comments: s.comments.map((x) => (x.id === c.id ? { ...x, resolved: !x.resolved } : x)) }))}>{c.resolved ? "Heropenen" : "Afgehandeld"}</button>}
            </div>
          ))}
          <textarea className={cn(inputCls, "min-h-16")} value={comment} onChange={(e) => setComment(e.target.value)} placeholder={role === "klant" ? "Wat wil je anders op deze spread?" : "Notitie of antwoord aan het bruidspaar"} />
          <div className="flex flex-wrap gap-2">
            <button type="button" className={btnOutline} onClick={addComment} disabled={!comment.trim()}>Plaats opmerking</button>
            <button type="button" className={approved ? btnPrimary : btnOutline} aria-pressed={approved} onClick={() => patchSpread(spread.id, (s) => ({ ...s, approved: { ...s.approved, [role]: approved ? undefined : new Date().toISOString() } }))}>
              <Check className="h-4 w-4" /> {approved ? "Goedgekeurd" : "Keur deze spread goed"}
            </button>
          </div>
        </div>
      </aside>

      <Dialog open={picker} onClose={() => setPicker(false)} title="Spread toevoegen" wide>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {TEMPLATES.map((t) => (
            <button key={t.id} type="button" onClick={() => insert(t.id)} className="rounded-sm border p-2 text-left transition-colors hover:border-foreground/60">
              <SpreadView spread={buildSpread({ template: t.id, photoIds: [], texts: { title: "Titel", kicker: "Bovenkop", subtitle: "Ondertitel", body: "Tekst van het verhaal. ".repeat(14), body2: "Tekst van het verhaal. ".repeat(10), quote: "“Een zin die blijft hangen.”", attribution: "Naam", caption: "Bijschrift" }, background: "paper" }, project.formatId, project.style, `pick-${t.id}`)} formatId={project.formatId} style={project.style} className="pointer-events-none" />
              <p className="mt-2 text-sm font-medium">{t.name}</p>
              <p className="text-xs leading-relaxed text-muted-foreground">{t.use}</p>
            </button>
          ))}
        </div>
      </Dialog>

      <Dialog open={Boolean(options)} onClose={() => setOptions(null)} title={options?.title ?? ""} wide>
        {options?.spreads.length ? (
          <div className="grid gap-5 sm:grid-cols-2">
            {options.spreads.map((o) => (
              <button key={o.id} type="button" onClick={() => applyOption(o)} className="rounded-sm border p-2 text-left transition-colors hover:border-foreground/60">
                <SpreadView spread={o} formatId={project.formatId} style={project.style} className="pointer-events-none" />
                <p className="mt-2 text-sm font-medium">{templateOf(o.template).name}</p>
                {o.rationale && <p className="text-xs leading-relaxed text-muted-foreground">{o.rationale}</p>}
              </button>
            ))}
          </div>
        ) : <p className="text-sm text-muted-foreground">Voor deze spread is er geen ander sjabloon dat dezelfde inhoud kan dragen. Kies rechts zelf een sjabloon, of voeg kaders toe.</p>}
      </Dialog>
    </div>
  );
}

function ImageInspector({ frame, onChange, onRemove }: { frame: ImageFrame; onChange: (f: Frame) => void; onRemove: () => void }) {
  return (
    <div className="space-y-4">
      <p className="eyebrow">Foto</p>
      {frame.photoId ? <div className="aspect-[3/2] overflow-hidden rounded-sm border"><PhotoThumb id={frame.photoId} /></div> : <p className="text-sm text-muted-foreground">Leeg kader. Klik op een foto in de strook onderaan.</p>}
      <Field label="Uitsnede horizontaal"><input type="range" min={0} max={1} step={0.01} value={frame.fx} onChange={(e) => onChange({ ...frame, fx: Number(e.target.value) })} className="w-full accent-[var(--primary)]" /></Field>
      <Field label="Uitsnede verticaal"><input type="range" min={0} max={1} step={0.01} value={frame.fy} onChange={(e) => onChange({ ...frame, fy: Number(e.target.value) })} className="w-full accent-[var(--primary)]" /></Field>
      <label className="flex items-center gap-2 text-sm"><input type="checkbox" checked={Boolean(frame.bw)} onChange={(e) => onChange({ ...frame, bw: e.target.checked })} className="accent-[var(--primary)]" /> Zwart-wit</label>
      <Geometry frame={frame} onChange={onChange} />
      <div className="flex flex-wrap gap-2">
        {frame.photoId && <button type="button" className={btnOutline} onClick={() => onChange({ ...frame, photoId: undefined })}>Maak kader leeg</button>}
        <button type="button" className={btnGhost} onClick={onRemove}><Trash2 className="h-4 w-4" strokeWidth={1.5} /> Verwijder kader</button>
      </div>
    </div>
  );
}

function TextInspector({ frame, onChange, onRemove }: { frame: TextFrame; onChange: (f: Frame) => void; onRemove: () => void }) {
  return (
    <div className="space-y-4">
      <p className="eyebrow">Tekst</p>
      <Field label="Soort"><select className={inputCls} value={frame.role} onChange={(e) => onChange({ ...frame, role: e.target.value as TextRole })}>{ROLES.map((r) => <option key={r.value} value={r.value}>{r.label}</option>)}</select></Field>
      <Field label="Tekst"><textarea className={cn(inputCls, "min-h-32")} value={frame.text} onChange={(e) => onChange({ ...frame, text: e.target.value })} lang="nl" spellCheck /></Field>
      <Field label="Uitlijning"><Segmented value={frame.align} onChange={(align) => onChange({ ...frame, align })} options={[{ value: "left", label: "Links" }, { value: "center", label: "Midden" }, { value: "right", label: "Rechts" }]} /></Field>
      <Field label="Verticaal"><Segmented value={frame.valign} onChange={(valign) => onChange({ ...frame, valign })} options={[{ value: "top", label: "Boven" }, { value: "middle", label: "Midden" }, { value: "bottom", label: "Onder" }]} /></Field>
      <Field label={`Grootte ${Math.round((frame.scale ?? 1) * 100)}%`}><input type="range" min={0.4} max={1.8} step={0.05} value={frame.scale ?? 1} onChange={(e) => onChange({ ...frame, scale: Number(e.target.value) })} className="w-full accent-[var(--primary)]" /></Field>
      {(frame.role === "body" || frame.role === "list") && (
        <div className="flex items-center gap-4">
          <Field label="Kolommen"><Segmented value={frame.columns ?? 1} onChange={(columns) => onChange({ ...frame, columns })} options={[{ value: 1, label: "1" }, { value: 2, label: "2" }, { value: 3, label: "3" }]} /></Field>
          <label className="mt-5 flex items-center gap-2 text-sm"><input type="checkbox" checked={Boolean(frame.dropCap)} onChange={(e) => onChange({ ...frame, dropCap: e.target.checked })} className="accent-[var(--primary)]" /> Initiaal</label>
        </div>
      )}
      <Geometry frame={frame} onChange={onChange} />
      <button type="button" className={btnGhost} onClick={onRemove}><Trash2 className="h-4 w-4" strokeWidth={1.5} /> Verwijder kader</button>
    </div>
  );
}

function Geometry({ frame, onChange }: { frame: Frame; onChange: (f: Frame) => void }) {
  const num = (key: "x" | "y" | "w" | "h", label: string) => (
    <label className="block text-[0.6875rem] uppercase tracking-[0.14em] text-muted-foreground">{label}
      <input type="number" step={0.5} min={0} max={100} value={Math.round(frame[key] * 10) / 10} onChange={(e) => onChange({ ...frame, [key]: Math.min(100, Math.max(0, Number(e.target.value))) })} className={cn(inputCls, "mt-1 px-2 py-1 text-xs")} />
    </label>
  );
  return <div className="grid grid-cols-4 gap-2" title="Positie en maat in procenten van de spread">{num("x", "X")}{num("y", "Y")}{num("w", "B")}{num("h", "H")}</div>;
}
