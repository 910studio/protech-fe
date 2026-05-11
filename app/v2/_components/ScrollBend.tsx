'use client'

import { motion } from 'motion/react'
import { overscroll } from './SmoothScroll'

/**
 * Wraps the v2 <main> so the entire content area gets a rubber-band Y
 * offset when the user overscrolls past the top/bottom. The overscroll
 * MotionValue is driven by SmoothScroll — components don't re-render,
 * the transform happens on the compositor.
 */
export function ScrollBend({ children }: { children: React.ReactNode }) {
  return (
    <motion.main
      className="pt-14"
      style={{ y: overscroll, willChange: 'transform' }}
    >
      {children}
    </motion.main>
  )
}
