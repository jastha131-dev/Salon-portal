import { defineField, defineType } from 'sanity'

export const reviewSchema = defineType({
  name: 'review',
  title: 'Review',
  type: 'document',
  fields: [
    defineField({
      name: 'customerName',
      title: 'Customer Name',
      type: 'string',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'rating',
      title: 'Rating',
      type: 'number',
      validation: (r) => r.required().min(1).max(5),
      options: { list: [1, 2, 3, 4, 5] },
    }),
    defineField({
      name: 'comment',
      title: 'Comment',
      type: 'text',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'serviceUsed',
      title: 'Service Used',
      type: 'reference',
      to: [{ type: 'service' }],
    }),
    defineField({
      name: 'customerImage',
      title: 'Customer Photo',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'featured',
      title: 'Featured (show on homepage)',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'verified',
      title: 'Verified Customer',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published At',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
    }),
  ],
})
