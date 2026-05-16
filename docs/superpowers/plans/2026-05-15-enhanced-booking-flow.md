# Enhanced Booking Flow Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Upgrade the 5-step booking wizard to an 8-step marketplace-grade flow: Category → Service (with add-ons) → Stylist → Location/Home → Date & Time (staff-aware) → Details → Payment → Confirmation.

**Architecture:** Sanity CMS remains the single data store. A `lib/booking/` abstraction layer isolates slot-computation and booking-creation logic behind stable interfaces — swapping to Postgres/Supabase later requires only changing that layer. The Zustand store is extended for 8-step state; all API routes follow the existing `{ data, error, meta }` JSON envelope. Time slots use 24-hour HH:MM format internally; UI formats for display.

**Tech Stack:** Next.js 16 App Router · Sanity v3 · Zustand v5 · Framer Motion v12 · TypeScript · Vitest (lib unit tests only)

---

## File Map

**New files:**
- `vitest.config.ts` — Vitest config (node env, lib tests only)
- `sanity/schemaTypes/branch.ts` — Branch document schema
- `lib/booking/availabilityService.ts` — Slot computation (day-of-week hours, blocked dates, bookings)
- `lib/booking/bookingService.ts` — Sanity booking document creation
- `lib/booking/paymentProvider.ts` — Payment option definitions
- `lib/booking/__tests__/availabilityService.test.ts` — Unit tests
- `lib/booking/__tests__/bookingService.test.ts` — Unit tests
- `app/api/staff/route.ts` — GET all active staff
- `app/api/branches/route.ts` — GET all branches
- `app/api/staff/[id]/availability/route.ts` — GET staff-specific time slots
- `components/booking/StepStaff.tsx` — Step 3: stylist selection
- `components/booking/StepLocation.tsx` — Step 4: branch or home service
- `components/booking/StepPayment.tsx` — Step 7: payment method + order summary

**Modified files:**
- `types/index.ts` — Add AddOn, Branch, StaffMember, PaymentMethod; enhance Booking, Service
- `sanity/schemaTypes/service.ts` — Add discountPrice, popularBadge, preparationNotes, addOns
- `sanity/schemaTypes/teamMember.ts` — Add rating, experienceYears, isActive, workingHours, blockedDates
- `sanity/schemaTypes/booking.ts` — Add staff, branch, addOns, paymentMethod, paymentStatus, customerWhatsApp, totalPrice
- `sanity/schemaTypes/index.ts` — Register branchSchema
- `lib/sanity/queries.ts` — Add staffQuery, branchesQuery; update service projections
- `lib/api/fetchers.ts` — Add getStaff, getBranches fetchers
- `stores/bookingStore.ts` — 8 steps, new state fields, fix categorySlug naming
- `components/booking/BookingProgress.tsx` — 8 steps with new labels
- `components/booking/StepCategory.tsx` — Fix: store categorySlug, not serviceId
- `components/booking/StepService.tsx` — Add-ons panel, discount price, popular badge
- `components/booking/StepDateTime.tsx` — Staff-aware availability, 24-hour slot format
- `components/booking/StepDetails.tsx` — Remove home service toggle, add WhatsApp field
- `components/booking/StepConfirmation.tsx` — Show staff, location, add-ons, payment, total
- `app/(site)/booking/page.tsx` — Wire 8 step components, update max step
- `app/api/availability/route.ts` — Delegate to availabilityService
- `app/api/bookings/route.ts` — Accept new fields (staff, branch, addOns, paymentMethod, totalPrice)

---

## Task 1: Install Vitest and configure for lib unit tests

**Files:**
- Create: `vitest.config.ts`
- Modify: `package.json`

- [ ] **Step 1: Install vitest**

```bash
npm install -D vitest
```
Expected: `vitest` appears in `devDependencies` in package.json.

- [ ] **Step 2: Create vitest config**

Create `vitest.config.ts`:
```typescript
import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    environment: 'node',
    include: ['lib/booking/__tests__/**/*.test.ts'],
  },
})
```

- [ ] **Step 3: Add test scripts to package.json**

In `package.json`, in the `"scripts"` block, add:
```json
"test": "vitest run",
"test:watch": "vitest"
```

- [ ] **Step 4: Verify setup runs cleanly (no tests yet)**

```bash
npm test
```
Expected: exits with code 0. Output says no test files found or zero tests ran.

- [ ] **Step 5: Commit**

```bash
git add vitest.config.ts package.json
git commit -m "chore: add vitest for lib unit tests"
```

---

## Task 2: Extend TypeScript types

**Files:**
- Modify: `types/index.ts`

- [ ] **Step 1: Add new interfaces and update existing ones**

In `types/index.ts`, add these new types after the existing `BusinessHour` interface:

```typescript
export interface AddOn {
  _key: string
  name: string
  price: number
  duration?: string
}

export type PaymentMethod = 'cash' | 'card' | 'online'

export interface WorkingHour {
  day: 'monday' | 'tuesday' | 'wednesday' | 'thursday' | 'friday' | 'saturday' | 'sunday'
  startTime: string
  endTime: string
  closed?: boolean
}

export interface Branch {
  _id: string
  name: string
  address: string
  phone?: string
  mapUrl?: string
  image?: SanityImage
  workingHours: WorkingHour[]
  displayOrder?: number
}

export interface StaffMember {
  _id: string
  name: string
  slug: { current: string }
  role: string
  expertise: string[]
  bio?: any
  image?: SanityImage
  rating: number
  experienceYears: number
  isActive: boolean
  workingHours: WorkingHour[]
  blockedDates: string[]
  socialLinks?: {
    instagram?: string
    facebook?: string
    tiktok?: string
  }
}
```

- [ ] **Step 2: Update the Service interface**

In `types/index.ts`, find the `Service` interface and add these fields:
```typescript
discountPrice?: number
popularBadge?: boolean
preparationNotes?: string
addOns?: AddOn[]
```

- [ ] **Step 3: Replace the Booking interface**

Find and replace the existing `Booking` interface with:
```typescript
export interface Booking {
  bookingRef?: string
  customerName: string
  customerEmail: string
  customerPhone: string
  customerWhatsApp?: string
  categorySlug?: string
  serviceId: string
  serviceName?: string
  servicePrice?: number
  selectedAddOns: AddOn[]
  staffId?: string
  staffName?: string
  isAnyStaff: boolean
  branchId?: string
  branchName?: string
  isHomeService: boolean
  homeAddress?: string
  area?: string
  bookingDate: string
  timeSlot: string
  notes?: string
  paymentMethod: PaymentMethod
  paymentStatus?: 'pending' | 'paid' | 'refunded'
  status?: 'pending' | 'confirmed' | 'cancelled'
  totalPrice?: number
}
```

- [ ] **Step 4: Verify TypeScript compiles**

```bash
npx tsc --noEmit
```
Expected: 0 errors. If errors appear from other files referencing the old Booking fields (e.g., `serviceId` used for category), note them — they will be fixed in subsequent tasks.

- [ ] **Step 5: Commit**

```bash
git add types/index.ts
git commit -m "feat: extend types — AddOn, Branch, StaffMember, PaymentMethod, enhanced Booking"
```

---

## Task 3: Enhance Sanity service schema

**Files:**
- Modify: `sanity/schemaTypes/service.ts`

- [ ] **Step 1: Add four new fields to the service schema**

In `sanity/schemaTypes/service.ts`, after the `featured` field definition, insert:

```typescript
defineField({
  name: 'discountPrice',
  title: 'Discount Price (AED)',
  type: 'number',
  description: 'If set, the original price shows crossed out and this is displayed as the current price.',
}),
defineField({
  name: 'popularBadge',
  title: 'Show "Popular" Badge',
  type: 'boolean',
  initialValue: false,
}),
defineField({
  name: 'preparationNotes',
  title: 'Preparation Notes',
  type: 'text',
  description: 'What should the customer know before arriving for this service?',
}),
defineField({
  name: 'addOns',
  title: 'Add-ons',
  type: 'array',
  of: [
    {
      type: 'object',
      fields: [
        { name: 'name', title: 'Name', type: 'string' },
        { name: 'price', title: 'Price (AED)', type: 'number' },
        { name: 'duration', title: 'Duration (e.g. 15 min)', type: 'string' },
      ],
    },
  ],
}),
```

- [ ] **Step 2: Update GROQ queries to include new fields**

