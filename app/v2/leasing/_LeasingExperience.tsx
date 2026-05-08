'use client'

import { useMemo, useRef, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import * as motion from 'motion/react-client'
import { AnimatePresence, useInView } from 'motion/react'
import { tileReveal } from '@/app/lib/motion'
import { products, fmtMNT } from '../_data/products'
import { RollingNumber } from '../_components/RollingNumber'

type TermKey = 12 | 24 | 36

const termConfig: Record<
  TermKey,
  { label: string; rate: string; rateMultiplier: number; note: string }
> = {
  12: {
    label: '12 months',
    rate: '0% APR',
    rateMultiplier: 1,
    note: 'No interest. Highest monthly. For teams refreshing every year.',
  },
  24: {
    label: '24 months',
    rate: '0% APR',
    rateMultiplier: 1,
    note: 'The standard. Lowest TCO across two refresh windows.',
  },
  36: {
    label: '36 months',
    rate: '2.9% APR',
    rateMultiplier: 1.029,
    note: 'Lowest monthly. Best for stable role hardware.',
  },
}

const stats = [
  { value: '0%', unit: 'APR', caption: '12 + 24 month terms' },
  { value: '24h', unit: 'decision', caption: 'one form, one call' },
  { value: '50', unit: 'devices', caption: 'unsecured ceiling' },
]

const eligibility = [
  {
    n: '01',
    title: 'Registered Mongolian company',
    body: 'Улсын бүртгэл and a tax ID. Sole proprietors and LLCs both eligible.',
  },
  {
    n: '02',
    title: 'Six months of operation',
    body: 'Six months of bank statements showing positive operations. Profitability not required.',
  },
  {
    n: '03',
    title: 'No collateral under 50 devices',
    body: 'Fleets of 1—49 devices are unsecured. Above 50, the leased hardware is the collateral — nothing else.',
  },
]

export function LeasingExperience() {
  const [term, setTerm] = useState<TermKey>(24)

  // Pick 4 anchor SKUs spread across categories
  const featured = useMemo(() => {
    const slugs = ['macbook-pro-m4', 'dell-pro-14', 'ipad-air-m4-11', 'airpods-pro-2']
    return slugs
      .map((s) => products.find((p) => p.slug === s))
      .filter((p): p is NonNullable<typeof p> => Boolean(p))
  }, [])

  const cfg = termConfig[term]

  // Track when the Selected-term summary strip leaves the viewport so we can
  // surface its info inside the sticky picker bar instead.
  const summaryRef = useRef<HTMLDivElement>(null)
  // margin "-56px" matches the nav height — once the strip's bottom edge crosses
  // under the nav, we treat it as "scrolled past" and reveal the inline summary.
  const summaryVisible = useInView(summaryRef, { margin: '-56px 0px 0px 0px' })
  const showInline = !summaryVisible

  return (
    <>
      {/* HERO */}
      <section className="relative overflow-hidden bg-[var(--c-bg)] px-6 pb-12 pt-14 lg:px-10 lg:pb-16 lg:pt-24">
        <div className="mx-auto max-w-[var(--max-w)]">
          <motion.p
            {...tileReveal}
            className="flex items-center gap-2 text-[12px] font-medium uppercase tracking-[0.18em] text-zinc-500"
          >
            <span aria-hidden className="h-px w-7 bg-zinc-400" />
            Leasing — Khatun × Protech
          </motion.p>

          <motion.h1
            {...tileReveal}
            transition={{ ...tileReveal.transition, delay: 0.08 }}
            className="mt-6 text-[clamp(48px,8vw,108px)] font-semibold leading-[0.94] text-[var(--c-text)]"
            style={{ letterSpacing: '-0.024em' }}
          >
            Pay monthly.<br />
            Keep your{' '}
            <span className="relative inline-block text-[var(--c-accent)]">
              capital
              <span
                aria-hidden
                className="pointer-events-none absolute -inset-x-4 -inset-y-2 -z-10 rounded-full opacity-50 blur-3xl"
                style={{
                  background:
                    'radial-gradient(closest-side, rgba(79,70,229,0.5), transparent)',
                }}
              />
            </span>
            .
          </motion.h1>

          <motion.p
            {...tileReveal}
            transition={{ ...tileReveal.transition, delay: 0.16 }}
            className="mt-7 max-w-[44ch] text-[clamp(16px,1.3vw,19px)] leading-[1.45] text-zinc-700"
          >
            0% finance for registered Mongolian businesses on 12 and 24-month
            terms. Refresh your fleet without burning the balance sheet.
          </motion.p>

          <motion.div
            {...tileReveal}
            transition={{ ...tileReveal.transition, delay: 0.24 }}
            className="mt-8 flex flex-wrap items-center gap-4"
          >
            <Link
              href="#apply"
              className="inline-flex h-12 items-center rounded-full bg-[var(--c-accent)] px-7 text-[15px] font-semibold !text-white shadow-[0_18px_40px_-18px_rgba(79,70,229,0.6)] transition-all duration-[320ms] ease-[cubic-bezier(0.4,0,0.6,1)] hover:bg-[var(--c-accent-hover)] hover:shadow-[0_24px_48px_-18px_rgba(79,70,229,0.7)]"
            >
              Apply for leasing
              <span aria-hidden className="ml-2">→</span>
            </Link>
            <Link
              href="#calculator"
              className="inline-flex h-12 items-center text-[15px] font-medium text-[var(--c-text)] transition-colors duration-[320ms] hover:text-[var(--c-accent)]"
            >
              Try the calculator ↓
            </Link>
          </motion.div>

          <motion.dl
            {...tileReveal}
            transition={{ ...tileReveal.transition, delay: 0.32 }}
            className="mt-12 grid grid-cols-3 gap-6 border-t border-black/10 pt-6"
          >
            {stats.map((s) => (
              <div key={s.unit}>
                <dt className="flex items-baseline gap-1">
                  <span
                    className="text-[clamp(28px,2.8vw,40px)] font-semibold leading-none text-[var(--c-text)]"
                    style={{ letterSpacing: '-0.02em' }}
                  >
                    {s.value}
                  </span>
                  <span className="text-[11px] font-medium text-zinc-500">{s.unit}</span>
                </dt>
                <dd className="mt-1 text-[11px] leading-snug text-zinc-500">{s.caption}</dd>
              </div>
            ))}
          </motion.dl>
        </div>
      </section>

      {/* INTERACTIVE CALCULATOR */}
      <section id="calculator" className="bg-[var(--c-bg)] px-5 py-10 lg:px-6 lg:py-16">
        <div className="mx-auto max-w-[var(--max-w)]">
          <motion.div {...tileReveal} className="mb-6">
            <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-zinc-500">
              Try the term picker
            </p>
            <h2
              className="mt-3 text-[clamp(28px,3.6vw,52px)] font-semibold leading-[1.02]"
              style={{ letterSpacing: '-0.022em' }}
            >
              Move the term.<br />Watch the monthly drop.
            </h2>
          </motion.div>

          {/* STICKY TERM PILL — pinned through this section only */}
          <div className="sticky top-14 z-30 -mx-5 mb-8 lg:-mx-6">
            <div className="border-y border-black/[0.06] bg-[var(--c-bg)]/85 px-5 py-3 backdrop-blur-md backdrop-saturate-150 lg:px-6">
              <div className="mx-auto flex max-w-[var(--max-w)] items-center justify-between gap-4">
                {/* LEFT: label, expands to inline summary once the strip is out of view */}
                <div className="flex min-w-0 items-baseline gap-3">
                  <span className="text-[11px] font-medium uppercase tracking-[0.2em] text-zinc-500">
                    Term
                  </span>
                  <AnimatePresence initial={false}>
                    {showInline ? (
                      <motion.div
                        key="inline-summary"
                        initial={{ opacity: 0, x: -8 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -8 }}
                        transition={{ duration: 0.24, ease: [0.4, 0, 0.6, 1] }}
                        className="flex items-baseline gap-2 truncate text-[13px] tabular-nums text-zinc-800 sm:gap-3 sm:text-[14px]"
                      >
                        <span className="font-semibold text-zinc-900">
                          <RollingNumber value={term} /> months
                        </span>
                        <span className="hidden h-1 w-1 rounded-full bg-zinc-400 sm:inline-block" />
                        <span className="font-semibold text-[var(--c-accent)]">
                          <RollingNumber
                            value={(cfg.rateMultiplier - 1) * 100}
                            format={(n) => n.toFixed(1)}
                          />
                          % APR
                        </span>
                      </motion.div>
                    ) : null}
                  </AnimatePresence>
                </div>

                <div className="flex items-center gap-1.5 rounded-full border border-black/[0.08] bg-white p-1.5 shadow-[0_8px_30px_-12px_rgba(0,0,0,0.12)]">
                  {([12, 24, 36] as TermKey[]).map((k) => {
                    const isActive = term === k
                    return (
                      <button
                        key={k}
                        type="button"
                        onClick={() => setTerm(k)}
                        aria-pressed={isActive}
                        className={[
                          'relative inline-flex h-11 items-center rounded-full px-5 text-[14px] font-semibold transition-colors duration-[240ms]',
                          isActive ? 'text-white' : 'text-zinc-700 hover:text-zinc-900',
                        ].join(' ')}
                      >
                        {isActive ? (
                          <motion.span
                            layoutId="term-pill"
                            className="absolute inset-0 rounded-full bg-[var(--c-accent)]"
                            transition={{ type: 'spring', stiffness: 360, damping: 30 }}
                          />
                        ) : null}
                        <span className="relative">{k} mo</span>
                      </button>
                    )
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* TERM SUMMARY STRIP — values roll, parent never re-mounts */}
          <div
            ref={summaryRef}
            className="mb-8 grid grid-cols-1 gap-5 rounded-[28px] bg-[var(--c-accent-soft)] p-7 sm:grid-cols-3 sm:p-9 lg:rounded-[32px]"
          >
            <div>
              <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-[var(--c-accent)]">
                Selected term
              </p>
              <p
                className="mt-2 text-[clamp(28px,2.8vw,40px)] font-semibold leading-[1] text-zinc-900 tabular-nums"
                style={{ letterSpacing: '-0.018em' }}
              >
                <RollingNumber value={term} /> months
              </p>
            </div>
            <div>
              <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-zinc-700/70">
                Rate
              </p>
              <p
                className="mt-2 text-[clamp(28px,2.8vw,40px)] font-semibold leading-[1] text-zinc-900 tabular-nums"
                style={{ letterSpacing: '-0.018em' }}
              >
                <RollingNumber
                  value={(cfg.rateMultiplier - 1) * 100}
                  format={(n) => n.toFixed(1)}
                />
                % APR
              </p>
            </div>
            <div>
              <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-zinc-700/70">
                Best for
              </p>
              <AnimatePresence mode="wait">
                <motion.p
                  key={term}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -4 }}
                  transition={{ duration: 0.24, ease: [0.4, 0, 0.6, 1] }}
                  className="mt-2 text-[14px] leading-[1.45] text-zinc-800"
                >
                  {cfg.note}
                </motion.p>
              </AnimatePresence>
            </div>
          </div>

          {/* ANIMATED PRODUCT CARDS — monthly price re-flips on term change */}
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
            {featured.map((p, i) => {
              const monthly = Math.round((p.basePrice * cfg.rateMultiplier) / term)
              return (
                <motion.article
                  key={p.slug}
                  {...tileReveal}
                  transition={{ ...tileReveal.transition, delay: i * 0.05 }}
                  className="group relative flex min-h-[360px] flex-col justify-between overflow-hidden rounded-[28px] bg-white p-6 shadow-[0_1px_2px_rgba(0,0,0,0.04)] transition-[transform,box-shadow] duration-[320ms] ease-[cubic-bezier(0.25,0.1,0.3,1)] hover:-translate-y-1 hover:shadow-[0_20px_40px_-18px_rgba(0,0,0,0.18)] sm:rounded-[32px] sm:p-7"
                >
                  <div className="relative aspect-square w-full overflow-hidden rounded-[18px] bg-[#fafafa]">
                    <Image
                      src={p.image}
                      alt={p.name}
                      fill
                      sizes="(min-width: 1024px) 20vw, 50vw"
                      className="object-contain p-6 transition-transform duration-[480ms] ease-[cubic-bezier(0.25,0.1,0.3,1)] group-hover:scale-[1.04]"
                    />
                  </div>

                  <div className="mt-5 flex flex-1 flex-col justify-between">
                    <div>
                      <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-zinc-500">
                        {p.brand}
                      </p>
                      <h3
                        className="mt-2 text-[15px] font-semibold leading-[1.2]"
                        style={{ letterSpacing: '-0.012em' }}
                      >
                        {p.name}
                      </h3>
                    </div>

                    <div className="mt-5">
                      <p className="text-[11px] uppercase tracking-[0.18em] text-zinc-500">
                        From
                      </p>
                      <p
                        className="mt-1 text-[clamp(22px,2.2vw,30px)] font-semibold leading-[1] text-[var(--c-accent)] tabular-nums"
                        style={{ letterSpacing: '-0.018em' }}
                      >
                        ₮
                        <RollingNumber value={monthly} />
                        <span className="ml-1 text-[12px] font-medium text-zinc-500">
                          /mo
                        </span>
                      </p>
                      <p className="mt-1 text-[11px] text-zinc-500">
                        Cash {fmtMNT(p.basePrice)}
                      </p>
                    </div>
                  </div>
                </motion.article>
              )
            })}
          </div>
        </div>
      </section>

      {/* ELIGIBILITY — editorial three-column, no boxes */}
      <section className="bg-[var(--c-bg)] px-5 py-10 lg:px-6 lg:py-16">
        <div className="mx-auto max-w-[var(--max-w)]">
          <motion.div
            {...tileReveal}
            className="mb-10 max-w-[40ch]"
          >
            <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-zinc-500">
              Eligibility
            </p>
            <h2
              className="mt-3 text-[clamp(28px,3.6vw,52px)] font-semibold leading-[1.02]"
              style={{ letterSpacing: '-0.022em' }}
            >
              Three checks.<br />One conversation.
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 gap-10 border-t border-black/10 pt-10 md:grid-cols-3 md:gap-12">
            {eligibility.map((e, i) => (
              <motion.div
                key={e.n}
                {...tileReveal}
                transition={{ ...tileReveal.transition, delay: i * 0.06 }}
              >
                <p
                  className="text-[clamp(48px,4.6vw,72px)] font-semibold leading-[0.9] text-[var(--c-accent)]"
                  style={{ letterSpacing: '-0.04em' }}
                >
                  {e.n}
                </p>
                <h3
                  className="mt-4 text-[20px] font-semibold leading-[1.2]"
                  style={{ letterSpacing: '-0.012em' }}
                >
                  {e.title}
                </h3>
                <p className="mt-3 max-w-[36ch] text-[14px] leading-[1.55] text-zinc-700">
                  {e.body}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section id="apply" className="bg-[var(--c-bg)] px-5 py-10 lg:px-6 lg:py-16">
        <div className="mx-auto max-w-[var(--max-w)]">
          <motion.article
            {...tileReveal}
            className="relative flex flex-col items-start justify-between gap-6 overflow-hidden rounded-[28px] bg-[#0f0f12] p-10 text-white sm:flex-row sm:items-center sm:rounded-[32px] sm:p-14"
          >
            <div className="max-w-[40ch]">
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/55">
                Ready to apply?
              </p>
              <h2
                className="mt-3 text-[clamp(28px,3vw,40px)] font-semibold leading-[1.1]"
                style={{ letterSpacing: '-0.014em' }}
              >
                One form. 24h decision.
              </h2>
              <p className="mt-4 max-w-[42ch] text-[14px] leading-[1.5] text-white/70">
                leasing@protech.mn · +976 7700 0002
              </p>
            </div>
            <Link
              href="mailto:leasing@protech.mn"
              className="inline-flex h-12 items-center rounded-full bg-white px-7 text-[14px] font-semibold text-zinc-900 transition-colors hover:bg-zinc-100"
            >
              Email leasing
              <span aria-hidden className="ml-2">→</span>
            </Link>
          </motion.article>
        </div>
      </section>
    </>
  )
}
