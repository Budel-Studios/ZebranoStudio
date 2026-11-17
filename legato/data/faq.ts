import { BRAND } from "@/lib/brand";

export type Faq = { q: string; a: string };

/** Honest answers only: no prices, no delivery times, no numbers we cannot back up. */
export const faqGroups: Array<{ title: string; items: Faq[] }> = [
  {
    title: "Het boek",
    items: [
      {
        q: "Wat is het verschil met een trouwalbum?",
        a: "Een album is een reeks foto's. Een boek van ons heeft hoofdstukken, een inhoudsopgave en een colofon, en bevat naast de foto's ook de woorden van de dag: de geloften, de speeches, een brief, quotes van gasten, het menu, de playlist. Je kijkt het niet alleen, je leest het.",
      },
      {
        q: "Welke formaten zijn er?",
        a: "Drie: 20 × 30 cm, 25 × 35 cm en 30 × 30 cm. Daarnaast zijn er ouderboeken: kleinere exemplaren met dezelfde inhoud.",
      },
      {
        q: "Uit welke materialen kunnen we kiezen voor het omslag?",
        a: "Linnen, leer, suède, fluweel, katoen en canvas. De titel wordt in het omslag gedrukt (debossing). De beschikbare kleuren per materiaal laten we jullie zien in het voorstel.",
      },
      {
        q: "Waar wordt het boek gemaakt?",
        a: `De boeken worden gedrukt en gebonden in Italië door ${BRAND.printer} (${BRAND.printerLine}).`,
      },
      {
        q: "Wat betekent “exemplaar 1 van 1”?",
        a: "Elk boek wordt voor één paar ontworpen: eigen hoofdstukken, eigen teksten, eigen opmaak. Er is geen sjabloon dat een ander paar ook krijgt. Dat staat in het colofon. Ouderboeken zijn kleinere uitvoeringen van datzelfde boek.",
      },
    ],
  },
  {
    title: "Het maken",
    items: [
      {
        q: "Kunnen we rechtstreeks bij jullie bestellen?",
        a: "De boeken worden samengesteld en geleverd via trouwfotografen: zij hebben de foto's en een eigen studio bij ons. Werkt jullie fotograaf nog niet met ons? Stuur een bericht via het contactformulier, dan nemen we contact op met jullie en met de fotograaf.",
      },
      {
        q: "Wat moeten wij zelf aanleveren?",
        a: "De woorden. Geloften, speeches, een brief, quotes van gasten, het menu, de playlist: alles wat jullie in het boek willen hebben. Niets is verplicht; jullie bepalen wat erin komt.",
      },
      {
        q: "Wat doet de AI-ontwerpassistent precies?",
        a: "De assistent doet opmaakvoorstellen op basis van jullie keuzes: stijl, dichtheid, typografie, palet en hoofdstukken. Het blijven voorstellen. Jullie en de fotograaf kiezen, wisselen en passen aan, en er gaat niets naar de drukker zonder akkoord.",
      },
      {
        q: "Schrijft de assistent onze teksten?",
        a: "Nee. De geloften en speeches zijn van jullie en van de mensen die ze uitspraken, en ze komen in het boek zoals ze zijn aangeleverd. De assistent helpt bij de opmaak: waar een tekst staat, hoe groot, naast welk beeld. Alleen als jullie erom vragen, doet hij een voorstel om spelling na te lopen of een lange speech in te korten. Jullie beslissen of je dat overneemt.",
      },
      {
        q: "Kan het ook achteraf, als de bruiloft al geweest is?",
        a: "Ja. Zolang de foto's er zijn en jullie de teksten nog hebben of kunnen opvragen, kan er een boek van worden gemaakt.",
      },
    ],
  },
  {
    title: "Prijs en levering",
    items: [
      {
        q: "Wat kost een boek?",
        a: "De prijs hangt af van formaat, omvang, materiaal en accessoires, en loopt via jullie fotograaf. We noemen daarom geen bedragen op de website: prijzen zijn op aanvraag.",
      },
      {
        q: "Hoe lang duurt het?",
        a: "Dat hangt af van hoe snel de teksten compleet zijn, hoeveel rondes het ontwerp nodig heeft en van de planning van de drukker. We beloven hier geen termijn; in het voorstel staat een planning voor jullie boek.",
      },
      {
        q: "Maken jullie ook boeken van reizen?",
        a: "Ja. Een reisboek werkt hetzelfde: hoofdstukken per dag of per plek, met reisdagboek, kaart en route. Zie de pagina Reisboeken.",
      },
    ],
  },
  {
    title: "Voor fotografen",
    items: [
      {
        q: "Hoe werkt de studio?",
        a: "Je krijgt een eigen portaal. Daarin open je per bruiloft een boek, kies je met het paar de hoofdstukken en de stijl, en werk je de voorstellen van de ontwerpassistent uit tot een drukklaar boek.",
      },
      {
        q: "Wat verdien ik eraan?",
        a: "Je koopt het boek bij ons in en bepaalt zelf je verkoopprijs aan het paar. Inkoopprijzen delen we in een demo of op aanvraag.",
      },
      {
        q: "Kan ik het eerst proberen?",
        a: "Ja. Je kunt de studio openen en bekijken, of een demo aanvragen waarin we er samen doorheen lopen.",
      },
    ],
  },
];
