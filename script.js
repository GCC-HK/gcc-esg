// ===== LANGUAGE TOGGLE =====
let currentLang = localStorage.getItem('gcc-lang') || 'en';

function setLanguage(lang) {
    currentLang = lang;
    localStorage.setItem('gcc-lang', lang);
    document.documentElement.lang = lang === 'zh' ? 'zh-Hans' : 'en';

    if (lang === 'zh') {
        document.body.classList.add('zh');
    } else {
        document.body.classList.remove('zh');
    }

    // Update toggle buttons
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.lang === lang);
        btn.setAttribute('aria-pressed', String(btn.dataset.lang === lang));
    });

    // Update select options text
    document.querySelectorAll('select option[data-zh]').forEach(opt => {
        opt.textContent = lang === 'zh' ? opt.dataset.zh : opt.dataset.en;
    });

    // Update HS code input placeholder
    const hsInput = document.getElementById('hsCodeInput');
    if (hsInput) {
        hsInput.placeholder = lang === 'zh' ? '例如：8507' : 'e.g. 8507';
    }

    // Update CBAM input placeholders
    const cbamPlaceholders = [
        ['cbamVolume', '例如：500', 'e.g. 500'],
        ['cbamCnCode', '例如：72061000', 'e.g. 72061000'],
        ['cbamCustomEmissions', '例如：1.8', 'e.g. 1.8'],
        ['cbamCustomBenchmark', '例如：1.3', 'e.g. 1.3']
    ];
    cbamPlaceholders.forEach(([id, zh, en]) => {
        const el = document.getElementById(id);
        if (el) el.placeholder = lang === 'zh' ? zh : en;
    });
}

// Initialize language on load
setLanguage(currentLang);

// Bind toggle buttons
document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.addEventListener('click', () => setLanguage(btn.dataset.lang));
});

// ===== SECTION HEADER TRANSLATIONS FOR DYNAMIC CARDS =====
const sectionHeadersZh = {
    'REPORTING': '报告义务',
    'SUPPLY CHAIN': '供应链要求',
    'PRODUCT DESIGN': '产品设计',
    'DOCUMENTATION': '文件要求',
    'PENALTIES': '违规处罚'
};

const statusLabelsZh = {
    'IN FORCE': '已生效',
    'PHASING IN': '逐步实施',
    'PREPARE NOW': '立即准备'
};

