'use client'

interface StarRatingProps {
  rating: number
  size?: 'sm' | 'md' | 'lg'
  readonly?: boolean
  onChange?: (rating: number) => void
  showValue?: boolean
  className?: string
}

export function StarRating({
  rating,
  size = 'md',
  readonly = true,
  onChange,
  showValue = false,
  className = '',
}: StarRatingProps) {
  const sizeClasses: Record<string, string> = {
    sm: 'w-3.5 h-3.5',
    md: 'w-5 h-5',
    lg: 'w-7 h-7',
  }

  const starPath =
    'M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z'

  const renderStar = (index: number) => {
    const filled = index <= Math.floor(rating)
    const partial =
      !filled && index === Math.ceil(rating) && rating % 1 > 0
    const fillPercent = partial
      ? `${(rating % 1) * 100}%`
      : filled
      ? '100%'
      : '0%'

    return (
      <span
        key={index}
        className={`relative inline-block ${!readonly ? 'cursor-pointer' : ''}`}
        onClick={() => !readonly && onChange?.(index)}
        onKeyDown={(e) => {
          if (!readonly && (e.key === 'Enter' || e.key === ' ')) {
            onChange?.(index)
          }
        }}
        role={!readonly ? 'button' : undefined}
        tabIndex={!readonly ? 0 : undefined}
        aria-label={!readonly ? `Rate ${index} out of 5` : undefined}
      >
        {/* Background star (empty) */}
        <svg
          className={`${sizeClasses[size]} text-[#E8D5A0]`}
          fill="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path d={starPath} />
        </svg>

        {/* Foreground star (filled / partial) */}
        <svg
          className={`${sizeClasses[size]} text-[#C9A84C] absolute inset-0`}
          fill="currentColor"
          viewBox="0 0 24 24"
          aria-hidden="true"
          style={{
            clipPath: `inset(0 ${100 - parseFloat(fillPercent)}% 0 0)`,
          }}
        >
          <path d={starPath} />
        </svg>
      </span>
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
        <span className="ml-1.5 font-sans text-sm text-[#6B6B7B]">
          {rating.toFixed(1)}
        </span>
      )}
    </div>
  )
}
