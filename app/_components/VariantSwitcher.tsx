'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

const variants = [
  { id: 'v2', label: 'V2', sub: 'Apple' },
  { id: 'v1', label: 'V1', sub: 'Combine' },
] as const

export function VariantSwitcher() {
  const pathname = usePathname()
  const active = pathname.startsWith('/v1') ? 'v1' : 'v2'

  return (
    <aside
      aria-label="Design variant switcher"
      className="fixed bottom-6 right-6 z-[1000] flex flex-col gap-1 rounded-2xl border border-black/5 bg-white/80 p-1 shadow-[0_8px_28px_-8px_rgba(0,0,0,0.18),0_2px_6px_-2px_rgba(0,0,0,0.06)] backdrop-blur-xl backdrop-saturate-150"
    >
      <header className="px-3 pb-1 pt-2 text-[10px] font-medium uppercase tracking-[0.18em] text-zinc-500">
        Variant
      </header>
      {variants.map((v) => {
        const isActive = active === v.id
        const target = subPath(pathname, v.id)
        return (
          <Link
            key={v.id}
            href={target}
            aria-current={isActive ? 'page' : undefined}
            className={[
              'group flex min-w-[112px] items-baseline justify-between rounded-xl px-3 py-2 transition-all',
              'duration-[320ms] ease-[cubic-bezier(0.4,0,0.6,1)]',
              isActive
                ? 'bg-zinc-900 text-white'
                : 'text-zinc-700 hover:bg-zinc-100 hover:text-zinc-900',
            ].join(' ')}
          >
            <span className="text-[15px] font-semibold tracking-tight">
              {v.label}
            </span>
            <span
              className={[
                'text-[11px] tracking-wider',
                isActive ? 'text-white/60' : 'text-zinc-500',
              ].join(' ')}
            >
              {v.sub}
            </span>
          </Link>
        )
      })}
    </aside>
  )
}

/**
 * Map current path under one variant to the equivalent under another.
 * `/v2/shop/macbook` → `/v1/shop/macbook`. Outside variant routes (e.g. `/`),
 * jump to the variant's landing.
 */
function subPath(currentPath: string, target: 'v1' | 'v2'): string {
  const m = currentPath.match(/^\/v[12](\/.*)?$/)
  if (m) return `/${target}${m[1] ?? ''}`
  return `/${target}`
}
