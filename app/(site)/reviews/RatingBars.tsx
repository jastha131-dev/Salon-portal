'use client'
import { motion } from 'framer-motion'
import { StarRating } from '@/components/ui/StarRating'

export function RatingBars({ distribution, total }: { distribution: Record<number, number>; total: number }) {
  return (
    <div className="space-y-4">
      {[5, 4, 3, 2, 1].map((star, i) => {
        const count = distribution?.[star] ?? 0
        const pct   = total > 0 ? (count / total) * 100 : 0
        return (
          <div key={star} className="flex items-center gap-4">
            <div className="shrink-0 w-20 flex justify-end">
              <StarRating rating={star} size="sm" />
            </div>
            <div className="flex-1 h-1.5 bg-warm-white/10 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                whileInView={{ width: `${pct}%` }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
                className={`h-full rounded-full ${star >= 4 ? 'bg-gold-accent' : 'bg-muted/60'}`}
              />
            </div>
            <span className="font-sans text-xs text-muted-light w-8 text-right shrink-0">{count}</span>
          </div>
        )
      })}
    </div>
  )
}
