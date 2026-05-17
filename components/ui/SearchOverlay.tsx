'use client'
import { useState, useEffect, useRef, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'
import { Search, X, Scissors, Users, ArrowRight } from 'lucide-react'
import Link from 'next/link'

interface SearchResult {
  services: { _id: string; name: string; slug: { current: string }; price: number; duration?: string; category?: { name: string } }[]
  team:     { _id: string; name: string; role: string; slug?: { current: string } }[]
}

export function SearchOverlay({ open, onClose }: { open: boolean; onClose: () => void }) {
  const [query, setQuery]       = useState('')
  const [results, setResults]   = useState<SearchResult>({ services: [], team: [] })
  const [loading, setLoading]   = useState(false)
  const inputRef                = useRef<HTMLInputElement>(null)
  const router                  = useRouter()
  const debounceRef             = useRef<ReturnType<typeof setTimeout> | null>(null)

  useEffect(() => {
    if (open) { setTimeout(() => inputRef.current?.focus(), 100); setQuery(''); setResults({ services: [], team: [] }) }
  }, [open])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [onClose])

  const search = useCallback((q: string) => {
    if (debounceRef.current) clearTimeout(debounceRef.current)
    if (q.length < 2) { setResults({ services: [], team: [] }); return }
    debounceRef.current = setTimeout(async () => {
      setLoading(true)
      try {
        const res = await fetch(`/api/search?q=${encodeURIComponent(q)}`)
        const data = await res.json()
        setResults(data)
      } finally { setLoading(false) }
    }, 300)
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value)
    search(e.target.value)
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (query.trim()) { router.push(`/services?search=${encodeURIComponent(query)}`); onClose() }
  }

  const hasResults = results.services.length > 0 || results.team.length > 0
  const showEmpty  = query.length >= 2 && !loading && !hasResults

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-[200] bg-charcoal/80 backdrop-blur-sm"
          />

          {/* Panel */}
          <motion.div
            initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.25, ease: 'easeOut' }}
            className="fixed top-0 left-0 right-0 z-[201] bg-charcoal border-b border-warm-white/10"
          >
            {/* Search input */}
            <form onSubmit={handleSubmit} className="container-luxury py-6 flex items-center gap-4">
              <Search className="w-5 h-5 text-muted-light shrink-0" />
              <input
                ref={inputRef}
                value={query}
                onChange={handleChange}
                placeholder="Search services, treatments, team…"
                className="flex-1 bg-transparent font-playfair text-2xl text-warm-white placeholder:text-muted-light/40 focus:outline-none"
              />
              {loading && (
                <div className="w-5 h-5 border-2 border-rose-light/30 border-t-rose-light rounded-full animate-spin shrink-0" />
              )}
              <button type="button" onClick={onClose} aria-label="Close search"
                className="p-2 text-muted-light hover:text-warm-white transition-colors duration-200">
                <X className="w-5 h-5" />
              </button>
            </form>

            {/* Results */}
            <AnimatePresence>
              {(hasResults || showEmpty) && (
                <motion.div
                  initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                  className="container-luxury pb-8 max-h-[60vh] overflow-y-auto"
                >
                  {showEmpty && (
                    <p className="font-sans text-sm text-muted-light py-4">No results for &ldquo;{query}&rdquo;</p>
                  )}

                  {results.services.length > 0 && (
                    <div className="mb-6">
                      <div className="flex items-center gap-2 mb-3">
                        <Scissors className="w-3.5 h-3.5 text-muted-light" />
                        <p className="font-sans text-[10px] tracking-widest uppercase text-muted-light">Services</p>
                      </div>
                      <div className="space-y-1">
                        {results.services.map(s => (
                          <Link key={s._id} href={`/services/${s.slug?.current}`} onClick={onClose}
                            className="group flex items-center justify-between px-4 py-3 hover:bg-warm-white/5 transition-colors duration-150">
                            <div>
                              <p className="font-playfair text-warm-white group-hover:text-rose-light transition-colors duration-150">{s.name}</p>
                              <p className="font-sans text-xs text-muted-light">
                                {s.category?.name && `${s.category.name} · `}AED {s.price}{s.duration && ` · ${s.duration}`}
                              </p>
                            </div>
                            <ArrowRight className="w-4 h-4 text-muted-light opacity-0 group-hover:opacity-100 transition-opacity duration-150" />
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}

                  {results.team.length > 0 && (
                    <div>
                      <div className="flex items-center gap-2 mb-3">
                        <Users className="w-3.5 h-3.5 text-muted-light" />
                        <p className="font-sans text-[10px] tracking-widest uppercase text-muted-light">Team</p>
                      </div>
                      <div className="space-y-1">
                        {results.team.map(m => (
                          <Link key={m._id} href="/team" onClick={onClose}
                            className="group flex items-center justify-between px-4 py-3 hover:bg-warm-white/5 transition-colors duration-150">
                            <div>
                              <p className="font-playfair text-warm-white group-hover:text-rose-light transition-colors duration-150">{m.name}</p>
                              <p className="font-sans text-xs text-muted-light">{m.role}</p>
                            </div>
                            <ArrowRight className="w-4 h-4 text-muted-light opacity-0 group-hover:opacity-100 transition-opacity duration-150" />
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
