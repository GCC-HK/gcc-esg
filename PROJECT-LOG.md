# GREEN FUTURE — Project Log

Detailed record of the build, decisions and verifications. Newest phase last. Commits reference `git log`.

---

## Phase 0 — Starting point (before 18 July 2026)

Single static page ("GCC Sustainability Compliance Atlas", commit `23c36be`): EN/ZH regulation filter with 12 hardcoded EU regulations, HS-code lookup, CBAM estimator, generic marketing sections, fake email form. No backend, no CMS, no deployment.

## Phase 1 — Full review & fact-check (18 Jul, commit `7da696f`)

Three parallel research passes verified every factual claim against official sources (EUR-Lex, Commission, Council, law-firm briefings). **Findings — roughly half the entries were wrong or outdated:**

- EUDR dates two postponements old → corrected to 30 Dec 2026 / 30 Jun 2027 (Reg. (EU) 2025/2650); cotton/textiles wrongly claimed in scope → removed.
- Batteries Reg. milestones wrong → labelling 18 Aug 2026, passport 18 Feb 2027, due diligence 18 Aug 2027 (Reg. (EU) 2025/1561); carbon-footprint delegated act still pending.
- CSRD/CSDDD updated to post-Omnibus-I status (Directive (EU) 2026/470): FY2027 first reporting; risk-based (not Tier-1) due diligence; 3% penalty cap; EU civil-liability regime deleted.
- Green Claims Directive marked stalled (withdrawal announced Jun 2025); Empowering Consumers Directive (EU) 2024/825 (applies 27 Sep 2026) and Textiles EPR (Directive (EU) 2025/1892) added as missing entries.
- CBAM calculator rebuilt: Q2 2026 certificate price €75.28; current benchmarks (old ones were 2013–2020 ETS values); aluminium corrected to direct-only emissions (~1.5 vs 6.7 t/t — fourfold overstatement removed); origin carbon prices corrected (UK ~€66, Japan ~€12, India €0); **50 t/year de-minimis check** added (Reg. (EU) 2025/2083); Atlas CBAM trigger restricted to construction (finished electronics/furniture are not CBAM goods).
- Right to Repair in-force date, ESPR/DPP first wave (textiles+furniture, not electronics), Toy Safety Reg. (EU) 2025/2509 reference — all fixed.

