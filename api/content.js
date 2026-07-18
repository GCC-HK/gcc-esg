// GET /api/content?type=regulations|news|deadlines
// Server-side proxy to Sanity's public CDN API. Avoids browser CORS entirely
// and gives us one place to enforce access levels (registered/premium) later.
// The dataset is public, so no token is required for published content.

const PROJECT = 'bvmxf21v';
const DATASET = 'production';
const API_VERSION = 'v2024-01-01';

const QUERIES = {
    regulations: '*[_type=="regulation"]{regId,name,ref,status,inForce,complianceDeadline,lastReviewed,eurlex,sections,categories,roles,sizes,reasonEn,reasonZh,accessLevel}',
    news: '*[_type=="newsPost"]|order(publishedAt desc)[0...8]{titleEn,titleZh,"slug":slug.current,publishedAt,pillar,whatHappenedEn,whatHappenedZh,whyItMattersEn,whyItMattersZh,supplierActionEn,supplierActionZh,sources,accessLevel}',
    deadlines: '*[_type=="deadline"]|order(date asc){labelEn,labelZh,date,affects,affectsZh,confidence,regId}'
};

export default async function handler(req, res) {
    const query = QUERIES[req.query.type];
    if (!query) {
        return res.status(400).json({ error: 'unknown_type' });
    }
    try {
        const url = `https://${PROJECT}.apicdn.sanity.io/${API_VERSION}/data/query/${DATASET}?query=${encodeURIComponent(query)}`;
        const r = await fetch(url);
        if (!r.ok) {
            console.error('Sanity error:', r.status, await r.text());
            return res.status(502).json({ error: 'content_unavailable' });
        }
        const data = await r.json();
        // CDN-cache for 10 min; serve stale for a day while revalidating
        res.setHeader('Cache-Control', 's-maxage=600, stale-while-revalidate=86400');
        return res.status(200).json(data.result || []);
    } catch (err) {
        console.error('content proxy error:', err);
        return res.status(500).json({ error: 'internal_error' });
    }
}
