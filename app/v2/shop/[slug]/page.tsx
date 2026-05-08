import Image from 'next/image'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { findProduct, products, fmtMNT, type Pastel } from '../../_data/products'
import { ProductCard } from '../../_components/ProductCard'
import { PDPConfigurator } from './_components/PDPConfigurator'

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

type Params = Promise<{ slug: string }>

export async function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }))
}

export default async function PDP({ params }: { params: Params }) {
  const { slug } = await params
  const product = findProduct(slug)
  if (!product) notFound()

  const related = products.filter(
    (p) => p.slug !== product.slug && p.category === product.category,
  )
  const isDark = product.pastel === 'dark'

  return (
    <>
      {/* BREADCRUMB */}
      <header className="border-b border-black/5 bg-[var(--c-bg)] px-6 py-4 lg:px-10">
        <div className="mx-auto flex max-w-[var(--max-w)] items-center gap-2 text-[12px] text-zinc-500">
          <Link href="/v2/shop" className="hover:text-zinc-900">
            Shop
          </Link>
          <span aria-hidden>›</span>
          <span className="text-zinc-900">{product.name}</span>
        </div>
      </header>

      {/* HERO + CONFIGURATOR */}
      <section className="bg-[var(--c-bg)] px-5 pt-5 lg:px-6 lg:pt-6">
        <div className="mx-auto grid max-w-[var(--max-w)] grid-cols-1 gap-5 lg:grid-cols-[1fr_420px] lg:gap-6">
          {/* LEFT — pastel hero card with product copy + image */}
          <article
            className={[
              'relative overflow-hidden rounded-[28px] sm:rounded-[36px] lg:rounded-[var(--r-tile)]',
              'min-h-[640px] lg:min-h-[720px]',
              'lg:sticky lg:top-20 lg:self-start',
              isDark ? 'text-white' : 'text-zinc-900',
            ].join(' ')}
            style={{ background: themeBg[product.pastel] }}
          >
            <div className="relative z-10 flex flex-col p-8 sm:p-10 lg:p-14">
              <p
                className={[
                  'flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.2em]',
                  isDark ? 'text-white/60' : 'text-zinc-700/75',
                ].join(' ')}
              >
                <span aria-hidden className="h-px w-7 bg-current opacity-50" />
                {product.brand}
              </p>
              <h1
                className="mt-4 max-w-[16ch] text-[clamp(40px,5vw,72px)] font-semibold leading-[0.98]"
                style={{ letterSpacing: '-0.022em' }}
              >
                {product.name}
              </h1>
              <p
                className={[
                  'mt-5 max-w-[42ch] text-[clamp(15px,1.2vw,18px)] leading-[1.5]',
                  isDark ? 'text-white/70' : 'text-zinc-800/80',
                ].join(' ')}
              >
                {product.description}
              </p>
              <p
                className={[
                  'mt-6 text-[14px]',
                  isDark ? 'text-white/80' : 'text-zinc-900',
                ].join(' ')}
              >
                From <span className="font-semibold">{fmtMNT(product.basePrice)}</span>
                <span className={isDark ? 'text-white/55' : 'text-zinc-700/60'}>
                  {' '}
                  or {fmtMNT(product.monthlyPrice)}/mo. for 24 mo.
                </span>
              </p>
            </div>

            {/* MASSIVE PRODUCT IMAGE — bleeds bottom-right (no transform so mix-blend works through the stacking context) */}
            <div className="pointer-events-none absolute bottom-[-6%] right-[-6%] h-[80%] w-[100%] lg:h-[72%] lg:w-[86%]">
              <Image
                src={product.image}
                alt={product.name}
                fill
                sizes="(min-width: 1024px) 50vw, 100vw"
                priority
                className={['object-contain', product.whiteBg ? 'mix-blend-multiply' : ''].join(' ')}
                style={{ objectPosition: 'right bottom' }}
              />
            </div>
          </article>

          {/* RIGHT — configurator */}
          <PDPConfigurator product={product} />
        </div>
      </section>

      {/* SPEC STRIP */}
      <section className="bg-[var(--c-bg)] px-6 pb-16 pt-12 lg:px-10 lg:pb-20 lg:pt-16">
        <div className="mx-auto max-w-[var(--max-w)] border-t border-black/10 pt-12">
          <p className="flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.2em] text-zinc-500">
            <span aria-hidden className="h-px w-7 bg-zinc-400" />
            What you get
          </p>
          <h2
            className="mt-4 text-[clamp(32px,3.6vw,48px)] font-semibold leading-[1.05] text-[var(--c-text)]"
            style={{ letterSpacing: '-0.018em' }}
          >
            Built to spec.
          </h2>
          <ul className="mt-10 grid grid-cols-1 gap-x-12 gap-y-7 sm:grid-cols-2 lg:grid-cols-4">
            {product.specs.map((spec) => (
              <li
                key={spec}
                className="border-t border-black/10 pt-4 text-[14px] leading-snug text-zinc-700"
              >
                {spec}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* RELATED */}
      {related.length > 0 ? (
        <section className="bg-[var(--c-bg)] px-5 pb-16 pt-4 lg:px-6 lg:pb-20">
          <div className="mx-auto max-w-[var(--max-w)]">
            <h2
              className="mb-6 text-[clamp(22px,2vw,30px)] font-semibold tracking-tight text-[var(--c-text)]"
              style={{ letterSpacing: '-0.014em' }}
            >
              More {product.category}.
            </h2>
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
              {related.slice(0, 3).map((p, i) => (
                <ProductCard key={p.slug} product={p} delay={i * 0.04} />
              ))}
            </div>
          </div>
        </section>
      ) : null}
    </>
  )
}
