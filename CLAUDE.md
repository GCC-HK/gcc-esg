# GREEN FUTURE — GCC Sustainability Committee Platform

EU sustainability compliance platform by the **GCC Sustainability Committee** (German Chamber of Commerce, Hong Kong). Audience: Hong Kong sourcing offices of German/European retailers and their manufacturers in China/Vietnam. Two versions run in parallel: **V1** (original one-pager, committee's comparison baseline) and **V2** (hub + subpages, the active development line).

**Naming rules:** it is the "Sustainability Committee" — never "Working Group" (old name). The regulation checker is the "Green Sourcing Compass" — never "Compliance Atlas" (belongs to the owner's other companies). In V2 navigation, use plain names (Regulations, News, Deadlines, Guides); product names (Green Sourcing Compass, The Green Sourcing Briefing) appear only as page mastheads. GREEN FUTURE is the platform brand — positioning: "a Committee platform, not the Chamber's official website" (footer states this; no AHK/GIC logo without Chamber marketing sign-off).

## Stack & architecture

- **V1 frontend:** static HTML/CSS/vanilla JS (no build step). `index.html` (one-pager), `regulation.html?id=<regId>`, `article.html?slug=<slug>` (also via `/article` rewrite with per-article OG tags), `account.html`, `privacy.html`. Shared logic in `script.js`, styles in `styles.css`. **V1 is frozen except factual fixes** — it's the baseline the committee compares against.
- **V2 frontend:** hub + subpages: `v2.html` (hub: hero, persona doors, tool cards, live previews), `v2-compass.html` (finder + deadline radar), `v2-cbam.html`, `v2-briefing.html`, `v2-guides.html` (member-gated), `v2-learn.html`, `v2-about.html`.
  - **Generator rule: edit `v2.html` (master), then `node scripts/build-v2-pages.js` — never edit `v2-*.html` directly.** Every page carries the full master DOM; a per-page `<style id="v2PageStyle">` controls section visibility, so the shared `script.js` needs no changes.
  - V2 layers: `v2.css` (all V2 styling incl. sans-only typography override), `v2.js` (personas, express finder, CSV "Regulatory Sheet" export, disclaimers, guides gate, news band, deferred hash-jump), `v2-cbam.js` + `v2-cbam-data.js` (CBAM engine, replaces script.js's calculator on V2 by cloning its controls).
  - V2 design rules: sans-only (no Source Serif; Chamber site alignment) · page tops centered (pill, headline, subtitle) except the hub hero (left) · content headings in base text color, green only on clickable cards, AHK blue only for member zone, white on urgency banners · never stack two dark bands · news band on homepage only, max 3 headlines, 60s loop · disclaimers at point of use (above results, in CSV, on CBAM output).
- **API:** Vercel serverless functions in `api/`: `content.js` (Sanity proxy + **server-side access gating** — locked posts return teasers), `subscribe.js` (Resend, 503 until `RESEND_API_KEY`), `auth-config.js`, `article-page.js`. CMS-driven sections (news band, briefing, radar) hide silently without `/api/content` — always review via dev server or Vercel, not file://.
- **CMS:** Sanity project `bvmxf21v`, dataset `production` (public read). Types: `regulation`, `newsPost`, `deadline`. Content edits via re-runnable seed scripts (`scripts/seeds/`, `SANITY_TOKEN=<editor token> node …`, deterministic `_id`s).
- **Auth:** Supabase magic links (not configured). Demo preview mode active while `SUPABASE_URL` unset (localStorage `gcc-demo-tier` + `x-demo-tier` header). Member tier = `user.app_metadata.tier === "member"`. V2's guides page shows a sign-in gate to signed-out visitors.
- **Deploy:** Vercel from GitHub `GCC-HK/gcc-esg`. `main` → production `gcc-esg.vercel.app` (V1 at `/`, V2 at `/v2`). Branch `v2` → separate URL `gcc-esg-git-v2-pergamon-labs.vercel.app` with a root→`/v2.html` rewrite; **keep `v2` synced by merging `main` into it after each push**. Branch previews sit behind Vercel Deployment Protection until the owner sets it to "Only Production Deployments". Domain `gcchk-esg.com` not yet connected.

## Local development

```
node scripts/dev-server.js          # http://localhost:4321 — serves V1+V2 and mirrors /api incl. gating
```
Keep `scripts/dev-server.js` query/gating logic in sync with `api/content.js`.

## Testing

```
# jsdom lives outside the repo (no package.json — keeps Vercel static). From a dir with `npm i jsdom`:
NODE_PATH=$PWD/node_modules node <repo>/scripts/verify-site.js   # V1, ~70 assertions
NODE_PATH=$PWD/node_modules node <repo>/scripts/verify-v2.js     # V2 pages+engine, ~100 assertions
```
The V2 suite pins the CBAM worked examples (CN steel official default €141.65/t in 2026; custom 2.0 → €43.36/t) — any constant change that shifts them must be sourced and the tests updated deliberately. Visual checks via Playwright screenshots (chromium via npx playwright).

## CBAM engine (V2) — data discipline

All constants live in `v2-cbam-data.js`, each with an OJ source comment: country default values from **IR 2025/2621 Annex I as corrected by IR (EU) 2026/1740** (base values excl. mark-up; mark-up 10/20/30% by year, fertilisers 1%; the Annex's route letter selects the benchmark; missing countries use the Annex's own "Other Countries" row), benchmarks from **IR 2025/2620 Column B**, factor schedule from **Dir. 2003/87/EC Art. 10a(1a)**. Full parsed corrected Annex I (12,949 rows): `scripts/seeds/cbam-annex1-corrected-full.tsv`. Maintenance: certificate price quarterly (weekly from 2027); benchmarks to be re-checked when the Commission finalizes ETS benchmarks (recital 10, before 2027 imports); re-extract on further Annex corrections. **Methodology document:** edit `scripts/cbam-methodology-source.html`, then `python3 scripts/build-cbam-docx.py` → `CBAM Calculator - Methodology and Verification.docx` (v3.1, for committee verification).

## Language system (EN / 中文 / DE / VI)

- Sibling spans `<span class="lang-en|zh|de|vi">` toggled by a body class; dropdown `#langSelect`; stored in `gcc-lang`. English fallback via CSS `:has()`. News posts are EN/ZH only by decision; regulations and UI are four-language. Never re-introduce inline `style.display` language toggling.
- Language claims in copy: tools = four languages; briefings = EN/ZH; committee email answering = EN/ZH/DE. Vietnamese (incl. all V2 strings) needs native review before public launch.

## Content rules (the Chamber's credibility depends on these)

- **Every factual claim verified against official sources** (EUR-Lex, Commission, gov.uk, law-firm briefings) before seeding. "Proposed", not "law", for pending files. Set `lastReviewed`. Full-content audit ran 2026-08-11 (~90% verified correct; corrections seeded via `seed-corrections-aug26.js`).
- Regulation matching is declarative (`categories`/`roles`/`sizes`, empty = all; `markets`). Reasons may contain `{category}`/`{role}` placeholders. `badge: 'new'|'updated'` + `newSince`.
- News format: what happened → why it matters → what to do, with `sources`; license-safe images only. Access tiers `public`/`registered`/`premium`; member guides use `pillar: 'guide'`.
- No invented case studies, contacts or claims. **The committee has no own email — use `info@hongkong.ahk.de`** (a `gcc-sustainability@…` address never existed). Office address: **2302, 23/F COFCO Tower**, 262 Gloucester Road, Causeway Bay. Chamber imprint: `https://hongkong.ahk.de/en/general/imprint`.

## Committee facts

- Members (July 2026): ALDI, REWE Far East, Tchibo, Conrad Electronic, IMPALA, Teal Goal, Simba Dickie Group, ABO Energy, TGI Technology. (OBI, otto international, METRO Sourcing left — never list them.)
- Source materials (CI manual, leaflet, logos, licensed stock) in `input/` — **gitignored, never commit**.
- Design: hybrid AHK CI — green lead (#1a5c38), AHK blue #003366 (member zone/CBAM band), accents red #C34343 / orange #DE8703. V1 keeps Source Serif headlines; V2 is sans-only.

## Open items (post-demo)

Flip Vercel Deployment Protection so the `v2` branch URL is shareable · committee decision V1 vs V2 · Chamber legal review of `privacy.html` · own Impressum page · rotate the Sanity editor token (shared in chat twice) · Supabase go-live · domain + Resend · Sanity Studio · analytics · native VI review · ZH/EN divergence in one Benefits card (possibly intentional localization — committee to rule) · real member case studies · CI-manual review for sub-brand rules (offered). Full history: `PROJECT-LOG.md`.
