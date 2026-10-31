import "server-only";
import { company } from "@/data/company";
import { type AanvraagData, summarize } from "@/lib/aanvraag-schema";
import { deliverMail, LEAD_MAILBOX } from "@/lib/mail-transport";

/**
 * E-mail content for the request form. Delivery (Resend or SMTP) lives in
 * lib/mail-transport.ts; leads go to the MTB Bouw mailbox for now
 * (company.email, or OFFERTE_TO_EMAIL).
 */

function escapeHtml(value: string): string {
  return value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

export type Bijlage = { filename: string; contentType: string; content: Buffer };

function fields(d: AanvraagData, bijlagen: number): Array<[string, string]> {
  return [
    ...summarize(d),
    ["Naam", d.naam],
    ["Bedrijf", d.bedrijf || "—"],
    ["E-mail", d.email],
    ["Telefoon", d.telefoon || "—"],
    ["Bericht", d.bericht],
    ["Bijlagen", bijlagen > 0 ? `${bijlagen} als bijlage` : "Geen"],
  ];
}

function html(title: string, rows: Array<[string, string]>, footer: string): string {
  const tr = rows
    .map(
      ([l, v]) => `
      <tr>
        <td style="padding:10px 14px;border-bottom:1px solid #e1dbcb;font-weight:600;color:#2a2a2a;width:160px;vertical-align:top;">${escapeHtml(l)}</td>
        <td style="padding:10px 14px;border-bottom:1px solid #e1dbcb;color:#2a2a2a;white-space:pre-wrap;">${escapeHtml(v)}</td>
      </tr>`,
    )
    .join("");
  return `<!doctype html>
<html lang="nl">
<body style="margin:0;background:#f2f0ea;font-family:Arial,Helvetica,sans-serif;color:#2a2a2a;">
  <div style="max-width:640px;margin:0 auto;padding:24px;">
    <div style="background:#2f3a2a;color:#f2f0ea;padding:20px 24px;border-radius:10px 10px 0 0;">
      <p style="margin:0;font-size:18px;font-weight:700;">${escapeHtml(title)}</p>
      <p style="margin:6px 0 0;font-size:13px;color:#c2c2b0;">Zebrano Studio &middot; een merk van MTB Bouw</p>
    </div>
    <div style="background:#ffffff;border:1px solid #e1dbcb;border-top:none;border-radius:0 0 10px 10px;padding:8px 0;">
      <table style="width:100%;border-collapse:collapse;font-size:14px;">${tr}
      </table>
    </div>
    <p style="font-size:12px;color:#6b6b6b;margin-top:16px;">${escapeHtml(footer)}</p>
  </div>
</body>
</html>`;
}

/**
 * Sends a request to the lead mailbox, then a confirmation to the visitor.
 * Resolves ok only after the lead mail was accepted, so a visitor never sees
 * a false success (the original site said "sent" and threw the message away).
 */
export async function sendAanvraagEmail(
  d: AanvraagData,
  bijlagen: Bijlage[],
): Promise<{ ok: true } | { ok: false; reason: "not_configured" | "send_failed" }> {
  const rows = fields(d, bijlagen.length);
  const hint = `Antwoorden op deze e-mail gaat rechtstreeks naar ${d.email}.`;

  const lead = await deliverMail({
    to: LEAD_MAILBOX,
    fromName: "Zebrano Studio — website",
    replyTo: `"${d.naam}" <${d.email}>`,
    subject: `Zebrano-aanvraag (${d.type}) — ${d.naam}${d.plaats ? ` (${d.plaats})` : ""}`,
    text: `Nieuwe aanvraag via zebranostudio\n\n${rows.map(([l, v]) => `${l}: ${v}`).join("\n")}\n\n${hint}\n`,
    html: html("Nieuwe aanvraag via de website", rows, hint),
    attachments: bijlagen.map((b) => ({ filename: b.filename, content: b.content, contentType: b.contentType })),
  });
  if (!lead.ok) return lead;

  // Confirmation to the visitor. A failed confirmation never fails the request.
  await deliverMail({
    to: d.email,
    fromName: "Zebrano Studio",
    replyTo: LEAD_MAILBOX,
    subject: "Je aanvraag bij Zebrano Studio is binnen",
    text: [
      `Hoi ${d.naam},`,
      "",
      "Bedankt voor je bericht. We bekijken je wensen en nemen contact met je op om de volgende stap te bespreken.",
      "",
      "Dit heb je ons gestuurd:",
      ...summarize(d).map(([l, v]) => `- ${l}: ${v}`),
      "",
      `Vragen in de tussentijd? Bel ${company.telefoon} of antwoord op deze e-mail.`,
      "",
      "Hartelijke groet,",
      "Zebrano Studio — een merk van MTB Bouw",
    ].join("\n"),
    html: html(
      "Bedankt, je aanvraag is binnen",
      [["Hoi", d.naam], ...summarize(d)],
      `We nemen contact met je op. Vragen in de tussentijd? Bel ${company.telefoon} of antwoord op deze e-mail.`,
    ),
  }).catch(() => undefined);

  return { ok: true };
}
