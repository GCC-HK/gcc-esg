// Sanity schema: weekly Green Sourcing Briefing items.
// Fixed editorial structure: what happened → why it matters → supplier action.

export default {
    name: 'newsPost',
    title: 'News Post (Weekly Briefing)',
    type: 'document',
    fields: [
        { name: 'titleEn', title: 'Title (EN)', type: 'string', validation: R => R.required() },
        { name: 'titleZh', title: 'Title (中文)', type: 'string' },
        { name: 'slug', title: 'Slug', type: 'slug', options: { source: 'titleEn' }, validation: R => R.required() },
        { name: 'publishedAt', title: 'Publish date', type: 'datetime', validation: R => R.required() },
        {
            name: 'pillar', title: 'Content pillar', type: 'string',
            options: { list: [
                { title: 'EU regulatory watch', value: 'eu' },
                { title: 'Germany / retail buyers', value: 'germany' },
                { title: 'China & Hong Kong', value: 'china-hk' },
                { title: 'Standards & certification', value: 'standards' },
                { title: 'Explainer of the week', value: 'explainer' }
            ] },
            validation: R => R.required()
        },
        { name: 'whatHappenedEn', title: 'What happened (EN)', type: 'text', validation: R => R.required() },
        { name: 'whatHappenedZh', title: 'What happened (中文)', type: 'text' },
        { name: 'whyItMattersEn', title: 'Why it matters for HK sourcing offices (EN)', type: 'text' },
        { name: 'whyItMattersZh', title: 'Why it matters (中文)', type: 'text' },
        { name: 'supplierActionEn', title: 'What suppliers should do (EN)', type: 'text' },
        { name: 'supplierActionZh', title: 'What suppliers should do (中文)', type: 'text' },
        { name: 'bodyEn', title: 'Full text (EN, optional)', type: 'array', of: [{ type: 'block' }] },
        { name: 'bodyZh', title: 'Full text (中文, optional)', type: 'array', of: [{ type: 'block' }] },
        {
            name: 'linkedRegulations', title: 'Linked regulations', type: 'array',
            of: [{ type: 'reference', to: [{ type: 'regulation' }] }]
        },
        {
            name: 'sources', title: 'Sources (URLs)', type: 'array',
            of: [{ type: 'url' }]
        },
        { name: 'imageUrl', title: 'Image URL (e.g. assets/img/news/x.jpg)', type: 'string' },
        { name: 'imageCredit', title: 'Image credit/license', type: 'string' },
        {
            name: 'accessLevel', title: 'Access level', type: 'string',
            description: 'public = headline visible to all; registered = full text needs sign-up',
            options: { list: ['public', 'registered', 'premium'] },
            initialValue: 'registered'
        }
    ],
    orderings: [
        { title: 'Newest first', name: 'publishedAtDesc', by: [{ field: 'publishedAt', direction: 'desc' }] }
    ],
    preview: {
        select: { title: 'titleEn', subtitle: 'pillar' }
    }
}
