import { cn } from '@/lib/utils'

interface SectionHeaderProps {
  eyebrow?: string
  title: string
  subtitle?: string
  centered?: boolean
  light?: boolean
  className?: string
}

export function SectionHeader({
  eyebrow,
  title,
  subtitle,
  centered = true,
  light = false,
  className,
}: SectionHeaderProps) {
  return (
    <div
      className={cn(
        'mb-12 md:mb-16',
        centered && 'text-center',
        className
      )}
    >
      {eyebrow && (
        <p
          className={cn(
            'font-[var(--font-cormorant)] italic text-lg tracking-widest mb-3',
            light ? 'text-[#F2A7B8]' : 'text-[#C9687A]'
          )}
          style={{ fontFamily: 'var(--font-cormorant)' }}
        >
          {eyebrow}
        </p>
      )}

      <h2
        className={cn(
          'text-3xl md:text-4xl lg:text-5xl font-medium leading-tight mb-4',
          light ? 'text-[#FFFCF9]' : 'text-[#1C1C2E]'
        )}
        style={{ fontFamily: 'var(--font-playfair)' }}
      >
        {title}
      </h2>

      {eyebrow && (
        <div
          className={cn(
            'divider-gold w-16 mb-4',
            centered ? 'mx-auto' : 'mx-0'
          )}
        />
      )}

      {subtitle && (
        <p
          className={cn(
            'font-sans text-base md:text-lg leading-relaxed max-w-2xl',
            centered && 'mx-auto',
            light ? 'text-[#FFFCF9]/80' : 'text-[#6B6B7B]'
          )}
        >
          {subtitle}
        </p>
      )}
    </div>
  )
}
