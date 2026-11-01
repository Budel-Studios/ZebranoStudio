/**
 * Door types ("Producten") — copy taken from the original Zebrano site (NL),
 * edited: typos fixed, English leftovers translated, "Configureer nu"
 * replaced by the request flow (no configurator yet).
 *
 * Hero images come from the Lovable design (november 2026); the images in
 * the rows are from the old site and their origin still has to be confirmed —
 * see docs/beelden.md before going live.
 */

export type DoorBlock = {
  /** Small label above the heading (was "title" on the old site). */
  label: string;
  title: string;
  text: string;
  cta?: { label: string; href: string };
  image?: { src: string; alt: string };
};

export type DoorPage = {
  slug: string;
  /** Short name, used in menus, cards and breadcrumbs. */
  name: string;
  h1: string;
  intro: string;
  meta: { title: string; description: string };
  hero: { src: string; alt: string };
  /** Two intro blocks: what is it / why choose it. */
  basics: [DoorBlock, DoorBlock];
  /** Three rows: materials, hardware & details, integration. */
  rows: [DoorBlock, DoorBlock, DoorBlock];
  /** One-line teaser for cards on other pages. */
  teaser: string;
};

const COLLECTIES = { label: "Bekijk de collecties", href: "/collecties" };
const MATERIALEN = { label: "Bekijk materialen", href: "/materialen" };
const BESLAG = { label: "Vraag naar beslagopties", href: "/contact" };
const CONTACT = { label: "Neem contact op", href: "/contact" };

