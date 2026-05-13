# Luxury Beauty Salon Platform — Design Spec
**Date:** 2026-05-13  
**Stack:** Next.js 15 (App Router) · Tailwind CSS · Framer Motion · Sanity CMS v3 · Vercel

---

## 1. Architecture

### Approach: Monorepo — Embedded Sanity Studio

```
stest/
├── app/                          # Next.js App Router
│   ├── (site)/                   # Public-facing routes
│   │   ├── page.tsx              # Home
│   │   ├── about/page.tsx
│   │   ├── services/
│   │   │   ├── page.tsx          # Services listing
│   │   │   └── [slug]/page.tsx   # Service detail
│   │   ├── booking/page.tsx
│   │   ├── team/page.tsx
│   │   ├── gallery/page.tsx
│   │   ├── contact/page.tsx
│   │   └── reviews/page.tsx
│   ├── studio/[[...tool]]/       # Sanity Studio (embedded)
│   │   └── page.tsx
│   ├── api/                      # API routes (mobile-ready)
│   │   ├── services/
│   │   │   ├── route.ts          # GET /api/services
│   │   │   └── [slug]/route.ts   # GET /api/services/:slug
│   │   ├── categories/route.ts
│   │   ├── team/route.ts
│   │   ├── gallery/route.ts
│   │   ├── reviews/route.ts
│   │   ├── bookings/route.ts     # POST /api/bookings
│   │   └── availability/route.ts
│   └── layout.tsx                # Root layout + page transitions
├── components/
│   ├── ui/                       # Primitives (Button, Card, Badge, StarRating)
│   ├── layout/                   # Navbar, Footer, PageWrapper
│   ├── sections/                 # Page sections (Hero, Services, Testimonials…)
│   ├── booking/                  # Booking wizard steps
│   └── animations/               # Framer Motion wrappers (FadeIn, SlideUp, etc.)
├── lib/
│   ├── sanity/
│   │   ├── client.ts             # Sanity client config
│   │   ├── queries.ts            # GROQ queries
│   │   └── image.ts              # Image URL builder
│   └── api/                      # Shared data-fetching helpers (used by pages + API routes)
├── sanity/
│   ├── schemaTypes/              # All CMS schemas
│   └── sanity.config.ts
├── types/                        # Shared TypeScript types (used by web + future mobile)
├── hooks/                        # Custom React hooks
├── stores/                       # Zustand store (booking state)
├── public/                       # Static assets, placeholder images
└── tailwind.config.ts
```

**Key principle:** `types/` and `lib/api/` are framework-agnostic — React Native imports them directly.

---

## 2. Design System

### Color Palette
| Token | Value | Use |
|-------|-------|-----|
| `rose-primary` | `#C9687A` | CTAs, active states, highlights |
| `rose-light` | `#F2A7B8` | Gradients, backgrounds |
| `gold-accent` | `#C9A84C` | Premium details, borders, icons |
| `cream-bg` | `#FAF7F4` | Page background |
| `warm-white` | `#FFFCF9` | Cards, modals |
| `charcoal` | `#1C1C2E` | Headings, navbar |
| `muted` | `#6B6B7B` | Body text, captions |

### Typography
- **Display/Headings:** Playfair Display (Google Fonts) — serif, editorial weight
- **Body:** DM Sans — clean, modern, readable
- **Taglines/Accent:** Cormorant Garamond — ultra-thin, luxury feel

### Animation Primitives (Framer Motion)
- `FadeIn` — opacity 0→1, y: 20→0, 0.6s ease
- `SlideUp` — y: 40→0, staggered children
- `ScaleIn` — scale 0.95→1, for cards on scroll
- `PageTransition` — opacity fade between routes
- `HoverLift` — y: -4px + shadow on card hover
- Scroll-triggered: `whileInView` with `once: true`

---

## 3. Pages

### 3.1 Home Page
**Sections (top to bottom):**
1. **Hero** — full-screen, background video or high-res image, animated headline (Playfair Display, staggered word reveal), two CTAs: "Book Appointment" + "Explore Services". Subtle parallax on scroll.
2. **Featured Services** — horizontal scroll cards (6 services, filtered `featured: true` from Sanity)
3. **About Teaser** — split layout, image left + text right, animated on scroll
4. **Beauty Categories** — icon grid (Hair / Nails / Makeup / Spa / Home Service)
5. **Testimonials Carousel** — auto-rotating, shows star rating + name + service used
6. **Gallery Preview** — 6-image masonry grid, "View All" link
7. **Reviews Section** — average star rating badge + 3 featured review cards
8. **Book CTA Banner** — full-width gradient, single CTA

