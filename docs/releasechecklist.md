# Releasechecklist Zebrano Studio (stand 31-10-2026)

Alleen wat de livegang nog tegenhoudt of beperkt.

## Blokkeert de livegang
- [ ] **Beeld vervangen of herkomst bevestigen** — alle foto's komen van de oude site en hebben een onbekende herkomst. Zie `docs/beelden.md`. Minimaal: hero's van home, taatsdeuren, schuifdeuren, boiserie en de vijf menufoto's.
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
