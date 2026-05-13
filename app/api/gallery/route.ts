import { NextRequest, NextResponse } from 'next/server'
import { getGallery } from '@/lib/api/fetchers'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const page = Math.max(1, parseInt(searchParams.get('page') || '1', 10))
    const limit = Math.min(100, Math.max(1, parseInt(searchParams.get('limit') || '20', 10)))

    const allImages = await getGallery()
    const total = allImages.length
    const pages = Math.ceil(total / limit)
    const start = (page - 1) * limit
    const paginated = allImages.slice(start, start + limit)

    return NextResponse.json({
      data: paginated,
      error: null,
      meta: { total, page, limit, pages },
    })
  } catch (error) {
    return NextResponse.json(
      { data: null, error: 'Failed to fetch gallery' },
      { status: 500 },
    )
  }
}
