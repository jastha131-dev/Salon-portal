import { NextRequest, NextResponse } from 'next/server'
import { client } from '@/lib/sanity/client'
import { computeAvailability } from '@/lib/booking/availabilityService'

const DATE_REGEX = /^\d{4}-\d{2}-\d{2}$/

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params
  const { searchParams } = new URL(request.url)
  const date = searchParams.get('date')

  if (!date || !DATE_REGEX.test(date)) {
    return NextResponse.json(
      { data: null, error: 'Valid date required (YYYY-MM-DD)' },
      { status: 400 },
    )
  }

  try {
    const [staff, bookings] = await Promise.all([
      client.fetch<{ workingHours: any[]; blockedDates: string[] } | null>(
        `*[_type == "teamMember" && _id == $id][0] { workingHours, blockedDates }`,
        { id },
      ),
      client.fetch<{ timeSlot: string }[]>(
        `*[_type == "booking" && bookingDate == $date && staff._ref == $id && status != "cancelled"] { timeSlot }`,
        { date, id },
      ),
    ])

    if (!staff) {
      return NextResponse.json({ data: null, error: 'Staff member not found' }, { status: 404 })
    }

    const bookedSlots = bookings.map((b) => b.timeSlot)
    const slots = computeAvailability({
      date,
      bookedSlots,
      workingHours: staff.workingHours || [],
      blockedDates: staff.blockedDates || [],
    })

    return NextResponse.json({
      data: { date, slots, bookedSlots },
      error: null,
      meta: { total: slots.length, available: slots.filter((s) => s.available).length },
    })
  } catch {
    return NextResponse.json({ data: null, error: 'Failed to fetch availability' }, { status: 500 })
  }
}
