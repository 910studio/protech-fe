'use client'

import { createContext, useContext, useRef, type ReactNode } from 'react'
import {
  motion,
  useScroll,
  useSpring,
  useTransform,
  useVelocity,
  type MotionValue,
} from 'motion/react'

/**
 * Responsive snap rail with fluid horizontal scroll feel.
 *  • mobile / tablet: edge-to-edge horizontal snap-scroll strip
 *  • lg+: collapses into a CSS grid with the column count from `cols`
 *
 * The Rail tracks its own horizontal scroll velocity and broadcasts it via
 * RailScrollContext. RailItem children subscribe and apply a tiny skewY
 * lean in the direction of scroll — same fluid feel as the vertical
 * fluid-scroll pipeline, just on the X axis and scoped to this container.
 */

const RailScrollContext = createContext<MotionValue<number> | null>(null)

function useRailVelocity() {
  return useContext(RailScrollContext)
}

type RailProps = {
  children: ReactNode
  cols?: 2 | 3 | 4
  className?: string
}

const colClass: Record<2 | 3 | 4, string> = {
  2: 'lg:grid-cols-2',
  3: 'lg:grid-cols-3',
  4: 'lg:grid-cols-4',
}

export function Rail({ children, cols = 3, className = '' }: RailProps) {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollX } = useScroll({ container: ref })
  const rawV = useVelocity(scrollX)

  // Sustain — keeps the lean alive for ~250ms after the swipe ends, so
  // the spring settle is visible instead of snapping straight back.
  const sustainedV = useSpring(rawV, {
    stiffness: 140,
    damping: 24,
    mass: 0.9,
  })

  return (
    <RailScrollContext.Provider value={sustainedV}>
      <div
        ref={ref}
        className={[
          '-mx-5 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-3',
          'scroll-pl-5 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden',
          'lg:mx-0 lg:grid lg:gap-6 lg:overflow-visible lg:px-0 lg:pb-0',
          colClass[cols],
          className,
        ].join(' ')}
      >
        {children}
      </div>
    </RailScrollContext.Provider>
  )
}

type RailItemProps = {
  children: ReactNode
  size?: 'compact' | 'wide'
  className?: string
}

const widthClass: Record<'compact' | 'wide', string> = {
  compact: 'w-[78vw] max-w-[360px]',
  wide:    'w-[90vw] max-w-[440px]',
}

export function RailItem({
  children,
  size = 'compact',
  className = '',
}: RailItemProps) {
  const railV = useRailVelocity()
  const skewY = useTransform(() => {
    const v = railV?.get() ?? 0
    // Velocity is px/s of horizontal scroll. Negative skewY when scrolling
    // right makes the leading edge (right side) tilt up — reads as the
    // card "leaning into" the scroll.
    return clamp(-v * 0.0014, -3, 3)
  })

  return (
    <motion.div
      className={[
        widthClass[size],
        'snap-start shrink-0 lg:w-auto lg:max-w-none lg:shrink',
        className,
      ].join(' ')}
      style={{ skewY, willChange: 'transform' }}
    >
      {children}
    </motion.div>
  )
}

function clamp(v: number, min: number, max: number) {
  return v < min ? min : v > max ? max : v
}
