// Seeds 2 new member guides and reclassifies the CBAM-457 guide under the
// new 'guide' pillar (Member Resource Library).
const TOKEN = process.env.SANITY_TOKEN;
if (!TOKEN) { console.error('SANITY_TOKEN missing'); process.exit(1); }

const b = (text, style, listItem) => ({
    _type: 'block', style: style || 'normal',
    ...(listItem ? { listItem, level: 1 } : {}),
    _key: Math.random().toString(36).slice(2, 10),
    markDefs: [],
    children: [{ _type: 'span', _key: Math.random().toString(36).slice(2, 10), text, marks: [] }]
});

const guideA = {
    _id: 'guide-cbam-data-checklist', _type: 'newsPost',
    titleEn: 'The CBAM data checklist: what your EU buyer will ask you for',
    titleZh: 'CBAM数据清单：您的欧盟买家将向您索取什么',
    slug: { _type: 'slug', current: 'cbam-data-checklist' },
    publishedAt: '2026-07-16T10:00:00Z', pillar: 'guide', accessLevel: 'premium',
    imageUrl: 'assets/img/news/ets-carbon.jpg', imageCredit: 'Photo: Wolfgang Manousek, Wikimedia Commons (CC BY 2.0)',
    whatHappenedEn: 'Since January 2026 the EU CBAM is in its definitive phase, and from 2027 the UK adds its own version. EU importers must file annual declarations (first due 30 September 2027) — and the emissions data they need can only come from you, the producer. This guide lists exactly what will be requested, in the order it will be requested.',
    whatHappenedZh: '自2026年1月起，欧盟CBAM进入最终阶段，2027年起英国也将实施自己的版本。欧盟进口商须提交年度申报（首份截止2027年9月30日）——而他们所需的排放数据只能来自您，即生产者。本指南按索取顺序列出将被要求提供的全部内容。',
    whyItMattersEn: 'Suppliers who can deliver verified data quickly become preferred partners; those who cannot force their buyers onto default values with a +10% mark-up (rising to +30% by 2028) — a cost disadvantage attributed directly to your products.',
    whyItMattersZh: '能快速提供经核实数据的供应商将成为优先合作伙伴；无法提供的供应商则迫使买家使用附加10%上浮（2028年升至30%）的默认值——这一成本劣势将直接归到您的产品头上。',
    supplierActionEn: 'Work through the checklist below and assemble your CBAM data pack before the next buyer request.',
    supplierActionZh: '请按照下方清单逐项准备，在买家下次提出要求前备好您的CBAM数据包。',
    sources: ['https://taxation-customs.ec.europa.eu/carbon-border-adjustment-mechanism_en', 'https://www.gov.uk/government/collections/carbon-border-adjustment-mechanism'],
    linkedRegulations: [{ _key: 'r0', _type: 'reference', _ref: 'regulation-cbam' }],
    bodyEn: [
        b('1. Installation identification', 'h2'),
        b('Name, address and geographic coordinates of each production installation, plus the CBAM installation ID once registered in the EU registry. Buyers need this to link your data to their declaration.'),
        b('2. Production route and product mapping', 'h2'),
        b('For each CN code you ship: the production route (e.g. BF-BOF vs EAF for steel, primary vs secondary for aluminium) and which installation produces it. Default values — and from 2027 the CBAM benchmarks — are route-specific, so a wrong route means wrong costs.'),
        b('3. Direct embedded emissions per tonne', 'h2'),
        b('Measured fuel and process emissions of the installation, allocated per tonne of each product, following the CBAM methodology (Implementing Regulation 2025/2620 rules). This is the number the whole system turns on.'),
        b('4. Precursor emissions', 'h2'),
        b('Embedded emissions of purchased precursors (e.g. coke, sintered ore, unwrought aluminium) with the same data quality. If your precursor suppliers cannot provide data, default values cascade into your product.'),
        b('5. Verification', 'h2'),
        b('From the definitive phase, actual values must be verified by an accredited verifier. Book verification capacity early — verifiers are a bottleneck. The Committee can point members to accredited providers active in Asia.'),
        b('6. Carbon price paid at home', 'h2'),
        b('Documentation of any carbon price effectively paid (e.g. China national ETS) including rebates — this is deductible from your buyer\'s CBAM bill and therefore a selling point for your data pack.'),
        b('7. The UK parallel from 2027', 'h2'),
        b('The UK CBAM (from 1 January 2027) taxes the same sectors via HMRC with its own rates and no certificates. One well-structured data pack serves both regimes — collect once, report twice.'),
        b('One-page summary for your buyer', 'h2'),
        b('Installation ID + route per CN code', 'normal', 'bullet'),
        b('Verified direct emissions per tonne, with verifier certificate', 'normal', 'bullet'),
        b('Precursor emissions table', 'normal', 'bullet'),
        b('Carbon price paid, with proof of payment', 'normal', 'bullet'),
        b('Contact person for CBAM data requests', 'normal', 'bullet')
    ],
    bodyZh: [
        b('一、生产设施识别', 'h2'),
        b('每个生产设施的名称、地址和地理坐标，以及在欧盟注册后获得的CBAM设施编号。买家需要以此将您的数据与其申报关联。'),
        b('二、生产工艺路线与产品对应', 'h2'),
        b('对每个出口CN编码：注明生产路线（如钢铁的高炉-转炉与电弧炉之分、铝的原铝与再生铝之分）及对应的生产设施。默认值——以及2027年起的CBAM基准值——均按路线区分，路线错误意味着成本错误。'),
        b('三、每公吨直接内含排放', 'h2'),
        b('按CBAM方法学（实施条例2025/2620）计量设施的燃料和工艺排放，并分摊至每公吨产品。整个体系都围绕这个数字运转。'),
        b('四、前驱材料排放', 'h2'),
        b('外购前驱材料（如焦炭、烧结矿、未锻轧铝）的内含排放，须具备同等数据质量。若您的前驱供应商无法提供数据，默认值将层层传导至您的产品。'),
        b('五、核查', 'h2'),
        b('进入最终阶段后，实际值须经认可核查机构核实。请尽早预订核查资源——核查机构是瓶颈。委员会可为成员对接活跃于亚洲的认可机构。'),
        b('六、本国已支付的碳价', 'h2'),
        b('任何实际支付碳价（如中国全国碳市场）的凭证，包括返还情况——该项可从买家的CBAM账单中扣除，因此是您数据包的卖点。'),
        b('七、2027年起的英国并行制度', 'h2'),
        b('英国CBAM（2027年1月1日起）由HMRC按自有税率对相同行业征税，无证书制度。一套结构良好的数据包可同时满足两个制度——一次收集，两处申报。'),
        b('给买家的一页纸摘要', 'h2'),
        b('设施编号+每个CN编码的生产路线', 'normal', 'bullet'),
        b('经核实的每公吨直接排放及核查证书', 'normal', 'bullet'),
        b('前驱材料排放表', 'normal', 'bullet'),
        b('已支付碳价及付款凭证', 'normal', 'bullet'),
        b('CBAM数据对接联系人', 'normal', 'bullet')
    ]
};

