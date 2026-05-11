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
      duration: 0.2,
      // Still near-instant but smaller per-frame deltas so the fixed-nav SVG
      // filter has less area to re-evaluate per frame.
      lerp: 0.85,
      wheelMultiplier: 1.35,
      smoothWheel: true,
      easing: (t) => 1 - Math.pow(1 - t, 3),
    })

    // GPU-promote the scroll container so the compositor (not the main
    // thread) handles paint while we scroll. Keeps the chromatic-aberration
    // glass nav cheap during big scroll bursts.
    const root = document.documentElement
    const prevWillChange = root.style.willChange
    root.style.willChange = 'scroll-position'

    let rafId = 0
    const raf = (time: number) => {
      lenis.raf(time)
      rafId = requestAnimationFrame(raf)
    }
    rafId = requestAnimationFrame(raf)

    return () => {
      cancelAnimationFrame(rafId)
      lenis.destroy()
      root.style.willChange = prevWillChange
    }
  }, [])

  return null
}
