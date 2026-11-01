import { UITVOERINGEN } from "@/data/uitvoeringen";
import { IMAGES, PHOTOS, type Img } from "@/lib/images";
import { isModuleOn, type ModuleKey } from "@/lib/site";

/**
 * Navigation — one source for the menu (mega panel + mobile accordion) and
 * the footer, as in the Lovable design: three groups (Deuren, Collecties,
 * Zebrano) plus "Samenwerken". Items tied to a module (lib/site.ts) only appear
 * when that module is on.
 */

export type NavItem = {
  label: string;
  href: string;
  /** Preview image in the mega panel. */
  image?: Img;
  /** One line under the preview image. */
  note?: string;
  module?: ModuleKey;
};

export type NavGroup = {
  id: string;
  label: string;
  intro: string;
  items: NavItem[];
  cta: { label: string; href: string };
};

export const NAV: NavGroup[] = [
  {
    id: "deuren",
    label: "Deuren",
    intro: "Elk ontwerp in vier uitvoeringen. Jij kiest hoe hij opengaat.",
    // The four uitvoeringen (data/uitvoeringen.ts); wandvlak is an option of the draaideur.
    items: UITVOERINGEN.map((u) => ({ label: u.plural, href: u.href, image: u.image, note: u.beweging })),
    // The old menu's "Materialenbibliotheek" pill, with "Bekijk materialen" as fallback when the module is off.
    cta: isModuleOn("materialenbibliotheek")
      ? { label: "Materialenbibliotheek", href: "/materialenbibliotheek" }
      : { label: "Bekijk materialen", href: "/materialen" },
  },
  {
    id: "collecties",
    label: "Collecties",
    intro: "Vier collecties voor je deur, boiserie voor je wand.",
    items: [
      {
        label: "Glascollectie",
        href: "/collecties/glas",
        image: IMAGES.colGlas,
        note: "Designdeuren van glas: transparantie, elegantie en moderne functionaliteit in één.",
      },
      {
        label: "Fineercollectie",
        href: "/collecties/fineer",
        image: IMAGES.colFineer,
        note: "Houtfineer met rijke texturen, natuurlijke nerven en architectonische precisie.",
      },
      {
        label: "3D-collectie",
        href: "/collecties/3d",
        image: IMAGES.col3d,
        note: "Deuren met diepte: sculpturale oppervlakken die een statement maken.",
      },
      {
        label: "Ateliercollectie",
        href: "/collecties/atelier",
        image: IMAGES.colAtelier,
        note: "Volledig maatwerk, ontworpen in onze studio, zonder grenzen.",
      },
      { label: "Boiserie", href: "/boiserie", image: IMAGES.col3d, note: "Wandpanelen op maat, afgestemd op je deuren." },
    ],
    cta: { label: "Start je ontwerp", href: "/contact" },
  },
  {
    id: "zebrano",
    label: "Zebrano",
    intro: "Twee broers, één passie: hout dat een leven lang meegaat.",
    items: [
      { label: "Ons verhaal", href: "/ons-verhaal", image: PHOTOS.verhaalHero },
      { label: "Ontmoet de makers", href: "/de-makers", image: PHOTOS.makersHero },
      { label: "Bewust vakmanschap", href: "/bewust-vakmanschap", image: PHOTOS.vakmanschapBos },
      { label: "MTB Bouw-familie", href: "/mtb-bouw", image: IMAGES.colAtelier },
      { label: "Service", href: "/service", image: IMAGES.doorTaats },
      { label: "Veelgestelde vragen", href: "/veelgestelde-vragen", image: IMAGES.doorSchuif },
    ],
    cta: { label: "Contact", href: "/contact" },
  },
];

/** Groups with switched-off module items removed. */
export function visibleNav(): NavGroup[] {
  return NAV.map((g) => ({ ...g, items: g.items.filter((i) => isModuleOn(i.module)) }));
}

/** Link next to the groups: the partner programme ("Trade" on the original site, "Zakelijk" in Lovable). */
export const samenwerkenLink = { label: "Samenwerken", href: "/architecten" };

/** Primary call to action in the menu bar and on every page. */
export const primaryCta = { label: "Vraag een voorstel", href: "/contact" };

/** Footer columns (Lovable design). Links tied to a module only show when it is on (visibleFooterColumns). */
export const footerColumns: Array<{ title: string; links: Array<{ label: string; href: string; module?: ModuleKey }> }> = [
  {
    title: "Deuren",
    links: [
      { label: "Taatsdeuren", href: "/taatsdeuren" },
      { label: "Schuifdeuren", href: "/schuifdeuren" },
      { label: "Draaideuren", href: "/draaideuren" },
      { label: "Roomdividers", href: "/roomdividers" },
      { label: "Materialen", href: "/materialen" },
      { label: "Materialenbibliotheek", href: "/materialenbibliotheek", module: "materialenbibliotheek" },
    ],
  },
  {
    title: "Zebrano",
    links: [
      { label: "Collecties", href: "/collecties" },
      { label: "Boiserie", href: "/boiserie" },
      { label: "Samenwerken", href: "/architecten" },
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

export function visibleFooterColumns() {
  return footerColumns.map((c) => ({ ...c, links: c.links.filter((l) => isModuleOn(l.module)) }));
}