const guideB = {
    _id: 'guide-gpsr-responsible-person', _type: 'newsPost',
    titleEn: 'GPSR: setting up your EU responsible person — step by step',
    titleZh: 'GPSR：设立您的欧盟责任人——分步指南',
    slug: { _type: 'slug', current: 'gpsr-responsible-person-setup' },
    publishedAt: '2026-07-16T09:00:00Z', pillar: 'guide', accessLevel: 'premium',
    imageUrl: 'assets/img/news/pld-gavel.jpg', imageCredit: 'Photo: Blogtrepreneur, Wikimedia Commons (CC BY 2.0)',
    whatHappenedEn: 'Since 13 December 2024, no consumer product may be placed on the EU market without an economic operator established in the EU who takes responsibility for it (GPSR Art. 16). Marketplaces delist products without one, and Germany\'s revised Product Safety Act (February 2026) backs this with fines up to €100,000. This guide walks through the four ways to comply.',
    whatHappenedZh: '自2024年12月13日起，任何消费品若无一家设立于欧盟、对其承担责任的经济经营者（GPSR第16条），即不得投放欧盟市场。线上平台会下架无责任人的产品，德国修订后的《产品安全法》（2026年2月）以最高10万欧元罚款作为后盾。本指南讲解四种合规途径。',
    whyItMattersEn: 'This is the requirement that stops shipments today — not in 2027. Every Asian manufacturer selling into the EU, directly or via marketplaces, needs a working answer.',
    whyItMattersZh: '这是今天——而不是2027年——就会拦下您货物的要求。每一家直接或通过平台向欧盟销售的亚洲制造商都需要一个可行的方案。',
    supplierActionEn: 'Choose your responsible-person route with the decision guide below and update your product labels before the next shipment.',
    supplierActionZh: '请按下方决策指南选择您的责任人路径，并在下次发货前更新产品标签。',
    sources: ['https://eur-lex.europa.eu/eli/reg/2023/988/oj/eng', 'https://eur-lex.europa.eu/eli/C/2025/6233/oj/eng'],
    linkedRegulations: [{ _key: 'r0', _type: 'reference', _ref: 'regulation-gpsr' }],
    bodyEn: [
        b('Who can be your responsible person?', 'h2'),
        b('An EU-established manufacturer (if you have an EU entity)', 'normal', 'bullet'),
        b('Your EU importer — the default in classic retail supply chains', 'normal', 'bullet'),
        b('An authorised representative you appoint by written mandate', 'normal', 'bullet'),
        b('A fulfilment service provider handling your goods in the EU', 'normal', 'bullet'),
        b('Which route fits which business model', 'h2'),
        b('Selling to German retailers: your buyer\'s importing entity normally takes the role — but confirm it in writing and agree who answers authority requests. Selling direct-to-consumer via marketplaces: you need an authorised representative or your fulfilment provider; marketplaces now block listings without a named EU responsible person.'),
        b('What the responsible person must actually do', 'h2'),
        b('Verify technical documentation and the internal risk analysis exist, keep them available for authorities for 10 years, report accidents via the Safety Business Gateway, cooperate on recalls, and be reachable at the address printed on the product.'),
        b('The label requirement most suppliers miss', 'h2'),
        b('The responsible person\'s name and postal or electronic address must appear ON the product, its packaging, the parcel or an accompanying document — printing plates and packaging artwork need updating. Combine this with the CE information block where applicable.'),
        b('Setup checklist', 'h2'),
        b('Confirm in writing who acts as responsible person per product line', 'normal', 'bullet'),
        b('Update labels/packaging with name + address', 'normal', 'bullet'),
        b('Hand over technical file + risk analysis to the responsible person', 'normal', 'bullet'),
        b('Agree an incident procedure (Safety Business Gateway reporting)', 'normal', 'bullet'),
        b('For marketplace sales: enter the responsible person in each listing', 'normal', 'bullet')
    ],
    bodyZh: [
        b('谁可以担任您的责任人？', 'h2'),
        b('设立于欧盟的制造商（若您有欧盟实体）', 'normal', 'bullet'),
        b('您的欧盟进口商——传统零售供应链中的默认选择', 'normal', 'bullet'),
        b('您以书面授权委任的授权代表', 'normal', 'bullet'),
        b('在欧盟处理您货物的履行服务商', 'normal', 'bullet'),
        b('哪种路径适合哪种业务模式', 'h2'),
        b('向德国零售商销售：通常由买家的进口实体承担该角色——但须书面确认，并约定由谁应对当局问询。通过平台直接面向消费者销售：您需要授权代表或履行服务商；平台现已屏蔽未标明欧盟责任人的商品。'),
        b('责任人实际须履行的职责', 'h2'),
        b('核实技术文件和内部风险分析已具备，为当局保存10年备查，通过Safety Business Gateway报告事故，配合召回，并可通过产品上印制的地址联系到。'),
        b('多数供应商忽视的标签要求', 'h2'),
        b('责任人的名称及邮政或电子地址必须出现在产品本身、包装、包裹或随附文件上——印版和包装设计稿需要更新。适用时可与CE信息栏合并。'),
        b('设立清单', 'h2'),
        b('按产品线书面确认责任人', 'normal', 'bullet'),
        b('更新标签/包装，加入名称+地址', 'normal', 'bullet'),
        b('向责任人移交技术文件+风险分析', 'normal', 'bullet'),
        b('约定事故处理流程（Safety Business Gateway报告）', 'normal', 'bullet'),
        b('平台销售：在每个商品页登记责任人', 'normal', 'bullet')
    ]
};

const mutations = [
    { createOrReplace: guideA },
    { createOrReplace: guideB },
    { patch: { id: 'news-cbam457-guide', set: { pillar: 'guide' } } }
];

(async () => {
    const r = await fetch('https://bvmxf21v.api.sanity.io/v2024-01-01/data/mutate/production', {
        method: 'POST', headers: { Authorization: `Bearer ${TOKEN}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({ mutations })
    });
    const body = await r.json();
    if (!r.ok) { console.error('FAILED', JSON.stringify(body)); process.exit(1); }
    console.log(`OK: ${mutations.length}`);
})();
