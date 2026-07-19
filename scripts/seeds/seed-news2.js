// Adds 4 new verified news posts and enriches 2 existing ones.
// Usage: SANITY_TOKEN=... node seed-news2.js
const PROJECT = 'bvmxf21v';
const DATASET = 'production';
const TOKEN = process.env.SANITY_TOKEN;
if (!TOKEN) { console.error('SANITY_TOKEN missing'); process.exit(1); }

const posts = [
    {
        id: 'news-ets-easing', slug: 'eu-eases-carbon-pricing-ets-overhaul',
        titleEn: 'Brussels moves to soften the EU carbon market — free allowances until 2037, slower cap cuts',
        titleZh: '布鲁塞尔拟放宽欧盟碳市场——免费配额延至2037年，减排上限收紧放缓',
        publishedAt: '2026-07-17T18:00:00Z', pillar: 'eu', accessLevel: 'public',
        whatHappenedEn: 'On 17 July the European Commission proposed a mid-term overhaul of the EU Emissions Trading System: the annual cap reduction would slow to ~3.7% from 2031 (currently 4.3%) and ~1.7% from 2036, and free allowances for steel, cement and other exposed industries would continue until end-2037 instead of 2034 — with 80% granted upfront only to companies with decarbonisation investment plans. It follows earlier easing steps this year: the 2040 target set at 90% with up to 5 points of international credits, and ETS2 postponed to January 2028.',
        whatHappenedZh: '7月17日，欧盟委员会提出对欧盟碳排放交易体系的中期改革方案：年度排放上限缩减速度自2031年起放缓至约3.7%（目前为4.3%），2036年起降至约1.7%；钢铁、水泥等高暴露行业的免费配额将延续至2037年底（原定2034年终止），其中80%仅预先发放给有脱碳投资计划的企业。此前欧盟已多次放宽：2040年减排目标定为90%并允许最多5个百分点的国际碳信用，ETS2推迟至2028年1月。',
        whyItMattersEn: 'Free EU allowances were due to be replaced by CBAM charges on imports by 2034 — extending them to 2037 implies a slower CBAM phase-in, changing the cost trajectory Chinese exporters of steel-, aluminium- and cement-based goods had planned against. A softer EU carbon price also lowers the near-term CBAM certificate price, but the direction of travel is unchanged.',
        whyItMattersZh: '欧盟免费配额原定于2034年前由CBAM进口费用全面取代——延长至2037年意味着CBAM过渡将放缓，改变了中国钢铝及水泥类产品出口商此前规划的成本轨迹。欧盟碳价走软也会降低近期CBAM证书价格，但政策大方向未变。',
        supplierActionEn: 'Do not pause CBAM readiness — keep building verified product-level emissions data, but recalibrate cost projections for the 2030s once the proposal text is analysed.',
        supplierActionZh: '请勿暂停CBAM准备工作——继续建立经核实的产品级排放数据，待方案文本分析后重新校准2030年代的成本预测。',
        sources: ['https://www.economist.com/europe/2026/07/16/europe-seems-set-to-ease-its-carbon-pricing', 'https://www.rte.ie/news/business/2026/0717/1583835-eu-softens-carbon-market-to-ease-pressure-on-industry/'],
        linkedRegIds: ['cbam']
    },
    {
        id: 'news-cbam-457', slug: 'cbam-extension-457-downstream-products',
        titleEn: 'CBAM set to reach finished goods: EP committee backs extension to 457 downstream products',
        titleZh: 'CBAM将覆盖至制成品：欧洲议会委员会支持扩展至457种下游产品',
        publishedAt: '2026-07-17T17:00:00Z', pillar: 'eu', accessLevel: 'public',
        whatHappenedEn: 'On 6 July the European Parliament\'s environment committee adopted its position on the CBAM revision (56 votes to 11), supporting extension to 457 downstream steel and aluminium products — fasteners, wire, springs, household articles, kitchen utensils, even solar panels — versus ~180 in the Commission proposal, plus tougher anti-circumvention rules using origin-country default values. Plenary vote expected in September; final law targeted late 2026/early 2027, application from 2028.',
        whatHappenedZh: '7月6日，欧洲议会环境委员会以56票对11票通过CBAM修订立场，支持将碳边境机制扩展至457种下游钢铝产品——紧固件、金属丝、弹簧、家居用品、厨具乃至太阳能板——远超欧盟委员会提案的约180种，并以真实原产国默认值收紧反规避规则。9月全会表决，最终立法预计2026年底/2027年初，2028年起适用。',
        whyItMattersEn: 'This is the step that moves CBAM from raw materials into the finished-goods categories German retailers actually source from China — hardware, housewares, DIY and metal components. Origin-country default values raise the stakes for transshipped or lightly processed goods.',
        whyItMattersZh: '这一步将CBAM从原材料扩展到德国零售商实际从中国采购的制成品类别——五金、家居用品、DIY及金属部件。原产国默认值规则大幅提高了转运或轻度加工产品的风险。',
        supplierActionEn: 'Screen product ranges against the 457-product list now and start collecting embedded-emissions data for metal-intensive SKUs before the rules are finalised.',
        supplierActionZh: '请立即对照457种产品清单核查产品范围，并在规则定稿前开始收集金属密集型SKU的内含排放数据。',
        sources: ['https://www.esgtoday.com/eu-lawmakers-vote-to-expand-list-of-products-under-cbam-carbon-import-tax/'],
        linkedRegIds: ['cbam']
    },
    {
        id: 'news-eudr-it', slug: 'eudr-product-list-it-system-final',
        titleEn: 'EUDR: Commission trims product list and finalises IT system ahead of 30 December start',
        titleZh: 'EUDR：欧盟委员会精简产品清单并敲定信息系统，12月30日启用在即',
        publishedAt: '2026-07-17T16:00:00Z', pillar: 'eu', accessLevel: 'public',
        whatHappenedEn: 'On 13 July the Commission adopted two EUDR implementation measures: a Delegated Act updating and simplifying the in-scope product list, and an Implementing Act defining how the due-diligence Information System and new simplified declarations will work — part of a simplification drive the Commission says cuts annual compliance costs by 75%. Application starts 30 December 2026 (large/medium) and 30 June 2027 (micro/small).',
        whatHappenedZh: '7月13日，欧盟委员会通过两项EUDR实施措施：一项授权法案更新并简化受管产品清单，一项实施法案确定尽职调查信息系统及新的简化声明的运作方式——委员会称该简化举措可将年度合规成本削减75%。法规自2026年12月30日（大中型企业）和2027年6月30日（微小型企业）起适用。',
        whyItMattersEn: 'Rubber, timber, paper/packaging and leather goods shipped from China to the EU are in scope, and the finalised IT system defines exactly what geolocation and due-diligence data importers will demand from their supply chains.',
        whyItMattersZh: '从中国输往欧盟的橡胶、木材、纸品/包装和皮革制品均在范围内，敲定的信息系统明确了进口商将向供应链索取的地理定位和尽职调查数据。',
        supplierActionEn: 'Check the updated product annex against your HS codes and be ready to supply plot-level geolocation data for rubber, wood and paper inputs before Q4 order placement.',
        supplierActionZh: '请对照您的HS编码核查更新后的产品附件，并在第四季度下单前备妥橡胶、木材和纸类原料的地块级地理定位数据。',
        sources: ['https://environment.ec.europa.eu/news/commission-updates-product-scope-and-tools-support-eudr-2026-07-13_en'],
        linkedRegIds: ['eudr']
    },
    {
        id: 'news-flr-guidelines', slug: 'forced-labour-guidelines-single-portal',
        titleEn: 'EU Forced Labour Regulation: enforcement guidelines and Single Portal published',
        titleZh: '欧盟强迫劳动法规：执法指南与统一门户网站发布',
        publishedAt: '2026-07-17T15:00:00Z', pillar: 'eu', accessLevel: 'public',
        whatHappenedEn: 'On 26 June the Commission published its guidelines on applying the Forced Labour Regulation and launched the Forced Labour Single Portal. The guidelines explain how authorities will select cases (scale and severity, product volumes), what evidence they will request, how import bans will be enforced at borders and online, and what voluntary due diligence should look like. Enforcement begins 14 December 2027.',
        whatHappenedZh: '6月26日，欧盟委员会发布强迫劳动法规适用指南并上线强迫劳动统一门户。指南阐明了当局如何选择案件（规模与严重程度、市场产品数量）、将要求哪些证据、进口禁令如何在边境和线上执行，以及自愿尽职调查应有的形态。执法自2027年12月14日开始。',
        whyItMattersEn: 'This is the EU\'s first concrete signal of how product bans will actually be enforced — supply chains with exposure to high-risk regions are an obvious priority, mirroring the US UFLPA experience. Retailers will push these due-diligence expectations into supplier contracts well before 2027.',
        whyItMattersZh: '这是欧盟首次具体表明产品禁令将如何实际执行——涉及高风险地区的供应链显然是优先目标，与美国UFLPA的经验相似。零售商将在2027年之前就把这些尽职调查要求写入供应商合同。',
        supplierActionEn: 'Map sub-tier suppliers (especially cotton, polysilicon, aluminium inputs) and document labour-related due diligence in line with the new guidelines before customers ask.',
        supplierActionZh: '请梳理次级供应商（尤其是棉花、多晶硅、铝原料），并按新指南记录劳工尽职调查，赶在客户提出要求之前完成。',
        sources: ['https://www.lw.com/en/insights/european-commission-publishes-guidelines-on-the-eu-forced-labour-regulation', 'https://single-market-economy.ec.europa.eu/single-market/goods/forced-labour-regulation_en'],
        linkedRegIds: ['forcedlabour']
    }
];