export const doorPages: DoorPage[] = [
  {
    slug: "taatsdeuren",
    name: "Taatsdeuren",
    h1: "Taatsdeuren",
    intro:
      "Een taatsdeur is een strak, modern deurontwerp dat draait op een centraal of excentrisch taatsscharnier. Zo ontstaat een vloeiende, bijzondere opening met een eigentijdse uitstraling.",
    meta: {
      title: "Taatsdeuren op maat",
      description:
        "Maatwerk taatsdeuren van Zebrano Studio: draaiend op een verdekt taatsscharnier, in hout, fineer, glas of steen. Ook extra groot of zwaar. Vraag een voorstel.",
    },
    hero: { src: "/images/hero-taatsdeur.jpg", alt: "Taatsdeur van notenhout in een lichte hal" },
    basics: [
      {
        label: "Wat is een taatsdeur?",
        title: "Een statement in beweging",
        text: "Vergeet de gewone draaideur: een taatsdeur draait vanuit een centraal punt en beweegt soepel en gewichtloos. Het voelt meer als een designervaring dan als een opening. Extra groot of zwaar? Geen probleem — onze maatwerk taatsdeuren dragen het moeiteloos.",
        cta: COLLECTIES,
      },
      {
        label: "Waarom een taatsdeur?",
        title: "Gedurfd, naadloos, functioneel",
        text: "Een taatsdeur is niet zomaar een doorgang — het is een statementstuk. Perfect voor brede openingen: een taatsdeur geeft een gevoel van aankomst, terwijl de beweging moeiteloos en perfect in balans blijft.",
      },
    ],
    rows: [
      {
        label: "Materiaalmogelijkheden",
        title: "Gemaakt op jouw manier",
        text: "Van diep notenhout tot luchtige glazen panelen of zelfs stenen inlays — een taatsdeur kan vrijwel elke uitstraling aannemen die je voor ogen hebt. Elke deur wordt met precisie gemaakt, passend bij jouw stijl, materiaalvoorkeur en architectuur.",
        cta: MATERIALEN,
        image: { src: "/images/taatsdeur-visgraat.webp", alt: "Houten taatsdeur met visgraatpatroon, half geopend" },
      },
      {
        label: "Beslag & details",
        title: "Onzichtbare precisie",
        text: "Wij verbergen de techniek — verdekte taatsscharnieren, vlakke grepen en soft-close-systemen — zodat je alleen een strak, ononderbroken ontwerp ziet.",
        cta: BESLAG,
        image: { src: "/images/taatsdeur-relief.webp", alt: "Dubbele houten deur met reliëf en lange verticale grepen" },
      },
      {
        label: "Integratieopties",
        title: "Van deur tot designelement",
        text: "Combineer je taatsdeur met bijpassende wandpanelen, maatwerk kozijnen of geïntegreerde kasten. Zo loopt het ontwerp door je hele interieur.",
        cta: CONTACT,
        image: { src: "/images/boiserie-1.webp", alt: "Klassieke wandpanelen rond een hoge deur" },
      },
    ],
    teaser: "Draaien op een verdekt scharnierpunt — ideaal voor brede, hoge openingen.",
  },
  {
    slug: "schuifdeuren",
    name: "Schuifdeuren",
    h1: "Schuifdeuren",
    intro:
      "Een schuifdeur beweegt horizontaal langs een rail. Dat maakt hem ruimtebesparend en modern — als elegante roomdivider, kastoplossing of vloeiende overgang tussen twee ruimtes.",
    meta: {
      title: "Schuifdeuren op maat",
      description:
        "Maatwerk schuifdeuren van Zebrano Studio: soepel en stil over een verdekte rail, in hout, fineer of glas. Als roomdivider of kastoplossing. Vraag een voorstel.",
    },
    hero: { src: "/images/door-schuif.jpg", alt: "Eikenhouten schuifdeur aan een rail in een woonkamer" },
    basics: [
      {
        label: "Wat is een schuifdeur?",
        title: "Ruimtebesparende elegantie",
        text: "Schuifdeuren bewegen langs een rail in plaats van open te draaien. Daardoor zijn ze ideaal voor indelingen waar elke meter telt. Onze schuifdeuren werken prachtig als roomdivider of als strakke kastoplossing.",
        cta: COLLECTIES,
      },
      {
        label: "Waarom een schuifdeur?",
        title: "Flexibel & functioneel",
        text: "Perfect om ruimtes te verdelen, opbergruimte weg te werken of een vloeiende overgang tussen kamers te maken. Een praktische oplossing, zonder concessies aan het ontwerp.",
      },
    ],
    rows: [
      {
        label: "Materiaalvariatie",
        title: "Jouw stijl, jouw deur",
        text: "Transparant, gedurfd of natuurlijk — van matglas tot warm eiken: een schuifdeur is een leeg canvas voor jouw idee.",
        cta: MATERIALEN,
        image: { src: "/images/schuifdeur-hout.webp", alt: "Twee houten schuifdeuren met diagonale lijnen" },
      },
      {
        label: "Beslag & details",
        title: "Soepel & stil",
        text: "Hoogwaardige rails en verdekte geleiders zorgen ervoor dat je schuifdeur moeiteloos en geruisloos beweegt — jarenlang.",
        cta: BESLAG,
        image: { src: "/images/schuifdeur-glas.webp", alt: "Stalen schuifpui met glas in een licht interieur" },
      },
      {
        label: "Designintegratie",
        title: "Vloeiende overgang tussen ruimtes",
        text: "Combineer schuifdeuren met wandpanelen, kozijnen of bijpassende afwerkingen voor een volledig geïntegreerd interieurconcept.",
        cta: CONTACT,
        image: { src: "/images/glas-staal.webp", alt: "Glazen wand met zwarte stalen profielen" },
      },
    ],
    teaser: "Glijden langs een rail — ruimtebesparend en strak.",
  },
  {
    slug: "draaideuren",
    name: "Draaideuren",
    h1: "Draaideuren",
    intro:
      "Een draaideur hangt aan scharnieren aan de zijkant en zwaait open en dicht. De klassieker onder de deuren: eenvoudig in gebruik, betrouwbaar en eindeloos aan te passen.",
    meta: {
      title: "Draaideuren op maat",
      description:
        "Luxe draaideuren op maat van Zebrano Studio: enkel of dubbel, in hout, fineer, lak of met glas, met beslag dat bij je interieur past. Vraag een voorstel.",
    },
    hero: { src: "/images/door-draai.jpg", alt: "Dubbele houten draaideuren die openstaan naar een zitkamer" },
    basics: [
      {
        label: "Wat is een draaideur?",
        title: "Tijdloos & veelzijdig",
        text: "Draaideuren zijn de klassiekers: aan de zijkant gemonteerd, eenvoudig in gebruik en eindeloos aan te passen. Een maatwerk draaideur past in elke setting, van een minimalistische loft tot een statig herenhuis.",
        cta: COLLECTIES,
      },
      {
        label: "Waarom een draaideur?",
        title: "Alledaagse luxe",
        text: "Betrouwbaar, stijlvol en flexibel: maatwerk draaideuren werken in bijna elke ruimte. Van een enkele doorgang tot imposante dubbele deuren — ze brengen comfort, functionaliteit en elegantie in gelijke mate.",
      },
    ],
    rows: [
      {
        label: "Materiaalkeuzes",
        title: "Afgewerkt op jouw manier",
        text: "Natuurlijke houtnerf, luxe fineer, gelakte panelen of glazen inzetstukken — elke draaideur wordt afgestemd op jouw interieurstijl en kleurenpalet.",
        cta: MATERIALEN,
        image: { src: "/images/hout-planken.webp", alt: "Gestapelde houten planken met zichtbare nerf" },
      },
      {
        label: "Beslag & details",
        title: "Maak het onderscheidend",
        text: "Grepen die opgaan in het ontwerp, of grepen die de show stelen: kies beslag dat de uitstraling van je draaideur naar een hoger niveau tilt.",
        cta: BESLAG,
        image: { src: "/images/metaal-profielen.webp", alt: "Metalen profielen en staven in verschillende afwerkingen" },
      },
      {
        label: "Integratie-ideeën",
        title: "Voorbij het kozijn",
        text: "Combineer je draaideur met lijsten, plinten of wandpanelen in dezelfde afwerking voor een rustig, architectonisch samenhangend geheel.",
        cta: CONTACT,
        image: { src: "/images/boiserie-2.webp", alt: "Open deur in een interieur met klassieke wandpanelen" },
      },
    ],
    teaser: "De klassieker op zijscharnieren — enkel of dubbel, in elke stijl.",
  },
  {
    slug: "wandvlakke-deuren",
    name: "Wandvlakke deuren",
    h1: "Wandvlakke deuren",
    intro:
      "Wandvlakke deuren — ook wel verborgen deuren, deuren met een verdekt kozijn of onzichtbare deuren genoemd — zijn het toppunt van minimalistische architectuur. Ze liggen exact gelijk met je wand, zodat kozijn en scharnieren volledig verdwijnen.",
    meta: {
      title: "Wandvlakke deuren (onzichtbare deuren)",
      description:
        "Wandvlakke deuren van Zebrano Studio: onzichtbare deuren met verdekt kozijn en verborgen scharnieren, exact gelijk met je wand. Op maat gemaakt. Vraag een voorstel.",
    },
    hero: { src: "/images/door-wandvlak.jpg", alt: "Wandvlakke deur, strak opgenomen in een lichte wand" },
    basics: [
      {
        label: "Wat is een wandvlakke deur?",
        title: "De kunst van verdwijnen",
        text: "Een wandvlakke deur ligt exact gelijk met je wand — zonder zichtbaar kozijn, scharnieren of lijsten. Hij gaat naadloos op in de architectuur: één strak, ononderbroken vlak.",
        cta: COLLECTIES,
      },
      {
        label: "Waarom een wandvlakke deur?",
        title: "Minimalisme, verheven",
        text: "Ideaal voor interieurs waar rust en doorlopende lijnen centraal staan. Meegeschilderd in de kleur van de muur of juist afgewerkt als statement: de aandacht blijft bij de ruimte, niet bij het beslag.",
      },
    ],
    rows: [
      {
        label: "Materiaalmogelijkheden",
        title: "Gemaakt voor jouw ruimte",
        text: "Van luxe fineer tot gladde lak, gestructureerd glas of stenen inlays — elke wandvlakke deur wordt volledig op maat gemaakt, passend bij jouw afmetingen en ontwerp.",
        cta: MATERIALEN,
        image: { src: "/images/fineer-rollen.webp", alt: "Rollen houtfineer in warme tinten" },
      },
      {
        label: "Beslag & details",
        title: "Verborgen techniek",
        text: "Verborgen scharnieren, magneetsloten en precisiekozijnen zorgen voor een perfecte werking — en blijven volledig uit het zicht.",
        cta: BESLAG,
        image: { src: "/images/metaal-profielen.webp", alt: "Metalen profielen en staven in verschillende afwerkingen" },
      },
      {
        label: "Integratieopties",
        title: "Eén doorlopend oppervlak",
        text: "Combineer je wandvlakke deur met bijpassende wandpanelen of geïntegreerde kasten. Zo loopt het ene vlak ongemerkt over in het andere.",
        cta: CONTACT,
        image: { src: "/images/boiserie-3.webp", alt: "Interieur met doorlopende wandpanelen" },
      },
    ],
    teaser: "Gelijk met de wand, zonder zichtbaar kozijn — minimalisme ten top.",
  },
  {
    slug: "roomdividers",
    name: "Roomdividers",
    h1: "Roomdividers & scheidingswanden",
    intro:
      "Onze maatwerk roomdividers geven ruimtes vorm zonder licht, doorloop of stijl op te offeren. Vast, schuivend, vouwend of in glas — afgestemd op je deuren en afwerkingen, voor open woonruimtes, kantoren en horeca.",
    meta: {
      title: "Roomdividers en scheidingswanden op maat",
      description:
        "Roomdividers op maat van Zebrano Studio: vast, schuivend of vouwend, in hout, fineer, lak of glas. Privacy en structuur zonder licht te verliezen. Vraag een voorstel.",
    },
    hero: { src: "/images/door-roomdivider.jpg", alt: "Roomdivider van glas met zwarte profielen tussen keuken en eetplek" },
    basics: [
      {
        label: "Wat is een roomdivider?",
        title: "Stijl in elke verdeling",
        text: "Roomdividers zijn op maat gemaakte, niet-dragende wanden die ruimtes afbakenen. Massief, glas of een mix van materialen — ze geven structuur zonder licht of doorloop te blokkeren.",
        cta: COLLECTIES,
      },
      {
        label: "Waarom een roomdivider?",
        title: "Flexibel, functioneel, stijlvol",
        text: "Ideaal voor open woonruimtes: een roomdivider zorgt voor privacy, betere akoestiek en stijl, en sluit aan bij de afwerkingen die je al hebt.",
      },
    ],
    rows: [
      {
        label: "Materiaalmogelijkheden",
        title: "Ontworpen rond jouw interieur",
        text: "Kies uit hout, fineer, lak, matglas, helder glas of een combinatie, en maak een wand die aansluit bij je deuren en interieurstijl.",
        cta: MATERIALEN,
        image: { src: "/images/glas-ribbel.webp", alt: "Glazen wand met ribbelglas en zwart profiel" },
      },
      {
        label: "Beslag & details",
        title: "Beweging, eenvoudig gemaakt",
        text: "Voor schuivende of vouwende wanden gebruiken we precisierails en soft-close-systemen: een soepele werking, zonder concessies aan het ontwerp.",
        cta: BESLAG,
        image: { src: "/images/glas-staal.webp", alt: "Scheidingswand van glas met stalen profielen" },
      },
      {
        label: "Integratie",
        title: "Eén harmonieus interieur",
        text: "Combineer je scheidingswand met Zebrano-deuren, wandpanelen of wandvlakke systemen voor een doorlopend, harmonieus interieur.",
        cta: CONTACT,
        image: { src: "/images/glas-in-lood.webp", alt: "Scheidingswand met gekleurd glas-in-lood" },
      },
    ],
    teaser: "Ruimtes indelen zonder licht te verliezen — vast, schuivend of in glas.",
  },
  {
    slug: "boiserie",
    name: "Boiserie",
    h1: "Boiserie wandpanelen",
    intro:
      "Boiserie is decoratieve wandbekleding die vlakke muren verandert in architectonische elementen. Van klassiek en sierlijk tot strak en minimalistisch — altijd afgestemd op je deuren en interieur.",
    meta: {
      title: "Boiserie wandpanelen op maat",
      description:
        "Boiserie op maat van Zebrano Studio: klassieke of strakke wandpanelen in hout, fineer of lak, afgestemd op je deuren en interieur. Vraag een voorstel.",
    },
    hero: { src: "/images/col-3d.jpg", alt: "Houten deur met verticale ribbels in reliëf" },
    basics: [
      {
        label: "Wat is boiserie?",
        title: "Van klassiek tot modern",
        text: "Oorspronkelijk een kenmerk van de Franse architectuur, brengt boiserie elegantie en diepte in een interieur. Tegenwoordig kan het volledig worden afgestemd op modern minimalisme, tijdloze traditie of een gedurfd statement.",
        cta: COLLECTIES,
      },
      {
        label: "Waarom boiserie?",
        title: "Architectonische samenhang",
        text: "Boiserie geeft muren textuur, ritme en luxe. Het kan deuren omlijsten, samengaan met wandvlakke systemen of zelfstandig een blikvanger zijn — voor een doorlopend ontwerp in je hele ruimte.",
      },
    ],
    rows: [
      {
        label: "Materiaalmogelijkheden",
        title: "Ontworpen om te matchen",
        text: "Van luxe houtfineer tot gelakte panelen, textiel of stenen accenten: onze boiserie wordt altijd op maat gemaakt, passend bij jouw interieurstijl en afmetingen.",
        cta: MATERIALEN,
        image: { src: "/images/boiserie-1.webp", alt: "Klassieke boiserie met sierlijsten rond een deur" },
      },
      {
        label: "Montage & details",
        title: "Precisie in elke lijn",
        text: "Onzichtbare montagesystemen en naadloze details zorgen ervoor dat je boiserie voelt als onderdeel van de architectuur — niet als een toevoeging.",
        cta: CONTACT,
        image: { src: "/images/boiserie-3.webp", alt: "Woonkamer met lichte wandpanelen en open deur" },
      },
      {
        label: "Integratieopties",
        title: "Muren die een verhaal vertellen",
        text: "Combineer boiserie met Zebrano-deuren, scheidingswanden of wandvlakke systemen voor een samenhangend concept dat muren verandert in designstatements.",
        cta: CONTACT,
        image: { src: "/images/boiserie-2.webp", alt: "Interieur met klassieke boiserie en open deur" },
      },
    ],
    teaser: "Wandpanelen die muren architectuur geven — klassiek of strak.",
  },
];

