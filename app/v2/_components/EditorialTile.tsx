'use client'

import * as motion from 'motion/react-client'
import Link from 'next/link'
import Image from 'next/image'
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
  index?: string
  brand: string
  kicker?: string
  title: ReactNode
  body?: ReactNode
  primaryHref?: string
  primaryLabel?: string
  secondaryHref?: string
  secondaryLabel?: string
  image: string
  imageAlt: string
  /** intrinsic dimensions — currently ignored (image uses `fill`), but typed for caller convenience */
  imageW?: number
  imageH?: number
  imageSide?: 'left' | 'right'
  theme?: Theme
  /** image scale relative to its half (1.0 fits inside, > 1 bleeds past) */
  imageScale?: number
  /** horizontal anchor of the bleed image */
  imageAnchor?: 'edge' | 'center'
  /** apply mix-blend-multiply when image has a white background that needs to dissolve into the pastel */
  imageMultiply?: boolean
  /** extra horizontal bleed past the tile edge, in percent (default -10). Use larger negative values to push further off-edge. */
  imageBleedX?: number
  delay?: number
  size?: 'compact' | 'standard' | 'tall'
}

export function EditorialTile({
  index,
  brand,
  kicker,
  title,
  body,
  primaryHref,
  primaryLabel = 'Configure',
  secondaryHref,
  secondaryLabel = 'Buy',
  image,
  imageAlt,
  imageW,
  imageH,
  imageSide = 'right',
  theme = 'lilac',
  imageScale = 1.18,
  imageAnchor = 'edge',
  imageMultiply = false,
  imageBleedX = -10,
  delay = 0,
  size = 'standard',
}: Props) {
  const isDark = theme === 'dark'
  const sizeClass =
    size === 'compact'
      ? 'min-h-[400px]'
      : size === 'tall'
      ? 'min-h-[640px] lg:min-h-[760px]'
      : 'min-h-[480px] lg:min-h-[540px]'

  return (
    <motion.article
      {...tileReveal}
      transition={{ ...tileReveal.transition, delay }}
      className={[
        'group relative grid overflow-hidden rounded-[28px] sm:rounded-[36px] lg:rounded-[var(--r-tile)]',
        'grid-cols-1 lg:grid-cols-2',
        sizeClass,
        isDark ? 'text-white' : 'text-zinc-900',
      ].join(' ')}
      style={{ background: themeBg[theme] } as CSSProperties}
    >
      {/* COPY */}
      <div
        className={[
          'relative z-10 flex flex-col justify-between gap-8 p-8 sm:p-10 lg:p-14',
          imageSide === 'left' ? 'lg:order-2' : '',
        ].join(' ')}
      >
        <header>
          {(index || kicker) && (
            <p
              className={[
                'flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.2em]',
                isDark ? 'text-white/60' : 'text-zinc-700/70',
              ].join(' ')}
            >
              {index ? <span>{index}</span> : null}
              {kicker ? <span aria-hidden className="h-px w-5 bg-current opacity-40" /> : null}
              {kicker ? <span>{kicker}</span> : null}
            </p>
          )}
          <p
            className={[
              'mt-5 text-[12px] font-semibold tracking-[0.18em]',
              isDark ? 'text-white/70' : 'text-zinc-800/80',
            ].join(' ')}
          >
            {brand}
          </p>
          <h2
            className="mt-2 font-semibold leading-[0.98] text-[clamp(34px,4.4vw,60px)]"
            style={{ letterSpacing: '-0.022em' }}
          >
            {title}
          </h2>
          {body ? (
            <p
              className={[
                'mt-5 max-w-[40ch] text-[clamp(15px,1.1vw,17px)] leading-[1.5]',
                isDark ? 'text-white/70' : 'text-zinc-800/85',
              ].join(' ')}
            >
              {body}
            </p>
          ) : null}
        </header>

        {(primaryHref || secondaryHref) && (
          <div className="flex flex-wrap items-center gap-3">
            {primaryHref ? (
              <Link
                href={primaryHref}
                className="inline-flex h-10 items-center rounded-full bg-zinc-900 px-5 text-[14px] font-medium !text-white transition-colors duration-[320ms] hover:bg-zinc-700"
              >
                {primaryLabel}
              </Link>
            ) : null}
            {secondaryHref ? (
              <Link
                href={secondaryHref}
                className={[
                  'inline-flex h-10 items-center text-[14px] font-medium transition-colors duration-[320ms]',
                  isDark ? 'text-white hover:text-white/80' : 'text-zinc-900 hover:text-zinc-600',
                ].join(' ')}
              >
                {secondaryLabel}
                <span aria-hidden className="ml-1">›</span>
              </Link>
            ) : null}
          </div>
        )}
      </div>

      {/* IMAGE — sized directly (no transform) so mix-blend-multiply sees the pastel through */}
      <div
        className={[
          'relative min-h-[280px] lg:min-h-0',
          imageSide === 'left' ? 'lg:order-1' : '',
        ].join(' ')}
      >
        <div
          className="absolute inset-y-[-6%]"
          style={{
            width: `${Math.round(imageScale * 100)}%`,
            ...(imageSide === 'right'
              ? { right: `${imageBleedX}%`, left: 'auto' }
              : { left: `${imageBleedX}%`, right: 'auto' }),
          }}
        >
          <Image
            src={image}
            alt={imageAlt}
            fill
            sizes="(min-width: 1024px) 50vw, 100vw"
            loading="eager"
            className={['object-contain', imageMultiply ? 'mix-blend-multiply' : ''].join(' ')}
            style={{
              objectPosition:
                imageSide === 'right' ? 'center right' : 'center left',
            }}
          />
        </div>
      </div>
    </motion.article>
  )
}
