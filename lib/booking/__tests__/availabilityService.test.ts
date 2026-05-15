import { describe, it, expect } from 'vitest'
import { generateSlots, computeAvailability } from '../availabilityService'

describe('generateSlots', () => {
  it('generates 30-min slots from start to end (exclusive)', () => {
    expect(generateSlots('09:00', '11:00')).toEqual(['09:00', '09:30', '10:00', '10:30'])
  })

  it('returns single slot when only one interval fits', () => {
    expect(generateSlots('09:00', '09:30')).toEqual(['09:00'])
  })

  it('returns empty when start equals end', () => {
    expect(generateSlots('09:00', '09:00')).toEqual([])
  })
})

describe('computeAvailability', () => {
  it('returns all slots available when nothing booked', () => {
    const result = computeAvailability({ date: '2026-06-01', bookedSlots: [] })
    expect(result.every((s) => s.available)).toBe(true)
    expect(result.length).toBeGreaterThan(0)
  })

  it('marks booked slots as unavailable', () => {
    const result = computeAvailability({ date: '2026-06-01', bookedSlots: ['09:00', '09:30'] })
    expect(result.find((s) => s.time === '09:00')?.available).toBe(false)
    expect(result.find((s) => s.time === '09:30')?.available).toBe(false)
    expect(result.find((s) => s.time === '10:00')?.available).toBe(true)
  })

  it('returns empty array when date is in blockedDates', () => {
    const result = computeAvailability({
      date: '2026-06-01',
      bookedSlots: [],
      blockedDates: ['2026-06-01'],
    })
    expect(result).toHaveLength(0)
  })

  it('returns empty array when staff is closed on that day', () => {
    // 2026-06-01 is a Monday
    const result = computeAvailability({
      date: '2026-06-01',
      bookedSlots: [],
      workingHours: [{ day: 'monday', startTime: '09:00', endTime: '17:00', closed: true }],
    })
    expect(result).toHaveLength(0)
  })

  it('uses staff working hours when provided', () => {
    // 2026-06-01 is a Monday
    const result = computeAvailability({
      date: '2026-06-01',
      bookedSlots: [],
      workingHours: [{ day: 'monday', startTime: '10:00', endTime: '12:00' }],
    })
    expect(result.map((s) => s.time)).toEqual(['10:00', '10:30', '11:00', '11:30'])
  })

  it('returns default salon hours (09:00–20:00) when no workingHours provided', () => {
    const result = computeAvailability({ date: '2026-06-01', bookedSlots: [] })
    expect(result[0].time).toBe('09:00')
    expect(result[result.length - 1].time).toBe('19:30')
  })
})
