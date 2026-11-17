import type { SpreadKind } from "@/components/site/book-mock";

/**
 * The building blocks of a book: chapters (the day in order) and story types
 * (the written parts). Content for /hoofdstukken, the home page and the menu.
 */

export type Hoofdstuk = { id: string; name: string; text: string };

/** A wedding day, in the order it happened. Every book picks its own. */
export const hoofdstukken: Hoofdstuk[] = [
  { id: "aankomst", name: "Aankomst", text: "De locatie voordat er iemand is. De eerste gasten, de koffers, het weer van die dag." },
  { id: "voorbereiding", name: "Voorbereiding", text: "Jurk, pak, zenuwen. De brief die je die ochtend kreeg, en wie de strik strikte." },
  { id: "ceremonie", name: "Ceremonie", text: "Het pad, de muziek, het ja-woord. Wie er sprak, en wat er werd gezegd." },
  { id: "geloften", name: "Geloften", text: "Jullie beloften aan elkaar, woord voor woord. Naast elkaar, op een eigen spread." },
  { id: "toost", name: "Toost", text: "De eerste omhelzingen, de taart, het glas. De foto's waar iedereen op staat." },
  { id: "speeches", name: "Speeches", text: "Volledig uitgeschreven of in de mooiste zinnen. Met de gezichten van wie luisterde." },
  { id: "diner", name: "Diner", text: "De tafels, het menu, de gesprekken. Wat er werd gegeten en wie naast wie zat." },
  { id: "feest", name: "Feest", text: "De openingsdans, de playlist, de dansvloer om middernacht. En daarna." },
  { id: "overnachting", name: "Overnachting", text: "De laatste gasten, de nacht, het ontbijt van de volgende ochtend." },
  { id: "vertrek", name: "Vertrek", text: "Uitzwaaien. De lege tuin. Het laatste beeld van een dag die voorbij is." },
];

export type Verhaalvorm = {
  id: string;
  name: string;
  text: string;
  /** Which sample spread illustrates it, if any. */
  spread?: SpreadKind;
};

/** The written parts. This is what makes it a book and not an album. */
export const verhaalvormen: Verhaalvorm[] = [
  {
    id: "geloften",
    name: "Geloften",
    text: "Wat jullie elkaar beloofden, in jullie eigen woorden. Naast elkaar gezet, zodat je ze over dertig jaar nog kunt nalezen.",
    spread: "geloften",
  },
  {
    id: "speeches",
    name: "Speeches",
    text: "De speech van je vader, van de getuige, van je beste vriendin. Volledig, ingekort of alleen de zinnen die bleven hangen.",
    spread: "speech",
  },
  {
    id: "gastenquotes",
    name: "Gastenquotes",
    text: "Korte zinnen van gasten: uit het gastenboek, van een kaartje of achteraf opgevraagd. Samen vertellen ze de dag vanuit de zaal.",
    spread: "gasten",
  },
  {
    id: "brieven",
    name: "Brieven",
    text: "Een brief van een ouder, van jullie aan elkaar, of aan wie het boek later leest. Overgetypt of als afbeelding van het origineel.",
    spread: "brief",
  },
  {
    id: "anekdotes",
    name: "Anekdotes",
    text: "De taart die bijna viel. De regen die precies op tijd stopte. Kleine verhalen die bij een foto horen en anders verloren gaan.",
    spread: "quote",
  },
  {
    id: "menu",
    name: "Menu",
    text: "Wat er op tafel kwam, gang voor gang. Als eigen pagina in het hoofdstuk over het diner.",
    spread: "menu",
  },
  {
    id: "playlist",
    name: "Playlist",
    text: "De openingsdans, het nummer van de ceremonie, de laatste plaat van de avond. De muziek van de dag, op een rij.",
  },
  {
    id: "tijdlijn",
    name: "Tijdlijn",
    text: "De dag in uren, van aankomst tot de laatste dans. Voorin het boek, als leeswijzer voor wat volgt.",
    spread: "tijdlijn",
  },
  {
    id: "kaart",
    name: "Kaart",
    text: "Waar het was: de locatie, de route, de plekken die ertoe deden. Bij een reisboek de rode draad van het hele boek.",
    spread: "reis",
  },
  {
    id: "in-memoriam",
    name: "In memoriam",
    text: "Een rustige pagina voor wie er niet meer bij kon zijn, met een naam, een foto of een paar woorden.",
  },
  {
    id: "dankwoord",
    name: "Dankwoord",
    text: "Een woord aan de mensen die de dag mogelijk maakten. Achterin, vlak voor het colofon.",
  },
  {
    id: "colofon",
    name: "Colofon",
    text: "Wie fotografeerde, wie schreef, waar het boek is gedrukt. En de regel waar het om gaat: exemplaar 1 van 1.",
    spread: "colofon",
  },
];
