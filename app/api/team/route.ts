import { NextResponse } from 'next/server'
import { getTeam } from '@/lib/api/fetchers'

export async function GET() {
  try {
    const team = await getTeam()
    return NextResponse.json({
      data: team,
      error: null,
      meta: { count: team.length },
    })
  } catch (error) {
    return NextResponse.json(
      { data: null, error: 'Failed to fetch team' },
      { status: 500 },
    )
  }
}
