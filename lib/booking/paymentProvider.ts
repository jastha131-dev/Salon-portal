import type { PaymentMethod } from '@/types'

export interface PaymentOption {
  id: PaymentMethod
  label: string
  description: string
  available: boolean
  icon: string
}

export const PAYMENT_OPTIONS: PaymentOption[] = [
  {
    id: 'cash',
    label: 'Cash',
    description: 'Pay in cash when you arrive at the salon',
    available: true,
    icon: 'Banknote',
  },
  {
    id: 'card',
    label: 'Card on Arrival',
    description: 'Pay by debit or credit card at the salon',
    available: true,
    icon: 'CreditCard',
  },
  {
    id: 'online',
    label: 'Online Payment',
    description: 'Pay securely online — coming soon',
    available: false,
    icon: 'Globe',
  },
]
