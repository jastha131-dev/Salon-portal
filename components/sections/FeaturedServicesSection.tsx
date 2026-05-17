'use client'
import Link from 'next/link'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowRight, Clock } from 'lucide-react'
import { SectionHeader } from '@/components/ui/SectionHeader'
import Image from 'next/image'
import { urlFor } from '@/lib/sanity/image'
import type { Service } from '@/types'
import { useRef } from 'react'

const gradients = [
  'from-[#7B4A5A] to-[#C9687A]',
  'from-[#3A4A6B] to-[#5A7AC9]',
  'from-[#4A6B5A] to-[#6AC988]',
  'from-[#6B5A3A] to-[#C9A85A]',
  'from-[#5A3A6B] to-[#A85AC9]',
  'from-[#3A6B5A] to-[#5AC9A8]',
]

function ServiceCard({ service, index }: { service: Service; index: number }) {
  const imageUrl = service.image?.asset
    ? urlFor(service.image).width(500).height(680).url()
    : null

  return (
    <Link href={`/services/${service.slug?.current}`}>
      <motion.div
        whileHover={{ y: -8, scale: 1.03 }}
        transition={{ type: 'spring', stiffness: 300, damping: 22 }}
        className="relative w-64 h-80 rounded-2xl overflow-hidden shrink-0 cursor-pointer group"
      >
        {/* Background */}
        {imageUrl ? (
          <Image src={imageUrl} alt={service.name || ''} fill unoptimized className="object-cover" />
        ) : (
          <div className={`absolute inset-0 bg-linear-to-br ${gradients[index % gradients.length]}`} />
        )}

        {/* Overlay */}
        <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent" />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300" />

        {/* Featured badge */}
        {service.featured && (
          <span className="absolute top-4 right-4 px-2.5 py-1 bg-gold-accent/90 backdrop-blur-sm text-white text-[9px] font-sans tracking-widest uppercase rounded-full">
            Featured
          </span>
        )}

        {/* Content */}
        <div className="absolute bottom-0 left-0 right-0 p-5">
          <p className="font-sans text-warm-white/60 text-[10px] tracking-widest uppercase mb-1">
            {service.category?.name || 'Service'}
          </p>
          <h3 className="font-playfair italic text-warm-white text-xl leading-tight mb-3">
            {service.name}
          </h3>
          <div className="flex items-center justify-between">
            <span className="font-sans text-warm-white/80 text-sm">
              AED {service.price}
            </span>
            {service.duration && (
              <span className="flex items-center gap-1 font-sans text-warm-white/50 text-xs">
                <Clock className="w-3 h-3" />
                {service.duration}
              </span>
            )}
          </div>

          {/* Hover reveal */}
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            whileHover={{ opacity: 1, y: 0 }}
            className="mt-3 pt-3 border-t border-white/15 opacity-0 group-hover:opacity-100 transition-all duration-300"
          >
            <span className="inline-flex items-center gap-1.5 font-sans text-[11px] tracking-widest uppercase text-rose-light">
              Book Now <ArrowRight className="w-3 h-3" />
            </span>
          </motion.div>
        </div>
      </motion.div>
    </Link>
  )
}

export function FeaturedServicesSection({ services }: { services: Service[] }) {
  const list = services.slice(0, 6)
  const doubled = [...list, ...list]

  const sectionRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start end', 'end start'] })
  const x = useTransform(scrollYProgress, [0, 1], ['0%', '-8%'])

  return (
    <section ref={sectionRef} className="py-20 md:py-28 bg-cream-bg overflow-hidden">
      <div className="container-luxury">
        <SectionHeader
          eyebrow="What We Offer"
          title="Our Signature Services"
          subtitle="Indulge in our carefully curated treatments, each designed to deliver exceptional results."
        />
      </div>

      <div className="mt-14 overflow-hidden">
        <motion.div style={{ x }} className="flex gap-5 w-max animate-marquee hover:[animation-play-state:paused] py-4 px-2">
          {doubled.map((service, i) => (
            <ServiceCard key={`${service._id}-${i}`} service={service} index={i} />
          ))}
        </motion.div>
      </div>

      <div className="text-center mt-14">
        <Link
          href="/services"
          className="inline-flex items-center gap-2 font-sans text-sm tracking-widest uppercase text-rose-primary border border-rose-primary px-8 py-3.5 hover:bg-rose-primary hover:text-white transition-all duration-300"
        >
          View All Services <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </section>
  )
}
