/**
 * Collections — the original site only had short English texts for these
 * four lines (hard-coded on the collection pages). Translated and lightly
 * edited; no new product claims added. Taglines in the wording of the Lovable
 * design (november 2026). Hero images from the Lovable design, gallery
 * images from the old site — see docs/beelden.md.
 */

export type Collectie = {
  slug: string;
  name: string;
  tagline: string;
  text: string;
  /** Door types this collection is typically made as. */
  deurtypes: Array<{ label: string; href: string }>;
  meta: { title: string; description: string };
  hero: { src: string; alt: string };
  gallery: Array<{ src: string; alt: string }>;
};

export const collecties: Collectie[] = [
  {
    slug: "glas",
    name: "Glascollectie",
    tagline: "Designdeuren van glas: transparantie, elegantie en moderne functionaliteit in één.",
    text: "Ontdek onze glazen deuren, waaronder taats- en schuifmodellen. Gemaakt met veiligheidsglas en verfijnde afwerkingen, voor een tijdloos, open gevoel.",
    deurtypes: [
      { label: "Taatsdeuren", href: "/taatsdeuren" },
      { label: "Schuifdeuren", href: "/schuifdeuren" },
      { label: "Roomdividers", href: "/roomdividers" },
    ],
    meta: {
      title: "Glascollectie: glazen deuren en wanden",
      description:
        "De Glascollectie van Zebrano Studio: glazen taatsdeuren, schuifdeuren en roomdividers op maat, met helder, getint of ribbelglas en verfijnde profielen.",
    },
    hero: { src: "/images/col-glas.jpg", alt: "Glazen taatsdeur met structuurglas in een lichte hal" },
    gallery: [
      { src: "/images/glas-ribbel.webp", alt: "Glazen wand met ribbelglas in een licht interieur" },
      { src: "/images/glas-staal.webp", alt: "Glazen scheidingswand met zwarte stalen profielen" },
      { src: "/images/glas-in-lood.webp", alt: "Wand met gekleurd glas-in-lood" },
    ],
  },
  {
    slug: "fineer",
    name: "Fineercollectie",
    tagline: "Deuren van houtfineer met rijke texturen, natuurlijke nerven en architectonische precisie.",
    text: "Fineerdeuren in noten, eiken, zebrano en meer. Warm, minimalistisch en gemaakt voor designinterieurs.",
    deurtypes: [
      { label: "Draaideuren", href: "/draaideuren" },
      { label: "Wandvlakke deuren", href: "/wandvlakke-deuren" },
      { label: "Taatsdeuren", href: "/taatsdeuren" },
    ],
    meta: {
      title: "Fineercollectie: deuren van houtfineer",
      description:
        "De Fineercollectie van Zebrano Studio: deuren van echt houtfineer in noten, eiken en zebrano — warm, strak en op maat gemaakt voor jouw interieur.",
    },
    hero: { src: "/images/col-fineer.jpg", alt: "Vellen houtfineer in noten en zebrano" },
    gallery: [
      { src: "/images/fineer-rollen.webp", alt: "Rollen houtfineer in warme tinten" },
      { src: "/images/hout-planken.webp", alt: "Gestapelde houten planken met zichtbare nerf" },
      { src: "/images/afwerking-olie.webp", alt: "Hout wordt met de hand geolied" },
    ],
  },
  {
    slug: "3d",
    name: "3D-collectie",
    tagline: "Deuren met diepte: sculpturale oppervlakken die een statement maken.",
    text: "Onze 3D-paneeldeuren combineren gedurfde patronen met verfijnde materialen. Ideaal voor accentwanden en ruimtes die om artistieke diepte vragen.",
    deurtypes: [
      { label: "Draaideuren", href: "/draaideuren" },
      { label: "Taatsdeuren", href: "/taatsdeuren" },
      { label: "Boiserie", href: "/boiserie" },
    ],
    meta: {
      title: "3D-collectie: deuren met reliëf",
      description:
        "De 3D-collectie van Zebrano Studio: paneeldeuren met reliëf en sculpturale patronen, voor accentwanden en ruimtes die om diepte vragen. Op maat gemaakt.",
    },
    hero: { src: "/images/col-3d.jpg", alt: "Houten deur met verticale ribbels in reliëf" },
    gallery: [
      { src: "/images/3d-ornament.webp", alt: "Gevel met klassieke ornamenten en reliëf" },
      { src: "/images/taatsdeur-relief.webp", alt: "Dubbele houten deur met reliëf" },
      { src: "/images/boiserie-1.webp", alt: "Klassieke boiserie met sierlijsten" },
    ],
  },
  {
    slug: "atelier",
    name: "Ateliercollectie",
    tagline: "Volledig maatwerk, ontworpen in onze studio, zonder grenzen.",
    text: "Ontwerp samen met Zebrano Studio een deur van glas, hout, steen of metaal, helemaal afgestemd op jouw architectuur, smaak en verbeelding.",
    deurtypes: [
      { label: "Taatsdeuren", href: "/taatsdeuren" },
      { label: "Draaideuren", href: "/draaideuren" },
      { label: "Wandvlakke deuren", href: "/wandvlakke-deuren" },
    ],
    meta: {
      title: "Ateliercollectie: volledig maatwerk",
      description:
        "De Ateliercollectie van Zebrano Studio: volledig maatwerk deuren van glas, hout, steen of metaal, samen met jou ontworpen voor jouw architectuur.",
    },
    hero: { src: "/images/col-atelier.jpg", alt: "Vakman schuurt een deur van notenhout" },
    gallery: [
      { src: "/images/atelier-2.webp", alt: "Houten deurpanelen met handgemaakt reliëf" },
      { src: "/images/atelier-1.webp", alt: "Deurpanelen met verschillende patronen" },
      { src: "/images/taatsdeur-relief.webp", alt: "Dubbele houten deur met reliëf" },
    ],
  },
];