### 3.2 About Page
- Hero with salon name + tagline
- Salon story (rich text from Sanity)
- Mission/Vision split cards
- Team grid (links to /team)
- Values section (icons + short text)

### 3.3 Services Page
- Page hero
- Category filter tabs (All / Hair / Nails / Makeup / Spa / Home Service)
- Filterable service grid — cards show: image, name, category badge, duration, price, "Book" CTA
- Framer Motion `AnimatePresence` for filter transitions

### 3.4 Service Detail Page `/services/[slug]`
- Large hero image
- Name, category, duration, price
- Full description (Portable Text from Sanity)
- Photo gallery (lightbox)
- "Book This Service" sticky CTA button
- Related services section

### 3.5 Booking Page (Multi-Step Wizard)
5 steps, progress indicator at top:
1. **Select Category** — icon cards
2. **Select Service** — filtered cards from step 1
3. **Select Date & Time** — calendar date picker + available time slot grid
4. **Your Details** — name, phone, email, notes, home service toggle (address field)
5. **Confirmation** — summary card + "Confirm Booking" button → success state with animation

State: Zustand store. On submit: `POST /api/bookings` (stores in Sanity or forwards to future backend).

### 3.6 Team Page
- Grid of stylist cards: photo, name, role, expertise tags, short bio
- Hover reveals social links
- Data from Sanity `teamMember` documents

### 3.7 Gallery Page
- Category filter (All / Hair / Nails / Makeup / Spa)
- Masonry grid layout (CSS columns + JS for equal distribution)
- Smooth filter animation via Framer Motion `AnimatePresence`
- Click → fullscreen lightbox with prev/next navigation

### 3.8 Contact Page
- Split: left = form (name, email, phone, message, service interest), right = info panel
- WhatsApp CTA button (floating + in panel)
- Embedded Google Maps iframe
- Business hours table
- Social media links

### 3.9 Reviews Page
- Average rating hero (large star display + total review count)
- Filter by service category
- Review card grid: avatar/initials, name, stars, date, service used, comment, verified badge
- "Write a Review" CTA (disabled for now, ready for auth phase)

---

## 4. Sanity CMS Schemas

### `service`
```
name, slug, price (number), duration (string), description (PortableText),
image (image), category (reference → category), featured (boolean),
gallery (array of images), seoTitle, seoDescription
```

### `teamMember`
```
name, slug, role, expertise (array of strings), bio (PortableText),
image (image), socialLinks { instagram, facebook, tiktok }
```

### `galleryImage`
```
image, alt, category (reference → category), featured (boolean), caption
```

### `review`
```
customerName, rating (1–5), comment (text), serviceUsed (reference → service),
customerImage (image, optional), featured (boolean), verified (boolean),
publishedAt (datetime)
```

### `testimonial`
```
Alias for `review` with `featured: true` — no separate schema needed.
```

### `homepageContent` (singleton)
```
heroHeadline, heroSubheadline, heroImage, heroVideoUrl (optional),
ctaText, ctaLink, featuredServicesTitle, aboutTeaserText, aboutTeaserImage
```

### `category`
```
name, slug, icon (string — lucide icon name), description, displayOrder (number)
```

### `siteSettings` (singleton)
```
salonName, tagline, address, phone, email, whatsappNumber, googleMapsUrl,
businessHours (array: { day, openTime, closeTime, closed }),
socialLinks { instagram, facebook, tiktok, youtube }
```

### `booking`
```
bookingRef (auto string), customerName, customerEmail, customerPhone,
service (reference → service), bookingDate (date), timeSlot (string),
notes (text), isHomeService (boolean), homeAddress (text, optional),
status (pending | confirmed | cancelled), createdAt (datetime)
```

---

## 5. API Routes (Mobile-Ready)

All routes return JSON. Future React Native app hits these directly.

