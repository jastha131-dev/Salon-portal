'use client'
import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MapPin, Home, Check } from 'lucide-react'
import { useBookingStore } from '@/stores/bookingStore'
import type { Branch } from '@/types'

const DUBAI_AREAS = [
  'Al Barsha', 'Business Bay', 'Downtown Dubai', 'Dubai Marina',
  'Jumeirah', 'Jumeirah Lake Towers', 'JVC', 'Mirdif', 'Deira',
  'Bur Dubai', 'Al Quoz', 'Silicon Oasis', 'Sports City',
  'Arabian Ranches', 'Motor City', 'Palm Jumeirah', 'Ras Al Khor',
]

const inputClass =
  'w-full px-4 py-3 border border-charcoal/20 font-sans text-sm text-charcoal focus:outline-none focus:border-rose-primary transition-colors bg-transparent'
const labelClass = 'block font-sans text-xs tracking-widest uppercase text-charcoal mb-2'

export function StepLocation() {
  const { booking, updateBooking, nextStep } = useBookingStore()
  const [branches, setBranches] = useState<Branch[]>([])
  const [loading, setLoading] = useState(true)
  const [showHome, setShowHome] = useState(booking.isHomeService ?? false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  useEffect(() => {
    fetch('/api/branches')
      .then((r) => r.json())
      .then((d) => {
        setBranches(d.data || [])
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [])

  const selectBranch = (branch: Branch) => {
    updateBooking({ branchId: branch._id, branchName: branch.name, isHomeService: false, homeAddress: '', area: '' })
    nextStep()
  }

  const handleHomeSubmit = () => {
    const e: Record<string, string> = {}
    if (!booking.homeAddress?.trim()) e.address = 'Address is required'
    if (!booking.area?.trim()) e.area = 'Please select your area'
    setErrors(e)
    if (Object.keys(e).length > 0) return
    updateBooking({ branchId: undefined, branchName: undefined, isHomeService: true })
    nextStep()
  }

  if (loading) {
    return <div className="text-center py-20 font-sans text-muted">Loading locations…</div>
  }

  return (
    <div>
      <h2 className="font-playfair text-3xl text-charcoal text-center mb-2">
        Where Would You Like Your Service?
      </h2>
      <p className="font-sans text-muted text-center mb-10">Visit our salon or book a home service</p>

      {branches.length > 0 && (
        <div className="mb-8">
          <h3 className="font-sans text-xs tracking-widest uppercase text-charcoal mb-4">Our Locations</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {branches.map((branch, i) => {
              const isSelected = booking.branchId === branch._id && !booking.isHomeService
              return (
                <motion.button
                  key={branch._id}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.07 }}
                  onClick={() => selectBranch(branch)}
                  className={`text-left p-5 border-2 transition-all duration-300 hover:-translate-y-0.5 relative ${
                    isSelected
                      ? 'border-rose-primary bg-rose-primary/5'
                      : 'border-charcoal/10 hover:border-rose-primary/50'
                  }`}
                >
                  {isSelected && <Check className="absolute top-4 right-4 w-4 h-4 text-rose-primary" />}
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-rose-primary mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-playfair text-charcoal font-medium mb-1">{branch.name}</p>
                      <p className="font-sans text-xs text-muted">{branch.address}</p>
                      {branch.phone && (
                        <p className="font-sans text-xs text-muted mt-1">{branch.phone}</p>
                      )}
                    </div>
                  </div>
                </motion.button>
              )
            })}
          </div>
        </div>
      )}

      <div className="border border-charcoal/10 p-5">
        <button
          onClick={() => setShowHome((v) => !v)}
          className="flex items-center gap-3 w-full text-left mb-0"
        >
          <div
            className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors flex-shrink-0 ${
              showHome ? 'bg-rose-primary' : 'bg-charcoal/10'
            }`}
          >
            <Home className={`w-5 h-5 ${showHome ? 'text-white' : 'text-muted'}`} />
          </div>
          <div>
            <p className="font-playfair text-charcoal font-medium">Home Service</p>
            <p className="font-sans text-xs text-muted">We come to you (+AED 50 travel fee)</p>
          </div>
        </button>

        <AnimatePresence>
          {showHome && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden"
            >
              <div className="pt-5 space-y-4">
                <div>
                  <label className={labelClass}>Address *</label>
                  <input
                    className={inputClass}
                    value={booking.homeAddress || ''}
                    onChange={(e) => updateBooking({ homeAddress: e.target.value })}
                    placeholder="Building name, street, floor/unit…"
                  />
                  {errors.address && (
                    <p className="text-rose-primary text-xs mt-1">{errors.address}</p>
                  )}
                </div>
                <div>
                  <label className={labelClass}>Area *</label>
                  <select
                    className={inputClass}
                    value={booking.area || ''}
                    onChange={(e) => updateBooking({ area: e.target.value })}
                  >
                    <option value="">Select area…</option>
                    {DUBAI_AREAS.map((area) => (
                      <option key={area} value={area}>
                        {area}
                      </option>
                    ))}
                  </select>
                  {errors.area && <p className="text-rose-primary text-xs mt-1">{errors.area}</p>}
                </div>
                <button
                  onClick={handleHomeSubmit}
                  className="w-full py-4 bg-rose-primary text-white font-sans text-sm tracking-widest uppercase hover:bg-rose-dark transition-colors"
                >
                  Continue with Home Service
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
