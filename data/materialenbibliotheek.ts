/**
 * Materialenbibliotheek — rebuilt from the old site (2025): same taxonomy as
 * its Firestore collection `material_library/Materials/Items` and its filters
 * (tone, intensity, interior style, application) and detail fields
 * (characteristic, interior styles, style pairing, applications, edge options).
 * The old entries themselves were in Firebase and did not come with the zip,
 * so this is a starter set built only from materials the site already names
 * (data/producten.ts, data/collecties.ts, data/glasdeuren.ts, FAQ). Tone,
 * intensity, styles and pairings are editorial suggestions — Robbert to check
 * and complete (docs/releasechecklist.md). The old "environment" and
 * "durability" fields are left out until they are confirmed per material:
 * they promise suitability (humid rooms, outdoors, heavy use).
 *
 * Swatches: cut from the AI mood images of the Lovable design
 * (public/images/materialen/, see docs/beelden.md); profiles and stone are
 * shown as colour chips until there are photos of real samples.
 */

export const TONES = ["Licht", "Midden", "Donker", "Zwart"] as const;
export const INTENSITIES = ["Subtiel", "Gemiddeld", "Uitgesproken"] as const;
export const STYLES = ["Mid-century", "Japandi", "Quiet luxury", "Minimal"] as const;
export const APPLICATIONS = [
  { slug: "taatsdeuren", label: "Taatsdeuren" },
  { slug: "schuifdeuren", label: "Schuifdeuren" },
  { slug: "draaideuren", label: "Draaideuren" },
  { slug: "roomdividers", label: "Roomdividers" },
  { slug: "boiserie", label: "Boiserie" },
] as const;

export type Tone = (typeof TONES)[number];
export type Intensity = (typeof INTENSITIES)[number];
export type Style = (typeof STYLES)[number];
export type Application = (typeof APPLICATIONS)[number]["slug"];
/** The one thing that defines the material (old field "characteristics": grain, tone, texture, feel). */
export type Characteristic = "Nerf" | "Tint" | "Textuur" | "Gevoel";
export type Edge = "Recht" | "Afgerond" | "Afgeschuind";

export type CategorySlug =
  | "massief-hout"
  | "houtfineer"
  | "glas"
  | "steen-keramiek"
  | "3d-panelen"
  | "metaal-profielen"
  | "lak-afwerking";

export const CATEGORIES: Array<{
  slug: CategorySlug;
  label: string;
  intro: string;
  /** Matching question in the "Onderhoud & verzorging" tab of data/service.ts. */
  care?: string;
}> = [
  {
    slug: "massief-hout",
    label: "Massief hout",
    intro:
      "Natuurlijke hardhoutsoorten zoals eik, noten en zebrano vormen de basis van onze collecties. Elke houtsoort wordt zorgvuldig gekozen op sterkte, nerf en afwerking.",
    care: "Massief hout",
  },
  {
    slug: "houtfineer",
    label: "Houtfineer",
    intro:
      "Een verfijnde laag echt hout, waarmee unieke structuren en zeldzame houtsoorten tot leven komen — consistent en elegant.",
    care: "Houtfineer",
  },
  {
    slug: "glas",
    label: "Glas",
    intro:
      "Helder, getint of gestructureerd glas opent ruimtes met licht en transparantie — van privacyglas tot glazen statementdeuren.",
    care: "Glas",
  },
  {
    slug: "steen-keramiek",
    label: "Steen & keramiek",
    intro: "Marmer, travertin of keramische panelen geven onze ontwerpen een gevoel van degelijkheid en luxe.",
    care: "Steen & keramiek",
  },
  {
    slug: "3d-panelen",
    label: "3D-panelen",
    intro:
      "Panelen met diepte: gedurfde patronen en verfijnde materialen, ideaal voor accentwanden en ruimtes die om artistieke diepte vragen.",
  },
  {
    slug: "metaal-profielen",
    label: "Metaal & profielen",
    intro: "Accenten in aluminium, brons of staal zorgen voor contrast en precisie, in kozijnen, scharnieren en details.",
    care: "Beslag & metaal",
  },
  {
    slug: "lak-afwerking",
    label: "Lak & afwerking",
    intro:
      "Van matte oliën tot diepe beitsen en gladde lak: elke afwerking is gekozen om het natuurlijke karakter van het materiaal te beschermen en te versterken.",
  },
];

