'use client'
import Image from 'next/image'
import Link from 'next/link'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ChevronDown } from 'lucide-react'
import { useRef } from 'react'
import { urlFor } from '@/lib/sanity/image'
import type { SanityImage } from '@/types'

const words = ['Elevate', 'Your', 'Beauty']

export function HeroSection({ heroImage }: { heroImage: SanityImage | null }) {
  const ref = useRef<HTMLElement>(null)
  const imageUrl = heroImage?.asset ? urlFor(heroImage).width(1920).height(1080).url() : null
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '30%'])

  return (
    <section ref={ref} className="relative min-h-screen flex items-center justify-center overflow-hidden bg-charcoal">
      {/* Parallax background */}
      <motion.div className="absolute inset-0" style={{ y: bgY }}>
        {imageUrl && (
          <Image src={imageUrl} alt="Hero background" fill className="object-cover opacity-50" priority unoptimized />
        )}
      </motion.div>

      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-linear-to-br from-charcoal/80 via-[#2A1520]/60 to-charcoal/80" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_50%,rgba(201,104,122,0.15),transparent_60%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_70%,rgba(201,168,76,0.08),transparent_60%)]" />

      {/* Floating decorative lines */}
      <motion.div
        animate={{ opacity: [0.3, 0.6, 0.3], scaleY: [1, 1.1, 1] }}
        transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut' }}
        className="absolute top-1/4 left-8 w-px h-32 bg-linear-to-b from-transparent via-gold-accent to-transparent"
      />
      <motion.div
        animate={{ opacity: [0.3, 0.6, 0.3], scaleY: [1, 1.1, 1] }}
        transition={{ repeat: Infinity, duration: 4, ease: 'easeInOut', delay: 1.5 }}
        className="absolute bottom-1/4 right-8 w-px h-32 bg-linear-to-b from-transparent via-rose-light to-transparent"
      />
      <motion.div
        animate={{ opacity: [0.3, 0.6, 0.3], scaleX: [1, 1.15, 1] }}
        transition={{ repeat: Infinity, duration: 5, ease: 'easeInOut', delay: 0.8 }}
        className="absolute top-1/3 right-12 w-20 h-px bg-linear-to-r from-transparent via-gold-accent to-transparent"
      />

      {/* Content */}
      <div className="relative z-10 container-luxury text-center">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="font-cormorant italic text-rose-light text-xl md:text-2xl tracking-[0.3em] mb-8"
        >
          Luxury Beauty · Dubai
        </motion.p>

        <h1 className="font-playfair text-5xl md:text-7xl lg:text-8xl font-medium text-warm-white mb-2 leading-tight">
          {words.map((word, i) => (
            <motion.span
              key={word}
              className="inline-block mr-4 last:mr-0"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 + i * 0.15, duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
            >
              {word}
            </motion.span>
          ))}
        </h1>

        <motion.div
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ delay: 1.0, duration: 0.8 }}
          className="flex items-center justify-center gap-4 mb-6"
        >
          <div className="h-px w-16 bg-gold-accent opacity-60" />
          <span className="font-cormorant italic text-gold-accent text-lg tracking-widest">Experience</span>
          <div className="h-px w-16 bg-gold-accent opacity-60" />
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1, duration: 0.8 }}
          className="font-sans text-muted-light text-lg max-w-xl mx-auto mb-12 leading-relaxed"
        >
          Bespoke beauty treatments crafted for the modern woman. Hair, nails, makeup, spa &amp; home services — all under one roof.
        </motion.p>

        {/* CTAs with shimmer */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.3, duration: 0.8 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link
            href="/booking"
            className="relative overflow-hidden px-10 py-4 bg-rose-primary text-white font-sans text-sm tracking-widest uppercase hover:bg-rose-dark transition-all duration-300 hover:-translate-y-1 hover:shadow-luxury group"
          >
            <motion.span
              className="absolute inset-0 bg-linear-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"
            />
            Book Your Experience
          </Link>
          <Link
            href="/services"
            className="relative overflow-hidden px-10 py-4 border border-warm-white/30 text-warm-white font-sans text-sm tracking-widest uppercase hover:bg-warm-white/10 transition-all duration-300 group"
          >
            <motion.span
              className="absolute inset-0 bg-linear-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"
            />
            Explore Services
          </Link>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="font-sans text-xs tracking-widest text-muted-light uppercase">Scroll</span>
        <motion.div animate={{ y: [0, 6, 0] }} transition={{ repeat: Infinity, duration: 1.5 }}>
          <ChevronDown className="w-5 h-5 text-muted-light" />
        </motion.div>
      </motion.div>
    </section>
  )
}
