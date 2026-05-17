'use client'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Scissors, Sparkles, Star, Leaf, Home } from 'lucide-react'

const categories = [
  { name: 'Hair',         slug: 'hair',         icon: Scissors, description: 'Cuts, color & styling',   count: '15+', fill: 'bg-rose-primary' },
  { name: 'Nails',        slug: 'nails',        icon: Sparkles, description: 'Manicure & pedicure',     count: '12+', fill: 'bg-gold-accent'  },
  { name: 'Makeup',       slug: 'makeup',       icon: Star,     description: 'Bridal & everyday glam',  count: '8+',  fill: 'bg-rose-dark'   },
  { name: 'Spa',          slug: 'spa',          icon: Leaf,     description: 'Relaxation & wellness',   count: '10+', fill: 'bg-rose-primary' },
  { name: 'Home Service', slug: 'home-service', icon: Home,     description: 'We come to you',          count: '20+', fill: 'bg-gold-accent'  },
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
              >
                <Link
                  href={`/services?category=${cat.slug}`}
                  className="group relative flex flex-col items-center p-6 border border-warm-white/10 hover:border-transparent transition-colors duration-300 text-center overflow-hidden"
                >
                  {/* Color fill from bottom */}
                  <div className={`absolute inset-0 ${cat.fill} translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out`} />

                  {/* Service count badge */}
                  <span className="absolute top-3 right-3 z-10 bg-warm-white/10 group-hover:bg-white/20 text-warm-white/50 group-hover:text-white text-[9px] font-sans tracking-widest px-2 py-0.5 transition-colors duration-300">
                    {cat.count}
                  </span>

                  <div className="relative z-10 w-14 h-14 rounded-full border border-gold-accent/30 group-hover:border-white/40 flex items-center justify-center mb-4 transition-all duration-300">
                    <Icon className="w-6 h-6 text-gold-accent group-hover:text-white transition-colors duration-300" />
                  </div>
                  <h3 className="relative z-10 font-playfair text-lg text-warm-white mb-1">{cat.name}</h3>
                  <p className="relative z-10 font-sans text-xs text-muted-light group-hover:text-white/80 transition-colors duration-300">{cat.description}</p>
                </Link>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
