# CLAUDE.md — Legato (werknaam)

> Project memory. Read at the start of each session. This folder is a self-contained Next.js app that lives in the Zebrano Studio repo for now (branch `claude/wedding-book-design-app-cbae95`); it is meant to move to its own repository. The Zebrano `CLAUDE.md` one level up does not apply here.

@AGENTS.md

## Product
- High-end, one-of-a-kind coffee-table books of a wedding or a journey. More than photographs: chapters (aankomst … vertrek) plus the written stories (geloften, speeches, leuke momenten, quotes, brieven, menu, playlist, tijdlijn).
- Sold through wedding photographers: each gets a portal (`/studio`) and makes the book together with the couple. Claude designs the book from parameters we set.
- Printed by **Graphistudio** (Italy), **Tramontina Collection – Coffee Table Book** (the owner wrote "tratormina"; confirm). Formats verified publicly: 20×30, 25×35, 30×30 cm. Bleed, safe area, page limits and canvas sizes are behind their Trade Area login and are **not verified**: they are studio settings with cautious defaults.
- Upsell: boekenleggers, boekstandaard, presentatiebox, schuifhoes, ouderboek (`ACCESSORIES` in `lib/book/catalog.ts`, site copy in `data/accessoires.ts`).
- Brand name, tagline and printer line live only in `lib/brand.ts`. "Legato" is a working name; trademark and domain are unchecked.

## Hard rules
- UI text Dutch (couples "jullie", photographers "je"); code and comments English.
- No invented facts: no reviews, prices, delivery times or partnership claims. Prices are set by the photographer in the studio; empty = "op aanvraag".
- The couple's words are never rewritten by the model. The AI points at a story id; the app sets the text. Quotes must be literally present in a story (`lib/book/from-ai.ts` refuses others).
- No real photographs exist yet. Site visuals are CSS/SVG book mock-ups; the demo book uses painted placeholders that block ordering.
- No secrets in the repo. `ANTHROPIC_API_KEY` is server-side only.

## Structure
- `app/(site)/` marketing site (same build-up as the Zebrano site, own branding): tokens in `app/globals.css` (paper, linen, blush, wine, ink, gold), Cormorant Garamond + DM Sans, `components/site/*`, `components/ui/*`, `lib/navigation.ts`, `data/*`. Contact form → server action → Resend/SMTP.
- `app/studio/` the portal: dashboard (`components/studio/dashboard.tsx`) and the editor (`editor.tsx`) with five steps: Verhaal, Foto's, Ontwerp, Boek, Controle & bestellen. Role switch Fotograaf / Bruidspaar.
- `lib/book/` the engine:
  - `types.ts` data model. Geometry is in percent of the open spread, so designs are format-independent.
  - `templates.ts` 23 spread templates (`TEMPLATES`), `buildSpread(plan)` and `planOf(spread)`.
  - `autodesign.ts` local layout engine (`designBook`) with pacing rules; also the fallback without API key. `plansToSpreads` keeps locked spreads.
  - `typography.ts` type scale in points, capacity estimate, text splitting.
  - `preflight.ts` print checks (resolution, fold, safe zone, empty frames, placeholders, favourites, sign-off).
  - `store.ts` **local-first storage in IndexedDB** (projects, original files, previews). The one module to replace for a shared backend.
  - `demo.ts` example book.
- `components/book/spread-view.tsx` renders a spread at any size from `--mm`; used for thumbnails, the editor canvas and print (with bleed).
- `lib/ai/` + `app/api/design`, `app/api/text`: Claude integration (`@anthropic-ai/sdk`, model set in `lib/ai/claude.ts`, structured output via zod, streaming, server-side refusal fallback). Whole-book design, three options for one spread, and text help (opschonen, inkorten, citaat kiezen, titel).
- Print file: `/studio/project/[id]/print` — one page per spread at true size plus bleed; the browser saves it as PDF.

## Open (owner decisions and next steps)
- Shared backend (accounts, photographer and couple on different devices, photo storage). Now everything is in one browser.
- Graphistudio Trade Area: take bleed, safe area, page limits and canvas sizes from the Print & Bind guide; replace browser PDF export by a server-side export with embedded colour profile if the lab requires it.
- Real photographs for the site; company details; legal texts are concepts.
- Photo analysis by Claude (vision) for selection and captions; EXIF capture time for automatic chaptering.
- Payments, invoices and order status.
