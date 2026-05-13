import type { Metadata } from 'next'
import Link from 'next/link'
import { PageHero } from '@/components/layout/PageHero'
import { FadeIn } from '@/components/animations/FadeIn'
import { StaggerContainer, StaggerItem } from '@/components/animations/StaggerContainer'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { getTeam } from '@/lib/api/fetchers'
import { Heart, Eye, Award, Sparkles, Shield, Users } from 'lucide-react'

export const metadata: Metadata = {
  title: 'About Us',
  description:
    'Discover the Lumière story — our passion for beauty, our team, and our commitment to luxury service in Dubai.',
}

export const revalidate = 3600

const values = [
  {
    icon: Heart,
    title: 'Passion for Beauty',
    desc: 'Every treatment is crafted with genuine care and artistic expertise.',
  },
  {
    icon: Award,
    title: 'Uncompromising Quality',
    desc: 'We use only the finest products and techniques trusted by professionals worldwide.',
  },
  {
    icon: Sparkles,
    title: 'Personalised Experience',
    desc: 'Your unique beauty is our inspiration. No two clients are the same.',
  },
  {
    icon: Shield,
    title: 'Trust & Safety',
    desc: 'Hygiene, professionalism, and your wellbeing are always our top priority.',
  },
  {
    icon: Users,
    title: 'Community',
    desc: 'Building lasting relationships with our clients, one appointment at a time.',
  },
  {
    icon: Eye,
    title: 'Attention to Detail',
    desc: 'Perfection lives in the details — from your first consultation to the final finish.',
  },
]

const milestones = [
  { year: '2016', event: 'Lumière founded in Dubai Marina' },
  { year: '2018', event: 'Expanded to full beauty & spa services' },
  { year: '2020', event: 'Launched Home Service offering' },
  { year: '2022', event: 'Awarded Best Luxury Salon — Dubai Beauty Awards' },
  { year: '2024', event: '5,000+ satisfied clients milestone' },
]

