import { formatOf } from "./catalog";
import { unplacedStories } from "./autodesign";
import { expiredSignoff, validSignoff } from "./integrity";
import { capacity } from "./typography";
import type { Project, StudioSettings } from "./types";

export interface Issue {
  level: "blokkerend" | "let op" | "tip";
  spread?: number;
  spreadId?: string;
  text: string;
}

/** Print checks a prepress operator would do, run live on the design. */
export function preflight(project: Project, studio: StudioSettings): Issue[] {
  const issues: Issue[] = [];
  const f = formatOf(project.formatId);
  const photos = new Map(project.photos.map((p) => [p.id, p]));
  const used = new Map<string, number>();
  const safeX = (studio.safeMm / (f.pageW * 2)) * 100;
  const safeY = (studio.safeMm / f.pageH) * 100;
  const foldMm = 10;
  const fold = (foldMm / (f.pageW * 2)) * 100;

  if (project.spreads.length === 0) issues.push({ level: "blokkerend", text: "Het boek heeft nog geen ontwerp." });
  if (project.spreads.length > 0 && project.spreads.length < 15) issues.push({ level: "let op", text: `Het boek telt ${project.spreads.length} spreads. Controleer het minimum van de drukker voor dit formaat.` });
  if (project.spreads.length > 100) issues.push({ level: "let op", text: `Het boek telt ${project.spreads.length} spreads. Controleer het maximum van de drukker (rugdikte).` });

  project.spreads.forEach((s, i) => {
    const n = i + 1;
    const at = { spread: n, spreadId: s.id };
    for (const fr of s.frames) {
      if (fr.kind === "image") {
        if (!fr.photoId || !photos.has(fr.photoId)) {
          issues.push({ level: "blokkerend", ...at, text: "Leeg fotokader." });
          continue;
        }
        const p = photos.get(fr.photoId)!;
        used.set(p.id, (used.get(p.id) ?? 0) + 1);
        if (p.placeholder) continue;
        // Effective resolution: the photo is scaled to cover the frame.
        const wMm = (fr.w / 100) * f.pageW * 2;
        const hMm = (fr.h / 100) * f.pageH;
        const scale = Math.max(wMm / p.w, hMm / p.h);
        const ppi = 25.4 / scale;
        if (ppi < studio.minPpi * 0.75) issues.push({ level: "blokkerend", ...at, text: `Foto ${p.name} is te klein voor dit kader (${Math.round(ppi)} ppi). Kies een kleiner kader of een andere foto.` });
        else if (ppi < studio.minPpi) issues.push({ level: "let op", ...at, text: `Foto ${p.name} wordt net niet scherp genoeg gedrukt (${Math.round(ppi)} ppi, streef naar ${studio.minPpi} of meer).` });
        // A frame that crosses the fold without being a full-spread image.
        const crosses = fr.x < 50 - fold && fr.x + fr.w > 50 + fold;
        if (crosses && fr.fx > 0.4 && fr.fx < 0.6) issues.push({ level: "tip", ...at, text: "Beeld loopt over de vouw met het zwaartepunt in het midden. Controleer of er geen gezicht in de vouw valt en verschuif anders het focuspunt." });
      } else if (fr.kind === "text") {
        if (!fr.text.trim()) continue;
        const out = fr.x < safeX - 0.05 || fr.y < safeY - 0.05 || fr.x + fr.w > 100 - safeX + 0.05 || fr.y + fr.h > 100 - safeY + 0.05;
        if (out) issues.push({ level: "let op", ...at, text: `Tekst staat binnen ${studio.safeMm} mm van de snijrand.` });
        if (fr.x < 50 - fold / 2 && fr.x + fr.w > 50 + fold / 2) issues.push({ level: "let op", ...at, text: "Tekst loopt over de vouw. Zet de tekst op één pagina." });
        if ((fr.role === "body" || fr.role === "list") && fr.text.length > capacity(fr, project.formatId) * 1.12) issues.push({ level: "let op", ...at, text: "Tekst past waarschijnlijk niet in het kader. Kort in, vergroot het kader of verdeel over twee spreads." });
        if (/lorem ipsum/i.test(fr.text) || /^(nieuwe tekst|titel|bovenkop|ondertitel|bijschrift)$/i.test(fr.text.trim())) issues.push({ level: "let op", ...at, text: "Er staat nog voorbeeldtekst." });
      }
    }
    if (s.comments.some((c) => !c.resolved)) issues.push({ level: "let op", ...at, text: "Er staat nog een open opmerking." });
  });

  for (const [id, count] of used) if (count > 1) issues.push({ level: "tip", text: `Foto ${photos.get(id)?.name} staat ${count} keer in het boek.` });
  const missingFav = project.photos.filter((p) => p.favorite && !used.has(p.id));
  if (missingFav.length) issues.push({ level: "let op", text: `${missingFav.length} favoriet${missingFav.length === 1 ? "" : "en"} van het bruidspaar ${missingFav.length === 1 ? "staat" : "staan"} nog niet in het boek.` });
  if (project.spreads.length) {
    for (const s of unplacedStories(project)) issues.push({ level: "let op", text: `Het verhaal “${s.title || s.author || s.text.slice(0, 30)}” staat niet in het boek.` });
  }
  if (project.photos.some((p) => p.placeholder && used.has(p.id))) issues.push({ level: "blokkerend", text: "Het boek bevat demobeelden. Vervang ze door echte foto's voordat je bestelt." });
  if (!project.cover.title.trim()) issues.push({ level: "let op", text: "De omslag heeft nog geen titel." });
  if (expiredSignoff(project, "klant")) issues.push({ level: "let op", text: "Het boek is gewijzigd na het akkoord van het bruidspaar. Vraag opnieuw akkoord." });
  else if (!validSignoff(project, "klant")) issues.push({ level: "let op", text: "Het bruidspaar heeft nog geen akkoord gegeven." });
  return issues;
}