In `lib/sanity/queries.ts`, update `servicesQuery`, `servicesByCategory`, and `serviceBySlugQuery` to include the new fields:

Replace `servicesQuery` with:
```typescript
export const servicesQuery = `
*[_type == "service"] | order(name asc) {
  _id, name, slug, price, discountPrice, duration, description, image, featured,
  popularBadge, preparationNotes, addOns,
  "category": category->{ _id, name, slug, icon, displayOrder }
}`
```

Replace `servicesByCategory` with:
```typescript
export const servicesByCategory = `
*[_type == "service" && category->slug.current == $categorySlug] | order(name asc) {
  _id, name, slug, price, discountPrice, duration, description, image, featured,
  popularBadge, preparationNotes, addOns,
  "category": category->{ _id, name, slug, icon }
}`
```

Replace `serviceBySlugQuery` with:
```typescript
export const serviceBySlugQuery = `
*[_type == "service" && slug.current == $slug][0] {
  _id, name, slug, price, discountPrice, duration, description, image, gallery,
  popularBadge, preparationNotes, addOns, seoTitle, seoDescription,
  "category": category->{ _id, name, slug, icon }
}`
```

- [ ] **Step 3: Verify TypeScript compiles**

```bash
npx tsc --noEmit
```
Expected: 0 errors.

- [ ] **Step 4: Commit**

```bash
git add sanity/schemaTypes/service.ts lib/sanity/queries.ts
git commit -m "feat(sanity): add discount price, popular badge, add-ons to service schema"
```

---

## Task 4: Enhance Sanity teamMember schema + create branch schema

**Files:**
- Modify: `sanity/schemaTypes/teamMember.ts`
- Create: `sanity/schemaTypes/branch.ts`
- Modify: `sanity/schemaTypes/index.ts`

- [ ] **Step 1: Read teamMember.ts to find insertion point**

```bash
cat sanity/schemaTypes/teamMember.ts
```
Identify the last `defineField(...)` in the fields array — the new fields go after it.

- [ ] **Step 2: Add new fields to teamMember schema**

In `sanity/schemaTypes/teamMember.ts`, after the last existing `defineField`, add:

```typescript
defineField({
  name: 'rating',
  title: 'Rating (0–5)',
  type: 'number',
  initialValue: 5,
  validation: (r) => r.min(0).max(5),
}),
defineField({
  name: 'experienceYears',
  title: 'Years of Experience',
  type: 'number',
  initialValue: 1,
  validation: (r) => r.min(0),
}),
defineField({
  name: 'isActive',
  title: 'Active / Bookable',
  type: 'boolean',
  initialValue: true,
  description: 'Only active staff appear in the booking wizard.',
}),
defineField({
  name: 'workingHours',
  title: 'Working Hours',
  type: 'array',
  of: [
    {
      type: 'object',
      fields: [
        {
          name: 'day',
          title: 'Day',
          type: 'string',
          options: {
            list: [
              { title: 'Monday', value: 'monday' },
              { title: 'Tuesday', value: 'tuesday' },
              { title: 'Wednesday', value: 'wednesday' },
              { title: 'Thursday', value: 'thursday' },
              { title: 'Friday', value: 'friday' },
              { title: 'Saturday', value: 'saturday' },
              { title: 'Sunday', value: 'sunday' },
            ],
            layout: 'dropdown',
          },
        },
        { name: 'startTime', title: 'Start Time (HH:MM, 24-hour)', type: 'string' },
        { name: 'endTime', title: 'End Time (HH:MM, 24-hour)', type: 'string' },
      ],
    },
  ],
}),
defineField({
  name: 'blockedDates',
  title: 'Blocked Dates (Leave / Holiday)',
  type: 'array',
  of: [{ type: 'date' }],
  description: 'Dates when this staff member is unavailable. Format: YYYY-MM-DD.',
}),
```

- [ ] **Step 3: Create branch schema**

Create `sanity/schemaTypes/branch.ts`:

```typescript
import { defineField, defineType } from 'sanity'

export const branchSchema = defineType({
  name: 'branch',
  title: 'Branch',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Branch Name',
      type: 'string',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'address',
      title: 'Address',
      type: 'text',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'phone',
      title: 'Phone Number',
      type: 'string',
    }),
    defineField({
      name: 'mapUrl',
      title: 'Google Maps URL',
      type: 'url',
    }),
    defineField({
      name: 'image',
      title: 'Branch Photo',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'workingHours',
      title: 'Working Hours',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'day',
              title: 'Day',
              type: 'string',
              options: {
                list: [
                  { title: 'Monday', value: 'monday' },
                  { title: 'Tuesday', value: 'tuesday' },
                  { title: 'Wednesday', value: 'wednesday' },
                  { title: 'Thursday', value: 'thursday' },
                  { title: 'Friday', value: 'friday' },
                  { title: 'Saturday', value: 'saturday' },
                  { title: 'Sunday', value: 'sunday' },
                ],
                layout: 'dropdown',
              },
            },
            { name: 'startTime', title: 'Start Time (HH:MM)', type: 'string' },
            { name: 'endTime', title: 'End Time (HH:MM)', type: 'string' },
            { name: 'closed', title: 'Closed This Day', type: 'boolean', initialValue: false },
          ],
        },
      ],
    }),
    defineField({
      name: 'displayOrder',
      title: 'Display Order',
      type: 'number',
      initialValue: 0,
    }),
  ],
})
```

- [ ] **Step 4: Register branch schema**

In `sanity/schemaTypes/index.ts`, add the import and include it in the array:

```typescript
import { branchSchema } from './branch'

export const schemaTypes = [
  categorySchema,
  serviceSchema,
  teamMemberSchema,
  galleryImageSchema,
  reviewSchema,
  homepageContentSchema,
  siteSettingsSchema,
  bookingSchema,
  branchSchema,  // add this line
]
```

- [ ] **Step 5: Commit**

```bash
git add sanity/schemaTypes/teamMember.ts sanity/schemaTypes/branch.ts sanity/schemaTypes/index.ts
git commit -m "feat(sanity): add staff availability fields + branch schema"
```

---

## Task 5: Enhance Sanity booking schema

**Files:**
- Modify: `sanity/schemaTypes/booking.ts`

- [ ] **Step 1: Add new fields to booking schema**

In `sanity/schemaTypes/booking.ts`, after the `createdAt` field, add:

```typescript
defineField({
  name: 'staff',
  title: 'Staff Member',
  type: 'reference',
  to: [{ type: 'teamMember' }],
  description: 'Leave empty if "Any Available Staff" was selected.',
}),
defineField({
  name: 'isAnyStaff',
  title: 'Any Available Staff',
  type: 'boolean',
  initialValue: true,
}),
defineField({
  name: 'branch',
  title: 'Branch',
  type: 'reference',
  to: [{ type: 'branch' }],
}),
defineField({
  name: 'area',
  title: 'Area / District (Home Service)',
  type: 'string',
}),
defineField({
  name: 'addOns',
  title: 'Add-ons',
  type: 'array',
  of: [
    {
      type: 'object',
      fields: [
        { name: 'name', title: 'Name', type: 'string' },
        { name: 'price', title: 'Price (AED)', type: 'number' },
      ],
    },
  ],
}),
defineField({
  name: 'paymentMethod',
  title: 'Payment Method',
  type: 'string',
  options: {
    list: [
      { title: 'Cash', value: 'cash' },
      { title: 'Card on Arrival', value: 'card' },
      { title: 'Online', value: 'online' },
    ],
    layout: 'radio',
  },
  initialValue: 'cash',
}),
defineField({
  name: 'paymentStatus',
  title: 'Payment Status',
  type: 'string',
  options: {
    list: [
      { title: 'Pending', value: 'pending' },
      { title: 'Paid', value: 'paid' },
      { title: 'Refunded', value: 'refunded' },
    ],
    layout: 'radio',
  },
  initialValue: 'pending',
}),
defineField({
  name: 'customerWhatsApp',
  title: 'WhatsApp Number',
  type: 'string',
}),
defineField({
  name: 'totalPrice',
  title: 'Total Price (AED)',
  type: 'number',
}),
```

- [ ] **Step 2: Commit**

```bash
git add sanity/schemaTypes/booking.ts
git commit -m "feat(sanity): enhance booking schema with staff, branch, add-ons, payment fields"
```

---

## Task 6: Create lib/booking/ abstraction layer (TDD)

