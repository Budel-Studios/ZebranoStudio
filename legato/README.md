# Legato (werknaam)

Website en boekenstudio voor trouw- en reisboeken van koffietafelkwaliteit: hoofdstukken, geloften, speeches en foto's, samen ontworpen door fotograaf en bruidspaar, met Claude als ontwerper.

```bash
npm install
npm run dev        # http://localhost:3000 (website) en /studio (boekenstudio)
npm run typecheck && npm run lint && npm run build
```

Kopieer `.env.example` naar `.env.local`. Met `ANTHROPIC_API_KEY` ontwerpt Claude het boek; zonder sleutel werkt de studio met de ingebouwde opmaakregels.

Zie `CLAUDE.md` voor de opbouw, de keuzes en wat nog open staat.