export type Material = {
  slug: string;
  /** Short reference, shown on the card and in a request. */
  code: string;
  name: string;
  category: CategorySlug;
  description: string;
  /** Card and detail swatch: a photo crop, or a colour chip (CSS background). */
  swatch: { src: string; alt: string } | { chip: string };
  /** Larger image of the material in use (detail page). */
  image?: { src: string; alt: string };
  characteristic: Characteristic;
  tone: Tone[];
  intensity: Intensity;
  styles: Style[];
  applications: Application[];
  edges?: Edge[];
  /** Slugs of materials it combines well with ("Style Pairing" on the old site). */
  pairings: string[];
};

const ALL_EDGES: Edge[] = ["Recht", "Afgerond", "Afgeschuind"];

export const MATERIALS: Material[] = [
  /* ── Massief hout ─────────────────────────────────────────────── */
  {
    slug: "eiken",
    code: "H-01",
    name: "Eiken",
    category: "massief-hout",
    description:
      "Licht en warm van toon, met een rustige, rechte nerf. Eiken is een van de hardhoutsoorten die de basis vormen van onze collecties, van warme schuifdeur tot strakke draaideur.",
    swatch: { src: "/images/materialen/eiken.jpg", alt: "Staal van naturel eikenhout met een rechte, lichte nerf" },
    image: { src: "/images/materiaal-eiken-stalen.jpg", alt: "Stalen van eikenhout in verschillende afwerkingen, van licht naturel tot gerookt" },
    characteristic: "Nerf",
    tone: ["Licht"],
    intensity: "Subtiel",
    styles: ["Japandi", "Minimal", "Mid-century"],
    applications: ["taatsdeuren", "schuifdeuren", "draaideuren", "roomdividers"],
    edges: ALL_EDGES,
    pairings: ["ribbelglas", "champagne", "satijnglas"],
  },
  {
    slug: "noten",
    code: "H-02",
    name: "Noten",
    category: "massief-hout",
    description:
      "Diep, warm bruin met een levendige nerf. Notenhout geeft een deur gewicht en karakter, zeker als grote taatsdeur.",
    swatch: { src: "/images/materialen/noten.jpg", alt: "Notenhout met een diepbruine, levendige nerf" },
    image: { src: "/images/hero-taatsdeur.jpg", alt: "Taatsdeur van notenhout in een lichte hal" },
    characteristic: "Nerf",
    tone: ["Donker"],
    intensity: "Gemiddeld",
    styles: ["Mid-century", "Quiet luxury"],
    applications: ["taatsdeuren", "schuifdeuren", "draaideuren", "roomdividers"],
    edges: ALL_EDGES,
    pairings: ["warm-brons", "satijnglas", "travertin"],
  },

  /* ── Houtfineer ───────────────────────────────────────────────── */
  {
    slug: "eikenfineer",
    code: "F-01",
    name: "Eikenfineer",
    category: "houtfineer",
    description:
      "Echt eiken als fineerlaag: de lichte, warme uitstraling van eiken, strak en consistent over grote deurvlakken en wanden.",
    swatch: { src: "/images/materialen/eikenfineer.jpg", alt: "Vel eikenfineer tussen andere fineersoorten" },
    image: { src: "/images/col-fineer.jpg", alt: "Vellen houtfineer: noten, eiken en zebrano" },
    characteristic: "Nerf",
    tone: ["Licht"],
    intensity: "Subtiel",
    styles: ["Japandi", "Minimal"],
    applications: ["taatsdeuren", "draaideuren", "roomdividers", "boiserie"],
    edges: ALL_EDGES,
    pairings: ["champagne", "ribbelglas", "lak-ral"],
  },
  {
    slug: "notenfineer",
    code: "F-02",
    name: "Notenfineer",
    category: "houtfineer",
    description:
      "De rijke tekening van noten als verfijnde laag echt hout. Warm en minimalistisch, gemaakt voor designinterieurs.",
    swatch: { src: "/images/materialen/notenfineer.jpg", alt: "Notenfineer met een rijke, gevlamde tekening" },
    image: { src: "/images/col-fineer.jpg", alt: "Vellen houtfineer: noten, eiken en zebrano" },
    characteristic: "Nerf",
    tone: ["Donker"],
    intensity: "Gemiddeld",
    styles: ["Mid-century", "Quiet luxury"],
    applications: ["taatsdeuren", "draaideuren", "roomdividers", "boiserie"],
    edges: ALL_EDGES,
    pairings: ["warm-brons", "grijs-getint-glas", "marmer"],
  },
  {
    slug: "zebranofineer",
    code: "F-03",
    name: "Zebranofineer",
    category: "houtfineer",
    description:
      "Het hout waar we onze naam aan danken: gestreept, uitgesproken en altijd net even anders. Als fineer komt die tekening over een heel deurvlak tot zijn recht.",
    swatch: { src: "/images/materialen/zebranofineer.jpg", alt: "Zebranofineer met donkere en lichte strepen" },
    image: { src: "/images/col-fineer.jpg", alt: "Vellen houtfineer: noten, eiken en zebrano" },
    characteristic: "Nerf",
    tone: ["Midden"],
    intensity: "Uitgesproken",
    styles: ["Mid-century", "Quiet luxury"],
    applications: ["taatsdeuren", "draaideuren", "boiserie"],
    edges: ALL_EDGES,
    pairings: ["mat-zwart", "helder-glas"],
  },

  /* ── Glas ─────────────────────────────────────────────────────── */
  {
    slug: "helder-glas",
    code: "G-01",
    name: "Helder glas",
    category: "glas",
    description: "Eén doorlopend glasvlak dat het licht vrij spel geeft tussen twee ruimtes. De deur lijkt bijna te verdwijnen.",
    swatch: { src: "/images/materialen/helder-glas.jpg", alt: "Helder glas in een slank zwart profiel" },
    image: { src: "/images/glas-jesse.jpg", alt: "Glazen taatsdeur met één vlak helder glas en een zwart profiel" },
    characteristic: "Gevoel",
    tone: ["Licht"],
    intensity: "Subtiel",
    styles: ["Minimal", "Japandi"],
    applications: ["taatsdeuren", "schuifdeuren", "draaideuren", "roomdividers"],
    pairings: ["mat-zwart", "eiken"],
  },
  {
    slug: "ribbelglas",
    code: "G-02",
    name: "Ribbelglas",
    category: "glas",
    description: "Verticale ribbels die licht doorlaten en zicht verzachten: privacy zonder de ruimte donker te maken.",
    swatch: { src: "/images/materialen/ribbelglas.jpg", alt: "Ribbelglas met fijne verticale ribbels" },
    image: { src: "/images/glas-bo.jpg", alt: "Glazen schuifdeur met verticaal ribbelglas en een bronzen profiel" },
    characteristic: "Textuur",
    tone: ["Licht"],
    intensity: "Gemiddeld",
    styles: ["Japandi", "Mid-century"],
    applications: ["taatsdeuren", "schuifdeuren", "draaideuren", "roomdividers"],
    pairings: ["warm-brons", "eiken"],
  },
  {
    slug: "satijnglas",
    code: "G-03",
    name: "Satijnglas",
    category: "glas",
    description: "Gesatineerd glas zorgt voor rust en privacy, met een zachte, egale uitstraling. Mooi voor een werkkamer of bibliotheek.",
    swatch: { src: "/images/materialen/satijnglas.jpg", alt: "Satijnglas in een champagnekleurig profiel" },
    image: { src: "/images/glas-guus.jpg", alt: "Dubbele glazen draaideur met satijnglas" },
    characteristic: "Gevoel",
    tone: ["Licht"],
    intensity: "Subtiel",
    styles: ["Quiet luxury", "Minimal"],
    applications: ["taatsdeuren", "schuifdeuren", "draaideuren", "roomdividers"],
    pairings: ["champagne", "noten"],
  },
  {
    slug: "grijs-getint-glas",
    code: "G-04",
    name: "Grijs getint glas",
    category: "glas",
    description: "Licht getint grijs glas: stoer van karakter, en dankzij een slank profiel toch verfijnd.",
    swatch: { src: "/images/materialen/grijs-getint-glas.jpg", alt: "Grijs getint glas in een raster van slanke profielen" },
    image: { src: "/images/glas-lucas.jpg", alt: "Glazen taatsdeur met een raster in grijs getint glas" },
    characteristic: "Tint",
    tone: ["Donker"],
    intensity: "Gemiddeld",
    styles: ["Minimal", "Quiet luxury"],
    applications: ["taatsdeuren", "schuifdeuren", "draaideuren", "roomdividers"],
    pairings: ["antraciet", "notenfineer"],
  },
  {
    slug: "structuurglas",
    code: "G-05",
    name: "Structuurglas",
    category: "glas",
    description: "Gestructureerd glas met een levendig oppervlak dat het licht breekt en het zicht vervaagt.",
    swatch: { src: "/images/materialen/structuurglas.jpg", alt: "Structuurglas met een golvend oppervlak" },
    image: { src: "/images/col-glas.jpg", alt: "Glazen taatsdeur met structuurglas in een lichte hal" },
    characteristic: "Textuur",
    tone: ["Licht"],
    intensity: "Uitgesproken",
    styles: ["Mid-century", "Quiet luxury"],
    applications: ["taatsdeuren", "schuifdeuren", "draaideuren", "roomdividers"],
    pairings: ["mat-zwart", "travertin"],
  },

  /* ── Steen & keramiek ─────────────────────────────────────────── */
  {
    slug: "marmer",
    code: "S-01",
    name: "Marmer",
    category: "steen-keramiek",
    description: "Marmer geeft een ontwerp degelijkheid en luxe, als inlay in een taatsdeur of wandvlakke deur, of als accent in boiserie.",
    swatch: { chip: "linear-gradient(135deg, oklch(0.95 0.004 95), oklch(0.89 0.006 250) 55%, oklch(0.93 0.004 95))" },
    characteristic: "Gevoel",
    tone: ["Licht"],
    intensity: "Uitgesproken",
    styles: ["Quiet luxury", "Minimal"],
    applications: ["taatsdeuren", "draaideuren", "boiserie"],
    pairings: ["mat-zwart", "notenfineer"],
  },
  {
    slug: "travertin",
    code: "S-02",
    name: "Travertin",
    category: "steen-keramiek",
    description: "Warm natuursteen met een zachte, gelaagde tekening. Als inlay of accent brengt het rust en stoffelijkheid.",
    swatch: { chip: "linear-gradient(135deg, oklch(0.88 0.03 80), oklch(0.82 0.04 75) 55%, oklch(0.86 0.03 82))" },
    characteristic: "Textuur",
    tone: ["Midden"],
    intensity: "Gemiddeld",
    styles: ["Japandi", "Quiet luxury"],
    applications: ["taatsdeuren", "draaideuren", "boiserie"],
    pairings: ["warm-brons", "noten"],
  },

  /* ── 3D-panelen ───────────────────────────────────────────────── */
  {
    slug: "verticale-ribbels",
    code: "D-01",
    name: "Verticale ribbels",
    category: "3d-panelen",
    description: "Verticale ribbels geven een deur diepte en ritme: een sculpturaal oppervlak dat met het licht meebeweegt.",
    swatch: { src: "/images/materialen/verticale-ribbels.jpg", alt: "Houten paneel met verticale ribbels" },
    image: { src: "/images/col-3d.jpg", alt: "Houten deur met verticale ribbels in reliëf" },
    characteristic: "Textuur",
    tone: ["Licht"],
    intensity: "Uitgesproken",
    styles: ["Japandi", "Mid-century"],
    applications: ["draaideuren", "taatsdeuren", "boiserie"],
    edges: ["Recht", "Afgerond"],
    pairings: ["champagne", "satijnglas"],
  },
  {
    slug: "klassiek-paneel",
    code: "D-02",
    name: "Klassiek paneel",
    category: "3d-panelen",
    description: "Paneelwerk met sierlijsten, voor deuren en wanden met een tijdloze, statige uitstraling.",
    swatch: { src: "/images/materialen/klassiek-paneel.jpg", alt: "Dubbele houten deuren met klassieke panelen" },
    image: { src: "/images/door-draai.jpg", alt: "Dubbele houten draaideuren die openstaan naar een zitkamer" },
    characteristic: "Textuur",
    tone: ["Donker"],
    intensity: "Gemiddeld",
    styles: ["Quiet luxury"],
    applications: ["draaideuren", "boiserie"],
    edges: ["Recht", "Afgeschuind"],
    pairings: ["warm-brons", "noten"],
  },

  /* ── Metaal & profielen ───────────────────────────────────────── */
  {
    slug: "mat-zwart",
    code: "M-01",
    name: "Mat zwart",
    category: "metaal-profielen",
    description: "Strak en grafisch: het klassieke profiel bij helder glas, en een scherp contrast naast licht hout.",
    swatch: { chip: "linear-gradient(135deg, var(--finish-black), oklch(0.28 0.005 135) 60%, var(--finish-black))" },
    image: { src: "/images/glas-jesse.jpg", alt: "Glazen taatsdeur met helder glas in een mat zwart profiel" },
    characteristic: "Tint",
    tone: ["Zwart"],
    intensity: "Uitgesproken",
    styles: ["Minimal", "Mid-century"],
    applications: ["taatsdeuren", "schuifdeuren", "draaideuren", "roomdividers"],
    pairings: ["helder-glas", "eiken"],
  },
  {
    slug: "warm-brons",
    code: "M-02",
    name: "Warm brons",
    category: "metaal-profielen",
    description: "Een warme metaaltint die ribbelglas en notenhout afmaakt.",
    swatch: { chip: "linear-gradient(135deg, var(--finish-bronze), oklch(0.6 0.07 65) 55%, var(--finish-bronze))" },
    image: { src: "/images/glas-bo.jpg", alt: "Glazen schuifdeur met ribbelglas in een warm bronzen profiel" },
    characteristic: "Tint",
    tone: ["Midden"],
    intensity: "Gemiddeld",
    styles: ["Quiet luxury", "Mid-century"],
    applications: ["taatsdeuren", "schuifdeuren", "draaideuren", "roomdividers"],
    pairings: ["ribbelglas", "noten"],
  },
  {
    slug: "antraciet",
    code: "M-03",
    name: "Antraciet",
    category: "metaal-profielen",
    description: "Donkergrijs en ingetogen, mooi bij getint glas en koele materialen.",
    swatch: { chip: "linear-gradient(135deg, var(--finish-anthracite), oklch(0.44 0.008 250) 55%, var(--finish-anthracite))" },
    image: { src: "/images/glas-lucas.jpg", alt: "Glazen taatsdeur met getint glas in een antraciet profiel" },
    characteristic: "Tint",
    tone: ["Donker"],
    intensity: "Gemiddeld",
    styles: ["Minimal"],
    applications: ["taatsdeuren", "schuifdeuren", "draaideuren", "roomdividers"],
    pairings: ["grijs-getint-glas", "marmer"],
  },
  {
    slug: "champagne",
    code: "M-04",
    name: "Champagne",
    category: "metaal-profielen",
    description: "Een zachte, lichte metaaltint die rustig samengaat met satijnglas en licht hout.",
    swatch: { chip: "linear-gradient(135deg, var(--finish-champagne), oklch(0.84 0.03 85) 55%, var(--finish-champagne))" },
    image: { src: "/images/glas-guus.jpg", alt: "Dubbele glazen draaideur met satijnglas in een champagnekleurig profiel" },
    characteristic: "Tint",
    tone: ["Licht"],
    intensity: "Subtiel",
    styles: ["Quiet luxury", "Japandi"],
    applications: ["taatsdeuren", "schuifdeuren", "draaideuren", "roomdividers"],
    pairings: ["satijnglas", "eikenfineer"],
  },

  /* ── Lak & afwerking ──────────────────────────────────────────── */
  {
    slug: "lak-ral",
    code: "L-01",
    name: "Lak in RAL-kleur",
    category: "lak-afwerking",
    description:
      "Gladde lak in een RAL-kleur naar keuze, voor deuren en panelen die naadloos opgaan in de wand of juist een kleuraccent zetten.",
    swatch: { src: "/images/materialen/lak.jpg", alt: "Gelakte wandvlakke deur, bijna onzichtbaar in de wand" },
    image: { src: "/images/door-wandvlak.jpg", alt: "Wandvlakke deur, strak opgenomen in een lichte wand" },
    characteristic: "Gevoel",
    tone: ["Licht", "Midden", "Donker", "Zwart"],
    intensity: "Subtiel",
    styles: ["Minimal", "Japandi", "Quiet luxury"],
    applications: ["draaideuren", "roomdividers", "boiserie"],
    edges: ALL_EDGES,
    pairings: ["eikenfineer", "mat-zwart"],
  },
];

