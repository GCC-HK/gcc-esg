// Seeds 5 new regulation entries (verified 19 July 2026) + UK CBAM radar deadline.
// Usage: SANITY_TOKEN=... node seed-new-regs.js
const TOKEN = process.env.SANITY_TOKEN;
if (!TOKEN) { console.error('SANITY_TOKEN missing'); process.exit(1); }

const REVIEWED = '2026-07-19';

const regs = [
    {
        regId: 'gpsr', name: 'General Product Safety Regulation (GPSR)', ref: '(EU) 2023/988',
        status: 'inforce', badge: 'new', newSince: '2024-12-13', markets: ['eu', 'germany'],
        inForce: '12 June 2023 (applies since 13 December 2024)',
        complianceDeadline: 'Ongoing — applies to every consumer product placed on the EU market',
        eurlex: 'https://eur-lex.europa.eu/eli/reg/2023/988/oj/eng',
        categories: [], roles: [], sizes: [],
        sections: [
            { title: 'DOCUMENTATION',
              textEn: 'Every consumer product — CE-marked or not — needs an EU-established responsible economic operator (manufacturer, importer, authorised representative or fulfilment provider) whose name and address appear on the product or its packaging. Technical documentation and an internal risk analysis are required.',
              textZh: '每件消费品——无论是否带CE标志——都须有设立于欧盟的责任经济经营者（制造商、进口商、授权代表或履行服务商），其名称和地址须标注在产品或包装上。须备有技术文件和内部风险分析。' },
            { title: 'REPORTING',
              textEn: 'Accidents must be reported via the Safety Business Gateway. Online marketplaces must provide a single contact point, cooperate with Safety Gate and remove dangerous-product listings within 2 working days. Commission application guidelines published 19 November 2025.',
              textZh: '事故须通过Safety Business Gateway报告。线上平台须设立统一联络点、配合Safety Gate，并在2个工作日内下架危险产品。欧盟委员会已于2025年11月19日发布适用指南。' },
            { title: 'PENALTIES',
              textEn: 'Member-state level. Germany: revised Product Safety Act (in force 19 February 2026) with fines up to €100,000, profit-skimming, marketplace delisting orders and criminal liability for persistent violations.',
              textZh: '由成员国规定。德国：修订后的《产品安全法》（2026年2月19日生效）规定最高10万欧元罚款、没收违法所得、责令平台下架，屡犯者可承担刑事责任。' }
        ],
        reasonEn: 'Every consumer product you ship to the EU needs an EU responsible person and GPSR documentation — marketplaces and German retail QA teams now demand both before listing or shipping.',
        reasonZh: '您输往欧盟的每件消费品都需要欧盟责任人和GPSR文件——线上平台和德国零售质检团队现已在上架或发货前要求提供两者。'
    },
    {
        regId: 'ukcbam', name: 'UK CBAM', ref: 'Finance Act 2026 (UK)',
        status: 'prepare', badge: 'new', newSince: '2025-11-26', markets: ['uk'],
        inForce: 'Enacted via Finance Act 2026 (announced at Budget, 26 November 2025)',
        complianceDeadline: '1 January 2027 (first return and payment due by 31 May 2028)',
        eurlex: 'https://www.gov.uk/government/collections/carbon-border-adjustment-mechanism',
        categories: ['construction'], roles: ['supplier', 'importer'], sizes: [],
        sections: [
            { title: 'REPORTING',
              textEn: 'A tax on embedded emissions administered by HMRC — no certificates to buy, unlike EU CBAM. Covered sectors: aluminium, cement, fertilisers, hydrogen, iron & steel (glass and ceramics excluded for now). First accounting period is calendar year 2027, quarterly thereafter.',
              textZh: '由英国税务海关总署（HMRC）征收的内含排放税——与欧盟CBAM不同，无需购买证书。覆盖行业：铝、水泥、化肥、氢气、钢铁（玻璃和陶瓷暂不包括）。首个申报期为2027整个日历年，此后按季度申报。' },
            { title: 'DOCUMENTATION',
              textEn: 'Importers may use verified actual emissions data or government default values; sector-specific rates are set quarterly from UK ETS auction prices adjusted for free allowances. Deduction for carbon prices already paid abroad. Registration threshold: £50,000 of CBAM goods over 12 months.',
              textZh: '进口商可使用经核实的实际排放数据或政府默认值；行业税率按季度根据英国ETS拍卖价格（经免费配额调整）设定。境外已支付的碳价可抵扣。注册门槛：12个月内CBAM产品达5万英镑。' },
            { title: 'PENALTIES',
              textEn: 'HMRC enforcement with standard tax penalties for failure to register, report or pay.',
              textZh: '由HMRC执法，未注册、未申报或未缴税适用标准税务处罚。' }
        ],
        reasonEn: 'From January 2027, steel, aluminium and cement-based goods entering the UK are taxed on embedded emissions by HMRC — expect UK customers to request verifiable emissions data during 2026.',
        reasonZh: '自2027年1月起，进入英国的钢铁、铝和水泥类产品将由HMRC按内含排放征税——预计英国客户将在2026年内要求提供可核实的排放数据。'
    },
    {
        regId: 'toysafety', name: 'Toy Safety Regulation', ref: '(EU) 2025/2509',
        status: 'prepare', badge: 'new', newSince: '2025-12-12', markets: ['eu', 'germany'],
        inForce: '1 January 2026',
        complianceDeadline: 'Applies from 1 August 2030 (Directive 2009/48/EC remains applicable until then)',
        eurlex: 'https://eur-lex.europa.eu/eli/reg/2025/2509/oj/eng',
        categories: ['toys'], roles: [], sizes: [],
        sections: [
            { title: 'PRODUCT DESIGN',
              textEn: 'Expanded chemical restrictions, including bans on PFAS and certain endocrine disruptors in toys, plus updated mechanical and digital-safety requirements.',
              textZh: '扩大化学品限制，包括禁止玩具中的PFAS及某些内分泌干扰物，并更新机械安全和数字安全要求。' },
            { title: 'DOCUMENTATION',
              textEn: 'A toy Digital Product Passport replaces the paper EU declaration of conformity. Obligations for online marketplaces selling toys into the EU.',
              textZh: '玩具数字产品护照将取代纸质欧盟符合性声明。向欧盟销售玩具的线上平台承担相应义务。' },
            { title: 'PENALTIES',
              textEn: 'Member-state enforcement; non-compliant toys are barred from the EU market.',
              textZh: '由成员国执法；不合规玩具禁止进入欧盟市场。' }
        ],
        reasonEn: 'Toys get their own Digital Product Passport and stricter chemical rules from August 2030 — testing pipelines and material choices need updating well before, and both regimes run in parallel until then.',
        reasonZh: '自2030年8月起，玩具将拥有自己的数字产品护照并适用更严格的化学品规则——测试流程和材料选择须提前更新，在此之前新旧两套制度并行。'
    },
    {
        regId: 'lksg', name: 'German Supply Chain Act (LkSG)', ref: 'LkSG (Germany)',
        status: 'inforce', badge: 'updated', newSince: '2025-11-07', markets: ['germany'],
        inForce: '1 January 2023 (companies ≥1,000 employees since 2024)',
        complianceDeadline: 'Due diligence remains in force; to be replaced by Germany\'s CSDDD transposition (deadline 26 July 2028)',
        eurlex: 'https://www.gesetze-im-internet.de/lksg/',
        categories: [], roles: [], sizes: [],
        sections: [
            { title: 'SUPPLY CHAIN',
              textEn: 'Due diligence obligations remain fully in force for companies with ≥1,000 employees in Germany: risk management and analysis, preventive and remedial measures, complaints mechanism, BAFA oversight. The law was not abolished.',
              textZh: '对德国境内员工不少于1,000人的企业，尽职调查义务仍完全有效：风险管理与分析、预防和补救措施、投诉机制、联邦经济与出口管制局（BAFA）监督。该法并未废除。' },
            { title: 'REPORTING',
              textEn: 'The reporting obligation is dead in practice: BAFA deactivated its reporting portal on 7 November 2025, with retroactive relief from 2023. The amendment law (reducing sanctions to serious violations only) is in final parliamentary passage — first Bundestag reading 16 January 2026.',
              textZh: '报告义务实际上已终止：BAFA于2025年11月7日关闭报告门户，并追溯免除自2023年起的报告义务。修订法案（将处罚缩减至仅针对严重违规）正处于议会审议最后阶段——联邦议院2026年1月16日一读。' },
            { title: 'PENALTIES',
              textEn: 'BAFA fines remain possible for serious violations. In practice, German buyers cascade LkSG requirements to suppliers via contracts: codes of conduct, self-assessment questionnaires, audit rights and access to complaint mechanisms.',
              textZh: 'BAFA仍可对严重违规处以罚款。实践中，德国买家通过合同将LkSG要求传导给供应商：行为准则、自评问卷、审计权及投诉机制的使用。' }
        ],
        reasonEn: 'Your German buyers are legally required to manage supply-chain risks — codes of conduct, questionnaires, audit rights and complaint-mechanism access are standard contract terms, and CSDDD requirements will layer on top from 2029.',
        reasonZh: '您的德国买家依法必须管理供应链风险——行为准则、问卷、审计权和投诉机制已是标准合同条款，2029年起CSDDD要求还将叠加其上。'
    },
    {
        regId: 'uflpa', name: 'US UFLPA (Forced Labor)', ref: 'Public Law 117-78 (US)',
        status: 'inforce', badge: 'updated', newSince: '2025-08-19', markets: ['us'],
        inForce: '21 June 2022',
        complianceDeadline: 'Ongoing — rebuttable presumption applied at US import',
        eurlex: 'https://www.cbp.gov/trade/forced-labor/UFLPA',
        categories: [], roles: [], sizes: [],
        sections: [
            { title: 'SUPPLY CHAIN',
              textEn: 'Goods with any Xinjiang or Entity-List nexus — at any tier, any input — are presumed made with forced labour and barred from US import. The presumption can only be rebutted with clear and convincing evidence. Entity List: 144 entities (largest addition: 37 entities, January 2025).',
              textZh: '与新疆或实体清单有任何关联的货物——无论处于哪一层级、哪种原料——均被推定涉及强迫劳动并禁止进入美国。仅凭明确且令人信服的证据方可推翻推定。实体清单：144家实体（最大一次新增：2025年1月，37家）。' },
            { title: 'DOCUMENTATION',
              textEn: 'Full raw-material tracing required. CBP stopped ~7,300 shipments in FY2025 (+51% year on year); only ~6.5% of reviewed shipments were released. Priority sectors: cotton, polysilicon/solar, tomatoes, aluminium, PVC, seafood — plus, since August 2025: lithium, copper, caustic soda, steel and red dates.',
              textZh: '须实现原材料全程追溯。美国海关与边境保护局（CBP）2025财年拦截约7,300批货物（同比增长51%）；经审查的货物仅约6.5%获放行。重点行业：棉花、多晶硅/光伏、番茄、铝、PVC、海产品——自2025年8月起新增：锂、铜、烧碱、钢铁和红枣。' },
            { title: 'PENALTIES',
              textEn: 'Detention, exclusion or seizure of goods at the border; potential civil penalties under 19 U.S.C. § 1592.',
              textZh: '货物在边境被扣留、排除或没收；并可能依据《美国法典》第19编第1592条承担民事处罚。' }
        ],
        reasonEn: 'Selling to the US: any Xinjiang or Entity-List link anywhere in your supply chain triggers a border stop — and the priority-sector list now reaches lithium, copper and steel.',
        reasonZh: '向美国销售：供应链任何环节与新疆或实体清单存在关联即会在边境被拦截——重点行业清单现已扩展至锂、铜和钢铁。'
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
    _id: 'deadline-ukcbam-start', _type: 'deadline',
    labelEn: 'UK CBAM starts: tax on embedded emissions at UK import',
    labelZh: '英国CBAM启动：对输英产品内含排放征税',
    date: '2027-01-01', regId: 'ukcbam',
    affects: 'Steel, aluminium, cement, fertiliser & hydrogen goods sold to the UK',
    affectsZh: '销往英国的钢铁、铝、水泥、化肥及氢产品',
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
