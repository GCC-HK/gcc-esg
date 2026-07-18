// Sanity schema: entries for the Regulatory Deadline Radar (countdown timeline).

export default {
    name: 'deadline',
    title: 'Deadline (Radar)',
    type: 'document',
    fields: [
        { name: 'labelEn', title: 'Label (EN)', type: 'string', validation: R => R.required() },
        { name: 'labelZh', title: 'Label (中文)', type: 'string' },
        { name: 'date', title: 'Deadline date', type: 'date', validation: R => R.required() },
        { name: 'regulation', title: 'Regulation', type: 'reference', to: [{ type: 'regulation' }] },
        {
            name: 'affects', title: 'Who is affected (short, EN)', type: 'string',
            description: 'e.g. "All importers of packaged goods"'
        },
        { name: 'affectsZh', title: 'Who is affected (中文)', type: 'string' },
        {
            name: 'confidence', title: 'Date confidence', type: 'string',
            options: { list: [
                { title: 'Fixed in law', value: 'fixed' },
                { title: 'Expected (delegated act / proposal pending)', value: 'expected' }
            ] },
            initialValue: 'fixed'
        }
    ],
    orderings: [
        { title: 'Soonest first', name: 'dateAsc', by: [{ field: 'date', direction: 'asc' }] }
    ],
    preview: {
        select: { title: 'labelEn', subtitle: 'date' }
    }
}
