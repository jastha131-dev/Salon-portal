'use client'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ChevronDown } from 'lucide-react'

const words = ['Elevate', 'Your', 'Beauty']

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-charcoal">
      {/* Background gradient mesh */}
      <div className="absolute inset-0 bg-gradient-to-br from-charcoal via-[#2A1520] to-[#1C1C2E]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_50%,rgba(201,104,122,0.15),transparent_60%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_70%_70%,rgba(201,168,76,0.08),transparent_60%)]" />

      {/* Decorative lines */}
      <div className="absolute top-1/4 left-8 w-px h-32 bg-gradient-to-b from-transparent via-gold-accent to-transparent opacity-40" />
      <div className="absolute bottom-1/4 right-8 w-px h-32 bg-gradient-to-b from-transparent via-rose-light to-transparent opacity-40" />
      <div className="absolute top-1/3 right-12 w-20 h-px bg-gradient-to-r from-transparent via-gold-accent to-transparent opacity-40" />

      {/* Content */}
      <div className="relative z-10 container-luxury text-center">
        {/* Eyebrow */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="font-cormorant italic text-rose-light text-xl md:text-2xl tracking-[0.3em] mb-8"
        >
          Luxury Beauty · Dubai
        </motion.p>

        {/* Headline - word by word */}
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

        {/* Gold accent subtitle */}
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

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.3, duration: 0.8 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link
            href="/booking"
            className="px-10 py-4 bg-rose-primary text-white font-sans text-sm tracking-widest uppercase hover:bg-rose-dark transition-all duration-300 hover:-translate-y-1 hover:shadow-luxury"
          >
            Book Your Experience
          </Link>
          <Link
            href="/services"
            className="px-10 py-4 border border-warm-white/30 text-warm-white font-sans text-sm tracking-widest uppercase hover:bg-warm-white/10 transition-all duration-300"
          >
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