**Files:**
- Create: `lib/booking/availabilityService.ts`
- Create: `lib/booking/__tests__/availabilityService.test.ts`
- Create: `lib/booking/bookingService.ts`
- Create: `lib/booking/__tests__/bookingService.test.ts`
- Create: `lib/booking/paymentProvider.ts`

### 6a — availabilityService

- [ ] **Step 1: Write the failing test first**

Create `lib/booking/__tests__/availabilityService.test.ts`:

```typescript
import { describe, it, expect } from 'vitest'
import { generateSlots, computeAvailability } from '../availabilityService'

describe('generateSlots', () => {
  it('generates 30-min slots from start to end (exclusive)', () => {
    expect(generateSlots('09:00', '11:00')).toEqual(['09:00', '09:30', '10:00', '10:30'])
  })

  it('returns single slot when only one interval fits', () => {
    expect(generateSlots('09:00', '09:30')).toEqual(['09:00'])
  })

  it('returns empty when start equals end', () => {
    expect(generateSlots('09:00', '09:00')).toEqual([])
  })
})

describe('computeAvailability', () => {
  it('returns all slots available when nothing booked', () => {
    const result = computeAvailability({ date: '2026-06-01', bookedSlots: [] })
    expect(result.every((s) => s.available)).toBe(true)
    expect(result.length).toBeGreaterThan(0)
  })

  it('marks booked slots as unavailable', () => {
    const result = computeAvailability({ date: '2026-06-01', bookedSlots: ['09:00', '09:30'] })
    expect(result.find((s) => s.time === '09:00')?.available).toBe(false)
    expect(result.find((s) => s.time === '09:30')?.available).toBe(false)
    expect(result.find((s) => s.time === '10:00')?.available).toBe(true)
  })

  it('returns empty array when date is in blockedDates', () => {
    const result = computeAvailability({
      date: '2026-06-01',
      bookedSlots: [],
      blockedDates: ['2026-06-01'],
    })
    expect(result).toHaveLength(0)
  })

  it('returns empty array when staff is closed on that day', () => {
    // 2026-06-01 is a Monday
    const result = computeAvailability({
      date: '2026-06-01',
      bookedSlots: [],
      workingHours: [{ day: 'monday', startTime: '09:00', endTime: '17:00', closed: true }],
    })
    expect(result).toHaveLength(0)
  })

  it('uses staff working hours when provided', () => {
    // 2026-06-01 is a Monday
    const result = computeAvailability({
      date: '2026-06-01',
      bookedSlots: [],
      workingHours: [{ day: 'monday', startTime: '10:00', endTime: '12:00' }],
    })
    expect(result.map((s) => s.time)).toEqual(['10:00', '10:30', '11:00', '11:30'])
  })

  it('returns default salon hours (09:00–20:00) when no workingHours provided', () => {
    const result = computeAvailability({ date: '2026-06-01', bookedSlots: [] })
    expect(result[0].time).toBe('09:00')
    expect(result[result.length - 1].time).toBe('19:30')
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

```bash
npm test
```
Expected: FAIL — `Cannot find module '../availabilityService'`

- [ ] **Step 3: Implement availabilityService.ts**

Create `lib/booking/availabilityService.ts`:

```typescript
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
```

- [ ] **Step 4: Run tests to verify they pass**

```bash
npm test
```
Expected: all 6 tests PASS.

### 6b — bookingService

- [ ] **Step 5: Write the failing test for bookingService**

Create `lib/booking/__tests__/bookingService.test.ts`:

```typescript
import { describe, it, expect, vi } from 'vitest'
import { buildBookingDoc } from '../bookingService'
import type { Booking } from '@/types'

const baseBooking: Partial<Booking> = {
  customerName: 'Sara Ahmed',
  customerEmail: 'sara@example.com',
  customerPhone: '+971501234567',
  serviceId: 'svc123',
  serviceName: 'Balayage',
  servicePrice: 450,
  selectedAddOns: [],
  isAnyStaff: true,
  isHomeService: false,
  bookingDate: '2026-06-15',
  timeSlot: '10:00',
  paymentMethod: 'cash',
}

describe('buildBookingDoc', () => {
  it('builds correct doc for in-salon any-staff booking', () => {
    const doc = buildBookingDoc(baseBooking, 'BK-TEST-001')
    expect(doc._type).toBe('booking')
    expect(doc.bookingRef).toBe('BK-TEST-001')
    expect(doc.customerName).toBe('Sara Ahmed')
    expect(doc.service).toEqual({ _type: 'reference', _ref: 'svc123' })
    expect(doc.isAnyStaff).toBe(true)
    expect(doc.staff).toBeUndefined()
    expect(doc.isHomeService).toBe(false)
    expect(doc.homeAddress).toBe('')
    expect(doc.paymentStatus).toBe('pending')
    expect(doc.status).toBe('pending')
  })

  it('includes staff reference when specific staff chosen', () => {
    const doc = buildBookingDoc(
      { ...baseBooking, staffId: 'staff456', staffName: 'Leila', isAnyStaff: false },
      'BK-TEST-002',
    )
    expect(doc.staff).toEqual({ _type: 'reference', _ref: 'staff456' })
    expect(doc.isAnyStaff).toBe(false)
  })

  it('includes branch reference when branch selected', () => {
    const doc = buildBookingDoc({ ...baseBooking, branchId: 'br789' }, 'BK-TEST-003')
    expect(doc.branch).toEqual({ _type: 'reference', _ref: 'br789' })
  })

  it('includes home address and area for home service', () => {
    const doc = buildBookingDoc(
      { ...baseBooking, isHomeService: true, homeAddress: '12 Marina Walk', area: 'Dubai Marina' },
      'BK-TEST-004',
    )
    expect(doc.isHomeService).toBe(true)
    expect(doc.homeAddress).toBe('12 Marina Walk')
    expect(doc.area).toBe('Dubai Marina')
  })

  it('clears homeAddress when not home service', () => {
    const doc = buildBookingDoc({ ...baseBooking, isHomeService: false, homeAddress: 'ignored' }, 'BK-TEST-005')
    expect(doc.homeAddress).toBe('')
  })

  it('includes add-ons when present', () => {
    const addOns = [{ _key: 'k1', name: 'Protein Treatment', price: 80 }]
    const doc = buildBookingDoc({ ...baseBooking, selectedAddOns: addOns }, 'BK-TEST-006')
    expect(doc.addOns).toHaveLength(1)
    expect(doc.addOns[0].name).toBe('Protein Treatment')
  })
})
```

- [ ] **Step 6: Run test to verify it fails**

```bash
npm test
```
Expected: FAIL — `Cannot find module '../bookingService'`

- [ ] **Step 7: Implement bookingService.ts**

Create `lib/booking/bookingService.ts`:

```typescript
import { writeClient } from '@/lib/sanity/client'
import type { Booking } from '@/types'

export interface BookingDoc {
  _type: 'booking'
  bookingRef: string
  customerName: string
  customerEmail: string
  customerPhone: string
  customerWhatsApp: string
  service?: { _type: 'reference'; _ref: string }
  bookingDate: string
  timeSlot: string
  notes: string
  isHomeService: boolean
  homeAddress: string
  area: string
  isAnyStaff: boolean
  staff?: { _type: 'reference'; _ref: string }
  branch?: { _type: 'reference'; _ref: string }
  addOns: Array<{ name: string; price: number }>
  paymentMethod: string
  paymentStatus: 'pending'
  totalPrice: number
  status: 'pending'
  createdAt: string
}

export function buildBookingDoc(booking: Partial<Booking>, bookingRef: string): BookingDoc {
  const doc: BookingDoc = {
    _type: 'booking',
    bookingRef,
    customerName: booking.customerName!,
    customerEmail: booking.customerEmail || '',
    customerPhone: booking.customerPhone!,
    customerWhatsApp: booking.customerWhatsApp || '',
    bookingDate: booking.bookingDate!,
    timeSlot: booking.timeSlot!,
    notes: booking.notes || '',
    isHomeService: booking.isHomeService ?? false,
    homeAddress: booking.isHomeService ? (booking.homeAddress || '') : '',
    area: booking.isHomeService ? (booking.area || '') : '',
    isAnyStaff: booking.isAnyStaff ?? true,
    addOns: (booking.selectedAddOns || []).map(({ name, price }) => ({ name, price })),
    paymentMethod: booking.paymentMethod || 'cash',
    paymentStatus: 'pending',
    totalPrice: booking.totalPrice || 0,
    status: 'pending',
    createdAt: new Date().toISOString(),
  }

  if (booking.serviceId) {
    doc.service = { _type: 'reference', _ref: booking.serviceId }
  }

  if (booking.staffId && !booking.isAnyStaff) {
    doc.staff = { _type: 'reference', _ref: booking.staffId }
  }

  if (booking.branchId) {
    doc.branch = { _type: 'reference', _ref: booking.branchId }
  }

  return doc
}

