// ===== LANGUAGE TOGGLE =====
let currentLang = localStorage.getItem('gcc-lang') || 'en';

function setLanguage(lang) {
    currentLang = lang;
    localStorage.setItem('gcc-lang', lang);

    if (lang === 'zh') {
        document.body.classList.add('zh');
    } else {
        document.body.classList.remove('zh');
    }

    // Update toggle buttons
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.lang === lang);
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
const regulations = [
    {
        id: 'csrd',
        name: 'CSRD',
        ref: '(EU) 2022/2464',
        status: 'inforce',
        statusLabel: 'IN FORCE',
        inForce: '5 January 2023',
        complianceDeadline: '1 January 2025 (companies >1,000 employees & >€450M turnover)',
        lastReviewed: 'March 2026',
        eurlex: 'https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:32022L2464',
        sections: [
            { title: 'REPORTING', text: 'Double materiality assessment required. Report under European Sustainability Reporting Standards (ESRS) with third-party assurance.' },
            { title: 'SUPPLY CHAIN', text: 'Disclosure of Scope 3 emissions, supply chain due diligence processes, and supplier sustainability performance. Smaller suppliers are indirectly affected via their EU buyer\'s reporting obligations.' },
            { title: 'PENALTIES', text: 'Member state penalties apply. Directors personally liable for reporting failures. Potential fines up to 10M EUR or 5% of turnover.' }
        ],
        applies: (cat, markets, role, size) => {
            const euMarket = markets.includes('eu') || markets.includes('germany');
            return euMarket && size === 'large';
        },
        reason: (cat, markets, role, size) => {
            return 'Under the Omnibus I revision (March 2026), companies with >1,000 employees AND >€450M turnover must report. Smaller suppliers are indirectly affected via their EU buyer\'s reporting obligations.';
        },
        reasonZh: (cat, markets, role, size) => {
            return '根据Omnibus I修订版（2026年3月），员工超过1,000人且营业额超过4.5亿欧元的企业必须报告。较小的供应商通过其欧盟买家的报告义务间接受到影响。';
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
        lastReviewed: 'March 2026',
        eurlex: 'https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:32024L1760',
        sections: [
            { title: 'SUPPLY CHAIN', text: 'Mandatory human rights and environmental due diligence limited to direct (Tier 1) business partners. Risk-based approach for deeper tiers.' },
            { title: 'REPORTING', text: 'Annual due diligence statement. Climate transition plan aligned with Paris Agreement targets.' },
            { title: 'PENALTIES', text: 'Fines up to 5% of worldwide net turnover. Civil liability for damages caused by due diligence failures.' }
        ],
        applies: (cat, markets, role, size) => {
            const euMarket = markets.includes('eu') || markets.includes('germany');
            return euMarket && size === 'large';
        },
        reason: (cat, markets, role, size) => {
            return 'Under the Omnibus I revision (March 2026), companies with >5,000 employees AND >€1.5B turnover must conduct Tier 1 supply chain due diligence by July 2029.';
        },
        reasonZh: (cat, markets, role, size) => {
            return '根据Omnibus I修订版（2026年3月），员工超过5,000人且营业额超过15亿欧元的企业须在2029年7月前完成一级供应链尽职调查。';
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
        lastReviewed: 'March 2026',
        eurlex: 'https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:32023R0956',
        sections: [
            { title: 'REPORTING', text: 'Quarterly CBAM reports during transitional phase. Declare embedded emissions for all covered imports.' },
            { title: 'DOCUMENTATION', text: 'Verified emissions data from production facilities. CBAM certificates must be purchased to cover embedded carbon.' },
            { title: 'PENALTIES', text: 'Penalties for non-reporting: 10-50 EUR per tonne of unreported emissions. Certificate shortfall penalties mirror EU ETS prices.' }
        ],
        applies: (cat, markets, role, size) => {
            const euMarket = markets.includes('eu') || markets.includes('germany');
            const relevantCat = ['electronics', 'construction', 'furniture'].includes(cat);
            const relevantRole = role === 'supplier' || role === 'importer';
            return euMarket && relevantCat && relevantRole;
        },
        reason: (cat, markets, role, size) => {
            const catName = { electronics: 'Electronics', construction: 'Construction Products', furniture: 'Furniture & Home Goods' }[cat] || cat;
            const roleText = role === 'supplier' ? 'an exporter to the EU' : 'an EU-based importer';
            return `As ${roleText} of ${catName}, you must declare embedded carbon emissions under CBAM's carbon border adjustment mechanism.`;
        },
        reasonZh: (cat, markets, role, size) => {
            const catName = { electronics: '电子产品', construction: '建筑材料', furniture: '家具与家居用品' }[cat] || cat;
            const roleText = role === 'supplier' ? '向欧盟出口' : '作为欧盟进口商';
            return `${roleText}${catName}，您须根据CBAM碳边境调节机制申报内含碳排放量。`;
        }
    },
    {
        id: 'eudr',
        name: 'EUDR',
        ref: '(EU) 2023/1115',
        status: 'inforce',
        statusLabel: 'IN FORCE',
        inForce: '29 June 2023',
        complianceDeadline: '30 December 2024 (large), 30 June 2025 (SMEs)',
        lastReviewed: 'March 2026',
        eurlex: 'https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:32023R1115',
        sections: [
            { title: 'SUPPLY CHAIN', text: 'Due diligence system to verify products are deforestation-free. Geolocation data required for production plots.' },
            { title: 'DOCUMENTATION', text: 'Due diligence statements for each shipment. Traceability records maintained for 5 years minimum.' },
            { title: 'PENALTIES', text: 'Fines proportionate to environmental damage, minimum 4% of EU turnover. Product confiscation and market bans.' }
        ],
        applies: (cat, markets, role, size) => {
            const euMarket = markets.includes('eu') || markets.includes('germany');
            const relevantCat = ['furniture', 'food', 'textiles'].includes(cat);
            return euMarket && relevantCat;
        },
        reason: (cat, markets, role, size) => {
            const catName = { furniture: 'Furniture & Home Goods (wood-based)', food: 'Food & Packaging', textiles: 'Textiles & Apparel' }[cat] || cat;
            return `${catName} products may contain commodities (wood, rubber, palm oil, soy) covered by the EU Deforestation Regulation.`;
        },
        reasonZh: (cat, markets, role, size) => {
            const catName = { furniture: '家具与家居用品（木制品）', food: '食品与包装', textiles: '纺织品与服装' }[cat] || cat;
            return `${catName}可能含有欧盟零毁林法规覆盖的原料（木材、橡胶、棕榈油、大豆）。`;
        }
    },
    {
        id: 'batteries',
        name: 'Batteries Regulation',
        ref: '(EU) 2023/1542',
        status: 'phasing',
        statusLabel: 'PHASING IN',
        inForce: '17 August 2023',
        complianceDeadline: '18 February 2025 (labelling), 18 August 2025 (carbon footprint)',
        lastReviewed: 'March 2026',
        eurlex: 'https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:32023R1542',
        sections: [
            { title: 'PRODUCT DESIGN', text: 'Minimum recycled content thresholds. Removability and replaceability requirements for portable batteries.' },
            { title: 'DOCUMENTATION', text: 'Battery passport (digital) required for EV and industrial batteries. Carbon footprint declaration and labelling.' },
            { title: 'SUPPLY CHAIN', text: 'Due diligence for cobalt, lithium, nickel, and natural graphite sourcing. Collection and recycling targets.' }
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
        lastReviewed: 'March 2026',
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
        complianceDeadline: 'Product-specific delegated acts from 2025 onwards',
        lastReviewed: 'March 2026',
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
        inForce: '20 November 2024',
        complianceDeadline: '31 July 2026 (member state transposition)',
        lastReviewed: 'March 2026',
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
        inForce: 'Proposed (March 2023)',
        complianceDeadline: 'Expected 2026-2027 (post-adoption)',
        lastReviewed: 'March 2026',
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
            return `As ${roleText}, any sustainability or environmental claims on your products will require third-party verified scientific evidence.`;
        },
        reasonZh: (cat, markets, role, size) => {
            const roleText = role === 'brand' ? '品牌/零售商' : '欧盟进口商';
            return `作为${roleText}，您产品上的任何可持续性或环保声明都将需要经第三方验证的科学证据。`;
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
        lastReviewed: 'March 2026',
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
        lastReviewed: 'March 2026',
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
        lastReviewed: 'March 2026',
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
        complianceDeadline: 'First wave 2026-2027 (textiles, electronics, furniture)',
        lastReviewed: 'March 2026',
        eurlex: 'https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:32024R1781',
        sections: [
            { title: 'DOCUMENTATION', text: 'Unique product identifier linked to digital record containing materials, origin, carbon footprint, repairability score, and end-of-life instructions.' },
            { title: 'SUPPLY CHAIN', text: 'Data must flow from raw material suppliers through manufacturing to point of sale. Interoperable data format required.' },
            { title: 'PRODUCT DESIGN', text: 'Products must carry data carrier (QR code or RFID) enabling consumer and authority access to passport information.' }
        ],
        applies: (cat, markets, role, size) => {
            const euMarket = markets.includes('eu') || markets.includes('germany');
            const relevantCat = ['electronics', 'textiles', 'furniture'].includes(cat);
            return euMarket && relevantCat;
        },
        reason: (cat, markets, role, size) => {
            const catName = { electronics: 'Electronics & Batteries', textiles: 'Textiles & Apparel', furniture: 'Furniture & Home Goods' }[cat] || cat;
            return `${catName} are among the first product categories requiring a Digital Product Passport with full lifecycle data accessible via QR code.`;
        },
        reasonZh: (cat, markets, role, size) => {
            const catName = { electronics: '电子产品与电池', textiles: '纺织品与服装', furniture: '家具与家居用品' }[cat] || cat;
            return `${catName}是首批需要数字产品护照的产品类别，须通过二维码提供完整的生命周期数据。`;
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

// ===== ADVANCED FILTER TOGGLE =====
const advancedToggle = document.getElementById('advancedToggle');
const advancedPanel = document.getElementById('advancedPanel');

advancedToggle.addEventListener('click', () => {
    advancedToggle.classList.toggle('active');
    advancedPanel.classList.toggle('active');
});

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

    const statusOrder = { inforce: 0, phasing: 1, prepare: 2 };
    applicable.sort((a, b) => statusOrder[a.status] - statusOrder[b.status]);

    atlasCards.innerHTML = applicable.map(reg => {
        const badgeClass = `badge-${reg.status}`;
        const reasonEn = reg.reason(category, markets, role, size);
        const reasonZh = reg.reasonZh(category, markets, role, size);
        const statusZh = statusLabelsZh[reg.statusLabel] || reg.statusLabel;

        const sectionsHTML = reg.sections.map(s => {
            const titleZh = sectionHeadersZh[s.title] || s.title;
            return `
            <div class="reg-section">
                <div class="reg-section-title"><span class="lang-en">${s.title}</span><span class="lang-zh">${titleZh}</span></div>
                <p>${s.text}</p>
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
                    <a href="${reg.eurlex}" target="_blank" rel="noopener" class="reg-result-link"><span class="lang-en">Read the official text &rarr;</span><span class="lang-zh">查阅官方原文 &rarr;</span></a>
                </div>
            </article>
        `;
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
            en: 'Toy product \u2014 check additionally for EU Toy Safety Directive 2009/48/EC.',
            zh: '\u73a9\u5177\u4ea7\u54c1 \u2014 \u8bf7\u540c\u65f6\u6838\u67e5\u6b27\u76df\u73a9\u5177\u5b89\u5168\u6307\u4ee4 2009/48/EC\u3002'
        });
    }
    if (chapter >= 50 && chapter <= 63) {
        notes.push({
            en: 'Textile product \u2014 EU Deforestation Regulation may apply for natural fibre sourcing.',
            zh: '\u7eba\u7ec7\u54c1 \u2014 \u5929\u7136\u7ea4\u7ef4\u91c7\u8d2d\u53ef\u80fd\u9002\u7528\u6b27\u76df\u68ee\u6797\u780d\u4f10\u6cd5\u89c4\u3002'
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

    // Auto-select the matching category
    document.getElementById('filterCategory').value = category;

    const catName = hsCategoryNames[category];
    const notes = getHSSpecialNotes(code);
    const notesHtml = notes.map(n =>
        `<div class="hs-note"><span class="lang-en">${n.en}</span><span class="lang-zh">${n.zh}</span></div>`
    ).join('');
    const manualLink = '<a href="#" class="hs-manual-link" onclick="event.preventDefault();document.getElementById(\'filterCategory\').focus()"><span class="lang-en">Not your product? Select manually above.</span><span class="lang-zh">\u4e0d\u662f\u60a8\u7684\u4ea7\u54c1\uff1f\u8bf7\u5728\u4e0a\u65b9\u624b\u52a8\u9009\u62e9\u3002</span></a>';

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
const cbamSectorData = {
    steel_bof:            { emissions: 2.1,  benchmark: 1.328 },
    steel_eaf:            { emissions: 0.4,  benchmark: 0.283 },
    aluminium_primary:    { emissions: 6.7,  benchmark: 1.514 },
    aluminium_secondary:  { emissions: 0.9,  benchmark: 0.400 },
    cement:               { emissions: 0.8,  benchmark: 0.766 },
    fertilisers:          { emissions: 2.3,  benchmark: 1.619 },
    hydrogen:             { emissions: 10.6, benchmark: 8.850 }
};

const cbamCarbonPrices = {
    CN: 12, IN: 2, TR: 0, RU: 0, KR: 8, UA: 1,
    GB: 45, VN: 0, ID: 0, BR: 0, JP: 3, EG: 0, ZA: 9, OTHER: 0
};

const CBAM_PRICE = 75.36;
const CBAM_FREE_ALLOC_2026 = 0.975; // 97.5% free allocation in 2026

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

    html += `<div class="cbam-disclaimer"><span class="lang-en">This estimate uses the Q1 2026 CBAM certificate price (\u20ac75.36/tCO\u2082e), a 2.5% CBAM phase-in factor (97.5% free allocation), and EU published default values. Actual costs depend on verified emissions data, carbon prices paid in the country of origin, and quarterly certificate price updates. This is not legal or financial advice.</span><span class="lang-zh">\u672c\u4f30\u7b97\u4f7f\u75282026\u5e74\u7b2c\u4e00\u5b63\u5ea6CBAM\u8bc1\u4e66\u4ef7\u683c\uff08\u20ac75.36/tCO\u2082e\uff09\u30012.5%CBAM\u8fc7\u6e21\u56e0\u5b50\uff0897.5%\u514d\u8d39\u914d\u989d\uff09\u53ca\u6b27\u76df\u516c\u5e03\u7684\u9ed8\u8ba4\u503c\u3002\u5b9e\u9645\u6210\u672c\u53d6\u51b3\u4e8e\u7ecf\u6838\u5b9e\u7684\u6392\u653e\u6570\u636e\u3001\u539f\u4ea7\u56fd\u5df2\u652f\u4ed8\u7684\u78b3\u4ef7\uff0c\u4ee5\u53ca\u5b63\u5ea6\u8bc1\u4e66\u4ef7\u683c\u66f4\u65b0\u3002\u672c\u5de5\u5177\u4e0d\u6784\u6210\u6cd5\u5f8b\u6216\u8d22\u52a1\u5efa\u8bae\u3002</span></div>
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
    question.addEventListener('click', () => {
        const isActive = item.classList.contains('active');
        faqItems.forEach(i => i.classList.remove('active'));
        if (!isActive) {
            item.classList.add('active');
        }
    });
});

// ===== BRIEF FORM =====
const briefForm = document.getElementById('briefForm');
if (briefForm) {
    briefForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = briefForm.querySelector('input[type="email"]').value;
        if (email) {
            const msg = currentLang === 'zh'
                ? `谢谢！简报将发送至 ${email}。`
                : `Thank you! Your brief will be sent to ${email}.`;
            briefForm.innerHTML = `<p style="color: var(--primary); font-weight: 600; font-size: 0.9rem;">${msg}</p>`;
        }
    });
}

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
