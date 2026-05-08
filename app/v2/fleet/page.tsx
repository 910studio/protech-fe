import type { Metadata } from 'next'
import Link from 'next/link'
import * as motion from 'motion/react-client'
import { CompactTile } from '../_components/CompactTile'
import { CuratorNote } from '../_components/CuratorNote'
import { tileReveal } from '@/app/lib/motion'

export const metadata: Metadata = {
  title: 'Fleet — Protech',
  description:
    "Mixed-brand procurement, configured, paid for, delivered. Two-year warranty. Setup, MDM enrollment, and Mongolian-language onboarding on every device.",
}

const inclusions = [
  {
    kicker: '01 / Procurement',
    title: 'One PO. Three brands.',
    body:
      'Mixed Apple, Lenovo, and Dell on a single purchase order. Currency hedged. Cross-brand fleet pricing.',
  },
  {
    kicker: '02 / Configuration',
    title: 'Imaged before delivery.',
    body:
      'Each device arrives pre-enrolled in your MDM, configured to your IT baseline, with the user account ready to go.',
  },
  {
    kicker: '03 / Onboarding',
    title: 'Mongolian-language setup.',
    body:
      'A bilingual onboarding kit and 30-minute video walkthrough in МN — the device works on day one, not day eight.',
  },
  {
    kicker: '04 / Warranty',
    title: 'Two years, on us.',
    body:
      'Two-year coverage on every fleet device. Loaner units within Ulaanbaatar in 24 hours. Hardware swaps at our cost.',
  },
]

const tiers = [
  {
    name: 'Squad',
    range: '5—24 devices',
    save: '4%',
    note: 'Same-week onboarding. One contact at Protech.',
  },
  {
    name: 'Department',
    range: '25—99 devices',
    save: '7%',
    note: 'Dedicated rollout coordinator. Custom imaging.',
  },
  {
    name: 'Enterprise',
    range: '100+ devices',
    save: '11% + custom',
    note: 'Annual contract. Volume hardware refresh program.',
  },
]

