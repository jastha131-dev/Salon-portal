import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-screen bg-charcoal flex items-center justify-center relative overflow-hidden">
      {/* Ambient blobs */}
      <div className="absolute -top-40 -left-40 w-150 h-150 rounded-full bg-rose-primary/6 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-40 -right-40 w-125 h-125 rounded-full bg-gold-accent/5 blur-3xl pointer-events-none" />

      {/* Vertical rule lines */}
      <div className="absolute inset-0 pointer-events-none flex">
        {[1,2,3].map(i => <div key={i} className="flex-1 border-r border-warm-white/3" />)}
      </div>

      <div className="relative text-center px-6">
        {/* 404 number */}
        <p className="font-playfair text-[10rem] md:text-[14rem] font-medium leading-none text-warm-white/5 select-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
          404
        </p>

        <div className="relative z-10">
          <p className="font-cormorant italic text-rose-light text-xl md:text-2xl tracking-widest mb-5">
            Page Not Found
          </p>

          <h1 className="font-playfair text-4xl md:text-6xl font-medium text-warm-white mb-4 leading-tight">
            Oops — This Page<br />
            <em className="text-rose-light not-italic">Doesn&apos;t Exist</em>
          </h1>

          <div className="flex items-center justify-center gap-4 my-8">
            <div className="h-px w-16 bg-gold-accent opacity-60" />
            <span className="font-cormorant italic text-gold-accent text-lg tracking-widest">Lumière</span>
            <div className="h-px w-16 bg-gold-accent opacity-60" />
          </div>

          <p className="font-sans text-muted-light text-base max-w-md mx-auto leading-relaxed mb-10">
            The page you&apos;re looking for may have been moved, deleted, or never existed. Let us guide you back.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/"
              className="px-10 py-4 bg-rose-primary text-white font-sans text-sm tracking-widest uppercase hover:bg-rose-dark transition-all duration-300 hover:-translate-y-0.5 shadow-luxury"
            >
              Back to Home
            </Link>
            <Link
              href="/services"
              className="px-10 py-4 border border-warm-white/30 text-warm-white font-sans text-sm tracking-widest uppercase hover:bg-warm-white/10 transition-all duration-300"
            >
              View Services
            </Link>
            <Link
              href="/booking"
              className="px-10 py-4 border border-rose-primary/50 text-rose-light font-sans text-sm tracking-widest uppercase hover:bg-rose-primary/10 transition-all duration-300"
            >
              Book Now
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
