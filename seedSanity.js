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

const categories = [
  { _type: 'category', name: 'Hair', slug: { _type: 'slug', current: 'hair' }, icon: 'Scissors', description: 'Hair styling and treatments.', displayOrder: 1 },
  { _type: 'category', name: 'Nails', slug: { _type: 'slug', current: 'nails' }, icon: 'Sparkles', description: 'Manicure and pedicure services.', displayOrder: 2 },
  { _type: 'category', name: 'Spa', slug: { _type: 'slug', current: 'spa' }, icon: 'Leaf', description: 'Relaxing spa treatments.', displayOrder: 3 },
  { _type: 'category', name: 'Makeup', slug: { _type: 'slug', current: 'makeup' }, icon: 'Brush', description: 'Professional makeup services.', displayOrder: 4 },
  { _type: 'category', name: 'Eyebrows & Lashes', slug: { _type: 'slug', current: 'eyebrows-lashes' }, icon: 'Eye', description: 'Brow shaping and lash treatments.', displayOrder: 5 },
]

const services = [
  { _type: 'service', name: 'Luxury Haircut & Blowdry', slug: { _type: 'slug', current: 'luxury-haircut-blowdry' }, price: 120, duration: '60 min', featured: true, popularBadge: true },
  { _type: 'service', name: 'Hair Coloring', slug: { _type: 'slug', current: 'hair-coloring' }, price: 250, duration: '120 min', featured: true },
  { _type: 'service', name: 'Keratin Treatment', slug: { _type: 'slug', current: 'keratin-treatment' }, price: 400, duration: '180 min', featured: false },
  { _type: 'service', name: 'Classic Manicure', slug: { _type: 'slug', current: 'classic-manicure' }, price: 60, duration: '45 min', featured: true },
  { _type: 'service', name: 'Gel Nails', slug: { _type: 'slug', current: 'gel-nails' }, price: 90, duration: '60 min', featured: false },
  { _type: 'service', name: 'Pedicure', slug: { _type: 'slug', current: 'pedicure' }, price: 70, duration: '60 min', featured: false },
  { _type: 'service', name: 'Aromatherapy Massage', slug: { _type: 'slug', current: 'aromatherapy-massage' }, price: 180, duration: '90 min', featured: true },
  { _type: 'service', name: 'Deep Tissue Massage', slug: { _type: 'slug', current: 'deep-tissue-massage' }, price: 200, duration: '90 min', featured: false },
  { _type: 'service', name: 'Bridal Makeup', slug: { _type: 'slug', current: 'bridal-makeup' }, price: 350, duration: '120 min', featured: true },
  { _type: 'service', name: 'Party Makeup', slug: { _type: 'slug', current: 'party-makeup' }, price: 180, duration: '60 min', featured: false },
  { _type: 'service', name: 'Eyebrow Threading & Tint', slug: { _type: 'slug', current: 'eyebrow-threading-tint' }, price: 80, duration: '30 min', featured: false },
  { _type: 'service', name: 'Lash Lift & Tint', slug: { _type: 'slug', current: 'lash-lift-tint' }, price: 150, duration: '60 min', featured: true },
]

const reviews = [
  { _type: 'review', customerName: 'Emily R.', rating: 5, comment: 'Absolutely loved my haircut! The staff is amazing and the salon is so beautiful.', featured: true, verified: true, publishedAt: new Date().toISOString() },
  { _type: 'review', customerName: 'Sarah M.', rating: 5, comment: 'Best manicure I have ever had. Will definitely be coming back!', featured: true, verified: true, publishedAt: new Date().toISOString() },
  { _type: 'review', customerName: 'Aisha K.', rating: 5, comment: 'The bridal makeup was absolutely stunning. I felt like a queen on my wedding day!', featured: true, verified: true, publishedAt: new Date().toISOString() },
  { _type: 'review', customerName: 'Michael T.', rating: 4, comment: 'Great service and friendly staff. The massage was very relaxing.', featured: false, verified: true, publishedAt: new Date().toISOString() },
  { _type: 'review', customerName: 'Priya S.', rating: 5, comment: 'The lash lift changed my life! So professional and clean.', featured: true, verified: true, publishedAt: new Date().toISOString() },
  { _type: 'review', customerName: 'Fatima A.', rating: 5, comment: 'My go-to salon in Dubai. Every visit is a luxury experience.', featured: true, verified: true, publishedAt: new Date().toISOString() },
]

