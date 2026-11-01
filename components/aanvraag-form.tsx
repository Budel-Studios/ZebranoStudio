"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useRef, useState, useTransition } from "react";
import { submitAanvraag } from "@/app/contact/actions";
import { Arrow } from "@/components/ui/arrow";
import { button } from "@/components/ui/button";
import {
  aanvraagSchema,
  BIJLAGE_LIMIETEN,
  PRODUCT_OPTIONS,
  REDEN_OPTIONS,
  TYPE_OPTIONS,
} from "@/lib/aanvraag-schema";
import { track } from "@/lib/track";
import { cn } from "@/lib/utils";

type Errors = Partial<Record<string, string>>;

const field =
  "w-full rounded-sm border border-input bg-background px-4 py-3 text-[0.9375rem] text-foreground outline-none transition-colors duration-300 placeholder:text-muted-foreground/70 hover:border-foreground/40 focus:border-foreground";
const label = "mb-2.5 block text-[0.6875rem] font-medium uppercase tracking-[0.2em] text-muted-foreground";
const optional = "font-normal normal-case tracking-normal text-muted-foreground/70";

/**
 * Request form — particulier or zakelijk, reason, interest, contact details,
 * message and optional photos/drawings. Validates on the client and again on
 * the server; success only after the mail was accepted → /bedankt.
 */
