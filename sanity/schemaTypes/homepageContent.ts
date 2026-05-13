import { defineField, defineType } from 'sanity'

export const homepageContentSchema = defineType({
  name: 'homepageContent',
  title: 'Homepage Content',
  type: 'document',
  fields: [
    defineField({
      name: 'heroHeadline',
      title: 'Hero Headline',
      type: 'string',
    }),
    defineField({
      name: 'heroSubheadline',
      title: 'Hero Subheadline',
      type: 'string',
    }),
    defineField({
      name: 'heroImage',
      title: 'Hero Image',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'heroVideoUrl',
      title: 'Hero Video URL (optional)',
      type: 'url',
    }),
    defineField({
      name: 'ctaText',
      title: 'CTA Button Text',
      type: 'string',
    }),
    defineField({
      name: 'ctaLink',
      title: 'CTA Link',
      type: 'string',
    }),
    defineField({
      name: 'featuredServicesTitle',
      title: 'Featured Services Title',
      type: 'string',
    }),
    defineField({
      name: 'aboutTeaserText',
      title: 'About Teaser Text',
      type: 'array',
      of: [{ type: 'block' }],
    }),
    defineField({
      name: 'aboutTeaserImage',
      title: 'About Teaser Image',
      type: 'image',
      options: { hotspot: true },
    }),
  ],
})
