import type { BookFormat, BookKind, Chapter, Cover, StoryKind, StudioSettings, StyleParams } from "./types";

/**
 * Formats of the Graphistudio Tramontina Coffee Table Book as far as we could
 * verify them publicly (20×30, 25×35, 30×30 cm; vertical, horizontal, square).
 * Exact canvas, bleed and safe area come from the lab's Print & Bind guide.
 */
export const FORMATS: BookFormat[] = [
  { id: "30x30", label: "30 × 30 cm · vierkant", pageW: 300, pageH: 300 },
  { id: "25x35", label: "25 × 35 cm · staand", pageW: 250, pageH: 350 },
  { id: "35x25", label: "35 × 25 cm · liggend", pageW: 350, pageH: 250 },
  { id: "20x30", label: "20 × 30 cm · staand", pageW: 200, pageH: 300 },
  { id: "30x20", label: "30 × 20 cm · liggend", pageW: 300, pageH: 200 },
];

export const formatOf = (id: string) => FORMATS.find((f) => f.id === id) ?? FORMATS[0];

export interface Palette {
  id: string;
  name: string;
  paper: string;
  ink: string;
  accent: string;
  tint: string;
  dark: string;
  onDark: string;
}

export const PALETTES: Palette[] = [
  { id: "ivoor", name: "Ivoor & inkt", paper: "#fbf8f2", ink: "#1f1b18", accent: "#9a7b4f", tint: "#efe8dc", dark: "#221d1a", onDark: "#f4ede0" },
  { id: "bordeaux", name: "Bordeaux", paper: "#faf6f1", ink: "#2a1a1c", accent: "#7a2a36", tint: "#f0e3de", dark: "#3d1820", onDark: "#f6e9e2" },
  { id: "olijf", name: "Olijf & zand", paper: "#f8f6ee", ink: "#22241c", accent: "#6f7350", tint: "#e9e6d6", dark: "#2c3024", onDark: "#eeecdd" },
  { id: "nacht", name: "Nachtblauw", paper: "#f7f6f3", ink: "#161b26", accent: "#3d5275", tint: "#e4e6ea", dark: "#141a28", onDark: "#e9ecf2" },
  { id: "terracotta", name: "Terracotta", paper: "#fbf5ee", ink: "#2b1d16", accent: "#b5623c", tint: "#f3e2d3", dark: "#40241a", onDark: "#f8e9dc" },
  { id: "zwartwit", name: "Zwart-wit", paper: "#ffffff", ink: "#111111", accent: "#111111", tint: "#eeeeee", dark: "#0c0c0c", onDark: "#f5f5f5" },
];

export const paletteOf = (id: string) => PALETTES.find((p) => p.id === id) ?? PALETTES[0];

export interface FontPair {
  id: string;
  name: string;
  display: string;
  text: string;
  script: string;
  /** Display set in italics (romantic) or uppercase with wide tracking (modern). */
  displayStyle: "normal" | "italic" | "caps";
  displayWeight: number;
}

const SCRIPT = "'Pinyon Script', cursive";

export const FONT_PAIRS: FontPair[] = [
  { id: "cormorant", name: "Cormorant · klassiek", display: "'Cormorant Garamond Variable', serif", text: "'EB Garamond Variable', serif", script: SCRIPT, displayStyle: "normal", displayWeight: 400 },
  { id: "cormorant-italic", name: "Cormorant cursief · romantisch", display: "'Cormorant Garamond Variable', serif", text: "'EB Garamond Variable', serif", script: SCRIPT, displayStyle: "italic", displayWeight: 400 },
  { id: "playfair", name: "Playfair · editorial", display: "'Playfair Display Variable', serif", text: "'DM Sans Variable', sans-serif", script: SCRIPT, displayStyle: "normal", displayWeight: 500 },
  { id: "fraunces", name: "Fraunces · warm", display: "'Fraunces Variable', serif", text: "'EB Garamond Variable', serif", script: SCRIPT, displayStyle: "normal", displayWeight: 350 },
  { id: "jost", name: "Jost kapitalen · modern", display: "'Jost Variable', sans-serif", text: "'EB Garamond Variable', serif", script: SCRIPT, displayStyle: "caps", displayWeight: 300 },
  { id: "italiana", name: "Italiana · couture", display: "'Italiana', serif", text: "'DM Sans Variable', sans-serif", script: SCRIPT, displayStyle: "caps", displayWeight: 400 },
];

export const fontPairOf = (id: string) => FONT_PAIRS.find((p) => p.id === id) ?? FONT_PAIRS[0];

