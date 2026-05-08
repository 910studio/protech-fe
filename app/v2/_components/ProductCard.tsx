'use client'

import Image from 'next/image'
import Link from 'next/link'
import * as motion from 'motion/react-client'
import type { CSSProperties } from 'react'
import type { Pastel, Product } from '../_data/products'
import { fmtMNT } from '../_data/products'
import { tileReveal } from '@/app/lib/motion'

const themeBg: Record<Pastel, string> = {
  lilac:  'var(--pastel-lilac)',
  mint:   'var(--pastel-mint)',
  peach:  'var(--pastel-peach)',
  cream:  'var(--pastel-cream)',
  sky:    'var(--pastel-sky)',
  coral:  'var(--pastel-coral)',
  sage:   'var(--pastel-sage)',
  butter: 'var(--pastel-butter)',
  dark:   '#0f0f12',
}

type Props = {
  product: Product
  delay?: number
}

export function ProductCard({ product: p, delay = 0 }: Props) {
  const isDark = p.pastel === 'dark'

  return (
    <motion.article
      {...tileReveal}
      transition={{ ...tileReveal.transition, delay }}
      className={[
        'group relative flex min-h-[520px] flex-col justify-between overflow-hidden rounded-[28px] p-7 transition-[transform,box-shadow] duration-[320ms] ease-[cubic-bezier(0.25,0.1,0.3,1)] hover:-translate-y-1 hover:shadow-[0_24px_48px_-22px_rgba(0,0,0,0.22),0_4px_12px_-4px_rgba(0,0,0,0.08)] sm:min-h-[560px] sm:rounded-[32px] sm:p-8',
        isDark ? 'text-white' : 'text-zinc-900',
      ].join(' ')}
      style={{ background: themeBg[p.pastel] } as CSSProperties}
    >
      <header className="relative z-10 max-w-[80%]">
        <p
          className={[
            'text-[10px] font-semibold uppercase tracking-[0.2em]',
            isDark ? 'text-white/55' : 'text-zinc-800/70',
          ].join(' ')}
        >
          {p.brand} · {p.category}
        </p>
        <h3
          className="mt-2 text-[clamp(20px,1.6vw,24px)] font-semibold leading-[1.05]"
          style={{ letterSpacing: '-0.014em' }}
        >
          {p.name}
        </h3>
        <p
          className={[
            'mt-1.5 text-[12px] leading-[1.4]',
            isDark ? 'text-white/65' : 'text-zinc-800/75',
          ].join(' ')}
        >
          {p.tagline}
        </p>
      </header>

      <div className="relative z-10 flex items-end justify-between gap-3">
        <div>
          {p.colors.length > 1 ? (
            <div className="mb-3 flex items-center gap-1.5">
              {p.colors.slice(0, 4).map((c) => (
                <span
                  key={c.id}
                  aria-label={c.name}
                  className={[
                    'h-2.5 w-2.5 rounded-full ring-1',
                    isDark ? 'ring-white/30' : 'ring-black/15',
                  ].join(' ')}
                  style={{ background: c.hex }}
                />
              ))}
              {p.colors.length > 4 ? (
                <span
                  className={[
                    'text-[10px]',
                    isDark ? 'text-white/55' : 'text-zinc-700',
                  ].join(' ')}
                >
                  +{p.colors.length - 4}
                </span>
              ) : null}
            </div>
          ) : null}
          <p className="text-[12px]">
            <span className={isDark ? 'text-white/60' : 'text-zinc-700/85'}>
              From{' '}
            </span>
            <span className="font-semibold">{fmtMNT(p.basePrice)}</span>
          </p>
          <Link
            href={`/v2/shop/${p.slug}`}
            className={[
              'mt-3 inline-flex h-9 items-center text-[13px] font-semibold transition-colors duration-[320ms]',
              isDark ? 'text-white' : 'text-zinc-900 hover:text-zinc-700',
            ].join(' ')}
          >
            Configure
            <span aria-hidden className="ml-1.5 transition-transform duration-[320ms] group-hover:translate-x-0.5">
              →
            </span>
          </Link>
        </div>
      </div>

      {/* OVERSIZED PRODUCT IMAGE — no mix-blend, image stays its true color */}
      <div className="pointer-events-none absolute bottom-[-4%] right-[-6%] h-[88%] w-[88%] transition-transform duration-[480ms] ease-[cubic-bezier(0.25,0.1,0.3,1)] group-hover:scale-[1.04]">
        <Image
          src={p.image}
          alt={p.name}
          fill
          sizes="(min-width: 1024px) 30vw, 50vw"
          loading="eager"
          className="object-contain"
          style={{ objectPosition: 'right bottom' }}
        />
      </div>
    </motion.article>
  )
}
