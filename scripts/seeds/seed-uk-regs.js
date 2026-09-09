// Seeds the UK-specific requirements set (committee decision Sep 2026, round-1 task 16:
// "All relevant specific UK requirements should be included" after Jill's remark that
// UK CBAM alone would be irritating). All facts verified against gov.uk / legislation.gov.uk
// / CMA / HMRC / HSE sources on 2026-09-09; source URLs in the eurlex field of each entry.
// The UK has NO forced labour import ban and no CSDDD equivalent (stated where relevant).
// Usage: SANITY_TOKEN=... node seed-uk-regs.js
const TOKEN = process.env.SANITY_TOKEN;
if (!TOKEN) { console.error('SANITY_TOKEN missing'); process.exit(1); }

const REVIEWED = '2026-09-09';

const regs = [
    {
        regId: 'ukmsa', name: 'UK Modern Slavery Act (s.54)', ref: 'Modern Slavery Act 2015 (UK)',
        status: 'inforce', badge: 'new', newSince: '2026-09-09', markets: ['uk'],
        inForce: '29 October 2015 (s.54 transparency duty)',
        complianceDeadline: 'Ongoing: annual statement within 6 months of the buyer\'s financial year end',
        eurlex: 'https://www.gov.uk/guidance/publish-an-annual-modern-slavery-statement',
        categories: [], roles: [], sizes: [],
        sections: [
            { title: 'REPORTING',
              textEn: 'Commercial organisations doing business in the UK with global turnover of GBP 36m or more must publish an annual modern slavery statement, approved by the board, signed by a director and linked from the website homepage. New statutory guidance (24 March 2025) raises the expected standard across six areas: structure and supply chains, policies, due diligence, risk assessment, KPIs and training.',
              textZh: '在英国开展业务且全球年营业额达3,600万英镑及以上的商业组织，须每年发布现代奴役声明，经董事会批准、由董事签署，并在网站首页设置链接。2025年3月24日发布的新法定指南在六个方面提高了预期标准：组织结构与供应链、政策、尽职调查、风险评估、关键绩效指标和培训。' },
            { title: 'SUPPLY CHAIN',
              textEn: 'The statement must cover the global supply chain, so UK buyers cascade the duty to their Asian suppliers through questionnaires, audits and contract clauses. Sourcing offices are typically the ones collecting the evidence.',
              textZh: '声明须覆盖全球供应链，因此英国买家会通过问卷、审核和合同条款将义务传导给亚洲供应商。采购办公室通常是收集证明材料的一方。' },
            { title: 'PENALTIES',
              textEn: 'No fine for a missing statement (injunction only), but reputational exposure is high and the government registry makes gaps visible. Note: the UK has no forced labour import ban, unlike the US UFLPA and the EU Forced Labour Regulation.',
              textZh: '未发布声明不会被罚款（仅可强制令），但声誉风险很高，政府登记平台会让缺失一目了然。注意：与美国UFLPA和欧盟强迫劳动条例不同，英国没有强迫劳动进口禁令。' }
        ],
        reasonEn: 'Your UK customers with GBP 36m+ turnover must publish annual modern slavery statements covering their whole supply chain. Expect questionnaires, audit rights and contract clauses on forced labour.',
        reasonZh: '年营业额达3,600万英镑以上的英国客户须每年发布覆盖整个供应链的现代奴役声明。请准备好应对强迫劳动相关的问卷、审核权和合同条款。'
    },
    {
        regId: 'ukppt', name: 'UK Plastic Packaging Tax', ref: 'Finance Act 2021 (UK)',
        status: 'inforce', badge: 'new', newSince: '2026-09-09', markets: ['uk'],
        inForce: '1 April 2022',
        complianceDeadline: 'Ongoing: rate GBP 228.82 per tonne from 1 April 2026, CPI indexed annually',
        eurlex: 'https://www.gov.uk/guidance/check-if-you-need-to-register-for-plastic-packaging-tax',
        categories: [], roles: [], sizes: [],
        sections: [
            { title: 'DOCUMENTATION',
              textEn: 'The tax is charged on finished plastic packaging components containing less than 30% recycled plastic, whether manufactured in or imported into the UK, including the packaging around imported goods. Importers handling 10 tonnes or more per 12 months must register with HMRC and file quarterly returns.',
              textZh: '该税针对再生塑料含量低于30%的成品塑料包装组件征收，无论在英国生产还是进口（包括进口商品的外包装）。12个月内经手10公吨及以上的进口商须向英国税务海关总署（HMRC）注册并按季度申报。' },
            { title: 'SUPPLY CHAIN',
              textEn: 'Recycled content claims need evidence from the supply chain: material composition and recycled percentage per component. UK buyers pass these documentation requests to manufacturers; without evidence the full tax is due.',
              textZh: '再生含量声明需要供应链证明材料：每个组件的材料构成和再生比例。英国买家会将这些文件要求传递给制造商；没有证据即须全额缴税。' },
            { title: 'PENALTIES',
              textEn: 'Standard HMRC tax penalties apply, and businesses in the supply chain can be held secondarily liable, so due diligence requests down the chain are routine.',
              textZh: '适用HMRC标准税务处罚，且供应链上的企业可能承担连带责任，因此沿链条向下的尽职调查要求已成常态。' }
        ],
        reasonEn: 'Plastic packaging entering the UK with under 30% recycled content is taxed at GBP 228.82 per tonne from April 2026. UK importers will ask you for per component recycled content evidence.',
        reasonZh: '自2026年4月起，再生含量低于30%的塑料包装进入英国须按每公吨228.82英镑缴税。英国进口商将要求您提供每个组件的再生含量证明。'
    },
    {
        regId: 'ukepr', name: 'UK Packaging EPR (pEPR)', ref: 'SI 2024/1332 (UK)',
        status: 'phasing', badge: 'new', newSince: '2026-09-09', markets: ['uk'],
        inForce: 'Data duties since 2023; first disposal fee invoices issued October 2025',
        complianceDeadline: 'From the 2026-27 year, fees are modulated by recyclability (red, amber, green)',
        eurlex: 'https://www.gov.uk/guidance/extended-producer-responsibility-for-packaging-who-is-affected-and-what-to-do',
        categories: [], roles: [], sizes: [],
        sections: [
            { title: 'REPORTING',
              textEn: 'UK producers, brand owners and importers of packaged goods above GBP 1m turnover and 25 tonnes of packaging per year must register and report packaging data. Larger producers (above GBP 2m and 50 tonnes) report every six months and pay disposal fees to the scheme administrator PackUK.',
              textZh: '年营业额超过100万英镑且每年经手包装超过25公吨的英国生产商、品牌方和包装商品进口商须注册并报告包装数据。规模更大的生产商（超过200万英镑和50公吨）须每六个月报告一次，并向计划管理机构PackUK缴纳处置费。' },
            { title: 'DOCUMENTATION',
              textEn: 'Fees are set per tonne and material (year 1 base fees for example: plastic GBP 423 per tonne, glass GBP 192). From year 2 (2026-27) fees rise or fall with the recyclability rating of the packaging, so design choices made at the factory now directly set the UK fee.',
              textZh: '费用按材料和吨位设定（第一年基础费率示例：塑料每公吨423英镑，玻璃192英镑）。自第二年（2026-27年度）起，费用随包装可回收性评级升降，工厂端的设计决定如今直接影响英国费率。' },
            { title: 'SUPPLY CHAIN',
              textEn: 'Suppliers must provide per SKU packaging data: material, component weight and recyclability. Expect UK buyers to require this in their item master data.',
              textZh: '供应商须提供每个SKU的包装数据：材料、组件重量和可回收性。英国买家会将其纳入商品主数据要求。' }
        ],
        reasonEn: 'UK importers now pay the full cost of managing household packaging waste, modulated by recyclability from 2026-27. They will require per SKU packaging material, weight and recyclability data from you.',
        reasonZh: '英国进口商现须承担家庭包装废弃物管理的全部成本，且自2026-27年度起费用按可回收性调整。他们将要求您提供每个SKU的包装材料、重量和可回收性数据。'
    },
    {
        regId: 'ukca', name: 'UKCA and CE Marking (GB)', ref: 'SI 2024/696 (UK)',
        status: 'inforce', badge: 'new', newSince: '2026-09-09', markets: ['uk'],
        inForce: 'CE marking recognised indefinitely for most consumer product rules since 1 October 2024',
        complianceDeadline: 'Ongoing: no CE withdrawal deadline for the listed product regulations',
        eurlex: 'https://www.gov.uk/government/news/uk-government-announces-extension-of-ce-mark-recognition-for-businesses',
        categories: ['electronics', 'toys', 'construction'], roles: [], sizes: [],
        sections: [
            { title: 'PRODUCT DESIGN',
              textEn: 'Great Britain recognises the CE marking indefinitely for most consumer product rules (toys, low voltage electrical, EMC, radio equipment, RoHS, ecodesign and more), so one CE compliant product can serve the EU, GB and Northern Ireland. UKCA remains valid but is voluntary in practice for these sectors.',
              textZh: '英国（大不列颠）对大多数消费品法规（玩具、低电压电气、电磁兼容、无线电设备、RoHS、生态设计等）无限期承认CE标志，因此一件符合CE要求的产品可同时进入欧盟、大不列颠和北爱尔兰市场。UKCA标志仍然有效，但在这些领域实践中已属自愿。' },
            { title: 'DOCUMENTATION',
              textEn: 'The manufacturer still runs conformity assessment and keeps the technical file; the UK importer verifies compliance and appears on the label. Northern Ireland requires CE under the Windsor Framework.',
              textZh: '制造商仍须进行合格评定并保存技术文件；英国进口商负责核验合规并标注于标签。根据《温莎框架》，北爱尔兰要求使用CE标志。' },
            { title: 'REPORTING',
              textEn: 'Watch divergence: recognition applies to the EU requirements as listed in the UK instrument, and a live consultation would extend recognition to products certified under the EU ESPR ecodesign measures. Medical devices and construction products run on separate tracks.',
              textZh: '注意法规分化：承认范围以英国法规文件所列的欧盟要求为准，一项进行中的公众咨询拟将承认范围扩展至按欧盟ESPR生态设计措施认证的产品。医疗器械和建筑产品适用单独安排。' }
        ],
        reasonEn: 'One CE compliant product generally serves both the EU and the UK: Great Britain recognises CE indefinitely for most consumer goods, so separate UKCA testing is usually unnecessary, but check divergence per product rule.',
        reasonZh: '一件符合CE要求的产品通常可同时进入欧盟和英国市场：大不列颠对大多数消费品无限期承认CE，通常无需单独的UKCA测试，但须按产品法规逐项核查分化情况。'
    },
    {
        regId: 'ukreach', name: 'UK REACH', ref: 'Assimilated Reg. (EC) 1907/2006 (UK)',
        status: 'phasing', badge: 'new', newSince: '2026-09-09', markets: ['uk'],
        inForce: '1 January 2021 (GB regime, agency: HSE)',
        complianceDeadline: 'Transitional registrations due 27 October 2029 / 2030 / 2031 by tonnage band (extended by SI 2026/849)',
        eurlex: 'https://www.hse.gov.uk/reach/',
        categories: [], roles: [], sizes: [],
        sections: [
            { title: 'DOCUMENTATION',
              textEn: 'For finished consumer goods the main duties are the restrictions (the GB equivalent of Annex XVII, for example phthalates, azo dyes, nickel) and the duty to inform customers when a substance of very high concern exceeds 0.1% by weight. The GB SVHC candidate list diverges slowly from the EU list, so both need checking.',
              textZh: '对成品消费品而言，主要义务是限制物质清单（相当于欧盟附件XVII的英国版本，如邻苯二甲酸酯、偶氮染料、镍）以及当高度关注物质（SVHC）含量超过0.1%（重量比）时告知客户的义务。英国SVHC候选清单与欧盟清单正在缓慢分化，两份清单都须核查。' },
            { title: 'REPORTING',
              textEn: 'Substance registration deadlines were extended a second time in August 2026: 27 October 2029 for 1,000+ tonnes per year and CMRs, 2030 for 100+ tonnes, 2031 for 1+ tonne. Non UK companies act through a GB based Only Representative or their GB importer registers.',
              textZh: '物质注册截止日期已于2026年8月第二次延长：年吨位1,000吨以上及CMR物质为2029年10月27日，100吨以上为2030年，1吨以上为2031年。非英国企业须通过设于英国的唯一代表行事，或由其英国进口商注册。' },
            { title: 'PENALTIES',
              textEn: 'Enforced by the Health and Safety Executive; non compliant articles can be withdrawn from the GB market.',
              textZh: '由英国健康与安全执行局（HSE）执法；不合规物品可被撤出英国市场。' }
        ],
        reasonEn: 'Chemical restrictions and SVHC information duties apply separately in Great Britain, and the GB substance lists are drifting from the EU ones. Dual checking EU REACH and UK REACH is now part of compliance.',
        reasonZh: '化学品限制和SVHC告知义务在大不列颠单独适用，且英国物质清单正与欧盟清单逐渐分化。同时核查欧盟REACH和英国REACH已成为合规工作的一部分。'
    },
    {
        regId: 'uktr', name: 'UK Timber Regulation (UKTR)', ref: 'Assimilated Reg. (EU) 995/2010 (UK)',
        status: 'inforce', badge: 'new', newSince: '2026-09-09', markets: ['uk'],
        inForce: 'Regime since 2013; GB version since 1 January 2021',
        complianceDeadline: 'Ongoing due diligence for the first placer on the GB market',
        eurlex: 'https://www.gov.uk/guidance/regulations-timber-and-flegt-licences',
        categories: ['furniture', 'construction'], roles: [], sizes: [],
        sections: [
            { title: 'SUPPLY CHAIN',
              textEn: 'Illegally harvested timber is prohibited. The operator first placing timber, furniture or paper products on the GB market must run a documented due diligence system: species, harvest country, legality evidence, risk assessment and mitigation. Traders keep supplier and customer records for five years.',
              textZh: '禁止非法采伐的木材。首次将木材、家具或纸制品投放英国市场的经营者须建立书面尽职调查体系：树种、采伐国、合法性证明、风险评估和缓解措施。贸易商须保存供应商和客户记录五年。' },
            { title: 'PENALTIES',
              textEn: 'Enforced by the Office for Product Safety and Standards on behalf of Defra, escalating from warning letters to notices of remedial action and prosecution with unlimited fines.',
              textZh: '由产品安全与标准办公室（OPSS）代表英国环境食品与乡村事务部（Defra）执法，从警告信逐步升级至整改通知和刑事起诉，罚款无上限。' }
        ],
        reasonEn: 'Furniture and other timber products sold to the UK need legality due diligence just like under the EU timber rules. UK importers will ask for species, origin and harvest legality evidence.',
        reasonZh: '销往英国的家具及其他木制品需要与欧盟木材法规类似的合法性尽职调查。英国进口商将要求提供树种、原产地和采伐合法性证明。'
    },
    {
        regId: 'ukfrc', name: 'UK Deforestation Rules (Forest Risk Commodities)', ref: 'Environment Act 2021, Sch. 17 (UK)',
        status: 'prepare', badge: 'new', newSince: '2026-09-09', markets: ['uk'],
        inForce: 'Not yet in force: policy paper published 2 September 2026, legislation expected 2027',
        complianceDeadline: 'Expected from 2027; the EUDR already applies in Northern Ireland from 30 December 2026',
        eurlex: 'https://www.gov.uk/government/publications/the-uks-approach-to-deforestation-regulations/the-uks-approach-to-deforestation-regulations',
        categories: ['food', 'furniture'], roles: [], sizes: [],
        sections: [
            { title: 'SUPPLY CHAIN',
              textEn: 'The announced design: due diligence for GB businesses with turnover above GBP 1m using wood, cattle, cocoa, coffee, palm oil, rubber or soy and derived products (explicitly including chocolate and furniture), with geolocation data, built to operate consistently alongside the EUDR.',
              textZh: '已公布的制度设计：营业额超过100万英镑、使用木材、牛、可可、咖啡、棕榈油、橡胶或大豆及其衍生产品（明确包括巧克力和家具）的英国企业须开展尽职调查，包含地理定位数据，并与欧盟EUDR保持一致运作。' },
            { title: 'REPORTING',
              textEn: 'Proposed, not yet law: no secondary legislation has been laid. Under the Windsor Framework the EU Deforestation Regulation applies in Northern Ireland from 30 December 2026 for large and medium operators.',
              textZh: '尚为提案，未成为法律：配套细则尚未提交议会。根据《温莎框架》，欧盟毁林条例自2026年12月30日起适用于北爱尔兰的大中型经营者。' }
        ],
        reasonEn: 'The UK confirmed in September 2026 that it will regulate forest risk commodities in line with the EUDR. If you already build EUDR geolocation traceability, you are preparing for the UK rules too.',
        reasonZh: '英国已于2026年9月确认将参照EUDR监管森林风险商品。如果您已在建设EUDR地理定位追溯体系，即同时在为英国规则做准备。'
    },
    {
        regId: 'ukgreenclaims', name: 'UK Green Claims (DMCC Act)', ref: 'DMCC Act 2024 (UK)',
        status: 'inforce', badge: 'new', newSince: '2026-09-09', markets: ['uk'],
        inForce: '6 April 2025 (direct CMA consumer enforcement regime)',
        complianceDeadline: 'Ongoing',
        eurlex: 'https://www.gov.uk/government/publications/green-claims-code-making-environmental-claims',
        categories: [], roles: [], sizes: [],
        sections: [
            { title: 'DOCUMENTATION',
              textEn: 'Every environmental claim reaching UK consumers (eco, recycled, sustainable, carbon neutral) must be truthful, substantiated and consider the full life cycle, following the CMA Green Claims Code and the 2025 unfair commercial practices guidance.',
              textZh: '面向英国消费者的每一项环境声明（环保、再生、可持续、碳中和）都必须真实、有据可依并考虑完整生命周期，须遵循CMA《绿色声明准则》及2025年不公平商业行为指南。' },
            { title: 'SUPPLY CHAIN',
              textEn: 'CMA guidance from January 2026 states responsibility can fall on manufacturers, suppliers, distributors and marketplaces, not only the retailer making the claim, and retailers must take reasonable steps to verify supplier claims rather than pass them through. Keep an evidence file per claim.',
              textZh: 'CMA于2026年1月发布的指南指出，责任可及于制造商、供应商、分销商和线上平台，而不仅是作出声明的零售商；零售商须采取合理措施核实供应商声明，而非简单转述。请为每项声明建立证据档案。' },
            { title: 'PENALTIES',
              textEn: 'The CMA can fine up to 10% of global turnover directly, without going to court, plus personal fines up to GBP 300,000. Greenwashing is a declared enforcement priority.',
              textZh: 'CMA可不经法院直接处以最高相当于全球营业额10%的罚款，个人罚款最高30万英镑。打击洗绿是其明确的执法重点。' }
        ],
        reasonEn: 'Since April 2025 the CMA can fine greenwashing directly at up to 10% of global turnover, and its 2026 guidance points at suppliers feeding claims up the chain. Every recycled or organic claim you make needs evidence.',
        reasonZh: '自2025年4月起，CMA可对洗绿行为直接处以最高全球营业额10%的罚款，其2026年指南明确指向沿供应链向上传递声明的供应商。您作出的每一项再生或有机声明都需要证据。'
    },
    {
        regId: 'ukweee', name: 'UK WEEE', ref: 'SI 2013/3113 as amended (UK)',
        status: 'inforce', badge: 'new', newSince: '2026-09-09', markets: ['uk'],
        inForce: '1 January 2014; marketplace amendments in force 12 August 2025',
        complianceDeadline: 'Marketplace producers: first data report was due 31 January 2026, financing obligations from 2026',
        eurlex: 'https://www.gov.uk/guidance/regulations-waste-electrical-and-electronic-equipment',
        categories: ['electronics'], roles: [], sizes: [],
        sections: [
            { title: 'REPORTING',
              textEn: 'UK producers and importers of electrical and electronic equipment register through a compliance scheme, report EEE placed on the market by category and finance collection and recycling. Since 12 August 2025 online marketplaces count as producers for EEE sold to UK households by non UK sellers, and vapes are explicitly in scope.',
              textZh: '英国电气电子设备的生产商和进口商须通过合规计划注册，按类别报告投放市场的设备，并为收集和回收提供资金。自2025年8月12日起，线上平台就非英国卖家售予英国家庭的电气电子设备承担生产商责任，电子烟明确纳入范围。' },
            { title: 'SUPPLY CHAIN',
              textEn: 'Per product EEE category, weight and battery data must flow from the factory to the UK importer or brand owner. Direct to consumer sales via marketplaces no longer escape financing obligations.',
              textZh: '每个产品的设备类别、重量和电池数据须从工厂传递给英国进口商或品牌方。通过平台直销消费者的模式不再能规避出资义务。' }
        ],
        reasonEn: 'Electronics sold to the UK carry producer obligations for the importer, and since August 2025 marketplace sales from Asia are captured too. Expect UK customers to require category, weight and battery data per model.',
        reasonZh: '销往英国的电子产品使进口商承担生产商义务，自2025年8月起经平台从亚洲直销的产品同样被覆盖。英国客户将要求提供每个型号的类别、重量和电池数据。'
    },
    {
        regId: 'ukbatteries', name: 'UK Batteries Rules', ref: 'UK SIs 2008/2009',
        status: 'inforce', badge: 'new', newSince: '2026-09-09', markets: ['uk'],
        inForce: 'Placing on the market rules since 2008, producer obligations since 2009',
        complianceDeadline: 'GB reform expected to draw on EU Reg. 2023/1542; timing unconfirmed',
        eurlex: 'https://www.gov.uk/guidance/waste-batteries-producer-responsibility',
        categories: ['electronics'], roles: [], sizes: [],
        sections: [
            { title: 'PRODUCT DESIGN',
              textEn: 'The GB regime still follows the 2008/2009 rules: mercury and cadmium limits, capacity labelling, removability, producer registration and take back financing via the UK importer.',
              textZh: '英国现行制度仍遵循2008/2009年规则：汞和镉限量、容量标识、可拆卸性、生产商注册以及由英国进口商出资的回收义务。' },
            { title: 'SUPPLY CHAIN',
              textEn: 'Divergence flag: the EU Battery Regulation (2023/1542) applies in the EU and in Northern Ireland, including portable battery removability from 18 February 2027, years before an equivalent GB regime. Products sold on both markets should be designed to the EU timeline.',
              textZh: '分化提示：欧盟电池法规（2023/1542）适用于欧盟和北爱尔兰，包括自2027年2月18日起的便携式电池可拆卸要求，远早于英国的同等制度。同时销往两个市场的产品应按欧盟时间表设计。' }
        ],
        reasonEn: 'Battery rules are diverging: Great Britain still runs the 2008/2009 regime while the EU Battery Regulation timeline (including Northern Ireland) arrives first. Design to the EU requirements to cover both markets.',
        reasonZh: '电池规则正在分化：大不列颠仍执行2008/2009年制度，而欧盟电池法规的时间表（含北爱尔兰）更早到来。按欧盟要求设计即可覆盖两个市场。'
    }
];

