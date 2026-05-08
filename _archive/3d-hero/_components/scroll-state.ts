import { motionValue } from 'motion/react'

// Shared scroll-driven values. Producer: HeroSection (via useScroll).
// Consumers: HeroLaptop (rotation + position), any other scene element.
// Module-level so we don't push non-serializable MotionValue props across
// "use client" boundaries (Next 16 flags those).

export const openProgress = motionValue(0)       // 0 = lid closed, 1 = lid open
export const shiftProgress = motionValue(0)      // 0 = centered, 1 = shifted to left half
export const portFocusProgress = motionValue(0)  // 0 = front-on, 1 = rotated to show side ports
