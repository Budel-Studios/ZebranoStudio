"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { submitContact } from "@/app/(site)/contact/actions";
import { button } from "@/components/ui/button";
import { BRAND } from "@/lib/brand";
import { contactSchema, INTERESSE_OPTIONS, REDEN_OPTIONS, TYPE_OPTIONS } from "@/lib/contact-schema";
import { cn } from "@/lib/utils";

type Errors = Partial<Record<string, string>>;

const field =
  "w-full rounded-sm border border-input bg-background px-4 py-3 text-[0.9375rem] text-foreground transition-colors duration-200 placeholder:text-muted-foreground hover:border-foreground/60 focus:border-foreground";
const label = "mb-2 block text-sm font-medium text-foreground";
const optional = "font-normal text-muted-foreground";

/**
 * Request form: couple or photographer, reason, interest, contact details
 * and message. Validates on the client and again on the server; success only
 * after the mail was accepted → /bedankt.
 */
export function ContactForm({
  initialType = "paar",
  initialMessage,
  initialInteresse = [],
}: {
  initialType?: "paar" | "fotograaf";
  initialMessage?: string;
  initialInteresse?: string[];
}) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [type, setType] = useState<string>(initialType);
  const [reden, setReden] = useState<string>(initialType === "fotograaf" ? "demo" : "voorstel");
  const [interesse, setInteresse] = useState<string[]>(initialInteresse);
  const [errors, setErrors] = useState<Errors>({});
  const [serverError, setServerError] = useState<string | null>(null);

  const toggle = (v: string) => setInteresse((cur) => (cur.includes(v) ? cur.filter((p) => p !== v) : [...cur, v]));
  const fotograaf = type === "fotograaf";

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setServerError(null);
    const fd = new FormData(e.currentTarget);
    const data = {
      type,
      reden,
      interesse,
      naam: String(fd.get("naam") ?? ""),
      extra: String(fd.get("extra") ?? ""),
      email: String(fd.get("email") ?? ""),
      telefoon: String(fd.get("telefoon") ?? ""),
      datum: String(fd.get("datum") ?? ""),
      bericht: String(fd.get("bericht") ?? ""),
      privacyAkkoord: fd.get("privacyAkkoord") === "on",
      website: String(fd.get("website") ?? ""),
    };
    const parsed = contactSchema.safeParse(data);
    if (!parsed.success) {
      const next: Errors = {};
      for (const issue of parsed.error.issues) {
        const key = String(issue.path[0] ?? "form");
        if (!next[key]) next[key] = issue.message;
      }
      setErrors(next);
      const first = Object.keys(next)[0];
      if (first) document.getElementById(`f-${first}`)?.focus();
      return;
    }
    setErrors({});
    startTransition(async () => {
      try {
        const res = await submitContact(data);
        if (res.ok) router.push("/bedankt");
        else setServerError(res.error);
      } catch {
        setServerError("Versturen is niet gelukt, je bericht is niet aangekomen. Probeer het later opnieuw of mail ons rechtstreeks.");
      }
    });
  };

  const err = (k: string) =>
    errors[k] ? (
      <p id={`e-${k}`} className="mt-1.5 text-sm text-destructive">
        {errors[k]}
      </p>
    ) : null;

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-7">
      <fieldset>
        <legend className={label}>Ik ben</legend>
        <div className="grid gap-3 sm:grid-cols-2">
          {TYPE_OPTIONS.map((o) => (
            <label
              key={o.value}
              className={cn(
                "flex cursor-pointer items-center gap-3 rounded-sm border px-4 py-3 text-[0.9375rem] transition-colors duration-200 has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-ribbon has-[:focus-visible]:shadow-[0_0_0_2px_var(--ink)]",
                type === o.value ? "border-primary bg-primary text-primary-foreground" : "border-input bg-background hover:border-foreground",
              )}
            >
              <input
                type="radio"
                name="type"
                value={o.value}
                checked={type === o.value}
                onChange={() => {
                  setType(o.value);
                  if (o.value === "fotograaf" && reden === "voorstel") setReden("demo");
                  if (o.value === "paar" && reden === "demo") setReden("voorstel");
                }}
                className="sr-only"
              />
              <span aria-hidden className={cn("size-3 rounded-full border", type === o.value ? "border-primary-foreground bg-primary-foreground" : "border-foreground/30")} />
              {o.label}
            </label>
          ))}
        </div>
      </fieldset>

      <div>
        <label htmlFor="f-reden" className={label}>
          Waar gaat het over
        </label>
        <select id="f-reden" value={reden} onChange={(e) => setReden(e.target.value)} className={field}>
          {REDEN_OPTIONS.map((o) => (
            <option key={o.value} value={o.value}>
              {o.label}
            </option>
          ))}
        </select>
        {err("reden")}
      </div>

      <fieldset>
        <legend className={label}>
          Interesse in <span className={optional}>(optioneel, meer kiezen mag)</span>
        </legend>
        <div className="flex flex-wrap gap-2">
          {INTERESSE_OPTIONS.map((o) => {
            const on = interesse.includes(o.value);
            return (
              <button
                key={o.value}
                type="button"
                aria-pressed={on}
                onClick={() => toggle(o.value)}
                className={cn(
                  "rounded-sm border px-3 py-1.5 text-small transition-colors duration-200",
                  on ? "border-primary bg-primary text-primary-foreground" : "border-input bg-background hover:border-foreground",
                )}
              >
                {o.label}
              </button>
            );
          })}
        </div>
      </fieldset>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="f-naam" className={label}>
            Naam
          </label>
          <input id="f-naam" name="naam" autoComplete="name" className={field} aria-invalid={!!errors.naam} aria-describedby={errors.naam ? "e-naam" : undefined} />
          {err("naam")}
        </div>
        <div>
          <label htmlFor="f-extra" className={label}>
            {fotograaf ? "Naam van je studio" : "Naam van je partner"} <span className={optional}>(optioneel)</span>
          </label>
          <input id="f-extra" name="extra" autoComplete={fotograaf ? "organization" : "off"} className={field} />
        </div>
        <div>
          <label htmlFor="f-email" className={label}>
            E-mail
          </label>
          <input id="f-email" name="email" type="email" autoComplete="email" className={field} aria-invalid={!!errors.email} aria-describedby={errors.email ? "e-email" : undefined} />
          {err("email")}
        </div>
        <div>
          <label htmlFor="f-telefoon" className={label}>
            Telefoon <span className={optional}>(optioneel)</span>
          </label>
          <input id="f-telefoon" name="telefoon" type="tel" autoComplete="tel" className={field} aria-invalid={!!errors.telefoon} aria-describedby={errors.telefoon ? "e-telefoon" : undefined} />
          {err("telefoon")}
        </div>
      </div>

      {!fotograaf && (
        <div>
          <label htmlFor="f-datum" className={label}>
            Trouwdatum of reisperiode <span className={optional}>(optioneel)</span>
          </label>
          <input id="f-datum" name="datum" placeholder="Bijvoorbeeld: juni volgend jaar, of al geweest" className={field} />
        </div>
      )}

      <div>
        <label htmlFor="f-bericht" className={label}>
          Bericht
        </label>
        <textarea
          id="f-bericht"
          name="bericht"
          rows={6}
          defaultValue={initialMessage}
          placeholder={
            fotograaf
              ? "Vertel kort over je studio en wat je wilt weten."
              : "Vertel over jullie dag, wie de foto's maakt of maakte, en welke woorden jullie willen bewaren."
          }
          className={field}
          aria-invalid={!!errors.bericht}
          aria-describedby={errors.bericht ? "e-bericht" : undefined}
        />
        {err("bericht")}
      </div>

      {/* Honeypot */}
      <div aria-hidden className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label>
          Website
          <input name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <div>
        <label className="flex items-start gap-3 text-small text-muted-foreground">
          <input id="f-privacyAkkoord" name="privacyAkkoord" type="checkbox" className="mt-0.5 size-4 accent-primary" />
          <span>
            Ik ga akkoord met de{" "}
            <Link href="/privacy" className="link-line text-foreground">
              privacyverklaring
            </Link>
            . We gebruiken je gegevens alleen om op je bericht te reageren.
          </span>
        </label>
        {err("privacyAkkoord")}
      </div>

      {serverError && (
        <p role="alert" className="rounded-sm border border-destructive/40 bg-destructive/5 px-4 py-3 text-small">
          {serverError}{" "}
          <a href={`mailto:${BRAND.email}`} className="link-line font-medium">
            {BRAND.email}
          </a>
        </p>
      )}

      <button type="submit" disabled={pending} className={button({ size: "lg" })}>
        {pending ? "Versturen…" : "Verstuur bericht"}
      </button>
    </form>
  );
}
