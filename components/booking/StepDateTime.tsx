'use client'
import { useState, useEffect, useCallback } from 'react'
import { motion } from 'framer-motion'
import { DayPicker } from 'react-day-picker'
import 'react-day-picker/dist/style.css'
import { format } from 'date-fns'
import { useBookingStore } from '@/stores/bookingStore'

function formatSlotDisplay(time: string): string {
  const [hStr, m] = time.split(':')
  const h = parseInt(hStr, 10)
  const ampm = h < 12 ? 'AM' : 'PM'
  const displayH = h % 12 || 12
  return `${displayH}:${m} ${ampm}`
}

interface SlotResult {
  time: string
  available: boolean
}

export function StepDateTime() {
  const { booking, updateBooking, nextStep } = useBookingStore()
  const [selected, setSelected] = useState<Date | undefined>()
  const [slots, setSlots] = useState<SlotResult[]>([])
  const [loadingSlots, setLoadingSlots] = useState(false)

  const fetchSlots = useCallback(
    async (date: Date) => {
      const dateStr = format(date, 'yyyy-MM-dd')
      setLoadingSlots(true)

      const url =
        booking.staffId && !booking.isAnyStaff
          ? `/api/staff/${booking.staffId}/availability?date=${dateStr}`
          : `/api/availability?date=${dateStr}`

      try {
        const res = await fetch(url)
        const data = await res.json()
        setSlots(data.data?.slots || [])
      } catch {
        setSlots([])
      } finally {
        setLoadingSlots(false)
      }
    },
    [booking.staffId, booking.isAnyStaff],
  )

  useEffect(() => {
    if (selected) {
      updateBooking({ bookingDate: format(selected, 'yyyy-MM-dd'), timeSlot: undefined })
      fetchSlots(selected)
    }
  }, [selected]) // eslint-disable-line react-hooks/exhaustive-deps

  const handleSlotSelect = (slot: string) => {
    updateBooking({ timeSlot: slot })
    nextStep()
  }

  return (
    <div>
      <h2 className="font-playfair text-3xl text-charcoal text-center mb-2">
        Pick Your Date &amp; Time
      </h2>
      <p className="font-sans text-muted text-center mb-10">
        {booking.staffName
          ? `Showing availability for ${booking.staffName}`
          : 'Choose a convenient slot for your appointment'}
      </p>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="flex justify-center">
          <div className="border border-charcoal/10 p-4">
            <DayPicker
              mode="single"
              selected={selected}
              onSelect={setSelected}
              disabled={[{ before: new Date() }]}
              modifiersClassNames={{
                selected: 'rdp-selected bg-rose-primary text-white rounded-full',
                today: 'rdp-today font-bold',
              }}
            />
          </div>
        </div>

        <div>
          {!selected && (
            <div className="h-full flex items-center justify-center">
              <p className="font-sans text-muted">Please select a date first</p>
            </div>
          )}

          {selected && loadingSlots && (
            <div className="flex items-center justify-center h-full">
              <p className="font-sans text-muted text-sm">Checking availability…</p>
            </div>
          )}

          {selected && !loadingSlots && slots.length === 0 && (
            <div className="flex items-center justify-center h-full">
              <p className="font-sans text-muted text-sm">No slots available on this date.</p>
            </div>
          )}

          {selected && !loadingSlots && slots.length > 0 && (
            <>
              <p className="font-sans text-sm font-medium text-charcoal mb-4">
                Available times for {format(selected, 'MMMM d, yyyy')}
              </p>
              <div className="grid grid-cols-3 gap-2">
                {slots.map((slot, i) => {
                  const isSelected = booking.timeSlot === slot.time
                  return (
                    <motion.button
                      key={slot.time}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: i * 0.015 }}
                      onClick={() => slot.available && handleSlotSelect(slot.time)}
                      disabled={!slot.available}
                      className={`py-2.5 text-xs font-sans tracking-wide transition-all duration-200 ${
                        !slot.available
                          ? 'bg-charcoal/5 text-muted cursor-not-allowed line-through'
                          : isSelected
                          ? 'bg-rose-primary text-white'
                          : 'border border-charcoal/15 text-charcoal hover:border-rose-primary hover:text-rose-primary'
                      }`}
                    >
                      {formatSlotDisplay(slot.time)}
                    </motion.button>
                  )
                })}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  )
}
