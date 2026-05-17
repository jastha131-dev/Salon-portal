'use client'
import { useState, useEffect, useCallback } from 'react'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { X, ChevronLeft, ChevronRight, ZoomIn } from 'lucide-react'
import { PageHero } from '@/components/layout/PageHero'
import { urlFor } from '@/lib/sanity/image'
import type { GalleryImage, Category } from '@/types'

type FilterCategory = { slug: string; name: string }
const ALL_FILTER: FilterCategory = { slug: 'all', name: 'All Work' }

const gradients = [
  'from-rose-light/30 to-gold-light/20',
  'from-[#D4B8C4]/30 to-rose-light/20',
  'from-gold-light/30 to-cream-bg',
  'from-rose-primary/15 to-rose-light/20',
  'from-[#C8B8D4]/30 to-gold-light/20',
  'from-cream-bg to-rose-light/15',
  'from-rose-light/20 to-gold-light/30',
  'from-[#BFB5D0]/20 to-rose-light/30',
]

// Tailwind grid-placement classes for each of 8 bento positions (4-col, 3-row grid)
const bentoClasses = [
  'col-start-1 col-end-2 row-start-1 row-end-3', // tall portrait — top-left
  'col-start-2 col-end-4 row-start-1 row-end-2', // wide landscape — top-center
  'col-start-4 col-end-5 row-start-1 row-end-3', // tall portrait — top-right
  'col-start-2 col-end-3 row-start-2 row-end-3', // square — mid-left
  'col-start-3 col-end-4 row-start-2 row-end-3', // square — mid-right
  'col-start-1 col-end-3 row-start-3 row-end-4', // wide — bottom-left
  'col-start-3 col-end-4 row-start-3 row-end-4', // square — bottom-center
  'col-start-4 col-end-5 row-start-3 row-end-4', // square — bottom-right
]

// Tailwind aspect-ratio classes for mobile 2-col masonry (8 items)
const mobileAspectClasses = [
  'aspect-[2/3]', 'aspect-[4/3]', 'aspect-[4/3]', 'aspect-[2/3]',
  'aspect-square',  'aspect-[3/4]', 'aspect-[3/4]', 'aspect-square',
]

const PLACEHOLDER_COUNT = 8
const placeholderImages: GalleryImage[] = Array.from({ length: PLACEHOLDER_COUNT }, (_, i) => ({
  _id: `placeholder-${i}`,
  alt: `Beauty work ${i + 1}`,
  caption: undefined,
  featured: false,
  image: null as any,
  category: undefined,
}))

