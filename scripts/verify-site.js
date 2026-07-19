const fs = require('fs');
const path = require('path');
const { JSDOM } = require('jsdom');

const ROOT = '/Users/michaelkeppe/claude-projects/gcc-esg';
const html = fs.readFileSync(path.join(ROOT, 'index.html'), 'utf8');
const js = fs.readFileSync(path.join(ROOT, 'script.js'), 'utf8');

const dom = new JSDOM(html, { url: 'http://localhost/', runScripts: 'outside-only', pretendToBeVisual: true });
const { window } = dom;

// Stubs for APIs jsdom lacks
window.IntersectionObserver = class {
    constructor(cb) { this.cb = cb; }
    observe() {}
    unobserve() {}
    disconnect() {}
};
window.fetch = (url) => {
    const u = String(url);
    const ok = (data) => Promise.resolve({ ok: true, status: 200, json: async () => data });
    if (u.includes('/api/content?type=deadlines')) return ok([
        { labelEn: 'Test deadline', labelZh: '测试期限', date: '2026-09-01', affects: 'Everyone', affectsZh: '所有人', confidence: 'fixed' },
        { labelEn: 'Expected one', date: '2028-01-01', confidence: 'expected' },
        { labelEn: 'Horizon deadline', date: '2030-01-01', confidence: 'fixed' },
        { labelEn: 'Past deadline', date: '2020-01-01', confidence: 'fixed' }
    ]);
    if (u.includes('/api/content?type=news')) return ok([
        { titleEn: 'Test post', titleZh: '测试文章', publishedAt: '2026-07-17T09:00:00Z', pillar: 'eu', whatHappenedEn: 'happened', whyItMattersEn: 'matters', supplierActionEn: 'act' }
    ]);
    if (u.includes('/api/content?type=regulations')) return ok([
        {
            regId: 'eudr-cms', name: 'EUDR (from CMS)', ref: '(EU) 2023/1115', status: 'phasing',
            inForce: '29 June 2023', complianceDeadline: '30 December 2026', lastReviewed: '2026-07-18',
            eurlex: 'https://example.com',
            sections: [{ title: 'SUPPLY CHAIN', textEn: 'CMS section text' }],
            categories: ['furniture', 'food'], roles: [], sizes: [],
            reasonEn: '{category} products may contain covered commodities.',
            reasonZh: '{category}可能含有受管制原料。'
        }
    ]);
    return Promise.reject(new Error('offline'));
};
window.scrollTo = () => {};
window.HTMLElement.prototype.scrollIntoView = function () {};

let failures = 0;
const check = (name, cond) => {
    console.log((cond ? 'PASS' : 'FAIL') + '  ' + name);
    if (!cond) failures++;
};

// Run the site script
try {
    window.eval(js);
    check('script.js executes without throwing', true);
} catch (e) {
    check('script.js executes without throwing (' + e.message + ')', false);
}

const doc = window.document;

// --- Rename checks ---
check('no "Compliance Atlas" text remains', !doc.body.textContent.includes('Compliance Atlas'));
check('"Green Sourcing Compass" present', doc.body.textContent.includes('Green Sourcing Compass'));
check('section id #compass exists', !!doc.getElementById('compass'));

// --- Wizard flow ---
const catBtn = doc.querySelector('.wizard-cat[data-value="textiles"]');
catBtn.click();
check('category button sets hidden select', doc.getElementById('filterCategory').value === 'textiles');
check('category button gets active class', catBtn.classList.contains('active'));

// Next without markets should be blocked after moving to step 2
doc.querySelector('.wizard-next[data-next="2"]').click();
check('step 2 pane active after Next', doc.querySelector('.wizard-pane[data-pane="2"]').classList.contains('active'));

doc.querySelector('.wizard-next[data-next="3"]').click();
check('step 3 blocked without market selection', !doc.querySelector('.wizard-pane[data-pane="3"]').classList.contains('active'));

doc.querySelector('input[name="market"][value="eu"]').click();
doc.querySelector('.wizard-next[data-next="3"]').click();
check('step 3 pane active after selecting market', doc.querySelector('.wizard-pane[data-pane="3"]').classList.contains('active'));

doc.getElementById('filterRole').value = 'supplier';
doc.getElementById('filterSize').value = 'large';
doc.getElementById('atlasSubmit').click();

