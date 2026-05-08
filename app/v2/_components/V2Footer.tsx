import Link from 'next/link'

const cols = [
  {
    title: 'Shop and Learn',
    links: [
      ['Laptops', '/v2/shop?cat=laptops'],
      ['Tablets', '/v2/shop?cat=tablets'],
      ['Phones', '/v2/shop?cat=phones'],
      ['Audio', '/v2/shop?cat=audio'],
      ['Accessories', '/v2/shop?cat=accessories'],
    ],
  },
  {
    title: 'For Business',
    links: [
      ['Fleet program', '/v2/fleet'],
      ['Volume pricing', '/v2/fleet#pricing'],
      ['Procurement', '/v2/fleet#procurement'],
      ['Trade-in', '/v2/fleet#trade-in'],
    ],
  },
  {
    title: 'Account',
    links: [
      ['Sign in', '/v2/account'],
      ['Order status', '/v2/account/orders'],
      ['Saved configs', '/v2/account/saved'],
    ],
  },
  {
    title: 'About Protech',
    links: [
      ['Our partners', '/v2/about/partners'],
      ['Careers', '/v2/about/careers'],
      ['Newsroom', '/v2/about/news'],
      ['Contact', '/v2/about/contact'],
    ],
  },
] as const

export function V2Footer() {
  return (
    <footer className="border-t border-black/5 bg-[#f5f5f7] text-zinc-600">
      <div className="mx-auto max-w-[var(--max-w)] px-6 py-12 lg:px-10">
        <p className="text-[12px] leading-relaxed text-zinc-500">
          B2B procurement platform for Mongolian enterprises. Volume pricing,
          two-year warranty, full setup and onboarding included on fleet orders
          of 10+ devices.
        </p>

        <div className="mt-10 grid grid-cols-2 gap-x-6 gap-y-10 md:grid-cols-4">
          {cols.map((col) => (
            <div key={col.title}>
              <h3 className="text-[12px] font-semibold tracking-tight text-zinc-900">
                {col.title}
              </h3>
              <ul className="mt-3 space-y-2">
                {col.links.map(([label, href]) => (
                  <li key={label}>
                    <Link
                      href={href}
                      className="text-[12px] text-zinc-600 transition-colors duration-[320ms] hover:text-[var(--c-accent)]"
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-black/10 pt-6 text-[11px] text-zinc-500 md:flex-row md:items-center md:justify-between">
          <p>© 2026 Protech. Mongolia.</p>
          <ul className="flex flex-wrap gap-x-5 gap-y-2">
            <li>
              <Link href="/v2/legal/privacy" className="hover:text-zinc-900">
                Privacy
              </Link>
            </li>
            <li>
              <Link href="/v2/legal/terms" className="hover:text-zinc-900">
                Terms
              </Link>
            </li>
            <li>
              <Link href="/v2/legal/sales" className="hover:text-zinc-900">
                Sales and refunds
              </Link>
            </li>
            <li>
              <Link href="/v2/legal" className="hover:text-zinc-900">
                Legal
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  )
}