export interface CreateBookingResult {
  id: string
  bookingRef: string
}

function generateBookingRef(): string {
  return 'BK' + Date.now().toString(36).toUpperCase() + Math.random().toString(36).slice(2, 6).toUpperCase()
}

export async function createBooking(booking: Partial<Booking>): Promise<CreateBookingResult> {
  const bookingRef = booking.bookingRef?.trim() || generateBookingRef()
  const doc = buildBookingDoc(booking, bookingRef)
  const result = await writeClient.create(doc)
  return { id: result._id, bookingRef }
}
```

- [ ] **Step 8: Run all tests to verify they pass**

```bash
npm test
```
Expected: all tests PASS (6 availability + 6 bookingService = 12 total).

### 6c — paymentProvider

- [ ] **Step 9: Create paymentProvider.ts** (no tests needed — pure config data)

Create `lib/booking/paymentProvider.ts`:

```typescript
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
```

- [ ] **Step 10: Commit**

```bash
git add lib/booking/
git commit -m "feat: add booking abstraction layer — availabilityService, bookingService, paymentProvider"
```

---

## Task 7: Add new API routes — staff and branches

**Files:**
- Modify: `lib/sanity/queries.ts`
- Modify: `lib/api/fetchers.ts`
- Create: `app/api/staff/route.ts`
- Create: `app/api/branches/route.ts`

- [ ] **Step 1: Add GROQ queries for staff and branches**

In `lib/sanity/queries.ts`, append:

```typescript
export const staffQuery = `
*[_type == "teamMember" && isActive == true] | order(name asc) {
  _id, name, slug, role, expertise, rating, experienceYears,
  image, workingHours, blockedDates, socialLinks
}`

export const branchesQuery = `
*[_type == "branch"] | order(displayOrder asc) {
  _id, name, address, phone, mapUrl, image, workingHours
}`
```

- [ ] **Step 2: Add fetchers**

In `lib/api/fetchers.ts`, add the import at the top:

```typescript
import {
  // existing imports ...
  staffQuery,
  branchesQuery,
} from '@/lib/sanity/queries'
import type {
  // existing imports ...
  StaffMember,
  Branch,
} from '@/types'
```

Then append these two functions at the bottom of the file:

```typescript
export async function getStaff(): Promise<StaffMember[]> {
  return safeFetch<StaffMember[]>(staffQuery, {}, [])
}

export async function getBranches(): Promise<Branch[]> {
  return safeFetch<Branch[]>(branchesQuery, {}, [])
}
```

- [ ] **Step 3: Create /api/staff route**

Create `app/api/staff/route.ts`:

```typescript
import { NextResponse } from 'next/server'
import { getStaff } from '@/lib/api/fetchers'

export async function GET() {
  try {
    const staff = await getStaff()
    return NextResponse.json({ data: staff, error: null, meta: { count: staff.length } })
  } catch {
    return NextResponse.json({ data: null, error: 'Failed to fetch staff' }, { status: 500 })
  }
}
```

- [ ] **Step 4: Create /api/branches route**

Create `app/api/branches/route.ts`:

```typescript
import { NextResponse } from 'next/server'
import { getBranches } from '@/lib/api/fetchers'

export async function GET() {
  try {
    const branches = await getBranches()
    return NextResponse.json({ data: branches, error: null, meta: { count: branches.length } })
  } catch {
    return NextResponse.json({ data: null, error: 'Failed to fetch branches' }, { status: 500 })
  }
}
```

- [ ] **Step 5: Verify TypeScript**

```bash
npx tsc --noEmit
```
Expected: 0 errors.

- [ ] **Step 6: Commit**

```bash
git add lib/sanity/queries.ts lib/api/fetchers.ts app/api/staff/route.ts app/api/branches/route.ts
git commit -m "feat: add /api/staff and /api/branches routes"
```

---

## Task 8: Add staff availability API route

**Files:**
- Create: `app/api/staff/[id]/availability/route.ts`

- [ ] **Step 1: Create the route**

Create `app/api/staff/[id]/availability/route.ts`:

```typescript
import { NextRequest, NextResponse } from 'next/server'
import { client } from '@/lib/sanity/client'
import { computeAvailability } from '@/lib/booking/availabilityService'

const DATE_REGEX = /^\d{4}-\d{2}-\d{2}$/

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params
  const { searchParams } = new URL(request.url)
  const date = searchParams.get('date')

  if (!date || !DATE_REGEX.test(date)) {
    return NextResponse.json(
      { data: null, error: 'Valid date required (YYYY-MM-DD)' },
      { status: 400 },
    )
  }

  try {
    const [staff, bookings] = await Promise.all([
      client.fetch<{ workingHours: any[]; blockedDates: string[] } | null>(
        `*[_type == "teamMember" && _id == $id][0] { workingHours, blockedDates }`,
        { id },
      ),
      client.fetch<{ timeSlot: string }[]>(
        `*[_type == "booking" && bookingDate == $date && staff._ref == $id && status != "cancelled"] { timeSlot }`,
        { date, id },
      ),
    ])

    if (!staff) {
      return NextResponse.json({ data: null, error: 'Staff member not found' }, { status: 404 })
    }

    const bookedSlots = bookings.map((b) => b.timeSlot)
    const slots = computeAvailability({
      date,
      bookedSlots,
      workingHours: staff.workingHours || [],
      blockedDates: staff.blockedDates || [],
    })

    return NextResponse.json({
      data: { date, slots, bookedSlots },
      error: null,
      meta: { total: slots.length, available: slots.filter((s) => s.available).length },
    })
  } catch {
    return NextResponse.json({ data: null, error: 'Failed to fetch availability' }, { status: 500 })
  }
}
```

- [ ] **Step 2: Verify TypeScript**

```bash
npx tsc --noEmit
```
Expected: 0 errors.

- [ ] **Step 3: Commit**

```bash
git add app/api/staff/
git commit -m "feat: add /api/staff/[id]/availability route"
```

---

## Task 9: Update /api/availability and /api/bookings routes

**Files:**
- Modify: `app/api/availability/route.ts`
- Modify: `app/api/bookings/route.ts`

- [ ] **Step 1: Refactor /api/availability to use availabilityService**

Replace the entire content of `app/api/availability/route.ts` with:

```typescript
import { NextRequest, NextResponse } from 'next/server'
import { client } from '@/lib/sanity/client'
import { computeAvailability } from '@/lib/booking/availabilityService'

