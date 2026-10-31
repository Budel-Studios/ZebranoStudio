/**
 * "Zebrano" pages — Ons verhaal, Ontmoet de makers, Bewust vakmanschap.
 * Copy from the original site (NL), lightly edited. Claims that still need
 * confirmation live in data/feiten.ts and are only shown once verified.
 */
import type { FeitKey } from "@/data/feiten";

export const verhaal = {
  h1: "Ons verhaal",
  intro:
    "Wat begon als een backpackreis van twee broers, werd een studio voor exclusieve deuren. Dit is hoe Zebrano Studio ontstond — en waarom we doen wat we doen.",
  meta: {
    title: "Ons verhaal",
    description:
      "Hoe twee broers via een reis door Zuidoost-Azië, zelfgemaakte paddels en hun eerste eigen deur Zebrano Studio begonnen: exclusieve deuren, bereikbaar gemaakt.",
  },
  tijdlijn: [
    {
      jaar: "2015",
      title: "Een reis door Zuidoost-Azië",
      text: "In 2015, toen we als broers door Zuidoost-Azië backpackten, raakten we onder de indruk van het vakmanschap dat we overal tegenkwamen. Van drukke markten tot serene tempels: hout werd overal omgevormd tot objecten van bijzondere schoonheid — van verfijnd houtsnijwerk tot elegant meubilair. De natuurlijke uitstraling van het materiaal en de toewijding van lokale ambachtslieden plantten het eerste zaadje voor wat later Zebrano Studio zou worden.",
      image: { src: "/images/verhaal-1.webp", alt: "Werkplek met ontwerpschetsen en laptop" },
    },
    {
      title: "Van kleine werken tot gedurfde creaties",
      text: "Terug thuis werd nieuwsgierigheid al snel actie. We experimenteerden met hout en maakten kleine objecten, zoals boekenleggers en tapasplanken. Die experimenten groeiden uit tot ambitieuzere projecten: handgemaakte paddels van bijzondere houtsoorten als gestreept zebrano, dieprood purpleheart en exotisch palmhout. Elk materiaal had zijn eigen karakter — en ontdekken hoe we dat konden laten spreken, werd onze kunst.",
      image: { src: "/images/verhaal-2.webp", alt: "Maker die een ontwerp op de wand bekijkt" },
    },
    {
      jaar: "2020",
      title: "De eerste deur",
      text: "Hout werd meer dan een hobby. Onze jaarlijkse bezoeken aan fineer- en houtbeurzen werden een bron van inspiratie. In 2020 kwam het moment: we hadden nieuwe deuren nodig. In plaats van ze te kopen, besloten we ze zelf te maken. Die eerste Zebrano-deur, met zijn opvallende nerf en tijdloze uitstraling, markeerde het begin van een nieuw hoofdstuk.",
      image: { src: "/images/verhaal-3.webp", alt: "Houtmonsters en ontwerpschetsen op een werktafel" },
    },
    {
      title: "Het begin van Zebrano Studio",
      text: "Die deur was niet zomaar een praktische oplossing — het was een statement. De reacties van anderen bevestigden wat we zelf al voelden: dit was iets bijzonders, de moeite waard om te delen. Zo werd Zebrano Studio geboren, vernoemd naar het hout dat ons vanaf het begin inspireerde.",
      image: { src: "/images/verhaal-4.webp", alt: "Houtmonsters, schetsen en een open map met ontwerpen" },
    },
    {
      title: "Luxe, bereikbaar gemaakt",
      text: "Sindsdien is onze missie helder: de exclusiviteit van luxe interieurs bereikbaar maken. Niet alleen in hotels, restaurants of villa's, maar in elk huis waar design en kwaliteit ertoe doen. We maken deuren en wandoplossingen die premium materialen, tijdloos vakmanschap en ontwerpvrijheid combineren — gemaakt om een leven lang mee te gaan.",
      image: { src: "/images/verhaal-5.webp", alt: "Ingepakte deuren op pallets, klaar voor transport" },
    },
  ] as Array<{ jaar?: string; title: string; text: string; image: { src: string; alt: string } }>,
  slot: {
    title: "Bij Zebrano Studio maken we niet zomaar deuren — we maken ervaringen die een verhaal vertellen.",
    vraag: "Klaar om die van jou te maken?",
    text: "Onze droom is simpel: de luxe en exclusiviteit die je normaal alleen ziet in chique hotels, toprestaurants of villa's van toparchitecten, bereikbaar maken. Jouw huis verdient diezelfde grandeur en eigenheid, zonder dat je daarvoor een fortuin aan een architect hoeft uit te geven.",
  },
};

