import type { CoverTexture } from "@/components/site/book-mock";

/**
 * The physical book. Facts as given by the owner: printed and bound in Italy
 * by Graphistudio (Tramontina Collection – Coffee Table Book), three formats,
 * six cover materials with a debossed cover. Anything beyond that (paper
 * weights, page counts, colour ranges) is deliberately not stated.
 */

export type Formaat = {
  id: string;
  /** Width and height in cm, as drawn in the mock. Orientation still to be confirmed. */
  w: number;
  h: number;
  name: string;
  text: string;
};

export const formaten: Formaat[] = [
  { id: "20x30", w: 20, h: 30, name: "20 × 30 cm", text: "Het compacte formaat. Ligt makkelijk in de hand en past in elke kast." },
  { id: "25x35", w: 25, h: 35, name: "25 × 35 cm", text: "Het klassieke koffietafelformaat. Ruimte voor groot beeld én rustige tekstpagina's." },
  { id: "30x30", w: 30, h: 30, name: "30 × 30 cm", text: "Vierkant. Opengeslagen een breed doek voor beelden over twee pagina's." },
];

export type Materiaal = {
  id: string;
  name: string;
  text: string;
  /** Illustration only: the colour and texture used to draw the sample cover. */
  color: string;
  texture: CoverTexture;
};

export const materialen: Materiaal[] = [
  { id: "linnen", name: "Linnen", text: "Geweven, mat en tijdloos. De structuur van het doek blijft zichtbaar en voelbaar.", color: "#2d4379", texture: "weave" },
  { id: "leer", name: "Leer", text: "Glad en warm in de hand. Een omslag dat met de jaren mooier wordt.", color: "oklch(0.42 0.06 50)", texture: "grain" },
  { id: "suede", name: "Suède", text: "Zacht en geborsteld. Vangt het licht steeds net anders.", color: "oklch(0.63 0.02 70)", texture: "nap" },
  { id: "fluweel", name: "Fluweel", text: "Diep van kleur, met een zachte glans. Het meest uitgesproken omslag.", color: "#1b2a52", texture: "nap" },
  { id: "katoen", name: "Katoen", text: "Fijn geweven en licht. Ingetogen, met een heldere tint.", color: "oklch(0.925 0.012 88)", texture: "weave" },
  { id: "canvas", name: "Canvas", text: "Stevig en iets grover van draad. Een omslag met karakter.", color: "oklch(0.76 0.018 95)", texture: "weave" },
];

/** What is inside, from front to back. */
export const opbouw: Array<{ name: string; text: string; items: string[] }> = [
  {
    name: "Voorwerk",
    text: "Zoals in elk echt boek: een rustige opmaat voordat het verhaal begint.",
    items: ["Schutblad en titelpagina", "Opdracht of motto", "Inhoudsopgave", "Tijdlijn van de dag"],
  },
  {
    name: "Hoofdstukken",
    text: "De dag in de volgorde waarin hij gebeurde. Elk hoofdstuk opent met een eigen titelspread.",
    items: ["Beeld over één of twee pagina's", "Geloften, speeches en brieven", "Citaten en anekdotes bij de foto's", "Menu, playlist en kaart waar ze horen"],
  },
  {
    name: "Nawerk",
    text: "Het slot: wie er waren, wie het maakte, en voor wie het is.",
    items: ["Gastenquotes en dankwoord", "In memoriam, als jullie dat willen", "Colofon met fotograaf en drukker", "De regel “Exemplaar 1 van 1”"],
  },
];
