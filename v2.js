// V2 prototype layer: persona quick-start, post-result action panel and
// CSV "Regulatory Sheet" export. Loaded only by v2.html, after script.js —
// reuses its globals (regulations, applyLang) and the wizard DOM.

(function () {
    'use strict';

    // ===== Persona quick-start =====
    // Supplier → wizard preset "Asian supplier exporting to EU".
    // Merchandiser → preset "Brand/Retailer" + EU/Germany markets (the
    // sourcing-office default: checking on behalf of a European retailer).
    const PERSONA_PRESETS = {
        supplier:     { role: 'supplier', markets: ['eu', 'germany'] },
        merchandiser: { role: 'brand',    markets: ['eu', 'germany'] }
    };

    function applyPersona(name, scroll) {
        const preset = PERSONA_PRESETS[name];
        if (!preset) return;
        localStorage.setItem('gcc-persona', name);
        document.querySelectorAll('.v2-persona-card').forEach(c =>
            c.classList.toggle('active', c.dataset.persona === name));
        const roleSel = document.getElementById('filterRole');
        if (roleSel && !roleSel.value) roleSel.value = preset.role;
        document.querySelectorAll('input[name="market"]').forEach(cb => {
            if (preset.markets.includes(cb.value)) cb.checked = true;
        });
        if (scroll) document.getElementById('compass')?.scrollIntoView({ behavior: 'smooth' });
    }

    document.querySelectorAll('.v2-persona-card').forEach(card => {
        card.addEventListener('click', () => applyPersona(card.dataset.persona, true));
    });
    const saved = localStorage.getItem('gcc-persona');
    if (saved) applyPersona(saved, false);

    // ===== Wizard result add-ons: export bar + "what to do next" =====
    function currentSelection() {
        return {
            category: document.getElementById('filterCategory').value,
            markets: Array.from(document.querySelectorAll('input[name="market"]:checked')).map(cb => cb.value),
            role: document.getElementById('filterRole').value,
            size: document.getElementById('filterSize').value
        };
    }

    function matchedRegs(sel) {
        return regulations.filter(reg => reg.applies(sel.category, sel.markets, sel.role, sel.size));
    }

    const NEXT_STEPS_HTML = `
        <div class="v2-next">
            <h4><span class="lang-en">What to do next</span><span class="lang-zh">下一步该做什么</span><span class="lang-de">Die n&auml;chsten Schritte</span><span class="lang-vi">Các bước tiếp theo</span></h4>
            <ol>
                <li><span class="lang-en">Export this overview as a CSV and attach it to your next email to your buyer or supplier — everyone works from the same list.</span><span class="lang-zh">将此概览导出为CSV文件，附在给买家或供应商的下一封邮件中——让各方基于同一份清单工作。</span><span class="lang-de">Exportieren Sie diese &Uuml;bersicht als CSV und h&auml;ngen Sie sie an Ihre n&auml;chste E-Mail an K&auml;ufer oder Lieferanten an.</span><span class="lang-vi">Xuất tổng quan này ra CSV và đính kèm email tiếp theo gửi người mua hoặc nhà cung cấp.</span></li>
                <li><span class="lang-en">Work through each card's key requirements: collect the documents and data named there (technical files, emissions data, geolocation, declarations).</span><span class="lang-zh">逐一落实各卡片中的关键要求：收集所列文件和数据（技术文件、排放数据、地理定位、声明）。</span><span class="lang-de">Arbeiten Sie die Kernanforderungen jeder Karte ab: Sammeln Sie die genannten Dokumente und Daten.</span><span class="lang-vi">Thực hiện các yêu cầu chính trong từng thẻ: thu thập tài liệu và dữ liệu được nêu.</span></li>
                <li><span class="lang-en">Check the Deadline Radar below for the dates that bind you — earliest first.</span><span class="lang-zh">查看下方的法规期限雷达，了解对您有约束力的日期——最早的优先。</span><span class="lang-de">Pr&uuml;fen Sie den Fristen-Radar unten &mdash; fr&uuml;heste Termine zuerst.</span><span class="lang-vi">Kiểm tra Radar Thời hạn bên dưới — thời hạn sớm nhất trước.</span></li>
                <li><span class="lang-en">Use the step-by-step guides in the Briefing and Resource Library — or contact the Committee for accredited providers in Asia.</span><span class="lang-zh">参考简报和资源库中的分步指南——或联系委员会获取亚洲地区认可服务机构的信息。</span><span class="lang-de">Nutzen Sie die Leitf&auml;den in Briefing und Bibliothek &mdash; oder kontaktieren Sie das Komitee.</span><span class="lang-vi">Dùng hướng dẫn từng bước trong Bản tin và Thư viện — hoặc liên hệ Ủy ban.</span></li>
            </ol>
        </div>`;

    function injectAddons() {
        const cards = document.getElementById('atlasCards');
        if (!cards || !cards.innerHTML.trim()) return;
        document.querySelectorAll('.v2-export-bar, .v2-next').forEach(el => el.remove());

        const bar = document.createElement('div');
        bar.className = 'v2-export-bar';
        bar.innerHTML = `
            <button type="button" class="btn-csv" id="v2CsvBtn">
                <span class="lang-en">&#8595; Export as CSV (Regulatory Sheet)</span><span class="lang-zh">&#8595; 导出CSV（法规概览表）</span><span class="lang-de">&#8595; Als CSV exportieren</span><span class="lang-vi">&#8595; Xuất CSV</span>
            </button>
            <span class="v2-export-note"><span class="lang-en">One row per regulation — deadlines, reasons, official sources. Opens in Excel; attach it to your buyer or supplier email. Generated in your browser, no data is sent anywhere.</span><span class="lang-zh">每条法规一行——含期限、适用原因和官方来源。可在Excel中打开，附在给买家或供应商的邮件中。文件在您的浏览器中生成，不会向任何服务器发送数据。</span><span class="lang-de">Eine Zeile pro Vorschrift &mdash; Fristen, Gr&uuml;nde, offizielle Quellen. Wird lokal im Browser erzeugt.</span><span class="lang-vi">Mỗi quy định một dòng — thời hạn, lý do, nguồn chính thức. Tạo ngay trong trình duyệt của bạn.</span></span>`;
        cards.insertAdjacentElement('beforebegin', bar);
        cards.insertAdjacentHTML('afterend', NEXT_STEPS_HTML);
        applyLang(bar);
        document.getElementById('v2CsvBtn').addEventListener('click', exportCsv);
    }

    // Runs after script.js's own click handler (registered earlier) has
    // rendered the result cards.
    document.getElementById('atlasSubmit')?.addEventListener('click', () => setTimeout(injectAddons, 0));

    // ===== CSV "Regulatory Sheet" export =====
    function csvCell(v) {
        const s = String(v == null ? '' : v).replace(/\s+/g, ' ').trim();
        return '"' + s.replace(/"/g, '""') + '"';
    }

    function exportCsv() {
        const sel = currentSelection();
        const regs = matchedRegs(sel);
        if (!regs.length) return;

        const labels = {
            category: document.querySelector(`#filterCategory option[value="${sel.category}"]`)?.dataset.en || sel.category,
            role: document.querySelector(`#filterRole option[value="${sel.role}"]`)?.dataset.en || sel.role,
            size: document.querySelector(`#filterSize option[value="${sel.size}"]`)?.dataset.en || sel.size || '-'
        };
        const today = new Date().toISOString().slice(0, 10);

        const head = [
            ['Green Sourcing Compass - Regulatory Sheet'],
            ['GCC Sustainability Committee, German Chamber of Commerce Hong Kong'],
            ['Product category', labels.category],
            ['Role', labels.role],
            ['Target markets', sel.markets.join(', ').toUpperCase() || '-'],
            ['Company size', labels.size],
            ['Generated', today],
            ['Note', 'Indicative screening result, not legal advice. Regulation texts: see official source links. Live version: check the Green Sourcing Compass for updates.'],
            []
        ];

        const cols = ['Regulation', 'Legal reference', 'Status', 'In force / applies', 'Key deadline', 'Why it applies', '适用原因 (Chinese)', 'Key requirements', 'Official source', 'Last reviewed'];
        const rows = regs.map(reg => [
            reg.name,
            reg.ref || '',
            reg.statusLabel || reg.status || '',
            reg.inForce || '',
            reg.complianceDeadline || '',
            reg.reason(sel.category, sel.markets, sel.role, sel.size),
            reg.reasonZh ? reg.reasonZh(sel.category, sel.markets, sel.role, sel.size) : '',
            (reg.sections || []).map(s => s.title + ': ' + s.text).join(' | '),
            reg.eurlex || '',
            reg.lastReviewed || ''
        ]);

        const csv = '\uFEFF' + head.concat([cols], rows)
            .map(r => r.map(csvCell).join(',')).join('\r\n');

        const a = document.createElement('a');
        a.href = URL.createObjectURL(new Blob([csv], { type: 'text/csv;charset=utf-8' }));
        a.download = `regulatory-sheet-${sel.category || 'product'}-${today}.csv`;
        document.body.appendChild(a);
        a.click();
        setTimeout(() => { URL.revokeObjectURL(a.href); a.remove(); }, 0);
    }
})();
