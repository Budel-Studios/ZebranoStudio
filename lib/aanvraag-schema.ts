import { z } from "zod";

/**
 * Request form ("Vraag een voorstel") — schema shared by the client form and
 * the server action. Based on the original Zebrano contact form (particulier
 * or zakelijk, reason for contact) and the De Kozijnstudio lead flow.
 *
 * AVG/GDPR: only what is needed to respond. Attachments are optional and are
 * only sent along by e-mail — the website stores nothing.
 */

export const TYPE_OPTIONS = [
  { value: "particulier", label: "Particulier" },
  { value: "zakelijk", label: "Zakelijk (architect, ontwerper, aannemer)" },
] as const;

export const REDEN_OPTIONS = [
  { value: "voorstel", label: "Ik wil een voorstel voor een maatwerkdeur" },
  { value: "partner", label: "Ik wil samenwerken als ontwerper of architect" },
  { value: "vraag", label: "Ik heb een algemene vraag" },
] as const;

export const PRODUCT_OPTIONS = [
  { value: "taatsdeur", label: "Taatsdeur" },
  { value: "schuifdeur", label: "Schuifdeur" },
  { value: "draaideur", label: "Draaideur" },
  { value: "wandvlak", label: "Wandvlakke deur" },
  { value: "roomdivider", label: "Roomdivider" },
  { value: "boiserie", label: "Boiserie" },
  { value: "onbekend", label: "Weet ik nog niet" },
] as const;

export const BIJLAGE_LIMIETEN = {
  maxAantal: 4,
  maxBytesTotaal: 5 * 1024 * 1024,
  types: ["image/jpeg", "image/png", "image/webp", "application/pdf"] as readonly string[],
};

const valuesOf = <T extends readonly { value: string }[]>(opts: T) => opts.map((o) => o.value) as [string, ...string[]];

export const aanvraagSchema = z
  .object({
    type: z.enum(valuesOf(TYPE_OPTIONS), { message: "Kies particulier of zakelijk." }),
    reden: z.enum(valuesOf(REDEN_OPTIONS), { message: "Kies waar je vraag over gaat." }),
    producten: z.array(z.enum(valuesOf(PRODUCT_OPTIONS))).optional().default([]),
    naam: z.string().trim().min(2, "Vul je naam in.").max(120),
    bedrijf: z.string().trim().max(160).optional().default(""),
    email: z.email({ message: "Vul een geldig e-mailadres in." }).max(160),
    telefoon: z
      .string()
      .trim()
      .max(25, "Dat telefoonnummer is te lang.")
      .optional()
      .default("")
      .refine((v) => v === "" || /^[0-9+()\s-]{8,}$/.test(v), "Vul een geldig telefoonnummer in."),
    plaats: z.string().trim().max(80).optional().default(""),
    bericht: z.string().trim().min(10, "Vertel ons in een paar woorden wat je zoekt.").max(3000, "Maximaal 3000 tekens."),
    privacyAkkoord: z.literal(true, { message: "Ga akkoord met de privacyverklaring om te versturen." }),
    // Honeypot — must stay empty. Real visitors never see this field.
    website: z.string().max(0).optional().default(""),
  });

export type AanvraagData = z.infer<typeof aanvraagSchema>;

export function labelFor(options: readonly { value: string; label: string }[], value: string): string {
  return options.find((o) => o.value === value)?.label ?? value;
}

export function summarize(d: AanvraagData): Array<[string, string]> {
  return [
    ["Type", labelFor(TYPE_OPTIONS, d.type)],
    ["Reden", labelFor(REDEN_OPTIONS, d.reden)],
    ["Interesse", d.producten.length ? d.producten.map((p) => labelFor(PRODUCT_OPTIONS, p)).join(", ") : "—"],
    ["Plaats", d.plaats || "—"],
  ];
}
