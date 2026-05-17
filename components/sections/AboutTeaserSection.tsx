'use client'
import Link from 'next/link'
import { motion, useInView } from 'framer-motion'
import { ArrowRight, Award, Users, Star, Clock } from 'lucide-react'
import { useRef, useEffect, useState } from 'react'
import { urlFor } from '@/lib/sanity/image'
import type { SanityImage } from '@/types'

const stats = [
  { icon: Award, num: 8,   suffix: '+',  label: 'Years of Excellence' },
  { icon: Users, num: 5,   suffix: 'K+', label: 'Happy Clients'       },
  { icon: Star,  num: 4.9, suffix: '',   label: 'Average Rating', decimal: true },
  { icon: Clock, num: 50,  suffix: '+',  label: 'Services Offered'    },
]

function CountUp({ target, suffix, decimal }: { target: number; suffix: string; decimal?: boolean }) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLSpanElement>(null)
  const inView = useInView(ref, { once: true })

  useEffect(() => {
    if (!inView) return
    const steps = 40
    const increment = target / steps
    let current = 0
    const timer = setInterval(() => {
      current += increment
      if (current >= target) { setCount(target); clearInterval(timer) }
      else setCount(current)
    }, 1500 / steps)
    return () => clearInterval(timer)
  }, [inView, target])

  return (
    <span ref={ref}>
      {decimal ? count.toFixed(1) : Math.floor(count)}{suffix}
    </span>
  )
}

export function AboutTeaserSection({ image }: { image: SanityImage | null }) {
  const imageUrl = image?.asset ? urlFor(image).width(800).height(1040).url() : null
  return (
    <section className="py-20 md:py-28 bg-cream-bg">
      <div className="container-luxury">
        <div className="grid lg:grid-cols-2 gap-16 items-center">

          {/* Left: visual */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative pb-10 md:pb-14"
          >
            <div className="relative bg-linear-to-br from-rose-light/30 to-gold-light/20">
              {imageUrl ? (
                <img src={imageUrl} alt="Our story" className="w-full h-auto block" />
              ) : (
                <div className="h-130 flex items-center justify-center">
                  <span className="font-playfair text-8xl text-rose-primary/20 font-medium">L</span>
                </div>
              )}
              <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-charcoal/60 to-transparent flex items-end p-8">
                <p className="font-cormorant italic text-warm-white text-2xl leading-tight">
                  &ldquo;Where every client is treated like royalty&rdquo;
                </p>
              </div>
            </div>

            {/* Gold-framed Est. card */}
            <div className="absolute -right-4 md:-right-6 bottom-0 border-2 border-gold-accent bg-charcoal p-5 shadow-gold">
              {/* Corner accents */}
              <div className="absolute top-1.5 left-1.5 w-3 h-3 border-t border-l border-gold-accent/50" />
              <div className="absolute bottom-1.5 right-1.5 w-3 h-3 border-b border-r border-gold-accent/50" />
              <p className="font-cormorant italic text-gold-accent text-xs tracking-widest mb-0.5">Est.</p>
              <p className="font-playfair text-4xl font-medium text-warm-white leading-none">2016</p>
              <p className="font-sans text-[10px] tracking-[0.2em] text-muted-light uppercase mt-1">Dubai Marina</p>
            </div>
          </motion.div>

          {/* Right: content */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <p className="font-cormorant italic text-rose-primary text-xl tracking-widest mb-3">Our Story</p>
            <h2 className="font-playfair text-4xl md:text-5xl font-medium text-charcoal mb-2 leading-tight">
              Crafted with Passion,
            </h2>
            <h2 className="font-playfair text-4xl md:text-5xl font-medium text-rose-primary mb-6 leading-tight">
              Delivered with Love
            </h2>
            <div className="divider-gold w-16 mb-6" />
            <p className="font-sans text-muted text-lg leading-relaxed mb-4">
              Lumière was born from a dream — to create a sanctuary where luxury beauty meets heartfelt service. Founded in Dubai in 2016, we have become the trusted choice for women who demand excellence.
            </p>
            <p className="font-sans text-muted leading-relaxed mb-8">
              Our expert team of stylists, beauticians, and spa therapists are dedicated to making you look and feel your absolute best, every single visit.
            </p>

            <div className="grid grid-cols-2 gap-4 mb-8">
              {stats.map((stat, i) => {
                const Icon = stat.icon
                return (
                  <motion.div
                    key={stat.label}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1, duration: 0.5 }}
                    className="flex items-center gap-3 p-4 bg-warm-white"
                  >
                    <Icon className="w-5 h-5 text-rose-primary shrink-0" />
                    <div>
                      <p className="font-playfair text-2xl font-medium text-charcoal">
                        <CountUp target={stat.num} suffix={stat.suffix} decimal={stat.decimal} />
                      </p>
                      <p className="font-sans text-xs text-muted">{stat.label}</p>
                    </div>
                  </motion.div>
                )
              })}
            </div>

            <Link
              href="/about"
              className="inline-flex items-center gap-2 font-sans text-sm tracking-widest uppercase text-rose-primary hover:gap-4 transition-all duration-300"
            >
              Discover Our Story <ArrowRight className="w-4 h-4" />
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