const mutations = regs.map(r => ({ createOrReplace: {
    _id: `regulation-${r.regId}`, _type: 'regulation',
    regId: r.regId, name: r.name, ref: r.ref, status: r.status,
    badge: r.badge, newSince: r.newSince, markets: r.markets,
    inForce: r.inForce, complianceDeadline: r.complianceDeadline,
    lastReviewed: REVIEWED, eurlex: r.eurlex,
    sections: r.sections.map((s, i) => ({ _key: `s${i}`, title: s.title, textEn: s.textEn, textZh: s.textZh })),
    categories: r.categories, roles: r.roles, sizes: r.sizes,
    reasonEn: r.reasonEn, reasonZh: r.reasonZh,
    accessLevel: 'public'
}}));

mutations.push({ createOrReplace: {
    _id: 'deadline-ukreach-2029', _type: 'deadline',
    labelEn: 'UK REACH: first transitional registration deadline (1,000t+ and CMRs)',
    labelZh: '英国REACH：首个过渡性注册截止日（1,000吨以上及CMR物质）',
    date: '2029-10-27', regId: 'ukreach',
    affects: 'GB importers and Only Representatives of substances at 1,000+ t/y, CMRs at 1+ t/y',
    affectsZh: '年吨位1,000吨以上物质及1吨以上CMR物质的英国进口商和唯一代表',
    confidence: 'fixed'
}});

(async () => {
    const r = await fetch('https://bvmxf21v.api.sanity.io/v2024-01-01/data/mutate/production', {
        method: 'POST', headers: { Authorization: `Bearer ${TOKEN}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({ mutations })
    });
    const b = await r.json();
    if (!r.ok) { console.error('FAILED', JSON.stringify(b)); process.exit(1); }
    console.log(`OK: ${mutations.length} mutations (${b.transactionId})`);
})();
