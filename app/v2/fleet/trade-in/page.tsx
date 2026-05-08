import type { Metadata } from 'next'
import Link from 'next/link'
import * as motion from 'motion/react-client'
import { tileReveal } from '@/app/lib/motion'

export const metadata: Metadata = {
  title: 'Trade-in — Protech Fleet',
  description:
    'Trade in any brand — Apple, Lenovo, Dell, HP, Asus. Up to ₮3.5M back per device. Responsible recycling, fleet credit applied directly to your next PO.',
}

const conditions = [
  {
    grade: 'A',
    label: 'Excellent',
    body:
      'Like-new condition. Minor wear from normal use. Fully functional, all peripherals included.',
    multiplier: '100%',
  },
  {
    grade: 'B',
    label: 'Good',
    body:
      'Visible wear, light scuffs. Battery health 80%+. Screen and keyboard fully functional.',
    multiplier: '70%',
  },
  {
    grade: 'C',
    label: 'Functional',
    body:
      'Heavier wear, dings or dents. Battery degraded. Still works — turns on and operates.',
    multiplier: '40%',
  },
]

const examples = [
  { device: 'MacBook Pro 14" M3', a: '₮3,500,000', b: '₮2,450,000', c: '₮1,400,000' },
  { device: 'MacBook Air 13" M2', a: '₮2,200,000', b: '₮1,540,000', c: '₮880,000' },
  { device: 'Dell XPS 13 (2023)', a: '₮1,400,000', b: '₮980,000', c: '₮560,000' },
  { device: 'iPad Air 11" M2', a: '₮1,200,000', b: '₮840,000', c: '₮480,000' },
  { device: 'Lenovo ThinkPad X1 Gen 11', a: '₮1,800,000', b: '₮1,260,000', c: '₮720,000' },
]

export default function TradeInPage() {
  return (
    <>
      {/* HERO */}
      <section className="bg-[var(--c-bg)] px-6 pb-10 pt-14 lg:px-10 lg:pb-16 lg:pt-24">
        <div className="mx-auto max-w-[var(--max-w)]">
          <motion.p
            {...tileReveal}
            className="flex items-center gap-2 text-[12px] font-medium uppercase tracking-[0.18em] text-zinc-500"
          >
            <span aria-hidden className="h-px w-7 bg-zinc-400" />
            Fleet · Trade-in
          </motion.p>
          <motion.h1
            {...tileReveal}
            transition={{ ...tileReveal.transition, delay: 0.08 }}
            className="mt-5 text-[clamp(40px,6.4vw,84px)] font-semibold leading-[0.98] text-[var(--c-text)]"
            style={{ letterSpacing: '-0.022em' }}
          >
            Trade in any brand.<br />
            Keep your budget.
          </motion.h1>
          <motion.p
            {...tileReveal}
            transition={{ ...tileReveal.transition, delay: 0.16 }}
            className="mt-6 max-w-[58ch] text-[clamp(15px,1.2vw,18px)] leading-[1.5] text-zinc-700"
          >
            Bring your team&apos;s old fleet — Apple, Lenovo, Dell, HP, even Asus.
            We assess on-site, credit your next PO, and recycle responsibly through
            certified e-waste partners. Up to ₮3.5M back per device.
          </motion.p>
        </div>
      </section>

      {/* GRADES */}
      <section className="bg-[var(--c-bg)] px-5 py-5 lg:px-6 lg:py-6">
        <div className="mx-auto max-w-[var(--max-w)]">
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-3 lg:gap-6">
            {conditions.map((c, i) => (
              <motion.article
                key={c.grade}
                {...tileReveal}
                transition={{ ...tileReveal.transition, delay: i * 0.06 }}
                className="rounded-[28px] bg-[var(--c-bg-card)] p-8 shadow-[0_1px_2px_rgba(0,0,0,0.04)] sm:rounded-[32px]"
              >
                <p
                  className="text-[clamp(56px,5vw,72px)] font-semibold leading-[0.9] text-[var(--c-accent)]"
                  style={{ letterSpacing: '-0.04em' }}
                >
                  {c.grade}
                </p>
                <p className="mt-2 text-[14px] font-semibold uppercase tracking-[0.18em] text-zinc-500">
                  {c.label}
                </p>
                <p className="mt-4 text-[14px] leading-[1.5] text-zinc-700">
                  {c.body}
                </p>
                <div className="mt-6 inline-flex items-center gap-2 rounded-full bg-zinc-100 px-3 py-1.5 text-[12px] font-semibold text-zinc-700">
                  <span className="h-1.5 w-1.5 rounded-full bg-[var(--c-accent)]" />
                  {c.multiplier} of base credit
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* EXAMPLE TABLE */}
      <section className="bg-[var(--c-bg)] px-5 py-5 lg:px-6 lg:py-6">
        <div className="mx-auto max-w-[var(--max-w)]">
          <div className="mb-6">
            <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-zinc-500">
              Sample credits
            </p>
            <h2
              className="mt-3 text-[clamp(28px,3.4vw,44px)] font-semibold leading-[1.05]"
              style={{ letterSpacing: '-0.018em' }}
            >
              What we&apos;re paying right now.
            </h2>
            <p className="mt-3 max-w-[60ch] text-[14px] text-zinc-600">
              Indicative MNT values, refreshed monthly. Final credit set at on-site
              assessment.
            </p>
          </div>

          <div className="overflow-hidden rounded-[28px] border border-black/[0.06] bg-white">
            <table className="w-full text-left">
              <thead className="bg-zinc-50 text-[11px] font-semibold uppercase tracking-[0.18em] text-zinc-500">
                <tr>
                  <th className="px-6 py-4">Device</th>
                  <th className="px-6 py-4">Grade A</th>
                  <th className="px-6 py-4">Grade B</th>
                  <th className="px-6 py-4">Grade C</th>
                </tr>
              </thead>
              <tbody className="text-[14px] text-zinc-800">
                {examples.map((row) => (
                  <tr key={row.device} className="border-t border-black/[0.05]">
                    <td className="px-6 py-4 font-medium">{row.device}</td>
                    <td className="px-6 py-4 tabular-nums">{row.a}</td>
                    <td className="px-6 py-4 tabular-nums text-zinc-700">{row.b}</td>
                    <td className="px-6 py-4 tabular-nums text-zinc-700">{row.c}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[var(--c-bg)] px-5 py-10 lg:px-6 lg:py-16">
        <div className="mx-auto max-w-[var(--max-w)]">
          <article className="relative flex flex-col items-start justify-between gap-6 overflow-hidden rounded-[28px] bg-[var(--c-accent)] p-10 text-white sm:flex-row sm:items-center sm:rounded-[32px] sm:p-14">
            <div className="max-w-[40ch]">
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/65">
                Ready to estimate?
              </p>
              <h2
                className="mt-3 text-[clamp(26px,3vw,38px)] font-semibold leading-[1.1]"
                style={{ letterSpacing: '-0.014em' }}
              >
                Send your inventory.<br />Get an estimate in 48h.
              </h2>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link
                href="mailto:tradein@protech.mn"
                className="inline-flex h-12 items-center rounded-full bg-white px-7 text-[14px] font-semibold text-[var(--c-accent)] transition-colors hover:bg-zinc-100"
              >
                Email trade-in
                <span aria-hidden className="ml-2">→</span>
              </Link>
              <Link
                href="/v2/fleet"
                className="inline-flex h-12 items-center text-[14px] font-medium text-white/80 transition-colors hover:text-white"
              >
                Back to fleet
              </Link>
            </div>
          </article>
        </div>
      </section>
    </>
  )
}
