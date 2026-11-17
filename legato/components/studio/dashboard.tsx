"use client";

import { BookOpen, Plus, Settings2, Sparkles, Trash2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { ACCESSORIES, FORMATS } from "@/lib/book/catalog";
import { demoProject, newProject } from "@/lib/book/demo";
import { deleteProject, listProjects, loadStudio, saveProject, saveStudio } from "@/lib/book/store";
import type { BookKind, ProjectSummary, StudioSettings } from "@/lib/book/types";
import { BRAND } from "@/lib/brand";
import { btnOutline, btnPrimary, Dialog, Field, iconBtn, inputCls, Panel, Segmented } from "./ui";

const STATUS: Record<ProjectSummary["status"], string> = { concept: "Concept", ontwerp: "In ontwerp", proef: "Proef bij klant", akkoord: "Akkoord" };

export function Dashboard() {
  const router = useRouter();
  const [projects, setProjects] = useState<ProjectSummary[] | null>(null);
  const [studio, setStudio] = useState<StudioSettings | null>(null);
  const [creating, setCreating] = useState(false);
  const [settings, setSettings] = useState(false);
  const [demo, setDemo] = useState<string | null>(null);
  const [form, setForm] = useState({ kind: "bruiloft" as BookKind, names: "", date: "", place: "" });

  const refresh = () => listProjects().then(setProjects);
  useEffect(() => {
    refresh();
    loadStudio().then(setStudio);
  }, []);

  const create = async () => {
    const p = newProject(form.kind, form.names.trim(), form.date.trim(), form.place.trim(), studio?.name ?? "");
    await saveProject(p);
    router.push(`/studio/project/${p.id}`);
  };

  const openDemo = async () => {
    setDemo("Voorbeeld opbouwen…");
    const p = await demoProject((d, t) => setDemo(`Demobeelden maken… ${d}/${t}`));
    p.photographer = studio?.name ?? p.photographer;
    await saveProject(p);
    router.push(`/studio/project/${p.id}`);
  };

  const patchStudio = (patch: Partial<StudioSettings>) => {
    if (!studio) return;
    const next = { ...studio, ...patch };
    setStudio(next);
    saveStudio(next);
  };

  return (
    <div style={studio ? ({ ["--primary" as string]: studio.accent, ["--primary-hover" as string]: studio.accent, ["--ring" as string]: studio.accent }) : undefined}>
      <header className="border-b bg-background">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-5 py-4">
          <div>
            <p className="font-display text-2xl leading-none">{studio?.name ?? "Studio"}</p>
            <p className="mt-1 text-xs text-muted-foreground">{studio?.tagline} · boekenstudio van {BRAND.name}</p>
          </div>
          <div className="flex items-center gap-2">
            <Link href="/" className="hidden text-sm text-muted-foreground hover:text-foreground sm:block">Naar de website</Link>
            <button type="button" className={btnOutline} onClick={() => setSettings(true)}><Settings2 className="h-4 w-4" strokeWidth={1.5} /> Studio-instellingen</button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-5 py-10">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="eyebrow">Projecten</p>
            <h1 className="mt-3 text-4xl">Boeken in de maak</h1>
          </div>
          <div className="flex gap-2">
            <button type="button" className={btnOutline} onClick={openDemo} disabled={Boolean(demo)}><Sparkles className="h-4 w-4" strokeWidth={1.5} /> {demo ?? "Open een voorbeeldboek"}</button>
            <button type="button" className={btnPrimary} onClick={() => setCreating(true)}><Plus className="h-4 w-4" /> Nieuw boek</button>
          </div>
        </div>

        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {projects?.map((p) => (
            <article key={p.id} className="group relative rounded-sm border bg-card p-5 transition-shadow hover:shadow-[var(--shadow-soft)]">
              <Link href={`/studio/project/${p.id}`} className="absolute inset-0" aria-label={`Open ${p.title}`} />
              <div className="flex items-start justify-between gap-3">
                <span className="rounded-full border px-2.5 py-0.5 text-[0.6875rem] uppercase tracking-[0.14em] text-muted-foreground">{STATUS[p.status]}</span>
                <button type="button" className={`${iconBtn} relative z-10 opacity-0 group-hover:opacity-100 focus:opacity-100`} aria-label={`Verwijder ${p.title}`}
                  onClick={async () => { if (confirm(`“${p.title}” met alle foto's verwijderen? Dit kan niet ongedaan worden gemaakt.`)) { await deleteProject(p.id); refresh(); } }}>
                  <Trash2 className="h-4 w-4" strokeWidth={1.5} />
                </button>
              </div>
              <h2 className="mt-6 text-3xl leading-tight">{p.title}</h2>
              <p className="mt-1 text-sm text-muted-foreground">{p.kind === "reis" ? "Reisboek" : "Trouwboek"}{p.date ? ` · ${p.date}` : ""}</p>
              <p className="mt-6 border-t pt-3 text-xs text-muted-foreground">{p.photos} foto&apos;s · {p.spreads} spreads · bewerkt {new Date(p.updatedAt).toLocaleDateString("nl-NL", { day: "numeric", month: "short" })}</p>
            </article>
          ))}
          {projects?.length === 0 && (
            <div className="rounded-sm border border-dashed p-10 text-center sm:col-span-2 lg:col-span-3">
              <BookOpen className="mx-auto h-8 w-8 text-ribbon" strokeWidth={1} />
              <h2 className="mt-4 text-2xl">Nog geen boeken</h2>
              <p className="mx-auto mt-2 max-w-md text-sm leading-relaxed text-muted-foreground">Begin een boek voor een bruidspaar, of open het voorbeeldboek om te zien hoe hoofdstukken, verhalen en foto&apos;s samen een ontwerp worden.</p>
            </div>
          )}
        </div>
        <p className="mt-10 max-w-2xl text-xs leading-relaxed text-muted-foreground">Projecten en foto&apos;s worden nu in deze browser bewaard. Ze staan nog niet op een server: een ander apparaat of het bruidspaar thuis ziet ze nog niet.</p>
      </main>

      <Dialog open={creating} onClose={() => setCreating(false)} title="Nieuw boek">
        <div className="space-y-4">
          <Field label="Soort boek">
            <Segmented value={form.kind} onChange={(kind) => setForm({ ...form, kind })} options={[{ value: "bruiloft", label: "Trouwboek" }, { value: "reis", label: "Reisboek" }]} />
          </Field>
          <Field label={form.kind === "reis" ? "Titel op de omslag" : "Namen"}><input className={inputCls} value={form.names} onChange={(e) => setForm({ ...form, names: e.target.value })} placeholder={form.kind === "reis" ? "Patagonië" : "Noor & Daan"} autoFocus /></Field>
          <div className="grid grid-cols-2 gap-4">
            <Field label="Datum"><input className={inputCls} value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} placeholder="14 juni 2026" /></Field>
            <Field label="Plaats"><input className={inputCls} value={form.place} onChange={(e) => setForm({ ...form, place: e.target.value })} placeholder="Landgoed, stad of streek" /></Field>
          </div>
          <p className="text-xs leading-relaxed text-muted-foreground">Het boek start met de gebruikelijke hoofdstukken voor een {form.kind === "reis" ? "reis" : "bruiloft"}. Je past ze daarna aan.</p>
          <div className="flex justify-end pt-2"><button type="button" className={btnPrimary} onClick={create} disabled={!form.names.trim()}>Boek aanmaken</button></div>
        </div>
      </Dialog>

      <Dialog open={settings && Boolean(studio)} onClose={() => setSettings(false)} title="Studio-instellingen" wide>
        {studio && (
          <div className="grid gap-6 lg:grid-cols-2">
            <Panel title="Jouw merk">
              <div className="space-y-4">
                <Field label="Studionaam" hint="Staat bovenin het portaal en in het colofon van elk boek."><input className={inputCls} value={studio.name} onChange={(e) => patchStudio({ name: e.target.value })} /></Field>
                <Field label="Ondertitel"><input className={inputCls} value={studio.tagline} onChange={(e) => patchStudio({ tagline: e.target.value })} /></Field>
                <Field label="Accentkleur" hint="Knoppen en accenten in jouw portaal en in de klantweergave.">
                  <div className="flex items-center gap-3"><input type="color" value={studio.accent} onChange={(e) => patchStudio({ accent: e.target.value })} className="h-9 w-14 cursor-pointer rounded-sm border bg-card" /><span className="text-sm text-muted-foreground">{studio.accent}</span></div>
                </Field>
              </div>
            </Panel>
            <Panel title="Drukwerk">
              <div className="grid grid-cols-3 gap-4">
                <Field label="Afloop (mm)"><input type="number" min={0} max={10} className={inputCls} value={studio.bleedMm} onChange={(e) => patchStudio({ bleedMm: Number(e.target.value) })} /></Field>
                <Field label="Veilige marge (mm)"><input type="number" min={0} max={30} className={inputCls} value={studio.safeMm} onChange={(e) => patchStudio({ safeMm: Number(e.target.value) })} /></Field>
                <Field label="Minimum ppi"><input type="number" min={100} max={400} className={inputCls} value={studio.minPpi} onChange={(e) => patchStudio({ minPpi: Number(e.target.value) })} /></Field>
              </div>
              <p className="mt-3 text-xs leading-relaxed text-muted-foreground">Neem afloop en veilige marge over uit de Print &amp; Bind-gids van {BRAND.printer} voor het gekozen formaat. De standaardwaarden hier zijn een voorzichtige aanname.</p>
            </Panel>
            <Panel title="Jouw verkoopprijzen" className="lg:col-span-2">
              <p className="mb-4 text-xs leading-relaxed text-muted-foreground">Jij bepaalt wat het bruidspaar betaalt (incl. btw). Laat een veld leeg om &ldquo;op aanvraag&rdquo; te tonen.</p>
              <div className="grid gap-x-6 gap-y-3 sm:grid-cols-2 lg:grid-cols-3">
                {FORMATS.map((f) => (
                  <Field key={f.id} label={`Boek ${f.label}`}><Price value={studio.bookPrice[f.id]} onChange={(v) => patchStudio({ bookPrice: { ...studio.bookPrice, [f.id]: v } })} /></Field>
                ))}
                <Field label="Spreads inbegrepen"><input type="number" min={10} className={inputCls} value={studio.includedSpreads} onChange={(e) => patchStudio({ includedSpreads: Number(e.target.value) })} /></Field>
                <Field label="Prijs per extra spread"><Price value={studio.extraSpreadPrice} onChange={(v) => patchStudio({ extraSpreadPrice: v })} /></Field>
                {ACCESSORIES.map((a) => (
                  <Field key={a.id} label={a.name}><Price value={studio.accessoryPrice[a.id]} onChange={(v) => patchStudio({ accessoryPrice: { ...studio.accessoryPrice, [a.id]: v } })} /></Field>
                ))}
              </div>
            </Panel>
          </div>
        )}
      </Dialog>
    </div>
  );
}

function Price({ value, onChange }: { value: number | undefined; onChange: (v: number) => void }) {
  return (
    <div className="relative">
      <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">€</span>
      <input type="number" min={0} className={`${inputCls} pl-7`} value={value || ""} onChange={(e) => onChange(Number(e.target.value) || 0)} placeholder="op aanvraag" />
    </div>
  );
}
