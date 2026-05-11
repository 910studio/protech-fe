'use client'

import { useEffect, useRef, useState } from 'react'
import {
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
} from 'motion/react'
import { overscroll } from '../_components/SmoothScroll'

/**
 * Per-card Y morph.
 *
 *  • Spread (gap expands during scroll) + clash (collapse at rubber-band),
 *    clamped to ±15px so the effect stays subtle background motion.
 *  • Horizontal stagger: each card measures its center X against the
 *    viewport center on mount/resize. Center cards get a stiffer sustain
 *    spring (faster attack); cards further out get progressively looser
 *    springs. Visually: middle cards in a row react FIRST, side cards
 *    catch up a beat later.
 */
export function useCardBend<T extends HTMLElement = HTMLDivElement>() {
  const ref = useRef<T>(null)
  const [hPhase, setHPhase] = useState(0)

  useEffect(() => {
    if (!ref.current) return
    const measure = () => {
      const el = ref.current
      if (!el) return
      const rect = el.getBoundingClientRect()
      const cardCenter = rect.left + rect.width / 2
      const halfW = window.innerWidth / 2
      // 0 at viewport horizontal center, 1 at viewport edge
      setHPhase(clampN(Math.abs(cardCenter - halfW) / halfW, 0, 1))
    }
    measure()
    window.addEventListener('resize', measure)
    return () => window.removeEventListener('resize', measure)
  }, [])

  const { scrollY, scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })

  const rawVelocity = useVelocity(scrollY)

  // Spring stiffness modulated by horizontal position. Center cards get
  // the snappier values; edge cards get softer (longer attack = visual
  // lag behind the middle).
  const sustainedV = useSpring(rawVelocity, {
    stiffness: 180 - hPhase * 90,
    damping: 22,
    mass: 0.9,
  })

  const targetY = useTransform(() => {
    const v = sustainedV.get()
    const p = scrollYProgress.get()
    const o = overscroll.get()
    if (p <= 0 || p >= 1) return 0
    const dist = (p - 0.5) * 2
    const fade =
      clampN(p / 0.08, 0, 1) * clampN((1 - p) / 0.08, 0, 1)
    // Horizontal magnitude boost: center cards travel further than side
    // cards. 2.0× at viewport-X center, 0.5× at viewport edge.
    const hMult = 2.0 - hPhase * 1.5
    const spread = -dist * Math.abs(v) * 0.03 * fade * hMult
    const clash = dist * Math.abs(o) * 0.4 * fade * hMult
    return clampN(spread + clash, -30, 30)
  })

  const y = useSpring(targetY, {
    stiffness: 290 - hPhase * 140,
    damping: 16,
    mass: 0.4,
  })

  return { ref, y }
}

function clampN(v: number, min: number, max: number) {
  return v < min ? min : v > max ? max : v
}
