// Corrections from the 11 August 2026 full fact-audit (all claims re-verified
// against official sources; see PROJECT-LOG.md). Re-runnable.
// Run: SANITY_TOKEN=<editor token> node scripts/seeds/seed-corrections-aug26.js
const TOKEN = process.env.SANITY_TOKEN;
if (!TOKEN) { console.error('SANITY_TOKEN missing'); process.exit(1); }

const API = 'https://bvmxf21v.api.sanity.io/v2024-01-01/data';
const REVIEWED = '2026-08-11';

// ---------------------------------------------------------------------------
// Regulation patches (all four languages kept in sync)
// ---------------------------------------------------------------------------
const regPatches = {

    // Definitive-phase penalties replaced the transitional €10–50/t range on
    // 1 Jan 2026; 50t de-minimis does not cover hydrogen/electricity; the
    // downstream extension now has a 457-product Parliament position.
    cbam: {
        lastReviewed: REVIEWED,
        reasonEn: "As {role} of Construction Products, your iron & steel, cement and aluminium goods fall under CBAM's embedded-emissions declarations. A proposed downstream extension (Commission: ~180 steel/aluminium products; Parliament committee: 457) may broaden coverage from 2028.",
        reasonZh: '{role}建筑材料，其中的钢铁、水泥和铝产品属于CBAM覆盖范围，须申报内含碳排放量。拟议的下游扩展方案（欧盟委员会：约180种钢铝产品；欧洲议会委员会：457种）可能自2028年起扩大覆盖范围。',
        reasonDe: 'Als {role} von Bauprodukten fallen Ihre Eisen- und Stahl-, Zement- und Aluminiumwaren unter die CBAM-Erklärungen für gebundene Emissionen. Eine vorgeschlagene Erweiterung auf nachgelagerte Produkte (Kommission: ca. 180 Stahl-/Aluminiumprodukte; Parlamentsausschuss: 457) könnte den Anwendungsbereich ab 2028 ausweiten.',
        reasonVi: 'Với vai trò {role} đối với Sản phẩm Xây dựng, hàng hóa sắt thép, xi măng và nhôm của quý vị thuộc phạm vi khai báo phát thải hàm chứa của CBAM. Đề xuất mở rộng hạ nguồn (Ủy ban: khoảng 180 sản phẩm thép/nhôm; ủy ban Nghị viện: 457) có thể mở rộng phạm vi áp dụng từ năm 2028.',
        'sections[_key=="s0"].textEn': 'Definitive regime since 1 January 2026: annual CBAM declarations (first due 30 September 2027). Importers below 50 tonnes/year cumulative are exempt under Reg. (EU) 2025/2083 — the threshold does not apply to hydrogen or electricity.',
        'sections[_key=="s0"].textZh': '自2026年1月1日起进入最终机制：每年提交CBAM申报（首份申报截止2027年9月30日）。根据法规 (EU) 2025/2083，年累计进口低于50公吨的进口商可获豁免——该门槛不适用于氢气和电力。',
        'sections[_key=="s0"].textDe': 'Endgültiges Regime seit dem 1. Januar 2026: jährliche CBAM-Erklärungen (erste fällig am 30. September 2027). Importeure unter kumuliert 50 Tonnen/Jahr sind gemäß Verordnung (EU) 2025/2083 befreit — die Schwelle gilt nicht für Wasserstoff und Strom.',
        'sections[_key=="s0"].textVi': 'Cơ chế chính thức từ ngày 1 tháng 1 năm 2026: khai báo CBAM hằng năm (lần đầu hạn chót ngày 30 tháng 9 năm 2027). Nhà nhập khẩu dưới 50 tấn/năm cộng dồn được miễn theo Quy định (EU) 2025/2083 — ngưỡng này không áp dụng cho hydro và điện.',
        'sections[_key=="s2"].textEn': 'Definitive-phase penalties (since 1 January 2026): certificate shortfalls incur the EU ETS excess-emissions penalty (€100 per tonne CO₂e, indexed); imports by non-authorised declarants can be fined three to five times that. (The earlier €10–50/t rates applied only to the transitional phase, which ended 31 December 2025.)',
        'sections[_key=="s2"].textZh': '最终阶段处罚（自2026年1月1日起）：证书不足按欧盟ETS超额排放罚款处理（每公吨CO₂e罚100欧元，随通胀调整）；未经授权申报人进口可处三至五倍罚款。（此前每公吨10至50欧元的标准仅适用于2025年12月31日结束的过渡期。）',
        'sections[_key=="s2"].textDe': 'Sanktionen im endgültigen Regime (seit 1. Januar 2026): Bei Zertifikatsunterdeckung gilt die EU-ETS-Sanktion für Emissionsüberschreitungen (100 € pro Tonne CO₂e, indexiert); Einfuhren durch nicht zugelassene Anmelder können mit dem Drei- bis Fünffachen geahndet werden. (Die früheren 10–50 €/t galten nur für die am 31. Dezember 2025 beendete Übergangsphase.)',
        'sections[_key=="s2"].textVi': 'Mức phạt giai đoạn chính thức (từ ngày 1 tháng 1 năm 2026): thiếu chứng chỉ bị áp mức phạt phát thải vượt mức của EU ETS (100 € mỗi tấn CO₂e, điều chỉnh theo lạm phát); nhập khẩu bởi bên khai báo chưa được cấp phép có thể bị phạt gấp ba đến năm lần. (Mức 10–50 €/tấn trước đây chỉ áp dụng cho giai đoạn chuyển tiếp, kết thúc ngày 31 tháng 12 năm 2025.)'
    },

    // Entity list 144 → 187 (43 added effective 3 Aug 2026 — largest-ever
    // round); apparel added to the base priority-sector list.
    uflpa: {
        lastReviewed: REVIEWED, badge: 'updated', newSince: '2026-08-03',
        'sections[_key=="s0"].textEn': 'Goods with any Xinjiang or Entity-List nexus — at any tier, any input — are presumed made with forced labour and barred from US import. The presumption can only be rebutted with clear and convincing evidence. Entity List: 187 entities (largest addition: 43 entities, effective 3 August 2026 — spanning aluminium, apparel, copper, cotton and tomatoes).',
        'sections[_key=="s0"].textZh': '与新疆或实体清单有任何关联的货物——无论处于哪一层级、哪种原料——均被推定涉及强迫劳动并禁止进入美国。仅凭明确且令人信服的证据方可推翻推定。实体清单：187家实体（最大一次新增：43家，2026年8月3日生效——涵盖铝、服装、铜、棉花和番茄）。',
        'sections[_key=="s0"].textDe': 'Waren mit jeglichem Bezug zu Xinjiang oder zur Entity List — auf jeder Lieferkettenstufe, bei jedem Vorprodukt — gelten als mit Zwangsarbeit hergestellt und sind von der Einfuhr in die USA ausgeschlossen. Die Vermutung kann nur mit klaren und überzeugenden Beweisen widerlegt werden. Entity List: 187 Einträge (größte Erweiterung: 43 Einträge, wirksam ab 3. August 2026 — u. a. Aluminium, Bekleidung, Kupfer, Baumwolle und Tomaten).',
        'sections[_key=="s0"].textVi': 'Hàng hóa có bất kỳ liên hệ nào với Tân Cương hoặc Danh sách Thực thể — ở bất kỳ cấp nào, với bất kỳ nguyên liệu đầu vào nào — đều bị suy đoán là làm bằng lao động cưỡng bức và bị cấm nhập khẩu vào Mỹ. Suy đoán này chỉ có thể bị bác bỏ bằng bằng chứng rõ ràng và thuyết phục. Danh sách Thực thể: 187 thực thể (đợt bổ sung lớn nhất: 43 thực thể, hiệu lực từ ngày 3 tháng 8 năm 2026 — gồm nhôm, may mặc, đồng, bông và cà chua).',
        'sections[_key=="s1"].textEn': 'Full raw-material tracing required. CBP stopped ~7,300 shipments in FY2025 (+51% year on year); only ~6.5% of reviewed shipments were released. Priority sectors: apparel, cotton, polysilicon/solar, tomatoes, aluminium, PVC, seafood — plus, since August 2025: lithium, copper, caustic soda, steel and red dates.',
        'sections[_key=="s1"].textZh': '须实现原材料全程追溯。美国海关与边境保护局（CBP）2025财年拦截约7,300批货物（同比增长51%）；经审查的货物仅约6.5%获放行。重点行业：服装、棉花、多晶硅/光伏、番茄、铝、PVC、海产品——自2025年8月起新增：锂、铜、烧碱、钢铁和红枣。',
        'sections[_key=="s1"].textDe': 'Vollständige Rückverfolgung der Rohstoffe erforderlich. Die CBP stoppte im Haushaltsjahr 2025 rund 7.300 Sendungen (+51 % gegenüber dem Vorjahr); nur rund 6,5 % der geprüften Sendungen wurden freigegeben. Prioritätssektoren: Bekleidung, Baumwolle, Polysilizium/Solar, Tomaten, Aluminium, PVC, Meeresfrüchte — seit August 2025 zusätzlich: Lithium, Kupfer, Natronlauge, Stahl und rote Datteln.',
        'sections[_key=="s1"].textVi': 'Yêu cầu truy xuất toàn bộ nguyên liệu thô. CBP đã chặn khoảng 7.300 lô hàng trong năm tài khóa 2025 (+51% so với năm trước); chỉ khoảng 6,5% lô hàng được kiểm tra được thông quan. Các ngành ưu tiên: may mặc, bông, polysilicon/năng lượng mặt trời, cà chua, nhôm, PVC, hải sản — và từ tháng 8 năm 2025 bổ sung: liti, đồng, xút, thép và táo đỏ.'
    },

    // 1 July 2026 coalition decision: German regime to shrink to CSDDD
    // thresholds at transposition; amendment status softened (final adoption
    // not yet confirmed).
    lksg: {
        lastReviewed: REVIEWED,
        'sections[_key=="s0"].textEn': 'Due diligence obligations remain fully in force for companies with ≥1,000 employees in Germany: risk management and analysis, preventive and remedial measures, complaints mechanism, BAFA oversight. The law was not abolished — but on 1 July 2026 the governing coalition announced plans to narrow the regime to CSDDD thresholds (>5,000 employees & >€1.5B turnover, roughly 150 companies) when transposing the CSDDD, starting autumn 2026.',
        'sections[_key=="s0"].textZh': '对德国境内员工不少于1,000人的企业，尽职调查义务仍完全有效：风险管理与分析、预防和补救措施、投诉机制、联邦经济与出口管制局（BAFA）监督。该法并未废除——但执政联盟于2026年7月1日宣布，计划在转化CSDDD时（自2026年秋季启动）将适用范围缩小至CSDDD门槛（员工超过5,000人且营业额超过15亿欧元，约150家企业）。',
        'sections[_key=="s0"].textDe': 'Die Sorgfaltspflichten gelten für Unternehmen mit ≥1.000 Beschäftigten in Deutschland unverändert fort: Risikomanagement und -analyse, Präventions- und Abhilfemaßnahmen, Beschwerdeverfahren, Aufsicht durch das BAFA. Das Gesetz wurde nicht abgeschafft — der Koalitionsausschuss kündigte jedoch am 1. Juli 2026 an, den Anwendungsbereich bei der CSDDD-Umsetzung (Beginn Herbst 2026) auf die CSDDD-Schwellen (>5.000 Beschäftigte & >1,5 Mrd. € Umsatz, rund 150 Unternehmen) zu verengen.',
        'sections[_key=="s0"].textVi': 'Nghĩa vụ thẩm định vẫn có hiệu lực đầy đủ đối với các công ty có ≥1.000 nhân viên tại Đức: quản lý và phân tích rủi ro, biện pháp phòng ngừa và khắc phục, cơ chế khiếu nại, giám sát của BAFA. Luật này không bị bãi bỏ — tuy nhiên ngày 1 tháng 7 năm 2026, liên minh cầm quyền công bố kế hoạch thu hẹp phạm vi về ngưỡng CSDDD (>5.000 nhân viên & doanh thu >1,5 tỷ €, khoảng 150 công ty) khi chuyển hóa CSDDD, bắt đầu từ mùa thu 2026.',
        'sections[_key=="s1"].textEn': 'The reporting obligation is dead in practice: BAFA deactivated its reporting portal on 7 November 2025, with retroactive relief from 2023. The amendment law (reducing sanctions to serious violations only) had its first Bundestag reading on 16 January 2026 and is still in parliamentary passage.',
        'sections[_key=="s1"].textZh': '报告义务实际上已终止：BAFA于2025年11月7日关闭报告门户，并追溯免除自2023年起的报告义务。修订法案（将处罚缩减至仅针对严重违规）已于2026年1月16日在联邦议院一读，目前仍在议会审议中。',
        'sections[_key=="s1"].textDe': 'Die Berichtspflicht ist in der Praxis tot: Das BAFA hat sein Berichtsportal am 7. November 2025 deaktiviert, mit rückwirkender Entlastung ab 2023. Das Änderungsgesetz (Beschränkung der Sanktionen auf schwere Verstöße) hatte am 16. Januar 2026 seine erste Lesung im Bundestag und befindet sich weiterhin im parlamentarischen Verfahren.',
        'sections[_key=="s1"].textVi': 'Nghĩa vụ báo cáo trên thực tế đã chấm dứt: BAFA đã vô hiệu hóa cổng báo cáo vào ngày 7 tháng 11 năm 2025, với miễn trừ hồi tố từ năm 2023. Luật sửa đổi (thu hẹp chế tài chỉ còn áp dụng cho vi phạm nghiêm trọng) đã được Bundestag đọc lần thứ nhất ngày 16 tháng 1 năm 2026 và vẫn đang trong quá trình quốc hội xem xét.'
    },

    // Per-shipment DDS replaced by first-placer model (Reg. (EU) 2025/2650);
    // July 2026 delegated act trims derived products (e.g. leather).
    eudr: {
        lastReviewed: REVIEWED,
        'sections[_key=="s0"].textEn': 'Due diligence system to verify products are deforestation-free. Geolocation data required for production plots. A July 2026 delegated act (still under Parliament/Council scrutiny) trims derived products — e.g. cattle hides/skins and leather goods come off the list.',
        'sections[_key=="s0"].textZh': '须建立尽职调查体系，核实产品未涉毁林。须提供生产地块的地理定位数据。2026年7月的授权法案（仍待欧洲议会/理事会审查）删减了部分衍生产品——例如牛皮和皮革制品将移出清单。',
        'sections[_key=="s0"].textDe': 'Sorgfaltspflichtensystem zum Nachweis, dass Produkte entwaldungsfrei sind. Geolokalisierungsdaten der Produktionsflächen erforderlich. Ein delegierter Rechtsakt vom Juli 2026 (noch in der Prüfung durch Parlament/Rat) streicht abgeleitete Erzeugnisse — z. B. Rinderhäute/-felle und Lederwaren fallen aus der Liste.',
        'sections[_key=="s0"].textVi': 'Hệ thống thẩm định để xác minh sản phẩm không liên quan đến phá rừng. Yêu cầu dữ liệu định vị địa lý của các lô đất sản xuất. Đạo luật ủy quyền tháng 7 năm 2026 (đang chờ Nghị viện/Hội đồng xem xét) cắt giảm các sản phẩm phái sinh — ví dụ da bò và đồ da sẽ được đưa ra khỏi danh mục.',
        'sections[_key=="s1"].textEn': 'Due diligence statements are filed only by the operator first placing the product on the EU market (Reg. (EU) 2025/2650); downstream companies just retain the DDS reference numbers, and micro/small primary operators file a one-time simplified declaration. Traceability records maintained for 5 years minimum.',
        'sections[_key=="s1"].textZh': '尽职调查声明仅由首次将产品投放欧盟市场的经营者提交（法规 (EU) 2025/2650）；下游企业只需保留声明编号，微型和小型初级经营者提交一次性简化声明即可。可追溯记录至少保存5年。',
        'sections[_key=="s1"].textDe': 'Sorgfaltspflichtenerklärungen gibt nur der Marktteilnehmer ab, der das Produkt erstmals auf dem EU-Markt bereitstellt (Verordnung (EU) 2025/2650); nachgelagerte Unternehmen bewahren lediglich die Referenznummern auf, und Kleinst-/Kleinerzeuger geben eine einmalige vereinfachte Erklärung ab. Rückverfolgbarkeitsaufzeichnungen sind mindestens 5 Jahre aufzubewahren.',
        'sections[_key=="s1"].textVi': 'Tuyên bố thẩm định chỉ do đơn vị lần đầu đưa sản phẩm ra thị trường EU nộp (Quy định (EU) 2025/2650); các doanh nghiệp hạ nguồn chỉ cần lưu số tham chiếu, còn đơn vị sản xuất siêu nhỏ/nhỏ nộp tuyên bố đơn giản hóa một lần. Hồ sơ truy xuất nguồn gốc phải được lưu giữ tối thiểu 5 năm.'
    },

    // RoHS restricts 10 substances (phthalates added 2019); lead-exemption
    // overhaul applicable from 1 July 2026.
    rohs: {
        lastReviewed: REVIEWED,
        'sections[_key=="s0"].textEn': 'Maximum concentration limits for ten substances in electrical/electronic equipment: lead, mercury, cadmium, hexavalent chromium, PBB, PBDE, and the phthalates DEHP, BBP, DBP and DIBP. Note: the Annex III lead/cadmium exemptions were restructured in late 2025 (applicable from 1 July 2026) — re-check any exemption your products rely on.',
        'sections[_key=="s0"].textZh': '对电气电子设备中十种物质设定最高浓度限值：铅、汞、镉、六价铬、多溴联苯（PBB）、多溴二苯醚（PBDE）以及邻苯二甲酸酯DEHP、BBP、DBP和DIBP。注意：附件III的铅/镉豁免条款已于2025年底重组（自2026年7月1日起适用）——请重新核查您产品所依赖的豁免。',
        'sections[_key=="s0"].textDe': 'Höchstkonzentrationswerte für zehn Stoffe in Elektro- und Elektronikgeräten: Blei, Quecksilber, Cadmium, sechswertiges Chrom, PBB, PBDE sowie die Phthalate DEHP, BBP, DBP und DIBP. Hinweis: Die Blei-/Cadmium-Ausnahmen in Anhang III wurden Ende 2025 neu strukturiert (anwendbar ab 1. Juli 2026) — prüfen Sie die von Ihren Produkten genutzten Ausnahmen erneut.',
        'sections[_key=="s0"].textVi': 'Giới hạn nồng độ tối đa đối với mười chất trong thiết bị điện/điện tử: chì, thủy ngân, cadimi, crom hóa trị sáu, PBB, PBDE và các phthalate DEHP, BBP, DBP, DIBP. Lưu ý: các miễn trừ chì/cadimi trong Phụ lục III đã được tái cấu trúc cuối năm 2025 (áp dụng từ ngày 1 tháng 7 năm 2026) — hãy kiểm tra lại các miễn trừ mà sản phẩm của quý vị đang dựa vào.'
    },

    // QR marking is 18 Feb 2027; the general harmonised label date floats on
    // the labelling implementing act (18 Aug 2026 or act + 18 months,
    // whichever is later).
    batteries: {
        lastReviewed: REVIEWED,
        complianceDeadline: '18 February 2027 (battery passport & QR marking), 18 August 2027 (due diligence); harmonised label tied to implementing act (expected late 2027/2028)',
        'sections[_key=="s1"].textEn': 'Battery passport (digital) required for EV, LMT and industrial >2 kWh batteries from 18 February 2027; QR-code marking applies from the same date. The general harmonised label applies from 18 August 2026 or 18 months after the labelling implementing act enters into force, whichever is later — the act was still in draft in early 2026, so expect late 2027/2028. The carbon footprint declaration awaits its delegated act (methodology still pending).',
        'sections[_key=="s1"].textZh': '自2027年2月18日起，电动车、轻型交通工具及2千瓦时以上工业电池须配备数字电池护照；二维码标识自同日起适用。统一标签自2026年8月18日或标签实施法案生效后18个月（以较晚者为准）起适用——该法案2026年初仍为草案，预计实际适用时间为2027年底至2028年。碳足迹声明尚待授权法案（方法学仍未出台）。',
        'sections[_key=="s1"].textDe': 'Digitaler Batteriepass ab dem 18. Februar 2027 für EV-, LMT- und Industriebatterien >2 kWh erforderlich; die QR-Code-Kennzeichnung gilt ab demselben Datum. Das allgemeine harmonisierte Etikett gilt ab dem 18. August 2026 oder 18 Monate nach Inkrafttreten des Kennzeichnungs-Durchführungsrechtsakts — je nachdem, was später eintritt; der Rechtsakt lag Anfang 2026 erst im Entwurf vor, realistisch ist Ende 2027/2028. Die Erklärung zum CO2-Fußabdruck wartet noch auf ihren delegierten Rechtsakt (Methodik steht noch aus).',
        'sections[_key=="s1"].textVi': 'Hộ chiếu pin (kỹ thuật số) bắt buộc đối với pin EV, LMT và pin công nghiệp >2 kWh từ ngày 18 tháng 2 năm 2027; mã QR áp dụng từ cùng ngày. Nhãn hài hòa chung áp dụng từ ngày 18 tháng 8 năm 2026 hoặc 18 tháng sau khi đạo luật thi hành về ghi nhãn có hiệu lực — tùy thời điểm nào muộn hơn; đạo luật này đầu năm 2026 vẫn ở dạng dự thảo, dự kiến thực tế là cuối 2027/2028. Tuyên bố dấu chân carbon đang chờ đạo luật ủy quyền (phương pháp luận vẫn chưa được ban hành).'
    },

    // Transposition deadline passed; Germany adopted its law (Bundesrat
    // 10 July 2026); furniture wording and design-mandate overstatement fixed.
    righttorepair: {
        lastReviewed: REVIEWED,
        complianceDeadline: 'Transposition deadline passed 31 July 2026 — Germany adopted its Reparaturgesetz (Bundesrat approval 10 July 2026); many member states still pending',
        'sections[_key=="s0"].textEn': 'Manufacturers of products already subject to EU reparability requirements (washing machines, dishwashers, refrigerators, vacuum cleaners, displays, phones, tablets, etc.) must repair within a reasonable time at a reasonable price, and supply spare parts and tools. Anti-repair practices (contractual, hardware or software barriers) are prohibited.',
        'sections[_key=="s0"].textZh': '已受欧盟可维修性要求约束的产品（洗衣机、洗碗机、冰箱、吸尘器、显示器、手机、平板电脑等）的制造商须在合理期限内以合理价格提供维修，并供应备件和工具。禁止阻碍维修的做法（合同、硬件或软件障碍）。',
        'sections[_key=="s0"].textDe': 'Hersteller von Produkten mit bestehenden EU-Reparierbarkeitsanforderungen (Waschmaschinen, Geschirrspüler, Kühlschränke, Staubsauger, Displays, Smartphones, Tablets usw.) müssen innerhalb angemessener Frist zu angemessenem Preis reparieren sowie Ersatzteile und Werkzeuge liefern. Reparaturbehindernde Praktiken (vertragliche, Hardware- oder Software-Barrieren) sind verboten.',
        'sections[_key=="s0"].textVi': 'Nhà sản xuất các sản phẩm đã thuộc yêu cầu về khả năng sửa chữa của EU (máy giặt, máy rửa bát, tủ lạnh, máy hút bụi, màn hình, điện thoại, máy tính bảng, v.v.) phải sửa chữa trong thời hạn hợp lý với giá hợp lý, đồng thời cung cấp phụ tùng và công cụ. Cấm các hành vi cản trở sửa chữa (rào cản hợp đồng, phần cứng hoặc phần mềm).',
        'sections[_key=="s1"].textEn': 'Repair information and the European Repair Information Form accessible to consumers and independent repairers. Repair price lists published online (German implementing law).',
        'sections[_key=="s1"].textZh': '维修信息和欧洲维修信息表须向消费者及独立维修商开放。维修价目表须在线公布（德国实施法）。',
        'sections[_key=="s1"].textDe': 'Reparaturinformationen und das Europäische Reparaturinformationsformular müssen Verbrauchern und unabhängigen Reparaturbetrieben zugänglich sein. Reparaturpreislisten sind online zu veröffentlichen (deutsches Umsetzungsgesetz).',
        'sections[_key=="s1"].textVi': 'Thông tin sửa chữa và Mẫu Thông tin Sửa chữa Châu Âu phải được cung cấp cho người tiêu dùng và các đơn vị sửa chữa độc lập. Bảng giá sửa chữa phải công bố trực tuyến (luật thực thi của Đức).'
    },

    // No ESPR delegated act adopted yet; earliest DPP compliance ~2028.
    dpp: {
        lastReviewed: REVIEWED,
        complianceDeadline: 'First delegated acts expected from 2026 (indicative — none adopted yet); DPP obligations expected 2028–2030 (steel first, then textiles, furniture)',
        reasonEn: '{category} are among the first product categories in the ESPR Working Plan (April 2025) requiring a Digital Product Passport with lifecycle data accessible via QR code — obligations expected 2028–2030 (no delegated act adopted yet).',
        reasonZh: '根据ESPR工作计划（2025年4月），{category}是首批需要数字产品护照的产品类别，须通过二维码提供生命周期数据——义务预计于2028至2030年生效（授权法案尚未通过）。',
        reasonDe: '{category} gehören zu den ersten Produktkategorien im ESPR-Arbeitsplan (April 2025), die einen Digitalen Produktpass mit per QR-Code zugänglichen Lebenszyklusdaten benötigen — Pflichten voraussichtlich 2028–2030 (noch kein delegierter Rechtsakt erlassen).',
        reasonVi: '{category} nằm trong số các nhóm sản phẩm đầu tiên trong Kế hoạch Công tác ESPR (tháng 4 năm 2025) phải có Hộ chiếu Sản phẩm Kỹ thuật số với dữ liệu vòng đời truy cập được qua mã QR — nghĩa vụ dự kiến áp dụng 2028–2030 (chưa có đạo luật ủy quyền nào được thông qua).'
    },

    ecodesign: {
        lastReviewed: REVIEWED,
        complianceDeadline: 'First delegated acts expected 2026–2027 (indicative — none adopted as of mid-2026); obligations apply ~18 months after each act'
    },

    // Germany has not transposed CSRD; the €10M/5% figures are the existing
    // HGB regime / pending draft, not adopted CSRD law.
    csrd: {
        lastReviewed: REVIEWED,
        'sections[_key=="s2"].textEn': 'Penalties are set at member-state level and must be effective, proportionate and dissuasive. Germany has not yet transposed CSRD (due by 19 March 2027); its draft transposition act foresees fines up to €10M or 5% of turnover for capital-market-oriented companies, in line with the existing HGB regime.',
        'sections[_key=="s2"].textZh': '处罚由各成员国规定，须有效、相称并具威慑力。德国尚未转化CSRD（期限为2027年3月19日）；其转化法草案对面向资本市场的公司规定最高1,000万欧元或营业额5%的罚款，与现行《商法典》制度一致。',
        'sections[_key=="s2"].textDe': 'Sanktionen werden auf Ebene der Mitgliedstaaten festgelegt und müssen wirksam, verhältnismäßig und abschreckend sein. Deutschland hat die CSRD noch nicht umgesetzt (Frist: 19. März 2027); der Entwurf des Umsetzungsgesetzes sieht für kapitalmarktorientierte Unternehmen Geldbußen von bis zu 10 Mio. € oder 5 % des Umsatzes vor — im Einklang mit dem bestehenden HGB-Regime.',
        'sections[_key=="s2"].textVi': 'Mức phạt do từng quốc gia thành viên quy định và phải hiệu quả, tương xứng và có tính răn đe. Đức chưa chuyển hóa CSRD (hạn chót ngày 19 tháng 3 năm 2027); dự thảo luật chuyển hóa dự kiến mức phạt lên tới 10 triệu € hoặc 5% doanh thu đối với các công ty định hướng thị trường vốn, phù hợp với chế độ HGB hiện hành.'
    },

    // Non-EU companies qualify on EU turnover alone — key for HK/China readers.
    csddd: {
        lastReviewed: REVIEWED,
        reasonEn: 'Under Omnibus I (Directive (EU) 2026/470), companies with >5,000 employees AND >€1.5B turnover must conduct risk-based supply chain due diligence from July 2029. Non-EU companies are in scope on >€1.5B EU turnover alone (no employee test).',
        reasonZh: '根据Omnibus I修订指令（(EU) 2026/470），员工超过5,000人且营业额超过15亿欧元的企业须自2029年7月起开展基于风险的供应链尽职调查。非欧盟企业仅以欧盟境内营业额超过15亿欧元即纳入范围（无员工人数门槛）。',
        reasonDe: 'Nach Omnibus I (Richtlinie (EU) 2026/470) müssen Unternehmen mit >5.000 Beschäftigten UND >1,5 Mrd. € Umsatz ab Juli 2029 eine risikobasierte Sorgfaltsprüfung ihrer Lieferkette durchführen. Nicht-EU-Unternehmen fallen bereits ab >1,5 Mrd. € EU-Umsatz in den Anwendungsbereich (ohne Beschäftigtenschwelle).',
        reasonVi: 'Theo Omnibus I (Chỉ thị (EU) 2026/470), các công ty có >5.000 nhân viên VÀ doanh thu >1,5 tỷ € phải thực hiện thẩm định chuỗi cung ứng dựa trên rủi ro từ tháng 7 năm 2029. Công ty ngoài EU thuộc phạm vi chỉ cần doanh thu tại EU >1,5 tỷ € (không xét số nhân viên).'
    },

    greenclaims: {
        lastReviewed: REVIEWED,
        complianceDeadline: 'Stalled: Commission announced intended withdrawal (June 2025) but has not formally withdrawn it — still listed in the 2026 work programme; adoption not currently expected'
    },

    // Labelling duty live since Oct 2025; first quantity reports were due
    // 31 May 2026.
    microplastics: {
        lastReviewed: REVIEWED,
        'sections[_key=="s1"].textEn': 'Instructions for use to minimise microplastic release — mandatory since 17 October 2025. Reporting obligations on quantities placed on the market (first annual reports were due 31 May 2026).',
        'sections[_key=="s1"].textZh': '须提供减少微塑料释放的使用说明——自2025年10月17日起为强制要求。对投放市场的数量负有报告义务（首份年度报告已于2026年5月31日到期）。',
        'sections[_key=="s1"].textDe': 'Gebrauchsanweisungen zur Minimierung der Mikroplastikfreisetzung — verpflichtend seit dem 17. Oktober 2025. Berichtspflichten über die in Verkehr gebrachten Mengen (erste Jahresberichte waren zum 31. Mai 2026 fällig).',
        'sections[_key=="s1"].textVi': 'Hướng dẫn sử dụng nhằm giảm thiểu phát tán vi nhựa — bắt buộc từ ngày 17 tháng 10 năm 2025. Nghĩa vụ báo cáo về số lượng đưa ra thị trường (báo cáo thường niên đầu tiên đến hạn ngày 31 tháng 5 năm 2026).'
    },

    // July 2026 secondary legislation made; registration opens Q4 2026.
    ukcbam: {
        lastReviewed: REVIEWED,
        'sections[_key=="s0"].textEn': 'A tax on embedded emissions administered by HMRC — no certificates to buy, unlike EU CBAM. Covered sectors: aluminium, cement, fertilisers, hydrogen, iron & steel (glass and ceramics excluded for now). First accounting period is calendar year 2027, quarterly thereafter. Core secondary legislation was made in July 2026; registration opens via Government Gateway in Q4 2026, with a first-year registration deadline of 31 January 2028.',
        'sections[_key=="s0"].textZh': '由英国税务海关总署（HMRC）征收的内含排放税——与欧盟CBAM不同，无需购买证书。覆盖行业：铝、水泥、化肥、氢气、钢铁（玻璃和陶瓷暂不包括）。首个申报期为2027整个日历年，此后按季度申报。核心配套法规已于2026年7月颁布；注册通道于2026年第四季度通过Government Gateway开放，首年注册截止日为2028年1月31日。',
        'sections[_key=="s0"].textDe': 'Eine von HMRC verwaltete Steuer auf gebundene Emissionen — anders als beim EU-CBAM sind keine Zertifikate zu kaufen. Erfasste Sektoren: Aluminium, Zement, Düngemittel, Wasserstoff, Eisen & Stahl (Glas und Keramik vorerst ausgenommen). Erster Abrechnungszeitraum ist das Kalenderjahr 2027, danach vierteljährlich. Die zentralen Durchführungsverordnungen wurden im Juli 2026 erlassen; die Registrierung öffnet im 4. Quartal 2026 über das Government Gateway, mit einer Registrierungsfrist für das erste Jahr bis zum 31. Januar 2028.',
        'sections[_key=="s0"].textVi': 'Thuế đánh vào phát thải hàm chứa do HMRC quản lý — khác với CBAM của EU, không phải mua chứng chỉ. Các ngành thuộc phạm vi: nhôm, xi măng, phân bón, hydro, sắt thép (thủy tinh và gốm sứ tạm thời chưa bao gồm). Kỳ kế toán đầu tiên là cả năm dương lịch 2027, sau đó theo quý. Các văn bản pháp quy cốt lõi đã ban hành tháng 7 năm 2026; đăng ký mở qua Government Gateway trong quý 4 năm 2026, hạn đăng ký năm đầu là ngày 31 tháng 1 năm 2028.'
    }
};

