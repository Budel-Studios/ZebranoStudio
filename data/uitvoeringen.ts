import { IMAGES, type Img } from "@/lib/images";

/**
 * The four uitvoeringen (versions). Robbert, 01-11-2026: every door design is
 * available as a pivot, sliding, hinged door or room divider — the site is
 * built around "kies je ontwerp, kies hoe hij opengaat" (feit
 * `vierUitvoeringen`). Wandvlak is an option of the draaideur; boiserie is
 * not a door and lives under Collecties.
 */
export type UitvoeringSlug = "taatsdeur" | "schuifdeur" | "draaideur" | "roomdivider";

export type Uitvoering = {
  slug: UitvoeringSlug;
  /** Singular, as used in "Jesse als taatsdeur". */
  label: string;
  /** Plural, the name of the page and the menu item. */
  plural: string;
  href: string;
  /** How it opens, in a few words (cards, menu, picker). */
  beweging: string;
  image: Img;
};

export const UITVOERINGEN: Uitvoering[] = [
  {
    slug: "taatsdeur",
    label: "Taatsdeur",
    plural: "Taatsdeuren",
    href: "/taatsdeuren",
    beweging: "Draait om een verborgen as",
    image: IMAGES.heroTaats,
  },
  {
    slug: "schuifdeur",
    label: "Schuifdeur",
    plural: "Schuifdeuren",
    href: "/schuifdeuren",
    beweging: "Glijdt langs een rail",
    image: IMAGES.doorSchuif,
  },
  {
    slug: "draaideur",
    label: "Draaideur",
    plural: "Draaideuren",
    href: "/draaideuren",
    beweging: "Draait op scharnieren, ook wandvlak",
    image: IMAGES.doorDraai,
  },
  {
    slug: "roomdivider",
    label: "Roomdivider",
    plural: "Roomdividers",
    href: "/roomdividers",
    beweging: "Verdeelt de ruimte, houdt het licht",
    image: IMAGES.doorRoomdivider,
  },
];

/** The sentence that explains the system, used on the homepage, door and design pages. */
export const UITVOERINGEN_ZIN =
  "Elk ontwerp maken we als taatsdeur, schuifdeur, draaideur of roomdivider. Jij kiest hoe hij opengaat.";

export function isUitvoering(v: string | null | undefined): v is UitvoeringSlug {
  return UITVOERINGEN.some((u) => u.slug === v);
}

export function getUitvoering(slug: string | null | undefined): Uitvoering | undefined {
  return UITVOERINGEN.find((u) => u.slug === slug);
}

/** The uitvoering behind a door page (/taatsdeuren → taatsdeur); undefined for e.g. /boiserie. */
export function uitvoeringForPage(pageSlug: string): Uitvoering | undefined {
  return UITVOERINGEN.find((u) => u.href === `/${pageSlug}`);
}
