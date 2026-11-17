import { LegalLayout } from "@/components/site/legal-layout";
import { BRAND } from "@/lib/brand";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Privacyverklaring (concept)",
  description: `Concept van de privacyverklaring van ${BRAND.name}: welke gegevens we verwerken via de website en waarvoor.`,
  path: "/privacy",
  noindex: true,
});

export default function PrivacyPage() {
  return (
    <LegalLayout
      title="Privacyverklaring"
      path="/privacy"
      updated="november 2026"
      intro={`Hoe ${BRAND.name} omgaat met persoonsgegevens. Deze tekst is een concept en wordt vóór de livegang juridisch getoetst en aangevuld.`}
      sections={[
        {
          heading: "Wie we zijn",
          body: (
            <>
              <p>
                {BRAND.name} is een werknaam van [naam onderneming], gevestigd te [adres], ingeschreven bij de Kamer van
                Koophandel onder nummer [KvK-nummer]. Voor vragen over privacy: <a href={`mailto:${BRAND.email}`} className="link-line">{BRAND.email}</a>.
              </p>
            </>
          ),
        },
        {
          heading: "Welke gegevens via deze website",
          body: (
            <>
              <p>Via het contactformulier ontvangen we alleen wat je zelf invult:</p>
              <ul>
                <li>je naam en, als je die invult, de naam van je partner of studio;</li>
                <li>je e-mailadres en eventueel je telefoonnummer;</li>
                <li>een trouwdatum of reisperiode, als je die noemt;</li>
                <li>je bericht en waar je interesse naar uitgaat.</li>
              </ul>
              <p>
                De website slaat deze gegevens niet op: je bericht wordt als e-mail naar ons verstuurd via een e-maildienst
                [naam verwerker]. De website plaatst geen trackingcookies en gebruikt geen analysetools.
              </p>
            </>
          ),
        },
        {
          heading: "Waarvoor we ze gebruiken",
          body: (
            <p>
              Om op je bericht te reageren en, als je daarom vraagt, een voorstel te maken of een demo te plannen. De grondslag is
              je toestemming en het nemen van stappen vóór het sluiten van een overeenkomst. We gebruiken je gegevens niet voor
              nieuwsbrieven of reclame, tenzij je daar apart om vraagt.
            </p>
          ),
        },
        {
          heading: "De studio en jullie boek",
          body: (
            <>
              <p>
                Voor het maken van een boek worden in de studio foto&apos;s en teksten verwerkt, zoals geloften, speeches en namen
                van gasten. De fotograaf en {BRAND.name} maken daarover afspraken met elkaar en met het paar. [Nog uit te werken:
                rolverdeling verantwoordelijke/verwerker, bewaartermijnen, opslaglocatie.]
              </p>
              <p>
                De ontwerpassistent in de studio maakt gebruik van een AI-dienst van een externe leverancier. [Nog uit te werken:
                welke gegevens daarbij worden verwerkt, door wie, en onder welke voorwaarden.]
              </p>
              <p>De boeken worden gedrukt door {BRAND.printer} in Italië; daarvoor worden de drukbestanden met de drukker gedeeld.</p>
            </>
          ),
        },
        {
          heading: "Bewaartermijn",
          body: <p>We bewaren berichten niet langer dan nodig is om je vraag af te handelen. [Concrete termijnen volgen.]</p>,
        },
        {
          heading: "Jouw rechten",
          body: (
            <p>
              Je mag je gegevens inzien, laten corrigeren of laten verwijderen, en je toestemming intrekken. Stuur daarvoor een
              e-mail naar <a href={`mailto:${BRAND.email}`} className="link-line">{BRAND.email}</a>. Je kunt ook een klacht indienen bij de Autoriteit Persoonsgegevens.
            </p>
          ),
        },
      ]}
    />
  );
}
