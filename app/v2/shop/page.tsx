import { ProductCard } from '../_components/ProductCard'
import {
  CategoryFilterMobile,
  CategoryFilterSidebar,
} from '../_components/CategoryFilter'
import { CategoryCards } from '../_components/CategoryCards'
import { products, type Category } from '../_data/products'

type SearchParams = Promise<{ cat?: string; sort?: string }>

export default async function ShopPLP({
  searchParams,
}: {
  searchParams: SearchParams
}) {
  const sp = await searchParams
  const cat = (sp?.cat as Category | undefined) ?? null
  const filtered = cat ? products.filter((p) => p.category === cat) : products

  return (
    <>
      <CategoryFilterMobile />

      <section className="bg-[var(--c-bg)] px-5 py-8 lg:px-6 lg:py-12">
        <div className="mx-auto grid max-w-[var(--max-w)] gap-6 lg:grid-cols-[260px_1fr] lg:gap-8">
          <div className="hidden lg:block">
            <CategoryFilterSidebar />
          </div>

          <div>
            {cat === null ? (
              <CategoryCards />
            ) : (
              <>
                <div className="mb-5 flex items-end justify-between text-[13px] text-zinc-700">
                  <p>
                    <span className="font-semibold text-zinc-900">{filtered.length}</span>{' '}
                    {filtered.length === 1 ? 'product' : 'products'}
                  </p>
                  <button className="rounded-full px-3 py-1.5 transition-colors hover:bg-black/5">
                    Sort by Featured
                    <span aria-hidden className="ml-1">›</span>
                  </button>
                </div>

                {filtered.length === 0 ? (
                  <p className="py-20 text-center text-zinc-500">
                    Nothing here yet. Try another category.
                  </p>
                ) : (
                  <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:gap-6 xl:grid-cols-3">
                    {filtered.map((p, i) => (
                      <ProductCard key={p.slug} product={p} delay={i * 0.04} />
                    ))}
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </section>
    </>
  )
}
