// Adds Chinese translations to all regulation detail sections and the
// member guide body. Usage: SANITY_TOKEN=... node seed-translations.js
const PROJECT = 'bvmxf21v';
const DATASET = 'production';
const TOKEN = process.env.SANITY_TOKEN;
if (!TOKEN) { console.error('SANITY_TOKEN missing'); process.exit(1); }

// sections: regId -> array matching the seeded order, each {title, textEn, textZh}
const T = {
    csrd: [
        ['REPORTING', 'Double materiality assessment required. Report under European Sustainability Reporting Standards (ESRS) with third-party assurance.',
         '须进行双重重要性评估。按照欧洲可持续发展报告准则（ESRS）报告，并经第三方鉴证。'],
        ['SUPPLY CHAIN', 'Disclosure of Scope 3 emissions, supply chain due diligence processes, and supplier sustainability performance. Smaller suppliers are indirectly affected via their EU buyer\'s reporting obligations.',
         '须披露范围三排放、供应链尽职调查流程及供应商可持续发展表现。较小的供应商通过其欧盟买家的报告义务间接受到影响。'],
        ['PENALTIES', 'Penalties are set at member-state level and must be effective, proportionate and dissuasive. Example: Germany provides fines of up to €10M or 5% of turnover for capital-market-oriented companies.',
         '处罚由各成员国规定，须有效、相称并具威慑力。例如：德国对面向资本市场的公司规定最高1,000万欧元或营业额5%的罚款。']
    ],
    csddd: [
        ['SUPPLY CHAIN', 'Mandatory human rights and environmental due diligence under a risk-based approach: focus where adverse impacts are most likely and most severe across the chain of activities.',
         '基于风险的方法开展强制性人权与环境尽职调查：聚焦于活动链中不利影响最可能发生、最严重的环节。'],
        ['REPORTING', 'Annual due diligence statement on identified impacts and actions taken. (Omnibus I removed the mandatory climate transition plan adoption requirement.)',
         '每年发布尽职调查声明，说明已识别的影响及采取的措施。（Omnibus I取消了强制通过气候转型计划的要求。）'],
        ['PENALTIES', 'Fines capped at 3% of net worldwide turnover. Civil liability is governed by member-state national law (the EU-harmonised liability regime was removed by Omnibus I).',
         '罚款上限为全球净营业额的3%。民事责任由成员国国内法规定（欧盟统一民事责任制度已被Omnibus I取消）。']
    ],
    cbam: [
        ['REPORTING', 'Definitive regime since 1 January 2026: annual CBAM declarations (first due 30 September 2027). Importers below 50 tonnes/year cumulative are exempt under Reg. (EU) 2025/2083.',
         '自2026年1月1日起进入最终机制：每年提交CBAM申报（首份申报截止2027年9月30日）。根据法规 (EU) 2025/2083，年累计进口低于50公吨的进口商可获豁免。'],
        ['DOCUMENTATION', 'Verified emissions data from production facilities. CBAM certificates must be purchased to cover embedded carbon (certificate sales start February 2027).',
         '须提供经核实的生产设施排放数据。须购买CBAM证书以覆盖内含碳排放（证书自2027年2月起销售）。'],
        ['PENALTIES', 'Penalties for non-reporting: 10-50 EUR per tonne of unreported emissions. Certificate shortfall penalties mirror EU ETS prices.',
         '未申报处罚：每公吨未申报排放10至50欧元。证书不足的处罚参照欧盟ETS价格。']
    ],
    eudr: [
        ['SUPPLY CHAIN', 'Due diligence system to verify products are deforestation-free. Geolocation data required for production plots.',
         '须建立尽职调查体系，核实产品未涉毁林。须提供生产地块的地理定位数据。'],
        ['DOCUMENTATION', 'Due diligence statements for each shipment. Traceability records maintained for 5 years minimum.',
         '每批货物须提交尽职调查声明。可追溯记录至少保存5年。'],
        ['PENALTIES', 'Member states must provide for maximum fines of at least 4% of EU-wide turnover. Product confiscation and market bans.',
         '成员国规定的最高罚款须不低于欧盟营业额的4%。可没收产品并禁止进入市场。']
    ],
    batteries: [
        ['PRODUCT DESIGN', 'Minimum recycled content thresholds. Removability and replaceability requirements for portable batteries.',
         '设定最低再生材料含量门槛。便携式电池须满足可拆卸和可更换要求。'],
        ['DOCUMENTATION', 'Battery passport (digital) required for EV, LMT and industrial >2 kWh batteries from 18 February 2027. Labelling/QR requirements apply from 18 August 2026; the carbon footprint declaration awaits its delegated act (methodology still pending).',
         '自2027年2月18日起，电动车、轻型交通工具及2千瓦时以上工业电池须配备数字电池护照。标签/二维码要求自2026年8月18日起适用；碳足迹声明尚待授权法案（方法学仍未出台）。'],
        ['SUPPLY CHAIN', 'Due diligence for cobalt, lithium, nickel, and natural graphite sourcing — postponed to 18 August 2027 by Reg. (EU) 2025/1561. Collection and recycling targets.',
         '钴、锂、镍及天然石墨采购的尽职调查——已由法规 (EU) 2025/1561 推迟至2027年8月18日。设有回收和再利用目标。']
    ],
    microplastics: [
        ['PRODUCT DESIGN', 'Ban on intentionally added microplastics (synthetic polymers <5mm). Reformulation required for restricted products.',
         '禁止故意添加微塑料（小于5毫米的合成聚合物）。受限产品须重新配方。'],
        ['DOCUMENTATION', 'Instructions for use to minimize microplastic release. Reporting obligations on quantities placed on market.',
         '须提供减少微塑料释放的使用说明。对投放市场的数量负有报告义务。'],
        ['PENALTIES', 'Product withdrawal from market. National enforcement penalties apply based on member state implementation.',
         '产品可能被撤出市场。各成员国按其实施规定执行处罚。']
    ],
    ecodesign: [
        ['PRODUCT DESIGN', 'Performance requirements for durability, repairability, recyclability, energy efficiency, and resource use.',
         '对耐用性、可维修性、可回收性、能效及资源使用设定性能要求。'],
        ['DOCUMENTATION', 'Digital Product Passport (DPP) required. Technical documentation on environmental performance throughout lifecycle.',
         '须配备数字产品护照（DPP），并提供覆盖全生命周期环境表现的技术文件。'],
        ['PENALTIES', 'Products failing to meet requirements cannot be placed on the EU market. Withdrawal and recall orders possible.',
         '不符合要求的产品不得投放欧盟市场，并可能被责令撤回或召回。']
    ],
    righttorepair: [
        ['PRODUCT DESIGN', 'Products must be designed for repair. Spare parts available for minimum period. Anti-repair practices prohibited.',
         '产品须以可维修为设计原则。备件须在最短期限内可获得。禁止阻碍维修的做法。'],
        ['DOCUMENTATION', 'Repair information and manuals accessible to consumers and independent repairers. Repair scoring transparency.',
         '维修信息和手册须向消费者及独立维修商开放。维修评分保持透明。'],
        ['PENALTIES', 'National penalties for non-compliance. Consumers gain right to repair beyond warranty. Potential collective redress.',
         '不合规由各国处罚。消费者在保修期外仍享有维修权，并可能提起集体救济。']
    ],
    greenclaims: [
        ['DOCUMENTATION', 'All environmental claims must be substantiated by scientific evidence and verified by accredited third-party bodies.',
         '所有环保声明须有科学证据支持，并经认可的第三方机构验证。'],
        ['REPORTING', 'Pre-approval system for environmental labels. Carbon offset-only claims banned. Lifecycle assessment methodology required.',
         '环保标签实行预先批准制度。禁止仅基于碳抵消的声明。须采用生命周期评估方法。'],
        ['PENALTIES', 'Fines up to 4% of annual turnover. Corrective statements required. Temporary market bans for repeat offenders.',
         '罚款最高达年营业额的4%。须发布更正声明。屡犯者可被暂时禁止进入市场。']
    ],
    empco: [
        ['DOCUMENTATION', 'Bans generic environmental claims ("eco-friendly", "green", "climate neutral") without recognised excellent environmental performance. Claims based solely on carbon offsetting are prohibited.',
         '禁止在无公认卓越环境表现的情况下使用泛泛环保声明（如"环保""绿色""气候中和"）。禁止仅基于碳抵消的声明。'],
        ['PRODUCT DESIGN', 'Sustainability labels only permitted if based on an approved certification scheme or established by public authorities. Durability and repairability information requirements.',
         '可持续标签仅在基于经批准的认证体系或由公共机构设立时方可使用。须提供耐用性和可维修性信息。'],
        ['PENALTIES', 'Enforced through national unfair-commercial-practices regimes; fines and injunctions vary by member state.',
         '通过各国不公平商业行为制度执行；罚款和禁令因成员国而异。']
    ],
    wfdtextiles: [
        ['SUPPLY CHAIN', 'Mandatory extended producer responsibility (EPR) for textiles and footwear in every member state. Producers (incl. importers and e-commerce sellers) pay fees funding collection, sorting and recycling.',
         '所有成员国对纺织品和鞋类实行强制性生产者责任延伸（EPR）。生产者（包括进口商和电商卖家）缴纳费用，用于回收、分拣和再利用。'],
        ['DOCUMENTATION', 'Producer registration in each member state where products are sold. Fees eco-modulated by durability, recyclability and recycled content.',
         '须在产品销售的每个成员国注册。费用按耐用性、可回收性和再生含量进行生态调节。'],
        ['PENALTIES', 'Non-registered producers may not place textiles on that member state\'s market. National enforcement and fines.',
         '未注册的生产者不得在该成员国市场投放纺织品。由各国执法并处以罚款。']
    ],
    rohs: [
        ['PRODUCT DESIGN', 'Maximum concentration limits for lead, mercury, cadmium, hexavalent chromium, PBB, and PBDE in electrical/electronic equipment.',
         '对电气电子设备中的铅、汞、镉、六价铬、多溴联苯（PBB）和多溴二苯醚（PBDE）设定最高浓度限值。'],
        ['DOCUMENTATION', 'EU Declaration of Conformity. Technical file with material composition evidence. CE marking required.',
         '须出具欧盟符合性声明，备有材料成分证明的技术文件，并加贴CE标志。'],
        ['PENALTIES', 'Non-compliant products barred from EU market. Product recalls, fines, and potential criminal liability in member states.',
         '不合规产品禁止进入欧盟市场。可能面临召回、罚款，在部分成员国还可能承担刑事责任。']
    ],
    ppwr: [
        ['PRODUCT DESIGN', 'Minimum recycled content in plastic packaging. Packaging must be recyclable and meet design-for-recycling criteria by 2030.',
         '塑料包装须含最低比例的再生材料。到2030年，包装须可回收并符合可回收设计标准。'],
        ['DOCUMENTATION', 'Labelling with material composition, reuse/recycling instructions. Producer responsibility declarations.',
         '须标注材料成分及重复使用/回收说明，并提交生产者责任声明。'],
        ['PENALTIES', 'Products with non-compliant packaging cannot be placed on EU market. National enforcement with fines and product withdrawal.',
         '包装不合规的产品不得投放欧盟市场。各国执法，可处以罚款并撤回产品。']
    ],
    forcedlabour: [
        ['SUPPLY CHAIN', 'Prohibition on placing products made with forced labour on the EU market. Applies at any stage of production, manufacture, harvest, or extraction.',
         '禁止将涉及强迫劳动的产品投放欧盟市场。适用于生产、制造、收获或开采的任何环节。'],
        ['DOCUMENTATION', 'Competent authorities can request supply chain information and evidence that products are forced-labour-free. Burden of proof on operators. The Commission published implementation guidelines, the Forced Labour Single Portal and the risk database on 26 June 2026.',
         '主管机关可要求提供供应链信息及产品不涉强迫劳动的证据，举证责任在经营者。欧盟委员会已于2026年6月26日发布实施指南、强迫劳动统一门户及风险数据库。'],
        ['PENALTIES', 'Product bans from EU market. Mandatory withdrawal and disposal of non-compliant goods already in circulation.',
         '产品可被禁止进入欧盟市场。已流通的不合规货物须强制撤回并处置。']
    ],
    dpp: [
        ['DOCUMENTATION', 'Unique product identifier linked to digital record containing materials, origin, carbon footprint, repairability score, and end-of-life instructions.',
         '唯一产品标识符关联数字记录，包含材料、原产地、碳足迹、可维修性评分及报废处理说明。'],
        ['SUPPLY CHAIN', 'Data must flow from raw material suppliers through manufacturing to point of sale. Interoperable data format required.',
         '数据须从原材料供应商经制造环节流转至销售终端，并采用可互操作的数据格式。'],
        ['PRODUCT DESIGN', 'Products must carry data carrier (QR code or RFID) enabling consumer and authority access to passport information.',
         '产品须带有数据载体（二维码或RFID），使消费者和监管机构能够访问护照信息。']
    ]
};