export default function FleetPage() {
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
            Fleet program
          </motion.p>
          <motion.h1
            {...tileReveal}
            transition={{ ...tileReveal.transition, delay: 0.08 }}
            className="mt-5 text-[clamp(44px,7vw,96px)] font-semibold leading-[0.96] text-[var(--c-text)]"
            style={{ letterSpacing: '-0.022em' }}
          >
            Order in fleet.<br />
            Onboarded in a week.
          </motion.h1>
          <motion.p
            {...tileReveal}
            transition={{ ...tileReveal.transition, delay: 0.16 }}
            className="mt-6 max-w-[60ch] text-[clamp(15px,1.2vw,18px)] leading-[1.5] text-zinc-700"
          >
            Mixed-brand procurement, configured, paid for, delivered. Two-year
            warranty. Setup, MDM enrollment, and Mongolian-language onboarding
            on every device.
          </motion.p>
          <motion.div
            {...tileReveal}
            transition={{ ...tileReveal.transition, delay: 0.24 }}
            className="mt-9 flex flex-wrap items-center gap-4"
          >
            <Link
              href="#talk"
              className="inline-flex h-12 items-center rounded-full bg-[var(--c-accent)] px-7 text-[15px] font-medium text-white transition-colors duration-[320ms] hover:bg-[var(--c-accent-hover)]"
            >
              Talk to fleet
              <span aria-hidden className="ml-2">→</span>
            </Link>
            <Link
              href="#tiers"
              className="inline-flex h-12 items-center text-[15px] font-medium text-[var(--c-text)] transition-colors hover:text-[var(--c-accent)]"
            >
              See tier pricing
            </Link>
          </motion.div>
        </div>
      </section>

      {/* INCLUSIONS */}
      <section className="bg-[var(--c-bg)] px-5 py-5 lg:px-6 lg:py-6">
        <div className="mx-auto max-w-[var(--max-w)]">
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:gap-6">
            {inclusions.map((it, i) => (
              <motion.article
                key={it.kicker}
                {...tileReveal}
                transition={{ ...tileReveal.transition, delay: i * 0.06 }}
                className="rounded-[28px] bg-[var(--c-bg-card)] p-8 shadow-[0_1px_2px_rgba(0,0,0,0.04)] sm:rounded-[32px] sm:p-10"
              >
                <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-zinc-500">
                  {it.kicker}
                </p>
                <h3
                  className="mt-3 text-[clamp(22px,2vw,28px)] font-semibold leading-[1.1]"
                  style={{ letterSpacing: '-0.014em' }}
                >
                  {it.title}
                </h3>
                <p className="mt-3 max-w-[36ch] text-[14px] leading-[1.5] text-zinc-700">
                  {it.body}
                </p>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* CURATOR NOTE */}
      <section className="bg-[var(--c-bg)] px-5 py-5 lg:px-6 lg:py-6">
        <div className="mx-auto max-w-[var(--max-w)]">
          <CuratorNote
            kicker="Why fleet"
            title={<>One bill.<br />One warranty.<br />One phone call.</>}
            body={
              <p>
                The status quo is twelve invoices, three warranty desks, and
                ten weeks of IT setup. Fleet collapses that into a single
                purchase order, a single warranty contact at Protech, and a
                rollout that finishes the same week as the PO.
              </p>
            }
            delay={0.0}
          />
        </div>
      </section>

      {/* TIERS */}
      <section id="tiers" className="bg-[var(--c-bg)] px-5 py-5 lg:px-6 lg:py-6">
        <div className="mx-auto max-w-[var(--max-w)]">
          <div className="mb-6 lg:mb-8">
            <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-zinc-500">
              Volume tiers
            </p>
            <h2
              className="mt-3 text-[clamp(28px,3.4vw,44px)] font-semibold leading-[1.05]"
              style={{ letterSpacing: '-0.018em' }}
            >
              Save more as the team grows.
            </h2>
          </div>
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-3 lg:gap-6">
            {tiers.map((t, i) => (
              <motion.article
                key={t.name}
                {...tileReveal}
                transition={{ ...tileReveal.transition, delay: i * 0.06 }}
                className="flex flex-col justify-between rounded-[28px] border border-black/[0.06] bg-white p-8 shadow-[0_1px_2px_rgba(0,0,0,0.03)] sm:rounded-[32px]"
              >
                <div>
                  <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-zinc-500">
                    {t.name}
                  </p>
                  <p
                    className="mt-3 text-[clamp(28px,3vw,40px)] font-semibold leading-[1]"
                    style={{ letterSpacing: '-0.018em' }}
                  >
                    Save {t.save}
                  </p>
                  <p className="mt-2 text-[13px] text-zinc-600">{t.range}</p>
                  <p className="mt-5 text-[13px] leading-[1.5] text-zinc-700">
                    {t.note}
                  </p>
                </div>
                <Link
                  href="#talk"
                  className="mt-8 inline-flex h-10 items-center text-[14px] font-semibold text-[var(--c-accent)] hover:text-[var(--c-accent-hover)]"
                >
                  Get a quote
                  <span aria-hidden className="ml-1.5">→</span>
                </Link>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* TRADE-IN */}
      <section className="bg-[var(--c-bg)] px-5 py-5 lg:px-6 lg:py-6">
        <div className="mx-auto max-w-[var(--max-w)]">
          <CompactTile
            brand="TRADE-IN PROGRAM"
            title={<>Trade in any brand. Keep your budget.</>}
            body="Bring your team's old fleet — Apple, Lenovo, Dell, HP, even Asus. We assess, we credit, we recycle responsibly. Up to ₮3.5M back per device."
            href="/v2/fleet/trade-in"
            image="/v2/products/protech/macbook-air-m4.png"
            imageAlt="MacBook Air trade-in"
            imageW={800}
            imageH={800}
            theme="lilac"
            imageScale={1.3}
            imageAnchor="bottom-right"
          />
        </div>
      </section>

      {/* CONTACT CTA */}
      <section id="talk" className="bg-[var(--c-bg)] px-5 py-10 lg:px-6 lg:py-16">
        <div className="mx-auto max-w-[var(--max-w)]">
          <article className="relative flex flex-col items-start justify-between gap-6 overflow-hidden rounded-[28px] bg-[#0f0f12] p-10 text-white sm:flex-row sm:items-center sm:rounded-[32px] sm:p-14">
            <div className="max-w-[40ch]">
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/55">
                Ready to scope?
              </p>
              <h2
                className="mt-3 text-[clamp(28px,3vw,40px)] font-semibold leading-[1.1]"
                style={{ letterSpacing: '-0.014em' }}
              >
                Send the headcount.<br />Get a quote in 48h.
              </h2>
              <p className="mt-4 max-w-[42ch] text-[14px] leading-[1.5] text-white/70">
                fleet@protech.mn · +976 7700 0001 · Ulaanbaatar HQ
              </p>
            </div>
            <Link
              href="mailto:fleet@protech.mn"
              className="inline-flex h-12 items-center rounded-full bg-white px-7 text-[14px] font-semibold text-zinc-900 transition-colors hover:bg-zinc-100"
            >
              Email fleet
              <span aria-hidden className="ml-2">→</span>
            </Link>
          </article>
        </div>
      </section>
    </>
  )
}
