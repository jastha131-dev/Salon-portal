import { NextResponse } from 'next/server'
import { getBranches } from '@/lib/api/fetchers'

export async function GET() {
  try {
    const branches = await getBranches()
    return NextResponse.json({ data: branches, error: null, meta: { count: branches.length } })
  } catch {
    return NextResponse.json({ data: null, error: 'Failed to fetch branches' }, { status: 500 })
  }
}
