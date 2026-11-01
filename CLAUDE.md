# CLAUDE.md — Zebrano Studio

> Projectgeheugen voor Claude Code. Lees dit aan het begin van elke sessie. Bevat bedrijf, merk, stack, conventies en harde regels. Opgezet in het stramien van De Kozijnstudio (`Budel-Studios/dekozijnstudio`).

## Bedrijf
- **Naam:** Zebrano Studio — exclusieve binnendeuren op maat. **Een merk van MTB Bouw**; juridisch een handelsnaam van **MTB Bouw B.V.** (KvK 60942037), net als De Kozijnstudio.
- **Merkfamilie:** MTB Bouw (particulier: verbouw/renovatie) · Afbouwstudio (zakelijk: afbouw) · De Kozijnstudio (kozijnen) · Zebrano Studio (exclusieve binnendeuren, wandpanelen, roomdividers).
- **Aanbod:** **elk ontwerp in vier uitvoeringen** (Robbert, 01-11-2026): taatsdeur, schuifdeur, draaideur (ook wandvlak) en roomdivider — `data/uitvoeringen.ts`, feit `vierUitvoeringen`. Daarnaast boiserie (wandpanelen, onder Collecties). Materialen: hout (eik, noten, zebrano), fineer, glas, metaal, steen/keramiek, grepen/beslag, afwerkingen.
- **Doelgroep:** particulieren met oog voor design + architecten, interieurontwerpers en aannemers (partnerprogramma, in het menu "Samenwerken" → `/architecten`).
- **Merkbelofte:** "Exclusiviteit, nu binnen handbereik" / "Luxe deuren, voor iedereen bereikbaar."
- **Verhaal:** twee broers (Robbert en Mathijs), backpackreis Zuidoost-Azië 2015, eerste eigen deur in 2020 — zie `data/over.ts`.

## HARDE REGELS
- **Taal:** alle UI-teksten en content in **Nederlands (nl-NL)**, je-vorm (zie `docs/schrijfwijzer.md`). Code, bestandsnamen en commentaar in Engels. EN/DE-vertalingen van de oude site bestaan nog (zie "Oude site"), maar de site start Nederlandstalig.
- **Primaire actie:** "Vraag een voorstel" → `/contact` (aanvraagformulier).
- **Geen verzonnen content.** Claims alleen via het feitenregister `data/feiten.ts` (`verified` / `needs_confirmation`); onbevestigd = niet publiek (`feit()`, `isVerified()`).
- **Beeld:** alleen eigen of gelicenseerde foto's. Nu: Robberts eigen foto's (team, werkplaats, stalen; 01-11-2026), AI-sfeerbeelden uit Robberts Lovable-project (geen echte projecten, nooit zo presenteren) en foto's van de oude site met onbekende herkomst → `docs/beelden.md`. Nooit beelden van andere merken (de oude site had o.a. een foto met het Portatec-logo en hotlinks naar een Canadees bedrijf).
- **Modules:** onderdelen zonder echte inhoud staan uit via `MODULES` in `lib/site.ts` (configurator, projecten, journaal, downloads). Uit = niet in menu, niet in sitemap, route bestaat niet. De materialenbibliotheek staat sinds 01-11-2026 aan.
- **Geen secrets in de repo.** De oude zip bevatte Shopify-tokens en een `.env`; die horen hier nooit.

## Design (Lovable-ontwerp, november 2026)
**Bron:** Robberts Lovable-project (zip van 01-11-2026: TanStack Start, `src/styles.css`, `src/components/site/*`, `src/routes/*`). Zijn opdracht: die stijl en animaties **precies zo** op alle pagina's, met onze inhoud. Pagina's die Lovable niet ontwierp, volgen dezelfde bouwstenen. Het ontwerp van de oude site (2025) en de Budel-achtige hero met intro-scherm en spotlight-logo (31-10-2026) zijn hiermee vervangen; die staan nog in de git-geschiedenis.

