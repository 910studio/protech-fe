'use client'

import * as motion from 'motion/react-client'
import Link from 'next/link'
import { tileReveal } from '@/app/lib/motion'
import type { CSSProperties, ReactNode } from 'react'

type TileTheme = 'light' | 'dark' | 'tinted'

type TileProps = {
  eyebrow?: string
  title: ReactNode
  subtitle?: ReactNode
  primaryHref?: string
  primaryLabel?: string
  secondaryHref?: string
  secondaryLabel?: string
  theme?: TileTheme
  /** scroll-reveal stagger delay in seconds (Apple uses ~0.08s between tiles) */
  delay?: number
  /** background expression — gradient/image string */
  background?: string
  /** product visual placed in the bottom area; rendered AFTER copy */
  children?: ReactNode
  className?: string
  /** Tile spans full width when true (taller, bigger title) */
  full?: boolean
}

const themeBase: Record<TileTheme, string> = {
  light: 'bg-[var(--c-bg-card)] text-[var(--c-text)]',
  tinted: 'bg-[var(--c-bg-alt)] text-[var(--c-text)]',
  dark: 'bg-zinc-900 text-white',
}

export function Tile({
  eyebrow,
  title,
  subtitle,
  primaryHref,
  primaryLabel = 'Learn more',
  secondaryHref,
  secondaryLabel = 'Buy',
  theme = 'tinted',
  delay = 0,
  background,
  children,
  className = '',
  full = false,
}: TileProps) {
  const isDark = theme === 'dark'

  return (
    <motion.article
      {...tileReveal}
      transition={{ ...tileReveal.transition, delay }}
      className={[
        'relative flex flex-col overflow-hidden rounded-[28px] px-6 pt-10 pb-6 sm:rounded-[36px] sm:px-10 sm:pt-12 sm:pb-8 lg:rounded-[var(--r-tile)] lg:px-14 lg:pt-14 lg:pb-10',
        full ? 'min-h-[560px] lg:min-h-[620px]' : 'min-h-[460px] lg:min-h-[500px]',
        themeBase[theme],
        className,
      ].join(' ')}
      style={
        background
          ? ({ backgroundImage: background, backgroundSize: 'cover', backgroundPosition: 'center' } as CSSProperties)
          : undefined
      }
    >
      <header className="relative z-10 mx-auto flex max-w-[36ch] flex-col items-center text-center">
        {eyebrow ? (
          <p
            className={[
              'text-[12px] font-semibold uppercase tracking-[0.16em]',
              isDark ? 'text-white/60' : 'text-zinc-700',
            ].join(' ')}
          >
            {eyebrow}
          </p>
        ) : null}

        <h2
          className={[
            'mt-2 font-semibold leading-[1.05]',
            full
              ? 'text-[clamp(40px,5.4vw,68px)]'
              : 'text-[clamp(30px,3.6vw,46px)]',
          ].join(' ')}
          style={{ letterSpacing: '-0.005em' }}
        >
          {title}
        </h2>

        {subtitle ? (
          <p
            className={[
              'mt-3 text-[clamp(16px,1.3vw,21px)] leading-[1.4]',
              isDark ? 'text-white/70' : 'text-zinc-700',
            ].join(' ')}
          >
            {subtitle}
          </p>
        ) : null}

        {(primaryHref || secondaryHref) && (
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3">
            {primaryHref ? (
              <Link
                href={primaryHref}
                className={[
                  'inline-flex h-9 items-center text-[14px] font-medium transition-colors duration-[320ms] ease-[cubic-bezier(0.4,0,0.6,1)]',
                  isDark
                    ? 'text-white hover:text-white/80'
                    : 'text-[var(--c-accent)] hover:text-[var(--c-accent-hover)]',
                ].join(' ')}
              >
                {primaryLabel}
                <span aria-hidden className="ml-0.5">›</span>
              </Link>
            ) : null}
            {secondaryHref ? (
              <Link
                href={secondaryHref}
                className="inline-flex h-9 items-center rounded-full bg-[var(--c-accent)] px-5 text-[14px] font-medium text-white transition-colors duration-[320ms] hover:bg-[var(--c-accent-hover)]"
              >
                {secondaryLabel}
              </Link>
            ) : null}
          </div>
        )}
      </header>

      {children ? (
        <div className="relative z-0 mt-8 flex flex-1 items-end justify-center">
          {children}
        </div>
      ) : null}
    </motion.article>
  )
}