// ===== REGULATIONS DATABASE =====
// Built-in fallback data. On load, the site fetches the live version from
// Sanity CMS via /api/content and replaces this array if available.
let regulations = [
    {
        id: 'csrd',
        name: 'CSRD',
        ref: '(EU) 2022/2464',
        status: 'inforce',
        statusLabel: 'IN FORCE',
        inForce: '5 January 2023',
        complianceDeadline: 'First reporting for FY2027, published 2028 (companies >1,000 employees & >€450M turnover)',
        lastReviewed: 'July 2026',
        eurlex: 'https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:32022L2464',
        sections: [
            { title: 'REPORTING', text: 'Double materiality assessment required. Report under European Sustainability Reporting Standards (ESRS) with third-party assurance.' },
            { title: 'SUPPLY CHAIN', text: 'Disclosure of Scope 3 emissions, supply chain due diligence processes, and supplier sustainability performance. Smaller suppliers are indirectly affected via their EU buyer\'s reporting obligations.' },
            { title: 'PENALTIES', text: 'Penalties are set at member-state level and must be effective, proportionate and dissuasive. Example: Germany provides fines of up to €10M or 5% of turnover for capital-market-oriented companies.' }
        ],
        applies: (cat, markets, role, size) => {
            const euMarket = markets.includes('eu') || markets.includes('germany');
            return euMarket && size === 'large';
        },
        reason: (cat, markets, role, size) => {
            return 'Under Omnibus I (Directive (EU) 2026/470, in force 18 March 2026), companies with >1,000 employees AND >€450M turnover report from FY2027 (first reports in 2028). Smaller suppliers are indirectly affected via their EU buyer\'s reporting obligations.';
        },
        reasonZh: (cat, markets, role, size) => {
            return '根据Omnibus I修订指令（(EU) 2026/470，2026年3月18日生效），员工超过1,000人且营业额超过4.5亿欧元的企业自2027财年起报告（首份报告于2028年发布）。较小的供应商通过其欧盟买家的报告义务间接受到影响。';
        }
    },
    {
        id: 'csddd',
        name: 'CSDDD',
        ref: '(EU) 2024/1760',
        status: 'prepare',
        statusLabel: 'PREPARE NOW',
        inForce: '25 July 2024',
        complianceDeadline: 'July 2029 (companies >5,000 employees & >€1.5B turnover)',
        lastReviewed: 'July 2026',
        eurlex: 'https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:32024L1760',
        sections: [
            { title: 'SUPPLY CHAIN', text: 'Mandatory human rights and environmental due diligence under a risk-based approach: focus where adverse impacts are most likely and most severe across the chain of activities.' },
            { title: 'REPORTING', text: 'Annual due diligence statement on identified impacts and actions taken. (Omnibus I removed the mandatory climate transition plan adoption requirement.)' },
            { title: 'PENALTIES', text: 'Fines capped at 3% of net worldwide turnover. Civil liability is governed by member-state national law (the EU-harmonised liability regime was removed by Omnibus I).' }
        ],
        applies: (cat, markets, role, size) => {
            const euMarket = markets.includes('eu') || markets.includes('germany');
            return euMarket && size === 'large';
        },
        reason: (cat, markets, role, size) => {
            return 'Under Omnibus I (Directive (EU) 2026/470), companies with >5,000 employees AND >€1.5B turnover must conduct risk-based supply chain due diligence from July 2029.';
        },
        reasonZh: (cat, markets, role, size) => {
            return '根据Omnibus I修订指令（(EU) 2026/470），员工超过5,000人且营业额超过15亿欧元的企业须自2029年7月起开展基于风险的供应链尽职调查。';
        }
    },
    {
        id: 'cbam',
        name: 'CBAM',
        ref: '(EU) 2023/956',
        status: 'phasing',
        statusLabel: 'PHASING IN',
        inForce: '1 October 2023 (transitional)',
        complianceDeadline: '1 January 2026 (definitive phase)',
        lastReviewed: 'July 2026',
        eurlex: 'https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:32023R0956',
        sections: [
            { title: 'REPORTING', text: 'Definitive regime since 1 January 2026: annual CBAM declarations (first due 30 September 2027). Importers below 50 tonnes/year cumulative are exempt under Reg. (EU) 2025/2083.' },
            { title: 'DOCUMENTATION', text: 'Verified emissions data from production facilities. CBAM certificates must be purchased to cover embedded carbon (certificate sales start February 2027).' },
            { title: 'PENALTIES', text: 'Penalties for non-reporting: 10-50 EUR per tonne of unreported emissions. Certificate shortfall penalties mirror EU ETS prices.' }
        ],
        applies: (cat, markets, role, size) => {
            const euMarket = markets.includes('eu') || markets.includes('germany');
            const relevantCat = cat === 'construction';
            const relevantRole = role === 'supplier' || role === 'importer';
            return euMarket && relevantCat && relevantRole;
        },
        reason: (cat, markets, role, size) => {
            const roleText = role === 'supplier' ? 'an exporter to the EU' : 'an EU-based importer';
            return `As ${roleText} of Construction Products, your iron & steel, cement and aluminium goods fall under CBAM's embedded-emissions declarations. A proposed extension (~180 downstream steel/aluminium products, e.g. car parts and appliances) may broaden coverage from 2028.`;
        },
        reasonZh: (cat, markets, role, size) => {
            const roleText = role === 'supplier' ? '向欧盟出口' : '作为欧盟进口商';
            return `${roleText}建筑材料，其中的钢铁、水泥和铝产品属于CBAM覆盖范围，须申报内含碳排放量。拟议的扩展方案（约180种下游钢铝产品，如汽车零部件和家电）可能自2028年起扩大覆盖范围。`;
        }
    },
    {
        id: 'eudr',
        name: 'EUDR',
        ref: '(EU) 2023/1115',
        status: 'phasing',
        statusLabel: 'PHASING IN',
        inForce: '29 June 2023 (application postponed twice)',
        complianceDeadline: '30 December 2026 (large & medium), 30 June 2027 (micro & small) — per Reg. (EU) 2025/2650',
        lastReviewed: 'July 2026',
        eurlex: 'https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:32023R1115',
        sections: [
            { title: 'SUPPLY CHAIN', text: 'Due diligence system to verify products are deforestation-free. Geolocation data required for production plots.' },
            { title: 'DOCUMENTATION', text: 'Due diligence statements for each shipment. Traceability records maintained for 5 years minimum.' },
            { title: 'PENALTIES', text: 'Member states must provide for maximum fines of at least 4% of EU-wide turnover. Product confiscation and market bans.' }
        ],
        applies: (cat, markets, role, size) => {
            const euMarket = markets.includes('eu') || markets.includes('germany');
            const relevantCat = ['furniture', 'food'].includes(cat);
            return euMarket && relevantCat;
        },
        reason: (cat, markets, role, size) => {
            const catName = { furniture: 'Furniture & Home Goods (wood-based)', food: 'Food & Packaging' }[cat] || cat;
            return `${catName} products may contain commodities covered by the EU Deforestation Regulation (cattle, cocoa, coffee, oil palm, rubber, soya, wood — cotton and other textile fibres are NOT in scope).`;
        },
        reasonZh: (cat, markets, role, size) => {
            const catName = { furniture: '家具与家居用品（木制品）', food: '食品与包装' }[cat] || cat;
            return `${catName}可能含有欧盟零毁林法规覆盖的原料（牛、可可、咖啡、油棕、橡胶、大豆、木材——棉花及其他纺织纤维不在范围内）。`;
        }
    },
    {
        id: 'batteries',
        name: 'Batteries Regulation',
        ref: '(EU) 2023/1542',
        status: 'phasing',
        statusLabel: 'PHASING IN',
        inForce: '17 August 2023 (applies from 18 February 2024)',
        complianceDeadline: '18 August 2026 (labelling), 18 February 2027 (battery passport), 18 August 2027 (due diligence)',
        lastReviewed: 'July 2026',
        eurlex: 'https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:32023R1542',
        sections: [
            { title: 'PRODUCT DESIGN', text: 'Minimum recycled content thresholds. Removability and replaceability requirements for portable batteries.' },
            { title: 'DOCUMENTATION', text: 'Battery passport (digital) required for EV, LMT and industrial >2 kWh batteries from 18 February 2027. Labelling/QR requirements apply from 18 August 2026; the carbon footprint declaration awaits its delegated act (methodology still pending).' },
            { title: 'SUPPLY CHAIN', text: 'Due diligence for cobalt, lithium, nickel, and natural graphite sourcing — postponed to 18 August 2027 by Reg. (EU) 2025/1561. Collection and recycling targets.' }
        ],
        applies: (cat, markets, role, size) => {
            const euMarket = markets.includes('eu') || markets.includes('germany');
            return euMarket && cat === 'electronics';
        },
        reason: (cat, markets, role, size) => {
            return 'Electronics & Batteries products containing batteries must comply with lifecycle requirements from sourcing through recycling.';
        },
        reasonZh: (cat, markets, role, size) => {
            return '含电池的电子产品须遵守从原材料采购到回收利用的全生命周期要求。';
        }
    },
    {
        id: 'microplastics',
        name: 'Microplastics Restriction',
        ref: '(EU) 2023/2055',
        status: 'inforce',
        statusLabel: 'IN FORCE',
        inForce: '17 October 2023',
        complianceDeadline: 'Varies by product (2023-2035)',
        lastReviewed: 'July 2026',
        eurlex: 'https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:32023R2055',
        sections: [
            { title: 'PRODUCT DESIGN', text: 'Ban on intentionally added microplastics (synthetic polymers <5mm). Reformulation required for restricted products.' },
            { title: 'DOCUMENTATION', text: 'Instructions for use to minimize microplastic release. Reporting obligations on quantities placed on market.' },
            { title: 'PENALTIES', text: 'Product withdrawal from market. National enforcement penalties apply based on member state implementation.' }
        ],
        applies: (cat, markets, role, size) => {
            const euMarket = markets.includes('eu') || markets.includes('germany');
            const relevantCat = ['cosmetics', 'textiles'].includes(cat);
            return euMarket && relevantCat;
        },
        reason: (cat, markets, role, size) => {
            const catName = cat === 'cosmetics' ? 'Cosmetics & Personal Care' : 'Textiles & Apparel';
            return `${catName} products often contain intentionally added microplastics now restricted under REACH Annex XVII.`;
        },
        reasonZh: (cat, markets, role, size) => {
            const catName = cat === 'cosmetics' ? '化妆品与个人护理' : '纺织品与服装';
            return `${catName}产品通常含有故意添加的微塑料，现已根据REACH附件XVII受到限制。`;
        }
    },
    {
        id: 'ecodesign',
        name: 'Ecodesign for Sustainable Products (ESPR)',
        ref: '(EU) 2024/1781',
        status: 'prepare',
        statusLabel: 'PREPARE NOW',
        inForce: '18 July 2024',
        complianceDeadline: 'First delegated acts expected 2026–2027 (iron & steel, textiles); obligations apply ~18 months after each act',
        lastReviewed: 'July 2026',
        eurlex: 'https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:32024R1781',
        sections: [
            { title: 'PRODUCT DESIGN', text: 'Performance requirements for durability, repairability, recyclability, energy efficiency, and resource use.' },
            { title: 'DOCUMENTATION', text: 'Digital Product Passport (DPP) required. Technical documentation on environmental performance throughout lifecycle.' },
            { title: 'PENALTIES', text: 'Products failing to meet requirements cannot be placed on the EU market. Withdrawal and recall orders possible.' }
        ],
        applies: (cat, markets, role, size) => {
            const euMarket = markets.includes('eu') || markets.includes('germany');
            return euMarket && cat !== '';
        },
        reason: (cat, markets, role, size) => {
            const catNames = { electronics: 'Electronics & Batteries', textiles: 'Textiles & Apparel', cosmetics: 'Cosmetics & Personal Care', toys: 'Toys', furniture: 'Furniture & Home Goods', food: 'Food & Packaging', construction: 'Construction Products', other: 'your product category' };
            return `${catNames[cat] || 'Your products'} will require a Digital Product Passport and must meet sustainability performance criteria to access the EU market.`;
        },
        reasonZh: (cat, markets, role, size) => {
            const catNames = { electronics: '电子产品与电池', textiles: '纺织品与服装', cosmetics: '化妆品与个人护理', toys: '玩具', furniture: '家具与家居用品', food: '食品与包装', construction: '建筑材料', other: '您的产品类别' };
            return `${catNames[cat] || '您的产品'}将需要数字产品护照，并须满足可持续性能标准方可进入欧盟市场。`;
        }
    },
    {
        id: 'righttorepair',
        name: 'Right to Repair',
        ref: '(EU) 2024/1799',
        status: 'prepare',
        statusLabel: 'PREPARE NOW',
        inForce: '30 July 2024',
        complianceDeadline: '31 July 2026 (member state transposition)',
        lastReviewed: 'July 2026',
        eurlex: 'https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:32024L1799',
        sections: [
            { title: 'PRODUCT DESIGN', text: 'Products must be designed for repair. Spare parts available for minimum period. Anti-repair practices prohibited.' },
            { title: 'DOCUMENTATION', text: 'Repair information and manuals accessible to consumers and independent repairers. Repair scoring transparency.' },
            { title: 'PENALTIES', text: 'National penalties for non-compliance. Consumers gain right to repair beyond warranty. Potential collective redress.' }
        ],
        applies: (cat, markets, role, size) => {
            const euMarket = markets.includes('eu') || markets.includes('germany');
            const relevantCat = ['electronics', 'furniture'].includes(cat);
            return euMarket && relevantCat;
        },
        reason: (cat, markets, role, size) => {
            const catName = cat === 'electronics' ? 'Electronics' : 'Furniture & Home Goods';
            return `${catName} must be designed for repair with spare parts available, and consumers will gain extended repair rights.`;
        },
        reasonZh: (cat, markets, role, size) => {
            const catName = cat === 'electronics' ? '电子产品' : '家具与家居用品';
            return `${catName}必须设计为可维修，提供备件，消费者将获得延长的维修权利。`;
        }
    },
    {
        id: 'greenclaims',
        name: 'Green Claims Directive',
        ref: 'COM/2023/166',
        status: 'prepare',
        statusLabel: 'PREPARE NOW',
        inForce: 'Proposed March 2023 — negotiations suspended',
        complianceDeadline: 'Stalled: Commission announced intended withdrawal (June 2025); adoption not currently expected',
        lastReviewed: 'July 2026',
        eurlex: 'https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=COM:2023:166:FIN',
        sections: [
            { title: 'DOCUMENTATION', text: 'All environmental claims must be substantiated by scientific evidence and verified by accredited third-party bodies.' },
            { title: 'REPORTING', text: 'Pre-approval system for environmental labels. Carbon offset-only claims banned. Lifecycle assessment methodology required.' },
            { title: 'PENALTIES', text: 'Fines up to 4% of annual turnover. Corrective statements required. Temporary market bans for repeat offenders.' }
        ],
        applies: (cat, markets, role, size) => {
            const euMarket = markets.includes('eu') || markets.includes('germany');
            const relevantRole = role === 'brand' || role === 'importer';
            return euMarket && relevantRole;
        },
        reason: (cat, markets, role, size) => {
            const roleText = role === 'brand' ? 'a Brand/Retailer' : 'an EU-based importer';
            return `As ${roleText}, note this proposal is currently stalled — but environmental claims are already regulated by the Empowering Consumers Directive (EU) 2024/825, applying from 27 September 2026.`;
        },
        reasonZh: (cat, markets, role, size) => {
            const roleText = role === 'brand' ? '品牌/零售商' : '欧盟进口商';
            return `作为${roleText}，请注意该提案目前处于停滞状态——但环保声明已受《赋能消费者绿色转型指令》(EU) 2024/825监管，该指令自2026年9月27日起适用。`;
        }
    },
    {
        id: 'empco',
        name: 'Empowering Consumers Directive',
        ref: '(EU) 2024/825',
        status: 'phasing',
        statusLabel: 'PHASING IN',
        inForce: '26 March 2024',
        complianceDeadline: 'Rules apply from 27 September 2026 (member state transposition by 27 March 2026)',
        lastReviewed: 'July 2026',
        eurlex: 'https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:32024L0825',
        sections: [
            { title: 'DOCUMENTATION', text: 'Bans generic environmental claims ("eco-friendly", "green", "climate neutral") without recognised excellent environmental performance. Claims based solely on carbon offsetting are prohibited.' },
            { title: 'PRODUCT DESIGN', text: 'Sustainability labels only permitted if based on an approved certification scheme or established by public authorities. Durability and repairability information requirements.' },
            { title: 'PENALTIES', text: 'Enforced through national unfair-commercial-practices regimes; fines and injunctions vary by member state.' }
        ],
        applies: (cat, markets, role, size) => {
            const euMarket = markets.includes('eu') || markets.includes('germany');
            const relevantRole = role === 'brand' || role === 'importer';
            return euMarket && relevantRole;
        },
        reason: (cat, markets, role, size) => {
            const roleText = role === 'brand' ? 'a Brand/Retailer' : 'an EU-based importer';
            return `As ${roleText}, any environmental marketing claims on products or packaging must comply with the new anti-greenwashing rules from 27 September 2026.`;
        },
        reasonZh: (cat, markets, role, size) => {
            const roleText = role === 'brand' ? '品牌/零售商' : '欧盟进口商';
            return `作为${roleText}，自2026年9月27日起，产品或包装上的任何环保营销声明均须符合新的反"漂绿"规则。`;
        }
    },
    {
        id: 'wfdtextiles',
        name: 'Textiles EPR (Waste Framework Directive)',
        ref: '(EU) 2025/1892',
        status: 'prepare',
        statusLabel: 'PREPARE NOW',
        inForce: '16 October 2025',
        complianceDeadline: 'EPR schemes in all member states by 17 April 2028',
        lastReviewed: 'July 2026',
        eurlex: 'https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:32025L1892',
        sections: [
            { title: 'SUPPLY CHAIN', text: 'Mandatory extended producer responsibility (EPR) for textiles and footwear in every member state. Producers (incl. importers and e-commerce sellers) pay fees funding collection, sorting and recycling.' },
            { title: 'DOCUMENTATION', text: 'Producer registration in each member state where products are sold. Fees eco-modulated by durability, recyclability and recycled content.' },
            { title: 'PENALTIES', text: 'Non-registered producers may not place textiles on that member state\'s market. National enforcement and fines.' }
        ],
        applies: (cat, markets, role, size) => {
            const euMarket = markets.includes('eu') || markets.includes('germany');
            return euMarket && cat === 'textiles';
        },
        reason: (cat, markets, role, size) => {
            return 'Textiles & Apparel producers selling into the EU will pay eco-modulated EPR fees in every member state — design for durability and recyclability directly lowers the fee.';
        },
        reasonZh: (cat, markets, role, size) => {
            return '向欧盟销售的纺织品与服装生产商将在每个成员国缴纳按生态标准调节的生产者责任延伸（EPR）费用——耐用性和可回收性设计可直接降低费用。';
        }
    },
    {
        id: 'rohs',
        name: 'RoHS Directive',
        ref: '2011/65/EU',
        status: 'inforce',
        statusLabel: 'IN FORCE',
        inForce: '21 July 2011',
        complianceDeadline: 'Ongoing (applies at point of market placement)',
        lastReviewed: 'July 2026',
        eurlex: 'https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:32011L0065',
        sections: [
            { title: 'PRODUCT DESIGN', text: 'Maximum concentration limits for lead, mercury, cadmium, hexavalent chromium, PBB, and PBDE in electrical/electronic equipment.' },
            { title: 'DOCUMENTATION', text: 'EU Declaration of Conformity. Technical file with material composition evidence. CE marking required.' },
            { title: 'PENALTIES', text: 'Non-compliant products barred from EU market. Product recalls, fines, and potential criminal liability in member states.' }
        ],
        applies: (cat, markets, role, size) => {
            const euMarket = markets.includes('eu') || markets.includes('germany');
            return euMarket && cat === 'electronics';
        },
        reason: (cat, markets, role, size) => {
            return 'All electrical and electronic equipment placed on the EU market must comply with hazardous substance restrictions under RoHS.';
        },
        reasonZh: (cat, markets, role, size) => {
            return '所有投放欧盟市场的电气和电子设备必须遵守RoHS有害物质限制。';
        }
    },
    {
        id: 'ppwr',
        name: 'Packaging & Packaging Waste Regulation (PPWR)',
        ref: '(EU) 2025/40',
        status: 'phasing',
        statusLabel: 'PHASING IN',
        inForce: '11 February 2025',
        complianceDeadline: '12 August 2026 (first obligations apply)',
        lastReviewed: 'July 2026',
        eurlex: 'https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:32025R0040',
        sections: [
            { title: 'PRODUCT DESIGN', text: 'Minimum recycled content in plastic packaging. Packaging must be recyclable and meet design-for-recycling criteria by 2030.' },
            { title: 'DOCUMENTATION', text: 'Labelling with material composition, reuse/recycling instructions. Producer responsibility declarations.' },
            { title: 'PENALTIES', text: 'Products with non-compliant packaging cannot be placed on EU market. National enforcement with fines and product withdrawal.' }
        ],
        applies: (cat, markets, role, size) => {
            const euMarket = markets.includes('eu') || markets.includes('germany');
            return euMarket && cat !== '';
        },
        reason: (cat, markets, role, size) => {
            const catNames = { electronics: 'Electronics & Batteries', textiles: 'Textiles & Apparel', cosmetics: 'Cosmetics & Personal Care', toys: 'Toys', furniture: 'Furniture & Home Goods', food: 'Food & Packaging', construction: 'Construction Products', other: 'your product category' };
            return `All ${catNames[cat] || 'products'} sold in the EU use packaging — the PPWR sets recyclability, recycled content, and labelling requirements for all packaging types.`;
        },
        reasonZh: (cat, markets, role, size) => {
            const catNames = { electronics: '电子产品与电池', textiles: '纺织品与服装', cosmetics: '化妆品与个人护理', toys: '玩具', furniture: '家具与家居用品', food: '食品与包装', construction: '建筑材料', other: '您的产品类别' };
            return `所有在欧盟销售的${catNames[cat] || '产品'}均使用包装——PPWR对所有包装类型设定了可回收性、再生含量和标签要求。`;
        }
    },
    {
        id: 'forcedlabour',
        name: 'EU Forced Labour Regulation',
        ref: '(EU) 2024/3015',
        status: 'prepare',
        statusLabel: 'PREPARE NOW',
        inForce: '13 December 2024',
        complianceDeadline: '14 December 2027 (applies from)',
        lastReviewed: 'July 2026',
        eurlex: 'https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:32024R3015',
        sections: [
            { title: 'SUPPLY CHAIN', text: 'Prohibition on placing products made with forced labour on the EU market. Applies at any stage of production, manufacture, harvest, or extraction.' },
            { title: 'DOCUMENTATION', text: 'Competent authorities can request supply chain information and evidence that products are forced-labour-free. Burden of proof on operators.' },
            { title: 'PENALTIES', text: 'Product bans from EU market. Mandatory withdrawal and disposal of non-compliant goods already in circulation.' }
        ],
        applies: (cat, markets, role, size) => {
            const euMarket = markets.includes('eu') || markets.includes('germany');
            return euMarket && cat !== '';
        },
        reason: (cat, markets, role, size) => {
            return 'All products placed on the EU market — regardless of category or origin — must be free from forced labour at any stage of the supply chain.';
        },
        reasonZh: (cat, markets, role, size) => {
            return '所有投放欧盟市场的产品——不论类别或原产地——在供应链的任何阶段均不得涉及强迫劳动。';
        }
    },
    {
        id: 'dpp',
        name: 'Digital Product Passport (DPP)',
        ref: 'Under (EU) 2024/1781 (ESPR)',
        status: 'phasing',
        statusLabel: 'PHASING IN',
        inForce: '18 July 2024 (ESPR framework)',
        complianceDeadline: 'First delegated acts 2026–2027; DPP obligations expected 2027–2030 (textiles, furniture, steel & aluminium first)',
        lastReviewed: 'July 2026',
        eurlex: 'https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:32024R1781',
        sections: [
            { title: 'DOCUMENTATION', text: 'Unique product identifier linked to digital record containing materials, origin, carbon footprint, repairability score, and end-of-life instructions.' },
            { title: 'SUPPLY CHAIN', text: 'Data must flow from raw material suppliers through manufacturing to point of sale. Interoperable data format required.' },
            { title: 'PRODUCT DESIGN', text: 'Products must carry data carrier (QR code or RFID) enabling consumer and authority access to passport information.' }
        ],
        applies: (cat, markets, role, size) => {
            const euMarket = markets.includes('eu') || markets.includes('germany');
            const relevantCat = ['textiles', 'furniture', 'construction'].includes(cat);
            return euMarket && relevantCat;
        },
        reason: (cat, markets, role, size) => {
            const catName = { textiles: 'Textiles & Apparel', furniture: 'Furniture & Home Goods', construction: 'Construction Products (iron & steel, aluminium)' }[cat] || cat;
            return `${catName} are among the first product categories in the ESPR Working Plan (April 2025) requiring a Digital Product Passport with lifecycle data accessible via QR code — obligations expected 2027–2030.`;
        },
        reasonZh: (cat, markets, role, size) => {
            const catName = { textiles: '纺织品与服装', furniture: '家具与家居用品', construction: '建筑材料（钢铁、铝）' }[cat] || cat;
            return `根据ESPR工作计划（2025年4月），${catName}是首批需要数字产品护照的产品类别，须通过二维码提供生命周期数据——义务预计于2027至2030年生效。`;
        }
    }
];

