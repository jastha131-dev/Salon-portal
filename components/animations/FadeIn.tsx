'use client'
import { motion, MotionProps } from 'framer-motion'
import { ReactNode } from 'react'

interface FadeInProps extends MotionProps {
  children: ReactNode
  delay?: number
  duration?: number
  className?: string
  direction?: 'up' | 'down' | 'left' | 'right' | 'none'
}

export function FadeIn({
  children,
  delay = 0,
  duration = 0.6,
  className,
  direction = 'up',
  ...props
}: FadeInProps) {
  const directionOffset: Record<string, { y?: number; x?: number }> = {
    up:    { y: 24 },
    down:  { y: -24 },
    left:  { x: 24 },
    right: { x: -24 },
    none:  {},
  }

  return (
    <motion.div
      initial={{ opacity: 0, ...directionOffset[direction] }}
      whileInView={{ opacity: 1, y: 0, x: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration, delay, ease: [0.25, 0.1, 0.25, 1] }}
      className={className}
      {...props}
    >
      {children}
    </motion.div>
  )
}
