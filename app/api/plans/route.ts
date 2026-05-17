import { NextResponse } from 'next/server'
import { getPlans } from '@/lib/api/fetchers'

export async function GET() {
  try {
    const plans = await getPlans()
    return NextResponse.json({ data: plans, error: null, meta: { count: plans.length } })
  } catch {
    return NextResponse.json({ data: null, error: 'Failed to fetch plans' }, { status: 500 })
  }
}
