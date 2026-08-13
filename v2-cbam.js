// V2 CBAM calculator engine. Replaces the shared script.js calculator on V2
// pages: official country default values (IR 2025/2621 as corrected),
// year-aware CBAM factor and mark-up, aluminium product-form add-ons,
// user-entered carbon price actually paid, and a 2026–2034 projection with
// a certificate-price sensitivity band. Data lives in v2-cbam-data.js.
(function () {
    'use strict';
    const D = window.V2CBAM;
    const btn = document.getElementById('cbamCalculate');
    if (!D || !btn) return;

    // Strip the script.js listeners by cloning the interactive nodes the
    // engine owns (v1 behaviour must not double-fire underneath).
    const own = {};
    for (const id of ['cbamCalculate', 'cbamSector', 'cbamCountry']) {
        const el = document.getElementById(id);
        const clone = el.cloneNode(true);
        el.replaceWith(clone);
        own[id] = clone;
    }

    const $ = (id) => document.getElementById(id);
    const fmt = (n, d = 0) => n.toLocaleString('en-US', { minimumFractionDigits: d, maximumFractionDigits: d });

    function span4(en, zh, de, vi) {
        return `<span class="lang-en">${en}</span><span class="lang-zh">${zh}</span><span class="lang-de">${de}</span><span class="lang-vi">${vi}</span>`;
    }

    const DISC = `<div class="v2-disclaimer"><span aria-hidden="true">&#9888;</span><div><span class="lang-en"><strong>Indicative estimate &mdash; not a CBAM declaration.</strong> Official prices, benchmarks and country default values are applied where available, but your actual liability depends on exact CN codes and verified installation data. Method notes below.</span><span class="lang-zh"><strong>指示性估算——并非CBAM申报。</strong>已尽可能采用官方价格、基准值和国家默认值，但实际义务取决于具体CN编码和经核实的设施数据。方法说明见下方。</span><span class="lang-de"><strong>Indikative Sch&auml;tzung &mdash; keine CBAM-Erkl&auml;rung.</strong> Offizielle Preise, Benchmarks und L&auml;nder-Standardwerte werden angewendet; die tats&auml;chliche Belastung h&auml;ngt von CN-Codes und verifizierten Anlagendaten ab.</span><span class="lang-vi"><strong>Ước t&iacute;nh tham khảo &mdash; kh&ocirc;ng phải khai b&aacute;o CBAM.</strong> Đ&atilde; &aacute;p dụng gi&aacute;, chuẩn v&agrave; gi&aacute; trị mặc định ch&iacute;nh thức khi c&oacute;; nghĩa vụ thực tế phụ thuộc m&atilde; CN v&agrave; dữ liệu cơ sở đ&atilde; x&aacute;c minh.</span></div></div>`;

    function selection() {
        return {
            sector: own.cbamSector.value,
            country: own.cbamCountry.value,
            year: parseInt($('v2CbamYear')?.value || '2026', 10),
            aluForm: $('v2AluForm')?.value || 'unwrought',
            volume: parseFloat($('cbamVolume').value),
            emMode: document.querySelector('input[name="cbamEmissionsMode"]:checked')?.value || 'default',
            bmMode: document.querySelector('input[name="cbamBenchmarkMode"]:checked')?.value || 'default',
            role: document.querySelector('input[name="cbamRole"]:checked')?.value || 'supplier',
            pricePaidInput: parseFloat($('v2PricePaid')?.value)
        };
    }

    // Official country default (corrected Annex I; mark-up applied for the
    // given year). Countries with missing entries use the regulation's own
    // "Other Countries" values. Returns the route-implied benchmark bucket
    // for steel/aluminium, since Annex I fixes the route per origin.
    const SECTOR_KEY = { steel_bof: 'steel', steel_dri_eaf: 'steel', steel_eaf: 'steel',
        aluminium_primary: 'alu', aluminium_secondary: 'alu',
        cement: 'cement', fertilisers: 'fertilisers', urea: 'urea', hydrogen: 'hydrogen' };

    function defaultEmissions(sector, country, year) {
        const key = SECTOR_KEY[sector];
        let entry = D.defaults[country]?.[key];
        let viaOther = false;
        if (entry == null && D.defaults.OTHER?.[key] != null) { entry = D.defaults.OTHER[key]; viaOther = true; }
        if (entry != null) {
            const v = D.defaultsIncludeMarkup ? entry.v : entry.v * (1 + D.markup(year, sector));
            return { value: v, official: true, viaOther, routeBucket: entry.route ? D.routeBuckets[entry.route] : sector };
        }
        return { value: D.sectorAvg[sector], official: false, viaOther: false, routeBucket: sector };
    }

    function benchmark(bucket, aluForm) {
        let b = D.benchmarks[bucket];
        if (bucket.startsWith('aluminium')) b += D.aluAddon[aluForm] || 0;
        return b;
    }

    function costPerTonne(E, B, year, pricePaid) {
        const factor = D.factors[year] ?? 0;
        const liable = Math.max(0, E - B * factor);
        const ratio = Math.min(1, (pricePaid || 0) / D.meta.price);
        return { liable, net: liable * (1 - ratio), cost: liable * (1 - ratio) * D.meta.price, factor };
    }

    // ===== live default displays =====
    function updateDisplays() {
        const s = selection();
        const emD = $('cbamEmissionsDefault');
        const bmD = $('cbamBenchmarkDefault');
        if ($('v2AluFormGroup')) $('v2AluFormGroup').style.display = s.sector.startsWith('aluminium') ? '' : 'none';
        if (!s.sector) {
            const pick = span4('Select a sector to see the default value', '请先选择产品类别以查看默认值', 'Sektor wählen, um den Standardwert zu sehen', 'Chọn lĩnh vực để xem giá trị mặc định');
            emD.innerHTML = pick; bmD.innerHTML = pick;
            return;
        }
        const de = defaultEmissions(s.sector, s.country, s.year);
        emD.innerHTML = de.official
            ? span4(`Official EU default for your country, ${s.year} (incl. mark-up): ${fmt(de.value, 3)} tCO₂e/t`,
                    `贵国官方欧盟默认值（${s.year}年，含上浮）：${fmt(de.value, 3)} tCO₂e/t`,
                    `Offizieller EU-Standardwert für Ihr Land, ${s.year} (inkl. Aufschlag): ${fmt(de.value, 3)} tCO₂e/t`,
                    `Giá trị mặc định chính thức của EU cho nước bạn, ${s.year} (gồm phụ phí): ${fmt(de.value, 3)} tCO₂e/t`)
            : span4(`Indicative sector average: ${fmt(de.value, 2)} tCO₂e/t (no official country default on file for this selection)`,
                    `指示性行业平均值：${fmt(de.value, 2)} tCO₂e/t（该选择暂无官方国家默认值）`,
                    `Indikativer Sektordurchschnitt: ${fmt(de.value, 2)} tCO₂e/t`,
                    `Trung bình ngành tham khảo: ${fmt(de.value, 2)} tCO₂e/t`);
        const b = benchmark(de.official ? de.routeBucket : s.sector, s.aluForm);
        bmD.innerHTML = span4(`CBAM benchmark (IR 2025/2620): ${fmt(b, 3)} tCO₂e/t`, `CBAM基准值（IR 2025/2620）：${fmt(b, 3)} tCO₂e/t`,
                              `CBAM-Benchmark (IR 2025/2620): ${fmt(b, 3)} tCO₂e/t`, `Chuẩn CBAM (IR 2025/2620): ${fmt(b, 3)} tCO₂e/t`);
        const hint = $('v2PricePaidHint');
        if (hint) {
            const hp = D.carbonPrices[s.country];
            hint.innerHTML = s.country
                ? span4(`If empty, the headline price ≈ €${hp ?? 0}/t is assumed — actual credit counts only the price effectively paid.`,
                        `留空则按标价约 €${hp ?? 0}/t 估算——实际抵扣仅计有效支付的碳价。`,
                        `Leer: Näherung mit Listenpreis ≈ €${hp ?? 0}/t.`,
                        `Bỏ trống: dùng giá tham chiếu ≈ €${hp ?? 0}/t.`)
                : '';
        }
    }
    ['change', 'input'].forEach(ev => {
        own.cbamSector.addEventListener(ev, updateDisplays);
        own.cbamCountry.addEventListener(ev, updateDisplays);
        $('v2CbamYear')?.addEventListener(ev, updateDisplays);
        $('v2AluForm')?.addEventListener(ev, updateDisplays);
    });

    // ===== calculate =====
    own.cbamCalculate.addEventListener('click', () => {
        const s = selection();
        const out = $('cbamResult');
        if (!s.sector || !s.country || isNaN(s.volume) || s.volume <= 0) {
            out.innerHTML = `<div class="cbam-result-card cbam-error">${span4('Please select a sector, country, and enter a valid volume.', '请选择产品类别、原产国并输入有效数量。', 'Bitte Sektor, Land und gültige Menge angeben.', 'Vui lòng chọn lĩnh vực, quốc gia và nhập khối lượng hợp lệ.')}</div>`;
            return;
        }

        const deInfo0 = defaultEmissions(s.sector, s.country, s.year);
        let E, official = false;
        if (s.emMode === 'custom') {
            E = parseFloat($('cbamCustomEmissions').value);
            if (isNaN(E) || E < 0) { out.innerHTML = `<div class="cbam-result-card cbam-error">${span4('Please enter a valid emissions intensity.', '请输入有效的排放强度。', 'Bitte gültige Emissionsintensität eingeben.', 'Vui lòng nhập cường độ phát thải hợp lệ.')}</div>`; return; }
        } else {
            E = deInfo0.value; official = deInfo0.official;
        }
        const bmBucket = (s.emMode !== 'custom' && deInfo0.official) ? deInfo0.routeBucket : s.sector;
        let B = benchmark(bmBucket, s.aluForm);
        if (s.bmMode === 'custom') {
            const v = parseFloat($('cbamCustomBenchmark').value);
            if (!isNaN(v) && v >= 0) B = v;
        }
        const paid = !isNaN(s.pricePaidInput) ? s.pricePaidInput : (D.carbonPrices[s.country] || 0);
        const r = costPerTonne(E, B, s.year, paid);
        const total = r.cost * s.volume;

        const badge = total < 10000 ? ['cbam-badge-low', 'LOW EXPOSURE', '低风险'] : total <= 100000 ? ['cbam-badge-medium', 'MEDIUM EXPOSURE', '中等风险'] : ['cbam-badge-high', 'HIGH EXPOSURE', '高风险'];
        const emissionsLabel = s.emMode === 'custom'
            ? span4('your verified value', '您的核实数值', 'Ihr verifizierter Wert', 'giá trị đã xác minh của bạn')
            : official
                ? (deInfo0.viaOther
                    ? span4(`official EU default — Annex I "Other Countries" value (${s.year}, incl. mark-up; no country-specific entry)`, `官方欧盟默认值——附件I"其他国家"数值（${s.year}年，含上浮；无国别条目）`, `offizieller EU-Standardwert — Annex-I-Wert „übrige Länder" (${s.year})`, `giá trị mặc định chính thức của EU — mục "các nước khác" Phụ lục I (${s.year})`)
                    : span4(`official EU default for your country (${s.year}, incl. mark-up)`, `贵国官方欧盟默认值（${s.year}年，含上浮）`, `offizieller EU-Standardwert (${s.year})`, `giá trị mặc định chính thức của EU (${s.year})`))
                : span4('indicative sector average — no official country default on file', '指示性行业平均值——暂无官方国家默认值', 'indikativer Sektordurchschnitt', 'trung bình ngành tham khảo');

        // projection 2026–2034 with same inputs, per-year factor & mark-up
        const years = Object.keys(D.factors).map(Number).sort();
        const proj = years.map(y => {
            let Ey = E;
            if (s.emMode !== 'custom') {
                const dy = defaultEmissions(s.sector, s.country, y);
                Ey = dy.value;
            }
            const base = costPerTonne(Ey, B, y, paid).cost;
            const liableNet = base / D.meta.price; // net tCO2e per tonne at base price
            return { y, base, lo: liableNet * Math.max(0, D.meta.price - D.meta.sensitivity), hi: liableNet * (D.meta.price + D.meta.sensitivity) };
        });
        const maxHi = Math.max(...proj.map(p => p.hi), 1);
        const bars = proj.map(p => `
            <div class="v2-proj-col">
                <span class="v2-proj-val">€${fmt(p.base)}</span>
                <div class="v2-proj-bar ${p.y === s.year ? 'v2-proj-now' : ''}" style="height:${Math.max(2, Math.round(p.base / maxHi * 100))}%">
                    <div class="v2-proj-band" style="bottom:auto"></div>
                </div>
                <span class="v2-proj-year">${p.y}</span>
            </div>`).join('');

        out.innerHTML = DISC + `
            <div class="cbam-result-card">
                <span class="badge ${badge[0]}"><span class="lang-en">${badge[1]}</span><span class="lang-zh">${badge[2]}</span><span class="lang-de">${badge[1]}</span><span class="lang-vi">${badge[1]}</span></span>
                <h3>${span4(`Estimated CBAM cost, ${s.year}`, `CBAM成本估算（${s.year}年）`, `Geschätzte CBAM-Kosten, ${s.year}`, `Chi phí CBAM ước tính, ${s.year}`)}</h3>
                <p class="v2-cbam-headline"><strong>€${fmt(r.cost, 2)}</strong> ${span4('per tonne', '每公吨', 'pro Tonne', 'mỗi tấn')} · <strong>≈ €${fmt(total)}</strong> ${span4(`per year at ${fmt(s.volume)} t`, `每年（按${fmt(s.volume)}公吨计）`, `pro Jahr bei ${fmt(s.volume)} t`, `mỗi năm với ${fmt(s.volume)} tấn`)}</p>
                <ul class="v2-cbam-lines">
                    <li>${span4(`Emissions intensity: ${fmt(E, 3)} tCO₂e/t — `, `排放强度：${fmt(E, 3)} tCO₂e/t——`, `Emissionsintensität: ${fmt(E, 3)} tCO₂e/t — `, `Cường độ phát thải: ${fmt(E, 3)} tCO₂e/t — `)}${emissionsLabel}</li>
                    <li>${span4(`Benchmark deduction: ${fmt(B, 3)} × ${fmt(r.factor * 100, 1)}% CBAM factor (${s.year})`, `基准扣减：${fmt(B, 3)} × ${fmt(r.factor * 100, 1)}%（${s.year}年CBAM因子）`, `Benchmark-Abzug: ${fmt(B, 3)} × ${fmt(r.factor * 100, 1)}%`, `Khấu trừ chuẩn: ${fmt(B, 3)} × ${fmt(r.factor * 100, 1)}%`)}${(s.emMode !== 'custom' && deInfo0.official && bmBucket !== s.sector) ? ' ' + span4(`(Annex I assumes the ${bmBucket.includes('bof') ? 'BF-BOF' : bmBucket.includes('dri') ? 'DRI-EAF' : bmBucket.includes('eaf') ? 'scrap-EAF' : bmBucket.includes('primary') ? 'primary' : 'secondary'} route for this origin)`, '（附件I按该原产国假定的生产路线取基准）', '(Annex I legt die Route für dieses Ursprungsland fest)', '(Phụ lục I ấn định tuyến sản xuất theo xuất xứ)') : ''}</li>
                    <li>${span4(`Carbon price credited: €${fmt(paid, 2)}/t (${!isNaN(s.pricePaidInput) ? 'as entered' : 'headline estimate'})`, `碳价抵扣：€${fmt(paid, 2)}/t（${!isNaN(s.pricePaidInput) ? '按输入值' : '按标价估算'}）`, `Angerechneter CO₂-Preis: €${fmt(paid, 2)}/t`, `Giá carbon được khấu trừ: €${fmt(paid, 2)}/t`)}</li>
                    <li>${span4(`Certificate price: €${D.meta.price}/tCO₂e (official ${D.meta.priceLabel})`, `证书价格：€${D.meta.price}/tCO₂e（${D.meta.priceLabel}官方价）`, `Zertifikatspreis: €${D.meta.price}/tCO₂e`, `Giá chứng chỉ: €${D.meta.price}/tCO₂e`)}</li>
                </ul>
                ${s.volume < 50 ? `<div class="cbam-callout">${span4('Below 50 t/year cumulative you are likely exempt (Reg. (EU) 2025/2083) — threshold does not apply to hydrogen.', '年累计低于50公吨很可能豁免（法规 (EU) 2025/2083）——该门槛不适用于氢。', 'Unter 50 t/Jahr kumuliert voraussichtlich befreit (VO (EU) 2025/2083).', 'Dưới 50 tấn/năm cộng dồn có thể được miễn (QĐ (EU) 2025/2083).')}</div>` : ''}
            </div>
            <div class="v2-proj">
                <h4>${span4('Cost per tonne through 2034 (same inputs, official phase-in)', '至2034年每吨成本（相同输入，按官方过渡时间表）', 'Kosten pro Tonne bis 2034', 'Chi phí mỗi tấn đến 2034')}</h4>
                <p class="v2-proj-sub">${span4(`Free allocation phases out to zero by 2034 under current law; default-value mark-up rises to +30% from 2028. Certificate price held at €${D.meta.price} — sensitivity ±€${D.meta.sensitivity} shifts each bar proportionally.`, `根据现行法律，免费配额至2034年降为零；默认值上浮自2028年起升至+30%。证书价格按€${D.meta.price}固定——±€${D.meta.sensitivity}的敏感区间按比例影响各柱。`, `Kostenlose Zuteilung läuft bis 2034 aus; Aufschlag steigt ab 2028 auf +30%.`, `Phân bổ miễn phí giảm về 0 vào 2034; phụ phí tăng lên +30% từ 2028.`)}</p>
                <div class="v2-proj-chart">${bars}</div>
                <p class="v2-src-note">${span4(`Sources: Reg. (EU) 2023/956 (as amended), IR 2025/2620 benchmarks, IR 2025/2621 default values as corrected by IR 2026/1740. Data reviewed ${D.meta.reviewed}. Indicative screening — not a CBAM declaration.`, `来源：法规 (EU) 2023/956（经修订）、IR 2025/2620基准值、IR 2025/2621默认值（经IR 2026/1740更正）。数据核查日期：${D.meta.reviewed}。指示性估算——并非CBAM申报。`, `Quellen: VO (EU) 2023/956, IR 2025/2620, IR 2025/2621 i.d.F. IR 2026/1740. Stand ${D.meta.reviewed}.`, `Nguồn: QĐ (EU) 2023/956, IR 2025/2620, IR 2025/2621 (sửa đổi bởi IR 2026/1740). Rà soát ${D.meta.reviewed}.`)}</p>
            </div>`;
        applyLang(out);
        out.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    });

    updateDisplays();
})();
