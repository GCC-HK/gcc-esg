// Local review server — mimics the Vercel deployment without any accounts.
//   node scripts/dev-server.js        → http://localhost:4321
//
// Mirrors the /api routes (keep the logic in sync with api/*.js):
//   /api/content     → live content from Sanity, incl. access gating
//   /api/auth-config → Supabase public config (503 until env vars set)
//   /api/subscribe   → 503 without RESEND_API_KEY ("sign-up opens soon")
//
// To test the member area locally:
//   SUPABASE_URL=... SUPABASE_ANON_KEY=... node scripts/dev-server.js

const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 4321;
const ROOT = path.join(__dirname, '..');

const PROJECT = 'bvmxf21v';
const DATASET = 'production';
const API_VERSION = 'v2024-01-01';

const NEWS_FIELDS = 'titleEn,titleZh,"slug":slug.current,publishedAt,pillar,whatHappenedEn,whatHappenedZh,whyItMattersEn,whyItMattersZh,supplierActionEn,supplierActionZh,sources,accessLevel,imageUrl,imageCredit,"hasBody":defined(bodyEn)';

const QUERIES = {
    regulations: '*[_type=="regulation"]{regId,name,ref,status,inForce,complianceDeadline,lastReviewed,eurlex,sections,categories,roles,sizes,reasonEn,reasonZh,accessLevel}',
    news: `*[_type=="newsPost"]|order(publishedAt desc)[0...12]{${NEWS_FIELDS}}`,
    deadlines: '*[_type=="deadline"]|order(date asc){labelEn,labelZh,date,affects,affectsZh,confidence,regId}'
};

const LEVEL_RANK = { public: 0, registered: 1, premium: 2 };
const TIER_RANK = { public: 0, registered: 1, member: 2 };

async function viewerTier(req) {
    const url = process.env.SUPABASE_URL;
    const anonKey = process.env.SUPABASE_ANON_KEY;
    const auth = req.headers.authorization;
    // Demo mode (mirrors api/content.js): only while Supabase is unconfigured
    if (!url || !anonKey) {
        const demo = req.headers['x-demo-tier'];
        return demo === 'member' || demo === 'registered' ? demo : 'public';
    }
    if (!auth) return 'public';
    try {
        const r = await fetch(`${url}/auth/v1/user`, { headers: { apikey: anonKey, Authorization: auth } });
        if (!r.ok) return 'public';
        const user = await r.json();
        return user && user.app_metadata && user.app_metadata.tier === 'member' ? 'member' : 'registered';
    } catch (e) { return 'public'; }
}

const canView = (tier, lvl) => TIER_RANK[tier] >= (LEVEL_RANK[lvl || 'public'] || 0);

const lockPost = p => ({
    titleEn: p.titleEn, titleZh: p.titleZh, slug: p.slug, publishedAt: p.publishedAt,
    pillar: p.pillar, accessLevel: p.accessLevel, imageUrl: p.imageUrl, imageCredit: p.imageCredit,
    hasBody: p.hasBody, locked: true,
    teaserEn: (p.whatHappenedEn || '').slice(0, 150) + '…',
    teaserZh: (p.whatHappenedZh || '').slice(0, 80) + '…'
});

async function sanityQuery(query, params) {
    let url = `https://${PROJECT}.apicdn.sanity.io/${API_VERSION}/data/query/${DATASET}?query=${encodeURIComponent(query)}`;
    if (params) for (const [k, v] of Object.entries(params)) url += `&$${k}=${encodeURIComponent(JSON.stringify(v))}`;
    const r = await fetch(url);
    if (!r.ok) throw new Error(`sanity ${r.status}`);
    return (await r.json()).result;
}

const MIME = {
    '.html': 'text/html; charset=utf-8', '.css': 'text/css; charset=utf-8',
    '.js': 'text/javascript; charset=utf-8', '.json': 'application/json',
    '.svg': 'image/svg+xml', '.png': 'image/png', '.jpg': 'image/jpeg',
    '.jpeg': 'image/jpeg', '.webp': 'image/webp', '.ico': 'image/x-icon'
};

const json = (res, status, body) => {
    res.writeHead(status, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(body));
};

const server = http.createServer(async (req, res) => {
    const url = new URL(req.url, `http://localhost:${PORT}`);

    if (url.pathname === '/api/auth-config') {
        const u = process.env.SUPABASE_URL, k = process.env.SUPABASE_ANON_KEY;
        if (!u || !k) return json(res, 503, { error: 'not_configured' });
        return json(res, 200, { url: u, anonKey: k });
    }

    if (url.pathname === '/api/content') {
        const type = url.searchParams.get('type');
        try {
            if (type === 'article') {
                const slug = url.searchParams.get('slug');
                if (!slug) return json(res, 400, { error: 'missing_slug' });
                const post = await sanityQuery(`*[_type=="newsPost" && slug.current==$slug][0]{${NEWS_FIELDS},bodyEn,bodyZh}`, { slug });
                if (!post) return json(res, 404, { error: 'not_found' });
                const tier = await viewerTier(req);
                return json(res, 200, canView(tier, post.accessLevel) ? { ...post, locked: false } : lockPost(post));
            }
            const query = QUERIES[type];
            if (!query) return json(res, 400, { error: 'unknown_type' });
            let data = await sanityQuery(query);
            if (type === 'news') {
                const tier = await viewerTier(req);
                data = (data || []).map(p => canView(tier, p.accessLevel) ? { ...p, locked: false } : lockPost(p));
            }
            return json(res, 200, data || []);
        } catch (e) {
            return json(res, 500, { error: 'internal_error' });
        }
    }

    if (url.pathname === '/api/subscribe') {
        if (req.method !== 'POST') return json(res, 405, { error: 'method_not_allowed' });
        if (!process.env.RESEND_API_KEY) return json(res, 503, { error: 'not_configured' });
        return json(res, 200, { ok: true, confirmation: false });
    }

    // --- static files ---
    let filePath = path.join(ROOT, decodeURIComponent(url.pathname));
    if (url.pathname === '/' || url.pathname === '') filePath = path.join(ROOT, 'index.html');
    if (!filePath.startsWith(ROOT)) { res.writeHead(403); return res.end(); }
    fs.readFile(filePath, (err, buf) => {
        if (err) { res.writeHead(404); return res.end('Not found'); }
        res.writeHead(200, { 'Content-Type': MIME[path.extname(filePath)] || 'application/octet-stream' });
        res.end(buf);
    });
});

server.listen(PORT, () => {
    console.log(`GCC Green Future review server → http://localhost:${PORT}`);
});
