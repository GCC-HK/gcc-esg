// September 2026 briefing refresh (committee request, 5 Sep 2026):
// - 4 new verified posts (greenwashing ban countdown = new lead, ESPR/DPP,
//   China supply-chain security rules, Toy Safety Regulation)
// - updates to CBAM-457 (Council position + plenary this month), PPWR (now
//   applied), CBAM explainer (declaration deadline moved), ETS (EPRS stage)
// - dynamic cleanup pass: platform style forbids dash punctuation, so all
//   newsPost + deadline text fields are swept (em dashes to commas/colons,
//   digit ranges to "to"/"至")
// All claims verified 2026-09-05 against the sources listed on each post.
// Usage: SANITY_TOKEN=... node scripts/seeds/seed-news-sep26.js
const PROJECT = 'bvmxf21v';
const DATASET = 'production';
const TOKEN = process.env.SANITY_TOKEN;
if (!TOKEN) { console.error('SANITY_TOKEN missing'); process.exit(1); }

const posts = [
    {
        id: 'news-ecgt-countdown', slug: 'greenwashing-ban-27-september-empowering-consumers',
        titleEn: 'Three weeks to the EU greenwashing ban: generic green claims outlawed from 27 September',
        titleZh: '距欧盟"漂绿"禁令仅三周：9月27日起禁止泛泛的环保声明',
        publishedAt: '2026-09-04T09:00:00Z', pillar: 'eu', accessLevel: 'public',
        imageUrl: 'assets/img/news/ppwr-plastic.jpg',
        whatHappenedEn: 'The Empowering Consumers for the Green Transition Directive (EU) 2024/825 applies across the EU from 27 September 2026 (member state transposition was due by 27 March 2026). From that date, generic environmental claims such as "eco friendly", "green" or "climate neutral" are banned unless recognised excellent environmental performance can be demonstrated, and product claims based on offsetting of greenhouse gas emissions are prohibited outright. Sustainability labels not based on approved certification schemes are also outlawed. The separate, stricter Green Claims Directive proposal remains shelved after the Commission announced its intended withdrawal in June 2025, but 2024/825 applies regardless.',
        whatHappenedZh: '《赋能消费者绿色转型指令》(EU) 2024/825将于2026年9月27日起在欧盟全面适用（成员国转化期限为2026年3月27日）。自该日起，除非能证明公认的卓越环保表现，"环保""绿色""碳中和"等泛泛的环境声明将被禁止；基于温室气体抵消的产品声明被完全禁止；未经批准认证体系支持的可持续标签同样违法。更严格的《绿色声明指令》提案在欧盟委员会2025年6月宣布拟撤回后仍处搁置状态，但2024/825的适用不受影响。',
        whyItMattersEn: 'Product packaging, hangtags, webshop texts and B2B marketing that reach EU consumers all fall in scope, and the burden lands on the company selling in the EU, which is exactly what buyers will now push back into supplier artwork and packaging approvals. Claims printed in Asia today arrive on EU shelves after the ban is live.',
        whyItMattersZh: '触达欧盟消费者的产品包装、吊牌、网店文案及B2B营销均在适用范围内，责任落在欧盟销售方身上，而买家将把这一责任传导至供应商的稿件和包装审批环节。今天在亚洲印刷的声明，上架欧盟货架时禁令已然生效。',
        supplierActionEn: 'Audit every artwork file, hangtag and carton print for environmental wording now. Remove or substantiate generic claims, and expect EU buyers to reject packaging carrying "eco", "green" or offset based "climate neutral" wording after 27 September.',
        supplierActionZh: '立即审查所有稿件、吊牌和外箱印刷中的环保用语。删除或以证据支撑泛泛声明，并预期9月27日后欧盟买家将拒收带有"环保""绿色"或基于抵消的"碳中和"字样的包装。',
        sources: ['https://eur-lex.europa.eu/eli/dir/2024/825/oj', 'https://www.lw.com/en/insights/european-commission-announces-intention-to-withdraw-eu-green-claims-directive-proposal', 'https://cms.law/en/aut/legal-updates/the-eu-green-claims-directive-where-are-we-now-and-what-s-next']
    },
    {
        id: 'news-espr-steel-dpp', slug: 'espr-steel-delegated-act-dpp-registry',
        titleEn: 'Digital Product Passport takes shape: steel rules expected late 2026, textiles next in line',
        titleZh: '数字产品护照渐成型：钢铁细则预计2026年底出台，纺织品紧随其后',
        publishedAt: '2026-09-02T09:00:00Z', pillar: 'standards', accessLevel: 'public',
        imageUrl: 'assets/img/news/cbam-fasteners.jpg',
        whatHappenedEn: 'The Commission closed its public consultation on the first ESPR delegated act for iron and steel products on 12 August 2026, with adoption expected in the fourth quarter of 2026. The draft direction includes carbon footprint disclosure, recycled content requirements and key sustainability data delivered through a Digital Product Passport. The central DPP registry that will store passport identifiers was established in July 2026, and the textiles delegated act is expected around late 2026 to early 2027.',
        whatHappenedZh: '欧盟委员会于2026年8月12日结束了首个ESPR钢铁产品授权法案的公众咨询，预计2026年第四季度通过。草案方向包括碳足迹披露、再生含量要求，以及通过数字产品护照提供关键可持续性数据。存储护照标识符的中央DPP注册系统已于2026年7月建立，纺织品授权法案预计在2026年底至2027年初出台。',
        whyItMattersEn: 'Steel first, textiles second: the two sectors most relevant to this sourcing community are at the front of the DPP queue. Once a delegated act applies, products need machine readable passports with verified data your buyers will request from the factory, and the carbon footprint fields overlap heavily with CBAM data.',
        whyItMattersZh: '钢铁在前、纺织其后：与本采购社群最相关的两个行业正排在DPP队列的最前端。授权法案一旦适用，产品须配备机器可读的护照及经核实的数据，买家会直接向工厂索取，且碳足迹字段与CBAM数据高度重叠。',
        supplierActionEn: 'If you produce steel goods or textiles, start structuring product level data now: material composition, recycled content, carbon footprint per tonne. Data collected once can serve CBAM, the DPP and buyer scorecards together.',
        supplierActionZh: '如果您生产钢铁制品或纺织品，请立即着手建立产品级数据：材料成分、再生含量、每吨碳足迹。一次采集的数据可同时用于CBAM、DPP和买家评分。',
        sources: ['https://single-market-economy.ec.europa.eu/single-market/digital-product-passport_en', 'https://www.adherent.com/blog/early-signals-from-the-eus-preparatory-work-for-future-espr-delegated-acts-on-electronics-textiles-and-iron-steel/'],
        linkedRegIds: ['espr']
    },
    {
        id: 'news-china-supplychain-regs', slug: 'china-supply-chain-security-rules-eu-due-diligence',
        titleEn: 'China tightens supply chain security rules: what ESG audits in China can and cannot do now',
        titleZh: '中国收紧供应链安全规则：在华ESG审核的可为与不可为',
        publishedAt: '2026-09-01T09:00:00Z', pillar: 'china', accessLevel: 'public',
        imageUrl: 'assets/img/news/china-hk.jpg',
        whatHappenedEn: 'China\'s State Council adopted the Regulations on Industrial and Supply Chain Security on 7 April 2026 and the Regulations on Countering Improper Extraterritorial Jurisdiction on 13 April 2026, both effective immediately. Together they create a national security framework around supply chain oversight and expand China\'s toolkit against foreign sanctions, forced labour rules and other extraterritorial measures. Legal advisers note the rules put supply chain mapping, data collection and ESG audits carried out in China under closer scrutiny, since the line between commercial data collection and regulated information gathering will be tested.',
        whatHappenedZh: '中国国务院于2026年4月7日公布《产业和供应链安全条例》、4月13日公布《反外国不当域外管辖条例》，均即时生效。两者共同围绕供应链监管构建国家安全框架，并扩充了应对外国制裁、强迫劳动规则及其他域外措施的工具箱。法律界指出，在华开展的供应链尽调、数据收集和ESG审核将受到更严格审视，商业数据收集与受监管的信息收集之间的界限将被检验。',
        whyItMattersEn: 'EU rules pull in the opposite direction: the Forced Labour Regulation applies from December 2027, buyers run due diligence under the CSDDD and German LkSG, and all of them need evidence from Chinese production sites. Suppliers and sourcing offices now sit between two legal systems with conflicting expectations about the same audit data.',
        whyItMattersZh: '欧盟规则的方向恰恰相反：《强迫劳动条例》2027年12月起适用，买家依据CSDDD和德国《供应链法》开展尽职调查，而这些都需要来自中国生产基地的证据。供应商和采购办公室如今正处于对同一审核数据有着相互冲突要求的两套法律体系之间。',
        supplierActionEn: 'Coordinate audit scope with your EU buyers before fieldwork, use locally accredited audit firms, document the lawful basis for every data transfer, and escalate conflicts to legal counsel instead of improvising on site.',
        supplierActionZh: '实地审核前与欧盟买家协调审核范围，选用本地认可的审核机构，为每次数据传输记录合法依据，遇到冲突交由法律顾问处理而非现场临时应对。',
        sources: ['https://www.morganlewis.com/pubs/2026/04/china-enacts-first-comprehensive-regulations-on-industrial-and-supply-chain-security', 'https://www.mayerbrown.com/en/insights/publications/2026/05/china-expands-its-playbook-new-industrial-supply-chain-and-counter-extraterritoriality-regulations-create-direct-compliance-conflicts-for-multinationals', 'https://www.freshfields.com/en/our-thinking/blogs/sustainability/chinas-new-2026-supply-chain-security-and-counter-extraterritoriality-rules-wha-102n2b2']
    },
    {
        id: 'news-toysafety-2509', slug: 'eu-toy-safety-regulation-2025-2509',
        titleEn: 'New Toy Safety Regulation is law: directive era toys allowed until 2030, toy passport from August 2030',
        titleZh: '新《玩具安全条例》成为法律：旧指令玩具可售至2030年，玩具护照2030年8月起实施',
        publishedAt: '2026-08-28T09:00:00Z', pillar: 'eu', accessLevel: 'public',
        whatHappenedEn: 'Toy Safety Regulation (EU) 2025/2509, published in December 2025 and in force since January 2026, replaces the 2009 Toy Safety Directive with a directly applicable regulation. It tightens chemical rules (including broader bans on CMR substances and new limits targeting endocrine disruptors), clarifies duties for importers, distributors and online platforms, and introduces a Digital Product Passport for toys expected to become mandatory from 1 August 2030. Toys compliant with the old directive may still be placed on the EU market during the transition period until 2030.',
        whatHappenedZh: '《玩具安全条例》(EU) 2025/2509于2025年12月公布、2026年1月起生效，以直接适用的条例取代2009年《玩具安全指令》。新规收紧化学品规则（包括更广泛的CMR物质禁令及针对内分泌干扰物的新限制），明确进口商、分销商和线上平台的义务，并引入玩具数字产品护照，预计2030年8月1日起强制实施。符合旧指令的玩具在过渡期内（至2030年）仍可投放欧盟市场。',
        whyItMattersEn: 'Toy makers get a long runway but a hard destination: chemical reformulation and passport ready data have multi year lead times, and EU buyers typically demand compliance one to two seasons before legal deadlines.',
        whyItMattersZh: '玩具制造商的过渡期虽长，终点却很明确：化学配方调整和护照数据准备需要数年周期，而欧盟买家通常要求提前一到两个销售季完成合规。',
        supplierActionEn: 'Map your toy chemicals against the new limits this year, and plan the data fields for the 2030 toy passport alongside any other DPP work you are doing.',
        supplierActionZh: '今年内对照新限值梳理玩具化学品清单，并将2030年玩具护照的数据字段与其他DPP准备工作一并规划。',
        sources: ['https://eur-lex.europa.eu/eli/reg/2025/2509/oj', 'https://www.sgs.com/en-us/news/2025/12/safeguards-18725-eu-toy-safety-regulation-2025-2509-published', 'https://www.intertek.com/products-retail/insight-bulletins/2025/1504-eu-published-the-regulation-on-the-safety-of-toys/']
    }
];

