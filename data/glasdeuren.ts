/**
 * Glascollectie — the five glass designs from Robbert's Lovable design
 * (november 2026), with their own page each (/collecties/glas/[ontwerp]).
 * Names, descriptions, glass types and profile colours come from that design;
 * confirm before launch that this is the actual range (docs/releasechecklist.md).
 * Images: AI-generated in Lovable, see docs/beelden.md.
 * Every design is available in all four uitvoeringen (data/uitvoeringen.ts);
 * `type`/`uitvoering` is how the photo shows it and the picker's default.
 */
import type { UitvoeringSlug } from "@/data/uitvoeringen";


export type Finish = "zwart" | "brons" | "antraciet" | "champagne";

export const FINISHES: Record<Finish, { label: string; swatch: string }> = {
  zwart: { label: "Mat zwart", swatch: "bg-finish-black" },
  brons: { label: "Warm brons", swatch: "bg-finish-bronze" },
  antraciet: { label: "Antraciet", swatch: "bg-finish-anthracite" },
  champagne: { label: "Champagne", swatch: "bg-finish-champagne" },
};

export type GlassDoor = {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  image: { src: string; alt: string };
  /** How the photo shows it, e.g. "Dubbele draaideur". */
  type: string;
  /** The uitvoering in the photo — pre-selected on the design page. */
  uitvoering: UitvoeringSlug;
  glass: string;
  layout: string;
  finish: Finish;
  finishes: Finish[];
};

export const GLASS_DOORS: GlassDoor[] = [
  {
    slug: "jesse",
    name: "Jesse",
    tagline: "Eén vlak helder glas, verder niets.",
    description:
      "Jesse is ons meest pure ontwerp: een slanke taatsdeur met één doorlopend glasvlak en een haarfijn profiel. De deur lijkt bijna te verdwijnen en laat het licht vrij spel tussen twee ruimtes.",
    image: { src: "/images/glas-jesse.jpg", alt: "Glazen taatsdeur Jesse met één vlak helder glas en een zwart profiel" },
    type: "Taatsdeur",
    uitvoering: "taatsdeur",
    glass: "Helder glas",
    layout: "Eén vlak",
    finish: "zwart",
    finishes: ["zwart", "brons", "antraciet", "champagne"],
  },
  {
    slug: "bo",
    name: "Bo",
    tagline: "Ribbelglas dat licht doorlaat en zicht verzacht.",
    description:
      "Bo schuift moeiteloos langs een rail boven de opening. Het verticale ribbelglas geeft privacy zonder de ruimte donker te maken, en het warme bronzen profiel maakt het af.",
    image: { src: "/images/glas-bo.jpg", alt: "Glazen schuifdeur Bo met verticaal ribbelglas en een bronzen profiel" },
    type: "Schuifdeur",
    uitvoering: "schuifdeur",
    glass: "Ribbelglas",
    layout: "Eén vlak",
    finish: "brons",
    finishes: ["brons", "zwart", "champagne"],
  },
  {
    slug: "merle",
    name: "Merle",
    tagline: "Een zachte boog met klassieke roedes.",
    description:
      "Merle combineert een ronde bovenkant met zes heldere glasvakken. Tijdloos en een tikje romantisch, mooi in een gang of als entree naar de woonkamer.",
    image: { src: "/images/glas-merle.jpg", alt: "Glazen draaideur Merle met een boog en zes vakken in een zwart profiel" },
    type: "Draaideur",
    uitvoering: "draaideur",
    glass: "Helder glas",
    layout: "Boog · 6 vakken",
    finish: "zwart",
    finishes: ["zwart", "antraciet", "brons"],
  },
  {
    slug: "lucas",
    name: "Lucas",
    tagline: "Stoer raster in getint glas.",
    description:
      "Lucas is een grote taatsdeur met een raster van twaalf vakken en licht getint grijs glas. Industrieel van karakter, maar dankzij de slanke profielen toch verfijnd.",
    image: { src: "/images/glas-lucas.jpg", alt: "Glazen taatsdeur Lucas met een raster van twaalf vakken in getint glas" },
    type: "Taatsdeur",
    uitvoering: "taatsdeur",
    glass: "Grijs getint glas",
    layout: "Raster · 12 vakken",
    finish: "antraciet",
    finishes: ["antraciet", "zwart"],
  },
  {
    slug: "guus",
    name: "Guus",
    tagline: "Dubbele deuren in satijnglas.",
    description:
      "Guus opent in twee delen en geeft zo een royale doorgang. Het gesatineerde glas zorgt voor rust en privacy, ideaal voor een werkkamer of bibliotheek.",
    image: { src: "/images/glas-guus.jpg", alt: "Dubbele glazen draaideur Guus met satijnglas en een champagnekleurig profiel" },
    type: "Dubbele draaideur",
    uitvoering: "draaideur",
    glass: "Satijnglas",
    layout: "Horizontaal · 4 vakken",
    finish: "champagne",
    finishes: ["champagne", "brons", "zwart"],
  },
];

export function getGlassDoor(slug: string) {
  return GLASS_DOORS.find((d) => d.slug === slug) ?? null;
}
