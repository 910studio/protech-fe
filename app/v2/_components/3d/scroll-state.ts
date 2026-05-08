import { motionValue } from 'motion/react'

/**
 * 0 = lid closed (top-down view), 1 = lid open + camera front-righted.
 * Set externally from a useScroll-driven motion value in the hero.
 */
export const openProgress = motionValue(0)
