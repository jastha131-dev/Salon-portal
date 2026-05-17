export interface Category {
  _id: string
  name: string
  slug: { current: string }
  icon: string
  description?: string
  displayOrder: number
}

export interface Service {
  _id: string
  name: string
  slug: { current: string }
  price: number
  duration: string
  description: any // PortableText
  image: SanityImage
  category: Category
  featured: boolean
  gallery?: SanityImage[]
  seoTitle?: string
  seoDescription?: string
  discountPrice?: number
  popularBadge?: boolean
  preparationNotes?: string
  addOns?: AddOn[]
}

export interface TeamMember {
  _id: string
  name: string
  slug: { current: string }
  role: string
  expertise: string[]
  bio: any // PortableText
  image: SanityImage
  socialLinks?: {
    instagram?: string
    facebook?: string
    tiktok?: string
  }
}

export interface GalleryImage {
  _id: string
  image: SanityImage
  alt: string
  category?: Category
  featured: boolean
  caption?: string
}

export interface Review {
  _id: string
  customerName: string
  rating: number
  comment: string
  serviceUsed?: Service
  customerImage?: SanityImage
  featured: boolean
  verified: boolean
  publishedAt: string
}

export interface PlanFeature {
  text: string
  included: boolean
}

export interface Plan {
  _id: string
  name: string
  slug: { current: string }
  tagline?: string
  monthlyPrice: number
  yearlyPrice?: number
  highlight?: string
  badge?: string
  popular: boolean
  color?: 'rose' | 'gold' | 'charcoal'
  features: PlanFeature[]
  ctaText?: string
  ctaLink?: string
  order: number
}

export interface ReviewSummary {
  averageRating: number
  totalCount: number
  distribution: Record<number, number>
}

export interface HomepageContent {
  heroHeadline: string
  heroSubheadline: string
  heroImage: SanityImage
  heroVideoUrl?: string
  ctaText: string
  ctaLink: string
  featuredServicesTitle?: string
  aboutTeaserText: any // PortableText
  aboutTeaserImage: SanityImage
}

export interface SiteSettings {
  salonName: string
  tagline: string
  address: string
  phone: string
  email: string
  whatsappNumber: string
  googleMapsUrl?: string
  businessHours: BusinessHour[]
  socialLinks: {
    instagram?: string
    facebook?: string
    tiktok?: string
    youtube?: string
  }
  servicesHeroImage?: SanityImage
  aboutHeroImage?: SanityImage
  contactHeroImage?: SanityImage
}

export interface BusinessHour {
  day: string
  openTime: string
  closeTime: string
  closed: boolean
}

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

export interface SanityImage {
  _type: 'image'
  asset: {
    _ref: string
    _type: 'reference'
  }
  alt?: string
  hotspot?: {
    x: number
    y: number
    height: number
    width: number
  }
}

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

export interface TimeSlot {
  time: string
  available: boolean
}
