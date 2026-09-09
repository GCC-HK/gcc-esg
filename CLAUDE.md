# ESG Sourcing Hub — GCC ESG Committee Platform

EU sustainability compliance platform by the **GCC ESG Committee** (German Chamber of Commerce, Hong Kong). Audience: Hong Kong sourcing offices of German/European retailers and their manufacturers in China/Vietnam. **V2 (hub + subpages) IS the site since 2026-09-05** — the V1 one-pager was retired by committee decision ("we do not need V1 anymore"; it lives in git history before commit "V2 replaces V1"). The Sep 2026 committee review round (50 Webvizio comments by Jill Dessel, REWE Far East) is implemented; her decisions govern current copy (requirements-not-rules terminology, no sign-in, member area "launching soon", CBAM calculator gated pending committee verification, VI parked, EU+DE+UK markets only). Review round 2 (6 comments, 2026-09-08, separate Webvizio project) is implemented, including the rename to ESG Sourcing Hub (owner decision 2026-09-09 after Jill's EmpCo concern about "green"; her "strictly forbidden" claim is legally overstated for a B2B platform name, the rename is an optics call). Open from round 2: a handful of her suggested certifications parked with questions back (ISO 32210/32220, LEED/BREEAM/EDGE, RJC, SCS, ISCC EU). Her nav label idea "EU Requirements" was rejected (site covers UK/DE law too; suppliers know "Regulations").

**Naming rules:** it is the "ESG Committee" — never "Working Group" (old name). The regulation checker is the "ESG Sourcing Compass" — never "Compliance Atlas" (belongs to the owner's other companies). In V2 navigation, use plain names (Regulations, News, Deadlines, Guides); product names (ESG Sourcing Compass, The ESG Sourcing Briefing) appear only as page mastheads. **ESG Sourcing Hub** is the platform brand (naming history: GREEN FUTURE → "Green Sourcing Hub" 2026-09-05 → ESG Sourcing Hub 2026-09-09, after Jill's EmpCo objection to "green"; the earlier "SustainAbility" idea was dropped over the ERM trademark collision — never reuse "green" or "sustainability" in the brand). It completes the product family: ESG Sourcing Hub (platform) · ESG Sourcing Compass (checker) · The ESG Sourcing Briefing (news). Positioning: "a Committee platform, not the Chamber's official website" (footer states this; no AHK/GIC logo without Chamber marketing sign-off).

## Stack & architecture

- **Frontend:** static HTML/CSS/vanilla JS (no build step at deploy; pages pre-generated). Hub + subpages, one per topic: `index.html` (hub; `v2.html` is a byte-identical alias), `v2-tools.html` (tools overview; nav dropdown), `v2-compass.html` (finder, multi-category comparison), `v2-deadlines.html` (radar), `v2-cbam.html`, `v2-briefing.html`, `v2-guides.html` (member "launching soon" gate), `v2-learn.html`, `v2-faq.html`, `v2-glossary.html` (term/definition rows incl. law types), `v2-certifications.html`, `v2-about.html`. Legacy detail pages kept in V1 styling: `regulation.html?id=<regId>`, `article.html?slug=<slug>` (also via `/article` rewrite with per-article OG tags), `privacy.html`; `account.html` exists but is unlinked (sign-in removed from nav).
  - **Generator rule: edit `v2.html` (master), then `node scripts/build-v2-pages.js` — never edit `index.html` or `v2-*.html` directly.** Every page carries the full master DOM; a per-page `<style id="v2PageStyle">` controls section visibility, so the shared `script.js` needs no changes.
  - Layers: `styles.css` + `v2.css` (incl. sans-only typography override and the fixed legal topline), `script.js` (shared logic — regulations data, wizard, radar, briefing; also serves the legacy detail pages, so **V2-only copy changes go in `v2.js` post-render overrides, not script.js**), `v2.js` (personas, persona-split finder — Guided Check wizard for suppliers vs Express Lookup table for sourcing offices, one visible at a time with mode-switch links —, multi-category comparison matrix, CSV exports, disclaimers, guides gate, news band, mini-deadline dates, member-CTA lockdown, briefing restructure to a news list — lead lifted out full-width image-left, rest flattened to uniform thumb rows —, deferred hash-jump), `v2-cbam.js` + `v2-cbam-data.js` (CBAM engine; CN code mandatory before results).
  - Design rules: sans-only everywhere incl. legacy detail pages (`--font-serif` maps to the sans stack; Chamber CI) · slim always-on legal topline above the nav (`--topline-h`) · page tops centered (pill, headline, subtitle) except the hub hero (left) · content headings in base text color, green only on clickable cards, AHK blue only for member zone, white on urgency banners · never stack two dark bands · news band on homepage only, max 3 headlines, 60s loop · disclaimers at point of use (above results, in CSV, on CBAM output) · member/CBAM features may be announced but locked ("launching soon" badges), never silently removed · no dash punctuation in copy (committee rule; CMS content must follow too when seeding).
- **API:** Vercel serverless functions in `api/`: `content.js` (Sanity proxy + **server-side access gating** — locked posts return teasers), `subscribe.js` (Resend, 503 until `RESEND_API_KEY`), `auth-config.js`, `article-page.js`. CMS-driven sections (news band, briefing, radar) hide silently without `/api/content` — always review via dev server or Vercel, not file://.
- **CMS:** Sanity project `bvmxf21v`, dataset `production` (public read). Types: `regulation`, `newsPost`, `deadline`. Content edits via re-runnable seed scripts (`scripts/seeds/`, `SANITY_TOKEN=<editor token> node …`, deterministic `_id`s).
- **Auth:** Supabase magic links (not configured). Demo preview mode active while `SUPABASE_URL` unset (localStorage `gcc-demo-tier` + `x-demo-tier` header). Member tier = `user.app_metadata.tier === "member"`. Sign-in is removed from the UI (committee decision Sep 2026): the guides page shows a "launching soon" gate; a signed-in demo member still passes it. Server-side gating in `api/content.js` stays authoritative.
- **Deploy:** Vercel from GitHub `GCC-HK/gcc-esg`. `main` → production `gcc-esg.vercel.app` (V2 hub at `/`; `/v2` still resolves via the alias file + cleanUrls). Branch `v2` → separate URL `gcc-esg-git-v2-pergamon-labs.vercel.app`; **keep `v2` synced by merging `main` into it after each push**. Branch previews sit behind Vercel Deployment Protection until the owner sets it to "Only Production Deployments". Domain `gcchk-esg.com` not yet connected.

## Local development

```
node scripts/dev-server.js          # http://localhost:4321 — serves V1+V2 and mirrors /api incl. gating
```
Keep `scripts/dev-server.js` query/gating logic in sync with `api/content.js`.

## Testing

```
# jsdom lives outside the repo (no package.json — keeps Vercel static). From a dir with `npm i jsdom`:
NODE_PATH=$PWD/node_modules node <repo>/scripts/verify-site.js   # script.js logic vs index.html (hub), ~70 assertions
NODE_PATH=$PWD/node_modules node <repo>/scripts/verify-v2.js     # all pages + CBAM engine + committee decisions, ~345 assertions
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

## Open items (Sep 2026)

**Run `SANITY_TOKEN=<editor token> node scripts/seeds/seed-news-sep26.js`** — the verified Sep 2026 briefing refresh (4 new posts incl. the greenwashing-ban lead, updates to 4 stale posts, dash cleanup of all CMS text) is committed but unseeded; the owner holds the token. Then: flip Vercel Deployment Protection so the `v2` branch review URL is shareable · real committee photo for the Team page (AI-generated people rejected) · Chamber legal review of `privacy.html` (ZH floor + contact address were corrected in code) · own Impressum page · rotate the Sanity editor token (shared in chat twice) · Supabase go-live before the member area can launch · domain `gcchk-esg.com` + Resend · Sanity Studio · analytics · native VI review (VI strings kept but selector-hidden) · committee discussions: compass role model, GIC/imprint responsibility. Full history: `PROJECT-LOG.md`.