export default function GalleryPage() {
  const [images, setImages] = useState<GalleryImage[]>([])
  const [filtered, setFiltered] = useState<GalleryImage[]>([])
  const [activeFilter, setActiveFilter] = useState('all')
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null)
  const [loading, setLoading] = useState(true)
  const [filterCategories, setFilterCategories] = useState<FilterCategory[]>([ALL_FILTER])

  useEffect(() => {
    fetch('/api/categories')
      .then((r) => r.json())
      .then((d) => {
        const cats: FilterCategory[] = (d.data || []).map((c: Category) => ({
          slug: c.slug?.current ?? c.name.toLowerCase(),
          name: c.name,
        }))
        setFilterCategories([ALL_FILTER, ...cats])
      })
      .catch(() => {})
  }, [])

  useEffect(() => {
    fetch('/api/gallery?limit=50')
      .then((r) => r.json())
      .then((d) => {
        setImages(d.data || [])
        setFiltered(d.data || [])
        setLoading(false)
      })
      .catch(() => setLoading(false))
  }, [])

  useEffect(() => {
    if (activeFilter === 'all') {
      setFiltered(images)
    } else {
      setFiltered(images.filter((img) => img.category?.slug?.current === activeFilter))
    }
  }, [activeFilter, images])

  const openLightbox = (index: number) => setLightboxIndex(index)
  const closeLightbox = useCallback(() => setLightboxIndex(null), [])
  const prevImage = useCallback(
    () => setLightboxIndex((i) => (i !== null ? Math.max(0, i - 1) : 0)),
    [],
  )
  const nextImage = useCallback(
    () =>
      setLightboxIndex((i) =>
        i !== null ? Math.min((filtered.length > 0 ? filtered : placeholderImages).length - 1, i + 1) : 0,
      ),
    [filtered],
  )

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeLightbox()
      if (e.key === 'ArrowLeft') prevImage()
      if (e.key === 'ArrowRight') nextImage()
    }
    window.addEventListener('keydown', handleKey)
    return () => window.removeEventListener('keydown', handleKey)
  }, [closeLightbox, prevImage, nextImage])

  const baseDisplay = filtered.length > 0 ? filtered : placeholderImages
  const gridImages = baseDisplay.slice(0, 8)
  const currentImage = lightboxIndex !== null ? baseDisplay[lightboxIndex] : null

  const renderCard = (img: GalleryImage, i: number) => {
    const imageUrl = img.image?.asset ? urlFor(img.image).width(600).url() : null
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: Math.min(i * 0.06, 0.4), duration: 0.4 }}
        className="absolute inset-0 group cursor-pointer overflow-hidden"
        onClick={() => openLightbox(i)}
        role="button"
        tabIndex={0}
        aria-label={img.alt || `Gallery image ${i + 1}`}
        onKeyDown={(e) => e.key === 'Enter' && openLightbox(i)}
      >
        <div className={`absolute inset-0 bg-linear-to-br ${gradients[i % gradients.length]}`} />

        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={img.alt || `Gallery image ${i + 1}`}
            fill
            unoptimized
            priority={i === 0}
            className="object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="font-playfair text-5xl text-rose-primary/20 select-none">{i + 1}</span>
          </div>
        )}

        <div className="absolute inset-0 bg-charcoal/0 group-hover:bg-charcoal/50 transition-colors duration-300 flex items-center justify-center">
          <ZoomIn className="w-8 h-8 text-white opacity-0 group-hover:opacity-100 transition-all duration-300 scale-75 group-hover:scale-100" />
        </div>

        {img.caption && (
          <div className="absolute bottom-0 left-0 right-0 bg-linear-to-t from-charcoal/90 via-charcoal/40 to-transparent p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300">
            <p className="font-sans text-xs text-warm-white leading-relaxed">{img.caption}</p>
          </div>
        )}

        {img.category?.name && (
          <div className="absolute top-3 left-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <span className="bg-rose-primary/90 text-white font-sans text-[10px] tracking-widest uppercase px-2.5 py-1">
              {img.category.name}
            </span>
          </div>
        )}
      </motion.div>
    )
  }

  return (
    <>
      <PageHero
        eyebrow="Our Portfolio"
        title="Beauty in Every Frame"
        subtitle="A showcase of our finest work — hair transformations, nail artistry, bridal makeup, and spa wellness."
        dark
      />

      <section className="py-16 md:py-24 bg-charcoal">
        <div className="container-luxury">

          {/* Filters */}
          <div className="flex flex-wrap items-center justify-center gap-3 mb-12">
            {filterCategories.map((cat) => (
              <button
                type="button"
                key={cat.slug}
                onClick={() => setActiveFilter(cat.slug)}
                className={`px-6 py-2.5 font-sans text-xs tracking-widest uppercase transition-all duration-300 focus-luxury ${
                  activeFilter === cat.slug
                    ? 'bg-rose-primary text-white shadow-luxury'
                    : 'border border-warm-white/20 text-warm-white/70 hover:border-rose-primary/60 hover:text-warm-white'
                }`}
              >
                {cat.name}
              </button>
            ))}
          </div>

          {/* Loading skeletons */}
          {loading && (
            <>
              <div className="hidden md:grid grid-cols-4 gap-3 auto-rows-[190px]">
                {bentoClasses.map((cls, i) => (
                  <div key={i} className={`bg-warm-white/5 animate-pulse ${cls}`} />
                ))}
              </div>
              <div className="md:hidden columns-2 gap-3">
                {mobileAspectClasses.map((cls, i) => (
                  <div key={i} className={`break-inside-avoid mb-3 bg-warm-white/5 animate-pulse ${cls}`} />
                ))}
              </div>
            </>
          )}

          {/* Grid */}
          {!loading && (
            <AnimatePresence mode="wait">
              <motion.div
                key={activeFilter}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.4 }}
              >
                {/* Desktop — 4-col bento */}
                <div className="hidden md:grid grid-cols-4 gap-3 auto-rows-[190px]">
                  {gridImages.map((img, i) => (
                    <div key={img._id} className={`relative ${bentoClasses[i] ?? ''}`}>
                      {renderCard(img, i)}
                    </div>
                  ))}
                </div>

                {/* Mobile — 2-col masonry */}
                <div className="md:hidden columns-2 gap-3">
                  {gridImages.map((img, i) => (
                    <div key={img._id} className={`relative break-inside-avoid mb-3 ${mobileAspectClasses[i % mobileAspectClasses.length]}`}>
                      {renderCard(img, i)}
                    </div>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          )}

          {/* Empty state */}
          {!loading && filtered.length === 0 && images.length > 0 && (
            <div className="text-center py-20">
              <p className="font-playfair text-2xl text-warm-white mb-3">No images in this category</p>
              <button
                type="button"
                onClick={() => setActiveFilter('all')}
                className="font-sans text-sm text-rose-light hover:text-rose-primary transition-colors tracking-wider underline underline-offset-4"
              >
                View all work
              </button>
            </div>
          )}

        </div>
      </section>

      {/* ── Booking CTA ───────────────────────────────────── */}
      <section className="py-14 bg-rose-primary">
        <div className="container-luxury text-center">
          <p className="font-cormorant italic text-warm-white/80 text-xl tracking-widest mb-2">
            Inspired by what you see?
          </p>
          <h2 className="font-playfair text-3xl md:text-4xl text-white font-medium mb-6">
            Book Your Transformation
          </h2>
          <a
            href="/booking"
            className="inline-flex px-10 py-4 bg-white text-rose-primary font-sans text-sm tracking-widest uppercase hover:bg-warm-white transition-colors duration-300 hover:-translate-y-0.5 hover:shadow-lg"
          >
            Reserve Your Appointment
          </a>
        </div>
      </section>

      {/* ── Lightbox ──────────────────────────────────────── */}
      <AnimatePresence>
        {lightboxIndex !== null && currentImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-100 bg-black/95 flex items-center justify-center"
            onClick={closeLightbox}
            role="dialog"
            aria-modal="true"
            aria-label="Image lightbox"
          >
            <button
              type="button"
              onClick={closeLightbox}
              className="absolute top-5 right-5 text-white/70 hover:text-rose-light transition-colors z-20 p-2 hover:bg-white/10 rounded-full"
              aria-label="Close lightbox"
            >
              <X className="w-7 h-7" />
            </button>

            <button
              type="button"
              onClick={(e) => { e.stopPropagation(); prevImage() }}
              disabled={lightboxIndex === 0}
              className="absolute left-4 md:left-6 top-1/2 -translate-y-1/2 text-white/70 hover:text-rose-light transition-colors z-20 p-3 hover:bg-white/10 rounded-full disabled:opacity-20 disabled:cursor-not-allowed"
              aria-label="Previous image"
            >
              <ChevronLeft className="w-8 h-8" />
            </button>

            <button
              type="button"
              onClick={(e) => { e.stopPropagation(); nextImage() }}
              disabled={lightboxIndex === baseDisplay.length - 1}
              className="absolute right-4 md:right-6 top-1/2 -translate-y-1/2 text-white/70 hover:text-rose-light transition-colors z-20 p-3 hover:bg-white/10 rounded-full disabled:opacity-20 disabled:cursor-not-allowed"
              aria-label="Next image"
            >
              <ChevronRight className="w-8 h-8" />
            </button>

            <motion.div
              key={lightboxIndex}
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.92, opacity: 0 }}
              transition={{ duration: 0.28, ease: [0.25, 0.1, 0.25, 1] }}
              className="relative mx-16 md:mx-24 flex items-center justify-center gallery-lightbox-box"
              onClick={(e) => e.stopPropagation()}
            >
              {currentImage.image?.asset ? (
                <Image
                  src={urlFor(currentImage.image).width(1200).url()}
                  alt={currentImage.alt || `Gallery image ${lightboxIndex + 1}`}
                  fill
                  unoptimized
                  priority
                  className="object-contain"
                  sizes="(max-width: 1024px) 90vw, 900px"
                />
              ) : (
                <div className={`w-full h-full bg-linear-to-br ${gradients[lightboxIndex % gradients.length]} flex items-center justify-center`}>
                  <span className="font-playfair text-9xl text-white/10 select-none">
                    {lightboxIndex + 1}
                  </span>
                </div>
              )}
            </motion.div>

            <div className="absolute bottom-5 left-1/2 -translate-x-1/2 text-center space-y-1.5">
              {currentImage.caption && (
                <p className="font-sans text-sm text-white/80 max-w-sm mx-auto">{currentImage.caption}</p>
              )}
              <span className="font-sans text-xs text-white/40 tracking-widest">
                {lightboxIndex + 1} / {baseDisplay.length}
              </span>
            </div>

            <div className="absolute bottom-16 left-1/2 -translate-x-1/2 flex gap-1.5 max-w-xs overflow-hidden">
              {baseDisplay.slice(Math.max(0, lightboxIndex - 3), lightboxIndex + 4).map((img, idx) => {
                const realIdx = Math.max(0, lightboxIndex - 3) + idx
                return (
                  <button
                    type="button"
                    key={img._id}
                    onClick={(e) => { e.stopPropagation(); setLightboxIndex(realIdx) }}
                    className={`w-10 h-10 shrink-0 overflow-hidden transition-all duration-200 ${
                      realIdx === lightboxIndex ? 'ring-2 ring-rose-primary opacity-100' : 'opacity-40 hover:opacity-70'
                    }`}
                    aria-label={`Go to image ${realIdx + 1}`}
                  >
                    <div className={`w-full h-full bg-linear-to-br ${gradients[realIdx % gradients.length]}`} />
                  </button>
                )
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
