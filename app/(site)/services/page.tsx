'use client'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Link from 'next/link'
import Image from 'next/image'
import { ArrowRight, Clock } from 'lucide-react'
import { urlFor } from '@/lib/sanity/image'
import type { Service, SanityImage } from '@/types'

const categories = [
  { slug: 'all', name: 'All Services' },
  { slug: 'hair', name: 'Hair' },
  { slug: 'nails', name: 'Nails' },
  { slug: 'makeup', name: 'Makeup' },
  { slug: 'spa', name: 'Spa' },
  { slug: 'home-service', name: 'Home Service' },
]

const fallbackGradients = [
  'from-[#7B4A5A] to-[#C9687A]',
  'from-[#3A4A6B] to-[#5A7AC9]',
  'from-[#4A6B5A] to-[#6AC988]',
  'from-[#6B5A3A] to-[#C9A85A]',
  'from-[#5A3A6B] to-[#A85AC9]',
  'from-[#3A6B5A] to-[#5AC9A8]',
]

function PremiumCard({ service, index }: { service: Service; index: number }) {
  const imageUrl = service.image?.asset
    ? urlFor(service.image).width(600).height(800).url()
    : null

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, delay: index * 0.06, ease: [0.22, 1, 0.36, 1] }}
    >
      <Link href={`/services/${service.slug?.current}`}>
        <motion.div
          whileHover={{ y: -10, scale: 1.02 }}
          transition={{ type: 'spring', stiffness: 280, damping: 22 }}
          className="group relative aspect-portrait rounded-2xl overflow-hidden cursor-pointer"
        >
          {/* Background */}
          {imageUrl ? (
            <Image
              src={imageUrl}
              alt={service.image?.alt || service.name || ''}
              fill
              unoptimized
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />
          ) : (
            <div className={`absolute inset-0 bg-linear-to-br ${fallbackGradients[index % fallbackGradients.length]}`} />
          )}

          {/* Overlays */}
          <div className="absolute inset-0 bg-linear-to-t from-black/85 via-black/15 to-transparent" />
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-500" />

          {/* Badges */}
          {service.featured && (
            <span className="absolute top-4 left-4 px-2.5 py-1 bg-gold-accent/90 backdrop-blur-sm text-white text-[9px] font-sans tracking-widest uppercase rounded-full">
              Featured
            </span>
          )}
          {service.category && (
            <span className="absolute top-4 right-4 px-2.5 py-1 bg-white/10 backdrop-blur-md text-white/80 text-[9px] font-sans tracking-widest uppercase rounded-full border border-white/15">
              {service.category.name}
            </span>
          )}

          {/* Content */}
          <div className="absolute bottom-0 left-0 right-0 p-5">
            <h3 className="font-playfair italic text-warm-white text-xl leading-snug mb-2">
              {service.name}
            </h3>
            <div className="flex items-center justify-between">
              <span className="font-sans text-warm-white font-medium text-sm">AED {service.price}</span>
              {service.duration && (
                <span className="flex items-center gap-1 font-sans text-warm-white/50 text-xs">
                  <Clock className="w-3 h-3" />
                  {service.duration}
                </span>
              )}
            </div>

            {/* Hover CTA */}
            <div className="mt-3 pt-3 border-t border-white/15 translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
              <span className="inline-flex items-center gap-1.5 font-sans text-[11px] tracking-widest uppercase text-rose-light">
                Explore <ArrowRight className="w-3 h-3" />
              </span>
            </div>
          </div>
        </motion.div>
      </Link>
    </motion.div>
  )
}

