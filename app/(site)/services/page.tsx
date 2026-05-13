'use client'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { PageHero } from '@/components/layout/PageHero'
import { ServiceCard } from '@/components/ui/ServiceCard'
import type { Service } from '@/types'

const categories = [
  { slug: 'all', name: 'All Services' },
  { slug: 'hair', name: 'Hair' },
  { slug: 'nails', name: 'Nails' },
  { slug: 'makeup', name: 'Makeup' },
  { slug: 'spa', name: 'Spa' },
  { slug: 'home-service', name: 'Home Service' },
]

export default function ServicesPage() {
  const [activeCategory, setActiveCategory] = useState('all')
  const [services, setServices] = useState<Service[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    const url = activeCategory === 'all' ? '/api/services' : `/api/services?category=${activeCategory}`
    fetch(url)
      .then(r => r.json())
      .then(d => { setServices(d.data || []); setLoading(false) })
      .catch(() => setLoading(false))
  }, [activeCategory])

  return (
    <>
      <PageHero
        eyebrow="Beauty Services"
        title="Our Signature Treatments"
        subtitle="From transformative hair treatments to luxurious spa rituals — discover our full collection of premium beauty services."
        dark
      />

      <section className="py-16 md:py-24 bg-cream-bg">
        <div className="container-luxury">
          {/* Category Filters */}
          <div className="flex flex-wrap items-center justify-center gap-3 mb-12">
            {categories.map((cat) => (
              <button
                key={cat.slug}
                onClick={() => setActiveCategory(cat.slug)}
                className={`px-6 py-2.5 font-sans text-xs tracking-widest uppercase transition-all duration-300 ${
                  activeCategory === cat.slug
                    ? 'bg-rose-primary text-white'
                    : 'border border-charcoal/20 text-charcoal hover:border-rose-primary hover:text-rose-primary'
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>

          {/* Grid */}
          {loading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="bg-warm-white h-80 animate-pulse" />
              ))}
            </div>
          ) : services.length === 0 ? (
            <div className="text-center py-20">
              <p className="font-playfair text-2xl text-charcoal mb-2">No services found</p>
              <p className="font-sans text-muted">Check back soon or try a different category.</p>
            </div>
          ) : (
            <AnimatePresence mode="wait">
              <motion.div
                key={activeCategory}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.4 }}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
              >
                {services.map((service) => (
                  <ServiceCard key={service._id} service={service} />
                ))}
              </motion.div>
            </AnimatePresence>
          )}
        </div>
      </section>
    </>
  )
}
