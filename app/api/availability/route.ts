import { NextRequest, NextResponse } from 'next/server'
import { client } from '@/lib/sanity/client'
import type { TimeSlot } from '@/types'

// All possible time slots the salon offers (30-minute intervals, 9 AM – 8 PM)
const ALL_TIME_SLOTS: string[] = [
  '09:00', '09:30',
  '10:00', '10:30',
  '11:00', '11:30',
  '12:00', '12:30',
  '13:00', '13:30',
  '14:00', '14:30',
  '15:00', '15:30',
  '16:00', '16:30',
  '17:00', '17:30',
  '18:00', '18:30',
  '19:00', '19:30',
  '20:00',
]

// ISO 8601 date string (YYYY-MM-DD)
const DATE_REGEX = /^\d{4}-\d{2}-\d{2}$/

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const date = searchParams.get('date')

    if (!date) {
      return NextResponse.json(
        { data: null, error: 'Date parameter required' },
        { status: 400 },
      )
    }

    if (!DATE_REGEX.test(date)) {
      return NextResponse.json(
        { data: null, error: 'Invalid date format. Use YYYY-MM-DD' },
        { status: 400 },
      )
    }

    const bookings = await client.fetch<{ timeSlot: string }[]>(
      `*[_type == "booking" && bookingDate == $date && status != "cancelled"] { timeSlot }`,
      { date },
    )

    const bookedSlots = new Set(bookings.map((b) => b.timeSlot))

    const slots: TimeSlot[] = ALL_TIME_SLOTS.map((time) => ({
      time,
      available: !bookedSlots.has(time),
    }))

    return NextResponse.json({
      data: {
        date,
        slots,
        bookedSlots: Array.from(bookedSlots),
      },
      error: null,
      meta: {
        total: ALL_TIME_SLOTS.length,
        available: slots.filter((s) => s.available).length,
        booked: bookedSlots.size,
      },
    })
  } catch (error) {
    return NextResponse.json(
      { data: null, error: 'Failed to fetch availability' },
      { status: 500 },
    )
  }
}