// ===== NAVIGATION =====
const nav = document.getElementById('nav');

window.addEventListener('scroll', () => {
    if (window.scrollY > 10) {
        nav.classList.add('scrolled');
    } else {
        nav.classList.remove('scrolled');
    }
});

// Mobile menu toggle
const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');

navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('active');
    navLinks.classList.toggle('active');
});

navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        navToggle.classList.remove('active');
        navLinks.classList.remove('active');
    });
});

// ===== COMPASS WIZARD =====
const wizardPanes = document.querySelectorAll('.wizard-pane');
const wizardStepBtns = document.querySelectorAll('.wizard-step');

function currentWizardStep() {
    const active = document.querySelector('.wizard-pane.active');
    return active ? parseInt(active.dataset.pane, 10) : 1;
}

function goToStep(n) {
    wizardPanes.forEach(p => p.classList.toggle('active', p.dataset.pane === String(n)));
    wizardStepBtns.forEach(s => {
        const sn = parseInt(s.dataset.step, 10);
        s.classList.toggle('active', sn === n);
        s.classList.toggle('done', sn < n);
    });
}

function flashAttention(el) {
    el.classList.add('wizard-attention');
    setTimeout(() => el.classList.remove('wizard-attention'), 1200);
}

document.querySelectorAll('.wizard-next').forEach(btn => {
    btn.addEventListener('click', () => {
        const target = parseInt(btn.dataset.next, 10);
        if (target === 2 && !document.getElementById('filterCategory').value) {
            flashAttention(document.getElementById('wizardCatGrid'));
            return;
        }
        if (target === 3 && document.querySelectorAll('input[name="market"]:checked').length === 0) {
            flashAttention(document.getElementById('wizardMarkets'));
            return;
        }
        goToStep(target);
    });
});

document.querySelectorAll('.wizard-back').forEach(btn => {
    btn.addEventListener('click', () => goToStep(parseInt(btn.dataset.back, 10)));
});

// Step indicators: allow jumping back to completed steps
wizardStepBtns.forEach(s => {
    s.addEventListener('click', () => {
        const n = parseInt(s.dataset.step, 10);
        if (n < currentWizardStep()) goToStep(n);
    });
});

// Category buttons sync with the hidden select (kept for language + HS-lookup compatibility)
const catSelect = document.getElementById('filterCategory');

function syncCatButtons() {
    document.querySelectorAll('.wizard-cat').forEach(b => {
        b.classList.toggle('active', b.dataset.value === catSelect.value);
    });
}

document.querySelectorAll('.wizard-cat').forEach(btn => {
    btn.addEventListener('click', () => {
        catSelect.value = btn.dataset.value;
        syncCatButtons();
    });
});

catSelect.addEventListener('change', syncCatButtons);

// ===== ATLAS FILTER LOGIC =====
const atlasSubmit = document.getElementById('atlasSubmit');
const atlasCards = document.getElementById('atlasCards');
const atlasEmpty = document.getElementById('atlasEmpty');

atlasSubmit.addEventListener('click', () => {
    const category = document.getElementById('filterCategory').value;
    const markets = Array.from(document.querySelectorAll('input[name="market"]:checked')).map(cb => cb.value);
    const role = document.getElementById('filterRole').value;
    const size = document.getElementById('filterSize').value;

    const applicable = regulations.filter(reg => reg.applies(category, markets, role, size));

    if (applicable.length === 0) {
        atlasEmpty.innerHTML = `
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/></svg>
            <p><span class="lang-en">No regulations matched your current selection. Try selecting <strong>European Union</strong> or <strong>Germany</strong> as a target market, or adjust your product category and role.</span><span class="lang-zh">没有匹配您当前选择的法规。请尝试选择<strong>欧盟</strong>或<strong>德国</strong>作为目标市场，或调整您的产品类别和角色。</span></p>
        `;
        atlasEmpty.style.display = 'block';
        atlasCards.innerHTML = '';
        // Re-apply language state to new DOM
        if (currentLang === 'zh') {
            atlasEmpty.querySelectorAll('.lang-en').forEach(el => el.style.display = 'none');
            atlasEmpty.querySelectorAll('.lang-zh').forEach(el => el.style.display = 'inline');
        }
        return;
    }

    atlasEmpty.style.display = 'none';

    const renderRegCard = reg => {
        const badgeClass = `badge-${reg.status}`;
        const reasonEn = reg.reason(category, markets, role, size);
        const reasonZh = reg.reasonZh(category, markets, role, size);
        const statusZh = statusLabelsZh[reg.statusLabel] || reg.statusLabel;

        const sectionsHTML = reg.sections.map(s => {
            const titleZh = sectionHeadersZh[s.title] || s.title;
            const body = s.textZh
                ? `<p><span class="lang-en">${s.text}</span><span class="lang-zh">${s.textZh}</span></p>`
                : `<p>${s.text}</p>`;
            return `
            <div class="reg-section">
                <div class="reg-section-title"><span class="lang-en">${s.title}</span><span class="lang-zh">${titleZh}</span></div>
                ${body}
            </div>`;
        }).join('');

        return `
            <article class="reg-result">
                <div class="reg-result-header">
                    <div>
                        <div class="reg-result-title">${reg.name} <span class="reg-result-ref">${reg.ref}</span></div>
                    </div>
                    <span class="badge ${badgeClass}"><span class="lang-en">${reg.statusLabel}</span><span class="lang-zh">${statusZh}</span></span>
                </div>
                <p class="reg-result-reason"><span class="lang-en">${reasonEn}</span><span class="lang-zh">${reasonZh}</span></p>
                <div class="reg-result-sections">
                    ${sectionsHTML}
                </div>
                <div class="reg-result-footer">
                    <div class="reg-result-dates">
                        <span><span class="lang-en">In force from</span><span class="lang-zh">生效日期</span> ${reg.inForce}</span>
                        <span><span class="lang-en">Compliance deadline:</span><span class="lang-zh">合规截止日期:</span> ${reg.complianceDeadline}</span>
                        <span><span class="lang-en">Last reviewed:</span><span class="lang-zh">最近更新:</span> ${reg.lastReviewed}</span>
                    </div>
                    <span class="reg-result-links">
                        <a href="regulation.html?id=${reg.id}" class="reg-result-link"><span class="lang-en">Learn more &rarr;</span><span class="lang-zh">了解更多 &rarr;</span></a>
                        <a href="${reg.eurlex}" target="_blank" rel="noopener" class="reg-result-link"><span class="lang-en">Official text &rarr;</span><span class="lang-zh">官方原文 &rarr;</span></a>
                    </span>
                </div>
            </article>
        `;
    };

    const compassGroups = [
        { statuses: ['inforce'], en: 'ACT NOW', zh: '立即行动', descEn: 'Already in force — these rules apply to your products today.', descZh: '已生效——这些规则现已适用于您的产品。' },
        { statuses: ['phasing'], en: 'PREPARE', zh: '提前准备', descEn: 'Phasing in — compliance deadlines within the next 1–2 years.', descZh: '逐步实施——合规期限在未来1至2年内。' },
        { statuses: ['prepare'], en: 'WATCH', zh: '持续关注', descEn: 'Adopted or proposed — start building readiness now.', descZh: '已通过或拟议中——请立即开始准备。' }
    ];

    atlasCards.innerHTML = compassGroups.map(g => {
        const regs = applicable.filter(r => g.statuses.includes(r.status));
        if (!regs.length) return '';
        return `
            <div class="compass-group">
                <div class="compass-group-header">
                    <h3><span class="lang-en">${g.en}</span><span class="lang-zh">${g.zh}</span></h3>
                    <p><span class="lang-en">${g.descEn}</span><span class="lang-zh">${g.descZh}</span></p>
                </div>
                ${regs.map(renderRegCard).join('')}
            </div>`;
    }).join('');

    // Re-apply language state to newly rendered DOM
    if (currentLang === 'zh') {
        atlasCards.querySelectorAll('.lang-en').forEach(el => el.style.display = 'none');
        atlasCards.querySelectorAll('.lang-zh').forEach(el => el.style.display = 'inline');
    }

    document.getElementById('atlasResults').scrollIntoView({ behavior: 'smooth', block: 'start' });
});

