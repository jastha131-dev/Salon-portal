import { defineField, defineType } from 'sanity'

export const teamMemberSchema = defineType({
  name: 'teamMember',
  title: 'Team Member',
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
    }),
    defineField({
      name: 'role',
      title: 'Role',
      type: 'string',
    }),
    defineField({
      name: 'expertise',
      title: 'Expertise',
      type: 'array',
      of: [{ type: 'string' }],
    }),
    defineField({
      name: 'bio',
      title: 'Bio',
      type: 'array',
      of: [{ type: 'block' }],
    }),
    defineField({
      name: 'image',
      title: 'Photo',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'socialLinks',
      title: 'Social Links',
      type: 'object',
      fields: [
        { name: 'instagram', type: 'url', title: 'Instagram' },
        { name: 'facebook', type: 'url', title: 'Facebook' },
        { name: 'tiktok', type: 'url', title: 'TikTok' },
      ],
    }),
    defineField({
      name: 'rating',
      title: 'Rating (0–5)',
      type: 'number',
      initialValue: 5,
      validation: (r) => r.min(0).max(5),
    }),
    defineField({
      name: 'experienceYears',
      title: 'Years of Experience',
      type: 'number',
      initialValue: 1,
      validation: (r) => r.min(0),
    }),
    defineField({
      name: 'isActive',
      title: 'Active / Bookable',
      type: 'boolean',
      initialValue: true,
      description: 'Only active staff appear in the booking wizard.',
    }),
    defineField({
      name: 'workingHours',
      title: 'Working Hours',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'day',
              title: 'Day',
              type: 'string',
              options: {
                list: [
                  { title: 'Monday', value: 'monday' },
                  { title: 'Tuesday', value: 'tuesday' },
                  { title: 'Wednesday', value: 'wednesday' },
                  { title: 'Thursday', value: 'thursday' },
                  { title: 'Friday', value: 'friday' },
                  { title: 'Saturday', value: 'saturday' },
                  { title: 'Sunday', value: 'sunday' },
                ],
                layout: 'dropdown',
              },
            },
            { name: 'startTime', title: 'Start Time (HH:MM, 24-hour)', type: 'string' },
            { name: 'endTime', title: 'End Time (HH:MM, 24-hour)', type: 'string' },
          ],
        },
      ],
    }),
    defineField({
      name: 'blockedDates',
      title: 'Blocked Dates (Leave / Holiday)',
      type: 'array',
      of: [{ type: 'date' }],
      description: 'Dates when this staff member is unavailable. Format: YYYY-MM-DD.',
    }),
  ],
})