const patches = [
    {
        id: 'news-cbam-457',
        set: {
            titleEn: 'CBAM set to reach finished goods: Parliament plenary votes this month on 457 downstream products',
            titleZh: 'CBAM将覆盖至制成品：欧洲议会本月全会表决457种下游产品',
            whatHappenedEn: 'The file is coming to a head this month. The Council agreed its position on the CBAM strengthening package on 12 June, and the European Parliament plenary is scheduled to vote in September on the environment committee position adopted in July (56 votes to 11), which supports extending CBAM to 457 downstream steel and aluminium products, fasteners, wire, springs, household articles, kitchen utensils and even solar panels, versus roughly 180 in the Commission proposal, plus tougher anti circumvention rules using origin country default values. Trilogue follows the plenary; final law is targeted for late 2026 or early 2027, application from 2028.',
            whatHappenedZh: '该法案本月进入关键阶段。理事会已于6月12日就CBAM强化方案达成立场，欧洲议会全会定于9月就环境委员会7月通过的立场（56票对11票）进行表决。该立场支持将CBAM扩展至457种下游钢铝产品，包括紧固件、金属丝、弹簧、家居用品、厨具乃至太阳能板，远超欧盟委员会提案的约180种，并以原产国默认值收紧反规避规则。全会后进入三方会谈；最终立法预计2026年底或2027年初，2028年起适用。',
            lastReviewed: '2026-09-05',
            sources: ['https://taxation-customs.ec.europa.eu/news/commission-welcomes-council-agreement-strengthening-cbam-2026-06-12_en', 'https://eurometal.net/european-parliament-committee-backs-downstream-cbam-expansion-and-temporary-decarbonization-fund/', 'https://www.europarl.europa.eu/legislative-train/package-fit-for-55/file-carbon-border-adjustment-mechanism']
        }
    },
    {
        id: 'news-ppwr-countdown',
        set: {
            titleEn: 'Packaging rules now apply: PPWR in force for everything placed on the EU market since 12 August',
            titleZh: '包装新规已然适用：8月12日起投放欧盟市场的所有包装均受PPWR约束',
            whatHappenedEn: 'The Packaging and Packaging Waste Regulation (EU) 2025/40 has applied since 12 August 2026, replacing the 1994 Packaging Directive in all 27 member states with one directly applicable rulebook. Since that date, packaging placed on the EU market must meet the substance requirements of Article 5 (minimised substances of concern, with the combined lead, cadmium, mercury and chromium VI limit of 100 ppm), and every packaging type needs a signed declaration of conformity backed by technical documentation kept for five to ten years. There is no grace period for newly placed stock. The bigger waves, recyclability grades, recycled content quotas, empty space limits and reuse targets, phase in from 2030 onwards.',
            whatHappenedZh: '《包装与包装废弃物条例》(EU) 2025/40自2026年8月12日起适用，以一部直接适用的统一规则取代27个成员国的1994年《包装指令》。自该日起，投放欧盟市场的包装须满足第5条物质要求（尽量减少受关注物质，铅、镉、汞、六价铬合计限值100 ppm），每种包装类型均需签署符合性声明并保存技术文件五至十年。新投放库存没有宽限期。更大的合规浪潮，包括可回收性分级、再生含量配额、空隙率限制和重复使用目标，将自2030年起分阶段实施。',
            lastReviewed: '2026-09-05',
            sources: ['https://eur-lex.europa.eu/eli/reg/2025/40/oj', 'https://www.lawbc.com/eu-packaging-and-packaging-waste-regulation-begins-to-apply-august-12-2026-public-comment-opportunities-underway/', 'https://www.gleisslutz.com/en/know-how/new-eu-packaging-regulation-key-requirements-august-2026']
        }
    },
    {
        id: 'news-cbam-deminimis',
        set: {
            lastReviewed: '2026-09-05',
            supplierActionEn: 'If your EU buyers import more than 50 tonnes of CBAM goods per year, they needed authorised CBAM declarant status (applications were due by 31 March 2026 for a grace period covering 2026). Note the annual CBAM declaration deadline has moved: emissions embedded in 2026 imports are declared by 30 September 2027, not 31 May.',
            supplierActionZh: '若您的欧盟买家每年进口CBAM产品超过50公吨，则需具备CBAM授权申报人资格（2026年3月31日前申请可获覆盖全年2026的宽限期）。请注意年度CBAM申报期限已调整：2026年进口产品的隐含排放申报期限为2027年9月30日，而非5月31日。'
        }
    },
    {
        id: 'news-ets-easing',
        set: {
            lastReviewed: '2026-09-05',
            whyItMattersEn: 'Free EU allowances were due to be replaced by CBAM charges on imports by 2034, so extending them to 2037 implies a slower CBAM phase in, changing the cost trajectory Chinese exporters of steel, aluminium and cement based goods had planned against. A softer EU carbon price also lowers the near term CBAM certificate price, but the direction of travel is unchanged. Parliament and Council have taken up the file after the summer break; the Parliament research service published its briefing on the proposal in August.'
        }
    }
];

