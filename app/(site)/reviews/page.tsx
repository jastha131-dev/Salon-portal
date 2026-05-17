import type { Metadata } from 'next'
import Link from 'next/link'
import { FadeIn } from '@/components/animations/FadeIn'
import { StarRating } from '@/components/ui/StarRating'
import { getReviews, getReviewSummary } from '@/lib/api/fetchers'
import { RatingBars } from './RatingBars'
import { ReviewsMarquee } from './ReviewsClient'
import { CheckCircle, Star, Shield, Award, ArrowUpRight } from 'lucide-react'
import { format } from 'date-fns'
import type { Review, ReviewSummary } from '@/types'

export const metadata: Metadata = {
  title: 'Client Reviews | Lumière Salon Dubai',
  description: 'Read verified client reviews for Lumière Salon Dubai — real experiences from real clients.',
}
export const revalidate = 3600

const fallbackReviews: Review[] = [
  { _id:'1', customerName:'Sarah Al Mansouri', rating:5, comment:'The best salon experience I have ever had. The team is incredibly talented and the atmosphere is pure luxury. My hair transformation was beyond all expectations!', featured:true,  verified:true, publishedAt:'2024-03-15' },
  { _id:'2', customerName:'Fatima Hassan',      rating:5, comment:'Been coming here for 3 years. Consistent, professional, and they genuinely care about your satisfaction. The nail art is always perfection.',              featured:true,  verified:true, publishedAt:'2024-02-28' },
  { _id:'3', customerName:'Priya Sharma',       rating:5, comment:'Booked the bridal package and I am so happy I did. My wedding look was absolutely stunning — I felt like a queen. Thank you Lumière!',                   featured:true,  verified:true, publishedAt:'2024-02-10' },
  { _id:'4', customerName:'Emma Williams',      rating:5, comment:'The home service is a game-changer! They came fully equipped and professional. Perfect for busy days when you cannot leave the house.',                    featured:false, verified:true, publishedAt:'2024-01-20' },
  { _id:'5', customerName:'Layla Al Rashid',    rating:4, comment:'Always leave feeling pampered and beautiful. The facial treatment is absolutely divine. Highly recommend the deep cleansing option.',                       featured:false, verified:true, publishedAt:'2024-01-05' },
  { _id:'6', customerName:'Sophie Martin',      rating:5, comment:'Discovered Lumière through a friend and now I am a regular. The staff knows your preferences without you having to repeat yourself.',                       featured:false, verified:true, publishedAt:'2023-12-15' },
  { _id:'7', customerName:'Aisha Mohammed',     rating:5, comment:'The henna and nail art combo for Eid was breathtaking. Every guest at the party complimented my look. Lumière never disappoints.',                         featured:false, verified:true, publishedAt:'2023-12-01' },
  { _id:'8', customerName:'Natalia Ivanova',    rating:5, comment:'I drove 40 minutes from Abu Dhabi for my hair appointment. Completely worth it — the colour correction was flawless. Booked my next visit already.',          featured:false, verified:true, publishedAt:'2023-11-18' },
  { _id:'9', customerName:'Rania Khalil',       rating:4, comment:'The spa package is a full retreat. I spent three hours and left feeling completely renewed. The hot stone massage is a must-try.',                          featured:false, verified:true, publishedAt:'2023-11-05' },
]
const fallbackSummary: ReviewSummary = { averageRating:4.9, totalCount:247, distribution:{ 5:210, 4:25, 3:8, 2:3, 1:1 } }

const avatarGradients = [
  'from-rose-dark to-rose-primary',
  'from-[#3A4A6B] to-[#5A7AC9]',
  'from-[#3D5A3A] to-[#5A8A4A]',
  'from-[#6B5A3A] to-[#C9A85A]',
  'from-[#5A3A6B] to-[#A85AC9]',
  'from-[#2A5A6B] to-[#5AC9C0]',
  'from-rose-primary to-rose-light',
  'from-[#4A3A6B] to-[#8A5AC9]',
  'from-[#6B3A4A] to-rose-primary',
]

function initials(name: string | null | undefined) {
  if (!name) return '?'
  return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
}