// ---------------------------------------------------------------------------
// Deadline patches
// ---------------------------------------------------------------------------
const deadlineMutations = [
    // QR marking is 18 Feb 2027, not 18 Aug 2026 — the wrong row is removed
    // and the passport row covers both obligations.
    { delete: { id: 'deadline-battery-labelling' } },
    { patch: { id: 'deadline-battery-passport', set: {
        labelEn: 'Battery passport (EV, LMT, industrial >2 kWh) & QR marking apply',
        labelZh: '电池护照（EV、LMT、2千瓦时以上工业电池）及二维码标识开始适用'
    } } },
    { patch: { id: 'deadline-r2r-transposition', set: {
        affects: 'Household appliances & electronics sold in the EU',
        affectsZh: '在欧盟销售的家用电器和电子产品'
    } } },
    { patch: { id: 'deadline-cbam-downstream', set: {
        labelEn: 'CBAM downstream extension (180–457 steel/aluminium products, under negotiation) — proposed',
        labelZh: 'CBAM下游扩展（180至457种钢铝产品，谈判中）——提案阶段'
    } } }
];

// ---------------------------------------------------------------------------
// News-post patches (structured fields)
// ---------------------------------------------------------------------------
const newsFieldMutations = [
    // REACH: the comprehensive revision was cancelled on 27 April 2026 —
    // the post's premise ("delayed, polymer registration coming") was already
    // wrong at publication. Full reframe.
    { patch: { id: null, query: '*[_type=="newsPost" && slug.current=="reach-revision-delayed-polymers"]', set: {
        titleEn: 'REACH overhaul shelved — polymer registration on hold, targeted fixes instead',
        titleZh: 'REACH全面修订被搁置——聚合物注册暂缓，改走针对性修补路线',
        whatHappenedEn: 'The comprehensive REACH revision — the biggest chemicals-law overhaul in two decades — has been shelved: on 27 April 2026 Environment Commissioner Roswall told the Parliament\'s environment committee that "now is not the time to revise REACH". The Commission will instead pursue simplification and targeted technical updates through existing procedures. The draft\'s headline elements — 10-year registration validity, digital safety data and, most consequentially, registration of polymers above 1 tonne per year — are on hold with no new timetable.',
        whatHappenedZh: '酝酿二十年来最大规模化学品法规改革的REACH全面修订已被搁置：2026年4月27日，环境专员Roswall在欧洲议会环境委员会表示"现在不是修订REACH的时候"。欧盟委员会将转而通过现有程序推进简化和针对性技术更新。草案中的核心内容——注册10年有效期、数字化安全数据，以及影响最大的年产1吨以上聚合物注册义务——均被暂缓，且无新时间表。',
        whyItMattersEn: 'Polymer registration would have reached plastics, textiles and coatings supply chains that have never dealt with REACH registration. That burden is off the table for now — but existing REACH restrictions (microplastics, PFAS proceedings) continue unchanged, and the plans could return under a future Commission.',
        whyItMattersZh: '聚合物注册原本会波及从未接触过REACH注册的塑料、纺织和涂料供应链。这一负担目前暂告解除——但现行REACH限制（微塑料、PFAS程序）继续有效，且相关计划未来仍可能重启。',
        supplierActionEn: 'No new registration burden for now. Keep tracking existing REACH restrictions that already apply to your products (microplastics, lead, the pending universal PFAS restriction) — those continue regardless of the shelved overhaul.',
        supplierActionZh: '目前没有新的注册负担。请继续关注已适用于您产品的现行REACH限制（微塑料、铅、待决的全面PFAS限制）——这些不受修订搁置影响，继续有效。',
        sources: [
            'https://cen.acs.org/policy/chemical-regulation/europe-reach-chemical-regulation-shelved/104/web/2026/04',
            'https://www.cirs-group.com/en/chemicals/official-announcement-eu-reach-comprehensive-revision-plan-reach-nearly-six-years-in-the-making-put-on-hold'
        ]
    } } },

    // Right to Repair: deadline has passed; Germany adopted its law.
    { patch: { id: null, query: '*[_type=="newsPost" && slug.current=="right-to-repair-transposition-deadline"]', set: {
        whatHappenedEn: 'The deadline for EU member states to transpose the Right to Repair Directive (EU) 2024/1799 into national law passed on 31 July 2026 — with only a handful of member states having notified complete transposition. Germany made it essentially on time: the Bundestag passed the Reparaturgesetz on 26 June and the Bundesrat approved it on 10 July 2026.',
        whatHappenedZh: '欧盟成员国将维修权指令 (EU) 2024/1799 转化为国内法的期限已于2026年7月31日届满——仅少数成员国通报完成转化。德国基本按期完成：联邦议院于6月26日通过《维修法》，联邦参议院于2026年7月10日批准。',
        supplierActionEn: 'Germany\'s law is now in force — review spare-part supply commitments with your EU buyers; late transposition elsewhere does not delay the obligations once they arrive.',
        supplierActionZh: '德国的法律现已生效——请与欧盟买家确认备件供应承诺；其他成员国的转化延迟并不推迟义务本身。',
        sources: [
            'https://repair.eu/news/the-right-to-repair-directive/',
            'https://www.freshfields.com/en/our-thinking/blogs/risk-and-compliance/repair-instead-of-replace-germany-moves-to-implement-the-eu-right-to-repair-dire-102mgn4',
            'https://commission.europa.eu/law/law-topic/consumer-protection-law/directive-repair-goods_en'
        ]
    } } },

    // EUDR post: the July delegated act REMOVES leather from scope — the
    // "leather goods are in scope" line said the opposite.
    { patch: { id: null, query: '*[_type=="newsPost" && slug.current=="eudr-product-list-it-system-final"]', set: {
        whyItMattersEn: 'Rubber, timber and paper/packaging goods shipped from China to the EU remain in scope — while cattle hides/skins and leather goods come OFF the list under the July delegated act (still subject to Parliament/Council scrutiny). The finalised IT system defines exactly what geolocation and due-diligence data importers will demand from their supply chains.',
        whyItMattersZh: '从中国输往欧盟的橡胶、木材和纸张/包装产品仍在范围内——而根据7月授权法案（仍待欧洲议会/理事会审查），牛皮和皮革制品将移出清单。最终确定的信息系统明确了进口商将向供应链索取的地理定位和尽职调查数据。'
    } } }
];

