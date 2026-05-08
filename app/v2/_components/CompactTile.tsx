'use client'

import * as motion from 'motion/react-client'
import Image from 'next/image'
import Link from 'next/link'
import { tileReveal } from '@/app/lib/motion'
import type { CSSProperties, ReactNode } from 'react'

type Theme = 'lilac' | 'mint' | 'peach' | 'cream' | 'sky' | 'coral' | 'sage' | 'butter' | 'tinted' | 'light' | 'dark'

const themeBg: Record<Theme, string> = {
  lilac:  'var(--pastel-lilac)',
  mint:   'var(--pastel-mint)',
  peach:  'var(--pastel-peach)',
  cream:  'var(--pastel-cream)',
  sky:    'var(--pastel-sky)',
  coral:  'var(--pastel-coral)',
  sage:   'var(--pastel-sage)',
  butter: 'var(--pastel-butter)',
  tinted: 'var(--c-bg-alt)',
  light:  'var(--c-bg-card)',
  dark:   '#0f0f12',
}

type Props = {
  brand: string
  title: ReactNode
  body?: ReactNode
  href: string
  image: string
  imageAlt: string
  imageW?: number
  imageH?: number
  /** image scale, generous defaults to fill the card. > 1 to bleed past edges. */
  imageScale?: number
  /** anchor — where the image sits inside the card */
  imageAnchor?: 'bottom-right' | 'bottom-center' | 'right-center'
  /** apply mix-blend-multiply when image has white bg to blend into pastel */
  imageMultiply?: boolean
  theme?: Theme
  delay?: number
}

export function CompactTile({
  brand,
  title,
  body,
  href,
  image,
  imageAlt,
  imageScale = 1.25,
  imageAnchor = 'bottom-right',
  imageMultiply = false,
  theme = 'lilac',
  delay = 0,
}: Props) {
  const isDark = theme === 'dark'

  // Image fills most of the card. Wrapper sized via inline style (no transform, so
  // mix-blend-multiply still sees the pastel backdrop through the stacking context).
  let imageWrapPos = ''
  let originX = 'right'
  let originY = 'bottom'
  let baseW = 60
  let baseH = 70
  if (imageAnchor === 'bottom-right') {
    imageWrapPos = 'absolute bottom-[-6%] right-[-8%]'
    originX = 'right'
    originY = 'bottom'
    baseW = 60
    baseH = 70
  } else if (imageAnchor === 'bottom-center') {
    imageWrapPos = 'absolute bottom-[-8%] left-1/2 -translate-x-1/2'
    originX = 'center'
    originY = 'bottom'
    baseW = 78
    baseH = 70
  } else {
    imageWrapPos = 'absolute right-[-8%] top-1/2 -translate-y-1/2'
    originX = 'right'
    originY = 'center'
    baseW = 60
    baseH = 80
  }
  const wrapWidthPct = Math.round(baseW * imageScale)
  const wrapHeightPct = Math.round(baseH * imageScale)

  return (
    <motion.article
      {...tileReveal}
      transition={{ ...tileReveal.transition, delay }}
      className={[
        'group relative flex min-h-[340px] flex-col justify-between overflow-hidden rounded-[28px] p-7 sm:rounded-[32px] sm:p-8 lg:min-h-[380px]',
        isDark ? 'text-white' : 'text-zinc-900',
      ].join(' ')}
      style={{ background: themeBg[theme] } as CSSProperties}
    >
      <header className="relative z-10 max-w-[55%]">
        <p
          className={[
            'text-[11px] font-semibold uppercase tracking-[0.18em]',
            isDark ? 'text-white/60' : 'text-zinc-800/80',
          ].join(' ')}
        >
          {brand}
        </p>
        <h3
          className="mt-2 max-w-[14ch] text-[clamp(20px,1.8vw,26px)] font-semibold leading-[1.05]"
          style={{ letterSpacing: '-0.014em' }}
        >
          {title}
        </h3>
        {body ? (
          <p
            className={[
              'mt-3 max-w-[22ch] text-[12px] leading-[1.5]',
              isDark ? 'text-white/65' : 'text-zinc-900/75',
            ].join(' ')}
          >
            {body}
          </p>
        ) : null}
      </header>

      <div className="relative z-10 mt-6">
        <Link
          href={href}
          className={[
            'inline-flex h-9 items-center text-[13px] font-semibold transition-colors duration-[320ms]',
            isDark ? 'text-white' : 'text-zinc-900 hover:text-zinc-700',
          ].join(' ')}
        >
          Configure
          <span aria-hidden className="ml-1.5 transition-transform duration-[320ms] group-hover:translate-x-0.5">→</span>
        </Link>
      </div>

      {/* OVERFLOWING IMAGE — sized directly (no transform) so mix-blend-multiply can see the pastel backdrop */}
      <div
        className={['pointer-events-none', imageWrapPos].join(' ')}
        style={{ width: `${wrapWidthPct}%`, height: `${wrapHeightPct}%` }}
      >
        <Image
          src={image}
          alt={imageAlt}
          fill
          sizes="(min-width: 1024px) 30vw, 80vw"
          loading="eager"
          className={['object-contain', imageMultiply ? 'mix-blend-multiply' : ''].join(' ')}
          style={{ objectPosition: `${originX} ${originY}` }}
        />
      </div>
    </motion.article>
  )
}
