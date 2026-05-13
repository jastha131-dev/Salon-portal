'use client'
import { useState } from 'react'
import { useBookingStore } from '@/stores/bookingStore'

export function StepDetails() {
  const { booking, updateBooking, nextStep } = useBookingStore()
  const [homeService, setHomeService] = useState(false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  const validate = () => {
    const e: Record<string, string> = {}
    if (!booking.customerName?.trim()) e.name = 'Name is required'
    if (!booking.customerPhone?.trim()) e.phone = 'Phone is required'
    if (!booking.customerEmail?.trim()) e.email = 'Email is required'
    if (homeService && !booking.homeAddress?.trim()) e.address = 'Address is required for home service'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (validate()) nextStep()
  }

  const inputClass =
    'w-full px-4 py-3 border border-charcoal/20 font-sans text-sm text-charcoal focus:outline-none focus:border-rose-primary transition-colors bg-transparent'
  const labelClass = 'block font-sans text-xs tracking-widest uppercase text-charcoal mb-2'

  return (
    <div>
      <h2 className="font-playfair text-3xl text-charcoal text-center mb-2">Your Details</h2>
      <p className="font-sans text-muted text-center mb-10">Fill in your information to complete the booking</p>
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
          <label className={labelClass}>Special Requests</label>
          <textarea
            className={`${inputClass} resize-none`}
            rows={3}
            value={booking.notes || ''}
            onChange={(e) => updateBooking({ notes: e.target.value })}
            placeholder="Any special requests or notes&hellip;"
          />
        </div>

        {/* Home service toggle */}
        <div className="flex items-center gap-3 p-4 border border-charcoal/10">
          <button
            type="button"
            onClick={() => {
              setHomeService(!homeService)
              updateBooking({ isHomeService: !homeService })
            }}
            className={`relative w-11 h-6 rounded-full transition-colors duration-300 ${
              homeService ? 'bg-rose-primary' : 'bg-charcoal/20'
            }`}
            aria-pressed={homeService}
            aria-label="Toggle home service"
          >
            <span
              className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white shadow transition-transform duration-300 ${
                homeService ? 'translate-x-5' : ''
              }`}
            />
          </button>
          <div>
            <p className="font-sans text-sm font-medium text-charcoal">Home Service</p>
            <p className="font-sans text-xs text-muted">We come to your location (+AED 50)</p>
          </div>
        </div>

        {homeService && (
          <div>
            <label className={labelClass}>Home Address *</label>
            <textarea
              className={`${inputClass} resize-none`}
              rows={2}
              value={booking.homeAddress || ''}
              onChange={(e) => updateBooking({ homeAddress: e.target.value })}
              placeholder="Building, street, area, Dubai"
            />
            {errors.address && <p className="text-rose-primary text-xs mt-1">{errors.address}</p>}
          </div>
        )}

        <button
          type="submit"
          className="w-full py-4 bg-rose-primary text-white font-sans text-sm tracking-widest uppercase hover:bg-rose-dark transition-colors duration-300"
        >
          Continue to Confirmation
        </button>
      </form>
    </div>
  )
}
