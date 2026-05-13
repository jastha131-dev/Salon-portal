'use client'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Scissors, Sparkles, Star, Leaf, Home } from 'lucide-react'

const categories = [
  { name: 'Hair', slug: 'hair', icon: Scissors, description: 'Cuts, color & styling', count: '15+ services' },
  { name: 'Nails', slug: 'nails', icon: Sparkles, description: 'Manicure & pedicure', count: '12+ services' },
  { name: 'Makeup', slug: 'makeup', icon: Star, description: 'Bridal & everyday glam', count: '8+ services' },
  { name: 'Spa', slug: 'spa', icon: Leaf, description: 'Relaxation & wellness', count: '10+ services' },
  { name: 'Home Service', slug: 'home-service', icon: Home, description: 'We come to you', count: '20+ services' },
]

export function CategoriesSection() {
  return (
    <section className="py-20 md:py-28 bg-charcoal">
      <div className="container-luxury">
        <div className="text-center mb-16">
          <p className="font-cormorant italic text-rose-light text-xl tracking-widest mb-3">Browse By Category</p>
          <h2 className="font-playfair text-4xl md:text-5xl font-medium text-warm-white mb-4">Beauty Categories</h2>
          <div className="divider-gold w-16 mx-auto opacity-60" />
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
          {categories.map((cat, i) => {
            const Icon = cat.icon
            return (
              <motion.div
                key={cat.slug}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.6 }}
                whileHover={{ y: -4 }}
              >
                <Link
                  href={`/services?category=${cat.slug}`}
                  className="group flex flex-col items-center p-6 border border-warm-white/10 hover:border-rose-primary/50 hover:bg-warm-white/5 transition-all duration-300 text-center"
                >
                  <div className="w-14 h-14 rounded-full border border-gold-accent/30 flex items-center justify-center mb-4 group-hover:bg-rose-primary/20 transition-colors">
                    <Icon className="w-6 h-6 text-gold-accent" />
                  </div>
                  <h3 className="font-playfair text-lg text-warm-white mb-1">{cat.name}</h3>
                  <p className="font-sans text-xs text-muted-light mb-2">{cat.description}</p>
                  <span className="font-sans text-xs text-rose-light">{cat.count}</span>
                </Link>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
