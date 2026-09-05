// Generates the V2 subpages from the master file (v2.html).
//
// Every page carries the same DOM (so the shared script.js always finds the
// elements it expects) and differs only in <title>, body[data-v2page] and the
// per-page <style id="v2PageStyle"> that decides which sections are visible.
// Re-runnable: edit v2.html, then `node scripts/build-v2-pages.js`.
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const SECTIONS = ['hero', 'personas', 'v2hub', 'start', 'compass', 'radar', 'briefing',
    'library', 'cbam', 'guidance', 'benefits', 'risks-incentives', 'china-esg',
    'actions', 'voluntary', 'about', 'faq', 'glossary', 'trust'];

// V2 replaced V1 as the live site (committee decision, Sep 2026): the hub is
// written to index.html; v2.html is kept as an alias so shared /v2 links and
// the v2-branch preview URL keep working.
const PAGES = {
    hub: { file: 'index.html', alias: 'v2.html', title: 'Green Sourcing Hub — EU Sustainability Compliance | GCC ESG Committee', show: ['hero', 'personas', 'v2hub', 'trust'] },
    compass: { file: 'v2-compass.html', title: 'Regulations — Green Sourcing Compass | Green Sourcing Hub', show: ['compass', 'radar'] },
    cbam: { file: 'v2-cbam.html', title: 'CBAM Cost Calculator | Green Sourcing Hub', show: ['cbam'] },
    briefing: { file: 'v2-briefing.html', title: 'News — The Green Sourcing Briefing | Green Sourcing Hub', show: ['briefing'] },
    guides: { file: 'v2-guides.html', title: 'Member Resource Library | Green Sourcing Hub', show: ['library'] },
    learn: { file: 'v2-learn.html', title: 'Learn — Why Compliance Matters | Green Sourcing Hub', show: ['guidance', 'benefits', 'risks-incentives', 'actions', 'voluntary', 'faq', 'glossary'] },
    about: { file: 'v2-about.html', title: 'About the GCC ESG Committee | Green Sourcing Hub', show: ['about', 'trust'] }
};

function pageStyle(key, show) {
    const hidden = SECTIONS.filter(s => !show.includes(s)).map(s => `#${s}`).join(', ');
    const navHref = key === 'hub' ? 'index.html' : `v2-${key}.html`;
    let css = `${hidden} { display: none !important; }\n`;
    css += `    .nav-links a[href="${navHref}"] { color: var(--primary); font-weight: 700; }\n`;
    if (key !== 'hub') {
        // no hero on subpages — clear the fixed nav; the news band lives on
        // the homepage only
        css += '    body { padding-top: calc(var(--nav-height) + var(--topline-h, 0px)); }\n';
        css += '    #newsTicker { display: none !important; }\n';
    }
    return css;
}

const master = fs.readFileSync(path.join(ROOT, 'v2.html'), 'utf8');
for (const [key, page] of Object.entries(PAGES)) {
    let out = master;
    out = out.replace(/<title>.*?<\/title>/, `<title>${page.title}</title>`);
    out = out.replace(/<body data-v2page="[^"]*">/, `<body data-v2page="${key}">`);
    out = out.replace(/<style id="v2PageStyle">.*?<\/style>/s,
        `<style id="v2PageStyle">\n    ${pageStyle(key, page.show)}    </style>`);
    fs.writeFileSync(path.join(ROOT, page.file), out);
    if (page.alias) fs.writeFileSync(path.join(ROOT, page.alias), out);
    console.log(`${page.file}${page.alias ? ' (+' + page.alias + ')' : ''} written (${page.show.join(', ')})`);
}
