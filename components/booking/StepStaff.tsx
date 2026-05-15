'use client'
import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { Star, Check, UserCircle2 } from 'lucide-react'
import Image from 'next/image'
import { useBookingStore } from '@/stores/bookingStore'
import { urlFor } from '@/lib/sanity/image'
import type { StaffMember } from '@/types'

export function StepStaff() {
  const { booking, updateBooking, nextStep } = useBookingStore()
  const [staff, setStaff] = useState<StaffMember[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/staff')
      .then((r) => r.json())
      .then((d) => {
        setStaff(d.data || [])
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [])

  const selectAny = () => {
    updateBooking({ staffId: undefined, staffName: undefined, isAnyStaff: true })
    nextStep()
  }

  const selectStaff = (member: StaffMember) => {
    updateBooking({ staffId: member._id, staffName: member.name, isAnyStaff: false })
    nextStep()
  }

  if (loading) {
    return <div className="text-center py-20 font-sans text-muted">Loading stylists…</div>
  }

  return (
    <div>
      <h2 className="font-playfair text-3xl text-charcoal text-center mb-2">Choose Your Stylist</h2>
      <p className="font-sans text-muted text-center mb-10">
        Select a specific stylist or let us assign the best available
      </p>

      <motion.button
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        onClick={selectAny}
        className={`w-full mb-6 p-5 border-2 flex items-center gap-4 transition-all duration-300 hover:-translate-y-0.5 text-left ${
          booking.isAnyStaff
            ? 'border-rose-primary bg-rose-primary/5'
            : 'border-charcoal/10 hover:border-rose-primary/50'
        }`}
      >
        <div className="w-12 h-12 rounded-full bg-charcoal/10 flex items-center justify-center flex-shrink-0">
          <UserCircle2 className="w-6 h-6 text-muted" />
        </div>
        <div className="flex-1">
          <p className="font-playfair text-charcoal font-medium">Any Available Stylist</p>
          <p className="font-sans text-xs text-muted">
            We&apos;ll assign the best available stylist for your time slot
          </p>
        </div>
        {booking.isAnyStaff && <Check className="w-5 h-5 text-rose-primary flex-shrink-0" />}
      </motion.button>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {staff.map((member, i) => {
          const isSelected = booking.staffId === member._id
          return (
            <motion.button
              key={member._id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.06 }}
              onClick={() => selectStaff(member)}
              className={`text-left p-5 border-2 transition-all duration-300 hover:-translate-y-0.5 relative ${
                isSelected
                  ? 'border-rose-primary bg-rose-primary/5'
                  : 'border-charcoal/10 hover:border-rose-primary/50'
              }`}
            >
              {isSelected && <Check className="absolute top-4 right-4 w-4 h-4 text-rose-primary" />}

              <div className="flex items-center gap-3 mb-3">
                {member.image ? (
                  <div className="w-12 h-12 rounded-full overflow-hidden relative flex-shrink-0">
                    <Image
                      src={urlFor(member.image).width(96).height(96).url()}
                      alt={member.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                ) : (
                  <div className="w-12 h-12 rounded-full bg-rose-light/30 flex items-center justify-center flex-shrink-0">
                    <span className="font-playfair text-rose-primary text-lg font-medium">
                      {member.name[0]}
                    </span>
                  </div>
                )}
                <div>
                  <p className="font-playfair text-charcoal font-medium">{member.name}</p>
                  <p className="font-sans text-xs text-muted">{member.role}</p>
                </div>
              </div>

              <div className="flex items-center gap-1 mb-2">
                {Array.from({ length: 5 }).map((_, j) => (
                  <Star
                    key={j}
                    className={`w-3 h-3 ${
                      j < Math.round(member.rating || 0)
                        ? 'fill-gold-accent text-gold-accent'
                        : 'text-charcoal/20'
                    }`}
                  />
                ))}
                <span className="font-sans text-xs text-muted ml-1">
                  {(member.rating || 0).toFixed(1)}
                </span>
              </div>

              {member.experienceYears > 0 && (
                <p className="font-sans text-xs text-muted mb-2">
                  {member.experienceYears} year{member.experienceYears !== 1 ? 's' : ''} experience
                </p>
              )}

              {member.expertise && member.expertise.length > 0 && (
                <div className="flex flex-wrap gap-1">
                  {member.expertise.slice(0, 3).map((tag) => (
                    <span key={tag} className="px-2 py-0.5 bg-cream-bg text-xs font-sans text-muted">
                      {tag}
                    </span>
                  ))}
                </div>
              )}
            </motion.button>
          )
        })}
      </div>
    </div>
  )
}
