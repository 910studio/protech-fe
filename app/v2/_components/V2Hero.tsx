'use client'

import * as motion from 'motion/react-client'
import { AnimatePresence } from 'motion/react'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import { tileReveal } from '@/app/lib/motion'
import { WinkingSmiley } from './WinkingSmiley'

const STORY_DURATION_MS = 5000

type Story = {
  brand: string
  title: string
  emphasis: string
  body: string
  image: string
  imageAlt: string
  productHref: string
  /** card bg + image color mask (literal hex so motion can crossfade smoothly) */
  bg: string
  /** brighter accent for the emphasis word, paired with the bg */
  accent: string
}

const stories: Story[] = [
  {
    brand: 'APPLE',
    title: 'The hardware Mongolia',
    emphasis: 'ships on.',
    body: 'M4 Pro silicon. 22-hour battery. The premium pick when teams want a Mac.',
    image: '/v2/products/protech/macbook-pro-m4.png',
    imageAlt: 'MacBook Pro M4',
    productHref: '/v2/shop/macbook-pro-m4',
    bg: '#D9C8FF', // lilac
    accent: '#5B43FF',
  },
  {
    brand: 'LENOVO',
    title: 'Workstation power,',
    emphasis: 'ThinkPad heritage.',
    body: 'Core Ultra 9 with 32 GB DDR5. For engineers, designers, the team running the model.',
    image: '/v2/products/protech/lenovo-ultra-9.png',
    imageAlt: 'Lenovo Ultra 9',
    productHref: '/v2/shop/lenovo-ultra-9',
    bg: '#B6E5BC', // mint
    accent: '#0F8B45',
  },
  {
    brand: 'DELL',
    title: 'Big screen,',
    emphasis: 'business build.',
    body: 'Sixteen inches of FHD+ for the team that lives in spreadsheets, Figma, and Excel.',
    image: '/v2/products/protech/dell-pro-16.png',
    imageAlt: 'Dell Pro 16',
    productHref: '/v2/shop/dell-pro-16',
    bg: '#FFB892', // peach
    accent: '#C24400',
  },
  {
    brand: 'APPLE',
    title: 'The lightest',
    emphasis: 'Pro ever.',
    body: 'iPad Air M4. For field teams, design crews, and execs who present for a living.',
    image: '/v2/products/protech/ipad-air-m4.png',
    imageAlt: 'iPad Air M4',
    productHref: '/v2/shop/ipad-air-m4-11',
    bg: '#BBD4FF', // sky
    accent: '#1E5BC9',
  },
]

