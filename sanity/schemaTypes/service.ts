import { defineField, defineType } from 'sanity'

export const serviceSchema = defineType({
  name: 'service',
  title: 'Service',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'name' },
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'price',
      title: 'Price (AED)',
      type: 'number',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'duration',
      title: 'Duration (e.g. 60 min)',
      type: 'string',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'array',
      of: [{ type: 'block' }],
    }),
    defineField({
      name: 'image',
      title: 'Main Image',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'gallery',
      title: 'Gallery',
      type: 'array',
      of: [{ type: 'image', options: { hotspot: true } }],
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'reference',
      to: [{ type: 'category' }],
    }),
    defineField({
      name: 'featured',
      title: 'Featured',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'discountPrice',
      title: 'Discount Price (AED)',
      type: 'number',
      description: 'If set, the original price shows crossed out and this is displayed as the current price.',
    }),
    defineField({
      name: 'popularBadge',
      title: 'Show "Popular" Badge',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'preparationNotes',
      title: 'Preparation Notes',
      type: 'text',
      description: 'What should the customer know before arriving for this service?',
    }),
    defineField({
      name: 'addOns',
      title: 'Add-ons',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'name', title: 'Name', type: 'string' },
            { name: 'price', title: 'Price (AED)', type: 'number' },
            { name: 'duration', title: 'Duration (e.g. 15 min)', type: 'string' },
          ],
        },
      ],
    }),
    defineField({
      name: 'seoTitle',
      title: 'SEO Title',
      type: 'string',
      group: 'seo',
    }),
    defineField({
      name: 'seoDescription',
      title: 'SEO Description',
      type: 'text',
      group: 'seo',
    }),
  ],
  groups: [{ name: 'seo', title: 'SEO' }],
})