const b = (text, style, listItem) => ({
    _type: 'block', style: style || 'normal',
    ...(listItem ? { listItem, level: 1 } : {}),
    _key: Math.random().toString(36).slice(2, 10),
    markDefs: [],
    children: [{ _type: 'span', _key: Math.random().toString(36).slice(2, 10), text, marks: [] }]
});

const bodyZh = [
    b('已决定的内容——以及仍未确定的部分', 'h2'),
    b('2026年7月6日，欧洲议会环境委员会以56票对11票通过了对CBAM修订案的谈判立场，支持将CBAM扩展至457种下游钢铝产品类别——欧盟委员会2025年12月的提案仅列出约180种。全会表决预计于2026年9月举行，随后与理事会进行三方会谈；最终立法预计在2026年底或2027年初通过，自2028年1月1日起适用。'),
    b('在三方会谈结束前一切均未最终确定。但方向已十分明确，无论最终清单是180项还是457项，实际准备工作都是相同的。'),
    b('扩展清单上的产品类别', 'h2'),
    b('紧固件：螺钉、螺栓、螺母、垫圈、铆钉（CN第73章）', 'normal', 'bullet'),
    b('钢铁制金属丝、缆线、弹簧和链条', 'normal', 'bullet'),
    b('钢制或铝制家居用品和厨房用具', 'normal', 'bullet'),
    b('铝结构件、型材、门窗框', 'normal', 'bullet'),
    b('含大量钢材的工具和五金件', 'normal', 'bullet'),
    b('带铝框的太阳能板', 'normal', 'bullet'),
    b('四步核查流程', 'h2'),
    b('第一步——梳理CN编码。从报关数据中提取所有含钢或铝SKU的8位CN编码。风险主要集中在CN第73章（钢铁制品）和第76章（铝制品）。'),
    b('第二步——称量金属。为每个候选SKU确定单件产品的钢、铝质量。CBAM义务跟随内含金属而定，因此按金属重量对产品线排序是合理的初步筛选方法。'),
    b('第三步——追溯金属来源。确定高风险SKU所用钢/铝来自哪些冶炼厂。议会文本中的反规避规则在怀疑存在规避时适用真实原产国默认值——转运或轻度加工的金属无法逃避。'),
    b('第四步——启动排放数据沟通。立即向受影响SKU的供应商索取产品级内含排放数据。经核实的实际数据优于默认值（默认值2026年附加10%上浮，2028年升至30%）——数据管道建立得越早，合规成本越低。'),
    b('与50公吨微量豁免的关系', 'h2'),
    b('现行的每年50公吨累计豁免（法规 (EU) 2025/2083）覆盖钢铁、铝、化肥和水泥。该豁免如何适用于下游产品是当前谈判的一部分——请勿基于"少量制成品可继续豁免"的假设制定合规策略。'),
    b('委员会如何提供帮助', 'h2'),
    b('GCC可持续发展委员会可为成员企业对接核查机构、分享核查模板，并将成员问题传递至商会在布鲁塞尔的网络。联系方式：gcc-sustainability@hongkong.ahk.de。')
];

const mutations = Object.entries(T).map(([regId, sections]) => ({
    patch: {
        id: `regulation-${regId}`,
        set: {
            sections: sections.map(([title, textEn, textZh], i) => ({ _key: `s${i}`, title, textEn, textZh }))
        }
    }
}));
mutations.push({ patch: { id: 'news-cbam457-guide', set: { bodyZh } } });

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
