// Per-page smoke test for the V2 hub + subpages
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
// jsdom may live in the repo, in NODE_PATH, or in a sibling install dir
for (const p of [path.join(ROOT, 'node_modules'), process.env.NODE_PATH].filter(Boolean)) {
    module.paths.push(p);
}
const { JSDOM } = require('jsdom');
const js = fs.readFileSync(path.join(ROOT, 'script.js'), 'utf8');
const v2js = fs.readFileSync(path.join(ROOT, 'v2.js'), 'utf8');
const cbamData = fs.readFileSync(path.join(ROOT, 'v2-cbam-data.js'), 'utf8');
const matchData = fs.readFileSync(path.join(ROOT, 'v2-matchmaking-data.js'), 'utf8');
const chatJs = fs.readFileSync(path.join(ROOT, 'v2-chat.js'), 'utf8');
const cbamJs = fs.readFileSync(path.join(ROOT, 'v2-cbam.js'), 'utf8');
const regDetails = fs.readFileSync(path.join(ROOT, 'v2-reg-details.js'), 'utf8');

let failures = 0;
const check = (name, cond) => { console.log((cond ? 'PASS' : 'FAIL') + '  ' + name); if (!cond) failures++; };

function boot(file, query, tier) {
    const html = fs.readFileSync(path.join(ROOT, file), 'utf8');
    const dom = new JSDOM(html, { url: 'http://localhost/' + file + (query || ''), runScripts: 'outside-only', pretendToBeVisual: true });
    const { window } = dom;
    if (tier) window.localStorage.setItem('gcc-demo-tier', tier);
    window.IntersectionObserver = class { observe(){} unobserve(){} disconnect(){} };
    window.fetch = () => Promise.reject(new Error('offline'));
    window.scrollTo = () => {};
    window.HTMLElement.prototype.scrollIntoView = function () {};
    window.URL.createObjectURL = () => 'blob:fake';
    window.URL.revokeObjectURL = () => {};
    const errors = [];
    window.addEventListener('error', e => errors.push(e.message));
    try { window.eval(cbamData + '\n;\n' + matchData + '\n;\n' + regDetails + '\n;\n' + js + '\n;\n' + v2js + '\n;\n' + cbamJs + '\n;\n' + chatJs); } catch (e) { errors.push(e.message); }
    return { doc: window.document, window, errors };
}

const PAGES = {
    'index.html':       { page: 'hub',      shown: ['hero', 'v2hub'],      hidden: ['compass', 'cbam', 'faq', 'trust', 'tools'] },
    'v2.html':          { page: 'hub',      shown: ['hero', 'v2hub'],      hidden: ['compass', 'cbam', 'faq', 'trust', 'tools'] },
    'v2-tools.html':    { page: 'tools',    shown: ['tools'],              hidden: ['hero', 'compass', 'cbam'] },
    'v2-deadlines.html':{ page: 'deadlines',shown: ['radar'],              hidden: ['hero', 'compass', 'cbam'] },
    'v2-compass.html':  { page: 'compass',  shown: ['compass'],            hidden: ['hero', 'cbam', 'benefits', 'radar'] },
    'v2-cbam.html':     { page: 'cbam',     shown: ['cbam'],               hidden: ['hero', 'compass', 'briefing'] },
    'v2-matchmaking.html': { page: 'matchmaking', shown: ['matchmaking'],  hidden: ['hero', 'compass', 'cbam', 'partners'] },
    'v2-partners.html': { page: 'partners', shown: ['partners'],           hidden: ['hero', 'compass', 'cbam', 'matchmaking', 'about'] },
    'v2-regulation.html': { page: 'regulation', shown: ['regdetail'],      hidden: ['hero', 'compass', 'cbam', 'radar'] },
    'v2-briefing.html': { page: 'briefing', shown: ['briefing'],           hidden: ['hero', 'cbam', 'library'] },
    'v2-guides.html':   { page: 'guides',   shown: ['library'],            hidden: ['hero', 'briefing'] },
    'v2-learn.html':    { page: 'learn',    shown: ['guidance', 'actions'], hidden: ['hero', 'compass', 'about', 'trust', 'china-esg', 'faq', 'glossary', 'voluntary'] },
    'v2-faq.html':      { page: 'faq',      shown: ['faq'],                hidden: ['hero', 'guidance', 'glossary'] },
    'v2-glossary.html': { page: 'glossary', shown: ['glossary'],           hidden: ['hero', 'faq', 'guidance'] },
    'v2-certifications.html': { page: 'certifications', shown: ['voluntary'], hidden: ['hero', 'faq', 'glossary'] },
    'v2-about.html':    { page: 'about',    shown: ['about', 'trust'],     hidden: ['hero', 'compass', 'guidance', 'faq'] }
};

