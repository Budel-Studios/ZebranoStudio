import "server-only";
import Anthropic from "@anthropic-ai/sdk";
import { zodOutputFormat } from "@anthropic-ai/sdk/helpers/zod";
import type { z } from "zod";

/** Model for all design work. Change it here only. */
const MODEL = "claude-opus-5-5";

export const claudeConfigured = () => Boolean(process.env.ANTHROPIC_API_KEY || process.env.ANTHROPIC_AUTH_TOKEN);

export class DesignerError extends Error {
  constructor(message: string, public status = 502) {
    super(message);
  }
}

/**
 * One structured request to Claude. Streams (a full book plan is long) and
 * returns the validated object. Errors come back as Dutch messages the
 * editor can show as they are.
 */
export async function askClaude<T extends z.ZodType>(opts: {
  system: string;
  user: string;
  schema: T;
  effort?: "low" | "medium" | "high";
  maxTokens?: number;
}): Promise<z.infer<T>> {
  if (!claudeConfigured()) throw new DesignerError("Claude is niet gekoppeld (geen ANTHROPIC_API_KEY).", 503);
  const client = new Anthropic();
  try {
    const stream = client.beta.messages.stream({
      model: MODEL,
      max_tokens: opts.maxTokens ?? 32000,
      // If a safety classifier declines, the API retries on a fallback model.
      betas: ["server-side-fallback-2026-07-01"],
      fallbacks: "default",
      output_config: { effort: opts.effort ?? "medium", format: zodOutputFormat(opts.schema) },
      system: [{ type: "text", text: opts.system, cache_control: { type: "ephemeral" } }],
      messages: [{ role: "user", content: opts.user }],
    });
    const message = await stream.finalMessage();
    if (message.stop_reason === "refusal") throw new DesignerError("Claude heeft dit verzoek geweigerd.", 422);
    if (message.stop_reason === "max_tokens") throw new DesignerError("Het ontwerp werd te lang. Verlaag het aantal spreads en probeer opnieuw.", 422);
    const text = message.content.flatMap((b) => (b.type === "text" ? [b.text] : [])).join("");
    const parsed = opts.schema.safeParse(JSON.parse(text));
    if (!parsed.success) throw new DesignerError("Claude gaf een antwoord in een onverwachte vorm.");
    return parsed.data;
  } catch (e) {
    if (e instanceof DesignerError) throw e;
    if (e instanceof Anthropic.AuthenticationError) throw new DesignerError("De Claude API-sleutel is ongeldig.", 503);
    if (e instanceof Anthropic.RateLimitError) throw new DesignerError("Claude is even druk. Probeer het over een minuut opnieuw.", 429);
    if (e instanceof Anthropic.APIError) throw new DesignerError(`Claude gaf een fout (${e.status ?? "verbinding"}).`);
    if (e instanceof SyntaxError) throw new DesignerError("Claude gaf een onvolledig antwoord.");
    throw e;
  }
}
