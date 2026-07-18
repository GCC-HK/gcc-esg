// GET /api/content?type=regulations|news|deadlines
// GET /api/content?type=article&slug=<slug>
//
// Server-side proxy to Sanity's public CDN API plus the access-control layer:
// content marked accessLevel "registered" or "premium" is only returned in
// full to signed-in viewers (Supabase session token in the Authorization
// header). Locked items come back as teasers — full text never reaches the
// browser without authorization.
//
// Viewer tiers: public (no/invalid session) < registered (any valid session)
// < member (user.app_metadata.tier === "member", granted manually by the
// Committee in the Supabase dashboard).

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
    if (!url || !anonKey || !auth) return 'public';
    try {
        const r = await fetch(`${url}/auth/v1/user`, {
            headers: { apikey: anonKey, Authorization: auth }
        });
        if (!r.ok) return 'public';
        const user = await r.json();
        return user && user.app_metadata && user.app_metadata.tier === 'member' ? 'member' : 'registered';
    } catch (err) {
        return 'public';
    }
}

function canView(tier, accessLevel) {
    return TIER_RANK[tier] >= (LEVEL_RANK[accessLevel || 'public'] || 0);
}

function lockPost(p) {
    return {
        titleEn: p.titleEn,
        titleZh: p.titleZh,
        slug: p.slug,
        publishedAt: p.publishedAt,
        pillar: p.pillar,
        accessLevel: p.accessLevel,
        imageUrl: p.imageUrl,
        imageCredit: p.imageCredit,
        hasBody: p.hasBody,
        locked: true,
        teaserEn: (p.whatHappenedEn || '').slice(0, 150) + '…',
        teaserZh: (p.whatHappenedZh || '').slice(0, 80) + '…'
    };
}

async function sanityQuery(query, params) {
    let url = `https://${PROJECT}.apicdn.sanity.io/${API_VERSION}/data/query/${DATASET}?query=${encodeURIComponent(query)}`;
    if (params) {
        for (const [k, v] of Object.entries(params)) {
            url += `&$${k}=${encodeURIComponent(JSON.stringify(v))}`;
        }
    }
    const r = await fetch(url);
    if (!r.ok) throw new Error(`sanity ${r.status}`);
    return (await r.json()).result;
}

export default async function handler(req, res) {
    const type = req.query.type;
    try {
        if (type === 'article') {
            const slug = req.query.slug;
            if (!slug || typeof slug !== 'string') return res.status(400).json({ error: 'missing_slug' });
            const post = await sanityQuery(
                `*[_type=="newsPost" && slug.current==$slug][0]{${NEWS_FIELDS},bodyEn,bodyZh}`,
                { slug }
            );
            if (!post) return res.status(404).json({ error: 'not_found' });
            const tier = await viewerTier(req);
            // Per-viewer response — never CDN-cache article payloads
            res.setHeader('Cache-Control', 'no-store');
            if (!canView(tier, post.accessLevel)) return res.status(200).json(lockPost(post));
            return res.status(200).json({ ...post, locked: false });
        }

        const query = QUERIES[type];
        if (!query) return res.status(400).json({ error: 'unknown_type' });

        let data = await sanityQuery(query);

        if (type === 'news') {
            const tier = await viewerTier(req);
            data = (data || []).map(p => canView(tier, p.accessLevel) ? { ...p, locked: false } : lockPost(p));
            // Tier-dependent — cache only for anonymous viewers
            res.setHeader('Cache-Control', req.headers.authorization ? 'no-store' : 's-maxage=600, stale-while-revalidate=86400');
        } else {
            res.setHeader('Cache-Control', 's-maxage=600, stale-while-revalidate=86400');
        }

        return res.status(200).json(data || []);
    } catch (err) {
        console.error('content proxy error:', err);
        return res.status(500).json({ error: 'internal_error' });
    }
}
