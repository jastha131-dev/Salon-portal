'use client'
import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Clock, Check } from 'lucide-react'
import { useBookingStore } from '@/stores/bookingStore'
import type { Service } from '@/types'

export function StepService() {
  const { booking, updateBooking, nextStep } = useBookingStore()
  const [services, setServices] = useState<Service[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const category = booking.serviceId
    fetch(`/api/services${category ? `?category=${category}` : ''}`)
      .then((r) => r.json())
      .then((d) => {
        setServices(d.data || [])
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [booking.serviceId])

  if (loading) {
    return <div className="text-center py-20 font-sans text-muted">Loading services&hellip;</div>
  }

  return (
    <div>
      <h2 className="font-playfair text-3xl text-charcoal text-center mb-2">Select a Service</h2>
      <p className="font-sans text-muted text-center mb-10">Choose the treatment you&apos;d like to book</p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {services.map((service, i) => {
          const selected = booking.serviceName === service.name
          return (
            <motion.button
              key={service._id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              onClick={() => {
                updateBooking({ serviceId: service._id, serviceName: service.name })
                nextStep()
              }}
              className={`text-left p-5 border-2 transition-all duration-300 hover:-translate-y-0.5 relative ${
                selected
                  ? 'border-rose-primary bg-rose-primary/5'
                  : 'border-charcoal/10 hover:border-rose-primary/50'
              }`}
            >
              {selected && <Check className="absolute top-4 right-4 w-4 h-4 text-rose-primary" />}
              <h3 className="font-playfair text-charcoal font-medium mb-2">{service.name}</h3>
              <div className="flex items-center justify-between text-sm font-sans">
                <span className="flex items-center gap-1.5 text-muted">
                  <Clock className="w-3.5 h-3.5" /> {service.duration || '60 min'}
                </span>
                <span className="font-medium text-rose-primary">AED {service.price}</span>
              </div>
            </motion.button>
          )
        })}
      </div>
    </div>
  )
}
