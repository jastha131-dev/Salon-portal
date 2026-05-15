import { describe, it, expect } from 'vitest'
import { buildBookingDoc } from '../bookingService'
import type { Booking } from '@/types'

const baseBooking: Partial<Booking> = {
  customerName: 'Sara Ahmed',
  customerEmail: 'sara@example.com',
  customerPhone: '+971501234567',
  serviceId: 'svc123',
  serviceName: 'Balayage',
  servicePrice: 450,
  selectedAddOns: [],
  isAnyStaff: true,
  isHomeService: false,
  bookingDate: '2026-06-15',
  timeSlot: '10:00',
  paymentMethod: 'cash',
}

describe('buildBookingDoc', () => {
  it('builds correct doc for in-salon any-staff booking', () => {
    const doc = buildBookingDoc(baseBooking, 'BK-TEST-001')
    expect(doc._type).toBe('booking')
    expect(doc.bookingRef).toBe('BK-TEST-001')
    expect(doc.customerName).toBe('Sara Ahmed')
    expect(doc.service).toEqual({ _type: 'reference', _ref: 'svc123' })
    expect(doc.isAnyStaff).toBe(true)
    expect(doc.staff).toBeUndefined()
    expect(doc.isHomeService).toBe(false)
    expect(doc.homeAddress).toBe('')
    expect(doc.paymentStatus).toBe('pending')
    expect(doc.status).toBe('pending')
  })

  it('includes staff reference when specific staff chosen', () => {
    const doc = buildBookingDoc(
      { ...baseBooking, staffId: 'staff456', staffName: 'Leila', isAnyStaff: false },
      'BK-TEST-002',
    )
    expect(doc.staff).toEqual({ _type: 'reference', _ref: 'staff456' })
    expect(doc.isAnyStaff).toBe(false)
  })

  it('includes branch reference when branch selected', () => {
    const doc = buildBookingDoc({ ...baseBooking, branchId: 'br789' }, 'BK-TEST-003')
    expect(doc.branch).toEqual({ _type: 'reference', _ref: 'br789' })
  })

  it('includes home address and area for home service', () => {
    const doc = buildBookingDoc(
      { ...baseBooking, isHomeService: true, homeAddress: '12 Marina Walk', area: 'Dubai Marina' },
      'BK-TEST-004',
    )
    expect(doc.isHomeService).toBe(true)
    expect(doc.homeAddress).toBe('12 Marina Walk')
    expect(doc.area).toBe('Dubai Marina')
  })

  it('clears homeAddress when not home service', () => {
    const doc = buildBookingDoc({ ...baseBooking, isHomeService: false, homeAddress: 'ignored' }, 'BK-TEST-005')
    expect(doc.homeAddress).toBe('')
  })

  it('includes add-ons when present', () => {
    const addOns = [{ _key: 'k1', name: 'Protein Treatment', price: 80 }]
    const doc = buildBookingDoc({ ...baseBooking, selectedAddOns: addOns }, 'BK-TEST-006')
    expect(doc.addOns).toHaveLength(1)
    expect(doc.addOns[0].name).toBe('Protein Treatment')
  })
})
