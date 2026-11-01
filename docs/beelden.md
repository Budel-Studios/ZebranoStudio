# Beeldregister

Drie soorten beeld in `public/images/`: wat Robbert zelf aanleverde (sectie 0, gaat vóór), AI-sfeerbeelden uit Lovable (sectie 1) en foto's van de oude site (sectie 2). Eigen foto's van gemaakte deuren gaan bij livegang vóór alles.

## 0. Aangeleverd door Robbert (01-11-2026) — `.jpg` en video

Bron: OneDrive `MTB Bouw/70_Marketing_en_merken/Zebrano Studio/2. Marketing/2. Website/Header images` (mappen `Klaar/Our story`, `Klaar/Consious Craft`, `Klaar/Our team`, `Zebrano` en vier staalfoto's los in de map). Per plek bijgesneden en verkleind; EXIF (ook locatie) is eruit. De originelen blijven in OneDrive. Herkomst afgeleid uit de bestandsgegevens:

| Bestand | Origineel | Gebruikt in | Herkomst |
|---|---|---|---|
| `verhaal-hero.jpg` | Our story/Header.jpg | /ons-verhaal (hero), homepage (Ons verhaal), menu (Zebrano) | eigen foto (fotoshoot sept. 2025) |
| `verhaal-paddels.jpg` | Our story/Our Story 3.jpg | /ons-verhaal stap 2 | eigen foto (Galaxy S24, sept. 2025) |
| `verhaal-houtopslag.jpg` | Our story/Our story 2.jpg | /ons-verhaal stap 3 | geen metadata; herkomst bevestigen |
| `verhaal-eerste-deur.jpg` | Our story/Our story 4.JPG | /ons-verhaal stap 4 | eigen foto (Canon R8, sept. 2024) |
| `verhaal-schetsen.jpg` | Our story/Our story 5.png | /ons-verhaal stap 5 | lijkt AI-gegenereerd (1024×1024 png): sfeerbeeld |
| `vakmanschap-bos.jpg` + `public/video/bewust-vakmanschap.mp4` | Consious Craft/Header video.mp4 | /bewust-vakmanschap (hero, video loopt zonder geluid), menu | **stockvideo** (gemaakt 2019, Adobe-export): licentie bevestigen |
| `vakmanschap-natuur.jpg` | Consious Craft/1. Working with nature.png | /bewust-vakmanschap principe 1 | **AI** (Midjourney v6.1, prompt in het bestand) |
| `vakmanschap-hout.jpg` | Consious Craft/Design with Longevity in Mind.jpg | /bewust-vakmanschap principe 3 | geen metadata; herkomst bevestigen |
| `makers-hero.jpg` | Our team/IMG_0335.JPG | /de-makers (hero), menu (Zebrano) | eigen foto (Canon R8, sept. 2025) |
| `makers-toegankelijk.jpg` | Our team/Access Beautiful.webp | /de-makers (citaat) | lijkt AI (832×1216): sfeerbeeld, geen project |
| `makers-dichtbij.jpg` | Our team/We like things close.png (= Zebrano/Zebrano Studio in Bold Contrast.png) | /de-makers ("dichtbij huis") | **AI-mockup** van een gevel met letters (ChatGPT-formaat en -naam). Alleen laten staan als het pand er echt zo uitziet |
| `makers-ontwerper.jpg` | Our team/IMG_0340.jpg (bewerkte versie) | /de-makers (Ben jij ontwerper?) | eigen foto (fotoshoot sept. 2025) |
| `makers-advies.jpg` | Our team/Need advice.JPG | /de-makers (Advies nodig?) | eigen foto (Canon R8, sept. 2025) |
| `team-mathijs.jpg`, `team-robbert.jpg`, `team-rick.jpg` | Our team/Mathijs.webp, Robbert.jpg, Rick.jpg | /de-makers (Ons team) | eigen portretten |
| `materialen-hero.jpg` | 20250916_145928.jpg (90° gedraaid) | /materialen (hero) | eigen foto van stalen (sept. 2025) |
| `materiaal-hout.jpg` | 20250916_145457.jpg | /materialen (Hout) | eigen foto van stalen |
| `materiaal-afwerkingen.jpg`, `materiaal-eiken-stalen.jpg` | 20250916_150118.jpg | /materialen (Afwerkingen & oliën), bibliotheek Eiken (groot beeld) | eigen foto van stalen |
| `home-hout.jpg` | 20250916_150004.jpg | homepage (Ons verhaal) | eigen foto van stalen |
| `materialen/eiken.jpg` | uitsnede uit 20250916_145928.jpg | bibliotheek: staal Eiken | eigen foto (één naturel staal) |

Niet gebruikt: `Zebrano/IMG_0340.JPG` (onbewerkte versie van `makers-ontwerper`). Lege mappen in OneDrive: `Architects`, `Klaar/Trade`, `Klaar/Home Page/*` — daar kan later beeld voor de homepagehero, architecten en zakelijk in.


## 1. Sfeerbeelden uit het Lovable-ontwerp (november 2026) — `.jpg`

Gegenereerd met AI in Robberts eigen Lovable-project (het ontwerp dat in november 2026 is overgenomen). **Ze tonen de stijl, niet echte Zebrano-projecten.** Lovable kent de gebruiker de rechten op de output toe. Gebruik ze dus niet als "ons werk" of als referentieproject. Vervang ze door eigen foto's zodra die er zijn, te beginnen met de hero van de homepage en de vijf glasontwerpen.

| Bestand | Gebruikt in |
|---|---|
| `hero-taatsdeur.jpg` | homepage (hero, "Over Zebrano"), /taatsdeuren, menu (Deuren) — `lib/images.ts` |
| `door-taats.jpg` | menu (Service) |
| `door-schuif.jpg` | homepage (Deurtypes), /schuifdeuren, menu |
| `door-draai.jpg` | homepage (Deurtypes), /draaideuren, menu |
| `door-wandvlak.jpg` | homepage (Deurtypes), /wandvlakke-deuren, /architecten, menu |
| `door-roomdivider.jpg` | homepage (Deurtypes), /roomdividers, menu |
| `col-glas.jpg` | collecties (glas), menu (Collecties) |
| `col-fineer.jpg` | collecties (fineer), homepage ("Over Zebrano"), menu |
| `col-3d.jpg` | collecties (3D), /boiserie, homepage ("Over Zebrano"), menu |
| `col-atelier.jpg` | collecties (atelier), /mtb-bouw, homepage ("Over Zebrano"), menu |
| `glas-jesse.jpg`, `glas-bo.jpg`, `glas-merle.jpg`, `glas-lucas.jpg`, `glas-guus.jpg` | /collecties/glas en de vijf ontwerppagina's — `data/glasdeuren.ts` |

### Stalen in de materialenbibliotheek — `public/images/materialen/*.jpg`

Uitsneden uit dezelfde Lovable-sfeerbeelden (noten uit `door-taats`, de drie fineers uit `col-fineer`, ribbels uit `col-3d`, klassiek paneel uit `door-draai`, lak uit `door-wandvlak`, de vijf glassoorten uit de glasontwerpen en `col-glas`). Ze laten de sfeer van het materiaal zien, het zijn geen foto's van echte stalen. Marmer, travertin en de vier profielkleuren zijn kleurvlakken (CSS) tot er foto's van echte stalen zijn. Eiken heeft sinds 01-11-2026 een echte staalfoto (sectie 0). De rest vervangen door eigen staalfoto's zodra die er zijn: één 4:3-foto per materiaal is genoeg (`swatch` in `data/materialenbibliotheek.ts`).

## 2. Foto's van de oude site (2025) — `.webp`

Omgezet naar WebP. **Herkomst onbekend:** stock, gegenereerd of van internet — de oude site bevatte aantoonbaar beelden van andere bedrijven. Niets hiervan mag live zonder dat je zeker weet dat je het mag gebruiken. Ze staan nu alleen nog op tweede plek (rijen op deurtypepagina's, galerijen van collecties, materialen).

Bewust **niet** overgenomen: `FineerCollection01.webp` (logo Portatec), `R.jpeg` (Amerikaanse bouwplaats), `OIP.webp`, `ais15.jpg`, de keukenfoto's uit de template (`cabinetary*`, `img1-4`, `slideImage*`, `architecBanner`, `banner.png`), en de hotlinks naar luminaire-authentik. Verwijderd bij de overstap naar het Lovable-ontwerp (niet meer gebruikt): `boiserie-interieur`, `glas-openslaand`, `hero-paviljoen`, `hero-villa`, `hero-zwembad`, `schuifdeur-tuin`, `taatsdeur-interieur`. Verwijderd op 01-11-2026 (vervangen door Robberts foto's): `verhaal-1` t/m `verhaal-5`.

| Bestand | Oud bestand | Gebruikt in | Status |
|---|---|---|---|
| `3d-ornament.webp` | `threeDCollections.webp` | data/collecties.ts | herkomst bevestigen of vervangen |
| `afwerking-olie.webp` | `oilandFinishes.jpeg` | data/collecties.ts | herkomst bevestigen of vervangen |
| `atelier-1.webp` | `atelierCollection00.webp` | data/collecties.ts | herkomst bevestigen of vervangen |
| `atelier-2.webp` | `atelierCollection11.webp` | data/collecties.ts | herkomst bevestigen of vervangen |
| `boiserie-1.webp` | `Boiserie1.jpg` | data/collecties.ts, data/producten.ts | herkomst bevestigen of vervangen |
| `boiserie-2.webp` | `Boiserie2.jpg` | data/producten.ts | herkomst bevestigen of vervangen |
| `boiserie-3.webp` | `Boiserie3.jpg` | data/producten.ts | herkomst bevestigen of vervangen |
| `fineer-rollen.webp` | `veneer.jpg` | data/collecties.ts, data/producten.ts | herkomst bevestigen of vervangen |
| `glas-in-lood.webp` | `glass/glassCollection2.jpg` | data/collecties.ts, data/producten.ts | herkomst bevestigen of vervangen |
| `glas-ribbel.webp` | `glass/glassCollection1.jpg` | data/collecties.ts, data/producten.ts | herkomst bevestigen of vervangen |
| `glas-staal.webp` | `glass/glassCollection3.jpg` | data/collecties.ts, data/producten.ts | herkomst bevestigen of vervangen |
| `hout-planken.webp` | `wood2.jpg` | data/collecties.ts, data/producten.ts (draaideuren) | herkomst bevestigen of vervangen |
| `metaal-profielen.webp` | `metalsmixed.avif` | data/producten.ts | herkomst bevestigen of vervangen |
| `schuifdeur-glas.webp` | `slideTransparent.jpg` | data/producten.ts | herkomst bevestigen of vervangen |
| `schuifdeur-hout.webp` | `slideWodden.jpg` | data/producten.ts | herkomst bevestigen of vervangen |
| `taatsdeur-relief.webp` | `pivotDoor1.jpg` | data/collecties.ts, data/producten.ts | herkomst bevestigen of vervangen |
| `taatsdeur-visgraat.webp` | `pivotdoors1.jpg` | data/producten.ts | herkomst bevestigen of vervangen |

Laag van resolutie (alleen klein gebruiken): `glas-*` (≤ 736 px), `hout-planken` (640 px).
