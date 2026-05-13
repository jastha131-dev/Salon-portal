import { create } from 'zustand'
import type { Booking } from '@/types'

interface BookingState {
  step: number
  booking: Partial<Booking>
  setStep: (step: number) => void
  nextStep: () => void
  prevStep: () => void
  updateBooking: (data: Partial<Booking>) => void
  resetBooking: () => void
}

export const useBookingStore = create<BookingState>((set) => ({
  step: 1,
  booking: {},
  setStep: (step) => set({ step }),
  nextStep: () => set((state) => ({ step: Math.min(state.step + 1, 5) })),
  prevStep: () => set((state) => ({ step: Math.max(state.step - 1, 1) })),
  updateBooking: (data) =>
    set((state) => ({ booking: { ...state.booking, ...data } })),
  resetBooking: () => set({ step: 1, booking: {} }),
}))
