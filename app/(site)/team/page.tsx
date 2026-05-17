import type { Metadata } from 'next'
import { FadeIn } from '@/components/animations/FadeIn'
import { getTeam } from '@/lib/api/fetchers'
import { TeamFilterGrid } from './TeamPageClient'

export const metadata: Metadata = {
  title: 'Our Team | Lumière Beauty Salon Dubai',
  description: 'Meet the talented stylists and beauty experts at Lumière Salon Dubai.',
}
export const revalidate = 3600

const fallbackTeam = [
  { _id:'1', name:'Nour Al Zahra',  role:'Senior Hair Stylist', expertise:['Balayage','Keratin','Bridal'],           image:null, socialLinks:{} },
  { _id:'2', name:'Priya Mehta',    role:'Nail Artist',         expertise:['Gel Nails','Nail Art','Pedicure'],        image:null, socialLinks:{} },
  { _id:'3', name:'Sofia Rossi',    role:'Makeup Artist',       expertise:['Bridal Makeup','Editorial','Airbrush'],    image:null, socialLinks:{} },
  { _id:'4', name:'Aisha Rahman',   role:'Spa Therapist',       expertise:['Massage','Facials','Aromatherapy'],       image:null, socialLinks:{} },
  { _id:'5', name:'Maria Santos',   role:'Colorist',            expertise:['Color Correction','Highlights','Toning'], image:null, socialLinks:{} },
  { _id:'6', name:'Lena Kowalski',  role:'Beauty Therapist',    expertise:['Waxing','Lashes','Brows'],                image:null, socialLinks:{} },
]

