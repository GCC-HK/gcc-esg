// Extended content for the detailed regulation pages (v2-regulation.html?id=).
// Exemplars first (CBAM, EUDR, PPWR); remaining regulations render from base data
// until their detail entries are added. Every claim verified against official
// sources (see sources[] per entry and the repo's CBAM data discipline).
// Languages: en/zh/de (vi falls back to en via the CSS language fallback).
const V2_REG_DETAILS = {
    cbam: {
        roles: {
            office: [
                { en: 'Since 1 January 2026 only authorised CBAM declarants may import CBAM goods into the EU; authorisation is applied for in the CBAM registry.',
                  zh: '自2026年1月1日起，只有获得授权的CBAM申报人才能向欧盟进口CBAM产品；授权须在CBAM登记系统中申请。',
                  de: 'Seit dem 1. Januar 2026 dürfen nur zugelassene CBAM-Anmelder CBAM-Waren in die EU einführen; die Zulassung wird im CBAM-Register beantragt.' },
                { en: 'One annual CBAM declaration per year: the first, covering 2026 imports, is due by 30 September 2027. Certificate sales start 1 February 2027, and from 2027 the account must hold at least 50% of the embedded emissions at each quarter end.',
                  zh: '每年提交一份CBAM年度申报：首份申报覆盖2026年进口，须于2027年9月30日前提交。证书自2027年2月1日起销售，且自2027年起每季度末账户须持有至少覆盖50%内含排放的证书。',
                  de: 'Eine CBAM-Jahreserklärung pro Jahr: die erste, für Importe 2026, ist bis 30. September 2027 fällig. Der Zertifikatsverkauf beginnt am 1. Februar 2027, und ab 2027 muss das Konto zu jedem Quartalsende mindestens 50% der eingebetteten Emissionen abdecken.' },
                { en: 'Below 50 tonnes of CBAM goods per year the importer is exempt under Reg. (EU) 2025/2083 (cumulative across iron and steel, aluminium, fertilisers and cement; no threshold for electricity and hydrogen); track it across the full year.',
                  zh: '每年CBAM产品低于50公吨的进口商可依据法规(EU) 2025/2083豁免（钢铁、铝、化肥、水泥合并累计；电力和氢不适用该门槛）；请按全年跟踪。',
                  de: 'Unter 50 Tonnen CBAM-Waren pro Jahr ist der Importeur nach VO (EU) 2025/2083 befreit (kumuliert über Eisen und Stahl, Aluminium, Düngemittel und Zement; kein Schwellenwert für Strom und Wasserstoff); übers Jahr verfolgen.' },
                { en: 'Verified actual emissions data from the supplier usually beats the official default values, and the default mark up rises every year (10% in 2026, 20% in 2027, 30% from 2028), so requesting real data pays off increasingly.',
                  zh: '供应商经核实的实际排放数据通常低于官方默认值，且默认值上浮逐年提高（2026年10%、2027年20%、2028年起30%），索取真实数据的价值越来越大。',
                  de: 'Verifizierte Ist-Emissionsdaten des Lieferanten schlagen meist die offiziellen Standardwerte, und der Aufschlag auf Standardwerte steigt jährlich (10% 2026, 20% 2027, 30% ab 2028), echte Daten lohnen sich also zunehmend.' }
            ],
            supplier: [
                { en: 'You have no direct legal obligation under CBAM, the EU importer declares and pays. But your emissions data decides how expensive your products are for the buyer.',
                  zh: '您在CBAM下没有直接法律义务，由欧盟进口商申报和缴费。但您的排放数据决定了您的产品对买家而言有多贵。',
                  de: 'Sie haben unter CBAM keine direkte Rechtspflicht, der EU-Importeur deklariert und zahlt. Aber Ihre Emissionsdaten bestimmen, wie teuer Ihre Produkte für den Abnehmer werden.' },
                { en: 'Set up installation level emissions monitoring following the EU CBAM methodology now: data for 2026 production is declared by your buyers in 2027.',
                  zh: '请立即按欧盟CBAM方法学建立设施层面的排放监测：2026年生产的数据将由您的买家在2027年申报。',
                  de: 'Richten Sie jetzt ein Emissionsmonitoring auf Anlagenebene nach der EU-CBAM-Methodik ein: Daten der Produktion 2026 werden von Ihren Abnehmern 2027 deklariert.' },
                { en: 'Expect CBAM cost to appear in price negotiations. A carbon price already paid in your country is credited against the EU cost, keep the evidence.',
                  zh: '预计CBAM成本将进入价格谈判。您所在国已支付的碳价可抵扣欧盟成本，请保留相关凭证。',
                  de: 'Rechnen Sie damit, dass CBAM-Kosten in Preisverhandlungen auftauchen. Ein im Herkunftsland bereits gezahlter CO₂-Preis wird angerechnet, Nachweise aufbewahren.' },
                { en: 'Lower carbon routes (scrap based steel, secondary aluminium, renewable electricity) directly reduce the border cost and become a sales argument.',
                  zh: '更低碳的生产路线（废钢炼钢、再生铝、可再生电力）可直接降低边境成本，并成为销售卖点。',
                  de: 'CO₂-ärmere Routen (Schrottstahl, Sekundäraluminium, erneuerbarer Strom) senken die Grenzkosten direkt und werden zum Verkaufsargument.' }
            ]
        },
        actions: [
            { en: 'Check the 8 digit CN codes of your products against the CBAM scope (iron and steel, aluminium, cement, fertilisers, electricity, hydrogen). The calculator warns if a code does not match the sector.',
              zh: '对照CBAM适用范围（钢铁、铝、水泥、化肥、电力、氢）核查产品的8位CN编码。计算器会在编码与行业不符时提示。',
              de: 'Die 8-stelligen CN-Codes Ihrer Produkte gegen den CBAM-Anwendungsbereich prüfen (Eisen und Stahl, Aluminium, Zement, Düngemittel, Strom, Wasserstoff). Der Rechner warnt bei unpassenden Codes.' },
            { en: 'Estimate the cost per product and year with the CBAM Calculator, the phase in makes the same product more expensive every year until 2034.',
              zh: '使用CBAM计算器按产品和年份估算成本，随着过渡期推进，同一产品的成本到2034年前逐年上升。',
              de: 'Mit dem CBAM-Rechner die Kosten je Produkt und Jahr schätzen, durch den Phase-in wird dasselbe Produkt bis 2034 jedes Jahr teurer.' },
            { en: 'Agree with your buyer who collects installation data and in which format, before the 2027 declaration season.',
              zh: '在2027年申报季之前，与买家约定由谁收集设施数据以及采用何种格式。',
              de: 'Mit dem Abnehmer klären, wer Anlagendaten erhebt und in welchem Format, vor der Erklärungssaison 2027.' },
            { en: 'Watch the proposed downstream extension: the Commission proposal would add ~180 downstream steel and aluminium products (car parts, appliances) from 2028.',
              zh: '关注拟议的下游扩展：欧盟委员会提案拟自2028年起新增约180种下游钢铝产品（汽车零部件、家电等）。',
              de: 'Die geplante Downstream-Erweiterung beobachten: Der Kommissionsvorschlag würde ab 2028 rund 180 nachgelagerte Stahl- und Aluminiumprodukte ergänzen (Autoteile, Geräte).' }
        ],
        documents: [
            { en: 'Installation level emissions data, monitored and verified per the EU CBAM methodology',
              zh: '按欧盟CBAM方法学监测并经核实的设施层面排放数据',
              de: 'Emissionsdaten auf Anlagenebene, überwacht und verifiziert nach der EU-CBAM-Methodik' },
            { en: 'CN code list of all products shipped to the EU, mapped to CBAM sectors',
              zh: '所有输欧产品的CN编码清单，并对应CBAM行业类别',
              de: 'CN-Code-Liste aller in die EU gelieferten Produkte, den CBAM-Sektoren zugeordnet' },
            { en: 'Evidence of any carbon price paid in the country of origin (for the deduction)',
              zh: '在原产国已支付碳价的凭证（用于抵扣）',
              de: 'Nachweise über einen im Ursprungsland gezahlten CO₂-Preis (für die Anrechnung)' },
            { en: 'Production route documentation (e.g. BF-BOF vs scrap-EAF for steel), it selects the applicable benchmark',
              zh: '生产路线文件（如钢铁的高炉转炉与废钢电弧炉路线），它决定适用的基准值',
              de: 'Dokumentation der Produktionsroute (z. B. BF-BOF vs. Schrott-EAF bei Stahl), sie bestimmt den anwendbaren Benchmark' }
        ],
        sources: [
            { label: 'Reg. (EU) 2025/2083 (simplification: 50 t threshold, timing)', url: 'https://eur-lex.europa.eu/eli/reg/2025/2083/oj/eng' },
            { label: 'IR (EU) 2025/2620 (benchmarks) and IR (EU) 2025/2621 as corrected by IR (EU) 2026/1740 (default values)', url: 'https://eur-lex.europa.eu/eli/reg_impl/2025/2621/oj/eng' },
            { label: 'European Commission: CBAM', url: 'https://taxation-customs.ec.europa.eu/carbon-border-adjustment-mechanism_en' }
        ]
    },

    eudr: {
        roles: {
            office: [
                { en: 'If your company is the first to place covered products on the EU market, it is the operator: it runs the due diligence and files the due diligence statement (DDS) in the EU information system before import. Obligations start 30 December 2026 (micro and small companies established by end 2024: 30 June 2027, except timber products, which start 2026 for everyone).',
                  zh: '如果贵公司是首个将受管产品投放欧盟市场的企业，即为经营者：须开展尽职调查，并在进口前通过欧盟信息系统提交尽职调查声明（DDS）。义务自2026年12月30日起适用（2024年底前设立的微型和小型企业为2027年6月30日；木制品除外，对所有企业均自2026年起适用）。',
                  de: 'Ist Ihr Unternehmen der erste, der erfasste Produkte auf den EU-Markt bringt, ist es Marktteilnehmer: Es führt die Sorgfaltsprüfung durch und reicht die Sorgfaltserklärung (DDS) vor dem Import im EU-Informationssystem ein. Die Pflichten gelten ab 30. Dezember 2026 (bis Ende 2024 gegründete Kleinst- und Kleinunternehmen: 30. Juni 2027; Holzprodukte für alle ab 2026).' },
                { en: 'Buying products already placed on the EU market? Since Reg. (EU) 2025/2650 downstream companies no longer file their own DDS: collect the DDS reference numbers from suppliers, keep them 5 years and pass them down the chain. Non-SME downstream companies must register in the information system.',
                  zh: '采购已投放欧盟市场的产品？根据法规(EU) 2025/2650，下游企业不再需要提交自己的DDS：只需向供应商收集DDS编号，保存5年并沿供应链传递。非中小企业的下游公司须在信息系统中注册。',
                  de: 'Kaufen Sie bereits auf dem EU-Markt befindliche Produkte? Seit VO (EU) 2025/2650 reichen nachgelagerte Unternehmen keine eigene DDS mehr ein: DDS-Referenznummern der Lieferanten sammeln, 5 Jahre aufbewahren und weitergeben. Nachgelagerte Nicht-KMU müssen sich im Informationssystem registrieren.' },
                { en: 'China and Vietnam are classified low risk (IR (EU) 2025/1093): simplified due diligence applies for commodities produced there. You still collect the full information and geolocation, but the risk assessment and mitigation steps are waived unless there are indications of risk, such as mixing with unknown origins.',
                  zh: '中国和越南被列为低风险国家（实施条例(EU) 2025/1093）：在当地生产的商品适用简化尽职调查。您仍须收集完整信息和地理定位数据，但除非出现风险迹象（如与来源不明的批次混合），可免于风险评估和缓解步骤。',
                  de: 'China und Vietnam sind als geringes Risiko eingestuft (DVO (EU) 2025/1093): Für dort erzeugte Rohstoffe gilt die vereinfachte Sorgfaltspflicht. Informationen und Geolokalisierung sind weiterhin zu erheben, Risikobewertung und -minderung entfallen aber, solange keine Risikohinweise vorliegen, etwa Vermischung mit unbekannter Herkunft.' },
                { en: 'Member states must provide for maximum fines of at least 4% of EU-wide turnover, plus confiscation and market bans. Keep all due diligence records for 5 years.',
                  zh: '成员国规定的最高罚款不得低于欧盟范围营业额的4%，并可没收产品和禁止上市。所有尽职调查记录须保存5年。',
                  de: 'Die Mitgliedstaaten müssen Höchstbußgelder von mindestens 4% des EU-weiten Umsatzes vorsehen, dazu Beschlagnahme und Marktverbote. Alle Unterlagen 5 Jahre aufbewahren.' }
            ],
            supplier: [
                { en: 'Provide geolocation for every plot of land where the commodities were produced: coordinates to six decimal places, polygons for plots over 4 hectares (for cattle, the establishments). Without this data your buyer cannot file the DDS and cannot import your goods.',
                  zh: '须提供商品生产地每一地块的地理定位：坐标精确到小数点后六位，超过4公顷的地块须提供多边形边界（畜牛则为饲养场所）。没有这些数据，买家就无法提交DDS，也就无法进口您的货物。',
                  de: 'Geolokalisierung für jede Erzeugungsfläche liefern: Koordinaten auf sechs Dezimalstellen, Polygone für Flächen über 4 Hektar (bei Rindern die Betriebe). Ohne diese Daten kann Ihr Abnehmer keine DDS einreichen und nicht importieren.' },
                { en: 'Products must be deforestation free (no production on land deforested after 31 December 2020) and produced in line with the laws of the country of production, from land rights to labour and environmental rules.',
                  zh: '产品必须零毁林（不得来自2020年12月31日后毁林的土地），并须符合生产国法律，涵盖土地权利、劳工和环境规定等。',
                  de: 'Produkte müssen entwaldungsfrei sein (keine Erzeugung auf nach dem 31. Dezember 2020 entwaldeten Flächen) und im Einklang mit dem Recht des Erzeugerlandes stehen, von Landrechten bis Arbeits- und Umweltvorschriften.' },
                { en: 'Map every input containing the seven commodities, including derived products such as furniture, paper, tyres, natural rubber parts and chocolate. Mixing a batch with material of unknown origin makes the whole batch non-compliant.',
                  zh: '梳理含七类商品的全部原料，包括家具、纸张、轮胎、天然橡胶部件和巧克力等衍生产品。批次中混入来源不明的材料将导致整批不合规。',
                  de: 'Jeden Input mit den sieben Rohstoffen erfassen, einschließlich Folgeprodukten wie Möbel, Papier, Reifen, Naturkautschukteile und Schokolade. Vermischung mit Material unbekannter Herkunft macht die ganze Charge non-konform.' },
                { en: 'Production in a low-risk country (China, Vietnam) eases your buyer\'s checks, but the geolocation and legality data requirements stay the same.',
                  zh: '在低风险国家（中国、越南）生产可减轻买家的核查负担，但地理定位和合法性数据要求不变。',
                  de: 'Produktion in einem Land mit geringem Risiko (China, Vietnam) erleichtert die Prüfungen Ihres Abnehmers, die Anforderungen an Geodaten und Legalitätsnachweise bleiben aber gleich.' }
            ]
        },
        actions: [
            { en: 'Inventory which of your products contain cattle, cocoa, coffee, oil palm, rubber, soya or wood, including the derived products listed in Annex I (furniture, paper, tyres and more).',
              zh: '盘点哪些产品含有畜牛、可可、咖啡、油棕、橡胶、大豆或木材，包括附件一所列衍生产品（家具、纸张、轮胎等）。',
              de: 'Erfassen, welche Ihrer Produkte Rinder, Kakao, Kaffee, Ölpalme, Kautschuk, Soja oder Holz enthalten, einschließlich der in Anhang I gelisteten Folgeprodukte (Möbel, Papier, Reifen und mehr).' },
            { en: 'Start collecting plot-level geolocation from your upstream suppliers now, the obligations begin 30 December 2026 and evidence chains take months to build.',
              zh: '立即着手向上游供应商收集地块级地理定位数据，义务自2026年12月30日开始，证据链的建立需要数月时间。',
              de: 'Jetzt mit der Erhebung der Geodaten auf Flächenebene bei Vorlieferanten beginnen, die Pflichten starten am 30. Dezember 2026 und Nachweisketten brauchen Monate.' },
            { en: 'Agree with your EU buyers who acts as the operator filing the DDS, and how DDS reference numbers flow down the chain.',
              zh: '与欧盟买家明确由谁作为经营者提交DDS，以及DDS编号如何沿供应链传递。',
              de: 'Mit den EU-Abnehmern klären, wer als Marktteilnehmer die DDS einreicht und wie DDS-Referenznummern die Kette entlang weitergegeben werden.' },
            { en: 'Set up 5 year record keeping for the due diligence data, batch by batch.',
              zh: '为尽职调查数据建立按批次、保存5年的记录制度。',
              de: 'Eine 5-Jahres-Aufbewahrung der Sorgfaltsdaten je Charge einrichten.' }
        ],
        documents: [
            { en: 'Geolocation coordinates or polygons for every production plot',
              zh: '每一生产地块的地理坐标或多边形边界数据',
              de: 'Geokoordinaten oder Polygone für jede Erzeugungsfläche' },
            { en: 'Legality evidence for each origin (land use and harvest rights, permits)',
              zh: '每一来源地的合法性证明（土地使用与采伐权、许可证）',
              de: 'Legalitätsnachweise je Herkunft (Landnutzungs- und Ernterechte, Genehmigungen)' },
            { en: 'Batch level traceability linking each delivery to its plots',
              zh: '将每批交货关联到具体地块的批次级追溯记录',
              de: 'Chargenbezogene Rückverfolgbarkeit jeder Lieferung zu ihren Flächen' },
            { en: 'DDS reference numbers received from upstream (for downstream companies)',
              zh: '从上游获得的DDS编号（供下游企业使用）',
              de: 'Von vorgelagerten Stufen erhaltene DDS-Referenznummern (für nachgelagerte Unternehmen)' }
        ],
        sources: [
            { label: 'Reg. (EU) 2025/2650 (new application dates, downstream simplification)', url: 'https://eur-lex.europa.eu/eli/reg/2025/2650/oj' },
            { label: 'IR (EU) 2025/1093 (country benchmarking: China and Vietnam low risk)', url: 'https://eur-lex.europa.eu/eli/reg_impl/2025/1093/oj' }
        ]
    },

    ppwr: {
        roles: {
            office: [
                { en: 'The EU importer may only place compliant packaging on the market and must verify the manufacturer\'s conformity assessment and technical documentation (Art. 18). The regulation applies from 12 August 2026.',
                  zh: '欧盟进口商只能将合规包装投放市场，并须核验制造商的合格评定和技术文件（第18条）。该法规自2026年8月12日起适用。',
                  de: 'Der EU-Importeur darf nur konforme Verpackungen in Verkehr bringen und muss Konformitätsbewertung und technische Unterlagen des Herstellers prüfen (Art. 18). Die Verordnung gilt ab 12. August 2026.' },
                { en: 'Extended producer responsibility: registration and fees per member state, based on per SKU packaging data. Fee modulation rewards recyclable design.',
                  zh: '生产者责任延伸：按成员国注册并缴费，依据每个SKU的包装数据。费用调节机制会奖励可回收设计。',
                  de: 'Erweiterte Herstellerverantwortung: Registrierung und Gebühren je Mitgliedstaat auf Basis der Verpackungsdaten pro SKU. Die Gebührenmodulation belohnt recyclingfähiges Design.' },
                { en: 'From 1 January 2030 at the earliest (exact dates depend on the delegated and implementing acts): packaging must reach recyclability grade A, B or C, plastic packaging needs minimum recycled content, and grouped, transport and e-commerce packaging must keep the empty space ratio at or below 50%.',
                  zh: '最早自2030年1月1日起（具体日期取决于授权和实施法案）：包装须达到A、B或C级可回收等级，塑料包装须含最低比例再生材料，组合包装、运输包装和电商包装的空隙率不得超过50%。',
                  de: 'Frühestens ab 1. Januar 2030 (genaue Termine hängen von den delegierten und Durchführungsrechtsakten ab): Verpackungen müssen Recyclingklasse A, B oder C erreichen, Kunststoffverpackungen brauchen Mindestrezyklatanteile, und Um-, Transport- und E-Commerce-Verpackungen müssen einen Leerraumanteil von höchstens 50% einhalten.' },
                { en: 'From 1 January 2030 certain formats are banned outright (Annex V), including single use plastic packaging for fresh fruit and vegetables under 1.5 kg, hotel toiletry miniatures and single use portion packs in food service. Review affected assortments early.',
                  zh: '自2030年1月1日起，某些包装形式将被彻底禁止（附件五），包括1.5公斤以下生鲜果蔬的一次性塑料包装、酒店洗护小样和餐饮业一次性调料分装。请及早排查受影响的品类。',
                  de: 'Ab 1. Januar 2030 sind bestimmte Formate ganz verboten (Anhang V), darunter Einweg-Kunststoffverpackungen für frisches Obst und Gemüse unter 1,5 kg, Hotel-Miniaturen und Einwegportionspackungen in der Gastronomie. Betroffene Sortimente früh prüfen.' }
            ],
            supplier: [
                { en: 'Design for recycling decides market access: from 2030 packaging must reach grade A, B or C under the EU design-for-recycling criteria, and grade C is banned from 2038. Start assessing your packaging portfolio against the draft criteria.',
                  zh: '可回收设计决定市场准入：自2030年起，包装须按欧盟可回收设计标准达到A、B或C级，C级自2038年起也将被禁止。请开始对照标准草案评估您的包装组合。',
                  de: 'Design for Recycling entscheidet über den Marktzugang: Ab 2030 müssen Verpackungen nach den EU-Kriterien Klasse A, B oder C erreichen, Klasse C ist ab 2038 verboten. Prüfen Sie Ihr Verpackungsportfolio gegen die Kriterienentwürfe.' },
                { en: 'Minimum recycled content per plastic part from 2030: 30% for contact sensitive PET packaging, 10% for other contact sensitive plastic, 30% for single use beverage bottles, 35% for other plastic packaging, with evidence per plant and year.',
                  zh: '自2030年起每个塑料部件的最低再生含量：接触敏感PET包装30%，其他接触敏感塑料10%，一次性饮料瓶30%，其他塑料包装35%，并须按工厂和年度提供证明。',
                  de: 'Mindestrezyklatanteil je Kunststoffteil ab 2030: 30% für kontaktsensitive PET-Verpackungen, 10% für sonstige kontaktsensitive Kunststoffe, 30% für Einweggetränkeflaschen, 35% für übrige Kunststoffverpackungen, mit Nachweis je Werk und Jahr.' },
                { en: 'Buyers will ask for a full packaging data sheet per SKU: material, component weights, recyclability grade, recycled share. The same data feeds EU EPR fees and the UK pEPR scheme.',
                  zh: '买家将要求提供每个SKU的完整包装数据表：材料、组件重量、可回收等级、再生比例。这些数据同时用于欧盟EPR费用和英国pEPR制度。',
                  de: 'Abnehmer verlangen ein vollständiges Verpackungsdatenblatt je SKU: Material, Komponentengewichte, Recyclingklasse, Rezyklatanteil. Dieselben Daten speisen die EU-EPR-Gebühren und das britische pEPR-System.' },
                { en: 'Harmonised material composition labelling arrives from 12 August 2028 at the earliest (once the implementing acts are in place): plan artwork and tooling changes with lead time.',
                  zh: '统一的材料成分标签最早自2028年8月12日起实施（待实施法案出台）：请为包装印刷和模具调整预留充足时间。',
                  de: 'Die harmonisierte Materialkennzeichnung kommt frühestens ab 12. August 2028 (sobald die Durchführungsrechtsakte stehen): Artwork- und Werkzeugänderungen mit Vorlauf planen.' }
            ]
        },
        actions: [
            { en: 'Measure the empty space ratio of your e-commerce, transport and grouped packaging against the 50% cap; filler material like air cushions counts as empty space.',
              zh: '对照50%上限测量电商、运输和组合包装的空隙率；气垫等填充材料计入空隙。',
              de: 'Den Leerraumanteil Ihrer E-Commerce-, Transport- und Umverpackungen gegen die 50%-Grenze messen; Füllmaterial wie Luftpolster zählt als Leerraum.' },
            { en: 'Check your assortment against the Annex V ban list (fresh produce under 1.5 kg, miniatures, portion packs) and plan alternatives before 2030.',
              zh: '对照附件五禁令清单（1.5公斤以下生鲜、小样、分装）排查品类，并在2030年前规划替代方案。',
              de: 'Das Sortiment gegen die Verbotsliste in Anhang V prüfen (Frischware unter 1,5 kg, Miniaturen, Portionspackungen) und vor 2030 Alternativen planen.' },
            { en: 'Secure post consumer recycled material sources for plastic packaging now, certified supply is the bottleneck for the 2030 quotas.',
              zh: '现在就锁定塑料包装的消费后再生材料来源，经认证的供应是达成2030年配额的瓶颈。',
              de: 'Jetzt Quellen für Post-Consumer-Rezyklat sichern, zertifizierte Ware ist der Engpass für die 2030er-Quoten.' },
            { en: 'Build one packaging data sheet per SKU (material, weight, grade, recycled share), it serves PPWR conformity, EU EPR fees and UK pEPR at once.',
              zh: '为每个SKU建立一份包装数据表（材料、重量、等级、再生比例），可同时满足PPWR合规、欧盟EPR费用和英国pEPR要求。',
              de: 'Ein Verpackungsdatenblatt je SKU aufbauen (Material, Gewicht, Klasse, Rezyklatanteil), es bedient PPWR-Konformität, EU-EPR-Gebühren und UK-pEPR zugleich.' }
        ],
        documents: [
            { en: 'Per component packaging specification: material, weight, recyclability grade, recycled share',
              zh: '每个组件的包装规格：材料、重量、可回收等级、再生比例',
              de: 'Verpackungsspezifikation je Komponente: Material, Gewicht, Recyclingklasse, Rezyklatanteil' },
            { en: 'Conformity assessment and technical documentation for the packaging requirements (Art. 5 to 12)',
              zh: '针对包装要求的合格评定与技术文件（第5至12条）',
              de: 'Konformitätsbewertung und technische Unterlagen zu den Verpackungsanforderungen (Art. 5 bis 12)' },
            { en: 'Recycled content evidence per plant and calendar year',
              zh: '按工厂和日历年度的再生含量证明',
              de: 'Rezyklatnachweise je Werk und Kalenderjahr' },
            { en: 'Label artwork per the harmonised marking specifications (from 2028)',
              zh: '符合统一标识规范的标签设计稿（自2028年起）',
              de: 'Etiketten-Artwork nach den harmonisierten Kennzeichnungsvorgaben (ab 2028)' }
        ],
        sources: [
            { label: 'European Commission: packaging waste', url: 'https://environment.ec.europa.eu/topics/waste-and-recycling/packaging-waste_en' }
        ]
    },

    batteries: {
        roles: {
            office: [
                { en: 'Products with batteries that you place on the EU market must comply with lifecycle requirements from raw material sourcing through to collection and recycling; the requirements phase in step by step, so track each date against your product range.',
                  zh: '您投放欧盟市场的含电池产品须满足从原材料采购到收集回收的全生命周期要求；各项要求分阶段生效，请按产品线逐一核对生效日期。',
                  de: 'Produkte mit Batterien, die Sie auf dem EU-Markt platzieren, müssen Lebenszyklusanforderungen von der Rohstoffbeschaffung bis zu Sammlung und Recycling erfüllen; die Anforderungen greifen gestaffelt, prüfen Sie jeden Termin gegen Ihr Sortiment.' },
                { en: 'From 18 February 2027 EV, LMT and industrial batteries above 2 kWh need a digital battery passport, and QR code marking applies from the same date: plan the data collection with your suppliers well ahead.',
                  zh: '自2027年2月18日起，电动车电池、轻型交通工具电池及2千瓦时以上工业电池须配备数字电池护照，二维码标识自同日起适用：请提前与供应商规划数据收集。',
                  de: 'Ab dem 18. Februar 2027 brauchen EV-, LMT- und Industriebatterien über 2 kWh einen digitalen Batteriepass, die QR-Code-Kennzeichnung gilt ab demselben Datum: Planen Sie die Datenerhebung mit Ihren Lieferanten rechtzeitig.' },
                { en: 'The general harmonised label applies from 18 August 2026 or 18 months after the labelling implementing act enters into force, whichever is later; the act was still in draft in early 2026, so expect late 2027/2028. The carbon footprint declaration still awaits its delegated act, watch both timelines.',
                  zh: '统一标签自2026年8月18日或标签实施法案生效后18个月（以较晚者为准）起适用；该法案2026年初仍为草案，预计实际适用时间为2027年底至2028年。碳足迹声明尚待授权法案，请同时关注两条时间线。',
                  de: 'Das allgemeine harmonisierte Etikett gilt ab dem 18. August 2026 oder 18 Monate nach Inkrafttreten des Kennzeichnungs-Durchführungsrechtsakts, je nachdem, was später eintritt; der Rechtsakt lag Anfang 2026 erst im Entwurf vor, realistisch ist Ende 2027/2028. Die Erklärung zum CO2-Fußabdruck wartet noch auf ihren delegierten Rechtsakt, beide Zeitschienen beobachten.' },
                { en: 'Supply chain due diligence for cobalt, lithium, nickel and natural graphite was postponed to 18 August 2027 by Reg. (EU) 2025/1561: use the extra time to obtain raw material origin information from your cell and battery suppliers.',
                  zh: '钴、锂、镍和天然石墨的供应链尽职调查已由法规(EU) 2025/1561推迟至2027年8月18日：请利用多出的时间向电芯和电池供应商获取原材料来源信息。',
                  de: 'Die Sorgfaltspflicht in der Lieferkette für Kobalt, Lithium, Nickel und Naturgraphit wurde durch VO (EU) 2025/1561 auf den 18. August 2027 verschoben: Nutzen Sie die Zeit, um Herkunftsangaben zu Rohstoffen von Ihren Zell- und Batterielieferanten einzuholen.' }
            ],
            supplier: [
                { en: 'The legal obligations sit with the companies placing batteries on the EU market, but they can only meet them with data from you: expect detailed requests on materials, recycled content and production.',
                  zh: '法律义务由将电池投放欧盟市场的企业承担，但没有您的数据他们无法履行：请预计买家将详细询问材料、再生成分和生产情况。',
                  de: 'Die Rechtspflichten liegen bei den Unternehmen, die Batterien auf den EU-Markt bringen, erfüllen können sie sie aber nur mit Ihren Daten: Rechnen Sie mit detaillierten Anfragen zu Materialien, Rezyklatanteilen und Produktion.' },
                { en: 'Prepare the data set your buyers need for the battery passport and QR marking from 18 February 2027 (EV, LMT and industrial batteries above 2 kWh), and agree formats and responsibilities early.',
                  zh: '请为买家准备2027年2月18日起电池护照和二维码标识所需的数据（电动车、轻型交通工具及2千瓦时以上工业电池），并尽早约定格式和分工。',
                  de: 'Stellen Sie den Datensatz zusammen, den Ihre Abnehmer ab dem 18. Februar 2027 für Batteriepass und QR-Kennzeichnung brauchen (EV-, LMT- und Industriebatterien über 2 kWh), und klären Sie Formate und Zuständigkeiten früh.' },
                { en: 'Trace cobalt, lithium, nickel and natural graphite back to their origin: from 18 August 2027 your buyers must run due diligence on these raw materials and will ask you for evidence.',
                  zh: '请将钴、锂、镍和天然石墨追溯至来源：自2027年8月18日起，买家须对这些原材料开展尽职调查，并会向您索取证明。',
                  de: 'Verfolgen Sie Kobalt, Lithium, Nickel und Naturgraphit bis zum Ursprung zurück: Ab dem 18. August 2027 müssen Ihre Abnehmer für diese Rohstoffe eine Sorgfaltsprüfung durchführen und werden Nachweise verlangen.' },
                { en: 'Design to the EU requirements: minimum recycled content thresholds apply, and portable batteries must be removable and replaceable. Document your recycled content shares so buyers can demonstrate them.',
                  zh: '请按欧盟要求设计产品：适用最低再生成分门槛，便携式电池须可拆卸、可更换。请记录再生成分比例，以便买家举证。',
                  de: 'Konstruieren Sie nach den EU-Vorgaben: Es gelten Mindestschwellen für Rezyklatanteile, und Gerätebatterien müssen entnehmbar und austauschbar sein. Dokumentieren Sie Ihre Rezyklatanteile, damit Abnehmer sie nachweisen können.' }
            ]
        },
        actions: [
            { en: 'Identify which of your products contain batteries in scope, from portable cells in electronics to EV, LMT and industrial batteries above 2 kWh; the category decides which requirements and dates apply.',
              zh: '确认哪些产品含有受管电池，从电子产品中的便携电芯到电动车、轻型交通工具及2千瓦时以上工业电池；类别决定适用哪些要求和日期。',
              de: 'Ermitteln, welche Ihrer Produkte erfasste Batterien enthalten, von tragbaren Zellen in Elektronik bis zu EV-, LMT- und Industriebatterien über 2 kWh; die Kategorie bestimmt Anforderungen und Termine.' },
            { en: 'Build the battery passport data set with your suppliers before 18 February 2027 and agree who compiles and maintains it.',
              zh: '在2027年2月18日前与供应商共同建立电池护照数据集，并约定由谁编制和维护。',
              de: 'Den Batteriepass-Datensatz vor dem 18. Februar 2027 mit den Lieferanten aufbauen und klären, wer ihn erstellt und pflegt.' },
            { en: 'Map the raw material chain for cobalt, lithium, nickel and natural graphite ahead of the due diligence start on 18 August 2027.',
              zh: '在2027年8月18日尽职调查义务开始前，梳理钴、锂、镍和天然石墨的原材料链条。',
              de: 'Die Rohstoffkette für Kobalt, Lithium, Nickel und Naturgraphit vor dem Start der Sorgfaltspflicht am 18. August 2027 erfassen.' },
            { en: 'Track the pending implementing and delegated acts (harmonised label, carbon footprint declaration): the dates float with their adoption, with the label expected late 2027/2028.',
              zh: '跟踪尚待出台的实施法案和授权法案（统一标签、碳足迹声明）：日期随其通过时间浮动，标签预计2027年底至2028年适用。',
              de: 'Die ausstehenden Durchführungs- und delegierten Rechtsakte verfolgen (harmonisiertes Etikett, CO2-Fußabdruck-Erklärung): Die Termine hängen an deren Erlass, das Etikett wird für Ende 2027/2028 erwartet.' }
        ],
        documents: [
            { en: 'Battery passport data set for EV, LMT and industrial batteries above 2 kWh (required from 18 February 2027)',
              zh: '电动车、轻型交通工具及2千瓦时以上工业电池的电池护照数据集（自2027年2月18日起要求）',
              de: 'Batteriepass-Datensatz für EV-, LMT- und Industriebatterien über 2 kWh (erforderlich ab 18. Februar 2027)' },
            { en: 'Raw material origin records for cobalt, lithium, nickel and natural graphite (due diligence from 18 August 2027)',
              zh: '钴、锂、镍和天然石墨的原材料来源记录（尽职调查自2027年8月18日起）',
              de: 'Herkunftsnachweise für Kobalt, Lithium, Nickel und Naturgraphit (Sorgfaltspflicht ab 18. August 2027)' },
            { en: 'Evidence of recycled content shares used in battery production',
              zh: '电池生产所用再生成分比例的证明材料',
              de: 'Nachweise über die Rezyklatanteile in der Batterieproduktion' },
            { en: 'Technical documentation on removability and replaceability of portable batteries',
              zh: '便携式电池可拆卸性和可更换性的技术文件',
              de: 'Technische Dokumentation zur Entnehmbarkeit und Austauschbarkeit von Gerätebatterien' }
        ],
        sources: [ { label: 'Reg. (EU) 2025/1561 (due diligence postponed to 18 Aug 2027)', url: 'https://eur-lex.europa.eu/eli/reg/2025/1561/oj' } ]
    },

    forcedlabour: {
        roles: {
            office: [
                { en: 'From 14 December 2027 products made with forced labour may not be placed on the EU market. The prohibition applies at any stage of production, manufacture, harvest or extraction, to every product category and every origin.',
                  zh: '自2027年12月14日起，涉及强迫劳动的产品不得投放欧盟市场。该禁令适用于生产、制造、收获或开采的任何阶段，覆盖所有产品类别和所有原产地。',
                  de: 'Ab dem 14. Dezember 2027 dürfen mit Zwangsarbeit hergestellte Produkte nicht mehr auf dem EU-Markt platziert werden. Das Verbot gilt in jeder Stufe von Produktion, Herstellung, Ernte oder Rohstoffgewinnung, für jede Produktkategorie und jede Herkunft.' },
                { en: 'Competent authorities can request supply chain information and evidence that products are free of forced labour, and the burden of proof lies with the operator: without documented chain visibility you cannot defend a product under investigation.',
                  zh: '主管机构可要求提供供应链信息以及产品不涉及强迫劳动的证据，且举证责任在经营者：若无成文的供应链可视化记录，被调查的产品将无从辩护。',
                  de: 'Die zuständigen Behörden können Lieferketteninformationen und Nachweise verlangen, dass Produkte frei von Zwangsarbeit sind, und die Beweislast liegt beim Wirtschaftsakteur: Ohne dokumentierte Transparenz in der Kette lässt sich ein Produkt in einer Untersuchung nicht verteidigen.' },
                { en: 'The consequences are product based: a ban from the EU market plus mandatory withdrawal and disposal of non compliant goods already in circulation, so a finding hits the whole affected product line, not just a single shipment.',
                  zh: '后果以产品为单位：禁止进入欧盟市场，且已流通的不合规货品须强制撤回并销毁，一旦认定成立，受影响的是整个产品线而非单批货物。',
                  de: 'Die Folgen setzen am Produkt an: Verbot auf dem EU-Markt plus verpflichtender Rückruf und Entsorgung bereits im Umlauf befindlicher Ware. Eine Feststellung trifft damit die gesamte betroffene Produktlinie, nicht nur eine einzelne Lieferung.' },
                { en: 'Start supply chain mapping now, beyond tier 1 and down to raw materials where feasible: evidence chains take time to build, and the regulation applies from 14 December 2027.',
                  zh: '请立即开始供应链梳理，超越一级供应商并尽可能追溯到原材料：证据链的建立需要时间，而法规自2027年12月14日起适用。',
                  de: 'Beginnen Sie jetzt mit dem Lieferketten-Mapping, über Tier 1 hinaus und wo machbar bis zu den Rohstoffen: Nachweisketten brauchen Zeit, und die Verordnung gilt ab dem 14. Dezember 2027.' }
            ],
            supplier: [
                { en: 'The prohibition attaches to the product: forced labour at any stage, including at your sub suppliers or in raw material extraction, blocks the product from the EU market regardless of who placed it there.',
                  zh: '禁令针对产品本身：任何阶段涉及强迫劳动，包括您的次级供应商或原材料开采环节，都会导致产品被禁止进入欧盟市场，无论由谁投放。',
                  de: 'Das Verbot haftet am Produkt: Zwangsarbeit in irgendeiner Stufe, auch bei Ihren Unterlieferanten oder in der Rohstoffgewinnung, sperrt das Produkt für den EU-Markt, egal wer es dort platziert.' },
                { en: 'Expect your buyers to request workforce documentation and evidence covering your own factories and your upstream chain: the burden of proof sits with them, so they cannot answer an authority request without your records.',
                  zh: '请预计买家将索取覆盖您自有工厂及上游链条的用工文件和证据：举证责任在他们，没有您的记录他们无法答复主管机构的问询。',
                  de: 'Rechnen Sie damit, dass Ihre Abnehmer Personalunterlagen und Nachweise zu Ihren eigenen Werken und Ihrer vorgelagerten Kette anfordern: Die Beweislast liegt bei ihnen, ohne Ihre Unterlagen können sie eine Behördenanfrage nicht beantworten.' },
                { en: 'Keep orderly records of recruitment, contracts, working hours and wage payments, and map your sub suppliers and raw material origins: well kept documentation is the strongest defence in an investigation.',
                  zh: '请规范保存招聘、合同、工时和工资支付记录，并梳理次级供应商和原材料来源：完备的文件是调查中最有力的辩护。',
                  de: 'Führen Sie geordnete Aufzeichnungen zu Rekrutierung, Verträgen, Arbeitszeiten und Lohnzahlungen und erfassen Sie Unterlieferanten und Rohstoffherkünfte: Saubere Dokumentation ist die stärkste Verteidigung in einer Untersuchung.' },
                { en: 'A finding does not end in a negotiable fine but in withdrawal and disposal of the goods, so buyers will favour suppliers who can demonstrate a clean chain: treat transparency as a commercial requirement.',
                  zh: '认定成立的后果不是可协商的罚款，而是货品撤回和销毁，因此买家会青睐能证明链条清白的供应商：请把透明度当作一项商业要求。',
                  de: 'Eine Feststellung endet nicht in einer verhandelbaren Geldbuße, sondern in Rückruf und Entsorgung der Ware. Abnehmer werden daher Lieferanten bevorzugen, die eine saubere Kette belegen können: Behandeln Sie Transparenz als kommerzielle Anforderung.' }
            ]
        },
        actions: [
            { en: 'Map the supply chain beyond tier 1, down to raw materials where feasible, and record who does what at each stage of production, manufacture, harvest or extraction.',
              zh: '梳理一级供应商之外的供应链，尽可能追溯至原材料，并记录生产、制造、收获或开采各阶段的参与方及分工。',
              de: 'Die Lieferkette über Tier 1 hinaus erfassen, wo machbar bis zu den Rohstoffen, und festhalten, wer in jeder Stufe von Produktion, Herstellung, Ernte oder Rohstoffgewinnung was tut.' },
            { en: 'Collect and organise workforce evidence (recruitment practices, contracts, working hours, wages) for your own sites and request the same from key sub suppliers.',
              zh: '收集并整理自有工厂的用工证据（招聘做法、合同、工时、工资），并要求主要次级供应商提供同类材料。',
              de: 'Personalnachweise für die eigenen Standorte sammeln und ordnen (Rekrutierungspraxis, Verträge, Arbeitszeiten, Löhne) und dasselbe von wichtigen Unterlieferanten anfordern.' },
            { en: 'Agree with your buyers what evidence they expect and in which format, before the regulation applies on 14 December 2027.',
              zh: '在法规于2027年12月14日适用之前，与买家约定他们需要哪些证据以及采用何种格式。',
              de: 'Mit den Abnehmern klären, welche Nachweise sie in welchem Format erwarten, bevor die Verordnung am 14. Dezember 2027 gilt.' },
            { en: 'Set up a process to respond quickly to information requests: authorities can demand supply chain evidence, and the burden of proof is on the operator.',
              zh: '建立快速响应信息问询的流程：主管机构可要求提供供应链证据，且举证责任在经营者。',
              de: 'Einen Prozess für schnelle Antworten auf Auskunftsersuchen einrichten: Behörden können Lieferkettennachweise verlangen, und die Beweislast liegt beim Wirtschaftsakteur.' }
        ],
        documents: [
            { en: 'Supply chain map covering sub suppliers and raw material origins',
              zh: '覆盖次级供应商和原材料来源的供应链图谱',
              de: 'Lieferketten-Übersicht einschließlich Unterlieferanten und Rohstoffherkünften' },
            { en: 'Workforce records: recruitment practices, contracts, working hours and wage payments',
              zh: '用工记录：招聘做法、合同、工时和工资支付',
              de: 'Personalunterlagen: Rekrutierungspraxis, Verträge, Arbeitszeiten und Lohnzahlungen' },
            { en: 'Supplier declarations and audit evidence on forced labour risks in the upstream chain',
              zh: '关于上游链条强迫劳动风险的供应商声明和审核证据',
              de: 'Lieferantenerklärungen und Auditnachweise zu Zwangsarbeitsrisiken in der vorgelagerten Kette' },
            { en: 'A documented procedure for answering authority information requests',
              zh: '答复主管机构信息问询的成文流程',
              de: 'Ein dokumentiertes Verfahren zur Beantwortung behördlicher Auskunftsersuchen' }
        ],
        sources: []
    },

    empco: {
        roles: {
            office: [
                { en: 'From 27 September 2026 generic environmental claims such as "eco-friendly", "green" or "climate neutral" are banned unless recognised excellent environmental performance backs them: review every product text, packaging and web page before that date.',
                  zh: '自2026年9月27日起，"环保"、"绿色"、"气候中和"等泛泛环境声明将被禁止，除非有公认的卓越环境绩效作为支撑：请在该日期前审查所有产品文案、包装和网页。',
                  de: 'Ab dem 27. September 2026 sind pauschale Umweltaussagen wie "umweltfreundlich", "grün" oder "klimaneutral" verboten, sofern keine anerkannte hervorragende Umweltleistung dahintersteht: Prüfen Sie jeden Produkttext, jede Verpackung und jede Webseite vor diesem Datum.' },
                { en: 'Claims that rest solely on carbon offsetting are prohibited: product ranges marketed on compensation need new positioning.',
                  zh: '仅基于碳抵消的声明被禁止：以碳补偿为卖点的产品线需要重新定位。',
                  de: 'Aussagen, die allein auf CO2-Kompensation beruhen, sind verboten: Produktlinien, die über Kompensation vermarktet werden, brauchen eine neue Positionierung.' },
                { en: 'Sustainability labels are only permitted if based on an approved certification scheme or established by public authorities: inventory every label and logo you use and check the basis of each one.',
                  zh: '可持续性标签仅在基于经批准的认证体系或由公共机构设立时方可使用：请盘点所用的每个标签和标识，并核查其依据。',
                  de: 'Nachhaltigkeitssiegel sind nur zulässig, wenn sie auf einem zugelassenen Zertifizierungssystem beruhen oder von Behörden eingeführt wurden: Erfassen Sie jedes verwendete Siegel und Logo und prüfen Sie dessen Grundlage.' },
                { en: 'Enforcement runs through national unfair commercial practices regimes, so fines and injunctions vary by member state. With the separate Green Claims proposal stalled (the Commission announced an intended withdrawal in June 2025 but has not formally withdrawn it), this directive is the operative EU rule against greenwashing.',
                  zh: '执法通过各国反不正当商业行为制度进行，罚款和禁令因成员国而异。由于单独的绿色声明指令提案已陷入停滞（欧盟委员会2025年6月宣布拟撤回但尚未正式撤回），本指令是欧盟现行有效的反漂绿规则。',
                  de: 'Die Durchsetzung läuft über die nationalen Regime gegen unlautere Geschäftspraktiken, Bußgelder und Unterlassungsverfügungen variieren daher je Mitgliedstaat. Da der separate Green-Claims-Vorschlag festhängt (die Kommission kündigte im Juni 2025 die beabsichtigte Rücknahme an, hat ihn aber nicht formell zurückgezogen), ist diese Richtlinie die maßgebliche EU-Regel gegen Greenwashing.' }
            ],
            supplier: [
                { en: 'The directive targets consumer facing marketing in the EU, so the legal duty sits with brands, retailers and importers, not with you as manufacturer. But claims often originate in supplier materials: expect buyers to scrutinise the wording you deliver.',
                  zh: '该指令针对欧盟面向消费者的营销，法律义务由品牌、零售商和进口商承担，而非您这样的制造商。但声明往往源自供应商提供的材料：请预计买家将严格审查您交付的措辞。',
                  de: 'Die Richtlinie zielt auf verbrauchergerichtetes Marketing in der EU, die Rechtspflicht liegt also bei Marken, Händlern und Importeuren, nicht bei Ihnen als Hersteller. Aussagen entstehen aber oft in Lieferantenunterlagen: Rechnen Sie damit, dass Abnehmer Ihre Formulierungen genau prüfen.' },
                { en: 'Remove generic green wording ("eco-friendly", "green", "climate neutral") from product descriptions, packaging artwork and materials you prepare for EU buyers, unless the buyer confirms the claim can be substantiated.',
                  zh: '请从为欧盟买家准备的产品描述、包装设计和资料中删除泛泛的绿色措辞（"环保"、"绿色"、"气候中和"），除非买家确认该声明能够得到证实。',
                  de: 'Entfernen Sie pauschale grüne Formulierungen ("umweltfreundlich", "grün", "klimaneutral") aus Produktbeschreibungen, Verpackungsgestaltung und Unterlagen für EU-Abnehmer, sofern der Abnehmer nicht bestätigt, dass die Aussage belegbar ist.' },
                { en: 'Only reference sustainability labels that are based on an approved certification scheme or established by public authorities: self created logos on packaging will not survive your buyers\' review.',
                  zh: '仅可引用基于经批准认证体系或由公共机构设立的可持续性标签：自创的包装标识将无法通过买家的审查。',
                  de: 'Verweisen Sie nur auf Nachhaltigkeitssiegel, die auf einem zugelassenen Zertifizierungssystem beruhen oder von Behörden eingeführt wurden: Selbst erdachte Logos auf Verpackungen überstehen die Prüfung Ihrer Abnehmer nicht.' },
                { en: 'The same rules bring durability and repairability information requirements: be ready to provide verified product lifetime and repair information your buyers will need for EU consumers.',
                  zh: '同一规则还带来耐用性和可维修性信息要求：请准备好提供经核实的产品寿命和维修信息，买家面向欧盟消费者时会需要这些内容。',
                  de: 'Dieselben Regeln bringen Informationspflichten zu Haltbarkeit und Reparierbarkeit: Halten Sie geprüfte Angaben zu Lebensdauer und Reparatur bereit, die Ihre Abnehmer für EU-Verbraucher benötigen.' }
            ]
        },
        actions: [
            { en: 'Audit all environmental claims on products, packaging and online listings against the new rules before 27 September 2026.',
              zh: '在2026年9月27日前，对照新规审查产品、包装和线上页面上的所有环境声明。',
              de: 'Alle Umweltaussagen auf Produkten, Verpackungen und Online-Angeboten vor dem 27. September 2026 gegen die neuen Regeln prüfen.' },
            { en: 'Verify that every sustainability label you display is based on an approved certification scheme or established by public authorities, and drop the rest.',
              zh: '核实所展示的每个可持续性标签均基于经批准的认证体系或由公共机构设立，其余一律弃用。',
              de: 'Prüfen, ob jedes verwendete Nachhaltigkeitssiegel auf einem zugelassenen Zertifizierungssystem beruht oder behördlich eingeführt ist, und den Rest streichen.' },
            { en: 'Rework any marketing that relies solely on carbon offsetting; such claims are prohibited.',
              zh: '重做任何仅依赖碳抵消的营销内容；此类声明已被禁止。',
              de: 'Jedes Marketing überarbeiten, das allein auf CO2-Kompensation beruht; solche Aussagen sind verboten.' },
            { en: 'Align claim wording between buyer and supplier: agree which claims remain, and document the evidence behind each of them.',
              zh: '在买卖双方之间统一声明措辞：约定保留哪些声明，并为每项声明留存证据。',
              de: 'Formulierungen zwischen Abnehmer und Lieferant abstimmen: festlegen, welche Aussagen bleiben, und die Belege zu jeder einzelnen dokumentieren.' }
        ],
        documents: [
            { en: 'Inventory of all environmental claims used on products, packaging and web shops',
              zh: '产品、包装和网店所用全部环境声明的清单',
              de: 'Inventar aller Umweltaussagen auf Produkten, Verpackungen und in Webshops' },
            { en: 'Certification evidence for every sustainability label displayed (scheme, issuer, validity)',
              zh: '所展示每个可持续性标签的认证证据（体系、颁发方、有效期）',
              de: 'Zertifizierungsnachweise für jedes verwendete Nachhaltigkeitssiegel (System, Aussteller, Gültigkeit)' },
            { en: 'Substantiation file for each remaining claim (test reports, certificates, calculations)',
              zh: '每项保留声明的证明档案（测试报告、证书、计算依据）',
              de: 'Belegakte für jede verbleibende Aussage (Prüfberichte, Zertifikate, Berechnungen)' },
            { en: 'Durability and repairability information for products sold to EU consumers',
              zh: '面向欧盟消费者销售产品的耐用性和可维修性信息',
              de: 'Angaben zu Haltbarkeit und Reparierbarkeit für an EU-Verbraucher verkaufte Produkte' }
        ],
        sources: [
            { label: 'Green Claims Directive proposal COM(2023) 166 (complementary substantiation rules, stalled)', url: 'https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=COM:2023:166:FIN' }
        ]
    },

    csddd: {
        roles: {
            office: [
                { en: 'After Omnibus I (Directive (EU) 2026/470) the directive covers companies with more than 5,000 employees and more than €1.5B turnover, with due diligence duties from July 2029. Non-EU companies are in scope on more than €1.5B EU turnover alone, without an employee test.',
                  zh: '经Omnibus I修订（指令(EU) 2026/470）后，该指令适用于员工超过5,000人且营业额超过15亿欧元的企业，尽职调查义务自2029年7月起生效。非欧盟企业仅凭欧盟境内营业额超过15亿欧元即纳入范围，不设员工人数门槛。',
                  de: 'Nach Omnibus I (Richtlinie (EU) 2026/470) erfasst die Richtlinie Unternehmen mit mehr als 5.000 Beschäftigten und mehr als 1,5 Mrd. € Umsatz, mit Sorgfaltspflichten ab Juli 2029. Nicht-EU-Unternehmen fallen bereits ab mehr als 1,5 Mrd. € EU-Umsatz in den Anwendungsbereich, ohne Beschäftigtenschwelle.' },
                { en: 'Due diligence is risk based: focus where adverse human rights and environmental impacts are most likely and most severe across the chain of activities, rather than auditing every supplier equally.',
                  zh: '尽职调查以风险为基础：将精力集中在经营活动链中人权和环境不利影响最可能发生、最严重的环节，而非对每家供应商同等审核。',
                  de: 'Die Sorgfaltsprüfung ist risikobasiert: Konzentrieren Sie sich dorthin, wo negative Auswirkungen auf Menschenrechte und Umwelt in der Aktivitätenkette am wahrscheinlichsten und am schwerwiegendsten sind, statt jeden Lieferanten gleich zu auditieren.' },
                { en: 'An annual due diligence statement on identified impacts and the actions taken is required. Omnibus I removed the mandatory adoption of a climate transition plan.',
                  zh: '须每年提交关于已识别影响及所采取措施的尽职调查声明。Omnibus I取消了强制通过气候转型计划的要求。',
                  de: 'Erforderlich ist eine jährliche Sorgfaltserklärung zu festgestellten Auswirkungen und ergriffenen Maßnahmen. Omnibus I hat die Pflicht zur Verabschiedung eines Klima-Transitionsplans gestrichen.' },
                { en: 'Fines are capped at 3% of net worldwide turnover, and civil liability follows member state national law (the EU harmonised liability regime was removed by Omnibus I). In Germany, the governing coalition announced on 1 July 2026 that it plans to narrow the LkSG to the CSDDD thresholds when transposing the directive, starting autumn 2026.',
                  zh: '罚款上限为全球净营业额的3%，民事责任依成员国国内法处理（欧盟统一责任制度已被Omnibus I删除）。在德国，执政联盟于2026年7月1日宣布，计划在转化该指令时将《供应链尽职调查法》（LkSG）的适用范围缩小至CSDDD门槛，自2026年秋季启动。',
                  de: 'Geldbußen sind auf 3% des weltweiten Nettoumsatzes gedeckelt, die zivilrechtliche Haftung richtet sich nach nationalem Recht der Mitgliedstaaten (das EU-harmonisierte Haftungsregime wurde durch Omnibus I gestrichen). In Deutschland kündigte die Koalition am 1. Juli 2026 an, das LkSG bei der Umsetzung der Richtlinie auf die CSDDD-Schwellen zu verengen, beginnend im Herbst 2026.' }
            ],
            supplier: [
                { en: 'You are not directly regulated, but as part of the chain of activities of large EU customers you will receive due diligence requests: risk questionnaires, policy commitments and site visits.',
                  zh: '您不受该指令直接监管，但作为欧盟大客户经营活动链的一环，您将收到尽职调查要求：风险问卷、政策承诺和实地访问。',
                  de: 'Sie sind nicht direkt reguliert, aber als Teil der Aktivitätenkette großer EU-Kunden werden Sie Sorgfaltsanfragen erhalten: Risikofragebögen, Richtlinienzusagen und Werksbesuche.' },
                { en: 'The risk based approach means attention concentrates where impacts are most likely and most severe: labour intensive production steps and higher risk inputs will get the deepest scrutiny.',
                  zh: '基于风险的方法意味着关注点集中在影响最可能发生、最严重之处：劳动密集的生产环节和较高风险的原料将受到最深入的审查。',
                  de: 'Der risikobasierte Ansatz bedeutet, dass sich die Aufmerksamkeit dorthin richtet, wo Auswirkungen am wahrscheinlichsten und am schwerwiegendsten sind: Arbeitsintensive Produktionsschritte und risikoreichere Vorprodukte werden am tiefsten geprüft.' },
                { en: 'Only very large companies are directly covered (more than 5,000 employees, more than €1.5B turnover), but their duties reach you through contracts: expect codes of conduct and information clauses in your terms with large buyers.',
                  zh: '仅超大型企业（员工超过5,000人、营业额超过15亿欧元）受直接约束，但其义务会通过合同传导至您：请预计与大买家的条款中将出现行为准则和信息条款。',
                  de: 'Direkt erfasst sind nur sehr große Unternehmen (mehr als 5.000 Beschäftigte, mehr als 1,5 Mrd. € Umsatz), ihre Pflichten erreichen Sie aber über Verträge: Rechnen Sie mit Verhaltenskodizes und Informationsklauseln in Ihren Konditionen mit großen Abnehmern.' },
                { en: 'The duties start in July 2029, and covered buyers will build their programmes before that: suppliers who can already show risk management and remediation processes will be easier to keep on the vendor list.',
                  zh: '义务自2029年7月起生效，受约束的买家会提前搭建其体系：已能展示风险管理和整改流程的供应商更容易留在合格供应商名单上。',
                  de: 'Die Pflichten beginnen im Juli 2029, und erfasste Abnehmer bauen ihre Programme vorher auf: Lieferanten, die bereits Risikomanagement und Abhilfeprozesse vorweisen können, bleiben leichter auf der Lieferantenliste.' }
            ]
        },
        actions: [
            { en: 'Check whether your company or group is directly in scope: more than 5,000 employees and more than €1.5B turnover, or for non-EU companies more than €1.5B EU turnover alone.',
              zh: '核查贵公司或集团是否直接落入范围：员工超过5,000人且营业额超过15亿欧元，非欧盟企业则仅看欧盟境内营业额是否超过15亿欧元。',
              de: 'Prüfen, ob Ihr Unternehmen oder Ihre Gruppe direkt in den Anwendungsbereich fällt: mehr als 5.000 Beschäftigte und mehr als 1,5 Mrd. € Umsatz, bei Nicht-EU-Unternehmen allein mehr als 1,5 Mrd. € EU-Umsatz.' },
            { en: 'Map your chain of activities and identify where human rights and environmental impacts are most likely and most severe; that is where buyer scrutiny will land first.',
              zh: '梳理经营活动链，识别人权和环境影响最可能发生、最严重的环节；买家的审查将首先落在这些环节。',
              de: 'Die Aktivitätenkette erfassen und ermitteln, wo Menschenrechts- und Umweltauswirkungen am wahrscheinlichsten und am schwerwiegendsten sind; dort setzt die Prüfung der Abnehmer zuerst an.' },
            { en: 'Prepare for buyer due diligence requests: policies, risk assessments, remediation processes and evidence you can share on request.',
              zh: '为买家的尽职调查要求做好准备：政策文件、风险评估、整改流程以及可应要求提供的证据。',
              de: 'Auf Sorgfaltsanfragen der Abnehmer vorbereiten: Richtlinien, Risikobewertungen, Abhilfeprozesse und auf Anfrage teilbare Nachweise.' },
            { en: 'If you work under German contracts, follow the LkSG transition: the German regime stays in force for companies with 1,000 or more employees in Germany while the coalition plans to narrow it to the CSDDD thresholds from autumn 2026.',
              zh: '如按德国合同开展业务，请关注LkSG的过渡：在执政联盟计划自2026年秋季起将其缩小至CSDDD门槛期间，德国制度对在德员工不少于1,000人的企业仍然有效。',
              de: 'Bei deutschen Vertragsbeziehungen den LkSG-Übergang verfolgen: Das deutsche Regime gilt für Unternehmen mit 1.000 oder mehr Beschäftigten in Deutschland fort, während die Koalition plant, es ab Herbst 2026 auf die CSDDD-Schwellen zu verengen.' }
        ],
        documents: [
            { en: 'Human rights and environmental risk assessment of your chain of activities',
              zh: '经营活动链的人权与环境风险评估',
              de: 'Menschenrechts- und Umweltrisikobewertung Ihrer Aktivitätenkette' },
            { en: 'Annual due diligence statement covering identified impacts and actions taken',
              zh: '涵盖已识别影响及所采取措施的年度尽职调查声明',
              de: 'Jährliche Sorgfaltserklärung zu festgestellten Auswirkungen und ergriffenen Maßnahmen' },
            { en: 'Supplier codes of conduct and contractual due diligence clauses',
              zh: '供应商行为准则及合同中的尽职调查条款',
              de: 'Verhaltenskodizes für Lieferanten und vertragliche Sorgfaltsklauseln' },
            { en: 'Records of preventive and remedial measures and complaint handling',
              zh: '预防与补救措施及投诉处理的记录',
              de: 'Aufzeichnungen zu Präventions- und Abhilfemaßnahmen sowie zur Beschwerdebearbeitung' }
        ],
        sources: [ { label: 'Dir. (EU) 2026/470 (Omnibus I: thresholds and timing)', url: 'https://eur-lex.europa.eu/eli/dir/2026/470/oj' } ]
    },

    csrd: {
        roles: {
            office: [
                { en: 'Under Omnibus I (Directive (EU) 2026/470, in force 18 March 2026) companies with more than 1,000 employees and more than €450M turnover report from FY2027, with first reports published in 2028.',
                  zh: '根据Omnibus I修订指令（(EU) 2026/470，2026年3月18日生效），员工超过1,000人且营业额超过4.5亿欧元的企业自2027财年起报告，首份报告于2028年发布。',
                  de: 'Nach Omnibus I (Richtlinie (EU) 2026/470, in Kraft seit 18. März 2026) berichten Unternehmen mit mehr als 1.000 Beschäftigten und mehr als 450 Mio. € Umsatz ab dem Geschäftsjahr 2027, die ersten Berichte erscheinen 2028.' },
                { en: 'The report requires a double materiality assessment and follows the European Sustainability Reporting Standards (ESRS), with third party assurance of the reported data.',
                  zh: '报告须进行双重重要性评估，并按欧洲可持续发展报告准则（ESRS）编制，报告数据须经第三方鉴证。',
                  de: 'Der Bericht verlangt eine doppelte Wesentlichkeitsanalyse und folgt den European Sustainability Reporting Standards (ESRS), mit externer Prüfung der berichteten Daten.' },
                { en: 'Disclosure covers Scope 3 emissions, supply chain due diligence processes and supplier sustainability performance: the sourcing office becomes the natural collection point for this data from Asian suppliers.',
                  zh: '披露内容涵盖范围三排放、供应链尽职调查流程及供应商可持续表现：采购办公室自然成为向亚洲供应商收集这些数据的枢纽。',
                  de: 'Offenzulegen sind Scope-3-Emissionen, Sorgfaltsprozesse in der Lieferkette und die Nachhaltigkeitsleistung der Lieferanten: Das Einkaufsbüro wird zur natürlichen Sammelstelle für diese Daten aus Asien.' },
                { en: 'Penalties are set at member state level. Germany has not yet transposed CSRD (due by 19 March 2027); its draft foresees fines up to €10M or 5% of turnover for capital market oriented companies, in line with the existing HGB regime.',
                  zh: '处罚由各成员国规定。德国尚未转化CSRD（期限为2027年3月19日）；其草案对面向资本市场的公司规定最高1,000万欧元或营业额5%的罚款，与现行《商法典》制度一致。',
                  de: 'Sanktionen regeln die Mitgliedstaaten. Deutschland hat die CSRD noch nicht umgesetzt (Frist: 19. März 2027); der Entwurf sieht für kapitalmarktorientierte Unternehmen Geldbußen bis 10 Mio. € oder 5% des Umsatzes vor, im Einklang mit dem bestehenden HGB-Regime.' }
            ],
            supplier: [
                { en: 'You have no direct CSRD obligation, but you are indirectly affected: your EU buyer\'s report must cover its supply chain, so the reporting duty reaches you through data requests.',
                  zh: '您没有直接的CSRD义务，但会间接受到影响：欧盟买家的报告须涵盖其供应链，报告义务因此通过数据请求传导到您。',
                  de: 'Sie haben keine direkte CSRD-Pflicht, sind aber indirekt betroffen: Der Bericht Ihres EU-Abnehmers muss die Lieferkette abdecken, die Pflicht erreicht Sie also über Datenanfragen.' },
                { en: 'Expect requests for factory level energy and emissions data: your production feeds the buyer\'s Scope 3 figures.',
                  zh: '预计买家会索取工厂层面的能耗和排放数据：您的生产构成买家范围三数据的一部分。',
                  de: 'Rechnen Sie mit Anfragen zu Energie- und Emissionsdaten auf Werksebene: Ihre Produktion fließt in die Scope-3-Zahlen des Abnehmers ein.' },
                { en: 'Buyers also report on their due diligence processes and supplier sustainability performance: consistent questionnaire answers and evidence for social and environmental practices become part of the business relationship.',
                  zh: '买家还须报告其尽职调查流程和供应商可持续表现：对问卷的一致回答以及社会与环境实践的证明将成为业务关系的一部分。',
                  de: 'Abnehmer berichten auch über ihre Sorgfaltsprozesse und die Lieferantenleistung: Konsistente Fragebogenantworten und Nachweise zur Sozial- und Umweltpraxis werden Teil der Geschäftsbeziehung.' },
                { en: 'Reported data carries third party assurance, so buyers will prefer figures you can document over estimates: start recording energy use and emissions now, the first reports cover FY2027.',
                  zh: '报告数据须经第三方鉴证，买家因此更青睐有凭证支持的数据而非估算：请立即开始记录能耗和排放，首批报告覆盖2027财年。',
                  de: 'Die Berichtsdaten werden extern geprüft, Abnehmer bevorzugen daher belegbare Zahlen statt Schätzungen: Beginnen Sie jetzt mit der Erfassung von Energieverbrauch und Emissionen, die ersten Berichte decken das Geschäftsjahr 2027 ab.' }
            ]
        },
        actions: [
            { en: 'Check whether your buyer group is in scope (more than 1,000 employees and more than €450M turnover) and note the timeline: FY2027 data, published 2028.',
              zh: '核查买家集团是否在适用范围内（员工超过1,000人且营业额超过4.5亿欧元），并记住时间线：2027财年数据，2028年发布。',
              de: 'Prüfen, ob die Abnehmergruppe in den Anwendungsbereich fällt (mehr als 1.000 Beschäftigte und mehr als 450 Mio. € Umsatz), und die Zeitachse notieren: Daten für das Geschäftsjahr 2027, Veröffentlichung 2028.' },
            { en: 'Agree between office and suppliers which data points the ESRS report needs (energy, emissions, social indicators) and in which format they are delivered.',
              zh: '在办公室与供应商之间约定ESRS报告需要哪些数据点（能耗、排放、社会指标）及交付格式。',
              de: 'Zwischen Büro und Lieferanten festlegen, welche Datenpunkte der ESRS-Bericht braucht (Energie, Emissionen, Sozialindikatoren) und in welchem Format sie geliefert werden.' },
            { en: 'Set up factory level energy and emissions recording so Scope 3 figures rest on documented data rather than estimates.',
              zh: '建立工厂层面的能耗和排放记录，使范围三数据建立在可查证的数据而非估算之上。',
              de: 'Energie- und Emissionserfassung auf Werksebene aufbauen, damit die Scope-3-Zahlen auf dokumentierten Daten statt Schätzungen beruhen.' },
            { en: 'Watch the German transposition (due by 19 March 2027), it will fix the penalty regime that applies to German buyers.',
              zh: '关注德国的转化立法（期限2027年3月19日），它将确定适用于德国买家的处罚制度。',
              de: 'Die deutsche Umsetzung im Blick behalten (Frist: 19. März 2027), sie legt das Sanktionsregime für deutsche Abnehmer fest.' }
        ],
        documents: [
            { en: 'Factory level energy consumption and emissions records (input for the buyer\'s Scope 3 reporting)',
              zh: '工厂层面的能耗与排放记录（供买家范围三报告使用）',
              de: 'Energieverbrauchs- und Emissionsaufzeichnungen auf Werksebene (Input für die Scope-3-Berichterstattung des Abnehmers)' },
            { en: 'Completed sustainability questionnaires, consistent across buyers',
              zh: '填写完毕且在各买家之间口径一致的可持续问卷',
              de: 'Ausgefüllte Nachhaltigkeitsfragebögen, konsistent über alle Abnehmer' },
            { en: 'Policies and certificates evidencing social and environmental practices',
              zh: '证明社会与环境实践的政策文件和证书',
              de: 'Richtlinien und Zertifikate als Nachweis der Sozial- und Umweltpraxis' },
            { en: 'Underlying evidence for every reported figure (the report carries third party assurance)',
              zh: '每项报告数据的原始凭证（报告须经第三方鉴证）',
              de: 'Belege für jede berichtete Zahl (der Bericht wird extern geprüft)' }
        ],
        sources: [
            { label: 'Dir. (EU) 2024/1760 (CSDDD, the related supply chain due diligence directive)', url: 'https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:32024L1760' }
        ]
    },

    dpp: {
        roles: {
            office: [
                { en: 'The ESPR framework is in force since 18 July 2024, but DPP obligations arrive product group by product group via delegated acts: none adopted yet, first expected from 2026, obligations expected 2028 to 2030 (steel first, then textiles and furniture, per the ESPR Working Plan of April 2025).',
                  zh: 'ESPR框架法规自2024年7月18日起生效，但DPP义务将通过授权法案按产品类别逐步落地：目前尚无授权法案通过，首批预计2026年起出台，义务预计2028至2030年生效（按2025年4月ESPR工作计划，钢铁最先，随后是纺织品和家具）。',
                  de: 'Der ESPR-Rahmen gilt seit dem 18. Juli 2024, die DPP-Pflichten kommen aber produktgruppenweise über delegierte Rechtsakte: Noch ist keiner erlassen, die ersten werden ab 2026 erwartet, Pflichten voraussichtlich 2028 bis 2030 (Stahl zuerst, dann Textilien und Möbel, laut ESPR-Arbeitsplan vom April 2025).' },
                { en: 'Each product carries a unique identifier linked to a digital record: materials, origin, carbon footprint, repairability score and end of life instructions.',
                  zh: '每件产品配有唯一标识符，关联到数字记录：材料、原产地、碳足迹、可维修性评分及报废处理说明。',
                  de: 'Jedes Produkt trägt eine eindeutige Kennung, verknüpft mit einem digitalen Datensatz: Materialien, Herkunft, CO₂-Fußabdruck, Reparierbarkeitswert und Hinweise zum Lebensende.' },
                { en: 'Products must carry a data carrier (QR code or RFID) giving consumers and authorities access to the passport; plan packaging and labelling changes with lead time.',
                  zh: '产品须带有数据载体（二维码或RFID），供消费者和监管机构查阅护照信息；请为包装和标签调整预留时间。',
                  de: 'Produkte müssen einen Datenträger tragen (QR-Code oder RFID), über den Verbraucher und Behörden auf den Pass zugreifen; Verpackungs- und Kennzeichnungsänderungen mit Vorlauf planen.' },
                { en: 'Passport data must flow from raw material suppliers through manufacturing to the point of sale in an interoperable format: start testing that data chain with key suppliers before the first delegated acts land.',
                  zh: '护照数据须以互操作格式从原材料供应商经生产环节流转到销售终端：请在首批授权法案落地前，与重点供应商试运行这一数据链。',
                  de: 'Die Passdaten müssen in interoperablem Format vom Rohstofflieferanten über die Fertigung bis zum Verkaufspunkt fließen: Diese Datenkette mit Schlüssellieferanten testen, bevor die ersten delegierten Rechtsakte kommen.' }
            ],
            supplier: [
                { en: 'A large part of the passport content comes from your production: material composition, origin and carbon footprint data will be requested per product, not per company.',
                  zh: '护照内容的很大一部分来自您的生产环节：材料构成、原产地和碳足迹数据将按产品逐一索取，而非按公司。',
                  de: 'Ein großer Teil des Passinhalts stammt aus Ihrer Produktion: Materialzusammensetzung, Herkunft und CO₂-Fußabdruck werden je Produkt abgefragt, nicht je Unternehmen.' },
                { en: 'Textiles and furniture are among the first product categories: if you manufacture in these sectors, expect buyer data requests well before the 2028 to 2030 obligation window.',
                  zh: '纺织品和家具属于首批产品类别：如果您在这些行业生产，买家的数据请求会远早于2028至2030年的义务窗口。',
                  de: 'Textilien und Möbel gehören zu den ersten Produktkategorien: Wer hier fertigt, sollte mit Datenanfragen der Abnehmer deutlich vor dem Pflichtfenster 2028 bis 2030 rechnen.' },
                { en: 'The data format is prescribed as interoperable: organise your product records so they can be exported in a structured format per product.',
                  zh: '数据格式须可互操作：请整理产品记录，使其能够按产品以结构化格式导出。',
                  de: 'Das Datenformat muss interoperabel sein: Produktunterlagen so organisieren, dass sie je Produkt in strukturierter Form exportiert werden können.' },
                { en: 'Toy manufacturers already have a fixed date: under the Toy Safety Regulation (EU) 2025/2509, applying from 1 August 2030, a toy Digital Product Passport replaces the paper EU declaration of conformity.',
                  zh: '玩具制造商已有明确日期：根据自2030年8月1日起适用的玩具安全法规 (EU) 2025/2509，玩具数字产品护照将取代纸质欧盟符合性声明。',
                  de: 'Spielzeughersteller haben bereits ein festes Datum: Nach der Spielzeugsicherheitsverordnung (EU) 2025/2509, anwendbar ab 1. August 2030, ersetzt ein Spielzeug-Produktpass die papierne EU-Konformitätserklärung.' }
            ]
        },
        actions: [
            { en: 'Check your product categories against the first ESPR wave (steel first, then textiles and furniture, per the Working Plan of April 2025).',
              zh: '对照ESPR首批清单（钢铁最先，随后纺织品和家具，2025年4月工作计划）核查您的产品类别。',
              de: 'Ihre Produktkategorien gegen die erste ESPR-Welle prüfen (Stahl zuerst, dann Textilien und Möbel, laut Arbeitsplan vom April 2025).' },
            { en: 'Take stock of which passport data points you can already deliver (materials, origin, carbon footprint, repairability, end of life) and where the gaps are.',
              zh: '盘点哪些护照数据点您已能提供（材料、原产地、碳足迹、可维修性、报废处理），哪些还有缺口。',
              de: 'Bestandsaufnahme, welche Passdatenpunkte Sie schon liefern können (Materialien, Herkunft, CO₂-Fußabdruck, Reparierbarkeit, Lebensende) und wo Lücken sind.' },
            { en: 'Agree with supply chain partners how data will flow from raw material to point of sale, the regulation requires an interoperable format.',
              zh: '与供应链伙伴约定数据如何从原材料端流转到销售终端，法规要求互操作格式。',
              de: 'Mit den Lieferkettenpartnern klären, wie Daten vom Rohstoff bis zum Verkaufspunkt fließen, die Verordnung verlangt ein interoperables Format.' },
            { en: 'Track the delegated acts: each one fixes the concrete data list, format and dates for its product group, and none has been adopted yet.',
              zh: '跟踪授权法案：每部法案将确定其产品类别的具体数据清单、格式和日期，目前尚无一部获得通过。',
              de: 'Die delegierten Rechtsakte verfolgen: Jeder legt für seine Produktgruppe Datenliste, Format und Termine fest, noch ist keiner erlassen.' }
        ],
        documents: [
            { en: 'Bill of materials with material composition and origin per product',
              zh: '每件产品的物料清单，含材料构成和原产地',
              de: 'Stückliste je Produkt mit Materialzusammensetzung und Herkunft' },
            { en: 'Product carbon footprint data with the underlying calculation',
              zh: '产品碳足迹数据及其计算依据',
              de: 'CO₂-Fußabdruck je Produkt mit zugrunde liegender Berechnung' },
            { en: 'Repair and end of life information (inputs for the repairability score and instructions)',
              zh: '维修与报废信息（可维修性评分及处理说明的依据）',
              de: 'Reparatur- und End-of-Life-Informationen (Grundlage für Reparierbarkeitswert und Hinweise)' },
            { en: 'Structured product master data exportable in an interoperable format',
              zh: '可按互操作格式导出的结构化产品主数据',
              de: 'Strukturierte Produktstammdaten, exportierbar in interoperablem Format' }
        ],
        sources: [
            { label: 'Reg. (EU) 2025/2509 (Toy Safety: toy Digital Product Passport from August 2030)', url: 'https://eur-lex.europa.eu/eli/reg/2025/2509/oj/eng' }
        ]
    },

    gpsr: {
        roles: {
            office: [
                { en: 'GPSR applies since 13 December 2024 to every consumer product placed on the EU market, CE marked or not; the obligations are ongoing, not a one off deadline.',
                  zh: 'GPSR自2024年12月13日起适用于投放欧盟市场的每件消费品，无论是否带CE标志；相关义务持续适用，并非一次性期限。',
                  de: 'Die GPSR gilt seit dem 13. Dezember 2024 für jedes auf dem EU-Markt bereitgestellte Verbraucherprodukt, mit oder ohne CE-Kennzeichnung; die Pflichten laufen dauerhaft, es gibt keine einmalige Frist.' },
                { en: 'Every product needs an EU established responsible economic operator (manufacturer, importer, authorised representative or fulfilment provider) whose name, postal address and electronic address appear on the product or its packaging.',
                  zh: '每件产品都须有设立于欧盟的责任经济经营者（制造商、进口商、授权代表或履行服务商），其名称、邮政地址及电子地址须标注在产品或包装上。',
                  de: 'Jedes Produkt braucht einen in der EU niedergelassenen verantwortlichen Wirtschaftsakteur (Hersteller, Importeur, Bevollmächtigter oder Fulfilment-Dienstleister), dessen Name, Postanschrift und elektronische Adresse auf dem Produkt oder der Verpackung stehen.' },
                { en: 'Accidents must be reported via the Safety Business Gateway; online marketplaces must provide a single contact point, cooperate with Safety Gate and remove dangerous product listings within 2 working days. Commission application guidelines were published 19 November 2025.',
                  zh: '事故须通过Safety Business Gateway报告；线上平台须设立统一联络点、配合Safety Gate，并在2个工作日内下架危险产品。欧盟委员会已于2025年11月19日发布适用指南。',
                  de: 'Unfälle sind über das Safety Business Gateway zu melden; Online-Marktplätze müssen eine zentrale Kontaktstelle bieten, mit Safety Gate kooperieren und gefährliche Angebote binnen 2 Arbeitstagen entfernen. Die Anwendungsleitlinien der Kommission erschienen am 19. November 2025.' },
                { en: 'Penalties sit at member state level. Germany\'s revised Product Safety Act (in force 19 February 2026) provides fines up to €100,000, profit skimming, marketplace delisting orders and criminal liability for persistent violations.',
                  zh: '处罚由成员国规定。德国修订后的《产品安全法》（2026年2月19日生效）规定最高10万欧元罚款、没收违法所得、责令平台下架，屡犯者可承担刑事责任。',
                  de: 'Sanktionen regeln die Mitgliedstaaten. Das novellierte deutsche Produktsicherheitsgesetz (in Kraft seit 19. Februar 2026) sieht Bußgelder bis 100.000 €, Gewinnabschöpfung, Delisting-Anordnungen gegen Marktplätze und Strafbarkeit bei beharrlichen Verstößen vor.' }
            ],
            supplier: [
                { en: 'Marketplaces and German retail QA teams now demand the EU responsible person and GPSR documentation before listing or shipping: without them your product does not go on sale.',
                  zh: '线上平台和德国零售质检团队现已在上架或发货前要求提供欧盟责任人和GPSR文件：缺少两者，您的产品无法上架销售。',
                  de: 'Marktplätze und die QA-Teams des deutschen Handels verlangen EU-Verantwortlichen und GPSR-Unterlagen inzwischen vor Listung oder Versand: Ohne beides kommt Ihr Produkt nicht in den Verkauf.' },
                { en: 'Technical documentation and an internal risk analysis are required per product, prepare them as part of product development, not after the order.',
                  zh: '每件产品都须备有技术文件和内部风险分析，请在产品开发阶段就准备好，而不是接单之后。',
                  de: 'Technische Unterlagen und eine interne Risikoanalyse sind je Produkt Pflicht, erstellen Sie sie in der Produktentwicklung, nicht erst nach dem Auftrag.' },
                { en: 'Artwork changes: the responsible operator\'s name, postal address and electronic address must appear on the product or its packaging, plan label revisions for all EU bound SKUs.',
                  zh: '标签需调整：责任经营者的名称、邮政地址及电子地址须标注在产品或包装上，请为所有输欧SKU规划标签改版。',
                  de: 'Artwork-Änderungen: Name, Postanschrift und elektronische Adresse des Verantwortlichen müssen auf Produkt oder Verpackung erscheinen, Etikettenrevisionen für alle EU-SKUs einplanen.' },
                { en: 'Safety failures now bite fast: marketplaces must take dangerous product listings down within 2 working days, so a quality problem can stop sales almost immediately.',
                  zh: '安全问题的后果来得很快：平台须在2个工作日内下架危险产品，质量问题几乎会立即中断销售。',
                  de: 'Sicherheitsmängel wirken schnell: Marktplätze müssen gefährliche Angebote binnen 2 Arbeitstagen entfernen, ein Qualitätsproblem kann den Verkauf fast sofort stoppen.' }
            ]
        },
        actions: [
            { en: 'Confirm for every EU bound product who acts as the responsible economic operator (manufacturer, importer, authorised representative or fulfilment provider) and put the arrangement in writing.',
              zh: '为每件输欧产品确认由谁担任责任经济经营者（制造商、进口商、授权代表或履行服务商），并以书面形式确定安排。',
              de: 'Für jedes EU-Produkt festlegen, wer als verantwortlicher Wirtschaftsakteur auftritt (Hersteller, Importeur, Bevollmächtigter oder Fulfilment-Dienstleister), und die Vereinbarung schriftlich fixieren.' },
            { en: 'Compile the technical documentation and the internal risk analysis for each product before it ships.',
              zh: '在发货前为每件产品备齐技术文件和内部风险分析。',
              de: 'Technische Unterlagen und interne Risikoanalyse je Produkt vor dem Versand zusammenstellen.' },
            { en: 'Update product and packaging artwork with the responsible operator\'s name, postal address and electronic address.',
              zh: '在产品和包装设计稿中加入责任经营者的名称、邮政地址及电子地址。',
              de: 'Produkt- und Verpackungsartwork um Name, Postanschrift und elektronische Adresse des Verantwortlichen ergänzen.' },
            { en: 'Work through the Commission application guidelines (published 19 November 2025) with your QA team and check your processes against the German Product Safety Act penalties (in force 19 February 2026).',
              zh: '与质检团队一起研读欧盟委员会适用指南（2025年11月19日发布），并对照德国《产品安全法》处罚规定（2026年2月19日生效）检查自身流程。',
              de: 'Die Anwendungsleitlinien der Kommission (veröffentlicht am 19. November 2025) mit dem QA-Team durcharbeiten und die Prozesse gegen die Sanktionen des deutschen Produktsicherheitsgesetzes (in Kraft seit 19. Februar 2026) prüfen.' }
        ],
        documents: [
            { en: 'Technical documentation per product',
              zh: '每件产品的技术文件',
              de: 'Technische Unterlagen je Produkt' },
            { en: 'Internal risk analysis per product',
              zh: '每件产品的内部风险分析',
              de: 'Interne Risikoanalyse je Produkt' },
            { en: 'Written mandate or contract naming the EU responsible economic operator, plus label artwork with name, postal address and electronic address',
              zh: '指定欧盟责任经济经营者的书面授权或合同，以及含名称、邮政地址及电子地址的标签设计稿',
              de: 'Schriftliches Mandat oder Vertrag zum EU-Verantwortlichen, dazu Etiketten-Artwork mit Name, Postanschrift und elektronischer Adresse' },
            { en: 'Incident log and procedure for reporting accidents via the Safety Business Gateway',
              zh: '事故记录及通过Safety Business Gateway报告事故的流程文件',
              de: 'Vorfallregister und Verfahren zur Unfallmeldung über das Safety Business Gateway' }
        ],
        sources: [
            { label: 'Reg. (EU) 2025/2509 (Toy Safety Regulation, sector safety rules for toys from 1 August 2030)', url: 'https://eur-lex.europa.eu/eli/reg/2025/2509/oj/eng' }
        ]
    },

    lksg: {
        roles: {
            office: [
                { en: 'Due diligence obligations remain fully in force for companies with 1,000 or more employees in Germany: risk management and analysis, preventive and remedial measures, a complaints mechanism, BAFA oversight. The law was not abolished.',
                  zh: '对德国境内员工不少于1,000人的企业，尽职调查义务仍完全有效：风险管理与分析、预防和补救措施、投诉机制、联邦经济与出口管制局（BAFA）监督。该法并未废除。',
                  de: 'Die Sorgfaltspflichten gelten für Unternehmen mit mindestens 1.000 Beschäftigten in Deutschland unverändert fort: Risikomanagement und -analyse, Präventions- und Abhilfemaßnahmen, Beschwerdeverfahren, BAFA-Aufsicht. Das Gesetz wurde nicht abgeschafft.' },
                { en: 'The reporting obligation is dead in practice: BAFA deactivated its reporting portal on 7 November 2025 with retroactive relief back to 2023. The amendment law (sanctions only for serious violations) had its first Bundestag reading on 16 January 2026 and is still in parliament.',
                  zh: '报告义务实际上已终止：BAFA于2025年11月7日关闭报告门户，并追溯免除自2023年起的报告义务。修订法案（处罚仅针对严重违规）已于2026年1月16日在联邦议院一读，目前仍在议会审议中。',
                  de: 'Die Berichtspflicht ist in der Praxis tot: Das BAFA hat sein Berichtsportal am 7. November 2025 deaktiviert, mit rückwirkender Entlastung ab 2023. Das Änderungsgesetz (Sanktionen nur noch bei schweren Verstößen) hatte am 16. Januar 2026 seine erste Bundestagslesung und liegt weiter im Parlament.' },
                { en: 'The regime is set to shrink: on 1 July 2026 the governing coalition announced plans to narrow it to the CSDDD thresholds (more than 5,000 employees and more than €1.5B turnover, roughly 150 companies) when transposing the CSDDD, starting autumn 2026; the transposition deadline is 26 July 2028.',
                  zh: '适用范围将收窄：执政联盟于2026年7月1日宣布，计划在转化CSDDD时（自2026年秋季启动）将范围缩小至CSDDD门槛（员工超过5,000人且营业额超过15亿欧元，约150家企业）；转化期限为2028年7月26日。',
                  de: 'Das Regime soll schrumpfen: Der Koalitionsausschuss kündigte am 1. Juli 2026 an, den Anwendungsbereich bei der CSDDD-Umsetzung (Beginn Herbst 2026) auf die CSDDD-Schwellen zu verengen (mehr als 5.000 Beschäftigte und mehr als 1,5 Mrd. € Umsatz, rund 150 Unternehmen); die Umsetzungsfrist läuft bis zum 26. Juli 2028.' },
                { en: 'BAFA fines remain possible for serious violations. In practice the sourcing office operationalises the duty toward suppliers: codes of conduct, self assessment questionnaires, audit rights and access to the complaints mechanism as standard contract terms.',
                  zh: '对严重违规，BAFA仍可处以罚款。实践中，采购办公室负责将义务落实到供应商：行为准则、自评问卷、审计权及投诉机制的使用已是标准合同条款。',
                  de: 'BAFA-Bußgelder bleiben bei schweren Verstößen möglich. In der Praxis operationalisiert das Einkaufsbüro die Pflicht gegenüber Lieferanten: Verhaltenskodizes, Selbstauskunftsfragebögen, Auditrechte und Zugang zum Beschwerdeverfahren als Standardvertragsklauseln.' }
            ],
            supplier: [
                { en: 'The legal duty sits with your German buyer, not with you: LkSG reaches you through contract cascades, codes of conduct, questionnaires, audit rights and complaint mechanism access.',
                  zh: '法律义务在您的德国买家一方，而不在您：LkSG通过合同传导触及您，形式包括行为准则、问卷、审计权和投诉机制的使用。',
                  de: 'Die Rechtspflicht liegt bei Ihrem deutschen Abnehmer, nicht bei Ihnen: Das LkSG erreicht Sie über Vertragskaskaden, Verhaltenskodizes, Fragebögen, Auditrechte und Zugang zum Beschwerdeverfahren.' },
                { en: 'The relief on the German side does not end the requests: due diligence remains fully in force for companies with 1,000 or more employees, so buyer audits and questionnaires continue.',
                  zh: '德国方面的松绑并不意味着请求终止：对员工不少于1,000人的企业，尽职调查义务仍完全有效，买家的审计和问卷仍将继续。',
                  de: 'Die Entlastung auf deutscher Seite beendet die Anfragen nicht: Die Sorgfaltspflichten gelten für Unternehmen ab 1.000 Beschäftigten fort, Audits und Fragebögen der Abnehmer laufen weiter.' },
                { en: 'Treat what you sign seriously: codes of conduct and audit rights are enforceable contract terms, and a complaint raised by your workers can reach your buyer\'s complaints mechanism directly.',
                  zh: '认真对待您签署的内容：行为准则和审计权是可执行的合同条款，您的工人提出的投诉可以直接进入买家的投诉机制。',
                  de: 'Nehmen Sie ernst, was Sie unterschreiben: Verhaltenskodizes und Auditrechte sind durchsetzbare Vertragsklauseln, und eine Beschwerde Ihrer Beschäftigten kann direkt im Beschwerdeverfahren Ihres Abnehmers landen.' },
                { en: 'CSDDD requirements will layer on top from 2029: investments in labour, safety and environmental management now serve both regimes.',
                  zh: '2029年起CSDDD要求还将叠加其上：现在在劳工、安全和环境管理上的投入可同时满足两套制度。',
                  de: 'Ab 2029 kommen die CSDDD-Anforderungen obendrauf: Investitionen in Arbeits-, Sicherheits- und Umweltmanagement zahlen auf beide Regime ein.' }
            ]
        },
        actions: [
            { en: 'Review buyer contracts for LkSG clauses (code of conduct, questionnaires, audit rights, complaint access) and check factory practice against what was signed.',
              zh: '检查买家合同中的LkSG条款（行为准则、问卷、审计权、投诉渠道），并核对工厂实际做法与所签内容是否一致。',
              de: 'Abnehmerverträge auf LkSG-Klauseln prüfen (Verhaltenskodex, Fragebögen, Auditrechte, Beschwerdezugang) und die Werkspraxis mit dem Unterschriebenen abgleichen.' },
            { en: 'Maintain one master set of answers for self assessment questionnaires so responses stay consistent across buyers and years.',
              zh: '为自评问卷建立一套主答案库，确保对不同买家、不同年度的回答保持一致。',
              de: 'Einen Master-Datensatz für Selbstauskunftsfragebögen pflegen, damit die Antworten über Abnehmer und Jahre konsistent bleiben.' },
            { en: 'Make sure workers have a working channel to raise grievances, buyers must provide access to a complaints mechanism.',
              zh: '确保工人有畅通的申诉渠道，买家必须提供投诉机制的使用途径。',
              de: 'Sicherstellen, dass Beschäftigte einen funktionierenden Beschwerdeweg haben, Abnehmer müssen Zugang zu einem Beschwerdeverfahren gewähren.' },
            { en: 'Track the transition: the amendment law is still in parliament, and the planned narrowing to CSDDD thresholds comes with the transposition starting autumn 2026 (deadline 26 July 2028).',
              zh: '跟踪制度过渡：修订法案仍在议会审议，收窄至CSDDD门槛的计划将随2026年秋季启动的转化推进（期限2028年7月26日）。',
              de: 'Den Übergang verfolgen: Das Änderungsgesetz liegt noch im Parlament, die geplante Verengung auf die CSDDD-Schwellen kommt mit der Umsetzung ab Herbst 2026 (Frist 26. Juli 2028).' }
        ],
        documents: [
            { en: 'Signed buyer code of conduct and contracts with the LkSG clauses',
              zh: '已签署的买家行为准则及含LkSG条款的合同',
              de: 'Unterzeichneter Verhaltenskodex des Abnehmers und Verträge mit den LkSG-Klauseln' },
            { en: 'Completed self assessment questionnaires with supporting evidence (policies, certificates)',
              zh: '填写完毕的自评问卷及支持性证明（政策文件、证书）',
              de: 'Ausgefüllte Selbstauskunftsfragebögen mit Nachweisen (Richtlinien, Zertifikate)' },
            { en: 'Audit reports and corrective action plans from buyer audits',
              zh: '买家审计报告及整改行动计划',
              de: 'Auditberichte und Korrekturmaßnahmenpläne aus Abnehmeraudits' },
            { en: 'Documentation of the worker grievance channel and case records',
              zh: '工人申诉渠道的制度文件及案例记录',
              de: 'Dokumentation des Beschwerdewegs für Beschäftigte und Fallaufzeichnungen' }
        ],
        sources: [
            { label: 'Dir. (EU) 2024/1760 (CSDDD, the EU regime the German law will converge on)', url: 'https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:32024L1760' }
        ]
    },

    ukcbam: {
        roles: {
            office: [
                { en: 'UK CBAM is a tax on embedded emissions administered by HMRC, with no certificates to buy, unlike EU CBAM. It was enacted via the Finance Act 2026 (announced at the Budget on 26 November 2025) and applies from 1 January 2027.',
                  zh: '英国CBAM是由英国税务海关总署（HMRC）征收的内含排放税，与欧盟CBAM不同，无需购买证书。它通过《2026年财政法》立法（于2025年11月26日预算案中宣布），自2027年1月1日起适用。',
                  de: 'Das UK-CBAM ist eine von HMRC verwaltete Steuer auf gebundene Emissionen, ohne Zertifikatskauf, anders als beim EU-CBAM. Eingeführt über den Finance Act 2026 (angekündigt im Budget am 26. November 2025), gilt es ab dem 1. Januar 2027.' },
                { en: 'Registration threshold: £50,000 of CBAM goods over 12 months. Registration opens via Government Gateway in Q4 2026; the first year registration deadline is 31 January 2028, and the first return and payment (covering calendar year 2027) are due by 31 May 2028, with quarterly periods thereafter.',
                  zh: '注册门槛：12个月内CBAM产品达5万英镑。注册通道于2026年第四季度通过Government Gateway开放；首年注册截止日为2028年1月31日，覆盖2027日历年的首次申报和缴税截止2028年5月31日，此后按季度申报。',
                  de: 'Registrierungsschwelle: 50.000 £ CBAM-Waren über 12 Monate. Die Registrierung öffnet im 4. Quartal 2026 über das Government Gateway; Frist für das erste Jahr ist der 31. Januar 2028, die erste Erklärung und Zahlung (für das Kalenderjahr 2027) sind bis zum 31. Mai 2028 fällig, danach vierteljährlich.' },
                { en: 'Covered sectors: aluminium, cement, fertilisers, hydrogen, iron and steel; glass and ceramics are excluded for now. The core secondary legislation was made in July 2026.',
                  zh: '覆盖行业：铝、水泥、化肥、氢气、钢铁；玻璃和陶瓷暂不包括。核心配套法规已于2026年7月颁布。',
                  de: 'Erfasste Sektoren: Aluminium, Zement, Düngemittel, Wasserstoff, Eisen und Stahl; Glas und Keramik sind vorerst ausgenommen. Die zentralen Durchführungsverordnungen wurden im Juli 2026 erlassen.' },
                { en: 'Importers may use verified actual emissions data or government default values; sector rates are set quarterly from UK ETS auction prices adjusted for free allowances, and carbon prices already paid abroad are deductible. HMRC applies standard tax penalties for failure to register, report or pay.',
                  zh: '进口商可使用经核实的实际排放数据或政府默认值；行业税率按季度根据英国ETS拍卖价格（经免费配额调整）设定，境外已支付的碳价可抵扣。未注册、未申报或未缴税适用HMRC标准税务处罚。',
                  de: 'Importeure können verifizierte Ist-Emissionsdaten oder staatliche Standardwerte nutzen; die Sektorsätze werden vierteljährlich aus UK-ETS-Auktionspreisen abgeleitet, bereinigt um kostenlose Zuteilungen, und im Ausland bereits gezahlte CO₂-Preise sind abziehbar. Bei Verstößen gegen Registrierungs-, Melde- oder Zahlungspflichten gelten die üblichen HMRC-Steuersanktionen.' }
            ],
            supplier: [
                { en: 'You owe nothing to HMRC: the UK importer is the taxpayer. But your emissions data decides whether the importer can beat the government default values, so it shapes your price competitiveness.',
                  zh: '您对HMRC没有纳税义务：英国进口商才是纳税人。但您的排放数据决定进口商能否优于政府默认值，因此直接影响您的价格竞争力。',
                  de: 'Sie schulden HMRC nichts: Steuerpflichtig ist der britische Importeur. Aber Ihre Emissionsdaten entscheiden, ob der Importeur die staatlichen Standardwerte unterbieten kann, und prägen damit Ihre Preisposition.' },
                { en: 'Expect UK customers to request verifiable emissions data during 2026, the first accounting period is calendar year 2027.',
                  zh: '预计英国客户将在2026年内要求提供可核实的排放数据，首个申报期为2027日历年。',
                  de: 'Rechnen Sie damit, dass britische Kunden schon 2026 belastbare Emissionsdaten anfragen, der erste Abrechnungszeitraum ist das Kalenderjahr 2027.' },
                { en: 'If you already prepare verified emissions data for EU CBAM, the same monitoring can serve UK requests, one dataset for both markets.',
                  zh: '如果您已为欧盟CBAM准备经核实的排放数据，同一套监测即可满足英国方面的要求，一套数据服务两个市场。',
                  de: 'Wer bereits verifizierte Emissionsdaten für das EU-CBAM aufbereitet, kann mit demselben Monitoring auch UK-Anfragen bedienen, ein Datensatz für beide Märkte.' },
                { en: 'A carbon price paid in your country is deductible from the UK tax, keep the evidence and share it with your UK customers.',
                  zh: '您所在国已支付的碳价可从英国税额中抵扣，请保留凭证并提供给英国客户。',
                  de: 'Ein im Herkunftsland gezahlter CO₂-Preis ist von der UK-Steuer abziehbar, Nachweise aufbewahren und den britischen Kunden bereitstellen.' }
            ]
        },
        actions: [
            { en: 'Check which of your UK bound products fall into the five covered sectors (aluminium, cement, fertilisers, hydrogen, iron and steel).',
              zh: '核查您的输英产品中哪些属于五大覆盖行业（铝、水泥、化肥、氢气、钢铁）。',
              de: 'Prüfen, welche Ihrer UK-Produkte in die fünf erfassten Sektoren fallen (Aluminium, Zement, Düngemittel, Wasserstoff, Eisen und Stahl).' },
            { en: 'Agree with UK customers during 2026 who supplies emissions data and in what format, taxation starts with imports from 1 January 2027.',
              zh: '在2026年内与英国客户约定由谁提供排放数据及采用何种格式，2027年1月1日起的进口即开始征税。',
              de: 'Noch 2026 mit den britischen Kunden klären, wer Emissionsdaten liefert und in welchem Format, besteuert werden Importe ab dem 1. Januar 2027.' },
            { en: 'Importing into the UK yourself? Track the £50,000 threshold over rolling 12 months and register via Government Gateway once it opens in Q4 2026.',
              zh: '自行向英国进口？请按滚动12个月跟踪5万英镑门槛，并在2026年第四季度Government Gateway开放后完成注册。',
              de: 'Sie importieren selbst ins Vereinigte Königreich? Die 50.000-£-Schwelle über rollierende 12 Monate verfolgen und sich nach Öffnung des Government Gateway im 4. Quartal 2026 registrieren.' },
            { en: 'Diarise the deadlines: registration for the first year by 31 January 2028, first return and payment by 31 May 2028.',
              zh: '记好关键日期：首年注册截止2028年1月31日，首次申报和缴税截止2028年5月31日。',
              de: 'Die Fristen vormerken: Registrierung für das erste Jahr bis 31. Januar 2028, erste Erklärung und Zahlung bis 31. Mai 2028.' }
        ],
        documents: [
            { en: 'Verified actual emissions data per installation (otherwise government default values apply)',
              zh: '按设施经核实的实际排放数据（否则适用政府默认值）',
              de: 'Verifizierte Ist-Emissionsdaten je Anlage (sonst gelten staatliche Standardwerte)' },
            { en: 'Product list of UK bound goods mapped to the covered sectors',
              zh: '输英产品清单，并对应覆盖行业',
              de: 'Liste der UK-Waren, den erfassten Sektoren zugeordnet' },
            { en: 'Evidence of carbon prices paid abroad (for the deduction)',
              zh: '境外已支付碳价的凭证（用于抵扣）',
              de: 'Nachweise über im Ausland gezahlte CO₂-Preise (für den Abzug)' },
            { en: 'Rolling 12 month value records of CBAM goods (for the £50,000 registration threshold)',
              zh: '按滚动12个月记录的CBAM产品货值（用于5万英镑注册门槛）',
              de: 'Rollierende 12-Monats-Wertaufzeichnungen der CBAM-Waren (für die 50.000-£-Registrierungsschwelle)' }
        ],
        sources: [
            { label: 'Reg. (EU) 2023/956 (EU CBAM, the certificate based EU counterpart)', url: 'https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:32023R0956' }
        ]
    },

    ukmsa: {
        roles: {
            office: [
                { en: 'Commercial organisations doing business in the UK with global turnover of GBP 36m or more must publish an annual modern slavery statement: approved by the board, signed by a director, linked from the website homepage, within 6 months of the financial year end.',
                  zh: '在英国开展业务且全球年营业额达3,600万英镑及以上的商业组织，须每年发布现代奴役声明：经董事会批准、由董事签署、在网站首页设置链接，并在财年结束后6个月内发布。',
                  de: 'Unternehmen mit Geschäftstätigkeit im Vereinigten Königreich und einem weltweiten Umsatz ab 36 Mio. GBP müssen eine jährliche Modern-Slavery-Erklärung veröffentlichen: vom Board genehmigt, von einem Director unterzeichnet, von der Website-Startseite verlinkt, binnen 6 Monaten nach Geschäftsjahresende.' },
                { en: 'New statutory guidance (24 March 2025) raises the expected standard across six areas: structure and supply chains, policies, due diligence, risk assessment, KPIs and training. Boilerplate statements no longer meet expectations.',
                  zh: '2025年3月24日发布的新法定指南在六个方面提高了预期标准：组织结构与供应链、政策、尽职调查、风险评估、关键绩效指标和培训。套话式声明已不再符合预期。',
                  de: 'Die neue behördliche Leitlinie (24. März 2025) hebt den erwarteten Standard in sechs Bereichen an: Struktur und Lieferketten, Richtlinien, Sorgfaltsprüfung, Risikobewertung, KPIs und Schulung. Textbaustein-Erklärungen genügen nicht mehr.' },
                { en: 'The statement must cover the global supply chain, and the sourcing office is typically the one collecting the evidence from Asian suppliers through questionnaires, audits and contract clauses.',
                  zh: '声明须覆盖全球供应链，采购办公室通常是通过问卷、审核和合同条款向亚洲供应商收集证明材料的一方。',
                  de: 'Die Erklärung muss die globale Lieferkette abdecken, und das Sourcing-Büro ist typischerweise die Stelle, die die Nachweise über Fragebögen, Audits und Vertragsklauseln bei den asiatischen Lieferanten einsammelt.' },
                { en: 'There is no fine for a missing statement (injunction only), but the government registry makes gaps visible and reputational exposure is high.',
                  zh: '未发布声明不会被罚款（仅可强制令），但政府登记平台会让缺失一目了然，声誉风险很高。',
                  de: 'Für eine fehlende Erklärung gibt es keine Geldbuße (nur eine gerichtliche Anordnung), aber das staatliche Register macht Lücken sichtbar, und das Reputationsrisiko ist hoch.' }
            ],
            supplier: [
                { en: 'You have no direct obligation under the Act, but your UK customers with GBP 36m+ turnover must describe their whole supply chain, so their questionnaires, audits and contract clauses land with you.',
                  zh: '您在该法下没有直接义务，但年营业额达3,600万英镑以上的英国客户须说明其整个供应链，因此他们的问卷、审核和合同条款会落到您身上。',
                  de: 'Sie haben nach dem Gesetz keine direkte Pflicht, aber Ihre britischen Kunden mit 36 Mio.+ GBP Umsatz müssen ihre gesamte Lieferkette darstellen, also landen deren Fragebögen, Audits und Vertragsklauseln bei Ihnen.' },
                { en: 'Answer forced labour questionnaires consistently across buyers: contradictions between customer submissions are what triggers deeper audits.',
                  zh: '面对不同买家的强迫劳动问卷，回答要保持一致：不同客户提交材料之间的矛盾正是引发深入审核的原因。',
                  de: 'Beantworten Sie Fragebögen zu Zwangsarbeit über alle Abnehmer hinweg konsistent: Widersprüche zwischen den Angaben an verschiedene Kunden lösen vertiefte Audits aus.' },
                { en: 'Keep recruitment, contract and working hour records ready for audits, and cascade the same checks to your own subcontractors: the statement covers the whole chain, not only tier 1.',
                  zh: '为审核备好招聘、劳动合同和工时记录，并将同样的核查传导给您的分包商：声明覆盖整个链条，而不仅是一级供应商。',
                  de: 'Halten Sie Unterlagen zu Rekrutierung, Arbeitsverträgen und Arbeitszeiten für Audits bereit und geben Sie dieselben Prüfungen an Ihre eigenen Subunternehmer weiter: Die Erklärung erfasst die ganze Kette, nicht nur Tier 1.' },
                { en: 'Note: the UK has no forced labour import ban, unlike the US UFLPA and the EU Forced Labour Regulation. The pressure comes through buyer contracts and reputation, not through customs seizures.',
                  zh: '注意：与美国UFLPA和欧盟强迫劳动条例不同，英国没有强迫劳动进口禁令。压力来自买家合同和声誉，而非海关扣押。',
                  de: 'Hinweis: Das Vereinigte Königreich hat kein Einfuhrverbot für Zwangsarbeit, anders als das US-UFLPA und die EU-Zwangsarbeitsverordnung. Der Druck kommt über Abnehmerverträge und Reputation, nicht über Zollbeschlagnahmen.' }
            ]
        },
        actions: [
            { en: 'Check whether the group crosses the GBP 36m global turnover threshold while doing business in the UK; that is what triggers the annual statement duty.',
              zh: '核查集团在英国开展业务的同时，全球年营业额是否达到3,600万英镑门槛；这正是年度声明义务的触发条件。',
              de: 'Prüfen, ob die Gruppe bei Geschäftstätigkeit im Vereinigten Königreich die Schwelle von 36 Mio. GBP weltweitem Umsatz überschreitet; das löst die jährliche Erklärungspflicht aus.' },
            { en: 'Plan the statement cycle backwards from the deadline: publication within 6 months of the financial year end, with board approval and director signature scheduled before that.',
              zh: '从截止日期倒排声明周期：财年结束后6个月内发布，并提前安排董事会批准和董事签署。',
              de: 'Den Erklärungszyklus von der Frist her rückwärts planen: Veröffentlichung binnen 6 Monaten nach Geschäftsjahresende, Board-Genehmigung und Director-Unterschrift davor terminieren.' },
            { en: 'Align supplier questionnaires with the six areas of the 2025 statutory guidance so the evidence collected in Asia feeds the statement directly.',
              zh: '将供应商问卷与2025年法定指南的六个方面对齐，使在亚洲收集的证明材料能直接用于声明。',
              de: 'Lieferantenfragebögen an den sechs Bereichen der behördlichen Leitlinie von 2025 ausrichten, damit die in Asien gesammelten Nachweise direkt in die Erklärung einfließen.' },
            { en: 'Review manufacturing contracts for forced labour clauses and audit rights; that is how the duty is cascaded down the chain in practice.',
              zh: '审查制造合同中的强迫劳动条款和审核权；实践中义务正是通过这种方式沿链条传导的。',
              de: 'Fertigungsverträge auf Zwangsarbeitsklauseln und Auditrechte prüfen; so wird die Pflicht in der Praxis die Kette hinunter weitergegeben.' }
        ],
        documents: [
            { en: 'Annual modern slavery statement, board approved, director signed, linked from the homepage',
              zh: '年度现代奴役声明，经董事会批准、由董事签署，并在网站首页设置链接',
              de: 'Jährliche Modern-Slavery-Erklärung, vom Board genehmigt, vom Director unterzeichnet, von der Startseite verlinkt' },
            { en: 'Completed supplier questionnaires and audit reports on forced labour risk',
              zh: '填妥的供应商强迫劳动风险问卷和审核报告',
              de: 'Ausgefüllte Lieferantenfragebögen und Auditberichte zum Zwangsarbeitsrisiko' },
            { en: 'Contract clauses on forced labour and audit rights cascaded to manufacturers',
              zh: '传导给制造商的强迫劳动合同条款和审核权条款',
              de: 'An die Hersteller weitergegebene Vertragsklauseln zu Zwangsarbeit und Auditrechten' },
            { en: 'Evidence per the six guidance areas: policies, due diligence, risk assessment, KPIs, training records',
              zh: '按指南六个方面准备的材料：政策、尽职调查、风险评估、关键绩效指标、培训记录',
              de: 'Nachweise entlang der sechs Leitlinienbereiche: Richtlinien, Sorgfaltsprüfung, Risikobewertung, KPIs, Schulungsnachweise' }
        ],
        sources: []
    },

    ukppt: {
        roles: {
            office: [
                { en: 'The tax is charged on finished plastic packaging components containing less than 30% recycled plastic, whether manufactured in or imported into the UK, and it includes the packaging around imported goods.',
                  zh: '该税针对再生塑料含量低于30%的成品塑料包装组件征收，无论在英国生产还是进口，且包括进口商品的外包装。',
                  de: 'Die Steuer fällt auf fertige Kunststoffverpackungskomponenten mit weniger als 30% Rezyklatanteil an, ob im Vereinigten Königreich hergestellt oder importiert, einschließlich der Verpackung um importierte Waren.' },
                { en: 'The rate is GBP 228.82 per tonne from 1 April 2026, CPI indexed annually. Importers handling 10 tonnes or more per 12 months must register with HMRC and file quarterly returns.',
                  zh: '自2026年4月1日起税率为每公吨228.82英镑，每年按CPI调整。12个月内经手10公吨及以上的进口商须向英国税务海关总署（HMRC）注册并按季度申报。',
                  de: 'Der Satz beträgt ab dem 1. April 2026 228,82 GBP pro Tonne, jährlich CPI-indexiert. Importeure mit 10 Tonnen oder mehr in 12 Monaten müssen sich bei HMRC registrieren und vierteljährlich melden.' },
                { en: 'Recycled content claims need evidence from the supply chain: material composition and recycled percentage per component. Without evidence the full tax is due.',
                  zh: '再生含量声明需要供应链证明材料：每个组件的材料构成和再生比例。没有证据即须全额缴税。',
                  de: 'Rezyklatangaben brauchen Nachweise aus der Lieferkette: Materialzusammensetzung und Rezyklatanteil je Komponente. Ohne Nachweis ist die volle Steuer fällig.' },
                { en: 'Standard HMRC tax penalties apply, and businesses in the supply chain can be held secondarily liable, so due diligence requests down the chain are routine, not optional.',
                  zh: '适用HMRC标准税务处罚，且供应链上的企业可能承担连带责任，因此沿链条向下的尽职调查要求是常规做法，而非可选项。',
                  de: 'Es gelten die üblichen HMRC-Steuersanktionen, und Unternehmen in der Lieferkette können sekundär haften; Sorgfaltsanfragen entlang der Kette sind daher Routine, nicht optional.' }
            ],
            supplier: [
                { en: 'Your buyers will ask for the material composition and recycled percentage of every packaging component; without your evidence they pay the full GBP 228.82 per tonne.',
                  zh: '买家会要求您提供每个包装组件的材料构成和再生比例；没有您的证明材料，他们就要按每公吨228.82英镑全额缴税。',
                  de: 'Ihre Abnehmer werden Materialzusammensetzung und Rezyklatanteil jeder Verpackungskomponente abfragen; ohne Ihre Nachweise zahlen sie die vollen 228,82 GBP pro Tonne.' },
                { en: 'The packaging around your goods counts: what the factory wraps the products in enters the UK tax base together with the products themselves.',
                  zh: '您商品的外包装同样计入：工厂为产品所用的包装与产品一起进入英国的计税范围。',
                  de: 'Die Verpackung um Ihre Waren zählt mit: Was das Werk um die Produkte packt, geht zusammen mit den Produkten in die britische Steuerbasis ein.' },
                { en: 'Components with 30% or more recycled plastic are outside the tax, so documented recycled material becomes a direct price advantage in the UK.',
                  zh: '再生塑料含量达到30%及以上的组件不在征税范围内，因此有据可查的再生材料在英国市场成为直接的价格优势。',
                  de: 'Komponenten mit 30% oder mehr Rezyklat liegen außerhalb der Steuer; dokumentiertes Rezyklat wird damit im Vereinigten Königreich zum direkten Preisvorteil.' },
                { en: 'Expect recycled content fields in buyer packaging specifications and regular evidence requests aligned to the buyer\'s quarterly HMRC returns.',
                  zh: '买家的包装规格中会加入再生含量字段，并会配合其向HMRC的季度申报定期索取证明材料。',
                  de: 'Rechnen Sie mit Rezyklatfeldern in den Verpackungsspezifikationen der Abnehmer und regelmäßigen Nachweisanfragen im Takt von deren vierteljährlichen HMRC-Meldungen.' }
            ]
        },
        actions: [
            { en: 'Weigh and classify all plastic packaging components per SKU, including the transport and product packaging around imported goods.',
              zh: '按SKU称重并分类所有塑料包装组件，包括进口商品的运输包装和产品外包装。',
              de: 'Alle Kunststoffverpackungskomponenten je SKU wiegen und klassifizieren, einschließlich Transport- und Produktverpackung um importierte Waren.' },
            { en: 'Collect recycled content evidence per component from manufacturers; without it the component is taxed at the full rate.',
              zh: '向制造商收集每个组件的再生含量证明材料；否则该组件将按全额税率征税。',
              de: 'Rezyklatnachweise je Komponente bei den Herstellern einsammeln; ohne sie wird die Komponente mit dem vollen Satz besteuert.' },
            { en: 'Check the registration duty: 10 tonnes of plastic packaging in 12 months triggers HMRC registration and quarterly returns.',
              zh: '核查注册义务：12个月内经手10公吨塑料包装即触发HMRC注册和季度申报。',
              de: 'Die Registrierungspflicht prüfen: 10 Tonnen Kunststoffverpackung in 12 Monaten lösen HMRC-Registrierung und Quartalsmeldungen aus.' },
            { en: 'Review packaging designs against the 30% recycled threshold where quality allows; components at or above it are not taxed at all.',
              zh: '在质量允许的前提下，对照30%再生含量门槛审视包装设计；达到或超过门槛的组件完全不征税。',
              de: 'Verpackungsdesigns gegen die 30%-Rezyklatschwelle prüfen, wo die Qualität es zulässt; Komponenten auf oder über der Schwelle werden gar nicht besteuert.' }
        ],
        documents: [
            { en: 'Material composition per packaging component (plastic type and weight)',
              zh: '每个包装组件的材料构成（塑料类型和重量）',
              de: 'Materialzusammensetzung je Verpackungskomponente (Kunststoffart und Gewicht)' },
            { en: 'Recycled percentage per component with evidence from the material supplier',
              zh: '每个组件的再生比例及材料供应商出具的证明',
              de: 'Rezyklatanteil je Komponente mit Nachweis des Materiallieferanten' },
            { en: 'Tonnage records of plastic packaging handled, supporting the quarterly HMRC returns',
              zh: '经手塑料包装的吨位记录，用于支持HMRC季度申报',
              de: 'Tonnage-Aufzeichnungen der gehandhabten Kunststoffverpackungen als Grundlage der HMRC-Quartalsmeldungen' },
            { en: 'Packaging specifications showing which components meet the 30% recycled content threshold',
              zh: '标明哪些组件达到30%再生含量门槛的包装规格文件',
              de: 'Verpackungsspezifikationen, die ausweisen, welche Komponenten die 30%-Rezyklatschwelle erreichen' }
        ],
        sources: [
            { label: 'gov.uk: UK Packaging EPR (the parallel UK packaging duty on the same data)', url: 'https://www.gov.uk/guidance/extended-producer-responsibility-for-packaging-who-is-affected-and-what-to-do' }
        ]
    },

    ukepr: {
        roles: {
            office: [
                { en: 'UK producers, brand owners and importers of packaged goods above GBP 1m turnover and 25 tonnes of packaging per year must register and report packaging data; the importer now pays the full cost of managing household packaging waste.',
                  zh: '年营业额超过100万英镑且每年经手包装超过25公吨的英国生产商、品牌方和包装商品进口商须注册并报告包装数据；进口商现须承担家庭包装废弃物管理的全部成本。',
                  de: 'Britische Hersteller, Markeninhaber und Importeure verpackter Waren über 1 Mio. GBP Umsatz und 25 Tonnen Verpackung pro Jahr müssen sich registrieren und Verpackungsdaten melden; der Importeur trägt jetzt die vollen Kosten der Entsorgung von Haushaltsverpackungen.' },
                { en: 'Larger producers (above GBP 2m and 50 tonnes) report every six months and pay disposal fees to the scheme administrator PackUK; the first invoices were issued in October 2025.',
                  zh: '规模更大的生产商（超过200万英镑和50公吨）须每六个月报告一次，并向计划管理机构PackUK缴纳处置费；首批费用账单已于2025年10月发出。',
                  de: 'Größere Hersteller (über 2 Mio. GBP und 50 Tonnen) melden halbjährlich und zahlen Entsorgungsgebühren an den Systemverwalter PackUK; die ersten Rechnungen gingen im Oktober 2025 raus.' },
                { en: 'Fees are set per tonne and material (year 1 base fees for example: plastic GBP 423 per tonne, glass GBP 192), and from the 2026-27 year they rise or fall with the recyclability rating (red, amber, green).',
                  zh: '费用按材料和吨位设定（第一年基础费率示例：塑料每公吨423英镑，玻璃192英镑），自2026-27年度起随可回收性评级（红、黄、绿）升降。',
                  de: 'Die Gebühren sind je Tonne und Material festgelegt (Basisgebühren Jahr 1 zum Beispiel: Kunststoff 423 GBP pro Tonne, Glas 192), und ab dem Jahr 2026-27 steigen oder fallen sie mit der Recyclingfähigkeitsbewertung (rot, gelb, grün).' },
                { en: 'The reporting runs on item master data: without per SKU material, component weight and recyclability from suppliers, the data duties in force since 2023 cannot be met.',
                  zh: '报告依赖商品主数据：没有供应商提供的每个SKU的材料、组件重量和可回收性数据，就无法履行自2023年起生效的数据义务。',
                  de: 'Das Reporting läuft über die Artikelstammdaten: Ohne Material, Komponentengewicht und Recyclingfähigkeit je SKU von den Lieferanten lassen sich die seit 2023 geltenden Datenpflichten nicht erfüllen.' }
            ],
            supplier: [
                { en: 'Your packaging design now sets a UK fee: from the 2026-27 year, fees rise or fall with the recyclability rating, so design choices made at the factory directly change what your buyer pays per tonne.',
                  zh: '您的包装设计如今直接决定英国费率：自2026-27年度起，费用随可回收性评级升降，工厂端的设计决定直接改变买家每公吨要付的费用。',
                  de: 'Ihr Verpackungsdesign bestimmt jetzt eine britische Gebühr: Ab dem Jahr 2026-27 steigen oder fallen die Gebühren mit der Recyclingfähigkeitsbewertung; Designentscheidungen im Werk verändern direkt, was Ihr Abnehmer pro Tonne zahlt.' },
                { en: 'Provide per SKU packaging data: material, component weight and recyclability. UK buyers will require these fields in their item master data.',
                  zh: '请提供每个SKU的包装数据：材料、组件重量和可回收性。英国买家会将这些字段纳入商品主数据要求。',
                  de: 'Liefern Sie Verpackungsdaten je SKU: Material, Komponentengewicht und Recyclingfähigkeit. Britische Abnehmer werden diese Felder in ihren Artikelstammdaten verlangen.' },
                { en: 'Every tonne of packaging you ship carries a fee for the buyer (for example plastic at GBP 423 per tonne in year 1), so lighter packaging is a direct cost argument in negotiations.',
                  zh: '您发运的每公吨包装都会给买家带来费用（例如第一年塑料每公吨423英镑），因此更轻的包装在谈判中是直接的成本卖点。',
                  de: 'Jede Tonne Verpackung, die Sie versenden, kostet den Abnehmer eine Gebühr (zum Beispiel Kunststoff 423 GBP pro Tonne im Jahr 1); leichtere Verpackung ist damit ein direktes Kostenargument in Verhandlungen.' },
                { en: 'Expect data requests every six months matching the reporting cycle of larger producers, and questions on the red, amber, green rating of each packaging format.',
                  zh: '请预期每六个月一次、与大型生产商报告周期同步的数据请求，以及针对每种包装形式红、黄、绿评级的询问。',
                  de: 'Rechnen Sie mit Datenanfragen im Halbjahrestakt des Reportings größerer Hersteller und mit Fragen zur Rot-Gelb-Grün-Bewertung jedes Verpackungsformats.' }
            ]
        },
        actions: [
            { en: 'Build per SKU packaging data (material, component weight, recyclability) into item master data and supplier onboarding.',
              zh: '将每个SKU的包装数据（材料、组件重量、可回收性）纳入商品主数据和供应商准入流程。',
              de: 'Verpackungsdaten je SKU (Material, Komponentengewicht, Recyclingfähigkeit) in Artikelstammdaten und Lieferanten-Onboarding verankern.' },
            { en: 'Check the thresholds: GBP 1m turnover and 25 tonnes trigger registration and reporting; GBP 2m and 50 tonnes trigger six monthly reporting and disposal fees to PackUK.',
              zh: '核查门槛：100万英镑营业额和25公吨触发注册与报告义务；200万英镑和50公吨触发每六个月报告并向PackUK缴纳处置费。',
              de: 'Die Schwellen prüfen: 1 Mio. GBP Umsatz und 25 Tonnen lösen Registrierung und Reporting aus; 2 Mio. GBP und 50 Tonnen lösen Halbjahresmeldungen und Entsorgungsgebühren an PackUK aus.' },
            { en: 'Model the fee exposure per material with the year 1 base fees (plastic GBP 423 per tonne, glass GBP 192) before the 2026-27 modulation shifts them.',
              zh: '在2026-27年度费用调整生效前，按第一年基础费率（塑料每公吨423英镑，玻璃192英镑）测算各材料的费用敞口。',
              de: 'Die Gebührenlast je Material mit den Basisgebühren des Jahres 1 modellieren (Kunststoff 423 GBP pro Tonne, Glas 192), bevor die Modulation 2026-27 sie verschiebt.' },
            { en: 'Review current packaging formats against the red, amber, green recyclability rating; factory design choices made now set the UK fee from 2026-27.',
              zh: '对照红、黄、绿可回收性评级审视现有包装形式；工厂现在做出的设计决定将决定2026-27年度起的英国费率。',
              de: 'Aktuelle Verpackungsformate gegen die Rot-Gelb-Grün-Bewertung prüfen; heutige Designentscheidungen im Werk legen die britische Gebühr ab 2026-27 fest.' }
        ],
        documents: [
            { en: 'Per SKU packaging specification: material, component weight, recyclability',
              zh: '每个SKU的包装规格：材料、组件重量、可回收性',
              de: 'Verpackungsspezifikation je SKU: Material, Komponentengewicht, Recyclingfähigkeit' },
            { en: 'Packaging tonnage data prepared for the six monthly reporting cycle',
              zh: '为六个月一次的报告周期准备的包装吨位数据',
              de: 'Für den Halbjahresrhythmus aufbereitete Verpackungs-Tonnagedaten' },
            { en: 'Recyclability assessments supporting the red, amber, green rating per packaging format',
              zh: '支持每种包装形式红、黄、绿评级的可回收性评估',
              de: 'Recyclingfähigkeitsbewertungen als Beleg für die Rot-Gelb-Grün-Einstufung je Verpackungsformat' },
            { en: 'Registration and fee records with the scheme administrator PackUK',
              zh: '在计划管理机构PackUK的注册和缴费记录',
              de: 'Registrierungs- und Gebührenunterlagen beim Systemverwalter PackUK' }
        ],
        sources: [
            { label: 'gov.uk: Plastic Packaging Tax (the parallel UK packaging duty on the same data)', url: 'https://www.gov.uk/guidance/check-if-you-need-to-register-for-plastic-packaging-tax' }
        ]
    },

    ukca: {
        roles: {
            office: [
                { en: 'Great Britain recognises the CE marking indefinitely for most consumer product rules (toys, low voltage electrical, EMC, radio equipment, RoHS, ecodesign and more), so one CE compliant product can serve the EU, GB and Northern Ireland.',
                  zh: '英国（大不列颠）对大多数消费品法规（玩具、低电压电气、电磁兼容、无线电设备、RoHS、生态设计等）无限期承认CE标志，因此一件符合CE要求的产品可同时进入欧盟、大不列颠和北爱尔兰市场。',
                  de: 'Großbritannien erkennt die CE-Kennzeichnung für die meisten Verbraucherproduktvorschriften unbefristet an (Spielzeug, Niederspannung, EMV, Funkanlagen, RoHS, Ökodesign und mehr); ein CE-konformes Produkt bedient also EU, Großbritannien und Nordirland.' },
                { en: 'UKCA remains valid but is voluntary in practice for these sectors: separate UKCA testing is usually unnecessary, so avoid paying twice for conformity assessment on the same product.',
                  zh: 'UKCA标志仍然有效，但在这些领域实践中已属自愿：通常无需单独的UKCA测试，避免为同一产品重复支付合格评定费用。',
                  de: 'UKCA bleibt gültig, ist in diesen Sektoren aber praktisch freiwillig: Separate UKCA-Prüfungen sind meist unnötig; zahlen Sie die Konformitätsbewertung für dasselbe Produkt nicht doppelt.' },
                { en: 'The UK importer verifies compliance and appears on the label, and Northern Ireland requires CE under the Windsor Framework.',
                  zh: '英国进口商负责核验合规并标注于标签；根据《温莎框架》，北爱尔兰要求使用CE标志。',
                  de: 'Der britische Importeur verifiziert die Konformität und erscheint auf dem Etikett; Nordirland verlangt nach dem Windsor-Rahmen CE.' },
                { en: 'Watch divergence: recognition applies to the EU requirements as listed in the UK instrument, medical devices and construction products run on separate tracks, and a live consultation would extend recognition to products certified under the EU ESPR ecodesign measures.',
                  zh: '注意法规分化：承认范围以英国法规文件所列的欧盟要求为准，医疗器械和建筑产品适用单独安排，且一项进行中的公众咨询拟将承认范围扩展至按欧盟ESPR生态设计措施认证的产品。',
                  de: 'Divergenz beobachten: Die Anerkennung gilt für die im britischen Rechtsakt gelisteten EU-Anforderungen, Medizinprodukte und Bauprodukte laufen auf eigenen Schienen, und eine laufende Konsultation würde die Anerkennung auf nach den EU-ESPR-Ökodesignmaßnahmen zertifizierte Produkte ausdehnen.' }
            ],
            supplier: [
                { en: 'Keep building to CE: one CE compliant product generally serves both the EU and the GB market, so your EU conformity work does not need to be duplicated for the UK.',
                  zh: '继续按CE要求生产：一件符合CE要求的产品通常可同时进入欧盟和大不列颠市场，您的欧盟合规工作无需为英国重复一遍。',
                  de: 'Weiter auf CE bauen: Ein CE-konformes Produkt bedient in der Regel EU- und GB-Markt zugleich, Ihre EU-Konformitätsarbeit muss für das Vereinigte Königreich nicht dupliziert werden.' },
                { en: 'The manufacturer still runs the conformity assessment and keeps the technical file; UK buyers will ask for the same declaration of conformity and test evidence as EU buyers.',
                  zh: '制造商仍须进行合格评定并保存技术文件；英国买家会要求提供与欧盟买家相同的符合性声明和测试证明。',
                  de: 'Der Hersteller führt weiterhin die Konformitätsbewertung durch und hält die technische Dokumentation vor; britische Abnehmer verlangen dieselbe Konformitätserklärung und dieselben Prüfnachweise wie EU-Abnehmer.' },
                { en: 'Plan label artwork so the UK importer can appear on products for Great Britain, alongside the existing EU label content.',
                  zh: '规划标签版面时，为销往大不列颠的产品预留英国进口商信息的位置，与现有欧盟标签内容并存。',
                  de: 'Etikettenlayouts so planen, dass der britische Importeur auf Produkten für Großbritannien neben den bestehenden EU-Angaben erscheinen kann.' },
                { en: 'Before dropping UKCA entirely, check each product rule: recognition covers the EU requirements listed in the UK instrument, and medical devices and construction products follow separate tracks.',
                  zh: '在完全放弃UKCA之前，请逐项核查产品法规：承认范围仅覆盖英国法规文件所列的欧盟要求，医疗器械和建筑产品适用单独安排。',
                  de: 'Bevor Sie UKCA ganz aufgeben, jede Produktvorschrift prüfen: Die Anerkennung deckt die im britischen Rechtsakt gelisteten EU-Anforderungen ab, Medizinprodukte und Bauprodukte folgen eigenen Schienen.' }
            ]
        },
        actions: [
            { en: 'Map each product against the product regulations listed in the UK instrument to confirm CE recognition applies to its rule set.',
              zh: '将每件产品对照英国法规文件所列的产品法规逐一核对，确认CE承认适用于其所属规则。',
              de: 'Jedes Produkt gegen die im britischen Rechtsakt gelisteten Produktvorschriften abgleichen und bestätigen, dass die CE-Anerkennung für sein Regelwerk gilt.' },
            { en: 'Keep one CE technical file per product and share the declaration of conformity with UK buyers; separate UKCA testing is usually unnecessary.',
              zh: '每件产品保留一套CE技术文件，并向英国买家提供符合性声明；通常无需单独的UKCA测试。',
              de: 'Je Produkt eine CE-technische Dokumentation führen und die Konformitätserklärung mit britischen Abnehmern teilen; separate UKCA-Prüfungen sind meist unnötig.' },
            { en: 'Update labels so the UK importer appears on products for Great Britain, and keep CE for Northern Ireland under the Windsor Framework.',
              zh: '更新标签，使销往大不列颠的产品标注英国进口商信息，并按《温莎框架》为北爱尔兰保留CE标志。',
              de: 'Etiketten aktualisieren, damit der britische Importeur auf Produkten für Großbritannien erscheint, und CE für Nordirland nach dem Windsor-Rahmen beibehalten.' },
            { en: 'Track the divergence watchlist: the consultation on recognising EU ESPR ecodesign certification, and the separate tracks for medical devices and construction products.',
              zh: '跟踪法规分化观察清单：关于承认欧盟ESPR生态设计认证的公众咨询，以及医疗器械和建筑产品的单独安排。',
              de: 'Die Divergenz-Beobachtungsliste verfolgen: die Konsultation zur Anerkennung der EU-ESPR-Ökodesignzertifizierung sowie die Sonderwege für Medizinprodukte und Bauprodukte.' }
        ],
        documents: [
            { en: 'CE technical file and declaration of conformity per product',
              zh: '每件产品的CE技术文件和符合性声明',
              de: 'CE-technische Dokumentation und Konformitätserklärung je Produkt' },
            { en: 'Test reports against the applicable EU requirements (toys, low voltage, EMC, radio equipment, RoHS, ecodesign)',
              zh: '对照适用欧盟要求的测试报告（玩具、低电压、电磁兼容、无线电设备、RoHS、生态设计）',
              de: 'Prüfberichte zu den anwendbaren EU-Anforderungen (Spielzeug, Niederspannung, EMV, Funkanlagen, RoHS, Ökodesign)' },
            { en: 'Label artwork showing the UK importer details for Great Britain',
              zh: '标注英国进口商信息、用于大不列颠市场的标签版面',
              de: 'Etikettenlayout mit den Angaben des britischen Importeurs für Großbritannien' },
            { en: 'Per product mapping of the UK product regulation under which CE is recognised',
              zh: '每件产品对应的、CE获承认所依据的英国产品法规清单',
              de: 'Zuordnung je Produkt zur britischen Produktvorschrift, unter der CE anerkannt ist' }
        ],
        sources: []
    },

    ukreach: {
        roles: {
            office: [
                { en: 'UK REACH has run separately from EU REACH since 1 January 2021, enforced by the Health and Safety Executive (HSE): GB compliance must be checked against the GB lists, which diverge slowly from the EU lists.',
                  zh: '自2021年1月1日起，英国REACH与欧盟REACH分开运行，由英国健康与安全执行局（HSE）执法：英国合规须对照英国清单核查，该清单正与欧盟清单缓慢分化。',
                  de: 'UK REACH läuft seit dem 1. Januar 2021 getrennt vom EU-REACH, vollzogen durch die Health and Safety Executive (HSE): Die GB-Konformität muss gegen die GB-Listen geprüft werden, die langsam von den EU-Listen abweichen.' },
                { en: 'For finished consumer goods the main duties are the restrictions (the GB equivalent of Annex XVII, for example phthalates, azo dyes, nickel) and the duty to inform customers when a substance of very high concern exceeds 0.1% by weight.',
                  zh: '对成品消费品而言，主要义务是限制物质清单（相当于欧盟附件XVII的英国版本，如邻苯二甲酸酯、偶氮染料、镍）以及当高度关注物质（SVHC）含量超过0.1%（重量比）时告知客户的义务。',
                  de: 'Für fertige Konsumgüter sind die Hauptpflichten die Beschränkungen (das GB-Pendant zu Anhang XVII, etwa Phthalate, Azofarbstoffe, Nickel) und die Pflicht, Kunden zu informieren, wenn ein besonders besorgniserregender Stoff 0,1 Gewichtsprozent überschreitet.' },
                { en: 'Transitional substance registrations were extended a second time in August 2026 (SI 2026/849): 27 October 2029 for 1,000+ tonnes per year and CMRs, 2030 for 100+ tonnes, 2031 for 1+ tonne.',
                  zh: '过渡性物质注册截止日期已于2026年8月第二次延长（SI 2026/849）：年吨位1,000吨以上及CMR物质为2029年10月27日，100吨以上为2030年，1吨以上为2031年。',
                  de: 'Die Übergangsregistrierungen für Stoffe wurden im August 2026 ein zweites Mal verlängert (SI 2026/849): 27. Oktober 2029 für 1.000+ Tonnen pro Jahr und CMR-Stoffe, 2030 für 100+ Tonnen, 2031 für 1+ Tonne.' },
                { en: 'Non UK companies act through a GB based Only Representative, otherwise the GB importer registers; clarify per substance who carries the duty, because non compliant articles can be withdrawn from the GB market.',
                  zh: '非英国企业须通过设于英国的唯一代表行事，否则由其英国进口商注册；请按物质逐一明确义务承担方，因为不合规物品可被撤出英国市场。',
                  de: 'Nicht-britische Unternehmen handeln über einen in Großbritannien ansässigen Only Representative, andernfalls registriert der GB-Importeur; klären Sie je Stoff, wer die Pflicht trägt, denn nicht konforme Erzeugnisse können vom GB-Markt genommen werden.' }
            ],
            supplier: [
                { en: 'Your EU REACH compliance is the starting point, but the GB lists are drifting: a substance can be acceptable in one market and restricted in the other, so dual checking is now part of compliance.',
                  zh: '您的欧盟REACH合规是基础，但英国清单正在分化：同一物质可能在一个市场可用而在另一个市场受限，因此同时核查两套清单已成为合规工作的一部分。',
                  de: 'Ihre EU-REACH-Konformität ist der Ausgangspunkt, aber die GB-Listen driften: Ein Stoff kann in einem Markt zulässig und im anderen beschränkt sein, doppeltes Prüfen gehört jetzt zur Compliance.' },
                { en: 'Expect UK buyers to request material declarations against both the EU and the GB SVHC candidate lists, with the 0.1% by weight information threshold.',
                  zh: '英国买家会要求您对照欧盟和英国两份SVHC候选清单提交材料声明，适用0.1%（重量比）的告知门槛。',
                  de: 'Rechnen Sie damit, dass britische Abnehmer Materialdeklarationen gegen die EU- und die GB-SVHC-Kandidatenliste verlangen, mit der Informationsschwelle von 0,1 Gewichtsprozent.' },
                { en: 'If you supply substances or mixtures rather than finished articles, agree with your buyer who registers: a GB based Only Representative appointed by you, or the GB importer, ahead of the 2029 to 2031 deadlines.',
                  zh: '如果您供应的是物质或混合物而非成品物品，请与买家约定由谁注册：由您委任设于英国的唯一代表，或由英国进口商注册，须赶在2029至2031年的截止日期之前。',
                  de: 'Liefern Sie Stoffe oder Gemische statt fertiger Erzeugnisse, klären Sie mit dem Abnehmer, wer registriert: ein von Ihnen bestellter Only Representative in Großbritannien oder der GB-Importeur, rechtzeitig vor den Fristen 2029 bis 2031.' },
                { en: 'Keep restricted substance test reports (phthalates, azo dyes, nickel) current for goods sold to Great Britain; HSE enforcement can remove non compliant articles from the market.',
                  zh: '为销往大不列颠的商品保持限制物质测试报告（邻苯二甲酸酯、偶氮染料、镍）的时效性；HSE执法可将不合规物品撤出市场。',
                  de: 'Halten Sie Prüfberichte zu beschränkten Stoffen (Phthalate, Azofarbstoffe, Nickel) für nach Großbritannien verkaufte Waren aktuell; die HSE kann nicht konforme Erzeugnisse vom Markt nehmen.' }
            ]
        },
        actions: [
            { en: 'Dual check restricted substances for every product: EU REACH and UK REACH separately, the two lists no longer move together.',
              zh: '对每件产品分别核查限制物质：欧盟REACH和英国REACH各查一遍，两套清单已不再同步变化。',
              de: 'Beschränkte Stoffe je Produkt doppelt prüfen: EU-REACH und UK REACH getrennt, die beiden Listen bewegen sich nicht mehr im Gleichschritt.' },
            { en: 'Screen articles against the GB SVHC candidate list and set up the customer information duty for concentrations above 0.1% by weight.',
              zh: '对照英国SVHC候选清单筛查物品，并针对含量超过0.1%（重量比）的情形建立客户告知机制。',
              de: 'Erzeugnisse gegen die GB-SVHC-Kandidatenliste screenen und die Kundeninformationspflicht für Konzentrationen über 0,1 Gewichtsprozent einrichten.' },
            { en: 'Map registrable substances to the transitional deadlines (27 October 2029 for 1,000+ tonnes and CMRs, 2030 for 100+ tonnes, 2031 for 1+ tonne) and decide the Only Representative question early.',
              zh: '将须注册的物质对应到过渡截止日期（1,000吨以上及CMR物质为2029年10月27日，100吨以上为2030年，1吨以上为2031年），并尽早决定唯一代表安排。',
              de: 'Registrierungspflichtige Stoffe den Übergangsfristen zuordnen (27. Oktober 2029 für 1.000+ Tonnen und CMR, 2030 für 100+ Tonnen, 2031 für 1+ Tonne) und die Only-Representative-Frage früh entscheiden.' },
            { en: 'Add the GB lists to routine test plans for consumer goods (phthalates, azo dyes, nickel), the HSE can withdraw non compliant articles from the GB market.',
              zh: '将英国清单纳入消费品常规测试计划（邻苯二甲酸酯、偶氮染料、镍），HSE可将不合规物品撤出英国市场。',
              de: 'Die GB-Listen in die Routineprüfpläne für Konsumgüter aufnehmen (Phthalate, Azofarbstoffe, Nickel), die HSE kann nicht konforme Erzeugnisse vom GB-Markt nehmen.' }
        ],
        documents: [
            { en: 'Material declarations against both the EU and GB SVHC candidate lists (0.1% by weight threshold)',
              zh: '对照欧盟和英国两份SVHC候选清单的材料声明（0.1%重量比门槛）',
              de: 'Materialdeklarationen gegen die EU- und die GB-SVHC-Kandidatenliste (Schwelle 0,1 Gewichtsprozent)' },
            { en: 'Test reports for restricted substances (phthalates, azo dyes, nickel) per product family',
              zh: '按产品系列的限制物质测试报告（邻苯二甲酸酯、偶氮染料、镍）',
              de: 'Prüfberichte zu beschränkten Stoffen (Phthalate, Azofarbstoffe, Nickel) je Produktfamilie' },
            { en: 'Substance inventory with tonnage bands mapped to the 2029, 2030 and 2031 registration deadlines',
              zh: '按吨位区间对应2029、2030和2031年注册截止日期的物质清单',
              de: 'Stoffinventar mit Mengenbändern, zugeordnet zu den Registrierungsfristen 2029, 2030 und 2031' },
            { en: 'Only Representative appointment, or confirmation that the GB importer holds the registration',
              zh: '唯一代表委任文件，或确认注册由英国进口商持有的证明',
              de: 'Bestellung des Only Representative oder Bestätigung, dass der GB-Importeur die Registrierung hält' }
        ],
        sources: []
    },

    uktr: {
        roles: {
            office: [
                { en: 'The operator first placing timber, furniture or paper products on the GB market must run a documented due diligence system: species, harvest country, legality evidence, risk assessment and mitigation. The GB regime applies since 1 January 2021, the rules themselves date back to 2013.',
                  zh: '首次将木材、家具或纸制品投放英国市场的经营者须建立书面尽职调查体系：树种、采伐国、合法性证明、风险评估和缓解措施。英国版制度自2021年1月1日起适用，相关规则可追溯至2013年。',
                  de: 'Der Marktteilnehmer, der Holz, Möbel oder Papierprodukte erstmals auf den GB-Markt bringt, muss ein dokumentiertes Sorgfaltspflichtsystem betreiben: Baumart, Ernteland, Legalitätsnachweise, Risikobewertung und Risikominderung. Das GB-Regime gilt seit dem 1. Januar 2021, die Regeln selbst stammen aus 2013.' },
                { en: 'Illegally harvested timber is prohibited outright: the scope covers timber, furniture and paper products, not only raw wood.',
                  zh: '非法采伐的木材被完全禁止：适用范围涵盖木材、家具和纸制品，而不仅是原木。',
                  de: 'Illegal geschlagenes Holz ist schlicht verboten: Der Anwendungsbereich umfasst Holz, Möbel und Papierprodukte, nicht nur Rohholz.' },
                { en: 'Companies buying and selling further down the chain act as traders: they must keep supplier and customer records for five years so the timber stays traceable.',
                  zh: '在供应链下游买卖的企业属于贸易商：须保存供应商和客户记录五年，确保木材可追溯。',
                  de: 'Unternehmen, die weiter unten in der Kette kaufen und verkaufen, gelten als Händler: Sie müssen Lieferanten- und Kundenaufzeichnungen fünf Jahre aufbewahren, damit das Holz rückverfolgbar bleibt.' },
                { en: 'Enforcement sits with the Office for Product Safety and Standards on behalf of Defra, escalating from warning letters to notices of remedial action and prosecution with unlimited fines.',
                  zh: '由产品安全与标准办公室（OPSS）代表英国环境食品与乡村事务部（Defra）执法，从警告信逐步升级至整改通知和刑事起诉，罚款无上限。',
                  de: 'Die Durchsetzung liegt beim Office for Product Safety and Standards im Auftrag von Defra und eskaliert von Warnschreiben über Anordnungen zur Abhilfe bis zur Strafverfolgung mit unbegrenzten Geldbußen.' }
            ],
            supplier: [
                { en: 'You have no direct obligation under the UK regulation, the GB operator carries the due diligence duty. But that due diligence runs on your documentation: species, harvest country and legality evidence.',
                  zh: '您在英国法规下没有直接义务，尽职调查责任由英国经营者承担。但尽职调查依赖您提供的文件：树种、采伐国和合法性证明。',
                  de: 'Sie haben unter der UK-Verordnung keine direkte Pflicht, die Sorgfaltspflicht trägt der GB-Marktteilnehmer. Aber diese Sorgfaltsprüfung basiert auf Ihrer Dokumentation: Baumart, Ernteland und Legalitätsnachweise.' },
                { en: 'Expect UK importers to ask for species, origin and harvest legality evidence for furniture and other timber products, per product line and consistently.',
                  zh: '英国进口商将要求提供家具及其他木制品的树种、原产地和采伐合法性证明，按产品线持续提供。',
                  de: 'Rechnen Sie damit, dass UK-Importeure für Möbel und andere Holzprodukte Nachweise zu Baumart, Herkunft und Legalität der Ernte verlangen, je Produktlinie und laufend.' },
                { en: 'The legality due diligence works just like under the EU timber rules, so documentation prepared for EU buyers largely serves your UK buyers as well.',
                  zh: '该合法性尽职调查与欧盟木材法规类似，为欧盟买家准备的文件在很大程度上同样适用于英国买家。',
                  de: 'Die Legalitätsprüfung funktioniert wie unter den EU-Holzregeln, für EU-Abnehmer erstellte Unterlagen dienen daher weitgehend auch Ihren UK-Kunden.' },
                { en: 'The UK confirmed in September 2026 that it will regulate forest risk commodities in line with the EUDR (legislation expected 2027). EUDR style geolocation traceability you build now also prepares you for the coming UK rules.',
                  zh: '英国已于2026年9月确认将参照EUDR监管森林风险商品（立法预计2027年出台）。您现在建设的EUDR式地理定位追溯体系同时也在为即将到来的英国规则做准备。',
                  de: 'Das UK hat im September 2026 bestätigt, Waldrisiko-Rohstoffe im Einklang mit der EUDR zu regulieren (Gesetzgebung erwartet 2027). Eine jetzt aufgebaute Geolokalisierungs-Rückverfolgung im EUDR-Stil bereitet Sie auch auf die kommenden UK-Regeln vor.' }
            ]
        },
        actions: [
            { en: 'Map which of your products contain timber, furniture or paper components sold to the UK, and clarify who is the operator (first placer on the GB market) and who is a trader.',
              zh: '梳理销往英国的产品中哪些含木材、家具或纸制品成分，并明确谁是经营者（首次投放英国市场者）、谁是贸易商。',
              de: 'Erfassen, welche Ihrer Produkte mit Holz-, Möbel- oder Papieranteilen ins UK gehen, und klären, wer Marktteilnehmer (Erstinverkehrbringer in GB) und wer Händler ist.' },
            { en: 'Collect species, harvest country and legality evidence per product line before shipment, gaps surface exactly when the goods are about to be placed on the market.',
              zh: '在发货前按产品线收集树种、采伐国和合法性证明，缺口往往在产品即将投放市场时才暴露。',
              de: 'Baumart, Ernteland und Legalitätsnachweise vor der Verschiffung je Produktlinie einsammeln, Lücken zeigen sich genau dann, wenn die Ware auf den Markt soll.' },
            { en: 'Set up five year retention of supplier and customer records for all timber, furniture and paper transactions in the chain.',
              zh: '为供应链中所有木材、家具和纸制品交易建立供应商和客户记录的五年保存机制。',
              de: 'Eine fünfjährige Aufbewahrung der Lieferanten- und Kundenaufzeichnungen für alle Holz-, Möbel- und Papiertransaktionen in der Kette einrichten.' },
            { en: 'Watch the announced UK forest risk commodity rules (policy paper September 2026, legislation expected 2027) and note that the EUDR applies in Northern Ireland from 30 December 2026.',
              zh: '关注已公布的英国森林风险商品规则（2026年9月政策文件，立法预计2027年），并注意欧盟毁林条例自2026年12月30日起适用于北爱尔兰。',
              de: 'Die angekündigten UK-Regeln zu Waldrisiko-Rohstoffen beobachten (Grundsatzpapier September 2026, Gesetzgebung erwartet 2027) und beachten, dass die EUDR ab 30. Dezember 2026 in Nordirland gilt.' }
        ],
        documents: [
            { en: 'Species and harvest country per timber, furniture or paper product',
              zh: '每件木材、家具或纸制品的树种和采伐国信息',
              de: 'Baumart und Ernteland je Holz-, Möbel- oder Papierprodukt' },
            { en: 'Legality evidence for the harvest, per source and product line',
              zh: '按来源和产品线提供的采伐合法性证明',
              de: 'Legalitätsnachweise für die Ernte, je Quelle und Produktlinie' },
            { en: 'Documented risk assessment and mitigation measures (the operator\'s due diligence system)',
              zh: '书面风险评估和缓解措施（经营者尽职调查体系的组成部分）',
              de: 'Dokumentierte Risikobewertung und Minderungsmaßnahmen (Teil des Sorgfaltspflichtsystems des Marktteilnehmers)' },
            { en: 'Supplier and customer records kept for five years (trader duty)',
              zh: '保存五年的供应商和客户记录（贸易商义务）',
              de: 'Fünf Jahre aufbewahrte Lieferanten- und Kundenaufzeichnungen (Händlerpflicht)' }
        ],
        sources: [
            { label: 'UK policy paper: The UK\'s approach to deforestation regulations (Sep 2026)', url: 'https://www.gov.uk/government/publications/the-uks-approach-to-deforestation-regulations/the-uks-approach-to-deforestation-regulations' }
        ]
    },

    ukfrc: {
        roles: {
            office: [
                { en: 'Proposed, not yet law: the policy paper was published on 2 September 2026, legislation is expected in 2027 and no secondary legislation has been laid. Do not treat any detail as final yet.',
                  zh: '尚为提案，未成为法律：政策文件于2026年9月2日发布，立法预计2027年出台，配套细则尚未提交议会。目前请勿将任何细节视为定论。',
                  de: 'Vorschlag, noch kein Gesetz: Das Grundsatzpapier erschien am 2. September 2026, die Gesetzgebung wird 2027 erwartet, Durchführungsvorschriften liegen noch nicht vor. Kein Detail sollte bereits als endgültig gelten.' },
                { en: 'The announced design: due diligence for GB businesses with turnover above GBP 1m using wood, cattle, cocoa, coffee, palm oil, rubber or soy and derived products, explicitly including chocolate and furniture.',
                  zh: '已公布的制度设计：营业额超过100万英镑、使用木材、牛、可可、咖啡、棕榈油、橡胶或大豆及其衍生产品的英国企业须开展尽职调查，明确包括巧克力和家具。',
                  de: 'Das angekündigte Design: Sorgfaltspflichten für GB-Unternehmen mit über 1 Mio. GBP Umsatz, die Holz, Rinder, Kakao, Kaffee, Palmöl, Kautschuk oder Soja und daraus gewonnene Produkte verwenden, ausdrücklich einschließlich Schokolade und Möbeln.' },
                { en: 'The regime is built to operate consistently alongside the EUDR, with geolocation data. EUDR preparation you already run for EU flows is direct preparation for the UK duty.',
                  zh: '该制度设计为与欧盟EUDR保持一致运作，包含地理定位数据。您为欧盟业务开展的EUDR准备工作可直接用于英国义务。',
                  de: 'Das Regime ist darauf ausgelegt, konsistent neben der EUDR zu funktionieren, mit Geolokalisierungsdaten. Ihre EUDR-Vorbereitung für EU-Ströme ist direkte Vorbereitung auf die UK-Pflicht.' },
                { en: 'Northern Ireland moves first: under the Windsor Framework the EU Deforestation Regulation applies there from 30 December 2026 for large and medium operators, ahead of any GB legislation.',
                  zh: '北爱尔兰先行一步：根据《温莎框架》，欧盟毁林条例自2026年12月30日起适用于北爱尔兰的大中型经营者，早于任何英国本土立法。',
                  de: 'Nordirland geht voran: Unter dem Windsor Framework gilt die EU-Entwaldungsverordnung dort ab 30. Dezember 2026 für große und mittlere Marktteilnehmer, vor jeder GB-Gesetzgebung.' }
            ],
            supplier: [
                { en: 'There is nothing to comply with in Great Britain yet, but your UK buyers will start preparing once the 2027 legislation lands. Early data requests are the realistic scenario.',
                  zh: '目前在大不列颠尚无须履行的义务，但一旦2027年立法落地，英国买家就会着手准备。提前收到数据请求是现实的预期。',
                  de: 'In Großbritannien gibt es noch nichts zu erfüllen, aber Ihre UK-Kunden werden mit der erwarteten Gesetzgebung 2027 zu arbeiten beginnen. Frühe Datenanfragen sind das realistische Szenario.' },
                { en: 'Check whether your products contain the seven commodities or derived products: wood, cattle, cocoa, coffee, palm oil, rubber, soy, with chocolate and furniture explicitly named.',
                  zh: '核查您的产品是否含有七类商品或其衍生产品：木材、牛、可可、咖啡、棕榈油、橡胶、大豆，其中巧克力和家具被明确点名。',
                  de: 'Prüfen Sie, ob Ihre Produkte die sieben Rohstoffe oder daraus gewonnene Produkte enthalten: Holz, Rinder, Kakao, Kaffee, Palmöl, Kautschuk, Soja, wobei Schokolade und Möbel ausdrücklich genannt sind.' },
                { en: 'Geolocation data of production is the core of the announced design, the same data the EUDR requires. If you already build EUDR geolocation traceability, you are preparing for the UK rules too.',
                  zh: '生产环节的地理定位数据是已公布制度设计的核心，与EUDR要求的数据相同。如果您已在建设EUDR地理定位追溯体系，即同时在为英国规则做准备。',
                  de: 'Geolokalisierungsdaten der Produktion sind der Kern des angekündigten Designs, dieselben Daten, die die EUDR verlangt. Wer bereits EUDR-Geolokalisierungs-Rückverfolgung aufbaut, bereitet sich zugleich auf die UK-Regeln vor.' },
                { en: 'Timber products do not get a waiting period: they already face legality due diligence today under the UK Timber Regulation, before the forest risk commodity rules arrive.',
                  zh: '木制品没有等待期：在森林风险商品规则出台之前，它们已须按英国木材法规接受合法性尽职调查。',
                  de: 'Holzprodukte haben keine Wartezeit: Sie unterliegen schon heute der Legalitätsprüfung nach der UK Timber Regulation, bevor die Regeln für Waldrisiko-Rohstoffe kommen.' }
            ]
        },
        actions: [
            { en: 'Screen your product range against the seven commodities (wood, cattle, cocoa, coffee, palm oil, rubber, soy) and their derived products, including chocolate and furniture.',
              zh: '对照七类商品（木材、牛、可可、咖啡、棕榈油、橡胶、大豆）及其衍生产品（包括巧克力和家具）筛查您的产品线。',
              de: 'Ihr Sortiment gegen die sieben Rohstoffe (Holz, Rinder, Kakao, Kaffee, Palmöl, Kautschuk, Soja) und deren Folgeprodukte prüfen, einschließlich Schokolade und Möbeln.' },
            { en: 'Reuse and extend your EUDR geolocation traceability for UK flows instead of building a second system, the UK design is announced as consistent with the EUDR.',
              zh: '将您的EUDR地理定位追溯体系复用并扩展至英国业务，而非另建第二套系统，英国制度已宣布与EUDR保持一致。',
              de: 'Ihre EUDR-Geolokalisierungs-Rückverfolgung für UK-Ströme weiterverwenden und ausbauen statt ein zweites System aufzubauen, das UK-Design ist als EUDR-konsistent angekündigt.' },
            { en: 'Separate Northern Ireland from Great Britain in your planning: NI deliveries need EUDR compliance from 30 December 2026, GB rules are expected from 2027.',
              zh: '在规划中将北爱尔兰与大不列颠区分开：发往北爱尔兰的货物自2026年12月30日起须符合EUDR，大不列颠规则预计2027年起适用。',
              de: 'Nordirland und Großbritannien in der Planung trennen: NI-Lieferungen brauchen EUDR-Konformität ab 30. Dezember 2026, GB-Regeln werden ab 2027 erwartet.' },
            { en: 'Track the 2027 legislation and the secondary legislation before treating thresholds or scope as final, only the policy paper of 2 September 2026 exists so far.',
              zh: '在将门槛或范围视为定论之前，持续跟踪2027年立法及配套细则，目前仅有2026年9月2日的政策文件。',
              de: 'Die Gesetzgebung 2027 und die Durchführungsvorschriften verfolgen, bevor Schwellenwerte oder Anwendungsbereich als endgültig gelten, bislang existiert nur das Grundsatzpapier vom 2. September 2026.' }
        ],
        documents: [
            { en: 'Commodity mapping: which products contain wood, cattle, cocoa, coffee, palm oil, rubber or soy, or derived products',
              zh: '商品对照表：哪些产品含有木材、牛、可可、咖啡、棕榈油、橡胶或大豆及其衍生产品',
              de: 'Rohstoff-Mapping: welche Produkte Holz, Rinder, Kakao, Kaffee, Palmöl, Kautschuk oder Soja bzw. Folgeprodukte enthalten' },
            { en: 'Geolocation data for production, built to the EUDR standard',
              zh: '按EUDR标准建立的生产环节地理定位数据',
              de: 'Geolokalisierungsdaten der Produktion, aufgebaut nach dem EUDR-Standard' },
            { en: 'Supply chain traceability records back to the origin of the commodity',
              zh: '追溯至商品原产地的供应链追溯记录',
              de: 'Rückverfolgbarkeitsaufzeichnungen der Lieferkette bis zum Ursprung des Rohstoffs' },
            { en: 'Evidence of EUDR readiness for deliveries into Northern Ireland from 30 December 2026',
              zh: '自2026年12月30日起发往北爱尔兰货物的EUDR合规准备证明',
              de: 'Nachweis der EUDR-Bereitschaft für Lieferungen nach Nordirland ab 30. Dezember 2026' }
        ],
        sources: [
            { label: 'gov.uk: Regulations, timber and FLEGT licences (the current GB timber regime)', url: 'https://www.gov.uk/guidance/regulations-timber-and-flegt-licences' }
        ]
    },

    ukgreenclaims: {
        roles: {
            office: [
                { en: 'Since 6 April 2025 the CMA can fine breaches directly at up to 10% of global turnover, without going to court. Greenwashing is a declared enforcement priority.',
                  zh: '自2025年4月6日起，CMA可不经法院直接处以最高相当于全球营业额10%的罚款。打击洗绿是其明确的执法重点。',
                  de: 'Seit dem 6. April 2025 kann die CMA Verstöße direkt mit bis zu 10% des weltweiten Umsatzes ahnden, ohne Gerichtsverfahren. Greenwashing ist erklärte Durchsetzungspriorität.' },
                { en: 'Every environmental claim reaching UK consumers (eco, recycled, sustainable, carbon neutral) must be truthful, substantiated and consider the full life cycle, following the CMA Green Claims Code and the 2025 unfair commercial practices guidance.',
                  zh: '面向英国消费者的每一项环境声明（环保、再生、可持续、碳中和）都必须真实、有据可依并考虑完整生命周期，须遵循CMA《绿色声明准则》及2025年不公平商业行为指南。',
                  de: 'Jede Umweltaussage gegenüber UK-Verbrauchern (öko, recycelt, nachhaltig, klimaneutral) muss wahr und belegt sein und den gesamten Lebenszyklus berücksichtigen, gemäß dem CMA Green Claims Code und der Leitlinie zu unlauteren Geschäftspraktiken von 2025.' },
                { en: 'CMA guidance from January 2026: retailers must take reasonable steps to verify supplier claims rather than pass them through. Passing on an unchecked factory claim is itself a compliance gap.',
                  zh: 'CMA于2026年1月发布的指南要求：零售商须采取合理措施核实供应商声明，而非简单转述。未经核实就转述工厂声明本身就是合规缺口。',
                  de: 'CMA-Leitlinie vom Januar 2026: Händler müssen angemessene Schritte unternehmen, um Lieferantenaussagen zu prüfen, statt sie durchzureichen. Eine ungeprüft weitergegebene Fabrikaussage ist selbst eine Compliance-Lücke.' },
                { en: 'On top of company fines there are personal fines of up to GBP 300,000. Keep an evidence file per claim, that is the defence the CMA expects to see.',
                  zh: '除企业罚款外，个人罚款最高可达30万英镑。请为每项声明建立证据档案，这正是CMA期望看到的抗辩依据。',
                  de: 'Neben Unternehmensbußgeldern drohen persönliche Geldbußen bis 300.000 GBP. Führen Sie eine Beweisakte je Aussage, genau das erwartet die CMA als Absicherung.' }
            ],
            supplier: [
                { en: 'The January 2026 CMA guidance states responsibility can fall on manufacturers, suppliers, distributors and marketplaces, not only the retailer making the claim. Your factory claims can reach you directly.',
                  zh: 'CMA于2026年1月发布的指南指出，责任可及于制造商、供应商、分销商和线上平台，而不仅是作出声明的零售商。工厂作出的声明可能直接追责到您。',
                  de: 'Die CMA-Leitlinie vom Januar 2026 stellt klar: Die Verantwortung kann Hersteller, Lieferanten, Vertreiber und Marktplätze treffen, nicht nur den Händler, der die Aussage macht. Ihre Fabrikaussagen können direkt auf Sie zurückfallen.' },
                { en: 'Every recycled or organic claim you provide to a UK buyer needs evidence, because the buyer is required to verify it. Expect substantiation requests before your claim appears on packaging or listings.',
                  zh: '您向英国买家提供的每一项再生或有机声明都需要证据，因为买家有义务加以核实。在声明出现在包装或商品页面之前，请准备好应对证明材料请求。',
                  de: 'Jede Recycling- oder Bio-Aussage, die Sie einem UK-Kunden liefern, braucht Belege, denn der Kunde muss sie prüfen. Rechnen Sie mit Substantiierungsanfragen, bevor Ihre Aussage auf Verpackung oder Listing erscheint.' },
                { en: 'Claims must hold over the full life cycle: terms like sustainable or carbon neutral are judged against the product\'s whole footprint, not a single stage.',
                  zh: '声明须在完整生命周期内成立：可持续或碳中和等表述会按产品的整体足迹评判，而非单一环节。',
                  de: 'Aussagen müssen über den gesamten Lebenszyklus tragen: Begriffe wie nachhaltig oder klimaneutral werden am gesamten Fußabdruck des Produkts gemessen, nicht an einer einzelnen Stufe.' },
                { en: 'Marketplaces are named in the guidance too, so environmental claims in direct to consumer UK sales via platforms carry the same duties as retail claims.',
                  zh: '指南同样点名线上平台，因此通过平台直销英国消费者时作出的环境声明与零售声明承担同样的义务。',
                  de: 'Auch Marktplätze werden in der Leitlinie genannt, Umweltaussagen im Direktvertrieb an UK-Verbraucher über Plattformen unterliegen also denselben Pflichten wie Handelsaussagen.' }
            ]
        },
        actions: [
            { en: 'Inventory every environmental claim on products, packaging and listings sold into the UK: eco, recycled, sustainable, carbon neutral and similar wording.',
              zh: '清点销往英国的产品、包装和商品页面上的每一项环境声明：环保、再生、可持续、碳中和及类似表述。',
              de: 'Jede Umweltaussage auf Produkten, Verpackungen und Listings für den UK-Markt erfassen: öko, recycelt, nachhaltig, klimaneutral und ähnliche Formulierungen.' },
            { en: 'Build an evidence file per claim before the claim is used, covering the full life cycle basis of the statement.',
              zh: '在使用声明之前为每项声明建立证据档案，涵盖该表述的完整生命周期依据。',
              de: 'Vor Verwendung einer Aussage eine Beweisakte je Aussage anlegen, die die Lebenszyklus-Grundlage der Aussage abdeckt.' },
            { en: 'Set up a documented verification step for supplier claims: the CMA expects retailers to take reasonable steps, not to pass claims through.',
              zh: '为供应商声明建立书面核实流程：CMA要求零售商采取合理措施核实，而非简单转述。',
              de: 'Einen dokumentierten Prüfschritt für Lieferantenaussagen einrichten: Die CMA erwartet angemessene Prüfschritte des Händlers, kein Durchreichen.' },
            { en: 'Review all claims against the Green Claims Code and the 2025 guidance, and remove or reword anything you cannot substantiate.',
              zh: '对照《绿色声明准则》及2025年指南审查所有声明，删除或改写任何无法证实的表述。',
              de: 'Alle Aussagen gegen den Green Claims Code und die Leitlinie 2025 prüfen und alles streichen oder umformulieren, was sich nicht belegen lässt.' }
        ],
        documents: [
            { en: 'Evidence file per environmental claim, kept before and during use of the claim',
              zh: '每项环境声明的证据档案，在声明使用前及使用期间持续保存',
              de: 'Beweisakte je Umweltaussage, angelegt vor und geführt während der Verwendung der Aussage' },
            { en: 'Recycled content evidence per component for any recycled claim (also needed for the UK Plastic Packaging Tax)',
              zh: '任何再生声明所需的每个组件再生含量证明（英国塑料包装税同样需要）',
              de: 'Nachweis des Rezyklatanteils je Komponente für jede Recycled-Aussage (auch für die UK Plastic Packaging Tax nötig)' },
            { en: 'Life cycle basis documentation for claims such as sustainable or carbon neutral',
              zh: '可持续或碳中和等声明的生命周期依据文件',
              de: 'Lebenszyklus-Dokumentation für Aussagen wie nachhaltig oder klimaneutral' },
            { en: 'Records of the verification steps taken on claims received from suppliers',
              zh: '对供应商所提供声明采取核实措施的记录',
              de: 'Aufzeichnungen der Prüfschritte zu Aussagen, die von Lieferanten übernommen wurden' }
        ],
        sources: []
    },

    ukweee: {
        roles: {
            office: [
                { en: 'UK producers and importers of electrical and electronic equipment register through a compliance scheme, report EEE placed on the market by category and finance collection and recycling.',
                  zh: '英国电气电子设备的生产商和进口商须通过合规计划注册，按类别报告投放市场的设备，并为收集和回收提供资金。',
                  de: 'UK-Hersteller und -Importeure von Elektro- und Elektronikgeräten registrieren sich über ein Compliance-Scheme, melden die in Verkehr gebrachten Geräte nach Kategorie und finanzieren Sammlung und Recycling.' },
                { en: 'Since 12 August 2025 online marketplaces count as producers for EEE sold to UK households by non UK sellers, and vapes are explicitly in scope.',
                  zh: '自2025年8月12日起，线上平台就非英国卖家售予英国家庭的电气电子设备承担生产商责任，电子烟明确纳入范围。',
                  de: 'Seit dem 12. August 2025 gelten Online-Marktplätze als Hersteller für Geräte, die Nicht-UK-Verkäufer an UK-Haushalte verkaufen, und E-Zigaretten sind ausdrücklich erfasst.' },
                { en: 'For marketplace producers the first data report was due 31 January 2026, with financing obligations running from 2026. The channel structure now decides who pays.',
                  zh: '平台生产商的首次数据报告已于2026年1月31日到期，出资义务自2026年起执行。销售渠道结构如今决定由谁付费。',
                  de: 'Für Marktplatz-Hersteller war der erste Datenbericht am 31. Januar 2026 fällig, Finanzierungspflichten laufen ab 2026. Die Kanalstruktur entscheidet nun, wer zahlt.' },
                { en: 'Reporting runs on per product data: EEE category, weight and battery data must flow from the factory to the UK importer or brand owner.',
                  zh: '报告依赖单品数据：每个产品的设备类别、重量和电池数据须从工厂传递给英国进口商或品牌方。',
                  de: 'Die Meldung basiert auf Produktdaten: Gerätekategorie, Gewicht und Batteriedaten müssen von der Fabrik zum UK-Importeur oder Markeninhaber fließen.' }
            ],
            supplier: [
                { en: 'The producer obligations sit with your UK importer or brand owner, but their registration and reporting depend on data only you can provide per model.',
                  zh: '生产商义务由您的英国进口商或品牌方承担，但其注册和报告依赖只有您能按型号提供的数据。',
                  de: 'Die Herstellerpflichten liegen beim UK-Importeur oder Markeninhaber, aber deren Registrierung und Meldung hängen von Daten ab, die nur Sie je Modell liefern können.' },
                { en: 'Provide EEE category, weight and battery data per product, UK customers will require it in their item data.',
                  zh: '请按产品提供设备类别、重量和电池数据，英国客户会将其纳入商品数据要求。',
                  de: 'Liefern Sie Gerätekategorie, Gewicht und Batteriedaten je Produkt, UK-Kunden verlangen dies in ihren Artikeldaten.' },
                { en: 'Selling direct to UK households via marketplaces no longer escapes financing obligations: since 12 August 2025 the marketplace counts as the producer for non UK sellers.',
                  zh: '通过平台直销英国家庭不再能规避出资义务：自2025年8月12日起，平台就非英国卖家承担生产商责任。',
                  de: 'Direktverkauf an UK-Haushalte über Marktplätze entgeht den Finanzierungspflichten nicht mehr: Seit dem 12. August 2025 gilt der Marktplatz als Hersteller für Nicht-UK-Verkäufer.' },
                { en: 'Vapes are explicitly in scope of the amended rules, category and weight data are needed for them like for any other EEE.',
                  zh: '电子烟明确纳入修订后规则的范围，与其他电气电子设备一样需要提供类别和重量数据。',
                  de: 'E-Zigaretten fallen ausdrücklich unter die geänderten Regeln, Kategorie- und Gewichtsdaten werden für sie wie für jedes andere Gerät benötigt.' }
            ]
        },
        actions: [
            { en: 'Determine per sales channel who the producer is: the UK importer, the brand owner, or (for non UK sellers to UK households) the marketplace.',
              zh: '按销售渠道确定生产商是谁：英国进口商、品牌方，或（非英国卖家售予英国家庭时）线上平台。',
              de: 'Je Vertriebskanal klären, wer Hersteller ist: der UK-Importeur, der Markeninhaber oder (bei Nicht-UK-Verkäufern an UK-Haushalte) der Marktplatz.' },
            { en: 'Compile EEE category, weight and battery data per model and keep it current in the item master data shared with UK buyers.',
              zh: '按型号整理设备类别、重量和电池数据，并在与英国买家共享的商品主数据中保持更新。',
              de: 'Gerätekategorie, Gewicht und Batteriedaten je Modell zusammenstellen und in den mit UK-Kunden geteilten Artikelstammdaten aktuell halten.' },
            { en: 'Verify the registration with a compliance scheme covers all current product categories, including vapes where relevant.',
              zh: '核实合规计划注册是否覆盖当前所有产品类别，如适用应包括电子烟。',
              de: 'Prüfen, ob die Registrierung im Compliance-Scheme alle aktuellen Produktkategorien abdeckt, einschließlich E-Zigaretten, wo relevant.' },
            { en: 'For marketplace sales, align your data delivery with the marketplace\'s producer reporting, the first report cycle started with the 31 January 2026 deadline.',
              zh: '对于平台销售，使您的数据交付与平台的生产商报告对接，首个报告周期已随2026年1月31日截止日启动。',
              de: 'Bei Marktplatzverkäufen die Datenlieferung an die Herstellermeldung des Marktplatzes anbinden, der erste Berichtszyklus begann mit der Frist 31. Januar 2026.' }
        ],
        documents: [
            { en: 'EEE category classification per model, per the UK reporting categories',
              zh: '按英国报告类别划分的每个型号设备类别信息',
              de: 'Gerätekategorie-Zuordnung je Modell gemäß den UK-Meldekategorien' },
            { en: 'Product weight per model for the placed on market reporting',
              zh: '用于投放市场报告的每个型号产品重量数据',
              de: 'Produktgewicht je Modell für die Meldung der in Verkehr gebrachten Mengen' },
            { en: 'Battery data per product, passed to the UK importer or brand owner',
              zh: '传递给英国进口商或品牌方的每个产品电池数据',
              de: 'Batteriedaten je Produkt, weitergegeben an den UK-Importeur oder Markeninhaber' },
            { en: 'Compliance scheme registration and reporting records of the responsible producer',
              zh: '责任生产商的合规计划注册及报告记录',
              de: 'Registrierungs- und Meldeunterlagen des verantwortlichen Herstellers im Compliance-Scheme' }
        ],
        sources: [
            { label: 'gov.uk: Waste batteries producer responsibility (the parallel battery take back regime)', url: 'https://www.gov.uk/guidance/waste-batteries-producer-responsibility' }
        ]
    },

    ukbatteries: {
        roles: {
            office: [
                { en: 'Great Britain still runs the 2008/2009 regime: mercury and cadmium limits, capacity labelling, removability, producer registration and take back financing via the UK importer.',
                  zh: '大不列颠仍执行2008/2009年制度：汞和镉限量、容量标识、可拆卸性、生产商注册以及由英国进口商出资的回收义务。',
                  de: 'Großbritannien fährt weiter das Regime von 2008/2009: Quecksilber- und Cadmiumgrenzwerte, Kapazitätskennzeichnung, Entnehmbarkeit, Herstellerregistrierung und Rücknahmefinanzierung über den UK-Importeur.' },
                { en: 'As the UK importer you carry the producer obligations: registration and financing the take back of waste batteries.',
                  zh: '作为英国进口商，您承担生产商义务：注册并为废旧电池回收出资。',
                  de: 'Als UK-Importeur tragen Sie die Herstellerpflichten: Registrierung und Finanzierung der Rücknahme von Altbatterien.' },
                { en: 'Divergence flag: the EU Battery Regulation (2023/1542) applies in the EU and in Northern Ireland, including portable battery removability from 18 February 2027, years before an equivalent GB regime. Check NI bound flows separately.',
                  zh: '分化提示：欧盟电池法规（2023/1542）适用于欧盟和北爱尔兰，包括自2027年2月18日起的便携式电池可拆卸要求，远早于英国的同等制度。发往北爱尔兰的货流须单独核查。',
                  de: 'Divergenzhinweis: Die EU-Batterieverordnung (2023/1542) gilt in der EU und in Nordirland, einschließlich der Entnehmbarkeit von Gerätebatterien ab 18. Februar 2027, Jahre vor einem gleichwertigen GB-Regime. NI-Ströme separat prüfen.' },
                { en: 'A GB reform is expected to draw on EU Reg. 2023/1542, but the timing is unconfirmed. Designing to the EU requirements covers both markets and pre-empts the reform.',
                  zh: '英国改革预计将借鉴欧盟法规2023/1542，但时间尚未确定。按欧盟要求设计即可覆盖两个市场，并提前应对改革。',
                  de: 'Eine GB-Reform wird sich voraussichtlich an EU-VO 2023/1542 orientieren, der Zeitplan ist aber unbestätigt. Eine Auslegung auf die EU-Anforderungen deckt beide Märkte ab und nimmt die Reform vorweg.' }
            ],
            supplier: [
                { en: 'Batteries and battery containing products for Great Britain must meet the 2008 placing rules: mercury and cadmium limits and capacity labelling.',
                  zh: '销往大不列颠的电池及含电池产品须符合2008年投放市场规则：汞和镉限量以及容量标识。',
                  de: 'Batterien und batteriehaltige Produkte für Großbritannien müssen die Inverkehrbringensregeln von 2008 erfüllen: Quecksilber- und Cadmiumgrenzwerte sowie Kapazitätskennzeichnung.' },
                { en: 'Removability is part of the GB design requirements, plan it into the product from the start rather than retrofitting.',
                  zh: '可拆卸性是英国设计要求的一部分，应从一开始就纳入产品设计，而非事后改造。',
                  de: 'Entnehmbarkeit gehört zu den GB-Designanforderungen, von Anfang an ins Produkt einplanen statt nachzurüsten.' },
                { en: 'Products sold on both markets should be designed to the EU timeline: the EU Battery Regulation, including Northern Ireland, arrives first, with portable battery removability from 18 February 2027.',
                  zh: '同时销往两个市场的产品应按欧盟时间表设计：欧盟电池法规（含北爱尔兰）更早到来，便携式电池可拆卸要求自2027年2月18日起适用。',
                  de: 'Produkte für beide Märkte sollten auf die EU-Zeitschiene ausgelegt werden: Die EU-Batterieverordnung, einschließlich Nordirlands, kommt zuerst, mit Entnehmbarkeit von Gerätebatterien ab 18. Februar 2027.' },
                { en: 'Expect Great Britain to converge on EU Reg. 2023/1542 eventually: a design meeting the EU rules today is the safest way to avoid a second engineering round later.',
                  zh: '预计大不列颠最终将向欧盟法规2023/1542靠拢：今天就满足欧盟规则的设计，是避免日后二次工程改造的最稳妥方式。',
                  de: 'Rechnen Sie damit, dass Großbritannien letztlich auf EU-VO 2023/1542 zuläuft: Ein Design, das heute die EU-Regeln erfüllt, erspart am sichersten eine zweite Konstruktionsrunde.' }
            ]
        },
        actions: [
            { en: 'Verify mercury and cadmium limits and capacity labelling for every battery type shipped to Great Britain.',
              zh: '核查发往大不列颠的每种电池类型的汞和镉限量及容量标识。',
              de: 'Quecksilber- und Cadmiumgrenzwerte sowie Kapazitätskennzeichnung für jeden nach Großbritannien gelieferten Batterietyp prüfen.' },
            { en: 'Check product designs against the EU portable battery removability requirement that applies in the EU and Northern Ireland from 18 February 2027.',
              zh: '对照自2027年2月18日起在欧盟和北爱尔兰适用的便携式电池可拆卸要求核查产品设计。',
              de: 'Produktdesigns gegen die Entnehmbarkeitsanforderung für Gerätebatterien prüfen, die ab 18. Februar 2027 in der EU und in Nordirland gilt.' },
            { en: 'Confirm the UK importer\'s producer registration and take back financing cover all battery containing products in the range.',
              zh: '确认英国进口商的生产商注册和回收出资安排覆盖产品线中所有含电池产品。',
              de: 'Bestätigen, dass Herstellerregistrierung und Rücknahmefinanzierung des UK-Importeurs alle batteriehaltigen Produkte des Sortiments abdecken.' },
            { en: 'Track the announced GB reform: it is expected to draw on EU Reg. 2023/1542, but the timing is unconfirmed.',
              zh: '跟踪已宣布的英国改革：预计将借鉴欧盟法规2023/1542，但时间尚未确定。',
              de: 'Die angekündigte GB-Reform verfolgen: Sie wird sich voraussichtlich an EU-VO 2023/1542 orientieren, der Zeitplan ist aber unbestätigt.' }
        ],
        documents: [
            { en: 'Substance compliance evidence per battery type (mercury and cadmium limits)',
              zh: '每种电池类型的物质合规证明（汞和镉限量）',
              de: 'Stoffkonformitätsnachweis je Batterietyp (Quecksilber- und Cadmiumgrenzwerte)' },
            { en: 'Capacity labelling specification per battery',
              zh: '每种电池的容量标识规格文件',
              de: 'Spezifikation der Kapazitätskennzeichnung je Batterie' },
            { en: 'Design documentation showing battery removability',
              zh: '证明电池可拆卸性的设计文件',
              de: 'Designdokumentation zum Nachweis der Entnehmbarkeit der Batterie' },
            { en: 'Producer registration and take back financing records of the UK importer',
              zh: '英国进口商的生产商注册及回收出资记录',
              de: 'Herstellerregistrierung und Rücknahmefinanzierungsunterlagen des UK-Importeurs' }
        ],
        sources: [
            { label: 'gov.uk: WEEE regulations (the parallel EEE producer regime)', url: 'https://www.gov.uk/guidance/regulations-waste-electrical-and-electronic-equipment' }
        ]
    },

    microplastics: {
        roles: {
            office: [
                { en: 'The restriction bans intentionally added microplastics (synthetic polymer particles below 5 mm) under REACH Annex XVII, in force since 17 October 2023. Reformulation is required for restricted products.',
                  zh: '该限制依据REACH附件XVII禁止故意添加的微塑料（5毫米以下的合成聚合物颗粒），自2023年10月17日起生效。受限产品须进行配方调整。',
                  de: 'Die Beschränkung verbietet absichtlich zugesetztes Mikroplastik (synthetische Polymerpartikel unter 5 mm) nach REACH Anhang XVII, in Kraft seit 17. Oktober 2023. Für beschränkte Produkte ist eine Umformulierung erforderlich.' },
                { en: 'Transition dates vary by product between 2023 and 2035: check the applicable date for each affected product line before placing orders.',
                  zh: '过渡期限因产品而异，介于2023年至2035年之间：下单前请核查每条受影响产品线的适用日期。',
                  de: 'Die Übergangsfristen variieren je Produkt zwischen 2023 und 2035: Vor der Bestellung das anwendbare Datum für jede betroffene Produktlinie prüfen.' },
                { en: 'Since 17 October 2025 instructions for use to minimize microplastic release are mandatory, and reporting on quantities placed on the market applies (first annual reports were due 31 May 2026).',
                  zh: '自2025年10月17日起，须强制提供减少微塑料释放的使用说明，并对投放市场的数量负有报告义务（首份年度报告已于2026年5月31日到期）。',
                  de: 'Seit dem 17. Oktober 2025 sind Gebrauchsanweisungen zur Minimierung der Mikroplastikfreisetzung verpflichtend, dazu Berichtspflichten über die in Verkehr gebrachten Mengen (erste Jahresberichte waren zum 31. Mai 2026 fällig).' },
                { en: 'Non-compliance means product withdrawal from the market, with national enforcement penalties per member state. The shelved REACH revision (April 2026) does not change this: existing restrictions continue unchanged.',
                  zh: '不合规将导致产品退出市场，并由各成员国依国内规定处罚。被搁置的REACH修订（2026年4月）不改变这一点：现行限制继续有效。',
                  de: 'Bei Verstößen droht die Marktrücknahme des Produkts, mit nationalen Sanktionen je Mitgliedstaat. Die auf Eis gelegte REACH-Revision (April 2026) ändert daran nichts: Bestehende Beschränkungen gelten unverändert weiter.' }
            ],
            supplier: [
                { en: 'Cosmetics and textile products often contain intentionally added microplastics that are now restricted: screen your formulations and materials for synthetic polymer particles below 5 mm.',
                  zh: '化妆品和纺织类产品通常含有现已受限的故意添加微塑料：请排查配方和材料中5毫米以下的合成聚合物颗粒。',
                  de: 'Kosmetik- und Textilprodukte enthalten oft absichtlich zugesetztes, nun beschränktes Mikroplastik: Prüfen Sie Ihre Rezepturen und Materialien auf synthetische Polymerpartikel unter 5 mm.' },
                { en: 'Reformulation is required for restricted products, and the deadlines run product by product from 2023 to 2035: plan substitution work against the date that applies to your product.',
                  zh: '受限产品必须调整配方，期限按产品在2023年至2035年间逐一到期：请按适用于您产品的日期规划替代工作。',
                  de: 'Für beschränkte Produkte ist eine Umformulierung erforderlich, die Fristen laufen produktabhängig von 2023 bis 2035: Substitutionsarbeit am für Ihr Produkt geltenden Datum ausrichten.' },
                { en: 'Your buyers need your input for the mandatory instructions for use minimizing microplastic release (required since 17 October 2025).',
                  zh: '买家需要您提供信息，以编制强制性的减少微塑料释放使用说明（自2025年10月17日起要求）。',
                  de: 'Ihre Abnehmer brauchen Ihre Angaben für die verpflichtenden Gebrauchsanweisungen zur Minimierung der Mikroplastikfreisetzung (Pflicht seit 17. Oktober 2025).' },
                { en: 'Expect data requests for the annual reporting on quantities placed on the market (first reports were due 31 May 2026).',
                  zh: '请预计将收到用于年度市场投放数量报告的数据请求（首份报告已于2026年5月31日到期）。',
                  de: 'Rechnen Sie mit Datenanfragen für die jährliche Berichterstattung über die in Verkehr gebrachten Mengen (erste Berichte waren zum 31. Mai 2026 fällig).' }
            ]
        },
        actions: [
            { en: 'Screen your assortment, especially cosmetics and textiles, for intentionally added microplastics restricted under REACH Annex XVII.',
              zh: '排查产品组合（尤其是化妆品和纺织品）中依据REACH附件XVII受限的故意添加微塑料。',
              de: 'Das Sortiment, vor allem Kosmetik und Textilien, auf absichtlich zugesetztes, nach REACH Anhang XVII beschränktes Mikroplastik prüfen.' },
            { en: 'Look up the product-specific transition date (2023 to 2035) for every affected line and plan reformulation against it.',
              zh: '查明每条受影响产品线的产品特定过渡日期（2023年至2035年），并据此规划配方调整。',
              de: 'Für jede betroffene Linie das produktspezifische Übergangsdatum (2023 bis 2035) ermitteln und die Umformulierung danach planen.' },
            { en: 'Put instructions for use minimizing microplastic release in place, mandatory since 17 October 2025.',
              zh: '落实减少微塑料释放的使用说明，自2025年10月17日起为强制要求。',
              de: 'Gebrauchsanweisungen zur Minimierung der Mikroplastikfreisetzung bereitstellen, verpflichtend seit 17. Oktober 2025.' },
            { en: 'Set up the annual reporting on quantities placed on the market (the first reports were due 31 May 2026).',
              zh: '建立年度市场投放数量报告机制（首份报告已于2026年5月31日到期）。',
              de: 'Die jährliche Berichterstattung über die in Verkehr gebrachten Mengen einrichten (erste Berichte waren zum 31. Mai 2026 fällig).' }
        ],
        documents: [
            { en: 'Formulation and material data identifying synthetic polymer particles below 5 mm',
              zh: '识别5毫米以下合成聚合物颗粒的配方和材料数据',
              de: 'Rezeptur- und Materialdaten zur Identifikation synthetischer Polymerpartikel unter 5 mm' },
            { en: 'Reformulation evidence for restricted products',
              zh: '受限产品的配方调整证明',
              de: 'Umformulierungsnachweise für beschränkte Produkte' },
            { en: 'Instructions for use minimizing microplastic release (mandatory since 17 October 2025)',
              zh: '减少微塑料释放的使用说明（自2025年10月17日起强制）',
              de: 'Gebrauchsanweisungen zur Minimierung der Mikroplastikfreisetzung (Pflicht seit 17. Oktober 2025)' },
            { en: 'Data for the annual report on quantities placed on the market',
              zh: '用于年度市场投放数量报告的数据',
              de: 'Daten für den Jahresbericht über die in Verkehr gebrachten Mengen' }
        ],
        sources: [
            { label: 'REACH revision shelved April 2026 (existing restrictions incl. microplastics continue)', url: 'https://cen.acs.org/policy/chemical-regulation/europe-reach-chemical-regulation-shelved/104/web/2026/04' }
        ]
    },

    ecodesign: {
        roles: {
            office: [
                { en: 'ESPR is a framework in force since 18 July 2024: the concrete product rules come via delegated acts. The first are expected 2026 to 2027 (indicative, none adopted as of mid-2026), and obligations apply roughly 18 months after each act.',
                  zh: 'ESPR是自2024年7月18日起生效的框架法规：具体产品规则通过授权法案出台。首批法案预计在2026至2027年（指示性时间，截至2026年年中尚未通过任何法案），义务在每项法案出台约18个月后适用。',
                  de: 'Die ESPR ist ein seit 18. Juli 2024 geltender Rahmen: Die konkreten Produktregeln kommen über delegierte Rechtsakte. Die ersten werden für 2026 bis 2027 erwartet (indikativ, Mitte 2026 noch keiner erlassen), die Pflichten gelten rund 18 Monate nach jedem Rechtsakt.' },
                { en: 'The ESPR Working Plan (April 2025) names the first product categories: Digital Product Passport obligations are expected 2028 to 2030, steel first, then textiles and furniture.',
                  zh: 'ESPR工作计划（2025年4月）确定了首批产品类别：数字产品护照义务预计于2028至2030年生效，钢铁在先，随后是纺织品和家具。',
                  de: 'Der ESPR-Arbeitsplan (April 2025) benennt die ersten Produktkategorien: Pflichten zum Digitalen Produktpass werden 2028 bis 2030 erwartet, zuerst Stahl, dann Textilien und Möbel.' },
                { en: 'Products failing the performance requirements (durability, repairability, recyclability, energy efficiency, resource use) cannot be placed on the EU market; withdrawal and recall orders are possible.',
                  zh: '不满足性能要求（耐用性、可维修性、可回收性、能效、资源利用）的产品不得投放欧盟市场；可被责令下架和召回。',
                  de: 'Produkte, die die Leistungsanforderungen (Haltbarkeit, Reparierbarkeit, Recyclingfähigkeit, Energieeffizienz, Ressourcennutzung) verfehlen, dürfen nicht auf den EU-Markt; Rücknahme- und Rückrufanordnungen sind möglich.' },
                { en: 'The Digital Product Passport requires lifecycle data accessible via QR code, flowing from raw material suppliers through manufacturing to the point of sale in an interoperable format: supplier data readiness decides whether you can comply.',
                  zh: '数字产品护照要求可通过二维码访问的生命周期数据，并以可互操作的格式从原材料供应商经生产环节流转至销售端：供应商的数据准备程度决定您能否合规。',
                  de: 'Der Digitale Produktpass verlangt per QR-Code zugängliche Lebenszyklusdaten, die in interoperablem Format vom Rohstofflieferanten über die Fertigung bis zum Verkaufspunkt fließen: Die Datenbereitschaft der Lieferanten entscheidet über Ihre Konformität.' }
            ],
            supplier: [
                { en: 'Expect performance requirements per product group for durability, repairability, recyclability, energy efficiency and resource use as the delegated acts arrive.',
                  zh: '随着授权法案陆续出台，请预计将按产品组适用耐用性、可维修性、可回收性、能效和资源利用方面的性能要求。',
                  de: 'Rechnen Sie mit Leistungsanforderungen je Produktgruppe zu Haltbarkeit, Reparierbarkeit, Recyclingfähigkeit, Energieeffizienz und Ressourcennutzung, sobald die delegierten Rechtsakte kommen.' },
                { en: 'The Digital Product Passport links a unique product identifier to a digital record: materials, origin, carbon footprint, repairability score and end-of-life instructions. Much of that data can only come from your factory.',
                  zh: '数字产品护照将唯一产品标识与数字记录关联：材料、原产地、碳足迹、可维修性评分和报废处理说明。其中大部分数据只能来自您的工厂。',
                  de: 'Der Digitale Produktpass verknüpft eine eindeutige Produktkennung mit einem digitalen Datensatz: Materialien, Herkunft, CO2-Fußabdruck, Reparierbarkeitswert und End-of-Life-Hinweise. Vieles davon kann nur aus Ihrem Werk kommen.' },
                { en: 'Products must carry a data carrier (QR code or RFID) giving consumers and authorities access to the passport information: plan labelling and production changes.',
                  zh: '产品须带有数据载体（二维码或RFID），供消费者和主管机关访问护照信息：请规划标签和生产调整。',
                  de: 'Produkte müssen einen Datenträger (QR-Code oder RFID) tragen, über den Verbraucher und Behörden auf die Passdaten zugreifen: Kennzeichnungs- und Produktionsänderungen einplanen.' },
                { en: 'No delegated act is adopted yet: use the roughly 18 months between each act and its application to build data collection for your product group.',
                  zh: '目前尚未通过任何授权法案：请利用每项法案出台与适用之间约18个月的时间，为您的产品组建立数据收集机制。',
                  de: 'Noch ist kein delegierter Rechtsakt erlassen: Nutzen Sie die rund 18 Monate zwischen Erlass und Anwendung, um die Datenerhebung für Ihre Produktgruppe aufzubauen.' }
            ]
        },
        actions: [
            { en: 'Map which of your product groups appear in the ESPR Working Plan (April 2025): steel first, then textiles and furniture for the Digital Product Passport.',
              zh: '梳理您的哪些产品组出现在ESPR工作计划（2025年4月）中：数字产品护照方面钢铁在先，随后是纺织品和家具。',
              de: 'Abgleichen, welche Ihrer Produktgruppen im ESPR-Arbeitsplan (April 2025) stehen: für den Digitalen Produktpass zuerst Stahl, dann Textilien und Möbel.' },
            { en: 'Track the delegated acts (first expected 2026 to 2027): obligations apply roughly 18 months after each act.',
              zh: '跟踪授权法案进展（首批预计2026至2027年）：义务在每项法案出台约18个月后适用。',
              de: 'Die delegierten Rechtsakte verfolgen (erste erwartet 2026 bis 2027): Die Pflichten gelten rund 18 Monate nach jedem Rechtsakt.' },
            { en: 'Start collecting lifecycle data along the chain now: materials, origin, carbon footprint, repairability, end-of-life instructions.',
              zh: '立即开始沿供应链收集生命周期数据：材料、原产地、碳足迹、可维修性、报废处理说明。',
              de: 'Jetzt mit der Erhebung von Lebenszyklusdaten entlang der Kette beginnen: Materialien, Herkunft, CO2-Fußabdruck, Reparierbarkeit, End-of-Life-Hinweise.' },
            { en: 'Agree interoperable data formats with your suppliers: passport data must flow from raw material to point of sale.',
              zh: '与供应商约定可互操作的数据格式：护照数据须从原材料环节流转至销售端。',
              de: 'Interoperable Datenformate mit den Lieferanten vereinbaren: Passdaten müssen vom Rohstoff bis zum Verkaufspunkt fließen.' }
        ],
        documents: [
            { en: 'Technical documentation on environmental performance throughout the lifecycle',
              zh: '涵盖整个生命周期环境绩效的技术文件',
              de: 'Technische Unterlagen zur Umweltleistung über den gesamten Lebenszyklus' },
            { en: 'Digital Product Passport data set: materials, origin, carbon footprint, repairability score, end-of-life instructions',
              zh: '数字产品护照数据集：材料、原产地、碳足迹、可维修性评分、报废处理说明',
              de: 'Datensatz für den Digitalen Produktpass: Materialien, Herkunft, CO2-Fußabdruck, Reparierbarkeitswert, End-of-Life-Hinweise' },
            { en: 'Unique product identifier and data carrier (QR code or RFID) per product',
              zh: '每件产品的唯一产品标识和数据载体（二维码或RFID）',
              de: 'Eindeutige Produktkennung und Datenträger (QR-Code oder RFID) je Produkt' },
            { en: 'Evidence against the performance requirements: durability, repairability, recyclability, energy efficiency, resource use',
              zh: '针对性能要求的证明材料：耐用性、可维修性、可回收性、能效、资源利用',
              de: 'Nachweise zu den Leistungsanforderungen: Haltbarkeit, Reparierbarkeit, Recyclingfähigkeit, Energieeffizienz, Ressourcennutzung' }
        ],
        sources: []
    },

    righttorepair: {
        roles: {
            office: [
                { en: 'The directive covers products already subject to EU reparability requirements: washing machines, dishwashers, refrigerators, vacuum cleaners, displays, phones, tablets and more.',
                  zh: '该指令覆盖已受欧盟可维修性要求约束的产品：洗衣机、洗碗机、冰箱、吸尘器、显示器、手机、平板电脑等。',
                  de: 'Die Richtlinie erfasst Produkte mit bestehenden EU-Reparierbarkeitsanforderungen: Waschmaschinen, Geschirrspüler, Kühlschränke, Staubsauger, Displays, Smartphones, Tablets und mehr.' },
                { en: 'The transposition deadline passed on 31 July 2026. Germany adopted its Reparaturgesetz (Bundestag 26 June, Bundesrat approval 10 July 2026); many member states are still pending, but late transposition elsewhere does not delay the obligations once they arrive.',
                  zh: '转化期限已于2026年7月31日届满。德国已通过《维修法》（联邦议院6月26日通过，联邦参议院2026年7月10日批准）；许多成员国仍未完成，但其他国家的转化延迟并不推迟义务本身。',
                  de: 'Die Umsetzungsfrist lief am 31. Juli 2026 ab. Deutschland hat sein Reparaturgesetz verabschiedet (Bundestag 26. Juni, Bundesratszustimmung 10. Juli 2026); viele Mitgliedstaaten stehen noch aus, verspätete Umsetzung anderswo verschiebt die Pflichten aber nicht.' },
                { en: 'Manufacturers must repair within a reasonable time at a reasonable price and supply spare parts and tools. Consumers gain a right to repair beyond warranty, with potential collective redress.',
                  zh: '制造商须在合理期限内以合理价格提供维修，并供应备件和工具。消费者获得超出保修期的维修权，并可能提起集体救济。',
                  de: 'Hersteller müssen innerhalb angemessener Frist zu angemessenem Preis reparieren sowie Ersatzteile und Werkzeuge liefern. Verbraucher erhalten ein Reparaturrecht über die Gewährleistung hinaus, mit möglichem kollektivem Rechtsschutz.' },
                { en: 'Under the German implementing law repair price lists must be published online; national penalties apply for non-compliance.',
                  zh: '根据德国实施法，维修价目表须在线公布；不合规将受到成员国处罚。',
                  de: 'Nach dem deutschen Umsetzungsgesetz sind Reparaturpreislisten online zu veröffentlichen; bei Verstößen greifen nationale Sanktionen.' }
            ],
            supplier: [
                { en: 'If you manufacture covered product groups (household appliances, phones, tablets, displays), spare parts and tools must be supplied: your buyers will pass these obligations down the chain.',
                  zh: '如果您生产覆盖产品组（家用电器、手机、平板电脑、显示器），则必须供应备件和工具：买家会将这些义务沿供应链传导给您。',
                  de: 'Fertigen Sie erfasste Produktgruppen (Hausgeräte, Smartphones, Tablets, Displays), müssen Ersatzteile und Werkzeuge geliefert werden: Ihre Abnehmer reichen diese Pflichten die Kette hinunter.' },
                { en: 'Anti-repair practices are prohibited, whether contractual, hardware or software barriers: review product design and firmware for repair blockers.',
                  zh: '禁止阻碍维修的做法，无论是合同、硬件还是软件障碍：请检查产品设计和固件中的维修阻碍。',
                  de: 'Reparaturbehindernde Praktiken sind verboten, ob vertragliche, Hardware- oder Software-Barrieren: Produktdesign und Firmware auf Reparaturblocker prüfen.' },
                { en: 'Repair information and the European Repair Information Form must be accessible to consumers and independent repairers: prepare the documentation together with your buyer.',
                  zh: '维修信息和欧洲维修信息表须向消费者及独立维修商开放：请与买家共同准备相关文件。',
                  de: 'Reparaturinformationen und das Europäische Reparaturinformationsformular müssen Verbrauchern und unabhängigen Reparaturbetrieben zugänglich sein: Die Unterlagen mit dem Abnehmer vorbereiten.' },
                { en: 'Germany\'s law is now in force: review spare part supply commitments with your EU buyers.',
                  zh: '德国的法律现已生效：请与欧盟买家确认备件供应承诺。',
                  de: 'Das deutsche Gesetz ist jetzt in Kraft: Ersatzteil-Lieferzusagen mit den EU-Abnehmern überprüfen.' }
            ]
        },
        actions: [
            { en: 'Check which of your products fall into the covered groups (washing machines, dishwashers, refrigerators, vacuum cleaners, displays, phones, tablets).',
              zh: '核查哪些产品属于覆盖产品组（洗衣机、洗碗机、冰箱、吸尘器、显示器、手机、平板电脑）。',
              de: 'Prüfen, welche Ihrer Produkte in die erfassten Gruppen fallen (Waschmaschinen, Geschirrspüler, Kühlschränke, Staubsauger, Displays, Smartphones, Tablets).' },
            { en: 'Review spare part and tool supply commitments with your EU buyers, Germany\'s implementing law is in force.',
              zh: '与欧盟买家核对备件和工具供应承诺，德国实施法已生效。',
              de: 'Ersatzteil- und Werkzeug-Lieferzusagen mit den EU-Abnehmern durchgehen, das deutsche Umsetzungsgesetz ist in Kraft.' },
            { en: 'Remove anti-repair barriers, whether contractual, in hardware or in software.',
              zh: '消除阻碍维修的障碍，无论是合同、硬件还是软件层面。',
              de: 'Reparaturbehindernde Barrieren beseitigen, ob vertraglich, in Hardware oder Software.' },
            { en: 'Prepare the European Repair Information Form and repair documentation for consumers and independent repairers, plus online repair price lists where German law requires them.',
              zh: '为消费者和独立维修商准备欧洲维修信息表及维修文件，并按德国法律要求在线公布维修价目表。',
              de: 'Das Europäische Reparaturinformationsformular und Reparaturunterlagen für Verbraucher und unabhängige Betriebe vorbereiten, dazu Online-Reparaturpreislisten, wo das deutsche Recht sie verlangt.' }
        ],
        documents: [
            { en: 'European Repair Information Form per covered product',
              zh: '每件覆盖产品的欧洲维修信息表',
              de: 'Europäisches Reparaturinformationsformular je erfasstem Produkt' },
            { en: 'Repair information accessible to consumers and independent repairers',
              zh: '向消费者和独立维修商开放的维修信息',
              de: 'Für Verbraucher und unabhängige Reparaturbetriebe zugängliche Reparaturinformationen' },
            { en: 'Spare parts and tools availability documentation',
              zh: '备件和工具供应情况文件',
              de: 'Dokumentation der Verfügbarkeit von Ersatzteilen und Werkzeugen' },
            { en: 'Online repair price lists (German implementing law)',
              zh: '在线维修价目表（德国实施法要求）',
              de: 'Online veröffentlichte Reparaturpreislisten (deutsches Umsetzungsgesetz)' }
        ],
        sources: [
            { label: 'European Commission: Right to Repair Directive', url: 'https://commission.europa.eu/law/law-topic/consumer-protection-law/directive-repair-goods_en' },
            { label: 'Germany\'s Reparaturgesetz (Freshfields briefing)', url: 'https://www.freshfields.com/en/our-thinking/blogs/risk-and-compliance/repair-instead-of-replace-germany-moves-to-implement-the-eu-right-to-repair-dire-102mgn4' }
        ]
    },

    greenclaims: {
        roles: {
            office: [
                { en: 'This is a proposal, not adopted law: proposed March 2023, negotiations suspended. The Commission announced an intended withdrawal (June 2025) but has not formally withdrawn it; the file is still listed in the 2026 work programme, and adoption is not currently expected.',
                  zh: '这是一项提案，尚非已通过的法律：2023年3月提出，谈判已中止。欧盟委员会宣布拟撤回（2025年6月）但尚未正式撤回；该提案仍列于2026年工作计划中，目前预计不会通过。',
                  de: 'Dies ist ein Vorschlag, kein verabschiedetes Recht: vorgelegt im März 2023, die Verhandlungen sind ausgesetzt. Die Kommission kündigte eine beabsichtigte Rücknahme an (Juni 2025), hat sie aber nicht formell vollzogen; das Dossier steht weiter im Arbeitsprogramm 2026, eine Annahme wird derzeit nicht erwartet.' },
                { en: 'Do not wait for it: environmental claims are already regulated by the Empowering Consumers Directive (EU) 2024/825, applying from 27 September 2026, which bans generic claims like \'eco-friendly\', \'green\' or \'climate neutral\' without recognised excellent environmental performance.',
                  zh: '请勿观望等待：环保声明已受《赋能消费者绿色转型指令》(EU) 2024/825监管，自2026年9月27日起适用，该指令禁止在无公认卓越环境绩效的情况下使用"环保""绿色""气候中和"等笼统声明。',
                  de: 'Nicht darauf warten: Umweltaussagen sind bereits durch die Empowering-Consumers-Richtlinie (EU) 2024/825 geregelt, anwendbar ab 27. September 2026. Sie verbietet pauschale Aussagen wie \'umweltfreundlich\', \'grün\' oder \'klimaneutral\' ohne anerkannte hervorragende Umweltleistung.' },
                { en: 'The proposal as tabled would require scientific substantiation and verification by accredited third-party bodies, a pre-approval system for environmental labels and a lifecycle assessment methodology, with fines up to 4% of annual turnover.',
                  zh: '按所提交的文本，该提案将要求以科学证据证实声明并由经认可的第三方机构核验，设立环保标签预审批制度并采用生命周期评估方法，罚款最高可达年营业额的4%。',
                  de: 'Der vorgelegte Vorschlag würde wissenschaftliche Substanziierung und Prüfung durch akkreditierte Drittstellen verlangen, ein Vorabgenehmigungssystem für Umweltlabel und eine Lebenszyklus-Bewertungsmethodik, mit Geldbußen bis 4% des Jahresumsatzes.' },
                { en: 'Claims based solely on carbon offsetting would be banned under the proposal, and are already prohibited under the Empowering Consumers Directive.',
                  zh: '仅基于碳抵消的声明在该提案下将被禁止，且在《赋能消费者绿色转型指令》下已被禁止。',
                  de: 'Aussagen, die allein auf CO2-Kompensation beruhen, wären nach dem Vorschlag verboten und sind unter der Empowering-Consumers-Richtlinie bereits untersagt.' }
            ],
            supplier: [
                { en: 'The rules target brands, retailers and EU importers making the claims, not you directly, but the substantiation evidence behind a claim is requested from the supply chain.',
                  zh: '这些规则针对做出声明的品牌、零售商和欧盟进口商，并非直接约束您，但支持声明的证实材料会向供应链索取。',
                  de: 'Die Regeln zielen auf Marken, Händler und EU-Importeure, die die Aussagen treffen, nicht direkt auf Sie, aber die Belege hinter einer Aussage werden aus der Lieferkette angefordert.' },
                { en: 'From 27 September 2026 generic wording like \'green\' or \'climate neutral\' on products or packaging must comply with (EU) 2024/825: expect buyers to strip such wording from artwork you print or apply.',
                  zh: '自2026年9月27日起，产品或包装上"绿色""气候中和"等笼统措辞须符合(EU) 2024/825：请预计买家将要求从您印制或使用的设计稿中删除此类措辞。',
                  de: 'Ab 27. September 2026 müssen pauschale Formulierungen wie \'grün\' oder \'klimaneutral\' auf Produkten oder Verpackungen (EU) 2024/825 entsprechen: Rechnen Sie damit, dass Abnehmer solche Formulierungen aus Druckvorlagen streichen lassen.' },
                { en: 'Sustainability labels are only permitted if based on an approved certification scheme or established by public authorities (Empowering Consumers Directive): check every label on your packaging artwork.',
                  zh: '可持续性标签仅在基于经批准的认证体系或由公共机构设立时才被允许（《赋能消费者绿色转型指令》）：请核查包装设计稿上的每个标签。',
                  de: 'Nachhaltigkeitssiegel sind nur zulässig, wenn sie auf einem zugelassenen Zertifizierungssystem beruhen oder von Behörden eingeführt wurden (Empowering-Consumers-Richtlinie): Jedes Siegel auf Ihren Verpackungsvorlagen prüfen.' },
                { en: 'If the proposal is revived, claims would need lifecycle assessment methodology and accredited third-party verification, and repeat offenders would face temporary market bans.',
                  zh: '如果提案重启，声明将需要采用生命周期评估方法并经认可的第三方核验，屡犯者将面临临时市场禁令。',
                  de: 'Wird der Vorschlag wiederbelebt, bräuchten Aussagen eine Lebenszyklus-Bewertungsmethodik und akkreditierte Drittprüfung, Wiederholungstätern drohten befristete Marktverbote.' }
            ]
        },
        actions: [
            { en: 'Track the file\'s status: stalled, intended withdrawal announced June 2025, not formally withdrawn, still listed in the 2026 work programme.',
              zh: '跟踪该提案的状态：目前停滞，2025年6月宣布拟撤回，尚未正式撤回，仍列于2026年工作计划中。',
              de: 'Den Status des Dossiers verfolgen: ins Stocken geraten, beabsichtigte Rücknahme im Juni 2025 angekündigt, nicht formell zurückgezogen, weiterhin im Arbeitsprogramm 2026 gelistet.' },
            { en: 'Audit existing claims on products, packaging and marketing against the Empowering Consumers Directive rules applying from 27 September 2026.',
              zh: '对照自2026年9月27日起适用的《赋能消费者绿色转型指令》规则，审核产品、包装和营销中的现有声明。',
              de: 'Bestehende Aussagen auf Produkten, Verpackungen und im Marketing gegen die ab 27. September 2026 geltenden Regeln der Empowering-Consumers-Richtlinie prüfen.' },
            { en: 'Remove or substantiate generic environmental claims (\'eco-friendly\', \'green\', \'climate neutral\') and drop claims based solely on carbon offsetting.',
              zh: '删除或证实笼统的环保声明（"环保""绿色""气候中和"），并放弃仅基于碳抵消的声明。',
              de: 'Pauschale Umweltaussagen (\'umweltfreundlich\', \'grün\', \'klimaneutral\') streichen oder belegen und rein kompensationsbasierte Aussagen aufgeben.' },
            { en: 'Verify that every sustainability label used is based on an approved certification scheme or established by public authorities.',
              zh: '核实所使用的每个可持续性标签均基于经批准的认证体系或由公共机构设立。',
              de: 'Sicherstellen, dass jedes verwendete Nachhaltigkeitssiegel auf einem zugelassenen Zertifizierungssystem beruht oder von Behörden eingeführt wurde.' }
        ],
        documents: [
            { en: 'Inventory of environmental claims on products, packaging and marketing material',
              zh: '产品、包装和营销材料中环保声明的清单',
              de: 'Bestandsaufnahme der Umweltaussagen auf Produkten, Verpackungen und in Marketingmaterial' },
            { en: 'Substantiation evidence per claim (scientific basis)',
              zh: '每项声明的证实材料（科学依据）',
              de: 'Substanziierungsnachweise je Aussage (wissenschaftliche Grundlage)' },
            { en: 'Certification scheme documentation for each sustainability label used',
              zh: '所用每个可持续性标签的认证体系文件',
              de: 'Unterlagen zum Zertifizierungssystem für jedes verwendete Nachhaltigkeitssiegel' },
            { en: 'Durability and repairability information required under the Empowering Consumers Directive',
              zh: '《赋能消费者绿色转型指令》要求的耐用性和可维修性信息',
              de: 'Nach der Empowering-Consumers-Richtlinie erforderliche Angaben zu Haltbarkeit und Reparierbarkeit' }
        ],
        sources: [
            { label: 'Empowering Consumers Directive (EU) 2024/825 (rules already applying from 27 September 2026)', url: 'https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:32024L0825' }
        ]
    },

    wfdtextiles: {
        roles: {
            office: [
                { en: 'Mandatory extended producer responsibility (EPR) for textiles and footwear in every member state: schemes must be in place by 17 April 2028 (the directive is in force since 16 October 2025).',
                  zh: '纺织品和鞋类在每个成员国均须实行强制性生产者责任延伸（EPR）：各国制度须于2028年4月17日前建立（该指令自2025年10月16日起生效）。',
                  de: 'Verpflichtende erweiterte Herstellerverantwortung (EPR) für Textilien und Schuhe in jedem Mitgliedstaat: Die Systeme müssen bis zum 17. April 2028 stehen (die Richtlinie ist seit 16. Oktober 2025 in Kraft).' },
                { en: 'Producers, including importers and e-commerce sellers, pay fees funding collection, sorting and recycling.',
                  zh: '生产者（包括进口商和电商卖家）须缴纳费用，用于资助收集、分拣和回收。',
                  de: 'Produzenten, einschließlich Importeuren und E-Commerce-Verkäufern, zahlen Gebühren zur Finanzierung von Sammlung, Sortierung und Recycling.' },
                { en: 'Registration is required in each member state where products are sold; non-registered producers may not place textiles on that member state\'s market.',
                  zh: '须在产品销售所在的每个成员国注册；未注册的生产者不得将纺织品投放该成员国市场。',
                  de: 'Die Registrierung ist in jedem Mitgliedstaat erforderlich, in dem verkauft wird; nicht registrierte Produzenten dürfen dort keine Textilien in Verkehr bringen.' },
                { en: 'Fees are eco-modulated by durability, recyclability and recycled content: design decisions directly change the fee per product.',
                  zh: '费用按耐用性、可回收性和再生含量进行生态调节：设计决策直接改变每件产品的费用。',
                  de: 'Die Gebühren werden nach Haltbarkeit, Recyclingfähigkeit und Rezyklatanteil öko-moduliert: Designentscheidungen verändern die Gebühr je Produkt unmittelbar.' }
            ],
            supplier: [
                { en: 'If you sell into the EU via e-commerce yourself, you count as a producer: registration and fees per member state apply to you directly.',
                  zh: '如果您自己通过电商向欧盟销售，即被视为生产者：按成员国注册和缴费的义务直接适用于您。',
                  de: 'Verkaufen Sie selbst per E-Commerce in die EU, gelten Sie als Produzent: Registrierung und Gebühren je Mitgliedstaat treffen Sie direkt.' },
                { en: 'Your buyers\' EPR fees are eco-modulated: durability, recyclability and recycled content lower the fee and become sourcing criteria.',
                  zh: '买家的EPR费用按生态标准调节：耐用性、可回收性和再生含量可降低费用，并将成为采购标准。',
                  de: 'Die EPR-Gebühren Ihrer Abnehmer sind öko-moduliert: Haltbarkeit, Recyclingfähigkeit und Rezyklatanteil senken die Gebühr und werden zu Einkaufskriterien.' },
                { en: 'Expect data requests per product feeding the eco-modulation: durability, recyclability and recycled content.',
                  zh: '请预计将收到按产品提供生态调节所需数据的请求：耐用性、可回收性和再生含量。',
                  de: 'Rechnen Sie mit Datenanfragen je Produkt für die Öko-Modulation: Haltbarkeit, Recyclingfähigkeit und Rezyklatanteil.' },
                { en: 'Footwear is covered too, not only apparel: include shoe lines in your preparation.',
                  zh: '鞋类同样在覆盖范围内，不仅是服装：请将鞋类产品线纳入准备工作。',
                  de: 'Auch Schuhe sind erfasst, nicht nur Bekleidung: Schuhlinien in die Vorbereitung einbeziehen.' }
            ]
        },
        actions: [
            { en: 'Determine who the producer is per sales channel: importers and e-commerce sellers count as producers.',
              zh: '按销售渠道确定谁是生产者：进口商和电商卖家均被视为生产者。',
              de: 'Je Vertriebskanal klären, wer Produzent ist: Importeure und E-Commerce-Verkäufer gelten als Produzenten.' },
            { en: 'Plan producer registrations in each member state where textiles or footwear are sold, schemes are due by 17 April 2028.',
              zh: '规划在销售纺织品或鞋类的每个成员国进行生产者注册，各国制度须于2028年4月17日前建立。',
              de: 'Produzentenregistrierungen in jedem Mitgliedstaat planen, in dem Textilien oder Schuhe verkauft werden, die Systeme müssen bis 17. April 2028 stehen.' },
            { en: 'Collect the eco-modulation data per product: durability, recyclability, recycled content.',
              zh: '按产品收集生态调节数据：耐用性、可回收性、再生含量。',
              de: 'Die Öko-Modulationsdaten je Produkt erheben: Haltbarkeit, Recyclingfähigkeit, Rezyklatanteil.' },
            { en: 'Feed durability and recyclability into design decisions, they directly lower the fee.',
              zh: '将耐用性和可回收性纳入设计决策，它们可直接降低费用。',
              de: 'Haltbarkeit und Recyclingfähigkeit in Designentscheidungen einfließen lassen, sie senken die Gebühr direkt.' }
        ],
        documents: [
            { en: 'Producer registrations per member state of sale',
              zh: '销售所在各成员国的生产者注册文件',
              de: 'Produzentenregistrierungen je Verkaufsmitgliedstaat' },
            { en: 'Product data for the eco-modulated fees: durability, recyclability, recycled content',
              zh: '用于生态调节费用的产品数据：耐用性、可回收性、再生含量',
              de: 'Produktdaten für die öko-modulierten Gebühren: Haltbarkeit, Recyclingfähigkeit, Rezyklatanteil' },
            { en: 'Records of textiles and footwear placed on each member state\'s market',
              zh: '投放各成员国市场的纺织品和鞋类记录',
              de: 'Aufzeichnungen der je Mitgliedstaat in Verkehr gebrachten Textilien und Schuhe' },
            { en: 'Evidence of recycled content used per product',
              zh: '每件产品所用再生含量的证明',
              de: 'Nachweise über den je Produkt eingesetzten Rezyklatanteil' }
        ],
        sources: []
    },

    rohs: {
        roles: {
            office: [
                { en: 'All electrical and electronic equipment placed on the EU market must meet maximum concentration limits for ten substances: lead, mercury, cadmium, hexavalent chromium, PBB, PBDE and the phthalates DEHP, BBP, DBP and DIBP.',
                  zh: '所有投放欧盟市场的电气电子设备须符合十种物质的最高浓度限值：铅、汞、镉、六价铬、多溴联苯（PBB）、多溴二苯醚（PBDE）以及邻苯二甲酸酯DEHP、BBP、DBP和DIBP。',
                  de: 'Alle auf dem EU-Markt in Verkehr gebrachten Elektro- und Elektronikgeräte müssen Höchstkonzentrationswerte für zehn Stoffe einhalten: Blei, Quecksilber, Cadmium, sechswertiges Chrom, PBB, PBDE sowie die Phthalate DEHP, BBP, DBP und DIBP.' },
                { en: 'The Annex III lead and cadmium exemptions were restructured in late 2025, applicable from 1 July 2026: re-check every exemption your products rely on.',
                  zh: '附件III的铅和镉豁免条款已于2025年底重组，自2026年7月1日起适用：请重新核查您产品所依赖的每项豁免。',
                  de: 'Die Blei- und Cadmium-Ausnahmen in Anhang III wurden Ende 2025 neu strukturiert, anwendbar ab 1. Juli 2026: Jede von Ihren Produkten genutzte Ausnahme erneut prüfen.' },
                { en: 'Before placing on the market, verify the EU Declaration of Conformity, the technical file with material composition evidence and the CE marking.',
                  zh: '投放市场前，须核验欧盟符合性声明、含材料成分证明的技术文件以及CE标志。',
                  de: 'Vor dem Inverkehrbringen die EU-Konformitätserklärung, die technische Dokumentation mit Materialzusammensetzungsnachweisen und die CE-Kennzeichnung prüfen.' },
                { en: 'Non-compliant products are barred from the EU market; product recalls, fines and potential criminal liability in member states.',
                  zh: '不合规产品禁止进入欧盟市场；并可能面临产品召回、罚款以及成员国的刑事责任。',
                  de: 'Nicht konforme Produkte sind vom EU-Markt ausgeschlossen; es drohen Produktrückrufe, Geldbußen und mögliche strafrechtliche Haftung in den Mitgliedstaaten.' }
            ],
            supplier: [
                { en: 'Compliance applies at the point of market placement and is ongoing: keep all ten restricted substances within the maximum concentration limits, production batch by production batch.',
                  zh: '合规义务在投放市场时适用并持续有效：请逐批确保十种受限物质均在最高浓度限值之内。',
                  de: 'Die Konformität gilt zum Zeitpunkt des Inverkehrbringens und fortlaufend: Alle zehn beschränkten Stoffe Charge für Charge innerhalb der Höchstkonzentrationswerte halten.' },
                { en: 'Provide material composition evidence for the technical file: your buyer\'s EU Declaration of Conformity depends on it.',
                  zh: '为技术文件提供材料成分证明：买家的欧盟符合性声明依赖于此。',
                  de: 'Materialzusammensetzungsnachweise für die technische Dokumentation liefern: Die EU-Konformitätserklärung Ihres Abnehmers hängt davon ab.' },
                { en: 'If your components rely on an Annex III lead or cadmium exemption, confirm it survived the late 2025 restructuring (applicable from 1 July 2026).',
                  zh: '如果您的元器件依赖附件III的铅或镉豁免，请确认该豁免在2025年底的重组后仍然有效（自2026年7月1日起适用）。',
                  de: 'Stützen sich Ihre Bauteile auf eine Blei- oder Cadmium-Ausnahme in Anhang III, bestätigen, dass sie die Neustrukturierung von Ende 2025 überstanden hat (anwendbar ab 1. Juli 2026).' },
                { en: 'Keep the substance data behind the CE marking current per model: the ten restricted substances include the four phthalates DEHP, BBP, DBP and DIBP.',
                  zh: '按型号保持支撑CE标志的物质数据处于最新状态：十种受限物质包括DEHP、BBP、DBP和DIBP四种邻苯二甲酸酯。',
                  de: 'Die Stoffdaten hinter der CE-Kennzeichnung je Modell aktuell halten: Zu den zehn beschränkten Stoffen zählen die vier Phthalate DEHP, BBP, DBP und DIBP.' }
            ]
        },
        actions: [
            { en: 'Verify the ten restricted substances against the maximum concentration limits for every product.',
              zh: '对每件产品核验十种受限物质是否符合最高浓度限值。',
              de: 'Für jedes Produkt die zehn beschränkten Stoffe gegen die Höchstkonzentrationswerte prüfen.' },
            { en: 'Re-check all Annex III lead and cadmium exemptions after the late 2025 restructuring, applicable from 1 July 2026.',
              zh: '在2025年底重组后重新核查所有附件III铅和镉豁免，自2026年7月1日起适用。',
              de: 'Alle Blei- und Cadmium-Ausnahmen in Anhang III nach der Neustrukturierung von Ende 2025 erneut prüfen, anwendbar ab 1. Juli 2026.' },
            { en: 'Maintain the technical file with material composition evidence per model.',
              zh: '按型号维护含材料成分证明的技术文件。',
              de: 'Die technische Dokumentation mit Materialzusammensetzungsnachweisen je Modell pflegen.' },
            { en: 'Confirm the EU Declaration of Conformity and CE marking for every product placed on the EU market.',
              zh: '确认每件投放欧盟市场的产品均具备欧盟符合性声明和CE标志。',
              de: 'EU-Konformitätserklärung und CE-Kennzeichnung für jedes auf dem EU-Markt in Verkehr gebrachte Produkt bestätigen.' }
        ],
        documents: [
            { en: 'EU Declaration of Conformity',
              zh: '欧盟符合性声明',
              de: 'EU-Konformitätserklärung' },
            { en: 'Technical file with material composition evidence',
              zh: '含材料成分证明的技术文件',
              de: 'Technische Dokumentation mit Materialzusammensetzungsnachweisen' },
            { en: 'List of Annex III exemptions relied on, re-checked against the late 2025 restructuring',
              zh: '所依赖的附件III豁免清单，并已对照2025年底的重组重新核查',
              de: 'Liste der genutzten Anhang-III-Ausnahmen, erneut geprüft gegen die Neustrukturierung von Ende 2025' },
            { en: 'Substance concentration data covering the ten restricted substances',
              zh: '涵盖十种受限物质的物质浓度数据',
              de: 'Stoffkonzentrationsdaten zu den zehn beschränkten Stoffen' }
        ],
        sources: []
    },

    toysafety: {
        roles: {
            office: [
                { en: 'The new Toy Safety Regulation entered into force on 1 January 2026 and applies from 1 August 2030; Directive 2009/48/EC remains applicable until then, so both regimes run in parallel.',
                  zh: '新《玩具安全法规》于2026年1月1日生效，自2030年8月1日起适用；在此之前指令2009/48/EC继续适用，新旧两套制度并行。',
                  de: 'Die neue Spielzeugsicherheitsverordnung trat am 1. Januar 2026 in Kraft und gilt ab 1. August 2030; bis dahin bleibt die Richtlinie 2009/48/EG anwendbar, beide Regime laufen also parallel.' },
                { en: 'Expanded chemical restrictions, including bans on PFAS and certain endocrine disruptors in toys, plus updated mechanical and digital-safety requirements.',
                  zh: '扩大化学品限制，包括禁止玩具中的PFAS及某些内分泌干扰物，并更新机械安全和数字安全要求。',
                  de: 'Erweiterte Chemikalienbeschränkungen, einschließlich Verboten von PFAS und bestimmten endokrinen Disruptoren in Spielzeug, dazu aktualisierte Anforderungen an mechanische und digitale Sicherheit.' },
                { en: 'A toy Digital Product Passport replaces the paper EU declaration of conformity.',
                  zh: '玩具数字产品护照将取代纸质欧盟符合性声明。',
                  de: 'Ein digitaler Produktpass für Spielzeug ersetzt die papierbasierte EU-Konformitätserklärung.' },
                { en: 'Online marketplaces selling toys into the EU carry their own obligations; non-compliant toys are barred from the EU market (member-state enforcement).',
                  zh: '向欧盟销售玩具的线上平台承担相应义务；不合规玩具禁止进入欧盟市场（由成员国执法）。',
                  de: 'Online-Marktplätze, die Spielzeug in die EU verkaufen, tragen eigene Pflichten; nicht konformes Spielzeug ist vom EU-Markt ausgeschlossen (Durchsetzung durch die Mitgliedstaaten).' }
            ],
            supplier: [
                { en: 'Material choices need updating well before August 2030: PFAS and certain endocrine disruptors will be banned in toys.',
                  zh: '材料选择须在2030年8月之前及早更新：玩具中的PFAS及某些内分泌干扰物将被禁止。',
                  de: 'Materialentscheidungen müssen deutlich vor August 2030 angepasst werden: PFAS und bestimmte endokrine Disruptoren werden in Spielzeug verboten.' },
                { en: 'Testing pipelines must be updated for the expanded chemical restrictions and the updated mechanical and digital-safety requirements.',
                  zh: '测试流程须针对扩大的化学品限制及更新的机械安全和数字安全要求进行升级。',
                  de: 'Prüfpipelines müssen an die erweiterten Chemikalienbeschränkungen und die aktualisierten Anforderungen an mechanische und digitale Sicherheit angepasst werden.' },
                { en: 'Prepare for the toy Digital Product Passport: it replaces the paper EU declaration of conformity your shipments carry today.',
                  zh: '为玩具数字产品护照做好准备：它将取代您目前随货提供的纸质欧盟符合性声明。',
                  de: 'Auf den digitalen Produktpass für Spielzeug vorbereiten: Er ersetzt die papierbasierte EU-Konformitätserklärung, die Ihre Lieferungen heute begleitet.' },
                { en: 'Until 1 August 2030 Directive 2009/48/EC still applies: plan the transition while running both regimes in parallel.',
                  zh: '在2030年8月1日之前，指令2009/48/EC仍然适用：请在新旧制度并行期间规划过渡。',
                  de: 'Bis zum 1. August 2030 gilt weiterhin die Richtlinie 2009/48/EG: Den Übergang planen, während beide Regime parallel laufen.' }
            ]
        },
        actions: [
            { en: 'Screen toy materials for PFAS and endocrine disruptors and plan substitutions well before August 2030.',
              zh: '排查玩具材料中的PFAS和内分泌干扰物，并在2030年8月之前及早规划替代方案。',
              de: 'Spielzeugmaterialien auf PFAS und endokrine Disruptoren prüfen und Substitutionen deutlich vor August 2030 planen.' },
            { en: 'Update testing pipelines for the expanded chemical, mechanical and digital-safety requirements.',
              zh: '针对扩大的化学品限制及机械安全和数字安全要求升级测试流程。',
              de: 'Prüfpipelines für die erweiterten Chemikalien-, Mechanik- und Digitalsicherheitsanforderungen aktualisieren.' },
            { en: 'Prepare the data flows for the toy Digital Product Passport replacing the paper declaration of conformity.',
              zh: '为取代纸质符合性声明的玩具数字产品护照准备数据流程。',
              de: 'Die Datenflüsse für den digitalen Produktpass vorbereiten, der die papierbasierte Konformitätserklärung ersetzt.' },
            { en: 'Keep complying with Directive 2009/48/EC until 1 August 2030 while building the new regime.',
              zh: '在2030年8月1日前继续遵守指令2009/48/EC，同时构建新制度下的合规体系。',
              de: 'Bis zum 1. August 2030 weiter die Richtlinie 2009/48/EG einhalten und parallel das neue Regime aufbauen.' }
        ],
        documents: [
            { en: 'Chemical compliance evidence covering the expanded restrictions (PFAS, endocrine disruptors)',
              zh: '涵盖扩大限制（PFAS、内分泌干扰物）的化学品合规证明',
              de: 'Chemische Konformitätsnachweise zu den erweiterten Beschränkungen (PFAS, endokrine Disruptoren)' },
            { en: 'Toy Digital Product Passport data set (replaces the paper EU declaration of conformity)',
              zh: '玩具数字产品护照数据集（取代纸质欧盟符合性声明）',
              de: 'Datensatz für den digitalen Produktpass für Spielzeug (ersetzt die papierbasierte EU-Konformitätserklärung)' },
            { en: 'Test reports for the mechanical and digital-safety requirements',
              zh: '机械安全和数字安全要求的测试报告',
              de: 'Prüfberichte zu den Anforderungen an mechanische und digitale Sicherheit' },
            { en: 'Current EU declaration of conformity under Directive 2009/48/EC (applicable until 1 August 2030)',
              zh: '现行指令2009/48/EC下的欧盟符合性声明（适用至2030年8月1日）',
              de: 'Aktuelle EU-Konformitätserklärung nach Richtlinie 2009/48/EG (anwendbar bis 1. August 2030)' }
        ],
        sources: []
    },

    uflpa: {
        roles: {
            office: [
                { en: 'US law, in force since 21 June 2022: goods with any Xinjiang or Entity-List nexus, at any tier, any input, are presumed made with forced labour and barred from US import (rebuttable presumption applied at the border).',
                  zh: '美国法律，自2022年6月21日起生效：与新疆或实体清单有任何关联的货物（无论处于哪一层级、哪种原料）均被推定涉及强迫劳动并禁止进入美国（在边境适用可推翻的推定）。',
                  de: 'US-Recht, in Kraft seit 21. Juni 2022: Waren mit jeglichem Bezug zu Xinjiang oder zur Entity List, auf jeder Stufe, bei jedem Vorprodukt, gelten als mit Zwangsarbeit hergestellt und sind von der Einfuhr in die USA ausgeschlossen (widerlegbare Vermutung an der Grenze).' },
                { en: 'The presumption can only be rebutted with clear and convincing evidence. In practice CBP stopped around 7,300 shipments in FY2025 (up 51% year on year), and only about 6.5% of reviewed shipments were released.',
                  zh: '该推定仅凭明确且令人信服的证据方可推翻。实践中，CBP在2025财年拦截约7,300批货物（同比增长51%），经审查的货物仅约6.5%获放行。',
                  de: 'Die Vermutung kann nur mit klaren und überzeugenden Beweisen widerlegt werden. In der Praxis stoppte die CBP im Haushaltsjahr 2025 rund 7.300 Sendungen (plus 51% gegenüber dem Vorjahr), nur rund 6,5% der geprüften Sendungen wurden freigegeben.' },
                { en: 'The Entity List stands at 187 entities; the largest addition (43 entities, effective 3 August 2026) spans aluminium, apparel, copper, cotton and tomatoes: re-screen your supplier base after every update.',
                  zh: '实体清单现有187家实体；最大一次新增（43家，2026年8月3日生效）涵盖铝、服装、铜、棉花和番茄：每次更新后请重新筛查您的供应商网络。',
                  de: 'Die Entity List umfasst 187 Einträge; die größte Erweiterung (43 Einträge, wirksam ab 3. August 2026) betrifft Aluminium, Bekleidung, Kupfer, Baumwolle und Tomaten: Die Lieferantenbasis nach jeder Aktualisierung neu screenen.' },
                { en: 'Priority sectors: apparel, cotton, polysilicon/solar, tomatoes, aluminium, PVC and seafood, plus, since August 2025, lithium, copper, caustic soda, steel and red dates. At the border: detention, exclusion or seizure, with potential civil penalties under 19 U.S.C. § 1592.',
                  zh: '重点行业：服装、棉花、多晶硅/光伏、番茄、铝、PVC和海产品，自2025年8月起新增锂、铜、烧碱、钢铁和红枣。在边境：货物可被扣留、排除或没收，并可能依据《美国法典》第19编第1592条承担民事处罚。',
                  de: 'Prioritätssektoren: Bekleidung, Baumwolle, Polysilizium/Solar, Tomaten, Aluminium, PVC und Meeresfrüchte, seit August 2025 zusätzlich Lithium, Kupfer, Natronlauge, Stahl und rote Datteln. An der Grenze: Zurückhaltung, Ausschluss oder Beschlagnahme, dazu mögliche zivilrechtliche Sanktionen nach 19 U.S.C. § 1592.' }
            ],
            supplier: [
                { en: 'Full raw-material tracing is required: for US-bound goods you must be able to show the origin of every input, down to the raw material.',
                  zh: '须实现原材料全程追溯：对输美货物，您必须能够证明每种原料直至原材料环节的来源。',
                  de: 'Vollständige Rohstoffrückverfolgung ist erforderlich: Für US-Ware müssen Sie die Herkunft jedes Vorprodukts bis zum Rohstoff belegen können.' },
                { en: 'Any link to Xinjiang or a listed entity at any tier of your own supply chain blocks the shipment: screen your upstream suppliers against the Entity List (187 entities).',
                  zh: '您自身供应链任何层级与新疆或清单实体的任何关联都会导致货物被拦截：请对照实体清单（187家实体）筛查上游供应商。',
                  de: 'Jede Verbindung zu Xinjiang oder einem gelisteten Unternehmen auf irgendeiner Stufe Ihrer eigenen Lieferkette blockiert die Sendung: Vorlieferanten gegen die Entity List (187 Einträge) screenen.' },
                { en: 'If your inputs touch the priority sectors (apparel, cotton, polysilicon/solar, tomatoes, aluminium, PVC, seafood; since August 2025 also lithium, copper, caustic soda, steel and red dates), expect intense documentation requests from US-importing buyers.',
                  zh: '如果您的原料涉及重点行业（服装、棉花、多晶硅/光伏、番茄、铝、PVC、海产品；自2025年8月起还包括锂、铜、烧碱、钢铁和红枣），请预计输美买家将提出密集的文件要求。',
                  de: 'Berühren Ihre Vorprodukte die Prioritätssektoren (Bekleidung, Baumwolle, Polysilizium/Solar, Tomaten, Aluminium, PVC, Meeresfrüchte; seit August 2025 auch Lithium, Kupfer, Natronlauge, Stahl und rote Datteln), rechnen Sie mit intensiven Dokumentationsanfragen der US-importierenden Abnehmer.' },
                { en: 'Rebuttal requires clear and convincing evidence, and only about 6.5% of reviewed shipments were released: clean sourcing and traceability upfront beat fighting a detention afterwards.',
                  zh: '推翻推定需要明确且令人信服的证据，且经审查的货物仅约6.5%获放行：事前的干净采购和可追溯性胜过事后申诉扣货。',
                  de: 'Die Widerlegung verlangt klare und überzeugende Beweise, und nur rund 6,5% der geprüften Sendungen wurden freigegeben: Saubere Beschaffung und Rückverfolgbarkeit im Vorfeld schlagen den Kampf gegen eine Zurückhaltung im Nachhinein.' }
            ]
        },
        actions: [
            { en: 'Map the full supply chain down to raw materials for every US-bound product.',
              zh: '为每种输美产品绘制直至原材料的完整供应链图谱。',
              de: 'Die vollständige Lieferkette bis zu den Rohstoffen für jedes US-gebundene Produkt erfassen.' },
            { en: 'Screen all supply chain tiers against the UFLPA Entity List after every update (latest: 43 additions effective 3 August 2026).',
              zh: '每次更新后对照UFLPA实体清单筛查供应链所有层级（最近一次：43家新增，2026年8月3日生效）。',
              de: 'Alle Lieferkettenstufen nach jeder Aktualisierung gegen die UFLPA Entity List screenen (zuletzt: 43 Neueinträge, wirksam ab 3. August 2026).' },
            { en: 'Prioritize tracing for priority-sector inputs, including lithium, copper, caustic soda, steel and red dates added since August 2025.',
              zh: '优先对重点行业原料进行追溯，包括自2025年8月起新增的锂、铜、烧碱、钢铁和红枣。',
              de: 'Die Rückverfolgung bei Vorprodukten aus Prioritätssektoren priorisieren, einschließlich der seit August 2025 ergänzten Sektoren Lithium, Kupfer, Natronlauge, Stahl und rote Datteln.' },
            { en: 'Prepare a documentation package capable of meeting the clear and convincing evidence standard before shipping.',
              zh: '在发货前准备能够满足"明确且令人信服的证据"标准的文件包。',
              de: 'Vor dem Versand ein Dokumentationspaket vorbereiten, das den Beweisstandard der klaren und überzeugenden Beweise erfüllen kann.' }
        ],
        documents: [
            { en: 'Full raw-material traceability records per shipment (every tier, every input)',
              zh: '每批货物的原材料全程追溯记录（覆盖每一层级、每种原料）',
              de: 'Vollständige Rohstoff-Rückverfolgbarkeitsaufzeichnungen je Sendung (jede Stufe, jedes Vorprodukt)' },
            { en: 'Entity-List screening records for all supply chain tiers',
              zh: '供应链所有层级的实体清单筛查记录',
              de: 'Entity-List-Screening-Aufzeichnungen für alle Lieferkettenstufen' },
            { en: 'Origin evidence for priority-sector inputs (cotton, polysilicon, aluminium, copper, steel and more)',
              zh: '重点行业原料的来源证明（棉花、多晶硅、铝、铜、钢铁等）',
              de: 'Herkunftsnachweise für Vorprodukte aus Prioritätssektoren (Baumwolle, Polysilizium, Aluminium, Kupfer, Stahl und mehr)' },
            { en: 'Evidence package for rebutting the presumption (clear and convincing standard)',
              zh: '用于推翻推定的证据包（须达到明确且令人信服的标准）',
              de: 'Beweispaket zur Widerlegung der Vermutung (Standard der klaren und überzeugenden Beweise)' }
        ],
        sources: [
            { label: 'EU parallel regime: Forced Labour Regulation (EU) 2024/3015, applies from 14 December 2027', url: 'https://eur-lex.europa.eu/legal-content/EN/TXT/?uri=CELEX:32024R3015' }
        ]
    }
};

