const TOKEN = process.env.SANITY_TOKEN;
const B = {
    csrd:          { badge: 'updated', newSince: '2026-02-26' },
    csddd:         { badge: 'updated', newSince: '2026-02-26' },
    cbam:          { badge: 'updated', newSince: '2025-10-20' },
    eudr:          { badge: 'updated', newSince: '2025-12-23' },
    batteries:     { badge: 'updated', newSince: '2025-07-30' },
    microplastics: { newSince: '2023-09-25' },
    ecodesign:     { badge: 'new', newSince: '2024-06-13' },
    righttorepair: { badge: 'new', newSince: '2024-06-13' },
    greenclaims:   { newSince: '2023-03-22' },
    empco:         { badge: 'new', newSince: '2024-02-28' },
    wfdtextiles:   { badge: 'new', newSince: '2025-09-26' },
    rohs:          { newSince: '2011-06-08' },
    ppwr:          { badge: 'new', newSince: '2024-12-19' },
    forcedlabour:  { badge: 'new', newSince: '2024-11-27' },
    dpp:           { badge: 'new', newSince: '2024-06-13' }
};
const mutations = Object.entries(B).map(([id, v]) => ({ patch: { id: `regulation-${id}`, set: v } }));
(async () => {
    const r = await fetch('https://bvmxf21v.api.sanity.io/v2024-01-01/data/mutate/production', {
        method: 'POST', headers: { Authorization: `Bearer ${TOKEN}`, 'Content-Type': 'application/json' },
        body: JSON.stringify({ mutations })
    });
    const b = await r.json();
    console.log(r.ok ? `OK ${mutations.length}` : JSON.stringify(b));
})();
