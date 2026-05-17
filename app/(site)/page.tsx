import { HeroSection } from '@/components/sections/HeroSection'
import { FeaturedServicesSection } from '@/components/sections/FeaturedServicesSection'
import { CategoriesSection } from '@/components/sections/CategoriesSection'
import { AboutTeaserSection } from '@/components/sections/AboutTeaserSection'
import { TestimonialsSection } from '@/components/sections/TestimonialsSection'
import { GalleryPreviewSection } from '@/components/sections/GalleryPreviewSection'
import { ReviewsSummarySection } from '@/components/sections/ReviewsSummarySection'
import { BookingCTASection } from '@/components/sections/BookingCTASection'
import { getFeaturedServices, getReviews, getReviewSummary, getHomepageContent } from '@/lib/api/fetchers'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Home',
  description: 'Lumière — Premium beauty salon in Dubai Marina. Luxury hair, nails, makeup, spa & home services.',
}

export const revalidate = 3600

export default async function HomePage() {
  const [featuredServices, featuredReviews, reviewSummary, homepageContent] = await Promise.all([
    getFeaturedServices(),
    getReviews({ featured: true }),
    getReviewSummary(),
    getHomepageContent(),
  ])

  return (
    <>
      <HeroSection heroImage={homepageContent?.heroImage ?? null} />
      <FeaturedServicesSection services={featuredServices} />
      <CategoriesSection />
      <AboutTeaserSection image={homepageContent?.aboutTeaserImage ?? null} />
      <TestimonialsSection reviews={featuredReviews} />
      <GalleryPreviewSection
        workImage1={homepageContent?.workImage1}
        workImage2={homepageContent?.workImage2}
        workImage3={homepageContent?.workImage3}
        workImage4={homepageContent?.workImage4}
      />
      <ReviewsSummarySection reviews={featuredReviews} summary={reviewSummary} />
      <BookingCTASection />
    </>
  )
}
