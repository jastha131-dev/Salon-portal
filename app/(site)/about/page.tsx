import type { Metadata } from 'next'
import Link from 'next/link'
import { Heart, Eye, Award, Sparkles, Shield, Users } from 'lucide-react'
import { FadeIn } from '@/components/animations/FadeIn'
import { StaggerContainer, StaggerItem } from '@/components/animations/StaggerContainer'
import { getTeam, getSiteSettings } from '@/lib/api/fetchers'
import { urlFor } from '@/lib/sanity/image'
import { AnimatedTimeline, StatsMarquee } from './AboutPageClient'

export const metadata: Metadata = {
  title: 'About Us | Lumière Beauty Salon Dubai',
  description: 'Discover the Lumière story — our passion for beauty, our team, and our commitment to luxury service in Dubai.',
}
export const revalidate = 3600

const values = [
  { icon: Heart,    n: '01', title: 'Passion for Beauty',      desc: 'Every treatment is crafted with genuine care and artistic expertise.',                              fill: 'bg-rose-primary' },
  { icon: Award,    n: '02', title: 'Uncompromising Quality',  desc: 'We use only the finest products and techniques trusted by professionals worldwide.',              fill: 'bg-charcoal'     },
  { icon: Sparkles, n: '03', title: 'Personalised Experience', desc: 'Your unique beauty is our inspiration. No two clients are the same.',                              fill: 'bg-rose-dark'    },
  { icon: Shield,   n: '04', title: 'Trust & Safety',          desc: 'Hygiene, professionalism, and your wellbeing are always our top priority.',                        fill: 'bg-[#1a0a30]'    },
  { icon: Users,    n: '05', title: 'Community',               desc: 'Building lasting relationships with our clients, one appointment at a time.',                      fill: 'bg-rose-primary' },
  { icon: Eye,      n: '06', title: 'Attention to Detail',     desc: 'Perfection lives in the details — from first consultation to final finish.',                       fill: 'bg-charcoal'     },
]

