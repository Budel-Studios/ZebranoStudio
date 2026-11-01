/**
 * Feitenregister — same rule as De Kozijnstudio: only `verified` claims may be
 * public. Everything below comes from the original Zebrano copy (2025) but
 * has to be confirmed now that Zebrano Studio runs as a trade name of
 * MTB Bouw B.V. Confirm = set status to "verified", fill `bron` and
 * `gecontroleerd`. Components show a claim only via `isVerified(key)` or
 * <Feit k="…">.
 */

export type FeitStatus = "verified" | "needs_confirmation";

export type Feit = {
  status: FeitStatus;
  /** The public sentence, exactly as it may appear on the site. */
  claim: string;
  bron?: string;
  gecontroleerd?: string;
};

const feitenData = {
  fsc: {
    status: "needs_confirmation",
    claim:
      "Daarom werken we alleen met leveranciers die onze waarden delen: FSC-gecertificeerd hout, duurzaam beheerde bossen en een focus op herstel in plaats van uitputting.",
  },
  productieNederland: {
    status: "needs_confirmation",
    claim:
      "Onze deuren worden hier in Nederland gemaakt, door makers die hun hout bijna net zo goed kennen als hun ochtendkoffie. Het is een mix van traditie, precisie en een beetje Nederlandse koppigheid die weigert genoegen te nemen met ‘goed genoeg’.",
  },
  lokaalProduceren: {
    status: "needs_confirmation",
    claim: "Door lokaal te produceren en transport te beperken, houden we grip op onze impact.",
  },
  onderEenDak: {
    status: "needs_confirmation",
    claim: "Van eerste schets tot perfecte pasvorm: wij ontwerpen, prototypen en bouwen onder één dak.",
  },
  team: {
    status: "verified",
    claim:
      "Het team op /de-makers: Mathijs (eigenaar & houtbewerker), Robbert (strategie & financiën) en Rick (houtspecialist), met portretfoto. Dave en Peter van de oude site en de lange bio's staan er niet op.",
    bron: "Robbert leverde de portretten van Mathijs, Robbert en Rick aan voor de website (OneDrive Header images/Klaar/Our team); rollen zoals op de oude site — rollen nog even nalopen",
    gecontroleerd: "2026-11-01",
  },
  levertijden: {
    status: "needs_confirmation",
    claim:
      "Deuren (taats, schuif, draai) 6–8 weken; wandvlakke deuren 8–10 weken; scheidingswanden 6–8 weken; boiserie 8–10 weken.",
  },
  garantie: {
    status: "needs_confirmation",
    claim:
      "2 jaar garantie op deuren en materialen (fabricagefouten en constructie) en 6 maanden garantie op montage, als Zebrano Studio monteert.",
  },
  groothandelsprijzen: {
    status: "needs_confirmation",
    claim: "Partners krijgen altijd eerlijke groothandelsprijzen.",
  },
  showroom: {
    status: "needs_confirmation",
    claim: "Partners hebben toegang tot onze showroom.",
  },
  servicevoorwaarden: {
    status: "needs_confirmation",
    claim:
      "Bestelproces, betaling (100% vooruit), levering, installatie (alleen NL), garantie en onderhoud zoals beschreven op /service — opgesteld in 2025, bevestigen dat dit nog geldt onder MTB Bouw B.V.",
  },
} satisfies Record<string, Feit>;

export type FeitKey = keyof typeof feitenData;

/** Widened to `Feit` so a status can be flipped to "verified" without type errors. */
export const feiten: Record<FeitKey, Feit> = feitenData;

export function isVerified(key: FeitKey): boolean {
  return feiten[key].status === "verified";
}

export function feit(key: FeitKey): string | null {
  return isVerified(key) ? feiten[key].claim : null;
}
