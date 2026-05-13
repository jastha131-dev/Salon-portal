import type { Metadata } from 'next'
import Image from 'next/image'
const InstagramIcon = () => (
  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
)
const FacebookIcon = () => (
  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
)
import { PageHero } from '@/components/layout/PageHero'
import { FadeIn } from '@/components/animations/FadeIn'
import { StaggerContainer, StaggerItem } from '@/components/animations/StaggerContainer'
import { Badge } from '@/components/ui/Badge'
import { getTeam } from '@/lib/api/fetchers'
import { urlFor } from '@/lib/sanity/image'

export const metadata: Metadata = {
  title: 'Our Team',
  description: 'Meet the talented stylists and beauty experts at Lumière Salon Dubai.',
}

export const revalidate = 3600

const fallbackTeam = [
  { _id: '1', name: 'Nour Al Zahra', role: 'Senior Hair Stylist', expertise: ['Balayage', 'Keratin', 'Bridal'], image: null, socialLinks: {} },
  { _id: '2', name: 'Priya Mehta', role: 'Nail Artist', expertise: ['Gel Nails', 'Nail Art', 'Pedicure'], image: null, socialLinks: {} },
  { _id: '3', name: 'Sofia Rossi', role: 'Makeup Artist', expertise: ['Bridal Makeup', 'Editorial', 'Airbrush'], image: null, socialLinks: {} },
  { _id: '4', name: 'Aisha Rahman', role: 'Spa Therapist', expertise: ['Massage', 'Facials', 'Aromatherapy'], image: null, socialLinks: {} },
  { _id: '5', name: 'Maria Santos', role: 'Colorist', expertise: ['Color Correction', 'Highlights', 'Toning'], image: null, socialLinks: {} },
  { _id: '6', name: 'Lena Kowalski', role: 'Beauty Therapist', expertise: ['Waxing', 'Lashes', 'Brows'], image: null, socialLinks: {} },
]

export default async function TeamPage() {
  const team = await getTeam()
  const displayTeam = team.length > 0 ? team : fallbackTeam

  return (
    <>
      <PageHero
        eyebrow="The Experts"
        title="Meet Our Dream Team"
        subtitle="Handpicked for their passion, skill, and artistry — our team is dedicated to making you look and feel extraordinary."
        dark
      />

      <section className="py-20 md:py-28 bg-cream-bg">
        <div className="container-luxury">
          <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {displayTeam.map((member: any) => {
              const imageUrl = member.image?.asset
                ? urlFor(member.image).width(400).height(500).url()
                : null
              const initials = member.name.split(' ').map((n: string) => n[0]).join('').toUpperCase().slice(0, 2)

              return (
                <StaggerItem key={member._id}>
                  <div className="group bg-warm-white overflow-hidden">
                    {/* Photo */}
                    <div className="relative h-72 overflow-hidden">
                      {imageUrl ? (
                        <Image src={imageUrl} alt={member.name} fill className="object-cover object-top group-hover:scale-105 transition-transform duration-500" />
                      ) : (
                        <div className="w-full h-full bg-gradient-to-br from-rose-light/30 to-gold-light/20 flex items-center justify-center">
                          <span className="font-playfair text-5xl text-rose-primary/40 font-medium">{initials}</span>
                        </div>
                      )}
                      {/* Social overlay */}
                      {(member.socialLinks?.instagram || member.socialLinks?.facebook || member.socialLinks?.tiktok) && (
                        <div className="absolute inset-0 bg-charcoal/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
                          {member.socialLinks?.instagram && (
                            <a href={member.socialLinks.instagram} target="_blank" rel="noopener noreferrer" className="w-10 h-10 border border-warm-white/50 flex items-center justify-center text-warm-white hover:bg-rose-primary hover:border-rose-primary transition-colors">
                              <InstagramIcon />
                            </a>
                          )}
                          {member.socialLinks?.facebook && (
                            <a href={member.socialLinks.facebook} target="_blank" rel="noopener noreferrer" className="w-10 h-10 border border-warm-white/50 flex items-center justify-center text-warm-white hover:bg-rose-primary hover:border-rose-primary transition-colors">
                              <FacebookIcon />
                            </a>
                          )}
                          {member.socialLinks?.tiktok && (
                            <a href={member.socialLinks.tiktok} target="_blank" rel="noopener noreferrer" className="w-10 h-10 border border-warm-white/50 flex items-center justify-center text-warm-white hover:bg-rose-primary hover:border-rose-primary transition-colors">
                              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.32 6.32 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.27 8.27 0 0 0 4.84 1.55V6.79a4.85 4.85 0 0 1-1.07-.1z"/></svg>
                            </a>
                          )}
                        </div>
                      )}
                    </div>
                    {/* Info */}
                    <div className="p-6">
                      <h3 className="font-playfair text-xl text-charcoal mb-1">{member.name}</h3>
                      <p className="font-cormorant italic text-rose-primary text-base mb-3">{member.role}</p>
                      {member.expertise?.length > 0 && (
                        <div className="flex flex-wrap gap-1.5">
                          {member.expertise.slice(0, 4).map((skill: string) => (
                            <Badge key={skill} variant="light">{skill}</Badge>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </StaggerItem>
              )
            })}
          </StaggerContainer>
        </div>
      </section>

      {/* Join CTA */}
      <section className="py-16 bg-rose-primary text-center">
        <div className="container-luxury">
          <FadeIn>
            <h2 className="font-playfair text-3xl text-warm-white mb-3">Passionate About Beauty?</h2>
            <p className="font-sans text-warm-white/80 mb-6">We're always looking for talented individuals to join the Lumière family.</p>
            <a href="mailto:careers@lumieresalon.ae" className="inline-flex px-8 py-3.5 border border-warm-white text-warm-white font-sans text-sm tracking-widest uppercase hover:bg-warm-white hover:text-rose-primary transition-colors duration-300">
              Join Our Team
            </a>
          </FadeIn>
        </div>
      </section>
    </>
  )
}
