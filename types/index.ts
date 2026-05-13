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
}

export interface BusinessHour {
  day: string
  openTime: string
  closeTime: string
  closed: boolean
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
  serviceId: string
  serviceName?: string
  bookingDate: string
  timeSlot: string
  notes?: string
  isHomeService: boolean
  homeAddress?: string
  status?: 'pending' | 'confirmed' | 'cancelled'
}

export interface TimeSlot {
  time: string
  available: boolean
}