export function getDoorPage(slug: string): DoorPage | undefined {
  return doorPages.find((p) => p.slug === slug);
}

/* ─── Materialen ─────────────────────────────────────────────────────────── */

export const materialenPage = {
  slug: "materialen",
  h1: "Materialen die onze ontwerpen vormen",
  intro:
    "Bij Zebrano Studio begint elk detail met het juiste materiaal. Van tijdloze houtsoorten en luxe fineer tot glas, steen en metaal: elke keuze bepaalt het karakter, de duurzaamheid en de schoonheid van je interieur.",
  meta: {
    title: "Materialen: hout, fineer, glas, metaal en steen",
    description:
      "Met welke materialen werkt Zebrano Studio? Eik, noten en zebrano, houtfineer, glas, metaal, steen en keramiek, grepen en afwerkingen — voor deuren op maat.",
  },
  hero: { src: "/images/materialen-hero.jpg", alt: "Stalen van eikenhout in verschillende afwerkingen, naast elkaar" },
  materialen: [
    {
      title: "Hout",
      text: "Natuurlijke hardhoutsoorten zoals eik, noten en zebrano vormen de basis van onze collecties. Elke houtsoort wordt zorgvuldig gekozen op sterkte, nerf en afwerking.",
      image: { src: "/images/materiaal-hout.jpg", alt: "Stalen van eikenhout met afgeschuinde randen en een diepe nerf" },
    },
    {
      title: "Fineer",
      text: "Een verfijnde laag echt hout, waarmee unieke structuren en zeldzame houtsoorten tot leven komen — consistent en elegant.",
      image: { src: "/images/fineer-rollen.webp", alt: "Rollen houtfineer" },
    },
    {
      title: "Glas",
      text: "Helder, getint of gestructureerd glas opent ruimtes met licht en transparantie — van privacyglas tot glazen statementdeuren.",
      image: { src: "/images/glas-ribbel.webp", alt: "Ribbelglas in een zwart profiel" },
    },
    {
      title: "Metaal",
      text: "Accenten in aluminium, brons of staal zorgen voor contrast en precisie, in kozijnen, scharnieren en details.",
      image: { src: "/images/metaal-profielen.webp", alt: "Metalen profielen en staven" },
    },
    {
      title: "Steen & keramiek",
      text: "Marmer, travertin of keramische panelen geven onze ontwerpen een gevoel van degelijkheid en luxe.",
    },
    {
      title: "Grepen & beslag",
      text: "Minimalistische verzonken grepen, opvallende handgrepen en maatwerkbeslag — zowel functioneel als sculpturaal.",
      image: { src: "/images/taatsdeur-relief.webp", alt: "Dubbele deur met lange verticale grepen" },
    },
    {
      title: "Afwerkingen & oliën",
      text: "Van matte oliën tot diepe beitsen: elke afwerking is gekozen om het natuurlijke karakter van het materiaal te beschermen en te versterken.",
      image: { src: "/images/materiaal-afwerkingen.jpg", alt: "Tien stalen eikenhout in verschillende afwerkingen, van wit geolied tot gerookt" },
    },
  ] as Array<{ title: string; text: string; image?: { src: string; alt: string } }>,
  levensduur: {
    title: "Gebouwd om lang mee te gaan",
    text: "Elk materiaal kiezen we niet alleen om de uitstraling, maar ook om de levensduur. Een Zebrano-deur is gemaakt om decennialang met je mee te gaan.",
  },
};
