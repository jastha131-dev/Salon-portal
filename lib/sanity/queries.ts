export const servicesQuery = `
*[_type == "service"] | order(name asc) {
  _id, name, slug, price, duration, description, image, featured,
  "category": category->{ _id, name, slug, icon, displayOrder }
}`

export const featuredServicesQuery = `
*[_type == "service" && featured == true][0...6] | order(name asc) {
  _id, name, slug, price, duration, image,
  "category": category->{ _id, name, slug, icon }
}`

export const servicesByCategory = `
*[_type == "service" && category->slug.current == $categorySlug] | order(name asc) {
  _id, name, slug, price, duration, description, image, featured,
  "category": category->{ _id, name, slug, icon }
}`

export const serviceBySlugQuery = `
*[_type == "service" && slug.current == $slug][0] {
  _id, name, slug, price, duration, description, image, gallery, seoTitle, seoDescription,
  "category": category->{ _id, name, slug, icon }
}`

export const categoriesQuery = `
*[_type == "category"] | order(displayOrder asc) {
  _id, name, slug, icon, description, displayOrder
}`

export const teamQuery = `
*[_type == "teamMember"] | order(name asc) {
  _id, name, slug, role, expertise, bio, image, socialLinks
}`

export const galleryQuery = `
*[_type == "galleryImage"] | order(_createdAt desc) {
  _id, image, alt, caption, featured,
  "category": category->{ _id, name, slug }
}`

export const reviewsQuery = `
*[_type == "review"] | order(publishedAt desc) {
  _id, customerName, rating, comment, customerImage, featured, verified, publishedAt,
  "serviceUsed": serviceUsed->{ _id, name, slug }
}`

export const featuredReviewsQuery = `
*[_type == "review" && featured == true][0...6] | order(publishedAt desc) {
  _id, customerName, rating, comment, customerImage, verified, publishedAt,
  "serviceUsed": serviceUsed->{ _id, name, slug }
}`

export const homepageContentQuery = `
*[_type == "homepageContent"][0] {
  heroHeadline, heroSubheadline, heroImage, heroVideoUrl,
  ctaText, ctaLink, featuredServicesTitle, aboutTeaserText, aboutTeaserImage
}`

export const siteSettingsQuery = `
*[_type == "siteSettings"][0] {
  salonName, tagline, address, phone, email, whatsappNumber,
  googleMapsUrl, businessHours, socialLinks
}`
