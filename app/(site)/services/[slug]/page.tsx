import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Clock, ChevronRight, Star } from 'lucide-react'
import { PortableText } from '@portabletext/react'
import { PageHero } from '@/components/layout/PageHero'
import { FadeIn } from '@/components/animations/FadeIn'
import { Badge } from '@/components/ui/Badge'
import { getServiceBySlug, getServices } from '@/lib/api/fetchers'
import { urlFor } from '@/lib/sanity/image'

export const revalidate = 3600

export async function generateStaticParams() {
  const services = await getServices()
  return services.map((s) => ({ slug: s.slug?.current }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const service = await getServiceBySlug(slug)
  if (!service) return {}
  return {
    title: service.seoTitle || service.name,
    description: service.seoDescription || `Book ${service.name} at Lumière Beauty Salon Dubai.`,
  }
}

export default async function ServiceDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const service = await getServiceBySlug(slug)
  if (!service) notFound()

  const heroImageUrl = service.image?.asset
    ? urlFor(service.image).width(1400).height(600).url()
    : null

  return (
    <>
      {/* Hero */}
      <section className="relative h-[50vh] min-h-[400px] flex items-end bg-charcoal overflow-hidden">
        {heroImageUrl && (
          <Image src={heroImageUrl} alt={service.name} fill className="object-cover opacity-60" priority />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal via-charcoal/40 to-transparent" />
        <div className="relative z-10 container-luxury pb-12">
          <FadeIn>
            <nav className="flex items-center gap-2 text-muted-light text-xs font-sans tracking-wide mb-4">
              <Link href="/" className="hover:text-warm-white transition-colors">Home</Link>
              <ChevronRight className="w-3 h-3" />
              <Link href="/services" className="hover:text-warm-white transition-colors">Services</Link>
              <ChevronRight className="w-3 h-3" />
              <span className="text-warm-white">{service.name}</span>
            </nav>
            {service.category && <Badge variant="gold" className="mb-3">{service.category.name}</Badge>}
            <h1 className="font-playfair text-4xl md:text-5xl lg:text-6xl font-medium text-warm-white mb-4">
              {service.name}
            </h1>
            <div className="flex items-center gap-6 text-warm-white/80 font-sans text-sm">
              {service.duration && (
                <span className="flex items-center gap-1.5"><Clock className="w-4 h-4" />{service.duration}</span>
              )}
              <span className="text-warm-white font-medium text-xl font-playfair">AED {service.price}</span>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 md:py-24 bg-cream-bg">
        <div className="container-luxury">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Description */}
            <div className="lg:col-span-2">
              <FadeIn>
                <h2 className="font-playfair text-2xl text-charcoal mb-5">About This Service</h2>
                <div className="divider-gold w-12 mb-6" />
                {service.description ? (
                  <div className="prose prose-lg max-w-none font-sans text-muted [&_p]:mb-4 [&_h3]:font-playfair [&_h3]:text-charcoal [&_strong]:text-charcoal">
                    <PortableText value={service.description} />
                  </div>
                ) : (
                  <p className="font-sans text-muted leading-relaxed text-lg">
                    Experience the luxury of our {service.name} treatment, crafted with premium products and expert hands. Our skilled therapists ensure an exceptional, personalised experience from start to finish.
                  </p>
                )}
              </FadeIn>

              {/* Gallery */}
              {service.gallery && service.gallery.length > 0 && (
                <FadeIn delay={0.2} className="mt-12">
                  <h3 className="font-playfair text-2xl text-charcoal mb-5">Gallery</h3>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {service.gallery.map((img: any, i: number) => {
                      const imgUrl = img?.asset ? urlFor(img).width(400).height(400).url() : null
                      return imgUrl ? (
                        <div key={i} className="relative h-40 overflow-hidden group">
                          <Image src={imgUrl} alt={`Gallery ${i + 1}`} fill className="object-cover group-hover:scale-105 transition-transform duration-500" />
                        </div>
                      ) : null
                    })}
                  </div>
                </FadeIn>
              )}
            </div>

            {/* Sidebar */}
            <div>
              <FadeIn delay={0.15}>
                <div className="bg-warm-white p-8 sticky top-28">
                  <h3 className="font-playfair text-xl text-charcoal mb-5">Book This Service</h3>
                  <div className="space-y-3 mb-6 pb-6 border-b border-charcoal/8">
                    <div className="flex justify-between text-sm font-sans">
                      <span className="text-muted">Service</span>
                      <span className="text-charcoal font-medium">{service.name}</span>
                    </div>
                    {service.duration && (
                      <div className="flex justify-between text-sm font-sans">
                        <span className="text-muted">Duration</span>
                        <span className="text-charcoal">{service.duration}</span>
                      </div>
                    )}
                    <div className="flex justify-between text-sm font-sans">
                      <span className="text-muted">Price from</span>
                      <span className="text-rose-primary font-medium text-base">AED {service.price}</span>
                    </div>
                  </div>
                  <Link
                    href={`/booking?service=${service._id}`}
                    className="block w-full text-center py-4 bg-rose-primary text-white font-sans text-sm tracking-widest uppercase hover:bg-rose-dark transition-colors duration-300 mb-3"
                  >
                    Book Appointment
                  </Link>
                  <a
                    href="https://wa.me/971501234567"
                    target="_blank" rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 w-full py-3.5 border border-charcoal/20 text-charcoal font-sans text-xs tracking-widest uppercase hover:bg-charcoal hover:text-white transition-colors duration-300"
                  >
                    WhatsApp Enquiry
                  </a>

                  {/* Rating */}
                  <div className="mt-6 pt-6 border-t border-charcoal/8 flex items-center gap-2">
                    <div className="flex">
                      {[1,2,3,4,5].map(s => <Star key={s} className="w-4 h-4 fill-gold-accent text-gold-accent" />)}
                    </div>
                    <span className="font-sans text-xs text-muted">Highly rated by clients</span>
                  </div>
                </div>
              </FadeIn>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
