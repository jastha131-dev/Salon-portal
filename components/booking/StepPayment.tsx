'use client'
import { motion } from 'framer-motion'
import { Banknote, CreditCard, Globe, Check } from 'lucide-react'
import { useBookingStore } from '@/stores/bookingStore'
import { PAYMENT_OPTIONS } from '@/lib/booking/paymentProvider'
import type { PaymentMethod } from '@/types'

const ICON_MAP: Record<string, React.ReactNode> = {
  Banknote: <Banknote className="w-6 h-6" />,
  CreditCard: <CreditCard className="w-6 h-6" />,
  Globe: <Globe className="w-6 h-6" />,
}

const HOME_FEE = 50

export function StepPayment() {
  const { booking, updateBooking, nextStep } = useBookingStore()

  const serviceTotal = booking.servicePrice || 0
  const addOnTotal = (booking.selectedAddOns || []).reduce((s, a) => s + a.price, 0)
  const homeFee = booking.isHomeService ? HOME_FEE : 0
  const grandTotal = serviceTotal + addOnTotal + homeFee

  const select = (method: PaymentMethod) => {
    updateBooking({ paymentMethod: method, totalPrice: grandTotal })
    nextStep()
  }

  return (
    <div>
      <h2 className="font-playfair text-3xl text-charcoal text-center mb-2">Payment Method</h2>
      <p className="font-sans text-muted text-center mb-10">How would you like to pay?</p>

      <div className="max-w-md mx-auto space-y-4 mb-8">
        {PAYMENT_OPTIONS.map((option, i) => {
          const isSelected = booking.paymentMethod === option.id
          return (
            <motion.button
              key={option.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              onClick={() => option.available && select(option.id)}
              disabled={!option.available}
              className={`w-full p-5 border-2 flex items-center gap-4 transition-all duration-300 relative text-left ${
                !option.available
                  ? 'border-charcoal/5 opacity-40 cursor-not-allowed'
                  : isSelected
                  ? 'border-rose-primary bg-rose-primary/5'
                  : 'border-charcoal/10 hover:border-rose-primary/50 hover:-translate-y-0.5'
              }`}
            >
              <div
                className={`w-12 h-12 flex items-center justify-center rounded-full flex-shrink-0 transition-colors ${
                  isSelected ? 'bg-rose-primary text-white' : 'bg-cream-bg text-muted'
                }`}
              >
                {ICON_MAP[option.icon]}
              </div>
              <div className="flex-1">
                <p className="font-playfair text-charcoal font-medium">{option.label}</p>
                <p className="font-sans text-xs text-muted">{option.description}</p>
              </div>
              {!option.available && (
                <span className="font-sans text-xs bg-charcoal/10 text-muted px-2 py-1 rounded">
                  Soon
                </span>
              )}
              {isSelected && option.available && (
                <Check className="w-5 h-5 text-rose-primary flex-shrink-0" />
              )}
            </motion.button>
          )
        })}
      </div>

      {/* Order summary */}
      <div className="max-w-md mx-auto p-6 bg-cream-bg">
        <h3 className="font-sans text-xs tracking-widest uppercase text-charcoal mb-4">
          Order Summary
        </h3>

        {booking.serviceName && (
          <div className="flex justify-between font-sans text-sm mb-2">
            <span className="text-muted">{booking.serviceName}</span>
            <span className="text-charcoal">AED {serviceTotal}</span>
          </div>
        )}

        {(booking.selectedAddOns || []).map((addon) => (
          <div key={addon._key} className="flex justify-between font-sans text-sm mb-2">
            <span className="text-muted">{addon.name}</span>
            <span className="text-charcoal">AED {addon.price}</span>
          </div>
        ))}

        {booking.isHomeService && (
          <div className="flex justify-between font-sans text-sm mb-2">
            <span className="text-muted">Home Service Fee</span>
            <span className="text-charcoal">AED {HOME_FEE}</span>
          </div>
        )}

        <div className="border-t border-charcoal/10 pt-3 mt-3 flex justify-between">
          <span className="font-playfair text-charcoal font-medium">Total</span>
          <span className="font-playfair text-rose-primary font-medium">AED {grandTotal}</span>
        </div>
      </div>
    </div>
  )
}
