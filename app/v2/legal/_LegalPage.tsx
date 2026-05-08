import Link from 'next/link'
import type { ReactNode } from 'react'

type LegalPageProps = {
  kicker: string
  title: string
  updated: string
  sections: { heading: string; body: string }[]
  back?: { href: string; label: string }
  children?: ReactNode
}

export function LegalPage({ kicker, title, updated, sections, back, children }: LegalPageProps) {
  return (
    <article className="bg-[var(--c-bg)] px-6 pb-20 pt-14 lg:px-10 lg:pt-24">
      <div className="mx-auto max-w-[760px]">
        <p className="flex items-center gap-2 text-[12px] font-medium uppercase tracking-[0.18em] text-zinc-500">
          <span aria-hidden className="h-px w-7 bg-zinc-400" />
          {kicker}
        </p>
        <h1
          className="mt-5 text-[clamp(36px,5vw,64px)] font-semibold leading-[1] text-[var(--c-text)]"
          style={{ letterSpacing: '-0.022em' }}
        >
          {title}
        </h1>
        <p className="mt-4 text-[13px] text-zinc-500">Last updated · {updated}</p>

        <div className="mt-10 space-y-10 text-[15px] leading-[1.7] text-zinc-800">
          {sections.map((s) => (
            <section key={s.heading}>
              <h2
                className="text-[clamp(18px,1.5vw,22px)] font-semibold leading-[1.2]"
                style={{ letterSpacing: '-0.012em' }}
              >
                {s.heading}
              </h2>
              <p className="mt-3 whitespace-pre-line">{s.body}</p>
            </section>
          ))}
          {children}
        </div>

        {back ? (
          <p className="mt-14 text-[13px]">
            <Link href={back.href} className="font-semibold text-[var(--c-accent)] hover:text-[var(--c-accent-hover)]">
              ← {back.label}
            </Link>
          </p>
        ) : null}
      </div>
    </article>
  )
}
