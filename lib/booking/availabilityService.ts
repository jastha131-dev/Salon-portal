const SLOT_INTERVAL = 30

function timeToMinutes(time: string): number {
  const [h, m] = time.split(':').map(Number)
  return h * 60 + m
}

function minutesToTime(minutes: number): string {
  const h = Math.floor(minutes / 60)
  const m = minutes % 60
  return `${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`
}

function getDayName(dateStr: string): string {
  // Parse as local date to avoid timezone shifts
  const [year, month, day] = dateStr.split('-').map(Number)
  const date = new Date(year, month - 1, day)
  return ['sunday', 'monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday'][date.getDay()]
}

export function generateSlots(startTime: string, endTime: string): string[] {
  const start = timeToMinutes(startTime)
  const end = timeToMinutes(endTime)
  const slots: string[] = []
  for (let t = start; t < end; t += SLOT_INTERVAL) {
    slots.push(minutesToTime(t))
  }
  return slots
}

export interface AvailabilityInput {
  date: string
  bookedSlots: string[]
  workingHours?: Array<{ day: string; startTime: string; endTime: string; closed?: boolean }>
  blockedDates?: string[]
}

export interface SlotResult {
  time: string
  available: boolean
}

const DEFAULT_START = '09:00'
const DEFAULT_END = '20:00'

export function computeAvailability(input: AvailabilityInput): SlotResult[] {
  const { date, bookedSlots, workingHours, blockedDates } = input

  if (blockedDates?.includes(date)) return []

  let startTime = DEFAULT_START
  let endTime = DEFAULT_END

  if (workingHours && workingHours.length > 0) {
    const dayName = getDayName(date)
    const dayHours = workingHours.find((wh) => wh.day === dayName)
    if (!dayHours || dayHours.closed) return []
    startTime = dayHours.startTime
    endTime = dayHours.endTime
  }

  const allSlots = generateSlots(startTime, endTime)
  const bookedSet = new Set(bookedSlots)

  return allSlots.map((time) => ({ time, available: !bookedSet.has(time) }))
}
