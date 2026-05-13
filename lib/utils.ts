// ─────────────────────────────────────────────────────────────────────────────
// cn — merge Tailwind class names, resolving conflicts (last wins)
// Pure implementation; no external deps required.
// ─────────────────────────────────────────────────────────────────────────────
type ClassValue =
  | string
  | number
  | boolean
  | null
  | undefined
  | ClassValue[]
  | { [key: string]: boolean | null | undefined }

function clsxInner(...inputs: ClassValue[]): string {
  const parts: string[] = []
  for (const input of inputs) {
    if (!input && input !== 0) continue
    if (typeof input === 'string' || typeof input === 'number') {
      parts.push(String(input))
    } else if (Array.isArray(input)) {
      const inner = clsxInner(...input)
      if (inner) parts.push(inner)
    } else if (typeof input === 'object') {
      for (const [key, val] of Object.entries(input)) {
        if (val) parts.push(key)
      }
    }
  }
  return parts.join(' ')
}

/**
 * Tailwind-aware class merger.
 * Conflicting utilities (same prefix) are resolved: last value wins.
 * e.g. cn('text-red-500', 'text-blue-600') → 'text-blue-600'
 */
function twMergeSimple(classStr: string): string {
  const classes = classStr.split(/\s+/).filter(Boolean)
  const map = new Map<string, string>()

  for (const cls of classes) {
    // Strip optional variant prefixes like hover:, focus:, md: etc.
    const colonIdx = cls.lastIndexOf(':')
    const variant = colonIdx !== -1 ? cls.slice(0, colonIdx + 1) : ''
    const utility = colonIdx !== -1 ? cls.slice(colonIdx + 1) : cls

    // Extract the Tailwind prefix (everything before the last `-<value>` segment)
    // e.g. "text-blue-600" → prefix "text-blue", "px-4" → prefix "px"
    const dashIdx = utility.lastIndexOf('-')
    const prefix = dashIdx > 0 ? utility.slice(0, dashIdx) : utility

    const key = variant + prefix
    map.set(key, cls)
  }

  return Array.from(map.values()).join(' ')
}

export function cn(...inputs: ClassValue[]): string {
  return twMergeSimple(clsxInner(...inputs))
}

// ─────────────────────────────────────────────────────────────────────────────
// Time slot generator
// ─────────────────────────────────────────────────────────────────────────────
export function generateTimeSlots(
  startHour = 9,
  endHour = 20,
  intervalMinutes = 30
): string[] {
  const slots: string[] = []
  for (let hour = startHour; hour < endHour; hour++) {
    for (let min = 0; min < 60; min += intervalMinutes) {
      const h = hour % 12 || 12
      const ampm = hour < 12 ? 'AM' : 'PM'
      const m = min.toString().padStart(2, '0')
      slots.push(`${h}:${m} ${ampm}`)
    }
  }
  return slots
}

// ─────────────────────────────────────────────────────────────────────────────
// Booking reference generator
// ─────────────────────────────────────────────────────────────────────────────
export function generateBookingRef(): string {
  return (
    'BK' +
    Date.now().toString(36).toUpperCase() +
    Math.random().toString(36).slice(2, 6).toUpperCase()
  )
}

// ─────────────────────────────────────────────────────────────────────────────
// Price formatter
// ─────────────────────────────────────────────────────────────────────────────
export function formatPrice(price: number): string {
  return `AED ${price.toLocaleString()}`
}
