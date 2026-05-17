'use client'
import { useState, useEffect, useRef } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Check, ChevronDown, Zap, Sparkles, Crown, Search } from 'lucide-react'
import { SearchOverlay } from '@/components/ui/SearchOverlay'

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/services', label: 'Services' },
  { href: '/team', label: 'Team' },
  { href: '/gallery', label: 'Gallery' },
  { href: '/reviews', label: 'Reviews' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
]

const planItems = [
  {
    href: '/plans#essential',
    label: 'Essential',
    price: 'AED 299/mo',
    tagline: 'Perfect start',
    icon: Zap,
    color: 'text-muted-light',
    features: ['1 visit / month', 'Hair & blowdry'],
  },
  {
    href: '/plans#luxe',
    label: 'Luxe',
    price: 'AED 599/mo',
    tagline: 'Most popular',
    icon: Sparkles,
    color: 'text-rose-light',
    badge: true,
    features: ['3 visits / month', 'Hair + nails'],
  },
  {
    href: '/plans#royal',
    label: 'Royal',
    price: 'AED 999/mo',
    tagline: 'Unlimited luxury',
    icon: Crown,
    color: 'text-gold-accent',
    features: ['Unlimited visits', 'All services + spa'],
  },
]

export function Navbar() {
  const [scrolled, setScrolled]       = useState(false)
  const [mobileOpen, setMobileOpen]   = useState(false)
  const [plansOpen, setPlansOpen]     = useState(false)
  const [searchOpen, setSearchOpen]   = useState(false)
  const plansRef                      = useRef<HTMLDivElement>(null)
  const closeTimer                    = useRef<ReturnType<typeof setTimeout> | null>(null)
  const pathname                      = usePathname()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => { setMobileOpen(false); setPlansOpen(false) }, [pathname])

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [mobileOpen])

  const openPlans  = () => { if (closeTimer.current) clearTimeout(closeTimer.current); setPlansOpen(true) }
  const closePlans = () => { closeTimer.current = setTimeout(() => setPlansOpen(false), 120) }

  const isPlansActive = pathname.startsWith('/plans')

  return (
    <>
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled || mobileOpen
          ? 'bg-charcoal/95 backdrop-blur-md py-3 shadow-[0_1px_0_rgba(201,168,76,0.15)]'
          : 'bg-transparent py-5'
      }`}>
        <div className="container-luxury flex items-center justify-between">

          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 group" aria-label="Lumière Beauty Salon — Home">
            <div className="flex items-baseline gap-1">
              <span className="font-playfair text-2xl font-medium tracking-[0.15em] text-warm-white group-hover:text-rose-light transition-colors duration-300">LUMIÈRE</span>
              <span className="inline-block w-1.5 h-1.5 rounded-full bg-gold-accent mb-1 group-hover:scale-150 transition-transform duration-300" aria-hidden="true" />
            </div>
            <span className="hidden sm:block font-cormorant italic text-xs tracking-[0.2em] text-muted-light uppercase ml-1 group-hover:text-gold-light transition-colors duration-300">Beauty Salon</span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-8" aria-label="Main navigation">
            {navLinks.map((link) => (
              <Link key={link.href} href={link.href}
                className={`relative font-sans text-xs tracking-widest uppercase transition-colors duration-200 after:absolute after:-bottom-0.75 after:left-0 after:h-px after:bg-rose-light after:transition-all after:duration-300 ${
                  pathname === link.href
                    ? 'text-rose-light after:w-full'
                    : 'text-warm-white/70 hover:text-warm-white after:w-0 hover:after:w-full'
                }`}
              >
                {link.label}
              </Link>
            ))}

            {/* Plans dropdown trigger */}
            <div ref={plansRef} className="relative" onMouseEnter={openPlans} onMouseLeave={closePlans}>
              <Link href="/plans"
                className={`relative flex items-center gap-1 font-sans text-xs tracking-widest uppercase transition-colors duration-200 after:absolute after:-bottom-0.75 after:left-0 after:h-px after:bg-rose-light after:transition-all after:duration-300 ${
                  isPlansActive
                    ? 'text-rose-light after:w-full'
                    : 'text-warm-white/70 hover:text-warm-white after:w-0 hover:after:w-full'
                }`}
              >
                Plans
                <motion.span animate={{ rotate: plansOpen ? 180 : 0 }} transition={{ duration: 0.2 }}>
                  <ChevronDown className="w-3 h-3" />
                </motion.span>
              </Link>

              {/* Dropdown panel */}
              <AnimatePresence>
                {plansOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: 8, scale: 0.97 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 6, scale: 0.97 }}
                    transition={{ duration: 0.2, ease: 'easeOut' }}
                    onMouseEnter={openPlans}
                    onMouseLeave={closePlans}
                    className="absolute top-full right-1/2 translate-x-1/2 mt-4 w-130 bg-charcoal/98 backdrop-blur-xl border border-warm-white/10 shadow-[0_24px_60px_rgba(0,0,0,0.5)] overflow-hidden"
                  >
                    {/* Gold top line */}
                    <div className="h-px bg-linear-to-r from-transparent via-gold-accent to-transparent" />

                    <div className="p-4 grid grid-cols-3 gap-px bg-warm-white/6">
                      {planItems.map((plan) => {
                        const Icon = plan.icon
                        return (
                          <Link key={plan.label} href={plan.href}
                            className="group bg-charcoal p-5 hover:bg-rose-primary/8 transition-colors duration-250 flex flex-col gap-3"
                          >
                            <div className="flex items-center justify-between">
                              <div className={`flex items-center gap-2 ${plan.color}`}>
                                <Icon className="w-4 h-4" />
                                <span className="font-playfair text-base text-warm-white">{plan.label}</span>
                              </div>
                              {plan.badge && (
                                <span className="text-[9px] font-sans tracking-widest uppercase bg-rose-primary text-white px-2 py-0.5 rounded-full">Popular</span>
                              )}
                            </div>
                            <div>
                              <p className="font-playfair text-xl text-warm-white">{plan.price}</p>
                              <p className={`font-sans text-[10px] tracking-widest uppercase ${plan.color}`}>{plan.tagline}</p>
                            </div>
                            <ul className="space-y-1">
                              {plan.features.map(f => (
                                <li key={f} className="flex items-center gap-1.5 font-sans text-xs text-muted-light">
                                  <Check className="w-3 h-3 text-rose-primary/70 shrink-0" />{f}
                                </li>
                              ))}
                            </ul>
                          </Link>
                        )
                      })}
                    </div>

                    <div className="px-4 py-3 flex items-center justify-between border-t border-warm-white/6">
                      <p className="font-sans text-xs text-muted-light">Save up to <span className="text-gold-accent font-medium">15%</span> with yearly billing</p>
                      <Link href="/plans" className="font-sans text-xs text-rose-light hover:text-rose-primary tracking-widest uppercase transition-colors duration-200">
                        Compare all plans →
                      </Link>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </nav>

          {/* CTA + Mobile toggle */}
          <div className="flex items-center gap-3">
            <button type="button" onClick={() => setSearchOpen(true)} aria-label="Search"
              className="p-2 text-warm-white/70 hover:text-warm-white transition-colors duration-200">
              <Search className="w-5 h-5" />
            </button>
            <Link href="/booking"
              className="hidden md:inline-flex items-center px-6 py-2.5 rounded-full bg-rose-primary text-white text-xs font-sans font-medium tracking-widest uppercase hover:bg-rose-dark transition-all duration-300 hover:-translate-y-0.5 shadow-luxury hover:shadow-[0_8px_24px_rgba(201,104,122,0.35)]"
            >
              Book Now
            </Link>
            <button type="button" onClick={() => setMobileOpen(p => !p)}
              className="lg:hidden p-2 text-warm-white hover:text-rose-light transition-colors duration-200"
              aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={mobileOpen ? 'true' : 'false'}
            >
              <AnimatePresence mode="wait">
                {mobileOpen ? (
                  <motion.div key="x" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}>
                    <X className="w-6 h-6" />
                  </motion.div>
                ) : (
                  <motion.div key="menu" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }}>
                    <Menu className="w-6 h-6" />
                  </motion.div>
                )}
              </AnimatePresence>
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            id="mobile-menu" role="dialog" aria-modal="true" aria-label="Mobile navigation"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 bg-charcoal flex flex-col items-center justify-center"
          >
            <div className="absolute inset-0 pointer-events-none mobile-menu-glow" aria-hidden="true" />
            <nav className="relative flex flex-col items-center gap-7" aria-label="Mobile navigation links">
              {navLinks.map((link, i) => (
                <motion.div key={link.href}
                  initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
                  transition={{ delay: i * 0.06, duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
                >
                  <Link href={link.href}
                    className={`font-playfair text-3xl font-medium transition-colors duration-200 ${pathname === link.href ? 'text-rose-light' : 'text-warm-white hover:text-rose-light'}`}
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}

              {/* Plans mobile link */}
              <motion.div
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
                transition={{ delay: navLinks.length * 0.06, duration: 0.4 }}
              >
                <Link href="/plans"
                  className={`font-playfair text-3xl font-medium transition-colors duration-200 flex items-center gap-2 ${isPlansActive ? 'text-gold-accent' : 'text-warm-white hover:text-gold-accent'}`}
                >
                  Plans
                  <span className="text-[10px] font-sans tracking-widest uppercase bg-gold-accent text-charcoal px-2 py-0.5 rounded-full align-middle">New</span>
                </Link>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, scaleX: 0 }} animate={{ opacity: 1, scaleX: 1 }} exit={{ opacity: 0 }}
                transition={{ delay: (navLinks.length + 1) * 0.06, duration: 0.4 }}
                className="divider-gold w-32 opacity-40" aria-hidden="true"
              />
              <motion.div
                initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
                transition={{ delay: (navLinks.length + 1) * 0.06 + 0.1, duration: 0.4 }}
              >
                <Link href="/booking"
                  className="inline-flex items-center px-10 py-4 rounded-full bg-rose-primary text-white font-sans text-sm tracking-widest uppercase hover:bg-rose-dark transition-all duration-300 shadow-luxury"
                >
                  Book Appointment
                </Link>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>

      <SearchOverlay open={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  )
}