// Enrich the two existing posts with new specifics + sources
const patches = [
    {
        id: 'news-ppwr-countdown',
        set: {
            whatHappenedEn: 'The Packaging & Packaging Waste Regulation (EU) 2025/40 becomes applicable on 12 August 2026, replacing the 1994 Packaging Directive in all 27 member states. From that date, food-contact packaging with PFAS above set concentration limits is banned, the combined lead/cadmium/mercury/chromium-VI limit of 100 ppm applies, and anyone placing packaging on the EU market must hold conformity-assessment documentation.',
            whatHappenedZh: '《包装与包装废弃物法规》(EU) 2025/40 将于2026年8月12日开始适用，在全部27个成员国取代1994年包装指令。自该日起，PFAS超过设定浓度限值的食品接触包装被禁止，铅/镉/汞/六价铬合计100 ppm的限值生效，凡在欧盟市场投放包装者均须持有合格评定文件。',
            whyItMattersEn: 'These are product-level requirements enforced at the packaging of every consumer good shipped to the EU — Chinese manufacturers, not just EU importers, will be asked for test reports and technical files by German retail QA teams. PFAS in grease-proof coatings and recycled-content paper is a common failure point.',
            whyItMattersZh: '这些是针对每件输欧消费品包装的产品级要求——德国零售质检团队将不仅向欧盟进口商、也会向中国制造商索取测试报告和技术文件。防油涂层和再生纸中的PFAS是常见不合格点。',
            supplierActionEn: 'Complete PFAS and heavy-metal testing on all food-contact and consumer packaging now and hand conformity documentation to EU customers before August shipments.',
            supplierActionZh: '请立即完成所有食品接触及消费品包装的PFAS和重金属测试，并在8月发货前向欧盟客户提交合格文件。',
            sources: ['https://www.intertek.com/products-retail/insight-bulletins/2026/1536-eu-ppwr-requirements-effective-from-august/', 'https://eur-lex.europa.eu/eli/reg/2025/40/oj/eng']
        }
    },
    {
        id: 'news-r2r-deadline',
        set: {
            pillar: 'germany',
            whyItMattersEn: 'Germany\'s implementing law requires manufacturers of smartphones, washing machines, dishwashers, refrigerators, vacuum cleaners, displays and tablets to repair within a reasonable period, supply spare parts and tools at prices that do not discourage repair, publish repair price lists online, and avoid contractual or hardware/software repair barriers — for roughly 7-10 years after market withdrawal. German retailers will pass these duties into OEM/ODM contracts.',
            whyItMattersZh: '德国实施法要求智能手机、洗衣机、洗碗机、冰箱、吸尘器、显示器和平板电脑的制造商在合理期限内维修、以不阻碍维修的价格供应备件和工具、在线公布维修价目表，并不得设置合同或软硬件维修障碍——义务持续至产品退市后约7至10年。德国零售商将把这些义务传导至OEM/ODM合同。',
            sources: ['https://www.freshfields.com/en/our-thinking/blogs/risk-and-compliance/repair-instead-of-replace-germany-moves-to-implement-the-eu-right-to-repair-dire-102mgn4', 'https://commission.europa.eu/law/law-topic/consumer-protection-law/directive-repair-goods_en']
        }
    }
];

const mutations = [];
for (const n of posts) {
    mutations.push({ createOrReplace: {
        _id: n.id, _type: 'newsPost',
        titleEn: n.titleEn, titleZh: n.titleZh,
        slug: { _type: 'slug', current: n.slug },
        publishedAt: n.publishedAt, pillar: n.pillar,
        whatHappenedEn: n.whatHappenedEn, whatHappenedZh: n.whatHappenedZh,
        whyItMattersEn: n.whyItMattersEn, whyItMattersZh: n.whyItMattersZh,
        supplierActionEn: n.supplierActionEn, supplierActionZh: n.supplierActionZh,
        sources: n.sources,
        linkedRegulations: (n.linkedRegIds || []).map((id, i) => ({ _key: `r${i}`, _type: 'reference', _ref: `regulation-${id}` })),
        accessLevel: n.accessLevel
    }});
}
for (const p of patches) {
    mutations.push({ patch: { id: p.id, set: p.set } });
}

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