// ===== HS CODE LOOKUP =====
const hsCategoryMap = [
    [1, 5, 'other'], [6, 15, 'food'], [16, 24, 'food'], [25, 27, 'construction'],
    [28, 32, 'other'], [33, 33, 'cosmetics'], [34, 38, 'other'], [39, 40, 'food'],
    [41, 43, 'textiles'], [44, 46, 'furniture'], [47, 49, 'food'], [50, 63, 'textiles'],
    [64, 67, 'other'], [68, 70, 'construction'], [71, 71, 'other'], [72, 83, 'construction'],
    [84, 85, 'electronics'], [86, 89, 'other'], [90, 92, 'electronics'], [93, 93, 'other'],
    [94, 94, 'furniture'], [95, 95, 'toys'], [96, 97, 'other']
];

const hsCategoryNames = {
    electronics: { en: 'Electronics & Batteries', zh: '电子产品与电池' },
    textiles: { en: 'Textiles & Apparel', zh: '纺织品与服装' },
    cosmetics: { en: 'Cosmetics & Personal Care', zh: '化妆品与个人护理' },
    toys: { en: 'Toys', zh: '玩具' },
    furniture: { en: 'Furniture & Home Goods', zh: '家具与家居用品' },
    food: { en: 'Food & Packaging', zh: '食品与包装' },
    construction: { en: 'Construction Products', zh: '建筑材料' },
    other: { en: 'Other', zh: '其他' }
};

function getHSCategory(chapter) {
    for (const [lo, hi, cat] of hsCategoryMap) {
        if (chapter >= lo && chapter <= hi) return cat;
    }
    return null;
}

function getHSSpecialNotes(code) {
    const chapter = parseInt(code.substring(0, 2), 10);
    const notes = [];
    if (code.startsWith('8507')) {
        notes.push({
            en: 'Battery-containing product \u2014 Batteries Regulation (EU) 2023/1542 applies with heightened requirements.',
            zh: '\u542b\u7535\u6c60\u4ea7\u54c1 \u2014 \u6b27\u76df\u7535\u6c60\u6cd5\u89c4 (EU) 2023/1542 \u9002\u7528\uff0c\u8981\u6c42\u66f4\u4e3a\u4e25\u683c\u3002'
        });
    }
    if (chapter === 44) {
        notes.push({
            en: 'Wood-based product \u2014 EU Deforestation Regulation (EUDR) due diligence required.',
            zh: '\u6728\u8d28\u4ea7\u54c1 \u2014 \u9700\u9075\u5b88\u6b27\u76df\u68ee\u6797\u780d\u4f10\u6cd5\u89c4 (EUDR) \u7684\u5c3d\u804c\u8c03\u67e5\u8981\u6c42\u3002'
        });
    }
    if (chapter === 33) {
        notes.push({
            en: 'Cosmetic product \u2014 Microplastics Regulation (EU) 2023/2055 likely applies.',
            zh: '\u5316\u5986\u54c1 \u2014 \u6b27\u76df\u5fae\u5851\u6599\u6cd5\u89c4 (EU) 2023/2055 \u53ef\u80fd\u9002\u7528\u3002'
        });
    }
    if (chapter === 95) {
        notes.push({
            en: 'Toy product \u2014 EU Toy Safety Directive 2009/48/EC applies; the new Toy Safety Regulation (EU) 2025/2509 (incl. toy Digital Product Passport) applies from 1 August 2030.',
            zh: '\u73a9\u5177\u4ea7\u54c1 \u2014 \u6b27\u76df\u73a9\u5177\u5b89\u5168\u6307\u4ee4 2009/48/EC \u9002\u7528\uff1b\u65b0\u7684\u73a9\u5177\u5b89\u5168\u6cd5\u89c4 (EU) 2025/2509\uff08\u542b\u73a9\u5177\u6570\u5b57\u4ea7\u54c1\u62a4\u7167\uff09\u81ea2030\u5e748\u67081\u65e5\u8d77\u9002\u7528\u3002'
        });
    }
    if (chapter >= 50 && chapter <= 63) {
        notes.push({
            en: 'Textile product \u2014 EU textiles EPR applies: producer responsibility schemes in all member states by April 2028 (Directive (EU) 2025/1892).',
            zh: '\u7eba\u7ec7\u54c1 \u2014 \u6b27\u76df\u7eba\u7ec7\u54c1\u751f\u4ea7\u8005\u8d23\u4efb\u5ef6\u4f38\uff08EPR\uff09\u9002\u7528\uff1a\u6240\u6709\u6210\u5458\u56fd\u987b\u4e8e2028\u5e744\u6708\u524d\u5efa\u7acb\u76f8\u5173\u5236\u5ea6\uff08\u6307\u4ee4 (EU) 2025/1892\uff09\u3002'
        });
    }
    return notes;
}

function escapeHtml(str) {
    if (!str) return '';
    const el = document.createElement('span');
    el.textContent = str;
    return el.innerHTML;
}

function extractHSDescription(data) {
    const sources = [data?.results, data?.data, Array.isArray(data) ? data : null];
    for (const arr of sources) {
        if (arr && arr.length > 0) {
            const item = arr[0];
            return item.text || item.description || item.cmdDescE || item.cmdDesc || item.commodity || null;
        }
    }
    return null;
}

async function lookupHSCode() {
    const input = document.getElementById('hsCodeInput');
    const resultDiv = document.getElementById('hsResult');
    const code = input.value.replace(/\D/g, '').substring(0, 6);
    input.value = code;

    if (code.length < 2) {
        resultDiv.innerHTML = '';
        return;
    }

    const chapter = parseInt(code.substring(0, 2), 10);

    // Show loading
    resultDiv.innerHTML = '<div class="hs-result hs-loading"><div class="hs-spinner"></div><span class="lang-en">Looking up HS code\u2026</span><span class="lang-zh">\u6b63\u5728\u67e5\u8be2HS\u7f16\u7801\u2026</span></div>';

    let description = null;
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 4000);

    try {
        try {
            const r1 = await fetch('https://comtradeapi.un.org/public/v1/getMetadata/HS?cmdCode=' + encodeURIComponent(code), { signal: controller.signal });
            if (r1.ok) description = extractHSDescription(await r1.json());
        } catch (e) {
            console.log('HS primary lookup failed:', e);
        }

        if (!description && !controller.signal.aborted) {
            try {
                const r2 = await fetch('https://comtradeapi.un.org/public/v1/previewTariffline/C/A/HS?cmdCode=' + encodeURIComponent(code), { signal: controller.signal });
                if (r2.ok) description = extractHSDescription(await r2.json());
            } catch (e) {
                console.log('HS fallback lookup failed:', e);
            }
        }
    } finally {
        clearTimeout(timeout);
    }

    const category = getHSCategory(chapter);

    if (!category) {
        resultDiv.innerHTML = '<div class="hs-result hs-not-found"><span class="lang-en">HS code not recognised. Please check and try again, or select a product category manually.</span><span class="lang-zh">\u672a\u627e\u5230\u8be5\u7f16\u7801\uff0c\u8bf7\u68c0\u67e5\u540e\u91cd\u8bd5\uff0c\u6216\u624b\u52a8\u9009\u62e9\u4ea7\u54c1\u7c7b\u522b\u3002</span></div>';
        return;
    }

    // Auto-select the matching category (and sync the wizard buttons)
    document.getElementById('filterCategory').value = category;
    document.getElementById('filterCategory').dispatchEvent(new Event('change'));

    const catName = hsCategoryNames[category];
    const notes = getHSSpecialNotes(code);
    const notesHtml = notes.map(n =>
        `<div class="hs-note"><span class="lang-en">${n.en}</span><span class="lang-zh">${n.zh}</span></div>`
    ).join('');
    const manualLink = '<a href="#" class="hs-manual-link" onclick="event.preventDefault();document.querySelector(\'#wizardCatGrid .wizard-cat\').focus()"><span class="lang-en">Not your product? Select manually above.</span><span class="lang-zh">\u4e0d\u662f\u60a8\u7684\u4ea7\u54c1\uff1f\u8bf7\u5728\u4e0a\u65b9\u624b\u52a8\u9009\u62e9\u3002</span></a>';

    if (description) {
        const safeDesc = escapeHtml(description);
        resultDiv.innerHTML =
            `<div class="hs-result hs-success">` +
                `<div class="hs-desc"><strong>${code}</strong> \u2014 ${safeDesc}` +
                    `<span class="lang-zh"><br>(\u4ee5\u4e0b\u4e3a\u56fd\u9645\u6807\u51c6\u82f1\u6587\u63cf\u8ff0\uff0c\u4e0e\u60a8\u7684\u8d38\u6613\u6587\u4ef6\u4e00\u81f4)</span>` +
                `</div>` +
                `<div class="hs-mapped"><span class="lang-en">Mapped to: ${catName.en}</span><span class="lang-zh">\u5bf9\u5e94\u7c7b\u522b\uff1a${catName.zh}</span></div>` +
                notesHtml + manualLink +
            `</div>`;
    } else {
        resultDiv.innerHTML =
            `<div class="hs-result hs-offline">` +
                `<div class="hs-offline-notice"><span class="lang-en">Live lookup unavailable \u2014 using offline mapping.</span><span class="lang-zh">\u5b9e\u65f6\u67e5\u8be2\u4e0d\u53ef\u7528\uff0c\u5df2\u5207\u6362\u81f3\u79bb\u7ebf\u5339\u914d\u3002</span></div>` +
                `<div class="hs-mapped"><span class="lang-en">Mapped to: ${catName.en}</span><span class="lang-zh">\u5bf9\u5e94\u7c7b\u522b\uff1a${catName.zh}</span></div>` +
                notesHtml + manualLink +
            `</div>`;
    }
}

