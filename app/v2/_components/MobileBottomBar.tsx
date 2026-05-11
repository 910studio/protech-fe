'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { motion } from 'motion/react'
import { useEffect, useLayoutEffect, useRef, useState, type ComponentType } from 'react'

/**
 * Mobile-only native-app-style bottom tab bar. Hidden on lg+ (desktop has
 * the top nav row). Glassy bg + safe-area padding so it sits cleanly above
 * the iPhone home indicator. Animated pill marks the active route.
 */

const useIsoLayoutEffect =
  typeof window === 'undefined' ? useEffect : useLayoutEffect

type IconProps = { className?: string }

const items: { label: string; href: string; icon: ComponentType<IconProps> }[] = [
  { label: 'Shop', href: '/v2/shop', icon: ShopIcon },
  { label: 'Leasing', href: '/v2/leasing', icon: LeasingIcon },
  { label: 'Compare', href: '/v2/compare', icon: CompareIcon },
  { label: 'Support', href: '/v2/support', icon: SupportIcon },
]

type PillRect = { x: number; width: number } | null

export function MobileBottomBar() {
  const pathname = usePathname()
  const listRef = useRef<HTMLUListElement>(null)
  const tabRefs = useRef<Array<HTMLAnchorElement | null>>([])
  const [pill, setPill] = useState<PillRect>(null)
  const [hasMounted, setHasMounted] = useState(false)

  const activeIndex = items.findIndex((item) => {
    if (pathname === item.href) return true
    if (pathname.startsWith(item.href + '/')) return true
    return false
  })

  useIsoLayoutEffect(() => {
    if (activeIndex < 0) {
      setPill(null)
      return
    }
    const list = listRef.current
    const tab = tabRefs.current[activeIndex]
    if (!list || !tab) return
    const listRect = list.getBoundingClientRect()
    const tabRect = tab.getBoundingClientRect()
    setPill({
      x: tabRect.left - listRect.left,
      width: tabRect.width,
    })
  }, [activeIndex, pathname])

  useEffect(() => {
    const id = requestAnimationFrame(() => setHasMounted(true))
    return () => cancelAnimationFrame(id)
  }, [])

  return (
    <nav
      aria-label="Mobile primary"
      className="fixed inset-x-0 bottom-0 z-50 lg:hidden"
      style={{
        paddingBottom: 'env(safe-area-inset-bottom, 0)',
        backgroundColor: 'rgba(255, 255, 255, 0.82)',
        backdropFilter: 'blur(22px) saturate(1.8)',
        WebkitBackdropFilter: 'blur(22px) saturate(1.8)',
        borderTop: '1px solid rgba(0, 0, 0, 0.06)',
      }}
    >
      <ul
        ref={listRef}
        className="relative mx-auto flex h-[60px] max-w-[var(--max-w)] items-stretch justify-around px-2"
      >
        {pill ? (
          <motion.span
            aria-hidden
            className="pointer-events-none absolute top-1/2 -translate-y-1/2 rounded-2xl bg-[var(--c-accent-soft)] ring-1 ring-[var(--c-accent)]/15"
            initial={false}
            animate={{ x: pill.x, width: pill.width }}
            transition={
              hasMounted
                ? { type: 'spring', stiffness: 380, damping: 32 }
                : { duration: 0 }
            }
            style={{ height: 46, left: 0 }}
          />
        ) : null}

        {items.map(({ label, href, icon: Icon }, i) => {
          const isActive = i === activeIndex
          return (
            <li key={href} className="relative flex-1">
              <Link
                ref={(el) => {
                  tabRefs.current[i] = el
                }}
                href={href}
                aria-current={isActive ? 'page' : undefined}
                className={[
                  'relative flex h-full flex-col items-center justify-center gap-0.5 py-1.5 transition-colors duration-[240ms]',
                  isActive
                    ? 'text-[var(--c-accent)]'
                    : 'text-zinc-500 hover:text-zinc-800',
                ].join(' ')}
              >
                <Icon className="h-5 w-5" />
                <span className="text-[10px] font-medium leading-none tracking-tight">
                  {label}
                </span>
              </Link>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}

/* ---------- icons ---------- */

function ShopIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
      <path
        d="M5 8h14l-1.2 11.4a2 2 0 0 1-2 1.6H8.2a2 2 0 0 1-2-1.6L5 8Z"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
      <path
        d="M9 8V6a3 3 0 0 1 6 0v2"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
    </svg>
  )
}
function LeasingIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
      <rect
        x="3.5"
        y="6"
        width="17"
        height="13"
        rx="2.2"
        stroke="currentColor"
        strokeWidth="1.7"
      />
      <path d="M3.5 10h17" stroke="currentColor" strokeWidth="1.7" />
      <path
        d="M7 14h3"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
    </svg>
  )
}
function CompareIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
      <rect x="3.5" y="5" width="7.5" height="14" rx="1.5" stroke="currentColor" strokeWidth="1.7" />
      <rect x="13" y="5" width="7.5" height="14" rx="1.5" stroke="currentColor" strokeWidth="1.7" />
      <path d="M7.25 9.5h0M16.75 9.5h0" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  )
}
function SupportIcon({ className }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" className={className} aria-hidden>
      <circle cx="12" cy="12" r="8.5" stroke="currentColor" strokeWidth="1.7" />
      <path
        d="M9.6 9.5a2.4 2.4 0 1 1 3.1 2.3c-.6.2-.9.7-.9 1.3v.4"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
      <circle cx="11.85" cy="16.3" r="0.95" fill="currentColor" />
    </svg>
  )
}