export function V2Hero() {
  const [active, setActive] = useState(0)
  const [hovered, setHovered] = useState(false)

  useEffect(() => {
    const id = setTimeout(() => {
      setActive((i) => (i + 1) % stories.length)
    }, STORY_DURATION_MS)
    return () => clearTimeout(id)
  }, [active])

  const story = stories[active]

  return (
    <section className="bg-[var(--c-bg)] px-5 lg:px-6">
      <motion.article
        className="relative grid h-[calc(100vh-3.5rem)] overflow-hidden rounded-t-[28px] p-16 sm:rounded-t-[36px] lg:rounded-t-[var(--r-tile)]"
        style={{ gridTemplateRows: 'auto 1fr' }}
        animate={{ backgroundColor: story.bg }}
        transition={{ duration: 0.6, ease: [0.4, 0, 0.6, 1] }}
      >
          {/* STORY PROGRESS INDICATORS — top, segmented */}
          <div className="flex gap-2">
            {stories.map((s, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setActive(i)}
                className="group relative h-1 flex-1 overflow-hidden rounded-full bg-zinc-900/15 transition-opacity hover:opacity-80"
                aria-label={`Show story ${i + 1}: ${s.brand}`}
              >
                <motion.div
                  key={`${i}-${active}`}
                  className="absolute inset-y-0 left-0 rounded-full bg-zinc-900"
                  initial={{ width: i < active ? '100%' : '0%' }}
                  animate={{
                    width: i < active ? '100%' : i === active ? '100%' : '0%',
                  }}
                  transition={
                    i === active
                      ? { duration: STORY_DURATION_MS / 1000, ease: 'linear' }
                      : { duration: 0 }
                  }
                />
              </button>
            ))}
          </div>

          {/* INNER CONTENT — asymmetric: text left, BIG product right */}
          <div className="relative grid grid-cols-1 grid-rows-[1fr_auto] pt-10 lg:grid-cols-[1fr_1.1fr] lg:grid-rows-1 lg:gap-8">
            {/* LEFT — copy */}
            <div className="relative z-10 flex flex-col justify-center lg:py-4">
              <motion.div
                {...tileReveal}
                transition={{ ...tileReveal.transition, delay: 0 }}
                className="flex w-fit items-center gap-2.5 rounded-full bg-white/70 px-4 py-1.5 backdrop-blur-md ring-1 ring-black/5"
              >
                <WinkingSmiley size={24} />
                <p className="text-[clamp(12px,1vw,14px)] font-bold tracking-tight text-zinc-800">
                  Hi, Mongolia. <span className="text-zinc-400">—</span>{' '}
                  <span className="text-[var(--c-accent)]">Khatun × Protech</span>
                </p>
              </motion.div>

              <AnimatePresence mode="wait">
                <motion.p
                  key={`brand-${active}`}
                  initial={{ opacity: 0, y: 6 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.24, ease: [0.4, 0, 0.6, 1] }}
                  className="mt-6 text-[11px] font-bold uppercase tracking-[0.22em] text-zinc-700"
                >
                  {story.brand}
                </motion.p>
              </AnimatePresence>

              <AnimatePresence mode="wait">
                <motion.h1
                  key={`headline-${active}`}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -12 }}
                  transition={{ duration: 0.32, ease: [0.4, 0, 0.6, 1] }}
                  className="mt-3 max-w-[18ch] text-[clamp(40px,7vw,104px)] font-bold leading-[0.92] text-[var(--c-text)]"
                  style={{ letterSpacing: '-0.028em' }}
                >
                  {story.title}{' '}
                  <span style={{ color: story.accent }}>{story.emphasis}</span>
                </motion.h1>
              </AnimatePresence>

              <AnimatePresence mode="wait">
                <motion.p
                  key={`body-${active}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.32, ease: [0.4, 0, 0.6, 1] }}
                  className="mt-5 max-w-[40ch] text-[clamp(14px,1.05vw,17px)] font-medium leading-[1.5] text-zinc-700"
                >
                  {story.body}
                </motion.p>
              </AnimatePresence>

              <div className="mt-7 flex flex-wrap items-center gap-3">
                <Link
                  href={story.productHref}
                  onMouseEnter={() => setHovered(true)}
                  onMouseLeave={() => setHovered(false)}
                  onFocus={() => setHovered(true)}
                  onBlur={() => setHovered(false)}
                  className="inline-flex h-11 items-center rounded-full bg-zinc-900 px-6 text-[14px] font-bold !text-white shadow-[0_18px_40px_-18px_rgba(0,0,0,0.4)] transition-all duration-[320ms] ease-[cubic-bezier(0.4,0,0.6,1)] hover:bg-zinc-700"
                >
                  Configure
                  <span aria-hidden className="ml-2">→</span>
                </Link>
                <Link
                  href="/v2/shop"
                  className="inline-flex h-11 items-center text-[14px] font-semibold text-[var(--c-text)] transition-colors duration-[320ms] hover:text-[var(--c-accent)]"
                >
                  Browse all
                </Link>
              </div>
            </div>

            {/* RIGHT — BIG ASS PRODUCT IMAGE bleeding past right edge.
                Default: mix-blend-multiply masks the image into the pastel bg.
                When the Configure CTA is hovered: mask drops + pans + scales. */}
            <div className="relative min-h-[280px] lg:min-h-0">
              <AnimatePresence mode="wait">
                <motion.div
                  key={`img-${active}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.6, ease: [0.4, 0, 0.6, 1] }}
                  className={[
                    'absolute inset-y-[-6%] left-[-4%] right-[-18%] transition-transform duration-[700ms] ease-[cubic-bezier(0.25,0.1,0.3,1)] lg:inset-y-[-10%] lg:right-[-22%]',
                    hovered ? '-translate-x-[3%] scale-[1.04]' : '',
                  ].join(' ')}
                >
                  <Image
                    src={story.image}
                    alt={story.imageAlt}
                    fill
                    sizes="(min-width: 1024px) 65vw, 100vw"
                    priority
                    className="object-contain"
                    style={{
                      objectPosition: 'center right',
                      mixBlendMode: hovered ? 'normal' : 'multiply',
                    }}
                  />
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
      </motion.article>
    </section>
  )
}
