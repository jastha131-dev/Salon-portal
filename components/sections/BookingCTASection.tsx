'use client'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { MessageCircle, ArrowRight } from 'lucide-react'

const services = ['Hair Styling', 'Nail Art', 'Makeup', 'Spa & Wellness', 'Home Service']

export function BookingCTASection() {
  const router = useRouter()
  const [name, setName] = useState('')
  const [service, setService] = useState('')

  const handleQuickBook = () => {
    const params = new URLSearchParams()
    if (name) params.set('name', name)
    if (service) params.set('service', service)
    router.push(`/booking?${params.toString()}`)
  }

  return (
    <section className="py-20 md:py-28 bg-rose-primary relative overflow-hidden">
      {/* Animated background circles */}
      <motion.div
        animate={{ y: [0, -18, 0], scale: [1, 1.05, 1] }}
        transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-0 left-0 w-64 h-64 rounded-full bg-white/5 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
      />
      <motion.div
        animate={{ y: [0, 20, 0], scale: [1, 1.08, 1] }}
        transition={{ duration: 9, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
        className="absolute bottom-0 right-0 w-80 h-80 rounded-full bg-white/5 translate-x-1/4 translate-y-1/4 pointer-events-none"
      />
      <motion.div
        animate={{ y: [0, -12, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
        className="absolute top-1/2 left-1/3 w-32 h-32 rounded-full bg-white/3 pointer-events-none"
      />

      <div className="relative container-luxury">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">

          {/* Left: text + CTAs */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <p className="font-cormorant italic text-rose-light text-xl tracking-widest mb-3">Reserve Your Spot</p>
            <h2 className="font-playfair text-4xl md:text-5xl lg:text-6xl font-medium text-warm-white mb-4">
              Ready to Transform?
            </h2>
            <div className="h-px w-20 bg-white/30 mb-6" />
            <p className="font-sans text-warm-white/80 text-lg leading-relaxed mb-10 max-w-md">
              Book your appointment today and experience the Lumière difference. Same-day bookings available.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/booking"
                className="inline-flex items-center justify-center gap-2 px-10 py-4 bg-warm-white text-rose-primary font-sans text-sm tracking-widest uppercase hover:bg-cream-bg hover:-translate-y-0.5 transition-all duration-300"
              >
                Book Appointment <ArrowRight className="w-4 h-4" />
              </Link>
              <a
                href="https://wa.me/971501234567"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-10 py-4 border border-warm-white/50 text-warm-white font-sans text-sm tracking-widest uppercase hover:bg-warm-white/10 hover:-translate-y-0.5 transition-all duration-300"
              >
                <MessageCircle className="w-4 h-4" /> WhatsApp Us
              </a>
            </div>
          </motion.div>

          {/* Right: quick-book form */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.15 }}
            className="bg-white/10 backdrop-blur-sm border border-white/20 p-8"
          >
            <p className="font-cormorant italic text-warm-white text-2xl mb-1">Quick Book</p>
            <p className="font-sans text-warm-white/60 text-xs tracking-widest uppercase mb-6">Fill in & we&apos;ll confirm within 1 hour</p>

            <div className="space-y-4">
              <div>
                <label className="font-sans text-[10px] tracking-widest uppercase text-warm-white/60 mb-1.5 block">Your Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={e => setName(e.target.value)}
                  placeholder="e.g. Sara Ahmed"
                  className="w-full bg-white/10 border border-white/20 text-warm-white placeholder:text-warm-white/30 font-sans text-sm px-4 py-3 focus:outline-none focus:border-white/60 transition-colors duration-200"
                />
              </div>

              <div>
                <label className="font-sans text-[10px] tracking-widest uppercase text-warm-white/60 mb-1.5 block">Service</label>
                <select
                  value={service}
                  onChange={e => setService(e.target.value)}
                  title="Select a service"
                  className="w-full bg-rose-dark border border-white/20 text-warm-white font-sans text-sm px-4 py-3 focus:outline-none focus:border-white/60 transition-colors duration-200 appearance-none cursor-pointer"
                >
                  <option value="" className="bg-rose-dark">Select a service…</option>
                  {services.map(s => (
                    <option key={s} value={s} className="bg-rose-dark">{s}</option>
                  ))}
                </select>
              </div>

              <button
                type="button"
                onClick={handleQuickBook}
                className="w-full py-4 bg-warm-white text-rose-primary font-sans text-sm tracking-widest uppercase hover:bg-cream-bg hover:-translate-y-0.5 transition-all duration-300 mt-2"
              >
                Continue Booking →
              </button>
            </div>

            <p className="font-sans text-[10px] text-warm-white/40 text-center mt-4 tracking-wide">
              No payment required at this step
            </p>
          </motion.div>

        </div>
      </div>
    </section>
  )
}
