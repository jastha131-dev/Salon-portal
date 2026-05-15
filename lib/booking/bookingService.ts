import { writeClient } from '@/lib/sanity/client'
import type { Booking } from '@/types'

export interface BookingDoc {
  _type: 'booking'
  bookingRef: string
  customerName: string
  customerEmail: string
  customerPhone: string
  customerWhatsApp: string
  service?: { _type: 'reference'; _ref: string }
  bookingDate: string
  timeSlot: string
  notes: string
  isHomeService: boolean
  homeAddress: string
  area: string
  isAnyStaff: boolean
  staff?: { _type: 'reference'; _ref: string }
  branch?: { _type: 'reference'; _ref: string }
  addOns: Array<{ name: string; price: number }>
  paymentMethod: string
  paymentStatus: 'pending'
  totalPrice: number
  status: 'pending'
  createdAt: string
}

export function buildBookingDoc(booking: Partial<Booking>, bookingRef: string): BookingDoc {
  const doc: BookingDoc = {
    _type: 'booking',
    bookingRef,
    customerName: booking.customerName!,
    customerEmail: booking.customerEmail || '',
    customerPhone: booking.customerPhone!,
    customerWhatsApp: booking.customerWhatsApp || '',
    bookingDate: booking.bookingDate!,
    timeSlot: booking.timeSlot!,
    notes: booking.notes || '',
    isHomeService: booking.isHomeService ?? false,
    homeAddress: booking.isHomeService ? (booking.homeAddress || '') : '',
    area: booking.isHomeService ? (booking.area || '') : '',
    isAnyStaff: booking.isAnyStaff ?? true,
    addOns: (booking.selectedAddOns || []).map(({ name, price }) => ({ name, price })),
    paymentMethod: booking.paymentMethod || 'cash',
    paymentStatus: 'pending',
    totalPrice: booking.totalPrice || 0,
    status: 'pending',
    createdAt: new Date().toISOString(),
  }

  if (booking.serviceId) {
    doc.service = { _type: 'reference', _ref: booking.serviceId }
  }

  if (booking.staffId && !booking.isAnyStaff) {
    doc.staff = { _type: 'reference', _ref: booking.staffId }
  }

  if (booking.branchId) {
    doc.branch = { _type: 'reference', _ref: booking.branchId }
  }

  return doc
}

export interface CreateBookingResult {
  id: string
  bookingRef: string
}

function generateBookingRef(): string {
  return 'BK' + Date.now().toString(36).toUpperCase() + Math.random().toString(36).slice(2, 6).toUpperCase()
}

export async function createBooking(booking: Partial<Booking>): Promise<CreateBookingResult> {
  const bookingRef = booking.bookingRef?.trim() || generateBookingRef()
  const doc = buildBookingDoc(booking, bookingRef)
  const result = await writeClient.create(doc)
  return { id: result._id, bookingRef }
}