export function AanvraagForm({
  initialType = "particulier",
  initialMessage,
  initialProducten = [],
}: {
  initialType?: "particulier" | "zakelijk";
  /** Pre-filled message, e.g. when coming from a material or glass design page. */
  initialMessage?: string;
  /** Pre-ticked uitvoering(en), e.g. "taatsdeur" when coming from a design picked as a pivot door. */
  initialProducten?: string[];
}) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();
  const [type, setType] = useState<string>(initialType);
  const [reden, setReden] = useState<string>(initialType === "zakelijk" ? "partner" : "voorstel");
  const [producten, setProducten] = useState<string[]>(initialProducten);
  const [errors, setErrors] = useState<Errors>({});
  const [serverError, setServerError] = useState<string | null>(null);
  const [files, setFiles] = useState<File[]>([]);
  const started = useRef(false);

  const onFirstInput = () => {
    if (!started.current) {
      started.current = true;
      track("form_start", { form: "aanvraag", wens: type });
    }
  };

  const toggleProduct = (v: string) =>
    setProducten((cur) => (cur.includes(v) ? cur.filter((p) => p !== v) : [...cur, v]));

  const onFiles = (list: FileList | null) => {
    const picked = Array.from(list ?? []);
    const valid = picked.filter((f) => BIJLAGE_LIMIETEN.types.includes(f.type)).slice(0, BIJLAGE_LIMIETEN.maxAantal);
    const total = valid.reduce((s, f) => s + f.size, 0);
    if (total > BIJLAGE_LIMIETEN.maxBytesTotaal) {
      setErrors((e) => ({ ...e, bijlagen: "De bestanden zijn samen groter dan 5 MB." }));
      setFiles([]);
      return;
    }
    setErrors((e) => ({ ...e, bijlagen: undefined }));
    setFiles(valid);
  };

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setServerError(null);
    const fd = new FormData(e.currentTarget);
    const data = {
      type,
      reden,
      producten,
      naam: String(fd.get("naam") ?? ""),
      bedrijf: String(fd.get("bedrijf") ?? ""),
      email: String(fd.get("email") ?? ""),
      telefoon: String(fd.get("telefoon") ?? ""),
      plaats: String(fd.get("plaats") ?? ""),
      bericht: String(fd.get("bericht") ?? ""),
      privacyAkkoord: fd.get("privacyAkkoord") === "on",
      website: String(fd.get("website") ?? ""),
    };
    const parsed = aanvraagSchema.safeParse(data);
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
    const payload = new FormData();
    payload.set("data", JSON.stringify(data));
    files.forEach((f) => payload.append("bijlagen", f));
    startTransition(async () => {
      const res = await submitAanvraag(payload);
      if (res.ok) {
        track("generate_lead", { form: "aanvraag", wens: type });
        router.push("/bedankt");
      } else {
        setServerError(res.error);
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
    <form onSubmit={onSubmit} onInput={onFirstInput} noValidate className="space-y-7">
      <fieldset>
        <legend className={label}>Ik ben</legend>
        <div className="grid gap-3 sm:grid-cols-2">
          {TYPE_OPTIONS.map((o) => (
            <label
              key={o.value}
              className={cn(
                "flex cursor-pointer items-center gap-3 rounded-sm border px-4 py-3 text-[0.9375rem] transition-colors duration-300 has-[:focus-visible]:ring-1 has-[:focus-visible]:ring-ring has-[:focus-visible]:ring-offset-2",
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
                  if (o.value === "zakelijk" && reden === "voorstel") setReden("partner");
                  if (o.value === "particulier" && reden === "partner") setReden("voorstel");
                }}
                className="sr-only"
              />
              <span
                aria-hidden
                className={cn("size-3 rounded-full border", type === o.value ? "border-primary-foreground bg-primary-foreground" : "border-foreground/30")}
              />
              {o.label}
            </label>
          ))}
        </div>
      </fieldset>

      <div>
        <label htmlFor="f-reden" className={label}>
          Reden van contact
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
          Welke uitvoering? <span className={optional}>(optioneel, meer kiezen mag)</span>
        </legend>
        <p className="-mt-1 mb-3 text-[0.8125rem] text-muted-foreground">Elk ontwerp kan als taatsdeur, schuifdeur, draaideur of roomdivider.</p>
        <div className="flex flex-wrap gap-2">
          {PRODUCT_OPTIONS.map((o) => {
            const on = producten.includes(o.value);
            return (
              <button
                key={o.value}
                type="button"
                aria-pressed={on}
                onClick={() => toggleProduct(o.value)}
                className={cn(
                  "rounded-sm border px-3 py-1.5 text-[0.8125rem] transition-colors duration-300",
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
        {type === "zakelijk" ? (
          <div>
            <label htmlFor="f-bedrijf" className={label}>
              Bedrijf <span className={optional}>(optioneel)</span>
            </label>
            <input id="f-bedrijf" name="bedrijf" autoComplete="organization" className={field} />
          </div>
        ) : (
          <div>
            <label htmlFor="f-plaats" className={label}>
              Woonplaats <span className={optional}>(optioneel)</span>
            </label>
            <input id="f-plaats" name="plaats" autoComplete="address-level2" className={field} />
          </div>
        )}
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
          <input id="f-telefoon" name="telefoon" type="tel" autoComplete="tel" className={field} aria-invalid={!!errors.telefoon} />
          {err("telefoon")}
        </div>
      </div>

      <div>
        <label htmlFor="f-bericht" className={label}>
          Bericht
        </label>
        <textarea
          id="f-bericht"
          name="bericht"
          rows={6}
          defaultValue={initialMessage}
          placeholder="Vertel ons over je ruimte, je ideeën en eventueel de maten of planning."
          className={field}
          aria-invalid={!!errors.bericht}
          aria-describedby={errors.bericht ? "e-bericht" : undefined}
        />
        {err("bericht")}
      </div>

      <div>
        <label htmlFor="f-bijlagen" className={label}>
          Foto&apos;s of tekeningen <span className={optional}>(optioneel, max. 4 bestanden, samen 5 MB)</span>
        </label>
        <input
          id="f-bijlagen"
          type="file"
          multiple
          accept="image/jpeg,image/png,image/webp,application/pdf"
          onChange={(e) => onFiles(e.target.files)}
          className="block w-full text-sm text-muted-foreground file:mr-4 file:h-9 file:cursor-pointer file:rounded-sm file:border file:border-input file:bg-background file:px-4 file:text-[0.8125rem] file:text-foreground hover:file:border-foreground"
        />
        {files.length > 0 && <p className="mt-2 text-sm text-muted-foreground">{files.length} bestand(en) gekozen</p>}
        {err("bijlagen")}
      </div>

      {/* Honeypot */}
      <div aria-hidden className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label>
          Website
          <input name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <div>
        <label className="flex items-start gap-3 text-sm leading-relaxed text-muted-foreground">
          <input id="f-privacyAkkoord" name="privacyAkkoord" type="checkbox" className="mt-0.5 size-4 accent-primary" />
          <span>
            Ik ga akkoord met de{" "}
            <Link href="/privacy" className="link-line text-foreground">
              privacyverklaring
            </Link>
            . We gebruiken je gegevens alleen om op je aanvraag te reageren.
          </span>
        </label>
        {err("privacyAkkoord")}
      </div>

      {serverError && (
        <p role="alert" className="rounded-sm border border-destructive/40 bg-destructive/5 px-4 py-3 text-sm">
          {serverError}
        </p>
      )}

      <button type="submit" disabled={pending} className={button({ size: "lg" })}>
        {pending ? "Versturen…" : "Verstuur aanvraag"}
        <Arrow />
      </button>
    </form>
  );
}
