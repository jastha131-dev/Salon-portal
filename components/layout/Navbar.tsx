'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/services', label: 'Services' },
  { href: '/team', label: 'Team' },
  { href: '/gallery', label: 'Gallery' },
  { href: '/reviews', label: 'Reviews' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
]

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close mobile menu on route change
  useEffect(() => {
    setMobileOpen(false)
  }, [pathname])

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [mobileOpen])

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled || mobileOpen
            ? 'bg-charcoal/95 backdrop-blur-md py-3 shadow-[0_1px_0_rgba(201,168,76,0.15)]'
            : 'bg-transparent py-5'
        }`}
      >
        <div className="container-luxury flex items-center justify-between">

          {/* ── Logo ─────────────────────────────────────────── */}
          <Link href="/" className="flex items-center gap-2 group" aria-label="Lumière Beauty Salon — Home">
            <div className="flex items-baseline gap-1">
              <span className="font-playfair text-2xl font-medium tracking-[0.15em] text-warm-white group-hover:text-rose-light transition-colors duration-300">
                LUMIÈRE
              </span>
              {/* Gold dot ornament */}
              <span
                className="inline-block w-1.5 h-1.5 rounded-full bg-gold-accent mb-1 group-hover:scale-150 transition-transform duration-300"
                aria-hidden="true"
              />
            </div>
            <span className="hidden sm:block font-cormorant italic text-xs tracking-[0.2em] text-muted-light uppercase ml-1 group-hover:text-gold-light transition-colors duration-300">
              Beauty Salon
            </span>
          </Link>

          {/* ── Desktop Navigation ───────────────────────────── */}
          <nav className="hidden lg:flex items-center gap-8" aria-label="Main navigation">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`relative font-sans text-xs tracking-widest uppercase transition-colors duration-200 after:absolute after:bottom-[-3px] after:left-0 after:h-px after:bg-rose-light after:transition-all after:duration-300 ${
                  pathname === link.href
                    ? 'text-rose-light after:w-full'
                    : 'text-warm-white/70 hover:text-warm-white after:w-0 hover:after:w-full'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* ── CTA + Mobile Toggle ───────────────────────────── */}
          <div className="flex items-center gap-4">
            <Link
              href="/booking"
              className="hidden md:inline-flex items-center px-6 py-2.5 rounded-full bg-rose-primary text-white text-xs font-sans font-medium tracking-widest uppercase hover:bg-rose-dark transition-all duration-300 hover:-translate-y-0.5 shadow-luxury hover:shadow-[0_8px_24px_rgba(201,104,122,0.35)]"
            >
              Book Now
            </Link>

            <button
              onClick={() => setMobileOpen((prev) => !prev)}
              className="lg:hidden p-2 text-warm-white hover:text-rose-light transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-rose-primary"
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileOpen}
              aria-controls="mobile-menu"
            >
              <AnimatePresence mode="wait">
                {mobileOpen ? (
                  <motion.div
                    key="x"
                    initial={{ rotate: -90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: 90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <X className="w-6 h-6" />
                  </motion.div>
                ) : (
                  <motion.div
                    key="menu"
                    initial={{ rotate: 90, opacity: 0 }}
                    animate={{ rotate: 0, opacity: 1 }}
                    exit={{ rotate: -90, opacity: 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Menu className="w-6 h-6" />
                  </motion.div>
                )}
              </AnimatePresence>
            </button>
          </div>
        </div>
      </header>

      {/* ── Mobile Menu Overlay ───────────────────────────────── */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Mobile navigation"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-charcoal flex flex-col items-center justify-center"
          >
            {/* Decorative background element */}
            <div
              className="absolute inset-0 pointer-events-none"
              aria-hidden="true"
              style={{
                background:
                  'radial-gradient(ellipse 60% 50% at 50% 50%, rgba(201,104,122,0.08) 0%, transparent 70%)',
              }}
            />

            <nav className="relative flex flex-col items-center gap-8" aria-label="Mobile navigation links">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ delay: i * 0.07, duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
                >
                  <Link
                    href={link.href}
                    className={`font-playfair text-3xl font-medium transition-colors duration-200 ${
                      pathname === link.href
                        ? 'text-rose-light'
                        : 'text-warm-white hover:text-rose-light'
                    }`}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}

              {/* Divider */}
              <motion.div
                initial={{ opacity: 0, scaleX: 0 }}
                animate={{ opacity: 1, scaleX: 1 }}
                exit={{ opacity: 0 }}
                transition={{ delay: navLinks.length * 0.07, duration: 0.4 }}
                className="divider-gold w-32 opacity-40"
                aria-hidden="true"
              />

              {/* Book CTA */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ delay: navLinks.length * 0.07 + 0.1, duration: 0.4 }}
              >
                <Link
                  href="/booking"
                  className="inline-flex items-center px-10 py-4 rounded-full bg-rose-primary text-white font-sans text-sm tracking-widest uppercase hover:bg-rose-dark transition-all duration-300 shadow-luxury"
                >
                  Book Appointment
                </Link>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
