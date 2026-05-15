import { defineField, defineType } from 'sanity'

export const branchSchema = defineType({
  name: 'branch',
  title: 'Branch',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Branch Name',
      type: 'string',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'address',
      title: 'Address',
      type: 'text',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'phone',
      title: 'Phone Number',
      type: 'string',
    }),
    defineField({
      name: 'mapUrl',
      title: 'Google Maps URL',
      type: 'url',
    }),
    defineField({
      name: 'image',
      title: 'Branch Photo',
      type: 'image',
      options: { hotspot: true },
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
            { name: 'startTime', title: 'Start Time (HH:MM)', type: 'string' },
            { name: 'endTime', title: 'End Time (HH:MM)', type: 'string' },
            { name: 'closed', title: 'Closed This Day', type: 'boolean', initialValue: false },
          ],
        },
      ],
    }),
    defineField({
      name: 'displayOrder',
      title: 'Display Order',
      type: 'number',
      initialValue: 0,
    }),
  ],
})
