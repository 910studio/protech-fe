import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import * as motion from 'motion/react-client'
import { tileReveal } from '@/app/lib/motion'

export const metadata: Metadata = {
  title: 'Field notes — Protech',
  description:
    'Procurement, IT, and fleet management notes from the team running hardware for Mongolia\'s largest companies.',
}

type Post = {
  slug: string
  category: 'Procurement' | 'IT' | 'Fleet' | 'Field'
  title: string
  excerpt: string
  date: string
  readMin: number
  pastel: 'lilac' | 'butter' | 'sage' | 'coral' | 'mint' | 'sky' | 'cream'
  image: string
  imageAlt: string
  imageScale: number
}

const posts: Post[] = [
  {
    slug: 'mixed-fleet-mongolia',
    category: 'Procurement',
    title: 'Why Mongolia’s biggest teams run mixed fleets.',
    excerpt:
      'Apple for design, ThinkPad for finance, Surface for sales. The case for not picking a side.',
    date: '2026-04-22',
    readMin: 6,
    pastel: 'lilac',
    image: '/v2/products/protech/macbook-pro-m4.png',
    imageAlt: 'MacBook Pro M4',
    imageScale: 1.15,
  },
  {
    slug: 'mdm-without-tears',
    category: 'IT',
    title: 'MDM without the rollout tears.',
    excerpt:
      'Apple Business Manager + Intune + Jamf. What we deploy on day one and what we wait on.',
    date: '2026-04-09',
    readMin: 8,
    pastel: 'butter',
    image: '/v2/products/protech/ipad-air-m4.png',
    imageAlt: 'iPad Air M4',
    imageScale: 1.0,
  },
  {
    slug: 'leasing-vs-cash',
    category: 'Procurement',
    title: 'Leasing vs cash, on a Mongolian P&L.',
    excerpt:
      'When 0% finance actually beats paying cash, and when it doesn’t. With three real numbers.',
    date: '2026-03-28',
    readMin: 5,
    pastel: 'cream',
    image: '/v2/products/protech/lenovo-ultra-9.png',
    imageAlt: 'Lenovo Ultra 9',
    imageScale: 1.1,
  },
  {
    slug: 'm4-vs-x-elite',
    category: 'Field',
    title: 'M4 vs Snapdragon X Elite: 60-day field report.',
    excerpt:
      'Same team, half on Mac, half on Copilot+. Battery, build quality, and the apps that broke.',
    date: '2026-03-12',
    readMin: 9,
    pastel: 'coral',
    image: '/v2/products/protech/macbook-air-m4.png',
    imageAlt: 'MacBook Air M4',
    imageScale: 1.15,
  },
  {
    slug: 'trade-in-recycling',
    category: 'Fleet',
    title: 'Where your old laptops actually go.',
    excerpt:
      'A walk through our trade-in pipeline and the certified recycler we use in Bayanzürkh.',
    date: '2026-02-21',
    readMin: 4,
    pastel: 'mint',
    image: '/v2/products/protech/dell-pro-14.png',
    imageAlt: 'Dell Pro 14',
    imageScale: 1.05,
  },
  {
    slug: 'spec-sheet-trap',
    category: 'Procurement',
    title: 'The spec sheet is a trap.',
    excerpt:
      'Why "32 GB unified memory" beats "64 GB DDR5" for nine out of ten roles you’re hiring for.',
    date: '2026-02-04',
    readMin: 7,
    pastel: 'sky',
    image: '/v2/products/protech/dell-pro-16.png',
    imageAlt: 'Dell Pro 16',
    imageScale: 1.1,
  },
]

const pastelMap: Record<Post['pastel'], string> = {
  lilac: 'var(--pastel-lilac)',
  butter: 'var(--pastel-butter)',
  sage: 'var(--pastel-sage)',
  coral: 'var(--pastel-coral)',
  mint: 'var(--pastel-mint)',
  sky: 'var(--pastel-sky)',
  cream: 'var(--pastel-cream)',
}

function fmtDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })
}

