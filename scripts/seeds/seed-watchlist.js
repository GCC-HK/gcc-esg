// Seeds 3 watch-list briefing posts (verified 19 July 2026).
const TOKEN = process.env.SANITY_TOKEN;
if (!TOKEN) { console.error('SANITY_TOKEN missing'); process.exit(1); }

const posts = [
    {
        id: 'news-pld', slug: 'product-liability-directive-december-2026',
        titleEn: 'Product liability overhaul: no EU manufacturer? The importer or fulfilment provider is liable from December 2026',
        titleZh: '产品责任制度改革：无欧盟制造商？自2026年12月起由进口商或履行服务商承担责任',
        publishedAt: '2026-07-17T13:00:00Z', pillar: 'eu', accessLevel: 'public',
        imageUrl: 'assets/img/news/pld-gavel.jpg', imageCredit: 'Photo: Blogtrepreneur, Wikimedia Commons (CC BY 2.0)',
        whatHappenedEn: 'The new Product Liability Directive (EU) 2024/2853 must be transposed by 9 December 2026; Germany\'s implementation bill — a complete rewrite of the Produkthaftungsgesetz — had its Bundestag first reading on 4 March 2026. Strict liability extends to importers, authorised representatives and fulfilment service providers where no EU manufacturer exists; software and digital products are covered; claimants get disclosure rights and eased burden of proof; compensation caps are removed.',
        whatHappenedZh: '新《产品责任指令》(EU) 2024/2853 须于2026年12月9日前完成转化；德国的实施法案——对《产品责任法》的全面重写——已于2026年3月4日在联邦议院一读。在无欧盟制造商的情况下，严格责任扩展至进口商、授权代表和履行服务商；软件和数字产品纳入范围；索赔人获得证据披露权和举证减轻；赔偿上限被取消。',
        whyItMattersEn: 'EU buyers and importers will push this new liability exposure back into supplier contracts — expect stronger indemnities, insurance requirements and documentation demands. Direct-to-consumer sellers without an EU entity are exposed through their fulfilment providers.',
        whyItMattersZh: '欧盟买家和进口商将把新增的责任风险传导回供应商合同——预计将出现更严格的赔偿条款、保险要求和文件要求。无欧盟实体的跨境直销卖家将通过其履行服务商承担风险。',
        supplierActionEn: 'Review product liability insurance coverage and technical-file completeness now, and expect updated indemnity clauses from EU customers before December.',
        supplierActionZh: '请立即检查产品责任保险的覆盖范围和技术文件的完整性，并预计欧盟客户将在12月前更新赔偿条款。',
        sources: ['https://eur-lex.europa.eu/eli/dir/2024/2853/oj/eng', 'https://cms.law/en/deu/legal-updates/transposition-time-update-on-the-eu-member-states-adoption-of-the-new-product-liability-directive']
    },
    {
        id: 'news-pfas', slug: 'universal-pfas-restriction-decisive-phase',
        titleEn: 'Universal PFAS ban enters its decisive phase — final committee opinion expected end-2026',
        titleZh: '全面PFAS禁令进入决定性阶段——委员会最终意见预计2026年底出炉',
        publishedAt: '2026-07-17T12:30:00Z', pillar: 'standards', accessLevel: 'public',
        imageUrl: 'assets/img/news/pfas-pan.jpg', imageCredit: 'Photo: Cooks & Kitchens, Wikimedia Commons (CC BY 2.0)',
        whatHappenedEn: 'ECHA\'s Risk Assessment Committee adopted its final opinion on the universal PFAS restriction on 2 March 2026; the Socio-Economic Analysis Committee published its draft opinion on 26 March with a consultation that closed 25 May. SEAC\'s final opinion is expected by end-2026, after which the Commission drafts the actual restriction. The committees recommend removing or shortening many of the proposed use exemptions, while SEAC considers a total ban "likely not proportionate" — pointing to a broad ban with use-specific derogations.',
        whatHappenedZh: '欧洲化学品管理局（ECHA）风险评估委员会于2026年3月2日通过对全面PFAS限制的最终意见；社会经济分析委员会3月26日发布意见草案，公众咨询已于5月25日结束。SEAC最终意见预计2026年底出炉，随后由欧盟委员会起草正式限制条款。两委员会建议取消或缩短多项拟议用途豁免；SEAC认为全面禁令"很可能不成比例"——指向附特定用途豁免的广泛禁令。',
        whyItMattersEn: 'PFAS sit in waterproof textiles, food-contact coatings, cosmetics and electronics. Transition periods will feel short once adopted — and German retailers are already delisting PFAS products, while the PPWR bans PFAS in food-contact packaging from August 2026.',
        whyItMattersZh: 'PFAS广泛存在于防水纺织品、食品接触涂层、化妆品和电子产品中。一旦通过，过渡期将非常紧张——德国零售商已开始下架含PFAS产品，且PPWR自2026年8月起禁止食品接触包装中的PFAS。',
        supplierActionEn: 'Inventory PFAS across coatings, membranes, packaging and formulations now; request written PFAS declarations and alternatives from your chemical suppliers.',
        supplierActionZh: '请立即盘点涂层、膜材、包装和配方中的PFAS；向化学品供应商索取书面PFAS声明及替代方案。',
        sources: ['https://echa.europa.eu/hot-topics/perfluoroalkyl-chemicals-pfas', 'https://www.arnoldporter.com/en/perspectives/advisories/2026/03/echa-committees-advance-broad-pfas-restriction-under-reach']
    },
    {
        id: 'news-reach', slug: 'reach-revision-delayed-polymers',
        titleEn: 'REACH 2.0 delayed again — but polymer registration is coming',
        titleZh: 'REACH 2.0 再度推迟——但聚合物注册终将到来',
        publishedAt: '2026-07-17T12:00:00Z', pillar: 'eu', accessLevel: 'public',
        imageUrl: 'assets/img/news/reach-chemicals.jpg', imageCredit: 'Photo: GCC licensed stock',
        whatHappenedEn: 'The biggest REACH overhaul in two decades has slipped again: after a negative opinion from the Regulatory Scrutiny Board on its impact assessment, the revision did not appear on the Commission\'s agenda through early 2026. Circulating draft elements include a 10-year validity for registrations, digital safety data — and, most consequentially, notification or registration of polymers above 1 tonne per year, which were previously exempt.',
        whatHappenedZh: '二十年来最大规模的REACH改革再次推迟：在监管审查委员会对其影响评估出具负面意见后，修订案未列入欧盟委员会2026年初的议程。流传的草案要点包括注册10年有效期、数字化安全数据——以及影响最深远的：此前豁免的聚合物在年产量超过1公吨时须通知或注册。',
        whyItMattersEn: 'When it lands, polymer registration reaches plastics, textiles and coatings supply chains that have never dealt with REACH registration — a new data and cost burden that will cascade to Asian material suppliers.',
        whyItMattersZh: '一旦落地，聚合物注册将波及从未接触过REACH注册的塑料、纺织和涂料供应链——新的数据和成本负担将传导至亚洲材料供应商。',
        supplierActionEn: 'No immediate action — but map which of your materials are polymers entering the EU above 1 tonne per year, so you can move fast when the proposal lands.',
        supplierActionZh: '暂无需立即行动——但请梳理哪些材料属于年输欧量超过1公吨的聚合物，以便提案出台后快速应对。',
        sources: ['https://www.cirs-group.com/en/chemicals/eu-reach-2-faces-further-delay-due-to-negative-opinion-from-regulatory-scrutiny-board', 'https://en.reach24h.com/news/industry-news/chemical/industry-major-eu-reach-reform-proposed-what-does-a-10-year-registration-validity-mean-for-industry-compliance']
    }
];

const mutations = posts.map(n => ({ createOrReplace: {
    _id: n.id, _type: 'newsPost',
    titleEn: n.titleEn, titleZh: n.titleZh,
    slug: { _type: 'slug', current: n.slug },
    publishedAt: n.publishedAt, pillar: n.pillar,
    imageUrl: n.imageUrl, imageCredit: n.imageCredit,
    whatHappenedEn: n.whatHappenedEn, whatHappenedZh: n.whatHappenedZh,
    whyItMattersEn: n.whyItMattersEn, whyItMattersZh: n.whyItMattersZh,
    supplierActionEn: n.supplierActionEn, supplierActionZh: n.supplierActionZh,
    sources: n.sources, accessLevel: n.accessLevel
}}));

(async () => {
    const r = await fetch('https://bvmxf21v.api.sanity.io/v2024-01-01/data/mutate/production', {
        method: 'POST', headers: { Authorization: `Bearer ${TOKEN}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({ mutations })
    });
    const b = await r.json();
    if (!r.ok) { console.error('FAILED', JSON.stringify(b)); process.exit(1); }
    console.log(`OK: ${mutations.length} (${b.transactionId})`);
})();
