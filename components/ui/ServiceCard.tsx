'use client'
import Image from 'next/image'
import Link from 'next/link'
import { Clock, ChevronRight } from 'lucide-react'
import { motion } from 'framer-motion'
import { Badge } from './Badge'
import { urlFor } from '@/lib/sanity/image'
import type { Service } from '@/types'

interface ServiceCardProps {
  service: Service
  showBookButton?: boolean
}

export function ServiceCard({
  service,
  showBookButton = true,
}: ServiceCardProps) {
  const imageUrl =
    service.image?.asset
      ? urlFor(service.image).width(600).height(400).url()
      : '/placeholder-service.jpg'

  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ duration: 0.3, ease: 'easeOut' }}
      className="group bg-[#FFFCF9] overflow-hidden shadow-[0_2px_16px_rgba(28,28,46,0.08)] hover:shadow-[0_8px_32px_rgba(28,28,46,0.16)] transition-shadow duration-300"
    >
      {/* Image */}
      <Link href={`/services/${service.slug?.current}`} className="block">
        <div className="relative h-52 overflow-hidden">
          <Image
            src={imageUrl}
            alt={service.image?.alt || service.name || ''}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1C1C2E]/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>
      </Link>

      {/* Content */}
      <div className="p-5">
        {service.category && (
          <Badge variant="rose" className="mb-3">
            {service.category.name}
          </Badge>
        )}

        <Link href={`/services/${service.slug?.current}`}>
          <h3
            className="text-xl text-[#1C1C2E] mb-2 group-hover:text-[#C9687A] transition-colors"
            style={{ fontFamily: 'var(--font-playfair)' }}
          >
            {service.name}
          </h3>
        </Link>

        <div className="flex items-center gap-4 text-[#6B6B7B] text-sm font-sans mb-4">
          {service.duration && (
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" aria-hidden="true" />
              {service.duration}
            </span>
          )}
          <span className="font-medium text-[#1C1C2E]">
            AED {service.price}
          </span>
        </div>

        {showBookButton && (
          <Link
            href={`/booking?service=${service._id}`}
            className="flex items-center gap-1.5 text-[#C9687A] text-xs font-sans font-medium tracking-widest uppercase hover:gap-3 transition-all duration-300"
          >
            Book Now{' '}
            <ChevronRight className="w-3.5 h-3.5" aria-hidden="true" />
          </Link>
        )}
      </div>
    </motion.div>
  )
}