document.getElementById('hsLookupBtn').addEventListener('click', lookupHSCode);
document.getElementById('hsCodeInput').addEventListener('keydown', function(e) {
    if (e.key === 'Enter') { e.preventDefault(); lookupHSCode(); }
});
document.getElementById('hsCodeInput').addEventListener('input', function() {
    this.value = this.value.replace(/\D/g, '').substring(0, 6);
});

// ===== CBAM CALCULATOR =====
// Indicative sector averages. Since 2026 the EU publishes country- and
// route-specific default values (IR 2025/2621, +10% mark-up in 2026 rising to
// +30% by 2028) and route-specific CBAM benchmarks (IR 2025/2620).
// Emission intensities are DIRECT emissions only for steel, aluminium and
// hydrogen — CBAM counts indirect (electricity) emissions only for cement,
// fertilisers and electricity.
const cbamSectorData = {
    steel_bof:            { emissions: 2.0,  benchmark: 1.248 },
    steel_eaf:            { emissions: 0.4,  benchmark: 0.215 },
    aluminium_primary:    { emissions: 1.5,  benchmark: 1.464 },
    aluminium_secondary:  { emissions: 0.4,  benchmark: 0.400 },
    cement:               { emissions: 0.8,  benchmark: 0.693 },
    fertilisers:          { emissions: 2.3,  benchmark: 1.570 },
    hydrogen:             { emissions: 10.4, benchmark: 6.840 }
};

// Headline carbon prices (€/tCO2e, mid-2026). CBAM Art. 9 credits only the
// price EFFECTIVELY PAID net of free allocation/rebates — actual deductions
// are usually lower than these headline rates.
const cbamCarbonPrices = {
    CN: 10, IN: 0, TR: 0, RU: 0, KR: 6, UA: 1,
    GB: 66, VN: 0, ID: 0, BR: 0, JP: 12, EG: 0, ZA: 15, OTHER: 0
};

const CBAM_PRICE = 75.28; // Q2 2026 certificate price (published 6 Jul 2026); quarterly in 2026, weekly from 2027
const CBAM_FREE_ALLOC_2026 = 0.975; // 2026 CBAM factor: 97.5% of the benchmark deducted; payable share reaches 100% by 2034

// Update default displays when sector changes
document.getElementById('cbamSector').addEventListener('change', function() {
    const data = cbamSectorData[this.value];
    const emD = document.getElementById('cbamEmissionsDefault');
    const bmD = document.getElementById('cbamBenchmarkDefault');
    if (data) {
        const emEn = `Sector default: ${data.emissions} tCO\u2082e/t`;
        const emZh = `行业默认值：${data.emissions} tCO\u2082e/t`;
        const bmEn = `EU benchmark: ${data.benchmark} tCO\u2082e/t`;
        const bmZh = `欧盟基准值：${data.benchmark} tCO\u2082e/t`;
        emD.innerHTML = `<span class="lang-en">${emEn}</span><span class="lang-zh">${emZh}</span>`;
        bmD.innerHTML = `<span class="lang-en">${bmEn}</span><span class="lang-zh">${bmZh}</span>`;
    } else {
        emD.innerHTML = '<span class="lang-en">Select a sector to see the default value</span><span class="lang-zh">\u8bf7\u5148\u9009\u62e9\u4ea7\u54c1\u7c7b\u522b\u4ee5\u67e5\u770b\u9ed8\u8ba4\u503c</span>';
        bmD.innerHTML = '<span class="lang-en">Select a sector to see the default value</span><span class="lang-zh">\u8bf7\u5148\u9009\u62e9\u4ea7\u54c1\u7c7b\u522b\u4ee5\u67e5\u770b\u9ed8\u8ba4\u503c</span>';
    }
    if (currentLang === 'zh') {
        [emD, bmD].forEach(el => {
            el.querySelectorAll('.lang-en').forEach(e => e.style.display = 'none');
            el.querySelectorAll('.lang-zh').forEach(e => e.style.display = 'inline');
        });
    }
});

// Role change: update volume label
document.querySelectorAll('input[name="cbamRole"]').forEach(r => {
    r.addEventListener('change', function() {
        const lbl = document.querySelector('label[for="cbamVolume"]');
        if (this.value === 'supplier') {
            lbl.innerHTML = '<span class="lang-en">Annual Export Volume to EU (metric tonnes)</span><span class="lang-zh">\u6bcf\u5e74\u5411\u6b27\u76df\u51fa\u53e3\u91cf\uff08\u516c\u5428\uff09</span>';
        } else {
            lbl.innerHTML = '<span class="lang-en">Annual Import Volume (metric tonnes)</span><span class="lang-zh">\u6bcf\u5e74\u8fdb\u53e3\u91cf\uff08\u516c\u5428\uff09</span>';
        }
        if (currentLang === 'zh') {
            lbl.querySelectorAll('.lang-en').forEach(e => e.style.display = 'none');
            lbl.querySelectorAll('.lang-zh').forEach(e => e.style.display = 'inline');
        }
    });
});

// Toggle custom inputs
document.querySelectorAll('input[name="cbamEmissionsMode"]').forEach(r => {
    r.addEventListener('change', function() {
        document.getElementById('cbamEmissionsCustom').style.display = this.value === 'custom' ? '' : 'none';
    });
});
document.querySelectorAll('input[name="cbamBenchmarkMode"]').forEach(r => {
    r.addEventListener('change', function() {
        document.getElementById('cbamBenchmarkCustom').style.display = this.value === 'custom' ? '' : 'none';
    });
});

function formatEuro(n) {
    return n.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 0 });
}

function fmtNum(n, d) {
    return n.toLocaleString('en-US', { minimumFractionDigits: d, maximumFractionDigits: d });
}

// Early de-minimis hint: answer the exemption question before the full form
const cbamVolumeInput = document.getElementById('cbamVolume');
if (cbamVolumeInput) {
    const hint = document.createElement('div');
    hint.className = 'cbam-volume-hint';
    hint.style.display = 'none';
    cbamVolumeInput.insertAdjacentElement('afterend', hint);
    cbamVolumeInput.addEventListener('input', function() {
        const v = parseFloat(this.value);
        if (!isNaN(v) && v > 0 && v < 50) {
            hint.innerHTML = '<span class="lang-en">Below 50 t/year: you are likely exempt from CBAM (Reg. (EU) 2025/2083) — unless your company\'s combined CBAM-goods imports exceed 50 t.</span><span class="lang-zh">低于每年50公吨：您很可能获得CBAM豁免（法规 (EU) 2025/2083）——除非贵公司全部CBAM产品进口合计超过50公吨。</span>';
            hint.style.display = '';
            applyLang(hint);
        } else {
            hint.style.display = 'none';
        }
    });
}

