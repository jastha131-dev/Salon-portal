'use client'
import { useCallback, useEffect, useState } from 'react'
import useEmblaCarousel from 'embla-carousel-react'
import Autoplay from 'embla-carousel-autoplay'
import { Quote, ChevronLeft, ChevronRight } from 'lucide-react'
import { StarRating } from '@/components/ui/StarRating'
import type { Review } from '@/types'

const fallbackReviews: Review[] = [
  { _id:'1', customerName:'Sarah Al Mansouri', rating:5, comment:'Absolutely the best salon in Dubai! The hair treatment was transformative and the atmosphere is pure luxury.', featured:true, verified:true, publishedAt:'2024-01-15' },
  { _id:'2', customerName:'Fatima Hassan',      rating:5, comment:"I've been coming to Lumière for 3 years and it never disappoints. The team is so talented and professional.", featured:true, verified:true, publishedAt:'2024-02-10' },
  { _id:'3', customerName:'Priya Sharma',       rating:5, comment:'The bridal package was everything I dreamed of. My wedding look was absolutely stunning. Thank you Lumière!', featured:true, verified:true, publishedAt:'2024-03-01' },
  { _id:'4', customerName:'Emma Williams',      rating:5, comment:'The home service is incredible. They brought the full salon experience to my villa. Will definitely book again!', featured:true, verified:true, publishedAt:'2024-03-20' },
]

export function TestimonialsSection({ reviews }: { reviews: Review[] }) {
  const displayReviews = reviews?.length > 0 ? reviews : fallbackReviews
  const [selectedIndex, setSelectedIndex] = useState(0)

  const [emblaRef, emblaApi] = useEmblaCarousel(
    { loop: true },
    [Autoplay({ delay: 4000, stopOnInteraction: true, stopOnMouseEnter: true })]
  )

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi])
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi])

  useEffect(() => {
    if (!emblaApi) return
    const onSelect = () => setSelectedIndex(emblaApi.selectedScrollSnap())
    emblaApi.on('select', onSelect)
    return () => { emblaApi.off('select', onSelect) }
  }, [emblaApi])

  return (
    <section className="py-20 md:py-28 bg-warm-white">
      <div className="container-luxury">
        <div className="text-center mb-16">
          <p className="font-cormorant italic text-rose-primary text-xl tracking-widest mb-3">Client Love</p>
          <h2 className="font-playfair text-4xl md:text-5xl font-medium text-charcoal mb-4">What Our Clients Say</h2>
          <div className="divider-gold w-16 mx-auto" />
        </div>

        <div className="relative">
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex">
              {displayReviews.map((review) => {
                const initials = review.customerName.split(' ').map((n: string) => n[0]).join('').toUpperCase().slice(0, 2)
                return (
                  <div key={review._id} className="flex-none w-full md:w-1/2 lg:w-1/3 px-4">
                    <div className="bg-cream-bg p-8 h-full relative border border-gold-accent/25 hover:border-gold-accent/60 transition-colors duration-300">
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

          {/* Prev / Next arrows */}
          <button
            onClick={scrollPrev}
            aria-label="Previous review"
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-5 w-10 h-10 bg-charcoal text-warm-white flex items-center justify-center hover:bg-rose-primary transition-colors duration-200 z-10 hidden md:flex"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={scrollNext}
            aria-label="Next review"
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-5 w-10 h-10 bg-charcoal text-warm-white flex items-center justify-center hover:bg-rose-primary transition-colors duration-200 z-10 hidden md:flex"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Dots + mobile arrows */}
        <div className="flex items-center justify-center gap-4 mt-8">
          <button onClick={scrollPrev} aria-label="Previous" className="md:hidden w-8 h-8 bg-charcoal text-warm-white flex items-center justify-center hover:bg-rose-primary transition-colors duration-200">
            <ChevronLeft className="w-4 h-4" />
          </button>
          <div className="flex gap-2">
            {displayReviews.map((_, i) => (
              <button
                key={i}
                onClick={() => emblaApi?.scrollTo(i)}
                aria-label={`Go to review ${i + 1}`}
                className={`h-1.5 transition-all duration-300 ${i === selectedIndex ? 'w-6 bg-rose-primary' : 'w-1.5 bg-charcoal/20 hover:bg-charcoal/40'}`}
              />
            ))}
          </div>
          <button onClick={scrollNext} aria-label="Next" className="md:hidden w-8 h-8 bg-charcoal text-warm-white flex items-center justify-center hover:bg-rose-primary transition-colors duration-200">
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </section>
  )
}