export function getMaterial(slug: string) {
  return MATERIALS.find((m) => m.slug === slug) ?? null;
}

export function getCategory(slug: CategorySlug) {
  return CATEGORIES.find((c) => c.slug === slug)!;
}

export function applicationLabel(slug: Application) {
  return APPLICATIONS.find((a) => a.slug === slug)?.label ?? slug;
}

/** Filter keys as they appear in the URL (?categorie=glas&tint=licht…). */
export const FILTER_GROUPS = [
  { key: "tint", title: "Tint", values: TONES as readonly string[] },
  { key: "intensiteit", title: "Intensiteit", values: INTENSITIES as readonly string[] },
  { key: "stijl", title: "Interieurstijl", values: STYLES as readonly string[] },
  { key: "toepassing", title: "Toepassing", values: APPLICATIONS.map((a) => a.label) as readonly string[] },
] as const;

export type FilterKey = (typeof FILTER_GROUPS)[number]["key"];

/** The values of a material for one filter group (labels, as shown in the filters). */
export function materialValues(m: Material, key: FilterKey): string[] {
  switch (key) {
    case "tint":
      return m.tone;
    case "intensiteit":
      return [m.intensity];
    case "stijl":
      return m.styles;
    case "toepassing":
      return m.applications.map(applicationLabel);
  }
}
