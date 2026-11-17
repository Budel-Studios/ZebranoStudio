"use client";

import { ArrowDown, ArrowUp, Plus, Sparkles, Trash2 } from "lucide-react";
import { useState } from "react";
import { CHAPTER_PRESETS, STORY_KINDS, storyKindName } from "@/lib/book/catalog";
import { isLiteralQuote } from "@/lib/book/integrity";
import { uid } from "@/lib/book/templates";
import { aiPost } from "./ai";
import type { Chapter, Story, StoryKind } from "@/lib/book/types";
import { cn } from "@/lib/utils";
import type { TabProps } from "./editor";
import { btnGhost, btnOutline, Field, iconBtn, inputCls, Panel } from "./ui";

const AI_TASKS: Array<{ id: string; label: string }> = [
  { id: "opschonen", label: "Opschonen" },
  { id: "inkorten", label: "Inkorten" },
  { id: "quotes", label: "Citaat kiezen" },
  { id: "titel", label: "Titel voorstellen" },
];

export function StoryTab({ project, update, role, claude }: TabProps) {
  const [sel, setSel] = useState<string | "boek">(project.chapters[0]?.id ?? "boek");
  const chapter = project.chapters.find((c) => c.id === sel);
  const stories = project.stories.filter((s) => (sel === "boek" ? !s.chapterId : s.chapterId === sel));
  const photographer = role === "fotograaf";

  const patchChapter = (id: string, patch: Partial<Chapter>) => update((p) => ({ ...p, chapters: p.chapters.map((c) => (c.id === id ? { ...c, ...patch } : c)) }));
  const move = (id: string, d: number) => update((p) => {
    const i = p.chapters.findIndex((c) => c.id === id), j = i + d;
    if (j < 0 || j >= p.chapters.length) return p;
    const chapters = [...p.chapters];
    [chapters[i], chapters[j]] = [chapters[j], chapters[i]];
    return { ...p, chapters };
  });
  const addChapter = (preset?: Pick<Chapter, "kind" | "title" | "subtitle">) => {
    const c: Chapter = { id: uid("c"), kind: preset?.kind ?? "eigen", title: preset?.title ?? "Nieuw hoofdstuk", subtitle: preset?.subtitle };
    update((p) => ({ ...p, chapters: [...p.chapters, c] }));
    setSel(c.id);
  };
  const removeChapter = (id: string) => {
    if (!confirm("Hoofdstuk verwijderen? Foto's en verhalen blijven bewaard, zonder hoofdstuk.")) return;
    update((p) => ({
      ...p,
      chapters: p.chapters.filter((c) => c.id !== id),
      photos: p.photos.map((ph) => (ph.chapterId === id ? { ...ph, chapterId: undefined } : ph)),
      stories: p.stories.map((s) => (s.chapterId === id ? { ...s, chapterId: undefined } : s)),
    }));
    setSel("boek");
  };
  const addStory = (kind: StoryKind) => update((p) => ({ ...p, stories: [...p.stories, { id: uid("v"), chapterId: sel === "boek" ? undefined : sel, kind, title: "", author: "", text: "", by: role }] }));
  const patchStory = (id: string, patch: Partial<Story>) => update((p) => ({ ...p, stories: p.stories.map((s) => (s.id === id ? { ...s, ...patch } : s)) }));
  const unused = CHAPTER_PRESETS[project.kind].filter((c) => !project.chapters.some((x) => x.kind === c.kind));

  return (
    <div className="mx-auto grid max-w-7xl gap-6 p-5 lg:grid-cols-[19rem_1fr]">
      <aside>
        <p className="eyebrow">Hoofdstukken</p>
        <ol className="mt-4 space-y-1">
          <li>
            <button type="button" onClick={() => setSel("boek")} className={cn("flex w-full items-baseline justify-between rounded-sm px-3 py-2 text-left text-sm", sel === "boek" ? "bg-foreground text-background" : "hover:bg-foreground/5")}>
              <span>Hele boek <span className="opacity-60">· opdracht, tijdlijn</span></span>
              <span className="text-xs opacity-60">{project.stories.filter((s) => !s.chapterId).length}</span>
            </button>
          </li>
          {project.chapters.map((c, i) => (
            <li key={c.id} className="group flex items-center gap-1">
              <button type="button" onClick={() => setSel(c.id)} className={cn("flex min-w-0 flex-1 items-baseline gap-2.5 rounded-sm px-3 py-2 text-left text-sm", sel === c.id ? "bg-foreground text-background" : "hover:bg-foreground/5")}>
                <span className="text-[0.6875rem] tabular-nums opacity-60">{String(i + 1).padStart(2, "0")}</span>
                <span className="min-w-0 flex-1 truncate">{c.title}</span>
                <span className="text-xs opacity-60">{project.photos.filter((p) => p.chapterId === c.id).length} / {project.stories.filter((s) => s.chapterId === c.id).length}</span>
              </button>
              {photographer && (
                <span className="flex opacity-0 transition-opacity group-hover:opacity-100 group-focus-within:opacity-100">
                  <button type="button" className={iconBtn} onClick={() => move(c.id, -1)} disabled={i === 0} aria-label="Omhoog"><ArrowUp className="h-3.5 w-3.5" /></button>
                  <button type="button" className={iconBtn} onClick={() => move(c.id, 1)} disabled={i === project.chapters.length - 1} aria-label="Omlaag"><ArrowDown className="h-3.5 w-3.5" /></button>
                </span>
              )}
            </li>
          ))}
        </ol>
        <p className="mt-2 px-3 text-[0.6875rem] text-muted-foreground">Aantallen: foto&apos;s / verhalen</p>
        {photographer && (
          <div className="mt-5 border-t pt-4">
            <button type="button" className={cn(btnOutline, "w-full")} onClick={() => addChapter()}><Plus className="h-4 w-4" /> Eigen hoofdstuk</button>
            {unused.length > 0 && (
              <div className="mt-3 flex flex-wrap gap-1.5">
                {unused.map((c) => <button key={c.kind} type="button" onClick={() => addChapter(c)} className="rounded-full border px-2.5 py-1 text-xs text-muted-foreground hover:border-foreground/50 hover:text-foreground">+ {c.title}</button>)}
              </div>
            )}
          </div>
        )}
      </aside>

      <div className="space-y-5">
        {chapter ? (
          <Panel title={chapter.title} action={photographer ? <button type="button" className={btnGhost} onClick={() => removeChapter(chapter.id)}><Trash2 className="h-4 w-4" strokeWidth={1.5} /> Verwijder</button> : undefined}>
            <div className="grid gap-4 sm:grid-cols-3">
              <Field label="Titel"><input className={inputCls} value={chapter.title} onChange={(e) => patchChapter(chapter.id, { title: e.target.value })} /></Field>
              <Field label="Ondertitel"><input className={inputCls} value={chapter.subtitle ?? ""} onChange={(e) => patchChapter(chapter.id, { subtitle: e.target.value })} /></Field>
              <Field label="Moment" hint="Tijd en plek, boven de titel."><input className={inputCls} value={chapter.moment ?? ""} onChange={(e) => patchChapter(chapter.id, { moment: e.target.value })} placeholder="14:30 · De boomgaard" /></Field>
            </div>
          </Panel>
        ) : (
          <Panel title="Hele boek"><p className="text-sm leading-relaxed text-muted-foreground">Teksten die niet bij één hoofdstuk horen: de opdracht voorin, de tijdlijn van de dag, een woord voor wie er niet bij kon zijn.</p></Panel>
        )}

        {stories.map((s) => <StoryCard key={s.id} story={s} claude={claude} onPatch={(patch) => patchStory(s.id, patch)}
          onRemove={() => update((p) => ({ ...p, stories: p.stories.filter((x) => x.id !== s.id) }))}
          onAddQuote={(text) => update((p) => ({ ...p, stories: [...p.stories, { id: uid("v"), chapterId: s.chapterId, kind: "quote", title: "", author: s.author, text, by: role }] }))} />)}

        <div className="rounded-sm border border-dashed p-5">
          <p className="text-sm font-medium">Voeg een verhaal toe{chapter ? ` aan ${chapter.title.toLowerCase()}` : ""}</p>
          <p className="mt-1 text-xs text-muted-foreground">Dit is wat het boek meer maakt dan een album. Het bruidspaar kan dit ook zelf invullen.</p>
          <div className="mt-4 flex flex-wrap gap-2">
            {STORY_KINDS.filter((k) => (sel === "boek" ? true : k.id !== "opdracht")).map((k) => (
              <button key={k.id} type="button" title={k.hint} onClick={() => addStory(k.id)} className={btnOutline}><Plus className="h-3.5 w-3.5" /> {k.name}</button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function StoryCard({ story, claude, onPatch, onRemove, onAddQuote }: { story: Story; claude: boolean; onPatch: (p: Partial<Story>) => void; onRemove: () => void; onAddQuote: (text: string) => void }) {
  const [busy, setBusy] = useState<string | null>(null);
  const [result, setResult] = useState<{ task: string; options: string[]; note: string } | null>(null);
  const [error, setError] = useState<string | null>(null);
  const kind = STORY_KINDS.find((k) => k.id === story.kind);
  const isList = story.kind === "menu" || story.kind === "playlist" || story.kind === "tijdlijn";

  const ask = async (task: string) => {
    setBusy(task);
    setError(null);
    setResult(null);
    try {
      const data = await aiPost<{ options?: string[]; note?: string }>("/api/text", { task, text: story.text, kind: storyKindName(story.kind), author: story.author });
      // A proposed quote counts only when it is word for word in the text.
      const options = (data.options ?? []).filter((o) => task !== "quotes" || isLiteralQuote(o, story.text));
      if (task === "quotes" && !options.length) throw new Error("Claude vond geen zin die letterlijk in de tekst staat.");
      setResult({ task, options, note: data.note ?? "" });
    } catch (e) {
      setError(e instanceof Error ? e.message : "Er ging iets mis.");
    } finally {
      setBusy(null);
    }
  };

  return (
    <article className="rounded-sm border bg-card">
      <header className="flex flex-wrap items-center gap-3 border-b px-5 py-3">
        <select value={story.kind} onChange={(e) => onPatch({ kind: e.target.value as StoryKind })} className="rounded-sm border border-input bg-background px-2 py-1 text-sm" aria-label="Soort verhaal">
          {STORY_KINDS.map((k) => <option key={k.id} value={k.id}>{k.name}</option>)}
        </select>
        <span className="text-xs text-muted-foreground">{story.by === "klant" ? "Ingevuld door het bruidspaar" : "Ingevuld door de fotograaf"}, {story.text.length} tekens</span>
        <button type="button" className={cn(iconBtn, "ml-auto")} onClick={onRemove} aria-label="Verhaal verwijderen"><Trash2 className="h-4 w-4" strokeWidth={1.5} /></button>
      </header>
      <div className="space-y-4 p-5">
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="Titel"><input className={inputCls} value={story.title} onChange={(e) => onPatch({ title: e.target.value })} /></Field>
          <Field label={story.kind === "quote" || story.kind === "speech" ? "Van wie" : "Naam (optioneel)"}><input className={inputCls} value={story.author} onChange={(e) => onPatch({ author: e.target.value })} placeholder="Henk, vader van de bruid" /></Field>
        </div>
        <Field label="Tekst" hint={kind?.hint}>
          <textarea className={cn(inputCls, "min-h-36 font-display text-lg leading-relaxed")} value={story.text} onChange={(e) => onPatch({ text: e.target.value })} rows={isList ? 6 : 8} lang="nl" spellCheck />
        </Field>
        {!isList && (
          <div className="flex flex-wrap items-center gap-2">
            <span className="flex items-center gap-1.5 text-xs text-muted-foreground"><Sparkles className="h-3.5 w-3.5 text-ribbon" strokeWidth={1.5} /> Claude</span>
            {AI_TASKS.map((t) => <button key={t.id} type="button" className={btnOutline} disabled={!claude || !story.text.trim() || Boolean(busy)} onClick={() => ask(t.id)}>{busy === t.id ? "Bezig…" : t.label}</button>)}
            {!claude && <span className="text-xs text-muted-foreground">Teksthulp werkt zodra de Claude API-sleutel is ingesteld.</span>}
          </div>
        )}
        {story.original !== undefined && story.original !== story.text && (
          <p className="text-xs text-muted-foreground">Deze tekst is bewerkt op voorstel van Claude. <button type="button" className="underline underline-offset-4" onClick={() => onPatch({ text: story.original, original: undefined })}>Zet de oorspronkelijke tekst terug</button></p>
        )}
        {error && <p className="text-sm text-destructive" role="alert">{error}</p>}
        {result && (
          <div className="space-y-3 rounded-sm border border-ribbon/40 bg-background p-4">
            <p className="text-xs text-muted-foreground">{result.note || "Voorstel van Claude. Er verandert niets tot je iets overneemt."}</p>
            {result.options.map((o, i) => (
              <div key={i} className="flex items-start gap-3 border-t pt-3 first:border-t-0 first:pt-0">
                <p className="flex-1 whitespace-pre-line font-display text-lg leading-relaxed">{o}</p>
                {result.task === "quotes" ? <button type="button" className={btnOutline} onClick={() => onAddQuote(o)}>Als citaat toevoegen</button>
                  : result.task === "titel" ? <button type="button" className={btnOutline} onClick={() => { onPatch({ title: o }); setResult(null); }}>Gebruik als titel</button>
                  : <button type="button" className={btnOutline} onClick={() => { onPatch({ text: o, original: story.original ?? story.text }); setResult(null); }}>Overnemen</button>}
              </div>
            ))}
            <button type="button" className={btnGhost} onClick={() => setResult(null)}>Sluiten</button>
          </div>
        )}
      </div>
    </article>
  );
}
