'use client'

import { useState, type ReactNode } from 'react'
import * as motion from 'motion/react-client'
import type { Product } from '../../../_data/products'
import { fmtMNT } from '../../../_data/products'

type Props = { product: Product }

export function PDPConfigurator({ product: p }: Props) {
  const [qty, setQty] = useState(1)

  const ram = matchSpec(p.specs, /(\d+)\s*GB/i, '16 GB')
  const storage = p.capacities?.[0]?.label ?? matchSpec(p.specs, /(\d+\s*(?:GB|TB))\s*(?:SSD|storage)?/i, '256 GB')
  const sku = `PRO-${p.slug.toUpperCase().replace(/-/g, '')}`

  return (
    <div className="space-y-5 lg:sticky lg:top-20">
      {/* UTILITY ROW */}
      <div className="flex items-center justify-between text-[12px] text-zinc-500">
        <div className="flex items-center gap-4">
          <button type="button" className="inline-flex items-center gap-1.5 hover:text-zinc-900">
            <span aria-hidden>⇄</span> Compare
          </button>
          <button type="button" className="inline-flex items-center gap-1.5 hover:text-zinc-900">
            <span aria-hidden>◇</span> Demo unit
          </button>
        </div>
        <div className="flex items-center gap-2.5">
          <span className="text-zinc-400">Share</span>
          <ShareDot label="Facebook">f</ShareDot>
          <ShareDot label="Twitter">𝕏</ShareDot>
          <ShareDot label="Email">✉</ShareDot>
          <ShareDot label="Link">⊕</ShareDot>
        </div>
      </div>

      {/* SPEC CARD */}
      <div className="rounded-2xl border border-black/10 bg-white p-6 lg:p-7">
        <h2
          className="text-[22px] font-semibold leading-tight tracking-tight text-zinc-900 lg:text-[24px]"
          style={{ letterSpacing: '-0.014em' }}
        >
          {p.name}
        </h2>
        <p className="mt-4 flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.18em] text-zinc-500">
          <span aria-hidden className="h-px w-6 bg-zinc-300" />
          Specifications
        </p>

        <dl className="mt-3 divide-y divide-black/[0.06] text-[13.5px]">
          {p.chip ? <SpecRow label="CPU" value={p.chip} /> : null}
          <SpecRow label="RAM" value={ram} />
          <SpecRow label="STORAGE" value={storage} />
          {p.display ? <SpecRow label="DISPLAY" value={p.display} /> : null}
        </dl>

        {/* 2x2 FACTS GRID */}
        <div className="mt-5 grid grid-cols-2 gap-3 border-t border-black/[0.06] pt-5">
          <Fact icon={DisplayIcon} label="Display" value={displaySize(p.display)} />
          <Fact icon={TypeIcon} label="Use" value="Office" />
          <Fact icon={BarcodeIcon} label="SKU" value={sku.slice(0, 9)} />
          <Fact icon={TruckIcon} label="Shipping" value="Free" />
        </div>
      </div>

      {/* PRICE + PAYMENT + CTA */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: [0.4, 0, 0.6, 1], delay: 0.15 }}
        className="rounded-2xl border border-black/10 bg-white p-6 lg:p-7"
      >
        <div className="flex items-baseline gap-2">
          <span className="text-[12px] uppercase tracking-[0.18em] text-zinc-500">Price</span>
          <span
            className="ml-auto text-[28px] font-semibold tabular-nums leading-none text-zinc-900 lg:text-[30px]"
            style={{ letterSpacing: '-0.018em' }}
          >
            {fmtMNT(p.basePrice)}
          </span>
        </div>
        <p className="mt-1 text-right text-[11px] text-zinc-500">VAT not included</p>

        {/* PAYMENT BANNERS */}
        <div className="mt-5 space-y-2">
          <PaymentBanner
            tint="sky"
            title="Split into 4 with Storepay"
            sub="Pay over 4 months, 0% interest."
            brand="powered by Storepay"
          />
          <PaymentBanner
            tint="mint"
            title="Khan Bank financing available"
            sub="Buy this product on installment via Khan Bank."
            brand="powered by Khan Bank"
          />
        </div>

        {/* QTY + CTAs */}
        <div className="mt-5 flex items-stretch gap-2">
          <div className="flex items-center rounded-full border border-black/15 bg-white">
            <QtyBtn onClick={() => setQty((q) => Math.max(1, q - 1))} ariaLabel="Decrease quantity">
              −
            </QtyBtn>
            <span className="w-8 select-none text-center text-[14px] font-medium tabular-nums text-zinc-900">
              {qty}
            </span>
            <QtyBtn onClick={() => setQty((q) => q + 1)} ariaLabel="Increase quantity">
              +
            </QtyBtn>
          </div>
          <button
            type="button"
            className="flex-1 rounded-full bg-[var(--c-accent)] px-5 text-[14px] font-medium text-white transition-colors duration-[320ms] hover:bg-[var(--c-accent-hover)]"
          >
            Add to cart
          </button>
        </div>
        <button
          type="button"
          className="mt-2 h-11 w-full rounded-full bg-zinc-900 text-[14px] font-medium text-white transition-colors duration-[320ms] hover:bg-zinc-700"
        >
          Buy now
        </button>
      </motion.div>
    </div>
  )
}

