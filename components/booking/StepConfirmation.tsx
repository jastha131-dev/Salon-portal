'use client'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { Check, Calendar, Clock, User, Phone, MapPin, Scissors, CreditCard } from 'lucide-react'
import { useBookingStore } from '@/stores/bookingStore'

function formatSlotDisplay(time: string): string {
  const [hStr, m] = time.split(':')
  const h = parseInt(hStr, 10)
  return `${h % 12 || 12}:${m} ${h < 12 ? 'AM' : 'PM'}`
}

const PAYMENT_LABELS: Record<string, string> = {
  cash: 'Cash at Salon',
  card: 'Card on Arrival',
  online: 'Online',
}

interface SummaryRowProps {
  icon: React.ReactNode
  label: string
  value: string
}
function SummaryRow({ icon, label, value }: SummaryRowProps) {
  return (
    <div className="flex justify-between items-start py-2.5 border-b border-charcoal/[0.07]">
      <span className="font-sans text-xs tracking-widest uppercase text-muted flex items-center gap-1.5 flex-shrink-0">
        {icon} {label}
      </span>
      <span className="font-sans text-charcoal text-sm text-right max-w-[55%]">{value}</span>
    </div>
  )
}

export function StepConfirmation() {
  const { booking, resetBooking } = useBookingStore()
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [bookingRef, setBookingRef] = useState('')
  const [error, setError] = useState('')

  const handleConfirm = async () => {
    setLoading(true)
    setError('')
    try {
      const res = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(booking),
      })
      const data = await res.json()
      if (!res.ok) {
        setError(data.error || 'Booking failed. Please try again.')
        setLoading(false)
        return
      }
      setBookingRef(data.data.bookingRef)
      setSubmitted(true)
    } catch {
      setError('Network error. Please try again.')
    } finally {
      setLoading(false)
    }
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
          transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
          className="w-20 h-20 rounded-full bg-rose-primary flex items-center justify-center mx-auto mb-6"
        >
          <Check className="w-10 h-10 text-white" />
        </motion.div>
        <h2 className="font-playfair text-4xl text-charcoal mb-3">Booking Confirmed!</h2>
        <p className="font-sans text-muted mb-6">
          We&apos;ll contact you shortly to confirm your appointment.
        </p>
        <div className="inline-block bg-cream-bg px-8 py-5 mb-8">
          <p className="font-sans text-xs tracking-widest text-muted uppercase mb-1">
            Booking Reference
          </p>
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

  const locationLabel = booking.isHomeService
    ? `Home Service — ${booking.area || ''}, ${booking.homeAddress || ''}`
    : booking.branchName || '—'

  return (
    <div className="max-w-lg mx-auto">
      <h2 className="font-playfair text-3xl text-charcoal text-center mb-2">
        Confirm Your Booking
      </h2>
      <p className="font-sans text-muted text-center mb-10">
        Please review your appointment details before confirming
      </p>

      <div className="bg-cream-bg p-8 mb-6">
        {booking.serviceName && (
          <SummaryRow
            icon={<Scissors className="w-3.5 h-3.5" />}
            label="Service"
            value={booking.serviceName}
          />
        )}
        {booking.staffName && (
          <SummaryRow
            icon={<User className="w-3.5 h-3.5" />}
            label="Stylist"
            value={booking.staffName}
          />
        )}
        {booking.isAnyStaff && !booking.staffName && (
          <SummaryRow
            icon={<User className="w-3.5 h-3.5" />}
            label="Stylist"
            value="Any Available"
          />
        )}
        {(booking.selectedAddOns || []).length > 0 && (
          <SummaryRow
            icon={<Check className="w-3.5 h-3.5" />}
            label="Add-ons"
            value={(booking.selectedAddOns || []).map((a) => a.name).join(', ')}
          />
        )}
        {booking.bookingDate && (
          <SummaryRow
            icon={<Calendar className="w-3.5 h-3.5" />}
            label="Date"
            value={booking.bookingDate}
          />
        )}
        {booking.timeSlot && (
          <SummaryRow
            icon={<Clock className="w-3.5 h-3.5" />}
            label="Time"
            value={formatSlotDisplay(booking.timeSlot)}
          />
        )}
        <SummaryRow
          icon={<MapPin className="w-3.5 h-3.5" />}
          label="Location"
          value={locationLabel}
        />
        {booking.customerName && (
          <SummaryRow
            icon={<User className="w-3.5 h-3.5" />}
            label="Name"
            value={booking.customerName}
          />
        )}
        {booking.customerPhone && (
          <SummaryRow
            icon={<Phone className="w-3.5 h-3.5" />}
            label="Phone"
            value={booking.customerPhone}
          />
        )}
        {booking.paymentMethod && (
          <SummaryRow
            icon={<CreditCard className="w-3.5 h-3.5" />}
            label="Payment"
            value={PAYMENT_LABELS[booking.paymentMethod] || booking.paymentMethod}
          />
        )}
        {booking.totalPrice !== undefined && (
          <div className="flex justify-between items-center pt-4 mt-2">
            <span className="font-playfair text-charcoal font-medium">Total</span>
            <span className="font-playfair text-rose-primary font-medium text-lg">
              AED {booking.totalPrice}
            </span>
          </div>
        )}
      </div>

      {error && (
        <p className="text-rose-primary font-sans text-sm text-center mb-4">{error}</p>
      )}

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
