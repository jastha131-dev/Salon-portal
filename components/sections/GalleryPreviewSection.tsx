'use client'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { urlFor } from '@/lib/sanity/image'
import type { GalleryImage } from '@/types'

const gradients = [
  'from-rose-light/40 to-gold-light/30',
  'from-[#D4B8C4]/40 to-rose-light/30',
  'from-gold-light/40 to-cream-bg',
  'from-rose-primary/20 to-rose-light/30',
]

function GalleryCell({ url, alt, gradient, label, delay }: {
  url: string | null
  alt: string
  gradient: string
  label: string
  delay: number
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
      transition={{ delay, duration: 0.6 }}
      className="relative overflow-hidden group w-full h-full"
    >
      {url
        ? <Image src={url} alt={alt} fill unoptimized className="object-cover transition-transform duration-500 group-hover:scale-110" />
        : <div className={`w-full h-full bg-linear-to-br ${gradient} flex items-center justify-center`}>
            <span className="font-playfair text-4xl text-rose-primary/30">{label}</span>
          </div>
      }
      <div className="absolute inset-0 bg-charcoal/0 group-hover:bg-charcoal/40 transition-colors duration-300" />
    </motion.div>
  )
}

export function GalleryPreviewSection({ images }: { images: GalleryImage[] }) {
  const imgs = images?.length > 0 ? images.slice(0, 4) : Array.from({ length: 4 }, (_, i) => ({
    _id: `p-${i}`, alt: `${i + 1}`, caption: undefined, featured: false,
    image: null as unknown as GalleryImage['image'], category: undefined,
  }))

  const url = (img: GalleryImage, w: number, h: number) =>
    img.image?.asset ? urlFor(img.image).width(w).height(h).url() : null

  return (
    <section className="py-20 md:py-28 bg-charcoal">
      <div className="container-luxury">
        <div className="text-center mb-16">
          <p className="font-cormorant italic text-rose-light text-xl tracking-widest mb-3">Our Work</p>
          <h2 className="font-playfair text-4xl md:text-5xl font-medium text-warm-white mb-4">Beauty in Every Detail</h2>
          <div className="divider-gold w-16 mx-auto opacity-60" />
        </div>

        {/* Flex layout: image1 left | right grid */}
        <div className="flex gap-3 mb-10 aspect-3/2">
          {/* Image 1 — tall, 1/3 width */}
          <div className="w-1/3 shrink-0">
            <GalleryCell url={url(imgs[0], 600, 1200)} alt={imgs[0].alt || 'Gallery 1'} gradient={gradients[0]} label="1" delay={0} />
          </div>

          {/* Right side — 2/3 width, 2 rows */}
          <div className="flex-1 grid grid-cols-2 grid-rows-2 gap-3">
            {/* Image 2 — top left */}
            <GalleryCell url={url(imgs[1], 600, 600)} alt={imgs[1].alt || 'Gallery 2'} gradient={gradients[1]} label="2" delay={0.08} />
            {/* Image 3 — top right */}
            <GalleryCell url={url(imgs[2], 600, 600)} alt={imgs[2].alt || 'Gallery 3'} gradient={gradients[2]} label="3" delay={0.16} />
            {/* Image 4 — bottom full width */}
            <div className="col-span-2">
              <GalleryCell url={url(imgs[3], 1200, 600)} alt={imgs[3].alt || 'Gallery 4'} gradient={gradients[3]} label="4" delay={0.24} />
            </div>
          </div>
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
