'use client'
import { AnimatePresence, motion } from 'framer-motion'
import { ChevronLeft } from 'lucide-react'
import { BookingProgress } from '@/components/booking/BookingProgress'
import { StepCategory } from '@/components/booking/StepCategory'
import { StepService } from '@/components/booking/StepService'
import { StepStaff } from '@/components/booking/StepStaff'
import { StepLocation } from '@/components/booking/StepLocation'
import { StepDateTime } from '@/components/booking/StepDateTime'
import { StepDetails } from '@/components/booking/StepDetails'
import { StepPayment } from '@/components/booking/StepPayment'
import { StepConfirmation } from '@/components/booking/StepConfirmation'
import { useBookingStore } from '@/stores/bookingStore'

const TOTAL_STEPS = 8
const stepComponents = [
  StepCategory,
  StepService,
  StepStaff,
  StepLocation,
  StepDateTime,
  StepDetails,
  StepPayment,
  StepConfirmation,
]

export default function BookingPage() {
  const { step, prevStep } = useBookingStore()
  const StepComponent = stepComponents[step - 1]

  return (
    <>
      <div className="bg-charcoal pt-24 pb-12">
        <div className="container-luxury text-center">
          <p className="font-cormorant italic text-rose-light text-xl tracking-widest mb-2">
            Reserve Your Visit
          </p>
          <h1 className="font-playfair text-4xl md:text-5xl text-warm-white font-medium">
            Book an Appointment
          </h1>
          <div className="divider-gold w-16 mx-auto mt-4 opacity-60" />
        </div>
      </div>

      <section className="py-12 md:py-20 bg-cream-bg min-h-screen">
        <div className="container-luxury max-w-4xl">
          <BookingProgress currentStep={step} />

          <div className="bg-warm-white p-8 md:p-12">
            <AnimatePresence mode="wait">
              <motion.div
                key={step}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
              >
                <StepComponent />
              </motion.div>
            </AnimatePresence>

            {step > 1 && step < TOTAL_STEPS && (
              <motion.button
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                onClick={prevStep}
                className="mt-8 flex items-center gap-1.5 font-sans text-xs tracking-widest uppercase text-muted hover:text-charcoal transition-colors"
              >
                <ChevronLeft className="w-4 h-4" /> Back
              </motion.button>
            )}
          </div>
        </div>
      </section>
    </>
  )
}