Also in this phase: renamed to **Green Sourcing Compass** (avoids the owner's "Atlas" product names) and rebuilt as a 3-step wizard with ACT NOW / PREPARE / WATCH result groups; **Sanity CMS** (project `bvmxf21v`) created and seeded (15 regulations, 14 radar deadlines, 4 demo news posts); `/api/content` proxy (avoids CORS, later the gating point); real subscribe endpoint for Resend with GDPR consent checkbox; `vercel.json`; SETUP.md. Local review server `scripts/dev-server.js`. Decisions: Sanity as CMS, Resend for email, Vercel hosting, domain gcchk-esg.com (Hostinger) purchased.

## Phase 2 — Visual redesign rounds (18 Jul, commits `11dd54c`–`4222867`)

- Deadline Radar regrouped into color-coded urgency columns; dark CBAM band; "Where Should I Start?" guided-entry tiles (persona: manufacturer who doesn't know the terminology); TV-style hero news ticker (click → article).
- **AHK CI hybrid** (user decision: keep green lead, adopt CI elements): Source Serif 4 / Source Sans 3, CI accent colors, AHK logo, facet backgrounds. Sourced from the AHK Corporate Design Manual 2023 and the GCC leaflet in `input/`.
- **About the Committee** section: official Sustainability Committee positioning, team photo, member logos (extracted from leaflet PDF at high resolution). Member roster updated per Co-Chair: OBI/otto/METRO out; later ALDI, REWE Far East, Tchibo, Conrad Electronic added (`feb41d1`) — Conrad from Wikimedia (public-domain SVG).
- Site-wide rebrand Working Group → **Sustainability Committee** (EN+ZH, incl. confirmation email).
- Briefing redesigned as a **newspaper front page** (masthead, dateline, kickers, lead + columns); "Book a Consultation" CTA removed (no such service); logo sizing balanced; hero copy sharpened to "EU Sustainability Rules, Explained for Asian Suppliers." with working "Check My Products" CTA; urgency bar removed; CBAM section titled "CBAM Calculator".

## Phase 3 — Content depth (18 Jul, commits `769a4bb`, `5bc2f4b`)

- Section icon medallions, later large custom SVG illustrations (compass rose, calculator, radar dial) in brand palette — hand-drawn to avoid licensing issues.
- **Regulation sub-pages** (`regulation.html?id=`) rendered from Sanity; radar deadlines and Compass cards link to them.
- **Six verified news items with source links** (researched + corroborated): EU ETS easing proposal of 17 Jul (the Economist story, corroborated via Reuters — implies slower CBAM phase-in), CBAM 457-product extension vote (ENVI 6 Jul), EUDR delegated/implementing acts (13 Jul), Forced Labour guidelines + Single Portal (26 Jun), PPWR PFAS/heavy-metal specifics, German Right-to-Repair implementation. Every post carries clickable sources.
- Wording de-pressured on request: "weekly" → "regular/latest" everywhere; ticker badge "LATEST NEWS"; GCCHK junk-boat logo replaces AHK logo in nav (`891c067`).

## Phase 4 — Member area (18 Jul, commits `0b755ef`, `0ed116a`)

- Three tiers: public / registered (free email magic-link) / member (Committee-granted). **Server-side gating** in `/api/content` — locked posts leave the server as teasers only. Supabase chosen for auth (magic links; not yet configured).
- `account.html` sign-in, `article.html` full-article pages (portable-text body), locked-card UI, nav Sign-in.
- Flagship premium content: "CBAM 457-product screening guide".
- Topic images on all posts (owned licensed stock + license-checked Wikimedia, credits stored).
- **Demo preview mode** (user request: leadership must see both areas without accounts): "Preview as Registered/Member" buttons; the preview header is honoured by the server **only while Supabase is unconfigured** — configuring real auth disables it automatically.

## Phase 5 — Critical UX review, all 10 fixes (19 Jul, commits `3ebca0e`, `13dae37`)

Self-review found and fixed: mobile sign-in missing from hamburger; radar column imbalance (rebalanced 5/4/5, thresholds 180/420 days); junk-boat favicon; **bilingual privacy policy** (draft, pending Chamber legal review) linked from consent checkbox; Chinese translations for all regulation detail sections and the member guide; **`/article` route with server-injected OG tags** (shared links show real headline/image); images 2.7→1.2 MB with CLS-safe dimensions; illustrative case studies removed (return only as real member cases); instant de-minimis hint on the calculator volume field; accessibility (focus-visible, aria-pressed, tap-to-pause ticker). Briefing columns balanced dynamically (lead column carries follow-up stories).

## Phase 6 — Regulation coverage expansion (19 Jul, commits `2ce16fb`, `eb90fb1`)

User direction: prioritise recent/upcoming rules over well-known old ones. Verified and added **five entries** (now 20 total): **GPSR** (biggest gap — EU responsible person; German ProdSG fines since Feb 2026), **UK CBAM** (verification corrected the legal vehicle to Finance Act 2026; from 1 Jan 2027; radar deadline added), **Toy Safety Regulation (EU) 2025/2509**, **German LkSG** (carefully worded: due diligence in force, reporting dead since Nov 2025, amendment "in final parliamentary passage" — not "passed"), **US UFLPA** (144-entity list; FY2025 stats; Aug 2025 priority sectors). Added **NEW/UPDATED badges**, newest-first sorting, and **market-specific matching** (UK/US checkboxes now functional). Watch-list posts added to the briefing (verified): new Product Liability Directive (German bill in Bundestag; applies 9 Dec 2026), universal PFAS restriction (RAC final Mar 2026, SEAC final expected end-2026), REACH revision delay. Committee photo fixed (root cause: width/height attributes + `width:100%` CSS stretching; global `img { height:auto }`).

## Phase 7 — Four languages (19 Jul, commit `2ef35d1`)

User decision: full German + Vietnamese; **news stays EN/ZH** (90% of suppliers in China). Implementation: language dropdown (EN/中文/DE/VI); CSS `:has()`-based English fallback for untranslated content; removal of inline-style language toggling (fixed a latent stuck-language bug); ~166 static strings ×2 languages on index plus all sub-pages incl. full privacy policy; all dynamic labels; CMS `textDe/textVi` + `reasonDe/reasonVi` for all 20 regulations. Sub-page agent also found and fixed a script-breaking remnant in regulation.html. Caveats: Vietnamese pending native review; CMS date-display strings remain EN in DE/VI.

## Phase 8 — Member value package (19 Jul, commits `dc51e23`, `4a09152`)

User feedback: public/member difference was invisible (only 3 unlocked articles). Built visible member value: **Member Resource Library** section (blue member-zone design; 3 in-depth guides — CBAM 457 screening, CBAM data checklist, GPSR responsible-person setup; locked teaser cards for public); **buyer-ready PDF export** on the calculator (print-optimised branded report, member-only); **.ics calendar download** of all deadlines on the radar (member-only). `memberView()` reads demo tier or Supabase session metadata. Language pill filled green. Demo walkthrough: public page → four locked touchpoints → Sign in → Preview as Member → everything opens.

---

## Phase 9 — Full fact-audit & corrections (11 Aug 2026)

Trigger: committee member challenged the correctness of quoted legal standards. Ran a five-agent verification of all 20 regulations, 15 deadlines, 14 news posts and the CBAM calculator against primary sources (EUR-Lex, Commission, DHS/CBP, gov.uk, Bundestag). Result: ~90% verified correct (incl. all Omnibus/Dir (EU) 2026/470 facts and the €75.28 Q2-2026 CBAM price), 8 substantive errors + ~8 stale items found. Fixes: `scripts/seeds/seed-corrections-aug26.js` (4-language Sanity patches: CBAM definitive-phase penalties €100/t; UFLPA 187 entities per 3 Aug 2026 expansion; EUDR first-placer DDS + July DA leather removal; LkSG 1 Jul 2026 coalition narrowing plan; RoHS 10 substances; battery label/QR dates; R2R post-deadline update; CSRD German transposition framing; REACH news post fully reframed — revision was cancelled 27 Apr 2026; GPSR "postal AND electronic address"; battery-labelling deadline row deleted). Calculator: benchmarks aligned to finalized IR 2025/2620 (steel BF-BOF 1.370, new DRI-EAF route 0.481, scrap-EAF 0.072, alu 1.423/0.091, cement 0.83, ammonia 1.522), GB carbon price 66→60, UA 1→0.6, disclaimer notes China default ≈3.17 and the Jul 2026 ETS-review caveat on the 2034 phase-out. Flagship test figure changed €51.13 → **€43.36/t** (verify-site.js updated, all checks green). Hydrogen benchmark still ETS-derived indicative — verify against IR 2025/2620 Annex I. Seed run against production same day (14 regulations patched, 1 deadline deleted + 3 patched, 3 news posts re-framed, 3 body fixes) and verified live via API spot-checks (CBAM penalties, UFLPA 187, deadline radar 14 rows, REACH title, GPSR wording EN/ZH, LkSG DE coalition note). New DE/VI strings from this round need the same native review as the rest of the site.

## Phase 10 — V2 platform: hub + subpages (11–13 Aug 2026)

Committee feedback drove a parallel redesign (V1 kept as baseline). Market research (11 offerings: Access2Markets, Compliance Gate, Intertek GMA, EcoVadis, cbamguide et al.) found an empty quadrant: free product-first matching + action guidance + forwardable export. Owner chose Option B (hub + subpages) over a disciplined one-pager. Built: `v2.html` hub (persona doors supplier/merchandiser, tool cards, live deadline/news previews) + 6 subpages via `scripts/build-v2-pages.js` (shared master DOM, per-page visibility — `script.js` untouched). Features per feedback rounds: express finder table for merchandisers + CSV "Regulatory Sheet" export (BOM, EN+ZH, disclaimer row) · wizard auto-advance · color-coded ACT NOW/PREPARE/WATCH banners with counts · point-of-use disclaimers · guides page member gate · slim chamber-style footer (real contacts — the gcc-sustainability@ email never existed; address corrected to 2302, 23/F COFCO) · plain-language nav (Regulations/News/Deadlines) · centered page tops (hub hero stays left) · sans-only typography · unified heading colors · news band homepage-only, 3 headlines, 60s, dead-click bug fixed (script.js's preventDefault + querySelector-on-URL). Tests: `scripts/verify-v2.js` (~100 assertions).

## Phase 11 — CBAM engine v3 (15 Aug 2026)

All four accuracy upgrades approved and built, data parsed directly from EUR-Lex OJ texts: official country default values (IR 2025/2621 **as corrected by IR 2026/1740**, retroactive to 1 Jan 2026; base values excl. mark-up; Annex route flags select benchmarks; regulation's own "Other Countries" fallback), corrected benchmarks (cement 0.83→**0.666**, hydrogen 6.84→**5.089** closing gap V3; urea bucket 0.902; alu add-on tiers 0.056/0.060/0.166), factor schedule 2026–2034 verbatim from Dir. 2003/87/EC Art. 10a(1a) with year selector + projection chart (±€20 band), carbon-price-actually-paid input. Headline shift: CN BOF steel default now **€141.65/t** vs €43.36/t with verified data — the data-pack value message. Full parsed Annex I (12,949 rows) kept in `scripts/seeds/`. Methodology doc rebuilt as real .docx (python-docx pipeline: `scripts/cbam-methodology-source.html` → `scripts/build-cbam-docx.py`), v3.1 with logic-verification supplement for committee review.

## Phase 12 — Two-version deployment (14 Aug 2026)

`main` → production (V1 at `/`, V2 at `/v2`, live-verified: 22 ticker items, radar, gating, calculator math). Branch `v2` (root rewrite → hub) → separate stable URL `gcc-esg-git-v2-pergamon-labs.vercel.app` for committee review — **blocked by Vercel Deployment Protection until owner sets it to "Only Production Deployments"**. Sync rule: merge `main` into `v2` after each push.

## Phase 13 — Committee review round + V2 replaces V1 (4–5 Sep 2026)

Jill Dessel (REWE Far East) left 50 Webvizio comments on the V2 preview (project gcc-esg.vercel.app, guest link). All reviewed with accept/reject opinions; owner decided. Implemented: hero rewritten ("Navigating EU Sustainability Requirements", Chamber-committee subhead, "free" removed, eyebrow "EU as target market") · requirements-not-rules terminology sweep (compass, buttons, FAQ, tool cards; script.js untouched — V2 overrides in v2.js) · nav: CBAM→Tools, About shortened, sign-in removed, VI parked (spans retained) · always-on legal topline (#29) · personas prominent with her 2-role copy + step chips + pulse (guided-nav v1) · CBAM: roles "CBAM Supplier"/"EU Importer", CN code mandatory w/ sector plausibility check, verification notes, price-basis note, "Estimate CBAM Costs" · calculator + member library announced-but-locked ("launching soon" badges; guides gate = coming-soon, no sign-in) · voluntary certs moved compass→Learn · glossary (10 terms) on Learn · FAQ: funding answer de-promised, supplier-vs-importer deadline lead-time added (her best point, also as radar note), EUR-Lex/Commission links, "certifications are NOT enough" · US market removed (EU/DE/UK kept per owner override of her UK-removal ask) · HS field accepts CN codes · multi-category comparison matrix w/ checkmarks + CSV (#28) · mini-deadline chips show dates · news naming unified "Latest News" · CTA band/about link to Chamber site instead of "Join the Committee" (join CTA lives in the member gate). Rejected: AI-generated committee photo (fabricated imagery), nav renaming to "Regulatory Compass". Platform renamed **Green Sourcing Hub** (owner confirmed 5 Sep 2026; SustainAbility dropped over the ERM trademark collision). Still open with committee: GIC/imprint, role model discussion, real committee photo.

**V2 replaces V1 (owner decision 5 Sep 2026):** hub now generated to `index.html` (+`v2.html` alias), "[V2 Preview]" titles and ribbon dropped, dev server got cleanUrls parity. V1 one-pager retired to git history; `verify-site.js` repointed at the new index (V1 subscribe-form checks retired, stale fixture date made dynamic). Both suites green (~70 + ~190 assertions).

## Standing operational notes

- **Sanity editor token was shared via chat during setup and again on 11 Aug 2026 — rotate it now** (sanity.io/manage → API → Tokens) and use env vars only.
- Dreamstime stock usage confirmed licensed for web by the owner (18 Jul).
- Verification suite: `scripts/verify-site.js` (jsdom, ~70 assertions) — kept green throughout; visual QA via Playwright screenshots (desktop/mobile/all languages).
- Email drafts for the ESG Committee and Chamber leadership prepared (see chat, 19 Jul); board ask: 20 min + mandate for the business case; second Co-Chair election upcoming (Anna leaving).
- Monetization concept (not yet built): membership-included premium tier, calculator pro reports, supplier-enablement packages for sourcing offices, sponsorships, annual report, possible German project funding.
