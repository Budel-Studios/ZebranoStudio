import "server-only";

/**
 * Protection for the routes that spend Claude credits. There are no accounts
 * yet, so this is deliberately simple: same-origin requests only, an optional
 * shared access code, a body size cap and a per-address hourly limit. Set a
 * spend limit on the API key as well; this is not a substitute for accounts.
 */

const hits = new Map<string, number[]>();
const HOUR = 60 * 60 * 1000;

export class GuardError extends Error {
  constructor(message: string, public status: number) {
    super(message);
  }
}

export async function guardedJson<T>(request: Request, opts: { bucket: string; perHour: number; maxBytes: number }): Promise<T> {
  const origin = request.headers.get("origin");
  const host = request.headers.get("x-forwarded-host") ?? request.headers.get("host");
  if (!origin || !host || new URL(origin).host !== host) throw new GuardError("Dit verzoek komt niet uit de studio.", 403);

  const code = process.env.STUDIO_ACCESS_CODE;
  if (code && request.headers.get("x-studio-code") !== code) throw new GuardError("De toegangscode van de studio ontbreekt of klopt niet. Vul hem in bij de studio-instellingen.", 401);

  const address = (request.headers.get("x-forwarded-for") ?? "lokaal").split(",")[0].trim();
  const key = `${opts.bucket}:${address}`;
  const now = Date.now();
  const recent = (hits.get(key) ?? []).filter((t) => now - t < HOUR);
  if (recent.length >= opts.perHour) throw new GuardError("Te veel verzoeken in korte tijd. Probeer het over een uur opnieuw.", 429);
  hits.set(key, [...recent, now]);

  const text = await request.text();
  if (text.length > opts.maxBytes) throw new GuardError("Dit verzoek is te groot.", 413);
  try {
    return JSON.parse(text) as T;
  } catch {
    throw new GuardError("Ongeldig verzoek.", 400);
  }
}
