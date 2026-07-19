// Adds images to all news posts, sets access levels, and creates the
// flagship premium guide. Usage: SANITY_TOKEN=... node seed-images-flagship.js
const PROJECT = 'bvmxf21v';
const DATASET = 'production';
const TOKEN = process.env.SANITY_TOKEN;
if (!TOKEN) { console.error('SANITY_TOKEN missing'); process.exit(1); }

const imagePatches = [
    { id: 'news-ets-easing', imageUrl: 'assets/img/news/ets-carbon.jpg', imageCredit: 'Photo: Wolfgang Manousek, Wikimedia Commons (CC BY 2.0)' },
    { id: 'news-cbam-457', imageUrl: 'assets/img/news/cbam-fasteners.jpg', imageCredit: 'Photo: Dietmar Rabich, Wikimedia Commons (CC BY-SA 4.0)' },
    { id: 'news-eudr-it', imageUrl: 'assets/img/news/eudr-timber.jpg', imageCredit: 'Photo: Wikimedia Commons (CC0)' },
    { id: 'news-flr-guidelines', imageUrl: 'assets/img/news/flr-social.jpg', imageCredit: 'Photo: GCC licensed stock' },
    { id: 'news-ppwr-countdown', imageUrl: 'assets/img/news/ppwr-plastic.jpg', imageCredit: 'Photo: GCC licensed stock' },
    { id: 'news-r2r-deadline', imageUrl: 'assets/img/news/r2r-repair.jpg', imageCredit: 'Photo: U.S. Navy (public domain)' },
    { id: 'news-china-csds', imageUrl: 'assets/img/news/china-hk.jpg', imageCredit: 'Photo: Wilfredor, Wikimedia Commons (CC0)' },
    { id: 'news-cbam-deminimis', imageUrl: 'assets/img/news/ship.jpg', imageCredit: 'Photo: Petar Milošević, Wikimedia Commons (CC BY-SA 4.0)' }
];

// Gate two existing posts at "registered" to demo the tier
const accessPatches = [
    { id: 'news-cbam-deminimis', accessLevel: 'registered' },
    { id: 'news-china-csds', accessLevel: 'registered' }
];

const b = (text, style, listItem) => ({
    _type: 'block', style: style || 'normal',
    ...(listItem ? { listItem, level: 1 } : {}),
    _key: Math.random().toString(36).slice(2, 10),
    markDefs: [],
    children: [{ _type: 'span', _key: Math.random().toString(36).slice(2, 10), text, marks: [] }]
});