const plans = [
  {
    _type: 'plan',
    name: 'Essential',
    slug: { _type: 'slug', current: 'essential' },
    tagline: 'The perfect start to your beauty journey',
    monthlyPrice: 299,
    yearlyPrice: 2990,
    highlight: '1 visit / month',
    badge: '',
    popular: false,
    color: 'charcoal',
    features: [
      { _key: 'f1', text: '1 service visit per month',           included: true  },
      { _key: 'f2', text: 'Haircut & blowdry included',          included: true  },
      { _key: 'f3', text: '10% discount on add-on services',     included: true  },
      { _key: 'f4', text: 'Priority appointment booking',         included: true  },
      { _key: 'f5', text: 'Welcome gift bag',                     included: true  },
      { _key: 'f6', text: 'Nail services',                        included: false },
      { _key: 'f7', text: 'Spa & wellness treatments',            included: false },
      { _key: 'f8', text: 'Home service visits',                  included: false },
    ],
    ctaText: 'Start Essential',
    ctaLink: '/booking',
    order: 1,
  },
  {
    _type: 'plan',
    name: 'Luxe',
    slug: { _type: 'slug', current: 'luxe' },
    tagline: 'Our most popular plan for beauty lovers',
    monthlyPrice: 599,
    yearlyPrice: 5990,
    highlight: '3 visits / month',
    badge: 'Most Popular',
    popular: true,
    color: 'rose',
    features: [
      { _key: 'f1', text: '3 service visits per month',          included: true  },
      { _key: 'f2', text: 'All hair & nail services',            included: true  },
      { _key: 'f3', text: '20% discount on additional services', included: true  },
      { _key: 'f4', text: 'VIP priority booking',                included: true  },
      { _key: 'f5', text: 'Monthly complimentary scalp treatment',included: true  },
      { _key: 'f6', text: 'Birthday luxury treatment',           included: true  },
      { _key: 'f7', text: 'Dedicated stylist consultation',      included: true  },
      { _key: 'f8', text: 'Home service visits',                 included: false },
    ],
    ctaText: 'Start Luxe',
    ctaLink: '/booking',
    order: 2,
  },
  {
    _type: 'plan',
    name: 'Royal',
    slug: { _type: 'slug', current: 'royal' },
    tagline: 'Unlimited luxury — the full Lumière experience',
    monthlyPrice: 999,
    yearlyPrice: 9490,
    highlight: 'Unlimited visits',
    badge: 'Best Value',
    popular: false,
    color: 'gold',
    features: [
      { _key: 'f1', text: 'Unlimited service visits',            included: true  },
      { _key: 'f2', text: 'All services including spa & wellness',included: true  },
      { _key: 'f3', text: '30% discount on all extra services',  included: true  },
      { _key: 'f4', text: 'Personal dedicated stylist',          included: true  },
      { _key: 'f5', text: '1 home service visit per month',      included: true  },
      { _key: 'f6', text: 'Birthday luxury package',             included: true  },
      { _key: 'f7', text: 'Exclusive member events & previews',  included: true  },
      { _key: 'f8', text: 'Personal beauty consultation',        included: true  },
    ],
    ctaText: 'Go Royal',
    ctaLink: '/booking',
    order: 3,
  },
]

async function seed() {
  console.log('Seeding categories...')
  const createdCategories = []
  for (const cat of categories) {
    const created = await client.create(cat)
    createdCategories.push(created)
    console.log(`  ✓ Category: ${cat.name}`)
  }

  // Map category slug to its Sanity _id
  const catMap = {}
  createdCategories.forEach((c) => { catMap[c.slug.current] = c._id })

  const categoryForService = {
    'luxury-haircut-blowdry': 'hair', 'hair-coloring': 'hair', 'keratin-treatment': 'hair',
    'classic-manicure': 'nails', 'gel-nails': 'nails', 'pedicure': 'nails',
    'aromatherapy-massage': 'spa', 'deep-tissue-massage': 'spa',
    'bridal-makeup': 'makeup', 'party-makeup': 'makeup',
    'eyebrow-threading-tint': 'eyebrows-lashes', 'lash-lift-tint': 'eyebrows-lashes',
  }

  console.log('\nSeeding services...')
  for (const svc of services) {
    const catSlug = categoryForService[svc.slug.current]
    const doc = { ...svc }
    if (catSlug && catMap[catSlug]) {
      doc.category = { _type: 'reference', _ref: catMap[catSlug] }
    }
    await client.create(doc)
    console.log(`  ✓ Service: ${svc.name}`)
  }

  console.log('\nSeeding reviews...')
  for (const review of reviews) {
    await client.create(review)
    console.log(`  ✓ Review: ${review.customerName}`)
  }

  console.log('\nSeeding plans...')
  for (const plan of plans) {
    await client.create(plan)
    console.log(`  ✓ Plan: ${plan.name} — AED ${plan.monthlyPrice}/mo`)
  }

  console.log('\n✅ Seeding complete!')
}

seed().catch((err) => {
  console.error('Seed failed:', err.message)
  process.exit(1)
})
