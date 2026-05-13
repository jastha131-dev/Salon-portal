import Image from 'next/image'
import { CheckCircle2, Quote } from 'lucide-react'
import { StarRating } from './StarRating'
import { Badge } from './Badge'
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

  const initials = review.customerName
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2)

  return (
    <div
      className={`bg-[#FFFCF9] relative ${compact ? 'p-6' : 'p-8'}`}
    >
      {/* Decorative quote mark */}
      <Quote
        className="absolute top-4 right-4 w-8 h-8 text-[#F2A7B8]/50"
        aria-hidden="true"
      />

      {/* Header: avatar + name + rating */}
      <div className="flex items-start gap-4 mb-4">
        {avatarUrl ? (
          <Image
            src={avatarUrl}
            alt={review.customerName}
            width={48}
            height={48}
            className="rounded-full object-cover flex-shrink-0"
          />
        ) : (
          <div className="w-12 h-12 rounded-full bg-[#F2A7B8]/20 flex items-center justify-center flex-shrink-0">
            <span
              className="text-[#C9687A] font-medium"
              style={{ fontFamily: 'var(--font-playfair)' }}
            >
              {initials}
            </span>
          </div>
        )}

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <p
              className="text-[#1C1C2E] font-medium"
              style={{ fontFamily: 'var(--font-playfair)' }}
            >
              {review.customerName}
            </p>
            {review.verified && (
              <Badge variant="verified">
                <CheckCircle2 className="w-3 h-3" aria-hidden="true" />
                Verified
              </Badge>
            )}
          </div>

          <div className="flex items-center gap-3 mt-1">
            <StarRating rating={review.rating} size="sm" />
            {review.publishedAt && (
              <span className="text-xs text-[#A8A8B3] font-sans">
                {format(new Date(review.publishedAt), 'MMM yyyy')}
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Review text */}
      <p
        className={`font-sans text-[#6B6B7B] leading-relaxed ${
          compact ? 'text-sm line-clamp-3' : 'text-base'
        }`}
      >
        &ldquo;{review.comment}&rdquo;
      </p>

      {/* Service used */}
      {review.serviceUsed && (
        <div className="mt-3 pt-3 border-t border-[#1C1C2E]/5">
          <p className="text-xs font-sans text-[#A8A8B3]">
            Service:{' '}
            <span className="text-[#C9687A]">
              {review.serviceUsed.name}
            </span>
          </p>
        </div>
      )}
    </div>
  )
}