document.getElementById('cbamCalculate').addEventListener('click', function() {
    const sector = document.getElementById('cbamSector').value;
    const country = document.getElementById('cbamCountry').value;
    const volume = parseFloat(document.getElementById('cbamVolume').value);
    const emMode = document.querySelector('input[name="cbamEmissionsMode"]:checked').value;
    const bmMode = document.querySelector('input[name="cbamBenchmarkMode"]:checked').value;
    const role = document.querySelector('input[name="cbamRole"]:checked').value;
    const resultDiv = document.getElementById('cbamResult');

    if (!sector || !country || isNaN(volume) || volume <= 0) {
        resultDiv.innerHTML = '<div class="cbam-result-card cbam-error"><span class="lang-en">Please select a sector, country, and enter a valid export volume.</span><span class="lang-zh">\u8bf7\u9009\u62e9\u4ea7\u54c1\u7c7b\u522b\u3001\u539f\u4ea7\u56fd\u5e76\u8f93\u5165\u6709\u6548\u7684\u51fa\u53e3\u91cf\u3002</span></div>';
        if (currentLang === 'zh') { resultDiv.querySelectorAll('.lang-en').forEach(e => e.style.display = 'none'); resultDiv.querySelectorAll('.lang-zh').forEach(e => e.style.display = 'inline'); }
        return;
    }

    const sData = cbamSectorData[sector];
    const carbonPriceOrigin = cbamCarbonPrices[country] || 0;

    // Resolve emissions intensity
    let emissions = sData.emissions;
    const usingDefaultEmissions = emMode === 'default';
    if (!usingDefaultEmissions) {
        const v = parseFloat(document.getElementById('cbamCustomEmissions').value);
        if (isNaN(v) || v < 0) {
            resultDiv.innerHTML = '<div class="cbam-result-card cbam-error"><span class="lang-en">Please enter a valid emissions intensity value.</span><span class="lang-zh">\u8bf7\u8f93\u5165\u6709\u6548\u7684\u6392\u653e\u5f3a\u5ea6\u503c\u3002</span></div>';
            if (currentLang === 'zh') { resultDiv.querySelectorAll('.lang-en').forEach(e => e.style.display = 'none'); resultDiv.querySelectorAll('.lang-zh').forEach(e => e.style.display = 'inline'); }
            return;
        }
        emissions = v;
    }

    // Resolve benchmark
    let benchmark = sData.benchmark;
    if (bmMode === 'custom') {
        const v = parseFloat(document.getElementById('cbamCustomBenchmark').value);
        if (isNaN(v) || v < 0) {
            resultDiv.innerHTML = '<div class="cbam-result-card cbam-error"><span class="lang-en">Please enter a valid benchmark value.</span><span class="lang-zh">\u8bf7\u8f93\u5165\u6709\u6548\u7684\u57fa\u51c6\u503c\u3002</span></div>';
            if (currentLang === 'zh') { resultDiv.querySelectorAll('.lang-en').forEach(e => e.style.display = 'none'); resultDiv.querySelectorAll('.lang-zh').forEach(e => e.style.display = 'inline'); }
            return;
        }
        benchmark = v;
    }

    // CBAM Calculation — per-tonne basis
    const freeAllocPerT = benchmark * CBAM_FREE_ALLOC_2026;
    const liablePerT = Math.max(0, emissions - freeAllocPerT);
    const carbonCreditRatio = Math.min(1, carbonPriceOrigin / CBAM_PRICE);
    const creditPerT = liablePerT * carbonCreditRatio;
    const netCertPerT = Math.max(0, liablePerT - creditPerT);
    const costPerT = netCertPerT * CBAM_PRICE;

    // Totals
    const totalEmissions = volume * emissions;
    const freeAllocation = freeAllocPerT * volume;
    const cbamLiable = liablePerT * volume;
    const carbonCredit = creditPerT * volume;
    const netCertificates = netCertPerT * volume;
    const totalCost = costPerT * volume;

    // Default comparison (per-tonne)
    const defLiablePerT = Math.max(0, sData.emissions - freeAllocPerT);
    const defCreditPerT = defLiablePerT * carbonCreditRatio;
    const defCostPerT = Math.max(0, defLiablePerT - defCreditPerT) * CBAM_PRICE;
    const savingPerT = defCostPerT - costPerT;
    const savingTotal = savingPerT * volume;

    // Risk band (based on total cost)
    let badgeClass, badgeEn, badgeZh;
    if (totalCost < 10000) {
        badgeClass = 'cbam-badge-low'; badgeEn = 'LOW EXPOSURE'; badgeZh = '\u4f4e\u98ce\u9669';
    } else if (totalCost <= 100000) {
        badgeClass = 'cbam-badge-medium'; badgeEn = 'MEDIUM EXPOSURE'; badgeZh = '\u4e2d\u7b49\u98ce\u9669';
    } else {
        badgeClass = 'cbam-badge-high'; badgeEn = 'HIGH EXPOSURE'; badgeZh = '\u9ad8\u98ce\u9669';
    }

    const countryOpt = document.querySelector(`#cbamCountry option[value="${country}"]`);
    const countryNameEn = countryOpt?.dataset.en || country;
    const countryNameZh = countryOpt?.dataset.zh || country;

    let html;

    if (role === 'supplier') {
        // ─── SUPPLIER VIEW: per-tonne focus ───
        html = `<div class="cbam-result-card">
        <div class="cbam-result-summary">
            <div class="cbam-result-metric">
                <div class="cbam-metric-label"><span class="lang-en">CBAM Cost Per Tonne</span><span class="lang-zh">\u6bcf\u516c\u5428CBAM\u6210\u672c</span></div>
                <div class="cbam-metric-value cbam-cost-highlight">\u20ac${fmtNum(costPerT, 2)}<span style="font-size:0.6em;font-weight:600">/t</span></div>
            </div>
            <div class="cbam-result-metric">
                <div class="cbam-metric-label"><span class="lang-en">Certificates Per Tonne</span><span class="lang-zh">\u6bcf\u516c\u5428\u8bc1\u4e66\u6570</span></div>
                <div class="cbam-metric-value">${fmtNum(netCertPerT, 3)}<span style="font-size:0.6em;font-weight:600">/t</span></div>
            </div>
            <span class="badge ${badgeClass}"><span class="lang-en">${badgeEn}</span><span class="lang-zh">${badgeZh}</span></span>
        </div>
        <div class="cbam-total-line"><span class="lang-en">For your annual export of <strong>${fmtNum(volume,0)} tonnes</strong>: ${fmtNum(netCertificates,1)} certificates | <strong>\u20ac${formatEuro(totalCost)}</strong> total CBAM cost</span><span class="lang-zh">\u60a8\u7684\u5e74\u51fa\u53e3\u91cf <strong>${fmtNum(volume,0)} \u516c\u5428</strong>\uff1a${fmtNum(netCertificates,1)} \u4efd\u8bc1\u4e66 | \u603b\u8ba1 <strong>\u20ac${formatEuro(totalCost)}</strong></span></div>
        <div class="cbam-breakdown">
            <div class="cbam-breakdown-title"><span class="lang-en">Per-Tonne Breakdown</span><span class="lang-zh">\u6bcf\u516c\u5428\u8ba1\u7b97\u660e\u7ec6</span></div>
            <table>
                <tr>
                    <td><span class="lang-en">Emissions intensity</span><span class="lang-zh">\u6392\u653e\u5f3a\u5ea6</span></td>
                    <td>${fmtNum(emissions, 3)} tCO\u2082e/t</td>
                    <td></td>
                </tr>
                <tr class="cbam-row-deduct">
                    <td><span class="lang-en">EU benchmark allowance (97.5%)</span><span class="lang-zh">\u6b27\u76df\u57fa\u51c6\u514d\u8d39\u914d\u989d (97.5%)</span></td>
                    <td>\u2212${fmtNum(freeAllocPerT, 3)} tCO\u2082e/t</td>
                    <td class="cbam-formula">${benchmark} \u00d7 97.5%</td>
                </tr>
                <tr class="cbam-row-subtotal">
                    <td><span class="lang-en">CBAM-liable per tonne</span><span class="lang-zh">\u6bcf\u516c\u5428CBAM\u5e94\u7a0e\u91cf</span></td>
                    <td>${fmtNum(liablePerT, 3)} tCO\u2082e/t</td>
                    <td></td>
                </tr>
                ${carbonPriceOrigin > 0 ? `<tr class="cbam-row-deduct">
                    <td><span class="lang-en">Carbon price credit (${countryNameEn}: \u20ac${carbonPriceOrigin}/t)</span><span class="lang-zh">\u78b3\u4ef7\u62b5\u6263 (${countryNameZh}: \u20ac${carbonPriceOrigin}/t)</span></td>
                    <td>\u2212${fmtNum(creditPerT, 3)} cert/t</td>
                    <td class="cbam-formula">\u20ac${carbonPriceOrigin} / \u20ac${CBAM_PRICE}</td>
                </tr>` : ''}
                <tr class="cbam-row-total">
                    <td><strong><span class="lang-en">Net certificates per tonne</span><span class="lang-zh">\u6bcf\u516c\u5428\u51c0\u8bc1\u4e66\u6570</span></strong></td>
                    <td><strong>${fmtNum(netCertPerT, 3)}/t</strong></td>
                    <td class="cbam-formula">\u00d7 \u20ac${CBAM_PRICE}</td>
                </tr>
                <tr class="cbam-row-total">
                    <td><strong><span class="lang-en">CBAM cost per tonne</span><span class="lang-zh">\u6bcf\u516c\u5428CBAM\u6210\u672c</span></strong></td>
                    <td><strong>\u20ac${fmtNum(costPerT, 2)}/t</strong></td>
                    <td></td>
                </tr>
            </table>
        </div>`;
    } else {
        // ─── IMPORTER VIEW: total cost focus ───
        html = `<div class="cbam-result-card">
        <div class="cbam-result-summary">
            <div class="cbam-result-metric">
                <div class="cbam-metric-label"><span class="lang-en">2026 CBAM Certificates</span><span class="lang-zh">2026\u5e74CBAM\u8bc1\u4e66\u6570\u91cf</span></div>
                <div class="cbam-metric-value">${fmtNum(netCertificates, 1)}</div>
            </div>
            <div class="cbam-result-metric">
                <div class="cbam-metric-label"><span class="lang-en">2026 Total CBAM Cost</span><span class="lang-zh">2026\u5e74CBAM\u603b\u6210\u672c</span></div>
                <div class="cbam-metric-value cbam-cost-highlight">\u20ac${formatEuro(totalCost)}</div>
            </div>
            <span class="badge ${badgeClass}"><span class="lang-en">${badgeEn}</span><span class="lang-zh">${badgeZh}</span></span>
        </div>
        <div class="cbam-total-line"><span class="lang-en">Per tonne: <strong>\u20ac${fmtNum(costPerT, 2)}/t</strong> CBAM surcharge | ${fmtNum(netCertPerT, 3)} certificates per tonne</span><span class="lang-zh">\u6bcf\u516c\u5428\uff1aCBAM\u9644\u52a0\u8d39 <strong>\u20ac${fmtNum(costPerT, 2)}/t</strong> | \u6bcf\u516c\u5428 ${fmtNum(netCertPerT, 3)} \u4efd\u8bc1\u4e66</span></div>
        <div class="cbam-breakdown">
            <div class="cbam-breakdown-title"><span class="lang-en">Calculation Breakdown</span><span class="lang-zh">\u8ba1\u7b97\u660e\u7ec6</span></div>
            <table>
                <tr>
                    <td><span class="lang-en">Total embedded emissions</span><span class="lang-zh">\u603b\u5d4c\u5165\u6392\u653e\u91cf</span></td>
                    <td>${fmtNum(totalEmissions, 1)} tCO\u2082e</td>
                    <td class="cbam-formula">${fmtNum(volume,0)}t \u00d7 ${emissions}</td>
                </tr>
                <tr class="cbam-row-deduct">
                    <td><span class="lang-en">EU benchmark free allocation (97.5%)</span><span class="lang-zh">\u6b27\u76dfETS\u57fa\u51c6\u514d\u8d39\u914d\u989d (97.5%)</span></td>
                    <td>\u2212${fmtNum(freeAllocation, 1)} tCO\u2082e</td>
                    <td class="cbam-formula">${fmtNum(volume,0)}t \u00d7 ${benchmark} \u00d7 97.5%</td>
                </tr>
                <tr class="cbam-row-subtotal">
                    <td><span class="lang-en">CBAM-liable emissions</span><span class="lang-zh">CBAM\u5e94\u7a0e\u6392\u653e\u91cf</span></td>
                    <td>${fmtNum(cbamLiable, 1)} tCO\u2082e</td>
                    <td></td>
                </tr>
                ${carbonPriceOrigin > 0 ? `<tr class="cbam-row-deduct">
                    <td><span class="lang-en">Carbon price credit (${countryNameEn}: \u20ac${carbonPriceOrigin}/t)</span><span class="lang-zh">\u78b3\u4ef7\u62b5\u6263 (${countryNameZh}: \u20ac${carbonPriceOrigin}/t)</span></td>
                    <td>\u2212${fmtNum(carbonCredit, 1)} <span class="lang-en">cert</span><span class="lang-zh">\u8bc1\u4e66</span></td>
                    <td class="cbam-formula">\u20ac${carbonPriceOrigin} / \u20ac${CBAM_PRICE}</td>
                </tr>` : ''}
                <tr class="cbam-row-total">
                    <td><strong><span class="lang-en">Net CBAM certificates</span><span class="lang-zh">\u51c0CBAM\u8bc1\u4e66\u6570</span></strong></td>
                    <td><strong>${fmtNum(netCertificates, 1)}</strong></td>
                    <td class="cbam-formula">\u00d7 \u20ac${CBAM_PRICE}</td>
                </tr>
                <tr class="cbam-row-total">
                    <td><strong><span class="lang-en">2026 Total CBAM Cost</span><span class="lang-zh">2026\u5e74CBAM\u603b\u6210\u672c</span></strong></td>
                    <td><strong>\u20ac${formatEuro(totalCost)}</strong></td>
                    <td></td>
                </tr>
            </table>
        </div>`;
    }

    // 50 t/year de minimis (Reg. (EU) 2025/2083) — covers iron & steel, aluminium,
    // fertilisers, cement; NOT hydrogen or electricity
    if (volume < 50 && sector !== 'hydrogen') {
        html += `<div class="cbam-callout cbam-callout-green"><span class="lang-en"><strong>De minimis exemption likely:</strong> importers whose cumulative CBAM-goods imports stay below 50 tonnes per year are exempt from CBAM obligations (Reg. (EU) 2025/2083; does not apply to hydrogen or electricity). The costs above apply only if the importing company exceeds this threshold across all its CBAM imports.</span><span class="lang-zh"><strong>可能适用微量豁免：</strong>每年累计进口CBAM产品低于50公吨的进口商可豁免CBAM义务（法规 (EU) 2025/2083；不适用于氢气和电力）。以上成本仅在进口商全部CBAM进口量超过该门槛时适用。</span></div>`;
    }

    // Callouts (role-aware messaging)
    if (usingDefaultEmissions) {
        if (role === 'supplier') {
            html += `<div class="cbam-callout cbam-callout-amber"><span class="lang-en">You are using EU default emissions values (worst-case). Providing your EU buyer with verified emissions data could reduce the CBAM surcharge on your products by up to \u20ac${fmtNum(defCostPerT - 0, 2)}/t.</span><span class="lang-zh">\u60a8\u6b63\u5728\u4f7f\u7528\u6b27\u76df\u9ed8\u8ba4\u6392\u653e\u503c\uff08\u6700\u9ad8\u60c5\u666f\uff09\u3002\u5411\u6b27\u76df\u4e70\u5bb6\u63d0\u4f9b\u7ecf\u6838\u5b9e\u7684\u6392\u653e\u6570\u636e\uff0c\u53ef\u964d\u4f4e\u4ea7\u54c1\u7684CBAM\u9644\u52a0\u8d39\u3002</span></div>`;
        } else {
            html += `<div class="cbam-callout cbam-callout-amber"><span class="lang-en">You are using EU default emissions values, which are set at worst-case levels. Requesting verified emissions data from your supplier could significantly reduce this cost.</span><span class="lang-zh">\u60a8\u6b63\u5728\u4f7f\u7528\u6b27\u76df\u9ed8\u8ba4\u6392\u653e\u503c\uff0c\u8be5\u503c\u8bbe\u5b9a\u4e3a\u6700\u9ad8\u60c5\u666f\u3002\u5411\u4f9b\u5e94\u5546\u83b7\u53d6\u7ecf\u6838\u5b9e\u7684\u5b9e\u9645\u6392\u653e\u6570\u636e\u53ef\u5927\u5e45\u964d\u4f4e\u6b64\u6210\u672c\u3002</span></div>`;
        }
    } else if (savingTotal > 0) {
        if (role === 'supplier') {
            html += `<div class="cbam-callout cbam-callout-green"><span class="lang-en">By using verified data, you save \u20ac${fmtNum(savingPerT, 2)} per tonne vs EU defaults (\u20ac${formatEuro(savingTotal)} total per year).</span><span class="lang-zh">\u4f7f\u7528\u7ecf\u6838\u5b9e\u6570\u636e\uff0c\u6bcf\u516c\u5428\u53ef\u8282\u7701\u20ac${fmtNum(savingPerT, 2)}\uff08\u5e74\u603b\u8ba1\u8282\u7701\u20ac${formatEuro(savingTotal)}\uff09\u3002</span></div>`;
        } else {
            html += `<div class="cbam-callout cbam-callout-green"><span class="lang-en">By using verified data instead of EU defaults, you save an estimated \u20ac${formatEuro(savingTotal)} per year.</span><span class="lang-zh">\u4e0e\u4f7f\u7528\u6b27\u76df\u9ed8\u8ba4\u503c\u76f8\u6bd4\uff0c\u4f7f\u7528\u7ecf\u6838\u5b9e\u6570\u636e\u6bcf\u5e74\u53ef\u8282\u7701\u7ea6\u20ac${formatEuro(savingTotal)}\u3002</span></div>`;
        }
    }

    if (liablePerT === 0) {
        html += `<div class="cbam-callout cbam-callout-green"><span class="lang-en">Your emissions intensity is at or below the EU benchmark. Minimal CBAM exposure for 2026.</span><span class="lang-zh">\u60a8\u7684\u6392\u653e\u5f3a\u5ea6\u7b49\u4e8e\u6216\u4f4e\u4e8e\u6b27\u76df\u57fa\u51c6\u503c\u30022026\u5e74CBAM\u98ce\u9669\u6781\u4f4e\u3002</span></div>`;
    }

    html += `<div class="cbam-disclaimer"><span class="lang-en">This estimate uses the Q2 2026 CBAM certificate price (\u20ac75.28/tCO\u2082e), the 2026 CBAM factor (97.5% of the EU benchmark deducted as free allocation; the payable share rises to 100% by 2034), and indicative default values \u2014 since 2026 the EU publishes country- and route-specific defaults with a +10% mark-up (rising to +30% by 2028). Carbon-price credits count only the price effectively paid net of free allocation and rebates. Certificate sales start February 2027; the first annual declaration is due 30 September 2027. This is not legal or financial advice.</span><span class="lang-zh">\u672c\u4f30\u7b97\u4f7f\u75282026\u5e74\u7b2c\u4e8c\u5b63\u5ea6CBAM\u8bc1\u4e66\u4ef7\u683c\uff08\u20ac75.28/tCO\u2082e\uff09\u30012026\u5e74CBAM\u56e0\u5b50\uff08\u6b27\u76df\u57fa\u51c6\u503c\u768497.5%\u4f5c\u4e3a\u514d\u8d39\u914d\u989d\u6263\u51cf\uff1b\u5e94\u4ed8\u6bd4\u4f8b\u81f32034\u5e74\u5347\u81f3100%\uff09\u53ca\u6307\u793a\u6027\u9ed8\u8ba4\u503c\u2014\u2014\u81ea2026\u5e74\u8d77\u6b27\u76df\u53d1\u5e03\u6309\u56fd\u5bb6\u548c\u751f\u4ea7\u5de5\u827a\u533a\u5206\u7684\u9ed8\u8ba4\u503c\u5e76\u9644\u52a010%\u4e0a\u6d6e\uff08\u81f32028\u5e74\u5347\u81f330%\uff09\u3002\u78b3\u4ef7\u62b5\u6263\u4ec5\u8ba1\u5165\u6263\u9664\u514d\u8d39\u914d\u989d\u53ca\u8fd4\u8fd8\u540e\u5b9e\u9645\u6709\u6548\u652f\u4ed8\u7684\u78b3\u4ef7\u3002\u8bc1\u4e66\u9500\u552e\u81ea2027\u5e742\u6708\u5f00\u59cb\uff1b\u9996\u4efd\u5e74\u5ea6\u7533\u62a5\u987b\u4e8e2027\u5e749\u670830\u65e5\u524d\u63d0\u4ea4\u3002\u672c\u5de5\u5177\u4e0d\u6784\u6210\u6cd5\u5f8b\u6216\u8d22\u52a1\u5efa\u8bae\u3002</span></div>
        <a href="mailto:gcc-sustainability@hongkong.ahk.de" class="cbam-cta"><span class="lang-en">Get Expert CBAM Guidance \u2192</span><span class="lang-zh">\u83b7\u53d6\u4e13\u4e1aCBAM\u6307\u5bfc \u2192</span></a>
    </div>`;

    resultDiv.innerHTML = html;

    if (currentLang === 'zh') {
        resultDiv.querySelectorAll('.lang-en').forEach(e => e.style.display = 'none');
        resultDiv.querySelectorAll('.lang-zh').forEach(e => e.style.display = 'inline');
    }
});