Tokens in `app/globals.css` (Tailwind v4 `@theme inline` — géén tailwind.config), 1-op-1 uit Lovable:
| Token | Waarde | Gebruik |
|---|---|---|
| `background` = `bone` | `oklch(0.953 0.008 95)` | pagina-basis, menubalk |
| `foreground` = `ink` | `oklch(0.225 0.012 135)` | tekst |
| `muted-foreground` | `oklch(0.5 0.016 120)` | lopende tekst grijs, tweede regel van koppen |
| `sand` (= `muted`) | `oklch(0.912 0.015 90)` | rustige secties |
| `sage` | `oklch(0.81 0.024 112)` | footer |
| `forest` (= `primary`) | `oklch(0.315 0.03 138)` | Zebrano groen: knoppen, groene blokken |
| `copper` (= `accent`) | `oklch(0.6 0.115 50)` | lijntje voor eyebrows, onderstreping bij hover, nummers, punt achter titels |
| `border` | ink 14% | haarlijnen |
- **Radius** 0.25rem (`rounded-sm` = 3px). **Easing** `ease-door` = `cubic-bezier(0.22, 1, 0.36, 1)`.
- **Fonts** (self-hosted via `next/font/local`, OFL, `app/fonts/`): Jost (`font-display`; h1–h4 weight 300, tracking −0.015em) en Instrument Sans (`font-sans`, UI en lopende tekst).
- **Utilities:** `eyebrow` (klein label met koperen streepje), `link-line` (koperen lijn die van links intekent), `img-zoom` (trage zoom 1.03 in een `group`), `reveal` + `<Reveal>` (fade-up bij in beeld scrollen), `animate-rise` (tekst bij laden), `animate-unveil` (beeld opent van boven), `no-scrollbar`. `tw-animate-css` voor `animate-in fade-in` (menu).
- **Bouwstenen:** `components/ui/button.ts` (cva: primary, outline, light, outlineLight, text) + `components/ui/arrow.tsx`; `components/ui/primitives.tsx`: `container`, `Eyebrow`, `PageHero` (tekst links, groot beeld rechts), `PageHeader` (titel links, intro rechts, haarlijn), `SectionHeading`, `SplitIntro`, `CtaSection` (groen afsluitblok), `DotTitle` (koperen punt), `Breadcrumbs` (JSON-LD altijd; zichtbaar alleen op 3e niveau, zoals bij een glasontwerp).
- **Logo:** `components/logo.tsx` — `Wordmark` (Jost + `DoorMark`, de deur draait verder open bij hover) in de menubalk, `GiantWordmark` in de footer. De officiële lockups uit het .ai-bestand blijven in `public/brand/` (print, social, JSON-LD-logo).
- **Beeld:** `PHOTOS` in `lib/images.ts` = Robberts aangeleverde foto's (gaan vóór), `IMAGES` = AI-sfeerbeelden uit Lovable, kleinere = oude site. `PageHero` kan een stille achtergrondvideo over de foto leggen (`video`, component `AmbientVideo`: start pas na laden, pauzeert buiten beeld, niet bij "beweging beperken"). Zie `docs/beelden.md`.

## Het menu (belangrijk voor de eigenaar)
`components/site-header.tsx` = het Lovable-menu: zwevende balk met haarlijn ([Deuren] [Collecties] [Zebrano] [Samenwerken] — woordmerk — [telefoon] [Vraag een voorstel]). "Samenwerken" heette in Lovable "Zakelijk" (Robbert, 01-11-2026). Hover op een groep opent een megapaneel: intro + knop · genummerde links · voorbeeldfoto met regel; de knop van "Deuren" is "Materialenbibliotheek". Mobiel: volledig scherm met accordeon (de knop van elke groep staat daar als laatste link). Data in `lib/navigation.ts` (`NAV`, `footerColumns`). **Wijzig de look niet zonder overleg met Robbert.**