export default async function AboutPage() {
  const team = await getTeam()

  return (
    <>
      <PageHero
        eyebrow="Our Story"
        title="Where Passion Meets Artistry"
        subtitle="Founded in 2016, Lumière has grown from a vision into Dubai's most beloved luxury beauty destination."
        dark
      />

      {/* ── Story Section ─────────────────────────────────── */}
      <section className="py-20 md:py-28 bg-cream-bg">
        <div className="container-luxury">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <FadeIn direction="left">
              <div className="relative">
                <div className="h-[480px] bg-gradient-to-br from-rose-light/30 via-warm-white to-gold-light/20 flex items-center justify-center relative overflow-hidden">
                  <div className="absolute inset-0 flex items-end p-10">
                    <blockquote className="font-cormorant italic text-3xl text-charcoal leading-snug">
                      &ldquo;Beauty is not about perfection — it is about feeling radiant in your own skin.&rdquo;
                    </blockquote>
                  </div>
                  <div className="absolute top-6 right-6 w-24 h-24 rounded-full border border-gold-accent/20 flex items-center justify-center">
                    <span className="font-playfair text-gold-accent text-3xl font-medium">L</span>
                  </div>
                </div>
                <div className="absolute -bottom-5 -right-5 bg-rose-primary text-white p-6 w-36 h-36 flex flex-col items-center justify-center text-center">
                  <span className="font-playfair text-4xl font-medium">8+</span>
                  <span className="font-sans text-xs tracking-widest uppercase mt-1">Years of Excellence</span>
                </div>
              </div>
            </FadeIn>

            <FadeIn direction="right" delay={0.2}>
              <p className="font-cormorant italic text-rose-primary text-xl tracking-widest mb-3">
                The Lumière Story
              </p>
              <h2 className="font-playfair text-4xl font-medium text-charcoal mb-5 leading-tight">
                Born from a Love of Beauty
              </h2>
              <div className="divider-gold w-16 mb-6" />
              <p className="font-sans text-muted leading-relaxed mb-4 text-lg">
                Lumière was born from a simple but powerful belief: every woman deserves to feel
                extraordinary. Our founder, a passionate beauty professional with over 15 years of
                experience, set out to create a sanctuary that combines world-class techniques with
                genuine, heartfelt service.
              </p>
              <p className="font-sans text-muted leading-relaxed mb-4">
                Starting with a small studio in Dubai Marina, we quickly earned a reputation for
                transformative results and an unwavering commitment to client satisfaction. Today,
                Lumière is home to a team of 20+ expert stylists, beauticians, and wellness
                specialists.
              </p>
              <p className="font-sans text-muted leading-relaxed">
                We are more than a salon — we are your beauty partner, your confidence booster, your
                personal retreat in the heart of Dubai.
              </p>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ── Mission & Vision ──────────────────────────────── */}
      <section className="py-20 md:py-28 bg-charcoal">
        <div className="container-luxury">
          <SectionHeader eyebrow="Our Purpose" title="Mission & Vision" light />
          <div className="grid md:grid-cols-2 gap-8">
            <FadeIn delay={0.1}>
              <div className="border border-warm-white/10 p-10 hover:border-rose-primary/50 transition-colors duration-300">
                <div className="w-12 h-12 border border-rose-primary/50 flex items-center justify-center mb-6">
                  <Heart className="w-6 h-6 text-rose-light" />
                </div>
                <h3 className="font-playfair text-2xl text-warm-white mb-4">Our Mission</h3>
                <div className="h-px w-12 bg-gold-accent mb-5" />
                <p className="font-sans text-muted-light leading-relaxed">
                  To provide every client with a transformative beauty experience that combines
                  technical excellence, premium products, and personalised care — making luxury
                  beauty accessible, memorable, and empowering.
                </p>
              </div>
            </FadeIn>

            <FadeIn delay={0.2}>
              <div className="border border-warm-white/10 p-10 hover:border-gold-accent/50 transition-colors duration-300">
                <div className="w-12 h-12 border border-gold-accent/50 flex items-center justify-center mb-6">
                  <Eye className="w-6 h-6 text-gold-accent" />
                </div>
                <h3 className="font-playfair text-2xl text-warm-white mb-4">Our Vision</h3>
                <div className="h-px w-12 bg-rose-primary mb-5" />
                <p className="font-sans text-muted-light leading-relaxed">
                  To be the most trusted and beloved luxury beauty destination in the UAE — a place
                  where artistry meets wellness, and where every visit leaves you feeling more
                  beautiful, confident, and radiant than when you arrived.
                </p>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ── Values ───────────────────────────────────────── */}
      <section className="py-20 md:py-28 bg-cream-bg">
        <div className="container-luxury">
          <SectionHeader eyebrow="What Drives Us" title="Our Core Values" />
          <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {values.map((val) => {
              const Icon = val.icon
              return (
                <StaggerItem key={val.title}>
                  <div className="bg-warm-white p-8 group hover:shadow-card-hover transition-shadow duration-300">
                    <div className="w-12 h-12 bg-rose-light/20 flex items-center justify-center mb-5 group-hover:bg-rose-primary transition-all duration-300 rounded-full">
                      <Icon className="w-5 h-5 text-rose-primary group-hover:text-white transition-colors" />
                    </div>
                    <h3 className="font-playfair text-xl text-charcoal mb-3">{val.title}</h3>
                    <p className="font-sans text-sm text-muted leading-relaxed">{val.desc}</p>
                  </div>
                </StaggerItem>
              )
            })}
          </StaggerContainer>
        </div>
      </section>

      {/* ── Timeline ─────────────────────────────────────── */}
      <section className="py-20 md:py-28 bg-warm-white">
        <div className="container-luxury max-w-3xl">
          <SectionHeader eyebrow="Our Journey" title="Key Milestones" />
          <div className="relative">
            <div className="absolute left-16 top-0 bottom-0 w-px bg-gradient-to-b from-rose-primary via-gold-accent to-rose-light" />
            <div className="space-y-8">
              {milestones.map((m, i) => (
                <FadeIn key={m.year} delay={i * 0.1}>
                  <div className="flex items-center gap-8">
                    <div className="w-32 flex-shrink-0 text-right">
                      <span className="font-playfair text-xl font-medium text-rose-primary">
                        {m.year}
                      </span>
                    </div>
                    <div className="w-4 h-4 rounded-full bg-rose-primary border-4 border-warm-white shadow flex-shrink-0 relative z-10" />
                    <p className="font-sans text-charcoal">{m.event}</p>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Team Teaser ───────────────────────────────────── */}
      {team.length > 0 && (
        <section className="py-20 bg-cream-bg">
          <div className="container-luxury text-center">
            <SectionHeader
              eyebrow="Meet the Artists"
              title={`Our Team of ${team.length}+ Experts`}
              subtitle="Every stylist and therapist at Lumière is handpicked for their skill, passion, and dedication."
            />
            <Link
              href="/team"
              className="inline-flex items-center gap-2 font-sans text-sm tracking-widest uppercase text-rose-primary border border-rose-primary px-8 py-3.5 hover:bg-rose-primary hover:text-white transition-all duration-300"
            >
              Meet Our Team
            </Link>
          </div>
        </section>
      )}

      {/* ── CTA ───────────────────────────────────────────── */}
      <section className="py-20 bg-charcoal text-center">
        <div className="container-luxury">
          <FadeIn>
            <p className="font-cormorant italic text-rose-light text-xl tracking-widest mb-3">
              Ready to Begin?
            </p>
            <h2 className="font-playfair text-4xl md:text-5xl text-warm-white font-medium mb-6">
              Experience Lumière
            </h2>
            <Link
              href="/booking"
              className="inline-flex px-12 py-4 bg-rose-primary text-white font-sans text-sm tracking-widest uppercase hover:bg-rose-dark transition-colors duration-300 hover:-translate-y-1 hover:shadow-luxury"
            >
              Book Your Appointment
            </Link>
          </FadeIn>
        </div>
      </section>
    </>
  )
}