// ===== FAQ ACCORDION =====
const faqItems = document.querySelectorAll('.faq-item');

faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    question.setAttribute('aria-expanded', 'false');
    question.addEventListener('click', () => {
        const isActive = item.classList.contains('active');
        faqItems.forEach(i => {
            i.classList.remove('active');
            i.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
        });
        if (!isActive) {
            item.classList.add('active');
            question.setAttribute('aria-expanded', 'true');
        }
    });
});

// ===== BRIEF FORM (Resend via /api/subscribe) =====
const briefForm = document.getElementById('briefForm');
if (briefForm) {
    briefForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const emailInput = briefForm.querySelector('input[type="email"]');
        const consentInput = document.getElementById('briefConsent');
        const submitBtn = briefForm.querySelector('button[type="submit"]');
        const email = emailInput.value.trim();
        if (!email || (consentInput && !consentInput.checked)) return;

        const msgs = {
            ok:   { en: `Thank you! A confirmation has been sent to ${email}.`, zh: `谢谢！确认邮件已发送至 ${email}。` },
            soon: { en: 'Sign-up opens soon — in the meantime, email us at gcc-sustainability@hongkong.ahk.de.', zh: '订阅功能即将开放——请暂时发送邮件至 gcc-sustainability@hongkong.ahk.de。' },
            err:  { en: 'Something went wrong. Please try again or email us directly.', zh: '出现错误，请重试或直接给我们发送邮件。' }
        };
        const finish = (m) => {
            briefForm.innerHTML = `<p style="color: var(--primary); font-weight: 600; font-size: 0.9rem;">${currentLang === 'zh' ? m.zh : m.en}</p>`;
        };
        const showError = (m) => {
            let msgEl = briefForm.querySelector('.brief-msg');
            if (!msgEl) {
                msgEl = document.createElement('p');
                msgEl.className = 'brief-msg';
                briefForm.appendChild(msgEl);
            }
            msgEl.textContent = currentLang === 'zh' ? m.zh : m.en;
            submitBtn.disabled = false;
        };

        submitBtn.disabled = true;
        try {
            const r = await fetch('/api/subscribe', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, consent: true, lang: currentLang })
            });
            if (r.ok) finish(msgs.ok);
            else if (r.status === 503) finish(msgs.soon);
            else showError(msgs.err);
        } catch (err) {
            showError(msgs.err);
        }
    });
}

// ===== CMS CONTENT (Sanity via /api/content proxy) =====
function applyLang(scope) {
    if (currentLang === 'zh') {
        scope.querySelectorAll('.lang-en').forEach(el => el.style.display = 'none');
        scope.querySelectorAll('.lang-zh').forEach(el => el.style.display = 'inline');
    }
}

function authToken() {
    try {
        for (let i = 0; i < localStorage.length; i++) {
            const k = localStorage.key(i);
            if (k && k.startsWith('sb-') && k.endsWith('-auth-token')) {
                const v = JSON.parse(localStorage.getItem(k));
                return (v && v.access_token) || null;
            }
        }
    } catch (e) { /* no session */ }
    return null;
}

function demoTier() {
    const t = localStorage.getItem('gcc-demo-tier');
    return t === 'member' || t === 'registered' ? t : null;
}

async function loadContent(type) {
    const headers = {};
    const token = authToken();
    if (token) headers['Authorization'] = `Bearer ${token}`;
    else if (demoTier()) headers['x-demo-tier'] = demoTier();
    const r = await fetch(`/api/content?type=${type}`, { headers });
    if (!r.ok) throw new Error(`content ${type}: ${r.status}`);
    return r.json();
}

// Nav sign-in state
const navSignin = document.getElementById('navSignin');
if (navSignin && (authToken() || demoTier())) {
    navSignin.innerHTML = '<span class="lang-en">Account</span><span class="lang-zh">账户</span>';
    applyLangWhenReady();
}
function applyLangWhenReady() {
    if (currentLang === 'zh' && navSignin) {
        navSignin.querySelectorAll('.lang-en').forEach(el => el.style.display = 'none');
        navSignin.querySelectorAll('.lang-zh').forEach(el => el.style.display = 'inline');
    }
}

const catDisplay = {
    en: { electronics: 'Electronics & Batteries', textiles: 'Textiles & Apparel', cosmetics: 'Cosmetics & Personal Care', toys: 'Toys', furniture: 'Furniture & Home Goods', food: 'Food & Packaging', construction: 'Construction Products', other: 'your products' },
    zh: { electronics: '电子产品与电池', textiles: '纺织品与服装', cosmetics: '化妆品与个人护理', toys: '玩具', furniture: '家具与家居用品', food: '食品与包装', construction: '建筑材料', other: '您的产品' }
};
const roleDisplay = {
    en: { supplier: 'an exporter to the EU', importer: 'an EU-based importer', brand: 'a Brand/Retailer', manufacturer: 'a manufacturer with an EU entity' },
    zh: { supplier: '向欧盟出口', importer: '作为欧盟进口商', brand: '品牌/零售商', manufacturer: '拥有欧盟实体的制造商' }
};

function regFromSanity(d) {
    const statusLabels = { inforce: 'IN FORCE', phasing: 'PHASING IN', prepare: 'PREPARE NOW' };
    const fill = (tpl, lang, cat, role) => (tpl || '')
        .replace('{category}', catDisplay[lang][cat] || catDisplay[lang].other)
        .replace('{role}', roleDisplay[lang][role] || '');
    return {
        id: d.regId,
        name: d.name,
        ref: d.ref,
        status: d.status,
        statusLabel: statusLabels[d.status] || d.status,
        inForce: d.inForce,
        complianceDeadline: d.complianceDeadline,
        lastReviewed: d.lastReviewed
            ? new Date(d.lastReviewed).toLocaleDateString('en-GB', { month: 'long', year: 'numeric' })
            : '',
        eurlex: d.eurlex,
        sections: (d.sections || []).map(s => ({ title: s.title, text: s.textEn, textZh: s.textZh })),
        applies: (cat, markets, role, size) => {
            const euMarket = markets.includes('eu') || markets.includes('germany');
            if (!euMarket) return false;
            if (d.categories && d.categories.length && !d.categories.includes(cat)) return false;
            if (d.roles && d.roles.length && !d.roles.includes(role)) return false;
            if (d.sizes && d.sizes.length && !d.sizes.includes(size)) return false;
            return true;
        },
        reason: (cat, markets, role, size) => fill(d.reasonEn, 'en', cat, role),
        reasonZh: (cat, markets, role, size) => fill(d.reasonZh, 'zh', cat, role)
    };
}

