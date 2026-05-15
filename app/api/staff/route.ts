import { NextResponse } from 'next/server'
import { getStaff } from '@/lib/api/fetchers'

export async function GET() {
  try {
    const staff = await getStaff()
    return NextResponse.json({ data: staff, error: null, meta: { count: staff.length } })
  } catch {
    return NextResponse.json({ data: null, error: 'Failed to fetch staff' }, { status: 500 })
  }
}