// Built-in base data for the UK set: keeps the mega-menu pages working before
// the owner runs scripts/seeds/seed-uk-regs.js (generated from that seed, same facts).
// Once seeded, the CMS version takes precedence in the renderer.
const V2_REG_EXTRA_BASE = {
"gpsr": {
  "name": "General Product Safety Regulation (GPSR)",
  "ref": "(EU) 2023/988",
  "status": "inforce",
  "inForce": "12 June 2023 (applies since 13 December 2024)",
  "complianceDeadline": "Ongoing — applies to every consumer product placed on the EU market",
  "lastReviewed": "2026-07-19",
  "eurlex": "https://eur-lex.europa.eu/eli/reg/2023/988/oj/eng",
  "sections": [
    {
      "title": "DOCUMENTATION",
      "textEn": "Every consumer product — CE-marked or not — needs an EU-established responsible economic operator (manufacturer, importer, authorised representative or fulfilment provider) whose name and address appear on the product or its packaging. Technical documentation and an internal risk analysis are required.",
      "textZh": "每件消费品——无论是否带CE标志——都须有设立于欧盟的责任经济经营者（制造商、进口商、授权代表或履行服务商），其名称和地址须标注在产品或包装上。须备有技术文件和内部风险分析。"
    },
    {
      "title": "REPORTING",
      "textEn": "Accidents must be reported via the Safety Business Gateway. Online marketplaces must provide a single contact point, cooperate with Safety Gate and remove dangerous-product listings within 2 working days. Commission application guidelines published 19 November 2025.",
      "textZh": "事故须通过Safety Business Gateway报告。线上平台须设立统一联络点、配合Safety Gate，并在2个工作日内下架危险产品。欧盟委员会已于2025年11月19日发布适用指南。"
    },
    {
      "title": "PENALTIES",
      "textEn": "Member-state level. Germany: revised Product Safety Act (in force 19 February 2026) with fines up to €100,000, profit-skimming, marketplace delisting orders and criminal liability for persistent violations.",
      "textZh": "由成员国规定。德国：修订后的《产品安全法》（2026年2月19日生效）规定最高10万欧元罚款、没收违法所得、责令平台下架，屡犯者可承担刑事责任。"
    }
  ],
  "reasonEn": "Every consumer product you ship to the EU needs an EU responsible person and GPSR documentation — marketplaces and German retail QA teams now demand both before listing or shipping.",
  "reasonZh": "您输往欧盟的每件消费品都需要欧盟责任人和GPSR文件——线上平台和德国零售质检团队现已在上架或发货前要求提供两者。"
},
"ukcbam": {
  "name": "UK CBAM",
  "ref": "Finance Act 2026 (UK)",
  "status": "prepare",
  "inForce": "Enacted via Finance Act 2026 (announced at Budget, 26 November 2025)",
  "complianceDeadline": "1 January 2027 (first return and payment due by 31 May 2028)",
  "lastReviewed": "2026-07-19",
  "eurlex": "https://www.gov.uk/government/collections/carbon-border-adjustment-mechanism",
  "sections": [
    {
      "title": "REPORTING",
      "textEn": "A tax on embedded emissions administered by HMRC — no certificates to buy, unlike EU CBAM. Covered sectors: aluminium, cement, fertilisers, hydrogen, iron & steel (glass and ceramics excluded for now). First accounting period is calendar year 2027, quarterly thereafter.",
      "textZh": "由英国税务海关总署（HMRC）征收的内含排放税——与欧盟CBAM不同，无需购买证书。覆盖行业：铝、水泥、化肥、氢气、钢铁（玻璃和陶瓷暂不包括）。首个申报期为2027整个日历年，此后按季度申报。"
    },
    {
      "title": "DOCUMENTATION",
      "textEn": "Importers may use verified actual emissions data or government default values; sector-specific rates are set quarterly from UK ETS auction prices adjusted for free allowances. Deduction for carbon prices already paid abroad. Registration threshold: £50,000 of CBAM goods over 12 months.",
      "textZh": "进口商可使用经核实的实际排放数据或政府默认值；行业税率按季度根据英国ETS拍卖价格（经免费配额调整）设定。境外已支付的碳价可抵扣。注册门槛：12个月内CBAM产品达5万英镑。"
    },
    {
      "title": "PENALTIES",
      "textEn": "HMRC enforcement with standard tax penalties for failure to register, report or pay.",
      "textZh": "由HMRC执法，未注册、未申报或未缴税适用标准税务处罚。"
    }
  ],
  "reasonEn": "From January 2027, steel, aluminium and cement-based goods entering the UK are taxed on embedded emissions by HMRC — expect UK customers to request verifiable emissions data during 2026.",
  "reasonZh": "自2027年1月起，进入英国的钢铁、铝和水泥类产品将由HMRC按内含排放征税——预计英国客户将在2026年内要求提供可核实的排放数据。"
},
"toysafety": {
  "name": "Toy Safety Regulation",
  "ref": "(EU) 2025/2509",
  "status": "prepare",
  "inForce": "1 January 2026",
  "complianceDeadline": "Applies from 1 August 2030 (Directive 2009/48/EC remains applicable until then)",
  "lastReviewed": "2026-07-19",
  "eurlex": "https://eur-lex.europa.eu/eli/reg/2025/2509/oj/eng",
  "sections": [
    {
      "title": "PRODUCT DESIGN",
      "textEn": "Expanded chemical restrictions, including bans on PFAS and certain endocrine disruptors in toys, plus updated mechanical and digital-safety requirements.",
      "textZh": "扩大化学品限制，包括禁止玩具中的PFAS及某些内分泌干扰物，并更新机械安全和数字安全要求。"
    },
    {
      "title": "DOCUMENTATION",
      "textEn": "A toy Digital Product Passport replaces the paper EU declaration of conformity. Obligations for online marketplaces selling toys into the EU.",
      "textZh": "玩具数字产品护照将取代纸质欧盟符合性声明。向欧盟销售玩具的线上平台承担相应义务。"
    },
    {
      "title": "PENALTIES",
      "textEn": "Member-state enforcement; non-compliant toys are barred from the EU market.",
      "textZh": "由成员国执法；不合规玩具禁止进入欧盟市场。"
    }
  ],
  "reasonEn": "Toys get their own Digital Product Passport and stricter chemical rules from August 2030 — testing pipelines and material choices need updating well before, and both regimes run in parallel until then.",
  "reasonZh": "自2030年8月起，玩具将拥有自己的数字产品护照并适用更严格的化学品规则——测试流程和材料选择须提前更新，在此之前新旧两套制度并行。"
},
"lksg": {
  "name": "German Supply Chain Act (LkSG)",
  "ref": "LkSG (Germany)",
  "status": "inforce",
  "inForce": "1 January 2023 (companies ≥1,000 employees since 2024)",
  "complianceDeadline": "Due diligence remains in force; to be replaced by Germany's CSDDD transposition (deadline 26 July 2028)",
  "lastReviewed": "2026-07-19",
  "eurlex": "https://www.gesetze-im-internet.de/lksg/",
  "sections": [
    {
      "title": "SUPPLY CHAIN",
      "textEn": "Due diligence obligations remain fully in force for companies with ≥1,000 employees in Germany: risk management and analysis, preventive and remedial measures, complaints mechanism, BAFA oversight. The law was not abolished.",
      "textZh": "对德国境内员工不少于1,000人的企业，尽职调查义务仍完全有效：风险管理与分析、预防和补救措施、投诉机制、联邦经济与出口管制局（BAFA）监督。该法并未废除。"
    },
    {
      "title": "REPORTING",
      "textEn": "The reporting obligation is dead in practice: BAFA deactivated its reporting portal on 7 November 2025, with retroactive relief from 2023. The amendment law (reducing sanctions to serious violations only) is in final parliamentary passage — first Bundestag reading 16 January 2026.",
      "textZh": "报告义务实际上已终止：BAFA于2025年11月7日关闭报告门户，并追溯免除自2023年起的报告义务。修订法案（将处罚缩减至仅针对严重违规）正处于议会审议最后阶段——联邦议院2026年1月16日一读。"
    },
    {
      "title": "PENALTIES",
      "textEn": "BAFA fines remain possible for serious violations. In practice, German buyers cascade LkSG requirements to suppliers via contracts: codes of conduct, self-assessment questionnaires, audit rights and access to complaint mechanisms.",
      "textZh": "BAFA仍可对严重违规处以罚款。实践中，德国买家通过合同将LkSG要求传导给供应商：行为准则、自评问卷、审计权及投诉机制的使用。"
    }
  ],
  "reasonEn": "Your German buyers are legally required to manage supply-chain risks — codes of conduct, questionnaires, audit rights and complaint-mechanism access are standard contract terms, and CSDDD requirements will layer on top from 2029.",
  "reasonZh": "您的德国买家依法必须管理供应链风险——行为准则、问卷、审计权和投诉机制已是标准合同条款，2029年起CSDDD要求还将叠加其上。"
},
"uflpa": {
  "name": "US UFLPA (Forced Labor)",
  "ref": "Public Law 117-78 (US)",
  "status": "inforce",
  "inForce": "21 June 2022",
  "complianceDeadline": "Ongoing — rebuttable presumption applied at US import",
  "lastReviewed": "2026-07-19",
  "eurlex": "https://www.cbp.gov/trade/forced-labor/UFLPA",
  "sections": [
    {
      "title": "SUPPLY CHAIN",
      "textEn": "Goods with any Xinjiang or Entity-List nexus — at any tier, any input — are presumed made with forced labour and barred from US import. The presumption can only be rebutted with clear and convincing evidence. Entity List: 144 entities (largest addition: 37 entities, January 2025).",
      "textZh": "与新疆或实体清单有任何关联的货物——无论处于哪一层级、哪种原料——均被推定涉及强迫劳动并禁止进入美国。仅凭明确且令人信服的证据方可推翻推定。实体清单：144家实体（最大一次新增：2025年1月，37家）。"
    },
    {
      "title": "DOCUMENTATION",
      "textEn": "Full raw-material tracing required. CBP stopped ~7,300 shipments in FY2025 (+51% year on year); only ~6.5% of reviewed shipments were released. Priority sectors: cotton, polysilicon/solar, tomatoes, aluminium, PVC, seafood — plus, since August 2025: lithium, copper, caustic soda, steel and red dates.",
      "textZh": "须实现原材料全程追溯。美国海关与边境保护局（CBP）2025财年拦截约7,300批货物（同比增长51%）；经审查的货物仅约6.5%获放行。重点行业：棉花、多晶硅/光伏、番茄、铝、PVC、海产品——自2025年8月起新增：锂、铜、烧碱、钢铁和红枣。"
    },
    {
      "title": "PENALTIES",
      "textEn": "Detention, exclusion or seizure of goods at the border; potential civil penalties under 19 U.S.C. § 1592.",
      "textZh": "货物在边境被扣留、排除或没收；并可能依据《美国法典》第19编第1592条承担民事处罚。"
    }
  ],
  "reasonEn": "Selling to the US: any Xinjiang or Entity-List link anywhere in your supply chain triggers a border stop — and the priority-sector list now reaches lithium, copper and steel.",
  "reasonZh": "向美国销售：供应链任何环节与新疆或实体清单存在关联即会在边境被拦截——重点行业清单现已扩展至锂、铜和钢铁。"
},
  "ukmsa": {
    "name": "UK Modern Slavery Act (s.54)",
    "ref": "Modern Slavery Act 2015 (UK)",
    "status": "inforce",
    "inForce": "29 October 2015 (s.54 transparency duty)",
    "complianceDeadline": "Ongoing: annual statement within 6 months of the buyer's financial year end",
    "lastReviewed": "2026-09-09",
    "eurlex": "https://www.gov.uk/guidance/publish-an-annual-modern-slavery-statement",
    "sections": [
      {
        "title": "REPORTING",
        "textEn": "Commercial organisations doing business in the UK with global turnover of GBP 36m or more must publish an annual modern slavery statement, approved by the board, signed by a director and linked from the website homepage. New statutory guidance (24 March 2025) raises the expected standard across six areas: structure and supply chains, policies, due diligence, risk assessment, KPIs and training.",
        "textZh": "在英国开展业务且全球年营业额达3,600万英镑及以上的商业组织，须每年发布现代奴役声明，经董事会批准、由董事签署，并在网站首页设置链接。2025年3月24日发布的新法定指南在六个方面提高了预期标准：组织结构与供应链、政策、尽职调查、风险评估、关键绩效指标和培训。"
      },
      {
        "title": "SUPPLY CHAIN",
        "textEn": "The statement must cover the global supply chain, so UK buyers cascade the duty to their Asian suppliers through questionnaires, audits and contract clauses. Sourcing offices are typically the ones collecting the evidence.",
        "textZh": "声明须覆盖全球供应链，因此英国买家会通过问卷、审核和合同条款将义务传导给亚洲供应商。采购办公室通常是收集证明材料的一方。"
      },
      {
        "title": "PENALTIES",
        "textEn": "No fine for a missing statement (injunction only), but reputational exposure is high and the government registry makes gaps visible. Note: the UK has no forced labour import ban, unlike the US UFLPA and the EU Forced Labour Regulation.",
        "textZh": "未发布声明不会被罚款（仅可强制令），但声誉风险很高，政府登记平台会让缺失一目了然。注意：与美国UFLPA和欧盟强迫劳动条例不同，英国没有强迫劳动进口禁令。"
      }
    ],
    "reasonEn": "Your UK customers with GBP 36m+ turnover must publish annual modern slavery statements covering their whole supply chain. Expect questionnaires, audit rights and contract clauses on forced labour.",
    "reasonZh": "年营业额达3,600万英镑以上的英国客户须每年发布覆盖整个供应链的现代奴役声明。请准备好应对强迫劳动相关的问卷、审核权和合同条款。"
  },
  "ukppt": {
    "name": "UK Plastic Packaging Tax",
    "ref": "Finance Act 2021 (UK)",
    "status": "inforce",
    "inForce": "1 April 2022",
    "complianceDeadline": "Ongoing: rate GBP 228.82 per tonne from 1 April 2026, CPI indexed annually",
    "lastReviewed": "2026-09-09",
    "eurlex": "https://www.gov.uk/guidance/check-if-you-need-to-register-for-plastic-packaging-tax",
    "sections": [
      {
        "title": "DOCUMENTATION",
        "textEn": "The tax is charged on finished plastic packaging components containing less than 30% recycled plastic, whether manufactured in or imported into the UK, including the packaging around imported goods. Importers handling 10 tonnes or more per 12 months must register with HMRC and file quarterly returns.",
        "textZh": "该税针对再生塑料含量低于30%的成品塑料包装组件征收，无论在英国生产还是进口（包括进口商品的外包装）。12个月内经手10公吨及以上的进口商须向英国税务海关总署（HMRC）注册并按季度申报。"
      },
      {
        "title": "SUPPLY CHAIN",
        "textEn": "Recycled content claims need evidence from the supply chain: material composition and recycled percentage per component. UK buyers pass these documentation requests to manufacturers; without evidence the full tax is due.",
        "textZh": "再生含量声明需要供应链证明材料：每个组件的材料构成和再生比例。英国买家会将这些文件要求传递给制造商；没有证据即须全额缴税。"
      },
      {
        "title": "PENALTIES",
        "textEn": "Standard HMRC tax penalties apply, and businesses in the supply chain can be held secondarily liable, so due diligence requests down the chain are routine.",
        "textZh": "适用HMRC标准税务处罚，且供应链上的企业可能承担连带责任，因此沿链条向下的尽职调查要求已成常态。"
      }
    ],
    "reasonEn": "Plastic packaging entering the UK with under 30% recycled content is taxed at GBP 228.82 per tonne from April 2026. UK importers will ask you for per component recycled content evidence.",
    "reasonZh": "自2026年4月起，再生含量低于30%的塑料包装进入英国须按每公吨228.82英镑缴税。英国进口商将要求您提供每个组件的再生含量证明。"
  },
  "ukepr": {
    "name": "UK Packaging EPR (pEPR)",
    "ref": "SI 2024/1332 (UK)",
    "status": "phasing",
    "inForce": "Data duties since 2023; first disposal fee invoices issued October 2025",
    "complianceDeadline": "From the 2026-27 year, fees are modulated by recyclability (red, amber, green)",
    "lastReviewed": "2026-09-09",
    "eurlex": "https://www.gov.uk/guidance/extended-producer-responsibility-for-packaging-who-is-affected-and-what-to-do",
    "sections": [
      {
        "title": "REPORTING",
        "textEn": "UK producers, brand owners and importers of packaged goods above GBP 1m turnover and 25 tonnes of packaging per year must register and report packaging data. Larger producers (above GBP 2m and 50 tonnes) report every six months and pay disposal fees to the scheme administrator PackUK.",
        "textZh": "年营业额超过100万英镑且每年经手包装超过25公吨的英国生产商、品牌方和包装商品进口商须注册并报告包装数据。规模更大的生产商（超过200万英镑和50公吨）须每六个月报告一次，并向计划管理机构PackUK缴纳处置费。"
      },
      {
        "title": "DOCUMENTATION",
        "textEn": "Fees are set per tonne and material (year 1 base fees for example: plastic GBP 423 per tonne, glass GBP 192). From year 2 (2026-27) fees rise or fall with the recyclability rating of the packaging, so design choices made at the factory now directly set the UK fee.",
        "textZh": "费用按材料和吨位设定（第一年基础费率示例：塑料每公吨423英镑，玻璃192英镑）。自第二年（2026-27年度）起，费用随包装可回收性评级升降，工厂端的设计决定如今直接影响英国费率。"
      },
      {
        "title": "SUPPLY CHAIN",
        "textEn": "Suppliers must provide per SKU packaging data: material, component weight and recyclability. Expect UK buyers to require this in their item master data.",
        "textZh": "供应商须提供每个SKU的包装数据：材料、组件重量和可回收性。英国买家会将其纳入商品主数据要求。"
      }
    ],
    "reasonEn": "UK importers now pay the full cost of managing household packaging waste, modulated by recyclability from 2026-27. They will require per SKU packaging material, weight and recyclability data from you.",
    "reasonZh": "英国进口商现须承担家庭包装废弃物管理的全部成本，且自2026-27年度起费用按可回收性调整。他们将要求您提供每个SKU的包装材料、重量和可回收性数据。"
  },
  "ukca": {
    "name": "UKCA and CE Marking (GB)",
    "ref": "SI 2024/696 (UK)",
    "status": "inforce",
    "inForce": "CE marking recognised indefinitely for most consumer product rules since 1 October 2024",
    "complianceDeadline": "Ongoing: no CE withdrawal deadline for the listed product regulations",
    "lastReviewed": "2026-09-09",
    "eurlex": "https://www.gov.uk/government/news/uk-government-announces-extension-of-ce-mark-recognition-for-businesses",
    "sections": [
      {
        "title": "PRODUCT DESIGN",
        "textEn": "Great Britain recognises the CE marking indefinitely for most consumer product rules (toys, low voltage electrical, EMC, radio equipment, RoHS, ecodesign and more), so one CE compliant product can serve the EU, GB and Northern Ireland. UKCA remains valid but is voluntary in practice for these sectors.",
        "textZh": "英国（大不列颠）对大多数消费品法规（玩具、低电压电气、电磁兼容、无线电设备、RoHS、生态设计等）无限期承认CE标志，因此一件符合CE要求的产品可同时进入欧盟、大不列颠和北爱尔兰市场。UKCA标志仍然有效，但在这些领域实践中已属自愿。"
      },
      {
        "title": "DOCUMENTATION",
        "textEn": "The manufacturer still runs conformity assessment and keeps the technical file; the UK importer verifies compliance and appears on the label. Northern Ireland requires CE under the Windsor Framework.",
        "textZh": "制造商仍须进行合格评定并保存技术文件；英国进口商负责核验合规并标注于标签。根据《温莎框架》，北爱尔兰要求使用CE标志。"
      },
      {
        "title": "REPORTING",
        "textEn": "Watch divergence: recognition applies to the EU requirements as listed in the UK instrument, and a live consultation would extend recognition to products certified under the EU ESPR ecodesign measures. Medical devices and construction products run on separate tracks.",
        "textZh": "注意法规分化：承认范围以英国法规文件所列的欧盟要求为准，一项进行中的公众咨询拟将承认范围扩展至按欧盟ESPR生态设计措施认证的产品。医疗器械和建筑产品适用单独安排。"
      }
    ],
    "reasonEn": "One CE compliant product generally serves both the EU and the UK: Great Britain recognises CE indefinitely for most consumer goods, so separate UKCA testing is usually unnecessary, but check divergence per product rule.",
    "reasonZh": "一件符合CE要求的产品通常可同时进入欧盟和英国市场：大不列颠对大多数消费品无限期承认CE，通常无需单独的UKCA测试，但须按产品法规逐项核查分化情况。"
  },
  "ukreach": {
    "name": "UK REACH",
    "ref": "Assimilated Reg. (EC) 1907/2006 (UK)",
    "status": "phasing",
    "inForce": "1 January 2021 (GB regime, agency: HSE)",
    "complianceDeadline": "Transitional registrations due 27 October 2029 / 2030 / 2031 by tonnage band (extended by SI 2026/849)",
    "lastReviewed": "2026-09-09",
    "eurlex": "https://www.hse.gov.uk/reach/",
    "sections": [
      {
        "title": "DOCUMENTATION",
        "textEn": "For finished consumer goods the main duties are the restrictions (the GB equivalent of Annex XVII, for example phthalates, azo dyes, nickel) and the duty to inform customers when a substance of very high concern exceeds 0.1% by weight. The GB SVHC candidate list diverges slowly from the EU list, so both need checking.",
        "textZh": "对成品消费品而言，主要义务是限制物质清单（相当于欧盟附件XVII的英国版本，如邻苯二甲酸酯、偶氮染料、镍）以及当高度关注物质（SVHC）含量超过0.1%（重量比）时告知客户的义务。英国SVHC候选清单与欧盟清单正在缓慢分化，两份清单都须核查。"
      },
      {
        "title": "REPORTING",
        "textEn": "Substance registration deadlines were extended a second time in August 2026: 27 October 2029 for 1,000+ tonnes per year and CMRs, 2030 for 100+ tonnes, 2031 for 1+ tonne. Non UK companies act through a GB based Only Representative or their GB importer registers.",
        "textZh": "物质注册截止日期已于2026年8月第二次延长：年吨位1,000吨以上及CMR物质为2029年10月27日，100吨以上为2030年，1吨以上为2031年。非英国企业须通过设于英国的唯一代表行事，或由其英国进口商注册。"
      },
      {
        "title": "PENALTIES",
        "textEn": "Enforced by the Health and Safety Executive; non compliant articles can be withdrawn from the GB market.",
        "textZh": "由英国健康与安全执行局（HSE）执法；不合规物品可被撤出英国市场。"
      }
    ],
    "reasonEn": "Chemical restrictions and SVHC information duties apply separately in Great Britain, and the GB substance lists are drifting from the EU ones. Dual checking EU REACH and UK REACH is now part of compliance.",
    "reasonZh": "化学品限制和SVHC告知义务在大不列颠单独适用，且英国物质清单正与欧盟清单逐渐分化。同时核查欧盟REACH和英国REACH已成为合规工作的一部分。"
  },
  "uktr": {
    "name": "UK Timber Regulation (UKTR)",
    "ref": "Assimilated Reg. (EU) 995/2010 (UK)",
    "status": "inforce",
    "inForce": "Regime since 2013; GB version since 1 January 2021",
    "complianceDeadline": "Ongoing due diligence for the first placer on the GB market",
    "lastReviewed": "2026-09-09",
    "eurlex": "https://www.gov.uk/guidance/regulations-timber-and-flegt-licences",
    "sections": [
      {
        "title": "SUPPLY CHAIN",
        "textEn": "Illegally harvested timber is prohibited. The operator first placing timber, furniture or paper products on the GB market must run a documented due diligence system: species, harvest country, legality evidence, risk assessment and mitigation. Traders keep supplier and customer records for five years.",
        "textZh": "禁止非法采伐的木材。首次将木材、家具或纸制品投放英国市场的经营者须建立书面尽职调查体系：树种、采伐国、合法性证明、风险评估和缓解措施。贸易商须保存供应商和客户记录五年。"
      },
      {
        "title": "PENALTIES",
        "textEn": "Enforced by the Office for Product Safety and Standards on behalf of Defra, escalating from warning letters to notices of remedial action and prosecution with unlimited fines.",
        "textZh": "由产品安全与标准办公室（OPSS）代表英国环境食品与乡村事务部（Defra）执法，从警告信逐步升级至整改通知和刑事起诉，罚款无上限。"
      }
    ],
    "reasonEn": "Furniture and other timber products sold to the UK need legality due diligence just like under the EU timber rules. UK importers will ask for species, origin and harvest legality evidence.",
    "reasonZh": "销往英国的家具及其他木制品需要与欧盟木材法规类似的合法性尽职调查。英国进口商将要求提供树种、原产地和采伐合法性证明。"
  },
  "ukfrc": {
    "name": "UK Deforestation Rules (Forest Risk Commodities)",
    "ref": "Environment Act 2021, Sch. 17 (UK)",
    "status": "prepare",
    "inForce": "Not yet in force: policy paper published 2 September 2026, legislation expected 2027",
    "complianceDeadline": "Expected from 2027; the EUDR already applies in Northern Ireland from 30 December 2026",
    "lastReviewed": "2026-09-09",
    "eurlex": "https://www.gov.uk/government/publications/the-uks-approach-to-deforestation-regulations/the-uks-approach-to-deforestation-regulations",
    "sections": [
      {
        "title": "SUPPLY CHAIN",
        "textEn": "The announced design: due diligence for GB businesses with turnover above GBP 1m using wood, cattle, cocoa, coffee, palm oil, rubber or soy and derived products (explicitly including chocolate and furniture), with geolocation data, built to operate consistently alongside the EUDR.",
        "textZh": "已公布的制度设计：营业额超过100万英镑、使用木材、牛、可可、咖啡、棕榈油、橡胶或大豆及其衍生产品（明确包括巧克力和家具）的英国企业须开展尽职调查，包含地理定位数据，并与欧盟EUDR保持一致运作。"
      },
      {
        "title": "REPORTING",
        "textEn": "Proposed, not yet law: no secondary legislation has been laid. Under the Windsor Framework the EU Deforestation Regulation applies in Northern Ireland from 30 December 2026 for large and medium operators.",
        "textZh": "尚为提案，未成为法律：配套细则尚未提交议会。根据《温莎框架》，欧盟毁林条例自2026年12月30日起适用于北爱尔兰的大中型经营者。"
      }
    ],
    "reasonEn": "The UK confirmed in September 2026 that it will regulate forest risk commodities in line with the EUDR. If you already build EUDR geolocation traceability, you are preparing for the UK rules too.",
    "reasonZh": "英国已于2026年9月确认将参照EUDR监管森林风险商品。如果您已在建设EUDR地理定位追溯体系，即同时在为英国规则做准备。"
  },
  "ukgreenclaims": {
    "name": "UK Green Claims (DMCC Act)",
    "ref": "DMCC Act 2024 (UK)",
    "status": "inforce",
    "inForce": "6 April 2025 (direct CMA consumer enforcement regime)",
    "complianceDeadline": "Ongoing",
    "lastReviewed": "2026-09-09",
    "eurlex": "https://www.gov.uk/government/publications/green-claims-code-making-environmental-claims",
    "sections": [
      {
        "title": "DOCUMENTATION",
        "textEn": "Every environmental claim reaching UK consumers (eco, recycled, sustainable, carbon neutral) must be truthful, substantiated and consider the full life cycle, following the CMA Green Claims Code and the 2025 unfair commercial practices guidance.",
        "textZh": "面向英国消费者的每一项环境声明（环保、再生、可持续、碳中和）都必须真实、有据可依并考虑完整生命周期，须遵循CMA《绿色声明准则》及2025年不公平商业行为指南。"
      },
      {
        "title": "SUPPLY CHAIN",
        "textEn": "CMA guidance from January 2026 states responsibility can fall on manufacturers, suppliers, distributors and marketplaces, not only the retailer making the claim, and retailers must take reasonable steps to verify supplier claims rather than pass them through. Keep an evidence file per claim.",
        "textZh": "CMA于2026年1月发布的指南指出，责任可及于制造商、供应商、分销商和线上平台，而不仅是作出声明的零售商；零售商须采取合理措施核实供应商声明，而非简单转述。请为每项声明建立证据档案。"
      },
      {
        "title": "PENALTIES",
        "textEn": "The CMA can fine up to 10% of global turnover directly, without going to court, plus personal fines up to GBP 300,000. Greenwashing is a declared enforcement priority.",
        "textZh": "CMA可不经法院直接处以最高相当于全球营业额10%的罚款，个人罚款最高30万英镑。打击洗绿是其明确的执法重点。"
      }
    ],
    "reasonEn": "Since April 2025 the CMA can fine greenwashing directly at up to 10% of global turnover, and its 2026 guidance points at suppliers feeding claims up the chain. Every recycled or organic claim you make needs evidence.",
    "reasonZh": "自2025年4月起，CMA可对洗绿行为直接处以最高全球营业额10%的罚款，其2026年指南明确指向沿供应链向上传递声明的供应商。您作出的每一项再生或有机声明都需要证据。"
  },
  "ukweee": {
    "name": "UK WEEE",
    "ref": "SI 2013/3113 as amended (UK)",
    "status": "inforce",
    "inForce": "1 January 2014; marketplace amendments in force 12 August 2025",
    "complianceDeadline": "Marketplace producers: first data report was due 31 January 2026, financing obligations from 2026",
    "lastReviewed": "2026-09-09",
    "eurlex": "https://www.gov.uk/guidance/regulations-waste-electrical-and-electronic-equipment",
    "sections": [
      {
        "title": "REPORTING",
        "textEn": "UK producers and importers of electrical and electronic equipment register through a compliance scheme, report EEE placed on the market by category and finance collection and recycling. Since 12 August 2025 online marketplaces count as producers for EEE sold to UK households by non UK sellers, and vapes are explicitly in scope.",
        "textZh": "英国电气电子设备的生产商和进口商须通过合规计划注册，按类别报告投放市场的设备，并为收集和回收提供资金。自2025年8月12日起，线上平台就非英国卖家售予英国家庭的电气电子设备承担生产商责任，电子烟明确纳入范围。"
      },
      {
        "title": "SUPPLY CHAIN",
        "textEn": "Per product EEE category, weight and battery data must flow from the factory to the UK importer or brand owner. Direct to consumer sales via marketplaces no longer escape financing obligations.",
        "textZh": "每个产品的设备类别、重量和电池数据须从工厂传递给英国进口商或品牌方。通过平台直销消费者的模式不再能规避出资义务。"
      }
    ],
    "reasonEn": "Electronics sold to the UK carry producer obligations for the importer, and since August 2025 marketplace sales from Asia are captured too. Expect UK customers to require category, weight and battery data per model.",
    "reasonZh": "销往英国的电子产品使进口商承担生产商义务，自2025年8月起经平台从亚洲直销的产品同样被覆盖。英国客户将要求提供每个型号的类别、重量和电池数据。"
  },
  "ukbatteries": {
    "name": "UK Batteries Rules",
    "ref": "UK SIs 2008/2009",
    "status": "inforce",
    "inForce": "Placing on the market rules since 2008, producer obligations since 2009",
    "complianceDeadline": "GB reform expected to draw on EU Reg. 2023/1542; timing unconfirmed",
    "lastReviewed": "2026-09-09",
    "eurlex": "https://www.gov.uk/guidance/waste-batteries-producer-responsibility",
    "sections": [
      {
        "title": "PRODUCT DESIGN",
        "textEn": "The GB regime still follows the 2008/2009 rules: mercury and cadmium limits, capacity labelling, removability, producer registration and take back financing via the UK importer.",
        "textZh": "英国现行制度仍遵循2008/2009年规则：汞和镉限量、容量标识、可拆卸性、生产商注册以及由英国进口商出资的回收义务。"
      },
      {
        "title": "SUPPLY CHAIN",
        "textEn": "Divergence flag: the EU Battery Regulation (2023/1542) applies in the EU and in Northern Ireland, including portable battery removability from 18 February 2027, years before an equivalent GB regime. Products sold on both markets should be designed to the EU timeline.",
        "textZh": "分化提示：欧盟电池法规（2023/1542）适用于欧盟和北爱尔兰，包括自2027年2月18日起的便携式电池可拆卸要求，远早于英国的同等制度。同时销往两个市场的产品应按欧盟时间表设计。"
      }
    ],
    "reasonEn": "Battery rules are diverging: Great Britain still runs the 2008/2009 regime while the EU Battery Regulation timeline (including Northern Ireland) arrives first. Design to the EU requirements to cover both markets.",
    "reasonZh": "电池规则正在分化：大不列颠仍执行2008/2009年制度，而欧盟电池法规的时间表（含北爱尔兰）更早到来。按欧盟要求设计即可覆盖两个市场。"
  }
};
