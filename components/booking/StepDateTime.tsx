'use client'
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { DayPicker } from 'react-day-picker'
import 'react-day-picker/dist/style.css'
import { useBookingStore } from '@/stores/bookingStore'
import { generateTimeSlots } from '@/lib/utils'
import { format } from 'date-fns'

export function StepDateTime() {
  const { booking, updateBooking, nextStep } = useBookingStore()
  const [selected, setSelected] = useState<Date | undefined>(undefined)
  const [bookedSlots, setBookedSlots] = useState<string[]>([])
  const timeSlots = generateTimeSlots(9, 20, 30)

  useEffect(() => {
    if (selected) {
      const dateStr = format(selected, 'yyyy-MM-dd')
      fetch(`/api/availability?date=${dateStr}`)
        .then((r) => r.json())
        .then((d) => {
          setBookedSlots(d.data?.bookedSlots || [])
        })
        .catch(() => {})
      updateBooking({ bookingDate: dateStr })
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selected])

  const handleSlotSelect = (slot: string) => {
    updateBooking({ timeSlot: slot })
    nextStep()
  }

  const disabledDays = [{ before: new Date() }]

  return (
    <div>
      <h2 className="font-playfair text-3xl text-charcoal text-center mb-2">Pick Your Date &amp; Time</h2>
      <p className="font-sans text-muted text-center mb-10">Choose a convenient slot for your appointment</p>
      <div className="grid md:grid-cols-2 gap-8">
        {/* Calendar */}
        <div className="flex justify-center">
          <div className="border border-charcoal/10 p-4">
            <DayPicker
              mode="single"
              selected={selected}
              onSelect={setSelected}
              disabled={disabledDays}
              modifiersClassNames={{
                selected: 'rdp-selected bg-rose-primary text-white rounded-full',
                today: 'rdp-today font-bold',
              }}
            />
          </div>
        </div>

        {/* Time slots */}
        <div>
          {selected ? (
            <>
              <p className="font-sans text-sm font-medium text-charcoal mb-4">
                Available times for {format(selected, 'MMMM d, yyyy')}
              </p>
              <div className="grid grid-cols-3 gap-2">
                {timeSlots.map((slot, i) => {
                  const isBooked = bookedSlots.includes(slot)
                  const isSelected = booking.timeSlot === slot
                  return (
                    <motion.button
                      key={slot}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: i * 0.02 }}
                      onClick={() => !isBooked && handleSlotSelect(slot)}
                      disabled={isBooked}
                      className={`py-2.5 text-xs font-sans tracking-wide transition-all duration-200 ${
                        isBooked
                          ? 'bg-charcoal/5 text-muted-light cursor-not-allowed line-through'
                          : isSelected
                          ? 'bg-rose-primary text-white'
                          : 'border border-charcoal/15 text-charcoal hover:border-rose-primary hover:text-rose-primary'
                      }`}
                    >
                      {slot}
                    </motion.button>
                  )
                })}
              </div>
            </>
          ) : (
            <div className="h-full flex items-center justify-center">
              <p className="font-sans text-muted">Please select a date first</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
