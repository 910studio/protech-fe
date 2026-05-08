import type { Metadata } from 'next'
import Link from 'next/link'
import * as motion from 'motion/react-client'
import { tileReveal } from '@/app/lib/motion'

export const metadata: Metadata = {
  title: 'Support — Protech',
  description:
    'Reach Protech support. Phone, email, walk-in. Fleet customers get 24-hour loaner units inside Ulaanbaatar.',
}

const channels = [
  {
    label: 'Phone',
    value: '+976 7700 0000',
    note: 'Mon—Fri, 09:00—18:00 (UB)',
    href: 'tel:+97677000000',
    pastel: 'lilac',
  },
  {
    label: 'Email',
    value: 'support@protech.mn',
    note: 'Replies within 4 hours, business days',
    href: 'mailto:support@protech.mn',
    pastel: 'butter',
  },
  {
    label: 'Walk-in',
    value: 'Olympic St 12, Sükhbaatar',
    note: 'Mon—Sat, 10:00—20:00',
    href: 'https://maps.google.com/?q=Olympic+St+12+Ulaanbaatar',
    pastel: 'mint',
  },
] as const

const faq = [
  {
    q: 'How fast is fleet support?',
    a: 'Fleet customers get 24-hour loaner unit delivery anywhere in Ulaanbaatar. We swap hardware on-site for any failure under warranty. Outside UB, replacement is shipped overnight via Tushig.',
  },
  {
    q: 'Do you support devices not bought from Protech?',
    a: 'Yes. We diagnose any Apple, Lenovo, Dell, or Microsoft device for ₮90,000. If you bring it in for trade-in or fleet replacement, the diagnostic fee is credited back.',
  },
  {
    q: 'What languages do you support?',
    a: 'Mongolian and English. All onboarding materials, error walkthroughs, and warranty paperwork are bilingual. Russian on request.',
  },
  {
    q: 'How does AppleCare+ work in Mongolia?',
    a: 'AppleCare+ is included on every fleet Apple device. Repairs route through us — we handle the Apple Authorized Service Provider in Seoul on your behalf. Average turnaround: 8 business days.',
  },
  {
    q: 'What about Lenovo Premier Support?',
    a: 'Lenovo Premier Support is bundled on every ThinkPad-class device. Phone diagnostics 24/7, parts dispatched from Singapore, on-site service available for fleets of 25+.',
  },
  {
    q: 'Can you set up MDM?',
    a: 'Yes. We deploy and configure Apple Business Manager + Jamf, Microsoft Intune, or Lenovo cloud-based device management. First 50 devices included on Department-tier and above.',
  },
]

const pastelMap: Record<(typeof channels)[number]['pastel'], string> = {
  lilac: 'var(--pastel-lilac)',
  butter: 'var(--pastel-butter)',
  mint: 'var(--pastel-mint)',
}

