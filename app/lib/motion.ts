import type { Transition } from "motion/react";

export const easeOutExpo: [number, number, number, number] = [0.22, 1, 0.36, 1];
export const easeInOutCubic: [number, number, number, number] = [0.65, 0, 0.35, 1];

export const cssEaseOutExpo = `cubic-bezier(${easeOutExpo.join(", ")})`;
export const cssEaseInOutCubic = `cubic-bezier(${easeInOutCubic.join(", ")})`;

export const gsapEaseOutExpo = "power3.out";
export const gsapEaseInOutCubic = "power2.inOut";

export const reveal: Transition = {
  duration: 0.8,
  ease: easeOutExpo,
};

export const pageTransition: Transition = {
  duration: 0.6,
  ease: easeInOutCubic,
};

export const revealViewport = { once: true, margin: "-15%" } as const;

export const revealUp = {
  initial: { opacity: 0, y: 40 },
  whileInView: { opacity: 1, y: 0 },
  viewport: revealViewport,
  transition: reveal,
} as const;

/**
 * Apple-style tile reveal. Cubic-bezier(0.4, 0, 0.6, 1) at 320ms,
 * matching the live transition spec extracted from apple.com.
 */
export const appleEase: [number, number, number, number] = [0.4, 0, 0.6, 1];

/**
 * Triggers on mount (not on scroll) — kinder to demo screenshots and
 * single-screen moodboard previews. We can swap to `whileInView` later
 * when the build is closer to real-traffic pages.
 */
export const tileReveal = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.32, ease: appleEase },
} as const;

