import { defineField, defineType } from 'sanity'

export const bookingSchema = defineType({
  name: 'booking',
  title: 'Booking',
  type: 'document',
  fields: [
    defineField({
      name: 'bookingRef',
      title: 'Booking Reference',
      type: 'string',
    }),
    defineField({
      name: 'customerName',
      title: 'Customer Name',
      type: 'string',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'customerEmail',
      title: 'Email',
      type: 'string',
    }),
    defineField({
      name: 'customerPhone',
      title: 'Phone',
      type: 'string',
    }),
    defineField({
      name: 'service',
      title: 'Service',
      type: 'reference',
      to: [{ type: 'service' }],
    }),
    defineField({
      name: 'bookingDate',
      title: 'Date',
      type: 'date',
    }),
    defineField({
      name: 'timeSlot',
      title: 'Time Slot',
      type: 'string',
    }),
    defineField({
      name: 'notes',
      title: 'Notes',
      type: 'text',
    }),
    defineField({
      name: 'isHomeService',
      title: 'Home Service?',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'homeAddress',
      title: 'Home Address',
      type: 'text',
    }),
    defineField({
      name: 'status',
      title: 'Status',
      type: 'string',
      options: {
        list: ['pending', 'confirmed', 'cancelled'],
        layout: 'radio',
      },
      initialValue: 'pending',
    }),
    defineField({
      name: 'createdAt',
      title: 'Created At',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
    }),
  ],
})
