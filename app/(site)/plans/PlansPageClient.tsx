'use client'

import { useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import {
  Check, X, Zap, Crown, Sparkles, ArrowRight,
  BadgePercent, CalendarCheck, Gift, UserCheck,
} from 'lucide-react'
import { FadeIn } from '@/components/animations/FadeIn'
import type { Plan } from '@/types'

// ── Helpers ──────────────────────────────────────────────────────────────────

const planIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  essential: Zap,
  luxe:      Sparkles,
  royal:     Crown,
}

type CardStyle = {
  stripe:    string
  icon:      string
  badge:     string
  cta:       string
  check:     string
  accent:    string
  ring:      string
}

const cardStyles: Record<string, CardStyle> = {
  charcoal: {
    stripe: 'bg-charcoal',
    icon:   'bg-charcoal/6 border-charcoal/15 text-charcoal',
    badge:  'bg-charcoal text-warm-white',
    cta:    'bg-charcoal text-warm-white hover:bg-rose-dark',
    check:  'text-charcoal',
    accent: 'text-muted',
    ring:   '',
  },
  rose: {
    stripe: 'bg-rose-primary',
    icon:   'bg-rose-primary/8 border-rose-primary/25 text-rose-primary',
    badge:  'bg-rose-primary text-white',
    cta:    'bg-rose-primary text-white hover:bg-rose-dark',
    check:  'text-rose-primary',
    accent: 'text-rose-primary',
    ring:   'border-rose-primary/20 shadow-luxury',
  },
  gold: {
    stripe: 'bg-gold-accent',
    icon:   'bg-gold-accent/8 border-gold-accent/25 text-gold-accent',
    badge:  'bg-gold-accent text-charcoal',
    cta:    'bg-gold-accent text-charcoal hover:bg-gold-light',
    check:  'text-gold-accent',
    accent: 'text-gold-accent',
    ring:   'border-gold-accent/30 shadow-gold',
  },
}

const advantages = [
  {
    Icon:     BadgePercent,
    title:    'Save Up to 30%',
    desc:     'Members always pay less than walk-in rates on every service, every visit.',
    fill:     'bg-rose-primary',
    iconRing: 'bg-rose-primary/8 border-rose-primary/20 text-rose-primary',
  },
  {
    Icon:     CalendarCheck,
    title:    'Priority Booking',
    desc:     'Skip the wait — members get first access to peak slots before they open to the public.',
    fill:     'bg-gold-accent',
    iconRing: 'bg-gold-accent/8 border-gold-accent/20 text-gold-accent',
  },
  {
    Icon:     Gift,
    title:    'Exclusive Perks',
    desc:     'Birthday gifts, early event access, monthly surprises and rewards that grow with your plan.',
    fill:     'bg-rose-dark',
    iconRing: 'bg-rose-dark/8 border-rose-dark/20 text-rose-dark',
  },
  {
    Icon:     UserCheck,
    title:    'Dedicated Care',
    desc:     'Your stylist knows your preferences before you walk in — no briefing, just results.',
    fill:     'bg-charcoal',
    iconRing: 'bg-charcoal/6 border-charcoal/15 text-charcoal',
  },
]

const faqs = [
  { q: 'Can I cancel anytime?',          a: 'Yes. Monthly plans can be cancelled before the next billing date. Yearly plans are non-refundable but fully transferable.' },
  { q: 'Can I upgrade or downgrade?',    a: 'Absolutely — switch plans anytime. Upgrades take effect immediately; downgrades apply at the next billing cycle.' },
  { q: 'Do unused visits roll over?',    a: 'Essential and Luxe visits do not roll over, but we allow a 3-day grace period past the billing date.' },
  { q: 'Can I share my membership?',     a: 'Memberships are personal, but you can gift a plan to someone else as a present.' },
  { q: 'Is there a minimum commitment?', a: 'Monthly plans have no minimum. Yearly plans are a 12-month commitment with discounted pricing.' },
]

