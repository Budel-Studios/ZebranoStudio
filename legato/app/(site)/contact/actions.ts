"use server";

import { contactSchema } from "@/lib/contact-schema";
import { sendContactEmail } from "@/lib/email";

export type ContactResult = { ok: true } | { ok: false; error: string };

/**
 * Server action for the request form. Validates again on the server and only
 * reports success after the e-mail was accepted by the mail service. Nothing
 * is stored by the website. Without mail configuration it returns a friendly
 * error; it never pretends a message was sent.
 */
export async function submitContact(input: unknown): Promise<ContactResult> {
  const parsed = contactSchema.safeParse(input);
  if (!parsed.success) {
    return { ok: false, error: "Niet alle gegevens zijn compleet of geldig. Loop het formulier nog even na." };
  }

  // Honeypot filled → a bot. Drop silently; a real visitor never fills this field.
  if (parsed.data.website) return { ok: true };

  const result = await sendContactEmail(parsed.data);
  if (!result.ok) {
    return {
      ok: false,
      error:
        result.reason === "not_configured"
          ? "Het formulier is op dit moment nog niet aangesloten, dus je bericht is niet verstuurd. Mail ons rechtstreeks, dan helpen we je verder."
          : "Versturen is niet gelukt, je bericht is niet aangekomen. Probeer het later opnieuw of mail ons rechtstreeks.",
    };
  }
  return { ok: true };
}
