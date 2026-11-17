import "server-only";
import nodemailer from "nodemailer";
import { BRAND } from "@/lib/brand";

/**
 * One mail transport for every form on the site (same set-up as the Zebrano
 * Studio site).
 *
 * Preferred: Resend (RESEND_API_KEY + MAIL_FROM on a verified domain).
 * Fallback: plain SMTP via Nodemailer (SMTP_HOST/SMTP_USER/SMTP_PASS).
 * Requests go to CONTACT_TO_EMAIL. Without a transport or a recipient, sending
 * fails loudly so a visitor never sees a false success.
 */

export type OutgoingMail = {
  /** Defaults to the lead mailbox (CONTACT_TO_EMAIL). */
  to?: string;
  subject: string;
  text: string;
  html: string;
  replyTo?: string;
  fromName?: string;
};

export type DeliveryResult = { ok: true } | { ok: false; reason: "not_configured" | "send_failed" };

/** Where requests are delivered. There is no default: the brand mailbox does not exist yet. */
export function leadMailbox(): string | null {
  return process.env.CONTACT_TO_EMAIL || null;
}

function smtpConfig() {
  const host = process.env.SMTP_HOST;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  if (!host || !user || !pass) return null;
  const port = Number(process.env.SMTP_PORT ?? "587");
  return {
    host,
    port,
    secure: process.env.SMTP_SECURE ? process.env.SMTP_SECURE === "true" : port === 465,
    user,
    pass,
    from: process.env.MAIL_FROM || user,
  };
}

async function viaResend(mail: OutgoingMail, to: string, apiKey: string, from: string): Promise<DeliveryResult> {
  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from: `${mail.fromName ?? BRAND.name} <${from}>`,
        to: [to],
        subject: mail.subject,
        text: mail.text,
        html: mail.html,
        ...(mail.replyTo ? { reply_to: mail.replyTo } : {}),
      }),
    });
    if (!res.ok) {
      console.error("[mail] Resend rejected the message", res.status, await res.text().catch(() => ""));
      return { ok: false, reason: "send_failed" };
    }
    return { ok: true };
  } catch (error) {
    console.error("[mail] Resend network error", error);
    return { ok: false, reason: "send_failed" };
  }
}

async function viaSmtp(mail: OutgoingMail, to: string, cfg: NonNullable<ReturnType<typeof smtpConfig>>): Promise<DeliveryResult> {
  try {
    const transporter = nodemailer.createTransport({
      host: cfg.host,
      port: cfg.port,
      secure: cfg.secure,
      auth: { user: cfg.user, pass: cfg.pass },
    });
    await transporter.sendMail({
      from: `"${mail.fromName ?? BRAND.name}" <${cfg.from}>`,
      to,
      ...(mail.replyTo ? { replyTo: mail.replyTo } : {}),
      subject: mail.subject,
      text: mail.text,
      html: mail.html,
    });
    return { ok: true };
  } catch (error) {
    console.error("[mail] SMTP failed", error);
    return { ok: false, reason: "send_failed" };
  }
}

export async function deliverMail(mail: OutgoingMail): Promise<DeliveryResult> {
  const to = mail.to ?? leadMailbox();
  if (!to) {
    console.error("[mail] No recipient configured. Set CONTACT_TO_EMAIL.");
    return { ok: false, reason: "not_configured" };
  }
  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.MAIL_FROM;
  if (apiKey && from) return viaResend(mail, to, apiKey, from);
  const smtp = smtpConfig();
  if (smtp) return viaSmtp(mail, to, smtp);
  console.error("[mail] No mail transport configured. Set RESEND_API_KEY + MAIL_FROM, or SMTP_HOST/SMTP_USER/SMTP_PASS.");
  return { ok: false, reason: "not_configured" };
}
