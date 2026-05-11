'use client'

import { motion, useScroll, useSpring, useTransform, useVelocity } from 'motion/react'

/**
 * Viewport-fixed hourglass pinch.
 *
 * Two `position: fixed` wedges sit at the left/right edges of the viewport
 * below the nav. They're filled with the page background colour, so at
 * rest (wedge width = 0) they're invisible. As scroll velocity rises,
 * each wedge extends a triangular point inward toward viewport-center-Y
 * — visually "eating" into whatever content is scrolling past at that
 * horizontal band.
 *
 * Because the wedges are viewport-fixed, the pinch happens in screen
 * space (not per-card). Cards scroll under the pinch and get
 * progressively clipped — that's the hourglass silhouette Gray wants on
 * the WHOLE container, not on individual cards.
 *
 * Wedge depth caps at min(80px, 6vw) so the effect scales sanely from
 * mobile (small viewport, can't afford a huge pinch) to wide screens.
 */
const clamp = (v: number, min: number, max: number) =>
  v < min ? min : v > max ? max : v

export function HourglassPinch() {
  const { scrollY } = useScroll()
  const rawV = useVelocity(scrollY)
  const sustainedV = useSpring(rawV, {
    stiffness: 110,
    damping: 22,
    mass: 1.2,
  })

  // Velocity → pinch depth. Threshold gate: below ~1800 px/s the pinch is
  // zero — you have to actually flick the wheel to trigger it. Above that
  // the depth ramps steeply so the effect comes in as a punch, not a slow
  // creep.
  // Bottom-fade: depth drops to 0 in the last ~400px of scroll so the
  // apex never appears past the bottom-most card / over the footer.
  const VELOCITY_THRESHOLD = 1800
  const targetDepth = useTransform(() => {
    const v = sustainedV.get()
    const y = scrollY.get()

    // Fade out near both ends of scroll — no pinch over the hero (top)
    // and no pinch over the footer / past the last card (bottom).
    let edgeFade = 1
    if (typeof document !== 'undefined') {
      const maxY =
        document.documentElement.scrollHeight - window.innerHeight
      const remaining = maxY - y
      const bottomFade = clamp((remaining - 100) / 400, 0, 1)
      const topFade = clamp((y - 100) / 400, 0, 1)
      edgeFade = Math.min(topFade, bottomFade)
    }

    const cap = typeof window !== 'undefined'
      ? Math.min(90, window.innerWidth * 0.06)
      : 90
    const excess = Math.max(0, Math.abs(v) - VELOCITY_THRESHOLD)
    return Math.min(cap, excess * 0.09) * edgeFade
  })
  // Snappy spring — fast attack, even faster retract.
  const depth = useSpring(targetDepth, {
    stiffness: 320,
    damping: 18,
    mass: 0.45,
  })

  // Smooth sine curve along the inner edge — 0 at top & bottom corners,
  // max depth at center-Y. Reads as a soft lens-shaped bite, not a
  // triangle.
  const CURVE_SEGMENTS = 14
  const leftClip = useTransform(depth, (d) => {
    const pts: string[] = ['0 0']
    for (let i = 1; i < CURVE_SEGMENTS; i++) {
      const t = i / CURVE_SEGMENTS
      const x = d * Math.sin(t * Math.PI)
      pts.push(`${x.toFixed(2)}px ${(t * 100).toFixed(2)}%`)
    }
    pts.push('0 100%')
    return `polygon(${pts.join(', ')})`
  })
  const rightClip = useTransform(depth, (d) => {
    const pts: string[] = ['100% 0']
    for (let i = 1; i < CURVE_SEGMENTS; i++) {
      const t = i / CURVE_SEGMENTS
      const x = d * Math.sin(t * Math.PI)
      pts.push(`calc(100% - ${x.toFixed(2)}px) ${(t * 100).toFixed(2)}%`)
    }
    pts.push('100% 100%')
    return `polygon(${pts.join(', ')})`
  })

  return (
    <>
      <motion.div
        aria-hidden
        className="pointer-events-none fixed inset-y-0 left-0 z-40 w-[80px] bg-[var(--c-bg)] sm:w-[100px]"
        style={{ clipPath: leftClip, willChange: 'clip-path' }}
      />
      <motion.div
        aria-hidden
        className="pointer-events-none fixed bottom-0 right-0 top-14 z-40 w-[80px] bg-[var(--c-bg)] sm:w-[100px]"
        style={{ clipPath: rightClip, willChange: 'clip-path' }}
      />
    </>
  )
}
