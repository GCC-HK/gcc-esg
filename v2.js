// V2 prototype layer: persona quick-start with role-specific finder modes,
// point-of-use disclaimers, post-result action panels and CSV "Regulatory
// Sheet" export. Loaded only by v2.html, after script.js — reuses its
// globals (regulations, applyLang) and the wizard DOM.

(function () {
    'use strict';

    // ===== Shared helpers =====
    function currentSelection() {
        return {
            category: document.getElementById('filterCategory').value,
            markets: Array.from(document.querySelectorAll('#compass input[name="market"]:checked')).map(cb => cb.value),
            role: document.getElementById('filterRole').value,
            size: document.getElementById('filterSize').value
        };
    }

    function matchedRegs(sel) {
        return regulations.filter(reg => reg.applies(sel.category, sel.markets, sel.role, sel.size));
    }

    const DISCLAIMER_HTML = `
        <div class="v2-disclaimer">
            <span aria-hidden="true">&#9888;</span>
            <div>
                <span class="lang-en"><strong>Indicative screening, not legal advice.</strong> This overview is generated from your inputs and simplified matching rules. Before business decisions, verify each regulation against the official text linked in its card, or consult a qualified advisor. The Chamber accepts no liability for decisions based on this tool.</span><span class="lang-zh"><strong>指示性筛查，不构成法律意见。</strong>本概览基于您的输入和简化的匹配规则生成。在做出商业决策前，请对照各卡片中链接的官方文本核实每条法规，或咨询专业顾问。商会对基于本工具的决策不承担任何责任。</span><span class="lang-de"><strong>Indikative Ersteinsch&auml;tzung, keine Rechtsberatung.</strong> Diese &Uuml;bersicht basiert auf Ihren Angaben und vereinfachten Zuordnungsregeln. Pr&uuml;fen Sie vor Gesch&auml;ftsentscheidungen jede Vorschrift anhand des verlinkten Amtstextes oder ziehen Sie qualifizierte Berater hinzu. Die Kammer &uuml;bernimmt keine Haftung.</span><span class="lang-vi"><strong>S&agrave;ng lọc mang t&iacute;nh tham khảo, kh&ocirc;ng phải tư vấn ph&aacute;p l&yacute;.</strong> Tổng quan n&agrave;y được tạo từ th&ocirc;ng tin bạn nhập v&agrave; c&aacute;c quy tắc đối chiếu đơn giản h&oacute;a. Trước khi ra quyết định kinh doanh, h&atilde;y kiểm tra từng quy định theo văn bản ch&iacute;nh thức được li&ecirc;n kết hoặc tham vấn chuy&ecirc;n gia. Ph&ograve;ng Thương mại kh&ocirc;ng chịu tr&aacute;ch nhiệm ph&aacute;p l&yacute;.</span>
            </div>
        </div>`;

    // ===== Persona quick-start =====
    // Supplier: Guided Check wizard. Merchandiser: Quick Check table
    // (fast product overview + export), role fixed to Brand/Retailer.
    const PERSONA_PRESETS = {
        supplier:     { role: 'supplier', markets: ['eu', 'germany'] },
        merchandiser: { role: 'brand',    markets: ['eu', 'germany'] }
    };

    function applyPersona(name, scroll) {
        const preset = PERSONA_PRESETS[name];
        if (!preset) return;
        if (PAGE === 'compass' && !memberView) return; // checks are member content
        localStorage.setItem('gcc-persona', name);
        document.querySelectorAll('.v2-persona-card').forEach(c =>
            c.classList.toggle('active', c.dataset.persona === name));
        const roleSel = document.getElementById('filterRole');
        if (roleSel && !roleSel.value) roleSel.value = preset.role;
        document.querySelectorAll('#compass input[name="market"]').forEach(cb => {
            if (preset.markets.includes(cb.value)) cb.checked = true;
        });
        const express = document.getElementById('v2Express');
        if (express) express.style.display = name === 'merchandiser' ? '' : 'none';
        // committee feedback: two finder variants on one page confused
        // visitors, so each perspective now sees exactly one of them
        const wizard = document.querySelector('.compass-wizard');
        if (wizard) wizard.style.display = name === 'merchandiser' ? 'none' : '';
        const toExpress = document.getElementById('v2ToExpress');
        if (toExpress) toExpress.style.display = name === 'merchandiser' ? 'none' : '';
        if (scroll) {
            const target = (name === 'merchandiser' && express) ? express : document.getElementById('compass');
            target?.scrollIntoView({ behavior: 'smooth' });
        }
    }

    const PAGE = document.body.dataset.v2page || 'hub';

    document.querySelectorAll('.v2-persona-card').forEach(card => {
        card.addEventListener('click', () => {
            if (!card.dataset.persona) return; // hub member/join cards carry no persona
            if (PAGE === 'hub') {
                // Hub: the persona doors lead into the finder page
                localStorage.setItem('gcc-persona', card.dataset.persona);
                window.location.href = 'v2-compass.html?persona=' + card.dataset.persona;
                return;
            }
            applyPersona(card.dataset.persona, true);
        });
    });

    // ===== Express check (merchandiser finder variant) =====
    // Built dynamically: category/size options are cloned from the wizard's
    // hidden selects so the two finder variants can never drift apart.
    function buildExpress() {
        const anchor = document.querySelector('#compass .container');
        if (!anchor) return;

        const catOptions = Array.from(document.querySelectorAll('#filterCategory option'))
            .map(o => `<option value="${o.value}">${o.textContent}</option>`).join('');
        const sizeOptions = Array.from(document.querySelectorAll('#filterSize option'))
            .map(o => `<option value="${o.value}">${o.textContent}</option>`).join('');
        // committee request: compare several product categories side by side —
        // the category control is a multi-select chip row, not a dropdown
        const catChips = Array.from(document.querySelectorAll('#filterCategory option'))
            .filter(o => o.value)
            .map(o => `<button type="button" class="v2-ex-cat" data-value="${o.value}">${o.textContent}</button>`).join('');

        const el = document.createElement('div');
        el.className = 'v2-express';
        el.id = 'v2Express';
        el.style.display = 'none';
        el.innerHTML = `
            <div class="v2-express-head">
                <h3><span class="lang-en">Quick Check: product overview table</span><span class="lang-zh">快速查询：产品要求概览表</span><span class="lang-de">Schnell-Check: Produkt&uuml;bersicht</span><span class="lang-vi">Tra cứu nhanh: bảng tổng quan sản phẩm</span></h3>
                <a href="#compass" id="v2ToWizard"><span class="lang-en">Supplier? Switch to the guided check &rarr;</span><span class="lang-zh">供应商？切换到引导式检查 &rarr;</span><span class="lang-de">Lieferant? Zum gef&uuml;hrten Check wechseln &rarr;</span><span class="lang-vi">Nh&agrave; cung cấp? Chuyển sang kiểm tra c&oacute; hướng dẫn &rarr;</span></a>
            </div>
            <p class="v2-ex-hint"><span class="lang-en">Pick one category for the overview table, or several to compare them side by side.</span><span class="lang-zh">选择一个类别查看概览表，或选择多个类别进行并排比较。</span><span class="lang-de">W&auml;hlen Sie eine Kategorie f&uuml;r die &Uuml;bersicht, oder mehrere f&uuml;r den direkten Vergleich.</span><span class="lang-vi">Chọn một danh mục để xem bảng tổng quan, hoặc nhiều danh mục để so s&aacute;nh song song.</span></p>
            <div class="v2-ex-cats" id="v2ExCats">${catChips}</div>
            <select id="v2ExCat" aria-hidden="true" tabindex="-1" style="display:none">${catOptions}</select>
            <div class="v2-express-row">
                <select id="v2ExSize" aria-label="Supplier size">${sizeOptions}</select>
                <span class="v2-express-markets">
                    <label><input type="checkbox" name="v2exmarket" value="eu" checked> EU</label>
                    <label><input type="checkbox" name="v2exmarket" value="germany" checked> <span class="lang-en">Germany</span><span class="lang-zh">德国</span><span class="lang-de">Deutschland</span><span class="lang-vi">Đức</span></label>
                    <label><input type="checkbox" name="v2exmarket" value="uk"> UK</label>
                </span>
                <button type="button" class="btn-express" id="v2ExRun"><span class="lang-en">Show overview</span><span class="lang-zh">显示概览</span><span class="lang-de">&Uuml;bersicht anzeigen</span><span class="lang-vi">Xem tổng quan</span></button>
            </div>
            <div id="v2ExResult"></div>`;
        // Directly after the section header, above the guided wizard — a
        // merchandiser arriving from the hub lands on their tool without
        // any scrolling.
        anchor.insertBefore(el, anchor.children[1] || null);
        applyLang(el);
        el.querySelectorAll('.v2-ex-cat').forEach(chip => chip.addEventListener('click', () => {
            chip.classList.toggle('on');
            // keep the hidden single-select in sync (CSV export + wizard reuse)
            const first = el.querySelector('.v2-ex-cat.on');
            document.getElementById('v2ExCat').value = first ? first.dataset.value : '';
        }));
        document.getElementById('v2ExRun').addEventListener('click', runExpress);
        // mode switch: express (sourcing office) <-> guided wizard (supplier)
        el.querySelector('#v2ToWizard').addEventListener('click', (ev) => {
            ev.preventDefault();
            applyPersona('supplier', false);
            document.querySelector('.compass-wizard')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
        const sw = document.createElement('p');
        sw.className = 'v2-mode-switch';
        sw.id = 'v2ToExpress';
        sw.innerHTML = '<a href="#compass"><span class="lang-en">Sourcing office? Switch to the Quick Check table &rarr;</span><span class="lang-zh">采购办公室？切换到快速查询表 &rarr;</span><span class="lang-de">Einkaufsb&uuml;ro? Zum Schnell-Check wechseln &rarr;</span><span class="lang-vi">Văn ph&ograve;ng thu mua? Chuyển sang Tra cứu nhanh &rarr;</span></a>';
        el.insertAdjacentElement('afterend', sw);
        applyLang(sw);
        sw.querySelector('a').addEventListener('click', (ev) => {
            ev.preventDefault();
            applyPersona('merchandiser', false);
            document.getElementById('v2Express')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
    }

    function statusBadgeColor(status) {
        return { inforce: '#1a5c38', phasing: '#DE8703', prepare: '#003366' }[status] || '#555';
    }

    function runExpress() {
        const cats = Array.from(document.querySelectorAll('#v2ExCats .v2-ex-cat.on')).map(b => b.dataset.value);
        const sel = {
            category: cats[0] || document.getElementById('v2ExCat').value,
            size: document.getElementById('v2ExSize').value,
            markets: Array.from(document.querySelectorAll('input[name="v2exmarket"]:checked')).map(cb => cb.value),
            role: 'brand'
        };
        const out = document.getElementById('v2ExResult');
        if (!sel.category) {
            out.innerHTML = '<p style="color:#C34343; margin:12px 0 0;"><span class="lang-en">Please select a product category.</span><span class="lang-zh">请选择产品类别。</span><span class="lang-de">Bitte Produktkategorie w&auml;hlen.</span><span class="lang-vi">Vui l&ograve;ng chọn danh mục sản phẩm.</span></p>';
            applyLang(out);
            return;
        }
        if (cats.length > 1) { runComparison(cats, sel); return; }

        // Sync the main wizard inputs so the CSV export shares this selection
        document.getElementById('filterCategory').value = sel.category;
        document.getElementById('filterSize').value = sel.size;
        document.getElementById('filterRole').value = sel.role;
        document.querySelectorAll('#compass input[name="market"]').forEach(cb => { cb.checked = sel.markets.includes(cb.value); });

        const regs = matchedRegs(sel);
        if (!regs.length) {
            out.innerHTML = '<p style="margin:12px 0 0;"><span class="lang-en">No regulations matched, try selecting EU or Germany as a market.</span><span class="lang-zh">没有匹配的法规，请尝试选择欧盟或德国作为市场。</span><span class="lang-de">Keine Treffer, w&auml;hlen Sie EU oder Deutschland als Markt.</span><span class="lang-vi">Kh&ocirc;ng c&oacute; quy định n&agrave;o khớp, h&atilde;y chọn EU hoặc Đức.</span></p>';
            applyLang(out);
            return;
        }

        const rows = regs.map(reg => {
            const reasonEn = reg.reason(sel.category, sel.markets, sel.role, sel.size);
            const reasonZh = reg.reasonZh ? reg.reasonZh(sel.category, sel.markets, sel.role, sel.size) : '';
            return `<tr>
                <td>${reg.name}<br><small style="font-weight:400;color:#667">${reg.ref || ''}</small></td>
                <td class="v2-t-status" style="color:${statusBadgeColor(reg.status)}">${reg.statusLabel || reg.status || ''}</td>
                <td>${reg.complianceDeadline || '-'}</td>
                <td><span class="lang-en">${reasonEn}</span><span class="lang-zh">${reasonZh || reasonEn}</span></td>
                <td><a href="v2-regulation.html?id=${reg.id}" target="_blank"><span class="lang-en">Details</span><span class="lang-zh">详情</span><span class="lang-de">Details</span><span class="lang-vi">Chi tiết</span></a>${reg.eurlex ? ` &middot; <a href="${reg.eurlex}" target="_blank" rel="noopener"><span class="lang-en">Official text</span><span class="lang-zh">官方文本</span><span class="lang-de">Amtstext</span><span class="lang-vi">Văn bản</span></a>` : ''}</td>
            </tr>`;
        }).join('');

        out.innerHTML = DISCLAIMER_HTML + `
            <div class="v2-export-bar">
                <button type="button" class="btn-csv" id="v2ExCsvBtn"><span class="lang-en">&darr; Export as CSV (Regulatory Sheet)</span><span class="lang-zh">&darr; 导出CSV（法规概览表）</span><span class="lang-de">&darr; Als CSV exportieren</span><span class="lang-vi">&darr; Xuất CSV</span></button>
                <span class="v2-export-note"><span class="lang-en">${regs.length} regulations &middot; attach to your buyer or supplier email &middot; generated in your browser, no data is sent anywhere.</span><span class="lang-zh">${regs.length}条法规 &middot; 可附在给买家或供应商的邮件中 &middot; 在您的浏览器中生成，不会向任何服务器发送数据。</span><span class="lang-de">${regs.length} Vorschriften &middot; lokal im Browser erzeugt.</span><span class="lang-vi">${regs.length} quy định &middot; tạo trong tr&igrave;nh duyệt.</span></span>
            </div>
            <div class="v2-table-wrap"><table class="v2-table">
                <thead><tr>
                    <th><span class="lang-en">Regulation</span><span class="lang-zh">法规</span><span class="lang-de">Vorschrift</span><span class="lang-vi">Quy định</span></th>
                    <th><span class="lang-en">Status</span><span class="lang-zh">状态</span><span class="lang-de">Status</span><span class="lang-vi">Trạng th&aacute;i</span></th>
                    <th><span class="lang-en">Key deadline</span><span class="lang-zh">关键期限</span><span class="lang-de">Frist</span><span class="lang-vi">Thời hạn</span></th>
                    <th><span class="lang-en">Why it applies</span><span class="lang-zh">适用原因</span><span class="lang-de">Warum relevant</span><span class="lang-vi">L&yacute; do &aacute;p dụng</span></th>
                    <th><span class="lang-en">Links</span><span class="lang-zh">链接</span><span class="lang-de">Links</span><span class="lang-vi">Li&ecirc;n kết</span></th>
                </tr></thead>
                <tbody>${rows}</tbody>
            </table></div>` + NEXT_STEPS.merchandiser;
        applyLang(out);
        document.getElementById('v2ExCsvBtn').addEventListener('click', exportCsv);
    }

    // ===== Category comparison matrix (committee request #28) =====
    // Several selected categories → one table: rows are the union of
    // matched requirements, one check-mark column per category.
    function catLabel(value) {
        return document.querySelector(`#filterCategory option[value="${value}"]`)?.dataset.en || value;
    }

    let lastComparison = null;

    function runComparison(cats, sel, outEl) {
        const out = outEl || document.getElementById('v2ExResult');
        const perCat = cats.map(c => ({
            cat: c,
            regs: matchedRegs({ ...sel, category: c })
        }));
        const union = [];
        const seen = new Set();
        perCat.forEach(pc => pc.regs.forEach(reg => { if (!seen.has(reg.id)) { seen.add(reg.id); union.push(reg); } }));
        if (!union.length) {
            out.innerHTML = '<p style="margin:12px 0 0;"><span class="lang-en">No requirements matched, try selecting EU or Germany as a market.</span><span class="lang-zh">没有匹配的要求，请尝试选择欧盟或德国作为市场。</span><span class="lang-de">Keine Treffer, w&auml;hlen Sie EU oder Deutschland als Markt.</span><span class="lang-vi">Kh&ocirc;ng c&oacute; y&ecirc;u cầu n&agrave;o khớp, h&atilde;y chọn EU hoặc Đức.</span></p>';
            applyLang(out);
            return;
        }
        const idSets = perCat.map(pc => new Set(pc.regs.map(r => r.id)));
        lastComparison = { cats, union, idSets, sel };

        const headCols = cats.map(c => `<th class="v2-cmp-cat">${catLabel(c)}</th>`).join('');
        const rows = union.map(reg => {
            const marks = idSets.map(s => `<td class="v2-cmp-mark">${s.has(reg.id) ? '<span class="v2-cmp-yes">&#10004;</span>' : '<span class="v2-cmp-no">&middot;</span>'}</td>`).join('');
            return `<tr>
                <td>${reg.name}<br><small style="font-weight:400;color:#667">${reg.ref || ''}</small></td>
                <td>${reg.complianceDeadline || '-'}</td>
                ${marks}
                <td><a href="v2-regulation.html?id=${reg.id}" target="_blank"><span class="lang-en">Details</span><span class="lang-zh">详情</span><span class="lang-de">Details</span><span class="lang-vi">Chi tiết</span></a></td>
            </tr>`;
        }).join('');

        out.innerHTML = DISCLAIMER_HTML + `
            <div class="v2-export-bar">
                <button type="button" class="btn-csv" id="v2CmpCsvBtn"><span class="lang-en">&darr; Export comparison as CSV</span><span class="lang-zh">&darr; 导出比较表CSV</span><span class="lang-de">&darr; Vergleich als CSV exportieren</span><span class="lang-vi">&darr; Xuất CSV so s&aacute;nh</span></button>
                <span class="v2-export-note"><span class="lang-en">${union.length} requirements across ${cats.length} categories &middot; generated in your browser, no data is sent anywhere.</span><span class="lang-zh">${cats.length}个类别共${union.length}项要求 &middot; 在您的浏览器中生成，不会向任何服务器发送数据。</span><span class="lang-de">${union.length} Anforderungen in ${cats.length} Kategorien &middot; lokal im Browser erzeugt.</span><span class="lang-vi">${union.length} y&ecirc;u cầu cho ${cats.length} danh mục &middot; tạo trong tr&igrave;nh duyệt.</span></span>
            </div>
            <div class="v2-table-wrap"><table class="v2-table v2-cmp-table">
                <thead><tr>
                    <th><span class="lang-en">Requirement</span><span class="lang-zh">要求</span><span class="lang-de">Anforderung</span><span class="lang-vi">Y&ecirc;u cầu</span></th>
                    <th><span class="lang-en">Key deadline</span><span class="lang-zh">关键期限</span><span class="lang-de">Frist</span><span class="lang-vi">Thời hạn</span></th>
                    ${headCols}
                    <th><span class="lang-en">Links</span><span class="lang-zh">链接</span><span class="lang-de">Links</span><span class="lang-vi">Li&ecirc;n kết</span></th>
                </tr></thead>
                <tbody>${rows}</tbody>
            </table></div>`;
        applyLang(out);
        document.getElementById('v2CmpCsvBtn').addEventListener('click', exportComparisonCsv);
    }

    function exportComparisonCsv() {
        if (!lastComparison) return;
        const { cats, union, idSets, sel } = lastComparison;
        const today = new Date().toISOString().slice(0, 10);
        const head = [
            ['ESG Sourcing Compass - Category Comparison'],
            ['GCC ESG Committee, German Chamber of Commerce Hong Kong'],
            ['Categories', cats.map(catLabel).join(' | ')],
            ['Target markets', sel.markets.join(', ').toUpperCase() || '-'],
            ['Generated', today],
            ['Disclaimer', 'Indicative screening result, not legal advice. Verify each requirement against the official source link before business decisions. The Chamber accepts no liability for decisions based on this overview.'],
            []
        ];
        const cols = ['Requirement', 'Legal reference', 'Key deadline', ...cats.map(catLabel), 'Official source'];
        const rows = union.map(reg => [
            reg.name, reg.ref || '', reg.complianceDeadline || '',
            ...idSets.map(s => s.has(reg.id) ? 'YES' : '-'),
            reg.eurlex || ''
        ]);
        const csv = '\uFEFF' + head.concat([cols], rows).map(r => r.map(csvCell).join(',')).join('\r\n');
        const a = document.createElement('a');
        a.href = URL.createObjectURL(new Blob([csv], { type: 'text/csv;charset=utf-8' }));
        a.download = `requirements-comparison-${today}.csv`;
        document.body.appendChild(a);
        a.click();
        setTimeout(() => { URL.revokeObjectURL(a.href); a.remove(); }, 0);
    }

    // ===== Persona-specific "what to do next" =====
    const NEXT_STEPS = {
        supplier: `
        <div class="v2-next">
            <h4><span class="lang-en">What to do next (supplier)</span><span class="lang-zh">下一步该做什么（供应商）</span><span class="lang-de">Die n&auml;chsten Schritte (Lieferant)</span><span class="lang-vi">C&aacute;c bước tiếp theo (nh&agrave; cung cấp)</span></h4>
            <ol>
                <li><span class="lang-en">Read each card's key requirements and start collecting what is named there: technical files, emissions data, geolocation coordinates, declarations.</span><span class="lang-zh">阅读各卡片的关键要求，开始收集其中列明的材料：技术文件、排放数据、地理坐标、各类声明。</span><span class="lang-de">Lesen Sie die Kernanforderungen jeder Karte und sammeln Sie die genannten Unterlagen.</span><span class="lang-vi">Đọc y&ecirc;u cầu ch&iacute;nh của từng thẻ v&agrave; bắt đầu thu thập t&agrave;i liệu được n&ecirc;u.</span></li>
                <li><span class="lang-en">Expect these topics in your buyer's next questionnaire, answer with documents, not promises. Export the CSV so your team works from the same list.</span><span class="lang-zh">买家的下一份问卷很可能涉及这些主题，请用文件而非承诺作答。导出CSV，让团队基于同一份清单工作。</span><span class="lang-de">Diese Themen kommen im n&auml;chsten Fragebogen Ihres Abnehmers, antworten Sie mit Dokumenten. Exportieren Sie die CSV f&uuml;r Ihr Team.</span><span class="lang-vi">C&aacute;c chủ đề n&agrave;y sẽ xuất hiện trong bảng c&acirc;u hỏi của người mua, h&atilde;y trả lời bằng t&agrave;i liệu. Xuất CSV cho nh&oacute;m của bạn.</span></li>
                <li><span class="lang-en">Check the Deadline Radar for the dates that bind you, earliest first.</span><span class="lang-zh">查看法规期限雷达，了解对您有约束力的日期，最早的优先。</span><span class="lang-de">Pr&uuml;fen Sie den Fristen-Radar, fr&uuml;heste Termine zuerst.</span><span class="lang-vi">Kiểm tra Radar Thời hạn, thời hạn sớm nhất trước.</span></li>
                <li><span class="lang-en">Use the step-by-step guides in the Briefing and Resource Library, or contact the Committee for accredited providers in Asia.</span><span class="lang-zh">参考简报和资源库中的分步指南，或联系委员会获取亚洲地区认可服务机构的信息。</span><span class="lang-de">Nutzen Sie die Leitf&auml;den in Briefing und Bibliothek, oder kontaktieren Sie das Komitee.</span><span class="lang-vi">D&ugrave;ng hướng dẫn trong Bản tin v&agrave; Thư viện, hoặc li&ecirc;n hệ Ủy ban.</span></li>
            </ol>
        </div>`,
        merchandiser: `
        <div class="v2-next">
            <h4><span class="lang-en">What to do next (merchandiser)</span><span class="lang-zh">下一步该做什么（采购专员）</span><span class="lang-de">Die n&auml;chsten Schritte (Merchandiser)</span><span class="lang-vi">C&aacute;c bước tiếp theo (merchandiser)</span></h4>
            <ol>
                <li><span class="lang-en">Export the CSV and attach it to your order or supplier email, it names each regulation, deadline and official source.</span><span class="lang-zh">导出CSV并附在订单或供应商邮件中，其中列明每条法规、期限和官方来源。</span><span class="lang-de">Exportieren Sie die CSV und h&auml;ngen Sie sie an Ihre Bestellung oder Lieferanten-E-Mail an.</span><span class="lang-vi">Xuất CSV v&agrave; đ&iacute;nh k&egrave;m email đơn h&agrave;ng hoặc nh&agrave; cung cấp.</span></li>
                <li><span class="lang-en">Ask your supplier for the documents named in "Key requirements", before order placement, not at shipment.</span><span class="lang-zh">在下单前（而非发货时）就向供应商索取"关键要求"中列明的文件。</span><span class="lang-de">Fordern Sie die Dokumente der Kernanforderungen vor der Bestellung an, nicht erst bei Verschiffung.</span><span class="lang-vi">Y&ecirc;u cầu nh&agrave; cung cấp gửi t&agrave;i liệu trong &quot;Y&ecirc;u cầu ch&iacute;nh&quot; trước khi đặt h&agrave;ng.</span></li>
                <li><span class="lang-en">Cross-check the deadlines against your order and shipping calendar, a requirement that applies at arrival matters for orders placed today.</span><span class="lang-zh">将期限与您的订单和船期日历核对，货物到港时适用的规则，对今天下的订单同样重要。</span><span class="lang-de">Gleichen Sie Fristen mit Ihrem Order- und Verschiffungskalender ab.</span><span class="lang-vi">Đối chiếu thời hạn với lịch đặt h&agrave;ng v&agrave; giao h&agrave;ng của bạn.</span></li>
                <li><span class="lang-en">Follow the Briefing for changes to these rules, or ask the Committee to walk your team through a specific regulation.</span><span class="lang-zh">通过简报跟踪法规变化，或请委员会为您的团队讲解某项具体法规。</span><span class="lang-de">Verfolgen Sie &Auml;nderungen im Briefing, oder bitten Sie das Komitee um eine Einf&uuml;hrung.</span><span class="lang-vi">Theo d&otilde;i Bản tin để cập nhật thay đổi, hoặc nhờ Ủy ban hướng dẫn.</span></li>
            </ol>
        </div>`
    };

    // ===== Urgency group banners: color-code and count each result group =====
    const GROUP_CLASSES = { 'ACT NOW': 'v2-g-act', 'PREPARE': 'v2-g-prep', 'WATCH': 'v2-g-watch' };

    function enhanceGroups() {
        document.querySelectorAll('#atlasCards .compass-group').forEach(g => {
            const label = g.querySelector('.compass-group-header h3 .lang-en')?.textContent.trim();
            if (GROUP_CLASSES[label]) g.classList.add(GROUP_CLASSES[label]);
            const h3 = g.querySelector('.compass-group-header h3');
            if (h3 && !h3.querySelector('.v2-g-count')) {
                h3.insertAdjacentHTML('beforeend', `<span class="v2-g-count">${g.querySelectorAll('.reg-result').length}</span>`);
            }
            // V2 terminology (committee decision): "requirements", not "rules"
            // — script.js stays untouched because V1 is the frozen baseline.
            g.querySelectorAll('.compass-group-header p .lang-en').forEach(s => { s.textContent = s.textContent.replace(/\brules\b/g, 'requirements'); });
            g.querySelectorAll('.compass-group-header p .lang-de').forEach(s => { s.textContent = s.textContent.replace(/\bRegeln\b/g, 'Anforderungen'); });
            g.querySelectorAll('.compass-group-header p .lang-zh').forEach(s => { s.textContent = s.textContent.replace(/规则/g, '要求'); });
        });
    }

    // ===== Wizard result add-ons: disclaimer + export bar + next steps =====
    function injectAddons() {
        enhanceGroups();
        const cards = document.getElementById('atlasCards');
        if (!cards || !cards.innerHTML.trim()) return;
        document.querySelectorAll('.v2-wizard-addon, .v2-wizard-next').forEach(el => el.remove());

        const persona = localStorage.getItem('gcc-persona') === 'merchandiser' ? 'merchandiser' : 'supplier';
        const wrap = document.createElement('div');
        wrap.className = 'v2-wizard-addon';
        wrap.innerHTML = DISCLAIMER_HTML + `
            <div class="v2-export-bar">
                <button type="button" class="btn-csv" id="v2CsvBtn"><span class="lang-en">&darr; Export as CSV (Regulatory Sheet)</span><span class="lang-zh">&darr; 导出CSV（法规概览表）</span><span class="lang-de">&darr; Als CSV exportieren</span><span class="lang-vi">&darr; Xuất CSV</span></button>
                <span class="v2-export-note"><span class="lang-en">One row per regulation, deadlines, reasons, official sources. Opens in Excel; attach it to your buyer or supplier email. Generated in your browser, no data is sent anywhere.</span><span class="lang-zh">每条法规一行，含期限、适用原因和官方来源。可在Excel中打开，附在给买家或供应商的邮件中。文件在您的浏览器中生成，不会向任何服务器发送数据。</span><span class="lang-de">Eine Zeile pro Vorschrift, Fristen, Gr&uuml;nde, offizielle Quellen. Wird lokal im Browser erzeugt.</span><span class="lang-vi">Mỗi quy định một d&ograve;ng, thời hạn, l&yacute; do, nguồn ch&iacute;nh thức. Tạo ngay trong tr&igrave;nh duyệt của bạn.</span></span>
            </div>`;
        cards.insertAdjacentElement('beforebegin', wrap);
        const next = document.createElement('div');
        next.className = 'v2-wizard-next';
        next.innerHTML = NEXT_STEPS[persona];
        cards.insertAdjacentElement('afterend', next);
        applyLang(wrap);
        document.getElementById('v2CsvBtn').addEventListener('click', exportCsv);
    }

    document.getElementById('atlasSubmit')?.addEventListener('click', () => setTimeout(() => {
        if (wizardCats.size > 1) {
            const sel = currentSelection();
            document.querySelectorAll('.v2-wizard-addon, .v2-wizard-next').forEach(el => el.remove());
            const empty = document.getElementById('atlasEmpty');
            if (empty) empty.style.display = 'none';
            runComparison(Array.from(wizardCats), sel, document.getElementById('atlasCards'));
        } else {
            injectAddons();
        }
    }, 0));

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
            ['ESG Sourcing Compass - Regulatory Sheet'],
            ['GCC ESG Committee, German Chamber of Commerce Hong Kong'],
            ['Product category', labels.category],
            ['Role', labels.role],
            ['Target markets', sel.markets.join(', ').toUpperCase() || '-'],
            ['Company size', labels.size],
            ['Generated', today],
            ['Disclaimer', 'Indicative screening result, not legal advice. Verify each regulation against the official source link before business decisions. The Chamber accepts no liability for decisions based on this overview.'],
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

    // ===== Wizard multi-select (committee request): several categories can
    // be active at once; the hidden single select keeps script.js validation
    // and the CSV export working via the first selection. Auto-advance was
    // removed, multi-selection needs the explicit Next button.
    const wizardCats = new Set();
    const wizCatSelect = document.getElementById('filterCategory');
    document.querySelectorAll('#wizardCatGrid .wizard-cat').forEach(btn => {
        btn.addEventListener('click', () => setTimeout(() => {
            const v = btn.dataset.value;
            if (wizardCats.has(v)) wizardCats.delete(v); else wizardCats.add(v);
            const first = wizardCats.values().next().value || '';
            if (wizCatSelect) wizCatSelect.value = first;
            document.querySelectorAll('#wizardCatGrid .wizard-cat').forEach(b =>
                b.classList.toggle('active', wizardCats.has(b.dataset.value)));
        }, 0));
    });
    if (wizCatSelect) wizCatSelect.addEventListener('change', () => {
        // HS lookup or express sync set the select directly: mirror it into the set
        if (wizCatSelect.value && !wizardCats.has(wizCatSelect.value)) {
            wizardCats.clear();
            wizardCats.add(wizCatSelect.value);
            document.querySelectorAll('#wizardCatGrid .wizard-cat').forEach(b =>
                b.classList.toggle('active', wizardCats.has(b.dataset.value)));
        }
    });

    // ===== Content fallback for API-less viewing =====
    // The news band, briefing and radar are fed by /api/content, which only
    // exists behind the dev server or Vercel. When v2.html is opened as a
    // plain file, that fetch fails and the sections silently hide. This
    // fallback pulls public content straight from the Sanity CDN instead.
    // Gating is preserved client-side: locked posts are reduced to the same
    // teaser shape the API produces, and body fields are never requested.
    const SANITY_Q = 'https://bvmxf21v.apicdn.sanity.io/v2024-01-01/data/query/production?query=';
    const FALLBACK_NEWS = '*[_type=="newsPost"]|order(publishedAt desc)[0...20]{titleEn,titleZh,"slug":slug.current,publishedAt,pillar,whatHappenedEn,whatHappenedZh,whyItMattersEn,whyItMattersZh,supplierActionEn,supplierActionZh,sources,accessLevel,imageUrl,imageCredit,"hasBody":defined(bodyEn)}';
    const FALLBACK_DEADLINES = '*[_type=="deadline"]|order(date asc){labelEn,labelZh,date,affects,affectsZh,confidence,regId}';

    async function cdnFallback() {
        try {
            const probe = await fetch('/api/content?type=deadlines');
            if (probe.ok) return; // API available, script.js already rendered
        } catch (e) { /* no API, fall through */ }

        const q = async (groq) => {
            const r = await fetch(SANITY_Q + encodeURIComponent(groq));
            if (!r.ok) throw new Error('sanity ' + r.status);
            return (await r.json()).result || [];
        };
        const lockTeaser = (p) => ({
            titleEn: p.titleEn, titleZh: p.titleZh, slug: p.slug, publishedAt: p.publishedAt,
            pillar: p.pillar, accessLevel: p.accessLevel, imageUrl: p.imageUrl,
            imageCredit: p.imageCredit, hasBody: p.hasBody, locked: true,
            teaserEn: (p.whatHappenedEn || '').slice(0, 150) + '…',
            teaserZh: (p.whatHappenedZh || '').slice(0, 80) + '…'
        });
        try {
            const news = await q(FALLBACK_NEWS);
            renderBriefing(news.map(p => (p.accessLevel === 'registered' || p.accessLevel === 'premium') ? lockTeaser(p) : p));
        } catch (e) { /* section stays hidden */ }
        try { renderRadar(await q(FALLBACK_DEADLINES)); } catch (e) { /* section stays hidden */ }
    }

    // ===== Hub live previews: next deadlines + latest briefing =====
    // The hidden radar/briefing sections still render on the hub (script.js
    // populates them from the CMS); we mirror the first items into the hub
    // preview cards once they exist.
    function fillMinis(attempt) {
        if (PAGE !== 'hub') return;
        const pairs = [['radarList', 'v2MiniDeadlines'], ['briefingList', 'v2MiniNews']];
        let missing = false;

        // Compact extraction — the rendered radar/briefing markup is far too
        // heavy for a preview card, so only day-chip + label / title + kicker
        // are lifted out of the hidden sections.
        const dl = document.getElementById('v2MiniDeadlines');
        if (dl && !dl.childElementCount) {
            const cards = document.querySelectorAll('#radarList .radar-days-chip');
            if (!cards.length) missing = true;
            else {
                dl.innerHTML = Array.from(cards).slice(0, 4).map(chip => {
                    const label = chip.parentElement.querySelector('.radar-label');
                    const href = chip.closest('a.radar-item-link')?.getAttribute('href');
                    // committee feedback: a bare "25d" chip reads as cryptic —
                    // show the actual date next to the countdown
                    const dateStr = (chip.parentElement.querySelector('.radar-meta')?.textContent || '').trim().split(/\s{2,}|expected|预期/)[0].trim();
                    const inner = `<span class="v2-mini-chip">${chip.querySelector('strong')?.textContent || ''}<small>d</small></span><span>${label ? label.innerHTML : ''}${dateStr ? `<small class="v2-mini-date">${dateStr}</small>` : ''}</span>`;
                    return href ? `<a class="v2-mini-row" href="${href}">${inner}</a>` : `<div class="v2-mini-row">${inner}</div>`;
                }).join('');
                applyLang(dl);
            }
        }
        const nw = document.getElementById('v2MiniNews');
        if (nw && !nw.childElementCount) {
            const titles = document.querySelectorAll('#briefingList .briefing-title-link');
            if (!titles.length) missing = true;
            else {
                nw.innerHTML = Array.from(titles).slice(0, 4).map(t =>
                    `<div class="v2-mini-row"><a href="${t.getAttribute('href')}">${t.innerHTML}</a></div>`
                ).join('');
                applyLang(nw);
            }
        }

        if (missing && attempt < 8) setTimeout(() => fillMinis(attempt + 1), 700);
        else {
            for (const [, dstId] of pairs) {
                const dst = document.getElementById(dstId);
                if (dst && !dst.childElementCount) dst.innerHTML = '<p class="v2-mini-empty"><span class="lang-en">Live content unavailable in this preview, open the full page.</span><span class="lang-zh">预览中暂无实时内容，请打开完整页面。</span><span class="lang-de">Live-Inhalte in dieser Vorschau nicht verf&uuml;gbar.</span><span class="lang-vi">Nội dung trực tiếp không khả dụng trong bản xem trước.</span></p>';
            }
        }
    }

    // ===== Guides page: member gate =====
    // Committee decision (Sep 2026): the member area is announced from day
    // one but inaccessible until the membership model goes live — so the
    // gate is a "launching soon" notice, not a sign-in ask. Signed-in demo
    // members still pass through (server-side gating stays authoritative).
    function gateGuides() {
        if (PAGE !== 'guides') return;
        const signedIn = (typeof authToken === 'function' && authToken()) || (typeof demoTier === 'function' && demoTier());
        if (signedIn) return;
        const lib = document.getElementById('library');
        if (!lib) return;
        lib.style.display = '';
        const grid = document.getElementById('libraryGrid');
        if (grid) grid.style.display = 'none';
        grid?.insertAdjacentHTML('beforebegin', `
            <div class="v2-gate">
                <h3><span class="lang-en">Member area: launching soon</span><span class="lang-zh">会员专区：即将推出</span><span class="lang-de">Mitgliederbereich: startet bald</span><span class="lang-vi">Khu vực th&agrave;nh vi&ecirc;n: sắp ra mắt</span></h3>
                <p><span class="lang-en">The in-depth guides will be available to member companies once the member area launches. The Committee is preparing this section now.</span><span class="lang-zh">会员专区上线后，深度指南将向会员企业开放。委员会目前正在筹备该板块。</span><span class="lang-de">Die Leitf&auml;den stehen Mitgliedsunternehmen zur Verf&uuml;gung, sobald der Mitgliederbereich startet. Der Ausschuss bereitet diesen Bereich derzeit vor.</span><span class="lang-vi">Cẩm nang chuy&ecirc;n s&acirc;u sẽ d&agrave;nh cho c&ocirc;ng ty th&agrave;nh vi&ecirc;n khi khu vực th&agrave;nh vi&ecirc;n ra mắt. Ủy ban đang chuẩn bị phần n&agrave;y.</span></p>
                <a class="btn-gate" href="mailto:info@hongkong.ahk.de?subject=ESG Sourcing Hub Member area"><span class="lang-en">Get notified / work with the Committee</span><span class="lang-zh">获取通知 / 与委员会合作</span><span class="lang-de">Benachrichtigen lassen / mit dem Ausschuss arbeiten</span><span class="lang-vi">Nhận th&ocirc;ng b&aacute;o / hợp t&aacute;c với Ủy ban</span></a>
                <p class="v2-gate-sub"><span class="lang-en">Interested in the Committee itself? <a href="https://hongkong.ahk.de/en" target="_blank" rel="noopener">Learn more on the Chamber website</a>, or <a href="https://hongkong.ahk.de/membership" target="_blank" rel="noopener">become a Chamber member</a>.</span><span class="lang-zh">想了解委员会？<a href="https://hongkong.ahk.de/en" target="_blank" rel="noopener">请访问商会官网</a>，或<a href="https://hongkong.ahk.de/membership" target="_blank" rel="noopener">成为商会会员</a>。</span><span class="lang-de">Interesse am Ausschuss? <a href="https://hongkong.ahk.de/en" target="_blank" rel="noopener">Mehr auf der Kammer-Website</a>, oder <a href="https://hongkong.ahk.de/membership" target="_blank" rel="noopener">Kammermitglied werden</a>.</span><span class="lang-vi">Quan t&acirc;m đến Ủy ban? <a href="https://hongkong.ahk.de/en" target="_blank" rel="noopener">Xem th&ecirc;m tr&ecirc;n website Ph&ograve;ng Thương mại</a>, hoặc <a href="https://hongkong.ahk.de/membership" target="_blank" rel="noopener">trở th&agrave;nh hội vi&ecirc;n</a>.</span></p>
            </div>`);
        applyLang(lib);
    }

    // ===== News band (homepage only) =====
    // script.js renders the full post list and its click handler breaks on
    // cross-page hrefs (querySelector on a URL throws after preventDefault —
    // the reported "nothing happens"). Rebuild: keep the 3 newest headlines,
    // duplicate once for a seamless -50% loop, rewrite links cross-page and
    // navigate in a capture-phase handler before script.js sees the click.
    const tickerTrack = document.getElementById('tickerTrack');
    let tickerTuning = false;
    function tuneTicker() {
        if (tickerTuning || !tickerTrack) return;
        const items = Array.from(tickerTrack.querySelectorAll('a.ticker-item'));
        if (!items.length) return;
        // already tuned (observer fires async, after the guard flag resets —
        // a content check is the only reliable stop condition)
        if (items.length <= 6 && items.every(a => (a.getAttribute('href') || '').startsWith('v2-briefing.html'))) return;
        const seen = new Set();
        const top = [];
        for (const a of items) {
            let href = a.getAttribute('href') || '';
            if (href.startsWith('#briefing-')) href = 'v2-briefing.html' + href;
            if (seen.has(href)) continue;
            seen.add(href);
            a.setAttribute('href', href);
            top.push(a.outerHTML);
            if (top.length === 3) break;
        }
        const sep = '<span class="ticker-sep">&#9679;</span>';
        const half = top.join(sep) + sep;
        tickerTuning = true;
        tickerTrack.innerHTML = half + half; // two copies → seamless loop
        tickerTuning = false;
    }
    if (tickerTrack) {
        tuneTicker();
        new MutationObserver(tuneTicker).observe(tickerTrack, { childList: true });
        document.getElementById('newsTicker').addEventListener('click', (ev) => {
            const a = ev.target.closest('a.ticker-item');
            if (!a) return;
            ev.preventDefault();
            ev.stopPropagation();
            window.location.href = a.getAttribute('href');
        }, true);
    }

    // ===== V2-only post-render overrides =====
    // The radar and briefing are rendered by shared script.js from the CMS.
    // V1 is the frozen committee baseline, so all V2 copy decisions are
    // applied here after render instead of editing script.js. Retries until
    // the async CMS render lands.
    function v2Overrides(attempt) {
        let pending = false;

        // #radar: supplier lead-time note (committee: "deadlines bind the
        // importer — suppliers must act earlier") + horizon column rewording
        const radarList = document.getElementById('radarList');
        if (radarList && radarList.childElementCount) {
            if (!document.querySelector('.v2-radar-note')) {
                document.querySelector('#radar .section-head')?.insertAdjacentHTML('afterend', `
                    <div class="v2-radar-note"><span aria-hidden="true">&#9432;</span><div><span class="lang-en"><strong>Reading these dates as a supplier:</strong> the legal deadlines usually bind the EU importer or seller. Your goods must comply by the time they ship, or are ordered, so act well before each date and add lead time for changes to product design and production processes.</span><span class="lang-zh"><strong>供应商如何解读这些日期：</strong>法定期限通常约束欧盟进口商或销售方。您的货物在发运（甚至下单）时就须合规，请在每个日期之前尽早行动，并为产品设计和生产工艺的调整预留额外时间。</span><span class="lang-de"><strong>Diese Termine aus Lieferantensicht:</strong> Die gesetzlichen Fristen binden meist den EU-Importeur oder Verk&auml;ufer. Ihre Ware muss bei Verschiffung, oder Bestellung, konform sein: Handeln Sie deutlich vor jedem Termin und planen Sie Vorlauf f&uuml;r Produkt- und Prozess&auml;nderungen ein.</span><span class="lang-vi"><strong>Đọc c&aacute;c mốc n&agrave;y từ g&oacute;c nh&igrave;n nh&agrave; cung cấp:</strong> thời hạn ph&aacute;p l&yacute; thường r&agrave;ng buộc nh&agrave; nhập khẩu hoặc b&ecirc;n b&aacute;n tại EU. H&agrave;ng của bạn phải tu&acirc;n thủ khi xuất xưởng, hoặc khi đặt h&agrave;ng, n&ecirc;n h&atilde;y h&agrave;nh động sớm v&agrave; dự tr&ugrave; thời gian cho thay đổi thiết kế v&agrave; quy tr&igrave;nh.</span></div></div>`);
                applyLang(document.querySelector('.v2-radar-note'));
            }
            const farP = document.querySelector('.radar-col-far .radar-col-header p');
            if (farP && farP.querySelector('.lang-en')?.textContent.startsWith('Monitor')) {
                farP.innerHTML = '<span class="lang-en">Change is coming, start preparing: supplier-side changes need the longest lead time.</span><span class="lang-zh">变化将至，请开始准备：供应商侧的调整需要最长的前置时间。</span><span class="lang-de">Änderungen kommen, beginnen Sie mit der Vorbereitung: lieferantenseitige Umstellungen brauchen den längsten Vorlauf.</span><span class="lang-vi">Thay đổi đang đến, hãy bắt đầu chuẩn bị: các điều chỉnh phía nhà cung cấp cần thời gian dài nhất.</span>';
                applyLang(farP);
            }
        } else if (document.getElementById('radarList')) pending = true;

        // Member features are announced but not accessible yet: neutralise
        // sign-in CTAs rendered by script.js (calendar download, locked posts)
        document.querySelectorAll('a.member-locked-btn, a.briefing-lock-cta').forEach(a => {
            const span = document.createElement('span');
            span.className = a.className + ' v2-locked-soon';
            span.innerHTML = '<span class="lang-en">Member content: available when the member area launches</span><span class="lang-zh">会员内容：会员专区上线后开放</span><span class="lang-de">Mitgliederinhalt: verfügbar mit Start des Mitgliederbereichs</span><span class="lang-vi">Nội dung thành viên: mở khi khu vực thành viên ra mắt</span>';
            a.replaceWith(span);
            applyLang(span);
        });

        const bl = document.getElementById('briefingList');
        if (bl && !bl.childElementCount) pending = true;

        // briefing layout (committee): the lead story spans full width with
        // image left / text right; the smaller posts flow two-up below it
        if (PAGE === 'briefing' && bl && bl.childElementCount) {
            const cols = bl.querySelector('.briefing-columns');
            const lead = cols?.querySelector('.briefing-lead');
            if (lead) bl.insertBefore(lead, cols);
            // committee: simple table format, no column masonry. Flatten the
            // balanced columns into one uniform list (document order matches
            // the original post order: primary items first, then secondary).
            if (cols && !bl.querySelector('.v2-brief-list')) {
                const flat = document.createElement('div');
                flat.className = 'v2-brief-list';
                cols.querySelectorAll('.briefing-item').forEach(it => flat.appendChild(it));
                cols.replaceWith(flat);
            }
        }
        if (pending && attempt < 10) setTimeout(() => v2Overrides(attempt + 1), 700);
    }

    // Vietnamese is parked until native review: the option is gone from the
    // selector, so a stored 'vi' preference must fall back to English.
    if (localStorage.getItem('gcc-lang') === 'vi') {
        localStorage.setItem('gcc-lang', 'en');
        const ls = document.getElementById('langSelect');
        if (ls) { ls.value = 'en'; ls.dispatchEvent(new Event('change')); }
    }

    // Guided-navigation state: persona cards pulse gently until a
    // perspective is chosen (CSS keys off this class; reduced-motion safe)
    function markPersona() {
        const saved = localStorage.getItem('gcc-persona');
        if (!saved) return;
        document.body.classList.add('v2-persona-chosen');
        document.querySelectorAll('.v2-persona-card').forEach(c =>
            c.classList.toggle('active', c.dataset.persona === saved));
    }
    document.querySelectorAll('.v2-persona-card').forEach(card =>
        card.addEventListener('click', () => { document.body.classList.add('v2-persona-chosen'); }));

    // ===== Certification filter (Sep 2026 review, Jill Dessel) =====
    // Chip row filters the voluntary-certification rows by the EU requirement
    // each scheme supports (data-reqs on the row); group headings with no
    // visible rows hide along with their rows.
    function certFilter() {
        const bar = document.getElementById('certFilter');
        if (!bar) return;
        bar.addEventListener('click', (ev) => {
            const chip = ev.target.closest('.v2-cert-chip');
            if (!chip) return;
            bar.querySelectorAll('.v2-cert-chip').forEach(c => c.classList.toggle('on', c === chip));
            const req = chip.dataset.req || '';
            document.querySelectorAll('.v2-cert-row').forEach(row => {
                row.style.display = (!req || (row.dataset.reqs || '').split(' ').includes(req)) ? '' : 'none';
            });
            document.querySelectorAll('.v2-cert-group').forEach(h => {
                let el = h.nextElementSibling, any = false;
                while (el && el.classList.contains('v2-cert-row')) {
                    if (el.style.display !== 'none') { any = true; break; }
                    el = el.nextElementSibling;
                }
                h.style.display = any ? '' : 'none';
            });
        });
    }

    // ===== Deferred hash jump =====
    // CMS-rendered targets (briefing cards) do not exist when the browser
    // resolves the URL hash on load — retry until the target renders.
    function jumpToHash(attempt) {
        const id = window.location.hash.slice(1);
        if (!id) return;
        const t = document.getElementById(id);
        if (t && (t.offsetWidth || t.offsetHeight)) { t.scrollIntoView(); return; }
        if (attempt < 10) setTimeout(() => jumpToHash(attempt + 1), 500);
    }

    // ===== Member gating (owner decisions 2026-09-09/10) =====
    // Depth is member content; overviews stay public. Until Supabase goes live
    // the member state is simulated for board demos: ?demo=member switches the
    // member preview on (uses the existing gcc-demo-tier mechanism, which the
    // server-side gating in api/content.js honors too), ?demo=public switches
    // it off. A floating pill shows when the member preview is active.
    (function demoSwitch() {
        const p = new URLSearchParams(window.location.search).get('demo');
        if (p === 'member') localStorage.setItem('gcc-demo-tier', 'member');
        if (p === 'public' || p === 'off') localStorage.removeItem('gcc-demo-tier');
    })();
    const memberView = !!((typeof authToken === 'function' && authToken()) || (typeof demoTier === 'function' && demoTier() === 'member'));

    function memberPill() {
        if (!memberView) return;
        const u = new URL(window.location.href);
        u.searchParams.set('demo', 'public');
        document.body.insertAdjacentHTML('beforeend',
            `<div class="v2-demo-pill"><span class="lang-en">Member preview</span><span class="lang-zh">会员预览</span><span class="lang-de">Mitglieder-Vorschau</span><span class="lang-vi">Xem trước thành viên</span> <a href="${u.pathname}${u.search}">&#10005;</a></div>`);
        applyLang(document.querySelector('.v2-demo-pill'));
    }

    const GATE_HTML = `
        <div class="v2-gate v2-member-gate">
            <span class="v2-lock-badge v2-lock-badge-member"><span class="lang-en">Members</span><span class="lang-zh">会员</span><span class="lang-de">Mitglieder</span><span class="lang-vi">Thành viên</span></span>
            <h3><span class="lang-en">Member content</span><span class="lang-zh">会员内容</span><span class="lang-de">Mitglieder-Inhalt</span><span class="lang-vi">Nội dung thành viên</span></h3>
            <p><span class="lang-en">This part of the platform is for members of the German Chamber of Commerce Hong Kong. Member sign-in launches soon; the Committee is preparing the member area now.</span><span class="lang-zh">平台的这一部分面向德国工商总会香港的会员企业。会员登录即将上线，委员会目前正在筹备会员专区。</span><span class="lang-de">Dieser Teil der Plattform ist Mitgliedern der Deutschen Handelskammer Hongkong vorbehalten. Der Mitglieder-Login startet bald; der Ausschuss bereitet den Mitgliederbereich derzeit vor.</span><span class="lang-vi">Phần này của nền tảng dành cho hội viên Phòng Thương mại Đức tại Hồng Kông. Đăng nhập thành viên sắp ra mắt; Ủy ban đang chuẩn bị khu vực thành viên.</span></p>
            <a class="btn-gate" href="mailto:info@hongkong.ahk.de?subject=ESG Sourcing Hub Member area"><span class="lang-en">Get notified when it launches</span><span class="lang-zh">上线时获取通知</span><span class="lang-de">Zum Start benachrichtigen lassen</span><span class="lang-vi">Nhận thông báo khi ra mắt</span></a>
            <p class="v2-gate-sub"><span class="lang-en">Not a member yet? <a href="https://hongkong.ahk.de/membership" target="_blank" rel="noopener">Become a member of the German Chamber of Commerce Hong Kong</a>.</span><span class="lang-zh">还不是会员？<a href="https://hongkong.ahk.de/membership" target="_blank" rel="noopener">成为德国工商总会香港会员</a>。</span><span class="lang-de">Noch kein Mitglied? <a href="https://hongkong.ahk.de/membership" target="_blank" rel="noopener">Werden Sie Mitglied der Deutschen Handelskammer Hongkong</a>.</span><span class="lang-vi">Chưa phải thành viên? <a href="https://hongkong.ahk.de/membership" target="_blank" rel="noopener">Trở thành hội viên Phòng Thương mại Đức tại Hồng Kông</a>.</span></p>
        </div>`;

    function gateMemberSections() {
        if (memberView) return;
        // Tools: the checks (compass) and the CBAM calculator are member-only;
        // the page intro stays visible so visitors see what the tool does.
        if (PAGE === 'compass') {
            const c = document.querySelector('#compass .container');
            if (c) {
                Array.from(c.children).forEach((el, i) => { if (i > 0) el.style.display = 'none'; });
                c.insertAdjacentHTML('beforeend', GATE_HTML);
                applyLang(c);
            }
        }
        if (PAGE === 'cbam') {
            const c = document.querySelector('#cbam .container');
            const panel = c?.querySelector('.cbam-panel');
            if (panel) {
                panel.style.display = 'none';
                panel.insertAdjacentHTML('beforebegin', GATE_HTML);
                // scope + formula stay public: move the two info notes out of the hidden panel
                const notes = panel.querySelectorAll('.cbam-info-note');
                notes.forEach(n => c.appendChild(n));
                applyLang(c);
            }
        }
        // Knowledge teasers: first entries stay visible, the depth is gated.
        if (PAGE === 'certifications') {
            const list = document.querySelector('.v2-cert-list');
            document.getElementById('certFilter')?.style.setProperty('display', 'none');
            document.querySelector('.v2-cert-filter-hint')?.style.setProperty('display', 'none');
            if (list) {
                let inGroup = 0;
                Array.from(list.children).forEach(el => {
                    if (el.classList.contains('v2-cert-group')) { inGroup = 0; return; }
                    if (el.classList.contains('v2-cert-row') && ++inGroup > 1) el.style.display = 'none';
                });
                list.insertAdjacentHTML('beforeend', GATE_HTML);
                applyLang(list);
            }
        }
        if (PAGE === 'glossary') {
            const list = document.querySelector('.v2-glossary-list');
            if (list) {
                let groups = 0;
                Array.from(list.children).forEach(el => {
                    if (el.classList.contains('v2-gl-group')) groups++;
                    if (groups > 1 && !el.classList.contains('v2-gl-head')) el.style.display = 'none';
                });
                list.insertAdjacentHTML('beforeend', GATE_HTML);
                applyLang(list);
            }
        }
        if (PAGE === 'faq') {
            const items = document.querySelectorAll('#faq .faq-item');
            items.forEach((el, i) => { if (i >= 3) el.style.display = 'none'; });
            const c = document.querySelector('#faq .container');
            if (c) { c.insertAdjacentHTML('beforeend', GATE_HTML); applyLang(c); }
        }
    }

    // ===== Detailed regulation page (owner decision 2026-09-09) =====
    // v2-v2-regulation.html?id=<regId>: base data from the shared regulations set
    // (CMS with built-in fallback), depth from v2-reg-details.js, dates from the
    // CMS deadlines. Replaces the legacy v2-regulation.html?id= as link target.
    const REG_SECTION_TITLES = {
        'REPORTING': ['REPORTING', '报告义务', 'Berichtspflichten', 'Nghĩa vụ báo cáo'],
        'SUPPLY CHAIN': ['SUPPLY CHAIN', '供应链要求', 'Lieferkette', 'Chuỗi cung ứng'],
        'PRODUCT DESIGN': ['PRODUCT DESIGN', '产品设计', 'Produktdesign', 'Thiết kế sản phẩm'],
        'DOCUMENTATION': ['DOCUMENTATION', '文件要求', 'Dokumentation', 'Hồ sơ tài liệu'],
        'PENALTIES': ['PENALTIES', '违规处罚', 'Sanktionen', 'Chế tài xử phạt']
    };
    function renderRegDetail() {
        if (PAGE !== 'regulation') return;
        const root = document.getElementById('regDetailRoot');
        if (!root) return;
        const t4 = (en, zh, de, vi) => `<span class="lang-en">${en}</span><span class="lang-zh">${zh}</span><span class="lang-de">${de}</span>${vi ? `<span class="lang-vi">${vi}</span>` : ''}`;
        const t3o = o => o ? t4(o.en, o.zh || o.en, o.de || o.en, o.vi) : '';
        const fail = () => {
            root.innerHTML = `<p class="v2-regdetail-error">${t4('Regulation not found or content unavailable.', '未找到该法规或内容暂不可用。', 'Verordnung nicht gefunden oder Inhalt nicht verfügbar.', 'Không tìm thấy quy định hoặc nội dung hiện không khả dụng.')}</p>` +
                `<p><a class="v2-regdetail-back" href="index.html">${t4('&larr; Back to the hub', '&larr; 返回首页', '&larr; Zurück zur Startseite', '&larr; Về trang chủ')}</a></p>`;
            applyLang(root);
        };
        const id = new URLSearchParams(window.location.search).get('id');
        if (!id) { fail(); return; }

        const baseP = Promise.resolve()
            .then(() => loadContent('regulations'))
            .then(list => (Array.isArray(list) && list.length) ? list.map(regFromSanity) : regulations)
            .catch(() => regulations);
        const dlP = Promise.resolve().then(() => loadContent('deadlines')).catch(() => []);

        Promise.all([baseP, dlP]).then(([regs, deadlines]) => {
            let reg = (regs || []).find(r => r.id === id);
            if (!reg && typeof V2_REG_EXTRA_BASE !== 'undefined' && V2_REG_EXTRA_BASE[id]) {
                // UK set: built-in base so the pages work before the CMS seed runs
                const b = V2_REG_EXTRA_BASE[id];
                reg = {
                    id, name: b.name, ref: b.ref,
                    statusLabel: { inforce: 'IN FORCE', phasing: 'PHASING IN', prepare: 'PREPARE NOW' }[b.status] || b.status,
                    inForce: b.inForce, complianceDeadline: b.complianceDeadline,
                    lastReviewed: b.lastReviewed ? new Date(b.lastReviewed).toLocaleDateString('en-GB', { month: 'long', year: 'numeric' }) : '',
                    eurlex: b.eurlex,
                    sections: (b.sections || []).map(s => ({ title: s.title, text: s.textEn, textZh: s.textZh })),
                    reason: () => b.reasonEn || '', reasonZh: () => b.reasonZh || '', reasonDe: null
                };
            }
            if (!reg) { fail(); return; }
            const det = (typeof V2_REG_DETAILS !== 'undefined' && V2_REG_DETAILS[id]) || null;
            document.title = `${reg.name} | ESG Sourcing Hub`;

            const stZh = statusLabelsZh[reg.statusLabel] || reg.statusLabel;
            const stDe = statusLabelsDe[reg.statusLabel] || reg.statusLabel;
            const stVi = statusLabelsVi[reg.statusLabel] || reg.statusLabel;
            const badgeCls = { 'IN FORCE': 'badge-inforce', 'PHASING IN': 'badge-phasing', 'PREPARE NOW': 'badge-prepare' }[reg.statusLabel] || '';

            const head = `
                <div class="v2-regdetail-head">
                    <span class="badge ${badgeCls}">${t4(reg.statusLabel, stZh, stDe, stVi)}</span>
                    <h1>${reg.name}</h1>
                    <div class="v2-regdetail-ref">${reg.ref || ''}</div>
                    <div class="v2-regdetail-meta">
                        <div><div class="v2-rd-label">${t4('In force from', '生效日期', 'In Kraft seit', 'Có hiệu lực từ')}</div><div>${reg.inForce || ''}</div></div>
                        <div><div class="v2-rd-label">${t4('Compliance deadline', '合规截止日期', 'Frist zur Einhaltung', 'Thời hạn tuân thủ')}</div><div>${reg.complianceDeadline || ''}</div></div>
                        <div><div class="v2-rd-label">${t4('Last reviewed', '最近更新', 'Zuletzt geprüft', 'Cập nhật gần nhất')}</div><div>${reg.lastReviewed || ''}</div></div>
                    </div>
                </div>`;

            const disclaimer = `<div class="v2-disclaimer"><span aria-hidden="true">&#9888;</span><div>${t4(
                '<strong>General information, not legal advice.</strong> Verified against official sources; where wording differs, the official texts linked below prevail.',
                '<strong>一般信息，并非法律意见。</strong>内容已对照官方来源核实；如有出入，以下方链接的官方文本为准。',
                '<strong>Allgemeine Information, keine Rechtsberatung.</strong> Gegen offizielle Quellen geprüft; im Zweifel gelten die unten verlinkten Amtstexte.',
                '<strong>Thông tin chung, không phải tư vấn pháp lý.</strong> Đã đối chiếu nguồn chính thức; nếu khác biệt, văn bản chính thức bên dưới được ưu tiên.')}</div></div>`;

            let why = '';
            const reason = reg.reason ? reg.reason('other', ['eu'], 'supplier', 'sme') : '';
            if (reason) {
                const reasonZh = reg.reasonZh ? reg.reasonZh('other', ['eu'], 'supplier', 'sme') : '';
                const reasonDe = reg.reasonDe ? reg.reasonDe('other', ['eu'], 'supplier', 'sme') : '';
                why = `<div class="v2-regdetail-block"><h2>${t4('Why it matters', '为什么重要', 'Warum es wichtig ist', 'Vì sao quan trọng')}</h2>
                    <p>${t4(reason, reasonZh || reason, reasonDe || reason)}</p></div>`;
            }

            if (!memberView) {
                // public teaser: status, meta and why-it-matters; depth is member content
                root.innerHTML = `<a class="v2-regdetail-back" href="index.html">${t4('&larr; Back', '&larr; 返回', '&larr; Zurück', '&larr; Quay lại')}</a>` +
                    head + disclaimer + why + GATE_HTML;
                applyLang(root);
                return;
            }

            const regDl = (deadlines || []).filter(d => d.regId === id && d.date).sort((a, b) => a.date < b.date ? -1 : 1);
            const timeline = regDl.length ? `<div class="v2-regdetail-block"><h2>${t4('Timeline', '时间表', 'Zeitplan', 'Lộ trình')}</h2>
                <ul class="v2-rd-timeline">${regDl.map(d => {
                    const past = new Date(d.date) < new Date();
                    const dateStr = new Date(d.date).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
                    const exp = d.confidence === 'expected' ? ` <em>${t4('expected', '预期', 'erwartet', 'dự kiến')}</em>` : '';
                    return `<li class="${past ? 'v2-rd-past' : ''}"><span class="v2-rd-date">${dateStr}</span><span>${t4(d.labelEn || '', d.labelZh || d.labelEn || '', d.labelEn || '')}${exp}</span></li>`;
                }).join('')}</ul></div>` : '';

            const sections = (reg.sections || []).map(s => {
                const tt = REG_SECTION_TITLES[s.title] || [s.title, s.title, s.title, s.title];
                return `<div class="v2-regdetail-block"><h2>${t4(tt[0], tt[1], tt[2], tt[3])}</h2>
                    <p>${t4(s.text || '', s.textZh || s.text || '', s.textDe || s.text || '', s.textVi)}</p></div>`;
            }).join('');

            const roleCards = det && det.roles ? `<div class="v2-regdetail-block"><h2>${t4('What this means for you', '这对您意味着什么', 'Was das für Sie bedeutet', 'Điều này có nghĩa gì với bạn')}</h2>
                <div class="v2-rd-roles">
                    <div class="v2-rd-role"><h3>${t4('Sourcing office / importer', '采购办公室 / 进口商', 'Einkaufsbüro / Importeur', 'Văn phòng thu mua / nhà nhập khẩu')}</h3>
                        <ul>${det.roles.office.map(b => `<li>${t3o(b)}</li>`).join('')}</ul></div>
                    <div class="v2-rd-role"><h3>${t4('Supplier / manufacturer', '供应商 / 制造商', 'Lieferant / Hersteller', 'Nhà cung cấp / nhà sản xuất')}</h3>
                        <ul>${det.roles.supplier.map(b => `<li>${t3o(b)}</li>`).join('')}</ul></div>
                </div></div>` : '';

            const actions = det && det.actions ? `<div class="v2-regdetail-block"><h2>${t4('What to do now', '现在该做什么', 'Was jetzt zu tun ist', 'Việc cần làm ngay')}</h2>
                <ol class="v2-rd-actions">${det.actions.map(a => `<li>${t3o(a)}</li>`).join('')}</ol></div>` : '';

            const docs = det && det.documents ? `<div class="v2-regdetail-block"><h2>${t4('Documents your buyers will ask for', '买家会索取的文件', 'Dokumente, die Abnehmer anfragen', 'Tài liệu khách hàng sẽ yêu cầu')}</h2>
                <ul class="v2-rd-docs">${det.documents.map(a => `<li>${t3o(a)}</li>`).join('')}</ul></div>` : '';

            const memberTag = `<span class="v2-lock-badge v2-lock-badge-member">${t4('Members', '会员', 'Mitglieder', 'Thành viên')}</span>`;
            const tools = `<div class="v2-regdetail-block"><h2>${t4('Check your exposure', '检查您的适用情况', 'Prüfen Sie Ihre Betroffenheit', 'Kiểm tra mức độ liên quan')}</h2>
                <div class="v2-hub-tools v2-rd-tools">
                    <a class="v2-tool-card" href="v2-compass.html?persona=merchandiser">${memberTag}<h3>${t4('Quick Check', '快速查询', 'Schnell-Check', 'Tra cứu nhanh')}</h3><p>${t4('Full requirements table by category, market and role.', '按类别、市场和角色的完整要求概览表。', 'Volle Anforderungstabelle nach Kategorie, Markt und Rolle.', 'Bảng yêu cầu đầy đủ theo danh mục, thị trường và vai trò.')}</p></a>
                    <a class="v2-tool-card" href="v2-compass.html?persona=supplier">${memberTag}<h3>${t4('Guided Check', '引导式检查', 'Geführter Check', 'Kiểm tra có hướng dẫn')}</h3><p>${t4('Three questions to the requirements that apply to you.', '三个问题找到适用于您的要求。', 'Drei Fragen zu Ihren Anforderungen.', 'Ba câu hỏi đến các yêu cầu áp dụng cho bạn.')}</p></a>
                    ${id === 'cbam' ? `<a class="v2-tool-card" href="v2-cbam.html">${memberTag}<h3>${t4('CBAM Calculator', 'CBAM计算器', 'CBAM-Rechner', 'Máy tính CBAM')}</h3><p>${t4('Estimate the carbon border cost with official EU values.', '使用欧盟官方数值估算碳边境成本。', 'Kosten mit offiziellen EU-Werten schätzen.', 'Ước tính chi phí với giá trị chính thức của EU.')}</p></a>` : ''}
                </div></div>`;

            const srcItems = [...(det && det.sources ? det.sources : [])];
            if (reg.eurlex) srcItems.push({ label: 'Official text', url: reg.eurlex });
            const sources = srcItems.length ? `<div class="v2-regdetail-block"><h2>${t4('Sources', '资料来源', 'Quellen', 'Nguồn')}</h2>
                <ul class="v2-rd-sources">${srcItems.map(s => `<li><a href="${s.url}" target="_blank" rel="noopener">${s.label}</a></li>`).join('')}</ul></div>` : '';

            root.innerHTML = `<a class="v2-regdetail-back" href="index.html">${t4('&larr; Back', '&larr; 返回', '&larr; Zurück', '&larr; Quay lại')}</a>` +
                head + disclaimer + why + timeline + sections + roleCards + actions + docs + tools + sources;
            const back = root.querySelector('.v2-regdetail-back');
            back.addEventListener('click', e => {
                if (document.referrer && new URL(document.referrer, location.href).origin === location.origin && history.length > 1) {
                    e.preventDefault(); history.back();
                }
            });
            applyLang(root);
        });
    }

    // ===== Init =====
    renderRegDetail();
    buildExpress();
    gateMemberSections();
    memberPill();
    cdnFallback();
    fillMinis(0);
    gateGuides();
    v2Overrides(0);
    markPersona();
    certFilter();
    jumpToHash(0);
    const urlPersona = new URLSearchParams(window.location.search).get('persona');
    if (urlPersona && PAGE !== 'hub') {
        // No scroll on arrival — the page opens at the top where the express
        // panel already sits; scrolling would only tuck it under the fixed
        // nav + news band.
        applyPersona(urlPersona, false);
    } else {
        const saved = localStorage.getItem('gcc-persona');
        if (saved && PAGE !== 'hub') applyPersona(saved, false);
    }
})();
