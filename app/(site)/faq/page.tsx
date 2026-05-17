'use client'
import { useState } from 'react'
import Link from 'next/link'
import { motion, AnimatePresence } from 'framer-motion'
import { Plus, Minus } from 'lucide-react'

const faqs = [
  {
    category: 'Booking',
    items: [
      { q: 'How do I book an appointment?', a: 'You can book online through our website by clicking "Book Now", via WhatsApp at +971 50 123 4567, or by calling us directly. Online booking is available 24/7.' },
      { q: 'Can I walk in without an appointment?', a: 'Walk-ins are welcome subject to availability. However, we strongly recommend booking in advance — especially on weekends and public holidays — to guarantee your preferred time and stylist.' },
      { q: 'How far in advance should I book?', a: 'For regular services, 1–2 days in advance is usually sufficient. For bridal packages or specific stylists, we recommend booking at least 1–2 weeks ahead.' },
      { q: 'Can I request a specific stylist?', a: 'Absolutely. During booking you can choose your preferred team member. If they are unavailable, you can select "Any Available" and we will assign our best-suited specialist.' },
      { q: 'How do I cancel or reschedule?', a: 'Please contact us at least 24 hours before your appointment via WhatsApp or phone. Late cancellations under 4 hours may incur a small fee.' },
    ],
  },
  {
    category: 'Services',
    items: [
      { q: 'What services do you offer?', a: 'We offer a full range of luxury beauty services including hair (cuts, colour, treatments), nails (manicure, pedicure, nail art), makeup (bridal, editorial, everyday), spa & wellness, and home service visits.' },
      { q: 'Do you offer bridal packages?', a: 'Yes. We offer bespoke bridal packages covering hair, makeup, nails, and spa treatments. We recommend a trial session 2–4 weeks before your wedding day. Contact us to discuss your requirements.' },
      { q: 'How long do appointments typically take?', a: 'Duration varies by service. A blowdry takes around 45 minutes, a full colour 2–3 hours, and a bridal package can be 4–6 hours. Estimated durations are shown on each service listing.' },
      { q: 'Do you use professional-grade products?', a: 'Yes. We exclusively use internationally certified, professional-grade products. We can advise on products suitable for your hair or skin type during your visit.' },
    ],
  },
  {
    category: 'Home Service',
    items: [
      { q: 'Do you offer home service?', a: 'Yes! Our home service brings the Lumière experience directly to you. We cover Dubai Marina, JBR, JLT, Downtown Dubai, Palm Jumeirah, and surrounding areas.' },
      { q: 'Is there an extra charge for home service?', a: 'A home service surcharge applies depending on your location. This will be shown clearly during booking before you confirm.' },
      { q: 'What do I need to prepare for a home visit?', a: 'Just a clean, well-lit space with access to a power socket. Our team brings all equipment, products, and tools needed for your treatment.' },
    ],
  },
  {
    category: 'Payments',
    items: [
      { q: 'What payment methods do you accept?', a: 'We accept cash, credit/debit card on arrival, and online payment. Payment method can be selected during the booking process.' },
      { q: 'Are prices listed on the website final?', a: 'Prices shown are starting prices. Final pricing may vary based on hair length, complexity, or additional products used. Your stylist will confirm the final price before commencing the service.' },
      { q: 'Do you offer membership plans?', a: 'Yes! Our Essential, Luxe, and Royal membership plans offer significant savings and exclusive perks for regular clients. Visit our Plans page to learn more.' },
    ],
  },
  {
    category: 'Hygiene & Safety',
    items: [
      { q: 'What hygiene standards do you follow?', a: 'All tools are sterilised between every client. We use single-use items where applicable and follow strict UAE health and safety guidelines. Your wellbeing is our top priority.' },
      { q: 'Do you do patch tests for colour treatments?', a: 'Yes. We strongly recommend a patch test 48 hours before any chemical colour treatment, especially for new clients or those with sensitive skin. Please request this when booking.' },
    ],
  },
]