// ---------------------------------------------------------------------------
// Portable-Text body fixes (fetch → string-replace → set)
// ---------------------------------------------------------------------------
const bodyReplacements = [
    { slug: 'gpsr-responsible-person-setup', field: 'bodyEn',
      from: 'name and postal or electronic address', to: 'name, postal address and electronic address (both are required)' },
    { slug: 'gpsr-responsible-person-setup', field: 'bodyZh',
      from: '名称及邮政或电子地址', to: '名称、邮政地址及电子地址（两者均为必填）' },
    { slug: 'cbam-data-checklist', field: 'bodyEn',
      from: 'Default values — and from 2027 the CBAM benchmarks — are route-specific',
      to: 'Default values and the CBAM benchmarks (IR 2025/2620 and 2025/2621) are route-specific' }
];

// ---------------------------------------------------------------------------
async function mutate(mutations) {
    const r = await fetch(`${API}/mutate/production`, {
        method: 'POST',
        headers: { Authorization: `Bearer ${TOKEN}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({ mutations })
    });
    const b = await r.json();
    if (!r.ok) throw new Error(JSON.stringify(b));
    return b;
}

async function query(groq) {
    const r = await fetch(`${API}/query/production?query=${encodeURIComponent(groq)}`);
    const b = await r.json();
    if (!r.ok) throw new Error(JSON.stringify(b));
    return b.result;
}

(async () => {
    // 1. Regulations
    const regMutations = Object.entries(regPatches).map(([id, set]) => ({
        patch: { id: `regulation-${id}`, set }
    }));
    await mutate(regMutations);
    console.log(`OK regulations: ${regMutations.length} patched`);

    // 2. Deadlines
    await mutate(deadlineMutations);
    console.log(`OK deadlines: ${deadlineMutations.length} mutations (1 delete, 3 patches)`);

    // 3. News structured fields (resolve slugs to ids first)
    for (const m of newsFieldMutations) {
        const doc = await query(m.patch.query + '[0]{_id}');
        if (!doc) { console.warn(`SKIP news (not found): ${m.patch.query}`); continue; }
        await mutate([{ patch: { id: doc._id, set: m.patch.set } }]);
        console.log(`OK news fields: ${doc._id}`);
    }

    // 4. Portable-Text body string fixes
    for (const rep of bodyReplacements) {
        const doc = await query(`*[_type=="newsPost" && slug.current=="${rep.slug}"][0]{_id, ${rep.field}}`);
        if (!doc || !doc[rep.field]) { console.warn(`SKIP body (not found): ${rep.slug}.${rep.field}`); continue; }
        let hit = false;
        const body = doc[rep.field].map(block => {
            if (!block.children) return block;
            return { ...block, children: block.children.map(span => {
                if (span.text && span.text.includes(rep.from)) { hit = true; return { ...span, text: span.text.split(rep.from).join(rep.to) }; }
                return span;
            }) };
        });
        if (!hit) { console.log(`no-op (already fixed): ${rep.slug}.${rep.field}`); continue; }
        await mutate([{ patch: { id: doc._id, set: { [rep.field]: body } } }]);
        console.log(`OK body fix: ${rep.slug}.${rep.field}`);
    }

    console.log('All corrections applied.');
})().catch(e => { console.error(e); process.exit(1); });
