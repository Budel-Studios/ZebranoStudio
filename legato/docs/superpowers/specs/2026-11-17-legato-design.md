# Legato — ontwerp (achteraf vastgelegd)

Status: **concept, nog niet goedgekeurd door de eigenaar.** De eerste versie is gebouwd op verzoek "ga door tot het werkt", zonder dat dit document eerst is besproken. Alles onder "Mijn keuzes" is door Claude besloten en kan worden teruggedraaid.

## Bedoeling en waarom

Trouwboeken (en reisboeken) die meer zijn dan foto's: op maat ontworpen boeken van koffietafelkwaliteit waarin ook de verhalen staan. Fotografen krijgen een eigen portaal en maken het boek samen met hun klant, met Claude als ontwerper. De boeken worden ingekocht bij Graphistudio.

Wat de eigenaar zelf heeft gezegd:
- Hoofdstukken met onderdelen als aankomst, vertrek, overnachting.
- Geloften, speeches en leuke momenten als tekst in het boek.
- Fotografen hebben een eigen portaal en werken samen met de klant.
- Kijk vanuit fotograaf, designer, marketing, applicatie-designer, drukker en de klant (bruidspaar of reiziger).
- Graphistudio "tratormina" koffietafelboeken als drukwerk; daar wordt ingekocht.
- Upselling: exclusieve boekenleggers, boekhouders (boekstandaards), andere accessoires.
- Kern: een werkende boekeditor die volledig custom ontwerpen maakt op basis van parameters die wij opgeven, met Claude-integratie.
- Website in de opbouw van de Zebrano Studio-site, met eigen branding.

## Doelen

1. Een fotograaf kan van upload tot drukbestand een compleet boek maken.
2. Het boek leest als een boek: hoofdstukken, ritme, wit, verhalen op de plek waar ze gebeurden.
3. Het bruidspaar levert verhalen aan, kiest favorieten, reageert en geeft akkoord.
4. Claude ontwerpt uit parameters; de fotograaf houdt het laatste woord per spread.
5. De website verkoopt het idee aan paren en aan fotografen.

## Niet-doelen (nu)

- Betalen, facturen, orderstatus.
- Directe bestelling via een API van de drukker (er is geen openbare API gevonden).
- Realtime samen bewerken.

## Anti-doelen

- Tekst van het paar die door AI is herschreven of verzonnen.
- Een gezicht in de vouw, lage resolutie of tekst in de snijrand die ongemerkt naar de drukker gaat.
- Verzonnen reviews, prijzen, levertijden of een geclaimd partnerschap.

## Aanpakken die zijn overwogen

| | Aanpak | Voor | Tegen |
|---|---|---|---|
| A | **Sjablonen + plan** (gekozen): Claude kiest per spread een sjabloon, foto's en verhaal; de app zet het op en alles blijft per kader aanpasbaar. | Altijd drukbaar, voorspelbaar, verhalen kunnen niet worden vervormd, werkt ook zonder Claude. | Claude kan geen compleet nieuw raster bedenken. |
| B | Vrij canvas: Claude geeft per spread coördinaten van elk kader. | Maximale vrijheid. | Onvoorspelbaar, veel drukfouten (vouw, marges), moeilijk te controleren. |
| C | Bestaande editor inbouwen (bijv. een canvas-SDK) en Claude alleen teksten laten doen. | Snel een rijke editor. | Licentiekosten, weinig grip op boektypografie en op het drukbestand. |

Gekozen: A, door Claude, omdat een boek dat naar de drukker gaat eerst betrouwbaar moet zijn. B kan later als extra op A (Claude mag kaders verschuiven binnen het raster).

## Mijn keuzes (Claude, niet door de eigenaar bevestigd)

- **Naam "Legato"** als werknaam; merk en domein niet gecontroleerd.
- **Plek**: map `legato/` in de ZebranoStudio-repo, op de toegewezen branch. Hoort in een eigen repository.
- **Opslag lokaal in de browser** (IndexedDB) in plaats van een backend. Gevolg: fotograaf en paar werken nu op één apparaat. Dit is de grootste afwijking van "samen met de klant".
- **"Tratormina" gelezen als Tramontina Collection – Coffee Table Book.**
- **Drukwaarden** (5 mm afloop, 12 mm veilige marge, 200 ppi) zijn aannames; instelbaar per studio.
- **Drukbestand via afdrukken naar PDF** in de browser.
- **Model** `claude-opus-5-5` voor ontwerp en teksthulp.
- **Geen prijzen**: de fotograaf vult zijn eigen verkoopprijzen in.
- **Geen automatische tests** in de eerste versie. Dit moet worden ingehaald (zie hieronder).

## Wat er staat

Zie `CLAUDE.md` voor de structuur. Kort: website (13 pagina's), studio met vijf stappen (verhaal, foto's, ontwerp, boek, controle & bestellen), 23 spreadsjablonen, lokale opmaak-engine, drukcontrole, omslag en accessoires, drukbestand, Claude-routes voor heel boek, per spread en tekst.

## Wat nog open is

1. Goedkeuring van dit document en van de keuzes hierboven.
2. Bevindingen van de code review verwerken.
3. Tests voor de engine (`lib/book`): sjablonen, tekstverdeling, validatie van AI-uitvoer, drukcontrole.
4. Backend: accounts, gedeelde projecten, foto-opslag, beveiliging van de AI-routes.
5. Echte waarden uit de Print & Bind-gids van Graphistudio.
6. Claude live testen met een API-sleutel.
