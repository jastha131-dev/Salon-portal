'use client'

import Image from 'next/image'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { urlFor } from '@/lib/sanity/image'

const InstagramIcon = () => (
  <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
  </svg>
)
const FacebookIcon = () => (
  <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
  </svg>
)
const TikTokIcon = () => (
  <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.32 6.32 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.27 8.27 0 0 0 4.84 1.55V6.79a4.85 4.85 0 0 1-1.07-.1z"/>
  </svg>
)

const cardGradients = [
  'from-rose-dark to-rose-primary',
  'from-[#3A4A6B] to-[#5A7AC9]',
  'from-[#3D5A3A] to-[#5A8A4A]',
  'from-[#6B5A3A] to-[#C9A85A]',
  'from-[#5A3A6B] to-[#A85AC9]',
  'from-[#2A5A6B] to-[#5AC9C0]',
]

const filterCategories = ['All', 'Hair', 'Nails', 'Makeup', 'Spa', 'Beauty']

function getCategory(role: string): string {
  const r = (role ?? '').toLowerCase()
  if (r.includes('hair') || r.includes('color') || r.includes('stylist')) return 'Hair'
  if (r.includes('nail')) return 'Nails'
  if (r.includes('makeup')) return 'Makeup'
  if (r.includes('spa') || r.includes('massage') || r.includes('therap') || r.includes('wellness')) return 'Spa'
  return 'Beauty'
}

function initials(name: string | null | undefined) {
  if (!name) return '?'
  return name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
}

export function TeamFilterGrid({ display }: { display: any[] }) {
  const [active, setActive] = useState('All')

  const filtered = active === 'All'
    ? display
    : display.filter(m => getCategory(m.role) === active)

  return (
    <div>
      {/* Filter strip */}
      <div className="flex flex-wrap gap-2 mb-14">
        {filterCategories.map(f => (
          <button key={f} type="button" onClick={() => setActive(f)}
            className={`px-5 py-2 font-sans text-[10px] tracking-[0.2em] uppercase transition-all duration-300 ${
              active === f
                ? 'bg-rose-primary text-white shadow-luxury'
                : 'border border-warm-white/15 text-muted-light hover:border-rose-primary/50 hover:text-warm-white'
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Grid */}
      <AnimatePresence mode="wait">
        <motion.div
          key={active}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.35 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          {filtered.map((member: any, i: number) => {
            const imageUrl = member.image?.asset ? urlFor(member.image).width(520).height(680).url() : null
            const init = initials(member.name)
            const hasSocial = member.socialLinks?.instagram || member.socialLinks?.facebook || member.socialLinks?.tiktok

            return (
              <motion.div
                key={member._id}
                initial={{ opacity: 0, y: 28 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.06, ease: [0.25, 0.1, 0.25, 1] }}
              >
                <div className="group bg-[#16162a] border border-warm-white/6 hover:border-gold-accent/30 hover:-translate-y-2 hover:shadow-[0_24px_60px_rgba(0,0,0,0.6)] transition-all duration-500 overflow-hidden">

                  {/* Portrait */}
                  <div className="relative aspect-portrait overflow-hidden">
                    {imageUrl ? (
                      <Image src={imageUrl} alt={member.name} fill unoptimized
                        className="object-cover object-top group-hover:scale-105 transition-transform duration-700" />
                    ) : (
                      <>
                        <div className={`absolute inset-0 bg-linear-to-br ${cardGradients[i % cardGradients.length]}`} />
                        <span className="absolute inset-0 flex items-center justify-center font-playfair text-9xl font-medium text-white/10 select-none">
                          {init}
                        </span>
                      </>
                    )}

                    {/* Gradient overlay */}
                    <div className="absolute inset-0 bg-linear-to-t from-[#08080f]/95 via-[#08080f]/30 to-transparent" />

                    {/* Index */}
                    <div className="absolute top-4 left-4">
                      <span className="font-sans text-[9px] tracking-[0.3em] text-warm-white/30">
                        {String(i + 1).padStart(2, '0')}
                      </span>
                    </div>

                    {/* Gold corner frames */}
                    <div className="absolute top-3 left-3 w-6 h-6 border-t border-l border-gold-accent opacity-0 group-hover:opacity-100 transition-all duration-400 delay-75" />
                    <div className="absolute top-3 right-3 w-6 h-6 border-t border-r border-gold-accent opacity-0 group-hover:opacity-100 transition-all duration-400 delay-100" />
                    <div className="absolute bottom-[4.5rem] left-3 w-6 h-6 border-b border-l border-gold-accent opacity-0 group-hover:opacity-100 transition-all duration-400 delay-150" />
                    <div className="absolute bottom-[4.5rem] right-3 w-6 h-6 border-b border-r border-gold-accent opacity-0 group-hover:opacity-100 transition-all duration-400 delay-200" />

                    {/* Name at bottom of image */}
                    <div className="absolute bottom-0 left-0 right-0 p-5">
                      <h3 className="font-playfair text-xl text-warm-white leading-snug">{member.name}</h3>
                      <p className="font-cormorant italic text-rose-light text-sm tracking-wide">{member.role}</p>
                    </div>
                  </div>

                  {/* Info strip */}
                  <div className="p-5 border-t border-warm-white/6">
                    <div className="h-px w-8 bg-rose-primary group-hover:w-full transition-all duration-500 mb-4" />

                    {member.expertise?.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 mb-4">
                        {member.expertise.slice(0, 3).map((skill: string) => (
                          <span key={skill}
                            className="px-2 py-0.5 border border-warm-white/10 text-warm-white/45 text-[10px] font-sans tracking-wide">
                            {skill}
                          </span>
                        ))}
                      </div>
                    )}

                    {hasSocial && (
                      <div className="flex gap-2 opacity-0 group-hover:opacity-100 -translate-y-1 group-hover:translate-y-0 transition-all duration-300 delay-100">
                        {member.socialLinks?.instagram && (
                          <a href={member.socialLinks.instagram} target="_blank" rel="noopener noreferrer"
                            title={`Follow ${member.name} on Instagram`}
                            className="w-7 h-7 border border-warm-white/15 flex items-center justify-center text-muted-light hover:text-white hover:border-rose-primary hover:bg-rose-primary/15 transition-all duration-200">
                            <InstagramIcon />
                          </a>
                        )}
                        {member.socialLinks?.facebook && (
                          <a href={member.socialLinks.facebook} target="_blank" rel="noopener noreferrer"
                            title={`Follow ${member.name} on Facebook`}
                            className="w-7 h-7 border border-warm-white/15 flex items-center justify-center text-muted-light hover:text-white hover:border-rose-primary hover:bg-rose-primary/15 transition-all duration-200">
                            <FacebookIcon />
                          </a>
                        )}
                        {member.socialLinks?.tiktok && (
                          <a href={member.socialLinks.tiktok} target="_blank" rel="noopener noreferrer"
                            title={`Follow ${member.name} on TikTok`}
                            className="w-7 h-7 border border-warm-white/15 flex items-center justify-center text-muted-light hover:text-white hover:border-rose-primary hover:bg-rose-primary/15 transition-all duration-200">
                            <TikTokIcon />
                          </a>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </motion.div>
            )
          })}
        </motion.div>
      </AnimatePresence>

      {filtered.length === 0 && (
        <p className="text-center py-20 font-cormorant italic text-xl text-muted-light">
          No artists in this category yet.
        </p>
      )}
    </div>
  )
}
