# GCC Green Future — Deployment & Services Setup

Domain: **gcchk-esg.com** (registered at Hostinger)
Stack: static site + Vercel serverless functions (`/api`) + Sanity CMS (content) + Resend (email)

## One-time setup checklist

### 1. Vercel
- [ ] vercel.com → sign up with GitHub → Import `GCC-HK/gcc-esg` → framework "Other", no build command → Deploy

### 2. Domain → Vercel
- [ ] Vercel project → Settings → Domains → add `gcchk-esg.com` (+ `www.gcchk-esg.com`)
- [ ] Hostinger → Domains → gcchk-esg.com → Nameservers → change to `ns1.vercel-dns.com`, `ns2.vercel-dns.com`
- (Alternative: keep Hostinger DNS; add A record `@ → 76.76.21.21`, CNAME `www → cname.vercel-dns.com`)

### 3. Resend (after nameservers switched)
- [ ] resend.com → Domains → Add `send.gcchk-esg.com` → add the shown DKIM/SPF/MX records in Vercel DNS → wait for "Verified"
- [ ] API Keys → create key
- [ ] Audiences → create "Weekly Briefing" → note the Audience ID

### 4. Sanity — DONE (18 July 2026)
- [x] Project "GCC ESG" created — Project ID `bvmxf21v`, dataset `production` (public)
- [x] Seeded with 15 regulations, 14 deadlines, 4 demo news posts
- Schemas for the studio live in `sanity/schemas/` (regulation, newsPost, deadline)
- The site reads content through `/api/content` (server-side proxy) — no CORS setup or token needed for published content
- ⚠️ The API token used for seeding passed through chat — rotate it at sanity.io/manage → API → Tokens when convenient. It is not stored in the repo.
- To edit content: either use a deployed Sanity Studio (Step 4 of the project roadmap) or re-run a seed script with an editor token

### 5. Supabase (member area / sign-in)
- [ ] supabase.com → New project (name "gcc-green-future", region Singapore, free tier)
- [ ] Project Settings → API: copy the **Project URL** and the **anon public key**
- [ ] Add both to Vercel env vars (below). That's all — magic-link email sign-in works out of the box (Supabase's built-in mailer; switch to Resend SMTP at go-live for deliverability)
- [ ] **Granting member access:** Supabase Dashboard → Authentication → Users → select user → edit App Metadata → `{"tier": "member"}`. Registered users need no action.
- Content tiers are set per post/regulation in Sanity via the `accessLevel` field (`public` / `registered` / `premium`). Gating is enforced server-side in `/api/content` — locked text never reaches the browser.
- Local testing: `SUPABASE_URL=... SUPABASE_ANON_KEY=... node scripts/dev-server.js`

### 6. Vercel environment variables (Project → Settings → Environment Variables)
| Variable | Value |
|---|---|
| `SUPABASE_URL` | from Supabase Settings → API |
| `SUPABASE_ANON_KEY` | from Supabase Settings → API (anon public) |
| `RESEND_API_KEY` | from Resend |
| `RESEND_AUDIENCE_ID` | from Resend Audiences |
| `RESEND_FROM` | `GCC Green Future <briefing@send.gcchk-esg.com>` |

Notes:
- Until `RESEND_API_KEY` is set, `/api/subscribe` returns 503 and the site shows a friendly "sign-up opens soon" message — safe to deploy at any time.
- Until `RESEND_FROM` is set, confirmations go out from `onboarding@resend.dev`, which only delivers to the Resend account owner (test mode).
- Email sends from the `send.` subdomain to isolate newsletter reputation from the root domain.