// ---- dynamic cleanup: no dash punctuation in any CMS text (platform style) ----
const FIELDS = {
    newsPost: ['titleEn', 'titleZh', 'whatHappenedEn', 'whatHappenedZh', 'whyItMattersEn', 'whyItMattersZh', 'supplierActionEn', 'supplierActionZh'],
    deadline: ['labelEn', 'labelZh', 'affects', 'affectsZh']
};

function undash(v, zh) {
    if (typeof v !== 'string') return v;
    let s = v;
    s = s.replace(/(\d)\s*[–—-]\s*(\d)/g, zh ? '$1至$2' : '$1 to $2'); // digit ranges
    s = s.replace(/——/g, '，');            // ZH double em dash
    s = s.replace(/\s+[—–]\s+/g, ', ');        // spaced dashes
    s = s.replace(/[—–]/g, zh ? '，' : ', ');
    return s;
}

(async () => {
    const q = encodeURIComponent('*[_type in ["newsPost","deadline"]]');
    const r = await fetch(`https://${PROJECT}.apicdn.sanity.io/v2024-01-01/data/query/${DATASET}?query=${q}`);
    const docs = (await r.json()).result || [];

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
            imageUrl: n.imageUrl,
            lastReviewed: '2026-09-05',
            linkedRegulations: (n.linkedRegIds || []).map((id, i) => ({ _key: `r${i}`, _type: 'reference', _ref: `regulation-${id}` })),
            accessLevel: n.accessLevel
        }});
    }
    for (const p of patches) mutations.push({ patch: { id: p.id, set: p.set } });

    // dash sweep on everything not already rewritten above
    const rewritten = new Set([...posts.map(p => p.id), ...patches.map(p => p.id)]);
    for (const d of docs) {
        const fields = FIELDS[d._type] || [];
        const set = {};
        for (const f of fields) {
            if (rewritten.has(d._id) && f.startsWith('title')) continue; // handled explicitly
            const zh = f.endsWith('Zh');
            const nv = undash(d[f], zh);
            if (nv !== d[f]) set[f] = nv;
        }
        if (Object.keys(set).length) mutations.push({ patch: { id: d._id, set } });
    }

    const res = await fetch(`https://${PROJECT}.api.sanity.io/v2024-01-01/data/mutate/${DATASET}`, {
        method: 'POST',
        headers: { 'Authorization': `Bearer ${TOKEN}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({ mutations })
    });
    const body = await res.json();
    if (!res.ok) { console.error('FAILED', res.status, JSON.stringify(body)); process.exit(1); }
    console.log(`OK: ${mutations.length} mutations (${body.transactionId})`);
})();
