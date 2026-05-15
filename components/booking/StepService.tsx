'use client'
import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Clock, Check, Plus, Minus, Flame } from 'lucide-react'
import { useBookingStore } from '@/stores/bookingStore'
import type { Service, AddOn } from '@/types'

export function StepService() {
  const { booking, updateBooking, nextStep } = useBookingStore()
  const [services, setServices] = useState<Service[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedService, setSelectedService] = useState<Service | null>(null)
  const [chosenAddOns, setChosenAddOns] = useState<AddOn[]>(booking.selectedAddOns || [])

  useEffect(() => {
    const cat = booking.categorySlug
    fetch(`/api/services${cat && cat !== 'home-service' ? `?category=${cat}` : ''}`)
      .then((r) => r.json())
      .then((d) => {
        setServices(d.data || [])
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [booking.categorySlug])

  const toggleAddOn = (addon: AddOn) => {
    setChosenAddOns((prev) =>
      prev.some((a) => a._key === addon._key)
        ? prev.filter((a) => a._key !== addon._key)
        : [...prev, addon],
    )
  }

  const handleContinue = () => {
    if (!selectedService) return
    updateBooking({
      serviceId: selectedService._id,
      serviceName: selectedService.name,
      servicePrice: selectedService.discountPrice ?? selectedService.price,
      selectedAddOns: chosenAddOns,
    })
    nextStep()
  }

  if (loading) {
    return <div className="text-center py-20 font-sans text-muted">Loading services…</div>
  }

  return (
    <div>
      <h2 className="font-playfair text-3xl text-charcoal text-center mb-2">Select a Service</h2>
      <p className="font-sans text-muted text-center mb-10">Choose the treatment you&apos;d like to book</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        {services.map((service, i) => {
          const isSelected = selectedService?._id === service._id
          return (
            <motion.button
              key={service._id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              onClick={() => {
                setSelectedService(isSelected ? null : service)
                setChosenAddOns([])
              }}
              className={`text-left p-5 border-2 transition-all duration-300 hover:-translate-y-0.5 relative ${
                isSelected
                  ? 'border-rose-primary bg-rose-primary/5'
                  : 'border-charcoal/10 hover:border-rose-primary/50'
              }`}
            >
              {service.popularBadge && (
                <span className="absolute top-3 right-3 flex items-center gap-1 bg-gold-accent text-white text-xs font-sans px-2 py-0.5">
                  <Flame className="w-3 h-3" /> Popular
                </span>
              )}
              {isSelected && !service.popularBadge && (
                <Check className="absolute top-4 right-4 w-4 h-4 text-rose-primary" />
              )}
              <h3 className="font-playfair text-charcoal font-medium mb-2 pr-20">{service.name}</h3>
              <div className="flex items-center justify-between text-sm font-sans">
                <span className="flex items-center gap-1.5 text-muted">
                  <Clock className="w-3.5 h-3.5" /> {service.duration || '60 min'}
                </span>
                <span className="flex items-center gap-2">
                  {service.discountPrice ? (
                    <>
                      <span className="line-through text-muted text-xs">AED {service.price}</span>
                      <span className="font-medium text-rose-primary">AED {service.discountPrice}</span>
                    </>
                  ) : (
                    <span className="font-medium text-rose-primary">AED {service.price}</span>
                  )}
                </span>
              </div>
              {service.preparationNotes && isSelected && (
                <p className="mt-3 text-xs font-sans text-muted border-t border-charcoal/10 pt-3">
                  ℹ️ {service.preparationNotes}
                </p>
              )}
            </motion.button>
          )
        })}
      </div>

      {/* Add-ons panel */}
      <AnimatePresence>
        {selectedService && selectedService.addOns && selectedService.addOns.length > 0 && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mb-8 border border-charcoal/10 p-5 bg-cream-bg"
          >
            <h3 className="font-sans text-xs tracking-widest uppercase text-charcoal mb-4">
              Optional Add-ons
            </h3>
            <div className="space-y-3">
              {selectedService.addOns.map((addon) => {
                const active = chosenAddOns.some((a) => a._key === addon._key)
                return (
                  <button
                    key={addon._key}
                    onClick={() => toggleAddOn(addon)}
                    className={`w-full flex items-center justify-between p-3 border transition-colors ${
                      active ? 'border-rose-primary bg-rose-primary/5' : 'border-charcoal/10 bg-warm-white'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center ${active ? 'bg-rose-primary' : 'bg-charcoal/10'}`}>
                        {active ? <Minus className="w-3 h-3 text-white" /> : <Plus className="w-3 h-3 text-muted" />}
                      </div>
                      <div className="text-left">
                        <p className="font-sans text-sm text-charcoal">{addon.name}</p>
                        {addon.duration && <p className="font-sans text-xs text-muted">{addon.duration}</p>}
                      </div>
                    </div>
                    <span className="font-sans text-sm font-medium text-rose-primary">+AED {addon.price}</span>
                  </button>
                )
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {selectedService && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center">
          <button
            onClick={handleContinue}
            className="px-12 py-4 bg-rose-primary text-white font-sans text-sm tracking-widest uppercase hover:bg-rose-dark transition-colors"
          >
            Continue
          </button>
        </motion.div>
      )}
    </div>
  )
}
