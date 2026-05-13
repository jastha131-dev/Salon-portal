'use client'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { urlFor } from '@/lib/sanity/image'
import type { GalleryImage } from '@/types'

const placeholderImages: GalleryImage[] = Array.from({ length: 6 }, (_, i) => ({
  _id: `placeholder-${i}`,
  alt: `Beauty work ${i + 1}`,
  caption: undefined,
  featured: false,
  image: null as unknown as GalleryImage['image'],
  category: undefined,
}))

const gradients = [
  'from-rose-light/40 to-gold-light/30',
  'from-[#D4B8C4]/40 to-rose-light/30',
  'from-gold-light/40 to-cream-bg',
  'from-rose-primary/20 to-rose-light/30',
  'from-[#C8B8D4]/40 to-gold-light/30',
  'from-cream-bg to-rose-light/20',
]

export function GalleryPreviewSection({ images }: { images: GalleryImage[] }) {
  const displayImages = images?.length > 0 ? images.slice(0, 6) : placeholderImages

  return (
    <section className="py-20 md:py-28 bg-charcoal">
      <div className="container-luxury">
        <div className="text-center mb-16">
          <p className="font-cormorant italic text-rose-light text-xl tracking-widest mb-3">Our Work</p>
          <h2 className="font-playfair text-4xl md:text-5xl font-medium text-warm-white mb-4">Beauty in Every Detail</h2>
          <div className="divider-gold w-16 mx-auto opacity-60" />
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-10">
          {displayImages.map((img, i) => {
            const imageUrl = img.image?.asset ? urlFor(img.image).width(600).height(600).url() : null
            return (
              <motion.div
                key={img._id}
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.6 }}
                className={`relative overflow-hidden group ${i === 0 ? 'row-span-2' : ''}`}
                style={{ aspectRatio: i === 0 ? '1/2' : '1/1' }}
              >
                {imageUrl ? (
                  <Image
                    src={imageUrl}
                    alt={img.alt || 'Gallery'}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                ) : (
                  <div
                    className={`w-full h-full bg-gradient-to-br ${gradients[i % gradients.length]} flex items-center justify-center`}
                  >
                    <span className="font-playfair text-4xl text-rose-primary/30">{i + 1}</span>
                  </div>
                )}
                <div className="absolute inset-0 bg-charcoal/0 group-hover:bg-charcoal/40 transition-colors duration-300" />
                {img.caption && (
                  <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                    <p className="font-sans text-xs text-warm-white">{img.caption}</p>
                  </div>
                )}
              </motion.div>
            )
          })}
        </div>

        <div className="text-center">
          <Link
            href="/gallery"
            className="inline-flex items-center gap-2 font-sans text-sm tracking-widest uppercase border border-warm-white/30 text-warm-white px-8 py-3.5 hover:bg-warm-white/10 transition-all duration-300"
          >
            View Full Gallery <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  )
}
