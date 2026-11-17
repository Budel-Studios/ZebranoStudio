/**
 * Accessories and extras around the book. Prices are deliberately absent:
 * fill `priceFrom` (euros, incl. btw) only with a confirmed price; without it
 * the site shows "Prijs op aanvraag".
 */

export type AccessoireArt = "boekenlegger" | "boekstandaard" | "presentatiebox" | "ouderboeken" | "slipcase";

export type Accessoire = {
  id: AccessoireArt;
  name: string;
  /** One line for cards and the menu. */
  tagline: string;
  description: string;
  /** What you can choose or should know. No invented specifications. */
  points: string[];
  /** Confirmed "from" price in euros. Leave out when unknown. */
  priceFrom?: number;
};

export const accessoires: Accessoire[] = [
  {
    id: "boekenlegger",
    name: "Boekenleggers",
    tagline: "Een leeslint dat bij het boek hoort.",
    description:
      "Een exclusieve boekenlegger, afgestemd op het omslag van jullie boek. Om de bladzijde te markeren waar je steeds naar terugkeert: de geloften, die ene speech, de foto met opa.",
    points: ["Afgestemd op het materiaal en de kleur van het omslag", "Los te bestellen, ook als cadeau voor ouders of getuigen"],
  },
  {
    id: "boekstandaard",
    name: "Boekstandaards",
    tagline: "Het boek open, op een plek waar je het ziet.",
    description:
      "Een standaard waarop het boek open kan liggen, op de kast of het dressoir. Zo verdwijnt het niet in een la, en sla je af en toe een bladzijde om.",
    points: ["Voor elk van de drie formaten", "Rustig van vorm, zodat het boek het werk doet"],
  },
  {
    id: "presentatiebox",
    name: "Presentatiebox",
    tagline: "De eerste keer openmaken is ook een moment.",
    description:
      "Een stevige box waarin het boek wordt overhandigd en bewaard. Beschermt tegen stof en licht, en maakt van het uitpakken een klein ritueel.",
    points: ["Op maat van het gekozen formaat", "Materiaal en kleur in overleg, passend bij het omslag"],
  },
  {
    id: "ouderboeken",
    name: "Ouderboeken",
    tagline: "Hetzelfde verhaal, in een kleiner formaat.",
    description:
      "Kleinere exemplaren van jullie boek, voor ouders, grootouders of getuigen. Dezelfde hoofdstukken en dezelfde woorden, in een formaat dat makkelijk meegaat.",
    points: ["Zelfde inhoud als jullie boek, kleiner uitgevoerd", "Aantal in overleg; samen met jullie boek te bestellen"],
  },
  {
    id: "slipcase",
    name: "Slipcase",
    tagline: "Een cassette waar het boek precies in schuift.",
    description:
      "Een open cassette die het boek in de kast beschermt en de rug laat zien. Voor wie het boek tussen andere boeken wil zetten, zonder dat het omslag slijt.",
    points: ["Op maat van het boek", "Materiaal in overleg, passend bij het omslag"],
  },
];

export function getAccessoire(id: string | undefined): Accessoire | null {
  return accessoires.find((a) => a.id === id) ?? null;
}

/** "Vanaf € 95" for a confirmed price, otherwise "Prijs op aanvraag". */
export function priceLabel(a: Accessoire): string {
  if (typeof a.priceFrom !== "number") return "Prijs op aanvraag";
  return `Vanaf ${new Intl.NumberFormat("nl-NL", { style: "currency", currency: "EUR", maximumFractionDigits: 0 }).format(a.priceFrom)}`;
}
