'use client'
import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { urlFor } from '@/lib/sanity/image'
import type { SanityImage } from '@/types'

const gradients = [
  'from-rose-light/40 to-gold-light/30',
  'from-[#D4B8C4]/40 to-rose-light/30',
  'from-gold-light/40 to-cream-bg',
  'from-rose-primary/20 to-rose-light/30',
]

function GalleryCell({ image, alt, gradient, label, delay, w, h }: {
  image?: SanityImage | null
  alt: string
  gradient: string
  label: string
  delay: number
  w: number
  h: number
}) {
  const url = image?.asset ? urlFor(image).width(w).height(h).url() : null
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

export function GalleryPreviewSection({ workImage1, workImage2, workImage3, workImage4 }: {
  workImage1?: SanityImage | null
  workImage2?: SanityImage | null
  workImage3?: SanityImage | null
  workImage4?: SanityImage | null
}) {
  return (
    <section className="py-20 md:py-28 bg-charcoal">
      <div className="container-luxury">
        <div className="text-center mb-16">
          <p className="font-cormorant italic text-rose-light text-xl tracking-widest mb-3">Our Work</p>
          <h2 className="font-playfair text-4xl md:text-5xl font-medium text-warm-white mb-4">Beauty in Every Detail</h2>
          <div className="divider-gold w-16 mx-auto opacity-60" />
        </div>

        <div className="flex gap-3 mb-10 aspect-3/2">
          {/* Image 1 — tall left */}
          <div className="w-1/3 shrink-0">
            <GalleryCell image={workImage1} alt="Our work 1" gradient={gradients[0]} label="1" delay={0} w={600} h={1200} />
          </div>

          {/* Right side — 2 rows */}
          <div className="flex-1 grid grid-cols-2 grid-rows-2 gap-3">
            <GalleryCell image={workImage2} alt="Our work 2" gradient={gradients[1]} label="2" delay={0.08} w={600} h={600} />
            <GalleryCell image={workImage3} alt="Our work 3" gradient={gradients[2]} label="3" delay={0.16} w={600} h={600} />
            <div className="col-span-2">
              <GalleryCell image={workImage4} alt="Our work 4" gradient={gradients[3]} label="4" delay={0.24} w={1200} h={600} />
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
