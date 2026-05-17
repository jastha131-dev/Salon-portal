import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Terms & Conditions',
  description: 'Terms and Conditions for Lumière Beauty Salon Dubai — booking policies, payments, and service terms.',
}

const sections = [
  {
    id: 'acceptance',
    title: 'Acceptance of Terms',
    content: `By booking an appointment, using our website, or engaging with our services, you agree to be bound by these Terms and Conditions. If you do not agree, please do not use our services.\n\nThese terms apply to all clients of Lumière Beauty Salon, whether booking online, by phone, via WhatsApp, or in person.`,
  },
  {
    id: 'booking',
    title: 'Booking & Appointments',
    content: `All appointments are subject to availability. A booking is confirmed only once you receive a confirmation message from us via WhatsApp, SMS, or email.\n\nWe reserve the right to decline or cancel a booking at our discretion. In such cases, we will notify you as soon as possible and offer an alternative time or a full refund if payment was made in advance.\n\nPlease arrive on time for your appointment. Arriving more than 15 minutes late may result in a shortened service or rescheduling to avoid inconvenience to other clients.`,
  },
  {
    id: 'cancellation',
    title: 'Cancellation & Rescheduling',
    content: `We kindly request at least 24 hours' notice for cancellations or rescheduling.\n\n• Cancellations with 24+ hours notice: No charge\n• Cancellations with less than 4 hours notice: A cancellation fee of up to 50% of the service price may apply\n• No-shows (no contact, no arrival): Full service price may be charged\n\nRepeated no-shows may result in a requirement to prepay future bookings.`,
  },
  {
    id: 'payments',
    title: 'Payments',
    content: `Payment is due at the time of service unless otherwise agreed. We accept cash, credit/debit card, and online payment.\n\nPrices displayed on our website are starting prices and may vary based on hair length, service complexity, or additional products used. Your stylist will confirm the final price before commencing the service.\n\nFor home service bookings, a travel surcharge may apply depending on your location.`,
  },
  {
    id: 'membership',
    title: 'Membership Plans',
    content: `Membership plans (Essential, Luxe, Royal) are personal and non-transferable unless gifted at the time of purchase.\n\nMonthly plans may be cancelled before the next billing date. Yearly plans are non-refundable but may be transferred to another person.\n\nUnused visits within a billing cycle do not roll over, except within a 3-day grace period after the billing date.\n\nLumière reserves the right to modify plan pricing or features with 30 days' written notice to members.`,
  },
  {
    id: 'homeservice',
    title: 'Home Service',
    content: `Home service is available in selected areas of Dubai. By booking a home service, you confirm that:\n\n• You are the resident or have permission to allow our team into the property\n• A suitable, clean, and well-lit space will be made available\n• An adult (18+) will be present throughout the service\n\nWe reserve the right to refuse or terminate a home service visit if the environment is deemed unsafe or unsuitable.`,
  },
  {
    id: 'health',
    title: 'Health & Allergy Disclaimer',
    content: `It is your responsibility to inform us of any allergies, skin conditions, medical conditions, or sensitivities before your appointment. Lumière is not liable for adverse reactions resulting from undisclosed conditions.\n\nWe strongly recommend a patch test 48 hours before any chemical colour or chemical treatment, especially for new clients.`,
  },
  {
    id: 'satisfaction',
    title: 'Satisfaction & Complaints',
    content: `Your satisfaction is our priority. If you are unhappy with any aspect of your service, please inform your stylist or our team immediately during your visit so we can address it.\n\nComplaints raised after leaving the salon will be reviewed on a case-by-case basis. We do not offer refunds for completed services unless there is a clear fault on our part.\n\nTo raise a complaint, please contact us at hello@lumieresalon.ae within 48 hours of your appointment.`,
  },
  {
    id: 'ip',
    title: 'Intellectual Property',
    content: `All content on this website — including text, images, logos, and design — is the property of Lumière Beauty Salon and is protected by copyright law. You may not reproduce, distribute, or use any content without our prior written permission.`,
  },
  {
    id: 'liability',
    title: 'Limitation of Liability',
    content: `Lumière Beauty Salon is not liable for any indirect, incidental, or consequential damages arising from the use of our services or website.\n\nOur total liability to any client shall not exceed the amount paid for the specific service in question.`,
  },
  {
    id: 'law',
    title: 'Governing Law',
    content: `These Terms and Conditions are governed by the laws of the United Arab Emirates. Any disputes shall be subject to the exclusive jurisdiction of the courts of Dubai, UAE.`,
  },
  {
    id: 'changes',
    title: 'Changes to These Terms',
    content: `We reserve the right to update these Terms and Conditions at any time. Changes will be posted on this page with an updated effective date. Continued use of our services after changes constitutes acceptance of the updated terms.`,
  },
]

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-charcoal pt-28 pb-24">
      <div className="container-luxury max-w-5xl">

        {/* Top bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-12 pb-6 border-b border-warm-white/15">
          <div>
            <p className="font-sans text-[10px] tracking-widest uppercase text-muted-light mb-2">Legal Document</p>
            <h1 className="font-playfair text-3xl md:text-5xl text-warm-white font-medium">
              Terms &amp; <em className="text-gold-accent not-italic">Conditions</em>
            </h1>
          </div>
          <div className="md:text-right shrink-0">
            <div className="inline-block border border-warm-white/10 px-5 py-3">
              <p className="font-sans text-xs text-muted-light">Effective: 1 January 2025</p>
              <p className="font-sans text-xs text-muted-light">Last updated: 1 June 2025</p>
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-12">

          {/* TOC */}
          <aside className="lg:w-52 shrink-0">
            <div className="lg:sticky lg:top-28">
              <p className="font-sans text-[10px] tracking-widest uppercase text-muted-light mb-4">Contents</p>
              <nav className="space-y-0.5">
                {sections.map((s, i) => (
                  <a key={s.id} href={`#${s.id}`}
                    className="flex items-center gap-3 font-sans text-xs text-muted-light hover:text-gold-accent transition-colors duration-200 py-2 border-l border-warm-white/8 hover:border-gold-accent pl-3 group">
                    <span className="text-[10px] text-muted-light/40 group-hover:text-gold-accent/60 transition-colors w-4 shrink-0">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    {s.title}
                  </a>
                ))}
              </nav>

              <div className="mt-8 pt-6 border-t border-warm-white/8">
                <p className="font-sans text-xs text-muted-light leading-relaxed mb-3">Questions about our terms?</p>
                <Link href="/contact" className="font-sans text-xs text-gold-accent hover:text-gold-light transition-colors underline underline-offset-4">
                  Contact us →
                </Link>
              </div>
            </div>
          </aside>

          {/* Content */}
          <div className="flex-1 space-y-0">
            <div className="border border-gold-accent/20 bg-gold-accent/5 px-6 py-4 mb-10">
              <p className="font-sans text-sm text-muted-light leading-relaxed">
                Please read these Terms and Conditions carefully before using our services. By booking an appointment or using our website, you agree to these terms in full.
              </p>
            </div>

            {sections.map((section, i) => (
              <div key={section.id} id={section.id}
                className="scroll-mt-28 border-b border-warm-white/6 py-8 group">
                <div className="flex items-start gap-5">
                  <span className="font-playfair text-4xl text-warm-white/8 font-medium leading-none shrink-0 group-hover:text-gold-accent/20 transition-colors duration-300 mt-1">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <div className="flex-1">
                    <h2 className="font-playfair text-lg text-warm-white font-medium mb-4 group-hover:text-gold-accent transition-colors duration-300">
                      {section.title}
                    </h2>
                    <p className="font-sans text-sm text-muted-light leading-relaxed whitespace-pre-line">{section.content}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
