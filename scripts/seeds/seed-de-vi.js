// Adds German (textDe/reasonDe) and Vietnamese (textVi/reasonVi) translations
// to all 20 regulation documents. Re-sets the full sections array per regulation.
// Usage: SANITY_TOKEN=... node seed-de-vi.js
const TOKEN = process.env.SANITY_TOKEN;
if (!TOKEN) { console.error('SANITY_TOKEN missing'); process.exit(1); }

const R = {
    csrd: {
        sections: [
            { title: 'REPORTING',
              textEn: 'Double materiality assessment required. Report under European Sustainability Reporting Standards (ESRS) with third-party assurance.',
              textZh: '须进行双重重要性评估。按照欧洲可持续发展报告准则（ESRS）报告，并经第三方鉴证。',
              textDe: 'Eine doppelte Wesentlichkeitsanalyse ist erforderlich. Berichterstattung nach den European Sustainability Reporting Standards (ESRS) mit Prüfung durch Dritte.',
              textVi: 'Yêu cầu đánh giá tính trọng yếu kép. Báo cáo theo Chuẩn mực Báo cáo Phát triển Bền vững Châu Âu (ESRS) với sự bảo đảm của bên thứ ba.' },
            { title: 'SUPPLY CHAIN',
              textEn: 'Disclosure of Scope 3 emissions, supply chain due diligence processes, and supplier sustainability performance. Smaller suppliers are indirectly affected via their EU buyer\'s reporting obligations.',
              textZh: '须披露范围三排放、供应链尽职调查流程及供应商可持续发展表现。较小的供应商通过其欧盟买家的报告义务间接受到影响。',
              textDe: 'Offenlegung von Scope-3-Emissionen, Sorgfaltsprüfungsprozessen in der Lieferkette und der Nachhaltigkeitsleistung von Lieferanten. Kleinere Lieferanten sind über die Berichtspflichten ihrer EU-Abnehmer indirekt betroffen.',
              textVi: 'Công bố phát thải Phạm vi 3, quy trình thẩm định chuỗi cung ứng và hiệu quả phát triển bền vững của nhà cung cấp. Các nhà cung cấp nhỏ hơn bị ảnh hưởng gián tiếp thông qua nghĩa vụ báo cáo của bên mua EU.' },
            { title: 'PENALTIES',
              textEn: 'Penalties are set at member-state level and must be effective, proportionate and dissuasive. Example: Germany provides fines of up to €10M or 5% of turnover for capital-market-oriented companies.',
              textZh: '处罚由各成员国规定，须有效、相称并具威慑力。例如：德国对面向资本市场的公司规定最高1,000万欧元或营业额5%的罚款。',
              textDe: 'Sanktionen werden auf Ebene der Mitgliedstaaten festgelegt und müssen wirksam, verhältnismäßig und abschreckend sein. Beispiel: Deutschland sieht für kapitalmarktorientierte Unternehmen Geldbußen von bis zu 10 Mio. € oder 5 % des Umsatzes vor.',
              textVi: 'Mức phạt do từng quốc gia thành viên quy định và phải hiệu quả, tương xứng và có tính răn đe. Ví dụ: Đức quy định mức phạt lên tới 10 triệu € hoặc 5% doanh thu đối với các công ty định hướng thị trường vốn.' }
        ],
        reasonDe: 'Nach Omnibus I (Richtlinie (EU) 2026/470, in Kraft seit 18. März 2026) berichten Unternehmen mit >1.000 Beschäftigten UND >450 Mio. € Umsatz ab dem Geschäftsjahr 2027 (erste Berichte 2028). Kleinere Lieferanten sind über die Berichtspflichten ihrer EU-Abnehmer indirekt betroffen.',
        reasonVi: 'Theo Omnibus I (Chỉ thị (EU) 2026/470, có hiệu lực từ ngày 18 tháng 3 năm 2026), các công ty có >1.000 nhân viên VÀ doanh thu >450 triệu € phải báo cáo từ năm tài chính 2027 (báo cáo đầu tiên vào năm 2028). Các nhà cung cấp nhỏ hơn bị ảnh hưởng gián tiếp thông qua nghĩa vụ báo cáo của bên mua EU.'
    },
    csddd: {
        sections: [
            { title: 'SUPPLY CHAIN',
              textEn: 'Mandatory human rights and environmental due diligence under a risk-based approach: focus where adverse impacts are most likely and most severe across the chain of activities.',
              textZh: '基于风险的方法开展强制性人权与环境尽职调查：聚焦于活动链中不利影响最可能发生、最严重的环节。',
              textDe: 'Verpflichtende menschenrechtliche und umweltbezogene Sorgfaltspflichten nach einem risikobasierten Ansatz: Fokus dort, wo nachteilige Auswirkungen entlang der Aktivitätskette am wahrscheinlichsten und am schwerwiegendsten sind.',
              textVi: 'Thẩm định bắt buộc về nhân quyền và môi trường theo cách tiếp cận dựa trên rủi ro: tập trung vào những khâu trong chuỗi hoạt động nơi tác động bất lợi có khả năng xảy ra cao nhất và nghiêm trọng nhất.' },
            { title: 'REPORTING',
              textEn: 'Annual due diligence statement on identified impacts and actions taken. (Omnibus I removed the mandatory climate transition plan adoption requirement.)',
              textZh: '每年发布尽职调查声明，说明已识别的影响及采取的措施。（Omnibus I取消了强制通过气候转型计划的要求。）',
              textDe: 'Jährliche Sorgfaltspflichtenerklärung zu identifizierten Auswirkungen und ergriffenen Maßnahmen. (Omnibus I hat die Pflicht zur Annahme eines Klimatransitionsplans gestrichen.)',
              textVi: 'Tuyên bố thẩm định hằng năm về các tác động đã xác định và biện pháp đã thực hiện. (Omnibus I đã bãi bỏ yêu cầu bắt buộc thông qua kế hoạch chuyển đổi khí hậu.)' },
            { title: 'PENALTIES',
              textEn: 'Fines capped at 3% of net worldwide turnover. Civil liability is governed by member-state national law (the EU-harmonised liability regime was removed by Omnibus I).',
              textZh: '罚款上限为全球净营业额的3%。民事责任由成员国国内法规定（欧盟统一民事责任制度已被Omnibus I取消）。',
              textDe: 'Geldbußen sind auf 3 % des weltweiten Nettoumsatzes begrenzt. Die zivilrechtliche Haftung richtet sich nach dem nationalen Recht der Mitgliedstaaten (das EU-harmonisierte Haftungsregime wurde durch Omnibus I gestrichen).',
              textVi: 'Mức phạt tối đa là 3% doanh thu ròng toàn cầu. Trách nhiệm dân sự do luật quốc gia của từng quốc gia thành viên điều chỉnh (cơ chế trách nhiệm hài hòa hóa của EU đã bị Omnibus I bãi bỏ).' }
        ],
        reasonDe: 'Nach Omnibus I (Richtlinie (EU) 2026/470) müssen Unternehmen mit >5.000 Beschäftigten UND >1,5 Mrd. € Umsatz ab Juli 2029 eine risikobasierte Sorgfaltsprüfung ihrer Lieferkette durchführen.',
        reasonVi: 'Theo Omnibus I (Chỉ thị (EU) 2026/470), các công ty có >5.000 nhân viên VÀ doanh thu >1,5 tỷ € phải thực hiện thẩm định chuỗi cung ứng dựa trên rủi ro từ tháng 7 năm 2029.'
    },
    cbam: {
        sections: [
            { title: 'REPORTING',
              textEn: 'Definitive regime since 1 January 2026: annual CBAM declarations (first due 30 September 2027). Importers below 50 tonnes/year cumulative are exempt under Reg. (EU) 2025/2083.',
              textZh: '自2026年1月1日起进入最终机制：每年提交CBAM申报（首份申报截止2027年9月30日）。根据法规 (EU) 2025/2083，年累计进口低于50公吨的进口商可获豁免。',
              textDe: 'Endgültiges Regime seit dem 1. Januar 2026: jährliche CBAM-Erklärungen (erste fällig am 30. September 2027). Importeure unter kumuliert 50 Tonnen/Jahr sind gemäß Verordnung (EU) 2025/2083 befreit.',
              textVi: 'Cơ chế chính thức từ ngày 1 tháng 1 năm 2026: khai báo CBAM hằng năm (lần đầu hạn chót ngày 30 tháng 9 năm 2027). Nhà nhập khẩu dưới 50 tấn/năm cộng dồn được miễn theo Quy định (EU) 2025/2083.' },
            { title: 'DOCUMENTATION',
              textEn: 'Verified emissions data from production facilities. CBAM certificates must be purchased to cover embedded carbon (certificate sales start February 2027).',
              textZh: '须提供经核实的生产设施排放数据。须购买CBAM证书以覆盖内含碳排放（证书自2027年2月起销售）。',
              textDe: 'Verifizierte Emissionsdaten aus den Produktionsanlagen. Zur Abdeckung des gebundenen Kohlenstoffs müssen CBAM-Zertifikate erworben werden (Zertifikatsverkauf ab Februar 2027).',
              textVi: 'Dữ liệu phát thải đã được xác minh từ các cơ sở sản xuất. Phải mua chứng chỉ CBAM để bù đắp lượng carbon hàm chứa (chứng chỉ bắt đầu bán từ tháng 2 năm 2027).' },
            { title: 'PENALTIES',
              textEn: 'Penalties for non-reporting: 10-50 EUR per tonne of unreported emissions. Certificate shortfall penalties mirror EU ETS prices.',
              textZh: '未申报处罚：每公吨未申报排放10至50欧元。证书不足的处罚参照欧盟ETS价格。',
              textDe: 'Sanktionen bei Nichtmeldung: 10-50 EUR pro Tonne nicht gemeldeter Emissionen. Sanktionen bei Zertifikatsunterdeckung orientieren sich an den EU-ETS-Preisen.',
              textVi: 'Mức phạt khi không khai báo: 10-50 EUR mỗi tấn phát thải không được khai báo. Mức phạt khi thiếu chứng chỉ tương ứng với giá EU ETS.' }
        ],
        reasonDe: 'Als {role} von Bauprodukten fallen Ihre Eisen- und Stahl-, Zement- und Aluminiumwaren unter die CBAM-Erklärungen für gebundene Emissionen. Eine vorgeschlagene Erweiterung (ca. 180 nachgelagerte Stahl-/Aluminiumprodukte, z. B. Autoteile und Haushaltsgeräte) könnte den Anwendungsbereich ab 2028 ausweiten.',
        reasonVi: 'Với vai trò {role} đối với Sản phẩm Xây dựng, hàng hóa sắt thép, xi măng và nhôm của quý vị thuộc phạm vi khai báo phát thải hàm chứa của CBAM. Đề xuất mở rộng (khoảng 180 sản phẩm thép/nhôm hạ nguồn, ví dụ phụ tùng ô tô và thiết bị gia dụng) có thể mở rộng phạm vi áp dụng từ năm 2028.'
    },
    eudr: {
        sections: [
            { title: 'SUPPLY CHAIN',
              textEn: 'Due diligence system to verify products are deforestation-free. Geolocation data required for production plots.',
              textZh: '须建立尽职调查体系，核实产品未涉毁林。须提供生产地块的地理定位数据。',
              textDe: 'Sorgfaltspflichtensystem zum Nachweis, dass Produkte entwaldungsfrei sind. Geolokalisierungsdaten der Produktionsflächen erforderlich.',
              textVi: 'Hệ thống thẩm định để xác minh sản phẩm không liên quan đến phá rừng. Yêu cầu dữ liệu định vị địa lý của các lô đất sản xuất.' },
            { title: 'DOCUMENTATION',
              textEn: 'Due diligence statements for each shipment. Traceability records maintained for 5 years minimum.',
              textZh: '每批货物须提交尽职调查声明。可追溯记录至少保存5年。',
              textDe: 'Sorgfaltspflichtenerklärung für jede Lieferung. Rückverfolgbarkeitsaufzeichnungen sind mindestens 5 Jahre aufzubewahren.',
              textVi: 'Tuyên bố thẩm định cho từng lô hàng. Hồ sơ truy xuất nguồn gốc phải được lưu giữ tối thiểu 5 năm.' },
            { title: 'PENALTIES',
              textEn: 'Member states must provide for maximum fines of at least 4% of EU-wide turnover. Product confiscation and market bans.',
              textZh: '成员国规定的最高罚款须不低于欧盟营业额的4%。可没收产品并禁止进入市场。',
              textDe: 'Die Mitgliedstaaten müssen Höchstgeldbußen von mindestens 4 % des EU-weiten Umsatzes vorsehen. Beschlagnahme von Produkten und Marktverbote möglich.',
              textVi: 'Các quốc gia thành viên phải quy định mức phạt tối đa ít nhất 4% doanh thu trên toàn EU. Có thể tịch thu sản phẩm và cấm lưu hành trên thị trường.' }
        ],
        reasonDe: '{category} können Rohstoffe enthalten, die unter die EU-Entwaldungsverordnung fallen (Rinder, Kakao, Kaffee, Ölpalme, Kautschuk, Soja, Holz — Baumwolle und andere Textilfasern sind NICHT erfasst).',
        reasonVi: '{category} có thể chứa các nguyên liệu thuộc phạm vi Quy định Chống phá rừng của EU (gia súc, ca cao, cà phê, cọ dầu, cao su, đậu nành, gỗ — bông và các loại sợi dệt khác KHÔNG thuộc phạm vi).'
    },
    batteries: {
        sections: [
            { title: 'PRODUCT DESIGN',
              textEn: 'Minimum recycled content thresholds. Removability and replaceability requirements for portable batteries.',
              textZh: '设定最低再生材料含量门槛。便携式电池须满足可拆卸和可更换要求。',
              textDe: 'Mindestanteile an Rezyklaten. Anforderungen an Entnehmbarkeit und Austauschbarkeit für Gerätebatterien.',
              textVi: 'Ngưỡng hàm lượng tái chế tối thiểu. Yêu cầu về khả năng tháo rời và thay thế đối với pin di động.' },
            { title: 'DOCUMENTATION',
              textEn: 'Battery passport (digital) required for EV, LMT and industrial >2 kWh batteries from 18 February 2027. Labelling/QR requirements apply from 18 August 2026; the carbon footprint declaration awaits its delegated act (methodology still pending).',
              textZh: '自2027年2月18日起，电动车、轻型交通工具及2千瓦时以上工业电池须配备数字电池护照。标签/二维码要求自2026年8月18日起适用；碳足迹声明尚待授权法案（方法学仍未出台）。',
              textDe: 'Digitaler Batteriepass ab dem 18. Februar 2027 für EV-, LMT- und Industriebatterien >2 kWh erforderlich. Kennzeichnungs-/QR-Anforderungen gelten ab dem 18. August 2026; die Erklärung zum CO2-Fußabdruck wartet noch auf ihren delegierten Rechtsakt (Methodik steht noch aus).',
              textVi: 'Hộ chiếu pin (kỹ thuật số) bắt buộc đối với pin EV, LMT và pin công nghiệp >2 kWh từ ngày 18 tháng 2 năm 2027. Yêu cầu về nhãn/mã QR áp dụng từ ngày 18 tháng 8 năm 2026; tuyên bố dấu chân carbon đang chờ đạo luật ủy quyền (phương pháp luận vẫn chưa được ban hành).' },
            { title: 'SUPPLY CHAIN',
              textEn: 'Due diligence for cobalt, lithium, nickel, and natural graphite sourcing — postponed to 18 August 2027 by Reg. (EU) 2025/1561. Collection and recycling targets.',
              textZh: '钴、锂、镍及天然石墨采购的尽职调查——已由法规 (EU) 2025/1561 推迟至2027年8月18日。设有回收和再利用目标。',
              textDe: 'Sorgfaltspflichten für die Beschaffung von Kobalt, Lithium, Nickel und Naturgraphit — durch Verordnung (EU) 2025/1561 auf den 18. August 2027 verschoben. Sammel- und Recyclingziele.',
              textVi: 'Thẩm định đối với việc thu mua coban, liti, niken và than chì tự nhiên — được Quy định (EU) 2025/1561 hoãn đến ngày 18 tháng 8 năm 2027. Có các mục tiêu thu gom và tái chế.' }
        ],
        reasonDe: 'Elektronik- und Batterieprodukte, die Batterien enthalten, müssen die Lebenszyklusanforderungen von der Rohstoffbeschaffung bis zum Recycling erfüllen.',
        reasonVi: 'Các sản phẩm Điện tử & Pin có chứa pin phải tuân thủ các yêu cầu vòng đời từ khâu thu mua nguyên liệu đến tái chế.'
    },
    microplastics: {
        sections: [
            { title: 'PRODUCT DESIGN',
              textEn: 'Ban on intentionally added microplastics (synthetic polymers <5mm). Reformulation required for restricted products.',
              textZh: '禁止故意添加微塑料（小于5毫米的合成聚合物）。受限产品须重新配方。',
              textDe: 'Verbot von bewusst zugesetztem Mikroplastik (synthetische Polymere <5 mm). Beschränkte Produkte müssen neu formuliert werden.',
              textVi: 'Cấm vi nhựa được cố ý thêm vào (polyme tổng hợp <5mm). Các sản phẩm thuộc diện hạn chế phải được điều chỉnh công thức.' },
            { title: 'DOCUMENTATION',
              textEn: 'Instructions for use to minimize microplastic release. Reporting obligations on quantities placed on market.',
              textZh: '须提供减少微塑料释放的使用说明。对投放市场的数量负有报告义务。',
              textDe: 'Gebrauchsanweisungen zur Minimierung der Mikroplastikfreisetzung. Berichtspflichten über die in Verkehr gebrachten Mengen.',
              textVi: 'Hướng dẫn sử dụng nhằm giảm thiểu phát tán vi nhựa. Nghĩa vụ báo cáo về số lượng đưa ra thị trường.' },
            { title: 'PENALTIES',
              textEn: 'Product withdrawal from market. National enforcement penalties apply based on member state implementation.',
              textZh: '产品可能被撤出市场。各成员国按其实施规定执行处罚。',
              textDe: 'Rücknahme von Produkten vom Markt. Nationale Sanktionen gelten je nach Umsetzung im jeweiligen Mitgliedstaat.',
              textVi: 'Sản phẩm có thể bị thu hồi khỏi thị trường. Chế tài được áp dụng theo quy định thực thi của từng quốc gia thành viên.' }
        ],
        reasonDe: '{category} enthalten häufig bewusst zugesetztes Mikroplastik, das nun nach REACH Anhang XVII beschränkt ist.',
        reasonVi: '{category} thường chứa vi nhựa được cố ý thêm vào, hiện đã bị hạn chế theo Phụ lục XVII của REACH.'
    },
    ecodesign: {
        sections: [
            { title: 'PRODUCT DESIGN',
              textEn: 'Performance requirements for durability, repairability, recyclability, energy efficiency, and resource use.',
              textZh: '对耐用性、可维修性、可回收性、能效及资源使用设定性能要求。',
              textDe: 'Leistungsanforderungen an Haltbarkeit, Reparierbarkeit, Recyclingfähigkeit, Energieeffizienz und Ressourcennutzung.',
              textVi: 'Yêu cầu về hiệu năng đối với độ bền, khả năng sửa chữa, khả năng tái chế, hiệu quả năng lượng và sử dụng tài nguyên.' },
            { title: 'DOCUMENTATION',
              textEn: 'Digital Product Passport (DPP) required. Technical documentation on environmental performance throughout lifecycle.',
              textZh: '须配备数字产品护照（DPP），并提供覆盖全生命周期环境表现的技术文件。',
              textDe: 'Digitaler Produktpass (DPP) erforderlich. Technische Dokumentation zur Umweltleistung über den gesamten Lebenszyklus.',
              textVi: 'Bắt buộc có Hộ chiếu Sản phẩm Kỹ thuật số (DPP). Tài liệu kỹ thuật về hiệu quả môi trường trong suốt vòng đời sản phẩm.' },
            { title: 'PENALTIES',
              textEn: 'Products failing to meet requirements cannot be placed on the EU market. Withdrawal and recall orders possible.',
              textZh: '不符合要求的产品不得投放欧盟市场，并可能被责令撤回或召回。',
              textDe: 'Produkte, die die Anforderungen nicht erfüllen, dürfen nicht auf den EU-Markt gebracht werden. Rücknahme- und Rückrufanordnungen möglich.',
              textVi: 'Sản phẩm không đáp ứng yêu cầu không được đưa ra thị trường EU. Có thể bị ra lệnh thu hồi và triệu hồi.' }
        ],
        reasonDe: '{category} benötigen künftig einen Digitalen Produktpass und müssen Nachhaltigkeitskriterien erfüllen, um Zugang zum EU-Markt zu erhalten.',
        reasonVi: '{category} sẽ cần Hộ chiếu Sản phẩm Kỹ thuật số và phải đáp ứng các tiêu chí về hiệu quả bền vững để tiếp cận thị trường EU.'
    },
    righttorepair: {
        sections: [
            { title: 'PRODUCT DESIGN',
              textEn: 'Products must be designed for repair. Spare parts available for minimum period. Anti-repair practices prohibited.',
              textZh: '产品须以可维修为设计原则。备件须在最短期限内可获得。禁止阻碍维修的做法。',
              textDe: 'Produkte müssen reparaturfreundlich gestaltet sein. Ersatzteile müssen für einen Mindestzeitraum verfügbar sein. Reparaturbehindernde Praktiken sind verboten.',
              textVi: 'Sản phẩm phải được thiết kế để có thể sửa chữa. Phụ tùng thay thế phải có sẵn trong thời hạn tối thiểu. Cấm các hành vi cản trở sửa chữa.' },
            { title: 'DOCUMENTATION',
              textEn: 'Repair information and manuals accessible to consumers and independent repairers. Repair scoring transparency.',
              textZh: '维修信息和手册须向消费者及独立维修商开放。维修评分保持透明。',
              textDe: 'Reparaturinformationen und -anleitungen müssen Verbrauchern und unabhängigen Reparaturbetrieben zugänglich sein. Transparenz bei der Reparaturbewertung.',
              textVi: 'Thông tin và tài liệu hướng dẫn sửa chữa phải được cung cấp cho người tiêu dùng và các đơn vị sửa chữa độc lập. Minh bạch về điểm đánh giá khả năng sửa chữa.' },
            { title: 'PENALTIES',
              textEn: 'National penalties for non-compliance. Consumers gain right to repair beyond warranty. Potential collective redress.',
              textZh: '不合规由各国处罚。消费者在保修期外仍享有维修权，并可能提起集体救济。',
              textDe: 'Nationale Sanktionen bei Nichteinhaltung. Verbraucher erhalten ein Recht auf Reparatur über die Gewährleistung hinaus. Kollektive Rechtsdurchsetzung möglich.',
              textVi: 'Chế tài quốc gia đối với hành vi không tuân thủ. Người tiêu dùng có quyền sửa chữa ngoài thời hạn bảo hành. Có thể phát sinh khiếu kiện tập thể.' }
        ],
        reasonDe: '{category} müssen reparaturfreundlich gestaltet sein und mit verfügbaren Ersatzteilen angeboten werden; Verbraucher erhalten erweiterte Reparaturrechte.',
        reasonVi: '{category} phải được thiết kế để có thể sửa chữa với phụ tùng thay thế sẵn có, và người tiêu dùng sẽ có quyền sửa chữa mở rộng.'
    },
    greenclaims: {
        sections: [
            { title: 'DOCUMENTATION',
              textEn: 'All environmental claims must be substantiated by scientific evidence and verified by accredited third-party bodies.',
              textZh: '所有环保声明须有科学证据支持，并经认可的第三方机构验证。',
              textDe: 'Alle Umweltaussagen müssen durch wissenschaftliche Nachweise belegt und von akkreditierten Drittstellen verifiziert werden.',
              textVi: 'Mọi tuyên bố về môi trường phải được chứng minh bằng bằng chứng khoa học và được các tổ chức bên thứ ba được công nhận xác minh.' },
            { title: 'REPORTING',
              textEn: 'Pre-approval system for environmental labels. Carbon offset-only claims banned. Lifecycle assessment methodology required.',
              textZh: '环保标签实行预先批准制度。禁止仅基于碳抵消的声明。须采用生命周期评估方法。',
              textDe: 'Vorabgenehmigungssystem für Umweltlabels. Aussagen, die allein auf CO2-Kompensation beruhen, sind verboten. Lebenszyklusanalyse-Methodik erforderlich.',
              textVi: 'Hệ thống phê duyệt trước đối với nhãn môi trường. Cấm các tuyên bố chỉ dựa trên bù đắp carbon. Yêu cầu phương pháp đánh giá vòng đời.' },
            { title: 'PENALTIES',
              textEn: 'Fines up to 4% of annual turnover. Corrective statements required. Temporary market bans for repeat offenders.',
              textZh: '罚款最高达年营业额的4%。须发布更正声明。屡犯者可被暂时禁止进入市场。',
              textDe: 'Geldbußen bis zu 4 % des Jahresumsatzes. Korrekturerklärungen erforderlich. Vorübergehende Marktverbote für Wiederholungstäter.',
              textVi: 'Mức phạt lên tới 4% doanh thu hằng năm. Bắt buộc công bố tuyên bố cải chính. Bên tái phạm có thể bị cấm thị trường tạm thời.' }
        ],
        reasonDe: 'Als {role} beachten Sie bitte: Dieser Vorschlag liegt derzeit auf Eis — Umweltaussagen sind jedoch bereits durch die Empowering-Consumers-Richtlinie (EU) 2024/825 geregelt, die ab dem 27. September 2026 gilt.',
        reasonVi: 'Với vai trò {role}, xin lưu ý rằng đề xuất này hiện đang bị đình trệ — nhưng các tuyên bố về môi trường đã được điều chỉnh bởi Chỉ thị Trao quyền cho Người tiêu dùng (EU) 2024/825, áp dụng từ ngày 27 tháng 9 năm 2026.'
    },
    empco: {
        sections: [
            { title: 'DOCUMENTATION',
              textEn: 'Bans generic environmental claims ("eco-friendly", "green", "climate neutral") without recognised excellent environmental performance. Claims based solely on carbon offsetting are prohibited.',
              textZh: '禁止在无公认卓越环境表现的情况下使用泛泛环保声明（如"环保""绿色""气候中和"）。禁止仅基于碳抵消的声明。',
              textDe: 'Verbietet allgemeine Umweltaussagen („umweltfreundlich", „grün", „klimaneutral") ohne anerkannte hervorragende Umweltleistung. Aussagen, die allein auf CO2-Kompensation beruhen, sind untersagt.',
              textVi: 'Cấm các tuyên bố môi trường chung chung ("thân thiện với môi trường", "xanh", "trung hòa khí hậu") khi không có hiệu quả môi trường xuất sắc được công nhận. Cấm các tuyên bố chỉ dựa trên bù đắp carbon.' },
            { title: 'PRODUCT DESIGN',
              textEn: 'Sustainability labels only permitted if based on an approved certification scheme or established by public authorities. Durability and repairability information requirements.',
              textZh: '可持续标签仅在基于经批准的认证体系或由公共机构设立时方可使用。须提供耐用性和可维修性信息。',
              textDe: 'Nachhaltigkeitssiegel sind nur zulässig, wenn sie auf einem genehmigten Zertifizierungssystem beruhen oder von Behörden eingeführt wurden. Informationspflichten zu Haltbarkeit und Reparierbarkeit.',
              textVi: 'Nhãn bền vững chỉ được phép sử dụng nếu dựa trên chương trình chứng nhận đã được phê duyệt hoặc do cơ quan công quyền thiết lập. Yêu cầu cung cấp thông tin về độ bền và khả năng sửa chữa.' },
            { title: 'PENALTIES',
              textEn: 'Enforced through national unfair-commercial-practices regimes; fines and injunctions vary by member state.',
              textZh: '通过各国不公平商业行为制度执行；罚款和禁令因成员国而异。',
              textDe: 'Durchsetzung über die nationalen Regime gegen unlautere Geschäftspraktiken; Geldbußen und Unterlassungsverfügungen variieren je nach Mitgliedstaat.',
              textVi: 'Được thực thi thông qua các cơ chế quốc gia về hành vi thương mại không lành mạnh; mức phạt và lệnh cấm khác nhau tùy quốc gia thành viên.' }
        ],
        reasonDe: 'Als {role} müssen Sie sicherstellen, dass alle Umweltwerbeaussagen auf Produkten oder Verpackungen ab dem 27. September 2026 den neuen Anti-Greenwashing-Regeln entsprechen.',
        reasonVi: 'Với vai trò {role}, mọi tuyên bố tiếp thị về môi trường trên sản phẩm hoặc bao bì phải tuân thủ các quy tắc chống "tẩy xanh" mới từ ngày 27 tháng 9 năm 2026.'
    },
    wfdtextiles: {
        sections: [
            { title: 'SUPPLY CHAIN',
              textEn: 'Mandatory extended producer responsibility (EPR) for textiles and footwear in every member state. Producers (incl. importers and e-commerce sellers) pay fees funding collection, sorting and recycling.',
              textZh: '所有成员国对纺织品和鞋类实行强制性生产者责任延伸（EPR）。生产者（包括进口商和电商卖家）缴纳费用，用于回收、分拣和再利用。',
              textDe: 'Verpflichtende erweiterte Herstellerverantwortung (EPR) für Textilien und Schuhe in jedem Mitgliedstaat. Hersteller (einschl. Importeure und E-Commerce-Verkäufer) zahlen Gebühren zur Finanzierung von Sammlung, Sortierung und Recycling.',
              textVi: 'Trách nhiệm mở rộng của nhà sản xuất (EPR) bắt buộc đối với hàng dệt may và giày dép tại mọi quốc gia thành viên. Nhà sản xuất (bao gồm nhà nhập khẩu và người bán thương mại điện tử) nộp phí tài trợ cho việc thu gom, phân loại và tái chế.' },
            { title: 'DOCUMENTATION',
              textEn: 'Producer registration in each member state where products are sold. Fees eco-modulated by durability, recyclability and recycled content.',
              textZh: '须在产品销售的每个成员国注册。费用按耐用性、可回收性和再生含量进行生态调节。',
              textDe: 'Herstellerregistrierung in jedem Mitgliedstaat, in dem Produkte verkauft werden. Gebühren werden nach Haltbarkeit, Recyclingfähigkeit und Rezyklatanteil ökologisch moduliert.',
              textVi: 'Nhà sản xuất phải đăng ký tại từng quốc gia thành viên nơi sản phẩm được bán. Phí được điều chỉnh theo tiêu chí sinh thái: độ bền, khả năng tái chế và hàm lượng tái chế.' },
            { title: 'PENALTIES',
              textEn: 'Non-registered producers may not place textiles on that member state\'s market. National enforcement and fines.',
              textZh: '未注册的生产者不得在该成员国市场投放纺织品。由各国执法并处以罚款。',
              textDe: 'Nicht registrierte Hersteller dürfen in dem betreffenden Mitgliedstaat keine Textilien in Verkehr bringen. Nationale Durchsetzung und Geldbußen.',
              textVi: 'Nhà sản xuất chưa đăng ký không được đưa hàng dệt may ra thị trường của quốc gia thành viên đó. Thực thi và xử phạt ở cấp quốc gia.' }
        ],
        reasonDe: 'Hersteller von Textilien und Bekleidung, die in die EU verkaufen, zahlen in jedem Mitgliedstaat ökologisch modulierte EPR-Gebühren — ein auf Haltbarkeit und Recyclingfähigkeit ausgelegtes Design senkt die Gebühr unmittelbar.',
        reasonVi: 'Nhà sản xuất Dệt may & Trang phục bán vào EU sẽ nộp phí EPR được điều chỉnh theo tiêu chí sinh thái tại mọi quốc gia thành viên — thiết kế chú trọng độ bền và khả năng tái chế sẽ trực tiếp giảm mức phí.'
    },
    rohs: {
        sections: [
            { title: 'PRODUCT DESIGN',
              textEn: 'Maximum concentration limits for lead, mercury, cadmium, hexavalent chromium, PBB, and PBDE in electrical/electronic equipment.',
              textZh: '对电气电子设备中的铅、汞、镉、六价铬、多溴联苯（PBB）和多溴二苯醚（PBDE）设定最高浓度限值。',
              textDe: 'Höchstkonzentrationswerte für Blei, Quecksilber, Cadmium, sechswertiges Chrom, PBB und PBDE in Elektro- und Elektronikgeräten.',
              textVi: 'Giới hạn nồng độ tối đa đối với chì, thủy ngân, cadimi, crom hóa trị sáu, PBB và PBDE trong thiết bị điện/điện tử.' },
            { title: 'DOCUMENTATION',
              textEn: 'EU Declaration of Conformity. Technical file with material composition evidence. CE marking required.',
              textZh: '须出具欧盟符合性声明，备有材料成分证明的技术文件，并加贴CE标志。',
              textDe: 'EU-Konformitätserklärung. Technische Unterlagen mit Nachweisen zur Materialzusammensetzung. CE-Kennzeichnung erforderlich.',
              textVi: 'Tuyên bố Hợp chuẩn EU. Hồ sơ kỹ thuật kèm bằng chứng về thành phần vật liệu. Bắt buộc có dấu CE.' },
            { title: 'PENALTIES',
              textEn: 'Non-compliant products barred from EU market. Product recalls, fines, and potential criminal liability in member states.',
              textZh: '不合规产品禁止进入欧盟市场。可能面临召回、罚款，在部分成员国还可能承担刑事责任。',
              textDe: 'Nicht konforme Produkte sind vom EU-Markt ausgeschlossen. Produktrückrufe, Geldbußen und mögliche strafrechtliche Verantwortlichkeit in den Mitgliedstaaten.',
              textVi: 'Sản phẩm không tuân thủ bị cấm vào thị trường EU. Có thể bị triệu hồi sản phẩm, phạt tiền và chịu trách nhiệm hình sự tại các quốc gia thành viên.' }
        ],
        reasonDe: 'Alle auf dem EU-Markt in Verkehr gebrachten Elektro- und Elektronikgeräte müssen die Beschränkungen gefährlicher Stoffe nach RoHS einhalten.',
        reasonVi: 'Mọi thiết bị điện và điện tử đưa ra thị trường EU phải tuân thủ các hạn chế về chất nguy hại theo RoHS.'
    },
    ppwr: {
        sections: [
            { title: 'PRODUCT DESIGN',
              textEn: 'Minimum recycled content in plastic packaging. Packaging must be recyclable and meet design-for-recycling criteria by 2030.',
              textZh: '塑料包装须含最低比例的再生材料。到2030年，包装须可回收并符合可回收设计标准。',
              textDe: 'Mindestrezyklatanteil in Kunststoffverpackungen. Verpackungen müssen bis 2030 recyclingfähig sein und die Kriterien für recyclinggerechtes Design erfüllen.',
              textVi: 'Hàm lượng tái chế tối thiểu trong bao bì nhựa. Đến năm 2030, bao bì phải có khả năng tái chế và đáp ứng tiêu chí thiết kế phục vụ tái chế.' },
            { title: 'DOCUMENTATION',
              textEn: 'Labelling with material composition, reuse/recycling instructions. Producer responsibility declarations.',
              textZh: '须标注材料成分及重复使用/回收说明，并提交生产者责任声明。',
              textDe: 'Kennzeichnung mit Materialzusammensetzung sowie Wiederverwendungs-/Recyclinghinweisen. Herstellerverantwortungserklärungen.',
              textVi: 'Ghi nhãn thành phần vật liệu và hướng dẫn tái sử dụng/tái chế. Tuyên bố trách nhiệm của nhà sản xuất.' },
            { title: 'PENALTIES',
              textEn: 'Products with non-compliant packaging cannot be placed on EU market. National enforcement with fines and product withdrawal.',
              textZh: '包装不合规的产品不得投放欧盟市场。各国执法，可处以罚款并撤回产品。',
              textDe: 'Produkte mit nicht konformer Verpackung dürfen nicht auf den EU-Markt gebracht werden. Nationale Durchsetzung mit Geldbußen und Produktrücknahme.',
              textVi: 'Sản phẩm có bao bì không tuân thủ không được đưa ra thị trường EU. Thực thi ở cấp quốc gia với phạt tiền và thu hồi sản phẩm.' }
        ],
        reasonDe: 'Alle in der EU verkauften {category} verwenden Verpackungen — die PPWR legt Anforderungen an Recyclingfähigkeit, Rezyklatanteil und Kennzeichnung für alle Verpackungsarten fest.',
        reasonVi: 'Mọi {category} bán tại EU đều sử dụng bao bì — PPWR đặt ra yêu cầu về khả năng tái chế, hàm lượng tái chế và ghi nhãn cho mọi loại bao bì.'
    },
    forcedlabour: {
        sections: [
            { title: 'SUPPLY CHAIN',
              textEn: 'Prohibition on placing products made with forced labour on the EU market. Applies at any stage of production, manufacture, harvest, or extraction.',
              textZh: '禁止将涉及强迫劳动的产品投放欧盟市场。适用于生产、制造、收获或开采的任何环节。',
              textDe: 'Verbot, mit Zwangsarbeit hergestellte Produkte auf dem EU-Markt in Verkehr zu bringen. Gilt für jede Stufe der Produktion, Herstellung, Ernte oder Gewinnung.',
              textVi: 'Cấm đưa ra thị trường EU các sản phẩm được làm bằng lao động cưỡng bức. Áp dụng ở mọi giai đoạn sản xuất, chế tạo, thu hoạch hoặc khai thác.' },
            { title: 'DOCUMENTATION',
              textEn: 'Competent authorities can request supply chain information and evidence that products are forced-labour-free. Burden of proof on operators. The Commission published implementation guidelines, the Forced Labour Single Portal and the risk database on 26 June 2026.',
              textZh: '主管机关可要求提供供应链信息及产品不涉强迫劳动的证据，举证责任在经营者。欧盟委员会已于2026年6月26日发布实施指南、强迫劳动统一门户及风险数据库。',
              textDe: 'Zuständige Behörden können Lieferketteninformationen und Nachweise anfordern, dass Produkte frei von Zwangsarbeit sind. Die Beweislast liegt bei den Wirtschaftsakteuren. Die Kommission hat am 26. Juni 2026 Umsetzungsleitlinien, das Forced Labour Single Portal und die Risikodatenbank veröffentlicht.',
              textVi: 'Cơ quan có thẩm quyền có thể yêu cầu thông tin chuỗi cung ứng và bằng chứng rằng sản phẩm không liên quan đến lao động cưỡng bức. Nghĩa vụ chứng minh thuộc về doanh nghiệp. Ủy ban Châu Âu đã công bố hướng dẫn thực thi, Cổng thông tin Duy nhất về Lao động Cưỡng bức và cơ sở dữ liệu rủi ro vào ngày 26 tháng 6 năm 2026.' },
            { title: 'PENALTIES',
              textEn: 'Product bans from EU market. Mandatory withdrawal and disposal of non-compliant goods already in circulation.',
              textZh: '产品可被禁止进入欧盟市场。已流通的不合规货物须强制撤回并处置。',
              textDe: 'Produktverbote für den EU-Markt. Verpflichtende Rücknahme und Entsorgung bereits im Umlauf befindlicher nicht konformer Waren.',
              textVi: 'Sản phẩm có thể bị cấm vào thị trường EU. Hàng hóa không tuân thủ đã lưu thông bắt buộc phải thu hồi và xử lý.' }
        ],
        reasonDe: 'Alle auf dem EU-Markt in Verkehr gebrachten Produkte — unabhängig von Kategorie oder Herkunft — müssen auf jeder Stufe der Lieferkette frei von Zwangsarbeit sein.',
        reasonVi: 'Mọi sản phẩm đưa ra thị trường EU — bất kể chủng loại hay xuất xứ — phải không liên quan đến lao động cưỡng bức ở bất kỳ giai đoạn nào của chuỗi cung ứng.'
    },
    dpp: {
        sections: [
            { title: 'DOCUMENTATION',
              textEn: 'Unique product identifier linked to digital record containing materials, origin, carbon footprint, repairability score, and end-of-life instructions.',
              textZh: '唯一产品标识符关联数字记录，包含材料、原产地、碳足迹、可维修性评分及报废处理说明。',
              textDe: 'Eindeutige Produktkennung, verknüpft mit einem digitalen Datensatz zu Materialien, Herkunft, CO2-Fußabdruck, Reparierbarkeitsbewertung und Entsorgungshinweisen.',
              textVi: 'Mã định danh sản phẩm duy nhất liên kết với hồ sơ kỹ thuật số chứa thông tin vật liệu, xuất xứ, dấu chân carbon, điểm khả năng sửa chữa và hướng dẫn xử lý cuối vòng đời.' },
            { title: 'SUPPLY CHAIN',
              textEn: 'Data must flow from raw material suppliers through manufacturing to point of sale. Interoperable data format required.',
              textZh: '数据须从原材料供应商经制造环节流转至销售终端，并采用可互操作的数据格式。',
              textDe: 'Daten müssen von den Rohstofflieferanten über die Fertigung bis zum Verkaufspunkt fließen. Interoperables Datenformat erforderlich.',
              textVi: 'Dữ liệu phải luân chuyển từ nhà cung cấp nguyên liệu thô qua khâu sản xuất đến điểm bán hàng. Yêu cầu định dạng dữ liệu có khả năng tương tác.' },
            { title: 'PRODUCT DESIGN',
              textEn: 'Products must carry data carrier (QR code or RFID) enabling consumer and authority access to passport information.',
              textZh: '产品须带有数据载体（二维码或RFID），使消费者和监管机构能够访问护照信息。',
              textDe: 'Produkte müssen einen Datenträger (QR-Code oder RFID) tragen, der Verbrauchern und Behörden Zugriff auf die Passinformationen ermöglicht.',
              textVi: 'Sản phẩm phải mang vật mang dữ liệu (mã QR hoặc RFID) cho phép người tiêu dùng và cơ quan chức năng truy cập thông tin hộ chiếu.' }
        ],
        reasonDe: '{category} gehören zu den ersten Produktkategorien im ESPR-Arbeitsplan (April 2025), die einen Digitalen Produktpass mit per QR-Code zugänglichen Lebenszyklusdaten benötigen — Pflichten voraussichtlich 2027–2030.',
        reasonVi: '{category} nằm trong số các nhóm sản phẩm đầu tiên trong Kế hoạch Công tác ESPR (tháng 4 năm 2025) phải có Hộ chiếu Sản phẩm Kỹ thuật số với dữ liệu vòng đời truy cập được qua mã QR — nghĩa vụ dự kiến áp dụng 2027–2030.'
    },
    gpsr: {
        sections: [
            { title: 'DOCUMENTATION',
              textEn: 'Every consumer product — CE-marked or not — needs an EU-established responsible economic operator (manufacturer, importer, authorised representative or fulfilment provider) whose name and address appear on the product or its packaging. Technical documentation and an internal risk analysis are required.',
              textZh: '每件消费品——无论是否带CE标志——都须有设立于欧盟的责任经济经营者（制造商、进口商、授权代表或履行服务商），其名称和地址须标注在产品或包装上。须备有技术文件和内部风险分析。',
              textDe: 'Jedes Verbraucherprodukt — mit oder ohne CE-Kennzeichnung — benötigt einen in der EU niedergelassenen verantwortlichen Wirtschaftsakteur (Hersteller, Importeur, Bevollmächtigter oder Fulfilment-Dienstleister), dessen Name und Anschrift auf dem Produkt oder seiner Verpackung angegeben sind. Technische Dokumentation und eine interne Risikoanalyse sind erforderlich.',
              textVi: 'Mỗi sản phẩm tiêu dùng — dù có dấu CE hay không — đều cần một chủ thể kinh tế chịu trách nhiệm được thành lập tại EU (nhà sản xuất, nhà nhập khẩu, đại diện được ủy quyền hoặc nhà cung cấp dịch vụ hoàn tất đơn hàng) với tên và địa chỉ ghi trên sản phẩm hoặc bao bì. Yêu cầu có tài liệu kỹ thuật và phân tích rủi ro nội bộ.' },
            { title: 'REPORTING',
              textEn: 'Accidents must be reported via the Safety Business Gateway. Online marketplaces must provide a single contact point, cooperate with Safety Gate and remove dangerous-product listings within 2 working days. Commission application guidelines published 19 November 2025.',
              textZh: '事故须通过Safety Business Gateway报告。线上平台须设立统一联络点、配合Safety Gate，并在2个工作日内下架危险产品。欧盟委员会已于2025年11月19日发布适用指南。',
              textDe: 'Unfälle müssen über das Safety Business Gateway gemeldet werden. Online-Marktplätze müssen eine zentrale Kontaktstelle benennen, mit Safety Gate kooperieren und Angebote gefährlicher Produkte innerhalb von 2 Werktagen entfernen. Die Anwendungsleitlinien der Kommission wurden am 19. November 2025 veröffentlicht.',
              textVi: 'Tai nạn phải được báo cáo qua Safety Business Gateway. Các sàn thương mại điện tử phải có đầu mối liên hệ duy nhất, hợp tác với Safety Gate và gỡ bỏ các mục sản phẩm nguy hiểm trong vòng 2 ngày làm việc. Hướng dẫn áp dụng của Ủy ban được công bố ngày 19 tháng 11 năm 2025.' },
            { title: 'PENALTIES',
              textEn: 'Member-state level. Germany: revised Product Safety Act (in force 19 February 2026) with fines up to €100,000, profit-skimming, marketplace delisting orders and criminal liability for persistent violations.',
              textZh: '由成员国规定。德国：修订后的《产品安全法》（2026年2月19日生效）规定最高10万欧元罚款、没收违法所得、责令平台下架，屡犯者可承担刑事责任。',
              textDe: 'Auf Ebene der Mitgliedstaaten. Deutschland: novelliertes Produktsicherheitsgesetz (in Kraft seit 19. Februar 2026) mit Geldbußen bis zu 100.000 €, Gewinnabschöpfung, Delisting-Anordnungen für Marktplätze und strafrechtlicher Verantwortlichkeit bei beharrlichen Verstößen.',
              textVi: 'Do từng quốc gia thành viên quy định. Đức: Luật An toàn Sản phẩm sửa đổi (có hiệu lực từ ngày 19 tháng 2 năm 2026) với mức phạt lên tới 100.000 €, tịch thu lợi nhuận bất hợp pháp, lệnh gỡ bỏ trên sàn thương mại điện tử và trách nhiệm hình sự đối với vi phạm kéo dài.' }
        ],
        reasonDe: 'Jedes Verbraucherprodukt, das Sie in die EU liefern, benötigt eine verantwortliche Person in der EU und GPSR-Dokumentation — Marktplätze und die QA-Teams des deutschen Einzelhandels verlangen inzwischen beides vor Listung oder Versand.',
        reasonVi: 'Mỗi sản phẩm tiêu dùng quý vị xuất sang EU đều cần một người chịu trách nhiệm tại EU và hồ sơ GPSR — các sàn thương mại điện tử và đội QA của các nhà bán lẻ Đức hiện yêu cầu cả hai trước khi đăng bán hoặc giao hàng.'
    },
    ukcbam: {
        sections: [
            { title: 'REPORTING',
              textEn: 'A tax on embedded emissions administered by HMRC — no certificates to buy, unlike EU CBAM. Covered sectors: aluminium, cement, fertilisers, hydrogen, iron & steel (glass and ceramics excluded for now). First accounting period is calendar year 2027, quarterly thereafter.',
              textZh: '由英国税务海关总署（HMRC）征收的内含排放税——与欧盟CBAM不同，无需购买证书。覆盖行业：铝、水泥、化肥、氢气、钢铁（玻璃和陶瓷暂不包括）。首个申报期为2027整个日历年，此后按季度申报。',
              textDe: 'Eine von HMRC verwaltete Steuer auf gebundene Emissionen — anders als beim EU-CBAM sind keine Zertifikate zu kaufen. Erfasste Sektoren: Aluminium, Zement, Düngemittel, Wasserstoff, Eisen & Stahl (Glas und Keramik vorerst ausgenommen). Erster Abrechnungszeitraum ist das Kalenderjahr 2027, danach vierteljährlich.',
              textVi: 'Thuế đánh vào phát thải hàm chứa do HMRC quản lý — khác với CBAM của EU, không phải mua chứng chỉ. Các ngành thuộc phạm vi: nhôm, xi măng, phân bón, hydro, sắt thép (thủy tinh và gốm sứ tạm thời chưa bao gồm). Kỳ kế toán đầu tiên là cả năm dương lịch 2027, sau đó theo quý.' },
            { title: 'DOCUMENTATION',
              textEn: 'Importers may use verified actual emissions data or government default values; sector-specific rates are set quarterly from UK ETS auction prices adjusted for free allowances. Deduction for carbon prices already paid abroad. Registration threshold: £50,000 of CBAM goods over 12 months.',
              textZh: '进口商可使用经核实的实际排放数据或政府默认值；行业税率按季度根据英国ETS拍卖价格（经免费配额调整）设定。境外已支付的碳价可抵扣。注册门槛：12个月内CBAM产品达5万英镑。',
              textDe: 'Importeure können verifizierte tatsächliche Emissionsdaten oder staatliche Standardwerte verwenden; sektorspezifische Sätze werden vierteljährlich aus den UK-ETS-Auktionspreisen (bereinigt um kostenlose Zuteilungen) festgelegt. Abzug für bereits im Ausland gezahlte CO2-Preise. Registrierungsschwelle: 50.000 £ CBAM-Waren innerhalb von 12 Monaten.',
              textVi: 'Nhà nhập khẩu có thể dùng dữ liệu phát thải thực tế đã xác minh hoặc giá trị mặc định của chính phủ; thuế suất theo ngành được ấn định hằng quý từ giá đấu giá UK ETS đã điều chỉnh theo hạn ngạch miễn phí. Được khấu trừ giá carbon đã nộp ở nước ngoài. Ngưỡng đăng ký: 50.000 £ hàng hóa CBAM trong 12 tháng.' },
            { title: 'PENALTIES',
              textEn: 'HMRC enforcement with standard tax penalties for failure to register, report or pay.',
              textZh: '由HMRC执法，未注册、未申报或未缴税适用标准税务处罚。',
              textDe: 'Durchsetzung durch HMRC mit den üblichen Steuersanktionen bei unterlassener Registrierung, Meldung oder Zahlung.',
              textVi: 'HMRC thực thi với các chế tài thuế tiêu chuẩn đối với việc không đăng ký, không khai báo hoặc không nộp thuế.' }
        ],
        reasonDe: 'Ab Januar 2027 besteuert HMRC die gebundenen Emissionen von Stahl-, Aluminium- und Zementwaren, die in das Vereinigte Königreich eingeführt werden — rechnen Sie damit, dass britische Kunden bereits im Laufe des Jahres 2026 überprüfbare Emissionsdaten anfordern.',
        reasonVi: 'Từ tháng 1 năm 2027, hàng hóa gốc thép, nhôm và xi măng vào Vương quốc Anh sẽ bị HMRC đánh thuế trên phát thải hàm chứa — hãy chuẩn bị cho việc khách hàng Anh yêu cầu dữ liệu phát thải có thể xác minh ngay trong năm 2026.'
    },
    toysafety: {
        sections: [
            { title: 'PRODUCT DESIGN',
              textEn: 'Expanded chemical restrictions, including bans on PFAS and certain endocrine disruptors in toys, plus updated mechanical and digital-safety requirements.',
              textZh: '扩大化学品限制，包括禁止玩具中的PFAS及某些内分泌干扰物，并更新机械安全和数字安全要求。',
              textDe: 'Erweiterte Chemikalienbeschränkungen, einschließlich Verboten von PFAS und bestimmten endokrinen Disruptoren in Spielzeug, sowie aktualisierte Anforderungen an mechanische und digitale Sicherheit.',
              textVi: 'Mở rộng các hạn chế hóa chất, bao gồm cấm PFAS và một số chất gây rối loạn nội tiết trong đồ chơi, cùng các yêu cầu cập nhật về an toàn cơ học và an toàn kỹ thuật số.' },
            { title: 'DOCUMENTATION',
              textEn: 'A toy Digital Product Passport replaces the paper EU declaration of conformity. Obligations for online marketplaces selling toys into the EU.',
              textZh: '玩具数字产品护照将取代纸质欧盟符合性声明。向欧盟销售玩具的线上平台承担相应义务。',
              textDe: 'Ein Digitaler Produktpass für Spielzeug ersetzt die papierbasierte EU-Konformitätserklärung. Pflichten für Online-Marktplätze, die Spielzeug in die EU verkaufen.',
              textVi: 'Hộ chiếu Sản phẩm Kỹ thuật số cho đồ chơi thay thế tuyên bố hợp chuẩn EU bản giấy. Các sàn thương mại điện tử bán đồ chơi vào EU phải thực hiện nghĩa vụ tương ứng.' },
            { title: 'PENALTIES',
              textEn: 'Member-state enforcement; non-compliant toys are barred from the EU market.',
              textZh: '由成员国执法；不合规玩具禁止进入欧盟市场。',
              textDe: 'Durchsetzung durch die Mitgliedstaaten; nicht konformes Spielzeug ist vom EU-Markt ausgeschlossen.',
              textVi: 'Do các quốc gia thành viên thực thi; đồ chơi không tuân thủ bị cấm vào thị trường EU.' }
        ],
        reasonDe: 'Spielzeug erhält ab August 2030 einen eigenen Digitalen Produktpass und strengere Chemikalienregeln — Prüfabläufe und Materialauswahl müssen deutlich vorher aktualisiert werden, und bis dahin gelten beide Regelwerke parallel.',
        reasonVi: 'Từ tháng 8 năm 2030, đồ chơi sẽ có Hộ chiếu Sản phẩm Kỹ thuật số riêng và các quy tắc hóa chất nghiêm ngặt hơn — quy trình thử nghiệm và lựa chọn vật liệu cần được cập nhật từ sớm, và cả hai chế độ sẽ áp dụng song song cho đến thời điểm đó.'
    },
    lksg: {
        sections: [
            { title: 'SUPPLY CHAIN',
              textEn: 'Due diligence obligations remain fully in force for companies with ≥1,000 employees in Germany: risk management and analysis, preventive and remedial measures, complaints mechanism, BAFA oversight. The law was not abolished.',
              textZh: '对德国境内员工不少于1,000人的企业，尽职调查义务仍完全有效：风险管理与分析、预防和补救措施、投诉机制、联邦经济与出口管制局（BAFA）监督。该法并未废除。',
              textDe: 'Die Sorgfaltspflichten gelten für Unternehmen mit ≥1.000 Beschäftigten in Deutschland unverändert fort: Risikomanagement und -analyse, Präventions- und Abhilfemaßnahmen, Beschwerdeverfahren, Aufsicht durch das BAFA. Das Gesetz wurde nicht abgeschafft.',
              textVi: 'Nghĩa vụ thẩm định vẫn có hiệu lực đầy đủ đối với các công ty có ≥1.000 nhân viên tại Đức: quản lý và phân tích rủi ro, biện pháp phòng ngừa và khắc phục, cơ chế khiếu nại, giám sát của BAFA. Luật này không bị bãi bỏ.' },
            { title: 'REPORTING',
              textEn: 'The reporting obligation is dead in practice: BAFA deactivated its reporting portal on 7 November 2025, with retroactive relief from 2023. The amendment law (reducing sanctions to serious violations only) is in final parliamentary passage — first Bundestag reading 16 January 2026.',
              textZh: '报告义务实际上已终止：BAFA于2025年11月7日关闭报告门户，并追溯免除自2023年起的报告义务。修订法案（将处罚缩减至仅针对严重违规）正处于议会审议最后阶段——联邦议院2026年1月16日一读。',
              textDe: 'Die Berichtspflicht ist in der Praxis tot: Das BAFA hat sein Berichtsportal am 7. November 2025 deaktiviert, mit rückwirkender Entlastung ab 2023. Das Änderungsgesetz (Beschränkung der Sanktionen auf schwere Verstöße) befindet sich in der finalen parlamentarischen Beratung — erste Lesung im Bundestag am 16. Januar 2026.',
              textVi: 'Nghĩa vụ báo cáo trên thực tế đã chấm dứt: BAFA đã vô hiệu hóa cổng báo cáo vào ngày 7 tháng 11 năm 2025, với miễn trừ hồi tố từ năm 2023. Luật sửa đổi (thu hẹp chế tài chỉ còn áp dụng cho vi phạm nghiêm trọng) đang ở giai đoạn thông qua cuối cùng tại quốc hội — Bundestag đọc lần thứ nhất ngày 16 tháng 1 năm 2026.' },
            { title: 'PENALTIES',
              textEn: 'BAFA fines remain possible for serious violations. In practice, German buyers cascade LkSG requirements to suppliers via contracts: codes of conduct, self-assessment questionnaires, audit rights and access to complaint mechanisms.',
              textZh: 'BAFA仍可对严重违规处以罚款。实践中，德国买家通过合同将LkSG要求传导给供应商：行为准则、自评问卷、审计权及投诉机制的使用。',
              textDe: 'BAFA-Bußgelder bleiben bei schweren Verstößen möglich. In der Praxis geben deutsche Abnehmer die LkSG-Anforderungen vertraglich an Lieferanten weiter: Verhaltenskodizes, Selbstauskunftsfragebögen, Auditrechte und Zugang zu Beschwerdemechanismen.',
              textVi: 'BAFA vẫn có thể phạt tiền đối với vi phạm nghiêm trọng. Trên thực tế, bên mua Đức chuyển các yêu cầu LkSG xuống nhà cung cấp qua hợp đồng: bộ quy tắc ứng xử, bảng câu hỏi tự đánh giá, quyền kiểm toán và quyền tiếp cận cơ chế khiếu nại.' }
        ],
        reasonDe: 'Ihre deutschen Abnehmer sind gesetzlich verpflichtet, Lieferkettenrisiken zu managen — Verhaltenskodizes, Fragebögen, Auditrechte und Zugang zu Beschwerdemechanismen sind Standardvertragsklauseln, und ab 2029 kommen die CSDDD-Anforderungen hinzu.',
        reasonVi: 'Bên mua Đức của quý vị có nghĩa vụ pháp lý quản lý rủi ro chuỗi cung ứng — bộ quy tắc ứng xử, bảng câu hỏi, quyền kiểm toán và quyền tiếp cận cơ chế khiếu nại là điều khoản hợp đồng tiêu chuẩn, và các yêu cầu CSDDD sẽ bổ sung thêm từ năm 2029.'
    },
    uflpa: {
        sections: [
            { title: 'SUPPLY CHAIN',
              textEn: 'Goods with any Xinjiang or Entity-List nexus — at any tier, any input — are presumed made with forced labour and barred from US import. The presumption can only be rebutted with clear and convincing evidence. Entity List: 144 entities (largest addition: 37 entities, January 2025).',
              textZh: '与新疆或实体清单有任何关联的货物——无论处于哪一层级、哪种原料——均被推定涉及强迫劳动并禁止进入美国。仅凭明确且令人信服的证据方可推翻推定。实体清单：144家实体（最大一次新增：2025年1月，37家）。',
              textDe: 'Waren mit jeglichem Bezug zu Xinjiang oder zur Entity List — auf jeder Lieferkettenstufe, bei jedem Vorprodukt — gelten als mit Zwangsarbeit hergestellt und sind von der Einfuhr in die USA ausgeschlossen. Die Vermutung kann nur mit klaren und überzeugenden Beweisen widerlegt werden. Entity List: 144 Einträge (größte Erweiterung: 37 Einträge, Januar 2025).',
              textVi: 'Hàng hóa có bất kỳ liên hệ nào với Tân Cương hoặc Danh sách Thực thể — ở bất kỳ cấp nào, với bất kỳ nguyên liệu đầu vào nào — đều bị suy đoán là làm bằng lao động cưỡng bức và bị cấm nhập khẩu vào Mỹ. Suy đoán này chỉ có thể bị bác bỏ bằng bằng chứng rõ ràng và thuyết phục. Danh sách Thực thể: 144 thực thể (đợt bổ sung lớn nhất: 37 thực thể, tháng 1 năm 2025).' },
            { title: 'DOCUMENTATION',
              textEn: 'Full raw-material tracing required. CBP stopped ~7,300 shipments in FY2025 (+51% year on year); only ~6.5% of reviewed shipments were released. Priority sectors: cotton, polysilicon/solar, tomatoes, aluminium, PVC, seafood — plus, since August 2025: lithium, copper, caustic soda, steel and red dates.',
              textZh: '须实现原材料全程追溯。美国海关与边境保护局（CBP）2025财年拦截约7,300批货物（同比增长51%）；经审查的货物仅约6.5%获放行。重点行业：棉花、多晶硅/光伏、番茄、铝、PVC、海产品——自2025年8月起新增：锂、铜、烧碱、钢铁和红枣。',
              textDe: 'Vollständige Rückverfolgung der Rohstoffe erforderlich. Die CBP stoppte im Haushaltsjahr 2025 rund 7.300 Sendungen (+51 % gegenüber dem Vorjahr); nur rund 6,5 % der geprüften Sendungen wurden freigegeben. Prioritätssektoren: Baumwolle, Polysilizium/Solar, Tomaten, Aluminium, PVC, Meeresfrüchte — seit August 2025 zusätzlich: Lithium, Kupfer, Natronlauge, Stahl und rote Datteln.',
              textVi: 'Yêu cầu truy xuất toàn bộ nguyên liệu thô. CBP đã chặn khoảng 7.300 lô hàng trong năm tài khóa 2025 (+51% so với năm trước); chỉ khoảng 6,5% lô hàng được kiểm tra được thông quan. Các ngành ưu tiên: bông, polysilicon/năng lượng mặt trời, cà chua, nhôm, PVC, hải sản — và từ tháng 8 năm 2025 bổ sung: liti, đồng, xút, thép và táo đỏ.' },
            { title: 'PENALTIES',
              textEn: 'Detention, exclusion or seizure of goods at the border; potential civil penalties under 19 U.S.C. § 1592.',
              textZh: '货物在边境被扣留、排除或没收；并可能依据《美国法典》第19编第1592条承担民事处罚。',
              textDe: 'Zurückhaltung, Ausschluss oder Beschlagnahme von Waren an der Grenze; mögliche zivilrechtliche Sanktionen nach 19 U.S.C. § 1592.',
              textVi: 'Hàng hóa bị tạm giữ, loại trừ hoặc tịch thu tại biên giới; có thể bị phạt dân sự theo 19 U.S.C. § 1592.' }
        ],
        reasonDe: 'Beim Verkauf in die USA gilt: Jede Verbindung zu Xinjiang oder zur Entity List an irgendeiner Stelle Ihrer Lieferkette führt zu einem Stopp an der Grenze — und die Liste der Prioritätssektoren umfasst inzwischen auch Lithium, Kupfer und Stahl.',
        reasonVi: 'Khi bán sang Mỹ: bất kỳ liên hệ nào với Tân Cương hoặc Danh sách Thực thể ở bất kỳ khâu nào trong chuỗi cung ứng đều dẫn đến việc bị chặn tại biên giới — và danh sách ngành ưu tiên hiện đã mở rộng đến liti, đồng và thép.'
    }
};

const mutations = Object.entries(R).map(([id, v]) => ({ patch: { id: `regulation-${id}`, set: {
    sections: v.sections.map((s, i) => ({ _key: `s${i}`, ...s })),
    reasonDe: v.reasonDe, reasonVi: v.reasonVi
} } }));

(async () => {
    const r = await fetch('https://bvmxf21v.api.sanity.io/v2024-01-01/data/mutate/production', {
        method: 'POST', headers: { Authorization: `Bearer ${TOKEN}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({ mutations })
    });
    const b = await r.json();
    if (!r.ok) { console.error('FAILED', JSON.stringify(b)); process.exit(1); }
    console.log(`OK: ${mutations.length}`);
})();
