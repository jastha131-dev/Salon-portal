'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { MapPin, Phone, Mail, Clock, MessageCircle, Send, CheckCircle, ArrowRight } from 'lucide-react'
import { FadeIn } from '@/components/animations/FadeIn'
import { urlFor } from '@/lib/sanity/image'
import type { SanityImage } from '@/types'

const InstagramIcon = () => (
  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
)

const businessHours = [
  { day: 'Monday – Friday', hours: '9:00 AM – 8:00 PM' },
  { day: 'Saturday',        hours: '9:00 AM – 7:00 PM' },
  { day: 'Sunday',          hours: '10:00 AM – 6:00 PM' },
]

const services = [
  'Hair Services', 'Nail Art & Extensions', 'Bridal Makeup', 'Everyday Makeup',
  'Spa & Wellness', 'Home Service', 'Eyebrows & Lashes', 'Other',
]

const infoCards = [
  { Icon: MapPin, label: 'Address',    fill: 'bg-rose-primary',
    text: 'Dubai Marina Mall, Level 2\nDubai Marina, Dubai, UAE' },
  { Icon: Phone,  label: 'Phone',      fill: 'bg-[#1a1a30]',
    text: '+971 50 123 4567', href: 'tel:+971501234567' },
  { Icon: Mail,   label: 'Email',      fill: 'bg-rose-dark',
    text: 'hello@lumieresalon.ae', href: 'mailto:hello@lumieresalon.ae' },
  { Icon: Clock,  label: 'Hours',      fill: 'bg-[#2a0f18]',
    text: 'Mon–Fri 9AM–8PM\nSat 9AM–7PM · Sun 10AM–6PM' },
]

type FormState = { name: string; email: string; phone: string; service: string; message: string }

