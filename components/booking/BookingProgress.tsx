import { Check } from 'lucide-react'

const steps = [
  { num: 1, label: 'Category' },
  { num: 2, label: 'Service' },
  { num: 3, label: 'Stylist' },
  { num: 4, label: 'Location' },
  { num: 5, label: 'Date & Time' },
  { num: 6, label: 'Details' },
  { num: 7, label: 'Payment' },
  { num: 8, label: 'Confirm' },
]

export function BookingProgress({ currentStep }: { currentStep: number }) {
  return (
    <div className="flex items-center justify-center mb-12 overflow-x-auto pb-2">
      {steps.map((step, i) => (
        <div key={step.num} className="flex items-center flex-shrink-0">
          <div className="flex flex-col items-center">
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-sans font-medium transition-all duration-300 ${
                currentStep > step.num
                  ? 'bg-rose-primary text-white'
                  : currentStep === step.num
                  ? 'bg-charcoal text-white'
                  : 'bg-charcoal/10 text-muted'
              }`}
            >
              {currentStep > step.num ? <Check className="w-3.5 h-3.5" /> : step.num}
            </div>
            <span
              className={`mt-1.5 font-sans text-xs tracking-wide hidden md:block ${
                currentStep >= step.num ? 'text-charcoal' : 'text-muted'
              }`}
            >
              {step.label}
            </span>
          </div>
          {i < steps.length - 1 && (
            <div
              className={`w-8 md:w-12 h-px mx-1.5 mb-5 flex-shrink-0 transition-colors duration-300 ${
                currentStep > step.num ? 'bg-rose-primary' : 'bg-charcoal/15'
              }`}
            />
          )}
        </div>
      ))}
    </div>
  )
}
