import { askClaude, claudeConfigured, DesignerError } from "@/lib/ai/claude";
import { bookPrompt, DESIGN_SYSTEM, spreadPrompt } from "@/lib/ai/prompts";
import { GuardError, guardedJson } from "@/lib/ai/guard";
import { BookDesign, SpreadOptions } from "@/lib/ai/schema";
import type { Project } from "@/lib/book/types";

export const maxDuration = 300;

/** Tells the editor whether the Claude designer is connected. */
export function GET() {
  return Response.json({ claude: claudeConfigured() });
}

export async function POST(request: Request) {
  let body: { project?: Project; spreadId?: string; instruction?: string };
  try {
    body = await guardedJson(request, { bucket: "design", perHour: 30, maxBytes: 1_500_000 });
  } catch (e) {
    if (e instanceof GuardError) return Response.json({ error: e.message }, { status: e.status });
    throw e;
  }
  const project = body.project;
  if (!project || !Array.isArray(project.chapters) || !Array.isArray(project.photos) || !Array.isArray(project.stories) || !Array.isArray(project.spreads) || !project.style) {
    return Response.json({ error: "Geen project meegestuurd." }, { status: 400 });
  }
  if (project.photos.length > 2000 || project.stories.length > 200 || project.chapters.length > 40 || project.spreads.length > 150 || (body.instruction ?? "").length > 600) {
    return Response.json({ error: "Dit boek is te groot om in één keer te ontwerpen." }, { status: 413 });
  }
  project.style.targetSpreads = Math.min(100, Math.max(10, Number(project.style.targetSpreads) || 30));
  project.style.brief = String(project.style.brief ?? "").slice(0, 2000);
  try {
    if (body.spreadId) {
      const spread = project.spreads.find((s) => s.id === body.spreadId);
      if (!spread) return Response.json({ error: "Spread niet gevonden." }, { status: 404 });
      const result = await askClaude({ system: DESIGN_SYSTEM, user: spreadPrompt(project, spread, body.instruction ?? ""), schema: SpreadOptions, maxTokens: 16000 });
      return Response.json(result);
    }
    const result = await askClaude({ system: DESIGN_SYSTEM, user: bookPrompt(project), schema: BookDesign, effort: "high", maxTokens: 48000 });
    return Response.json(result);
  } catch (e) {
    if (e instanceof DesignerError) return Response.json({ error: e.message }, { status: e.status });
    console.error("design route", e);
    return Response.json({ error: "Er ging iets mis bij het ontwerpen." }, { status: 500 });
  }
}