export const MOODS: Array<{ id: StyleParams["mood"]; name: string; text: string }> = [
  { id: "klassiek", name: "Klassiek", text: "Symmetrie, ruime marges, tijdloze serif." },
  { id: "modern", name: "Modern minimaal", text: "Veel wit, strak raster, kleine typografie." },
  { id: "editorial", name: "Editorial", text: "Als een magazine: grote koppen, afwisseling, contrast." },
  { id: "romantisch", name: "Romantisch", text: "Zachte tinten, cursief, handschrift-accenten." },
];

export const MOOD_DEFAULTS: Record<StyleParams["mood"], Pick<StyleParams, "fontPair" | "palette" | "density" | "margins">> = {
  klassiek: { fontPair: "cormorant", palette: "ivoor", density: 2, margins: "ruim" },
  modern: { fontPair: "jost", palette: "zwartwit", density: 2, margins: "ruim" },
  editorial: { fontPair: "playfair", palette: "nacht", density: 4, margins: "normaal" },
  romantisch: { fontPair: "cormorant-italic", palette: "bordeaux", density: 3, margins: "normaal" },
};

export const DEFAULT_STYLE: StyleParams = {
  mood: "klassiek",
  ...MOOD_DEFAULTS.klassiek,
  textShare: 3,
  bwShare: 1,
  targetSpreads: 30,
  tone: "warm",
  brief: "",
};

export const CHAPTER_PRESETS: Record<BookKind, Array<Pick<Chapter, "kind" | "title" | "subtitle">>> = {
  bruiloft: [
    { kind: "aankomst", title: "Aankomst", subtitle: "De dag begint" },
    { kind: "voorbereiding", title: "De voorbereiding", subtitle: "Rust voor de storm" },
    { kind: "first-look", title: "Het eerste moment", subtitle: "Elkaar zien" },
    { kind: "ceremonie", title: "De ceremonie", subtitle: "Ja" },
    { kind: "geloften", title: "De geloften", subtitle: "In onze eigen woorden" },
    { kind: "toost", title: "Toost & taart", subtitle: "Op het leven" },
    { kind: "portretten", title: "Samen", subtitle: "Portretten" },
    { kind: "diner", title: "Het diner", subtitle: "Aan tafel" },
    { kind: "speeches", title: "De speeches", subtitle: "Woorden om te bewaren" },
    { kind: "feest", title: "Het feest", subtitle: "Tot diep in de nacht" },
    { kind: "overnachting", title: "De overnachting", subtitle: "Stilte na het feest" },
    { kind: "vertrek", title: "Vertrek", subtitle: "De ochtend erna" },
  ],
  reis: [
    { kind: "vertrek", title: "Vertrek", subtitle: "Het begin van de reis" },
    { kind: "aankomst", title: "Aankomst", subtitle: "Eerste indrukken" },
    { kind: "plek", title: "De plek", subtitle: "Waar we verbleven" },
    { kind: "onderweg", title: "Onderweg", subtitle: "Tussen hier en daar" },
    { kind: "ontmoetingen", title: "Ontmoetingen", subtitle: "Mensen onderweg" },
    { kind: "tafel", title: "Aan tafel", subtitle: "Wat we aten" },
    { kind: "overnachting", title: "De nachten", subtitle: "Waar we sliepen" },
    { kind: "hoogtepunt", title: "Het hoogtepunt", subtitle: "Dit vergeten we nooit" },
    { kind: "thuiskomst", title: "Thuiskomst", subtitle: "Wat we meenamen" },
  ],
};

export const STORY_KINDS: Array<{ id: StoryKind; name: string; hint: string }> = [
  { id: "gelofte", name: "Gelofte", hint: "De volledige tekst van een gelofte. Twee geloften in één hoofdstuk komen gespiegeld naast elkaar." },
  { id: "speech", name: "Speech", hint: "De speech, of het mooiste deel ervan. Vermeld wie hem hield." },
  { id: "anekdote", name: "Leuk moment", hint: "Een kort verhaal over iets wat gebeurde: de ring die viel, de regenbui, de dans." },
  { id: "quote", name: "Quote van een gast", hint: "Eén zin die is blijven hangen, met de naam van wie hem zei." },
  { id: "brief", name: "Brief", hint: "Een brief aan elkaar of van een ouder." },
  { id: "verhaal", name: "Verhaal", hint: "Langere tekst: hoe jullie elkaar ontmoetten, het aanzoek, de reis ernaartoe." },
  { id: "tijdlijn", name: "Tijdlijn", hint: "Eén regel per moment: 14:00 — Ceremonie." },
  { id: "menu", name: "Menu", hint: "Eén regel per gang of wijn." },
  { id: "playlist", name: "Playlist", hint: "Eén regel per nummer: Titel — Artiest." },
  { id: "opdracht", name: "Opdracht", hint: "Voor wie is dit boek? Eén of twee regels voorin." },
  { id: "in-memoriam", name: "In gedachten", hint: "Voor wie er niet bij kon zijn." },
];

