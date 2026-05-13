import type { Metadata } from 'next'
import Link from 'next/link'
import { PageHero } from '@/components/layout/PageHero'
import { FadeIn } from '@/components/animations/FadeIn'
import { StaggerContainer, StaggerItem } from '@/components/animations/StaggerContainer'
import { ReviewCard } from '@/components/ui/ReviewCard'
import { StarRating } from '@/components/ui/StarRating'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { getReviews, getReviewSummary } from '@/lib/api/fetchers'
import type { Review, ReviewSummary } from '@/types'

export const metadata: Metadata = {
  title: 'Client Reviews | Lumière Salon Dubai',
  description:
    'Read verified client reviews for Lumière Salon Dubai — real experiences from real clients across hair, nails, makeup, and spa treatments.',
  openGraph: {
    title: 'Client Reviews | Lumière Salon Dubai',
    description:
      'See why Lumière is Dubai\'s most loved luxury beauty salon, with a 4.9-star average from hundreds of verified clients.',
    type: 'website',
  },
}

export const revalidate = 3600

// ── Fallback data ─────────────────────────────────────────────────────────────

const fallbackReviews: Review[] = [
  {
    _id: '1',
    customerName: 'Sarah Al Mansouri',
    rating: 5,
    comment:
      'The best salon experience I have ever had. The team is incredibly talented and the atmosphere is pure luxury. My hair transformation was beyond expectations!',
    featured: true,
    verified: true,
    publishedAt: '2024-03-15',
  },
  {
    _id: '2',
    customerName: 'Fatima Hassan',
    rating: 5,
    comment:
      'Been coming here for 3 years. They are consistent, professional, and genuinely care about your satisfaction. The nail art is always perfection.',
    featured: true,
    verified: true,
    publishedAt: '2024-02-28',
  },
  {
    _id: '3',
    customerName: 'Priya Sharma',
    rating: 5,
    comment:
      'Booked the bridal package and I am so happy I did. My wedding look was absolutely stunning — I felt like a queen. Thank you Lumière team!',
    featured: true,
    verified: true,
    publishedAt: '2024-02-10',
  },
  {
    _id: '4',
    customerName: 'Emma Williams',
    rating: 5,
    comment:
      'The home service is a game-changer! They came fully equipped and professional. Perfect for busy days when you cannot leave the house.',
    featured: true,
    verified: true,
    publishedAt: '2024-01-20',
  },
  {
    _id: '5',
    customerName: 'Layla Al Rashid',
    rating: 4,
    comment:
      'Always leave feeling pampered and beautiful. The facial treatment is absolutely divine. Highly recommend the deep cleansing option.',
    featured: false,
    verified: true,
    publishedAt: '2024-01-05',
  },
  {
    _id: '6',
    customerName: 'Sophie Martin',
    rating: 5,
    comment:
      'Discovered Lumière through a friend and now I am a regular. The staff knows your preferences without you having to repeat yourself. Love this place!',
    featured: false,
    verified: true,
    publishedAt: '2023-12-15',
  },
  {
    _id: '7',
    customerName: 'Aisha Mohammed',
    rating: 5,
    comment:
      'The henna and nail art combo I got for Eid was absolutely breathtaking. Every guest at the party complimented my look. Lumière never disappoints.',
    featured: false,
    verified: true,
    publishedAt: '2023-12-01',
  },
  {
    _id: '8',
    customerName: 'Natalia Ivanova',
    rating: 5,
    comment:
      'I drove 40 minutes from Abu Dhabi just for my hair appointment here. Completely worth it — the colour correction they did was flawless. Booked my next visit already.',
    featured: false,
    verified: true,
    publishedAt: '2023-11-18',
  },
  {
    _id: '9',
    customerName: 'Rania Khalil',
    rating: 4,
    comment:
      'The spa package is a full retreat. I spent three hours there and left feeling completely renewed. The hot stone massage is a must-try.',
    featured: false,
    verified: true,
    publishedAt: '2023-11-05',
  },
]