| Method | Route | Response |
|--------|-------|----------|
| GET | `/api/services` | Array of services (with category populated) |
| GET | `/api/services?category=hair` | Filtered by category slug |
| GET | `/api/services/[slug]` | Single service with gallery |
| GET | `/api/categories` | All categories with service counts |
| GET | `/api/team` | All team members |
| GET | `/api/gallery` | All gallery images (paginated, `?page=1&limit=20`) |
| GET | `/api/reviews` | Reviews (`?service=slug`, `?limit=10`, `?featured=true`) |
| GET | `/api/reviews/summary` | `{ averageRating, totalCount, distribution: {1:n, 2:n…} }` |
| GET | `/api/availability?date=YYYY-MM-DD` | Available time slots for date |
| POST | `/api/bookings` | Create booking (stored in Sanity `booking` doc) |
| GET | `/api/site-settings` | Salon info, hours, social links |

All routes: consistent envelope `{ data, error, meta }`.

---

## 6. Review & Rating System

### Architecture
- Reviews stored as Sanity documents (`review` schema)
- Sanity Studio: admin manually verifies + publishes reviews
- Frontend: fetches published reviews via GROQ
- `reviews/summary` API endpoint pre-computes aggregate stats

### Components
- `<StarRating rating={4.5} size="sm|md|lg" readonly />` — renders fractional stars
- `<ReviewCard review={...} />` — avatar, name, stars, date, service badge, comment, verified badge
- `<RatingSummary />` — large average display + distribution bars
- `<TestimonialsCarousel />` — homepage autoplay carousel (Embla Carousel — no SSR issues)
- `<ReviewsGrid />` — filterable masonry grid

### Future Phase (Auth)
- `/api/reviews` POST with auth middleware
- Customer login → can only review services they booked
- "Verified Customer" badge auto-assigned
- Mobile app submits reviews via same endpoint

---

## 7. Navigation

### Navbar
- Sticky, `backdrop-blur-sm` + subtle border on scroll (transparent when at top)
- Logo left, nav links center, "Book Now" CTA button right
- Mobile: hamburger → full-screen overlay menu with staggered link animations
- Links: Home / Services / Team / Gallery / Reviews / Contact / Book Now

### Footer
- 4 columns: Logo+tagline | Quick Links | Services | Contact+Hours
- Social icons row
- WhatsApp floating button (fixed, bottom-right)

---

## 8. Performance & SEO

- `next/image` for all images (Sanity CDN → srcset)
- Dynamic imports for heavy components (lightbox, map, Sanity Studio)
- `generateMetadata()` per page using Sanity SEO fields
- `robots.ts` + `sitemap.ts` auto-generated
- Incremental Static Regeneration: `revalidate: 3600` on content pages
- `/studio` excluded from sitemap + crawlers
- Open Graph images via `/api/og` (dynamic with `@vercel/og`)

---

## 9. Booking System Architecture

### Current Phase (Frontend-Only)
- Zustand store holds booking state across wizard steps
- On submit: `POST /api/bookings` saves to Sanity `booking` collection
- Time slots: hardcoded business hours grid (9am–7pm, 30-min slots)
- "Booked" slots: fetched from Sanity bookings for selected date

### Future Phase (Full Backend)
- Replace Sanity booking storage with dedicated DB (Supabase/Postgres)
- Real-time availability via WebSocket or polling
- SMS/email confirmation via Resend or Twilio
- Mobile app uses same `/api/bookings` endpoint

---

## 10. Deployment (Vercel)

### Environment Variables
```
NEXT_PUBLIC_SANITY_PROJECT_ID=
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=          # write token for booking creation
NEXT_PUBLIC_SITE_URL=
```

### Build Config
- `next.config.ts`: Sanity image domains in `remotePatterns`
- `vercel.json`: none needed — zero-config for Next.js

### Sanity Setup Steps
1. `npx sanity init` → select existing project or create new
2. `npm run dev` → Studio at `localhost:3000/studio`
3. Deploy → Studio at `yourdomain.com/studio` (protected by Sanity auth)

---

## 11. Future Mobile App Integration Strategy

### Data Layer (Shared)
- `types/` directory contains all TypeScript interfaces — copy to React Native project
- All content via REST API routes (not Sanity client directly)
- Booking flow mirrors web wizard steps

### Auth Strategy
- Implement Clerk or NextAuth in web phase 2
- Same JWT tokens valid for mobile API calls
- Customer profile syncs across web + app

### Push Notifications
- Booking confirmation: send via OneSignal or Expo Notifications
- `/api/bookings` POST triggers notification job

### Feature Parity
- Services browse + filter ✓
- Appointment booking ✓
- Review submission (phase 2) ✓
- Loyalty points (phase 3)
- Home service GPS tracking (phase 3)
