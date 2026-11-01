import type { FeitKey } from "@/data/feiten";

/**
 * Service — order process, delivery, guarantee and care, as Robbert wrote them
 * for the original site (2025). Generated from the old NL copy, then edited.
 * Status: data/feiten.ts → `servicevoorwaarden` (confirm under MTB Bouw B.V.).
 */

export type QA = { question: string; answer: string[] };
export type ServiceTab = { slug: string; title: string; intro: string; items: QA[] };

export const serviceTabs: ServiceTab[] = [
  {
    slug: "bestelproces",
    title: "Bestelproces",
    intro: "Onze producten worden op bestelling gemaakt. We volgen een vaste volgorde zodat de doorlooptijden betrouwbaar blijven.",
    items: [
      { question: "Consult & voorstel", answer: ["We bespreken scope, materialen, afwerkingen en installatie. Je ontvangt een schriftelijk voorstel met prijs en indicatieve levertijd. Offertes zijn 30 dagen geldig, tenzij materiaalschommelingen zijn vermeld."] },
      { question: "Inmeten", answer: ["Je kunt maten aanleveren of gebruikmaken van onze betaalde inmeetservice (aanbevolen). Lever je zelf maten aan, dan ben je verantwoordelijk voor de maatnauwkeurigheid."] },
      { question: "Technische tekeningen & akkoord", answer: ["Wij maken de tekeningen en specificaties. Productie start pas na schriftelijke goedkeuring van alle tekeningen, afwerkingen en beslag."] },
      { question: "Betaling", answer: ["We werken met 100% vooruitbetaling. Je ontvangt een factuur; de betaalgegevens staan in het voorstel."] },
      { question: "Productie & kwaliteitscontrole", answer: ["Na betaling en akkoord reserveren we je productieplek. De levertijd start. Elk item wordt gecontroleerd op afwerking, passing en functionaliteit."] },
      { question: "Vooraf plannen levering", answer: ["Richting afronding stellen we een lever- of installatievenster voor. Jij bevestigt de toegang, het parkeren, details over lift of trap en of de bouwplaats gereed is."] },
      { question: "Levering / installatie & overdracht", answer: ["We leveren, of leveren en installeren (alleen in Nederland). Na de installatie testen we de werking en geven we onderhoudsadvies."] },
      { question: "Wijzigingsverzoeken", answer: ["Elke wijziging na akkoord (afwerking/maat/beslag) kan prijs en planning beïnvloeden. Werk wordt hervat na volledige betaling van de wijzigingsopdracht."] },
      { question: "Annuleringen", answer: ["Maatwerk is uitgesloten van het herroepingsrecht. Annuleren na betaling is niet mogelijk, tenzij schriftelijk overeengekomen vóór start productie (administratie-/ontwerpkosten van toepassing)."] },
    ],
  },
  {
    slug: "levering",
    title: "Levering & installatie",
    intro: "Wij leveren in alle Nederlandse provincies met eigen teams of betrouwbare partners.",
    items: [
      { question: "Leveropties", answer: ["Alleen levering: Trottoir/begane grond tot eerste toegankelijke punt.", "White-glove: Tweemanslevering tot kamer naar keuze (indien toegang mogelijk). Verpakking verwijderen op verzoek."] },
      { question: "Planning & toegang", answer: ["We spreken een datum en tijdvenster af. Jij zorgt voor veilige toegang (deurbreedtes, lift/trap), evt. parkeervergunningen en een vrije route. Is er geen toegang, dan gelden kosten voor herlevering of extra handling."] },
      { question: "Verpakking & bescherming", answer: ["Deuren en panelen worden verzonden met volledige foam-bescherming en kantbeschermers. Accessoires worden apart verpakt in hoezen of dozen."] },
      { question: "Schade bij aankomst", answer: ["Zichtbare schade: direct noteren op leverbon en vóór uitpakken fotograferen.", "Verborgen schade: binnen 24 uur na levering schriftelijk melden met foto’s en ordernummer."] },
      { question: "Risico-overgang", answer: ["Risico gaat over bij levering. Bij white-glove/installatie gaat het risico over na plaatsing in de afgesproken ruimte."] },
      { question: "Installatie (optioneel, alleen NL)", answer: ["Inbegrepen (tenzij anders aangegeven):", "Plaatsen van door Zebrano geleverd kozijn/blad/beslag.", "Uitlijning, speling, functionaliteit (draaien/schuiven/pivot).", "Basis afdichten/afwerken waar gespecificeerd. Niet inbegrepen: constructieve aanpassingen, elektra, stuc-/schilderwerk, derdenmaterialen en werk buiten de afgesproken sparing."] },
      { question: "Werkplek gereed (vereist)", answer: ["Afgewerkte sparingen binnen tolerantie, wanden haaks/vlak.", "Binnenklimaat: 15–25 °C en 40–60% RV.", "Ondergronden droog; ruimte schoon en toegankelijk; 230 V aanwezig. Herbezoeken door niet-gereed zijn worden doorbelast en vooraf betaald."] },
    ],
  },
  {
    slug: "garantie",
    title: "Garantie",
    intro: "Wij staan achter ons vakmanschap.",
    items: [
      { question: "Duur", answer: ["2 jaar vanaf leverdatum."] },
      { question: "Wat we dekken", answer: ["Fabricagefouten, constructieve integriteit, werking van beslag, verlijming/laminering van fineer en fabrieksafwerkingen volgens specificatie."] },
      { question: "Niet gedekt", answer: ["Slijtage, onjuist gebruik/impact, waterschade, abnormaal klimaat, natuurlijke variaties, werking/trek door klimaat, installatie/wijzigingen door derden, niet-Zebrano beslag."] },
      { question: "Toleranties", answer: ["Branche-standaard toleranties (typ. ±1–2 mm; handgemaakte panelen tot ±4 mm)."] },
      { question: "Claimprocedure", answer: ["Mail foto’s, omschrijving en order-/factuurnummer. Mogelijk volgt inspectie op locatie. Oplossing naar ons inzicht: reparatie, vervanging of terugbetaling van het defecte item. Gevolgschade uitgesloten."] },
    ],
  },
  {
    slug: "onderhoud",
    title: "Onderhoud & verzorging",
    intro: "Regelmatig onderhoud beschermt afwerking en functie. Gebruik zachte doeken en pH-neutrale reinigers, tenzij anders aangegeven.",
    items: [
      { question: "Glas", answer: ["Reinig met glasreiniger/milde zeep; droog pluisvrij. Vermijd schuurmiddelen/mesjes op gestructureerd glas. Controleer folie/adhesief-compatibiliteit."] },
      { question: "Massief hout", answer: ["Wekelijks afstoffen; licht vochtig afnemen; 40–60% RV aanhouden; jaarlijks oliën/waxen indien gespecificeerd; beschermen tegen zon/hitte."] },
      { question: "Houtfineer", answer: ["Zachte droge/licht vochtige doek; niet schuren; geolied: jaarlijks licht oliën; gelakt: alleen milde reinigers. Natuurlijke variatie verwacht."] },
      { question: "Steen & keramiek", answer: ["pH-neutrale reiniger; vermijd zuren/basen; morsen direct wissen; natuursteen jaarlijks sealen; keramiek meestal niet nodig."] },
      { question: "Beslag & metaal", answer: ["Droog/licht vochtig afnemen; geen schuurmiddelen/oplosmiddelen; licht smeren 6–12 mnd; zichtbare schroeven aandraaien; geen verborgen mechanismen afstellen. Patina is normaal."] },
      { question: "Draaideuren & pivot — tips", answer: ["Niet tegen aanslagen forceren; geen gewicht aan grepen hangen; vloer/rails schoon houden."] },
      { question: "Onderhoudssamenvatting", answer: ["Wekelijks: stof/afnemen. Per kwartaal: beslag checken, rails/pivots reinigen. Jaarlijks: olie/wax (indien van toepassing), steen resealen, algemene inspectie."] },
    ],
  },
];

