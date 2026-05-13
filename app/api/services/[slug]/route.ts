import { NextRequest, NextResponse } from 'next/server'
import { getServiceBySlug } from '@/lib/api/fetchers'

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> },
) {
  try {
    const { slug } = await params
    const service = await getServiceBySlug(slug)
    if (!service) {
      return NextResponse.json(
        { data: null, error: 'Service not found' },
        { status: 404 },
      )
    }
    return NextResponse.json({ data: service, error: null })
  } catch (error) {
    return NextResponse.json(
      { data: null, error: 'Failed to fetch service' },
      { status: 500 },
    )
  }
}
