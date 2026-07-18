// Sanity schema: one document per EU regulation shown in the Green Sourcing Compass.
// Replaces the hardcoded `regulations` array in script.js (migration in Step 3).
// The applies() functions become declarative match fields (categories/roles/sizes).

export default {
    name: 'regulation',
    title: 'Regulation',
    type: 'document',
    fields: [
        { name: 'regId', title: 'ID (slug, e.g. "cbam")', type: 'string', validation: R => R.required() },
        { name: 'name', title: 'Name', type: 'string', validation: R => R.required() },
        { name: 'ref', title: 'Official reference (e.g. "(EU) 2023/956")', type: 'string' },
        {
            name: 'status', title: 'Status', type: 'string',
            options: { list: [
                { title: 'In force (ACT NOW)', value: 'inforce' },
                { title: 'Phasing in (PREPARE)', value: 'phasing' },
                { title: 'Adopted/proposed (WATCH)', value: 'prepare' }
            ] },
            validation: R => R.required()
        },
        { name: 'inForce', title: 'In force from (display text)', type: 'string' },
        { name: 'complianceDeadline', title: 'Compliance deadline (display text)', type: 'string' },
        { name: 'lastReviewed', title: 'Last reviewed', type: 'date', validation: R => R.required() },
        { name: 'eurlex', title: 'EUR-Lex URL', type: 'url' },
        {
            name: 'sections', title: 'Detail sections', type: 'array',
            of: [{
                type: 'object',
                fields: [
                    {
                        name: 'title', title: 'Section', type: 'string',
                        options: { list: ['REPORTING', 'SUPPLY CHAIN', 'PRODUCT DESIGN', 'DOCUMENTATION', 'PENALTIES'] }
                    },
                    { name: 'textEn', title: 'Text (EN)', type: 'text' },
                    { name: 'textZh', title: 'Text (中文)', type: 'text' }
                ]
            }]
        },
        {
            name: 'categories', title: 'Applies to product categories', type: 'array',
            description: 'Leave empty to match ALL categories',
            of: [{ type: 'string' }],
            options: { list: ['electronics', 'textiles', 'cosmetics', 'toys', 'furniture', 'food', 'construction', 'other'] }
        },
        {
            name: 'roles', title: 'Applies to roles', type: 'array',
            description: 'Leave empty to match ALL roles',
            of: [{ type: 'string' }],
            options: { list: ['supplier', 'importer', 'brand', 'manufacturer'] }
        },
        {
            name: 'sizes', title: 'Applies to company sizes', type: 'array',
            description: 'Leave empty to match ALL sizes',
            of: [{ type: 'string' }],
            options: { list: ['small', 'medium', 'large'] }
        },
        { name: 'reasonEn', title: 'Why it applies (EN)', type: 'text' },
        { name: 'reasonZh', title: 'Why it applies (中文)', type: 'text' },
        {
            name: 'accessLevel', title: 'Access level', type: 'string',
            options: { list: ['public', 'registered', 'premium'] },
            initialValue: 'public'
        }
    ],
    preview: {
        select: { title: 'name', subtitle: 'ref' }
    }
}
