// GET /article?slug=... (rewritten here via vercel.json)
// Serves article.html with per-article <title> and Open Graph tags injected,
// so shared links show the real headline and image on WhatsApp/LinkedIn/WeChat.
// Body content is still rendered client-side with access gating.

import { readFileSync } from 'fs';
import { join } from 'path';

const PROJECT = 'bvmxf21v';
const DATASET = 'production';

let template = null;
function getTemplate() {
    if (!template) template = readFileSync(join(process.cwd(), 'article.html'), 'utf8');
    return template;
}

const esc = s => String(s || '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

export default async function handler(req, res) {
    let html = getTemplate();
    const slug = req.query.slug;
    try {
        if (slug) {
            const q = '*[_type=="newsPost" && slug.current==$slug][0]{titleEn,whatHappenedEn,imageUrl}';
            const url = `https://${PROJECT}.apicdn.sanity.io/v2024-01-01/data/query/${DATASET}?query=${encodeURIComponent(q)}&$slug=${encodeURIComponent(JSON.stringify(slug))}`;
            const r = await fetch(url);
            if (r.ok) {
                const post = (await r.json()).result;
                if (post) {
                    const title = esc(post.titleEn);
                    const desc = esc((post.whatHappenedEn || '').slice(0, 180));
                    const proto = req.headers['x-forwarded-proto'] || 'https';
                    const host = req.headers['x-forwarded-host'] || req.headers.host;
                    const img = post.imageUrl ? `${proto}://${host}/${post.imageUrl}` : '';
                    html = html.replace(/<title>[^<]*<\/title>/, `<title>${title} – GREEN FUTURE</title>`);
                    const og = [
                        `<meta property="og:title" content="${title}">`,
                        `<meta property="og:description" content="${desc}">`,
                        `<meta name="description" content="${desc}">`,
                        `<meta property="og:type" content="article">`,
                        img ? `<meta property="og:image" content="${img}">` : '',
                        `<meta name="twitter:card" content="summary_large_image">`
                    ].filter(Boolean).join('\n    ');
                    html = html.replace('</head>', `    ${og}\n</head>`);
                }
            }
        }
    } catch (err) {
        console.error('article-page meta error:', err);
        // fall through with the plain template
    }
    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    res.setHeader('Cache-Control', 's-maxage=600, stale-while-revalidate=86400');
    return res.status(200).send(html);
}