const comparisonRows = [
  { feature: 'Visits per month',   essential: '1',    luxe: '3',  royal: '∞'    },
  { feature: 'Hair services',      essential: '✓',    luxe: '✓',  royal: '✓'    },
  { feature: 'Nail services',      essential: '—',    luxe: '✓',  royal: '✓'    },
  { feature: 'Spa services',       essential: '—',    luxe: '—',  royal: '✓'    },
  { feature: 'Home service',       essential: '—',    luxe: '—',  royal: '1/mo' },
  { feature: 'Priority booking',   essential: '✓',    luxe: '✓',  royal: '✓'    },
  { feature: 'Birthday gift',      essential: '—',    luxe: '✓',  royal: '✓'    },
]

// ── Component ─────────────────────────────────────────────────────────────────

export default function PlansPageClient({ plans }: { plans: Plan[] }) {
  const [yearly,  setYearly]  = useState(false)
  const [openFaq, setOpenFaq] = useState<number | null>(null)

  return (
    <>
      {/* ── Hero ──────────────────────────────────────────────────────── */}
      <section className="relative pt-36 pb-20 md:pt-44 md:pb-24 bg-charcoal overflow-hidden">

        {/* Decorative orbs */}
        <div className="absolute -top-40 -right-40 w-120 h-120 rounded-full bg-rose-primary/6 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-24 w-96 h-96 rounded-full bg-gold-accent/5 blur-3xl pointer-events-none" />

        {/* Ghost background word */}
        <span
          aria-hidden="true"
          className="absolute inset-0 flex items-center justify-center font-playfair font-bold text-warm-white/3 select-none pointer-events-none leading-none uppercase tracking-widest text-ghost-jumbo"
        >
          PLANS
        </span>

        <div className="container-luxury relative text-center">
          <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <p className="font-cormorant italic text-rose-light text-xl md:text-2xl tracking-widest mb-5">
              Membership Plans
            </p>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.1 }}
            className="font-playfair text-5xl md:text-6xl lg:text-7xl font-medium text-warm-white leading-tight mb-4"
          >
            Invest in<br /><em className="text-rose-light not-italic">Your Beauty</em>
          </motion.h1>

          <motion.div
            initial={{ scaleX: 0, opacity: 0 }} animate={{ scaleX: 1, opacity: 1 }}
            transition={{ duration: 0.9, delay: 0.35 }}
            className="divider-gold w-24 mx-auto my-7 opacity-70"
          />

          <motion.p
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.7, delay: 0.5 }}
            className="font-sans text-muted-light text-lg max-w-xl mx-auto leading-relaxed mb-10"
          >
            Unlock exclusive access to Lumière services with a membership designed around your lifestyle and beauty goals.
          </motion.p>

          {/* Billing toggle */}
          <motion.div
            initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.65 }}
            className="inline-flex items-center gap-1 bg-warm-white border border-charcoal/10 shadow-card rounded-full px-2 py-2"
          >
            <button
              type="button" onClick={() => setYearly(false)}
              className={`px-6 py-2.5 rounded-full font-sans text-sm tracking-wide transition-all duration-300 ${
                !yearly ? 'bg-charcoal text-warm-white shadow-sm' : 'text-muted hover:text-charcoal'
              }`}
            >
              Monthly
            </button>
            <button
              type="button" onClick={() => setYearly(true)}
              className={`px-6 py-2.5 rounded-full font-sans text-sm tracking-wide flex items-center gap-2 transition-all duration-300 ${
                yearly ? 'bg-charcoal text-warm-white shadow-sm' : 'text-muted hover:text-charcoal'
              }`}
            >
              Yearly
              <span className="text-[10px] bg-gold-accent text-charcoal px-2 py-0.5 rounded-full font-medium tracking-wide">
                Save 15%
              </span>
            </button>
          </motion.div>
        </div>
      </section>

      {/* ── Plans grid ────────────────────────────────────────────────── */}
      <section className="py-16 md:py-20 bg-cream-bg">
        <div className="container-luxury">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-stretch">
            {plans.map((plan, index) => {
              const color          = plan.color ?? 'charcoal'
              const style          = cardStyles[color] ?? cardStyles.charcoal
              const Icon           = planIcons[plan.slug?.current ?? ''] ?? Sparkles
              const yearlyMonthly  = plan.yearlyPrice
                ? Math.round(plan.yearlyPrice / 12)
                : Math.round(plan.monthlyPrice * 0.85)
              const price          = yearly ? yearlyMonthly : plan.monthlyPrice
              const yearlySaving   = plan.yearlyPrice
                ? plan.monthlyPrice * 12 - plan.yearlyPrice
                : Math.round(plan.monthlyPrice * 12 * 0.15)
              const isPopular      = plan.popular

              return (
                <motion.div
                  key={plan._id}
                  initial={{ opacity: 0, y: 48 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.14, ease: [0.25, 0.1, 0.25, 1] }}
                  className={`flex flex-col ${isPopular ? 'md:-mt-4 md:pb-4' : ''}`}
                >
                  {/* Popular label above */}
                  {isPopular && plan.badge && (
                    <div className="flex justify-center mb-3">
                      <span className={`${style.badge} font-sans text-[10px] tracking-[0.2em] uppercase px-5 py-1.5 shadow-sm`}>
                        {plan.badge}
                      </span>
                    </div>
                  )}

                  <motion.div
                    whileHover={{ y: -6 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 26 }}
                    className={`relative flex flex-col flex-1 bg-warm-white border shadow-card hover:shadow-card-hover transition-shadow duration-400 overflow-hidden ${
                      isPopular ? `border-2 ${style.ring}` : 'border-charcoal/8'
                    }`}
                  >
                    {/* Coloured top stripe */}
                    <div className={`h-1 w-full ${style.stripe}`} />

                    <div className="p-8 md:p-9 flex flex-col flex-1">
                      {/* Icon + plan name */}
                      <div className="flex items-center gap-4 mb-5">
                        <div className={`w-12 h-12 rounded-full border flex items-center justify-center shrink-0 ${style.icon}`}>
                          <Icon className="w-5 h-5" />
                        </div>
                        <div>
                          <h2 className="font-playfair text-2xl text-charcoal leading-none">{plan.name}</h2>
                          {plan.highlight && (
                            <p className={`font-sans text-[10px] tracking-[0.2em] uppercase mt-1 ${style.accent}`}>
                              {plan.highlight}
                            </p>
                          )}
                        </div>
                      </div>

                      {plan.tagline && (
                        <p className="font-sans text-sm text-muted leading-relaxed mb-6">{plan.tagline}</p>
                      )}

                      {/* Price */}
                      <div className="mb-6">
                        <div className="flex items-end gap-1">
                          <span className="font-sans text-sm text-muted mb-2">AED</span>
                          <AnimatePresence mode="wait">
                            <motion.span
                              key={`${plan._id}-${yearly ? 'y' : 'm'}`}
                              initial={{ opacity: 0, y: -10 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0, y: 10 }}
                              transition={{ duration: 0.18 }}
                              className="font-playfair text-6xl font-medium text-charcoal leading-none"
                            >
                              {price}
                            </motion.span>
                          </AnimatePresence>
                          <span className="font-sans text-sm text-muted mb-2">/mo</span>
                        </div>
                        {yearly && yearlySaving > 0 && (
                          <motion.p
                            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                            className={`font-sans text-xs mt-1.5 ${style.accent}`}
                          >
                            Save AED {yearlySaving} per year
                          </motion.p>
                        )}
                      </div>

                      {/* Gold divider */}
                      <div className="h-px bg-linear-to-r from-transparent via-gold-accent/40 to-transparent mb-6" />

                      {/* Features */}
                      <ul className="space-y-3 mb-8 flex-1">
                        {plan.features.map((f, i) => (
                          <li key={i} className="flex items-start gap-3">
                            {f.included ? (
                              <Check className={`w-4 h-4 mt-0.5 shrink-0 ${style.check}`} />
                            ) : (
                              <X className="w-4 h-4 mt-0.5 shrink-0 text-charcoal/20" />
                            )}
                            <span className={`font-sans text-sm leading-relaxed ${
                              f.included ? 'text-charcoal/80' : 'text-charcoal/25 line-through'
                            }`}>
                              {f.text}
                            </span>
                          </li>
                        ))}
                      </ul>

                      {/* CTA */}
                      <Link
                        href={plan.ctaLink ?? '/booking'}
                        className={`flex items-center justify-center gap-2 w-full py-4 font-sans text-sm tracking-widest uppercase transition-all duration-300 hover:-translate-y-0.5 ${style.cta}`}
                      >
                        {plan.ctaText ?? 'Get Started'}
                        <ArrowRight className="w-4 h-4" />
                      </Link>
                    </div>
                  </motion.div>

                  {/* Non-popular badge below */}
                  {!isPopular && plan.badge && (
                    <div className="flex justify-center mt-3">
                      <span className={`${style.badge} font-sans text-[10px] tracking-[0.2em] uppercase px-4 py-1`}>
                        {plan.badge}
                      </span>
                    </div>
                  )}
                </motion.div>
              )
            })}
          </div>

          {/* Trust note */}
          <FadeIn>
            <p className="text-center font-sans text-xs text-muted mt-10 tracking-wide">
              No commitment required · Cancel anytime · Instant activation
            </p>
          </FadeIn>
        </div>
      </section>

      {/* ── Why Join ──────────────────────────────────────────────────── */}
      <section className="py-20 md:py-28 bg-warm-white">
        <div className="container-luxury">
          <FadeIn>
            <div className="text-center mb-14">
              <p className="font-cormorant italic text-rose-primary text-xl tracking-widest mb-3">Why Join?</p>
              <h2 className="font-playfair text-4xl md:text-5xl text-charcoal font-medium mb-4">
                The Membership Advantage
              </h2>
              <div className="divider-gold w-16 mx-auto opacity-70" />
            </div>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-px bg-charcoal/8">
            {advantages.map(({ Icon, title, desc, fill, iconRing }, i) => (
              <FadeIn key={title} delay={i * 0.08}>
                <div className="group relative bg-warm-white overflow-hidden p-10 cursor-default">
                  <div className={`absolute inset-0 ${fill} translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out`} />
                  <div className="relative flex flex-col items-center text-center">
                    <div className={`w-16 h-16 rounded-full border flex items-center justify-center mb-6 transition-all duration-400 ${iconRing} group-hover:bg-warm-white/20 group-hover:border-warm-white/30`}>
                      <Icon className="w-7 h-7 transition-colors duration-300 group-hover:text-warm-white" />
                    </div>
                    <span className="absolute top-0 right-0 font-playfair text-7xl font-medium text-charcoal/4 group-hover:text-warm-white/8 transition-colors duration-300 leading-none select-none">
                      0{i + 1}
                    </span>
                    <h3 className="font-playfair text-xl text-charcoal group-hover:text-warm-white mb-3 transition-colors duration-300">
                      {title}
                    </h3>
                    <div className="h-px w-10 bg-charcoal/12 group-hover:bg-warm-white/40 mb-4 transition-colors duration-300" />
                    <p className="font-sans text-sm text-muted leading-relaxed group-hover:text-warm-white/80 transition-colors duration-300">
                      {desc}
                    </p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── Comparison table — dark contrast ──────────────────────────── */}
      <section className="py-20 md:py-28 bg-charcoal">
        <div className="container-luxury max-w-3xl">
          <FadeIn>
            <div className="text-center mb-14">
              <p className="font-cormorant italic text-rose-light text-xl tracking-widest mb-3">At a Glance</p>
              <h2 className="font-playfair text-4xl text-warm-white font-medium">Plan Comparison</h2>
            </div>
          </FadeIn>

          <FadeIn delay={0.1}>
            <div className="overflow-x-auto">
              <table className="w-full font-sans text-sm">
                <thead>
                  <tr className="border-b border-warm-white/10">
                    <th className="text-left py-4 pr-4 text-muted-light font-normal tracking-wide">Feature</th>
                    {plans.map(p => (
                      <th key={p._id}
                        className={`py-4 px-4 text-center font-playfair text-base font-normal ${
                          p.color === 'rose' ? 'text-rose-light' : p.color === 'gold' ? 'text-gold-accent' : 'text-warm-white'
                        }`}
                      >
                        {p.name}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {comparisonRows.map(({ feature, essential, luxe, royal }, i) => {
                    const rowVals = { essential, luxe, royal }
                    return (
                      <tr key={feature} className={`border-b border-warm-white/5 ${i % 2 !== 0 ? 'bg-warm-white/[0.02]' : ''}`}>
                        <td className="py-3.5 pr-4 text-muted-light">{feature}</td>
                        {plans.map(p => {
                          const slug = p.slug?.current as keyof typeof rowVals
                          const v = rowVals[slug] ?? '—'
                          const isNo = v === '—'
                          return (
                            <td key={p._id}
                              className={`py-3.5 px-4 text-center ${
                                isNo
                                  ? 'text-muted-light/25'
                                  : p.color === 'rose'
                                    ? 'text-rose-light font-medium'
                                    : p.color === 'gold'
                                      ? 'text-gold-accent font-medium'
                                      : 'text-warm-white'
                              }`}
                            >
                              {v}
                            </td>
                          )
                        })}
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── FAQ ───────────────────────────────────────────────────────── */}
      <section className="py-20 md:py-28 bg-cream-bg">
        <div className="container-luxury max-w-2xl">
          <FadeIn>
            <div className="text-center mb-14">
              <p className="font-cormorant italic text-rose-primary text-xl tracking-widest mb-3">Questions</p>
              <h2 className="font-playfair text-4xl text-charcoal font-medium mb-4">Frequently Asked</h2>
              <div className="divider-gold w-16 mx-auto opacity-70" />
            </div>
          </FadeIn>

          <div className="space-y-2">
            {faqs.map((faq, i) => (
              <FadeIn key={i} delay={i * 0.06}>
                <div className="bg-warm-white border border-charcoal/8 overflow-hidden shadow-sm hover:shadow-card transition-shadow duration-300">
                  <button
                    type="button"
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    className="w-full flex items-center justify-between p-6 text-left group"
                  >
                    <span className="font-playfair text-lg text-charcoal group-hover:text-rose-primary transition-colors duration-300 pr-4">
                      {faq.q}
                    </span>
                    <motion.span
                      animate={{ rotate: openFaq === i ? 45 : 0 }}
                      transition={{ duration: 0.22 }}
                      className="font-sans text-2xl text-rose-primary shrink-0 leading-none"
                    >
                      +
                    </motion.span>
                  </button>
                  <AnimatePresence>
                    {openFaq === i && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.28, ease: 'easeInOut' }}
                      >
                        <div className="px-6 pb-6 border-t border-charcoal/6 pt-4">
                          <p className="font-sans text-sm text-muted leading-relaxed">{faq.a}</p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ───────────────────────────────────────────────────────── */}
      <section className="relative py-20 bg-rose-primary text-center overflow-hidden">
        <div className="absolute inset-0 pointer-events-none flex" aria-hidden="true">
          {[1,2,3].map(i => <div key={i} className="flex-1 border-r border-white/8" />)}
        </div>
        <div className="absolute -top-20 -left-20 w-80 h-80 rounded-full bg-white/5 blur-3xl pointer-events-none" />
        <div className="container-luxury relative">
          <FadeIn>
            <p className="font-cormorant italic text-warm-white/70 text-xl tracking-widest mb-3">Ready to Begin?</p>
            <h2 className="font-playfair text-4xl md:text-5xl text-warm-white font-medium mb-4">Join Lumière Today</h2>
            <div className="divider-gold w-16 mx-auto mb-6 opacity-50" />
            <p className="font-sans text-warm-white/80 mb-10 max-w-md mx-auto leading-relaxed">
              Choose your plan and start your luxury beauty journey. Cancel or change anytime.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/booking"
                className="inline-flex items-center gap-2 px-10 py-4 bg-charcoal text-warm-white font-sans text-sm tracking-widest uppercase hover:bg-rose-dark transition-all duration-300 hover:-translate-y-0.5"
              >
                Book a Consultation
              </Link>
              <a
                href="https://wa.me/971501234567"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-10 py-4 border border-warm-white/50 text-warm-white font-sans text-sm tracking-widest uppercase hover:bg-warm-white/10 transition-all duration-300 hover:-translate-y-0.5"
              >
                Chat on WhatsApp
              </a>
            </div>
          </FadeIn>
        </div>
      </section>
    </>
  )
}
