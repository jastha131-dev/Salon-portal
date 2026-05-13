import { NextResponse } from 'next/server'
import { getSiteSettings } from '@/lib/api/fetchers'

export async function GET() {
  try {
    const settings = await getSiteSettings()
    return NextResponse.json({ data: settings, error: null })
  } catch (error) {
    return NextResponse.json(
      { data: null, error: 'Failed to fetch site settings' },
      { status: 500 },
    )
  }
}
