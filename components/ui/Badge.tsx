import { cn } from '@/lib/utils'
import { ReactNode } from 'react'

interface BadgeProps {
  children: ReactNode
  variant?: 'rose' | 'gold' | 'dark' | 'light' | 'verified'
  className?: string
}

export function Badge({
  children,
  variant = 'rose',
  className,
}: BadgeProps) {
  const variants: Record<string, string> = {
    rose: 'bg-[#F2A7B8]/30 text-[#8B3A4A] border border-[#F2A7B8]/50',
    gold: 'bg-[#E8D5A0]/30 text-[#7A6020] border border-[#E8D5A0]/50',
    dark: 'bg-[#1C1C2E] text-[#FFFCF9]',
    light: 'bg-[#FFFCF9] text-[#1C1C2E] border border-[#1C1C2E]/10',
    verified: 'bg-emerald-50 text-emerald-700 border border-emerald-200',
  }

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 px-3 py-1 text-xs font-sans font-medium tracking-wide rounded-full',
        variants[variant],
        className
      )}
    >
      {children}
    </span>
  )
}