export default async function TeamPage() {
  const team    = await getTeam()
  const display = team.length > 0 ? team : fallbackTeam

  return (
    <>
      {/* ── Hero ──────────────────────────────────────────────────────── */}
      <section className="relative pt-36 pb-28 md:pt-44 md:pb-32 bg-[#08080f] overflow-hidden">

        {/* Ghost headline */}
        <span
          aria-hidden="true"
          className="absolute inset-0 flex items-center justify-center font-playfair font-bold text-warm-white/[0.025] select-none pointer-events-none leading-none uppercase tracking-[0.15em] text-ghost-hero"
        >
          ARTISANS
        </span>

        {/* Vertical column lines */}
        <div className="absolute inset-0 pointer-events-none flex" aria-hidden="true">
          {[1,2,3,4].map(i => <div key={i} className="flex-1 border-r border-warm-white/[0.03]" />)}
        </div>

        {/* Glow orbs */}
        <div className="absolute -top-32 -left-32 w-120 h-120 rounded-full bg-rose-primary/5 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-80 h-80 rounded-full bg-gold-accent/4 blur-3xl pointer-events-none" />

        <div className="container-luxury relative">
          <div className="max-w-3xl">
            <FadeIn>
              <p className="font-cormorant italic text-rose-light text-xl md:text-2xl tracking-widest mb-7">
                The Hands Behind Every Look
              </p>
              <h1 className="text-fluid-h1 font-playfair font-medium text-warm-white leading-[0.88] mb-8">
                Meet Our<br />
                <em className="text-rose-light not-italic">Dream<br />Team</em>
              </h1>
              <div className="h-px w-20 bg-linear-to-r from-gold-accent to-transparent mb-8 opacity-80" />
              <p className="font-sans text-muted-light text-lg max-w-md leading-relaxed mb-14">
                Handpicked for their passion, skill, and artistry — every member dedicated to making you look and feel extraordinary.
              </p>

              {/* Inline stats */}
              <div className="flex flex-wrap gap-10 md:gap-16">
                {[
                  { n: '20+',  l: 'Expert Artists'  },
                  { n: '8+',   l: 'Years Together'  },
                  { n: '5K+',  l: 'Clients Served'  },
                  { n: '4.9★', l: 'Avg Rating'      },
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

        {/* Bottom gold line */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-gold-accent/50 to-transparent" />
      </section>

      {/* ── Filtered grid ─────────────────────────────────────────────── */}
      <section className="py-20 md:py-28 bg-[#08080f]">
        <div className="container-luxury">
          <FadeIn>
            <div className="mb-14">
              <p className="font-cormorant italic text-rose-light text-xl tracking-widest mb-3">Our Artists</p>
              <h2 className="text-fluid-h2 font-playfair font-medium text-warm-white leading-tight">
                The People Who<br className="hidden sm:block" /> Make It Happen
              </h2>
            </div>
          </FadeIn>
          <TeamFilterGrid display={display} />
        </div>
      </section>

      {/* ── Philosophy — editorial numbered rows ──────────────────────── */}
      <section className="py-20 md:py-28 bg-charcoal">
        <div className="container-luxury">
          <FadeIn>
            <div className="flex items-end justify-between mb-16 gap-6 flex-wrap">
              <div>
                <p className="font-cormorant italic text-rose-light text-xl tracking-widest mb-3">Our Standard</p>
                <h2 className="font-playfair text-4xl md:text-5xl text-warm-white font-medium">What We Stand For</h2>
              </div>
              <div className="h-px flex-1 min-w-[4rem] bg-linear-to-r from-transparent to-warm-white/10 hidden sm:block" />
            </div>
          </FadeIn>

          <div className="space-y-px">
            {[
              {
                n: '01',
                title: 'Continuous Learning',
                desc: 'Our team trains globally — Paris, Milan, New York — bringing world-class trends to Dubai.',
                fill: 'bg-rose-primary',
              },
              {
                n: '02',
                title: 'Client First Always',
                desc: 'Every consultation starts with listening. Your vision, your confidence, our craft.',
                fill: 'bg-gold-accent',
              },
              {
                n: '03',
                title: 'Certified Excellence',
                desc: 'All specialists hold international certifications and undergo annual skills audits.',
                fill: 'bg-rose-dark',
              },
            ].map((item, i) => (
              <FadeIn key={item.n} delay={i * 0.1}>
                <div className="group relative bg-[#16162a] overflow-hidden flex items-center gap-8 md:gap-16 p-8 md:p-12">
                  <div className={`absolute inset-0 ${item.fill} translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out`} />
                  <span className="relative text-fluid-h1 font-playfair font-medium text-warm-white/[0.06] group-hover:text-warm-white/[0.12] transition-colors duration-400 shrink-0 select-none leading-none">
                    {item.n}
                  </span>
                  <div className="relative">
                    <div className="h-px w-8 bg-gold-accent mb-5 opacity-60 group-hover:opacity-100 group-hover:w-12 transition-all duration-300" />
                    <h3 className="font-playfair text-2xl md:text-3xl text-warm-white mb-3">{item.title}</h3>
                    <p className="font-sans text-sm text-muted-light group-hover:text-warm-white/80 leading-relaxed transition-colors duration-300 max-w-lg">
                      {item.desc}
                    </p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── Careers CTA — split layout ────────────────────────────────── */}
      <section className="grid md:grid-cols-2 min-h-[480px] overflow-hidden">

        {/* Left — dark */}
        <div className="relative bg-[#08080f] py-20 px-10 md:px-16 xl:px-20 flex flex-col justify-center overflow-hidden">
          <div className="absolute inset-0 pointer-events-none flex" aria-hidden="true">
            {[1,2,3].map(i => <div key={i} className="flex-1 border-r border-warm-white/[0.03]" />)}
          </div>
          <div className="absolute top-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-gold-accent/30 to-transparent" />
          <FadeIn>
            <p className="font-cormorant italic text-rose-light text-xl tracking-widest mb-5">Join the Family</p>
            <h2 className="font-playfair text-4xl md:text-5xl text-warm-white font-medium mb-6 leading-tight">
              Passionate<br />About Beauty?
            </h2>
            <div className="h-px w-16 bg-linear-to-r from-gold-accent to-transparent mb-8 opacity-70" />
            <p className="font-sans text-muted-light leading-relaxed mb-10 max-w-sm">
              We&apos;re always looking for talented, passionate individuals to join the Lumière family and grow with us.
            </p>
            <a
              href="mailto:careers@lumieresalon.ae"
              className="inline-flex items-center gap-3 px-10 py-4 bg-rose-primary text-white font-sans text-xs tracking-widest uppercase hover:bg-rose-dark transition-all duration-300 hover:-translate-y-0.5 shadow-luxury self-start"
            >
              Apply Now
              <span aria-hidden="true">→</span>
            </a>
          </FadeIn>
        </div>

        {/* Right — rose */}
        <div className="relative bg-rose-primary py-20 px-10 md:px-16 xl:px-20 flex flex-col justify-center overflow-hidden">
          <div className="absolute inset-0 pointer-events-none flex" aria-hidden="true">
            {[1,2,3].map(i => <div key={i} className="flex-1 border-r border-white/8" />)}
          </div>
          <div className="absolute -top-20 -right-20 w-80 h-80 rounded-full bg-white/5 blur-3xl pointer-events-none" />
          <FadeIn delay={0.12}>
            <blockquote className="font-cormorant italic text-4xl md:text-5xl lg:text-6xl text-warm-white leading-snug mb-10">
              &ldquo;We don&apos;t just style hair — we craft confidence.&rdquo;
            </blockquote>
            <div className="flex gap-12">
              <div>
                <p className="font-playfair text-4xl text-warm-white">96%</p>
                <p className="font-sans text-[10px] tracking-[0.2em] uppercase text-white/60 mt-1">Client Retention</p>
              </div>
              <div>
                <p className="font-playfair text-4xl text-warm-white">3+</p>
                <p className="font-sans text-[10px] tracking-[0.2em] uppercase text-white/60 mt-1">Open Positions</p>
              </div>
            </div>
          </FadeIn>
        </div>
      </section>
    </>
  )
}