export const storyKindName = (id: StoryKind) => STORY_KINDS.find((k) => k.id === id)?.name ?? id;

/** Cover materials named after what Graphistudio lists for the Tramontina line. */
export const COVER_MATERIALS: Array<{ id: string; name: string; colors: Array<{ id: string; name: string; hex: string }> }> = [
  { id: "linnen", name: "Eco-linnen", colors: [
    { id: "naturel", name: "Naturel", hex: "#d9cfbf" }, { id: "zand", name: "Zand", hex: "#c4b49a" }, { id: "olijf", name: "Olijf", hex: "#6b6f52" }, { id: "nacht", name: "Nachtblauw", hex: "#232b3d" }, { id: "antraciet", name: "Antraciet", hex: "#33312f" },
  ] },
  { id: "katoen", name: "Eco-katoen", colors: [
    { id: "ivoor", name: "Ivoor", hex: "#ece5d8" }, { id: "blush", name: "Blush", hex: "#dcc1b6" }, { id: "salie", name: "Salie", hex: "#a9b09a" },
  ] },
  { id: "fluweel", name: "Fluweel", colors: [
    { id: "bordeaux", name: "Bordeaux", hex: "#4a1622" }, { id: "smaragd", name: "Smaragd", hex: "#1f3d33" }, { id: "inkt", name: "Inkt", hex: "#1b1d2a" },
  ] },
  { id: "suede", name: "Suède", colors: [
    { id: "camel", name: "Camel", hex: "#b08a62" }, { id: "taupe", name: "Taupe", hex: "#8a7b6c" }, { id: "terracotta", name: "Terracotta", hex: "#a45a3c" },
  ] },
  { id: "leer", name: "Leer", colors: [
    { id: "cognac", name: "Cognac", hex: "#8a4f2a" }, { id: "zwart", name: "Zwart", hex: "#1a1817" }, { id: "espresso", name: "Espresso", hex: "#3a2a22" },
  ] },
  { id: "canvas", name: "Canvas", colors: [
    { id: "ecru", name: "Ecru", hex: "#e6dfd0" }, { id: "steen", name: "Steen", hex: "#b9b4a8" },
  ] },
];

export const DEFAULT_COVER: Cover = { material: "linnen", color: "naturel", title: "", subtitle: "", debossing: "blind" };

export interface Accessory {
  id: string;
  name: string;
  text: string;
  group: "bij het boek" | "voor familie" | "presentatie";
}

export const ACCESSORIES: Accessory[] = [
  { id: "boekenlegger", name: "Boekenlegger", text: "Leren boekenlegger met jullie initialen en datum in blinddruk.", group: "bij het boek" },
  { id: "boekenlegger-messing", name: "Boekenlegger messing", text: "Massief messing boekenlegger, gegraveerd. Eén exemplaar per boek.", group: "bij het boek" },
  { id: "boekstandaard", name: "Boekstandaard", text: "Houten standaard waarop het boek open kan blijven liggen.", group: "presentatie" },
  { id: "presentatiebox", name: "Presentatiebox", text: "Doos in de stof van de omslag, met lint. Beschermt het boek en maakt het uitpakken een moment.", group: "presentatie" },
  { id: "slipcase", name: "Schuifhoes", text: "Stevige hoes waar het boek in schuift, voor in de boekenkast.", group: "presentatie" },
  { id: "ouderboek", name: "Ouderboek", text: "Hetzelfde ontwerp in een kleiner formaat, voor ouders of getuigen.", group: "voor familie" },
  { id: "handschoenen", name: "Katoenen handschoenen", text: "Voor wie het boek met zorg wil doorbladeren.", group: "bij het boek" },
];

/**
 * Starting values a photographer changes in the studio settings. Prices are
 * placeholders the photographer sets; bleed/safe/ppi must be confirmed with
 * the lab before the first order.
 */
export const DEFAULT_STUDIO: StudioSettings = {
  name: "Jouw fotostudio",
  tagline: "Trouwboeken op maat",
  accent: "#5b1f2a",
  bookPrice: {},
  includedSpreads: 30,
  extraSpreadPrice: 0,
  accessoryPrice: {},
  bleedMm: 5,
  safeMm: 12,
  minPpi: 200,
};
