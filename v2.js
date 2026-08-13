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
                <span class="lang-en"><strong>Indicative screening &mdash; not legal advice.</strong> This overview is generated from your inputs and simplified matching rules. Before business decisions, verify each regulation against the official text linked in its card, or consult a qualified advisor. The Chamber accepts no liability for decisions based on this tool.</span><span class="lang-zh"><strong>指示性筛查——不构成法律意见。</strong>本概览基于您的输入和简化的匹配规则生成。在做出商业决策前，请对照各卡片中链接的官方文本核实每条法规，或咨询专业顾问。商会对基于本工具的决策不承担任何责任。</span><span class="lang-de"><strong>Indikative Ersteinsch&auml;tzung &mdash; keine Rechtsberatung.</strong> Diese &Uuml;bersicht basiert auf Ihren Angaben und vereinfachten Zuordnungsregeln. Pr&uuml;fen Sie vor Gesch&auml;ftsentscheidungen jede Vorschrift anhand des verlinkten Amtstextes oder ziehen Sie qualifizierte Berater hinzu. Die Kammer &uuml;bernimmt keine Haftung.</span><span class="lang-vi"><strong>S&agrave;ng lọc mang t&iacute;nh tham khảo &mdash; kh&ocirc;ng phải tư vấn ph&aacute;p l&yacute;.</strong> Tổng quan n&agrave;y được tạo từ th&ocirc;ng tin bạn nhập v&agrave; c&aacute;c quy tắc đối chiếu đơn giản h&oacute;a. Trước khi ra quyết định kinh doanh, h&atilde;y kiểm tra từng quy định theo văn bản ch&iacute;nh thức được li&ecirc;n kết hoặc tham vấn chuy&ecirc;n gia. Ph&ograve;ng Thương mại kh&ocirc;ng chịu tr&aacute;ch nhiệm ph&aacute;p l&yacute;.</span>
            </div>
        </div>`;

    // ===== Persona quick-start =====
    // Supplier → guided wizard (learning mode). Merchandiser → express table
    // (fast product overview + export), role fixed to Brand/Retailer.
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
        document.querySelectorAll('#compass input[name="market"]').forEach(cb => {
            if (preset.markets.includes(cb.value)) cb.checked = true;
        });
        const express = document.getElementById('v2Express');
        if (express) express.style.display = name === 'merchandiser' ? '' : 'none';
        if (scroll) {
            const target = (name === 'merchandiser' && express) ? express : document.getElementById('compass');
            target?.scrollIntoView({ behavior: 'smooth' });
        }
    }

    document.querySelectorAll('.v2-persona-card').forEach(card => {
        card.addEventListener('click', () => applyPersona(card.dataset.persona, true));
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

        const el = document.createElement('div');
        el.className = 'v2-express';
        el.id = 'v2Express';
        el.style.display = 'none';
        el.innerHTML = `
            <div class="v2-express-head">
                <h3><span class="lang-en">Express check &mdash; product overview table</span><span class="lang-zh">快速检查——产品法规概览表</span><span class="lang-de">Express-Check &mdash; Produkt&uuml;bersicht</span><span class="lang-vi">Kiểm tra nhanh &mdash; bảng tổng quan sản phẩm</span></h3>
                <a href="#compass"><span class="lang-en">New to these rules? Use the guided check below &darr;</span><span class="lang-zh">不熟悉这些法规？请使用下方的引导式检查 &darr;</span><span class="lang-de">Neu im Thema? Nutzen Sie den gef&uuml;hrten Check unten &darr;</span><span class="lang-vi">Chưa quen? D&ugrave;ng kiểm tra c&oacute; hướng dẫn b&ecirc;n dưới &darr;</span></a>
            </div>
            <div class="v2-express-row">
                <select id="v2ExCat" aria-label="Product category">${catOptions}</select>
                <select id="v2ExSize" aria-label="Supplier size">${sizeOptions}</select>
                <span class="v2-express-markets">
                    <label><input type="checkbox" name="v2exmarket" value="eu" checked> EU</label>
                    <label><input type="checkbox" name="v2exmarket" value="germany" checked> <span class="lang-en">Germany</span><span class="lang-zh">德国</span><span class="lang-de">Deutschland</span><span class="lang-vi">Đức</span></label>
                    <label><input type="checkbox" name="v2exmarket" value="uk"> UK</label>
                    <label><input type="checkbox" name="v2exmarket" value="us"> US</label>
                </span>
                <button type="button" class="btn-express" id="v2ExRun"><span class="lang-en">Show overview</span><span class="lang-zh">显示概览</span><span class="lang-de">&Uuml;bersicht anzeigen</span><span class="lang-vi">Xem tổng quan</span></button>
            </div>
            <div id="v2ExResult"></div>`;
        anchor.insertBefore(el, anchor.children[2] || null);
        applyLang(el);
        document.getElementById('v2ExRun').addEventListener('click', runExpress);
    }

    function statusBadgeColor(status) {
        return { inforce: '#1a5c38', phasing: '#DE8703', prepare: '#003366' }[status] || '#555';
    }

    function runExpress() {
        const sel = {
            category: document.getElementById('v2ExCat').value,
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

        // Sync the main wizard inputs so the CSV export shares this selection
        document.getElementById('filterCategory').value = sel.category;
        document.getElementById('filterSize').value = sel.size;
        document.getElementById('filterRole').value = sel.role;
        document.querySelectorAll('#compass input[name="market"]').forEach(cb => { cb.checked = sel.markets.includes(cb.value); });

        const regs = matchedRegs(sel);
        if (!regs.length) {
            out.innerHTML = '<p style="margin:12px 0 0;"><span class="lang-en">No regulations matched — try selecting EU or Germany as a market.</span><span class="lang-zh">没有匹配的法规——请尝试选择欧盟或德国作为市场。</span><span class="lang-de">Keine Treffer &mdash; w&auml;hlen Sie EU oder Deutschland als Markt.</span><span class="lang-vi">Kh&ocirc;ng c&oacute; quy định n&agrave;o khớp &mdash; h&atilde;y chọn EU hoặc Đức.</span></p>';
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
                <td><a href="regulation.html?id=${reg.id}" target="_blank"><span class="lang-en">Details</span><span class="lang-zh">详情</span><span class="lang-de">Details</span><span class="lang-vi">Chi tiết</span></a>${reg.eurlex ? ` &middot; <a href="${reg.eurlex}" target="_blank" rel="noopener"><span class="lang-en">Official text</span><span class="lang-zh">官方文本</span><span class="lang-de">Amtstext</span><span class="lang-vi">Văn bản</span></a>` : ''}</td>
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

    // ===== Persona-specific "what to do next" =====
    const NEXT_STEPS = {
        supplier: `
        <div class="v2-next">
            <h4><span class="lang-en">What to do next (supplier)</span><span class="lang-zh">下一步该做什么（供应商）</span><span class="lang-de">Die n&auml;chsten Schritte (Lieferant)</span><span class="lang-vi">C&aacute;c bước tiếp theo (nh&agrave; cung cấp)</span></h4>
            <ol>
                <li><span class="lang-en">Read each card's key requirements and start collecting what is named there: technical files, emissions data, geolocation coordinates, declarations.</span><span class="lang-zh">阅读各卡片的关键要求，开始收集其中列明的材料：技术文件、排放数据、地理坐标、各类声明。</span><span class="lang-de">Lesen Sie die Kernanforderungen jeder Karte und sammeln Sie die genannten Unterlagen.</span><span class="lang-vi">Đọc y&ecirc;u cầu ch&iacute;nh của từng thẻ v&agrave; bắt đầu thu thập t&agrave;i liệu được n&ecirc;u.</span></li>
                <li><span class="lang-en">Expect these topics in your buyer's next questionnaire — answer with documents, not promises. Export the CSV so your team works from the same list.</span><span class="lang-zh">买家的下一份问卷很可能涉及这些主题——请用文件而非承诺作答。导出CSV，让团队基于同一份清单工作。</span><span class="lang-de">Diese Themen kommen im n&auml;chsten Fragebogen Ihres Abnehmers &mdash; antworten Sie mit Dokumenten. Exportieren Sie die CSV f&uuml;r Ihr Team.</span><span class="lang-vi">C&aacute;c chủ đề n&agrave;y sẽ xuất hiện trong bảng c&acirc;u hỏi của người mua &mdash; h&atilde;y trả lời bằng t&agrave;i liệu. Xuất CSV cho nh&oacute;m của bạn.</span></li>
                <li><span class="lang-en">Check the Deadline Radar for the dates that bind you — earliest first.</span><span class="lang-zh">查看法规期限雷达，了解对您有约束力的日期——最早的优先。</span><span class="lang-de">Pr&uuml;fen Sie den Fristen-Radar &mdash; fr&uuml;heste Termine zuerst.</span><span class="lang-vi">Kiểm tra Radar Thời hạn &mdash; thời hạn sớm nhất trước.</span></li>
                <li><span class="lang-en">Use the step-by-step guides in the Briefing and Resource Library — or contact the Committee for accredited providers in Asia.</span><span class="lang-zh">参考简报和资源库中的分步指南——或联系委员会获取亚洲地区认可服务机构的信息。</span><span class="lang-de">Nutzen Sie die Leitf&auml;den in Briefing und Bibliothek &mdash; oder kontaktieren Sie das Komitee.</span><span class="lang-vi">D&ugrave;ng hướng dẫn trong Bản tin v&agrave; Thư viện &mdash; hoặc li&ecirc;n hệ Ủy ban.</span></li>
            </ol>
        </div>`,
        merchandiser: `
        <div class="v2-next">
            <h4><span class="lang-en">What to do next (merchandiser)</span><span class="lang-zh">下一步该做什么（采购专员）</span><span class="lang-de">Die n&auml;chsten Schritte (Merchandiser)</span><span class="lang-vi">C&aacute;c bước tiếp theo (merchandiser)</span></h4>
            <ol>
                <li><span class="lang-en">Export the CSV and attach it to your order or supplier email — it names each regulation, deadline and official source.</span><span class="lang-zh">导出CSV并附在订单或供应商邮件中——其中列明每条法规、期限和官方来源。</span><span class="lang-de">Exportieren Sie die CSV und h&auml;ngen Sie sie an Ihre Bestellung oder Lieferanten-E-Mail an.</span><span class="lang-vi">Xuất CSV v&agrave; đ&iacute;nh k&egrave;m email đơn h&agrave;ng hoặc nh&agrave; cung cấp.</span></li>
                <li><span class="lang-en">Ask your supplier for the documents named in "Key requirements" — before order placement, not at shipment.</span><span class="lang-zh">在下单前（而非发货时）就向供应商索取"关键要求"中列明的文件。</span><span class="lang-de">Fordern Sie die Dokumente der Kernanforderungen vor der Bestellung an &mdash; nicht erst bei Verschiffung.</span><span class="lang-vi">Y&ecirc;u cầu nh&agrave; cung cấp gửi t&agrave;i liệu trong &quot;Y&ecirc;u cầu ch&iacute;nh&quot; trước khi đặt h&agrave;ng.</span></li>
                <li><span class="lang-en">Cross-check the deadlines against your order and shipping calendar — a rule that applies at arrival matters for orders placed today.</span><span class="lang-zh">将期限与您的订单和船期日历核对——货物到港时适用的规则，对今天下的订单同样重要。</span><span class="lang-de">Gleichen Sie Fristen mit Ihrem Order- und Verschiffungskalender ab.</span><span class="lang-vi">Đối chiếu thời hạn với lịch đặt h&agrave;ng v&agrave; giao h&agrave;ng của bạn.</span></li>
                <li><span class="lang-en">Follow the Briefing for changes to these rules — or ask the Committee to walk your team through a specific regulation.</span><span class="lang-zh">通过简报跟踪法规变化——或请委员会为您的团队讲解某项具体法规。</span><span class="lang-de">Verfolgen Sie &Auml;nderungen im Briefing &mdash; oder bitten Sie das Komitee um eine Einf&uuml;hrung.</span><span class="lang-vi">Theo d&otilde;i Bản tin để cập nhật thay đổi &mdash; hoặc nhờ Ủy ban hướng dẫn.</span></li>
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
                <span class="v2-export-note"><span class="lang-en">One row per regulation — deadlines, reasons, official sources. Opens in Excel; attach it to your buyer or supplier email. Generated in your browser, no data is sent anywhere.</span><span class="lang-zh">每条法规一行——含期限、适用原因和官方来源。可在Excel中打开，附在给买家或供应商的邮件中。文件在您的浏览器中生成，不会向任何服务器发送数据。</span><span class="lang-de">Eine Zeile pro Vorschrift &mdash; Fristen, Gr&uuml;nde, offizielle Quellen. Wird lokal im Browser erzeugt.</span><span class="lang-vi">Mỗi quy định một d&ograve;ng &mdash; thời hạn, l&yacute; do, nguồn ch&iacute;nh thức. Tạo ngay trong tr&igrave;nh duyệt của bạn.</span></span>
            </div>`;
        cards.insertAdjacentElement('beforebegin', wrap);
        const next = document.createElement('div');
        next.className = 'v2-wizard-next';
        next.innerHTML = NEXT_STEPS[persona];
        cards.insertAdjacentElement('afterend', next);
        applyLang(wrap);
        document.getElementById('v2CsvBtn').addEventListener('click', exportCsv);
    }

    document.getElementById('atlasSubmit')?.addEventListener('click', () => setTimeout(injectAddons, 0));

    // ===== CBAM result disclaimer (prepended, not buried at the bottom) =====
    const CBAM_DISCLAIMER = `
        <div class="v2-disclaimer">
            <span aria-hidden="true">&#9888;</span>
            <div><span class="lang-en"><strong>Indicative estimate &mdash; not a CBAM declaration.</strong> Based on the official Q2 2026 certificate price and IR 2025/2620 benchmarks, but with simplified sector averages. Your actual liability depends on CN codes, verified installation data and official country defaults, which can be materially higher. Full method notes below.</span><span class="lang-zh"><strong>指示性估算——并非CBAM申报。</strong>基于官方2026年第二季度证书价格和IR 2025/2620基准值，但采用简化的行业平均值。实际义务取决于CN编码、经核实的设施数据和官方国家默认值（可能明显更高）。完整方法说明见下方。</span><span class="lang-de"><strong>Indikative Sch&auml;tzung &mdash; keine CBAM-Erkl&auml;rung.</strong> Basiert auf dem offiziellen Zertifikatspreis Q2 2026 und den Benchmarks der IR 2025/2620, jedoch mit vereinfachten Sektordurchschnitten. Die tats&auml;chliche Belastung h&auml;ngt von CN-Codes, verifizierten Anlagendaten und offiziellen L&auml;nder-Standardwerten ab.</span><span class="lang-vi"><strong>Ước t&iacute;nh tham khảo &mdash; kh&ocirc;ng phải khai b&aacute;o CBAM.</strong> Dựa tr&ecirc;n gi&aacute; chứng chỉ Q2 2026 ch&iacute;nh thức v&agrave; chuẩn IR 2025/2620, nhưng d&ugrave;ng mức trung b&igrave;nh ng&agrave;nh đơn giản h&oacute;a. Nghĩa vụ thực tế phụ thuộc m&atilde; CN, dữ liệu cơ sở đ&atilde; x&aacute;c minh v&agrave; gi&aacute; trị mặc định ch&iacute;nh thức theo quốc gia.</span></div>
        </div>`;

    document.getElementById('cbamCalculate')?.addEventListener('click', () => setTimeout(() => {
        const res = document.getElementById('cbamResult');
        if (res && res.innerHTML.trim() && !res.querySelector('.v2-disclaimer') && !res.querySelector('.cbam-error')) {
            res.insertAdjacentHTML('afterbegin', CBAM_DISCLAIMER);
            applyLang(res);
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
            ['Green Sourcing Compass - Regulatory Sheet'],
            ['GCC Sustainability Committee, German Chamber of Commerce Hong Kong'],
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

    // ===== Wizard auto-advance: picking a category moves to step 2 =====
    // Registered after script.js's own .wizard-cat handlers, so the category
    // is already set when this fires; clicking the pane-1 Next button reuses
    // script.js's validation and pane logic. The markets step stays manual
    // (multi-select cannot auto-advance).
    document.querySelectorAll('.wizard-cat').forEach(btn => {
        btn.addEventListener('click', () => setTimeout(() => {
            document.querySelector('.wizard-next[data-next="2"]')?.click();
        }, 150));
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
            if (probe.ok) return; // API available — script.js already rendered
        } catch (e) { /* no API — fall through */ }

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

    // ===== Init =====
    buildExpress();
    cdnFallback();
    const saved = localStorage.getItem('gcc-persona');
    if (saved) applyPersona(saved, false);
})();
