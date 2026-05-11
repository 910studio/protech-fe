'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useMemo, useState } from 'react'
import * as motion from 'motion/react-client'
import { AnimatePresence } from 'motion/react'
import { products, fmtMNT, type Pastel, type Product } from '../_data/products'
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

const DEFAULT_LEFT = 'macbook-pro-m4'
const DEFAULT_RIGHT = 'dell-pro-16'

export default function ComparePage() {
  const [leftSlug, setLeftSlug] = useState(DEFAULT_LEFT)
  const [rightSlug, setRightSlug] = useState(DEFAULT_RIGHT)

  const left = useMemo(
    () => products.find((p) => p.slug === leftSlug) ?? products[0],
    [leftSlug],
  )
  const right = useMemo(
    () => products.find((p) => p.slug === rightSlug) ?? products[1],
    [rightSlug],
  )

  return (
    <>
      {/* HERO BAND */}
      <section className="bg-[var(--c-bg)] px-5 pt-10 lg:px-6 lg:pt-16">
        <div className="mx-auto flex max-w-[var(--max-w)] flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.2em] text-zinc-500">
              <span aria-hidden className="h-px w-7 bg-zinc-400" />
              Compare
            </p>
            <h1
              className="mt-4 max-w-[14ch] text-[clamp(40px,5.5vw,76px)] font-semibold leading-[0.98] text-[var(--c-text)]"
              style={{ letterSpacing: '-0.022em' }}
            >
              Decide between two.<br />
              Buy with confidence.
            </h1>
          </div>
          <p className="max-w-[42ch] text-[15px] leading-[1.55] text-zinc-700/90 lg:text-[16px]">
            Side-by-side specs, real prices, no marketing fluff. Pick any two
            devices in the catalogue and compare what matters — chip, display,
            battery, memory, and what you&apos;ll actually pay.
          </p>
        </div>
      </section>

      {/* SLOT CARDS */}
      <section className="bg-[var(--c-bg)] px-5 pt-8 lg:px-6 lg:pt-10">
        <div className="mx-auto grid max-w-[var(--max-w)] grid-cols-1 gap-5 lg:grid-cols-2 lg:gap-6">
          <Slot
            label="A"
            product={left}
            selectedSlug={leftSlug}
            onSelect={setLeftSlug}
            otherSlug={rightSlug}
            delay={0}
          />
          <Slot
            label="B"
            product={right}
            selectedSlug={rightSlug}
            onSelect={setRightSlug}
            otherSlug={leftSlug}
            delay={0.08}
          />
        </div>
      </section>

      {/* SPEC COMPARISON */}
      <SpecCompare left={left} right={right} />

      {/* CTA BAND */}
      <section className="bg-[var(--c-bg)] px-5 pb-16 pt-6 lg:px-6 lg:pb-24">
        <div className="mx-auto max-w-[var(--max-w)]">
          <article className="relative flex flex-col items-start justify-between gap-6 overflow-hidden rounded-[28px] bg-zinc-900 p-8 text-white sm:flex-row sm:items-center sm:rounded-[32px] sm:p-12">
            <div className="max-w-[40ch]">
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/55">
                Still on the fence?
              </p>
              <h2
                className="mt-2 text-[clamp(26px,2.6vw,36px)] font-semibold leading-[1.1]"
                style={{ letterSpacing: '-0.014em' }}
              >
                Talk to fleet. We&apos;ll match you to the right device.
              </h2>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <Link
                href="/v2/fleet"
                className="inline-flex h-12 items-center rounded-full bg-[var(--c-accent)] px-6 text-[14px] font-semibold transition-colors duration-[320ms] hover:bg-[var(--c-accent-hover)]"
              >
                Talk to fleet
              </Link>
              <Link
                href="/v2/shop"
                className="inline-flex h-12 items-center rounded-full border border-white/20 px-6 text-[14px] font-medium text-white transition-colors duration-[320ms] hover:bg-white/10"
              >
                Browse all
              </Link>
            </div>
          </article>
        </div>
      </section>
    </>
  )
}

/* ----------- slot card ----------- */

