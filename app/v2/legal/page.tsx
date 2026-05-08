import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Legal — Protech',
}

const docs = [
  { href: '/v2/legal/privacy', label: 'Privacy policy', desc: 'How we handle your data, what we collect, and what we don\'t.' },
  { href: '/v2/legal/terms', label: 'Terms of service', desc: 'The contract between you and Protech when using this site.' },
  { href: '/v2/legal/sales', label: 'Sales terms', desc: 'Warranty, returns, fleet PO terms, leasing conditions.' },
]

export default function LegalIndex() {
  return (
    <article className="bg-[var(--c-bg)] px-6 pb-20 pt-14 lg:px-10 lg:pt-24">
      <div className="mx-auto max-w-[760px]">
        <p className="flex items-center gap-2 text-[12px] font-medium uppercase tracking-[0.18em] text-zinc-500">
          <span aria-hidden className="h-px w-7 bg-zinc-400" />
          Legal
        </p>
        <h1
          className="mt-5 text-[clamp(36px,5vw,64px)] font-semibold leading-[1] text-[var(--c-text)]"
          style={{ letterSpacing: '-0.022em' }}
        >
          The boring papers, in plain English.
        </h1>
        <p className="mt-5 max-w-[60ch] text-[15px] leading-[1.6] text-zinc-700">
          Protech is a registered Mongolian LLC (улсын бүртгэл №...). The
          documents below govern this site, our online sales, and the fleet/leasing
          contracts we sign with you.
        </p>

        <ul className="mt-10 divide-y divide-black/[0.08] rounded-[20px] border border-black/[0.06] bg-white">
          {docs.map((d) => (
            <li key={d.href}>
              <Link
                href={d.href}
                className="group flex items-start justify-between gap-6 px-6 py-6 transition-colors hover:bg-zinc-50 sm:px-8"
              >
                <div>
                  <p className="text-[16px] font-semibold text-zinc-900">{d.label}</p>
                  <p className="mt-1 text-[13px] text-zinc-600">{d.desc}</p>
                </div>
                <span
                  aria-hidden
                  className="mt-1 text-[18px] text-zinc-400 transition-transform duration-[240ms] group-hover:translate-x-0.5"
                >
                  →
                </span>
              </Link>
            </li>
          ))}
        </ul>

        <p className="mt-10 text-[13px] text-zinc-500">
          Translations available in Mongolian on request — write to{' '}
          <a href="mailto:legal@protech.mn" className="text-[var(--c-accent)] underline-offset-4 hover:underline">
            legal@protech.mn
          </a>
          .
        </p>
      </div>
    </article>
  )
}
