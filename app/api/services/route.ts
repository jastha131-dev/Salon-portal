import { NextRequest, NextResponse } from 'next/server'
import { getServices } from '@/lib/api/fetchers'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const category = searchParams.get('category') || undefined
    const services = await getServices(category)
    return NextResponse.json({
      data: services,
      error: null,
      meta: { count: services.length },
    })
  } catch (error) {
    return NextResponse.json(
      { data: null, error: 'Failed to fetch services' },
      { status: 500 },
    )
  }
}
