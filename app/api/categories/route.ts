import { NextResponse } from 'next/server'
import { getCategories } from '@/lib/api/fetchers'

export async function GET() {
  try {
    const categories = await getCategories()
    return NextResponse.json({
      data: categories,
      error: null,
      meta: { count: categories.length },
    })
  } catch (error) {
    return NextResponse.json(
      { data: null, error: 'Failed to fetch categories' },
      { status: 500 },
    )
  }
}