export default function ContactPage() {
  const [form, setForm] = useState<FormState>({ name: '', email: '', phone: '', service: '', message: '' })
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading]     = useState(false)
  const [error, setError]         = useState<string | null>(null)
  const [heroImage, setHeroImage] = useState<SanityImage | null>(null)

  useEffect(() => {
    fetch('/api/site-settings')
      .then(r => r.json())
      .then(d => { if (d.data?.contactHeroImage) setHeroImage(d.data.contactHeroImage) })
      .catch(() => {})
  }, [])

  const heroUrl = heroImage?.asset ? urlFor(heroImage).width(1920).height(800).url() : null

  const set = (field: keyof FormState) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
      setForm(prev => ({ ...prev, [field]: e.target.value }))

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true); setError(null)
    try {
      await new Promise<void>(resolve => setTimeout(resolve, 1200))
      setSubmitted(true)
    } catch {
      setError('Something went wrong. Please try again or contact us via WhatsApp.')
    } finally { setLoading(false) }
  }

  const inputBase = 'w-full px-4 py-3.5 border border-warm-white/12 bg-warm-white/5 font-sans text-sm text-warm-white placeholder:text-muted-light focus:outline-none focus:border-rose-primary focus:bg-rose-primary/5 transition-all duration-200'
  const labelBase = 'block font-sans text-[10px] tracking-widest uppercase text-muted-light mb-2'

  return (
    <>
      {/* ── Hero ─────────────────────────────────────────── */}
      <section className="relative pt-36 pb-24 md:pt-44 md:pb-28 bg-charcoal overflow-hidden">
        {heroUrl && (
          <img src={heroUrl} alt="" aria-hidden="true"
            className="absolute inset-0 w-full h-full object-cover object-center opacity-20 pointer-events-none select-none" />
        )}
        <div className="absolute inset-0 bg-charcoal/60 pointer-events-none" />
        <div className="absolute -top-40 -left-40 w-150 h-150 rounded-full bg-rose-primary/6 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-20 -right-20 w-125 h-125 rounded-full bg-gold-accent/5 blur-3xl pointer-events-none" />
        <div className="absolute inset-0 pointer-events-none flex">
          {[1,2,3].map(i => <div key={i} className="flex-1 border-r border-warm-white/3" />)}
        </div>
        <div className="container-luxury relative text-center">
          <motion.p
            initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
            className="font-cormorant italic text-rose-light text-xl md:text-2xl tracking-widest mb-5"
          >
            Get in Touch
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.1 }}
            className="font-playfair text-5xl md:text-6xl lg:text-7xl font-medium text-warm-white leading-tight mb-4"
          >
            We&apos;d Love to<br /><em className="text-rose-light not-italic">Hear From You</em>
          </motion.h1>
          <motion.div
            initial={{ scaleX: 0, opacity: 0 }} animate={{ scaleX: 1, opacity: 0.6 }}
            transition={{ duration: 0.9, delay: 0.3 }}
            className="divider-gold w-24 mx-auto my-7"
          />
          <motion.p
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.7, delay: 0.45 }}
            className="font-sans text-muted-light text-lg max-w-xl mx-auto leading-relaxed"
          >
            Have a question, want to book, or simply want to say hello? Our team is here for you.
          </motion.p>
        </div>
      </section>

      {/* ── 4-card info strip ────────────────────────────── */}
      <section className="bg-cream-bg">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 border-b border-charcoal/8">
          {infoCards.map((card, i) => {
            const { Icon, label, fill, text, href } = card
            const inner = (
              <div className="group relative overflow-hidden border-r border-charcoal/8 cursor-pointer h-full">
                <div className={`absolute inset-0 ${fill} translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out`} />
                <div className="relative p-8 md:p-10 flex flex-col h-full">
                  <div className="w-12 h-12 rounded-full border border-charcoal/15 group-hover:border-warm-white/30 bg-charcoal/5 group-hover:bg-warm-white/10 flex items-center justify-center mb-5 shrink-0 transition-all duration-300">
                    <Icon className="w-5 h-5 text-rose-primary group-hover:text-warm-white transition-colors duration-300" />
                  </div>
                  <div className="flex-1">
                    <p className="font-sans text-[10px] tracking-widest uppercase text-muted-light group-hover:text-warm-white/60 mb-2 transition-colors duration-300">{label}</p>
                    <p className="font-playfair text-lg text-charcoal group-hover:text-warm-white transition-colors duration-300 leading-snug whitespace-pre-line">{text}</p>
                  </div>
                  <div className="mt-6 w-6 h-px bg-rose-primary/40 group-hover:bg-warm-white/50 group-hover:w-10 transition-all duration-300" />
                </div>
              </div>
            )
            return href ? (
              <motion.a key={label} href={href} className="block h-full" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1, duration: 0.5 }}>
                {inner}
              </motion.a>
            ) : (
              <motion.div key={label} className="h-full" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.1, duration: 0.5 }}>
                {inner}
              </motion.div>
            )
          })}
        </div>
      </section>

      {/* ── Form + Panel ─────────────────────────────────── */}
      <section className="bg-charcoal">
        <div className="grid lg:grid-cols-[2fr_3fr]">

          {/* Left dark panel */}
          <FadeIn direction="left">
            <div className="p-10 md:p-14 lg:p-16 flex flex-col gap-10 border-r border-warm-white/8 h-full">
              <div>
                <p className="font-cormorant italic text-rose-light text-lg tracking-widest mb-2">Or reach us directly</p>
                <h2 className="font-playfair text-3xl text-warm-white font-medium mb-4">Quick Connect</h2>
                <div className="divider-gold w-12 opacity-60" />
              </div>

              {/* WhatsApp */}
              <a href="https://wa.me/971501234567?text=Hello%20Lumi%C3%A8re%2C%20I%27d%20like%20to%20enquire%20about%20your%20services."
                target="_blank" rel="noopener noreferrer"
                className="group relative overflow-hidden flex items-center gap-4 p-5 border border-warm-white/10 hover:-translate-y-0.5 transition-transform duration-300"
              >
                <div className="absolute inset-0 bg-[#25D366] translate-y-full group-hover:translate-y-0 transition-transform duration-400 ease-out" />
                <div className="relative w-11 h-11 rounded-full bg-[#25D366]/20 group-hover:bg-warm-white/20 flex items-center justify-center shrink-0 transition-colors duration-300">
                  <MessageCircle className="w-5 h-5 text-[#25D366] group-hover:text-warm-white transition-colors duration-300" />
                </div>
                <div className="relative">
                  <p className="font-playfair text-lg text-warm-white group-hover:text-warm-white transition-colors">Chat on WhatsApp</p>
                  <p className="font-sans text-xs text-muted-light group-hover:text-warm-white/80 transition-colors">Usually replies within minutes</p>
                </div>
                <ArrowRight className="relative ml-auto w-4 h-4 text-muted-light group-hover:text-warm-white group-hover:translate-x-1 transition-all duration-300" />
              </a>

              {/* Instagram */}
              <a href="https://instagram.com/lumieresalon.ae" target="_blank" rel="noopener noreferrer"
                className="group relative overflow-hidden flex items-center gap-4 p-5 border border-warm-white/10 hover:-translate-y-0.5 transition-transform duration-300"
              >
                <div className="absolute inset-0 bg-instagram-gradient translate-x-full group-hover:translate-x-0 transition-transform duration-400 ease-out" />
                <div className="relative w-11 h-11 rounded-full bg-pink-500/20 group-hover:bg-warm-white/20 flex items-center justify-center shrink-0 transition-colors duration-300">
                  <InstagramIcon />
                </div>
                <div className="relative">
                  <p className="font-playfair text-lg text-warm-white">Follow on Instagram</p>
                  <p className="font-sans text-xs text-muted-light group-hover:text-warm-white/80 transition-colors">@lumieresalon.ae</p>
                </div>
                <ArrowRight className="relative ml-auto w-4 h-4 text-muted-light group-hover:text-warm-white group-hover:translate-x-1 transition-all duration-300" />
              </a>

              {/* Hours */}
              <div className="border border-warm-white/8 p-6">
                <div className="flex items-center gap-3 mb-5">
                  <div className="w-8 h-8 rounded-full bg-rose-primary/15 flex items-center justify-center">
                    <Clock className="w-4 h-4 text-rose-light" />
                  </div>
                  <h3 className="font-playfair text-lg text-warm-white">Business Hours</h3>
                </div>
                <div className="space-y-0">
                  {businessHours.map((h, i) => (
                    <div key={h.day} className={`flex justify-between items-center py-3 ${i < businessHours.length - 1 ? 'border-b border-warm-white/6' : ''}`}>
                      <span className="font-sans text-sm text-muted-light">{h.day}</span>
                      <span className="font-sans text-sm text-warm-white font-medium">{h.hours}</span>
                    </div>
                  ))}
                </div>
                <div className="mt-4 pt-4 border-t border-warm-white/6 flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-[#25D366] animate-pulse shrink-0" />
                  <p className="font-sans text-xs text-muted-light">Walk-ins welcome — booking recommended for weekends</p>
                </div>
              </div>
            </div>
          </FadeIn>

          {/* Right: Form */}
          <FadeIn direction="right" delay={0.15}>
            <div className="p-10 md:p-14 lg:p-16">
              <p className="font-cormorant italic text-rose-light text-lg tracking-widest mb-2">Send a Message</p>
              <h2 className="font-playfair text-3xl text-warm-white font-medium mb-4">How Can We Help?</h2>
              <div className="divider-gold w-12 mb-8 opacity-60" />

              <AnimatePresence mode="wait">
                {submitted ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
                    className="border border-warm-white/10 p-10 md:p-14 text-center"
                  >
                    <div className="w-20 h-20 rounded-full bg-rose-primary/15 border border-rose-primary/30 flex items-center justify-center mx-auto mb-6">
                      <CheckCircle className="w-10 h-10 text-rose-light" />
                    </div>
                    <h3 className="font-playfair text-2xl text-warm-white mb-3">Message Sent!</h3>
                    <p className="font-sans text-muted-light mb-6 leading-relaxed max-w-sm mx-auto">
                      Thank you for reaching out. A member of our team will respond within 24 hours.
                      For urgent enquiries, please reach us via WhatsApp.
                    </p>
                    <a href="https://wa.me/971501234567" target="_blank" rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-8 py-3 bg-[#25D366] text-white font-sans text-sm tracking-widest uppercase hover:bg-[#1EBE5A] transition-colors">
                      <MessageCircle className="w-4 h-4" /> Chat on WhatsApp
                    </a>
                  </motion.div>
                ) : (
                  <motion.form key="form" onSubmit={handleSubmit} className="space-y-5" noValidate>
                    <div className="grid sm:grid-cols-2 gap-5">
                      <div>
                        <label htmlFor="name" className={labelBase}>Your Name <span className="text-rose-light">*</span></label>
                        <input id="name" type="text" className={inputBase} required autoComplete="name"
                          value={form.name} onChange={set('name')} placeholder="Full name" />
                      </div>
                      <div>
                        <label htmlFor="email" className={labelBase}>Email <span className="text-rose-light">*</span></label>
                        <input id="email" type="email" className={inputBase} required autoComplete="email"
                          value={form.email} onChange={set('email')} placeholder="your@email.com" />
                      </div>
                    </div>
                    <div className="grid sm:grid-cols-2 gap-5">
                      <div>
                        <label htmlFor="phone" className={labelBase}>Phone Number</label>
                        <input id="phone" type="tel" className={inputBase} autoComplete="tel"
                          value={form.phone} onChange={set('phone')} placeholder="+971 50 000 0000" />
                      </div>
                      <div>
                        <label htmlFor="service" className={labelBase}>Service of Interest</label>
                        <select id="service" className={`${inputBase} bg-[#1c1c2e]`} value={form.service} onChange={set('service')}>
                          <option className="bg-[#1c1c2e] text-warm-white" value="">Select a service…</option>
                          {services.map(s => <option className="bg-[#1c1c2e] text-warm-white" key={s} value={s}>{s}</option>)}
                        </select>
                      </div>
                    </div>
                    <div>
                      <label htmlFor="message" className={labelBase}>Message</label>
                      <textarea id="message" className={`${inputBase} resize-none`} rows={5}
                        value={form.message} onChange={set('message')} placeholder="Tell us how we can help you…" />
                    </div>
                    {error && <p className="font-sans text-sm text-rose-light">{error}</p>}
                    <button type="submit" disabled={loading}
                      className="w-full py-4 bg-rose-primary text-white font-sans text-sm tracking-widest uppercase hover:bg-rose-dark transition-colors duration-300 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-3"
                    >
                      {loading ? (
                        <>
                          <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                          </svg>
                          Sending…
                        </>
                      ) : (
                        <><Send className="w-4 h-4" /> Send Message</>
                      )}
                    </button>
                    <p className="font-sans text-xs text-muted-light text-center">
                      We respect your privacy. Your details will never be shared with third parties.
                    </p>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── Map ──────────────────────────────────────────── */}
      <section className="relative h-96 md:h-[480px] overflow-hidden">
        <iframe
          src="https://maps.google.com/maps?q=Dubai+Marina+Mall,+Dubai+Marina,+Dubai,+UAE&output=embed&z=15"
          className="absolute inset-0 w-full h-full border-0"
          referrerPolicy="no-referrer-when-downgrade"
          title="Lumière Salon location — Dubai Marina Mall"
        />
        {/* Location card overlay */}
        <motion.div
          initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="absolute bottom-6 left-6 md:bottom-10 md:left-10 bg-warm-white/97 backdrop-blur-sm px-8 py-6 shadow-luxury max-w-xs"
        >
          <div className="flex items-start gap-3">
            <MapPin className="w-5 h-5 text-rose-primary mt-0.5 shrink-0" />
            <div>
              <p className="font-playfair text-lg text-charcoal mb-0.5">Dubai Marina Mall</p>
              <p className="font-sans text-sm text-muted mb-4">Level 2, Dubai Marina, Dubai, UAE</p>
              <a href="https://maps.google.com/?q=Dubai+Marina+Mall+Dubai" target="_blank" rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2 bg-rose-primary text-white font-sans text-xs tracking-widest uppercase hover:bg-rose-dark transition-colors">
                Open in Maps <ArrowRight className="w-3 h-3" />
              </a>
            </div>
          </div>
        </motion.div>
      </section>

      {/* ── Booking CTA strip ────────────────────────────── */}
      <section className="py-14 bg-charcoal border-t border-warm-white/6">
        <div className="container-luxury">
          <FadeIn>
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              <div>
                <p className="font-cormorant italic text-rose-light text-xl tracking-widest mb-1">Ready for your next visit?</p>
                <p className="font-sans text-muted-light text-sm">Book online in under 2 minutes — pick your service, date, and time.</p>
              </div>
              <Link href="/booking"
                className="group shrink-0 inline-flex items-center gap-3 px-10 py-4 bg-rose-primary text-white font-sans text-sm tracking-widest uppercase hover:bg-rose-dark transition-all duration-300 hover:-translate-y-0.5 shadow-luxury">
                Book an Appointment <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" />
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>
    </>
  )
}