## Tech & conventies
- **Next.js 16 (App Router) + React 19 + TypeScript + Tailwind v4.** Zie `AGENTS.md`: Next 16 heeft breaking changes (async `params`/`searchParams`, `proxy` i.p.v. middleware); lees `node_modules/next/dist/docs/`.
- UI-libs zoals in het Lovable-ontwerp: `lucide-react` (iconen, strokeWidth 1.25), `class-variance-authority` (knoppen), `clsx` + `tailwind-merge` (`cn()`), `tw-animate-css`.
- Content als getypeerde data in `data/*.ts` (geen CMS). Uitvoeringspagina's (en boiserie) via één template: `app/[deur]/page.tsx` + `components/door/door-page.tsx` + `data/producten.ts` (`dynamicParams = false`).
- **Vier uitvoeringen** ("kies je ontwerp, kies hoe hij opengaat"): `data/uitvoeringen.ts` (namen, beweging, links) + `components/uitvoering-icon.tsx` (lijntekeningen die bij hover de beweging laten zien, net als de deur in het logo) + `components/uitvoering/*`: `UitvoeringCards` (homepage `#uitvoeringen`, onderaan elke uitvoeringspagina), `UitvoeringTabs` (bovenaan elke uitvoeringspagina en de glascollectie), `OntwerpCards` (alle ontwerpen op een uitvoeringspagina, met `?uitvoering=`), `UitvoeringPicker` ("Kies je uitvoering" op glasontwerpen en collecties; de knop wordt "Vraag een voorstel voor Jesse als taatsdeur"). `/contact` leest `?ontwerp`, `?collectie`, `?uitvoering`, `?optie=wandvlak`, `?product=boiserie`, vult het bericht in en vinkt de uitvoering aan. Wandvlak is een blok `#wandvlak` op /draaideuren (`optie` in `data/producten.ts`); `/wandvlakke-deuren` stuurt daarheen door. Glascollectie: eigen routes `app/collecties/glas/` + `[ontwerp]` met `data/glasdeuren.ts` (vijf ontwerpen); de andere collecties via `app/collecties/[collectie]`.
- SEO: `pageMetadata()` in `lib/seo.ts` (title zonder merk; template voegt " | Zebrano Studio" toe), `app/sitemap.ts`, `app/robots.ts`, JSON-LD in `lib/jsonld.ts` (organisatie met vaste `@id`, `HomeAndConstructionBusiness`, legalName MTB Bouw B.V., parentOrganization MTB Bouw). Geen FAQPage- of rating-schema.
- **Materialenbibliotheek** (`/materialenbibliotheek` + `/materialenbibliotheek/[materiaal]`): nagebouwd van de oude site — zelfde indeling als de oude Firestore-collectie (categorie, tint, intensiteit, interieurstijl, toepassing, kenmerk, randafwerking, combinaties). Data in `data/materialenbibliotheek.ts` (startset van 19, nog na te lopen), UI in `components/library/*`. Filters staan in de URL (`?categorie=glas&tint=licht&stijl=japandi&q=…`), dus een gefilterde weergave is te delen. "Vraag een voorstel" op een materiaal of glasontwerp vult het bericht in het formulier al in (`/contact?materiaal=…` / `?ontwerp=…`).
- Redirects van oude URL's (`/products/PivotDoor` e.d.) in `next.config.ts`; `/library` → `/materialenbibliotheek`.
- **Formulier:** `components/aanvraag-form.tsx` → server action `app/contact/actions.ts` → `lib/email.ts` → `lib/mail-transport.ts` (Resend, zelfde sleutel/afzender als MTB Bouw; SMTP als fallback). Leads naar `info@mtbbouw.com` (`OFFERTE_TO_EMAIL` om te wijzigen). Niets opgeslagen; succes pas na acceptatie van de mail → `/bedankt`. Honeypot + zod (`lib/aanvraag-schema.ts`).
- **Meten:** `lib/track.ts` pusht alleen naar `window.dataLayer` (`form_start`, `generate_lead`); geen tool, geen cookies.
- Hosting: Vercel. Preview: GitHub Codespaces (`.devcontainer`).