export default function ServicesPage() {
  const [activeCategory, setActiveCategory] = useState('all')
  const [services, setServices] = useState<Service[]>([])
  const [loading, setLoading] = useState(true)
  const [heroImage, setHeroImage] = useState<SanityImage | null>(null)

  useEffect(() => {
    fetch('/api/site-settings')
      .then(r => r.json())
      .then(d => { if (d.data?.servicesHeroImage) setHeroImage(d.data.servicesHeroImage) })
      .catch(() => {})
  }, [])

  useEffect(() => {
    setLoading(true)
    const url = activeCategory === 'all' ? '/api/services' : `/api/services?category=${activeCategory}`
    fetch(url)
      .then(r => r.json())
      .then(d => { setServices(d.data || []); setLoading(false) })
      .catch(() => setLoading(false))
  }, [activeCategory])

  const heroUrl = heroImage?.asset ? urlFor(heroImage).width(1920).height(800).url() : null

  return (
    <>
      {/* ── Hero ── */}
      <section className="relative pt-36 pb-24 md:pt-44 md:pb-32 bg-charcoal overflow-hidden">
        {heroUrl && (
          <img src={heroUrl} alt="" aria-hidden="true"
            className="absolute inset-0 w-full h-full object-cover object-center opacity-20 pointer-events-none select-none" />
        )}
        <div className="absolute inset-0 bg-charcoal/60 pointer-events-none" />
        {/* Ambient blobs */}
        <div className="absolute -top-40 -left-40 w-175 h-175 rounded-full bg-rose-primary/6 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-40 -right-40 w-150 h-150 rounded-full bg-gold-accent/5 blur-3xl pointer-events-none" />

        {/* Vertical rule lines */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 bottom-0 w-px bg-warm-white/3 left-[20%]" />
          <div className="absolute top-0 bottom-0 w-px bg-warm-white/3 left-[40%]" />
          <div className="absolute top-0 bottom-0 w-px bg-warm-white/3 left-[60%]" />
          <div className="absolute top-0 bottom-0 w-px bg-warm-white/3 left-[80%]" />
        </div>

        <div className="container-luxury relative text-center">
          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="font-cormorant italic text-rose-light text-xl md:text-2xl tracking-widest mb-5"
          >
            Discover Excellence
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="font-playfair text-5xl md:text-6xl lg:text-7xl font-medium text-warm-white mb-4 leading-tight"
          >
            Our Signature
            <br />
            <em className="text-rose-light not-italic">Treatments</em>
          </motion.h1>

          <motion.div
            initial={{ scaleX: 0, opacity: 0 }}
            animate={{ scaleX: 1, opacity: 0.6 }}
            transition={{ duration: 0.9, delay: 0.3 }}
            className="divider-gold w-24 mx-auto my-7"
          />

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.45 }}
            className="font-sans text-muted-light text-lg max-w-xl mx-auto leading-relaxed"
          >
            From transformative hair treatments to luxurious spa rituals — discover our full collection of premium beauty services.
          </motion.p>
        </div>
      </section>

      {/* ── Services + Filters ── */}
      <section className="py-16 md:py-24 bg-cream-bg">
        <div className="container-luxury">

          {/* Category filters */}
          <div className="flex flex-wrap items-center justify-center gap-2 mb-14">
            {categories.map((cat) => {
              const isActive = activeCategory === cat.slug
              return (
                <button
                  type="button"
                  key={cat.slug}
                  onClick={() => setActiveCategory(cat.slug)}
                  className={`relative px-6 py-2.5 font-sans text-xs tracking-widest uppercase transition-colors duration-300 border ${
                    isActive
                      ? 'border-rose-primary text-white'
                      : 'border-charcoal/20 text-charcoal hover:border-rose-primary hover:text-rose-primary'
                  }`}
                >
                  {isActive && (
                    <motion.span
                      layoutId="activePill"
                      className="absolute inset-0 bg-rose-primary"
                      transition={{ type: 'spring', stiffness: 380, damping: 32 }}
                    />
                  )}
                  <span className="relative z-10">{cat.name}</span>
                </button>
              )
            })}
          </div>

          {/* Count */}
          {!loading && services.length > 0 && (
            <motion.p
              key={activeCategory + '-count'}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center font-sans text-xs text-muted tracking-widest uppercase mb-10"
            >
              {services.length} {services.length === 1 ? 'Service' : 'Services'} Available
            </motion.p>
          )}

          {/* Grid */}
          {loading ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
              {Array.from({ length: 8 }).map((_, i) => (
                <div key={i} className="aspect-portrait rounded-2xl overflow-hidden bg-warm-white animate-pulse relative">
                  {/* Fake image area */}
                  <div className="absolute inset-0 bg-linear-to-br from-charcoal/8 to-charcoal/4" />
                  {/* Fake text at bottom */}
                  <div className="absolute bottom-0 left-0 right-0 p-5 space-y-2">
                    <div className="h-2 bg-charcoal/10 rounded w-1/2" />
                    <div className="h-4 bg-charcoal/15 rounded w-3/4" />
                    <div className="h-3 bg-charcoal/10 rounded w-1/3" />
                  </div>
                </div>
              ))}
            </div>
          ) :services.length === 0 ? (
            <div className="text-center py-24">
              <p className="font-playfair text-3xl text-charcoal mb-3">No services found</p>
              <p className="font-sans text-muted text-sm">Try a different category.</p>
            </div>
          ) : (
            <AnimatePresence mode="wait">
              <motion.div
                key={activeCategory}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
                className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5"
              >
                {services.map((service, i) => (
                  <PremiumCard key={service._id} service={service} index={i} />
                ))}
              </motion.div>
            </AnimatePresence>
          )}
        </div>
      </section>
    </>
  )
}
