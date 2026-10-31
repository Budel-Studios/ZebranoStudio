# Zebrano Studio

Website van **Zebrano Studio** — exclusieve binnendeuren op maat, een merk van MTB Bouw.
Next.js 16 (App Router) · React 19 · Tailwind CSS 4 · TypeScript · gehost op Vercel.

Opgezet in hetzelfde stramien als De Kozijnstudio. Lees eerst `CLAUDE.md`.

## Starten

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # productiebuild
npm run lint
npm run typecheck
```

Of open de repo in **GitHub Codespaces** (Code → Codespaces): de devserver start vanzelf.

## Belangrijke plekken
- `components/site-header.tsx` + `lib/navigation.ts` — het menu (1-op-1 van de oude site)
- `data/` — alle teksten en bedrijfsgegevens (`company.ts`, `producten.ts`, `collecties.ts`, `over.ts`, `service.ts`, `feiten.ts`)
- `lib/site.ts` — domein en modules (aan/uit)
- `docs/releasechecklist.md` — wat er nog moet gebeuren vóór livegang
- `docs/beelden.md` — herkomst en gebruik van elke foto

## Mail
Zet `RESEND_API_KEY` en `MAIL_FROM` in Vercel (zie `.env.example`). Zonder die variabelen toont het formulier een nette foutmelding.