/* ---------- helpers ---------- */

function matchSpec(specs: string[], re: RegExp, fallback: string) {
  for (const s of specs) {
    const m = s.match(re)
    if (m) return m[0]
  }
  return fallback
}

function displaySize(display?: string) {
  if (!display) return '—'
  const m = display.match(/(\d+(?:\.\d+)?)-inch/i)
  return m ? `${m[1]}"` : display
}

function SpecRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center justify-between py-2.5">
      <dt className="text-[11.5px] font-medium uppercase tracking-[0.16em] text-zinc-500">{label}</dt>
      <dd className="text-[13.5px] font-medium text-zinc-900">{value}</dd>
    </div>
  )
}

function Fact({
  icon: Icon,
  label,
  value,
}: {
  icon: (props: { className?: string }) => ReactNode
  label: string
  value: string
}) {
  return (
    <div className="flex items-center gap-3 rounded-xl border border-black/[0.06] bg-white px-3 py-2.5">
      <Icon className="h-5 w-5 shrink-0 text-zinc-700" />
      <div className="min-w-0">
        <p className="truncate text-[10.5px] font-medium uppercase tracking-[0.14em] text-zinc-500">
          {label}
        </p>
        <p className="truncate text-[12.5px] font-medium text-zinc-900">{value}</p>
      </div>
    </div>
  )
}

function PaymentBanner({
  tint,
  title,
  sub,
  brand,
}: {
  tint: 'sky' | 'mint'
  title: string
  sub: string
  brand: string
}) {
  const bg = tint === 'sky' ? 'var(--pastel-sky)' : 'var(--pastel-mint)'
  return (
    <div className="overflow-hidden rounded-xl" style={{ background: bg }}>
      <div className="px-4 py-3">
        <div className="flex items-start gap-2.5">
          <span
            aria-hidden
            className="mt-0.5 grid h-6 w-6 shrink-0 place-items-center rounded-full bg-white/70 text-[12px] text-zinc-900"
          >
            ⚡
          </span>
          <div className="min-w-0">
            <p className="text-[12.5px] font-semibold text-zinc-900">{title}</p>
            <p className="mt-0.5 text-[11.5px] leading-snug text-zinc-700/85">{sub}</p>
          </div>
        </div>
      </div>
      <div className="border-t border-black/[0.06] bg-white/40 px-4 py-1.5 text-[10.5px] font-medium uppercase tracking-[0.14em] text-zinc-600">
        {brand}
      </div>
    </div>
  )
}

function QtyBtn({
  onClick,
  ariaLabel,
  children,
}: {
  onClick: () => void
  ariaLabel: string
  children: React.ReactNode
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={ariaLabel}
      className="grid h-11 w-11 place-items-center rounded-full text-[18px] text-zinc-700 transition-colors hover:bg-black/5"
    >
      {children}
    </button>
  )
}

function ShareDot({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <button
      type="button"
      aria-label={label}
      className="grid h-6 w-6 place-items-center rounded-full border border-black/10 text-[10px] text-zinc-700 transition-colors hover:bg-black/5 hover:text-zinc-900"
    >
      {children}
    </button>
  )
}

/* ---------- icons ---------- */

function DisplayIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
      <rect x="3" y="4" width="18" height="12" rx="2" stroke="currentColor" strokeWidth="1.5" />
      <path d="M9 20h6M12 16v4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}
function TypeIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
      <path d="M4 6h16M4 12h10M4 18h16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  )
}
function BarcodeIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
      <path
        d="M4 5v14M7 5v14M10 5v9M13 5v14M16 5v9M19 5v14"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
    </svg>
  )
}
function TruckIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
      <path
        d="M3 7h11v9H3zM14 10h4l3 3v3h-7"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <circle cx="7.5" cy="17.5" r="1.6" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="17" cy="17.5" r="1.6" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  )
}