export default function BlogPage() {
  const [feature, ...rest] = posts

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
            Field notes
          </motion.p>
          <motion.h1
            {...tileReveal}
            transition={{ ...tileReveal.transition, delay: 0.08 }}
            className="mt-5 text-[clamp(40px,6.4vw,84px)] font-semibold leading-[0.98] text-[var(--c-text)]"
            style={{ letterSpacing: '-0.022em' }}
          >
            Notes from the<br />procurement floor.
          </motion.h1>
          <motion.p
            {...tileReveal}
            transition={{ ...tileReveal.transition, delay: 0.16 }}
            className="mt-6 max-w-[60ch] text-[clamp(15px,1.2vw,18px)] leading-[1.5] text-zinc-700"
          >
            Procurement, IT, and fleet notes from the team running hardware for
            Mongolia&apos;s largest companies. Practical, opinionated, in plain
            English.
          </motion.p>
        </div>
      </section>

      {/* FEATURE POST */}
      <section className="bg-[var(--c-bg)] px-5 pb-5 lg:px-6 lg:pb-6">
        <div className="mx-auto max-w-[var(--max-w)]">
          <motion.div
            {...tileReveal}
            transition={{ ...tileReveal.transition, delay: 0.24 }}
          >
            <Link
              href={`/v2/blog/${feature.slug}`}
              className="group relative flex min-h-[480px] flex-col justify-between overflow-hidden rounded-[28px] p-10 transition-[transform,box-shadow] duration-[320ms] ease-[cubic-bezier(0.25,0.1,0.3,1)] hover:-translate-y-1 hover:shadow-[0_24px_48px_-22px_rgba(0,0,0,0.22),0_4px_12px_-4px_rgba(0,0,0,0.08)] sm:rounded-[32px] sm:p-14 lg:min-h-[520px]"
              style={{ background: pastelMap[feature.pastel] }}
            >
              <header className="relative z-10 max-w-[60%]">
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-zinc-800/70">
                  {feature.category} · {fmtDate(feature.date)} · {feature.readMin} min read
                </p>
                <h2
                  className="mt-5 text-[clamp(34px,4.6vw,60px)] font-semibold leading-[1.02] text-zinc-900"
                  style={{ letterSpacing: '-0.022em' }}
                  dangerouslySetInnerHTML={{ __html: feature.title }}
                />
                <p
                  className="mt-5 max-w-[44ch] text-[clamp(15px,1.2vw,18px)] leading-[1.5] text-zinc-800/80"
                  dangerouslySetInnerHTML={{ __html: feature.excerpt }}
                />
              </header>
              <span className="relative z-10 inline-flex items-center text-[14px] font-semibold text-zinc-900">
                Read the field note
                <span
                  aria-hidden
                  className="ml-2 transition-transform duration-[320ms] group-hover:translate-x-0.5"
                >
                  →
                </span>
              </span>

              {/* OVERSIZED PRODUCT IMAGE — bleeds bottom-right */}
              <div
                className="pointer-events-none absolute bottom-[-8%] right-[-8%] transition-transform duration-[480ms] ease-[cubic-bezier(0.25,0.1,0.3,1)] group-hover:scale-[1.04]"
                style={{
                  width: `${Math.round(feature.imageScale * 50)}%`,
                  aspectRatio: '1 / 1',
                }}
              >
                <Image
                  src={feature.image}
                  alt={feature.imageAlt}
                  fill
                  sizes="(min-width: 1024px) 40vw, 80vw"
                  loading="eager"
                  className="object-contain"
                  style={{ objectPosition: 'right bottom' }}
                />
              </div>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* GRID */}
      <section className="bg-[var(--c-bg)] px-5 py-5 lg:px-6 lg:py-6">
        <div className="mx-auto max-w-[var(--max-w)]">
          <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-3 lg:gap-6">
            {rest.map((p, i) => (
              <motion.div
                key={p.slug}
                {...tileReveal}
                transition={{ ...tileReveal.transition, delay: i * 0.04 }}
              >
                <Link
                  href={`/v2/blog/${p.slug}`}
                  className="group relative flex h-full min-h-[380px] flex-col justify-between overflow-hidden rounded-[28px] p-7 transition-[transform,box-shadow] duration-[320ms] ease-[cubic-bezier(0.25,0.1,0.3,1)] hover:-translate-y-1 hover:shadow-[0_22px_50px_-22px_rgba(0,0,0,0.18),0_4px_12px_-4px_rgba(0,0,0,0.06)] sm:rounded-[32px] sm:p-8"
                  style={{ background: pastelMap[p.pastel] }}
                >
                  <header className="relative z-10 max-w-[80%]">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-zinc-800/70">
                      {p.category} · {p.readMin} min
                    </p>
                    <h3
                      className="mt-4 text-[clamp(20px,2vw,26px)] font-semibold leading-[1.1] text-zinc-900"
                      style={{ letterSpacing: '-0.014em' }}
                      dangerouslySetInnerHTML={{ __html: p.title }}
                    />
                    <p
                      className="mt-3 max-w-[26ch] text-[13px] leading-[1.5] text-zinc-800/80"
                      dangerouslySetInnerHTML={{ __html: p.excerpt }}
                    />
                  </header>

                  <div className="relative z-10 mt-8 flex items-center justify-between">
                    <p className="text-[12px] tabular-nums text-zinc-700">
                      {fmtDate(p.date)}
                    </p>
                    <span className="inline-flex items-center text-[13px] font-semibold text-zinc-900">
                      Read
                      <span
                        aria-hidden
                        className="ml-1.5 transition-transform duration-[320ms] group-hover:translate-x-0.5"
                      >
                        →
                      </span>
                    </span>
                  </div>

                  {/* PRODUCT IMAGE — bleeds bottom-right, smaller */}
                  <div
                    className="pointer-events-none absolute bottom-[-10%] right-[-10%] transition-transform duration-[480ms] ease-[cubic-bezier(0.25,0.1,0.3,1)] group-hover:scale-[1.04]"
                    style={{
                      width: `${Math.round(p.imageScale * 55)}%`,
                      aspectRatio: '1 / 1',
                    }}
                  >
                    <Image
                      src={p.image}
                      alt={p.imageAlt}
                      fill
                      sizes="(min-width: 1024px) 25vw, 50vw"
                      loading="eager"
                      className="object-contain"
                      style={{ objectPosition: 'right bottom' }}
                    />
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  )
}
