import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { Clock, ChevronRight, Star, Sparkles, Shield, Award, ArrowRight, MessageCircle, Plus } from 'lucide-react'
import { PortableText } from '@portabletext/react'
import { FadeIn } from '@/components/animations/FadeIn'
import { Badge } from '@/components/ui/Badge'
import { getServiceBySlug, getServices } from '@/lib/api/fetchers'
import { urlFor } from '@/lib/sanity/image'

export const revalidate = 3600

export async function generateStaticParams() {
  const services = await getServices()
  return services.filter((s) => s.slug?.current).map((s) => ({ slug: s.slug.current }))
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

const expectations = [
  { Icon: Award,    title: 'Premium Products',      desc: 'We use only internationally certified, luxury-grade products curated for your skin and hair type.' },
  { Icon: Sparkles, title: 'Expert Hands',           desc: 'Every service is performed by certified specialists with years of hands-on experience.' },
  { Icon: Shield,   title: 'Personalised Care',      desc: 'A dedicated consultation before every treatment ensures results tailored specifically to you.' },
]

export default async function ServiceDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const service = await getServiceBySlug(slug)
  if (!service) notFound()

  const imageUrl = service.image?.asset ? urlFor(service.image).width(900).height(1100).url() : null
  const hasDiscount = service.discountPrice && service.discountPrice < service.price

  return (
    <>
      {/* ── Hero ────────────────────────────────────────── */}
      <section className="relative pt-32 pb-16 md:pt-40 md:pb-20 bg-charcoal overflow-hidden">
        <div className="absolute -top-40 -left-40 w-150 h-150 rounded-full bg-rose-primary/6 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-125 h-125 rounded-full bg-gold-accent/5 blur-3xl pointer-events-none" />
        <div className="absolute inset-0 pointer-events-none flex">
          {[1,2,3].map(i => <div key={i} className="flex-1 border-r border-warm-white/3" />)}
        </div>

        <div className="container-luxury relative">
          <div className="grid lg:grid-cols-2 gap-14 xl:gap-20 items-center">

            {/* Left: content */}
            <FadeIn direction="left">
              {/* Breadcrumb */}
              <nav className="flex items-center gap-2 text-muted-light text-xs font-sans tracking-wide mb-6">
                <Link href="/" className="hover:text-warm-white transition-colors">Home</Link>
                <ChevronRight className="w-3 h-3" />
                <Link href="/services" className="hover:text-warm-white transition-colors">Services</Link>
                <ChevronRight className="w-3 h-3" />
                <span className="text-warm-white">{service.name}</span>
              </nav>

              {service.category && <Badge variant="gold" className="mb-4">{service.category.name}</Badge>}

              <h1 className="font-playfair text-4xl md:text-5xl lg:text-6xl font-medium text-warm-white leading-tight mb-4">
                {service.name}
              </h1>

              <div className="divider-gold w-16 mb-6 opacity-70" />

              {/* Stars */}
              <div className="flex items-center gap-2.5 mb-6">
                <div className="flex">
                  {[1,2,3,4,5].map(s => <Star key={s} className="w-4 h-4 fill-gold-accent text-gold-accent" />)}
                </div>
                <span className="font-sans text-sm text-muted-light">4.9 · Highly rated by clients</span>
              </div>

              <p className="font-sans text-muted-light leading-relaxed text-lg mb-8 max-w-lg">
                Experience the luxury of our {service.name} treatment, crafted with premium products and expert hands for an exceptional, personalised result.
              </p>

              {/* Price + Duration */}
              <div className="flex items-center gap-8 mb-8 pb-8 border-b border-warm-white/10">
                <div>
                  <p className="font-sans text-[10px] tracking-widest uppercase text-muted-light mb-1">Price from</p>
                  <div className="flex items-baseline gap-2">
                    {hasDiscount && (
                      <span className="font-sans text-muted-light line-through text-sm">AED {service.price}</span>
                    )}
                    <span className="font-playfair text-3xl font-medium text-warm-white">
                      AED {hasDiscount ? service.discountPrice : service.price}
                    </span>
                  </div>
                </div>
                {service.duration && (
                  <div>
                    <p className="font-sans text-[10px] tracking-widest uppercase text-muted-light mb-1">Duration</p>
                    <div className="flex items-center gap-1.5 text-warm-white">
                      <Clock className="w-4 h-4 text-gold-accent" />
                      <span className="font-playfair text-xl">{service.duration}</span>
                    </div>
                  </div>
                )}
              </div>

              {/* CTAs */}
              <div className="flex flex-col sm:flex-row gap-3">
                <Link href={`/booking?service=${service._id}`}
                  className="inline-flex items-center justify-center gap-2 px-10 py-4 bg-rose-primary text-white font-sans text-sm tracking-widest uppercase hover:bg-rose-dark transition-all duration-300 hover:-translate-y-0.5 shadow-luxury">
                  Book Appointment <ArrowRight className="w-4 h-4" />
                </Link>
                <a href="https://wa.me/971501234567" target="_blank" rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 border border-warm-white/20 text-warm-white font-sans text-sm tracking-widest uppercase hover:border-warm-white/50 hover:bg-warm-white/5 transition-all duration-300">
                  <MessageCircle className="w-4 h-4" /> WhatsApp
                </a>
              </div>
            </FadeIn>

            {/* Right: image with animated gold frame */}
            <FadeIn direction="right" delay={0.2}>
              <div className="relative max-w-md mx-auto lg:mx-0 lg:ml-auto">
                {/* Outer glow */}
                <div className="absolute -inset-3 bg-linear-to-br from-gold-accent/15 via-transparent to-rose-primary/10 blur-xl pointer-events-none" />

                <div className="relative aspect-portrait overflow-hidden">
                  {/* Image */}
                  {imageUrl ? (
                    <Image src={imageUrl} alt={service.name} fill unoptimized priority
                      className="object-cover object-center" />
                  ) : (
                    <div className="absolute inset-0 bg-linear-to-br from-[#7B4A5A] to-rose-primary flex items-center justify-center">
                      <span className="font-playfair text-8xl text-white/10 select-none">
                        {service.name.charAt(0)}
                      </span>
                    </div>
                  )}

                  {/* Gradient overlay */}
                  <div className="absolute inset-0 bg-linear-to-t from-charcoal/60 via-transparent to-transparent" />

                  {/* Popular badge */}
                  {service.popularBadge && (
                    <div className="absolute top-5 right-5 bg-rose-primary text-white font-sans text-[9px] tracking-widest uppercase px-3 py-1.5">
                      Most Popular
                    </div>
                  )}

                  {/* Animated gold corner frame */}
                  <div className="gold-frame-tl absolute top-4 left-4 w-10 h-10 border-t-2 border-l-2 border-gold-accent pointer-events-none" />
                  <div className="gold-frame-tr absolute top-4 right-4 w-10 h-10 border-t-2 border-r-2 border-gold-accent pointer-events-none" />
                  <div className="gold-frame-bl absolute bottom-4 left-4 w-10 h-10 border-b-2 border-l-2 border-gold-accent pointer-events-none" />
                  <div className="gold-frame-br absolute bottom-4 right-4 w-10 h-10 border-b-2 border-r-2 border-gold-accent pointer-events-none" />
                  {/* Pulsing inner border */}
                  <div className="gold-frame-pulse absolute inset-4 border border-gold-accent/25 animate-pulse pointer-events-none" />
                </div>

                {/* Price badge floating */}
                <div className="absolute -bottom-5 -left-5 bg-rose-primary text-white p-5 shadow-luxury">
                  <p className="font-playfair text-2xl font-medium">AED {hasDiscount ? service.discountPrice : service.price}</p>
                  <p className="font-sans text-[9px] tracking-widest uppercase text-white/80 mt-0.5">Starting from</p>
                </div>
              </div>
            </FadeIn>

          </div>
        </div>
      </section>

      {/* ── About This Service ──────────────────────────── */}
      <section className="py-16 md:py-24 bg-cream-bg">
        <div className="container-luxury max-w-4xl">
          <FadeIn>
            <h2 className="font-playfair text-3xl text-charcoal font-medium mb-4">About This Service</h2>
            <div className="divider-gold w-12 mb-8" />
            {service.description ? (
              <div className="prose prose-lg max-w-none font-sans text-muted [&_p]:mb-4 [&_h3]:font-playfair [&_h3]:text-charcoal [&_strong]:text-charcoal">
                <PortableText value={service.description} />
              </div>
            ) : (
              <p className="font-sans text-muted leading-relaxed text-lg">
                Our {service.name} is a signature Lumière experience — combining industry-leading techniques with premium products to deliver transformative, lasting results. Every session begins with a personal consultation to understand your unique needs.
              </p>
            )}
          </FadeIn>

          {/* Prep notes */}
          {service.preparationNotes && (
            <FadeIn delay={0.1}>
              <div className="mt-10 border-l-2 border-gold-accent pl-6 py-2">
                <h4 className="font-playfair text-lg text-charcoal mb-2">Preparation Tips</h4>
                <p className="font-sans text-sm text-muted leading-relaxed">{service.preparationNotes}</p>
              </div>
            </FadeIn>
          )}

          {/* Add-ons */}
          {service.addOns && service.addOns.length > 0 && (
            <FadeIn delay={0.15}>
              <div className="mt-14">
                <h3 className="font-playfair text-2xl text-charcoal mb-4">Available Add-ons</h3>
                <div className="divider-gold w-10 mb-6" />
                <div className="space-y-3">
                  {service.addOns.map((addon: any) => (
                    <div key={addon._key} className="group flex items-center justify-between p-5 border border-charcoal/8 hover:border-rose-primary/30 hover:-translate-y-0.5 transition-all duration-300">
                      <div className="flex items-center gap-3">
                        <Plus className="w-4 h-4 text-rose-primary shrink-0" />
                        <div>
                          <p className="font-playfair text-charcoal group-hover:text-rose-primary transition-colors duration-200">{addon.name}</p>
                          {addon.duration && <p className="font-sans text-xs text-muted mt-0.5">{addon.duration}</p>}
                        </div>
                      </div>
                      <span className="font-playfair text-lg text-rose-primary font-medium shrink-0">AED {addon.price}</span>
                    </div>
                  ))}
                </div>
              </div>
            </FadeIn>
          )}

          {/* Gallery */}
          {service.gallery && service.gallery.length > 0 && (
            <FadeIn delay={0.2}>
              <div className="mt-14">
                <h3 className="font-playfair text-2xl text-charcoal mb-4">Gallery</h3>
                <div className="divider-gold w-10 mb-6" />
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {service.gallery.map((img: any, i: number) => {
                    const gUrl = img?.asset ? urlFor(img).width(400).height(400).url() : null
                    return gUrl ? (
                      <div key={i} className="relative aspect-square overflow-hidden group">
                        <Image src={gUrl} alt={`Gallery ${i + 1}`} fill unoptimized
                          className="object-cover group-hover:scale-105 transition-transform duration-500" />
                        <div className="absolute inset-0 bg-charcoal/0 group-hover:bg-charcoal/20 transition-colors duration-300" />
                      </div>
                    ) : null
                  })}
                </div>
              </div>
            </FadeIn>
          )}
        </div>
      </section>

      {/* ── What to Expect ──────────────────────────────── */}
      <section className="py-20 bg-charcoal">
        <div className="container-luxury">
          <FadeIn>
            <div className="text-center mb-14">
              <p className="font-cormorant italic text-rose-light text-xl tracking-widest mb-3">The Lumière Standard</p>
              <h2 className="font-playfair text-4xl text-warm-white font-medium mb-4">What to Expect</h2>
              <div className="divider-gold w-16 mx-auto opacity-60" />
            </div>
          </FadeIn>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-0 border border-warm-white/8">
            {expectations.map((item, i) => {
              const fills = ['bg-rose-primary', 'bg-gold-accent', 'bg-rose-dark']
              const { Icon, title, desc } = item
              return (
                <FadeIn key={title} delay={i * 0.1} className="h-full">
                  <div className="group relative overflow-hidden border-r border-warm-white/8 cursor-default h-full">
                    <div className={`absolute inset-0 ${fills[i]} translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out`} />
                    <div className="relative p-10 flex flex-col items-center text-center h-full">
                      <div className="w-16 h-16 rounded-full border border-warm-white/15 group-hover:border-warm-white/30 group-hover:bg-warm-white/10 flex items-center justify-center mb-6 shrink-0 transition-all duration-300">
                        <Icon className="w-7 h-7 text-gold-accent group-hover:text-warm-white transition-colors duration-300" />
                      </div>
                      <h3 className="font-playfair text-xl text-warm-white mb-3">{title}</h3>
                      <div className="h-px w-10 bg-warm-white/15 group-hover:bg-warm-white/40 mb-4 transition-colors duration-300" />
                      <p className="font-sans text-sm text-muted-light group-hover:text-warm-white/80 leading-relaxed transition-colors duration-300 flex-1">{desc}</p>
                      <div className="mt-8 w-10 h-px bg-warm-white/12 group-hover:bg-warm-white/40 transition-colors duration-300" />
                    </div>
                  </div>
                </FadeIn>
              )
            })}
          </div>
        </div>
      </section>

      {/* ── CTA strip ───────────────────────────────────── */}
      <section className="py-16 bg-rose-primary relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none flex">
          {[1,2,3].map(i => <div key={i} className="flex-1 border-r border-white/8" />)}
        </div>
        <div className="container-luxury relative flex flex-col md:flex-row items-center justify-between gap-6">
          <FadeIn>
            <p className="font-cormorant italic text-warm-white/80 text-xl tracking-widest mb-1">Ready to experience it?</p>
            <h3 className="font-playfair text-3xl text-warm-white font-medium">{service.name}</h3>
          </FadeIn>
          <FadeIn delay={0.1}>
            <div className="flex gap-3 shrink-0">
              <Link href={`/booking?service=${service._id}`}
                className="inline-flex items-center gap-2 px-10 py-4 bg-charcoal text-warm-white font-sans text-sm tracking-widest uppercase hover:bg-rose-dark transition-all duration-300 hover:-translate-y-0.5">
                Book Now <ArrowRight className="w-4 h-4" />
              </Link>
              <Link href="/services"
                className="inline-flex items-center gap-2 px-8 py-4 border border-warm-white/40 text-warm-white font-sans text-sm tracking-widest uppercase hover:bg-warm-white/10 transition-all duration-300">
                All Services
              </Link>
            </div>
          </FadeIn>
        </div>
      </section>
    </>
  )
}
