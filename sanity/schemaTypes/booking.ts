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
    defineField({
      name: 'staff',
      title: 'Staff Member',
      type: 'reference',
      to: [{ type: 'teamMember' }],
      description: 'Leave empty if "Any Available Staff" was selected.',
    }),
    defineField({
      name: 'isAnyStaff',
      title: 'Any Available Staff',
      type: 'boolean',
      initialValue: true,
    }),
    defineField({
      name: 'branch',
      title: 'Branch',
      type: 'reference',
      to: [{ type: 'branch' }],
    }),
    defineField({
      name: 'area',
      title: 'Area / District (Home Service)',
      type: 'string',
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
          ],
        },
      ],
    }),
    defineField({
      name: 'paymentMethod',
      title: 'Payment Method',
      type: 'string',
      options: {
        list: [
          { title: 'Cash', value: 'cash' },
          { title: 'Card on Arrival', value: 'card' },
          { title: 'Online', value: 'online' },
        ],
        layout: 'radio',
      },
      initialValue: 'cash',
    }),
    defineField({
      name: 'paymentStatus',
      title: 'Payment Status',
      type: 'string',
      options: {
        list: [
          { title: 'Pending', value: 'pending' },
          { title: 'Paid', value: 'paid' },
          { title: 'Refunded', value: 'refunded' },
        ],
        layout: 'radio',
      },
      initialValue: 'pending',
    }),
    defineField({
      name: 'customerWhatsApp',
      title: 'WhatsApp Number',
      type: 'string',
    }),
    defineField({
      name: 'totalPrice',
      title: 'Total Price (AED)',
      type: 'number',
    }),
  ],
})
