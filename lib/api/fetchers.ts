import { client } from '@/lib/sanity/client'
import {
  servicesQuery,
  featuredServicesQuery,
  serviceBySlugQuery,
  servicesByCategory,
  categoriesQuery,
  teamQuery,
  galleryQuery,
  reviewsQuery,
  featuredReviewsQuery,
  homepageContentQuery,
  siteSettingsQuery,
} from '@/lib/sanity/queries'
import type {
  Service,
  Category,
  TeamMember,
  GalleryImage,
  Review,
  HomepageContent,
  SiteSettings,
  ReviewSummary,
} from '@/types'

async function safeFetch<T>(query: string, params?: Record<string, unknown>, fallback?: T): Promise<T> {
  try {
    return await client.fetch(query, params)
  } catch {
    return (fallback ?? (Array.isArray(fallback) ? [] : null)) as T
  }
}

export async function getServices(categorySlug?: string): Promise<Service[]> {
  if (categorySlug && categorySlug !== 'all') {
    return safeFetch<Service[]>(servicesByCategory, { categorySlug }, [])
  }
  return safeFetch<Service[]>(servicesQuery, {}, [])
}

export async function getFeaturedServices(): Promise<Service[]> {
  return safeFetch<Service[]>(featuredServicesQuery, {}, [])
}

export async function getServiceBySlug(slug: string): Promise<Service | null> {
  return safeFetch<Service | null>(serviceBySlugQuery, { slug }, null)
}

export async function getCategories(): Promise<Category[]> {
  return safeFetch<Category[]>(categoriesQuery, {}, [])
}

export async function getTeam(): Promise<TeamMember[]> {
  return safeFetch<TeamMember[]>(teamQuery, {}, [])
}

export async function getGallery(): Promise<GalleryImage[]> {
  return safeFetch<GalleryImage[]>(galleryQuery, {}, [])
}

export async function getReviews(options?: { featured?: boolean; limit?: number }): Promise<Review[]> {
  if (options?.featured) {
    return safeFetch<Review[]>(featuredReviewsQuery, {}, [])
  }
  return safeFetch<Review[]>(reviewsQuery, {}, [])
}

export async function getReviewSummary(): Promise<ReviewSummary> {
  const reviews = await getReviews()
  const totalCount = reviews.length

  if (totalCount === 0) {
    return { averageRating: 0, totalCount: 0, distribution: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 } }
  }

  const sum = reviews.reduce((acc, r) => acc + r.rating, 0)
  const distribution: Record<number, number> = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 }
  reviews.forEach((r) => { distribution[r.rating] = (distribution[r.rating] || 0) + 1 })

  return {
    averageRating: Math.round((sum / totalCount) * 10) / 10,
    totalCount,
    distribution,
  }
}

export async function getHomepageContent(): Promise<HomepageContent | null> {
  return safeFetch<HomepageContent | null>(homepageContentQuery, {}, null)
}

export async function getSiteSettings(): Promise<SiteSettings | null> {
  return safeFetch<SiteSettings | null>(siteSettingsQuery, {}, null)
}