export default async function ReviewsPage() {
  let reviews: Review[]   = []
  let summary: ReviewSummary = fallbackSummary
  try { ;[reviews, summary] = await Promise.all([getReviews(), getReviewSummary()]) } catch { /* fallback */ }

  const displayReviews = reviews.length > 0 ? reviews : fallbackReviews
  const displaySummary = summary.totalCount > 0 ? summary : fallbackSummary
  const featured       = displayReviews.filter(r => r.featured).slice(0, 3)
  const allReviews     = displayReviews

  return (
    <>
      {/* ── HERO ─────────────────────────────────────────────────────── */}
      <section className="relative min-h-[85vh] flex flex-col justify-center pt-32 pb-0 bg-[#08080f] overflow-hidden">

        {/* Giant ghost rating */}
        <span
          aria-hidden="true"
          className="absolute right-[-5%] top-1/2 -translate-y-1/2 font-playfair font-bold leading-none select-none pointer-events-none text-warm-white/[0.028] text-ghost-hero"
        >
          4.9
        </span>

        {/* Atmospheric glows */}
        <div className="absolute top-1/4 left-0 w-[500px] h-[500px] rounded-full bg-rose-primary/5 blur-[140px] pointer-events-none" />
        <div className="absolute bottom-0 right-1/3 w-80 h-80 rounded-full bg-gold-accent/5 blur-[100px] pointer-events-none" />

        {/* Column lines */}
        <div className="absolute inset-0 pointer-events-none flex" aria-hidden="true">
          {[1,2,3,4].map(i => <div key={i} className="flex-1 border-r border-warm-white/[0.025]" />)}
        </div>

        <div className="container-luxury relative flex-1 flex flex-col justify-center">
          <FadeIn>
            <p className="font-cormorant italic text-rose-light text-xl md:text-2xl tracking-[0.3em] mb-7">
              Client Voices
            </p>
            <h1 className="font-playfair font-medium text-warm-white leading-[0.88] mb-8 text-fluid-h1">
              Real Stories,<br />
              <em className="not-italic gold-shimmer">Real Results</em>
            </h1>
            <div className="h-px w-20 bg-linear-to-r from-gold-accent to-transparent mb-8 opacity-80" />
            <p className="font-sans text-muted-light text-lg max-w-lg leading-relaxed mb-16">
              Over <span className="text-warm-white font-medium">{displaySummary.totalCount}+</span> verified reviews from real clients — see why Lumière is Dubai&apos;s most loved luxury beauty salon.
            </p>
          </FadeIn>

          {/* Stats strip */}
          <FadeIn delay={0.18}>
            <div className="grid grid-cols-2 md:grid-cols-4 border-t border-warm-white/8">
              {[
                { n: `${displaySummary.averageRating.toFixed(1)}★`, l: 'Avg Rating'      },
                { n: `${displaySummary.totalCount}+`,               l: 'Verified Reviews' },
                { n: '98%',                                          l: 'Would Return'     },
                { n: '#1',                                           l: 'Dubai Marina'     },
              ].map((s, i) => (
                <div key={s.l} className={`py-8 px-6 text-center border-r border-warm-white/8 ${i === 3 ? 'border-r-0' : ''}`}>
                  <p className="font-playfair text-3xl md:text-4xl text-warm-white mb-1">{s.n}</p>
                  <p className="font-sans text-[10px] tracking-[0.2em] uppercase text-muted-light">{s.l}</p>
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── MARQUEE ──────────────────────────────────────────────────── */}
      <ReviewsMarquee />

      {/* ── RATING BREAKDOWN ─────────────────────────────────────────── */}
      <section className="py-20 md:py-28 bg-[#0e0e1c]">
        <div className="container-luxury">
          <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">

            {/* Left: dramatic score */}
            <FadeIn direction="left">
              <div>
                <p className="font-cormorant italic text-rose-light text-xl tracking-widest mb-8">Overall Score</p>
                <div className="flex items-end gap-6 mb-6">
                  <span className="text-fluid-rating font-playfair font-medium leading-none gold-shimmer">
                    {displaySummary.averageRating.toFixed(1)}
                  </span>
                  <div className="pb-4 flex flex-col gap-2">
                    <StarRating rating={displaySummary.averageRating} size="lg" animated />
                    <p className="font-sans text-xs text-muted-light tracking-widest uppercase">out of 5.0</p>
                  </div>
                </div>
                <p className="font-sans text-muted-light mb-10">
                  Based on <span className="text-warm-white font-medium">{displaySummary.totalCount.toLocaleString()}</span> client reviews
                </p>

                {/* Platform badges */}
                <div className="flex flex-wrap gap-3">
                  {[
                    { name: 'Google',    score: '4.9', color: 'border-[#4285F4]/30 hover:border-[#4285F4]/60' },
                    { name: 'Facebook',  score: '4.9', color: 'border-[#1877F2]/30 hover:border-[#1877F2]/60' },
                    { name: 'Instagram', score: '4.9', color: 'border-rose-primary/30 hover:border-rose-primary/60' },
                  ].map(p => (
                    <div key={p.name} className={`flex items-center gap-3 border px-5 py-3 transition-colors duration-300 ${p.color}`}>
                      <Star className="w-3.5 h-3.5 text-gold-accent fill-gold-accent" />
                      <span className="font-sans text-xs tracking-widest text-muted-light uppercase">{p.name}</span>
                      <span className="font-playfair text-lg text-warm-white">{p.score}</span>
                    </div>
                  ))}
                </div>
              </div>
            </FadeIn>

            {/* Right: animated bars */}
            <FadeIn direction="right" delay={0.15}>
              <div className="bg-[#16162a] border border-warm-white/6 p-10">
                <div className="absolute top-0 right-0 w-16 h-16 border-t border-r border-gold-accent/20 pointer-events-none" />
                <p className="font-sans text-[10px] tracking-[0.25em] uppercase text-muted-light mb-8">Rating Breakdown</p>
                <RatingBars distribution={displaySummary.distribution} total={displaySummary.totalCount} />
                <div className="mt-10 pt-8 border-t border-warm-white/8 flex items-center gap-3">
                  <CheckCircle className="w-4 h-4 text-emerald-400 shrink-0" />
                  <p className="font-sans text-sm text-muted-light">All reviews verified after completed appointments</p>
                </div>
              </div>
            </FadeIn>

          </div>
        </div>
      </section>

      {/* ── FEATURED — editorial pull-quote rows ─────────────────────── */}
      {featured.length > 0 && (
        <section className="py-20 md:py-28 bg-[#08080f]">
          <div className="container-luxury">
            <FadeIn>
              <div className="flex items-end gap-6 mb-16 flex-wrap">
                <div>
                  <p className="font-cormorant italic text-rose-light text-xl tracking-widest mb-2">Featured</p>
                  <h2 className="font-playfair text-4xl md:text-5xl text-warm-white font-medium">Words That Inspire Us</h2>
                </div>
                <div className="h-px flex-1 min-w-16 bg-linear-to-r from-warm-white/8 to-transparent hidden sm:block" />
              </div>
            </FadeIn>

            {/* Editorial layout: large first + 2 smaller */}
            <div className="space-y-px">
              {featured.map((r, i) => (
                <FadeIn key={r._id} delay={i * 0.1}>
                  <div className="group relative bg-[#16162a] border border-warm-white/6 hover:border-gold-accent/25 overflow-hidden transition-all duration-500">
                    <div className="absolute inset-0 bg-rose-primary/0 group-hover:bg-rose-primary/[0.04] transition-colors duration-500" />

                    {/* Gold top accent line */}
                    <div className="h-px w-0 group-hover:w-full bg-linear-to-r from-gold-accent via-gold-light to-transparent transition-all duration-700 ease-out" />

                    <div className="relative p-8 md:p-12 lg:p-16 grid md:grid-cols-[auto_1fr] gap-8 md:gap-16 items-start">
                      {/* Number */}
                      <div className="shrink-0">
                        <span className={`font-playfair font-medium text-warm-white/[0.06] group-hover:text-warm-white/[0.12] transition-colors duration-400 leading-none select-none ${i === 0 ? 'text-[7rem]' : 'text-[5rem]'}`}>
                          {String(i + 1).padStart(2, '0')}
                        </span>
                      </div>

                      {/* Content */}
                      <div>
                        <StarRating rating={r.rating} size="sm" className="mb-6" />
                        <blockquote className={`font-cormorant italic text-warm-white leading-snug mb-8 ${i === 0 ? 'text-3xl md:text-4xl' : 'text-2xl md:text-3xl'}`}>
                          &ldquo;{r.comment}&rdquo;
                        </blockquote>
                        <div className="flex items-center gap-6">
                          <div className="w-10 h-px bg-gold-accent/50" />
                          <p className="font-playfair text-lg text-warm-white">{r.customerName}</p>
                          {r.verified && (
                            <span className="font-sans text-[10px] tracking-widest uppercase text-emerald-400">✓ Verified</span>
                          )}
                          {r.publishedAt && (
                            <span className="font-sans text-xs text-muted-light ml-auto">
                              {format(new Date(r.publishedAt), 'MMM yyyy')}
                            </span>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── ALL REVIEWS — staggered mosaic ───────────────────────────── */}
      <section className="py-20 md:py-28 bg-charcoal">
        <div className="container-luxury">
          <FadeIn>
            <div className="flex items-end justify-between mb-14 flex-wrap gap-4">
              <div>
                <p className="font-cormorant italic text-rose-light text-xl tracking-widest mb-2">All Reviews</p>
                <h2 className="font-playfair text-4xl md:text-5xl text-warm-white font-medium">
                  {allReviews.length} Client Experiences
                </h2>
              </div>
              <div className="h-px flex-1 min-w-16 bg-linear-to-r from-transparent to-warm-white/8 hidden md:block" />
            </div>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {allReviews.map((r, i) => (
              <FadeIn key={r._id} delay={(i % 3) * 0.07}>
                <div className="group relative bg-[#08080f] border border-warm-white/6 hover:border-rose-primary/30 transition-all duration-400 hover:-translate-y-2 hover:shadow-[0_20px_50px_rgba(0,0,0,0.5)] overflow-hidden flex flex-col h-full">

                  {/* Gold top line expands on hover */}
                  <div className="h-px w-0 group-hover:w-full bg-linear-to-r from-rose-primary to-gold-accent transition-all duration-600 ease-out" />

                  <div className="p-7 flex flex-col flex-1">
                    {/* Header row */}
                    <div className="flex items-center gap-4 mb-5">
                      {/* Gradient avatar */}
                      <div className={`w-11 h-11 rounded-full bg-linear-to-br ${avatarGradients[i % avatarGradients.length]} flex items-center justify-center shrink-0 shadow-sm`}>
                        <span className="font-playfair text-sm font-medium text-white">{initials(r.customerName)}</span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-playfair text-warm-white truncate">{r.customerName}</p>
                        <div className="flex items-center gap-2 mt-0.5">
                          {r.verified && <span className="font-sans text-[9px] text-emerald-400 tracking-widest">✓ Verified</span>}
                          {r.publishedAt && (
                            <span className="font-sans text-[9px] text-muted-light tracking-widest">
                              {format(new Date(r.publishedAt), 'MMM yyyy')}
                            </span>
                          )}
                        </div>
                      </div>
                      <span className="font-sans text-[9px] tracking-[0.2em] text-muted-light/40 shrink-0">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                    </div>

                    {/* Stars */}
                    <StarRating rating={r.rating} size="sm" className="mb-4" />

                    {/* Quote in Cormorant italic */}
                    <blockquote className="font-cormorant italic text-warm-white/75 text-lg leading-relaxed flex-1 line-clamp-3">
                      &ldquo;{r.comment}&rdquo;
                    </blockquote>

                    {/* Bottom gold line */}
                    <div className="mt-5 pt-5 border-t border-warm-white/6 flex items-center justify-between">
                      <div className="h-px w-6 bg-gold-accent/40 group-hover:w-14 transition-all duration-500" />
                      <StarRating rating={r.rating} size="sm" showValue className="opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </div>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>

          {allReviews.length >= 9 && (
            <FadeIn delay={0.2}>
              <p className="text-center font-sans text-xs text-muted-light mt-14 tracking-widest">
                Showing {allReviews.length} of {displaySummary.totalCount.toLocaleString()} verified reviews
              </p>
            </FadeIn>
          )}
        </div>
      </section>

      {/* ── TRUST — editorial numbered rows ──────────────────────────── */}
      <section className="py-20 md:py-24 bg-[#08080f]">
        <div className="container-luxury">
          <FadeIn>
            <div className="mb-14">
              <p className="font-cormorant italic text-rose-light text-xl tracking-widest mb-3">Why Trust Us</p>
              <h2 className="font-playfair text-4xl md:text-5xl text-warm-white font-medium">Our Commitment</h2>
            </div>
          </FadeIn>

          <div className="space-y-px">
            {[
              {
                n: '01', Icon: Shield,   color: 'text-emerald-400',
                title: '100% Verified Reviews',
                desc:  'Every review is linked to a confirmed appointment booking — zero fake reviews, ever.',
                fill:  'bg-emerald-900/60',
              },
              {
                n: '02', Icon: Award,    color: 'text-gold-accent',
                title: 'Top Rated in Dubai',
                desc:  'Consistently recognised across Google, Facebook, and the Dubai Beauty Awards directory.',
                fill:  'bg-[#1a1200]',
              },
              {
                n: '03', Icon: CheckCircle, color: 'text-rose-light',
                title: '98% Client Satisfaction',
                desc:  'An overwhelming majority of clients return within 60 days of their first visit.',
                fill:  'bg-rose-dark/50',
              },
            ].map((item, i) => {
              const Icon = item.Icon
              return (
                <FadeIn key={item.n} delay={i * 0.1}>
                  <div className="group relative bg-[#16162a] overflow-hidden flex items-center gap-8 md:gap-16 p-8 md:p-12 border border-warm-white/6 hover:border-warm-white/10 transition-all duration-400">
                    <div className={`absolute inset-0 ${item.fill} translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out`} />
                    <span className="relative font-playfair font-medium text-warm-white/[0.05] group-hover:text-warm-white/[0.12] transition-colors duration-400 shrink-0 select-none leading-none text-fluid-h1">
                      {item.n}
                    </span>
                    <div className="relative flex-1">
                      <div className="flex items-center gap-4 mb-3">
                        <Icon className={`w-5 h-5 ${item.color} group-hover:text-warm-white transition-colors duration-300`} />
                        <h3 className="font-playfair text-2xl text-warm-white">{item.title}</h3>
                      </div>
                      <p className="font-sans text-sm text-muted-light group-hover:text-warm-white/75 leading-relaxed transition-colors duration-300 max-w-xl">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                </FadeIn>
              )
            })}
          </div>
        </div>
      </section>

      {/* ── CTA — split layout ────────────────────────────────────────── */}
      <section className="grid lg:grid-cols-2 min-h-[440px]">

        {/* Left: dark — leave a review */}
        <div className="relative bg-[#08080f] py-20 px-10 md:px-16 xl:px-20 flex flex-col justify-center overflow-hidden border-r border-warm-white/6">
          <div className="absolute inset-0 pointer-events-none flex" aria-hidden="true">
            {[1,2,3].map(i => <div key={i} className="flex-1 border-r border-warm-white/[0.025]" />)}
          </div>
          <div className="absolute top-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-gold-accent/30 to-transparent" />
          <FadeIn>
            <p className="font-cormorant italic text-rose-light text-xl tracking-widest mb-5">Share Your Experience</p>
            <h2 className="font-playfair text-4xl md:text-5xl text-warm-white font-medium mb-6 leading-tight">
              Had a Visit<br />Recently?
            </h2>
            <div className="h-px w-16 bg-linear-to-r from-gold-accent to-transparent mb-8 opacity-70" />
            <p className="font-sans text-muted-light leading-relaxed mb-10 max-w-sm">
              We love hearing from our clients. Your honest review helps other women in Dubai find their beauty home.
            </p>
            <a
              href="https://g.page/lumieresalon-dubai/review"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-3 border border-warm-white/20 text-warm-white font-sans text-xs tracking-widest uppercase px-8 py-4 hover:border-gold-accent hover:text-gold-accent transition-all duration-300 hover:-translate-y-0.5 self-start"
            >
              <Star className="w-4 h-4" />
              Leave a Google Review
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </FadeIn>
        </div>

        {/* Right: rose — book now */}
        <div className="relative bg-rose-primary py-20 px-10 md:px-16 xl:px-20 flex flex-col justify-center overflow-hidden">
          <div className="absolute inset-0 pointer-events-none flex" aria-hidden="true">
            {[1,2,3].map(i => <div key={i} className="flex-1 border-r border-white/8" />)}
          </div>
          <div className="absolute -top-20 -right-20 w-80 h-80 rounded-full bg-white/5 blur-3xl pointer-events-none" />
          <FadeIn delay={0.1}>
            <p className="font-cormorant italic text-warm-white/70 text-xl tracking-widest mb-5">Ready for Your Moment?</p>
            <h2 className="font-playfair text-4xl md:text-5xl text-warm-white font-medium mb-6 leading-tight">
              Book Your<br />Appointment
            </h2>
            <div className="h-px w-16 bg-white/30 mb-8" />
            <p className="font-sans text-warm-white/80 leading-relaxed mb-10 max-w-sm">
              Experience the Lumière difference for yourself — then share your story with the world.
            </p>
            <Link
              href="/booking"
              className="inline-flex items-center gap-3 bg-charcoal text-warm-white font-sans text-xs tracking-widest uppercase px-10 py-4 hover:bg-rose-dark transition-all duration-300 hover:-translate-y-0.5 shadow-luxury self-start"
            >
              Book Now
              <ArrowUpRight className="w-3.5 h-3.5" />
            </Link>
          </FadeIn>
        </div>
      </section>
    </>
  )
}
