/**
 * MTB Bouw — Zebrano Studio is a trade name (handelsnaam) of MTB Bouw B.V.
 * Services are taken from mtbbouw.com and the De Kozijnstudio repo
 * (data/mtb-bouw.ts there) — no invented claims.
 */

export const MTB_URL = "https://www.mtbbouw.com";
export const KOZIJNSTUDIO_URL = "https://www.kozijnstudio.com";

export type MtbService = { title: string; description: string };

/** How the MTB Bouw family is split (as described by the owner). */
export const merkfamilie: Array<{ naam: string; rol: string; href: string }> = [
  { naam: "MTB Bouw", rol: "Verbouw, renovatie en nieuwbouw voor particulieren", href: MTB_URL },
  {
    naam: "Afbouwstudio",
    rol: "Afbouw van kantoren, winkels en horeca voor bedrijven",
    href: `${MTB_URL}/afbouwstudio`,
  },
  { naam: "De Kozijnstudio", rol: "Kozijnen met transparante prijzen, van inmeten tot montage", href: KOZIJNSTUDIO_URL },
  { naam: "Zebrano Studio", rol: "Exclusieve binnendeuren, wandpanelen en roomdividers op maat", href: "/" },
];

/** Full range of MTB Bouw, named briefly for context (from mtbbouw.com). */
export const mtbAllServices: string[] = [
  "Verbouw & Renovatie",
  "Aan- & Uitbouw",
  "Nieuwbouw",
  "Bijgebouwen",
  "Kozijnen & Gevels",
  "Totaalprojecten",
];

/** What the relationship means for the customer — no unconfirmed claims. */
export const mtbVoordelen: string[] = [
  "Eén aanspreekpunt voor je deuren én het bouwkundige werk eromheen",
  "Sparingen, wanden en afwerking kunnen in dezelfde planning mee",
  "Achter Zebrano Studio staat een ervaren bouwbedrijf uit Enschede",
];