## Sitemap
Home · Taatsdeuren · Schuifdeuren · Draaideuren (+ wandvlak) · Roomdividers · Boiserie · Materialen · Materialenbibliotheek (+ 19 materialen) · Collecties (+ Glas met de ontwerpen Jesse, Bo, Merle, Lucas, Guus · Fineer · 3D · Atelier) · Architecten · Ons verhaal · Ontmoet de makers · Bewust vakmanschap · MTB Bouw-familie · Service · Veelgestelde vragen · Contact · Privacy · Algemene voorwaarden · Cookiebeleid. Niet in sitemap: `/bedankt`.

## Oude site (2025) — bron
- Fiverr-build: Express-backend + gecompileerde React-build, frontend-broncode ontbrak. Analyse: claude.ai-project "Zebrano Studio" → `claude/zebrano-website-analyse.md`.
- Alle oude teksten (NL/EN/DE) zaten in de bundle als i18next-object; ze zijn overgenomen en geredigeerd in `data/*.ts`. Vervallen: Shopify, materialendatabase (Firebase), admin, downloads, zoeken, valuta-/taalknop.

## Status
- **01-11-2026 — vier uitvoeringen:** Robbert: "Alle deuren moeten verkrijgbaar zijn in taats, schuif, wall partition en scharnier." Namen (zijn keuze): Taatsdeur, Schuifdeur, Draaideur, Roomdivider. Menu Deuren = die vier; wandvlak is een optie van de draaideur (eigen pagina vervallen, doorverwijzing); boiserie onder Collecties. Homepage-blok "Eén ontwerp, vier uitvoeringen", tabs bovenaan elke uitvoeringspagina, alle ontwerpen per uitvoering, "Kies je uitvoering" op ontwerpen en collecties, vraag "Welke uitvoering?" in het formulier.
- **01-11-2026 — foto's van Robbert:** eigen foto's op Ons verhaal (hero + tijdlijn), Ontmoet de makers (hero, citaat, dichtbij huis, team met portretten, kaarten), Bewust vakmanschap (bosvideo als hero, beeld bij principe 1 en 3), Materialen en bibliotheek (echte eikenstalen) en de homepage (Ons verhaal). `team` in het feitenregister op `verified` (Mathijs, Robbert, Rick). Open: gevel-mockup, licentie bosvideo (zie `docs/releasechecklist.md`).
- **01-11-2026 — "Samenwerken" en materialenbibliotheek:** menulabel "Zakelijk" → "Samenwerken"; materialenbibliotheek van de oude site nagebouwd in het Lovable-ontwerp, met een startset (zie `docs/releasechecklist.md`).
- **01-11-2026 — Lovable-ontwerp overgenomen:** tokens, fonts, menu, footer, homepage en glascollectie 1-op-1 uit Lovable; alle andere pagina's opnieuw opgebouwd met dezelfde bouwstenen en onze teksten. Lovable-zinnen die een onbevestigde showroom of montage door eigen makers beloofden, zijn neutraler gemaakt (zie `docs/releasechecklist.md`). Materialenbibliotheek volgt later.
- **31-10-2026 — hero vernieuwd:** hero naar budelstudios.com, intro-scherm, spotlight-logo in hero en footer. Volgende stap (wens Robbert): productpagina's met meer "jus" (Shopify-achtige secties, deur-elementen), mogelijk eerst uitgeprobeerd in Lovable en daarna hierheen overgezet.
- **31-10-2026 — v1 opgezet:** menu (1:1), alle pagina's hierboven met NL-teksten, aanvraagformulier, juridische concepten, SEO-basis, redirects. Zie `docs/releasechecklist.md` voor wat de livegang nog tegenhoudt (beeld, feiten, juridisch, domein, Resend in Vercel).