const DATE_REGEX = /^\d{4}-\d{2}-\d{2}$/

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const date = searchParams.get('date')

  if (!date) {
    return NextResponse.json({ data: null, error: 'Date parameter required' }, { status: 400 })
  }
  if (!DATE_REGEX.test(date)) {
    return NextResponse.json({ data: null, error: 'Invalid date format. Use YYYY-MM-DD' }, { status: 400 })
  }

  try {
    const bookings = await client.fetch<{ timeSlot: string }[]>(
      `*[_type == "booking" && bookingDate == $date && status != "cancelled"] { timeSlot }`,
      { date },
    )

    const bookedSlots = bookings.map((b) => b.timeSlot)
    const slots = computeAvailability({ date, bookedSlots })

    return NextResponse.json({
      data: { date, slots, bookedSlots },
      error: null,
      meta: { total: slots.length, available: slots.filter((s) => s.available).length, booked: bookedSlots.length },
    })
  } catch {
    return NextResponse.json({ data: null, error: 'Failed to fetch availability' }, { status: 500 })
  }
}
```

- [ ] **Step 2: Update /api/bookings POST to accept new fields**

In `app/api/bookings/route.ts`, find the `POST` handler. Replace the doc-building block (everything from `const doc = {` through the `writeClient.create(doc)` call) with:

```typescript
// Check for slot conflict before writing
const existing = await writeClient.fetch<{ _id: string }[]>(
  `*[_type == "booking" && bookingDate == $date && timeSlot == $timeSlot && status != "cancelled"][0...1] { _id }`,
  { date: body.bookingDate, timeSlot: body.timeSlot },
)
if (existing.length > 0) {
  return NextResponse.json(
    { data: null, error: 'This time slot is no longer available. Please choose another.' },
    { status: 409 },
  )
}

const { createBooking } = await import('@/lib/booking/bookingService')
const result = await createBooking(body)

return NextResponse.json(
  { data: { id: result.id, bookingRef: result.bookingRef, status: 'pending', bookingDate: body.bookingDate, timeSlot: body.timeSlot }, error: null },
  { status: 201 },
)
```

Also update `validateBookingBody` in the same file — remove the line that validates `bookingRef` format (if any), since it's now generated server-side. Keep all other validations intact.

- [ ] **Step 3: Verify TypeScript**

```bash
npx tsc --noEmit
```
Expected: 0 errors.

- [ ] **Step 4: Commit**

```bash
git add app/api/availability/route.ts app/api/bookings/route.ts
git commit -m "refactor: use availabilityService in API routes; accept new booking fields"
```

---

## Task 10: Update Zustand booking store

**Files:**
- Modify: `stores/bookingStore.ts`

- [ ] **Step 1: Replace stores/bookingStore.ts with enhanced 8-step store**

Replace the entire file content with:

```typescript
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

const initialBooking: Partial<Booking> = {
  selectedAddOns: [],
  isAnyStaff: true,
  isHomeService: false,
  paymentMethod: 'cash',
}

export const useBookingStore = create<BookingState>((set) => ({
  step: 1,
  booking: initialBooking,
  setStep: (step) => set({ step }),
  nextStep: () => set((state) => ({ step: Math.min(state.step + 1, 8) })),
  prevStep: () => set((state) => ({ step: Math.max(state.step - 1, 1) })),
  updateBooking: (data) => set((state) => ({ booking: { ...state.booking, ...data } })),
  resetBooking: () => set({ step: 1, booking: initialBooking }),
}))
```

- [ ] **Step 2: Verify TypeScript**

```bash
npx tsc --noEmit
```
Expected: 0 errors.

- [ ] **Step 3: Commit**

```bash
git add stores/bookingStore.ts
git commit -m "feat: extend booking store to 8 steps with new state fields"
```

---

## Task 11: Fix StepCategory + update BookingProgress

**Files:**
- Modify: `components/booking/StepCategory.tsx`
- Modify: `components/booking/BookingProgress.tsx`

- [ ] **Step 1: Fix StepCategory to store categorySlug correctly**

In `components/booking/StepCategory.tsx`, change:
- The `selected` check: `booking.serviceId === cat.id` → `booking.categorySlug === cat.id`
- The `updateBooking` call: `updateBooking({ serviceId: cat.id })` → `updateBooking({ categorySlug: cat.id })`

Full corrected click handler:
```tsx
onClick={() => {
  updateBooking({ categorySlug: cat.id })
  nextStep()
}}
```

Full corrected selected check:
```tsx
const selected = booking.categorySlug === cat.id
```

- [ ] **Step 2: Update BookingProgress to 8 steps**

Replace the entire content of `components/booking/BookingProgress.tsx` with:

```tsx
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
```

- [ ] **Step 3: Verify TypeScript**

```bash
npx tsc --noEmit
```

- [ ] **Step 4: Commit**

```bash
git add components/booking/StepCategory.tsx components/booking/BookingProgress.tsx
git commit -m "fix: store categorySlug in StepCategory; update BookingProgress to 8 steps"
```

---

## Task 12: Enhance StepService with add-ons, discount, popular badge

**Files:**
- Modify: `components/booking/StepService.tsx`

- [ ] **Step 1: Replace StepService with enhanced version**

Replace the entire content of `components/booking/StepService.tsx` with:

```tsx
'use client'
import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Clock, Check, Plus, Minus, Flame } from 'lucide-react'
import { useBookingStore } from '@/stores/bookingStore'
import type { Service, AddOn } from '@/types'

