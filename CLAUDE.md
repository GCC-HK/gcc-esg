# GREEN FUTURE — GCC Sustainability Committee Platform

EU sustainability compliance platform by the **GCC Sustainability Committee** (German Chamber of Commerce, Hong Kong). Audience: Hong Kong sourcing offices of German/European retailers and their manufacturers in China/Vietnam.

**Naming rule:** it is the "Sustainability Committee" — never "Working Group" (old name). The regulation checker is the "Green Sourcing Compass" — never "Compliance Atlas" (that name belongs to the owner's other companies).

## Stack & architecture

- **Frontend:** static HTML/CSS/vanilla JS (no build step). Pages: `index.html` (single-page app), `regulation.html?id=<regId>`, `article.html?slug=<slug>` (also served via `/article` rewrite with per-article OG tags), `account.html`, `privacy.html`.
- **API:** Vercel serverless functions in `api/`:
  - `content.js` — proxy to Sanity CDN + **server-side access gating** (locked posts return teasers only)
  - `subscribe.js` — Resend newsletter signup (503 "opens soon" until `RESEND_API_KEY` set)
  - `auth-config.js` — public Supabase config (503 until configured)
  - `article-page.js` — serves article.html with injected per-article `<title>`/OG tags (`/article` rewrite, `includeFiles` in vercel.json)
- **CMS:** Sanity project `bvmxf21v`, dataset `production` (public read). Document types: `regulation`, `newsPost`, `deadline` (schemas in `sanity/schemas/`, no Studio deployed yet). Content edits currently via seed scripts.
- **Auth:** Supabase magic links (not yet configured). **Demo preview mode** is active while `SUPABASE_URL` is unset: `account.html` offers "Preview as Registered/Member" (localStorage `gcc-demo-tier` + `x-demo-tier` header, honoured by the API only when real auth is absent). Member tier = `user.app_metadata.tier === "member"`, granted manually in Supabase.
- **Deploy:** Vercel from GitHub `GCC-HK/gcc-esg` main. Setup checklist and env vars: see `SETUP.md`. Domain `gcchk-esg.com` (Hostinger) not yet connected — internal demo phase.

## Local development

```
node scripts/dev-server.js          # http://localhost:4321 — mirrors all /api routes incl. gating
SUPABASE_URL=... SUPABASE_ANON_KEY=... node scripts/dev-server.js   # test real auth
```
Keep `scripts/dev-server.js` query/gating logic in sync with `api/content.js`.

## Testing

```
cd <somewhere with jsdom installed> && node scripts/verify-site.js   # ~70 assertions (needs: npm i jsdom)
```
Covers wizard flow, regulation matching, CBAM math (expected €51.13/t for 1000t BOF steel from CN), gating, languages, ticker, library. For visual checks use Playwright screenshots (chromium headless installed via npx playwright).

## Language system (EN / 中文 / DE / VI)

- Mechanism: sibling spans `<span class="lang-en|zh|de|vi">` toggled purely by a body class (`body.zh|de|vi`); dropdown `#langSelect`; choice in localStorage `gcc-lang`.
- **English fallback via CSS `:has()`**: an en-span with no de/vi sibling stays visible in DE/VI mode. By decision, **news posts are EN/ZH only** (90% of suppliers are in China) — they fall back to English in DE/VI. Regulations and UI are fully four-language.
- Never re-introduce inline `style.display` toggling for languages (caused a stuck-language bug; removed).
- Vietnamese needs native-speaker review before public launch.

## Content rules (the Chamber's credibility depends on these)

- **Every factual claim gets verified against official sources** (EUR-Lex, Commission, gov.uk, law-firm briefings) before seeding. Say "proposed", not "law", for pending files. Set `lastReviewed`.
- Regulation matching is declarative: `categories`/`roles`/`sizes` arrays (empty = all) + `markets` (empty = eu+germany; `uk`/`us` supported). Reasons may contain `{category}`/`{role}` placeholders — preserved in all languages, substituted client-side.
- `badge: 'new' | 'updated'` + `newSince` (drives newest-first sorting within urgency groups).
- News editorial format: what happened → why it matters → what suppliers should do, plus `sources` (always) and `imageUrl`/`imageCredit` (license-safe only: owned stock or license-checked Wikimedia).
- Access tiers on posts: `public` / `registered` / `premium`. Member guides use `pillar: 'guide'` (renders in the Member Resource Library, not the briefing).
- No invented case studies or member content — real or absent.

## Seed scripts (`scripts/seeds/`)

Run with `SANITY_TOKEN=<editor token> node scripts/seeds/<file>`. They use `createOrReplace`/`patch` with deterministic `_id`s (`regulation-<regId>`, etc.) and are re-runnable. Historical order: seed-sanity → seed-news2 → seed-images-flagship → seed-badges → seed-new-regs → seed-watchlist → seed-translations → seed-de-vi → seed-guides.

## Committee facts

- Members (July 2026): ALDI, REWE Far East, Tchibo, Conrad Electronic, IMPALA, Teal Goal, Simba Dickie Group, ABO Energy, TGI Technology. (OBI, otto international, METRO Sourcing left — never list them.)
- Source materials (CI manual, leaflet, member logos, licensed stock) live in `input/` — **gitignored, never commit**.
- Design: hybrid AHK CI — green lead (#1a5c38) + AHK CD Manual 2023 elements (Source Serif 4 headlines / Source Sans 3 body, AHK blue #003366 for CBAM band & member zone, CI accents red #C34343 / orange #DE8703).

## Open items (post-demo)

Chamber legal review of `privacy.html` (marked draft) · rotate the Sanity editor token · Supabase project + env vars (activates real sign-in, disables demo mode automatically) · domain + Resend go-live · Sanity Studio deployment for committee editors · analytics · native review of Vietnamese · real member case studies. Full history: `PROJECT-LOG.md`.
