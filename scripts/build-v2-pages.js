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
    'actions', 'about', 'faq', 'trust'];

const PAGES = {
    hub: { file: 'v2.html', title: '[V2 Preview] GREEN FUTURE — EU Sustainability Compliance | GCC Sustainability Committee', show: ['hero', 'personas', 'v2hub', 'trust'] },
    compass: { file: 'v2-compass.html', title: '[V2 Preview] Regulations — Green Sourcing Compass | GREEN FUTURE', show: ['compass', 'radar'] },
    cbam: { file: 'v2-cbam.html', title: '[V2 Preview] CBAM Cost Calculator | GREEN FUTURE', show: ['cbam'] },
    briefing: { file: 'v2-briefing.html', title: '[V2 Preview] News — The Green Sourcing Briefing | GREEN FUTURE', show: ['briefing'] },
    guides: { file: 'v2-guides.html', title: '[V2 Preview] Member Resource Library | GREEN FUTURE', show: ['library'] },
    learn: { file: 'v2-learn.html', title: '[V2 Preview] Learn — Why Compliance Matters | GREEN FUTURE', show: ['guidance', 'benefits', 'risks-incentives', 'actions', 'faq'] },
    about: { file: 'v2-about.html', title: '[V2 Preview] About the GCC Sustainability Committee | GREEN FUTURE', show: ['about', 'trust'] }
};

function pageStyle(key, show) {
    const hidden = SECTIONS.filter(s => !show.includes(s)).map(s => `#${s}`).join(', ');
    const navHref = key === 'hub' ? 'v2.html' : `v2-${key}.html`;
    let css = `${hidden} { display: none !important; }\n`;
    css += `    .nav-links a[href="${navHref}"] { color: var(--primary); font-weight: 700; }\n`;
    if (key !== 'hub') {
        // no hero on subpages — clear the fixed nav; the news-band strip is
        // only reserved while the ticker is actually visible (v2.js toggles
        // the class), otherwise an empty band shows under the header
        css += '    body { padding-top: var(--nav-height); }\n';
        css += '    body.v2-has-ticker { padding-top: calc(var(--nav-height) + 42px); }\n';
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
    console.log(`${page.file} written (${page.show.join(', ')})`);
}
