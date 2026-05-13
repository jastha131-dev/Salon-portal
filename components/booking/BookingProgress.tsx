import { Check } from 'lucide-react'

const steps = [
  { num: 1, label: 'Category' },
  { num: 2, label: 'Service' },
  { num: 3, label: 'Date & Time' },
  { num: 4, label: 'Your Details' },
  { num: 5, label: 'Confirm' },
]

export function BookingProgress({ currentStep }: { currentStep: number }) {
  return (
    <div className="flex items-center justify-center mb-12">
      {steps.map((step, i) => (
        <div key={step.num} className="flex items-center">
          <div className="flex flex-col items-center">
            <div
              className={`w-9 h-9 rounded-full flex items-center justify-center text-sm font-sans font-medium transition-all duration-300 ${
                currentStep > step.num
                  ? 'bg-rose-primary text-white'
                  : currentStep === step.num
                  ? 'bg-charcoal text-white'
                  : 'bg-charcoal/10 text-muted'
              }`}
            >
              {currentStep > step.num ? <Check className="w-4 h-4" /> : step.num}
            </div>
            <span
              className={`mt-1.5 font-sans text-xs tracking-wide hidden sm:block ${
                currentStep >= step.num ? 'text-charcoal' : 'text-muted-light'
              }`}
            >
              {step.label}
            </span>
          </div>
          {i < steps.length - 1 && (
            <div
              className={`w-12 md:w-20 h-px mx-2 mb-5 transition-colors duration-300 ${
                currentStep > step.num ? 'bg-rose-primary' : 'bg-charcoal/15'
              }`}
            />
          )}
        </div>
      ))}
    </div>
  )
}
