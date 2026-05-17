import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Privacy Policy for Lumière Beauty Salon Dubai — how we collect, use, and protect your personal data.',
}

const sections = [
  {
    id: 'information',
    title: 'Information We Collect',
    content: `When you book an appointment or contact us, we may collect the following personal information:\n\n• Full name\n• Phone number and WhatsApp number\n• Email address\n• Home address (for home service bookings only)\n• Service preferences and booking history\n• Payment method (we do not store card details)\n\nWe collect this information only when you voluntarily provide it through our booking form, contact form, or direct communication.`,
  },
  {
    id: 'usage',
    title: 'How We Use Your Information',
    content: `We use your personal information solely to:\n\n• Confirm and manage your appointments\n• Send booking reminders and follow-ups\n• Provide home service at your requested address\n• Respond to your enquiries and support requests\n• Improve our services based on feedback\n• Send promotional offers (only if you have opted in)\n\nWe will never use your data for any purpose beyond what is listed above without your explicit consent.`,
  },
  {
    id: 'sharing',
    title: 'Data Sharing',
    content: `We do not sell, rent, or trade your personal information to any third parties.\n\nYour data may be shared only in the following limited circumstances:\n\n• With our internal team members to fulfil your booking\n• With payment processors to complete transactions\n• If required by UAE law or a valid legal request\n\nWe do not share your data with marketing agencies or external advertisers.`,
  },
  {
    id: 'storage',
    title: 'Data Storage & Security',
    content: `Your data is stored securely using industry-standard encryption and access controls. We use Sanity CMS as our data platform, which complies with international data security standards.\n\nWe retain your booking data for up to 2 years for service history purposes. You may request deletion of your data at any time by contacting us.`,
  },
  {
    id: 'cookies',
    title: 'Cookies',
    content: `Our website uses essential cookies to ensure the site functions correctly. We do not use tracking or advertising cookies.\n\nYou can disable cookies in your browser settings at any time, though this may affect certain website functionality.`,
  },
  {
    id: 'rights',
    title: 'Your Rights',
    content: `You have the right to:\n\n• Access the personal data we hold about you\n• Request correction of inaccurate data\n• Request deletion of your data\n• Withdraw consent for marketing communications at any time\n• Lodge a complaint with the relevant data protection authority\n\nTo exercise any of these rights, please contact us at hello@lumieresalon.ae.`,
  },
  {
    id: 'whatsapp',
    title: 'WhatsApp & Communications',
    content: `By providing your phone number, you consent to receiving booking confirmations and reminders via WhatsApp or SMS. You may opt out of these communications at any time by replying "STOP" or contacting us directly.`,
  },
  {
    id: 'changes',
    title: 'Changes to This Policy',
    content: `We may update this Privacy Policy from time to time. Any changes will be posted on this page with an updated effective date. We encourage you to review this policy periodically.`,
  },
  {
    id: 'contact',
    title: 'Contact Us',
    content: `If you have any questions about this Privacy Policy or how we handle your data, please contact us:\n\nEmail: hello@lumieresalon.ae\nPhone: +971 50 123 4567\nAddress: Dubai Marina Mall, Level 2, Dubai Marina, Dubai, UAE`,
  },
]

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-charcoal pt-28 pb-24">
      <div className="container-luxury max-w-5xl">

        {/* Top bar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-12 pb-6 border-b border-warm-white/15">
          <div>
            <p className="font-sans text-[10px] tracking-widest uppercase text-muted-light mb-2">Legal Document</p>
            <h1 className="font-playfair text-3xl md:text-5xl text-warm-white font-medium">
              Privacy <em className="text-rose-light not-italic">Policy</em>
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

          {/* Sticky TOC */}
          <aside className="lg:w-52 shrink-0">
            <div className="lg:sticky lg:top-28">
              <p className="font-sans text-[10px] tracking-widest uppercase text-muted-light mb-4">Contents</p>
              <nav className="space-y-0.5">
                {sections.map((s, i) => (
                  <a key={s.id} href={`#${s.id}`}
                    className="flex items-center gap-3 font-sans text-xs text-muted-light hover:text-rose-light transition-colors duration-200 py-2 border-l border-warm-white/8 hover:border-rose-primary pl-3 group">
                    <span className="text-[10px] text-muted-light/40 group-hover:text-rose-light/60 transition-colors w-4 shrink-0">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    {s.title}
                  </a>
                ))}
              </nav>

              <div className="mt-8 pt-6 border-t border-warm-white/8">
                <p className="font-sans text-xs text-muted-light leading-relaxed mb-3">Questions about your data?</p>
                <Link href="/contact" className="font-sans text-xs text-rose-light hover:text-rose-primary transition-colors underline underline-offset-4">
                  Contact us →
                </Link>
              </div>
            </div>
          </aside>

          {/* Content */}
          <div className="flex-1 space-y-0">
            <div className="border border-rose-primary/20 bg-rose-primary/5 px-6 py-4 mb-10">
              <p className="font-sans text-sm text-muted-light leading-relaxed">
                At Lumière Beauty Salon, we are committed to protecting your privacy and handling your personal data with transparency and care.
              </p>
            </div>

            {sections.map((section, i) => (
              <div key={section.id} id={section.id}
                className="scroll-mt-28 border-b border-warm-white/6 py-8 group">
                <div className="flex items-start gap-5">
                  <span className="font-playfair text-4xl text-warm-white/8 font-medium leading-none shrink-0 group-hover:text-rose-primary/20 transition-colors duration-300 mt-1">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                  <div className="flex-1">
                    <h2 className="font-playfair text-lg text-warm-white font-medium mb-4 group-hover:text-rose-light transition-colors duration-300">
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
