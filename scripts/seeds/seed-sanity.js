// Seeds the Sanity dataset with regulations, deadlines and demo news posts.
// Usage: SANITY_TOKEN=... node seed-sanity.js
const PROJECT = 'bvmxf21v';
const DATASET = 'production';
const TOKEN = process.env.SANITY_TOKEN;
if (!TOKEN) { console.error('SANITY_TOKEN missing'); process.exit(1); }

const REVIEWED = '2026-07-18';

const regulations = [
    {
        regId: 'csrd', name: 'CSRD', ref: '(EU) 2022/2464', status: 'inforce',
        inForce: '5 January 2023',
        complianceDeadline: 'First reporting for FY2027, published 2028 (companies >1,000 employees & >€450M turnover)',
        eurlex: 'https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:32022L2464',
        categories: [], roles: [], sizes: ['large'],
        sections: [
            { title: 'REPORTING', textEn: 'Double materiality assessment required. Report under European Sustainability Reporting Standards (ESRS) with third-party assurance.' },
            { title: 'SUPPLY CHAIN', textEn: 'Disclosure of Scope 3 emissions, supply chain due diligence processes, and supplier sustainability performance. Smaller suppliers are indirectly affected via their EU buyer\'s reporting obligations.' },
            { title: 'PENALTIES', textEn: 'Penalties are set at member-state level and must be effective, proportionate and dissuasive. Example: Germany provides fines of up to €10M or 5% of turnover for capital-market-oriented companies.' }
        ],
        reasonEn: 'Under Omnibus I (Directive (EU) 2026/470, in force 18 March 2026), companies with >1,000 employees AND >€450M turnover report from FY2027 (first reports in 2028). Smaller suppliers are indirectly affected via their EU buyer\'s reporting obligations.',
        reasonZh: '根据Omnibus I修订指令（(EU) 2026/470，2026年3月18日生效），员工超过1,000人且营业额超过4.5亿欧元的企业自2027财年起报告（首份报告于2028年发布）。较小的供应商通过其欧盟买家的报告义务间接受到影响。'
    },
    {
        regId: 'csddd', name: 'CSDDD', ref: '(EU) 2024/1760', status: 'prepare',
        inForce: '25 July 2024',
        complianceDeadline: 'July 2029 (companies >5,000 employees & >€1.5B turnover)',
        eurlex: 'https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:32024L1760',
        categories: [], roles: [], sizes: ['large'],
        sections: [
            { title: 'SUPPLY CHAIN', textEn: 'Mandatory human rights and environmental due diligence under a risk-based approach: focus where adverse impacts are most likely and most severe across the chain of activities.' },
            { title: 'REPORTING', textEn: 'Annual due diligence statement on identified impacts and actions taken. (Omnibus I removed the mandatory climate transition plan adoption requirement.)' },
            { title: 'PENALTIES', textEn: 'Fines capped at 3% of net worldwide turnover. Civil liability is governed by member-state national law (the EU-harmonised liability regime was removed by Omnibus I).' }
        ],
        reasonEn: 'Under Omnibus I (Directive (EU) 2026/470), companies with >5,000 employees AND >€1.5B turnover must conduct risk-based supply chain due diligence from July 2029.',
        reasonZh: '根据Omnibus I修订指令（(EU) 2026/470），员工超过5,000人且营业额超过15亿欧元的企业须自2029年7月起开展基于风险的供应链尽职调查。'
    },
    {
        regId: 'cbam', name: 'CBAM', ref: '(EU) 2023/956', status: 'phasing',
        inForce: '1 October 2023 (transitional)',
        complianceDeadline: '1 January 2026 (definitive phase)',
        eurlex: 'https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:32023R0956',
        categories: ['construction'], roles: ['supplier', 'importer'], sizes: [],
        sections: [
            { title: 'REPORTING', textEn: 'Definitive regime since 1 January 2026: annual CBAM declarations (first due 30 September 2027). Importers below 50 tonnes/year cumulative are exempt under Reg. (EU) 2025/2083.' },
            { title: 'DOCUMENTATION', textEn: 'Verified emissions data from production facilities. CBAM certificates must be purchased to cover embedded carbon (certificate sales start February 2027).' },
            { title: 'PENALTIES', textEn: 'Penalties for non-reporting: 10-50 EUR per tonne of unreported emissions. Certificate shortfall penalties mirror EU ETS prices.' }
        ],
        reasonEn: 'As {role} of Construction Products, your iron & steel, cement and aluminium goods fall under CBAM\'s embedded-emissions declarations. A proposed extension (~180 downstream steel/aluminium products, e.g. car parts and appliances) may broaden coverage from 2028.',
        reasonZh: '{role}建筑材料，其中的钢铁、水泥和铝产品属于CBAM覆盖范围，须申报内含碳排放量。拟议的扩展方案（约180种下游钢铝产品，如汽车零部件和家电）可能自2028年起扩大覆盖范围。'
    },
    {
        regId: 'eudr', name: 'EUDR', ref: '(EU) 2023/1115', status: 'phasing',
        inForce: '29 June 2023 (application postponed twice)',
        complianceDeadline: '30 December 2026 (large & medium), 30 June 2027 (micro & small) — per Reg. (EU) 2025/2650',
        eurlex: 'https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:32023R1115',
        categories: ['furniture', 'food'], roles: [], sizes: [],
        sections: [
            { title: 'SUPPLY CHAIN', textEn: 'Due diligence system to verify products are deforestation-free. Geolocation data required for production plots.' },
            { title: 'DOCUMENTATION', textEn: 'Due diligence statements for each shipment. Traceability records maintained for 5 years minimum.' },
            { title: 'PENALTIES', textEn: 'Member states must provide for maximum fines of at least 4% of EU-wide turnover. Product confiscation and market bans.' }
        ],
        reasonEn: '{category} products may contain commodities covered by the EU Deforestation Regulation (cattle, cocoa, coffee, oil palm, rubber, soya, wood — cotton and other textile fibres are NOT in scope).',
        reasonZh: '{category}可能含有欧盟零毁林法规覆盖的原料（牛、可可、咖啡、油棕、橡胶、大豆、木材——棉花及其他纺织纤维不在范围内）。'
    },
    {
        regId: 'batteries', name: 'Batteries Regulation', ref: '(EU) 2023/1542', status: 'phasing',
        inForce: '17 August 2023 (applies from 18 February 2024)',
        complianceDeadline: '18 August 2026 (labelling), 18 February 2027 (battery passport), 18 August 2027 (due diligence)',
        eurlex: 'https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:32023R1542',
        categories: ['electronics'], roles: [], sizes: [],
        sections: [
            { title: 'PRODUCT DESIGN', textEn: 'Minimum recycled content thresholds. Removability and replaceability requirements for portable batteries.' },
            { title: 'DOCUMENTATION', textEn: 'Battery passport (digital) required for EV, LMT and industrial >2 kWh batteries from 18 February 2027. Labelling/QR requirements apply from 18 August 2026; the carbon footprint declaration awaits its delegated act (methodology still pending).' },
            { title: 'SUPPLY CHAIN', textEn: 'Due diligence for cobalt, lithium, nickel, and natural graphite sourcing — postponed to 18 August 2027 by Reg. (EU) 2025/1561. Collection and recycling targets.' }
        ],
        reasonEn: 'Electronics & Batteries products containing batteries must comply with lifecycle requirements from sourcing through recycling.',
        reasonZh: '含电池的电子产品须遵守从原材料采购到回收利用的全生命周期要求。'
    },
    {
        regId: 'microplastics', name: 'Microplastics Restriction', ref: '(EU) 2023/2055', status: 'inforce',
        inForce: '17 October 2023',
        complianceDeadline: 'Varies by product (2023-2035)',
        eurlex: 'https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:32023R2055',
        categories: ['cosmetics', 'textiles'], roles: [], sizes: [],
        sections: [
            { title: 'PRODUCT DESIGN', textEn: 'Ban on intentionally added microplastics (synthetic polymers <5mm). Reformulation required for restricted products.' },
            { title: 'DOCUMENTATION', textEn: 'Instructions for use to minimize microplastic release. Reporting obligations on quantities placed on market.' },
            { title: 'PENALTIES', textEn: 'Product withdrawal from market. National enforcement penalties apply based on member state implementation.' }
        ],
        reasonEn: '{category} products often contain intentionally added microplastics now restricted under REACH Annex XVII.',
        reasonZh: '{category}产品通常含有故意添加的微塑料，现已根据REACH附件XVII受到限制。'
    },
    {
        regId: 'ecodesign', name: 'Ecodesign for Sustainable Products (ESPR)', ref: '(EU) 2024/1781', status: 'prepare',
        inForce: '18 July 2024',
        complianceDeadline: 'First delegated acts expected 2026–2027 (iron & steel, textiles); obligations apply ~18 months after each act',
        eurlex: 'https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:32024R1781',
        categories: [], roles: [], sizes: [],
        sections: [
            { title: 'PRODUCT DESIGN', textEn: 'Performance requirements for durability, repairability, recyclability, energy efficiency, and resource use.' },
            { title: 'DOCUMENTATION', textEn: 'Digital Product Passport (DPP) required. Technical documentation on environmental performance throughout lifecycle.' },
            { title: 'PENALTIES', textEn: 'Products failing to meet requirements cannot be placed on the EU market. Withdrawal and recall orders possible.' }
        ],
        reasonEn: '{category} will require a Digital Product Passport and must meet sustainability performance criteria to access the EU market.',
        reasonZh: '{category}将需要数字产品护照，并须满足可持续性能标准方可进入欧盟市场。'
    },
    {
        regId: 'righttorepair', name: 'Right to Repair', ref: '(EU) 2024/1799', status: 'prepare',
        inForce: '30 July 2024',
        complianceDeadline: '31 July 2026 (member state transposition)',
        eurlex: 'https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:32024L1799',
        categories: ['electronics', 'furniture'], roles: [], sizes: [],
        sections: [
            { title: 'PRODUCT DESIGN', textEn: 'Products must be designed for repair. Spare parts available for minimum period. Anti-repair practices prohibited.' },
            { title: 'DOCUMENTATION', textEn: 'Repair information and manuals accessible to consumers and independent repairers. Repair scoring transparency.' },
            { title: 'PENALTIES', textEn: 'National penalties for non-compliance. Consumers gain right to repair beyond warranty. Potential collective redress.' }
        ],
        reasonEn: '{category} must be designed for repair with spare parts available, and consumers will gain extended repair rights.',
        reasonZh: '{category}必须设计为可维修，提供备件，消费者将获得延长的维修权利。'
    },
    {
        regId: 'greenclaims', name: 'Green Claims Directive', ref: 'COM/2023/166', status: 'prepare',
        inForce: 'Proposed March 2023 — negotiations suspended',
        complianceDeadline: 'Stalled: Commission announced intended withdrawal (June 2025); adoption not currently expected',
        eurlex: 'https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=COM:2023:166:FIN',
        categories: [], roles: ['brand', 'importer'], sizes: [],
        sections: [
            { title: 'DOCUMENTATION', textEn: 'All environmental claims must be substantiated by scientific evidence and verified by accredited third-party bodies.' },
            { title: 'REPORTING', textEn: 'Pre-approval system for environmental labels. Carbon offset-only claims banned. Lifecycle assessment methodology required.' },
            { title: 'PENALTIES', textEn: 'Fines up to 4% of annual turnover. Corrective statements required. Temporary market bans for repeat offenders.' }
        ],
        reasonEn: 'As {role}, note this proposal is currently stalled — but environmental claims are already regulated by the Empowering Consumers Directive (EU) 2024/825, applying from 27 September 2026.',
        reasonZh: '作为{role}，请注意该提案目前处于停滞状态——但环保声明已受《赋能消费者绿色转型指令》(EU) 2024/825监管，该指令自2026年9月27日起适用。'
    },
    {
        regId: 'empco', name: 'Empowering Consumers Directive', ref: '(EU) 2024/825', status: 'phasing',
        inForce: '26 March 2024',
        complianceDeadline: 'Rules apply from 27 September 2026 (member state transposition by 27 March 2026)',
        eurlex: 'https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:32024L0825',
        categories: [], roles: ['brand', 'importer'], sizes: [],
        sections: [
            { title: 'DOCUMENTATION', textEn: 'Bans generic environmental claims ("eco-friendly", "green", "climate neutral") without recognised excellent environmental performance. Claims based solely on carbon offsetting are prohibited.' },
            { title: 'PRODUCT DESIGN', textEn: 'Sustainability labels only permitted if based on an approved certification scheme or established by public authorities. Durability and repairability information requirements.' },
            { title: 'PENALTIES', textEn: 'Enforced through national unfair-commercial-practices regimes; fines and injunctions vary by member state.' }
        ],
        reasonEn: 'As {role}, any environmental marketing claims on products or packaging must comply with the new anti-greenwashing rules from 27 September 2026.',
        reasonZh: '作为{role}，自2026年9月27日起，产品或包装上的任何环保营销声明均须符合新的反"漂绿"规则。'
    },
    {
        regId: 'wfdtextiles', name: 'Textiles EPR (Waste Framework Directive)', ref: '(EU) 2025/1892', status: 'prepare',
        inForce: '16 October 2025',
        complianceDeadline: 'EPR schemes in all member states by 17 April 2028',
        eurlex: 'https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:32025L1892',
        categories: ['textiles'], roles: [], sizes: [],
        sections: [
            { title: 'SUPPLY CHAIN', textEn: 'Mandatory extended producer responsibility (EPR) for textiles and footwear in every member state. Producers (incl. importers and e-commerce sellers) pay fees funding collection, sorting and recycling.' },
            { title: 'DOCUMENTATION', textEn: 'Producer registration in each member state where products are sold. Fees eco-modulated by durability, recyclability and recycled content.' },
            { title: 'PENALTIES', textEn: 'Non-registered producers may not place textiles on that member state\'s market. National enforcement and fines.' }
        ],
        reasonEn: 'Textiles & Apparel producers selling into the EU will pay eco-modulated EPR fees in every member state — design for durability and recyclability directly lowers the fee.',
        reasonZh: '向欧盟销售的纺织品与服装生产商将在每个成员国缴纳按生态标准调节的生产者责任延伸（EPR）费用——耐用性和可回收性设计可直接降低费用。'
    },
    {
        regId: 'rohs', name: 'RoHS Directive', ref: '2011/65/EU', status: 'inforce',
        inForce: '21 July 2011',
        complianceDeadline: 'Ongoing (applies at point of market placement)',
        eurlex: 'https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:32011L0065',
        categories: ['electronics'], roles: [], sizes: [],
        sections: [
            { title: 'PRODUCT DESIGN', textEn: 'Maximum concentration limits for lead, mercury, cadmium, hexavalent chromium, PBB, and PBDE in electrical/electronic equipment.' },
            { title: 'DOCUMENTATION', textEn: 'EU Declaration of Conformity. Technical file with material composition evidence. CE marking required.' },
            { title: 'PENALTIES', textEn: 'Non-compliant products barred from EU market. Product recalls, fines, and potential criminal liability in member states.' }
        ],
        reasonEn: 'All electrical and electronic equipment placed on the EU market must comply with hazardous substance restrictions under RoHS.',
        reasonZh: '所有投放欧盟市场的电气和电子设备必须遵守RoHS有害物质限制。'
    },
    {
        regId: 'ppwr', name: 'Packaging & Packaging Waste Regulation (PPWR)', ref: '(EU) 2025/40', status: 'phasing',
        inForce: '11 February 2025',
        complianceDeadline: '12 August 2026 (first obligations apply)',
        eurlex: 'https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:32025R0040',
        categories: [], roles: [], sizes: [],
        sections: [
            { title: 'PRODUCT DESIGN', textEn: 'Minimum recycled content in plastic packaging. Packaging must be recyclable and meet design-for-recycling criteria by 2030.' },
            { title: 'DOCUMENTATION', textEn: 'Labelling with material composition, reuse/recycling instructions. Producer responsibility declarations.' },
            { title: 'PENALTIES', textEn: 'Products with non-compliant packaging cannot be placed on EU market. National enforcement with fines and product withdrawal.' }
        ],
        reasonEn: 'All {category} sold in the EU use packaging — the PPWR sets recyclability, recycled content, and labelling requirements for all packaging types.',
        reasonZh: '所有在欧盟销售的{category}均使用包装——PPWR对所有包装类型设定了可回收性、再生含量和标签要求。'
    },
    {
        regId: 'forcedlabour', name: 'EU Forced Labour Regulation', ref: '(EU) 2024/3015', status: 'prepare',
        inForce: '13 December 2024',
        complianceDeadline: '14 December 2027 (applies from)',
        eurlex: 'https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:32024R3015',
        categories: [], roles: [], sizes: [],
        sections: [
            { title: 'SUPPLY CHAIN', textEn: 'Prohibition on placing products made with forced labour on the EU market. Applies at any stage of production, manufacture, harvest, or extraction.' },
            { title: 'DOCUMENTATION', textEn: 'Competent authorities can request supply chain information and evidence that products are forced-labour-free. Burden of proof on operators. The Commission published implementation guidelines, the Forced Labour Single Portal and the risk database on 26 June 2026.' },
            { title: 'PENALTIES', textEn: 'Product bans from EU market. Mandatory withdrawal and disposal of non-compliant goods already in circulation.' }
        ],
        reasonEn: 'All products placed on the EU market — regardless of category or origin — must be free from forced labour at any stage of the supply chain.',
        reasonZh: '所有投放欧盟市场的产品——不论类别或原产地——在供应链的任何阶段均不得涉及强迫劳动。'
    },
    {
        regId: 'dpp', name: 'Digital Product Passport (DPP)', ref: 'Under (EU) 2024/1781 (ESPR)', status: 'phasing',
        inForce: '18 July 2024 (ESPR framework)',
        complianceDeadline: 'First delegated acts 2026–2027; DPP obligations expected 2027–2030 (textiles, furniture, steel & aluminium first)',
        eurlex: 'https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:32024R1781',
        categories: ['textiles', 'furniture', 'construction'], roles: [], sizes: [],
        sections: [
            { title: 'DOCUMENTATION', textEn: 'Unique product identifier linked to digital record containing materials, origin, carbon footprint, repairability score, and end-of-life instructions.' },
            { title: 'SUPPLY CHAIN', textEn: 'Data must flow from raw material suppliers through manufacturing to point of sale. Interoperable data format required.' },
            { title: 'PRODUCT DESIGN', textEn: 'Products must carry data carrier (QR code or RFID) enabling consumer and authority access to passport information.' }
        ],
        reasonEn: '{category} are among the first product categories in the ESPR Working Plan (April 2025) requiring a Digital Product Passport with lifecycle data accessible via QR code — obligations expected 2027–2030.',
        reasonZh: '根据ESPR工作计划（2025年4月），{category}是首批需要数字产品护照的产品类别，须通过二维码提供生命周期数据——义务预计于2027至2030年生效。'
    }
];

