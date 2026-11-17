import { z } from "zod";

/**
 * Request form ("Vraag een voorstel") — schema shared by the client form and
 * the server action. AVG/GDPR: only what is needed to respond; the website
 * stores nothing, the e-mail is the record.
 */

export const TYPE_OPTIONS = [
  { value: "paar", label: "Bruidspaar of reiziger" },
  { value: "fotograaf", label: "Fotograaf" },
] as const;

export const REDEN_OPTIONS = [
  { value: "voorstel", label: "We willen een voorstel voor een boek" },
  { value: "demo", label: "Ik wil een demo van de studio" },
  { value: "vraag", label: "Ik heb een algemene vraag" },
] as const;

export const INTERESSE_OPTIONS = [
  { value: "trouwboek", label: "Trouwboek" },
  { value: "reisboek", label: "Reisboek" },
  { value: "accessoires", label: "Accessoires" },
  { value: "ouderboeken", label: "Ouderboeken" },
  { value: "studio", label: "Studio voor fotografen" },
] as const;

const valuesOf = <T extends readonly { value: string }[]>(opts: T) => opts.map((o) => o.value) as [string, ...string[]];

export const contactSchema = z.object({
  type: z.enum(valuesOf(TYPE_OPTIONS), { message: "Kies wie je bent." }),
  reden: z.enum(valuesOf(REDEN_OPTIONS), { message: "Kies waar je vraag over gaat." }),
  interesse: z.array(z.enum(valuesOf(INTERESSE_OPTIONS))).optional().default([]),
  naam: z.string().trim().min(2, "Vul je naam in.").max(120),
  /** Studio name for photographers, partner's name for couples. */
  extra: z.string().trim().max(160).optional().default(""),
  email: z.email({ message: "Vul een geldig e-mailadres in." }).max(160),
  telefoon: z
    .string()
    .trim()
    .max(25, "Dat telefoonnummer is te lang.")
    .optional()
    .default("")
    .refine((v) => v === "" || /^[0-9+()\s-]{8,}$/.test(v), "Vul een geldig telefoonnummer in."),
  /** Free text on purpose: "juni volgend jaar" is a fine answer. */
  datum: z.string().trim().max(80).optional().default(""),
  bericht: z.string().trim().min(10, "Vertel in een paar woorden wat je zoekt.").max(3000, "Maximaal 3000 tekens."),
  privacyAkkoord: z.literal(true, { message: "Ga akkoord met de privacyverklaring om te versturen." }),
  // Honeypot — must stay empty. Real visitors never see this field.
  website: z.string().max(0).optional().default(""),
});

export type ContactData = z.infer<typeof contactSchema>;

export function labelFor(options: readonly { value: string; label: string }[], value: string): string {
  return options.find((o) => o.value === value)?.label ?? value;
}

export function summarize(d: ContactData): Array<[string, string]> {
  return [
    ["Wie", labelFor(TYPE_OPTIONS, d.type)],
    ["Reden", labelFor(REDEN_OPTIONS, d.reden)],
    ["Interesse", d.interesse.length ? d.interesse.map((p) => labelFor(INTERESSE_OPTIONS, p)).join(", ") : "—"],
    ["Datum of periode", d.datum || "—"],
  ];
}
