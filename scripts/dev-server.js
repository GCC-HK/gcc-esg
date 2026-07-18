// Local review server — mimics the Vercel deployment without any accounts.
//   node scripts/dev-server.js        → http://localhost:4321
//
// Serves the static site and mirrors the two /api routes:
//   /api/content    → live content from Sanity (same queries as api/content.js)
//   /api/subscribe  → same behaviour as api/subscribe.js; without
//                     RESEND_API_KEY it returns 503 ("sign-up opens soon"),
//                     exactly like the un-configured production deployment.

const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = process.env.PORT || 4321;
const ROOT = path.join(__dirname, '..');

// Keep in sync with api/content.js
const PROJECT = 'bvmxf21v';
const DATASET = 'production';
const API_VERSION = 'v2024-01-01';
const QUERIES = {
    regulations: '*[_type=="regulation"]{regId,name,ref,status,inForce,complianceDeadline,lastReviewed,eurlex,sections,categories,roles,sizes,reasonEn,reasonZh,accessLevel}',
    news: '*[_type=="newsPost"]|order(publishedAt desc)[0...8]{titleEn,titleZh,"slug":slug.current,publishedAt,pillar,whatHappenedEn,whatHappenedZh,whyItMattersEn,whyItMattersZh,supplierActionEn,supplierActionZh,sources,accessLevel}',
    deadlines: '*[_type=="deadline"]|order(date asc){labelEn,labelZh,date,affects,affectsZh,confidence,regId}'
};

const MIME = {
    '.html': 'text/html; charset=utf-8',
    '.css': 'text/css; charset=utf-8',
    '.js': 'text/javascript; charset=utf-8',
    '.json': 'application/json',
    '.svg': 'image/svg+xml',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.ico': 'image/x-icon'
};

const json = (res, status, body) => {
    res.writeHead(status, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(body));
};

const server = http.createServer(async (req, res) => {
    const url = new URL(req.url, `http://localhost:${PORT}`);

    // --- /api/content ---
    if (url.pathname === '/api/content') {
        const query = QUERIES[url.searchParams.get('type')];
        if (!query) return json(res, 400, { error: 'unknown_type' });
        try {
            const r = await fetch(`https://${PROJECT}.apicdn.sanity.io/${API_VERSION}/data/query/${DATASET}?query=${encodeURIComponent(query)}`);
            if (!r.ok) return json(res, 502, { error: 'content_unavailable' });
            const data = await r.json();
            return json(res, 200, data.result || []);
        } catch (e) {
            return json(res, 500, { error: 'internal_error' });
        }
    }

    // --- /api/subscribe (mirrors un-configured production: 503 without key) ---
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
