'use client'

import { useMemo, useState } from 'react'
import * as motion from 'motion/react-client'
import type { Product } from '../../../_data/products'
import { fmtMNT } from '../../../_data/products'

type Props = { product: Product }

const tradeInOptions = [
  { id: 'no', label: 'No trade-in', sub: 'Pay full price up front.' },
  {
    id: 'yes',
    label: 'Add a trade-in',
    sub: 'Estimated up to ₮3,500,000 off.',
  },
]

const careOptions = [
  { id: 'no', label: 'Skip AppleCare', sub: 'Standard 1-year warranty.' },
  {
    id: 'yes',
    label: 'AppleCare+ for fleet',
    sub: '+₮180,000 — 2 years of coverage including drops.',
    delta: 180_000,
  },
]

export function PDPConfigurator({ product: p }: Props) {
  const [colorId, setColorId] = useState(p.colors[0]?.id ?? '')
  const [capacityId, setCapacityId] = useState(p.capacities?.[0]?.id ?? '')
  const [tradeIn, setTradeIn] = useState<'yes' | 'no'>('no')
  const [care, setCare] = useState<'yes' | 'no'>('no')

  const capacity = p.capacities?.find((c) => c.id === capacityId)
  const careDelta = careOptions.find((c) => c.id === care)?.delta ?? 0
  const tradeInDelta = tradeIn === 'yes' ? -1_500_000 : 0

  const total = useMemo(
    () => p.basePrice + (capacity?.priceDelta ?? 0) + careDelta + tradeInDelta,
    [p.basePrice, capacity?.priceDelta, careDelta, tradeInDelta],
  )
  const monthly = Math.round(total / 24)

  const selectedColor = p.colors.find((c) => c.id === colorId) ?? p.colors[0]

  return (
    <div className="space-y-10 lg:sticky lg:top-20">
      {/* COLOR */}
      {p.colors.length > 1 ? (
        <Section
          step={1}
          title={p.colors.length > 2 ? 'Choose your colour.' : 'Pick a finish.'}
          summary={selectedColor?.name}
        >
          <div className="grid grid-cols-1 gap-2">
            {p.colors.map((c) => {
              const isActive = c.id === colorId
              return (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => setColorId(c.id)}
                  className={[
                    'flex items-center justify-between rounded-xl border px-4 py-3 text-left transition-colors duration-[320ms] ease-[cubic-bezier(0.4,0,0.6,1)]',
                    isActive
                      ? 'border-zinc-900 bg-white shadow-[inset_0_0_0_1px_#1d1d1f]'
                      : 'border-black/10 bg-white hover:border-black/30',
                  ].join(' ')}
                >
                  <span className="flex items-center gap-3">
                    <span
                      aria-hidden
                      className="h-6 w-6 rounded-full ring-1 ring-black/10"
                      style={{ background: c.hex }}
                    />
                    <span className="text-[14px] font-medium text-zinc-900">
                      {c.name}
                    </span>
                  </span>
                  {isActive ? (
                    <span className="text-[12px] text-zinc-500">Selected</span>
                  ) : null}
                </button>
              )
            })}
          </div>
        </Section>
      ) : null}

      {/* STORAGE / CAPACITY */}
      {p.capacities && p.capacities.length > 0 ? (
        <Section step={2} title="How much storage?" summary={capacity?.label}>
          <div className="space-y-2">
            {p.capacities.map((cap) => {
              const isActive = cap.id === capacityId
              const price = p.basePrice + cap.priceDelta
              return (
                <button
                  key={cap.id}
                  type="button"
                  onClick={() => setCapacityId(cap.id)}
                  className={[
                    'flex w-full items-center justify-between rounded-xl border bg-white px-4 py-3 text-left transition-colors duration-[320ms]',
                    isActive
                      ? 'border-zinc-900 shadow-[inset_0_0_0_1px_#1d1d1f]'
                      : 'border-black/10 hover:border-black/30',
                  ].join(' ')}
                >
                  <div>
                    <p className="text-[15px] font-semibold text-zinc-900">
                      {cap.label}
                    </p>
                    <p className="mt-0.5 text-[12px] text-zinc-500">
                      From {fmtMNT(price)}
                    </p>
                  </div>
                  {isActive ? (
                    <span className="text-[12px] text-zinc-500">Selected</span>
                  ) : null}
                </button>
              )
            })}
          </div>
        </Section>
      ) : null}

      {/* TRADE-IN */}
      <Section
        step={(p.colors.length > 1 ? 1 : 0) + (p.capacities ? 1 : 0) + 1}
        title="Trade in your old fleet?"
        summary={tradeIn === 'yes' ? 'Adding trade-in' : 'No trade-in'}
      >
        <div className="space-y-2">
          {tradeInOptions.map((opt) => {
            const isActive = opt.id === tradeIn
            return (
              <button
                key={opt.id}
                type="button"
                onClick={() => setTradeIn(opt.id as 'yes' | 'no')}
                className={[
                  'flex w-full flex-col items-start rounded-xl border bg-white px-4 py-3 text-left transition-colors duration-[320ms]',
                  isActive
                    ? 'border-zinc-900 shadow-[inset_0_0_0_1px_#1d1d1f]'
                    : 'border-black/10 hover:border-black/30',
                ].join(' ')}
              >
                <span className="text-[14px] font-medium text-zinc-900">
                  {opt.label}
                </span>
                <span className="mt-0.5 text-[12px] text-zinc-500">{opt.sub}</span>
              </button>
            )
          })}
        </div>
      </Section>

      {/* APPLECARE */}
      <Section
        step={(p.colors.length > 1 ? 1 : 0) + (p.capacities ? 1 : 0) + 2}
        title="Add AppleCare+ for fleet?"
        summary={care === 'yes' ? 'Coverage added' : 'No coverage'}
      >
        <div className="space-y-2">
          {careOptions.map((opt) => {
            const isActive = opt.id === care
            return (
              <button
                key={opt.id}
                type="button"
                onClick={() => setCare(opt.id as 'yes' | 'no')}
                className={[
                  'flex w-full flex-col items-start rounded-xl border bg-white px-4 py-3 text-left transition-colors duration-[320ms]',
                  isActive
                    ? 'border-zinc-900 shadow-[inset_0_0_0_1px_#1d1d1f]'
                    : 'border-black/10 hover:border-black/30',
                ].join(' ')}
              >
                <span className="text-[14px] font-medium text-zinc-900">
                  {opt.label}
                </span>
                <span className="mt-0.5 text-[12px] text-zinc-500">{opt.sub}</span>
              </button>
            )
          })}
        </div>
      </Section>

      {/* SUMMARY + CTA */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: [0.4, 0, 0.6, 1], delay: 0.3 }}
        className="rounded-2xl bg-zinc-900 p-6 text-white"
      >
        <p className="text-[12px] uppercase tracking-[0.16em] text-white/60">
          Your configuration
        </p>
        <ul className="mt-3 space-y-1 text-[13px] text-white/80">
          <li>{p.name}</li>
          {selectedColor ? <li>{selectedColor.name}</li> : null}
          {capacity ? <li>{capacity.label}</li> : null}
          {tradeIn === 'yes' ? <li>Trade-in applied (estimate)</li> : null}
          {care === 'yes' ? <li>AppleCare+ for fleet</li> : null}
        </ul>
        <div className="mt-5 flex items-baseline justify-between border-t border-white/10 pt-4">
          <span className="text-[12px] text-white/60">From</span>
          <div className="text-right">
            <p className="text-[24px] font-semibold leading-none">
              {fmtMNT(total)}
            </p>
            <p className="mt-1 text-[11px] text-white/60">
              or {fmtMNT(monthly)}/mo. for 24 mo. at 0%
            </p>
          </div>
        </div>
        <button
          type="button"
          className="mt-5 inline-flex h-11 w-full items-center justify-center rounded-full bg-[var(--c-accent)] text-[14px] font-medium text-white transition-colors duration-[320ms] hover:bg-[var(--c-accent-hover)]"
        >
          Add to bag
        </button>
        <button
          type="button"
          className="mt-2 inline-flex h-9 w-full items-center justify-center text-[12px] text-white/60 transition-colors hover:text-white"
        >
          Save this configuration
        </button>
      </motion.div>
    </div>
  )
}

function Section({
  step,
  title,
  summary,
  children,
}: {
  step: number
  title: string
  summary?: string
  children: React.ReactNode
}) {
  return (
    <section>
      <header className="mb-3 flex items-baseline justify-between">
        <p className="text-[12px] font-semibold uppercase tracking-[0.16em] text-zinc-500">
          Step {step}
        </p>
        {summary ? (
          <p className="text-[12px] text-zinc-500">{summary}</p>
        ) : null}
      </header>
      <h2 className="mb-4 text-[clamp(20px,1.6vw,24px)] font-semibold tracking-tight text-zinc-900">
        {title}
      </h2>
      {children}
    </section>
  )
}
