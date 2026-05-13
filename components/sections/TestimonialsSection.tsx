'use client'
import useEmblaCarousel from 'embla-carousel-react'
import Autoplay from 'embla-carousel-autoplay'
import { Quote } from 'lucide-react'
import { StarRating } from '@/components/ui/StarRating'
import type { Review } from '@/types'

interface TestimonialsSectionProps {
  reviews: Review[]
}

const fallbackReviews: Review[] = [
  {
    _id: '1',
    customerName: 'Sarah Al Mansouri',
    rating: 5,
    comment: 'Absolutely the best salon in Dubai! The hair treatment was transformative and the atmosphere is pure luxury.',
    featured: true,
    verified: true,
    publishedAt: '2024-01-15',
  },
  {
    _id: '2',
    customerName: 'Fatima Hassan',
    rating: 5,
    comment: "I've been coming to Lumière for 3 years and it never disappoints. The team is so talented and professional.",
    featured: true,
    verified: true,
    publishedAt: '2024-02-10',
  },
  {
    _id: '3',
    customerName: 'Priya Sharma',
    rating: 5,
    comment: 'The bridal package was everything I dreamed of. My wedding look was absolutely stunning. Thank you Lumière!',
    featured: true,
    verified: true,
    publishedAt: '2024-03-01',
  },
  {
    _id: '4',
    customerName: 'Emma Williams',
    rating: 5,
    comment: 'The home service is incredible. They brought the full salon experience to my villa. Will definitely book again!',
    featured: true,
    verified: true,
    publishedAt: '2024-03-20',
  },
]

export function TestimonialsSection({ reviews }: TestimonialsSectionProps) {
  const displayReviews = reviews?.length > 0 ? reviews : fallbackReviews
  const [emblaRef] = useEmblaCarousel(
    { loop: true },
    [Autoplay({ delay: 4000, stopOnInteraction: false })]
  )

  return (
    <section className="py-20 md:py-28 bg-warm-white">
      <div className="container-luxury">
        <div className="text-center mb-16">
          <p className="font-cormorant italic text-rose-primary text-xl tracking-widest mb-3">Client Love</p>
          <h2 className="font-playfair text-4xl md:text-5xl font-medium text-charcoal mb-4">What Our Clients Say</h2>
          <div className="divider-gold w-16 mx-auto" />
        </div>

        <div className="overflow-hidden" ref={emblaRef}>
          <div className="flex">
            {displayReviews.map((review) => {
              const initials = review.customerName
                .split(' ')
                .map((n: string) => n[0])
                .join('')
                .toUpperCase()
                .slice(0, 2)
              return (
                <div key={review._id} className="flex-none w-full md:w-1/2 lg:w-1/3 px-4">
                  <div className="bg-cream-bg p-8 h-full relative">
                    <Quote className="absolute top-6 right-6 w-10 h-10 text-rose-light/30" />
                    <StarRating rating={review.rating} size="sm" className="mb-4" />
                    <p className="font-sans text-muted leading-relaxed mb-6 text-base">
                      &ldquo;{review.comment}&rdquo;
                    </p>
                    <div className="flex items-center gap-3 pt-4 border-t border-charcoal/5">
                      <div className="w-10 h-10 rounded-full bg-rose-light/20 flex items-center justify-center flex-shrink-0">
                        <span className="font-playfair text-sm text-rose-primary">{initials}</span>
                      </div>
                      <div>
                        <p className="font-playfair text-charcoal font-medium text-sm">{review.customerName}</p>
                        {review.verified && (
                          <p className="font-sans text-xs text-emerald-600">&#10003; Verified Client</p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    </section>
  )
}
