'use client'

import { useEffect, useRef } from 'react'
import { useSpring, useMotionValueEvent } from 'motion/react'

type Props = {
  value: number
  /** receives the raw interpolated float — apply your own rounding/precision */
  format?: (n: number) => string
  /** spring config — defaults match the leasing UI's tactile feel */
  stiffness?: number
  damping?: number
  className?: string
}

const defaultFormat = (n: number) => Math.round(n).toLocaleString('en-US')

/**
 * Animates a number rolling from its current displayed value to a new value
 * by directly mutating textContent — never re-renders the parent.
 */
export function RollingNumber({
  value,
  format = defaultFormat,
  stiffness = 180,
  damping = 28,
  className,
}: Props) {
  const ref = useRef<HTMLSpanElement>(null)
  const spring = useSpring(value, { stiffness, damping })

  useEffect(() => {
    spring.set(value)
  }, [value, spring])

  useMotionValueEvent(spring, 'change', (latest) => {
    if (ref.current) {
      ref.current.textContent = format(latest)
    }
  })

  return (
    <span ref={ref} className={className}>
      {format(value)}
    </span>
  )
}