export function StepService() {
  const { booking, updateBooking, nextStep } = useBookingStore()
  const [services, setServices] = useState<Service[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedService, setSelectedService] = useState<Service | null>(null)
  const [chosenAddOns, setChosenAddOns] = useState<AddOn[]>(booking.selectedAddOns || [])

  useEffect(() => {
    const cat = booking.categorySlug
    fetch(`/api/services${cat && cat !== 'home-service' ? `?category=${cat}` : ''}`)
      .then((r) => r.json())
      .then((d) => {
        setServices(d.data || [])
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [booking.categorySlug])

  const toggleAddOn = (addon: AddOn) => {
    setChosenAddOns((prev) =>
      prev.some((a) => a._key === addon._key)
        ? prev.filter((a) => a._key !== addon._key)
        : [...prev, addon],
    )
  }

  const handleContinue = () => {
    if (!selectedService) return
    updateBooking({
      serviceId: selectedService._id,
      serviceName: selectedService.name,
      servicePrice: selectedService.discountPrice ?? selectedService.price,
      selectedAddOns: chosenAddOns,
    })
    nextStep()
  }

  if (loading) {
    return <div className="text-center py-20 font-sans text-muted">Loading services…</div>
  }

  return (
    <div>
      <h2 className="font-playfair text-3xl text-charcoal text-center mb-2">Select a Service</h2>
      <p className="font-sans text-muted text-center mb-10">Choose the treatment you&apos;d like to book</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        {services.map((service, i) => {
          const isSelected = selectedService?._id === service._id
          return (
            <motion.button
              key={service._id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              onClick={() => {
                setSelectedService(isSelected ? null : service)
                setChosenAddOns([])
              }}
              className={`text-left p-5 border-2 transition-all duration-300 hover:-translate-y-0.5 relative ${
                isSelected
                  ? 'border-rose-primary bg-rose-primary/5'
                  : 'border-charcoal/10 hover:border-rose-primary/50'
              }`}
            >
              {service.popularBadge && (
                <span className="absolute top-3 right-3 flex items-center gap-1 bg-gold-accent text-white text-xs font-sans px-2 py-0.5">
                  <Flame className="w-3 h-3" /> Popular
                </span>
              )}
              {isSelected && !service.popularBadge && (
                <Check className="absolute top-4 right-4 w-4 h-4 text-rose-primary" />
              )}
              <h3 className="font-playfair text-charcoal font-medium mb-2 pr-20">{service.name}</h3>
              <div className="flex items-center justify-between text-sm font-sans">
                <span className="flex items-center gap-1.5 text-muted">
                  <Clock className="w-3.5 h-3.5" /> {service.duration || '60 min'}
                </span>
                <span className="flex items-center gap-2">
                  {service.discountPrice ? (
                    <>
                      <span className="line-through text-muted text-xs">AED {service.price}</span>
                      <span className="font-medium text-rose-primary">AED {service.discountPrice}</span>
                    </>
                  ) : (
                    <span className="font-medium text-rose-primary">AED {service.price}</span>
                  )}
                </span>
              </div>
              {service.preparationNotes && isSelected && (
                <p className="mt-3 text-xs font-sans text-muted border-t border-charcoal/10 pt-3">
                  ℹ️ {service.preparationNotes}
                </p>
              )}
            </motion.button>
          )
        })}
      </div>

      {/* Add-ons panel */}
      <AnimatePresence>
        {selectedService && selectedService.addOns && selectedService.addOns.length > 0 && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="mb-8 border border-charcoal/10 p-5 bg-cream-bg"
          >
            <h3 className="font-sans text-xs tracking-widest uppercase text-charcoal mb-4">
              Optional Add-ons
            </h3>
            <div className="space-y-3">
              {selectedService.addOns.map((addon) => {
                const active = chosenAddOns.some((a) => a._key === addon._key)
                return (
                  <button
                    key={addon._key}
                    onClick={() => toggleAddOn(addon)}
                    className={`w-full flex items-center justify-between p-3 border transition-colors ${
                      active ? 'border-rose-primary bg-rose-primary/5' : 'border-charcoal/10 bg-warm-white'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center ${active ? 'bg-rose-primary' : 'bg-charcoal/10'}`}>
                        {active ? <Minus className="w-3 h-3 text-white" /> : <Plus className="w-3 h-3 text-muted" />}
                      </div>
                      <div className="text-left">
                        <p className="font-sans text-sm text-charcoal">{addon.name}</p>
                        {addon.duration && <p className="font-sans text-xs text-muted">{addon.duration}</p>}
                      </div>
                    </div>
                    <span className="font-sans text-sm font-medium text-rose-primary">+AED {addon.price}</span>
                  </button>
                )
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {selectedService && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center">
          <button
            onClick={handleContinue}
            className="px-12 py-4 bg-rose-primary text-white font-sans text-sm tracking-widest uppercase hover:bg-rose-dark transition-colors"
          >
            Continue
          </button>
        </motion.div>
      )}
    </div>
  )
}
```

- [ ] **Step 2: Verify TypeScript**

```bash
npx tsc --noEmit
```
Expected: 0 errors.

- [ ] **Step 3: Commit**

```bash
git add components/booking/StepService.tsx
git commit -m "feat(booking): enhance StepService with add-ons, discount price, popular badge"
```

---

## Task 13: Create StepStaff

**Files:**
- Create: `components/booking/StepStaff.tsx`

- [ ] **Step 1: Create StepStaff.tsx**

Create `components/booking/StepStaff.tsx`:

```tsx
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
```

- [ ] **Step 2: Verify TypeScript**

```bash
npx tsc --noEmit
```

- [ ] **Step 3: Commit**

```bash
git add components/booking/StepStaff.tsx
git commit -m "feat(booking): add StepStaff component with rating, expertise, any-staff option"
```

---

## Task 14: Create StepLocation

**Files:**
- Create: `components/booking/StepLocation.tsx`

- [ ] **Step 1: Create StepLocation.tsx**

Create `components/booking/StepLocation.tsx`:

```tsx
'use client'
import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MapPin, Home, Check } from 'lucide-react'
import { useBookingStore } from '@/stores/bookingStore'
import type { Branch } from '@/types'

const DUBAI_AREAS = [
  'Al Barsha', 'Business Bay', 'Downtown Dubai', 'Dubai Marina',
  'Jumeirah', 'Jumeirah Lake Towers', 'JVC', 'Mirdif', 'Deira',
  'Bur Dubai', 'Al Quoz', 'Silicon Oasis', 'Sports City',
  'Arabian Ranches', 'Motor City', 'Palm Jumeirah', 'Ras Al Khor',
]

const inputClass =
  'w-full px-4 py-3 border border-charcoal/20 font-sans text-sm text-charcoal focus:outline-none focus:border-rose-primary transition-colors bg-transparent'
const labelClass = 'block font-sans text-xs tracking-widest uppercase text-charcoal mb-2'

export function StepLocation() {
  const { booking, updateBooking, nextStep } = useBookingStore()
  const [branches, setBranches] = useState<Branch[]>([])
  const [loading, setLoading] = useState(true)
  const [showHome, setShowHome] = useState(booking.isHomeService ?? false)
  const [errors, setErrors] = useState<Record<string, string>>({})

  useEffect(() => {
    fetch('/api/branches')
      .then((r) => r.json())
      .then((d) => {
        setBranches(d.data || [])
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [])

  const selectBranch = (branch: Branch) => {
    updateBooking({ branchId: branch._id, branchName: branch.name, isHomeService: false, homeAddress: '', area: '' })
    nextStep()
  }

  const handleHomeSubmit = () => {
    const e: Record<string, string> = {}
    if (!booking.homeAddress?.trim()) e.address = 'Address is required'
    if (!booking.area?.trim()) e.area = 'Please select your area'
    setErrors(e)
    if (Object.keys(e).length > 0) return
    updateBooking({ branchId: undefined, branchName: undefined, isHomeService: true })
    nextStep()
  }

  if (loading) {
    return <div className="text-center py-20 font-sans text-muted">Loading locations…</div>
  }

  return (
    <div>
      <h2 className="font-playfair text-3xl text-charcoal text-center mb-2">
        Where Would You Like Your Service?
      </h2>
      <p className="font-sans text-muted text-center mb-10">Visit our salon or book a home service</p>

      {branches.length > 0 && (
        <div className="mb-8">
          <h3 className="font-sans text-xs tracking-widest uppercase text-charcoal mb-4">Our Locations</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {branches.map((branch, i) => {
              const isSelected = booking.branchId === branch._id && !booking.isHomeService
              return (
                <motion.button
                  key={branch._id}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.07 }}
                  onClick={() => selectBranch(branch)}
                  className={`text-left p-5 border-2 transition-all duration-300 hover:-translate-y-0.5 relative ${
                    isSelected
                      ? 'border-rose-primary bg-rose-primary/5'
                      : 'border-charcoal/10 hover:border-rose-primary/50'
                  }`}
                >
                  {isSelected && <Check className="absolute top-4 right-4 w-4 h-4 text-rose-primary" />}
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-rose-primary mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-playfair text-charcoal font-medium mb-1">{branch.name}</p>
                      <p className="font-sans text-xs text-muted">{branch.address}</p>
                      {branch.phone && (
                        <p className="font-sans text-xs text-muted mt-1">{branch.phone}</p>
                      )}
                    </div>
                  </div>
                </motion.button>
              )
            })}
          </div>
        </div>
      )}

      <div className="border border-charcoal/10 p-5">
        <button
          onClick={() => setShowHome((v) => !v)}
          className="flex items-center gap-3 w-full text-left mb-0"
        >
          <div
            className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors flex-shrink-0 ${
              showHome ? 'bg-rose-primary' : 'bg-charcoal/10'
            }`}
          >
            <Home className={`w-5 h-5 ${showHome ? 'text-white' : 'text-muted'}`} />
          </div>
          <div>
            <p className="font-playfair text-charcoal font-medium">Home Service</p>
            <p className="font-sans text-xs text-muted">We come to you (+AED 50 travel fee)</p>
          </div>
        </button>

        <AnimatePresence>
          {showHome && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="overflow-hidden"
            >
              <div className="pt-5 space-y-4">
                <div>
                  <label className={labelClass}>Address *</label>
                  <input
                    className={inputClass}
                    value={booking.homeAddress || ''}
                    onChange={(e) => updateBooking({ homeAddress: e.target.value })}
                    placeholder="Building name, street, floor/unit…"
                  />
                  {errors.address && (
                    <p className="text-rose-primary text-xs mt-1">{errors.address}</p>
                  )}
                </div>
                <div>
                  <label className={labelClass}>Area *</label>
                  <select
                    className={inputClass}
                    value={booking.area || ''}
                    onChange={(e) => updateBooking({ area: e.target.value })}
                  >
                    <option value="">Select area…</option>
                    {DUBAI_AREAS.map((area) => (
                      <option key={area} value={area}>
                        {area}
                      </option>
                    ))}
                  </select>
                  {errors.area && <p className="text-rose-primary text-xs mt-1">{errors.area}</p>}
                </div>
                <button
                  onClick={handleHomeSubmit}
                  className="w-full py-4 bg-rose-primary text-white font-sans text-sm tracking-widest uppercase hover:bg-rose-dark transition-colors"
                >
                  Continue with Home Service
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  )
}
```

- [ ] **Step 2: Verify TypeScript**

```bash
npx tsc --noEmit
```

- [ ] **Step 3: Commit**

```bash
git add components/booking/StepLocation.tsx
git commit -m "feat(booking): add StepLocation — branch selection and home service with area"
```

---

## Task 15: Enhance StepDateTime with staff-aware availability

**Files:**
- Modify: `components/booking/StepDateTime.tsx`

- [ ] **Step 1: Replace StepDateTime with staff-aware version**

Replace the entire content of `components/booking/StepDateTime.tsx` with:

```tsx
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
      updateBooking({ bookingDate: format(selected, 'yyyy-MM-dd'), timeSlot: undefined as any })
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
```

- [ ] **Step 2: Verify TypeScript**

```bash
npx tsc --noEmit
```

- [ ] **Step 3: Commit**

```bash
git add components/booking/StepDateTime.tsx
git commit -m "feat(booking): staff-aware availability in StepDateTime, fix 24-hour slot format"
```

---

## Task 16: Update StepDetails (remove home toggle, add WhatsApp)

**Files:**
- Modify: `components/booking/StepDetails.tsx`

- [ ] **Step 1: Replace StepDetails**

Replace the entire content of `components/booking/StepDetails.tsx` with:

```tsx
'use client'
import { useState } from 'react'
import { useBookingStore } from '@/stores/bookingStore'

const inputClass =
  'w-full px-4 py-3 border border-charcoal/20 font-sans text-sm text-charcoal focus:outline-none focus:border-rose-primary transition-colors bg-transparent'
const labelClass = 'block font-sans text-xs tracking-widest uppercase text-charcoal mb-2'

export function StepDetails() {
  const { booking, updateBooking, nextStep } = useBookingStore()
  const [errors, setErrors] = useState<Record<string, string>>({})

  const validate = () => {
    const e: Record<string, string> = {}
    if (!booking.customerName?.trim()) e.name = 'Name is required'
    if (!booking.customerPhone?.trim()) e.phone = 'Phone number is required'
    if (!booking.customerEmail?.trim()) e.email = 'Email is required'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (validate()) nextStep()
  }

  return (
    <div>
      <h2 className="font-playfair text-3xl text-charcoal text-center mb-2">Your Details</h2>
      <p className="font-sans text-muted text-center mb-10">
        Fill in your contact information to complete the booking
      </p>

      <form onSubmit={handleSubmit} className="max-w-lg mx-auto space-y-5">
        <div>
          <label className={labelClass}>Full Name *</label>
          <input
            className={inputClass}
            value={booking.customerName || ''}
            onChange={(e) => updateBooking({ customerName: e.target.value })}
            placeholder="Your full name"
          />
          {errors.name && <p className="text-rose-primary text-xs mt-1">{errors.name}</p>}
        </div>

        <div>
          <label className={labelClass}>Phone Number *</label>
          <input
            className={inputClass}
            type="tel"
            value={booking.customerPhone || ''}
            onChange={(e) => updateBooking({ customerPhone: e.target.value })}
            placeholder="+971 50 000 0000"
          />
          {errors.phone && <p className="text-rose-primary text-xs mt-1">{errors.phone}</p>}
        </div>

        <div>
          <label className={labelClass}>Email *</label>
          <input
            className={inputClass}
            type="email"
            value={booking.customerEmail || ''}
            onChange={(e) => updateBooking({ customerEmail: e.target.value })}
            placeholder="your@email.com"
          />
          {errors.email && <p className="text-rose-primary text-xs mt-1">{errors.email}</p>}
        </div>

        <div>
          <label className={labelClass}>WhatsApp Number</label>
          <input
            className={inputClass}
            type="tel"
            value={booking.customerWhatsApp || ''}
            onChange={(e) => updateBooking({ customerWhatsApp: e.target.value })}
            placeholder="+971 50 000 0000 (if different from phone)"
          />
        </div>

        <div>
          <label className={labelClass}>Special Requests</label>
          <textarea
            className={`${inputClass} resize-none`}
            rows={3}
            value={booking.notes || ''}
            onChange={(e) => updateBooking({ notes: e.target.value })}
            placeholder="Any special requests or notes…"
          />
        </div>

        <button
          type="submit"
          className="w-full py-4 bg-rose-primary text-white font-sans text-sm tracking-widest uppercase hover:bg-rose-dark transition-colors duration-300"
        >
          Continue to Payment
        </button>
      </form>
    </div>
  )
}
```

- [ ] **Step 2: Verify TypeScript**

```bash
npx tsc --noEmit
```

- [ ] **Step 3: Commit**

```bash
git add components/booking/StepDetails.tsx
git commit -m "feat(booking): update StepDetails — remove home toggle (moved to StepLocation), add WhatsApp field"
```

---

## Task 17: Create StepPayment

**Files:**
- Create: `components/booking/StepPayment.tsx`

- [ ] **Step 1: Create StepPayment.tsx**

Create `components/booking/StepPayment.tsx`:

```tsx
'use client'
import { motion } from 'framer-motion'
import { Banknote, CreditCard, Globe, Check } from 'lucide-react'
import { useBookingStore } from '@/stores/bookingStore'
import { PAYMENT_OPTIONS } from '@/lib/booking/paymentProvider'
import type { PaymentMethod } from '@/types'

const ICON_MAP: Record<string, React.ReactNode> = {
  Banknote: <Banknote className="w-6 h-6" />,
  CreditCard: <CreditCard className="w-6 h-6" />,
  Globe: <Globe className="w-6 h-6" />,
}

const HOME_FEE = 50

export function StepPayment() {
  const { booking, updateBooking, nextStep } = useBookingStore()

  const serviceTotal = booking.servicePrice || 0
  const addOnTotal = (booking.selectedAddOns || []).reduce((s, a) => s + a.price, 0)
  const homeFee = booking.isHomeService ? HOME_FEE : 0
  const grandTotal = serviceTotal + addOnTotal + homeFee

  const select = (method: PaymentMethod) => {
    updateBooking({ paymentMethod: method, totalPrice: grandTotal })
    nextStep()
  }

  return (
    <div>
      <h2 className="font-playfair text-3xl text-charcoal text-center mb-2">Payment Method</h2>
      <p className="font-sans text-muted text-center mb-10">How would you like to pay?</p>

      <div className="max-w-md mx-auto space-y-4 mb-8">
        {PAYMENT_OPTIONS.map((option, i) => {
          const isSelected = booking.paymentMethod === option.id
          return (
            <motion.button
              key={option.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              onClick={() => option.available && select(option.id)}
              disabled={!option.available}
              className={`w-full p-5 border-2 flex items-center gap-4 transition-all duration-300 relative text-left ${
                !option.available
                  ? 'border-charcoal/5 opacity-40 cursor-not-allowed'
                  : isSelected
                  ? 'border-rose-primary bg-rose-primary/5'
                  : 'border-charcoal/10 hover:border-rose-primary/50 hover:-translate-y-0.5'
              }`}
            >
              <div
                className={`w-12 h-12 flex items-center justify-center rounded-full flex-shrink-0 transition-colors ${
                  isSelected ? 'bg-rose-primary text-white' : 'bg-cream-bg text-muted'
                }`}
              >
                {ICON_MAP[option.icon]}
              </div>
              <div className="flex-1">
                <p className="font-playfair text-charcoal font-medium">{option.label}</p>
                <p className="font-sans text-xs text-muted">{option.description}</p>
              </div>
              {!option.available && (
                <span className="font-sans text-xs bg-charcoal/10 text-muted px-2 py-1 rounded">
                  Soon
                </span>
              )}
              {isSelected && option.available && (
                <Check className="w-5 h-5 text-rose-primary flex-shrink-0" />
              )}
            </motion.button>
          )
        })}
      </div>

      {/* Order summary */}
      <div className="max-w-md mx-auto p-6 bg-cream-bg">
        <h3 className="font-sans text-xs tracking-widest uppercase text-charcoal mb-4">
          Order Summary
        </h3>

        {booking.serviceName && (
          <div className="flex justify-between font-sans text-sm mb-2">
            <span className="text-muted">{booking.serviceName}</span>
            <span className="text-charcoal">AED {serviceTotal}</span>
          </div>
        )}

        {(booking.selectedAddOns || []).map((addon) => (
          <div key={addon._key} className="flex justify-between font-sans text-sm mb-2">
            <span className="text-muted">{addon.name}</span>
            <span className="text-charcoal">AED {addon.price}</span>
          </div>
        ))}

        {booking.isHomeService && (
          <div className="flex justify-between font-sans text-sm mb-2">
            <span className="text-muted">Home Service Fee</span>
            <span className="text-charcoal">AED {HOME_FEE}</span>
          </div>
        )}

        <div className="border-t border-charcoal/10 pt-3 mt-3 flex justify-between">
          <span className="font-playfair text-charcoal font-medium">Total</span>
          <span className="font-playfair text-rose-primary font-medium">AED {grandTotal}</span>
        </div>
      </div>
    </div>
  )
}
```

- [ ] **Step 2: Verify TypeScript**

```bash
npx tsc --noEmit
```

- [ ] **Step 3: Commit**

```bash
git add components/booking/StepPayment.tsx
git commit -m "feat(booking): add StepPayment with method selector and order summary"
```

---

## Task 18: Enhance StepConfirmation

**Files:**
- Modify: `components/booking/StepConfirmation.tsx`

- [ ] **Step 1: Replace StepConfirmation with enhanced version**

Replace the entire content of `components/booking/StepConfirmation.tsx` with:

```tsx
'use client'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { Check, Calendar, Clock, User, Phone, MapPin, Scissors, CreditCard } from 'lucide-react'
import { useBookingStore } from '@/stores/bookingStore'

function formatSlotDisplay(time: string): string {
  const [hStr, m] = time.split(':')
  const h = parseInt(hStr, 10)
  return `${h % 12 || 12}:${m} ${h < 12 ? 'AM' : 'PM'}`
}

const PAYMENT_LABELS: Record<string, string> = {
  cash: 'Cash at Salon',
  card: 'Card on Arrival',
  online: 'Online',
}

interface SummaryRowProps {
  icon: React.ReactNode
  label: string
  value: string
}
function SummaryRow({ icon, label, value }: SummaryRowProps) {
  return (
    <div className="flex justify-between items-start py-2.5 border-b border-charcoal/[0.07]">
      <span className="font-sans text-xs tracking-widest uppercase text-muted flex items-center gap-1.5 flex-shrink-0">
        {icon} {label}
      </span>
      <span className="font-sans text-charcoal text-sm text-right max-w-[55%]">{value}</span>
    </div>
  )
}

export function StepConfirmation() {
  const { booking, resetBooking } = useBookingStore()
  const [submitted, setSubmitted] = useState(false)
  const [loading, setLoading] = useState(false)
  const [bookingRef, setBookingRef] = useState('')
  const [error, setError] = useState('')

  const handleConfirm = async () => {
    setLoading(true)
    setError('')
    try {
      const res = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(booking),
      })
      const data = await res.json()
      if (!res.ok) {
        setError(data.error || 'Booking failed. Please try again.')
        setLoading(false)
        return
      }
      setBookingRef(data.data.bookingRef)
      setSubmitted(true)
    } catch {
      setError('Network error. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  if (submitted) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="text-center py-12"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
          className="w-20 h-20 rounded-full bg-rose-primary flex items-center justify-center mx-auto mb-6"
        >
          <Check className="w-10 h-10 text-white" />
        </motion.div>
        <h2 className="font-playfair text-4xl text-charcoal mb-3">Booking Confirmed!</h2>
        <p className="font-sans text-muted mb-6">
          We&apos;ll contact you shortly to confirm your appointment.
        </p>
        <div className="inline-block bg-cream-bg px-8 py-5 mb-8">
          <p className="font-sans text-xs tracking-widest text-muted uppercase mb-1">
            Booking Reference
          </p>
          <p className="font-playfair text-2xl text-rose-primary font-medium">{bookingRef}</p>
        </div>
        <br />
        <button
          onClick={resetBooking}
          className="px-8 py-3.5 border border-charcoal/20 font-sans text-sm tracking-widest uppercase text-charcoal hover:bg-charcoal hover:text-white transition-colors"
        >
          Book Another Service
        </button>
      </motion.div>
    )
  }

  const locationLabel = booking.isHomeService
    ? `Home Service — ${booking.area || ''}, ${booking.homeAddress || ''}`
    : booking.branchName || '—'

  return (
    <div className="max-w-lg mx-auto">
      <h2 className="font-playfair text-3xl text-charcoal text-center mb-2">
        Confirm Your Booking
      </h2>
      <p className="font-sans text-muted text-center mb-10">
        Please review your appointment details before confirming
      </p>

      <div className="bg-cream-bg p-8 mb-6">
        {booking.serviceName && (
          <SummaryRow
            icon={<Scissors className="w-3.5 h-3.5" />}
            label="Service"
            value={booking.serviceName}
          />
        )}
        {booking.staffName && (
          <SummaryRow
            icon={<User className="w-3.5 h-3.5" />}
            label="Stylist"
            value={booking.staffName}
          />
        )}
        {booking.isAnyStaff && !booking.staffName && (
          <SummaryRow
            icon={<User className="w-3.5 h-3.5" />}
            label="Stylist"
            value="Any Available"
          />
        )}
        {(booking.selectedAddOns || []).length > 0 && (
          <SummaryRow
            icon={<Check className="w-3.5 h-3.5" />}
            label="Add-ons"
            value={(booking.selectedAddOns || []).map((a) => a.name).join(', ')}
          />
        )}
        {booking.bookingDate && (
          <SummaryRow
            icon={<Calendar className="w-3.5 h-3.5" />}
            label="Date"
            value={booking.bookingDate}
          />
        )}
        {booking.timeSlot && (
          <SummaryRow
            icon={<Clock className="w-3.5 h-3.5" />}
            label="Time"
            value={formatSlotDisplay(booking.timeSlot)}
          />
        )}
        <SummaryRow
          icon={<MapPin className="w-3.5 h-3.5" />}
          label="Location"
          value={locationLabel}
        />
        {booking.customerName && (
          <SummaryRow
            icon={<User className="w-3.5 h-3.5" />}
            label="Name"
            value={booking.customerName}
          />
        )}
        {booking.customerPhone && (
          <SummaryRow
            icon={<Phone className="w-3.5 h-3.5" />}
            label="Phone"
            value={booking.customerPhone}
          />
        )}
        {booking.paymentMethod && (
          <SummaryRow
            icon={<CreditCard className="w-3.5 h-3.5" />}
            label="Payment"
            value={PAYMENT_LABELS[booking.paymentMethod] || booking.paymentMethod}
          />
        )}
        {booking.totalPrice !== undefined && (
          <div className="flex justify-between items-center pt-4 mt-2">
            <span className="font-playfair text-charcoal font-medium">Total</span>
            <span className="font-playfair text-rose-primary font-medium text-lg">
              AED {booking.totalPrice}
            </span>
          </div>
        )}
      </div>

      {error && (
        <p className="text-rose-primary font-sans text-sm text-center mb-4">{error}</p>
      )}

      <button
        onClick={handleConfirm}
        disabled={loading}
        className="w-full py-4 bg-rose-primary text-white font-sans text-sm tracking-widest uppercase hover:bg-rose-dark transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
      >
        {loading ? 'Processing…' : 'Confirm Booking'}
      </button>
    </div>
  )
}
```

- [ ] **Step 2: Verify TypeScript**

```bash
npx tsc --noEmit
```

- [ ] **Step 3: Commit**

```bash
git add components/booking/StepConfirmation.tsx
git commit -m "feat(booking): enhance StepConfirmation with staff, location, add-ons, payment, total"
```

---

## Task 19: Update booking/page.tsx to wire 8 steps

**Files:**
- Modify: `app/(site)/booking/page.tsx`

- [ ] **Step 1: Replace booking page with 8-step version**

Replace the entire content of `app/(site)/booking/page.tsx` with:

```tsx
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
```

- [ ] **Step 2: Run full TypeScript check**

```bash
npx tsc --noEmit
```
Expected: 0 errors.

- [ ] **Step 3: Run all unit tests**

```bash
npm test
```
Expected: all 12 tests PASS.

- [ ] **Step 4: Commit**

```bash
git add app/(site)/booking/page.tsx
git commit -m "feat(booking): wire 8-step wizard — StepCategory/Service/Staff/Location/DateTime/Details/Payment/Confirmation"
```

---

## Self-Review Checklist

- [x] **Spec coverage:**
  - Category → Service → Staff → Location → DateTime → Payment → Confirmation: all 8 steps implemented
  - Staff selection (specific or any): StepStaff ✓
  - Branch / home service: StepLocation ✓
  - Add-ons with price: StepService ✓
  - Discount price + popular badge: StepService ✓
  - Staff-aware availability: StepDateTime + /api/staff/[id]/availability ✓
  - Payment abstraction (cash/card, Stripe-ready slot): paymentProvider + StepPayment ✓
  - Booking ID + confirmation summary: StepConfirmation ✓
  - WhatsApp field: StepDetails ✓
  - Total price calculation: StepPayment (computed) + stored in booking ✓
  - Sanity schemas extended: service, teamMember, booking, new branch ✓
  - API routes: /api/staff, /api/branches, /api/staff/[id]/availability, updated availability + bookings ✓
  - Abstraction layer: availabilityService + bookingService + paymentProvider ✓
  - Unit tests: 12 tests covering availability and booking doc construction ✓

- [x] **Placeholder scan:** No TBD, TODO, or incomplete steps found.

- [x] **Type consistency:**
  - `Booking.selectedAddOns: AddOn[]` — used consistently across store, StepService, StepPayment, StepConfirmation
  - `Booking.categorySlug` — StepCategory stores it, StepService reads it
  - `Booking.timeSlot` — stored as HH:MM (24-hour) throughout; display conversion via `formatSlotDisplay` in StepDateTime and StepConfirmation
  - `PaymentMethod` — defined in types/index.ts, used in paymentProvider and StepPayment
  - `createBooking()` in bookingService — called from StepConfirmation via `/api/bookings` POST, not directly
  - `buildBookingDoc()` in bookingService — exported and tested; `createBooking()` calls it internally

- [x] **Scope:** Single feature, all tasks produce working testable increments.