export function getCollectie(slug: string) {
  return collecties.find((c) => c.slug === slug);
}

/** "Twee manieren om te starten" + the four choices (original products page). */
export const startOpties = {
  title: "Begin jouw Zebrano-reis",
  intro: "We bieden twee manieren om te starten — kies wat het beste bij jou past.",
  opties: [
    {
      label: "Optie 1",
      title: "Ontdek onze collecties",
      text: "Weet je niet waar je moet beginnen? Bekijk onze collecties Glas, Fineer, 3D en Atelier en ontdek de ontwerpen, materialen en afwerkingen die jou inspireren. Wij helpen je de perfecte match te vinden voor jouw stijl en ruimte.",
    },
    {
      label: "Optie 2",
      title: "Stel je eigen deur samen",
      text: "Weet je al precies wat je wilt? Vertel ons welk deurtype, welke materialen, welk beslag en welke details je voor ogen hebt — wij maken het volledig op maat.",
    },
  ],
  stappen: [
    {
      title: "Kies jouw deurtype.",
      sub: "Maak een statement.",
      text: "Kies uit taats-, schuif- of draaideuren, wandvlakke deuren of een roomdivider — elk met eigen voordelen in stijl, functie en ruimtegebruik.",
      href: "/taatsdeuren",
      cta: "Bekijk deurtypes",
    },
    {
      title: "Kies jouw materiaal.",
      sub: "Maak het eigen.",
      text: "Van luxe fineer tot massief hout, gestructureerd glas of natuurstenen inlays — wij maken jouw ontwerp exact op maat voor jouw ruimte.",
      href: "/materialen",
      cta: "Bekijk materialen",
    },
    {
      title: "Bepaal jouw greepstijl.",
      sub: "Handgreep of geïntegreerde greep.",
      text: "Kies uit volledig geïntegreerde grepen, opvallende contrasterende metalen of bijpassende materiaalafwerkingen, zodat je deur net zo uniek wordt als je interieur.",
      href: "/contact",
      cta: "Vraag naar beslag",
    },
    {
      title: "Totale designintegratie.",
      sub: "Laat je deur opgaan in de architectuur.",
      text: "Van roomdividers en wandpanelen tot volledig geïntegreerde kozijnen — deuren die deel worden van de wand, voor een doorlopend en harmonieus ontwerp.",
      href: "/boiserie",
      cta: "Bekijk boiserie",
    },
  ],
};
