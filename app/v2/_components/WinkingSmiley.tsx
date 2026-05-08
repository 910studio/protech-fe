'use client'

import { useEffect, useState } from 'react'

type Props = {
  size?: number
  className?: string
  /** ms between winks */
  interval?: number
}

/**
 * Smiley that winks every few seconds. Pure SVG, no deps.
 * Right eye does a quick blink; left eye stays open.
 */
export function WinkingSmiley({ size = 22, className = '', interval = 4200 }: Props) {
  const [winking, setWinking] = useState(false)

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>

    const schedule = () => {
      timeout = setTimeout(() => {
        setWinking(true)
        setTimeout(() => setWinking(false), 240)
        schedule()
      }, interval)
    }
    schedule()
    return () => clearTimeout(timeout)
  }, [interval])

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
      className={className}
    >
      {/* face */}
      <circle cx="12" cy="12" r="11" fill="var(--c-accent)" />
      {/* left eye — always open */}
      <circle cx="8.5" cy="10" r="1.4" fill="white" />
      {/* right eye — winks (closed = horizontal line, open = dot) */}
      {winking ? (
        <line
          x1="13.5"
          y1="10"
          x2="17"
          y2="10"
          stroke="white"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
      ) : (
        <circle cx="15.5" cy="10" r="1.4" fill="white" />
      )}
      {/* smile */}
      <path
        d="M 7.5 14.2 Q 12 17.4, 16.5 14.2"
        stroke="white"
        strokeWidth="1.7"
        strokeLinecap="round"
        fill="none"
      />
    </svg>
  )
}
