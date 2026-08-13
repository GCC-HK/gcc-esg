// V2 CBAM data module — all values verified against the published Official
// Journal texts on 2026-08-15 (parsed from EUR-Lex; see the CBAM methodology
// document for the per-value audit trail).
//
// Primary sources:
// - IR (EU) 2026/1740 (corrects IR 2025/2621 Annex I & IV in full; in force
//   3 Aug 2026, applies retroactively from 1 Jan 2026): country default
//   values, base figures EXCLUDING mark-up.
// - IR (EU) 2025/2620: CBAM benchmarks (Column B = default-values path).
// - Directive 2003/87/EC Art. 10a(1a) (consolidated): CBAM factor schedule.
// - Commission price page: Q2 2026 certificate price.
window.V2CBAM = {
    meta: {
        reviewed: '2026-08-15',
        price: 75.28,           // Q2 2026 certificate price, published 6 Jul 2026
        priceLabel: 'Q2 2026',
        sensitivity: 20         // ±€/tCO2e band shown in the projection
    },

    // Free-allocation share by year ("CBAM factor", Dir. 2003/87/EC Art 10a(1a),
    // verbatim: 97.5/95/90/77.5/51.5/39/26.5/14, none from 2034).
    factors: {
        2026: 0.975, 2027: 0.95, 2028: 0.90, 2029: 0.775, 2030: 0.515,
        2031: 0.39, 2032: 0.265, 2033: 0.14, 2034: 0
    },

    // Default-value mark-up (corrected Annex I intro, IR 2026/1740):
    // cement/steel/aluminium/hydrogen +10% 2026, +20% 2027, +30% 2028+;
    // fertilisers flat +1%.
    markup: (year, bucket) => {
        if (bucket === 'fertilisers' || bucket === 'urea') return 0.01;
        return year <= 2026 ? 0.10 : year === 2027 ? 0.20 : 0.30;
    },

    // CBAM benchmarks, IR 2025/2620 Column B (default-values path), tCO2e/t.
    benchmarks: {
        steel_bof:           1.370,  // HRC 7208, route (C)
        steel_dri_eaf:       0.481,  // HRC, route (D)
        steel_eaf:           0.072,  // HRC, route (E)
        aluminium_primary:   1.423,  // unwrought 7601, route (K)
        aluminium_secondary: 0.091,  // unwrought 7601, route (L)
        cement:              0.666,  // grey Portland cement 2523 29 00
        fertilisers:         1.522,  // ammonia 2814 10 00
        urea:                0.902,  // urea 3102 10 19
        hydrogen:            5.089   // hydrogen 2804 10 00
    },

    // Aluminium product-form add-ons to the benchmark (IR 2025/2620 Column A
    // process add-ons; three tiers, not one).
    aluAddon: { unwrought: 0, semi: 0.056, profiles: 0.060, foil: 0.166 },

    // Editorial sector averages — last-resort fallback only (official
    // country values incl. the regulation's own "Other Countries" fallback
    // cover every selectable origin below).
    sectorAvg: {
        steel_bof: 2.0, steel_dri_eaf: 1.4, steel_eaf: 0.4,
        aluminium_primary: 1.5, aluminium_secondary: 0.4,
        cement: 0.8, fertilisers: 2.3, urea: 1.6, hydrogen: 10.4
    },

    // Country default values (total-emissions column, tCO2e/t, EXCLUDING
    // mark-up) per corrected Annex I. One value per product per country; the
    // route letter encodes the production route Annex I assumes for that
    // country, which selects the benchmark. Missing entries fall back to the
    // regulation's own "Other Countries and Territories" values (OTHER).
    // steel = HRC 7208 · alu = unwrought 7601 · cement = grey Portland
    // 2523 29 00 · fertilisers = ammonia 2814 10 00 · urea = 3102 10 19.
    routeBuckets: { C: 'steel_bof', D: 'steel_dri_eaf', E: 'steel_eaf', K: 'aluminium_primary', L: 'aluminium_secondary' },
    defaults: {
        CN:    { steel: { v: 3.187, route: 'C' }, alu: { v: 3.000, route: 'K' }, cement: { v: 1.420 }, fertilisers: { v: 4.360 }, urea: { v: 2.850 }, hydrogen: { v: 26.640 } },
        IN:    { steel: { v: 4.280, route: 'C' }, alu: { v: 1.870, route: 'K' }, cement: { v: 1.480 }, fertilisers: { v: 3.280 }, urea: { v: 2.220 }, hydrogen: { v: 14.030 } },
        TR:    { steel: { v: 2.428, route: 'C' }, alu: { v: 1.700, route: 'K' }, fertilisers: { v: 2.270 }, urea: { v: 1.510 }, hydrogen: { v: 10.820 } },
        RU:    { steel: { v: 3.430, route: 'C' }, alu: { v: 2.160, route: 'K' }, cement: { v: 1.380 }, fertilisers: { v: 2.260 }, urea: { v: 1.470 }, hydrogen: { v: 10.820 } },
        KR:    { steel: { v: 2.118, route: 'C' }, alu: { v: 0.360, route: 'L' }, cement: { v: 0.940 }, urea: { v: 1.540 }, hydrogen: { v: 14.030 } },
        UA:    { steel: { v: 2.483, route: 'C' }, alu: { v: 0.360, route: 'L' }, cement: { v: 1.380 }, fertilisers: { v: 2.250 }, urea: { v: 1.450 }, hydrogen: { v: 10.820 } },
        GB:    { steel: { v: 2.420, route: 'C' }, alu: { v: 1.870, route: 'K' }, cement: { v: 0.980 }, fertilisers: { v: 2.050 }, urea: { v: 1.260 }, hydrogen: { v: 10.820 } },
        VN:    { steel: { v: 2.350, route: 'C' }, alu: { v: 0.360, route: 'L' }, fertilisers: { v: 3.610 }, urea: { v: 2.430 }, hydrogen: { v: 10.820 } },
        ID:    { steel: { v: 8.230, route: 'C' }, alu: { v: 1.700, route: 'K' }, fertilisers: { v: 2.280 }, urea: { v: 1.580 }, hydrogen: { v: 10.820 } },
        BR:    { steel: { v: 1.620, route: 'C' }, alu: { v: 1.700, route: 'K' }, fertilisers: { v: 3.210 }, urea: { v: 2.070 }, hydrogen: { v: 10.820 } },
        JP:    { steel: { v: 2.100, route: 'C' }, alu: { v: 0.360, route: 'L' }, cement: { v: 0.890 }, fertilisers: { v: 2.190 }, urea: { v: 1.520 }, hydrogen: { v: 14.030 } },
        EG:    { alu: { v: 1.870, route: 'K' }, cement: { v: 1.290 }, fertilisers: { v: 2.050 }, urea: { v: 1.390 }, hydrogen: { v: 10.820 } },
        ZA:    { steel: { v: 4.140, route: 'C' }, alu: { v: 2.358, route: 'K' }, fertilisers: { v: 3.640 }, urea: { v: 2.360 }, hydrogen: { v: 25.940 } },
        // Annex I "Other Countries and Territories" — also the fallback the
        // regulation prescribes for countries with missing or "–" entries.
        OTHER: { steel: { v: 4.049, route: 'C' }, alu: { v: 2.203, route: 'K' }, cement: { v: 1.440 }, fertilisers: { v: 3.130 }, urea: { v: 2.720 }, hydrogen: { v: 17.740 } }
    },
    defaultsIncludeMarkup: false,

    // Headline origin carbon prices (€/tCO2e, mid-2026) for the Art. 9 credit
    // when the user does not enter the price actually paid.
    carbonPrices: {
        CN: 10, IN: 0, TR: 0, RU: 0, KR: 6, UA: 0.6,
        GB: 60, VN: 0, ID: 0, BR: 0, JP: 12, EG: 0, ZA: 15, OTHER: 0
    }
};
