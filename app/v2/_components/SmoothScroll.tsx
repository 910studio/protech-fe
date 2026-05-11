'use client'

import { useEffect } from 'react'
import Lenis from 'lenis'
import 'lenis/dist/lenis.css'

/**
 * Subtle Lenis-driven inertia scroll. Light defaults — duration short and
 * lerp tight so the page feels assisted, not dragged.
 *
 * Mounted once at the top of the v2 layout. Touch devices are intentionally
 * NOT smoothed (the native scroll on iOS/Android is already great + Lenis
 * touch can fight the OS rubber-band).
 */
export function SmoothScroll() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 0.12,
      lerp: 0.95,
      wheelMultiplier: 2.1,
      smoothWheel: true,
      easing: (t) => 1 - Math.pow(1 - t, 3),
    })

    let rafId = 0
    const raf = (time: number) => {
      lenis.raf(time)
      rafId = requestAnimationFrame(raf)
    }
    rafId = requestAnimationFrame(raf)

    return () => {
      cancelAnimationFrame(rafId)
      lenis.destroy()
    }
  }, [])

  return null
}
