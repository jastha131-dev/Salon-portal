import { NextResponse } from 'next/server'
import { getReviewSummary } from '@/lib/api/fetchers'

export async function GET() {
  try {
    const summary = await getReviewSummary()
    return NextResponse.json({ data: summary, error: null })
  } catch (error) {
    return NextResponse.json(
      { data: null, error: 'Failed to fetch review summary' },
      { status: 500 },
    )
  }
}