export default async function AboutPage() {
  const [team, settings] = await Promise.all([getTeam(), getSiteSettings()])
  const aboutHeroUrl = settings?.aboutHeroImage?.asset
    ? urlFor(settings.aboutHeroImage).width(1920).height(800).url()
    : null

  return (
    <>
      {/* ── Hero ──────────────────────────────────────────────────────── */}
      <section className="relative pt-36 pb-28 md:pt-44 md:pb-36 bg-[#08080f] overflow-hidden">

        {/* Optional hero image */}
        {aboutHeroUrl && (
          <img src={aboutHeroUrl} alt="" aria-hidden="true"
            className="absolute inset-0 w-full h-full object-cover object-center opacity-[0.12] pointer-events-none select-none" />
        )}

        {/* Ghost year */}
        <span
          aria-hidden="true"
          className="absolute right-0 top-1/2 -translate-y-1/2 font-playfair font-bold text-warm-white/[0.025] select-none pointer-events-none leading-none translate-x-[10%] text-ghost-jumbo"
        >
          2016
        </span>

        {/* Column lines */}
        <div className="absolute inset-0 pointer-events-none flex" aria-hidden="true">
          {[1,2,3,4].map(i => <div key={i} className="flex-1 border-r border-warm-white/[0.03]" />)}
        </div>

        {/* Glow */}
        <div className="absolute -top-40 -left-40 w-[500px] h-[500px] rounded-full bg-rose-primary/5 blur-3xl pointer-events-none" />

        <div className="container-luxury relative">
          <div className="max-w-3xl">
            <FadeIn>
              <p className="font-cormorant italic text-rose-light text-xl md:text-2xl tracking-widest mb-7">
                Our Story
              </p>
              <h1
                className="text-fluid-h1-sm font-playfair font-medium text-warm-white leading-[0.9] mb-8"
              >
                8 Years of<br />
                <em className="text-rose-light not-italic">Transforming<br />Beauty</em>
              </h1>
              <div className="h-px w-20 bg-linear-to-r from-gold-accent to-transparent mb-10 opacity-80" />
              <p className="font-sans text-muted-light text-lg max-w-lg leading-relaxed mb-14">
                Founded in 2016, Lumière grew from a bold vision into Dubai&apos;s most beloved luxury beauty destination.
              </p>

              {/* Inline facts */}
              <div className="flex flex-wrap gap-10 md:gap-16">
                {[
                  { n: '20+',  l: 'Specialists'  },
                  { n: '50+',  l: 'Treatments'   },
                  { n: '5K+',  l: 'Happy Clients' },
                  { n: '2016', l: 'Est. Dubai'    },
                ].map(s => (
                  <div key={s.l}>
                    <p className="font-playfair text-3xl md:text-4xl text-warm-white">{s.n}</p>
                    <p className="font-sans text-[10px] tracking-[0.2em] text-muted-light uppercase mt-1">{s.l}</p>
                  </div>
                ))}
              </div>
            </FadeIn>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-gold-accent/50 to-transparent" />
      </section>

      {/* ── Scrolling facts strip ─────────────────────────────────────── */}
      <StatsMarquee />

      {/* ── Story — editorial split ───────────────────────────────────── */}
      <section className="py-20 md:py-28 bg-[#08080f]">
        <div className="container-luxury">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-start">

            {/* Left: quote card + secondary stats card */}
            <FadeIn direction="left">
              <div className="flex flex-col gap-5">

                {/* Quote card */}
                <div className="relative">
                  <div className="bg-[#16162a] border border-warm-white/6 p-10 md:p-14 relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-20 h-20 border-r border-t border-gold-accent/20 pointer-events-none" />
                    <div className="absolute bottom-0 left-0 w-16 h-16 border-l border-b border-rose-primary/20 pointer-events-none" />
                    <span className="font-playfair text-9xl text-rose-primary/8 leading-none select-none absolute -top-2 left-4 pointer-events-none">
                      &ldquo;
                    </span>
                    <blockquote className="font-cormorant italic text-2xl md:text-3xl text-warm-white leading-snug relative z-10 pt-8">
                      Beauty is not about perfection — it is about feeling radiant in your own skin.
                    </blockquote>
                    <p className="font-sans text-xs text-muted-light tracking-widest uppercase mt-8 relative z-10">
                      — Lumière Founder, 2016
                    </p>
                  </div>

                  {/* Floating accent badge */}
                  <div className="absolute -bottom-5 -right-5 bg-rose-primary text-white p-6 w-36 h-36 flex flex-col items-center justify-center text-center shadow-luxury">
                    <span className="font-playfair text-4xl font-medium">8+</span>
                    <span className="font-sans text-[10px] tracking-widest uppercase mt-1 opacity-80">Years of<br />Excellence</span>
                  </div>
                </div>

                {/* Secondary stats card */}
                <div className="mt-6 bg-[#16162a] border border-warm-white/6 overflow-hidden">
                  <div className="h-px w-full bg-linear-to-r from-transparent via-gold-accent/40 to-transparent" />
                  <div className="grid grid-cols-3 divide-x divide-warm-white/6">
                    {[
                      { v: '5K+',  l: 'Clients Served' },
                      { v: '4.9★', l: 'Avg Rating'     },
                      { v: '50+',  l: 'Treatments'     },
                    ].map(f => (
                      <div key={f.l} className="flex flex-col items-center justify-center py-7 px-4 text-center">
                        <p className="font-playfair text-2xl md:text-3xl text-rose-light mb-1">{f.v}</p>
                        <p className="font-sans text-[9px] tracking-[0.2em] uppercase text-muted-light">{f.l}</p>
                      </div>
                    ))}
                  </div>
                </div>

              </div>
            </FadeIn>

            {/* Right: story text */}
            <FadeIn direction="right" delay={0.15}>
              <p className="font-cormorant italic text-rose-primary text-xl tracking-widest mb-4">The Lumière Story</p>
              <h2 className="font-playfair text-4xl md:text-5xl font-medium text-warm-white mb-6 leading-tight">
                Born from a Love of Beauty
              </h2>
              <div className="h-px w-16 bg-linear-to-r from-gold-accent to-transparent mb-8 opacity-80" />
              <p className="font-sans text-muted-light leading-relaxed mb-4 text-lg">
                Lumière was born from a simple but powerful belief: every woman deserves to feel extraordinary. Our founder, a passionate beauty professional with over 15 years of experience, set out to create a sanctuary that combines world-class techniques with genuine, heartfelt service.
              </p>
              <p className="font-sans text-muted-light leading-relaxed mb-4">
                Starting with a small studio in Dubai Marina, we quickly earned a reputation for transformative results and an unwavering commitment to client satisfaction.
              </p>
              <p className="font-sans text-muted-light leading-relaxed mb-10">
                Today, Lumière is home to a team of 20+ expert stylists, beauticians, and wellness specialists — more than a salon, we are your beauty partner and personal retreat in the heart of Dubai.
              </p>

              {/* Quick facts */}
              <div className="grid grid-cols-3 gap-4 border-t border-warm-white/8 pt-8">
                {[{ v:'20+',l:'Specialists' },{ v:'50+',l:'Treatments' },{ v:'2016',l:'Est. Dubai' }].map(f => (
                  <div key={f.l}>
                    <p className="font-playfair text-2xl font-medium text-rose-primary">{f.v}</p>
                    <p className="font-sans text-[10px] text-muted-light tracking-widest uppercase mt-1">{f.l}</p>
                  </div>
                ))}
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ── Mission & Vision — split colour blocks ─────────────────────── */}
      <section className="grid md:grid-cols-2 overflow-hidden">

        {/* Mission */}
        <div className="group relative bg-charcoal overflow-hidden py-20 px-10 md:px-16">
          <div className="absolute inset-0 bg-rose-primary translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out" />
          <div className="relative">
            <div className="w-12 h-12 border border-rose-primary/40 group-hover:border-warm-white/50 flex items-center justify-center mb-8 transition-colors duration-300">
              <Heart className="w-5 h-5 text-rose-light group-hover:text-warm-white transition-colors duration-300" />
            </div>
            <p className="font-cormorant italic text-rose-light group-hover:text-warm-white/70 text-lg tracking-widest mb-3 transition-colors duration-300">
              Our Mission
            </p>
            <h2 className="font-playfair text-3xl md:text-4xl text-warm-white font-medium mb-6 leading-tight">
              Transforming Beauty, One Client at a Time
            </h2>
            <div className="h-px w-12 bg-gold-accent group-hover:bg-warm-white/60 mb-6 transition-colors duration-300" />
            <p className="font-sans text-muted-light group-hover:text-warm-white/85 leading-relaxed text-lg transition-colors duration-300">
              To provide every client with a transformative beauty experience that combines technical excellence, premium products, and personalised care — making luxury beauty accessible, memorable, and empowering.
            </p>
          </div>
        </div>

        {/* Vision */}
        <div className="group relative bg-[#16162a] overflow-hidden py-20 px-10 md:px-16 border-l border-warm-white/6">
          <div className="absolute inset-0 bg-gold-accent translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out" />
          <div className="relative">
            <div className="w-12 h-12 border border-gold-accent/40 group-hover:border-charcoal/40 flex items-center justify-center mb-8 transition-colors duration-300">
              <Eye className="w-5 h-5 text-gold-accent group-hover:text-charcoal transition-colors duration-300" />
            </div>
            <p className="font-cormorant italic text-gold-light group-hover:text-charcoal/70 text-lg tracking-widest mb-3 transition-colors duration-300">
              Our Vision
            </p>
            <h2 className="font-playfair text-3xl md:text-4xl text-warm-white group-hover:text-charcoal font-medium mb-6 leading-tight transition-colors duration-300">
              The UAE&apos;s Most Trusted Beauty Destination
            </h2>
            <div className="h-px w-12 bg-rose-primary group-hover:bg-charcoal/40 mb-6 transition-colors duration-300" />
            <p className="font-sans text-muted-light group-hover:text-charcoal/75 leading-relaxed text-lg transition-colors duration-300">
              To be the most trusted and beloved luxury beauty destination in the UAE — where artistry meets wellness, and every visit leaves you feeling more beautiful, confident, and radiant.
            </p>
          </div>
        </div>
      </section>

      {/* ── Values — dark numbered grid ────────────────────────────────── */}
      <section className="py-20 md:py-28 bg-[#08080f]">
        <div className="container-luxury">
          <FadeIn>
            <div className="flex items-end justify-between mb-16 gap-6 flex-wrap">
              <div>
                <p className="font-cormorant italic text-rose-light text-xl tracking-widest mb-3">What Drives Us</p>
                <h2 className="font-playfair text-4xl md:text-5xl text-warm-white font-medium">Our Core Values</h2>
              </div>
              <div className="h-px flex-1 min-w-[4rem] bg-linear-to-r from-transparent to-warm-white/8 hidden sm:block" />
            </div>
          </FadeIn>

          <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-warm-white/5">
            {values.map((val) => {
              const Icon = val.icon
              return (
                <StaggerItem key={val.title}>
                  <div className="group relative bg-[#08080f] overflow-hidden p-8 md:p-10 hover:-translate-y-1 transition-transform duration-400">
                    <div className={`absolute inset-0 ${val.fill} translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out`} />
                    <div className="relative">
                      <span className="absolute top-0 right-0 font-playfair text-5xl text-warm-white/[0.04] group-hover:text-warm-white/[0.1] transition-colors duration-400 select-none leading-none">
                        {val.n}
                      </span>
                      <div className="w-11 h-11 border border-gold-accent/25 group-hover:border-warm-white/40 group-hover:bg-warm-white/10 flex items-center justify-center mb-6 transition-all duration-300">
                        <Icon className="w-5 h-5 text-gold-accent group-hover:text-warm-white transition-colors duration-300" />
                      </div>
                      <div className="h-px w-8 bg-warm-white/15 group-hover:bg-warm-white/40 mb-5 transition-colors duration-300" />
                      <h3 className="font-playfair text-xl text-warm-white mb-3">{val.title}</h3>
                      <p className="font-sans text-sm text-muted-light group-hover:text-warm-white/80 leading-relaxed transition-colors duration-300">
                        {val.desc}
                      </p>
                    </div>
                  </div>
                </StaggerItem>
              )
            })}
          </StaggerContainer>
        </div>
      </section>

      {/* ── Timeline ──────────────────────────────────────────────────── */}
      <section className="py-20 md:py-28 bg-charcoal">
        <div className="container-luxury">
          <FadeIn>
            <div className="text-center mb-20">
              <p className="font-cormorant italic text-rose-light text-xl tracking-widest mb-3">Our Journey</p>
              <h2 className="font-playfair text-4xl md:text-5xl text-warm-white font-medium mb-4">Key Milestones</h2>
              <div className="h-px w-16 bg-linear-to-r from-transparent via-gold-accent to-transparent mx-auto opacity-60" />
            </div>
          </FadeIn>

          <AnimatedTimeline />
        </div>
      </section>

      {/* ── Awards / Recognition ──────────────────────────────────────── */}
      <section className="py-20 md:py-28 bg-[#08080f]">
        <div className="container-luxury">
          <FadeIn>
            <div className="text-center mb-16">
              <p className="font-cormorant italic text-gold-light text-xl tracking-widest mb-3">Recognition</p>
              <h2 className="font-playfair text-4xl md:text-5xl text-warm-white font-medium">Awards &amp; Milestones</h2>
            </div>
          </FadeIn>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-px bg-warm-white/5">
            {[
              { year: '2022', award: 'Best Luxury Salon', org: 'Dubai Beauty Awards' },
              { year: '2023', award: 'Top Rated Salon',   org: 'Google Reviews — 4.9★' },
              { year: '2024', award: '5,000+ Clients',    org: 'Community Milestone' },
            ].map((a, i) => (
              <FadeIn key={a.award} delay={i * 0.1}>
                <div className="group bg-[#08080f] p-10 md:p-12 hover:bg-[#16162a] transition-colors duration-400 text-center">
                  <div className="w-16 h-16 border border-gold-accent/25 group-hover:border-gold-accent/60 flex items-center justify-center mx-auto mb-6 transition-all duration-300">
                    <Award className="w-7 h-7 text-gold-accent" />
                  </div>
                  <p className="font-sans text-[10px] tracking-[0.25em] text-gold-accent uppercase mb-3">{a.year}</p>
                  <h3 className="font-playfair text-2xl text-warm-white mb-2">{a.award}</h3>
                  <p className="font-sans text-sm text-muted-light">{a.org}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── Team teaser ───────────────────────────────────────────────── */}
      {team.length > 0 && (
        <section className="py-20 md:py-24 bg-charcoal">
          <div className="container-luxury">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <FadeIn>
                <p className="font-cormorant italic text-rose-light text-xl tracking-widest mb-4">Meet the Artists</p>
                <h2 className="font-playfair text-4xl md:text-5xl text-warm-white font-medium mb-6 leading-tight">
                  Our Team of<br /><span className="text-rose-light">{team.length}+ Experts</span>
                </h2>
                <div className="h-px w-16 bg-linear-to-r from-gold-accent to-transparent mb-8 opacity-70" />
                <p className="font-sans text-muted-light mb-10 max-w-sm leading-relaxed">
                  Every stylist and therapist at Lumière is handpicked for their skill, passion, and dedication to client excellence.
                </p>
                <Link href="/team"
                  className="inline-flex items-center gap-3 px-10 py-4 bg-rose-primary text-white font-sans text-xs tracking-widest uppercase hover:bg-rose-dark transition-all duration-300 hover:-translate-y-0.5 shadow-luxury">
                  Meet Our Team
                  <span aria-hidden="true">→</span>
                </Link>
              </FadeIn>

              {/* Number grid visual */}
              <FadeIn delay={0.15}>
                <div className="grid grid-cols-3 gap-px bg-warm-white/6">
                  {[...Array(6)].map((_, i) => (
                    <div key={i} className="bg-[#16162a] aspect-square flex items-center justify-center group hover:bg-rose-primary/10 transition-colors duration-300">
                      <span className="font-playfair text-3xl font-medium text-warm-white/[0.07] group-hover:text-warm-white/15 transition-colors duration-300 select-none">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                    </div>
                  ))}
                </div>
              </FadeIn>
            </div>
          </div>
        </section>
      )}

      {/* ── CTA — split layout ────────────────────────────────────────── */}
      <section className="grid md:grid-cols-2 min-h-[420px] overflow-hidden">

        {/* Rose side */}
        <div className="relative bg-rose-primary py-20 px-10 md:px-16 xl:px-20 flex flex-col justify-center overflow-hidden">
          <div className="absolute inset-0 pointer-events-none flex" aria-hidden="true">
            {[1,2,3].map(i => <div key={i} className="flex-1 border-r border-white/8" />)}
          </div>
          <div className="absolute -bottom-20 -left-20 w-80 h-80 rounded-full bg-white/5 blur-3xl pointer-events-none" />
          <FadeIn>
            <p className="font-cormorant italic text-warm-white/70 text-xl tracking-widest mb-5">Ready to Begin?</p>
            <h2 className="font-playfair text-4xl md:text-5xl text-warm-white font-medium mb-8 leading-tight">
              Experience<br />Lumière
            </h2>
            <Link href="/booking"
              className="inline-flex items-center gap-3 px-10 py-4 bg-charcoal text-warm-white font-sans text-xs tracking-widest uppercase hover:bg-rose-dark transition-all duration-300 hover:-translate-y-0.5 shadow-luxury self-start">
              Book Your Appointment
              <span aria-hidden="true">→</span>
            </Link>
          </FadeIn>
        </div>

        {/* Dark side */}
        <div className="relative bg-[#08080f] py-20 px-10 md:px-16 xl:px-20 flex flex-col justify-center overflow-hidden border-l border-warm-white/5">
          <div className="absolute inset-0 pointer-events-none flex" aria-hidden="true">
            {[1,2,3].map(i => <div key={i} className="flex-1 border-r border-warm-white/[0.025]" />)}
          </div>
          <FadeIn delay={0.1}>
            <blockquote className="font-cormorant italic text-4xl md:text-5xl text-warm-white leading-snug mb-10">
              &ldquo;Your beauty, our passion — every single visit.&rdquo;
            </blockquote>
            <div className="flex gap-12">
              <div>
                <p className="font-playfair text-4xl text-rose-light">4.9</p>
                <p className="font-sans text-[10px] tracking-[0.2em] uppercase text-muted-light mt-1">Avg Rating</p>
              </div>
              <div>
                <p className="font-playfair text-4xl text-rose-light">5K+</p>
                <p className="font-sans text-[10px] tracking-[0.2em] uppercase text-muted-light mt-1">Happy Clients</p>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>
    </>
  )
}
