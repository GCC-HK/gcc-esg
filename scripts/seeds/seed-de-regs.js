// Seeds the German national requirements set beyond EU law (owner question
// 2026-09-10: "why only one regulation for Germany?"). All facts verified
// 2026-09-10 against gesetze-im-internet.de, verpackungsregister.org (ZSVR),
// stiftung-ear.de, umweltbundesamt.de and recht.bund.de (BGBl). Key updates vs
// older material: VerpackG was REPLACED by the VerpackDG on 12 Aug 2026
// (BGBl. 2026 I Nr. 207); BattG was REPLACED by the BattDG on 7 Oct 2025
// (BGBl. 2025 I Nr. 233); ElektroG was amended in force 1 Jan 2026
// (BGBl. 2025 I Nr. 286); the UWG greenwashing amendment applies 27 Sep 2026.
// Recurring pattern: Germany requires a mandatory DOMESTIC authorised
// representative for non-established producers in all four EPR regimes.
// Usage: SANITY_TOKEN=... node seed-de-regs.js
const TOKEN = process.env.SANITY_TOKEN;
if (!TOKEN) { console.error('SANITY_TOKEN missing'); process.exit(1); }

const REVIEWED = '2026-09-10';

const regs = [
    {
        regId: 'verpackdg', name: 'German Packaging Law (VerpackDG + LUCID)', ref: 'VerpackDG (Germany, BGBl. 2026 I Nr. 207)',
        status: 'inforce', badge: 'new', newSince: '2026-09-10', markets: ['germany'],
        inForce: '12 August 2026 (replaced the VerpackG of 2017, same day the EU PPWR became applicable)',
        complianceDeadline: 'Ongoing: LUCID registration before placing packaged goods on the German market',
        eurlex: 'https://www.gesetze-im-internet.de/verpackdg/',
        categories: [], roles: [], sizes: [],
        sections: [
            { title: 'REPORTING',
              textEn: 'The party first making packaged goods available in Germany must register in the LUCID register of the ZSVR (free, cannot be delegated), participate in a dual system for household packaging before supplying, and report volumes. Existing LUCID registrations remain valid under the new law. The annual completeness declaration is due by 15 May above 80,000 kg glass, 50,000 kg paper or 30,000 kg other materials.',
              textZh: '首次在德国市场提供包装商品的一方须在ZSVR的LUCID登记系统注册（免费，不可委托他人代办），在供货前加入家庭包装双元回收系统并申报数量。现有LUCID注册在新法下继续有效。玻璃超过80,000公斤、纸张超过50,000公斤或其他材料超过30,000公斤时，须于每年5月15日前提交完整性声明。' },
            { title: 'SUPPLY CHAIN',
              textEn: 'Since 12 August 2026 the EU packaging regulation (PPWR) applies directly and the VerpackDG carries the German registration machinery forward. For retail private labels the German retailer counts as both packaging manufacturer and producer, even when an Asian factory produces and fills; suppliers deliver the conformity data (recyclability, recycled content, substance limits) upstream. Foreign companies selling packaged goods directly to German end customers must register themselves and must now appoint a German authorised representative.',
              textZh: '自2026年8月12日起，欧盟包装法规（PPWR）直接适用，VerpackDG延续了德国的注册机制。零售商自有品牌的情况下，德国零售商同时承担包装制造者和生产者责任，即使产品由亚洲工厂生产和灌装；供应商须向上游提供合规数据（可回收性、再生含量、物质限制）。直接向德国终端客户销售包装商品的外国企业须自行注册，并且现在必须委任一名德国授权代表。' },
            { title: 'PENALTIES',
              textEn: 'Fines up to €200,000 for missing system participation and €100,000 for missing registration; distribution bans apply, marketplaces must verify sellers and fulfilment providers must refuse service to unregistered producers.',
              textZh: '未参与回收系统最高罚款20万欧元，未注册最高罚款10万欧元；适用销售禁令，线上平台须核验卖家，履约服务商不得为未注册生产者提供服务。' }
        ],
        reasonEn: 'Packaged goods cannot be sold in Germany without LUCID registration and system participation. Direct sellers from Asia now also need a German authorised representative, and marketplaces must block unregistered producers.',
        reasonZh: '没有LUCID注册和系统参与，包装商品就无法在德国销售。从亚洲直接销售的企业现在还需要德国授权代表，线上平台必须屏蔽未注册的生产者。'
    },
    {
        regId: 'elektrog', name: 'German WEEE (ElektroG)', ref: 'ElektroG (Germany)',
        status: 'inforce', badge: 'new', newSince: '2026-09-10', markets: ['germany'],
        inForce: '24 October 2015; latest amendment in force 1 January 2026 (BGBl. 2025 I Nr. 286)',
        complianceDeadline: 'Ongoing: stiftung ear registration per brand and device type before placing on the market',
        eurlex: 'https://www.stiftung-ear.de/en/guides/applying-for-weee-registration-as-a-foreign-company/',
        categories: ['electronics'], roles: [], sizes: [],
        sections: [
            { title: 'REPORTING',
              textEn: 'Producers, a term that includes importers and foreign distance sellers, must register with stiftung ear per brand and device type before placing equipment on the German market, with an insolvency proof guarantee for consumer devices. The WEEE registration number must appear when offering devices and on invoices.',
              textZh: '生产者（包括进口商和外国远程销售商）须在设备投放德国市场前，按品牌和设备类型向stiftung ear注册，消费类设备还须提供防破产担保。WEEE注册号须在商品报价和发票上标明。' },
            { title: 'SUPPLY CHAIN',
              textEn: 'Foreign producers without a German establishment cannot register themselves: they must appoint exactly one German authorised representative with a written German language mandate. Marketplaces may not list, and fulfilment providers may not handle, devices of unregistered producers. A retailer selling unregistered devices is deemed producer itself.',
              textZh: '在德国没有营业机构的外国生产者不能自行注册：必须以德语书面授权委任唯一一名德国授权代表。线上平台不得展示、履约服务商不得处理未注册生产者的设备。销售未注册设备的零售商自身将被视为生产者。' },
            { title: 'DOCUMENTATION',
              textEn: 'Retail take back duties apply from 400 m² of electronics sales area (1:1, and 0:1 for devices under 25 cm). Since 2026 every sales point stocking e-cigarettes must take them back free of charge, and uniform collection point signage is mandatory, including in webshops.',
              textZh: '电子产品销售面积达400平方米起适用零售回收义务（以旧换新1:1，25厘米以下设备免购回收0:1）。自2026年起，所有销售电子烟的网点须免费回收，并须统一张贴回收点标识，网店同样适用。' },
            { title: 'PENALTIES',
              textEn: 'Distribution bans and fines up to €100,000 per case.',
              textZh: '适用销售禁令，每案最高罚款10万欧元。' }
        ],
        reasonEn: 'Electronics cannot ship to Germany without a stiftung ear registration, and foreign sellers must act through a German authorised representative. Fix in the sourcing contract who registers, who finances the guarantee, and that the crossed out bin mark is applied at the factory.',
        reasonZh: '没有stiftung ear注册，电子产品就无法进入德国，外国卖家必须通过德国授权代表行事。请在采购合同中明确由谁注册、由谁承担担保费用，以及在工厂完成打叉垃圾桶标识。'
    },
    {
        regId: 'battdg', name: 'German Battery Law (BattDG)', ref: 'BattDG (Germany, BGBl. 2025 I Nr. 233)',
        status: 'inforce', badge: 'new', newSince: '2026-09-10', markets: ['germany'],
        inForce: '7 October 2025 (replaced the BattG of 2009; implements EU Reg. 2023/1542)',
        complianceDeadline: 'Ongoing: ear registration per brand and battery category plus membership in an approved producer responsibility organisation',
        eurlex: 'https://www.stiftung-ear.de/themenwelten/hersteller/welche-pflichten-haben-hersteller-von-batterien/',
        categories: ['electronics'], roles: [], sizes: [],
        sections: [
            { title: 'REPORTING',
              textEn: 'Whoever first places batteries on the German market, including batteries built into devices, is the producer and must register with stiftung ear per brand and per battery category (portable, light means of transport, starter, industrial, electric vehicle) and join an approved producer responsibility organisation for each category.',
              textZh: '首次将电池（包括内置于设备中的电池）投放德国市场的一方即为生产者，须按品牌和电池类别（便携式、轻型交通工具、启动、工业、电动汽车）向stiftung ear注册，并按类别加入经批准的生产者责任组织。' },
            { title: 'SUPPLY CHAIN',
              textEn: 'Foreign producers cannot register themselves and must appoint exactly one German authorised representative; old registrations of companies without a German establishment were not carried over into the new regime. Distributors may not sell and fulfilment providers may not handle unregistered batteries, and a distributor that does inherits the full producer duties.',
              textZh: '外国生产者不能自行注册，必须委任唯一一名德国授权代表；没有德国营业机构的企业的旧注册未被延续到新制度。分销商不得销售、履约服务商不得处理未注册电池，违规销售的分销商将继承全部生产者义务。' },
            { title: 'PENALTIES',
              textEn: 'Fines up to €100,000 for registration and producer responsibility offences and up to €500,000 for battery due diligence breaches, plus distribution bans.',
              textZh: '注册和生产者责任违规最高罚款10万欧元，电池尽职调查违规最高罚款50万欧元，并适用销售禁令。' }
        ],
        reasonEn: 'Batteries and battery containing devices need a German ear registration per category via an authorised representative, plus membership in a producer responsibility organisation. Check every battery line against the register, the transition deadline of January 2026 has passed.',
        reasonZh: '电池及含电池设备须通过授权代表按类别完成德国ear注册，并加入生产者责任组织。请对照登记系统核查每一条电池产品线，2026年1月的过渡期限已过。'
    },
    {
        regId: 'ewkfonds', name: 'German Single Use Plastics Fund', ref: 'EWKFondsG (Germany)',
        status: 'inforce', badge: 'new', newSince: '2026-09-10', markets: ['germany'],
        inForce: '1 January 2024 (levy on quantities from 2024)',
        complianceDeadline: 'Ongoing: DIVID registration before placing products; annual quantity report by 15 May',
        eurlex: 'https://www.umweltbundesamt.de/ewkf',
        categories: [], roles: [], sizes: [],
        sections: [
            { title: 'REPORTING',
              textEn: 'Producers and first distributors of listed single use plastic products, including importers and foreign distance sellers, must register on the DIVID platform of the Federal Environment Agency before selling, and report quantities annually by 15 May. Covered products include food containers, cups, bags and film wrappers, beverage containers, carrier bags, wet wipes, balloons and tobacco filters; fireworks join from 2026 with the first levy for 2027.',
              textZh: '清单所列一次性塑料产品的生产者和首次分销商（包括进口商和外国远程销售商）须在销售前在联邦环境署的DIVID平台注册，并于每年5月15日前申报数量。覆盖产品包括食品容器、杯子、袋与薄膜包装、饮料容器、购物袋、湿巾、气球和烟草过滤嘴；烟花自2026年起纳入，2027年起首次征费。' },
            { title: 'DOCUMENTATION',
              textEn: 'The levy is charged per kilogram and product group: for example €0.177 for food containers, €1.236 for beverage cups, €3.801 for carrier bags, €0.876 for bags and film wrappers, up to €8.972 for tobacco filters. The rates are under their first scheduled review.',
              textZh: '征费按公斤和产品组收取：例如食品容器每公斤0.177欧元，饮料杯1.236欧元，购物袋3.801欧元，袋与薄膜包装0.876欧元，烟草过滤嘴最高8.972欧元。费率正处于首次例行评估中。' },
            { title: 'SUPPLY CHAIN',
              textEn: 'Foreign producers must first appoint a German confirmed authorised representative; registration and the annual report remain personal duties. Unregistered producers face a sales ban that binds retailers, marketplaces and fulfilment providers.',
              textZh: '外国生产者须先委任经确认的德国授权代表；注册和年度申报仍是本人义务。未注册生产者面临销售禁令，零售商、线上平台和履约服务商均受其约束。' },
            { title: 'PENALTIES',
              textEn: 'Fines up to €100,000.',
              textZh: '最高罚款10万欧元。' }
        ],
        reasonEn: 'Single use plastic products sold into Germany carry a per kilogram levy and a DIVID registration duty. Direct sellers from Asia need a German authorised representative before they start.',
        reasonZh: '销往德国的一次性塑料产品须按公斤缴纳征费并在DIVID注册。从亚洲直接销售的企业须先委任德国授权代表。'
    },
    {
        regId: 'uwggreen', name: 'German Greenwashing Ban (UWG)', ref: 'UWG amendment (Germany, EmpCo implementation)',
        status: 'phasing', badge: 'new', newSince: '2026-09-10', markets: ['germany'],
        inForce: 'Promulgated 19 February 2026',
        complianceDeadline: 'Applies from 27 September 2026 (same date as the EU EmpCo rules)',
        eurlex: 'https://www.gesetze-im-internet.de/uwg/',
        categories: [], roles: [], sizes: [],
        sections: [
            { title: 'DOCUMENTATION',
              textEn: 'From 27 September 2026 generic environmental claims such as climate neutral or eco friendly are banned in Germany unless recognised excellent environmental performance can be demonstrated, sustainability labels not based on a certification scheme are banned, and climate claims based on offsetting are banned.',
              textZh: '自2026年9月27日起，德国禁止使用碳中和、环保等泛化环境声明，除非能证明获得认可的卓越环境表现；禁止使用未基于认证体系的自创可持续标签；禁止基于碳抵消的气候声明。' },
            { title: 'SUPPLY CHAIN',
              textEn: 'The rules hit what German retailers print on products, packaging and web shops, so sourcing offices must screen artwork and supplier claims now. Enforcement runs through Germany\'s fast competitor warning system (Abmahnung) and consumer associations.',
              textZh: '这些规则直接影响德国零售商印在产品、包装和网店上的内容，采购办公室须立即排查设计稿和供应商声明。执法通过德国快速的同业警告函制度（Abmahnung）和消费者协会进行。' },
            { title: 'PENALTIES',
              textEn: 'Enforced through cease and desist warnings and court action by competitors and consumer associations; contested claims must come off products and shelves quickly.',
              textZh: '通过同业和消费者协会的警告函及法院诉讼执行；有争议的声明须迅速从产品和货架上撤下。' }
        ],
        reasonEn: 'From 27 September 2026 generic green claims on products for the German market are banned without recognised proof. Screen packaging artwork and supplier marketing claims before that date.',
        reasonZh: '自2026年9月27日起，面向德国市场的产品若无认可的证明，不得使用泛化绿色声明。请在该日期前排查包装设计稿和供应商营销声明。'
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
    _id: 'deadline-uwggreen-applies', _type: 'deadline',
    labelEn: 'German greenwashing ban applies: generic green claims banned without recognised proof',
    labelZh: '德国洗绿禁令生效：无认可证明不得使用泛化绿色声明',
    date: '2026-09-27', regId: 'uwggreen',
    affects: 'All products and marketing claims for the German market',
    affectsZh: '面向德国市场的所有产品及营销声明',
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