function Slot({
  label,
  product,
  selectedSlug,
  onSelect,
  otherSlug,
  delay,
}: {
  label: string
  product: Product
  selectedSlug: string
  onSelect: (slug: string) => void
  otherSlug: string
  delay: number
}) {
  const isDark = product.pastel === 'dark'
  const others = products.filter((p) => p.slug !== otherSlug)

  return (
    <motion.article
      {...tileReveal}
      transition={{ ...tileReveal.transition, delay }}
      className={[
        'relative flex min-h-[520px] flex-col overflow-hidden rounded-[28px] p-7 sm:rounded-[36px] sm:p-9',
        isDark ? 'text-white' : 'text-zinc-900',
      ].join(' ')}
      style={{ background: themeBg[product.pastel] }}
    >
      {/* SLOT BADGE */}
      <div className="z-10 flex items-center justify-between">
        <span
          className={[
            'inline-flex h-7 items-center justify-center rounded-full px-3 text-[11px] font-semibold uppercase tracking-[0.18em]',
            isDark ? 'bg-white/15 text-white/80' : 'bg-white/65 text-zinc-700',
          ].join(' ')}
        >
          Slot {label}
        </span>
        <p
          className={[
            'text-[11px] font-medium uppercase tracking-[0.2em]',
            isDark ? 'text-white/55' : 'text-zinc-700/75',
          ].join(' ')}
        >
          {product.brand}
        </p>
      </div>

      {/* TITLE + PRICE */}
      <div className="relative z-10 mt-6 max-w-[16ch]">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={product.slug}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            transition={{ duration: 0.28, ease: [0.4, 0, 0.6, 1] }}
          >
            <h2
              className="text-[clamp(28px,3.2vw,40px)] font-semibold leading-[1]"
              style={{ letterSpacing: '-0.018em' }}
            >
              {product.name}
            </h2>
            <p
              className={[
                'mt-4 text-[14px]',
                isDark ? 'text-white/75' : 'text-zinc-800/85',
              ].join(' ')}
            >
              From <span className="font-semibold">{fmtMNT(product.basePrice)}</span>
            </p>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* MASSIVE PRODUCT IMAGE */}
      <div className="pointer-events-none absolute bottom-[4%] right-[-6%] h-[70%] w-[88%] sm:bottom-[6%] sm:h-[64%]">
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={product.slug}
            className="absolute inset-0"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.94 }}
            transition={{ duration: 0.36, ease: [0.4, 0, 0.6, 1] }}
          >
            <Image
              src={product.image}
              alt={product.name}
              fill
              sizes="(min-width: 1024px) 40vw, 80vw"
              className="object-contain"
              style={{ objectPosition: 'right bottom' }}
            />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* PRODUCT PICKER RAIL */}
      <div className="relative z-10 mt-auto pt-6">
        <p
          className={[
            'mb-2.5 text-[10.5px] font-medium uppercase tracking-[0.18em]',
            isDark ? 'text-white/55' : 'text-zinc-700/65',
          ].join(' ')}
        >
          Swap product
        </p>
        <div
          className="-mx-2 flex snap-x snap-mandatory gap-2 overflow-x-auto px-2 pb-1 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {others.map((p) => {
            const isActive = p.slug === selectedSlug
            return (
              <button
                key={p.slug}
                type="button"
                onClick={() => onSelect(p.slug)}
                aria-pressed={isActive}
                className={[
                  'group relative grid h-16 w-16 shrink-0 snap-start place-items-center rounded-xl transition-all duration-[260ms] sm:h-[72px] sm:w-[72px]',
                  isActive
                    ? isDark
                      ? 'bg-white/95 ring-2 ring-white'
                      : 'bg-white shadow-[0_8px_20px_-8px_rgba(0,0,0,0.18)] ring-2 ring-zinc-900'
                    : isDark
                      ? 'bg-white/15 hover:bg-white/25'
                      : 'bg-white/60 hover:bg-white/85',
                ].join(' ')}
                title={p.name}
              >
                <div className="relative h-[80%] w-[80%]">
                  <Image
                    src={p.image}
                    alt={p.name}
                    fill
                    sizes="72px"
                    className="object-contain"
                  />
                </div>
              </button>
            )
          })}
        </div>
      </div>
    </motion.article>
  )
}

/* ----------- spec comparison ----------- */

type Row = {
  label: string
  leftValue: string
  rightValue: string
  /** 'left' | 'right' | undefined — which value is highlighted as the better */
  winner?: 'left' | 'right'
}

function SpecCompare({ left, right }: { left: Product; right: Product }) {
  const rows = useMemo(() => buildRows(left, right), [left, right])

  return (
    <section className="bg-[var(--c-bg)] px-5 pt-12 lg:px-6 lg:pt-16">
      <div className="mx-auto max-w-[var(--max-w)]">
        <p className="flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.2em] text-zinc-500">
          <span aria-hidden className="h-px w-7 bg-zinc-400" />
          Side-by-side
        </p>
        <h2
          className="mt-4 text-[clamp(28px,3vw,42px)] font-semibold leading-[1.05] text-[var(--c-text)]"
          style={{ letterSpacing: '-0.016em' }}
        >
          What you&apos;re actually buying.
        </h2>

        <div className="mt-10 overflow-hidden rounded-[24px] border border-black/[0.06] bg-white sm:rounded-[28px]">
          {/* HEADER ROW — product names */}
          <div className="grid grid-cols-[1fr_auto_1fr] items-center border-b border-black/[0.06] bg-[#fafafa] px-4 py-4 sm:px-8">
            <p className="truncate text-[13px] font-semibold text-zinc-900 sm:text-[15px]">
              {left.name}
            </p>
            <p className="px-2 text-[10px] font-semibold uppercase tracking-[0.2em] text-zinc-400 sm:px-6 sm:text-[11px]">
              vs
            </p>
            <p className="truncate text-right text-[13px] font-semibold text-zinc-900 sm:text-[15px]">
              {right.name}
            </p>
          </div>

          {/* SPEC ROWS */}
          {rows.map((row) => (
            <SpecRow key={row.label} row={row} />
          ))}
        </div>
      </div>
    </section>
  )
}

