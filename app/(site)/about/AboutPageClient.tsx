'use client'

import { motion } from 'framer-motion'

const milestones = [
  { year: '2016', event: 'Lumière founded in Dubai Marina with a vision for accessible luxury.' },
  { year: '2018', event: 'Expanded to full beauty & spa services, doubling the team.' },
  { year: '2020', event: 'Launched Home Service offering for exclusive at-home appointments.' },
  { year: '2022', event: 'Awarded Best Luxury Salon — Dubai Beauty Awards.' },
  { year: '2024', event: 'Reached 5,000+ satisfied clients milestone.' },
]

export function AnimatedTimeline() {
  return (
    <div className="relative">
      {/* Vertical line */}
      <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-linear-to-b from-rose-primary/60 via-gold-accent/40 to-transparent -translate-x-1/2 hidden md:block" />

      <div className="space-y-0">
        {milestones.map((m, i) => {
          const isRight = i % 2 === 0
          return (
            <motion.div
              key={m.year}
              initial={{ opacity: 0, x: isRight ? -30 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.6, delay: i * 0.1, ease: [0.25, 0.1, 0.25, 1] }}
              className={`group relative grid md:grid-cols-2 gap-0 ${isRight ? '' : 'direction-rtl'}`}
            >
              {/* Year side */}
              <div className={`${isRight ? 'md:text-right md:pr-16' : 'md:order-2 md:pl-16'} py-8 md:py-10`}>
                <span className="font-playfair text-5xl md:text-6xl font-medium text-rose-primary/80 group-hover:text-rose-primary transition-colors duration-300 leading-none block mb-3">
                  {m.year}
                </span>
                <div className={`h-px w-12 bg-gold-accent/50 ${isRight ? 'md:ml-auto' : ''}`} />
              </div>

              {/* Dot on center line */}
              <div className="hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 rounded-full bg-rose-primary border-2 border-[#08080f] z-10 group-hover:bg-gold-accent group-hover:scale-125 transition-all duration-300" />

              {/* Event side */}
              <div className={`${isRight ? 'md:pl-16' : 'md:order-1 md:pr-16 md:text-right'} pb-8 md:py-10`}>
                <p className="font-sans text-warm-white/80 leading-relaxed group-hover:text-warm-white transition-colors duration-300 text-lg">
                  {m.event}
                </p>
              </div>
            </motion.div>
          )
        })}
      </div>
    </div>
  )
}

export function StatsMarquee() {
  const stats = [
    '20+ Experts', '·', '8 Years', '·', '5K+ Clients', '·', '4.9 Rating', '·',
    '50+ Treatments', '·', 'Dubai Marina', '·', 'World-Class', '·',
  ]
  return (
    <div className="overflow-hidden border-y border-warm-white/8 bg-[#16162a] py-4">
      <motion.div
        animate={{ x: [0, '-50%'] }}
        transition={{ repeat: Infinity, duration: 18, ease: 'linear' }}
        className="flex gap-8 whitespace-nowrap"
      >
        {[...stats, ...stats].map((s, i) => (
          <span key={i} className={`font-sans text-xs tracking-[0.2em] uppercase ${s === '·' ? 'text-gold-accent' : 'text-muted-light'}`}>
            {s}
          </span>
        ))}
      </motion.div>
    </div>
  )
}
