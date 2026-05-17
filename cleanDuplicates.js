import { createClient } from 'next-sanity'
import dotenv from 'dotenv'
import path from 'path'

dotenv.config({ path: path.resolve(process.cwd(), '.env') })

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-01-01',
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
})

async function clean() {
  console.log('🧹 Cleaning duplicates...\n')

  // ── 1. Categories ────────────────────────────────────────────────
  const cats = await client.fetch(`*[_type == "category"] | order(_createdAt asc) { _id, "slug": slug.current }`)
  const catKeep = new Map()   // slug → _id to keep
  const catDelete = []         // _ids to delete

  for (const c of cats) {
    if (!c.slug) continue
    if (!catKeep.has(c.slug)) catKeep.set(c.slug, c._id)
    else catDelete.push({ id: c._id, slug: c.slug })
  }
  console.log(`Categories: keeping ${catKeep.size}, removing ${catDelete.length} duplicate(s)`)

  // ── 2. Services ──────────────────────────────────────────────────
  const svcs = await client.fetch(`*[_type == "service"] | order(_createdAt asc) { _id, "slug": slug.current, "catId": category._ref }`)
  const svcKeep = new Map()
  const svcDelete = []

  for (const s of svcs) {
    if (!s.slug) continue
    if (!svcKeep.has(s.slug)) svcKeep.set(s.slug, s._id)
    else svcDelete.push(s._id)
  }
  console.log(`Services:   keeping ${svcKeep.size}, removing ${svcDelete.length} duplicate(s)`)

  // Delete duplicate services first (they reference categories)
  for (const id of svcDelete) {
    await client.delete(id)
    console.log(`  🗑  service ${id}`)
  }

  // ── 3. Patch kept services to point to the KEPT category ─────────
  // Re-fetch kept services to check their category refs
  const keptSvcs = await client.fetch(`*[_type == "service"] { _id, "slug": slug.current, "catId": category._ref }`)
  const dupCatIds = new Set(catDelete.map(c => c.id))

  for (const svc of keptSvcs) {
    if (dupCatIds.has(svc.catId)) {
      // Find which slug this duplicate category has
      const dupCat = catDelete.find(c => c.id === svc.catId)
      if (dupCat) {
        const correctId = catKeep.get(dupCat.slug)
        if (correctId) {
          await client.patch(svc._id).set({ category: { _type: 'reference', _ref: correctId } }).commit()
          console.log(`  🔗 re-pointed service ${svc.slug} → category ${dupCat.slug}`)
        }
      }
    }
  }

  // Now delete duplicate categories (no more references)
  for (const { id } of catDelete) {
    await client.delete(id)
    console.log(`  🗑  category ${id}`)
  }

  // ── 4. Plans ─────────────────────────────────────────────────────
  const plans = await client.fetch(`*[_type == "plan"] | order(_createdAt asc) { _id, "slug": slug.current }`)
  const planSeen = new Map()
  let planDeleted = 0
  for (const p of plans) {
    if (!p.slug) continue
    if (!planSeen.has(p.slug)) planSeen.set(p.slug, p._id)
    else { await client.delete(p._id); console.log(`  🗑  plan ${p.slug}`); planDeleted++ }
  }
  console.log(`Plans:      keeping ${planSeen.size}, removed ${planDeleted} duplicate(s)`)

  // ── 5. Reviews ───────────────────────────────────────────────────
  const reviews = await client.fetch(`*[_type == "review"] | order(_createdAt asc) { _id, customerName }`)
  const revSeen = new Map()
  let revDeleted = 0
  for (const r of reviews) {
    if (!r.customerName) continue
    if (!revSeen.has(r.customerName)) revSeen.set(r.customerName, r._id)
    else { await client.delete(r._id); console.log(`  🗑  review by ${r.customerName}`); revDeleted++ }
  }
  console.log(`Reviews:    keeping ${revSeen.size}, removed ${revDeleted} duplicate(s)`)

  // ── 6. Team members ──────────────────────────────────────────────
  const team = await client.fetch(`*[_type == "teamMember"] | order(_createdAt asc) { _id, name }`)
  const teamSeen = new Map()
  let teamDeleted = 0
  for (const m of team) {
    if (!m.name) continue
    if (!teamSeen.has(m.name)) teamSeen.set(m.name, m._id)
    else { await client.delete(m._id); console.log(`  🗑  teamMember ${m.name}`); teamDeleted++ }
  }
  console.log(`Team:       keeping ${teamSeen.size}, removed ${teamDeleted} duplicate(s)`)

  console.log('\n✅ Done!')
}

clean().catch(err => { console.error('Failed:', err.message); process.exit(1) })