export default function FAQPage() {
  const [activeCategory, setActiveCategory] = useState('Booking')
  const [openIndex, setOpenIndex] = useState<number | null>(0)

  const current = faqs.find(f => f.category === activeCategory)!

  return (
    <div className="min-h-screen bg-charcoal pt-28 pb-24">
      <div className="container-luxury max-w-5xl">

        {/* Page title strip */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-12 pb-6 border-b border-warm-white/15">
          <div>
            <p className="font-cormorant italic text-rose-light text-base tracking-widest mb-1">Help Centre</p>
            <h1 className="font-playfair text-4xl md:text-5xl text-warm-white font-medium">Frequently Asked Questions</h1>
          </div>
          <div className="md:text-right">
            <p className="font-sans text-xs text-muted-light tracking-widest uppercase mb-1">Can&apos;t find an answer?</p>
            <Link href="/contact" className="font-sans text-sm text-rose-light hover:text-rose-primary transition-colors underline underline-offset-4">
              Contact us
            </Link>
          </div>
        </div>

        <div className="flex flex-col md:flex-row gap-10">

          {/* Category sidebar */}
          <aside className="md:w-48 shrink-0">
            <p className="font-sans text-[10px] tracking-widest uppercase text-muted-light mb-4">Categories</p>
            <nav className="flex flex-row md:flex-col gap-1 flex-wrap">
              {faqs.map(f => (
                <button
                  key={f.category}
                  onClick={() => { setActiveCategory(f.category); setOpenIndex(null) }}
                  className={`text-left px-4 py-2.5 font-sans text-sm transition-all duration-200 border-l-2 ${
                    activeCategory === f.category
                      ? 'border-rose-primary text-rose-light bg-rose-primary/10 font-medium'
                      : 'border-transparent text-muted-light hover:text-warm-white hover:border-warm-white/20'
                  }`}
                >
                  {f.category}
                </button>
              ))}
            </nav>

            <div className="hidden md:block mt-10 bg-[#16162a] border border-warm-white/8 p-5">
              <p className="font-playfair text-warm-white text-base mb-2">Still unsure?</p>
              <p className="font-sans text-xs text-muted-light leading-relaxed mb-4">Our team is happy to help with any question.</p>
              <a href="https://wa.me/971501234567" target="_blank" rel="noopener noreferrer"
                className="block text-center font-sans text-xs tracking-widest uppercase bg-rose-primary text-white px-4 py-2.5 hover:bg-rose-dark transition-colors">
                WhatsApp Us
              </a>
            </div>
          </aside>

          {/* Questions */}
          <div className="flex-1">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeCategory}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.25 }}
              >
                <p className="font-sans text-[10px] tracking-widest uppercase text-muted-light mb-5">
                  {current.items.length} questions in this category
                </p>
                <div className="space-y-2">
                  {current.items.map((item, i) => (
                    <div key={i} className="bg-[#16162a] border border-warm-white/8">
                      <button
                        onClick={() => setOpenIndex(openIndex === i ? null : i)}
                        className="w-full flex items-center justify-between px-6 py-5 text-left gap-4"
                      >
                        <span className="font-sans text-sm text-warm-white font-medium leading-snug">{item.q}</span>
                        <span className="shrink-0 w-7 h-7 rounded-full border border-warm-white/15 flex items-center justify-center text-rose-light">
                          {openIndex === i ? <Minus className="w-3.5 h-3.5" /> : <Plus className="w-3.5 h-3.5" />}
                        </span>
                      </button>
                      <AnimatePresence>
                        {openIndex === i && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.25 }}
                            className="overflow-hidden"
                          >
                            <div className="px-6 pb-5 border-t border-warm-white/6">
                              <p className="font-sans text-sm text-muted-light leading-relaxed pt-4">{item.a}</p>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  )
}
