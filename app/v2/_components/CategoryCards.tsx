'use client'

import Image from 'next/image'
import Link from 'next/link'
import * as motion from 'motion/react-client'
import type { Category } from '../_data/products'
import { categoryLabels, products } from '../_data/products'
import { tileReveal } from '@/app/lib/motion'

type CategoryCard = {
  key: Category
  bg: string
  blurb: string
  image: string
  imageAlt: string
  imageScale: number
}

const cards: CategoryCard[] = [
  {
    key: 'laptops',
    bg: 'var(--pastel-lilac)',
    blurb: 'MacBook Pro, Dell Pro, Lenovo Ultra. The fleet workhorses.',
    image: '/v2/products/protech/macbook-pro-m4.png',
    imageAlt: 'MacBook Pro M4',
    imageScale: 1.05,
  },
  {
    key: 'tablets',
    bg: 'var(--pastel-butter)',
    blurb: 'iPad Air and the everyday iPad. M4 power, Pencil-ready.',
    image: '/v2/products/protech/ipad-air-m4.png',
    imageAlt: 'iPad Air M4',
    imageScale: 1.0,
  },
  {
    key: 'audio',
    bg: 'var(--pastel-sage)',
    blurb: 'AirPods Pro 2. Calls that cut through the open-plan office.',
    image: '/v2/products/protech/airpods-pro-2.png',
    imageAlt: 'AirPods Pro 2',
    imageScale: 0.95,
  },
  {
    key: 'accessories',
    bg: 'var(--pastel-mint)',
    blurb: 'Magic Keyboard, Apple Pencil Pro. The plumbing that holds it together.',
    image: '/v2/products/protech/magic-keyboard.png',
    imageAlt: 'Magic Keyboard',
    imageScale: 1.05,
  },
]

export function CategoryCards() {
  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:gap-6">
      {cards.map((card, i) => {
        const count = products.filter((p) => p.category === card.key).length
        const href = `/v2/shop?cat=${card.key}`

        return (
          <motion.div
            key={card.key}
            {...tileReveal}
            transition={{ ...tileReveal.transition, delay: i * 0.04 }}
          >
            <Link
              href={href}
              className="group relative flex min-h-[300px] flex-col justify-between overflow-hidden rounded-[28px] p-7 text-zinc-900 transition-[transform,box-shadow] duration-[320ms] ease-[cubic-bezier(0.25,0.1,0.3,1)] hover:-translate-y-1 hover:shadow-[0_24px_48px_-22px_rgba(0,0,0,0.22),0_4px_12px_-4px_rgba(0,0,0,0.08)] sm:min-h-[340px] sm:rounded-[32px] sm:p-8"
              style={{ background: card.bg }}
            >
              <header className="relative z-10 max-w-[60%]">
                <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-zinc-800/70">
                  {count} {count === 1 ? 'product' : 'products'}
                </p>
                <h3
                  className="mt-3 text-[clamp(28px,2.4vw,36px)] font-semibold leading-[1.02]"
                  style={{ letterSpacing: '-0.018em' }}
                >
                  {categoryLabels[card.key]}
                </h3>
                <p className="mt-2 max-w-[26ch] text-[13px] leading-[1.45] text-zinc-800/75">
                  {card.blurb}
                </p>
              </header>

              <span className="relative z-10 inline-flex items-center gap-1.5 text-[13px] font-semibold text-zinc-900">
                Browse
                <span
                  aria-hidden
                  className="transition-transform duration-[320ms] group-hover:translate-x-0.5"
                >
                  →
                </span>
              </span>

              {/* OVERSIZED PRODUCT IMAGE — bleeds bottom-right */}
              <div
                className="pointer-events-none absolute bottom-[-8%] right-[-10%] transition-transform duration-[480ms] ease-[cubic-bezier(0.25,0.1,0.3,1)] group-hover:scale-[1.04]"
                style={{
                  width: `${Math.round(card.imageScale * 60)}%`,
                  aspectRatio: '1 / 1',
                }}
              >
                <Image
                  src={card.image}
                  alt={card.imageAlt}
                  fill
                  sizes="(min-width: 1024px) 25vw, 50vw"
                  loading="eager"
                  className="object-contain"
                  style={{ objectPosition: 'right bottom' }}
                />
              </div>
            </Link>
          </motion.div>
        )
      })}
    </div>
  )
}