const deadlines = [
    { id: 'r2r-transposition', regId: 'righttorepair', labelEn: 'Right to Repair: member state transposition deadline', labelZh: '维修权指令：成员国转化截止日', date: '2026-07-31', affects: 'Electronics & furniture sold in the EU', affectsZh: '在欧盟销售的电子产品和家具', confidence: 'fixed' },
    { id: 'ppwr-applies', regId: 'ppwr', labelEn: 'PPWR packaging rules apply', labelZh: 'PPWR包装法规开始适用', date: '2026-08-12', affects: 'All packaged goods placed on the EU market', affectsZh: '所有投放欧盟市场的包装产品', confidence: 'fixed' },
    { id: 'battery-labelling', regId: 'batteries', labelEn: 'Battery labelling & QR requirements apply', labelZh: '电池标签和二维码要求生效', date: '2026-08-18', affects: 'All batteries and battery-containing products', affectsZh: '所有电池及含电池产品', confidence: 'fixed' },
    { id: 'empco-applies', regId: 'empco', labelEn: 'Empowering Consumers Directive: anti-greenwashing rules apply', labelZh: '赋能消费者指令：反漂绿规则生效', date: '2026-09-27', affects: 'All environmental marketing claims in the EU', affectsZh: '欧盟境内所有环保营销声明', confidence: 'fixed' },
    { id: 'eudr-large', regId: 'eudr', labelEn: 'EUDR applies (large & medium operators)', labelZh: 'EUDR开始适用（大中型企业）', date: '2026-12-30', affects: 'Wood, rubber, palm oil, soy, coffee, cocoa, cattle products', affectsZh: '木材、橡胶、棕榈油、大豆、咖啡、可可、牛类产品', confidence: 'fixed' },
    { id: 'cbam-certificates', regId: 'cbam', labelEn: 'CBAM certificate sales begin', labelZh: 'CBAM证书开始销售', date: '2027-02-01', affects: 'EU importers of steel, aluminium, cement, fertilisers, hydrogen', affectsZh: '钢铁、铝、水泥、化肥、氢气的欧盟进口商', confidence: 'fixed' },
    { id: 'battery-passport', regId: 'batteries', labelEn: 'Battery passport mandatory (EV, LMT, industrial >2 kWh)', labelZh: '电池护照强制实施（电动车、轻型交通工具及工业电池）', date: '2027-02-18', affects: 'EV, light transport & industrial battery producers', affectsZh: '电动车、轻型交通工具及工业电池生产商', confidence: 'fixed' },
    { id: 'eudr-small', regId: 'eudr', labelEn: 'EUDR applies (micro & small operators)', labelZh: 'EUDR开始适用（微型和小型企业）', date: '2027-06-30', affects: 'Smaller operators trading EUDR commodities', affectsZh: '经营EUDR产品的小型企业', confidence: 'fixed' },
    { id: 'battery-diligence', regId: 'batteries', labelEn: 'Battery supply chain due diligence applies', labelZh: '电池供应链尽职调查生效', date: '2027-08-18', affects: 'Producers using cobalt, lithium, nickel, graphite', affectsZh: '使用钴、锂、镍、石墨的生产商', confidence: 'fixed' },
    { id: 'cbam-declaration', regId: 'cbam', labelEn: 'First annual CBAM declaration due', labelZh: '首份CBAM年度申报截止', date: '2027-09-30', affects: 'EU importers of CBAM goods (>50 t/year)', affectsZh: 'CBAM产品的欧盟进口商（每年超过50公吨）', confidence: 'fixed' },
    { id: 'flr-applies', regId: 'forcedlabour', labelEn: 'EU Forced Labour Regulation applies', labelZh: '欧盟强迫劳动法规开始适用', date: '2027-12-14', affects: 'All products placed on the EU market', affectsZh: '所有投放欧盟市场的产品', confidence: 'fixed' },
    { id: 'cbam-downstream', regId: 'cbam', labelEn: 'CBAM downstream extension (~180 steel/aluminium products) — proposed', labelZh: 'CBAM下游产品扩展（约180种钢铝产品）——拟议中', date: '2028-01-01', affects: 'Car parts, appliances, cables, machinery (if adopted)', affectsZh: '汽车零部件、家电、电缆、机械（若获通过）', confidence: 'expected' },
    { id: 'textiles-epr', regId: 'wfdtextiles', labelEn: 'Textiles & footwear EPR schemes established in all member states', labelZh: '所有成员国建立纺织品和鞋类EPR制度', date: '2028-04-17', affects: 'Textile & footwear producers selling into the EU', affectsZh: '向欧盟销售的纺织品和鞋类生产商', confidence: 'fixed' },
    { id: 'csddd-applies', regId: 'csddd', labelEn: 'CSDDD due diligence obligations apply', labelZh: 'CSDDD尽职调查义务生效', date: '2029-07-26', affects: 'Companies >5,000 employees & >€1.5B turnover', affectsZh: '员工超过5,000人且营业额超过15亿欧元的企业', confidence: 'fixed' }
];

