"use client";

import { Sparkles, Wand2 } from "lucide-react";
import { useMemo, useState } from "react";
import { SpreadView } from "@/components/book/spread-view";
import { designBook, plansToSpreads } from "@/lib/book/autodesign";
import { FONT_PAIRS, FORMATS, MOOD_DEFAULTS, MOODS, PALETTES } from "@/lib/book/catalog";
import { plansFromAi } from "@/lib/book/from-ai";
import { buildSpread } from "@/lib/book/templates";
import type { Project, StyleParams } from "@/lib/book/types";
import { cn } from "@/lib/utils";
import type { TabProps } from "./editor";
import { btnOutline, btnPrimary, Field, inputCls, Panel, Scale, Segmented } from "./ui";

/** Photos on locked spreads stay where they are and are not offered again. */
const lockedPhotos = (p: Project) => new Set(p.spreads.filter((s) => s.locked).flatMap((s) => s.frames.flatMap((f) => (f.kind === "image" && f.photoId ? [f.photoId] : []))));

export function DesignTab({ project, update, claude, goto }: TabProps) {
  const s = project.style;
  const [busy, setBusy] = useState<string | null>(null);
  const [report, setReport] = useState<{ by: "claude" | "engine"; concept: string; notes: string[] } | null>(null);
  const [error, setError] = useState<string | null>(null);
  const set = (patch: Partial<StyleParams>) => update((p) => ({ ...p, style: { ...p.style, ...patch } }));
  const locked = project.spreads.filter((x) => x.locked).length;

  // Three sample spreads in the chosen style, with the project's own content.
  const samples = useMemo(() => {
    const ch = project.chapters[0];
    const ph = project.photos;
    const quote = project.stories.find((x) => x.kind === "quote");
    return [
      buildSpread({ template: "opener", chapterId: ch?.id, photoIds: ph[0] ? [ph[0].id] : [], texts: { kicker: ch?.moment || project.place, title: ch?.title ?? "Hoofdstuk", subtitle: ch?.subtitle ?? "" }, background: "paper" }, project.formatId, s, "sample-1"),
      buildSpread({ template: s.density >= 4 ? "mozaiek" : s.density >= 3 ? "diptiek-aflopend" : "hero-wit", photoIds: ph.slice(1, 6).map((p) => p.id), texts: {}, background: "paper" }, project.formatId, s, "sample-2"),
      buildSpread({ template: "quote", photoIds: [], texts: { quote: quote ? `“${quote.text}”` : "“Een zin die is blijven hangen.”", attribution: quote?.author ?? "Naam van de spreker" }, background: s.mood === "editorial" ? "dark" : "paper" }, project.formatId, s, "sample-3"),
    ];
  }, [project.chapters, project.photos, project.stories, project.place, project.formatId, s]);

  const applyEngine = (note?: string) => {
    const plans = designBook({ ...project, photos: project.photos.filter((p) => !lockedPhotos(project).has(p.id)) });
    update((p) => ({ ...p, spreads: plansToSpreads(plans, p), designedBy: "engine" }));
    setReport({ by: "engine", concept: "Ontworpen door de vaste opmaakregels: elk hoofdstuk opent met een titel, drukke en rustige spreads wisselen elkaar af en verhalen staan bij het moment waar ze bij horen.", notes: note ? [note] : [] });
  };

  const design = async () => {
    setError(null);
    setReport(null);
    if (project.spreads.some((x) => !x.locked) && !confirm(`Het boek opnieuw ontwerpen? ${locked ? `${locked} vergrendelde spread(s) blijven staan; de rest` : "Het huidige ontwerp"} wordt vervangen. Je kunt dit ongedaan maken.`)) return;
    if (!claude) return applyEngine();
    setBusy("Claude ontwerpt het boek. Dit duurt een à twee minuten…");
    try {
      const r = await fetch("/api/design", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify({ project }) });
      const data = await r.json();
      if (!r.ok) throw new Error(data.error ?? "Er ging iets mis.");
      const { plans, dropped } = plansFromAi(data.spreads ?? [], project, { reservedPhotos: lockedPhotos(project) });
      if (plans.length < 3) throw new Error("Claude gaf geen bruikbaar ontwerp terug.");
      update((p) => ({ ...p, spreads: plansToSpreads(plans, p), designedBy: "claude" }));
      setReport({ by: "claude", concept: data.concept ?? "", notes: [...new Set(dropped)] });
    } catch (e) {
      setError(`${e instanceof Error ? e.message : "Er ging iets mis."} Het huidige ontwerp is niet gewijzigd.`);
    } finally {
      setBusy(null);
    }
  };

  return (
    <div className="mx-auto grid max-w-7xl gap-6 p-5 lg:grid-cols-[1fr_26rem]">
      <div className="space-y-5">
        <Panel title="Stijl">
          <div className="grid gap-2 sm:grid-cols-4">
            {MOODS.map((m) => (
              <button key={m.id} type="button" onClick={() => set({ mood: m.id, ...MOOD_DEFAULTS[m.id] })} aria-pressed={s.mood === m.id}
                className={cn("rounded-sm border p-3 text-left transition-colors", s.mood === m.id ? "border-foreground bg-background" : "hover:border-foreground/40")}>
                <span className="font-display text-xl">{m.name}</span>
                <span className="mt-1 block text-xs leading-relaxed text-muted-foreground">{m.text}</span>
              </button>
            ))}
          </div>
          <div className="mt-6 grid gap-5 sm:grid-cols-2">
            <Field label="Lettertypes">
              <select className={inputCls} value={s.fontPair} onChange={(e) => set({ fontPair: e.target.value })}>{FONT_PAIRS.map((f) => <option key={f.id} value={f.id}>{f.name}</option>)}</select>
            </Field>
            <Field label="Formaat">
              <select className={inputCls} value={project.formatId} onChange={(e) => update((p) => ({ ...p, formatId: e.target.value }))}>{FORMATS.map((f) => <option key={f.id} value={f.id}>{f.label}</option>)}</select>
            </Field>
          </div>
          <Field label="Kleurpalet" className="mt-5">
            <div className="flex flex-wrap gap-2">
              {PALETTES.map((p) => (
                <button key={p.id} type="button" onClick={() => set({ palette: p.id })} aria-pressed={s.palette === p.id} title={p.name}
                  className={cn("flex items-center gap-2 rounded-sm border py-1.5 pl-1.5 pr-3 text-xs transition-colors", s.palette === p.id ? "border-foreground" : "hover:border-foreground/40")}>
                  <span className="flex overflow-hidden rounded-sm border">{[p.paper, p.tint, p.accent, p.dark].map((c) => <span key={c} className="h-6 w-4" style={{ background: c }} />)}</span>
                  {p.name}
                </button>
              ))}
            </div>
          </Field>
        </Panel>

        <Panel title="Ritme en inhoud">
          <div className="grid gap-x-8 gap-y-6 sm:grid-cols-2">
            <Field label="Dichtheid"><Scale value={s.density} onChange={(density) => set({ density })} left="Veel wit" right="Rijk gevuld" /></Field>
            <Field label="Aandeel tekst"><Scale value={s.textShare} onChange={(textShare) => set({ textShare })} left="Bijna alleen beeld" right="Een leesboek" /></Field>
            <Field label="Zwart-wit"><Scale value={s.bwShare} min={0} max={3} onChange={(bwShare) => set({ bwShare })} left="Geen" right="Vaak" /></Field>
            <Field label={`Omvang: ongeveer ${s.targetSpreads} spreads (${s.targetSpreads * 2} pagina's)`}>
              <input type="range" min={15} max={80} step={1} value={s.targetSpreads} onChange={(e) => set({ targetSpreads: Number(e.target.value) })} className="w-full accent-[var(--primary)]" />
            </Field>
            <Field label="Marges"><Segmented value={s.margins} onChange={(margins) => set({ margins })} options={[{ value: "ruim", label: "Ruim" }, { value: "normaal", label: "Normaal" }, { value: "krap", label: "Krap" }]} /></Field>
            <Field label="Toon van korte teksten"><Segmented value={s.tone} onChange={(tone) => set({ tone })} options={[{ value: "ingetogen", label: "Ingetogen" }, { value: "warm", label: "Warm" }, { value: "speels", label: "Speels" }]} /></Field>
          </div>
          <Field label="Wensen voor de ontwerper" className="mt-6" hint="In gewone woorden. Claude leest dit mee; de vaste opmaakregels niet.">
            <textarea className={cn(inputCls, "min-h-24")} value={s.brief} onChange={(e) => set({ brief: e.target.value })} placeholder="Bijvoorbeeld: het feest mag donker en druk, de ceremonie juist heel licht. Oma moet groot in het boek. Geen foto's over de vouw bij de portretten." />
          </Field>
        </Panel>
      </div>

      <aside className="space-y-5 lg:sticky lg:top-28 lg:self-start">
        <div className="space-y-3">
          <p className="eyebrow">Voorbeeld in deze stijl</p>
          {samples.map((sp) => <SpreadView key={sp.id} spread={sp} formatId={project.formatId} style={s} />)}
        </div>
        <div className="rounded-sm border bg-card p-5">
          <p className="flex items-center gap-2 text-sm font-medium">
            {claude ? <Sparkles className="h-4 w-4 text-ribbon" strokeWidth={1.5} /> : <Wand2 className="h-4 w-4 text-ribbon" strokeWidth={1.5} />}
            {claude ? "Claude is gekoppeld als ontwerper" : "Ontwerp met de vaste opmaakregels"}
          </p>
          <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
            {claude
              ? "Claude leest de hoofdstukken, verhalen en fotogegevens en bepaalt de volgorde, de sjablonen en waar elk verhaal landt. Teksten van het bruidspaar worden nooit herschreven."
              : "Er is geen Claude API-sleutel ingesteld op de server. Het boek wordt nu ontworpen door de ingebouwde opmaakregels met dezelfde parameters. Stel ANTHROPIC_API_KEY in om Claude te laten ontwerpen."}
          </p>
          <p className="mt-3 text-xs text-muted-foreground">{project.photos.length} foto&apos;s · {project.stories.length} verhalen · {project.chapters.length} hoofdstukken{locked ? ` · ${locked} spread(s) vergrendeld` : ""}</p>
          <button type="button" className={cn(btnPrimary, "mt-4 h-11 w-full")} onClick={design} disabled={Boolean(busy) || project.photos.length === 0}>
            {busy ? "Bezig…" : project.spreads.length ? "Ontwerp het boek opnieuw" : "Ontwerp het boek"}
          </button>
          {project.photos.length === 0 && <p className="mt-2 text-xs text-muted-foreground">Voeg eerst foto&apos;s toe.</p>}
          {busy && <p className="mt-3 text-xs" role="status">{busy}</p>}
          {error && (
            <div className="mt-3 space-y-2" role="alert">
              <p className="text-sm text-destructive">{error}</p>
              <button type="button" className={btnOutline} onClick={() => { setError(null); applyEngine("Claude was niet bereikbaar; dit ontwerp komt van de vaste opmaakregels."); }}>Ontwerp met de vaste opmaakregels</button>
            </div>
          )}
          {report && (
            <div className="mt-4 border-t pt-4">
              <p className="text-xs uppercase tracking-[0.16em] text-muted-foreground">{report.by === "claude" ? "Concept van Claude" : "Ontwerp klaar"}</p>
              <p className="mt-2 font-display text-lg leading-snug">{report.concept}</p>
              {report.notes.map((n) => <p key={n} className="mt-2 text-xs text-muted-foreground">{n}</p>)}
              <button type="button" className={cn(btnOutline, "mt-4 w-full")} onClick={() => goto("boek")}>Bekijk de {project.spreads.length} spreads</button>
            </div>
          )}
        </div>
      </aside>
    </div>
  );
}
