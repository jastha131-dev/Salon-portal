import type { Metadata } from 'next'
import { getPlans } from '@/lib/api/fetchers'
import PlansPageClient from './PlansPageClient'
import type { Plan } from '@/types'

export const metadata: Metadata = {
  title: 'Membership Plans | Lumière Beauty Salon Dubai',
  description: 'Choose a Lumière membership plan and enjoy priority booking, exclusive perks, and savings on every visit.',
}
export const revalidate = 3600

const fallbackPlans: Plan[] = [
  {
    _id: 'essential',
    name: 'Essential',
    slug: { current: 'essential' },
    tagline: 'The perfect start to your beauty journey',
    monthlyPrice: 299,
    yearlyPrice: 2990,
    highlight: '1 visit / month',
    badge: '',
    popular: false,
    color: 'charcoal',
    features: [
      { text: '1 service visit per month',       included: true  },
      { text: 'Haircut & blowdry included',      included: true  },
      { text: '10% discount on add-on services', included: true  },
      { text: 'Priority appointment booking',    included: true  },
      { text: 'Welcome gift bag',                included: true  },
      { text: 'Nail services',                   included: false },
      { text: 'Spa & wellness treatments',       included: false },
      { text: 'Home service visits',             included: false },
    ],
    ctaText: 'Start Essential',
    ctaLink: '/booking',
    order: 1,
  },
  {
    _id: 'luxe',
    name: 'Luxe',
    slug: { current: 'luxe' },
    tagline: 'Our most popular plan for beauty lovers',
    monthlyPrice: 599,
    yearlyPrice: 5990,
    highlight: '3 visits / month',
    badge: 'Most Popular',
    popular: true,
    color: 'rose',
    features: [
      { text: '3 service visits per month',            included: true  },
      { text: 'All hair & nail services',              included: true  },
      { text: '20% discount on additional services',   included: true  },
      { text: 'VIP priority booking',                  included: true  },
      { text: 'Monthly complimentary scalp treatment', included: true  },
      { text: 'Birthday luxury treatment',             included: true  },
      { text: 'Dedicated stylist consultation',        included: true  },
      { text: 'Home service visits',                   included: false },
    ],
    ctaText: 'Start Luxe',
    ctaLink: '/booking',
    order: 2,
  },
  {
    _id: 'royal',
    name: 'Royal',
    slug: { current: 'royal' },
    tagline: 'Unlimited luxury — the full Lumière experience',
    monthlyPrice: 999,
    yearlyPrice: 9490,
    highlight: 'Unlimited visits',
    badge: 'Best Value',
    popular: false,
    color: 'gold',
    features: [
      { text: 'Unlimited service visits',              included: true },
      { text: 'All services including spa & wellness', included: true },
      { text: '30% discount on all extra services',    included: true },
      { text: 'Personal dedicated stylist',            included: true },
      { text: '1 home service visit per month',        included: true },
      { text: 'Birthday luxury package',               included: true },
      { text: 'Exclusive member events & previews',    included: true },
      { text: 'Personal beauty consultation',          included: true },
    ],
    ctaText: 'Go Royal',
    ctaLink: '/booking',
    order: 3,
  },
]

export default async function PlansPage() {
  const fetched = await getPlans()
  const plans   = fetched.length > 0 ? fetched : fallbackPlans

  return <PlansPageClient plans={plans} />
}