export const vakmanschap = {
  h1: "Bewust vakmanschap",
  intro: "Eenvoudige principes die ons werk sturen: met zorg, respect en een duidelijk doel.",
  meta: {
    title: "Bewust vakmanschap",
    description:
      "De principes achter Zebrano Studio: werken mét de natuur, respect voor het materiaal, ontwerpen voor de lange termijn en trots op elk detail.",
  },
  principes: [
    {
      title: "Werken mét de natuur, niet ertegen",
      text: "Werken met natuurlijke materialen brengt verantwoordelijkheid met zich mee. Voor ons is hout niet zomaar een grondstof — het is een levend verhaal van tijd, klimaat en plek.",
      feit: "fsc" as FeitKey,
    },
    {
      title: "Respect voor het materiaal",
      text: "Elk stuk hout is uniek — de nerf, de structuur, de imperfecties. We ontwerpen rondom die eigenheid, niet ertegenin. In plaats van uniformiteit af te dwingen, laten we het materiaal spreken. Dat vermindert verspilling en eert de schoonheid van natuurlijke variatie. We bewerken niet te veel, we verven niet te veel: we halen naar voren wat er al is.",
    },
    {
      title: "Ontwerpen voor de lange termijn",
      text: "Wegwerpmeubels en tijdelijk design passen niet bij onze filosofie. We maken deuren die een leven lang meegaan — in functie én in uitstraling. Tijdloos design en hoogwaardig vakmanschap betekenen minder vervanging, minder verspilling en een kleinere impact op de planeet.",
    },
    {
      title: "Vakmanschap als duurzame keuze",
      text: "Duurzaamheid zit niet alleen in materialen, maar ook in de manier waarop we werken. Door in kleine series te bouwen in plaats van massaproductie, blijven we dicht bij het proces. Bij elke beslissing wegen we niet alleen efficiëntie, maar ook ethiek mee.",
      feit: "lokaalProduceren" as FeitKey,
    },
    {
      title: "Trots in elk detail",
      text: "We zijn trots op wat we maken — niet alleen omdat het er goed uitziet, maar omdat het goed voelt om achter iets echts te staan. Een deur is niet zomaar een functioneel object: het is het eerste contactpunt van een huis. Wanneer die met zorg is gemaakt, van een materiaal zo edel als hout, verdient hij die extra waardering.",
    },
  ] as Array<{ title: string; text: string; feit?: FeitKey }>,
};

export const makers = {
  h1Delen: ["Gemaakt door onze", "makers,", "geperfectioneerd in de productie."],
  intro: "Echte handen. Echt zaagsel. Onwerkelijke resultaten.",
  meta: {
    title: "Ontmoet de makers",
    description:
      "De mensen achter Zebrano Studio: makers met hout in hun vingers, die design bereikbaar willen maken. Lees waarom we doen wat we doen.",
  },
  quote: {
    kop: ["Toegankelijk.", "Mooi."],
    tekst:
      "Ik heb altijd gevonden dat goed design niet verstopt hoeft te worden achter fluwelen touwen. Bij Zebrano wil ik dat iedereen kan genieten van dezelfde prachtige deuren en details die je normaal alleen in luxe hotels ziet — gewoon thuis.",
    naam: "Mathijs",
    rol: "oprichter en ontwerper, Zebrano Studio",
  },
  dichtbij: {
    title: "Wij houden dingen graag dichtbij huis.",
    /** Shown when feiten.productieNederland is verified; otherwise `fallback`. */
    fallback:
      "We werken met makers die hun hout bijna net zo goed kennen als hun ochtendkoffie. Het resultaat? Vakmanschap dat persoonlijk voelt en overal thuishoort.",
  },
  team: [
    { naam: "Mathijs", rol: "Eigenaar & houtbewerker" },
    { naam: "Robbert", rol: "Strategie & financiën" },
    { naam: "Rick", rol: "Houtspecialist" },
    { naam: "Dave", rol: "Marketing & sales" },
    { naam: "Peter", rol: "Houtbewerker" },
  ],
};
