# Handover brief: building a sister platform for another GCC committee

Written for a fresh Claude Code session that should review the ESG Sourcing Hub and
propose a plan for a similar platform for another committee (e.g. the AI Committee).
Read this first, then `CLAUDE.md` (all standing rules and architecture), then
`PROJECT-LOG.md` (20 phases of decision history). The live product is
https://gcc-esg.vercel.app.

## What this platform is

EU sustainability compliance platform by the GCC ESG Committee (German Chamber of
Commerce, Hong Kong). Audience: Hong Kong sourcing offices of German/European
retailers and their manufacturers in Asia. Fully open (a member-gating experiment
was built and reversed on 2026-09-10, see PROJECT-LOG phases 17-20; the layered
gating model survives in git history if ever needed again).

## Architecture worth copying as-is

- **Static HTML/CSS/vanilla JS, no build step at deploy.** One master file
  (`v2.html`) generates all subpages via `scripts/build-v2-pages.js`; every page
  carries the full DOM, a per-page style block controls section visibility.
  Cheap to host (Vercel free tier), trivial to reason about, no framework churn.
- **Content lives in Sanity CMS** (free tier, public read) with a serverless
  proxy (`api/content.js`) that adds access gating; the site works offline/pre-seed
  through built-in fallback data. Content edits happen through re-runnable seed
  scripts with deterministic ids (`scripts/seeds/`), which doubles as version
  control for content.
- **Four-language span system** (`lang-en/zh/de/vi` siblings, CSS-toggled, English
  fallback via `:has()`), no i18n framework.
- **Verification culture:** two jsdom test suites (~485 assertions total) pin every
  committee decision and worked example; a render sweep exercises every content
  page in every mode; Playwright for visual/mobile checks. Every factual claim is
  verified against official sources before seeding, with `lastReviewed` dates.
- **Detail-page pattern:** `v2-regulation.html?id=<x>` renders from shared data +
  a per-topic depth file (`v2-reg-details.js`: role-split guidance, action
  checklist, documents, sources). This "catalogue + depth entries" pattern maps
  directly to an AI Committee equivalent (e.g. AI regulations / use cases).
- **Dev server** (`scripts/dev-server.js`) mirrors the API incl. gating locally.

## Hard-won rules that transfer to any sister platform

- Committee platform, not the Chamber's official website (footer disclaimer; no
  Chamber logo without marketing sign-off). No invented contacts: only
  info@hongkong.ahk.de exists.
- Plain names in navigation; product names only as page mastheads.
- British English in all copy; no dash punctuation (committee rule).
- Disclaimers at point of use; "general information, not legal advice" topline.
- Features may be announced-but-locked, never silently removed; no false
  expectations (membership, joining the committee).
- Never use "green"/"sustainability" in a brand name (EmpCo optics + trademark
  history); check trademark collisions before naming anything.
- Real photos only, no AI-generated people (Chamber credibility).
- Mobile: submenus are accordions, panels scroll; test at 390px before shipping.

## What is ESG-specific (replace for a new committee)

The regulation dataset and CBAM calculator engine (`v2-cbam-*.js`, deep OJ-sourced
data discipline), the deadline radar content, news posts, certifications page,
glossary content, and the product family names (ESG Sourcing Hub / Compass /
Briefing). The *shapes* (checker tool, deadline radar, news briefing, glossary,
detail pages) are all reusable; an AI Committee analogue might be: EU AI Act
obligations checker by role/risk class, AI regulation deadline radar, AI policy
briefing, model/vendor evaluation guides.

## Suggested first steps for the new session

1. Read CLAUDE.md + PROJECT-LOG.md here, browse the live site (desktop + mobile).
2. Interview the owner: AI Committee's audience, the 3 questions that audience
   asks most, what the committee can credibly answer, naming (checked for
   trademarks), which committee members will review (the Webvizio review loop
   worked well here).
3. Propose: information architecture, which ESG Hub components to fork vs drop,
   content plan with verified sources (EU AI Act, GPAI codes, standards), and a
   phased build (this platform went hub-first, tools later; that ordering worked).
4. Start from a fresh copy of this repo (new GitHub repo + Vercel project + Sanity
   project), strip ESG content, keep the generator/test/i18n skeleton.