const news = [
    {
        id: 'news-r2r-deadline', slug: 'right-to-repair-transposition-deadline',
        titleEn: 'Right to Repair: transposition deadline lands 31 July — most member states are late',
        titleZh: '维修权指令：7月31日转化截止——多数成员国进度滞后',
        publishedAt: '2026-07-17T09:00:00Z', pillar: 'eu', accessLevel: 'public',
        whatHappenedEn: 'EU member states must transpose the Right to Repair Directive (EU) 2024/1799 into national law by 31 July 2026. As of mid-July, a majority of member states are still at draft stage, with Germany\'s implementation bill in committee.',
        whatHappenedZh: '欧盟成员国须于2026年7月31日前将维修权指令 (EU) 2024/1799 转化为国内法。截至7月中旬，多数成员国仍处于草案阶段。',
        whyItMattersEn: 'Once national laws land, producers of electronics and furniture must offer repair at reasonable cost, keep spare parts available, and cannot use anti-repair practices — obligations that reach back into the supply chain via buyer specifications.',
        whyItMattersZh: '国内法生效后，电子产品和家具生产商须以合理成本提供维修、保证备件供应——这些义务将通过买家规格要求传导至供应链。',
        supplierActionEn: 'Review spare-part supply commitments with your EU buyers now; late transposition does not delay the obligations once they arrive.',
        supplierActionZh: '请立即与欧盟买家确认备件供应承诺；成员国转化延迟并不推迟义务本身。',
        sources: ['https://commission.europa.eu/law/law-topic/consumer-protection-law/directive-repair-goods_en'],
        linkedRegIds: ['righttorepair']
    },
    {
        id: 'news-ppwr-countdown', slug: 'ppwr-applies-12-august',
        titleEn: 'Packaging rules go live: PPWR applies from 12 August 2026',
        titleZh: '包装新规生效：PPWR自2026年8月12日起适用',
        publishedAt: '2026-07-17T09:00:00Z', pillar: 'eu', accessLevel: 'public',
        whatHappenedEn: 'The Packaging & Packaging Waste Regulation (EU) 2025/40 becomes applicable on 12 August 2026 — the first obligations on labelling, minimisation and producer responsibility start to bite, with design-for-recycling grades and recycled-content minimums following by 2030.',
        whatHappenedZh: '《包装与包装废弃物法规》(EU) 2025/40 将于2026年8月12日开始适用——标签、减量化和生产者责任的首批义务开始生效。',
        whyItMattersEn: 'Every consumer product shipped into the EU is affected via its packaging. German retailers are already updating supplier packaging specifications for the 2027 season.',
        whyItMattersZh: '所有输欧消费品都将通过其包装受到影响。德国零售商已开始为2027年季度更新供应商包装规格。',
        supplierActionEn: 'Audit your packaging against the PPWR recyclability criteria and start collecting material composition data your buyers will request.',
        supplierActionZh: '请对照PPWR可回收性标准审核您的包装，并开始收集买家将要求提供的材料成分数据。',
        sources: ['https://eur-lex.europa.eu/eli/reg/2025/40/oj/eng'],
        linkedRegIds: ['ppwr']
    },
    {
        id: 'news-china-csds', slug: 'china-first-mandatory-esg-reports',
        titleEn: 'China\'s first mandatory sustainability reports are in — what the 30 April milestone means',
        titleZh: '中国首批强制性可持续发展报告已发布——4月30日里程碑的意义',
        publishedAt: '2026-07-17T09:00:00Z', pillar: 'china-hk', accessLevel: 'public',
        whatHappenedEn: 'Over 450 index-constituent and dual-listed companies published their first mandatory FY2025 sustainability reports by 30 April 2026 under the exchange rules, while the Ministry of Finance advances the national CSDS standards (climate standard in trial) toward a 2030 full rollout.',
        whatHappenedZh: '450多家指数成分股及境内外同时上市公司已按交易所规则于2026年4月30日前发布首份2025财年强制性可持续发展报告；财政部正推进全国CSDS准则（气候准则试行），目标2030年全面实施。',
        whyItMattersEn: 'Chinese manufacturers listed domestically now face disclosure obligations at home that overlap with EU buyer data requests — one data collection exercise can serve both.',
        whyItMattersZh: '在境内上市的中国制造商现在面临与欧盟买家数据要求重叠的披露义务——一次数据收集可同时满足两方需求。',
        supplierActionEn: 'If you are listed (or supply listed groups), align your ESG data collection with both CSDS and your EU buyers\' ESRS-based questionnaires.',
        supplierActionZh: '若您已上市（或为上市集团供货），请使ESG数据收集同时符合CSDS和欧盟买家基于ESRS的问卷要求。',
        sources: ['https://www.ifrs.org/content/dam/ifrs/publications/sustainability-jurisdictions/pdf-snapshots/china-ifrs-snapshot.pdf'],
        linkedRegIds: ['csrd']
    },
    {
        id: 'news-cbam-deminimis', slug: 'cbam-50-tonne-rule-explained',
        titleEn: 'Explainer: the CBAM 50-tonne rule — are you exempt?',
        titleZh: '解读：CBAM 50公吨规则——您是否可豁免？',
        publishedAt: '2026-07-17T09:00:00Z', pillar: 'explainer', accessLevel: 'public',
        whatHappenedEn: 'Since Regulation (EU) 2025/2083, importers whose cumulative CBAM-goods imports stay below 50 tonnes per year are exempt — removing roughly 90% of importers from scope while keeping ~99% of embedded emissions covered. The exemption does not apply to hydrogen or electricity.',
        whatHappenedZh: '根据法规 (EU) 2025/2083，每年累计进口CBAM产品低于50公吨的进口商可获豁免——约90%的进口商因此不在范围内，但约99%的内含排放量仍被覆盖。豁免不适用于氢气和电力。',
        whyItMattersEn: 'Many Hong Kong trading offices import small volumes of steel or aluminium components — most will fall under the threshold, but the 50 tonnes count cumulatively across ALL CBAM goods per importer.',
        whyItMattersZh: '许多香港贸易公司进口少量钢铝部件——多数将低于门槛，但50公吨是按每个进口商所有CBAM产品累计计算的。',
        supplierActionEn: 'Check your annual CBAM-goods tonnage with our calculator; if you are near the threshold, monitor volumes quarterly — exceeding it triggers full obligations.',
        supplierActionZh: '请使用我们的计算器核查您的年度CBAM产品吨位；若接近门槛，请按季度监控——超出即触发全部义务。',
        sources: ['https://taxation-customs.ec.europa.eu/carbon-border-adjustment-mechanism_en'],
        linkedRegIds: ['cbam']
    }
];