export type FaqItem = QA & { feit?: FeitKey };
export type FaqCategory = { title: string; items: FaqItem[] };

/**
 * Veelgestelde vragen — the original FAQ was written for a web shop
 * (Shopify/Mollie checkout, online configurator). Those parts are left out;
 * the rest is rewritten from telegram style into full sentences. Items with a
 * `feit` only appear once that fact is verified in data/feiten.ts.
 */
export const faqCategories: FaqCategory[] = [
  {
    title: "Producten & materialen",
    items: [
      { question: "Wat maken jullie?", answer: ["Deuren op maat in vier uitvoeringen: taatsdeur, schuifdeur, draaideur (ook wandvlak) en roomdivider. Elk ontwerp uit onze collecties is in alle vier leverbaar. Daarnaast maken we boiserie (decoratieve wandbekleding)."] },
      { question: "Welke materialen en afwerkingen zijn er?", answer: ["Massief hout, fineer, lak (RAL-kleuren), glas, natuursteen en keramiek of porselein. Beslag is er onder meer in zwart, rvs, brons en PVD."] },
      { question: "Maken jullie ook wandvlakke (rasomuro) deuren?", answer: ["Ja, als uitvoering van de draaideur. Met verdekte kozijnen en verborgen beslag ligt de deur exact gelijk met de wand, voor een naadloos effect."] },
      { question: "Hoe ver kan ik mijn deur personaliseren?", answer: ["Maten, afwerkingen, glas, randen en beslag zijn allemaal aan te passen. Voor ultiem maatwerk maken we een voorstel op basis van jouw wensen."] },
      { question: "Zijn natuurlijke variaties normaal?", answer: ["Ja. Houtnerf en -kleur en de adering van natuursteen verschillen altijd een beetje — dat maakt elk stuk uniek."] },
      { question: "Kunnen jullie een bestaande afwerking nabootsen?", answer: ["Met een fysiek monster kunnen we een bestaande afwerking dicht benaderen. Een exacte match kunnen we niet garanderen."] },
      { question: "Leveren jullie ook beslag?", answer: ["Ja: scharnieren, taatsen, schuifsystemen, grepen en profielen volgens specificatie. Beslag van derden kan in overleg, na een controle op compatibiliteit."] },
    ],
  },
  {
    title: "Techniek & bouwplaats",
    items: [
      { question: "Wat moet er klaar zijn voordat jullie komen?", answer: ["Sparingen haaks, vlak en waterpas; ondergronden droog; een binnenklimaat van 15–25 °C en 40–60% luchtvochtigheid; vrije toegang en 230 V stroom."] },
      { question: "Wat is er nodig voor een taatsdeur, ook bij vloerverwarming?", answer: ["Het plafond moet schroefbaar zijn, waar nodig met multiplex achterhout. We boren minimaal 4 cm diep en hebben leidingvrije zones van 25 × 25 cm nodig bij de taats en de zijpanelen."] },
      { question: "Wat gebeurt er met plinten en vloerafwerking?", answer: ["Soms moet er worden ingezaagd. Met een vlakke plakplint voorkom je dat; de schilder werkt de zaagsnede af."] },
      { question: "Met welke toleranties werken jullie?", answer: ["Branchestandaard: doorgaans ±1–2 mm op onderdelen; handgemaakte panelen tot ±4 mm."] },
    ],
  },
  {
    title: "Inmeten, ontwerp & akkoord",
    items: [
      { question: "Wie meet er in?", answer: ["Jij zelf, of wij met onze betaalde inmeetservice (aanbevolen). Lever je zelf maten aan, dan ben je zelf verantwoordelijk voor de maatvoering."] },
      { question: "Welke documenten krijg ik vóór de productie?", answer: ["Een voorstel, technische tekeningen en specificaties, en bij alleen levering ook installatienotities."] },
      { question: "Hoe geef ik akkoord?", answer: ["Schriftelijk. De productie start pas na je akkoord en de betaling."] },
      { question: "Werken jullie met tekeningen van mijn architect?", answer: ["Ja. Stuur een PDF of DWG; wij toetsen de haalbaarheid en stellen waar nodig aanpassingen voor."] },
      { question: "Kan ik na mijn akkoord nog iets wijzigen?", answer: ["Ja, via een wijzigingsopdracht. Prijs en doorlooptijd kunnen dan veranderen; het werk gaat verder na volledige betaling van de wijziging."] },
      { question: "Kan ik vooraf een 3D-impressie zien?", answer: ["Voor een deel van de ontwerpen is dat mogelijk, afhankelijk van de opdracht. Daar kan een ontwerpvergoeding voor gelden."] },
    ],
  },
  {
    title: "Betaling",
    items: [
      { question: "Wanneer betaal ik?", answer: ["We werken met 100% vooruitbetaling na je definitieve akkoord op het voorstel."] },
      { question: "Zijn prijzen inclusief btw?", answer: ["Prijzen zijn in euro's. In het voorstel staat duidelijk of een bedrag inclusief of exclusief 21% btw is."] },
      { question: "Welke gegevens hebben jullie nodig voor een zakelijke factuur?", answer: ["De juridische naam, het adres, het KvK-nummer en het btw-nummer. Controleer die vóór betaling."] },
    ],
  },
  {
    title: "Levertijden & planning",
    items: [
      { question: "Wat zijn de standaard levertijden?", answer: ["Deuren (taats, schuif, draai) 6–8 weken; wandvlakke deuren 8–10 weken; scheidingswanden 6–8 weken; boiserie 8–10 weken."], feit: "levertijden" },
      { question: "Wanneer gaat de levertijd in?", answer: ["Na volledige betaling en je schriftelijke akkoord."] },
      { question: "Kan het sneller?", answer: ["Soms, tegen meerprijs — afhankelijk van onze capaciteit en de beschikbaarheid van materialen."] },
      { question: "Houden jullie me op de hoogte?", answer: ["Ja. Je krijgt statusupdates en tegen het einde een voorstel voor het lever- of installatievenster."] },
      { question: "Kan ik de levering uitstellen?", answer: ["Ja, als je het tijdig meldt. Er kunnen dan opslag- of herbezoekkosten gelden."] },
    ],
  },
  {
    title: "Levering & installatie",
    items: [
      { question: "Waar leveren jullie?", answer: ["In alle Nederlandse provincies."] },
      { question: "Welke leveropties zijn er?", answer: ["Alleen levering (tot het eerste toegankelijke punt) of white-glove-levering met twee personen tot in de ruimte van je keuze."] },
      { question: "Installeren jullie ook?", answer: ["Ja, in Nederland. Wat er wel en niet bij de installatie hoort, staat in je voorstel en op de servicepagina."] },
      { question: "Hoe meld ik transportschade?", answer: ["Zichtbare schade direct op de leverbon noteren en fotograferen. Verborgen schade binnen 24 uur schriftelijk melden, met foto's en je ordernummer."] },
      { question: "Wat als de toegang lastig is?", answer: ["Meld het vooraf. Extra mankracht of een verhuislift is mogelijk; die nemen we op in het voorstel."] },
    ],
  },
  {
    title: "Garantie & nazorg",
    items: [
      { question: "Welke garantie krijg ik?", answer: ["2 jaar op het product en 6 maanden op de installatie, als wij die uitvoeren."], feit: "garantie" },
      { question: "Hoe dien ik een garantieclaim in?", answer: ["Mail foto's, een omschrijving en je order- of factuurnummer. Mogelijk komen we langs om het te bekijken; daarna kiezen we voor reparatie, vervanging of terugbetaling van het defecte onderdeel."] },
      { question: "Hoe onderhoud ik mijn deur?", answer: ["Op de servicepagina staat per materiaal hoe je glas, hout, fineer, steen en beslag het beste verzorgt."] },
    ],
  },
  {
    title: "Bestellen & contact",
    items: [
      { question: "Kan ik mijn bestelling annuleren of retourneren?", answer: ["Maatwerk valt buiten het herroepingsrecht. Annuleren kan alleen vóór de start van de productie en na schriftelijke afspraak; er kunnen administratie- en ontwerpkosten gelden."] },
      { question: "Werken jullie samen met architecten en interieurontwerpers?", answer: ["Ja, graag. Zakelijke projecten zijn welkom — bekijk ons partnerprogramma of vraag naar specificaties en stalen."] },
    ],
  },
];
