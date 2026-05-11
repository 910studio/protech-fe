'use client'

import { useEffect } from 'react'
import { motionValue } from 'motion/react'
import Lenis from 'lenis'
import 'lenis/dist/lenis.css'

/**
 * Shared scroll signals — components subscribe with `useTransform` so they
 * read live values without triggering React re-renders per frame.
 *
 *  scrollVelocity   px/s, signed. Positive = scrolling down.
 *  scrollEnergy     |px/s|, peak-follower. Snaps up to match the raw
 *                   velocity peak then decays exponentially — gives the
 *                   bend effect a ~400ms wake after the user stops.
 *  scrollDirection  -1 / 0 / +1, sign of recent travel. Held during the
 *                   wake so skew etc. stays consistent after release.
 *  overscroll       px, signed. Rubber-band offset when user pushes past
 *                   the top/bottom of the document.
 */
export const scrollVelocity = motionValue(0)
export const scrollEnergy = motionValue(0)
export const scrollDirection = motionValue(0)
export const overscroll = motionValue(0)

export function SmoothScroll() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 0.2,
      lerp: 0.85,
      wheelMultiplier: 1.35,
      smoothWheel: true,
      easing: (t) => 1 - Math.pow(1 - t, 3),
    })

    const root = document.documentElement
    const prevWillChange = root.style.willChange
    root.style.willChange = 'scroll-position'

    // Pump scroll velocity into the shared MotionValue.
    lenis.on('scroll', ({ velocity }: { velocity: number }) => {
      scrollVelocity.set(velocity)
      if (Math.abs(velocity) > 30) {
        scrollDirection.set(velocity > 0 ? 1 : -1)
      }
    })

    // Peak-follower energy: snaps up to match velocity bursts, then decays
    // exponentially. Holds visual energy for ~400ms after the user stops
    // so the card bend has time to actually be SEEN before settling.
    const ENERGY_DECAY = 0.93
    const tickEnergy = () => {
      const raw = Math.abs(scrollVelocity.get())
      const cur = scrollEnergy.get()
      if (raw > cur) {
        scrollEnergy.set(raw)
      } else if (cur > 1) {
        scrollEnergy.set(cur * ENERGY_DECAY)
      } else if (cur !== 0) {
        scrollEnergy.set(0)
        scrollDirection.set(0)
      }
    }

    /* ---------- rubber-band overscroll ---------- */
    // When at top/bottom and user keeps pushing the wheel, accumulate a
    // diminishing "bend" offset that springs back when input stops.
    const MAX_BAND = 90 // px
    const DECAY = 0.82 // per-frame exponential decay back to 0
    const PULL = 0.18 // how much of each overshoot delta to keep

    const handleWheel = (e: WheelEvent) => {
      const limit =
        (lenis as unknown as { limit: number }).limit ??
        document.documentElement.scrollHeight - window.innerHeight
      const scroll = (lenis as unknown as { scroll: number }).scroll ?? 0
      const atTop = scroll <= 0.5
      const atBottom = scroll >= limit - 0.5
      const dy = e.deltaY
      if ((atTop && dy < 0) || (atBottom && dy > 0)) {
        const next = overscroll.get() - dy * PULL
        overscroll.set(Math.max(-MAX_BAND, Math.min(MAX_BAND, next)))
      }
    }

    let bandRaf = 0
    const tickBand = () => {
      const v = overscroll.get()
      if (Math.abs(v) > 0.15) {
        overscroll.set(v * DECAY)
      } else if (v !== 0) {
        overscroll.set(0)
      }
      bandRaf = requestAnimationFrame(tickBand)
    }
    bandRaf = requestAnimationFrame(tickBand)

    window.addEventListener('wheel', handleWheel, { passive: true })

    /* ---------- lenis raf loop ---------- */
    let rafId = 0
    const raf = (time: number) => {
      lenis.raf(time)
      tickEnergy()
      rafId = requestAnimationFrame(raf)
    }
    rafId = requestAnimationFrame(raf)

    return () => {
      window.removeEventListener('wheel', handleWheel)
      cancelAnimationFrame(rafId)
      cancelAnimationFrame(bandRaf)
      lenis.destroy()
      root.style.willChange = prevWillChange
      scrollVelocity.set(0)
      scrollEnergy.set(0)
      scrollDirection.set(0)
      overscroll.set(0)
    }
  }, [])

  return null
}
