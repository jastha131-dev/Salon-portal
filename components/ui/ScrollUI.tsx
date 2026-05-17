'use client'
import { useEffect, useState } from 'react'
import { motion, useScroll, useSpring } from 'framer-motion'
import { ArrowUp } from 'lucide-react'

export function ScrollUI() {
  const [visible, setVisible] = useState(false)
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, { stiffness: 200, damping: 30 })

  useEffect(() => {
    const unsub = scrollYProgress.on('change', (v) => setVisible(v > 0.1))
    return unsub
  }, [scrollYProgress])

  return (
    <>
      {/* Scroll progress bar */}
      <motion.div
        style={{ scaleX, transformOrigin: 'left' }}
        className="fixed top-0 left-0 right-0 h-0.5 bg-rose-primary z-[200]"
      />

      {/* Back to top */}
      <motion.button
        initial={false}
        animate={{ opacity: visible ? 1 : 0, y: visible ? 0 : 16 }}
        transition={{ duration: 0.3 }}
        onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
        className="fixed bottom-8 right-8 z-[150] w-11 h-11 bg-rose-primary text-white flex items-center justify-center shadow-luxury hover:bg-rose-dark transition-colors duration-300 pointer-events-auto"
        aria-label="Back to top"
        style={{ pointerEvents: visible ? 'auto' : 'none' }}
      >
        <ArrowUp className="w-4 h-4" />
      </motion.button>
    </>
  )
}