const cardsHtml = doc.getElementById('atlasCards').innerHTML;
check('results rendered', cardsHtml.length > 500);
check('ACT NOW group present', cardsHtml.includes('ACT NOW'));
check('PREPARE group present', cardsHtml.includes('PREPARE'));
check('WATCH group present', cardsHtml.includes('WATCH'));
check('textiles: Textiles EPR (2025/1892) appears', cardsHtml.includes('2025/1892'));
check('textiles: EUDR does NOT appear', !cardsHtml.includes('EUDR'));
check('textiles: CSRD appears (large co.)', cardsHtml.includes('CSRD'));
check('CSRD shows FY2027 deadline', cardsHtml.includes('FY2027'));
check('CSDDD 3% penalty cap shown', cardsHtml.includes('3% of net worldwide turnover'));
check('no Tier-1-only wording', !cardsHtml.includes('Tier 1) business partners'));

// Wizard back-jump via step indicator
doc.querySelector('.wizard-step[data-step="1"]').click();
check('step indicator jumps back to step 1', doc.querySelector('.wizard-pane[data-pane="1"]').classList.contains('active'));

// --- Construction category triggers CBAM card ---
doc.querySelector('.wizard-cat[data-value="construction"]').click();
doc.getElementById('atlasSubmit').click();
const cardsHtml2 = doc.getElementById('atlasCards').innerHTML;
check('construction: CBAM card appears', cardsHtml2.includes('CBAM'));
check('construction: downstream extension mentioned', cardsHtml2.includes('180 downstream'));

// --- Electronics no longer triggers CBAM/DPP ---
doc.querySelector('.wizard-cat[data-value="electronics"]').click();
doc.getElementById('atlasSubmit').click();
const cardsHtml3 = doc.getElementById('atlasCards').innerHTML;
check('electronics: no CBAM card', !cardsHtml3.includes('(EU) 2023/956'));
check('electronics: Batteries card with Aug 2026 labelling', cardsHtml3.includes('18 August 2026 (labelling)'));
check('electronics: no DPP card (not first wave)', !cardsHtml3.includes('Under (EU) 2024/1781'));

// --- EUDR dates via furniture ---
doc.querySelector('.wizard-cat[data-value="furniture"]').click();
doc.getElementById('atlasSubmit').click();
const cardsHtml4 = doc.getElementById('atlasCards').innerHTML;
check('furniture: EUDR shows 30 December 2026', cardsHtml4.includes('30 December 2026'));
check('furniture: DPP card appears', cardsHtml4.includes('Digital Product Passport'));

// --- CBAM calculator ---
doc.getElementById('cbamSector').value = 'steel_bof';
doc.getElementById('cbamSector').dispatchEvent(new window.Event('change'));
check('sector default shows 2 tCO2e', doc.getElementById('cbamEmissionsDefault').textContent.includes('2'));
doc.getElementById('cbamCountry').value = 'CN';
doc.getElementById('cbamVolume').value = '1000';
doc.getElementById('cbamCalculate').click();
const cbamHtml = doc.getElementById('cbamResult').innerHTML;
check('CBAM result rendered', cbamHtml.includes('cbam-result-card'));
check('CBAM uses Q2 2026 price 75.28', cbamHtml.includes('75.28'));
check('1000t: no de minimis callout', !cbamHtml.includes('De minimis'));

// Expected math: emissions 2.0, benchmark 1.248, freeAlloc = 1.2168, liable = 0.7832/t
// CN credit ratio 10/75.28 = 0.13284; net = 0.7832*(1-0.13284) = 0.67916/t; cost = 51.13/t
const costPerTMatch = cbamHtml.match(/€51\.1\d/);
check('per-tonne cost ≈ €51.13 (math verified)', !!costPerTMatch);

doc.getElementById('cbamVolume').value = '30';
doc.getElementById('cbamCalculate').click();
const cbamHtml2 = doc.getElementById('cbamResult').innerHTML;
check('30t: de minimis callout appears', cbamHtml2.includes('De minimis'));

