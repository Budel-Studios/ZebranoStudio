import { LegalLayout } from "@/components/site/legal-layout";
import { BRAND } from "@/lib/brand";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Voorwaarden (concept)",
  description: `Concept van de voorwaarden van ${BRAND.name}. Nog niet juridisch getoetst.`,
  path: "/voorwaarden",
  noindex: true,
});

export default function VoorwaardenPage() {
  return (
    <LegalLayout
      title="Voorwaarden"
      path="/voorwaarden"
      updated="november 2026"
      intro="De hoofdlijnen van hoe we werken, als concept. De definitieve algemene voorwaarden volgen na juridische toetsing."
      sections={[
        {
          heading: "Wie we zijn",
          body: (
            <p>
              {BRAND.name} is een werknaam van [naam onderneming], gevestigd te [adres], KvK [KvK-nummer], btw [btw-nummer].
            </p>
          ),
        },
        {
          heading: "Hoe een boek tot stand komt",
          body: (
            <p>
              Boeken worden samengesteld door een fotograaf in de studio, samen met het paar. De overeenkomst over het boek sluit
              het paar met [de fotograaf / {BRAND.name}: nog vast te stellen]. Fotografen nemen de studio en de boeken af op basis
              van [een aparte overeenkomst: nog op te stellen].
            </p>
          ),
        },
        {
          heading: "Voorstellen en prijzen",
          body: (
            <p>
              Op deze website staan geen prijzen; prijzen zijn op aanvraag. Een voorstel is vrijblijvend tot het is aanvaard.
              [Geldigheidsduur, betaling en aanbetaling: nog vast te stellen.]
            </p>
          ),
        },
        {
          heading: "Maatwerk",
          body: (
            <p>
              Elk boek wordt naar jullie specificaties gemaakt. Voor producten die op maat worden gemaakt geldt het wettelijke
              herroepingsrecht bij koop op afstand in de regel niet. [Uit te werken en te toetsen.]
            </p>
          ),
        },
        {
          heading: "Akkoord op het ontwerp",
          body: (
            <p>
              Een boek gaat pas naar de drukker na akkoord op het definitieve ontwerp. Controleer namen, teksten en data
              zorgvuldig: na akkoord kunnen fouten in aangeleverde teksten niet meer worden hersteld. [Regeling voor herdruk: nog
              vast te stellen.]
            </p>
          ),
        },
        {
          heading: "Levering",
          body: (
            <p>
              De boeken worden gedrukt en gebonden in Italië door {BRAND.printer}. We noemen op deze website geen levertijden; de
              planning staat in het voorstel. [Leveringsvoorwaarden en risico-overgang: nog vast te stellen.]
            </p>
          ),
        },
        {
          heading: "Beeld en tekst",
          body: (
            <p>
              Het auteursrecht op de foto&apos;s blijft bij de fotograaf, dat op de teksten bij de schrijvers ervan. Wie materiaal
              aanlevert, staat ervoor in dat het gebruikt mag worden in het boek. [Licentie en gebruik voor voorbeelden: alleen met
              uitdrukkelijke toestemming, nog uit te werken.]
            </p>
          ),
        },
        {
          heading: "Vragen of klachten",
          body: (
            <p>
              Mail naar <a href={`mailto:${BRAND.email}`} className="link-line">{BRAND.email}</a>. We zoeken samen naar een oplossing. Op deze voorwaarden is Nederlands recht van toepassing.
            </p>
          ),
        },
      ]}
    />
  );
}
