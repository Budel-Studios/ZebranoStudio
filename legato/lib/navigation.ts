import { accessoires } from "@/data/accessoires";

/**
 * Navigation — one source for the menu (mega panel + mobile accordion) and
 * the footer. Four groups: Boeken · Verhalen · Accessoires · Voor fotografen.
 * `preview` names the drawn mock shown in the mega panel (there is no
 * photography yet); the header maps it to a component.
 */

export type NavPreview =
  | { type: "spread"; kind: import("@/components/site/book-mock").SpreadKind }
  | { type: "cover"; material: string }
  | { type: "accessoire"; id: import("@/data/accessoires").AccessoireArt }
  | { type: "assistent" };

export type NavItem = {
  label: string;
  href: string;
  preview: NavPreview;
  /** One line under the preview. */
  note?: string;
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
    id: "boeken",
    label: "Boeken",
    intro: "Geen album, maar een boek. Met hoofdstukken, een colofon en jullie eigen woorden.",
    items: [
      { label: "Het boek", href: "/het-boek", preview: { type: "spread", kind: "titel" }, note: "Formaten, omslag en wat erin staat, van titelpagina tot colofon." },
      { label: "Materialen", href: "/het-boek#materialen", preview: { type: "cover", material: "linnen" }, note: "Linnen, leer, suède, fluweel, katoen of canvas, met de titel in het omslag gedrukt." },
      { label: "Reisboeken", href: "/reisboeken", preview: { type: "spread", kind: "reis" }, note: "Hetzelfde idee voor een bijzondere reis: hoofdstukken per dag of per plek." },
      { label: "Werkwijze", href: "/werkwijze", preview: { type: "spread", kind: "opener" }, note: "In vier stappen van foto's en verhalen naar een gebonden boek." },
      { label: "Veelgestelde vragen", href: "/veelgestelde-vragen", preview: { type: "spread", kind: "colofon" }, note: "Over het boek, het maken, de prijs en de levering." },
    ],
    cta: { label: "Vraag een voorstel", href: "/contact" },
  },
  {
    id: "verhalen",
    label: "Verhalen",
    intro: "De woorden horen erbij. Wat is gezegd, geschreven en beloofd.",
    items: [
      { label: "Hoofdstukken", href: "/hoofdstukken", preview: { type: "spread", kind: "opener" }, note: "Van aankomst tot vertrek: de dag in de volgorde waarin hij gebeurde." },
      { label: "Geloften en speeches", href: "/hoofdstukken#geloften", preview: { type: "spread", kind: "geloften" }, note: "Woord voor woord, op een eigen spread." },
      { label: "Brieven en gastenquotes", href: "/hoofdstukken#brieven", preview: { type: "spread", kind: "brief" }, note: "Een brief van een ouder, een zin uit het gastenboek." },
      { label: "Menu, playlist en tijdlijn", href: "/hoofdstukken#menu", preview: { type: "spread", kind: "menu" }, note: "De details die je anders vergeet." },
      { label: "Over ons", href: "/over", preview: { type: "spread", kind: "quote" }, note: "Waarom we vinden dat een trouwdag een boek verdient." },
    ],
    cta: { label: "Alle verhaalvormen", href: "/hoofdstukken#verhalen" },
  },
  {
    id: "accessoires",
    label: "Accessoires",
    intro: "Alles rond het boek: om het te bewaren, te laten zien en door te geven.",
    items: accessoires.map((a) => ({
      label: a.name,
      href: `/accessoires#${a.id}`,
      preview: { type: "accessoire" as const, id: a.id },
      note: a.tagline,
    })),
    cta: { label: "Alle accessoires", href: "/accessoires" },
  },
  {
    id: "fotografen",
    label: "Voor fotografen",
    intro: "Een eigen studio, waarin je het boek samen met je bruidspaar samenstelt.",
    items: [
      { label: "Jouw eigen studio", href: "/voor-fotografen", preview: { type: "assistent" }, note: "Een eigen portaal, onder je eigen studionaam." },
      { label: "Zo werkt het", href: "/voor-fotografen#workflow", preview: { type: "spread", kind: "tijdlijn" }, note: "Van selectie tot drukklaar boek, samen met het paar." },
      { label: "De ontwerpassistent", href: "/voor-fotografen#assistent", preview: { type: "assistent" }, note: "Stelt opmaak voor op basis van jouw keuzes. Jij beslist." },
      { label: "Demo aanvragen", href: "/contact?type=fotograaf", preview: { type: "cover", material: "fluweel" }, note: "We lopen samen door de studio en de mogelijkheden." },
    ],
    cta: { label: "Open de studio", href: "/studio" },
  },
];

/** Primary call to action in the menu bar and on every page. */
export const primaryCta = { label: "Vraag een voorstel", href: "/contact" };

/** The working app for photographers. */
export const studioLink = { label: "Inloggen studio", href: "/studio" };

export const footerColumns: Array<{ title: string; links: Array<{ label: string; href: string }> }> = [
  {
    title: "Boeken",
    links: [
      { label: "Het boek", href: "/het-boek" },
      { label: "Hoofdstukken", href: "/hoofdstukken" },
      { label: "Reisboeken", href: "/reisboeken" },
      { label: "Accessoires", href: "/accessoires" },
      { label: "Werkwijze", href: "/werkwijze" },
    ],
  },
  {
    title: "Fotografen",
    links: [
      { label: "Voor fotografen", href: "/voor-fotografen" },
      { label: "Demo aanvragen", href: "/contact?type=fotograaf" },
      { label: "Inloggen studio", href: "/studio" },
    ],
  },
  {
    title: "Service",
    links: [
      { label: "Over ons", href: "/over" },
      { label: "Veelgestelde vragen", href: "/veelgestelde-vragen" },
      { label: "Contact", href: "/contact" },
      { label: "Privacyverklaring", href: "/privacy" },
      { label: "Voorwaarden", href: "/voorwaarden" },
    ],
  },
];
