# Releasechecklist Zebrano Studio (stand 01-11-2026)

Alleen wat de livegang nog tegenhoudt of beperkt.

## Blokkeert de livegang
- [ ] **Beeld** — zie `docs/beelden.md`. De grote beelden (homepage, deurtypes, collecties, menu, glasontwerpen) zijn AI-sfeerbeelden uit het Lovable-ontwerp: bruikbaar, maar het zijn geen echte projecten. De kleinere foto's (rijen, galerijen, tijdlijn) komen van de oude site en hebben een onbekende herkomst: bevestigen of vervangen. Liefst alles stap voor stap vervangen door eigen foto's.
- [ ] **Materialenbibliotheek aanvullen** (`data/materialenbibliotheek.ts`) — de oude bibliotheek stond in Firebase (`material_library/Materials/Items`, projecten `accountmanegerai` / `project1-1905c`) en zat niet in de zip. Nu staat er een startset van 19 materialen die de site al noemt. Tint, intensiteit, interieurstijl, toepassingen, randafwerking en combinaties zijn redactionele suggesties: nalopen. Kan de oude collectie nog uit Firebase worden geëxporteerd (JSON + afbeeldingen uit Storage), dan zet ik die er 1-op-1 in. De oude velden "Omgeving" (binnen droog / vochtbestendig / overdekt buiten) en "Duurzaamheid" staan er bewust nog niet in: dat zijn beloftes over geschiktheid die per materiaal bevestigd moeten worden. Eigen staalfoto's maken de bibliotheek pas echt af (`docs/beelden.md`).
- [ ] **Glascollectie bevestigen** — de vijf ontwerpen Jesse, Bo, Merle, Lucas en Guus met hun glassoort, indeling en profielkleuren komen uit het Lovable-ontwerp (`data/glasdeuren.ts`). Klopt dit met het echte aanbod? Bij de specificatie "Montage" staat nu "Op aanvraag" (Lovable had "Door onze eigen makers"; dat is nog niet bevestigd).
- [ ] **Domein kiezen** (zebranostudio.com of .nl) → Vercel-project koppelen, `NEXT_PUBLIC_SITE_URL` zetten, andere domeinen laten doorsturen. Check eerst wat er nu op zebranostudio.com draait (de oude build had de map `/robbertjesss` met briefings en een Fiverr-screenshot publiek staan).
- [ ] **Mail in Vercel:** `RESEND_API_KEY` (dezelfde sleutel als de MTB Bouw-site) en `MAIL_FROM` (bijv. `website@mtbbouw.com`, of een geverifieerd `@zebranostudio.com`-adres). Daarna een testaanvraag mét bijlage op productie.
- [ ] **Leadmailbox:** blijft `info@mtbbouw.com` (zoals De Kozijnstudio) of eigen adres via `OFFERTE_TO_EMAIL`.
- [ ] **Juridische pagina's toetsen** (privacy, algemene voorwaarden, cookiebeleid) en daarna `LEGAL_REVIEWED = true` in `components/legal-page.tsx`. Open punten: bewaartermijn aanvragen (nu "2 jaar"), herroeping/annulering maatwerk, de € 95 ophaalkosten, garantie- en klachttermijnen, verwerkersovereenkomsten (Vercel, Resend).
- [ ] **Btw-identificatienummer** in `data/company.ts`.
- [ ] **Previews beschermen** (Vercel Deployment Protection) en controleren dat productie géén noindex heeft.
- [ ] **Oude Shopify-app intrekken** (token en API-sleutels stonden in de oude zip).

## Feitenregister (`data/feiten.ts`) — bevestigen of laten staan
Bevestigen = status op `verified` + `bron` + `gecontroleerd`. Tot die tijd onzichtbaar (of de pagina toont een concept-melding).
- [ ] `servicevoorwaarden` — bestelproces, 100% vooruitbetaling, levering/installatie (alleen NL), garantie, onderhoud zoals op /service (in 2025 opgesteld; geldt het onder MTB Bouw B.V.?) → haalt de concept-melding van /service en /veelgestelde-vragen weg.
- [ ] `levertijden` (6–8 / 8–10 weken)
- [ ] `garantie` (2 jaar product, 6 maanden montage)
- [ ] `fsc` (FSC-gecertificeerd hout)
- [ ] `productieNederland`, `lokaalProduceren`, `onderEenDak`
- [ ] `team` — namen, rollen en bio's (Robbert, Mathijs, Rick, Dave, Peter) + foto's → dan verschijnt "Ons team" op /de-makers
- [ ] `groothandelsprijzen`, `showroom` (partnerprogramma)

## Inhoud die nog ontbreekt (site werkt zonder)
- [ ] Echte projecten met toestemming → module `projecten` aan.
- [ ] Studiojournaal (MDX, zoals de Kozijnstudio-kennisbank) → module `journal` aan.
- [ ] Catalogus-PDF's → module `downloads` aan.
- [ ] Configurator → module `configurator` aan en de redirect `/configurator` uit `next.config.ts` halen.
- [ ] EN/DE-versies (teksten liggen klaar in de oude build) — pas na NL-livegang.
- [ ] Google Bedrijfsprofiel: los van MTB Bouw of niet?

## Getest op 31-10-2026 (lokale productiebuild)
- Build, lint en typecheck schoon.
- Menu desktop en mobiel naast de oude site gelegd; open/dicht, Esc, overlay-klik, accordeon.
- Alle routes 200, onbekende routes 404, oude URL's één 308 naar de juiste pagina.
- Formulier: validatie client + server; zonder mailconfiguratie een nette foutmelding (geen schijnsucces).
- **Niet getest:** verzending via Resend (geen sleutel in de testomgeving), Vercel-deploy, PageSpeed op productie, Safari/iOS.

## Getest op 01-11-2026 (Lovable-ontwerp overgenomen)
- Build, lint en typecheck schoon; 37 statische pagina's.
- Homepage, glascollectie en glasontwerp naast de Lovable-build gelegd (zelfde fonts): opbouw, maten en animaties gelijk.
- Alle routes 200 (onbekend 404) op desktop (1440) en mobiel (390), zonder horizontale scroll en zonder fouten in de console.
- Megamenu (Deuren, Collecties, Zebrano) met voorbeeldfoto, mobiel menu (accordeon, sluit na tikken op een link), accordeon "Over Zebrano", deur in het logo die verder opendraait bij hover.
- Lovable-teksten die iets beloven wat nog niet bevestigd is, zijn neutraler gemaakt: "in de studio" → "op afspraak in Enschede" (showroom staat nog op `needs_confirmation`), "Kom langs in onze studio … zie het glas en de profielen in het echt" → "Maak een afspraak in Enschede …", montage "door onze eigen makers" → "op aanvraag".

