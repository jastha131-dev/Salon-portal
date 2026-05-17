'use client'
import { useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { StarRating } from '@/components/ui/StarRating'
import { ReviewCard } from '@/components/ui/ReviewCard'
import { SectionHeader } from '@/components/ui/SectionHeader'
import type { Review, ReviewSummary } from '@/types'

interface ReviewsSummarySectionProps {
  reviews: Review[]
  summary: ReviewSummary
}

const defaultSummary: ReviewSummary = {
  averageRating: 4.9,
  totalCount: 247,
  distribution: { 5: 210, 4: 25, 3: 8, 2: 3, 1: 1 },
}

const TABS = ['All', 'Hair', 'Nails', 'Makeup', 'Spa']

export function ReviewsSummarySection({ reviews, summary }: ReviewsSummarySectionProps) {
  const [activeTab, setActiveTab] = useState('All')
  const displaySummary = summary?.totalCount > 0 ? summary : defaultSummary

  const filtered = activeTab === 'All'
    ? (reviews?.slice(0, 3) || [])
    : (reviews?.filter(r => r.serviceUsed?.category?.name === activeTab).slice(0, 3) || [])

  return (
    <section className="py-20 md:py-28 bg-cream-bg">
      <div className="container-luxury">
        <SectionHeader eyebrow="Client Reviews" title="Trusted by Thousands" />

        {/* Rating summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-col md:flex-row items-center justify-center gap-12 mb-12 p-10 bg-warm-white"
        >
          <div className="text-center">
            <p className="font-playfair text-7xl font-medium text-charcoal">{displaySummary.averageRating}</p>
            <StarRating rating={displaySummary.averageRating} size="lg" className="justify-center my-2" />
            <p className="font-sans text-sm text-muted">{displaySummary.totalCount.toLocaleString()} reviews</p>
          </div>
          <div className="h-20 w-px bg-charcoal/10 hidden md:block" />
          <div className="space-y-2 w-full max-w-xs">
            {[5, 4, 3, 2, 1].map((star, i) => {
              const count = displaySummary.distribution?.[star] || 0
              const pct = displaySummary.totalCount > 0 ? (count / displaySummary.totalCount) * 100 : 0
              return (
                <div key={star} className="flex items-center gap-3">
                  <span className="font-sans text-sm text-muted w-4">{star}</span>
                  <div className="flex-1 h-2 bg-charcoal/10 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${pct}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.8, delay: i * 0.1 }}
                      className="h-full bg-gold-accent rounded-full"
                    />
                  </div>
                  <span className="font-sans text-xs text-muted w-8 text-right">{count}</span>
                </div>
              )
            })}
          </div>
        </motion.div>

        {/* Category filter tabs */}
        <div className="flex flex-wrap gap-2 justify-center mb-8">
          {TABS.map(tab => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              type="button"
              className={`font-sans text-xs tracking-widest uppercase px-5 py-2 border transition-all duration-200 ${
                activeTab === tab
                  ? 'bg-rose-primary text-white border-rose-primary'
                  : 'border-charcoal/20 text-muted hover:border-rose-primary hover:text-rose-primary'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Review cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10 min-h-50">
          <AnimatePresence mode="wait">
            {filtered.length > 0 ? filtered.map((review, i) => (
              <motion.div
                key={`${activeTab}-${review._id}`}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ delay: i * 0.08, duration: 0.35 }}
              >
                <ReviewCard review={review} compact />
              </motion.div>
            )) : (
              <motion.p
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="col-span-3 text-center py-10 font-sans text-sm text-muted"
              >
                No reviews yet for this category.
              </motion.p>
            )}
          </AnimatePresence>
        </div>

        <div className="text-center">
          <Link
            href="/reviews"
            className="inline-flex items-center gap-2 font-sans text-sm tracking-widest uppercase text-rose-primary border border-rose-primary px-8 py-3.5 hover:bg-rose-primary hover:text-white transition-all duration-300 hover:-translate-y-0.5"
          >
            Read All Reviews
          </Link>
        </div>
      </div>
    </section>
  )
}
