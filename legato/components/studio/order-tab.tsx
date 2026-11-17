"use client";

import { AlertTriangle, Check, CircleAlert, Download, Info, Printer } from "lucide-react";
import Link from "next/link";
import { useMemo, useState } from "react";
import { ACCESSORIES, COVER_MATERIALS, formatOf, FORMATS } from "@/lib/book/catalog";
import { preflight, type Issue } from "@/lib/book/preflight";
import type { Cover } from "@/lib/book/types";
import { BRAND } from "@/lib/brand";
import { cn } from "@/lib/utils";
import { CoverMock } from "./cover-mock";
import type { TabProps } from "./editor";
import { btnOutline, btnPrimary, euro, Field, inputCls, Panel, Segmented } from "./ui";

const ICON: Record<Issue["level"], typeof Info> = { blokkerend: CircleAlert, "let op": AlertTriangle, tip: Info };
const TONE: Record<Issue["level"], string> = { blokkerend: "text-destructive", "let op": "text-amber-700", tip: "text-muted-foreground" };

export function OrderTab({ project, update, role, studio, goto }: TabProps) {
  const issues = useMemo(() => preflight(project, studio), [project, studio]);
  const blocking = issues.filter((i) => i.level === "blokkerend").length;
  const [name, setName] = useState("");
  const photographer = role === "fotograaf";
  const setCover = (patch: Partial<Cover>) => update((p) => ({ ...p, cover: { ...p.cover, ...patch } }));
  const material = COVER_MATERIALS.find((m) => m.id === project.cover.material) ?? COVER_MATERIALS[0];
  const qty = (id: string) => project.order.find((o) => o.accessoryId === id)?.qty ?? 0;
  const setQty = (id: string, n: number) => update((p) => ({ ...p, order: [...p.order.filter((o) => o.accessoryId !== id), ...(n > 0 ? [{ accessoryId: id, qty: n }] : [])] }));

  const f = formatOf(project.formatId);
  const bookPrice = studio.bookPrice[f.id] || 0;
  const extra = Math.max(0, project.spreads.length - studio.includedSpreads);
  const lines: Array<{ label: string; amount: number | null }> = [
    { label: `Boek ${f.label}, tot ${studio.includedSpreads} spreads`, amount: bookPrice || null },
    ...(extra > 0 ? [{ label: `${extra} extra spread${extra === 1 ? "" : "s"}`, amount: studio.extraSpreadPrice ? extra * studio.extraSpreadPrice : null }] : []),
    ...project.order.map((o) => {
      const a = ACCESSORIES.find((x) => x.id === o.accessoryId);
      const price = studio.accessoryPrice[o.accessoryId] || 0;
      return { label: `${o.qty} × ${a?.name ?? o.accessoryId}`, amount: price ? price * o.qty : null };
    }),
  ];
  const open = lines.some((l) => l.amount === null);
  const total = lines.reduce((n, l) => n + (l.amount ?? 0), 0);
  const signed = (r: "fotograaf" | "klant") => project.signoffs.find((s) => s.role === r);
  const mine = signed(role);

  const sign = () => {
    if (!name.trim()) return;
    update((p) => ({ ...p, signoffs: [...p.signoffs.filter((s) => s.role !== role), { role, name: name.trim(), at: new Date().toISOString() }] }));
    setName("");
  };
  const exportJson = () => {
    const blob = new Blob([JSON.stringify({ project, issues, exportedAt: new Date().toISOString() }, null, 2)], { type: "application/json" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = `${project.title.replace(/[^\w-]+/g, "-").toLowerCase() || "boek"}.json`;
    a.click();
    URL.revokeObjectURL(a.href);
  };

  return (
    <div className="mx-auto grid max-w-7xl gap-6 p-5 lg:grid-cols-[1fr_24rem]">
      <div className="space-y-5">
        <Panel title="Drukcontrole" action={<span className={cn("text-xs", blocking ? "text-destructive" : "text-emerald-700")}>{blocking ? `${blocking} blokkerend` : issues.length ? "Geen blokkades" : "Alles in orde"}</span>}>
          {issues.length === 0 && <p className="flex items-center gap-2 text-sm"><Check className="h-4 w-4 text-emerald-700" /> Geen opmerkingen. Het boek kan naar de drukker.</p>}
          <ul className="divide-y">
            {issues.map((i, n) => {
              const Icon = ICON[i.level];
              return (
                <li key={n} className="flex items-start gap-3 py-2.5 text-sm">
                  <Icon className={cn("mt-0.5 h-4 w-4 shrink-0", TONE[i.level])} strokeWidth={1.5} />
                  <span className="flex-1">{i.spread && <span className="text-muted-foreground">Spread {i.spread}: </span>}{i.text}</span>
                  {i.spreadId && <button type="button" className="shrink-0 text-xs underline decoration-ribbon underline-offset-4" onClick={() => goto("boek", i.spreadId)}>Bekijk</button>}
                </li>
              );
            })}
          </ul>
          <p className="mt-4 text-xs leading-relaxed text-muted-foreground">Gecontroleerd met {studio.bleedMm} mm afloop, {studio.safeMm} mm veilige marge en minimaal {studio.minPpi} ppi. {photographer ? "Pas deze waarden aan in de studio-instellingen zodra je de sjablonen van de drukker hebt." : ""}</p>
        </Panel>

        <Panel title="Omslag">
          <div className="grid gap-6 sm:grid-cols-[13rem_1fr]">
            <div className="mx-auto w-full max-w-52 pb-4"><CoverMock project={project} fit="width" /></div>
            <div className="space-y-4">
              <Field label="Materiaal"><Segmented value={project.cover.material} onChange={(m) => setCover({ material: m, color: COVER_MATERIALS.find((x) => x.id === m)?.colors[0].id ?? "" })} options={COVER_MATERIALS.map((m) => ({ value: m.id, label: m.name }))} /></Field>
              <Field label="Kleur">
                <div className="flex flex-wrap gap-2">
                  {material.colors.map((c) => (
                    <button key={c.id} type="button" onClick={() => setCover({ color: c.id })} aria-pressed={project.cover.color === c.id} title={c.name} className={cn("flex items-center gap-2 rounded-full border py-1 pl-1 pr-3 text-xs", project.cover.color === c.id ? "border-foreground" : "hover:border-foreground/40")}>
                      <span className="h-5 w-5 rounded-full border" style={{ background: c.hex }} />{c.name}
                    </button>
                  ))}
                </div>
              </Field>
              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Titel op de omslag"><input className={inputCls} value={project.cover.title} onChange={(e) => setCover({ title: e.target.value })} /></Field>
                <Field label="Regel eronder"><input className={inputCls} value={project.cover.subtitle} onChange={(e) => setCover({ subtitle: e.target.value })} /></Field>
              </div>
              <Field label="Preging"><Segmented value={project.cover.debossing} onChange={(debossing) => setCover({ debossing })} options={[{ value: "blind", label: "Blinddruk" }, { value: "goud", label: "Goudfolie" }, { value: "zilver", label: "Zilverfolie" }]} /></Field>
              <Field label="Formaat"><select className={inputCls} value={project.formatId} disabled={!photographer} onChange={(e) => update((p) => ({ ...p, formatId: e.target.value }))}>{FORMATS.map((x) => <option key={x.id} value={x.id}>{x.label}</option>)}</select></Field>
              <p className="text-xs leading-relaxed text-muted-foreground">De schets geeft een indruk. Kleuren en materialen zijn benamingen uit het assortiment van {BRAND.printer}; bevestig de exacte stof en kleur met een stalenboek.</p>
            </div>
          </div>
        </Panel>

        <Panel title="Maak het compleet">
          <ul className="grid gap-3 sm:grid-cols-2">
            {ACCESSORIES.map((a) => {
              const price = studio.accessoryPrice[a.id] || 0;
              const n = qty(a.id);
              return (
                <li key={a.id} className={cn("flex flex-col rounded-sm border p-4 transition-colors", n > 0 && "border-primary bg-background")}>
                  <p className="text-xs font-medium text-muted-foreground">{a.group}</p>
                  <p className="mt-1 font-display text-xl">{a.name}</p>
                  <p className="mt-1 flex-1 text-xs leading-relaxed text-muted-foreground">{a.text}</p>
                  <div className="mt-3 flex items-center justify-between">
                    <span className="text-sm">{price ? euro(price) : "Prijs op aanvraag"}</span>
                    <span className="flex items-center gap-1">
                      <button type="button" className="h-7 w-7 rounded-sm border disabled:opacity-30" onClick={() => setQty(a.id, n - 1)} disabled={n === 0} aria-label={`Minder ${a.name}`}>−</button>
                      <span className="w-6 text-center text-sm tabular-nums">{n}</span>
                      <button type="button" className="h-7 w-7 rounded-sm border" onClick={() => setQty(a.id, n + 1)} aria-label={`Meer ${a.name}`}>+</button>
                    </span>
                  </div>
                </li>
              );
            })}
          </ul>
        </Panel>
      </div>

      <aside className="space-y-5 lg:sticky lg:top-28 lg:self-start">
        <Panel title="Overzicht">
          <ul className="space-y-2 text-sm">
            {lines.map((l) => <li key={l.label} className="flex justify-between gap-4"><span>{l.label}</span><span className="shrink-0 tabular-nums text-muted-foreground">{l.amount === null ? "op aanvraag" : euro(l.amount)}</span></li>)}
          </ul>
          <p className="mt-4 flex justify-between border-t pt-3 font-medium"><span>Totaal incl. btw</span><span className="tabular-nums">{total ? `${euro(total)}${open ? " + op aanvraag" : ""}` : "op aanvraag"}</span></p>
          <p className="mt-2 text-xs leading-relaxed text-muted-foreground">Prijzen zijn die van {studio.name}. {photographer ? "Je stelt ze in bij de studio-instellingen." : ""}</p>
        </Panel>

        <Panel title="Akkoord voor druk">
          {(["klant", "fotograaf"] as const).map((r) => {
            const s = signed(r);
            return <p key={r} className="flex items-center gap-2 py-1 text-sm">{s ? <Check className="h-4 w-4 text-emerald-700" /> : <span className="h-4 w-4 rounded-full border" />}{r === "klant" ? "Bruidspaar" : "Fotograaf"}{s ? <span className="text-muted-foreground"> · {s.name}, {new Date(s.at).toLocaleString("nl-NL", { day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" })}</span> : <span className="text-muted-foreground"> · nog niet</span>}</p>;
          })}
          {mine ? (
            <button type="button" className={cn(btnOutline, "mt-3")} onClick={() => update((p) => ({ ...p, signoffs: p.signoffs.filter((s) => s.role !== role) }))}>Trek mijn akkoord in</button>
          ) : (
            <div className="mt-3 space-y-2">
              <p className="text-xs leading-relaxed text-muted-foreground">Lees het boek nog één keer in de voorvertoning: namen, data en spelling. Na akkoord gaat het naar de drukker zoals het er nu staat.</p>
              <input className={inputCls} value={name} onChange={(e) => setName(e.target.value)} placeholder="Je naam" aria-label="Je naam" />
              <button type="button" className={cn(btnPrimary, "w-full")} onClick={sign} disabled={!name.trim() || blocking > 0}>Ik geef akkoord</button>
              {blocking > 0 && <p className="text-xs text-destructive">Los eerst de blokkerende punten op.</p>}
            </div>
          )}
        </Panel>

        {photographer && (
          <Panel title="Naar de drukker">
            <p className="text-xs leading-relaxed text-muted-foreground">Het drukbestand bevat elke spread op ware grootte met {studio.bleedMm} mm afloop, in RGB met de originele foto&apos;s. Bewaar het als PDF vanuit het afdrukvenster en upload het in de Trade Area van {BRAND.printer}. De omslag bestel je daar met het gekozen materiaal.</p>
            <Link href={`/studio/project/${project.id}/print`} target="_blank" className={cn(btnPrimary, "mt-4 w-full")}><Printer className="h-4 w-4" strokeWidth={1.5} /> Open drukbestand</Link>
            <button type="button" className={cn(btnOutline, "mt-2 w-full")} onClick={exportJson}><Download className="h-4 w-4" strokeWidth={1.5} /> Download projectbestand</button>
          </Panel>
        )}
      </aside>
    </div>
  );
}
