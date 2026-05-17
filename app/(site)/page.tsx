import { HeroSection } from '@/components/sections/HeroSection'
import { FeaturedServicesSection } from '@/components/sections/FeaturedServicesSection'
import { CategoriesSection } from '@/components/sections/CategoriesSection'
import { AboutTeaserSection } from '@/components/sections/AboutTeaserSection'
import { TestimonialsSection } from '@/components/sections/TestimonialsSection'
import { GalleryPreviewSection } from '@/components/sections/GalleryPreviewSection'
import { ReviewsSummarySection } from '@/components/sections/ReviewsSummarySection'
import { BookingCTASection } from '@/components/sections/BookingCTASection'
import { getFeaturedServices, getReviews, getReviewSummary, getGallery, getHomepageContent } from '@/lib/api/fetchers'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Home',
  description: 'Lumière — Premium beauty salon in Dubai Marina. Luxury hair, nails, makeup, spa & home services.',
}

export const revalidate = 3600

export default async function HomePage() {
  const [featuredServices, featuredReviews, reviewSummary, galleryImages, homepageContent] = await Promise.all([
    getFeaturedServices(),
    getReviews({ featured: true }),
    getReviewSummary(),
    getGallery(),
    getHomepageContent(),
  ])

  return (
    <>
      <HeroSection heroImage={homepageContent?.heroImage ?? null} />
      <FeaturedServicesSection services={featuredServices} />
      <CategoriesSection />
      <AboutTeaserSection image={homepageContent?.aboutTeaserImage ?? null} />
      <TestimonialsSection reviews={featuredReviews} />
      <GalleryPreviewSection images={galleryImages} />
      <ReviewsSummarySection reviews={featuredReviews} summary={reviewSummary} />
      <BookingCTASection />
    </>
  )
}
