'use client'

import { motion } from 'framer-motion'

const scrollItems = [
  { name: 'Sarah Al Mansouri', snippet: 'Pure luxury — best salon in Dubai' },
  { name: 'Fatima Hassan',     snippet: 'Consistent, professional, perfection' },
  { name: 'Priya Sharma',      snippet: 'My wedding look was absolutely stunning' },
  { name: 'Emma Williams',     snippet: 'The home service is a game-changer' },
  { name: 'Layla Al Rashid',   snippet: 'Always leave feeling pampered' },
  { name: 'Sophie Martin',     snippet: 'Staff knows your preferences instantly' },
  { name: 'Aisha Mohammed',    snippet: 'Breathtaking henna and nail art' },
  { name: 'Natalia Ivanova',   snippet: 'Colour correction was flawless' },
]

export function ReviewsMarquee() {
  const items = [...scrollItems, ...scrollItems]
  return (
    <div className="overflow-hidden border-y border-warm-white/8 bg-[#0e0e1c] py-4">
      <motion.div
        animate={{ x: [0, '-50%'] }}
        transition={{ repeat: Infinity, duration: 28, ease: 'linear' }}
        className="flex gap-0 whitespace-nowrap"
      >
        {items.map((item, i) => (
          <span key={i} className="inline-flex items-center gap-3 px-8 border-r border-warm-white/6">
            <span className="text-gold-accent text-xs tracking-widest">★★★★★</span>
            <span className="font-cormorant italic text-warm-white/60 text-sm">&ldquo;{item.snippet}&rdquo;</span>
            <span className="font-sans text-[10px] tracking-widest uppercase text-muted-light">— {item.name}</span>
          </span>
        ))}
      </motion.div>
    </div>
  )
}
