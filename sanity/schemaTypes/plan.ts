import { defineField, defineType } from 'sanity'

export const planSchema = defineType({
  name: 'plan',
  title: 'Membership Plans',
  type: 'document',
  fields: [
    defineField({ name: 'name',         title: 'Plan Name',            type: 'string', validation: r => r.required() }),
    defineField({ name: 'slug',         title: 'Slug',                 type: 'slug', options: { source: 'name' }, validation: r => r.required() }),
    defineField({ name: 'tagline',      title: 'Tagline',              type: 'string', description: 'Short description shown under plan name' }),
    defineField({ name: 'monthlyPrice', title: 'Monthly Price (AED)',  type: 'number', validation: r => r.required().min(0) }),
    defineField({ name: 'yearlyPrice',  title: 'Yearly Price (AED)',   type: 'number', description: 'Full yearly charge (show savings vs 12× monthly)' }),
    defineField({ name: 'highlight',    title: 'Key Highlight',        type: 'string', description: 'e.g. "3 visits / month"' }),
    defineField({ name: 'badge',        title: 'Badge Label',          type: 'string', description: 'e.g. "Most Popular" or "Best Value"' }),
    defineField({ name: 'popular',      title: 'Featured / Popular',   type: 'boolean', initialValue: false }),
    defineField({
      name: 'color', title: 'Card Accent Color', type: 'string',
      options: { list: [{ title: 'Rose (Primary)',  value: 'rose' }, { title: 'Gold (Accent)', value: 'gold' }, { title: 'Charcoal (Dark)', value: 'charcoal' }] },
      initialValue: 'charcoal',
    }),
    defineField({
      name: 'features', title: 'Features', type: 'array',
      of: [defineField({
        name: 'feature', title: 'Feature', type: 'object',
        fields: [
          defineField({ name: 'text',     title: 'Feature Text', type: 'string', validation: r => r.required() }),
          defineField({ name: 'included', title: 'Included?',    type: 'boolean', initialValue: true }),
        ],
        preview: { select: { title: 'text', subtitle: 'included' }, prepare: ({ title, subtitle }) => ({ title, subtitle: subtitle ? '✓ Included' : '✗ Not included' }) },
      })],
    }),
    defineField({ name: 'ctaText',   title: 'CTA Button Text',  type: 'string', initialValue: 'Get Started' }),
    defineField({ name: 'ctaLink',   title: 'CTA Link',         type: 'string', initialValue: '/booking' }),
    defineField({ name: 'order',     title: 'Display Order',    type: 'number', initialValue: 0 }),
  ],
  orderings: [{ title: 'Display Order', name: 'orderAsc', by: [{ field: 'order', direction: 'asc' }] }],
  preview: {
    select: { title: 'name', subtitle: 'monthlyPrice', media: 'popular' },
    prepare: ({ title, subtitle }) => ({ title, subtitle: `AED ${subtitle}/month` }),
  },
})
