import { NextRequest, NextResponse } from 'next/server'
import { client } from '@/lib/sanity/client'

export async function GET(request: NextRequest) {
  const q = request.nextUrl.searchParams.get('q')?.trim()
  if (!q || q.length < 2) return NextResponse.json({ services: [], team: [] })

  const pattern = `*${q}*`

  const [services, team] = await Promise.all([
    client.fetch(
      `*[_type == "service" && (name match $p || pt::text(description) match $p)] | order(name asc) [0...8] {
        _id, name, slug, price, duration,
        "category": category->{ name, slug }
      }`,
      { p: pattern },
    ),
    client.fetch(
      `*[_type == "teamMember" && (name match $p || role match $p)] | order(name asc) [0...5] {
        _id, name, role, slug
      }`,
      { p: pattern },
    ),
  ])

  return NextResponse.json({ services, team })
}
