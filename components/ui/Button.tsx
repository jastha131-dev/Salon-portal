import { ButtonHTMLAttributes, forwardRef, ReactNode } from 'react'
import { cn } from '@/lib/utils'

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'ghost' | 'gold' | 'outline'
  size?: 'sm' | 'md' | 'lg'
  children: ReactNode
  loading?: boolean
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'primary',
      size = 'md',
      children,
      loading,
      className,
      ...props
    },
    ref
  ) => {
    const base =
      'inline-flex items-center justify-center font-sans font-medium tracking-wide transition-all duration-300 rounded-none focus:outline-none focus:ring-2 focus:ring-[#C9687A] focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed'

    const variants: Record<string, string> = {
      primary:
        'bg-[#C9687A] text-white hover:bg-[#8B3A4A] shadow-[0_4px_24px_rgba(201,104,122,0.15)] hover:-translate-y-0.5 hover:shadow-lg',
      secondary:
        'bg-[#1C1C2E] text-white hover:bg-[#1C1C2E]/90 hover:-translate-y-0.5',
      ghost:
        'bg-transparent text-[#C9687A] border border-[#C9687A] hover:bg-[#C9687A] hover:text-white',
      gold:
        'bg-[#C9A84C] text-white hover:bg-[#A88A3C] shadow-[0_4px_24px_rgba(201,168,76,0.2)] hover:-translate-y-0.5',
      outline:
        'bg-transparent text-[#1C1C2E] border border-[#1C1C2E]/30 hover:border-[#1C1C2E] hover:bg-[#1C1C2E] hover:text-white',
    }

    const sizes: Record<string, string> = {
      sm: 'px-5 py-2.5 text-xs tracking-widest uppercase',
      md: 'px-8 py-3.5 text-sm tracking-widest uppercase',
      lg: 'px-12 py-[18px] text-base tracking-widest uppercase',
    }

    return (
      <button
        ref={ref}
        className={cn(base, variants[variant], sizes[size], className)}
        disabled={loading || props.disabled}
        {...props}
      >
        {loading && (
          <svg
            className="animate-spin -ml-1 mr-2 h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            />
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
            />
          </svg>
        )}
        {children}
      </button>
    )
  }
)

Button.displayName = 'Button'