// Build mutations
const mutations = [];

for (const r of regulations) {
    mutations.push({ createOrReplace: {
        _id: `regulation-${r.regId}`,
        _type: 'regulation',
        regId: r.regId, name: r.name, ref: r.ref, status: r.status,
        inForce: r.inForce, complianceDeadline: r.complianceDeadline,
        lastReviewed: REVIEWED, eurlex: r.eurlex,
        sections: r.sections.map((s, i) => ({ _key: `s${i}`, title: s.title, textEn: s.textEn })),
        categories: r.categories, roles: r.roles, sizes: r.sizes,
        reasonEn: r.reasonEn, reasonZh: r.reasonZh,
        accessLevel: 'public'
    }});
}

for (const d of deadlines) {
    mutations.push({ createOrReplace: {
        _id: `deadline-${d.id}`,
        _type: 'deadline',
        labelEn: d.labelEn, labelZh: d.labelZh, date: d.date, regId: d.regId,
        affects: d.affects, affectsZh: d.affectsZh, confidence: d.confidence,
        regulation: undefined
    }});
}

for (const n of news) {
    mutations.push({ createOrReplace: {
        _id: n.id,
        _type: 'newsPost',
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

(async () => {
    const res = await fetch(`https://${PROJECT}.api.sanity.io/v2024-01-01/data/mutate/${DATASET}`, {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${TOKEN}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({ mutations })
    });
    const body = await res.json();
    if (!res.ok) {
        console.error('SEED FAILED', res.status, JSON.stringify(body, null, 2));
        process.exit(1);
    }
    console.log(`SEEDED: ${mutations.length} documents (transaction ${body.transactionId})`);
})();
