'use client'
import { useState } from 'react'
import { useBookingStore } from '@/stores/bookingStore'

const inputClass =
  'w-full px-4 py-3 border border-charcoal/20 font-sans text-sm text-charcoal focus:outline-none focus:border-rose-primary transition-colors bg-transparent'
const labelClass = 'block font-sans text-xs tracking-widest uppercase text-charcoal mb-2'

export function StepDetails() {
  const { booking, updateBooking, nextStep } = useBookingStore()
  const [errors, setErrors] = useState<Record<string, string>>({})

  const validate = () => {
    const e: Record<string, string> = {}
    if (!booking.customerName?.trim()) e.name = 'Name is required'
    if (!booking.customerPhone?.trim()) e.phone = 'Phone number is required'
    if (!booking.customerEmail?.trim()) e.email = 'Email is required'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (validate()) nextStep()
  }

  return (
    <div>
      <h2 className="font-playfair text-3xl text-charcoal text-center mb-2">Your Details</h2>
      <p className="font-sans text-muted text-center mb-10">
        Fill in your contact information to complete the booking
      </p>

      <form onSubmit={handleSubmit} className="max-w-lg mx-auto space-y-5">
        <div>
          <label className={labelClass}>Full Name *</label>
          <input
            className={inputClass}
            value={booking.customerName || ''}
            onChange={(e) => updateBooking({ customerName: e.target.value })}
            placeholder="Your full name"
          />
          {errors.name && <p className="text-rose-primary text-xs mt-1">{errors.name}</p>}
        </div>

        <div>
          <label className={labelClass}>Phone Number *</label>
          <input
            className={inputClass}
            type="tel"
            value={booking.customerPhone || ''}
            onChange={(e) => updateBooking({ customerPhone: e.target.value })}
            placeholder="+971 50 000 0000"
          />
          {errors.phone && <p className="text-rose-primary text-xs mt-1">{errors.phone}</p>}
        </div>

        <div>
          <label className={labelClass}>Email *</label>
          <input
            className={inputClass}
            type="email"
            value={booking.customerEmail || ''}
            onChange={(e) => updateBooking({ customerEmail: e.target.value })}
            placeholder="your@email.com"
          />
          {errors.email && <p className="text-rose-primary text-xs mt-1">{errors.email}</p>}
        </div>

        <div>
          <label className={labelClass}>WhatsApp Number</label>
          <input
            className={inputClass}
            type="tel"
            value={booking.customerWhatsApp || ''}
            onChange={(e) => updateBooking({ customerWhatsApp: e.target.value })}
            placeholder="+971 50 000 0000 (if different from phone)"
          />
        </div>

        <div>
          <label className={labelClass}>Special Requests</label>
          <textarea
            className={`${inputClass} resize-none`}
            rows={3}
            value={booking.notes || ''}
            onChange={(e) => updateBooking({ notes: e.target.value })}
            placeholder="Any special requests or notes…"
          />
        </div>

        <button
          type="submit"
          className="w-full py-4 bg-rose-primary text-white font-sans text-sm tracking-widest uppercase hover:bg-rose-dark transition-colors duration-300"
        >
          Continue to Payment
        </button>
      </form>
    </div>
  )
}
