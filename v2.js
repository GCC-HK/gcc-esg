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

    const PAGE = document.body.dataset.v2page || 'hub';

    document.querySelectorAll('.v2-persona-card').forEach(card => {
        card.addEventListener('click', () => {
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
        // Directly after the section header, above the guided wizard — a
        // merchandiser arriving from the hub lands on their tool without
        // any scrolling.
        anchor.insertBefore(el, anchor.children[1] || null);
        applyLang(el);
        document.getElementById('v2ExRun').addEventListener('click', runExpress);
        // "use the guided check below" — #compass points at the section top
        // (where the user already is), so scroll to the wizard block instead
        el.querySelector('.v2-express-head a').addEventListener('click', (ev) => {
            ev.preventDefault();
            el.nextElementSibling?.scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
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
                    const inner = `<span class="v2-mini-chip">${chip.querySelector('strong')?.textContent || ''}<small>d</small></span><span>${label ? label.innerHTML : ''}</span>`;
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
                if (dst && !dst.childElementCount) dst.innerHTML = '<p class="v2-mini-empty"><span class="lang-en">Live content unavailable in this preview — open the full page.</span><span class="lang-zh">预览中暂无实时内容——请打开完整页面。</span><span class="lang-de">Live-Inhalte in dieser Vorschau nicht verf&uuml;gbar.</span><span class="lang-vi">Nội dung trực tiếp không khả dụng trong bản xem trước.</span></p>';
            }
        }
    }

    // ===== Guides page: member gate =====
    // The guide bodies are already protected server-side; this gate replaces
    // the public teaser view with an explicit sign-in ask, per committee
    // decision: the library is a member benefit, not a shop window.
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
                <h3><span class="lang-en">Member area</span><span class="lang-zh">会员专区</span><span class="lang-de">Mitgliederbereich</span><span class="lang-vi">Khu vực thành viên</span></h3>
                <p><span class="lang-en">The in-depth guides are reserved for member companies. Sign in to access the library.</span><span class="lang-zh">深度指南仅面向会员企业。请登录以访问资源库。</span><span class="lang-de">Die Leitf&auml;den sind Mitgliedsunternehmen vorbehalten. Melden Sie sich an, um auf die Bibliothek zuzugreifen.</span><span class="lang-vi">Cẩm nang chuy&ecirc;n s&acirc;u d&agrave;nh ri&ecirc;ng cho c&ocirc;ng ty th&agrave;nh vi&ecirc;n. Đăng nhập để truy cập thư viện.</span></p>
                <a class="btn-gate" href="account.html"><span class="lang-en">Sign in</span><span class="lang-zh">登录</span><span class="lang-de">Anmelden</span><span class="lang-vi">Đăng nhập</span></a>
                <p class="v2-gate-sub"><span class="lang-en">Not a member yet? <a href="https://hongkong.ahk.de/membership" target="_blank" rel="noopener">Join the German Chamber of Commerce Hong Kong</a>.</span><span class="lang-zh">还不是会员？<a href="https://hongkong.ahk.de/membership" target="_blank" rel="noopener">加入香港德国商会</a>。</span><span class="lang-de">Noch kein Mitglied? <a href="https://hongkong.ahk.de/membership" target="_blank" rel="noopener">Werden Sie Mitglied der Deutschen Handelskammer Hongkong</a>.</span><span class="lang-vi">Chưa l&agrave; hội vi&ecirc;n? <a href="https://hongkong.ahk.de/membership" target="_blank" rel="noopener">Gia nhập Ph&ograve;ng Thương mại Đức tại Hồng K&ocirc;ng</a>.</span></p>
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

    // ===== Init =====
    buildExpress();
    cdnFallback();
    fillMinis(0);
    gateGuides();
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
