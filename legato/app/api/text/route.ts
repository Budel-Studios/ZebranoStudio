import { askClaude, DesignerError } from "@/lib/ai/claude";
import { GuardError, guardedJson } from "@/lib/ai/guard";
import { TEXT_SYSTEM, TEXT_TASKS } from "@/lib/ai/prompts";
import { TextResult } from "@/lib/ai/schema";

export const maxDuration = 120;

export async function POST(request: Request) {
  let body: { task?: string; text?: string; kind?: string; author?: string };
  try {
    body = await guardedJson(request, { bucket: "text", perHour: 120, maxBytes: 100_000 });
  } catch (e) {
    if (e instanceof GuardError) return Response.json({ error: e.message }, { status: e.status });
    throw e;
  }
  const task = TEXT_TASKS[body.task ?? ""];
  const text = (body.text ?? "").trim();
  if (!task || !text) return Response.json({ error: "Geen tekst of taak meegestuurd." }, { status: 400 });
  if (text.length > 40000) return Response.json({ error: "Deze tekst is te lang om in één keer te bewerken." }, { status: 413 });
  try {
    const result = await askClaude({
      system: TEXT_SYSTEM,
      user: `Kind of text: ${body.kind ?? "story"}${body.author ? `, by ${body.author}` : ""}.\n\n<text>\n${text}\n</text>\n\n${task.ask}`,
      schema: TextResult,
      effort: "low",
      maxTokens: 16000,
    });
    return Response.json(result);
  } catch (e) {
    if (e instanceof DesignerError) return Response.json({ error: e.message }, { status: e.status });
    console.error("text route", e);
    return Response.json({ error: "Er ging iets mis bij het bewerken van de tekst." }, { status: 500 });
  }
}