loadContent('regulations').then(list => {
    if (Array.isArray(list) && list.length) {
        regulations = list.map(regFromSanity);
    }
}).catch(() => { /* CMS unavailable — keep built-in fallback data */ });

// ----- Deadline Radar -----
function renderRadar(deadlines) {
    const section = document.getElementById('radar');
    const list = document.getElementById('radarList');
    if (!section || !list || !Array.isArray(deadlines)) return;

    const today = new Date();
    const upcoming = deadlines.filter(d => d.date && new Date(d.date) >= today);
    if (!upcoming.length) return;

    const groups = [
        { key: 'soon', en: 'NEXT 6 MONTHS', zh: '未来6个月', descEn: 'Act now — these dates are imminent.', descZh: '立即行动——期限迫近。' },
        { key: 'near', en: '6–14 MONTHS', zh: '6至14个月', descEn: 'Plan and budget for these this year.', descZh: '请于今年内规划和预算。' },
        { key: 'far', en: 'ON THE HORIZON', zh: '中长期', descEn: 'Monitor and prepare early.', descZh: '持续关注，提前准备。' }
    ];

    const byGroup = { soon: [], near: [], far: [] };
    upcoming.forEach(d => {
        const days = Math.max(0, Math.ceil((new Date(d.date) - today) / 86400000));
        const key = days <= 180 ? 'soon' : days <= 420 ? 'near' : 'far';
        byGroup[key].push({ ...d, days });
    });

    list.innerHTML = groups.map(g => {
        const items = byGroup[g.key];
        if (!items.length) return '';
        const cards = items.map(d => {
            const dateStr = new Date(d.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
            const expected = d.confidence === 'expected'
                ? ' <span class="radar-expected"><span class="lang-en">expected</span><span class="lang-zh">预期</span></span>'
                : '';
            const affects = d.affects
                ? `<div class="radar-affects"><span class="lang-en">${d.affects}</span><span class="lang-zh">${d.affectsZh || d.affects}</span></div>`
                : '';
            const inner = `
                    <div class="radar-days-chip"><strong>${d.days}</strong><span class="lang-en">days</span><span class="lang-zh">天</span></div>
                    <div class="radar-body">
                        <div class="radar-label"><span class="lang-en">${d.labelEn}</span><span class="lang-zh">${d.labelZh || d.labelEn}</span></div>
                        <div class="radar-meta">${dateStr}${expected}</div>
                        ${affects}
                    </div>
                    ${d.regId ? '<span class="radar-arrow">&rarr;</span>' : ''}`;
            return d.regId
                ? `<a class="radar-item radar-item-link" href="regulation.html?id=${d.regId}">${inner}</a>`
                : `<div class="radar-item">${inner}</div>`;
        }).join('');
        return `
            <div class="radar-col radar-col-${g.key}">
                <div class="radar-col-header">
                    <h3><span class="lang-en">${g.en}</span><span class="lang-zh">${g.zh}</span></h3>
                    <p><span class="lang-en">${g.descEn}</span><span class="lang-zh">${g.descZh}</span></p>
                </div>
                <div class="radar-col-items">${cards}</div>
            </div>`;
    }).join('');

    applyLang(list);
    section.style.display = '';
}

loadContent('deadlines').then(renderRadar).catch(() => { /* section stays hidden */ });

// ----- Weekly Briefing -----
const pillarLabels = {
    'eu': { en: 'EU Regulatory', zh: '欧盟法规' },
    'germany': { en: 'Germany & Retail', zh: '德国与零售' },
    'china-hk': { en: 'China & Hong Kong', zh: '中国与香港' },
    'standards': { en: 'Standards & Certification', zh: '标准与认证' },
    'explainer': { en: 'Explainer', zh: '解读' }
};

function renderBriefing(posts) {
    const section = document.getElementById('briefing');
    const list = document.getElementById('briefingList');
    if (!section || !list || !Array.isArray(posts) || !posts.length) return;

    const row = (labelEn, labelZh, textEn, textZh) => textEn ? `
        <div class="briefing-row">
            <div class="briefing-row-label"><span class="lang-en">${labelEn}</span><span class="lang-zh">${labelZh}</span></div>
            <p><span class="lang-en">${textEn}</span><span class="lang-zh">${textZh || textEn}</span></p>
        </div>` : '';

    const kicker = p => {
        const pillar = pillarLabels[p.pillar] || { en: p.pillar, zh: p.pillar };
        return `<span class="briefing-kicker"><span class="lang-en">${pillar.en}</span><span class="lang-zh">${pillar.zh}</span></span>`;
    };

    const sourceLinks = p => {
        if (!Array.isArray(p.sources) || !p.sources.length) return '';
        const links = p.sources.map(u => {
            let host = u;
            try { host = new URL(u).hostname.replace(/^www\./, ''); } catch (e) { /* keep raw */ }
            return `<a href="${u}" target="_blank" rel="noopener">${host} &nearr;</a>`;
        }).join(' &middot; ');
        return `<p class="briefing-sources"><span class="lang-en">Source:</span><span class="lang-zh">来源：</span> ${links}</p>`;
    };

    // Newspaper dateline from the lead story's publish date
    const dateline = document.getElementById('briefingDateline');
    if (dateline && posts[0].publishedAt) {
        const d = new Date(posts[0].publishedAt);
        const en = d.toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' }).toUpperCase();
        const zh = `${d.getFullYear()}年${d.getMonth() + 1}月${d.getDate()}日`;
        dateline.innerHTML = `<span class="lang-en">HONG KONG &middot; ${en}</span><span class="lang-zh">香港 &middot; ${zh}</span>`;
        applyLang(dateline);
    }

    const titleLink = (p, tag) => `<${tag}><a class="briefing-title-link" href="/article?slug=${p.slug || ''}"><span class="lang-en">${p.titleEn}</span><span class="lang-zh">${p.titleZh || p.titleEn}</span></a></${tag}>`;

    const lockCta = p => {
        const premium = p.accessLevel === 'premium';
        const label = premium
            ? '<span class="lang-en">Member content &mdash; sign in</span><span class="lang-zh">会员内容——请登录</span>'
            : '<span class="lang-en">Sign in free to read</span><span class="lang-zh">免费登录阅读全文</span>';
        return `<a class="briefing-lock-cta ${premium ? 'briefing-lock-premium' : ''}" href="account.html">
            <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
            ${label} &rarr;</a>`;
    };

    const readMore = p => `<p class="briefing-readmore"><a href="/article?slug=${p.slug || ''}"><span class="lang-en">Full article &rarr;</span><span class="lang-zh">阅读全文 &rarr;</span></a></p>`;

    const [lead, ...rest] = posts;

    const leadImg = lead.imageUrl
        ? `<a href="/article?slug=${lead.slug || ''}" class="briefing-lead-img"><img src="${lead.imageUrl}" alt="" loading="lazy"></a>`
        : '';

    const leadHtml = lead.locked ? `
        <article class="briefing-lead briefing-locked" id="briefing-${lead.slug || ''}">
            ${kicker(lead)}
            ${titleLink(lead, 'h3')}
            ${leadImg}
            <p class="briefing-item-text"><span class="lang-en">${lead.teaserEn || ''}</span><span class="lang-zh">${lead.teaserZh || lead.teaserEn || ''}</span></p>
            ${lockCta(lead)}
        </article>` : `
        <article class="briefing-lead" id="briefing-${lead.slug || ''}">
            ${kicker(lead)}
            ${titleLink(lead, 'h3')}
            ${leadImg}
            ${row('What happened', '发生了什么', lead.whatHappenedEn, lead.whatHappenedZh)}
            ${row('Why it matters', '为何重要', lead.whyItMattersEn, lead.whyItMattersZh)}
            ${row('What to do', '应对措施', lead.supplierActionEn, lead.supplierActionZh)}
            ${sourceLinks(lead)}
            ${readMore(lead)}
        </article>`;

    const restHtml = rest.map(p => {
        const thumb = p.imageUrl ? `<a href="/article?slug=${p.slug || ''}" class="briefing-thumb"><img src="${p.imageUrl}" alt="" loading="lazy"></a>` : '';
        if (p.locked) {
            return `
        <article class="briefing-item briefing-locked" id="briefing-${p.slug || ''}">
            ${kicker(p)}
            ${titleLink(p, 'h4')}
            ${thumb}
            <p class="briefing-item-text"><span class="lang-en">${p.teaserEn || ''}</span><span class="lang-zh">${p.teaserZh || p.teaserEn || ''}</span></p>
            ${lockCta(p)}
        </article>`;
        }
        return `
        <article class="briefing-item" id="briefing-${p.slug || ''}">
            ${kicker(p)}
            ${titleLink(p, 'h4')}
            ${thumb}
            <p class="briefing-item-text"><span class="lang-en">${p.whatHappenedEn || ''}</span><span class="lang-zh">${p.whatHappenedZh || p.whatHappenedEn || ''}</span></p>
            ${p.supplierActionEn ? `<p class="briefing-item-action"><strong><span class="lang-en">What to do:</span><span class="lang-zh">应对措施：</span></strong> <span class="lang-en">${p.supplierActionEn}</span><span class="lang-zh">${p.supplierActionZh || p.supplierActionEn}</span></p>` : ''}
            ${sourceLinks(p)}
            ${readMore(p)}
        </article>`;
    }).join('');

    list.innerHTML = `
        <div class="briefing-columns">
            ${leadHtml}
            <div class="briefing-secondary">${restHtml}</div>
        </div>`;

    applyLang(list);
    section.style.display = '';

    // Hero news ticker: click jumps to the article card
    const ticker = document.getElementById('newsTicker');
    const track = document.getElementById('tickerTrack');
    if (ticker && track) {
        const half = posts.map(p =>
            `<a class="ticker-item" href="#briefing-${p.slug || ''}"><span class="lang-en">${p.titleEn}</span><span class="lang-zh">${p.titleZh || p.titleEn}</span></a>`
        ).join('<span class="ticker-sep">&#9679;</span>') + '<span class="ticker-sep">&#9679;</span>';
        track.innerHTML = half + half; // duplicated for a seamless loop
        applyLang(track);
        ticker.style.display = '';
        const badge = ticker.querySelector('.ticker-badge');
        if (badge) {
            badge.setAttribute('role', 'button');
            badge.setAttribute('tabindex', '0');
            badge.setAttribute('aria-label', 'Pause or resume news ticker');
            const toggle = () => ticker.classList.toggle('ticker-paused');
            badge.addEventListener('click', toggle);
            badge.addEventListener('keydown', (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggle(); } });
        }
        track.addEventListener('click', (e) => {
            const a = e.target.closest('a.ticker-item');
            if (!a) return;
            e.preventDefault();
            const target = document.querySelector(a.getAttribute('href'));
            if (target) {
                target.scrollIntoView({ behavior: 'smooth', block: 'center' });
                target.classList.add('briefing-flash');
                setTimeout(() => target.classList.remove('briefing-flash'), 2500);
            }
        });
    }
}

loadContent('news').then(renderBriefing).catch(() => { /* section stays hidden */ });

// ===== SCROLL REVEAL =====
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.benefit-card, .action-card, .case-card, .ri-column, .faq-item, .cta-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});
