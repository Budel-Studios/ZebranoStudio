# Releasechecklist Zebrano Studio (stand 01-11-2026, avond)

Alleen wat de livegang nog tegenhoudt of beperkt.

## Blokkeert de livegang
- [ ] **Beeld** — zie `docs/beelden.md`. Ons verhaal, Ontmoet de makers, Bewust vakmanschap, Materialen en het blok "Ons verhaal" op de homepage hebben nu Robberts eigen foto's (01-11-2026). De grote beelden elders (homepagehero, de vier uitvoeringen, collecties, glasontwerpen) zijn nog AI-sfeerbeelden uit het Lovable-ontwerp: bruikbaar, maar geen echte projecten. De kleinere foto's (rijen, galerijen) komen van de oude site en hebben een onbekende herkomst: bevestigen of vervangen.
- [ ] **Uit Robberts aanlevering nog bevestigen** (`docs/beelden.md`, sectie 0): de gevel met "ZEBRANO STUDIO" op /de-makers is een AI-mockup — alleen laten staan als het pand er zo uitziet, anders vervangen; de bosvideo op /bewust-vakmanschap is stockmateriaal uit 2019 — licentie bevestigen; herkomst van de houtopslag (Ons verhaal stap 3) en de gestapelde planken (Bewust vakmanschap principe 3).
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
- [x] `team` — op 01-11-2026 op `verified` gezet: Robbert leverde portretten van Mathijs, Robbert en Rick aan. Ze staan met naam en rol (zoals op de oude site) op /de-makers; **rollen nog even nalopen**. Dave en Peter (oude site) en de lange bio's staan er niet op.
- [ ] `groothandelsprijzen`, `showroom` (partnerprogramma)
- [x] `vierUitvoeringen` — Robbert, 01-11-2026: elk ontwerp als taatsdeur, schuifdeur, draaideur (ook wandvlak) of roomdivider. Staat zo op de homepage, de uitvoeringspagina's, de glasontwerpen en collecties.

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

## Getest op 01-11-2026 (vier uitvoeringen)
- Build, lint en typecheck schoon; sitemap 48 adressen (`/wandvlakke-deuren` eruit).
- `/wandvlakke-deuren` en het oude `/products/flushTowall` geven één 308 naar `/draaideuren#wandvlak`.
- Ontwerp → uitvoering → formulier: `/collecties/glas/jesse?uitvoering=schuifdeur` kiest de schuifdeur voor; Roomdivider aanklikken maakt de knop "Vraag een voorstel voor Jesse als roomdivider"; op /contact staat "Ik ben geïnteresseerd in het glasontwerp Jesse als roomdivider." en is Roomdivider aangevinkt. Ook gecontroleerd voor een collectie, de wandvlakke draaideur en boiserie.
- Hover op de vier lijntekeningen: taats draait om de as, schuif glijdt langs de rail, draai zwaait open, bij de roomdivider valt licht door het glas.
- Desktop (1440 en 1280) en mobiel (390): geen horizontale scroll, geen consolefouten.

## Getest op 01-11-2026 (foto's van Robbert)
- Build, lint en typecheck schoon.
- /ons-verhaal, /de-makers, /bewust-vakmanschap, /materialen, bibliotheek Eiken en de homepage op desktop (1440) en mobiel (390): geen horizontale scroll, geen consolefouten.
- Bosvideo speelt (zonder geluid, in een lus zonder sprong) en pauzeert buiten beeld; met "beweging beperken" of databesparing blijft de stilstaande foto staan.
- Paginatitels in de hero schalen op grote schermen mee met hun kolom: ook lange woorden ("geperfectioneerd", "scheidingswanden") passen nu van 1024 tot 1920 px; vanaf 1440 px is de maat gelijk aan Lovable.
