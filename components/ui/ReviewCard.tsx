import { CheckCircle2, Quote } from 'lucide-react'
import { StarRating } from './StarRating'
import { urlFor } from '@/lib/sanity/image'
import type { Review } from '@/types'
import { format } from 'date-fns'

interface ReviewCardProps {
  review: Review
  compact?: boolean
}

export function ReviewCard({ review, compact = false }: ReviewCardProps) {
  const avatarUrl = review.customerImage?.asset
    ? urlFor(review.customerImage).width(80).height(80).url()
    : null

  const initials = (review.customerName ?? '')
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)

  return (
    <div className={`relative border border-warm-white/8 hover:border-rose-primary/30 transition-all duration-300 hover:-translate-y-1 ${compact ? 'p-6' : 'p-7'} bg-[#16162a]`}>
      <Quote className="absolute top-5 right-5 w-7 h-7 text-rose-primary/20" aria-hidden="true" />

      {/* Header */}
      <div className="flex items-start gap-3 mb-5">
        {avatarUrl ? (
          <img src={avatarUrl} alt={review.customerName} className="w-11 h-11 rounded-full object-cover shrink-0" />
        ) : (
          <div className="w-11 h-11 rounded-full bg-rose-primary/20 border border-rose-primary/30 flex items-center justify-center shrink-0">
            <span className="font-playfair text-rose-light text-sm font-medium">{initials}</span>
          </div>
        )}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <p className="font-playfair text-warm-white font-medium">{review.customerName}</p>
            {review.verified && (
              <span className="flex items-center gap-1 text-[10px] font-sans tracking-wide text-gold-accent">
                <CheckCircle2 className="w-3 h-3" />Verified
              </span>
            )}
          </div>
          <div className="flex items-center gap-3 mt-1">
            <StarRating rating={review.rating} size="sm" />
            {review.publishedAt && (
              <span className="text-xs text-muted-light font-sans">
                {format(new Date(review.publishedAt), 'MMM yyyy')}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Text */}
      <p className={`font-sans text-muted-light leading-relaxed ${compact ? 'text-sm line-clamp-3' : 'text-sm'}`}>
        &ldquo;{review.comment}&rdquo;
      </p>

      {review.serviceUsed && (
        <div className="mt-4 pt-4 border-t border-warm-white/6">
          <p className="text-xs font-sans text-muted-light">
            Service: <span className="text-rose-light">{review.serviceUsed.name}</span>
          </p>
        </div>
      )}
    </div>
  )
}
