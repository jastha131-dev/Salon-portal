'use client'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowRight, Award, Users, Star, Clock } from 'lucide-react'

const stats = [
  { icon: Award, value: '8+', label: 'Years of Excellence' },
  { icon: Users, value: '5K+', label: 'Happy Clients' },
  { icon: Star, value: '4.9', label: 'Average Rating' },
  { icon: Clock, value: '50+', label: 'Services Offered' },
]

export function AboutTeaserSection() {
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
            className="relative"
          >
            <div className="relative h-[520px] bg-gradient-to-br from-rose-light/30 to-gold-light/20 overflow-hidden">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <span className="font-playfair text-8xl text-rose-primary/20 font-medium">L</span>
                </div>
              </div>
              <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-charcoal/60 to-transparent flex items-end p-8">
                <p className="font-cormorant italic text-warm-white text-2xl leading-tight">
                  &ldquo;Where every client is treated like royalty&rdquo;
                </p>
              </div>
            </div>
            {/* Floating stat card */}
            <div className="absolute -right-6 -bottom-6 bg-white p-6 shadow-card-hover">
              <p className="font-playfair text-3xl font-medium text-rose-primary">2016</p>
              <p className="font-sans text-xs tracking-widest text-muted uppercase mt-1">Est. Dubai</p>
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

            {/* Stats */}
            <div className="grid grid-cols-2 gap-4 mb-8">
              {stats.map((stat) => {
                const Icon = stat.icon
                return (
                  <div key={stat.label} className="flex items-center gap-3 p-4 bg-warm-white">
                    <Icon className="w-5 h-5 text-rose-primary flex-shrink-0" />
                    <div>
                      <p className="font-playfair text-2xl font-medium text-charcoal">{stat.value}</p>
                      <p className="font-sans text-xs text-muted">{stat.label}</p>
                    </div>
                  </div>
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