const flagship = {
    _id: 'news-cbam457-guide',
    _type: 'newsPost',
    titleEn: 'Member Guide: Screening your product range against the CBAM downstream extension',
    titleZh: '会员指南：对照CBAM下游扩展清单核查您的产品范围',
    slug: { _type: 'slug', current: 'cbam-457-screening-guide' },
    publishedAt: '2026-07-17T14:00:00Z',
    pillar: 'explainer',
    accessLevel: 'premium',
    imageUrl: 'assets/img/news/cbam-fasteners.jpg',
    imageCredit: 'Photo: Dietmar Rabich, Wikimedia Commons (CC BY-SA 4.0)',
    whatHappenedEn: 'The EU is extending its carbon border levy from raw materials to finished and semi-finished goods. The Parliament committee position of 6 July backs 457 downstream steel and aluminium product categories, far beyond the Commission\'s ~180. This guide walks sourcing teams through screening their range before the rules are final.',
    whatHappenedZh: '欧盟正将碳边境税从原材料扩展至制成品和半成品。欧洲议会委员会7月6日的立场支持457种下游钢铝产品类别，远超欧盟委员会提案的约180种。本指南帮助采购团队在规则定稿前核查产品范围。',
    whyItMattersEn: 'For retail sourcing offices this is the moment CBAM stops being a steel-trader problem and becomes a consumer-goods problem: hardware, housewares, DIY articles and metal components are all on the extended list.',
    whyItMattersZh: '对零售采购办公室而言，CBAM从此不再只是钢铁贸易商的问题，而成为消费品问题：五金、家居用品、DIY产品和金属部件均在扩展清单上。',
    supplierActionEn: 'Follow the four-step screening process in this guide and start collecting embedded-emissions data for exposed SKUs now.',
    supplierActionZh: '请按照本指南的四步核查流程操作，并立即开始收集受影响SKU的内含排放数据。',
    sources: ['https://www.esgtoday.com/eu-lawmakers-vote-to-expand-list-of-products-under-cbam-carbon-import-tax/', 'https://taxation-customs.ec.europa.eu/carbon-border-adjustment-mechanism_en'],
    linkedRegulations: [{ _key: 'r0', _type: 'reference', _ref: 'regulation-cbam' }],
    bodyEn: [
        b('What was decided — and what is still open', 'h2'),
        b('On 6 July 2026 the European Parliament\'s environment committee adopted its negotiating position on the CBAM revision by 56 votes to 11. It supports extending CBAM to 457 downstream steel and aluminium product categories — the Commission\'s December 2025 proposal had listed around 180. The plenary vote is expected in September 2026, followed by trilogue negotiations with the Council; final adoption is targeted for late 2026 or early 2027, with application from 1 January 2028.'),
        b('Nothing is final until trilogues conclude. But the direction is unambiguous, and the practical preparation is identical whether the final list holds 180 or 457 entries.'),
        b('Product categories on the extended list', 'h2'),
        b('Fasteners: screws, bolts, nuts, washers, rivets (CN chapter 73)', 'normal', 'bullet'),
        b('Wire, cables, springs and chains of iron or steel', 'normal', 'bullet'),
        b('Household articles and kitchen utensils of steel or aluminium', 'normal', 'bullet'),
        b('Aluminium structures, profiles, doors and window frames', 'normal', 'bullet'),
        b('Tools and hardware with significant steel content', 'normal', 'bullet'),
        b('Solar panels with aluminium frames', 'normal', 'bullet'),
        b('The four-step screening process', 'h2'),
        b('Step 1 — Map your CN codes. Pull the 8-digit CN codes for every SKU containing steel or aluminium from your customs data. The exposure sits mainly in CN chapters 73 (iron/steel articles) and 76 (aluminium articles).'),
        b('Step 2 — Weigh the metal. For each candidate SKU, establish the mass of steel and aluminium per unit. CBAM liability follows the embedded metal, so a kitchen scale ranking of your range is a legitimate first-pass prioritisation.'),
        b('Step 3 — Trace the metal source. Identify which mills supply the steel/aluminium in your top-exposure SKUs. Anti-circumvention rules in the Parliament text apply origin-country default values where circumvention is suspected — transshipped or lightly processed metal will not escape.'),
        b('Step 4 — Start the emissions data conversation. Ask suppliers of exposed SKUs for product-level embedded emissions now. Verified actual data beats default values (which carry a +10% mark-up in 2026, rising to +30% by 2028) — the earlier the data pipeline exists, the cheaper compliance becomes.'),
        b('Interaction with the 50-tonne de minimis', 'h2'),
        b('The current 50 t/year cumulative exemption (Reg. (EU) 2025/2083) covers iron & steel, aluminium, fertilisers and cement. How it will apply to downstream products is part of the ongoing negotiation — do not build a compliance strategy on the assumption that small volumes of finished goods stay exempt.'),
        b('How the Committee can help', 'h2'),
        b('The GCC Sustainability Committee can connect member companies with verification bodies, share screening templates, and relay member questions to the Chamber network in Brussels. Contact gcc-sustainability@hongkong.ahk.de.')
    ]
};

const mutations = [
    { createOrReplace: flagship },
    ...imagePatches.map(p => ({ patch: { id: p.id, set: { imageUrl: p.imageUrl, imageCredit: p.imageCredit } } })),
    ...accessPatches.map(p => ({ patch: { id: p.id, set: { accessLevel: p.accessLevel } } }))
];

(async () => {
    const res = await fetch(`https://${PROJECT}.api.sanity.io/v2024-01-01/data/mutate/${DATASET}`, {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${TOKEN}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({ mutations })
    });
    const body = await res.json();
    if (!res.ok) { console.error('FAILED', res.status, JSON.stringify(body)); process.exit(1); }
    console.log(`OK: ${mutations.length} mutations (${body.transactionId})`);
})();
