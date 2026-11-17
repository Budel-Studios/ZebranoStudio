/**
 * One place for the brand. "Legato" is a working name (Italian for "bound" and
 * "tied together"); change it here and the whole site and app follow.
 * Trademark and domain are not checked yet.
 */
export const BRAND = {
  name: "Legato",
  descriptor: "Atelier voor boeken",
  tagline: "Jullie dag, als boek.",
  email: "hallo@legato.example",
  /** Print partner — the books are bought from Graphistudio (Italy). */
  printer: "Graphistudio",
  printerLine: "Tramontina Collection, Coffee Table Book",
} as const;

export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000").replace(/\/$/, "");
