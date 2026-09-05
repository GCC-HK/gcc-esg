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
const cbamJs = fs.readFileSync(path.join(ROOT, 'v2-cbam.js'), 'utf8');

let failures = 0;
const check = (name, cond) => { console.log((cond ? 'PASS' : 'FAIL') + '  ' + name); if (!cond) failures++; };

function boot(file) {
    const html = fs.readFileSync(path.join(ROOT, file), 'utf8');
    const dom = new JSDOM(html, { url: 'http://localhost/' + file, runScripts: 'outside-only', pretendToBeVisual: true });
    const { window } = dom;
    window.IntersectionObserver = class { observe(){} unobserve(){} disconnect(){} };
    window.fetch = () => Promise.reject(new Error('offline'));
    window.scrollTo = () => {};
    window.HTMLElement.prototype.scrollIntoView = function () {};
    window.URL.createObjectURL = () => 'blob:fake';
    window.URL.revokeObjectURL = () => {};
    const errors = [];
    window.addEventListener('error', e => errors.push(e.message));
    try { window.eval(cbamData + '\n;\n' + js + '\n;\n' + v2js + '\n;\n' + cbamJs); } catch (e) { errors.push(e.message); }
    return { doc: window.document, window, errors };
}

const PAGES = {
    'index.html':       { page: 'hub',      shown: ['hero', 'v2hub'],      hidden: ['compass', 'cbam', 'faq'] },
    'v2.html':          { page: 'hub',      shown: ['hero', 'v2hub'],      hidden: ['compass', 'cbam', 'faq'] },
    'v2-compass.html':  { page: 'compass',  shown: ['compass', 'radar'],   hidden: ['hero', 'cbam', 'benefits'] },
    'v2-cbam.html':     { page: 'cbam',     shown: ['cbam'],               hidden: ['hero', 'compass', 'briefing'] },
    'v2-briefing.html': { page: 'briefing', shown: ['briefing'],           hidden: ['hero', 'cbam', 'library'] },
    'v2-guides.html':   { page: 'guides',   shown: ['library'],            hidden: ['hero', 'briefing'] },
    'v2-learn.html':    { page: 'learn',    shown: ['guidance', 'faq'],    hidden: ['hero', 'compass', 'about', 'trust', 'china-esg'] },
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
        check(`${file}: nav has Tools, not CBAM`, !!doc.querySelector('.nav-links a[href="index.html#v2hub"]') && !doc.querySelector('.nav-links a[href="v2-cbam.html"]'));
        check(`${file}: US market removed from wizard`, !doc.querySelector('#wizardMarkets input[value="us"]'));
        check(`${file}: CBAM tool card locked`, !doc.querySelector('a.v2-tool-card[href="v2-cbam.html"]') && !!doc.getElementById('v2CbamToolCard'));
        check(`${file}: member library announced as launching soon`, !!doc.querySelector('.v2-tool-member .v2-lock-badge'));
        check(`${file}: hub CTA has no Join-the-Committee mailto`, !doc.querySelector('.v2-cta-band a[href^="mailto"]'));
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
        check('compass page: express sits above the wizard', (() => { const c = doc.querySelector('#compass .container'); return Array.from(c.children).findIndex(el => el.id === 'v2Express') === 1; })());
        check('compass page: urgency groups color-tagged', doc.querySelectorAll('#atlasCards .v2-g-act, #atlasCards .v2-g-prep, #atlasCards .v2-g-watch').length > 0);
        check('compass page: group count chips', doc.querySelectorAll('#atlasCards .v2-g-count').length > 0);
        check('compass page: results disclaimer present', !!doc.querySelector('.v2-wizard-addon .v2-disclaimer'));
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

    // Learn page: voluntary certifications + glossary live here now
    {
        const { doc } = boot('v2-learn.html');
        const hiddenList = doc.getElementById('v2PageStyle').textContent.split('{')[0];
        check('learn page: glossary + voluntary sections visible', !hiddenList.includes('#glossary') && !hiddenList.includes('#voluntary'));
        check('learn page: glossary has 10 terms', doc.querySelectorAll('.v2-glossary-card').length === 10);
    }
    {
        const { doc } = boot('v2-compass.html');
        check('compass page: voluntary certifications moved off results flow', doc.getElementById('v2PageStyle').textContent.split('{')[0].includes('#voluntary'));
    }

    // Functional: hub persona door sets localStorage and navigates
    {
        const { doc, window } = boot('v2.html');
        // jsdom can't follow the navigation ("Not implemented" warning is
        // expected); assert the handler ran by its localStorage side effect.
        doc.querySelector('.v2-persona-card[data-persona="merchandiser"]').click();
        check('hub: persona door click stores persona (navigates in browser)', window.localStorage.getItem('gcc-persona') === 'merchandiser');
        check('hub: mini containers exist', !!doc.getElementById('v2MiniDeadlines') && !!doc.getElementById('v2MiniNews'));
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

    console.log('---');


    console.log(failures ? failures + ' CHECK(S) FAILED' : 'ALL V2 PAGE CHECKS PASSED');
    process.exit(failures ? 1 : 0);
})();
