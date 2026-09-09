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
    }
};
