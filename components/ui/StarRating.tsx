'use client'
import { motion } from 'framer-motion'

interface StarRatingProps {
  rating: number
  size?: 'sm' | 'md' | 'lg'
  readonly?: boolean
  onChange?: (rating: number) => void
  showValue?: boolean
  className?: string
  animated?: boolean
}

export function StarRating({
  rating,
  size = 'md',
  readonly = true,
  onChange,
  showValue = false,
  className = '',
  animated = false,
}: StarRatingProps) {
  const sizeClasses: Record<string, string> = {
    sm: 'w-3.5 h-3.5',
    md: 'w-5 h-5',
    lg: 'w-7 h-7',
  }

  const starPath =
    'M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z'

  const renderStar = (index: number) => {
    const filled      = index <= Math.floor(rating)
    const partial     = !filled && index === Math.ceil(rating) && rating % 1 > 0
    const fillPercent = partial ? `${(rating % 1) * 100}%` : filled ? '100%' : '0%'

    const star = (
      <span
        key={index}
        className={`relative inline-block ${!readonly ? 'cursor-pointer' : ''}`}
        onClick={() => !readonly && onChange?.(index)}
        onKeyDown={(e) => { if (!readonly && (e.key === 'Enter' || e.key === ' ')) onChange?.(index) }}
        role={!readonly ? 'button' : undefined}
        tabIndex={!readonly ? 0 : undefined}
        aria-label={!readonly ? `Rate ${index} out of 5` : undefined}
      >
        <svg className={`${sizeClasses[size]} text-gold-light`} fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
          <path d={starPath} />
        </svg>
        <svg
          className={`${sizeClasses[size]} text-gold-accent absolute inset-0 star-fill`}
          fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"
          style={{ '--star-fill-pct': fillPercent } as React.CSSProperties}
        >
          <path d={starPath} />
        </svg>
      </span>
    )

    if (!animated) return star

    return (
      <motion.span
        key={index}
        initial={{ opacity: 0, scale: 0, rotate: -30 }}
        whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
        viewport={{ once: true }}
        transition={{ type: 'spring', stiffness: 400, damping: 18, delay: index * 0.08 }}
        className="inline-block"
      >
        {star}
      </motion.span>
    )
  }

  return (
    <div
      className={`flex items-center gap-0.5 ${className}`}
      role={!readonly ? 'radiogroup' : undefined}
      aria-label={`Rating: ${rating} out of 5`}
    >
      {[1, 2, 3, 4, 5].map(renderStar)}
      {showValue && (
        <span className="ml-1.5 font-sans text-sm text-[#6B6B7B]">{rating.toFixed(1)}</span>
      )}
    </div>
  )
}
