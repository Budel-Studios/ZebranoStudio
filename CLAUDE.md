# CLAUDE.md — Zebrano Studio

> Projectgeheugen voor Claude Code. Lees dit aan het begin van elke sessie. Bevat bedrijf, merk, stack, conventies en harde regels. Opgezet in het stramien van De Kozijnstudio (`Budel-Studios/dekozijnstudio`).

## Bedrijf
- **Naam:** Zebrano Studio — exclusieve binnendeuren op maat. **Een merk van MTB Bouw**; juridisch een handelsnaam van **MTB Bouw B.V.** (KvK 60942037), net als De Kozijnstudio.
- **Merkfamilie:** MTB Bouw (particulier: verbouw/renovatie) · Afbouwstudio (zakelijk: afbouw) · De Kozijnstudio (kozijnen) · Zebrano Studio (exclusieve binnendeuren, wandpanelen, roomdividers).
- **Aanbod:** taatsdeuren, schuifdeuren, draaideuren, wandvlakke deuren, roomdividers/scheidingswanden, boiserie. Materialen: hout (eik, noten, zebrano), fineer, glas, metaal, steen/keramiek, grepen/beslag, afwerkingen.
- **Doelgroep:** particulieren met oog voor design + architecten, interieurontwerpers en aannemers (partnerprogramma, "Zakelijk").
- **Merkbelofte:** "Exclusiviteit, nu binnen handbereik" / "Luxe deuren, voor iedereen bereikbaar."
- **Verhaal:** twee broers (Robbert en Mathijs), backpackreis Zuidoost-Azië 2015, eerste eigen deur in 2020 — zie `data/over.ts`.

## HARDE REGELS
- **Taal:** alle UI-teksten en content in **Nederlands (nl-NL)**, je-vorm (zie `docs/schrijfwijzer.md`). Code, bestandsnamen en commentaar in Engels. EN/DE-vertalingen van de oude site bestaan nog (zie "Oude site"), maar de site start Nederlandstalig.
- **Primaire actie:** "Vraag een voorstel" → `/contact` (aanvraagformulier).
- **Geen verzonnen content.** Claims alleen via het feitenregister `data/feiten.ts` (`verified` / `needs_confirmation`); onbevestigd = niet publiek (`feit()`, `isVerified()`).
- **Beeld:** alleen eigen of gelicenseerde foto's. De huidige foto's komen van de oude site en hebben een onbekende herkomst → `docs/beelden.md`. Nooit beelden van andere merken (de oude site had o.a. een foto met het Portatec-logo en hotlinks naar een Canadees bedrijf).
- **Modules:** onderdelen zonder echte inhoud staan uit via `MODULES` in `lib/site.ts` (configurator, projecten, journaal, downloads, materialenbibliotheek). Uit = niet in menu, niet in sitemap, route bestaat niet.
- **Geen secrets in de repo.** De oude zip bevatte Shopify-tokens en een `.env`; die horen hier nooit.

## Merk & design system (uit de oude site + brief 2025)
Tokens in `app/globals.css` (`@theme`, Tailwind v4 — géén tailwind.config):
| Token | Waarde | Gebruik |
|---|---|---|
| `forest` | `#2F3A2A` | Zebrano groen: CTA's, donkere secties, logo |
| `paper` | `#F2F0EA` | pagina-basis, menubalk |
| `sand` | `#E1DBCB` | rustige secties |
| `sage` | `#C2C2B0` | footer |
| `stone` | `#858585` | grijs uit de huisstijl |
| `ink` | `#2A2A2A` | tekst |
| `line` | `#585F55` | lijnen menubalk/menu |
| `accent` | `#C4633B` | terracotta hover van menulinks, focus |
- **Fonts** (self-hosted via `next/font/local`, OFL, in `app/fonts/`): Montserrat (koppen, `font-display`), Inter (UI/menu, `font-sans`), Poppins (lopende tekst, `font-body`; alle `<p>` standaard).
- **Logo:** officiële lockups uit het .ai-bestand in `public/brand/logo-{horizontal,stacked,mark}.svg` + `components/logo.tsx`. De menubalk gebruikt `public/brand/logo-header.svg`, overgetrokken van het header-logo van de oude site (strakkere variant).
- **Homepage-hero (naar budelstudios.com, okt 2026):** wit, groot ZEBRAN▯-woordmerk linksboven met een groene spotlight die op hover meeloopt (`components/wordmark.tsx`, mask `public/brand/wordmark-{zebrano,studio}.svg`, CSS `.spotlight-wordmark` in `app/globals.css`), deurtypes rechtsboven, rij deuren die op hover opengaan zoals dat type echt beweegt (`components/home/door-lineup.tsx`). Hetzelfde woordmerk sluit de footer af (wit, spotlight in forest). Intro-scherm `components/preloader.tsx`: alleen 1e homepagebezoek per sessie, volledig CSS-getimed vanaf first paint (zie commentaar in globals.css).

