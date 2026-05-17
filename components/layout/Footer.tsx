import Link from 'next/link'
import { Phone, Mail, MapPin } from 'lucide-react'

const InstagramIcon = () => (
  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
)

const FacebookIcon = () => (
  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
)

const TikTokIcon = () => (
  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.32 6.32 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.27 8.27 0 0 0 4.84 1.55V6.79a4.85 4.85 0 0 1-1.07-.1z"/></svg>
)

const YoutubeIcon = () => (
  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>
)

const quickLinks = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About Us' },
  { href: '/services', label: 'Services' },
  { href: '/team', label: 'Our Team' },
  { href: '/gallery', label: 'Gallery' },
  { href: '/reviews', label: 'Reviews' },
  { href: '/contact', label: 'Contact' },
  { href: '/booking', label: 'Book Appointment' },
]

const serviceLinks = [
  { href: '/services?category=hair', label: 'Hair Services' },
  { href: '/services?category=nails', label: 'Nail Art' },
  { href: '/services?category=makeup', label: 'Makeup' },
  { href: '/services?category=spa', label: 'Spa & Wellness' },
  { href: '/services?category=home-service', label: 'Home Service' },
]

export function Footer() {
  return (
    <>
      <footer className="bg-charcoal text-warm-white border-t-0 relative">
        {/* ── Top decorative border ── */}
        <div className="h-[2px] bg-gradient-to-r from-transparent via-gold-accent to-transparent" />
        <div className="h-px bg-gradient-to-r from-transparent via-rose-primary to-transparent opacity-60 mt-1" />

        {/* ── Top grid section ─────────────────────────────────── */}
        <div className="container-luxury">
          <div className="pt-14 pb-8 md:pt-18 md:pb-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">

            {/* ── Brand column ────────────────────────────────── */}
            <div className="lg:col-span-1">
              {/* Logo */}
              <Link href="/" className="inline-flex items-baseline gap-1 mb-3 group" aria-label="Lumière Beauty Salon">
                <span className="font-playfair text-2xl font-medium tracking-[0.15em] text-warm-white group-hover:text-rose-light transition-colors duration-300">
                  LUMIÈRE
                </span>
                <span
                  className="inline-block w-1.5 h-1.5 rounded-full bg-gold-accent mb-1 group-hover:scale-150 transition-transform duration-300"
                  aria-hidden="true"
                />
              </Link>

              <p className="font-cormorant italic text-muted-light text-sm tracking-widest mb-4">
                Beauty Salon
              </p>

              <p className="font-sans text-muted-light text-sm leading-relaxed mb-6">
                Where luxury meets artistry. Premium beauty services tailored to make you feel extraordinary.
              </p>

              {/* Social icons */}
              <div className="flex items-center gap-4" aria-label="Social media links">
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-light hover:text-rose-light transition-colors duration-200"
                  aria-label="Instagram"
                >
                  <InstagramIcon />
                </a>
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-light hover:text-rose-light transition-colors duration-200"
                  aria-label="Facebook"
                >
                  <FacebookIcon />
                </a>
                {/* TikTok */}
                <a
                  href="https://tiktok.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-light hover:text-rose-light transition-colors duration-200"
                  aria-label="TikTok"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.32 6.32 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.27 8.27 0 0 0 4.84 1.55V6.79a4.85 4.85 0 0 1-1.07-.1z" />
                  </svg>
                </a>
                <a
                  href="https://youtube.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-light hover:text-rose-light transition-colors duration-200"
                  aria-label="YouTube"
                >
                  <YoutubeIcon />
                </a>
              </div>
            </div>

            {/* ── Quick Links ──────────────────────────────────── */}
            <div>
              <h4 className="font-playfair text-lg font-medium mb-5 text-warm-white">
                Quick Links
              </h4>
              <ul className="space-y-3">
                {quickLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="font-sans text-sm text-muted-light hover:text-rose-light transition-colors duration-200"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* ── Services ────────────────────────────────────── */}
            <div>
              <h4 className="font-playfair text-lg font-medium mb-5 text-warm-white">
                Services
              </h4>
              <ul className="space-y-3">
                {serviceLinks.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="font-sans text-sm text-muted-light hover:text-rose-light transition-colors duration-200"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* ── Contact & Hours ──────────────────────────────── */}
            <div>
              <h4 className="font-playfair text-lg font-medium mb-5 text-warm-white">
                Contact Us
              </h4>

              <ul className="space-y-4 mb-6">
                <li className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-rose-light flex-shrink-0 mt-0.5" aria-hidden="true" />
                  <span className="font-sans text-sm text-muted-light leading-relaxed">
                    Dubai Marina, Dubai, UAE
                  </span>
                </li>
                <li className="flex items-center gap-3">
                  <Phone className="w-4 h-4 text-rose-light flex-shrink-0" aria-hidden="true" />
                  <a
                    href="tel:+971501234567"
                    className="font-sans text-sm text-muted-light hover:text-rose-light transition-colors duration-200"
                  >
                    +971 50 123 4567
                  </a>
                </li>
                <li className="flex items-center gap-3">
                  <Mail className="w-4 h-4 text-rose-light flex-shrink-0" aria-hidden="true" />
                  <a
                    href="mailto:hello@lumieresalon.ae"
                    className="font-sans text-sm text-muted-light hover:text-rose-light transition-colors duration-200"
                  >
                    hello@lumieresalon.ae
                  </a>
                </li>
              </ul>

              {/* Hours */}
              <div>
                <h5 className="font-sans text-xs tracking-widest uppercase text-muted-light mb-3">
                  Opening Hours
                </h5>
                <div className="space-y-1.5">
                  <div className="flex justify-between text-sm font-sans">
                    <span className="text-muted-light">Mon – Fri</span>
                    <span className="text-warm-white">9 AM – 8 PM</span>
                  </div>
                  <div className="flex justify-between text-sm font-sans">
                    <span className="text-muted-light">Sat – Sun</span>
                    <span className="text-warm-white">10 AM – 7 PM</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          </div>
        </div>

        {/* ── Gold gradient divider ────────────────────────────── */}
        <div className="divider-gold opacity-20" aria-hidden="true" />

        {/* ── Bottom copyright bar ─────────────────────────────── */}
        <div className="container-luxury py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="font-sans text-xs text-muted-light">
            © {new Date().getFullYear()} Lumière Beauty Salon. All rights reserved.
          </p>
          <div className="flex items-center gap-5">
            <Link href="/faq" className="font-sans text-xs text-muted-light hover:text-rose-light transition-colors duration-200">FAQ</Link>
            <span className="text-muted-light/30">·</span>
            <Link href="/privacy" className="font-sans text-xs text-muted-light hover:text-rose-light transition-colors duration-200">Privacy Policy</Link>
            <span className="text-muted-light/30">·</span>
            <Link href="/terms" className="font-sans text-xs text-muted-light hover:text-rose-light transition-colors duration-200">Terms &amp; Conditions</Link>
          </div>
        </div>
      </footer>
    </>
  )
}
