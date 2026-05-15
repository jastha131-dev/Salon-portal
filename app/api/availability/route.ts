import { NextRequest, NextResponse } from 'next/server'
import { client } from '@/lib/sanity/client'
import { computeAvailability } from '@/lib/booking/availabilityService'

const DATE_REGEX = /^\d{4}-\d{2}-\d{2}$/

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const date = searchParams.get('date')

  if (!date) {
    return NextResponse.json({ data: null, error: 'Date parameter required' }, { status: 400 })
  }
  if (!DATE_REGEX.test(date)) {
    return NextResponse.json({ data: null, error: 'Invalid date format. Use YYYY-MM-DD' }, { status: 400 })
  }

  try {
    const bookings = await client.fetch<{ timeSlot: string }[]>(
      `*[_type == "booking" && bookingDate == $date && status != "cancelled"] { timeSlot }`,
      { date },
    )

    const bookedSlots = bookings.map((b) => b.timeSlot)
    const slots = computeAvailability({ date, bookedSlots })

    return NextResponse.json({
      data: { date, slots, bookedSlots },
      error: null,
      meta: { total: slots.length, available: slots.filter((s) => s.available).length, booked: bookedSlots.length },
    })
  } catch {
    return NextResponse.json({ data: null, error: 'Failed to fetch availability' }, { status: 500 })
  }
}
