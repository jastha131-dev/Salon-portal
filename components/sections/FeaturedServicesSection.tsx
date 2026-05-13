'use client'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { Clock, ArrowRight } from 'lucide-react'
import { SectionHeader } from '@/components/ui/SectionHeader'
import { Badge } from '@/components/ui/Badge'
import type { Service } from '@/types'

interface FeaturedServicesSectionProps {
  services: Service[]
}

export function FeaturedServicesSection({ services }: FeaturedServicesSectionProps) {
  return (
    <section className="py-20 md:py-28 bg-cream-bg">
      <div className="container-luxury">
        <SectionHeader
          eyebrow="What We Offer"
          title="Our Signature Services"
          subtitle="Indulge in our carefully curated treatments, each designed to deliver exceptional results and a luxurious experience."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {services.slice(0, 6).map((service, i) => (
            <motion.div
              key={service._id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              whileHover={{ y: -6 }}
              className="group bg-warm-white overflow-hidden cursor-pointer"
            >
              <Link href={`/services/${service.slug?.current}`}>
                <div className="relative h-56 bg-gradient-to-br from-rose-light/20 to-gold-light/20 flex items-center justify-center overflow-hidden">
                  <div className="w-16 h-16 rounded-full bg-rose-primary/10 flex items-center justify-center">
                    <span className="font-playfair text-2xl text-rose-primary">{service.name[0]}</span>
                  </div>
                  <div className="absolute inset-0 bg-charcoal/0 group-hover:bg-charcoal/20 transition-colors duration-300" />
                  {service.featured && (
                    <span className="absolute top-4 left-4 px-3 py-1 bg-gold-accent text-white text-xs font-sans tracking-widest uppercase">
                      Featured
                    </span>
                  )}
                </div>
                <div className="p-6">
                  {service.category && (
                    <Badge variant="rose" className="mb-3">
                      {service.category.name}
                    </Badge>
                  )}
                  <h3 className="font-playfair text-xl text-charcoal mb-2 group-hover:text-rose-primary transition-colors">
                    {service.name}
                  </h3>
                  <div className="flex items-center justify-between text-sm font-sans">
                    <span className="flex items-center gap-1.5 text-muted">
                      <Clock className="w-3.5 h-3.5" />
                      {service.duration || '60 min'}
                    </span>
                    <span className="font-medium text-charcoal">AED {service.price}</span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        <div className="text-center">
          <Link
            href="/services"
            className="inline-flex items-center gap-2 font-sans text-sm tracking-widest uppercase text-rose-primary border border-rose-primary px-8 py-3.5 hover:bg-rose-primary hover:text-white transition-all duration-300"
          >
            View All Services <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  )
}
