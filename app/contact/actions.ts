"use server";

import { aanvraagSchema, BIJLAGE_LIMIETEN } from "@/lib/aanvraag-schema";
import { sendAanvraagEmail, type Bijlage } from "@/lib/email";

export type AanvraagResult = { ok: true } | { ok: false; error: string };

/**
 * Server action for the request form. Receives FormData (fields as JSON in
 * `data`, optional files in `bijlagen`), validates everything again on the
 * server and only reports success after the e-mail was accepted. Nothing is
 * stored by the website.
 */
export async function submitAanvraag(formData: FormData): Promise<AanvraagResult> {
  let raw: unknown;
  try {
    raw = JSON.parse(String(formData.get("data") ?? ""));
  } catch {
    return { ok: false, error: "Je aanvraag kon niet worden gelezen. Probeer het opnieuw." };
  }

  const parsed = aanvraagSchema.safeParse(raw);
  if (!parsed.success) {
    return { ok: false, error: "Niet alle gegevens zijn compleet of geldig. Loop het formulier nog even na." };
  }

  // Honeypot filled → pretend success, drop silently (spam).
  if (parsed.data.website) return { ok: true };

  const files = formData.getAll("bijlagen").filter((f): f is File => f instanceof File && f.size > 0);
  if (files.length > BIJLAGE_LIMIETEN.maxAantal) {
    return { ok: false, error: `Je kunt maximaal ${BIJLAGE_LIMIETEN.maxAantal} bestanden meesturen.` };
  }
  let total = 0;
  const bijlagen: Bijlage[] = [];
  for (const [i, file] of files.entries()) {
    if (!BIJLAGE_LIMIETEN.types.includes(file.type)) {
      return { ok: false, error: "Alleen foto's (JPG, PNG, WebP) en PDF's kunnen mee." };
    }
    total += file.size;
    if (total > BIJLAGE_LIMIETEN.maxBytesTotaal) {
      return { ok: false, error: "De bestanden zijn samen te groot (max. 5 MB). Stuur er minder of kleinere mee." };
    }
    const ext = file.type === "application/pdf" ? "pdf" : file.type === "image/png" ? "png" : file.type === "image/webp" ? "webp" : "jpg";
    bijlagen.push({ filename: `bijlage-${i + 1}.${ext}`, contentType: file.type, content: Buffer.from(await file.arrayBuffer()) });
  }

  const result = await sendAanvraagEmail(parsed.data, bijlagen);
  if (!result.ok) {
    return {
      ok: false,
      error:
        result.reason === "not_configured"
          ? "Het formulier is op dit moment niet aangesloten. Bel of mail ons, dan helpen we je direct."
          : "Versturen is niet gelukt. Probeer het later opnieuw of neem telefonisch contact met ons op.",
    };
  }
  return { ok: true };
}