## Het menu (belangrijk voor de eigenaar)
`components/site-header.tsx` is een 1-op-1 herbouw van het menu van de oude site: zwevende, omkaderde balk ([☰ Menu] [Zakelijk] — logo — [Vraag een voorstel] [bel]) die uitklapt naar een paneel met vijf kolommen (Collectie · Producten · Inspiratie · Zebrano · Overig) met links, pill-knop en foto; mobiel een accordeon. Animaties: streepjes → kruis, "Menu" rolt naar "Sluiten", items faden één voor één omhoog. Data in `lib/navigation.ts`. **Wijzig de look niet zonder overleg met Robbert.**

## Tech & conventies
- **Next.js 16 (App Router) + React 19 + TypeScript + Tailwind v4.** Zie `AGENTS.md`: Next 16 heeft breaking changes (async `params`/`searchParams`, `proxy` i.p.v. middleware); lees `node_modules/next/dist/docs/`.
- Content als getypeerde data in `data/*.ts` (geen CMS). Deurtype-pagina's via één template: `app/[deur]/page.tsx` + `data/producten.ts` (`dynamicParams = false`).
- SEO: `pageMetadata()` in `lib/seo.ts` (title zonder merk; template voegt " | Zebrano Studio" toe), `app/sitemap.ts`, `app/robots.ts`, JSON-LD in `lib/jsonld.ts` (organisatie met vaste `@id`, `HomeAndConstructionBusiness`, legalName MTB Bouw B.V., parentOrganization MTB Bouw). Geen FAQPage- of rating-schema.
- Redirects van oude URL's (`/products/PivotDoor` e.d.) in `next.config.ts`.
- **Formulier:** `components/aanvraag-form.tsx` → server action `app/contact/actions.ts` → `lib/email.ts` → `lib/mail-transport.ts` (Resend, zelfde sleutel/afzender als MTB Bouw; SMTP als fallback). Leads naar `info@mtbbouw.com` (`OFFERTE_TO_EMAIL` om te wijzigen). Niets opgeslagen; succes pas na acceptatie van de mail → `/bedankt`. Honeypot + zod (`lib/aanvraag-schema.ts`).
- **Meten:** `lib/track.ts` pusht alleen naar `window.dataLayer` (`form_start`, `generate_lead`); geen tool, geen cookies.
- Hosting: Vercel. Preview: GitHub Codespaces (`.devcontainer`).

## Sitemap
Home · Taatsdeuren · Schuifdeuren · Draaideuren · Wandvlakke deuren · Roomdividers · Boiserie · Materialen · Collecties (+ Glas, Fineer, 3D, Atelier) · Architecten · Ons verhaal · Ontmoet de makers · Bewust vakmanschap · MTB Bouw-familie · Service · Veelgestelde vragen · Contact · Privacy · Algemene voorwaarden · Cookiebeleid. Niet in sitemap: `/bedankt`.

## Oude site (2025) — bron
- Fiverr-build: Express-backend + gecompileerde React-build, frontend-broncode ontbrak. Analyse: claude.ai-project "Zebrano Studio" → `claude/zebrano-website-analyse.md`.
- Alle oude teksten (NL/EN/DE) zaten in de bundle als i18next-object; ze zijn overgenomen en geredigeerd in `data/*.ts`. Vervallen: Shopify, materialendatabase (Firebase), admin, downloads, zoeken, valuta-/taalknop.

## Status
- **31-10-2026 — hero vernieuwd:** hero naar budelstudios.com, intro-scherm, spotlight-logo in hero en footer. Volgende stap (wens Robbert): productpagina's met meer "jus" (Shopify-achtige secties, deur-elementen), mogelijk eerst uitgeprobeerd in Lovable en daarna hierheen overgezet.
- **31-10-2026 — v1 opgezet:** menu (1:1), alle pagina's hierboven met NL-teksten, aanvraagformulier, juridische concepten, SEO-basis, redirects. Zie `docs/releasechecklist.md` voor wat de livegang nog tegenhoudt (beeld, feiten, juridisch, domein, Resend in Vercel).
