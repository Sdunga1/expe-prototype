# Expe — prototype

Weekend prototype of an AI in-stay concierge for Expedia Group properties. Three screens, no backend, ready to deploy.

> See [`../IDEA.md`](../IDEA.md) for the full pitch document.

## Run locally

```bash
cd expe-prototype
npm install
npm run dev
```

Open http://localhost:3000.

## Screens

| Route | Audience | Aesthetic |
|---|---|---|
| `/` | Guest (mobile) | Hero — iMessage-feel, hit **Play demo** |
| `/host` | Hotelier / Vrbo host (desktop) | Linear/Vercel SaaS |
| `/reception` | Front desk staff (desktop) | Linear-feel inbox |

Use the floating top-center nav to switch.

## Demo properties (hardcoded)

- **Aurora Boutique Hotel — Room 412** (Lisbon — hotel angle)
- **Pinecrest Cabin — Lake Tahoe** (Vrbo angle)

Switch via the chevron in the chat header, or the dropdown on `/host`.

## Stack

- Next.js 15 (App Router) + React 19
- TypeScript, Tailwind CSS 3
- `motion` (Framer Motion v11)
- Geist Sans + Mono, Instrument Serif (display)
- `lucide-react` icons

No backend, no DB, no auth. AI responses are scripted from `lib/conversations.ts` — wiring up the Claude API is a follow-up step.

## Deploy

Push the repo and import it into Vercel — defaults work.
