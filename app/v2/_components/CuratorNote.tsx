'use client'

import * as motion from 'motion/react-client'
import { tileReveal } from '@/app/lib/motion'
import type { ReactNode } from 'react'

type Props = {
  kicker?: string
  title: ReactNode
  body: ReactNode
  signoff?: string
  delay?: number
}

export function CuratorNote({
  kicker = 'A note from the studio',
  title,
  body,
  signoff = 'Khatun · 910studio',
  delay = 0,
}: Props) {
  return (
    <motion.aside
      {...tileReveal}
      transition={{ ...tileReveal.transition, delay }}
      className="relative overflow-hidden rounded-[28px] bg-[var(--c-text)] p-10 text-white sm:rounded-[36px] sm:p-14 lg:rounded-[var(--r-tile)] lg:p-20"
    >
      <p className="flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.22em] text-white/60">
        <span aria-hidden className="h-px w-7 bg-white/40" />
        {kicker}
      </p>
      <h2
        className="mt-6 max-w-[18ch] text-[clamp(28px,3.6vw,48px)] font-semibold leading-[1.1]"
        style={{ letterSpacing: '-0.014em' }}
      >
        {title}
      </h2>
      <div className="mt-6 max-w-[58ch] text-[clamp(15px,1.1vw,18px)] leading-[1.55] text-white/75">
        {body}
      </div>
      <p className="mt-10 text-[12px] font-medium uppercase tracking-[0.2em] text-white/40">
        — {signoff}
      </p>
    </motion.aside>
  )
}
