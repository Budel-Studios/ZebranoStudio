/**
 * Company details — one source for legal pages, footer, contact and JSON-LD.
 *
 * Zebrano Studio operates as a trade name (handelsnaam) of MTB Bouw B.V.,
 * the same set-up as De Kozijnstudio. The KvK number below is the one
 * Robbert already listed in the original Zebrano taxonomy sheet.
 * Fields between [brackets] still need to be filled in or confirmed.
 */
export const company = {
  /** Trade name the site operates under */
  naam: "Zebrano Studio",
  /** Legal entity */
  entiteit: "MTB Bouw B.V.",
  moeder: "MTB Bouw",
  kvk: "60942037",
  btw: "[btw-identificatienummer — nog invullen]",
  adres: "Heersenkampweg 5",
  postcode: "7546 PG",
  plaats: "Enschede",
  postcodePlaats: "7546 PG Enschede",
  land: "Nederland",
  /** Lead mailbox — same inbox as De Kozijnstudio for now. */
  email: "info@mtbbouw.com",
  telefoon: "053 206 50 71",
  telefoonHref: "+31532065071",
  whatsapp: "+31 6 42 99 70 18",
  whatsappHref: "31642997018",
  openingstijden: "Ma–Vr 08:00–17:00",
  website: "www.zebranostudio.com",
  instagram: "https://www.instagram.com/zebrano.studio",
  pinterest: "https://www.pinterest.com/zebranostudio",
} as const;

/** Date of the last revision of the legal documents / site information. */
export const LEGAL_LAST_UPDATED = "oktober 2026";
