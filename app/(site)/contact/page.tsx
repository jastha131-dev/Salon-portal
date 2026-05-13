'use client'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { MapPin, Phone, Mail, Clock, MessageCircle, Send, CheckCircle } from 'lucide-react'

const InstagramIcon = () => (
  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
)
import { PageHero } from '@/components/layout/PageHero'
import { FadeIn } from '@/components/animations/FadeIn'

// ── Business data ─────────────────────────────────────────────────────────────

const businessHours = [
  { day: 'Monday – Friday', hours: '9:00 AM – 8:00 PM', isToday: false },
  { day: 'Saturday', hours: '9:00 AM – 7:00 PM', isToday: false },
  { day: 'Sunday', hours: '10:00 AM – 6:00 PM', isToday: false },
]

const services = [
  'Hair Services',
  'Nail Art & Extensions',
  'Bridal Makeup',
  'Everyday Makeup',
  'Spa & Wellness',
  'Home Service',
  'Eyebrows & Lashes',
  'Other',
]

type FormState = {
  name: string
  email: string
  phone: string
  service: string
  message: string
}

// ── Component ─────────────────────────────────────────────────────────────────

export default function ContactPage() {
  const [form, setForm] = useState<FormState>({
    name: '',
    email: '',
    phone: '',
    service: '',
    message: '',
  })
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const set = (field: keyof FormState) => (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) => setForm((prev) => ({ ...prev, [field]: e.target.value }))

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      // Replace with real API endpoint when ready
      await new Promise<void>((resolve) => setTimeout(resolve, 1200))
      setSubmitted(true)
    } catch {
      setError('Something went wrong. Please try again or contact us via WhatsApp.')
    } finally {
      setLoading(false)
    }
  }

  const inputBase =
    'w-full px-4 py-3 border border-charcoal/15 bg-transparent font-sans text-sm text-charcoal placeholder:text-muted-light focus:outline-none focus:border-rose-primary focus:ring-1 focus:ring-rose-primary/20 transition-all duration-200'
  const labelBase = 'block font-sans text-xs tracking-widest uppercase text-charcoal/80 mb-2'

  return (
    <>
      <PageHero
        eyebrow="Get in Touch"
        title="We'd Love to Hear From You"
        subtitle="Have a question, want to book, or simply want to say hello? Our team is here for you."
        dark
      />

      {/* ── Main contact section ──────────────────────── */}
      <section className="py-20 md:py-28 bg-cream-bg">
        <div className="container-luxury">
          <div className="grid lg:grid-cols-2 gap-14 xl:gap-20">

            {/* ── Left: Form ───────────────────────────── */}
            <FadeIn direction="left">
              <div>
                <p className="font-cormorant italic text-rose-primary text-xl tracking-widest mb-2">
                  Send a Message
                </p>
                <h2 className="font-playfair text-3xl md:text-4xl text-charcoal font-medium mb-4">
                  How Can We Help?
                </h2>
                <div className="divider-gold w-14 mb-8" />

                {submitted ? (
                  <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="bg-warm-white p-10 md:p-14 text-center shadow-card"
                  >
                    <div className="w-20 h-20 rounded-full bg-rose-primary/10 flex items-center justify-center mx-auto mb-6">
                      <CheckCircle className="w-10 h-10 text-rose-primary" />
                    </div>
                    <h3 className="font-playfair text-2xl text-charcoal mb-3">Message Sent!</h3>
                    <p className="font-sans text-muted mb-6 leading-relaxed">
                      Thank you for reaching out. A member of our team will respond within 24 hours.
                      For urgent enquiries, please reach us via WhatsApp.
                    </p>
                    <a
                      href="https://wa.me/971501234567"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-8 py-3 bg-[#25D366] text-white font-sans text-sm tracking-widest uppercase hover:bg-[#1EBE5A] transition-colors"
                    >
                      <MessageCircle className="w-4 h-4" />
                      Chat on WhatsApp
                    </a>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                    {/* Name + Email */}
                    <div className="grid sm:grid-cols-2 gap-5">
                      <div>
                        <label htmlFor="name" className={labelBase}>
                          Your Name <span className="text-rose-primary">*</span>
                        </label>
                        <input
                          id="name"
                          type="text"
                          className={inputBase}
                          required
                          autoComplete="name"
                          value={form.name}
                          onChange={set('name')}
                          placeholder="Full name"
                        />
                      </div>
                      <div>
                        <label htmlFor="email" className={labelBase}>
                          Email <span className="text-rose-primary">*</span>
                        </label>
                        <input
                          id="email"
                          type="email"
                          className={inputBase}
                          required
                          autoComplete="email"
                          value={form.email}
                          onChange={set('email')}
                          placeholder="your@email.com"
                        />
                      </div>
                    </div>

                    {/* Phone + Service */}
                    <div className="grid sm:grid-cols-2 gap-5">
                      <div>
                        <label htmlFor="phone" className={labelBase}>
                          Phone Number
                        </label>
                        <input
                          id="phone"
                          type="tel"
                          className={inputBase}
                          autoComplete="tel"
                          value={form.phone}
                          onChange={set('phone')}
                          placeholder="+971 50 000 0000"
                        />
                      </div>
                      <div>
                        <label htmlFor="service" className={labelBase}>
                          Service of Interest
                        </label>
                        <select
                          id="service"
                          className={inputBase}
                          value={form.service}
                          onChange={set('service')}
                        >
                          <option value="">Select a service…</option>
                          {services.map((s) => (
                            <option key={s} value={s}>
                              {s}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    {/* Message */}
                    <div>
                      <label htmlFor="message" className={labelBase}>
                        Message
                      </label>
                      <textarea
                        id="message"
                        className={`${inputBase} resize-none`}
                        rows={5}
                        value={form.message}
                        onChange={set('message')}
                        placeholder="Tell us how we can help you…"
                      />
                    </div>

                    {/* Error */}
                    {error && (
                      <p className="font-sans text-sm text-rose-primary">{error}</p>
                    )}

                    {/* Submit */}
                    <button
                      type="submit"
                      disabled={loading}
                      className="w-full py-4 bg-rose-primary text-white font-sans text-sm tracking-widest uppercase hover:bg-rose-dark transition-colors duration-300 disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-3"
                    >
                      {loading ? (
                        <>
                          <svg
                            className="animate-spin w-4 h-4"
                            viewBox="0 0 24 24"
                            fill="none"
                            aria-hidden="true"
                          >
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                            />
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                            />
                          </svg>
                          Sending…
                        </>
                      ) : (
                        <>
                          <Send className="w-4 h-4" />
                          Send Message
                        </>
                      )}
                    </button>

                    <p className="font-sans text-xs text-muted text-center">
                      We respect your privacy. Your details will never be shared with third parties.
                    </p>
                  </form>
                )}
              </div>
            </FadeIn>

            {/* ── Right: Info panel ────────────────────── */}
            <FadeIn direction="right" delay={0.15}>
              <div className="space-y-6">

                {/* Contact info card */}
                <div className="bg-warm-white p-8 shadow-card">
                  <h3 className="font-playfair text-xl text-charcoal mb-6">Contact Information</h3>
                  <div className="space-y-5">
                    {[
                      {
                        icon: MapPin,
                        label: 'Address',
                        content: (
                          <p className="font-sans text-sm text-muted leading-relaxed">
                            Dubai Marina Mall, Level 2<br />
                            Dubai Marina, Dubai, UAE
                          </p>
                        ),
                      },
                      {
                        icon: Phone,
                        label: 'Phone',
                        content: (
                          <a
                            href="tel:+971501234567"
                            className="font-sans text-sm text-muted hover:text-rose-primary transition-colors"
                          >
                            +971 50 123 4567
                          </a>
                        ),
                      },
                      {
                        icon: Mail,
                        label: 'Email',
                        content: (
                          <a
                            href="mailto:hello@lumieresalon.ae"
                            className="font-sans text-sm text-muted hover:text-rose-primary transition-colors"
                          >
                            hello@lumieresalon.ae
                          </a>
                        ),
                      },
                    ].map(({ icon: Icon, label, content }) => (
                      <div key={label} className="flex items-start gap-4">
                        <div className="w-10 h-10 rounded-full bg-rose-light/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                          <Icon className="w-4 h-4 text-rose-primary" aria-hidden="true" />
                        </div>
                        <div>
                          <p className="font-sans text-xs tracking-widest uppercase text-muted-light mb-1">
                            {label}
                          </p>
                          {content}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* WhatsApp CTA */}
                <a
                  href="https://wa.me/971501234567?text=Hello%20Lumi%C3%A8re%2C%20I%27d%20like%20to%20enquire%20about%20your%20services."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-5 p-6 bg-[#25D366] text-white hover:bg-[#1EBE5A] transition-colors group shadow-card"
                >
                  <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0 group-hover:bg-white/30 transition-colors">
                    <MessageCircle className="w-6 h-6 fill-white" aria-hidden="true" />
                  </div>
                  <div>
                    <p className="font-playfair text-lg font-medium">Chat on WhatsApp</p>
                    <p className="font-sans text-sm text-white/80">Quick replies, usually within minutes</p>
                  </div>
                  <div className="ml-auto flex-shrink-0 text-white/60 group-hover:text-white group-hover:translate-x-1 transition-all">
                    →
                  </div>
                </a>

                {/* Instagram CTA */}
                <a
                  href="https://instagram.com/lumieresalon.ae"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-5 p-6 text-white hover:opacity-90 transition-opacity group shadow-card"
                  style={{
                    background:
                      'linear-gradient(135deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #cc2366 75%, #bc1888 100%)',
                  }}
                >
                  <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center flex-shrink-0 group-hover:bg-white/30 transition-colors">
                    <InstagramIcon />
                  </div>
                  <div>
                    <p className="font-playfair text-lg font-medium">Follow on Instagram</p>
                    <p className="font-sans text-sm text-white/80">@lumieresalon.ae</p>
                  </div>
                  <div className="ml-auto flex-shrink-0 text-white/60 group-hover:text-white group-hover:translate-x-1 transition-all">
                    →
                  </div>
                </a>

                {/* Hours */}
                <div className="bg-warm-white p-8 shadow-card">
                  <div className="flex items-center gap-3 mb-5">
                    <div className="w-8 h-8 bg-rose-light/20 rounded-full flex items-center justify-center">
                      <Clock className="w-4 h-4 text-rose-primary" aria-hidden="true" />
                    </div>
                    <h3 className="font-playfair text-xl text-charcoal">Business Hours</h3>
                  </div>
                  <div className="space-y-0">
                    {businessHours.map((h, i) => (
                      <div
                        key={h.day}
                        className={`flex justify-between items-center py-3 ${
                          i < businessHours.length - 1
                            ? 'border-b border-charcoal/6'
                            : ''
                        }`}
                      >
                        <span className="font-sans text-sm text-muted">{h.day}</span>
                        <span className="font-sans text-sm font-medium text-charcoal">{h.hours}</span>
                      </div>
                    ))}
                  </div>
                  <div className="mt-5 pt-4 border-t border-charcoal/6 flex items-center gap-2">
                    <div className="w-2 h-2 rounded-full bg-[#25D366] animate-pulse" />
                    <p className="font-sans text-xs text-muted">
                      Walk-ins welcome — booking recommended for weekends
                    </p>
                  </div>
                </div>

              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* ── Map placeholder ───────────────────────────── */}
      <section className="h-80 relative overflow-hidden bg-charcoal/5">
        {/* Decorative gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-rose-light/10 via-cream-bg to-gold-light/15" />

        {/* Grid pattern overlay */}
        <div
          className="absolute inset-0 opacity-30"
          style={{
            backgroundImage:
              'linear-gradient(rgba(201,104,122,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(201,104,122,0.1) 1px, transparent 1px)',
            backgroundSize: '40px 40px',
          }}
        />

        <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-4">
          <div className="bg-warm-white/90 backdrop-blur-sm px-10 py-8 shadow-luxury max-w-sm w-full">
            <MapPin className="w-10 h-10 text-rose-primary mx-auto mb-3" aria-hidden="true" />
            <p className="font-playfair text-xl text-charcoal mb-1">Dubai Marina Mall</p>
            <p className="font-sans text-sm text-muted mb-4">Level 2, Dubai Marina, Dubai, UAE</p>
            <a
              href="https://maps.google.com/?q=Dubai+Marina+Mall+Dubai"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-6 py-2.5 bg-rose-primary text-white font-sans text-xs tracking-widest uppercase hover:bg-rose-dark transition-colors"
            >
              Open in Google Maps
            </a>
          </div>
        </div>
      </section>

      {/* ── Quick links footer strip ──────────────────── */}
      <section className="py-12 bg-charcoal">
        <div className="container-luxury">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div>
              <p className="font-cormorant italic text-rose-light text-lg tracking-widest mb-1">
                Ready for your next visit?
              </p>
              <p className="font-sans text-muted-light text-sm">
                Book online in under 2 minutes — pick your service, date, and time.
              </p>
            </div>
            <a
              href="/booking"
              className="flex-shrink-0 inline-flex px-10 py-4 bg-rose-primary text-white font-sans text-sm tracking-widest uppercase hover:bg-rose-dark transition-colors duration-300"
            >
              Book an Appointment
            </a>
          </div>
        </div>
      </section>
    </>
  )
}
