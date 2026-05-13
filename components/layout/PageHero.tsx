import { ReactNode } from 'react'
import { FadeIn } from '@/components/animations/FadeIn'

interface PageHeroProps {
  eyebrow?: string
  title: string
  subtitle?: string
  children?: ReactNode
  /** true = dark charcoal background (default), false = light cream background */
  dark?: boolean
}

export function PageHero({
  eyebrow,
  title,
  subtitle,
  children,
  dark = true,
}: PageHeroProps) {
  return (
    <section
      className={`pt-32 pb-16 md:pt-40 md:pb-24 ${
        dark ? 'bg-charcoal' : 'bg-cream-bg'
      }`}
    >
      <div className="container-luxury text-center">
        <FadeIn>
          {eyebrow && (
            <p className="font-cormorant italic text-rose-light text-xl tracking-widest mb-3">
              {eyebrow}
            </p>
          )}

          <h1
            className={`font-playfair text-4xl md:text-5xl lg:text-6xl font-medium mb-4 text-balance ${
              dark ? 'text-warm-white' : 'text-charcoal'
            }`}
          >
            {title}
          </h1>

          <div
            className="divider-gold w-20 mx-auto my-5 opacity-60"
            aria-hidden="true"
          />

          {subtitle && (
            <p
              className={`font-sans text-lg max-w-2xl mx-auto leading-relaxed ${
                dark ? 'text-muted-light' : 'text-muted'
              }`}
            >
              {subtitle}
            </p>
          )}

          {children}
        </FadeIn>
      </div>
    </section>
  )
}
