'use client'

import Link from 'next/link'
import { useSearchParams } from 'next/navigation'
import {
  Cable,
  Headphones,
  Laptop,
  LayoutGrid,
  Smartphone,
  Tablet,
  type LucideIcon,
} from 'lucide-react'
import type { Category } from '../_data/products'
import { categoryLabels } from '../_data/products'

const categoryOrder: Category[] = [
  'laptops',
  'tablets',
  'audio',
  'accessories',
]

const iconFor: Record<Category, LucideIcon> = {
  laptops: Laptop,
  tablets: Tablet,
  phones: Smartphone,
  audio: Headphones,
  accessories: Cable,
  desktops: LayoutGrid,
  wearables: LayoutGrid,
}

const labelFor = (c: Category) => categoryLabels[c]

function useActive() {
  const params = useSearchParams()
  return params.get('cat') as Category | null
}

/** Mobile-only horizontal sticky pill bar. */
export function CategoryFilterMobile() {
  const active = useActive()

  return (
    <div className="sticky top-14 z-30 border-b border-black/5 bg-[var(--c-bg)]/80 backdrop-blur-md backdrop-saturate-150 lg:hidden">
      <div className="mx-auto max-w-[var(--max-w)] overflow-x-auto px-4">
        <ul className="flex items-center gap-1 py-3 text-[13px]">
          {categoryOrder.map((cat: Category) => {
            const Icon = iconFor[cat]
            const isActive = active === cat
            const href = `/v2/shop?cat=${cat}`
            return (
              <li key={cat}>
                <Link
                  href={href}
                  aria-current={isActive ? 'page' : undefined}
                  style={isActive ? { backgroundColor: '#18181b', color: '#ffffff' } : undefined}
                  className={[
                    'inline-flex h-9 items-center gap-1.5 whitespace-nowrap rounded-full px-3.5 transition-colors duration-[320ms] ease-[cubic-bezier(0.4,0,0.6,1)]',
                    isActive ? '' : 'text-zinc-700 hover:bg-black/5 hover:text-zinc-900',
                  ].join(' ')}
                >
                  <Icon size={15} strokeWidth={1.75} aria-hidden />
                  {labelFor(cat)}
                </Link>
              </li>
            )
          })}
        </ul>
      </div>
    </div>
  )
}

/** Desktop-only sticky rounded card sidebar with icons + names. */
export function CategoryFilterSidebar() {
  const active = useActive()

  return (
    <nav
      aria-label="Categories"
      className="sticky top-20 rounded-3xl border border-black/[0.08] bg-[var(--c-surface)] p-2 shadow-[0_1px_2px_rgba(0,0,0,0.04),0_8px_24px_-12px_rgba(0,0,0,0.08)]"
    >
      <p className="px-3 pb-2 pt-3 text-[11px] font-medium uppercase tracking-[0.16em] text-zinc-500">
        Categories
      </p>
      <ul className="flex flex-col gap-0.5">
        {categoryOrder.map((cat) => {
          const Icon = iconFor[cat]
          const isActive = active === cat
          const href = `/v2/shop?cat=${cat}`
          return (
            <li key={cat}>
              <Link
                href={href}
                aria-current={isActive ? 'page' : undefined}
                style={isActive ? { backgroundColor: '#18181b', color: '#ffffff' } : undefined}
                className={[
                  'group flex h-11 items-center gap-3 rounded-2xl px-3 text-[14px] transition-colors duration-[240ms] ease-[cubic-bezier(0.25,0.1,0.3,1)]',
                  isActive ? '' : 'text-zinc-700 hover:bg-black/[0.04] hover:text-zinc-900',
                ].join(' ')}
              >
                <span
                  style={
                    isActive
                      ? { backgroundColor: 'rgba(255,255,255,0.15)', color: '#ffffff' }
                      : undefined
                  }
                  className={[
                    'flex h-7 w-7 shrink-0 items-center justify-center rounded-lg transition-colors',
                    isActive ? '' : 'bg-black/[0.04] text-zinc-700 group-hover:bg-black/[0.06]',
                  ].join(' ')}
                >
                  <Icon size={16} strokeWidth={1.75} aria-hidden />
                </span>
                <span
                  style={isActive ? { color: '#ffffff' } : undefined}
                  className="font-medium tracking-[-0.01em]"
                >
                  {labelFor(cat)}
                </span>
              </Link>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}

/** @deprecated Use CategoryFilterMobile + CategoryFilterSidebar instead. */
export function CategoryFilter() {
  return (
    <>
      <CategoryFilterMobile />
      <div className="hidden lg:block">
        <CategoryFilterSidebar />
      </div>
    </>
  )
}
