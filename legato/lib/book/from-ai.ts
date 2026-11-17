import type { BookDesignT, SpreadDesignT } from "@/lib/ai/schema";
import { metricsFor, templateOf, TEMPLATES } from "./templates";
import { capacity, splitText } from "./typography";
import type { Project, SpreadPlan } from "./types";

const norm = (s: string) => s.toLowerCase().replace(/[“”"'‘’«»]/g, "").replace(/\s+/g, " ").trim();

/**
 * Turns what Claude returned into plans the app can trust: unknown ids are
 * dropped, story texts are set from the project itself (never from the
 * model), long texts continue on a next spread and quotes that are not
 * literally in a story are refused.
 */
export function plansFromAi(designs: SpreadDesignT[], project: Project, opts: { reservedPhotos?: Set<string> } = {}): { plans: SpreadPlan[]; dropped: string[] } {
  const photos = new Map(project.photos.map((p) => [p.id, p]));
  const stories = new Map(project.stories.map((s) => [s.id, s]));
  const chapters = new Set(project.chapters.map((c) => c.id));
  const used = new Set(opts.reservedPhotos ?? []);
  const m = metricsFor(project.formatId, project.style.margins);
  const dropped: string[] = [];
  const plans: SpreadPlan[] = [];

  const bodyCap = (template: string) => {
    const frame = templateOf(template).build({ p: [], t: { body: "x", body2: "x", title: "x", kicker: "x", attribution: "x", caption: "x" }, m })
      .find((f) => f.kind === "text" && (f.role === "body" || f.role === "list"));
    return frame && frame.kind === "text" ? capacity(frame, project.formatId) : 1200;
  };

  for (const d of designs) {
    const t = TEMPLATES.find((x) => x.id === d.template);
    if (!t) {
      dropped.push(`Onbekend sjabloon “${d.template}”.`);
      continue;
    }
    const chapterId = chapters.has(d.chapterId) ? d.chapterId : undefined;
    const ids = [...new Set(d.photoIds)].filter((id) => photos.has(id) && !used.has(id)).slice(0, t.photos);
    // Fill missing slots from unused photographs of the same chapter.
    if (ids.length < t.photos && chapterId) {
      for (const p of project.photos) {
        if (ids.length >= t.photos) break;
        if (p.chapterId === chapterId && !used.has(p.id) && !ids.includes(p.id)) ids.push(p.id);
      }
    }
    if (t.photos > 0 && ids.length === 0 && t.energy !== "tekst" && t.id !== "opener" && t.id !== "colofon") {
      dropped.push(`Spread “${t.name}” had geen bruikbare foto's.`);
      continue;
    }
    ids.forEach((id) => used.add(id));

    const quote = d.quote.trim();
    // A quote must be literally in a story, and its name is that story's author.
    const source = norm(quote).length >= 8 ? project.stories.find((s) => norm(s.text).includes(norm(quote))) : undefined;
    if (t.texts.includes("quote")) {
      if (!source) {
        dropped.push("Een citaat dat niet letterlijk in een verhaal stond is weggelaten.");
        ids.forEach((id) => used.delete(id));
        continue;
      }
    }

    const story = stories.get(d.storyId);
    const story2 = stories.get(d.storyId2);
    const base: SpreadPlan = {
      template: t.id, chapterId, photoIds: ids, background: d.background, bw: d.blackAndWhite, rationale: d.rationale,
      texts: { kicker: d.kicker, title: d.title, subtitle: d.subtitle, quote, attribution: (t.texts.includes("quote") ? source?.author : story?.author) || d.attribution || "", caption: d.caption },
    };

    if (t.texts.includes("body")) {
      if (!story && t.id !== "colofon") {
        // A body template without a story: keep what the model wrote only for the colophon.
        if (t.energy === "tekst") {
          dropped.push(`Spread “${t.name}” verwees naar een verhaal dat niet bestaat.`);
          ids.forEach((id) => used.delete(id));
          continue;
        }
      }
      if (t.id === "colofon") {
        base.texts.body = [project.names, [project.place, project.date].filter(Boolean).join(", "), project.photographer ? `Fotografie: ${project.photographer}` : "", "Gedrukt en gebonden in Italië", "Exemplaar 1 van 1"].filter(Boolean).join("\n");
        base.texts.title = "Colofon";
        plans.push(base);
        continue;
      }
      if (t.id === "geloften") {
        base.texts.body = story?.text ?? "";
        base.texts.attribution = story?.author ?? "";
        base.texts.body2 = story2?.text ?? "";
        base.texts.caption = story2?.author ?? "";
        base.texts.title = d.title || "Geloften";
        plans.push(base);
        continue;
      }
      const parts = splitText(story?.text ?? "", bodyCap(t.id));
      parts.forEach((body, i) => {
        plans.push({
          ...base,
          photoIds: i === 0 ? ids : [],
          textOnly: true,
          texts: {
            ...base.texts,
            title: i === 0 ? base.texts.title || story?.title || "" : "",
            kicker: i === 0 ? base.texts.kicker : base.texts.kicker ? `${base.texts.kicker}, vervolg` : "Vervolg",
            body,
            attribution: i === parts.length - 1 ? base.texts.attribution : "",
          },
          rationale: i === 0 ? base.rationale : "Vervolg van de tekst, zodat de regels lucht houden.",
        });
      });
      continue;
    }
    plans.push(base);
  }
  return { plans, dropped };
}

export const conceptOf = (d: BookDesignT) => d.concept;