export default function SupportPage() {
  return (
    <>
      {/* HERO */}
      <section className="bg-[var(--c-bg)] px-6 pb-10 pt-14 lg:px-10 lg:pb-12 lg:pt-24">
        <div className="mx-auto max-w-[var(--max-w)]">
          <motion.p
            {...tileReveal}
            className="flex items-center gap-2 text-[12px] font-medium uppercase tracking-[0.18em] text-zinc-500"
          >
            <span aria-hidden className="h-px w-7 bg-zinc-400" />
            Support
          </motion.p>
          <motion.h1
            {...tileReveal}
            transition={{ ...tileReveal.transition, delay: 0.08 }}
            className="mt-5 text-[clamp(40px,6.4vw,84px)] font-semibold leading-[0.98] text-[var(--c-text)]"
            style={{ letterSpacing: '-0.022em' }}
          >
            We pick up the phone.
          </motion.h1>
          <motion.p
            {...tileReveal}
            transition={{ ...tileReveal.transition, delay: 0.16 }}
            className="mt-6 max-w-[60ch] text-[clamp(15px,1.2vw,18px)] leading-[1.5] text-zinc-700"
          >
            Same-day diagnostics, 24-hour fleet loaners, and a Mongolian-language
            walkthrough on every warranty claim. No queue, no L1, no script.
          </motion.p>
        </div>
      </section>

      {/* CHANNELS */}
      <section className="bg-[var(--c-bg)] px-5 py-5 lg:px-6 lg:py-6">
        <div className="mx-auto max-w-[var(--max-w)]">
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-3 lg:gap-6">
            {channels.map((c, i) => (
              <motion.div
                key={c.label}
                {...tileReveal}
                transition={{ ...tileReveal.transition, delay: i * 0.06 }}
              >
                <Link
                  href={c.href}
                  className="group flex h-full flex-col justify-between rounded-[28px] p-8 transition-transform duration-[320ms] ease-[cubic-bezier(0.25,0.1,0.3,1)] hover:-translate-y-1 sm:rounded-[32px] sm:p-10"
                  style={{ background: pastelMap[c.pastel] }}
                >
                  <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-zinc-800/70">
                    {c.label}
                  </p>
                  <p
                    className="mt-6 text-[clamp(22px,2vw,28px)] font-semibold leading-[1.1] text-zinc-900"
                    style={{ letterSpacing: '-0.014em' }}
                  >
                    {c.value}
                  </p>
                  <p className="mt-3 text-[13px] leading-[1.5] text-zinc-800/75">
                    {c.note}
                  </p>
                  <span className="mt-8 inline-flex items-center text-[13px] font-semibold text-zinc-900">
                    Open
                    <span
                      aria-hidden
                      className="ml-1.5 transition-transform duration-[320ms] group-hover:translate-x-0.5"
                    >
                      →
                    </span>
                  </span>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-[var(--c-bg)] px-5 py-5 lg:px-6 lg:py-6">
        <div className="mx-auto max-w-[var(--max-w)]">
          <div className="mb-6">
            <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-zinc-500">
              FAQ
            </p>
            <h2
              className="mt-3 text-[clamp(28px,3.4vw,44px)] font-semibold leading-[1.05]"
              style={{ letterSpacing: '-0.018em' }}
            >
              The questions teams actually ask.
            </h2>
          </div>
          <div className="overflow-hidden rounded-[28px] border border-black/[0.06] bg-white">
            {faq.map((item, i) => (
              <details
                key={item.q}
                className={[
                  'group',
                  i > 0 ? 'border-t border-black/[0.05]' : '',
                ].join(' ')}
              >
                <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-6 py-5 text-[15px] font-semibold text-zinc-900 transition-colors hover:bg-zinc-50 sm:px-8 sm:py-6">
                  {item.q}
                  <span
                    aria-hidden
                    className="text-[20px] text-zinc-400 transition-transform duration-[240ms] group-open:rotate-45"
                  >
                    +
                  </span>
                </summary>
                <p className="px-6 pb-6 text-[14px] leading-[1.6] text-zinc-700 sm:px-8 sm:pb-7">
                  {item.a}
                </p>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[var(--c-bg)] px-5 py-10 lg:px-6 lg:py-16">
        <div className="mx-auto max-w-[var(--max-w)]">
          <article className="relative flex flex-col items-start justify-between gap-6 overflow-hidden rounded-[28px] bg-[#0f0f12] p-10 text-white sm:flex-row sm:items-center sm:rounded-[32px] sm:p-14">
            <div className="max-w-[40ch]">
              <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-white/55">
                Fleet customer?
              </p>
              <h2
                className="mt-3 text-[clamp(26px,3vw,38px)] font-semibold leading-[1.1]"
                style={{ letterSpacing: '-0.014em' }}
              >
                Skip the queue. Use the priority line.
              </h2>
            </div>
            <Link
              href="mailto:fleet-support@protech.mn"
              className="inline-flex h-12 items-center rounded-full bg-white px-7 text-[14px] font-semibold text-zinc-900 transition-colors hover:bg-zinc-100"
            >
              fleet-support@protech.mn
              <span aria-hidden className="ml-2">→</span>
            </Link>
          </article>
        </div>
      </section>
    </>
  )
}
