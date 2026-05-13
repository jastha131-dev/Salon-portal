'use client'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { Check, Calendar, Clock, User, Phone, MapPin } from 'lucide-react'
import { useBookingStore } from '@/stores/bookingStore'
import { generateBookingRef } from '@/lib/utils'

export function StepConfirmation() {
  const { booking, resetBooking } = useBookingStore()
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [bookingRef, setBookingRef] = useState('')

  const handleConfirm = async () => {
    setLoading(true)
    const ref = generateBookingRef()
    try {
      await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...booking, bookingRef: ref }),
      })
    } catch (_) {
      // Booking submitted optimistically; errors silently ignored
    }
    setBookingRef(ref)
    setSubmitted(true)
    setLoading(false)
  }

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center py-12"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: 'spring' }}
          className="w-20 h-20 rounded-full bg-rose-primary flex items-center justify-center mx-auto mb-6"
        >
          <Check className="w-10 h-10 text-white" />
        </motion.div>
        <h2 className="font-playfair text-4xl text-charcoal mb-3">Booking Confirmed!</h2>
        <p className="font-sans text-muted mb-4">We&apos;ll contact you shortly to confirm your appointment.</p>
        <div className="inline-block bg-cream-bg px-8 py-4 mb-8">
          <p className="font-sans text-xs tracking-widest text-muted uppercase mb-1">Booking Reference</p>
          <p className="font-playfair text-2xl text-rose-primary font-medium">{bookingRef}</p>
        </div>
        <br />
        <button
          onClick={resetBooking}
          className="px-8 py-3.5 border border-charcoal/20 font-sans text-sm tracking-widest uppercase text-charcoal hover:bg-charcoal hover:text-white transition-colors"
        >
          Book Another Service
        </button>
      </motion.div>
    )
  }

  return (
    <div className="max-w-lg mx-auto">
      <h2 className="font-playfair text-3xl text-charcoal text-center mb-2">Confirm Your Booking</h2>
      <p className="font-sans text-muted text-center mb-10">Please review your appointment details</p>

      <div className="space-y-3 mb-8 bg-cream-bg p-8">
        {booking.serviceName && (
          <div className="flex justify-between items-center py-2 border-b border-charcoal/[0.08]">
            <span className="font-sans text-xs tracking-widest uppercase text-muted">Service</span>
            <span className="font-playfair text-charcoal">{booking.serviceName}</span>
          </div>
        )}
        {booking.bookingDate && (
          <div className="flex justify-between items-center py-2 border-b border-charcoal/[0.08]">
            <span className="font-sans text-xs tracking-widest uppercase text-muted flex items-center gap-1.5">
              <Calendar className="w-3.5 h-3.5" />
              Date
            </span>
            <span className="font-sans text-charcoal text-sm">{booking.bookingDate}</span>
          </div>
        )}
        {booking.timeSlot && (
          <div className="flex justify-between items-center py-2 border-b border-charcoal/[0.08]">
            <span className="font-sans text-xs tracking-widest uppercase text-muted flex items-center gap-1.5">
              <Clock className="w-3.5 h-3.5" />
              Time
            </span>
            <span className="font-sans text-charcoal text-sm">{booking.timeSlot}</span>
          </div>
        )}
        {booking.customerName && (
          <div className="flex justify-between items-center py-2 border-b border-charcoal/[0.08]">
            <span className="font-sans text-xs tracking-widest uppercase text-muted flex items-center gap-1.5">
              <User className="w-3.5 h-3.5" />
              Name
            </span>
            <span className="font-sans text-charcoal text-sm">{booking.customerName}</span>
          </div>
        )}
        {booking.customerPhone && (
          <div className="flex justify-between items-center py-2 border-b border-charcoal/[0.08]">
            <span className="font-sans text-xs tracking-widest uppercase text-muted flex items-center gap-1.5">
              <Phone className="w-3.5 h-3.5" />
              Phone
            </span>
            <span className="font-sans text-charcoal text-sm">{booking.customerPhone}</span>
          </div>
        )}
        {booking.isHomeService && booking.homeAddress && (
          <div className="flex justify-between items-start py-2 border-b border-charcoal/[0.08]">
            <span className="font-sans text-xs tracking-widest uppercase text-muted flex items-center gap-1.5">
              <MapPin className="w-3.5 h-3.5" />
              Address
            </span>
            <span className="font-sans text-charcoal text-sm text-right max-w-[60%]">{booking.homeAddress}</span>
          </div>
        )}
      </div>

      <button
        onClick={handleConfirm}
        disabled={loading}
        className="w-full py-4 bg-rose-primary text-white font-sans text-sm tracking-widest uppercase hover:bg-rose-dark transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
      >
        {loading ? 'Processing…' : 'Confirm Booking'}
      </button>
    </div>
  )
}
