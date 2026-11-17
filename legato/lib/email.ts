import "server-only";
import { BRAND } from "@/lib/brand";
import { type ContactData, summarize } from "@/lib/contact-schema";
import { deliverMail, leadMailbox } from "@/lib/mail-transport";

/** E-mail content for the request form. Delivery lives in lib/mail-transport.ts. */

function escapeHtml(value: string): string {
  return value.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

function fields(d: ContactData): Array<[string, string]> {
  return [
    ...summarize(d),
    ["Naam", d.naam],
    [d.type === "fotograaf" ? "Studio" : "Partner", d.extra || "—"],
    ["E-mail", d.email],
    ["Telefoon", d.telefoon || "—"],
    ["Bericht", d.bericht],
  ];
}

function html(title: string, rows: Array<[string, string]>, footer: string): string {
  const tr = rows
    .map(
      ([l, v]) => `
      <tr>
        <td style="padding:10px 14px;border-bottom:1px solid #e6dfd3;font-weight:600;color:#2b2420;width:160px;vertical-align:top;">${escapeHtml(l)}</td>
        <td style="padding:10px 14px;border-bottom:1px solid #e6dfd3;color:#2b2420;white-space:pre-wrap;">${escapeHtml(v)}</td>
      </tr>`,
    )
    .join("");
  return `<!doctype html>
<html lang="nl">
<body style="margin:0;background:#f6f2ea;font-family:Arial,Helvetica,sans-serif;color:#2b2420;">
  <div style="max-width:640px;margin:0 auto;padding:24px;">
    <div style="background:#4a1a22;color:#f6f2ea;padding:20px 24px;border-radius:6px 6px 0 0;">
      <p style="margin:0;font-size:18px;font-weight:700;">${escapeHtml(title)}</p>
      <p style="margin:6px 0 0;font-size:13px;color:#d9c3bd;">${escapeHtml(BRAND.name)} &middot; ${escapeHtml(BRAND.descriptor)}</p>
    </div>
    <div style="background:#ffffff;border:1px solid #e6dfd3;border-top:none;border-radius:0 0 6px 6px;padding:8px 0;">
      <table style="width:100%;border-collapse:collapse;font-size:14px;">${tr}
      </table>
    </div>
    <p style="font-size:12px;color:#6f655d;margin-top:16px;">${escapeHtml(footer)}</p>
  </div>
</body>
</html>`;
}

/**
 * Sends a request to the lead mailbox, then a confirmation to the visitor.
 * Resolves ok only after the lead mail was accepted, so a visitor never sees
 * a false success.
 */
export async function sendContactEmail(
  d: ContactData,
): Promise<{ ok: true } | { ok: false; reason: "not_configured" | "send_failed" }> {
  const rows = fields(d);
  const hint = `Antwoorden op deze e-mail gaat rechtstreeks naar ${d.email}.`;

  const lead = await deliverMail({
    fromName: `${BRAND.name} — website`,
    replyTo: `"${d.naam.replace(/["\r\n]/g, "")}" <${d.email}>`,
    subject: `${BRAND.name}-aanvraag (${d.type}) — ${d.naam.replace(/[\r\n]/g, " ")}`,
    text: `Nieuwe aanvraag via de website\n\n${rows.map(([l, v]) => `${l}: ${v}`).join("\n")}\n\n${hint}\n`,
    html: html("Nieuwe aanvraag via de website", rows, hint),
  });
  if (!lead.ok) return lead;

  // Confirmation to the visitor. A failed confirmation never fails the request.
  const mailbox = leadMailbox() ?? undefined;
  await deliverMail({
    to: d.email,
    replyTo: mailbox,
    subject: `Je bericht aan ${BRAND.name} is binnen`,
    text: [
      `Hoi ${d.naam},`,
      "",
      "Bedankt voor je bericht. We lezen het rustig door en nemen contact met je op.",
      "",
      "Dit heb je ons gestuurd:",
      ...summarize(d).map(([l, v]) => `- ${l}: ${v}`),
      "",
      "Nog iets vergeten? Antwoord gerust op deze e-mail.",
      "",
      "Hartelijke groet,",
      BRAND.name,
    ].join("\n"),
    html: html(
      "Bedankt, je bericht is binnen",
      [["Hoi", d.naam], ...summarize(d)],
      "We nemen contact met je op. Nog iets vergeten? Antwoord gerust op deze e-mail.",
    ),
  }).catch(() => undefined);

  return { ok: true };
}
