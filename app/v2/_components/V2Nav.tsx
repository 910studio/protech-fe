'use client'

import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import * as motion from 'motion/react-client'
import dynamic from 'next/dynamic'
import { useEffect, useLayoutEffect, useRef, useState } from 'react'

// SSR-skipped: GlassSurface inspects `CSS.supports(...)` at render time,
// which forks the inline styles between server and browser → hydration
// mismatch. Skipping SSR + showing a transparent placeholder until the
// browser mounts kills the mismatch without flashing.
const GlassSurface = dynamic(() => import('@/components/GlassSurface'), {
  ssr: false,
  loading: () => <div style={{ width: '100%', height: 56 }} />,
})

const navItems = [
  { label: 'Shop', href: '/v2/shop' },
  { label: 'Leasing', href: '/v2/leasing' },
  { label: 'Compare', href: '/v2/compare' },
  { label: 'Support', href: '/v2/support' },
]

const useIsoLayoutEffect =
  typeof window === 'undefined' ? useEffect : useLayoutEffect

type PillRect = { x: number; width: number } | null

export function V2Nav() {
  const pathname = usePathname()
  const ulRef = useRef<HTMLUListElement>(null)
  const linkRefs = useRef<Array<HTMLAnchorElement | null>>([])
  const [pill, setPill] = useState<PillRect>(null)
  const [hasMounted, setHasMounted] = useState(false)

  const activeIndex = navItems.findIndex((item) => {
    if (pathname === item.href) return true
    if (pathname.startsWith(item.href + '/')) return true
    return false
  })

  useIsoLayoutEffect(() => {
    if (activeIndex < 0) {
      setPill(null)
      return
    }
    const ul = ulRef.current
    const link = linkRefs.current[activeIndex]
    if (!ul || !link) return

    const ulRect = ul.getBoundingClientRect()
    const linkRect = link.getBoundingClientRect()
    setPill({ x: linkRect.left - ulRect.left, width: linkRect.width })
  }, [activeIndex, pathname])

  // Avoid the very first paint animating from x=0 — wait one frame so the pill
  // appears in place, then enable transitions.
  useEffect(() => {
    const id = requestAnimationFrame(() => setHasMounted(true))
    return () => cancelAnimationFrame(id)
  }, [])

  return (
    <header className="fixed inset-x-0 top-0 z-50 h-14">
      <GlassSurface
        width="100%"
        height={56}
        borderRadius={0}
        borderWidth={0}
        brightness={50}
        opacity={1}
        blur={6}
        displace={5}
        backgroundOpacity={0.6}
        saturation={1.2}
        distortionScale={-300}
        redOffset={-30}
        greenOffset={20}
        blueOffset={7}
        mixBlendMode="difference"
        shadow={false}
        className="!p-0"
      >
        <div className="mx-auto flex h-full w-full max-w-[var(--max-w)] items-center justify-between px-6 lg:px-10">
          <Link
            href="/v2"
            className="flex items-center transition-opacity hover:opacity-70"
            aria-label="Protech home"
          >
            <Image
              src="/Protech.webp"
              alt="Protech"
              width={420}
              height={100}
              priority
              className="h-7 w-auto"
            />
          </Link>

          <nav aria-label="Primary" className="hidden lg:block">
            <ul ref={ulRef} className="relative flex items-center gap-1">
              {/* SINGLE PILL — animates x + width to the active link */}
              {pill ? (
                <motion.span
                  aria-hidden
                  className="pointer-events-none absolute top-1/2 -translate-y-1/2 rounded-full bg-[var(--c-accent-soft)] ring-1 ring-[var(--c-accent)]/15 backdrop-blur-md"
                  initial={false}
                  animate={{ x: pill.x, width: pill.width }}
                  transition={
                    hasMounted
                      ? { type: 'spring', stiffness: 380, damping: 32 }
                      : { duration: 0 }
                  }
                  style={{ height: 34, left: 0 }}
                />
              ) : null}

              {navItems.map((item, i) => {
                const isActive = i === activeIndex
                return (
                  <li key={item.label} className="relative">
                    <Link
                      ref={(el) => {
                        linkRefs.current[i] = el
                      }}
                      href={item.href}
                      aria-current={isActive ? 'page' : undefined}
                      className={[
                        'relative inline-flex h-[34px] items-center rounded-full px-4 text-[13px] tracking-tight transition-colors duration-[240ms] ease-[cubic-bezier(0.4,0,0.6,1)]',
                        isActive
                          ? 'font-semibold text-[var(--c-accent)]'
                          : 'font-medium text-zinc-700 hover:text-zinc-900',
                      ].join(' ')}
                    >
                      <span className="relative">{item.label}</span>
                    </Link>
                  </li>
                )
              })}
            </ul>
          </nav>

          <div className="flex items-center gap-3">
            <button
              aria-label="Search"
              className="grid h-7 w-7 place-items-center rounded-full text-zinc-700 transition-colors hover:bg-black/5 hover:text-zinc-900"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                <circle cx="11" cy="11" r="7" />
                <path d="m20 20-3.5-3.5" />
              </svg>
            </button>
            <button
              aria-label="Bag"
              className="grid h-7 w-7 place-items-center rounded-full text-zinc-700 transition-colors hover:bg-black/5 hover:text-zinc-900"
            >
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                <path d="M5 8h14l-1.2 11.4a2 2 0 0 1-2 1.6H8.2a2 2 0 0 1-2-1.6L5 8Z" />
                <path d="M9 8V6a3 3 0 0 1 6 0v2" />
              </svg>
            </button>
          </div>
        </div>
      </GlassSurface>
    </header>
  )
}