(async () => {
    for (const [file, exp] of Object.entries(PAGES)) {
        const { doc, errors } = boot(file);
        check(`${file}: no script errors`, errors.length === 0);
        check(`${file}: body page marker`, doc.body.dataset.v2page === exp.page);
        const style = doc.getElementById('v2PageStyle').textContent;
        check(`${file}: hides other sections`, exp.hidden.every(id => style.includes(`#${id}`)));
        check(`${file}: keeps own sections visible`, exp.shown.every(id => !new RegExp(`#${id}[,\\s][^{]*\\{ display: none`).test(style) && !style.split('{')[0].split(',').map(s => s.trim()).includes('#' + id)));
        check(`${file}: nav links to subpages`, doc.querySelector('.nav-links a[href="v2-compass.html"]') !== null);
        check(`${file}: ticker element in DOM`, !!doc.getElementById('newsTicker'));
        if (exp.page === 'hub') check(`${file}: ticker not suppressed on hub`, !doc.getElementById('v2PageStyle').textContent.includes('#newsTicker'));
        else check(`${file}: ticker hidden on subpage`, doc.getElementById('v2PageStyle').textContent.includes('#newsTicker { display: none !important; }'));
        check(`${file}: brief-download card removed`, !doc.getElementById('briefForm'));
        check(`${file}: chamber CTA present`, !!doc.querySelector('.v2-cta-band a[href*="hongkong.ahk.de"]'));
        check(`${file}: no dead committee email`, !doc.body.innerHTML.includes('gcc-sustainability@'));
        check(`${file}: no quick links / logo strip in footer`, !doc.querySelector('.footer-partners') && !doc.body.innerHTML.includes('Quick Links'));
        // committee review round (Sep 2026)
        check(`${file}: always-on legal topline`, !!doc.getElementById('v2Topline'));
        check(`${file}: no sign-in in nav`, !doc.getElementById('navSignin') && !doc.querySelector('.nav-signin-mobile'));
        check(`${file}: Vietnamese hidden from language selector`, !doc.querySelector('#langSelect option[value="vi"]'));
        // owner decisions 2026-09-09: Regulations mega menu, checks under Tools (member-tagged), Knowledge group
        check(`${file}: Regulations mega menu with key regulations`, !!doc.querySelector('.nav-mega a[href="v2-regulation.html?id=cbam"]') && !!doc.querySelector('.nav-mega a[href="v2-regulation.html?id=ppwr"]') && !!doc.querySelector('.nav-mega a[href="v2-regulation.html?id=ukcbam"]'));
        // Merged tool (owner 2026-09-19): one Regulation Finder entry, no
        // separate Product Check
        check(`${file}: nav Tools dropdown = Finder/CBAM, no coming soon`, !!doc.querySelector('.nav-dropdown-menu a[href="v2-compass.html"]') && !doc.querySelector('.nav-dropdown-menu a[href="v2-compass.html?persona=supplier"]') && !!doc.querySelector('.nav-dropdown-menu a[href="v2-cbam.html"]') && !Array.from(doc.querySelectorAll('.nav-dropdown-menu a')).some(a => a.textContent.includes('Coming soon')));
        check(`${file}: nav has Deadlines + Knowledge holds Glossary/FAQ/certifications/guides`, !!doc.querySelector('.nav-links a[href="v2-deadlines.html"]') && !!doc.querySelector('.nav-dropdown-menu a[href="v2-glossary.html"]') && !!doc.querySelector('.nav-dropdown-menu a[href="v2-faq.html"]') && !!doc.querySelector('.nav-dropdown-menu a[href="v2-certifications.html"]') && !!doc.querySelector('.nav-dropdown-menu a[href="v2-guides.html"]'));
        check(`${file}: Guides/Glossary no longer top-level nav items`, !doc.querySelector('#navLinks > li > a[href="v2-guides.html"]') && !doc.querySelector('#navLinks > li > a[href="v2-glossary.html"]'));
        check(`${file}: US market removed from wizard`, !doc.querySelector('#wizardMarkets input[value="us"]'));
        check(`${file}: CBAM tool card clickable again`, !!doc.querySelector('#v2hub a.v2-tool-card[href="v2-cbam.html"]'));
        check(`${file}: no dash punctuation in visible copy`, !/[\u2013\u2014]/.test(doc.body.textContent));
        check(`${file}: member library announced as launching soon`, !!doc.querySelector('.v2-tool-member .v2-lock-badge'));
        check(`${file}: hub CTA has no Join-the-Committee mailto`, !doc.querySelector('.v2-cta-band a[href^="mailto"]'));
        // committee decision Sep 2026 (task 40): briefing headline is Jill's plain title, no product-name masthead
        check(`${file}: briefing title is the plain news headline`, doc.querySelector('.briefing-title .lang-en')?.textContent === 'Latest news about the EU regulatory landscape' && !doc.querySelector('.briefing-masthead-kicker'));
    }

    // Functional: detailed regulation page (owner decision 2026-09-09)
    {
        const { doc } = boot('v2-regulation.html', '?id=cbam', 'member');
        await new Promise(r => setTimeout(r, 30));
        const root = doc.getElementById('regDetailRoot');
        check('regulation page: renders from fallback data when CMS offline', root.querySelector('h1')?.textContent === 'CBAM');
        check('regulation page: disclaimer at point of use', !!root.querySelector('.v2-disclaimer'));
        check('regulation page: obligation sections rendered', root.querySelectorAll('.v2-regdetail-block').length >= 4);
        check('regulation page: role split from detail file', root.querySelectorAll('.v2-rd-role').length === 2);
        check('regulation page: action checklist rendered', root.querySelectorAll('.v2-rd-actions li').length >= 3);
        check('regulation page: tool cards = merged Finder + CBAM quick check', root.querySelectorAll('.v2-rd-tools .v2-tool-card').length === 2);
        check('regulation page: sources listed', root.querySelectorAll('.v2-rd-sources li').length >= 2);
        const bad = boot('v2-regulation.html', '?id=doesnotexist');
        await new Promise(r => setTimeout(r, 30));
        check('regulation page: unknown id shows error state', !!bad.doc.querySelector('.v2-regdetail-error'));
        // exemplar detail entries (verified 2026-09-09): EUDR low-risk fact + PPWR quotas
        const eudr = boot('v2-regulation.html', '?id=eudr', 'member');
        await new Promise(r => setTimeout(r, 30));
        check('regulation page: EUDR detail carries China/Vietnam low-risk fact', eudr.doc.getElementById('regDetailRoot').textContent.includes('low risk (IR (EU) 2025/1093)'));
        const ppwr = boot('v2-regulation.html', '?id=ppwr', 'member');
        await new Promise(r => setTimeout(r, 30));
        check('regulation page: PPWR detail carries recycled-content quotas', ppwr.doc.getElementById('regDetailRoot').textContent.includes('35% for other plastic packaging'));
        // UK built-in base: page renders before the CMS seed runs
        const uk = boot('v2-regulation.html', '?id=ukppt', 'member');
        await new Promise(r => setTimeout(r, 30));
        check('regulation page: UK reg renders from built-in base (pre-seed)', uk.doc.querySelector('#regDetailRoot h1')?.textContent === 'UK Plastic Packaging Tax');
    }

    // Functional: calculator works on the CBAM page
    {
        const { doc } = boot('v2-cbam.html');
        doc.getElementById('cbamSector').value = 'steel_bof';
        doc.getElementById('cbamSector').dispatchEvent(new (doc.defaultView.Event)('change'));
        doc.getElementById('cbamCountry').value = 'CN';
        doc.getElementById('cbamVolume').value = '1000';
        // committee decision: no result without an 8-digit CN code
        doc.getElementById('cbamCalculate').click();
        await new Promise(r => setTimeout(r, 10));
        check('cbam page: blocks without CN code', doc.getElementById('cbamResult').innerHTML.includes('CN code'));
        doc.getElementById('cbamCnCode').value = '72061000';
        doc.getElementById('cbamCalculate').click();
        await new Promise(r => setTimeout(r, 10));
        // CN steel, official corrected default: E=3.187×1.10=3.5057, B=1.370×0.975 → €141.65/t
        check('cbam page: CN official default 2026 (€141.6x/t)', !!doc.getElementById('cbamResult').innerHTML.match(/€141\.6\d/));
        check('cbam page: labeled as official EU default', doc.getElementById('cbamResult').innerHTML.includes('official EU default for your country'));
        check('cbam page: projection chart to 2034', doc.querySelectorAll('#cbamResult .v2-proj-col').length === 9);
        check('cbam page: source note cites corrected IR', doc.getElementById('cbamResult').innerHTML.includes('IR 2026/1740'));
        check('cbam page: disclaimer prepended to result', doc.getElementById('cbamResult').firstElementChild?.classList.contains('v2-disclaimer'));
        // committee decision Sep 2026 (Jill, task 25): the formula is shown as explanatory text
        check('cbam page: formula explainer present', doc.querySelectorAll('.v2-formula-note .v2-formula > div').length === 3);
        check('cbam page: formula flagged as rough estimate', !!doc.querySelector('.v2-formula-note')?.textContent.includes('rough screening estimate'));
        // 2030: E=3.187×1.30, B×0.515 → €224.40/t
        doc.getElementById('v2CbamYear').value = '2030';
        doc.getElementById('cbamCalculate').click();
        await new Promise(r => setTimeout(r, 10));
        check('cbam page: 2030 official-default math (€224.4x)', !!doc.getElementById('cbamResult').innerHTML.match(/€224\.4\d/));
        // custom verified value 2.0 in 2026 reproduces the audited €43.36
        doc.getElementById('v2CbamYear').value = '2026';
        doc.querySelector('input[name="cbamEmissionsMode"][value="custom"]').checked = true;
        doc.getElementById('cbamCustomEmissions').value = '2.0';
        doc.getElementById('cbamCalculate').click();
        await new Promise(r => setTimeout(r, 10));
        check('cbam page: custom verified value math (€43.3x)', !!doc.getElementById('cbamResult').innerHTML.match(/€43\.3\d/));
        // Egypt steel → regulation's Other-Countries fallback (4.049), labeled as such
        doc.querySelector('input[name="cbamEmissionsMode"][value="default"]').checked = true;
        doc.getElementById('cbamCountry').value = 'EG';
        doc.getElementById('cbamCalculate').click();
        await new Promise(r => setTimeout(r, 10));
        check('cbam page: EG steel uses Annex I Other-Countries value', doc.getElementById('cbamResult').innerHTML.includes('Other Countries'));
        check('cbam page: disclaimer prepended to result', doc.getElementById('cbamResult').firstElementChild?.classList.contains('v2-disclaimer'));
    }

    // Functional: wizard + CSV on the compass page, ?persona= preset applied
    {
        const { doc } = boot('v2-compass.html');
        await new Promise(r => setTimeout(r, 10));
        doc.getElementById('filterCategory').value = 'textiles';
        doc.getElementById('filterRole').value = 'supplier';
        doc.querySelectorAll('#compass input[name="market"]').forEach(cb => { cb.checked = cb.value === 'eu'; });
        doc.getElementById('filterSize').value = 'large';
        doc.getElementById('atlasSubmit').click();
        await new Promise(r => setTimeout(r, 10));
        check('compass page: results render', doc.getElementById('atlasCards').innerHTML.includes('reg-result'));
        check('compass page: export bar present', !!doc.querySelector('.v2-export-bar'));
        check('compass page: express panel built', !!doc.getElementById('v2Express'));
        check('compass page: toggle then express above the wizard', (() => { const c = doc.querySelector('#compass .container'); const kids = Array.from(c.children); return kids.findIndex(el => el.id === 'v2ModeToggle') === 1 && kids.findIndex(el => el.id === 'v2Express') === 2; })());
        check('compass page: urgency groups color-tagged', doc.querySelectorAll('#atlasCards .v2-g-act, #atlasCards .v2-g-prep, #atlasCards .v2-g-watch').length > 0);
        check('compass page: group count chips', doc.querySelectorAll('#atlasCards .v2-g-count').length > 0);
        check('compass page: results disclaimer present', !!doc.querySelector('.v2-wizard-addon .v2-disclaimer'));
        check('compass page: referral band to Find Support after results', !!doc.querySelector('.v2-wizard-next .v2-referral-band a[href="v2-matchmaking.html"]'));
        let csvBlob = null;
        // capture CSV
        doc.defaultView.URL.createObjectURL = (b) => { csvBlob = b; return 'blob:fake'; };
        doc.getElementById('v2CsvBtn').click();
        await new Promise(r => setTimeout(r, 10));
        const csvBuf = csvBlob ? Buffer.from(await csvBlob.arrayBuffer()) : Buffer.alloc(0);
        check('compass page: CSV has BOM', csvBuf[0] === 0xEF && csvBuf[1] === 0xBB && csvBuf[2] === 0xBF);
        const csvTxt = csvBuf.toString('utf8');
        check('compass page: CSV has disclaimer row', csvTxt.includes('"Disclaimer"'));
        check('compass page: CSV has Chinese column', csvTxt.includes('适用原因'));
    }

    // Functional: multi-category comparison matrix (committee request #28)
    {
        const { doc } = boot('v2-compass.html');
        await new Promise(r => setTimeout(r, 10));
        const chips = doc.querySelectorAll('#v2ExCats .v2-ex-cat');
        check('compass page: express category chips built', chips.length >= 7);
        doc.querySelector('#v2ExCats .v2-ex-cat[data-value="textiles"]').click();
        doc.querySelector('#v2ExCats .v2-ex-cat[data-value="toys"]').click();
        doc.getElementById('v2ExRun').click();
        await new Promise(r => setTimeout(r, 10));
        check('compass page: comparison matrix renders', doc.getElementById('v2ExResult').innerHTML.includes('v2-cmp-table'));
        check('compass page: per-category columns + checkmarks', doc.querySelectorAll('#v2ExResult .v2-cmp-cat').length === 2 && doc.querySelectorAll('#v2ExResult .v2-cmp-yes').length > 0);
    }

    // Focused subpages: glossary as term/definition rows, certifications standalone
    {
        const { doc } = boot('v2-glossary.html');
        check('glossary page: term/definition rows (14 incl. law types)', doc.querySelectorAll('.v2-gl-row').length === 14);
        check('glossary page: law-types group present', doc.body.innerHTML.includes('Types of EU rules'));
        check('glossary page: what-it-means-for-you column', doc.querySelectorAll('.v2-gl-you').length === 14);
    }
    {
        const { doc } = boot('v2-certifications.html');
        // Sep 2026 review round 2 (Jill Dessel): 34 verified schemes in 8 topic
        // groups with an EU-requirement filter
        const rows = doc.querySelectorAll('#voluntary .v2-cert-row');
        check('certifications page: name/explanation rows', rows.length === 34);
        check('certifications page: 8 topic group headings', doc.querySelectorAll('#voluntary .v2-cert-group').length === 8);
        check('certifications page: every row tagged with EU requirements', Array.from(rows).every(r => (r.dataset.reqs || '').trim().length > 0));
        const chips = Array.from(doc.querySelectorAll('#certFilter .v2-cert-chip'));
        check('certifications page: filter bar with All + 8 requirement chips', chips.length === 9 && chips[0].dataset.req === '');
        const reqs = new Set(Array.from(rows).flatMap(r => r.dataset.reqs.split(' ')));
        check('certifications page: every filter chip matches at least one row', chips.slice(1).every(c => reqs.has(c.dataset.req)));
        check('certifications page: non-certifications carry a type label', Array.from(rows).filter(r => r.querySelector('.v2-cert-type')).length >= 7);
    }

    // Wizard multi-select -> comparison matrix in the results area
    {
        const { doc } = boot('v2-compass.html');
        await new Promise(r => setTimeout(r, 10));
        doc.querySelector('#wizardCatGrid .wizard-cat[data-value="textiles"]').click();
        doc.querySelector('#wizardCatGrid .wizard-cat[data-value="toys"]').click();
        await new Promise(r => setTimeout(r, 10));
        check('wizard: two categories toggled active', doc.querySelectorAll('#wizardCatGrid .wizard-cat.active').length === 2);
        doc.getElementById('filterRole').value = 'supplier';
        doc.querySelectorAll('#compass input[name="market"]').forEach(cb => { cb.checked = cb.value === 'eu'; });
        doc.getElementById('atlasSubmit').click();
        await new Promise(r => setTimeout(r, 10));
        check('wizard: multi-select renders comparison matrix', doc.getElementById('atlasCards').innerHTML.includes('v2-cmp-table'));
    }
    {
        const { doc } = boot('v2-compass.html');
        check('compass page: voluntary certifications moved off results flow', doc.getElementById('v2PageStyle').textContent.split('{')[0].includes('#voluntary'));
    }

    // Functional: hub member/non-member band (replaced persona doors, owner 2026-09-10)
    {
        const { doc } = boot('v2.html');
        // Owner 2026-09-19: personas band dropped from the hub; matchmaking
        // band is the prominent landing element instead
        check('hub: personas band hidden', doc.getElementById('v2PageStyle').textContent.includes('#personas'));
        check('hub: matchmaking band prominent with category chips',
            !!doc.querySelector('#v2hub .v2-hub-match') && doc.querySelectorAll('#hubMatchCats a.v2-partner-cat').length === 18);
        check('hub: matchmaking band links Find Support + Our Partners',
            !!doc.querySelector('.v2-hub-match-ctas a[href="v2-matchmaking.html"]') && !!doc.querySelector('.v2-hub-match-ctas a[href="v2-partners.html"]'));
        check('hub: hero CTA to find a partner', !!doc.querySelector('.hero-ctas a[href="v2-matchmaking.html"]'));
        check('hub: no sign-in anywhere on the landing page', !doc.querySelector('#v2hub a[href*="account"]') && !doc.querySelector('.v2-signin-btn'));
        check('hub: deadlines mini exists, news mini removed', !!doc.getElementById('v2MiniDeadlines') && !doc.getElementById('v2MiniNews'));
    }

    // Guides gate + white background + balanced CTAs
    {
        const { doc } = boot('v2-guides.html');
        await new Promise(r => setTimeout(r, 10));
        check('guides page: gate shown when signed out', !!doc.querySelector('.v2-gate'));
        check('guides page: grid hidden behind gate', doc.getElementById('libraryGrid').style.display === 'none');
        check('guides page: gate is launching-soon, no sign-in', !doc.querySelector('.v2-gate a[href="account.html"]') && doc.querySelector('.v2-gate h3 .lang-en').textContent.includes('launching soon'));
        check('guides page: gate offers committee contact + chamber links', !!doc.querySelector('.v2-gate a[href^="mailto:info@hongkong.ahk.de"]') && !!doc.querySelector('.v2-gate a[href*="hongkong.ahk.de"]'));
    }
    {
        // demo member tier → no gate
        const { doc, window } = boot('v2-guides.html');
        window.localStorage.setItem('gcc-demo-tier', 'member');
        window.eval('(' + function () {
            // re-run only the gate logic by reloading scripts is heavy; assert helper honours tier instead
        } + ')()');
        // fresh boot with tier pre-set
        const html = require('fs').readFileSync(path.join(ROOT, 'v2-guides.html'), 'utf8');
        const { JSDOM } = require('jsdom');
        const dom2 = new JSDOM(html, { url: 'http://localhost/v2-guides.html', runScripts: 'outside-only', pretendToBeVisual: true });
        const w2 = dom2.window;
        w2.localStorage.setItem('gcc-demo-tier', 'member');
        w2.IntersectionObserver = class { observe(){} unobserve(){} disconnect(){} };
        w2.fetch = () => Promise.reject(new Error('offline'));
        w2.scrollTo = () => {}; w2.HTMLElement.prototype.scrollIntoView = function(){};
        w2.eval(require('fs').readFileSync(path.join(ROOT, 'script.js'), 'utf8') + '\n;\n' + require('fs').readFileSync(path.join(ROOT, 'v2.js'), 'utf8'));
        check('guides page: no gate for demo member', !dom2.window.document.querySelector('.v2-gate'));
    }
    check('white page background rule present', require('fs').readFileSync(path.join(ROOT, 'v2.css'), 'utf8').includes('section.atlas, section.radar'));


    // Ticker tuning: 3 unique headlines, duplicated for the loop, clicks navigate
    {
        const { doc, window } = boot('v2.html');
        const track = doc.getElementById('tickerTrack');
        track.innerHTML = ['a','b','c','d','e'].map(s => `<a class="ticker-item" href="#briefing-${s}"><span>${s}</span></a>`).join('<span class="ticker-sep">●</span>');
        await new Promise(r => setTimeout(r, 30));
        const anchors = Array.from(track.querySelectorAll('a.ticker-item'));
        check('hub ticker trimmed to 3 unique ×2 copies', anchors.length === 6);
        check('hub ticker links rewritten cross-page', anchors.every(a => a.getAttribute('href').startsWith('v2-briefing.html#briefing-')));
        const uniq = new Set(anchors.map(a => a.getAttribute('href')));
        check('hub ticker has 3 unique targets', uniq.size === 3);
    }

    // ===== Matchmaking (Find Support) + Our Partners + CBAM Quick Check =====
    // Privacy: the generated public dataset must never carry internal workbook
    // columns (strategy sheet, ratings, review notes, contacts)
    {
        const src = matchData;
        const forbidden = ['Confidence', 'Adopter', 'Review Note', 'Partner Potential', 'Strategic Partner',
            'Governance', 'Rationale', 'First Ask', 'Priority', 'Member Status', 'Business Profile'];
        check('matchmaking data: no internal workbook fields leak', forbidden.every(f => !src.includes(f)));
        const taxonomy = JSON.parse(fs.readFileSync(path.join(ROOT, 'api', 'match-taxonomy.json'), 'utf8'));
        check('match taxonomy: 18 categories, public fields only', taxonomy.length === 18 &&
            taxonomy.every(c => JSON.stringify(Object.keys(c).sort()) === JSON.stringify(['example', 'id', 'label'])));
        check('matchmaking data: providers present with website + categories',
            /providers:\s*\[/.test(src) && src.includes('https://'));
    }

    // Functional: category dropdown → provider cards with introduction CTA
    {
        const { doc, window, errors } = boot('v2-matchmaking.html');
        check('matchmaking page: no script errors', errors.length === 0);
        const sel = doc.getElementById('matchCategory');
        check('matchmaking page: category select populated (18 + placeholder)', sel && sel.options.length === 19);
        sel.value = 'cbam';
        sel.dispatchEvent(new window.Event('change'));
        await new Promise(r => setTimeout(r, 10));
        const cards = doc.querySelectorAll('#matchResults .v2-match-card');
        check('matchmaking page: CBAM category lists providers', cards.length >= 2);
        check('matchmaking page: TÜV listed for CBAM', doc.getElementById('matchResults').innerHTML.includes('TÜV Rheinland'));
        check('matchmaking page: introduction goes via the Chamber inbox',
            !!doc.querySelector('#matchResults a.v2-match-intro[href^="mailto:info@hongkong.ahk.de"]'));
        check('matchmaking page: provider websites open safely',
            Array.from(doc.querySelectorAll('#matchResults a.v2-match-web')).every(a => a.getAttribute('rel') === 'noopener' && a.getAttribute('target') === '_blank'));
        const names = Array.from(cards).map(c => c.querySelector('h4').textContent.toLowerCase());
        check('matchmaking page: providers listed alphabetically (neutrality)',
            names.every((n, i) => i === 0 || names[i - 1] <= n));
        check('matchmaking page: neutrality disclaimer present',
            doc.querySelector('.v2-match-note').textContent.includes('not a consultancy'));
    }

    // Deep link ?category= preselects; free text falls back to keyword matching offline
    {
        const { doc, window } = boot('v2-matchmaking.html', '?category=testing');
        await new Promise(r => setTimeout(r, 10));
        check('matchmaking page: ?category=testing preselects', doc.getElementById('matchCategory').value === 'testing');
        check('matchmaking page: ?category=testing renders results', doc.querySelectorAll('#matchResults .v2-match-card').length > 0);
        doc.getElementById('matchText').value = 'We export steel to the EU and need CBAM calculation and reporting support';
        doc.getElementById('matchFind').click();
        await new Promise(r => setTimeout(r, 30));
        check('matchmaking page: offline free text uses keyword fallback', doc.querySelectorAll('#matchResults .v2-match-card').length > 0);
        check('matchmaking page: fallback notice shown', !!doc.querySelector('#matchStatus .v2-match-ai-note'));
    }

    // Our Partners: ecosystem cards, category chips, alphabetical directory
    {
        const { doc, errors } = boot('v2-partners.html');
        check('partners page: no script errors', errors.length === 0);
        check('partners page: ecosystem explains Chamber vs members', doc.querySelectorAll('#partners .v2-eco-card').length === 3);
        check('partners page: 18 category chips link to Find Support',
            doc.querySelectorAll('#partnersCategories a.v2-partner-cat[href^="v2-matchmaking.html?category="]').length === 18);
        const dir = doc.querySelectorAll('#partnersDirectory .v2-match-card');
        check('partners page: full provider directory rendered', dir.length >= 25);
        check('partners page: directory is not an endorsement (copy)', doc.querySelector('.v2-partner-dir-head').textContent.includes('not an endorsement'));
        check('partners page: become-a-member journey present', !!doc.querySelector('#partners a[href="https://hongkong.ahk.de/en/chamber"]'));
    }

    // About navigation + CBAM Quick Check conversion (non-competitive positioning)
    {
        const { doc } = boot('v2-cbam.html');
        check('cbam page: title says Quick Check', doc.title.includes('CBAM Quick Check'));
        check('cbam page: no "CBAM Calculator" wording left', !fs.readFileSync(path.join(ROOT, 'v2.html'), 'utf8').includes('CBAM Calculator'));
        check('cbam page: scope note marks it educational, not a filing tool',
            doc.querySelector('#cbam .cbam-scope-note .lang-en').textContent.includes('not a CBAM declaration'));
        check('cbam page: referral band to member CBAM support',
            !!doc.querySelector('#cbamReferral a[href="v2-matchmaking.html?category=cbam"]'));
        const nav = doc.getElementById('navLinks');
        // Owner 2026-09-19: Matchmaking is a top-level main menu (Find Support
        // + Our Partners), not tucked into Tools or About
        const mmTop = Array.from(nav.children).find(li => li.querySelector(':scope > a[href="v2-matchmaking.html"]'));
        check('nav: Matchmaking is a top-level menu', !!mmTop && mmTop.classList.contains('nav-dropdown'));
        check('nav: Matchmaking menu holds Find Support + Our Partners',
            !!mmTop.querySelector('.nav-dropdown-menu a[href="v2-matchmaking.html"]') && !!mmTop.querySelector('.nav-dropdown-menu a[href="v2-partners.html"]'));
        check('nav: Our Team back to a plain top-level link',
            !!nav.querySelector(':scope > li:not(.nav-dropdown) > a[href="v2-about.html"]'));
        check('nav: every entry carries four languages', ['v2-partners.html', 'v2-matchmaking.html'].every(href => {
            const a = nav.querySelector(`a[href="${href}"]`);
            return ['lang-en', 'lang-zh', 'lang-de', 'lang-vi'].every(c => a.querySelector('.' + c));
        }));
    }

    // Merged Regulation Finder: explicit view toggle replaces the two-tool split
    {
        const { doc, window } = boot('v2-compass.html');
        await new Promise(r => setTimeout(r, 10));
        const btns = doc.querySelectorAll('#v2ModeToggle .v2-mode-btn');
        check('finder: view toggle with quick + detailed', btns.length === 2 &&
            btns[0].textContent.includes('Quick overview') && btns[1].textContent.includes('Detailed check'));
        check('finder: quick overview is the default view',
            doc.getElementById('v2Express').style.display !== 'none' &&
            doc.querySelector('.compass-wizard').style.display === 'none' &&
            btns[0].classList.contains('on') && btns[0].getAttribute('aria-pressed') === 'true');
        btns[1].click();
        check('finder: toggle switches to the detailed check',
            doc.getElementById('v2Express').style.display === 'none' &&
            doc.querySelector('.compass-wizard').style.display !== 'none' &&
            btns[1].classList.contains('on'));
        check('finder: old cross-switch links gone', !doc.getElementById('v2ToWizard') && !doc.getElementById('v2ToExpress'));
        // legacy deep links still work
        const { doc: d2 } = boot('v2-compass.html', '?persona=supplier');
        await new Promise(r => setTimeout(r, 10));
        check('finder: legacy ?persona=supplier opens the detailed check', d2.querySelector('.compass-wizard').style.display !== 'none');
        const { doc: d3 } = boot('v2-compass.html', '?mode=detailed');
        await new Promise(r => setTimeout(r, 10));
        check('finder: ?mode=detailed opens the detailed check', d3.querySelector('.compass-wizard').style.display !== 'none');
        check('finder: no Product Check tool name left in the master', !fs.readFileSync(path.join(ROOT, 'v2.html'), 'utf8').match(/v2-tool-card[^>]*persona=supplier/));
    }

    // Hub Assistant chat widget: present on every page, accessible, safe fallback
    {
        const { doc, window } = boot('index.html');
        const cbtn = doc.getElementById('gccChatBtn');
        const cpanel = doc.getElementById('gccChatPanel');
        check('chat: button + panel injected on the hub', !!cbtn && !!cpanel && cpanel.hidden);
        check('chat: button is accessible (dialog semantics)',
            cbtn.getAttribute('aria-haspopup') === 'dialog' && cbtn.getAttribute('aria-expanded') === 'false' && !!cbtn.getAttribute('aria-label'));
        cbtn.click();
        check('chat: opens with greeting + suggestions', !cpanel.hidden && cbtn.getAttribute('aria-expanded') === 'true' &&
            !!doc.querySelector('#gccChatLog .gcc-chat-assistant') && doc.querySelectorAll('#gccChatSugg .gcc-chat-chip').length === 3);
        check('chat: four-language chrome', ['lang-en', 'lang-zh', 'lang-de', 'lang-vi'].every(c => cpanel.querySelector('.gcc-chat-head .' + c)));
        check('chat: disclaimer in header', cpanel.querySelector('.gcc-chat-sub .lang-en').textContent.includes('not legal advice'));
        // offline send → committee fallback with Find Support link
        doc.getElementById('gccChatInput').value = 'Who can help me with CBAM reporting?';
        doc.getElementById('gccChatForm').dispatchEvent(new window.Event('submit'));
        await new Promise(r => setTimeout(r, 30));
        const msgs = doc.querySelectorAll('#gccChatLog .gcc-chat-msg');
        const last = msgs[msgs.length - 1];
        check('chat: offline fallback points to Find Support + Committee email',
            !!last.querySelector('a[href="v2-matchmaking.html"]') && !!last.querySelector('a[href^="mailto:info@hongkong.ahk.de"]'));
        // Escape closes and returns focus to the launcher
        doc.dispatchEvent(new window.KeyboardEvent('keydown', { key: 'Escape', bubbles: true }));
        check('chat: Escape closes the panel', cpanel.hidden && cbtn.getAttribute('aria-expanded') === 'false');
        // widget ships on subpages too
        const { doc: doc2 } = boot('v2-regulation.html', '?id=cbam');
        check('chat: widget present on subpages', !!doc2.getElementById('gccChatBtn'));
        // markdown link whitelist: only known targets become links
        const chatProviders = JSON.parse(fs.readFileSync(path.join(ROOT, 'api', 'chat-providers.json'), 'utf8'));
        check('chat: provider grounding file is public fields only',
            chatProviders.length >= 25 && chatProviders.every(p => JSON.stringify(Object.keys(p).sort()) === JSON.stringify(['categories', 'name', 'offering', 'website'])));
        check('chat: master page loads the widget script', fs.readFileSync(path.join(ROOT, 'v2.html'), 'utf8').includes('v2-chat.js'));
    }

    // Referral journeys on educational pages
    {
        const learn = fs.readFileSync(path.join(ROOT, 'v2-learn.html'), 'utf8');
        const certs = fs.readFileSync(path.join(ROOT, 'v2-certifications.html'), 'utf8');
        const guides = fs.readFileSync(path.join(ROOT, 'v2-guides.html'), 'utf8');
        const hub = fs.readFileSync(path.join(ROOT, 'index.html'), 'utf8');
        check('learn page: referral band to Find Support', learn.includes('id="actions"') && learn.includes('v2-matchmaking.html'));
        check('certifications page: referral band to testing category', certs.includes('v2-matchmaking.html?category=testing'));
        check('guides page: referral band to Find Support', guides.includes('v2-matchmaking.html'));
        check('hub: matchmaking band markup present', hub.includes('v2-hub-match'));
    }

    console.log('---');


    console.log(failures ? failures + ' CHECK(S) FAILED' : 'ALL V2 PAGE CHECKS PASSED');
    process.exit(failures ? 1 : 0);
})();