function SpecRow({ row }: { row: Row }) {
  const leftWin = row.winner === 'left'
  const rightWin = row.winner === 'right'
  return (
    <div className="grid grid-cols-[1fr_auto_1fr] items-center border-b border-black/[0.04] px-4 py-4 last:border-b-0 sm:px-8 sm:py-5">
      <p
        className={[
          'text-[14px] sm:text-[15px]',
          leftWin ? 'font-semibold text-zinc-900' : 'text-zinc-700',
        ].join(' ')}
      >
        {leftWin ? (
          <span className="mr-1.5 inline-block h-1.5 w-1.5 -translate-y-px rounded-full bg-[var(--c-accent)] align-middle" />
        ) : null}
        {row.leftValue}
      </p>
      <p className="px-2 text-[10.5px] font-medium uppercase tracking-[0.16em] text-zinc-500 sm:px-6 sm:text-[11.5px]">
        {row.label}
      </p>
      <p
        className={[
          'text-right text-[14px] sm:text-[15px]',
          rightWin ? 'font-semibold text-zinc-900' : 'text-zinc-700',
        ].join(' ')}
      >
        {row.rightValue}
        {rightWin ? (
          <span className="ml-1.5 inline-block h-1.5 w-1.5 -translate-y-px rounded-full bg-[var(--c-accent)] align-middle" />
        ) : null}
      </p>
    </div>
  )
}

/* ----------- spec extraction ----------- */

function buildRows(left: Product, right: Product): Row[] {
  return [
    {
      label: 'Brand',
      leftValue: brandLabel(left.brand),
      rightValue: brandLabel(right.brand),
    },
    {
      label: 'Chip',
      leftValue: left.chip ?? '—',
      rightValue: right.chip ?? '—',
    },
    {
      label: 'Display',
      leftValue: left.display ?? '—',
      rightValue: right.display ?? '—',
      ...pickWinner(
        parseInches(left.display),
        parseInches(right.display),
        'bigger',
      ),
    },
    {
      label: 'Battery',
      leftValue: findSpec(left.specs, /battery/i) ?? '—',
      rightValue: findSpec(right.specs, /battery/i) ?? '—',
      ...pickWinner(
        parseHours(findSpec(left.specs, /battery/i)),
        parseHours(findSpec(right.specs, /battery/i)),
        'bigger',
      ),
    },
    {
      label: 'Memory',
      leftValue: findSpec(left.specs, /(memory|ddr|lpddr|gb )/i) ?? '—',
      rightValue: findSpec(right.specs, /(memory|ddr|lpddr|gb )/i) ?? '—',
    },
    {
      label: 'Storage',
      leftValue: left.capacities?.[0]?.label ?? '—',
      rightValue: right.capacities?.[0]?.label ?? '—',
    },
    {
      label: 'Starting price',
      leftValue: fmtMNT(left.basePrice),
      rightValue: fmtMNT(right.basePrice),
      ...pickWinner(left.basePrice, right.basePrice, 'smaller'),
    },
  ]
}

function brandLabel(brand: Product['brand']): string {
  const map = { apple: 'Apple', lenovo: 'Lenovo', dell: 'Dell', microsoft: 'Microsoft' }
  return map[brand]
}

function findSpec(specs: string[], re: RegExp): string | null {
  return specs.find((s) => re.test(s)) ?? null
}

function parseHours(value: string | null): number | null {
  if (!value) return null
  const m = value.match(/(\d+(?:\.\d+)?)\s*-?\s*hour/i)
  return m ? parseFloat(m[1]) : null
}

function parseInches(value: string | undefined): number | null {
  if (!value) return null
  const m = value.match(/(\d+(?:\.\d+)?)-inch/i)
  return m ? parseFloat(m[1]) : null
}

function pickWinner(
  l: number | null,
  r: number | null,
  prefer: 'bigger' | 'smaller',
): Partial<Row> {
  if (l === null || r === null || l === r) return {}
  if (prefer === 'bigger') return { winner: l > r ? 'left' : 'right' }
  return { winner: l < r ? 'left' : 'right' }
}
