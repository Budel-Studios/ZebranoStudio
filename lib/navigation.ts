import { isModuleOn, type ModuleKey } from "@/lib/site";

/**
 * Navigation — single source of truth for the menu, footer and sitemap.
 *
 * The menu reproduces the original Zebrano site: five columns (Collectie,
 * Producten, Inspiratie, Zebrano, Overig), each with links, an optional pill
 * button and an image at the bottom. Items tied to a module (lib/site.ts)
 * only appear when that module is on.
 */

export type NavLink = {
  label: string;
  href: string;
  module?: ModuleKey;
};

export type NavPill = NavLink & {
  /** Shown instead when the module of the pill is switched off. */
  fallback?: NavLink;
};

export type NavColumn = {
  title: string;
  links: NavLink[];
  pill?: NavPill;
  image: { src: string; alt: string };
};

export const menuColumns: NavColumn[] = [
  {
    title: "Collectie",
    links: [
      { label: "Glascollectie", href: "/collecties/glas" },
      { label: "Fineercollectie", href: "/collecties/fineer" },
      { label: "3D-collectie", href: "/collecties/3d" },
      { label: "Ateliercollectie", href: "/collecties/atelier" },
    ],
    pill: {
      label: "Configurator",
      href: "/configurator",
      module: "configurator",
      fallback: { label: "Start je ontwerp", href: "/contact" },
    },
    image: { src: "/images/glas-ribbel.webp", alt: "Glazen wand met ribbelglas in een licht interieur" },
  },
  {
    title: "Producten",
    links: [
      { label: "Taatsdeuren", href: "/taatsdeuren" },
      { label: "Schuifdeuren", href: "/schuifdeuren" },
      { label: "Draaideuren", href: "/draaideuren" },
      { label: "Wandvlakke deuren", href: "/wandvlakke-deuren" },
      { label: "Roomdividers", href: "/roomdividers" },
      { label: "Boiserie", href: "/boiserie" },
      { label: "Materialen", href: "/materialen" },
    ],
    image: { src: "/images/taatsdeur-visgraat.webp", alt: "Houten taatsdeur met visgraatpatroon" },
  },
  {
    title: "Inspiratie",
    links: [
      { label: "Alle projecten", href: "/projecten", module: "projecten" },
      { label: "Het Studiojournaal", href: "/journaal", module: "journal" },
      { label: "Catalogi & downloads", href: "/downloads", module: "downloads" },
      { label: "Architecten", href: "/architecten" },
    ],
    pill: {
      label: "Materialenbibliotheek",
      href: "/materialenbibliotheek",
      module: "materialenbibliotheek",
      fallback: { label: "Bekijk materialen", href: "/materialen" },
    },
    image: { src: "/images/boiserie-2.webp", alt: "Interieur met klassieke boiserie en open deur" },
  },
  {
    title: "Zebrano",
    links: [
      { label: "Ons verhaal", href: "/ons-verhaal" },
      { label: "Ontmoet de makers", href: "/de-makers" },
      { label: "Bewust vakmanschap", href: "/bewust-vakmanschap" },
      { label: "MTB Bouw-familie", href: "/mtb-bouw" },
    ],
    image: { src: "/images/verhaal-3.webp", alt: "Houtmonsters en ontwerpschetsen op een werktafel" },
  },
  {
    title: "Overig",
    links: [
      { label: "Contact", href: "/contact" },
      { label: "Service", href: "/service" },
      { label: "Veelgestelde vragen", href: "/veelgestelde-vragen" },
    ],
    image: { src: "/images/afwerking-olie.webp", alt: "Hout wordt met de hand geolied" },
  },
];

/** Columns with switched-off links removed and pills resolved. */
export function visibleMenuColumns(): Array<Omit<NavColumn, "pill"> & { pill?: NavLink }> {
  return menuColumns.map((col) => {
    const pill = col.pill
      ? isModuleOn(col.pill.module)
        ? { label: col.pill.label, href: col.pill.href }
        : col.pill.fallback
      : undefined;
    return {
      ...col,
      links: col.links.filter((l) => isModuleOn(l.module)),
      pill,
    };
  });
}

/** Segment next to the menu button (was "Trade" on the original site). */
export const zakelijkLink: NavLink = { label: "Zakelijk", href: "/architecten" };

/** Primary call to action in the menu bar (green, as in the original brief). */
export const primaryCta: NavLink = { label: "Vraag een voorstel", href: "/contact" };

/** Footer columns — mirror the menu groups, as requested in the 2025 brief. */
export const footerColumns: Array<{ title: string; links: NavLink[] }> = [
  {
    title: "Producten",
    links: [
      { label: "Taatsdeuren", href: "/taatsdeuren" },
      { label: "Schuifdeuren", href: "/schuifdeuren" },
      { label: "Draaideuren", href: "/draaideuren" },
      { label: "Wandvlakke deuren", href: "/wandvlakke-deuren" },
      { label: "Roomdividers", href: "/roomdividers" },
      { label: "Boiserie", href: "/boiserie" },
      { label: "Materialen", href: "/materialen" },
    ],
  },
  {
    title: "Zebrano",
    links: [
      { label: "Collecties", href: "/collecties" },
      { label: "Architecten", href: "/architecten" },
      { label: "Ons verhaal", href: "/ons-verhaal" },
      { label: "Ontmoet de makers", href: "/de-makers" },
      { label: "Bewust vakmanschap", href: "/bewust-vakmanschap" },
      { label: "Een merk van MTB Bouw", href: "/mtb-bouw" },
    ],
  },
  {
    title: "Service",
    links: [
      { label: "Contact", href: "/contact" },
      { label: "Service", href: "/service" },
      { label: "Veelgestelde vragen", href: "/veelgestelde-vragen" },
      { label: "Algemene voorwaarden", href: "/algemene-voorwaarden" },
      { label: "Privacyverklaring", href: "/privacy" },
      { label: "Cookiebeleid", href: "/cookiebeleid" },
    ],
  },
];
