import Link from 'next/link'

/**
 * Mobile-only horizontal pill rail showing the top product categories.
 * Sits right under the hero so users have a thumb-reachable shortcut into
 * the catalogue before they start scrolling magazine sections. Hidden on
 * lg+ — desktop nav handles this already.
 */

type Chip = {
  label: string
  emoji: string
  href: string
}

const chips: Chip[] = [
  { label: 'Laptops', emoji: '💻', href: '/v2/shop?cat=laptops' },
  { label: 'Tablets', emoji: '📱', href: '/v2/shop?cat=tablets' },
  { label: 'Audio', emoji: '🎧', href: '/v2/shop?cat=audio' },
  { label: 'Accessories', emoji: '⌨️', href: '/v2/shop?cat=accessories' },
  { label: 'Desktops', emoji: '🖥️', href: '/v2/shop?cat=desktops' },
]

export function CategoryChipRail() {
  return (
    <section className="lg:hidden">
      <div className="px-5 pb-1 pt-4">
        <p className="flex items-center gap-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-zinc-500">
          <span aria-hidden className="h-px w-6 bg-zinc-300" />
          Shop by
        </p>
      </div>
      <div
        className="flex snap-x snap-proximity gap-2.5 overflow-x-auto px-5 pb-3 pt-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {chips.map((c) => (
          <Link
            key={c.label}
            href={c.href}
            className="group flex shrink-0 snap-start items-center gap-2 rounded-full border border-black/[0.07] bg-white px-4 py-2.5 text-[13px] font-medium text-zinc-800 shadow-[0_1px_2px_rgba(0,0,0,0.03)] transition-all duration-[220ms] active:scale-[0.97]"
          >
            <span aria-hidden className="text-[14px] leading-none">
              {c.emoji}
            </span>
            <span>{c.label}</span>
          </Link>
        ))}
      </div>
    </section>
  )
}
