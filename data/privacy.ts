import { company } from "@/data/company";

/**
 * Privacyverklaring — based on the original Zebrano text (2025), updated to
 * how the new site actually works: Zebrano Studio is a trade name of
 * MTB Bouw B.V.; no web shop, no online payments, no newsletter, no analytics
 * or marketing cookies; form submissions are only sent by e-mail.
 * CONCEPT: to be reviewed before go-live (docs/releasechecklist.md).
 */

export type LegalSection = {
  title: string;
  paragraphs: string[];
  items?: Array<{ label: string; text: string }>;
};

export type LegalDoc = { title: string; intro: string; sections: LegalSection[] };

export const privacy: LegalDoc = {
  title: "Privacyverklaring",
  intro:
    "Oké, we weten dat dit niet de spannendste tekst is om te lezen, maar het is wél belangrijk. Bij Zebrano Studio draait het om prachtige deuren, niet om ingewikkeld juridisch taalgebruik. Toch vinden we het beschermen van je privacy erg belangrijk. Daarom leggen we hier zo duidelijk mogelijk uit hoe we met je persoonsgegevens omgaan, in lijn met de Algemene Verordening Gegevensbescherming (AVG).",
  sections: [
    {
      title: "Wie wij zijn",
      paragraphs: [
        `Zebrano Studio is een handelsnaam van ${company.entiteit}. ${company.entiteit} is de verwerkingsverantwoordelijke voor de persoonsgegevens die via deze website worden verwerkt.`,
      ],
      items: [
        { label: "Bedrijf", text: `${company.entiteit} (handelsnaam ${company.naam}), KvK ${company.kvk}` },
        { label: "Adres", text: `${company.adres}, ${company.postcodePlaats}, ${company.land}` },
        { label: "E-mail", text: company.email },
        { label: "Telefoon", text: company.telefoon },
      ],
    },
    {
      title: "Welke persoonsgegevens we verwerken",
      paragraphs: ["We verwerken alleen de gegevens die nodig zijn om je te helpen:"],
      items: [
        { label: "Contactgegevens", text: "Naam, e-mailadres, telefoonnummer en, als je dat opgeeft, je woonplaats of bedrijfsnaam." },
        {
          label: "Communicatiegegevens",
          text: "Wat je ons vertelt in een bericht via het formulier, per e-mail, telefoon, WhatsApp of sociale media, inclusief foto's of tekeningen die je meestuurt.",
        },
        {
          label: "Opdrachtgegevens",
          text: "Gegevens die nodig zijn om een voorstel te maken en een opdracht uit te voeren, zoals het adres van de levering of installatie en de afspraken die we maken.",
        },
        {
          label: "Technische gegevens",
          text: "Bij elk bezoek verwerkt onze hostingpartij technische gegevens zoals je IP-adres en browsertype, om de website veilig en beschikbaar te houden. We gebruiken die niet om je te volgen.",
        },
      ],
    },
    {
      title: "Waarvoor en op welke grond",
      paragraphs: [],
      items: [
        {
          label: "Je aanvraag beantwoorden en een voorstel maken",
          text: "Rechtsgrond: maatregelen op jouw verzoek vóór het sluiten van een overeenkomst (AVG art. 6 lid 1 sub b).",
        },
        {
          label: "Je opdracht uitvoeren: productie, levering, installatie en service",
          text: "Rechtsgrond: uitvoering van de overeenkomst (art. 6 lid 1 sub b).",
        },
        {
          label: "Met je communiceren over je aanvraag of opdracht",
          text: "Rechtsgrond: uitvoering van de overeenkomst of ons gerechtvaardigd belang bij goede communicatie (art. 6 lid 1 sub b en f).",
        },
        {
          label: "Voldoen aan wettelijke plichten, zoals de fiscale bewaarplicht",
          text: "Rechtsgrond: wettelijke verplichting (art. 6 lid 1 sub c).",
        },
      ],
    },
    {
      title: "Formulieren en e-mail",
      paragraphs: [
        "Wat je via het formulier op deze website verstuurt, slaan we niet op in een database. Het bericht (met eventuele bijlagen) wordt per e-mail naar onze mailbox gestuurd; je ontvangt zelf een bevestiging. Voor het versturen gebruiken we een e-mailverwerker.",
      ],
    },
    {
      title: "Cookies",
      paragraphs: [
        "Deze website plaatst geen cookies voor analyse of marketing en volgt je niet. Als we in de toekomst meetinstrumenten toevoegen, passen we eerst ons cookiebeleid aan en vragen we waar nodig vooraf je toestemming. Zie ook ons cookiebeleid.",
      ],
    },
    {
      title: "Met wie we gegevens delen",
      paragraphs: ["We verkopen of verhuren je persoonsgegevens nooit. We delen ze alleen met:"],
      items: [
        {
          label: "Dienstverleners",
          text: "Partijen die diensten voor ons uitvoeren, zoals hosting van de website, het versturen van e-mail, onze administratie en vervoer of montage. Met hen maken we afspraken over de bescherming van je gegevens.",
        },
        {
          label: "Wettelijke verplichtingen",
          text: "Als de wet ons daartoe verplicht of een bevoegde instantie erom vraagt.",
        },
      ],
    },
    {
      title: "Doorgifte buiten de EER",
      paragraphs: [
        "We streven ernaar je gegevens binnen de Europese Economische Ruimte te laten verwerken. Gebruiken we een dienstverlener buiten de EER, dan zorgen we voor passende waarborgen, zoals de standaardcontractbepalingen van de Europese Commissie.",
      ],
    },
    {
      title: "Hoe lang we gegevens bewaren",
      paragraphs: [
        "We bewaren je gegevens niet langer dan nodig voor het doel waarvoor we ze hebben gekregen. Aanvragen die niet tot een opdracht leiden, verwijderen we uiterlijk twee jaar na het laatste contact. Gegevens die we fiscaal moeten bewaren, bewaren we zeven jaar.",
      ],
    },
    {
      title: "Beveiliging",
      paragraphs: [
        "We nemen passende technische en organisatorische maatregelen om je gegevens te beschermen tegen verlies en onrechtmatig gebruik, zoals versleutelde verbindingen en beperkte toegang.",
      ],
    },
    {
      title: "Jouw rechten",
      paragraphs: [
        "Je hebt het recht op inzage, correctie en verwijdering van je gegevens, op beperking van de verwerking, op overdraagbaarheid en om bezwaar te maken. Heb je toestemming gegeven, dan kun je die altijd intrekken.",
        `Wil je een van deze rechten gebruiken? Mail ons via ${company.email}. We reageren binnen een maand.`,
      ],
    },
    {
      title: "Klacht indienen",
      paragraphs: [
        "Ben je het niet eens met hoe we met je gegevens omgaan? Laat het ons eerst weten, dan zoeken we samen een oplossing. Je hebt ook altijd het recht een klacht in te dienen bij de Autoriteit Persoonsgegevens.",
      ],
    },
    {
      title: "Kinderen",
      paragraphs: [
        "Onze website en diensten zijn niet gericht op kinderen jonger dan 16 jaar. We verzamelen niet bewust gegevens van kinderen onder de 16.",
      ],
    },
    {
      title: "Wijzigingen",
      paragraphs: [
        "We kunnen deze privacyverklaring aanpassen. De meest actuele versie staat altijd op deze pagina, met de datum van de laatste wijziging.",
      ],
    },
  ],
};

export const cookiebeleid: LegalDoc = {
  title: "Cookiebeleid",
  intro: "Kort en duidelijk: deze website gebruikt geen cookies om je te volgen.",
  sections: [
    {
      title: "Welke cookies we gebruiken",
      paragraphs: [
        "Deze website plaatst geen analytische cookies, geen marketing- of advertentiecookies en geen cookies van sociale netwerken. Links naar Instagram, Pinterest of WhatsApp zijn gewone links; pas als je doorklikt, gelden de regels van die partij.",
      ],
    },
    {
      title: "Technisch noodzakelijke gegevens",
      paragraphs: [
        "Om de website veilig en snel te laten werken, verwerkt onze hostingpartij technische gegevens zoals je IP-adres. Dat gebeurt zonder cookies die je over websites heen volgen.",
      ],
    },
    {
      title: "Als dit verandert",
      paragraphs: [
        "Voegen we ooit meetinstrumenten toe, dan passen we dit cookiebeleid eerst aan en vragen we waar dat nodig is vooraf je toestemming.",
      ],
    },
  ],
};
