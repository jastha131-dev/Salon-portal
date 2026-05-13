'use client'
import { motion } from 'framer-motion'
import { Scissors, Sparkles, Star, Leaf, Home } from 'lucide-react'
import { useBookingStore } from '@/stores/bookingStore'

const categories = [
  { id: 'hair', name: 'Hair', icon: Scissors, desc: 'Cuts, color & treatments' },
  { id: 'nails', name: 'Nails', icon: Sparkles, desc: 'Manicure & pedicure art' },
  { id: 'makeup', name: 'Makeup', icon: Star, desc: 'Glam for every occasion' },
  { id: 'spa', name: 'Spa', icon: Leaf, desc: 'Relaxation & wellness' },
  { id: 'home-service', name: 'Home Service', icon: Home, desc: 'We come to you' },
]

export function StepCategory() {
  const { booking, updateBooking, nextStep } = useBookingStore()

  return (
    <div>
      <h2 className="font-playfair text-3xl text-charcoal text-center mb-2">Choose a Category</h2>
      <p className="font-sans text-muted text-center mb-10">What service are you looking for?</p>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {categories.map((cat, i) => {
          const Icon = cat.icon
          const selected = booking.serviceId === cat.id
          return (
            <motion.button
              key={cat.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.07 }}
              onClick={() => {
                updateBooking({ serviceId: cat.id })
                nextStep()
              }}
              className={`flex flex-col items-center p-6 border-2 transition-all duration-300 text-center hover:-translate-y-1 ${
                selected
                  ? 'border-rose-primary bg-rose-primary/5'
                  : 'border-charcoal/10 hover:border-rose-primary/50'
              }`}
            >
              <div
                className={`w-14 h-14 rounded-full flex items-center justify-center mb-3 ${
                  selected ? 'bg-rose-primary' : 'bg-rose-light/20'
                }`}
              >
                <Icon className={`w-6 h-6 ${selected ? 'text-white' : 'text-rose-primary'}`} />
              </div>
              <h3 className="font-playfair text-charcoal font-medium mb-1">{cat.name}</h3>
              <p className="font-sans text-xs text-muted">{cat.desc}</p>
            </motion.button>
          )
        })}
      </div>
    </div>
  )
}