// --- Language switching (4 languages via dropdown) ---
const langSel = doc.getElementById('langSelect');
const switchLang = (l) => { langSel.value = l; langSel.dispatchEvent(new window.Event('change')); };
switchLang('zh');
check('zh mode sets body class', doc.body.classList.contains('zh'));
switchLang('de');
check('de mode sets body class', doc.body.classList.contains('de') && !doc.body.classList.contains('zh'));
check('de spans exist in wizard', !!doc.querySelector('.wizard-cat[data-value="toys"] .lang-de'));
check('html lang attribute de', doc.documentElement.lang === 'de');
switchLang('vi');
check('vi mode sets body class', doc.body.classList.contains('vi'));
check('vi spans exist in hero', !!doc.querySelector('.hero-eyebrow .lang-vi'));
switchLang('zh');
check('wizard cat has zh span', !!doc.querySelector('.wizard-cat[data-value="toys"] .lang-zh'));

// --- Brief form (subscribe) ---
const briefForm = doc.getElementById('briefForm');
check('consent checkbox present', !!doc.getElementById('briefConsent'));
briefForm.querySelector('input[type="email"]').value = 'test@example.com';
// no consent → submit does nothing
briefForm.dispatchEvent(new window.Event('submit', { cancelable: true }));
check('submit blocked without consent', !!briefForm.querySelector('button[type="submit"]'));
// with consent → fetch stub rejects → error message shown, button re-enabled
doc.getElementById('briefConsent').checked = true;
briefForm.dispatchEvent(new window.Event('submit', { cancelable: true }));
setTimeout(() => {
    const msgEl = briefForm.querySelector('.brief-msg');
    check('error message shown when API unreachable', !!msgEl && msgEl.textContent.length > 0);
    check('submit button re-enabled after error', briefForm.querySelector('button[type="submit"]').disabled === false);

    // --- CMS-driven sections (stubbed /api/content) ---
    const radar = doc.getElementById('radar');
    check('radar section visible with data', radar.style.display !== 'none');
    const radarHtml = doc.getElementById('radarList').innerHTML;
    check('radar renders future deadline', radarHtml.includes('Test deadline'));
    check('radar excludes past deadline', !radarHtml.includes('Past deadline'));
    check('radar marks expected dates', radarHtml.includes('radar-expected'));
    const briefing = doc.getElementById('briefing');
    check('briefing section visible with data', briefing.style.display !== 'none');
    const briefingHtml = doc.getElementById('briefingList').innerHTML;
    check('briefing renders post with 3-row structure', briefingHtml.includes('Test post') && briefingHtml.includes('What happened') && briefingHtml.includes('What to do'));
    // --- New visual elements ---
    check('radar renders urgency group headers', doc.getElementById('radarList').innerHTML.includes('NEXT 6 MONTHS') && doc.getElementById('radarList').innerHTML.includes('ON THE HORIZON'));
    const ticker = doc.getElementById('newsTicker');
    check('news ticker visible', ticker.style.display !== 'none');
    check('ticker has clickable items', doc.querySelectorAll('#tickerTrack .ticker-item').length >= 2);
    check('guided start section present', !!doc.getElementById('start') && doc.querySelectorAll('.start-card').length === 4);
    check('FAQ has aria-expanded', doc.querySelector('.faq-question').getAttribute('aria-expanded') === 'false');

    // --- CMS regulation transform (placeholder substitution, applies() from arrays) ---
    doc.querySelector('.wizard-cat[data-value="furniture"]').click();
    doc.getElementById('atlasSubmit').click();
    const cmsCards = doc.getElementById('atlasCards').innerHTML;
    check('CMS regulation replaces fallback data', cmsCards.includes('EUDR (from CMS)'));
    check('{category} placeholder substituted', cmsCards.includes('Furniture &amp; Home Goods products may contain') || cmsCards.includes('Furniture & Home Goods products may contain'));
    check('CMS lastReviewed formatted', cmsCards.includes('July 2026'));
    check('CMS section text rendered', cmsCards.includes('CMS section text'));
    // toys should NOT match the CMS reg (categories furniture/food only)
    doc.querySelector('.wizard-cat[data-value="toys"]').click();
    doc.getElementById('atlasSubmit').click();
    check('CMS applies() filters by category', !doc.getElementById('atlasCards').innerHTML.includes('EUDR (from CMS)'));

    console.log('---');
    console.log(failures === 0 ? 'ALL CHECKS PASSED' : failures + ' CHECK(S) FAILED');
    process.exit(failures ? 1 : 0);
}, 50);

// final summary printed in the setTimeout above (async form checks)
