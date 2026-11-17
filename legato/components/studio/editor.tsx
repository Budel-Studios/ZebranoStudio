"use client";

import { ArrowLeft, BookOpen, Eye, Redo2, Undo2 } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { loadStudio } from "@/lib/book/store";
import type { Project, Role, StudioSettings } from "@/lib/book/types";
import { BRAND } from "@/lib/brand";
import { cn } from "@/lib/utils";
import { BookTab } from "./book-tab";
import { DesignTab } from "./design-tab";
import { OrderTab } from "./order-tab";
import { PhotosTab } from "./photos-tab";
import { Preview } from "./preview";
import { StoryTab } from "./story-tab";
import { btnOutline, iconBtn, Segmented } from "./ui";
import { useProject, type Update } from "./use-project";

export interface TabProps {
  project: Project;
  update: Update;
  role: Role;
  studio: StudioSettings;
  /** Whether the Claude designer is connected on the server. */
  claude: boolean;
  goto: (tab: TabId, spreadId?: string) => void;
}

export type TabId = "verhaal" | "fotos" | "ontwerp" | "boek" | "bestellen";

const TABS: Array<{ id: TabId; label: string; n: string; roles: Role[] }> = [
  { id: "verhaal", n: "01", label: "Verhaal", roles: ["fotograaf", "klant"] },
  { id: "fotos", n: "02", label: "Foto's", roles: ["fotograaf", "klant"] },
  { id: "ontwerp", n: "03", label: "Ontwerp", roles: ["fotograaf"] },
  { id: "boek", n: "04", label: "Boek", roles: ["fotograaf", "klant"] },
  { id: "bestellen", n: "05", label: "Controle & bestellen", roles: ["fotograaf", "klant"] },
];

export function Editor({ id }: { id: string }) {
  const { project, update, undo, redo, saved, canUndo, canRedo } = useProject(id);
  const [studio, setStudio] = useState<StudioSettings | null>(null);
  const [role, setRole] = useState<Role>("fotograaf");
  const [tab, setTab] = useState<TabId>("verhaal");
  const [focus, setFocus] = useState<string | undefined>();
  const [claude, setClaude] = useState(false);
  const [preview, setPreview] = useState(false);

  useEffect(() => {
    loadStudio().then(setStudio);
    fetch("/api/design").then((r) => r.json()).then((d) => setClaude(Boolean(d.claude))).catch(() => setClaude(false));
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const el = e.target as HTMLElement;
      if (el.tagName === "INPUT" || el.tagName === "TEXTAREA" || el.isContentEditable) return;
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "z") {
        e.preventDefault();
        if (e.shiftKey) redo(); else undo();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [undo, redo]);

  if (project === undefined || !studio) return <p className="p-10 text-sm text-muted-foreground">Boek laden…</p>;
  if (project === null) {
    return (
      <div className="mx-auto max-w-md p-10 text-center">
        <h1 className="text-3xl">Dit boek staat niet in deze browser</h1>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">Projecten worden nu lokaal bewaard. Open het boek op het apparaat waarop het is gemaakt.</p>
        <Link href="/studio" className={cn(btnOutline, "mt-6")}>Terug naar de studio</Link>
      </div>
    );
  }

  const goto = (t: TabId, spreadId?: string) => {
    setTab(t);
    setFocus(spreadId);
  };
  const tabs = TABS.filter((t) => t.roles.includes(role));
  const active = tabs.some((t) => t.id === tab) ? tab : "verhaal";
  const props: TabProps = { project, update, role, studio, claude, goto };

  return (
    <div className="flex min-h-dvh flex-col" style={{ ["--primary" as string]: studio.accent, ["--primary-hover" as string]: studio.accent, ["--ring" as string]: studio.accent }}>
      <header className="sticky top-0 z-30 border-b bg-background/95 backdrop-blur">
        <div className="flex items-center gap-3 px-4 py-2.5">
          <Link href="/studio" className={iconBtn} aria-label="Terug naar projecten"><ArrowLeft className="h-4 w-4" /></Link>
          <div className="min-w-0 flex-1">
            <input value={project.title} onChange={(e) => update((p) => ({ ...p, title: e.target.value }))} aria-label="Titel van het project"
              className="w-full max-w-md truncate bg-transparent font-display text-xl leading-tight outline-none focus:underline focus:decoration-ribbon focus:underline-offset-4" />
            <p className="truncate text-[0.6875rem] text-muted-foreground">{studio.name} · {BRAND.name} · {saved ? "opgeslagen" : "opslaan…"}</p>
          </div>
          <Segmented value={role} onChange={setRole} options={[{ value: "fotograaf", label: "Fotograaf" }, { value: "klant", label: "Bruidspaar" }]} className="hidden sm:inline-flex" />
          <button type="button" className={iconBtn} onClick={undo} disabled={!canUndo} aria-label="Ongedaan maken"><Undo2 className="h-4 w-4" /></button>
          <button type="button" className={iconBtn} onClick={redo} disabled={!canRedo} aria-label="Opnieuw"><Redo2 className="h-4 w-4" /></button>
          <button type="button" className={btnOutline} onClick={() => setPreview(true)} disabled={!project.spreads.length}><Eye className="h-4 w-4" strokeWidth={1.5} /> <span className="hidden md:inline">Voorvertoning</span></button>
        </div>
        <nav className="flex gap-1 overflow-x-auto px-3 no-scrollbar" aria-label="Stappen">
          {tabs.map((t) => (
            <button key={t.id} type="button" onClick={() => goto(t.id)} aria-current={t.id === active ? "step" : undefined}
              className={cn("flex shrink-0 items-baseline gap-2 border-b-2 px-3 py-2.5 text-sm transition-colors", t.id === active ? "border-primary text-foreground" : "border-transparent text-muted-foreground hover:text-foreground")}>
              <span className="text-[0.625rem] tracking-[0.18em] text-ribbon">{t.n}</span>{t.label}
            </button>
          ))}
        </nav>
      </header>

      {role === "klant" && (
        <p className="flex items-center gap-2 border-b bg-board/40 px-4 py-2 text-xs">
          <BookOpen className="h-3.5 w-3.5" strokeWidth={1.5} /> Klantweergave: zo ziet het bruidspaar het boek. Zij voegen verhalen toe, kiezen favorieten, plaatsen opmerkingen en geven akkoord.
        </p>
      )}

      <main className="flex-1">
        {active === "verhaal" && <StoryTab {...props} />}
        {active === "fotos" && <PhotosTab {...props} />}
        {active === "ontwerp" && <DesignTab {...props} />}
        {active === "boek" && <BookTab key={focus ?? "boek"} {...props} focusSpread={focus} />}
        {active === "bestellen" && <OrderTab {...props} />}
      </main>

      {preview && <Preview project={project} onClose={() => setPreview(false)} />}
    </div>
  );
}