const fallbackSummary: ReviewSummary = {
  averageRating: 4.9,
  totalCount: 247,
  distribution: { 5: 210, 4: 25, 3: 8, 2: 3, 1: 1 },
}

// ── Stat highlights ──────────────────────────────────────────────────────────

const highlights = [
  { value: '4.9', label: 'Average Rating', sub: 'across all platforms' },
  { value: '247+', label: 'Verified Reviews', sub: 'and growing every week' },
  { value: '98%', label: 'Would Return', sub: 'based on client surveys' },
  { value: '5★', label: 'Google Rating', sub: 'Dubai Marina location' },
]

// ── Page ─────────────────────────────────────────────────────────────────────

export default async function ReviewsPage() {
  let reviews: Review[] = []
  let summary: ReviewSummary = fallbackSummary

  try {
    ;[reviews, summary] = await Promise.all([getReviews(), getReviewSummary()])
  } catch {
    /* silently fall back */
  }

  const displayReviews = reviews.length > 0 ? reviews : fallbackReviews
  const displaySummary = summary.totalCount > 0 ? summary : fallbackSummary

  const maxDistribution = Math.max(...Object.values(displaySummary.distribution))

  return (
    <>
      <PageHero
        eyebrow="Client Voices"
        title="What Our Clients Say"
        subtitle="Real reviews from real clients — see why Lumière is Dubai's most loved luxury beauty salon."
        dark
      />

      {/* ── Highlight stats strip ────────────────────────── */}
      <section className="bg-rose-primary py-10">
        <div className="container-luxury">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-white/20">
            {highlights.map((h) => (
              <div key={h.label} className="bg-rose-primary px-8 py-6 text-center">
                <p className="font-playfair text-4xl font-medium text-white mb-1">{h.value}</p>
                <p className="font-sans text-sm font-medium text-white mb-0.5">{h.label}</p>
                <p className="font-sans text-xs text-white/70">{h.sub}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Rating Summary ──────────────────────────────── */}
      <section className="py-16 md:py-24 bg-warm-white">
        <div className="container-luxury max-w-4xl">
          <FadeIn>
            <div className="flex flex-col md:flex-row items-center gap-10 md:gap-16 p-10 md:p-16 bg-cream-bg shadow-card">

              {/* Big score */}
              <div className="text-center flex-shrink-0">
                <p className="font-playfair text-[6rem] font-medium text-charcoal leading-none tracking-tight">
                  {displaySummary.averageRating.toFixed(1)}
                </p>
                <div className="flex justify-center mt-2 mb-3">
                  <StarRating rating={displaySummary.averageRating} size="lg" />
                </div>
                <p className="font-sans text-sm text-muted">
                  Based on{' '}
                  <span className="font-medium text-charcoal">
                    {displaySummary.totalCount.toLocaleString()}
                  </span>{' '}
                  reviews
                </p>
              </div>

              {/* Divider */}
              <div className="h-px w-full md:h-28 md:w-px bg-charcoal/10 flex-shrink-0" />

              {/* Distribution bars */}
              <div className="space-y-3 w-full">
                {[5, 4, 3, 2, 1].map((star) => {
                  const count = displaySummary.distribution?.[star] ?? 0
                  const pct =
                    displaySummary.totalCount > 0
                      ? (count / displaySummary.totalCount) * 100
                      : 0

                  return (
                    <div key={star} className="flex items-center gap-3">
                      <span className="font-sans text-sm text-charcoal w-3 flex-shrink-0">{star}</span>
                      <div className="flex-shrink-0">
                        <StarRating rating={star} size="sm" />
                      </div>
                      <div className="flex-1 h-2 bg-charcoal/8 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full transition-all duration-1000 ${
                            star === 5
                              ? 'bg-gold-accent'
                              : star === 4
                              ? 'bg-gold-light'
                              : 'bg-charcoal/20'
                          }`}
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                      <span className="font-sans text-xs text-muted w-10 text-right flex-shrink-0">
                        {pct.toFixed(0)}%
                      </span>
                    </div>
                  )
                })}
              </div>

            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── Reviews Grid ────────────────────────────────── */}
      <section className="py-16 md:py-24 bg-cream-bg">
        <div className="container-luxury">
          <SectionHeader
            eyebrow="All Reviews"
            title={`${displayReviews.length} Client Experiences`}
            subtitle="Every review is from a verified Lumière client. Authentic voices, real transformations."
          />

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {displayReviews.map((review) => (
              <StaggerItem key={review._id}>
                <ReviewCard review={review} />
              </StaggerItem>
            ))}
          </StaggerContainer>

          {/* Load more hint */}
          {displayReviews.length >= 9 && (
            <FadeIn>
              <div className="text-center mt-12">
                <p className="font-sans text-sm text-muted">
                  Showing {displayReviews.length} of {displaySummary.totalCount.toLocaleString()} reviews
                </p>
              </div>
            </FadeIn>
          )}
        </div>
      </section>

      {/* ── Trust badges ────────────────────────────────── */}
      <section className="py-16 bg-charcoal">
        <div className="container-luxury">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <FadeIn delay={0}>
              <div className="p-8 border border-warm-white/8 hover:border-rose-primary/40 transition-colors duration-300">
                <div className="w-14 h-14 mx-auto mb-4 border border-gold-accent/40 flex items-center justify-center">
                  <span className="font-playfair text-gold-accent text-2xl">✓</span>
                </div>
                <h3 className="font-playfair text-lg text-warm-white mb-2">100% Verified</h3>
                <p className="font-sans text-sm text-muted-light leading-relaxed">
                  All reviews are submitted by real clients after completed appointments.
                </p>
              </div>
            </FadeIn>
            <FadeIn delay={0.1}>
              <div className="p-8 border border-warm-white/8 hover:border-rose-primary/40 transition-colors duration-300">
                <div className="w-14 h-14 mx-auto mb-4 border border-gold-accent/40 flex items-center justify-center">
                  <span className="font-playfair text-gold-accent text-2xl">★</span>
                </div>
                <h3 className="font-playfair text-lg text-warm-white mb-2">Top Rated in Dubai</h3>
                <p className="font-sans text-sm text-muted-light leading-relaxed">
                  Recognised across Google, Facebook, and local beauty directories.
                </p>
              </div>
            </FadeIn>
            <FadeIn delay={0.2}>
              <div className="p-8 border border-warm-white/8 hover:border-rose-primary/40 transition-colors duration-300">
                <div className="w-14 h-14 mx-auto mb-4 border border-gold-accent/40 flex items-center justify-center">
                  <span className="font-playfair text-gold-accent text-2xl">♥</span>
                </div>
                <h3 className="font-playfair text-lg text-warm-white mb-2">98% Satisfaction</h3>
                <p className="font-sans text-sm text-muted-light leading-relaxed">
                  An overwhelming majority of clients return within 60 days of their visit.
                </p>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ── Write review CTA ────────────────────────────── */}
      <section className="py-16 md:py-24 bg-warm-white text-center">
        <div className="container-luxury max-w-2xl">
          <FadeIn>
            <p className="font-cormorant italic text-rose-primary text-xl tracking-widest mb-3">
              Share Your Experience
            </p>
            <h2 className="font-playfair text-3xl md:text-4xl text-charcoal font-medium mb-4">
              Had a Visit Recently?
            </h2>
            <div className="divider-gold w-16 mx-auto mb-6" />
            <p className="font-sans text-muted mb-8 leading-relaxed">
              We love hearing from our clients. Book an appointment, experience the Lumière
              difference, and share your story — your words help other guests discover us.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/booking"
                className="inline-flex px-10 py-4 bg-rose-primary text-white font-sans text-sm tracking-widest uppercase hover:bg-rose-dark transition-colors duration-300"
              >
                Book an Appointment
              </Link>
              <a
                href="https://g.page/lumieresalon-dubai/review"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex px-10 py-4 border border-charcoal/20 text-charcoal font-sans text-sm tracking-widest uppercase hover:border-rose-primary hover:text-rose-primary transition-colors duration-300"
              >
                Leave a Google Review
              </a>
            </div>
          </FadeIn>
        </div>
      </section>
    </>
  )
}
