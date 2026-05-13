'use client'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { MessageCircle } from 'lucide-react'

export function BookingCTASection() {
  return (
    <section className="py-20 md:py-28 bg-rose-primary relative overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_30%_50%,rgba(255,255,255,0.1),transparent_60%)]" />
      <div className="absolute top-0 left-0 w-64 h-64 rounded-full bg-white/5 -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-80 h-80 rounded-full bg-white/5 translate-x-1/4 translate-y-1/4" />

      <div className="relative container-luxury text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <p className="font-cormorant italic text-rose-light text-xl tracking-widest mb-3">Reserve Your Spot</p>
          <h2 className="font-playfair text-4xl md:text-5xl lg:text-6xl font-medium text-warm-white mb-4">
            Ready to Transform?
          </h2>
          <div className="h-px w-20 bg-white/40 mx-auto mb-6" />
          <p className="font-sans text-warm-white/80 text-lg max-w-xl mx-auto mb-10">
            Book your appointment today and experience the Lumière difference. Same-day bookings available.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/booking"
              className="px-12 py-4 bg-warm-white text-rose-primary font-sans text-sm tracking-widest uppercase hover:bg-cream-bg transition-all duration-300 hover:-translate-y-1"
            >
              Book Appointment
            </Link>
            <a
              href="https://wa.me/971501234567"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-10 py-4 border border-warm-white/50 text-warm-white font-sans text-sm tracking-widest uppercase hover:bg-warm-white/10 transition-all duration-300"
            >
              <MessageCircle className="w-4 h-4" /> WhatsApp Us
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
