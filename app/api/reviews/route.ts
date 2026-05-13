import { NextRequest, NextResponse } from 'next/server'
import { getReviews } from '@/lib/api/fetchers'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const featured = searchParams.get('featured') === 'true'
    const limit = Math.max(1, parseInt(searchParams.get('limit') || '50', 10))

    const reviews = await getReviews({ featured })
    const total = reviews.length
    const limited = reviews.slice(0, limit)

    return NextResponse.json({
      data: limited,
      error: null,
      meta: { count: limited.length, total },
    })
  } catch (error) {
    return NextResponse.json(
      { data: null, error: 'Failed to fetch reviews' },
      { status: 500 },
    )
  }
}
