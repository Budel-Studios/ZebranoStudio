# Beeldregister

Twee soorten beeld in `public/images/`. Eigen foto's van gemaakte deuren gaan bij livegang vóór allebei.

## 1. Sfeerbeelden uit het Lovable-ontwerp (november 2026) — `.jpg`

Gegenereerd met AI in Robberts eigen Lovable-project (het ontwerp dat in november 2026 is overgenomen). **Ze tonen de stijl, niet echte Zebrano-projecten.** Lovable kent de gebruiker de rechten op de output toe. Gebruik ze dus niet als "ons werk" of als referentieproject. Vervang ze door eigen foto's zodra die er zijn, te beginnen met de hero van de homepage en de vijf glasontwerpen.

| Bestand | Gebruikt in |
|---|---|
| `hero-taatsdeur.jpg` | homepage (hero, "Over Zebrano"), /taatsdeuren, menu (Deuren) — `lib/images.ts` |
| `door-taats.jpg` | homepage (Ons verhaal), /bewust-vakmanschap, menu (Zebrano) |
| `door-schuif.jpg` | homepage (Deurtypes), /schuifdeuren, menu |
| `door-draai.jpg` | homepage (Deurtypes), /draaideuren, menu |
| `door-wandvlak.jpg` | homepage (Deurtypes), /wandvlakke-deuren, /architecten, menu |
| `door-roomdivider.jpg` | homepage (Deurtypes), /roomdividers, menu |
| `col-glas.jpg` | collecties (glas), menu (Collecties) |
| `col-fineer.jpg` | collecties (fineer), /materialen, homepage ("Over Zebrano"), menu |
| `col-3d.jpg` | collecties (3D), /boiserie, homepage ("Over Zebrano"), menu |
| `col-atelier.jpg` | collecties (atelier), /ons-verhaal, /de-makers, /mtb-bouw, homepage, menu |
| `glas-jesse.jpg`, `glas-bo.jpg`, `glas-merle.jpg`, `glas-lucas.jpg`, `glas-guus.jpg` | /collecties/glas en de vijf ontwerppagina's — `data/glasdeuren.ts` |

### Stalen in de materialenbibliotheek — `public/images/materialen/*.jpg`

Uitsneden uit dezelfde Lovable-sfeerbeelden (noten uit `door-taats`, eiken uit `door-schuif`, de drie fineers uit `col-fineer`, ribbels uit `col-3d`, klassiek paneel uit `door-draai`, lak uit `door-wandvlak`, de vijf glassoorten uit de glasontwerpen en `col-glas`). Ze laten de sfeer van het materiaal zien, het zijn geen foto's van echte stalen. Marmer, travertin en de vier profielkleuren zijn kleurvlakken (CSS) tot er foto's van echte stalen zijn. Vervangen door eigen staalfoto's zodra die er zijn: één vierkante of 4:3-foto per materiaal is genoeg (`swatch` in `data/materialenbibliotheek.ts`).

## 2. Foto's van de oude site (2025) — `.webp`

Omgezet naar WebP. **Herkomst onbekend:** stock, gegenereerd of van internet — de oude site bevatte aantoonbaar beelden van andere bedrijven. Niets hiervan mag live zonder dat je zeker weet dat je het mag gebruiken. Ze staan nu alleen nog op tweede plek (rijen op deurtypepagina's, galerijen van collecties, materialen, tijdlijn Ons verhaal).

Bewust **niet** overgenomen: `FineerCollection01.webp` (logo Portatec), `R.jpeg` (Amerikaanse bouwplaats), `OIP.webp`, `ais15.jpg`, de keukenfoto's uit de template (`cabinetary*`, `img1-4`, `slideImage*`, `architecBanner`, `banner.png`), en de hotlinks naar luminaire-authentik. Verwijderd bij de overstap naar het Lovable-ontwerp (niet meer gebruikt): `boiserie-interieur`, `glas-openslaand`, `hero-paviljoen`, `hero-villa`, `hero-zwembad`, `schuifdeur-tuin`, `taatsdeur-interieur`.

| Bestand | Oud bestand | Gebruikt in | Status |
|---|---|---|---|
| `3d-ornament.webp` | `threeDCollections.webp` | data/collecties.ts | herkomst bevestigen of vervangen |
| `afwerking-olie.webp` | `oilandFinishes.jpeg` | bewust-vakmanschap, data/collecties.ts, data/producten.ts | herkomst bevestigen of vervangen |
| `atelier-1.webp` | `atelierCollection00.webp` | data/collecties.ts | herkomst bevestigen of vervangen |
| `atelier-2.webp` | `atelierCollection11.webp` | data/collecties.ts | herkomst bevestigen of vervangen |
| `boiserie-1.webp` | `Boiserie1.jpg` | data/collecties.ts, data/producten.ts | herkomst bevestigen of vervangen |
| `boiserie-2.webp` | `Boiserie2.jpg` | data/producten.ts | herkomst bevestigen of vervangen |
| `boiserie-3.webp` | `Boiserie3.jpg` | data/producten.ts | herkomst bevestigen of vervangen |
| `fineer-rollen.webp` | `veneer.jpg` | data/collecties.ts, data/producten.ts | herkomst bevestigen of vervangen |
| `glas-in-lood.webp` | `glass/glassCollection2.jpg` | data/collecties.ts, data/producten.ts | herkomst bevestigen of vervangen |
| `glas-ribbel.webp` | `glass/glassCollection1.jpg` | data/collecties.ts, data/producten.ts | herkomst bevestigen of vervangen |
| `glas-staal.webp` | `glass/glassCollection3.jpg` | data/collecties.ts, data/producten.ts | herkomst bevestigen of vervangen |
| `hout-planken.webp` | `wood2.jpg` | data/collecties.ts, data/producten.ts | herkomst bevestigen of vervangen |
| `metaal-profielen.webp` | `metalsmixed.avif` | data/producten.ts | herkomst bevestigen of vervangen |
| `schuifdeur-glas.webp` | `slideTransparent.jpg` | data/producten.ts | herkomst bevestigen of vervangen |
| `schuifdeur-hout.webp` | `slideWodden.jpg` | data/producten.ts | herkomst bevestigen of vervangen |
| `taatsdeur-relief.webp` | `pivotDoor1.jpg` | data/collecties.ts, data/producten.ts | herkomst bevestigen of vervangen |
| `taatsdeur-visgraat.webp` | `pivotdoors1.jpg` | data/producten.ts | herkomst bevestigen of vervangen |
| `verhaal-1.webp` | `timelineImg1.png` | data/over.ts | herkomst bevestigen of vervangen |
| `verhaal-2.webp` | `timelineImg2.png` | data/over.ts | herkomst bevestigen of vervangen |
| `verhaal-3.webp` | `timelineImg3.png` | data/over.ts | herkomst bevestigen of vervangen |
| `verhaal-4.webp` | `timelineImg4.png` | data/over.ts | herkomst bevestigen of vervangen |
| `verhaal-5.webp` | `timelineImg5.png` | data/over.ts | herkomst bevestigen of vervangen |

Laag van resolutie (alleen klein gebruiken): `verhaal-1…4` (512 px), `glas-*` (≤ 736 px), `hout-planken` (640 px).
