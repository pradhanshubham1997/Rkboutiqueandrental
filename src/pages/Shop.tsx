import { useEffect, useMemo, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { ArrowRight, Search, X } from 'lucide-react';
import { products } from '../data/mockData';
import PublicProductCard from '../components/PublicProductCard';

/**
 * PUBLIC-ONLY catalogue page (route: /shop).
 * Previously `/shop` rendered the landing page and ignored `?category=` /
 * `?filter=` / `?q=`, so every collection link was a dead end. This page
 * honours those params with category navigation, Buy/Rent filters, working
 * search and sort — all touch-friendly.
 */

type ModeFilter = 'all' | 'buy' | 'rent' | 'new';
type SortKey = 'featured' | 'price-asc' | 'price-desc';

/** Maps editorial occasion labels to real catalogue categories. */
const CATEGORY_ALIASES: Record<string, string[]> = {
  Bridal: ['Lehenga', 'Saree', 'Gown'],
  Wedding: ['Lehenga', 'Sherwani', 'Saree'],
  Reception: ['Gown', 'Lehenga'],
  Engagement: ['Lehenga', 'Gown'],
  Sangeet: ['Lehenga', 'Indo-Western'],
  Festive: ['Saree', 'Suit', 'Lehenga'],
  Party: ['Gown', 'Indo-Western'],
  Cocktail: ['Gown'],
  Celebration: [],
};

const MODE_FILTERS: { id: ModeFilter; label: string }[] = [
  { id: 'all', label: 'All' },
  { id: 'buy', label: 'Buy' },
  { id: 'rent', label: 'Rent' },
  { id: 'new', label: 'New In' },
];

function resolveCategories(requested: string | null, real: string[]): string[] {
  if (!requested) return [];
  const exact = real.find((c) => c.toLowerCase() === requested.toLowerCase());
  if (exact) return [exact];
  const aliasKey = Object.keys(CATEGORY_ALIASES).find(
    (k) => k.toLowerCase() === requested.toLowerCase(),
  );
  if (aliasKey) {
    const mapped = CATEGORY_ALIASES[aliasKey].filter((c) => real.includes(c));
    return mapped;
  }
  return [];
}

export default function Shop() {
  const [params, setParams] = useSearchParams();
  const categoryParam = params.get('category');
  const filterParam = (params.get('filter') as ModeFilter | null) ?? 'all';
  const queryParam = params.get('q') ?? '';

  const [sort, setSort] = useState<SortKey>('featured');

  useEffect(() => {
    document.title = 'Shop Designer Collection — RK Boutique & Rentals, Raipur';
  }, []);

  const categories = useMemo(
    () => Array.from(new Set(products.map((p) => p.category))),
    [],
  );

  const activeCategories = useMemo(
    () => resolveCategories(categoryParam, categories),
    [categoryParam, categories],
  );

  const filtered = useMemo(() => {
    const q = queryParam.trim().toLowerCase();
    let list = products.filter((p) => {
      if (activeCategories.length > 0 && !activeCategories.includes(p.category)) return false;
      if (filterParam === 'buy' && p.type === 'rental') return false;
      if (filterParam === 'rent' && p.type === 'retail') return false;
      if (filterParam === 'new' && !p.newArrival) return false;
      if (
        q &&
        !`${p.name} ${p.category} ${p.description} ${p.sku}`.toLowerCase().includes(q)
      ) {
        return false;
      }
      return true;
    });
    if (sort === 'price-asc') {
      list = [...list].sort(
        (a, b) => (a.salePrice || a.rentalPrice * 30) - (b.salePrice || b.rentalPrice * 30),
      );
    } else if (sort === 'price-desc') {
      list = [...list].sort(
        (a, b) => (b.salePrice || b.rentalPrice * 30) - (a.salePrice || a.rentalPrice * 30),
      );
    } else {
      list = [...list].sort((a, b) => Number(b.featured) - Number(a.featured));
    }
    return list;
  }, [activeCategories, filterParam, queryParam, sort]);

  const setCategory = (category: string | null) => {
    const next = new URLSearchParams(params);
    if (category) next.set('category', category);
    else next.delete('category');
    setParams(next, { preventScrollReset: false });
  };

  const setFilter = (filter: ModeFilter) => {
    const next = new URLSearchParams(params);
    if (filter === 'all') next.delete('filter');
    else next.set('filter', filter);
    setParams(next);
  };

  const updateSearch = (value: string) => {
    const next = new URLSearchParams(params);
    if (value.trim()) next.set('q', value.trim());
    else next.delete('q');
    setParams(next, { replace: true, preventScrollReset: true });
  };

  const clearAll = () => {
    setSort('featured');
    setParams({}, { preventScrollReset: false });
  };

  const hasActive = Boolean(categoryParam || filterParam !== 'all' || queryParam.trim());
  const heading = categoryParam ?? (filterParam === 'rent' ? 'Rentals' : filterParam === 'new' ? 'New In' : 'The Collection');

  return (
    <main className="bg-[#fbf8f5] pt-20 sm:pt-24">
      {/* Heading */}
      <section className="mx-auto max-w-[1500px] px-5 pb-6 pt-6 sm:px-10 sm:pt-10 lg:px-16">
        <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.4em] text-[#9b6b45]">
          RK Boutique & Rentals · Raipur
        </p>
        <h1 className="font-display text-3xl leading-none tracking-[-0.02em] text-[#241a17] sm:text-5xl">
          {heading}
        </h1>
        <p className="mt-3 max-w-xl text-sm leading-7 text-[#74665e]">
          {filtered.length} {filtered.length === 1 ? 'piece' : 'pieces'}
          {activeCategories.length > 0 && <> in {activeCategories.join(' · ')}</>} — every
          garment shown in full, ready to buy or rent.
        </p>
      </section>

      {/* Controls */}
      <section className="sticky top-14 z-30 border-y border-[#e2d8d0] bg-[#fbf8f5]/95 backdrop-blur sm:top-16">
        <div className="mx-auto flex max-w-[1500px] flex-col gap-3 px-5 py-3 sm:px-10 lg:px-16">
          <div className="flex items-center gap-2">
            <form
              className="relative flex-1"
              onSubmit={(e) => e.preventDefault()}
            >
              <Search size={15} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-[#9b6b45]" />
              <input
                value={queryParam}
                onChange={(e) => updateSearch(e.target.value)}
                type="search"
                placeholder="Search lehengas, gowns, sarees…"
                aria-label="Search the collection"
                className="h-11 w-full border border-[#ddd3ca] bg-white pl-11 pr-10 text-sm text-[#241a17] placeholder:text-[#a89a91] focus:border-[#6B1D35]"
              />
              {queryParam && (
                <button
                  type="button"
                  aria-label="Clear search"
                  onClick={() => updateSearch('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#81746d] hover:text-[#241a17]"
                >
                  <X size={15} />
                </button>
              )}
            </form>
            <label className="sr-only" htmlFor="shop-sort">
              Sort
            </label>
            <select
              id="shop-sort"
              value={sort}
              onChange={(e) => setSort(e.target.value as SortKey)}
              className="h-11 shrink-0 border border-[#ddd3ca] bg-white px-3 text-xs font-medium text-[#241a17]"
            >
              <option value="featured">Featured</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
            </select>
          </div>

          <div className="scroll-snap-x -mx-5 flex gap-2 overflow-x-auto px-5 pb-1 sm:mx-0 sm:flex-wrap sm:px-0">
            <button
              type="button"
              onClick={() => setCategory(null)}
              className={`h-9 shrink-0 whitespace-nowrap border px-4 text-[10px] font-semibold uppercase tracking-[0.16em] transition ${
                !categoryParam
                  ? 'border-[#241a17] bg-[#241a17] text-white'
                  : 'border-[#ddd3ca] bg-white text-[#5c534d] hover:border-[#241a17]'
              }`}
            >
              All
            </button>
            {categories.map((c) => (
              <button
                key={c}
                type="button"
                onClick={() => setCategory(activeCategories.includes(c) && categoryParam === c ? null : c)}
                aria-pressed={activeCategories.includes(c)}
                className={`h-9 shrink-0 whitespace-nowrap border px-4 text-[10px] font-semibold uppercase tracking-[0.16em] transition ${
                  activeCategories.includes(c)
                    ? 'border-[#241a17] bg-[#241a17] text-white'
                    : 'border-[#ddd3ca] bg-white text-[#5c534d] hover:border-[#241a17]'
                }`}
              >
                {c}
              </button>
            ))}
            <span className="mx-1 hidden h-9 w-px shrink-0 bg-[#ddd3ca] sm:block" aria-hidden="true" />
            {MODE_FILTERS.filter((f) => f.id !== 'all').map((f) => (
              <button
                key={f.id}
                type="button"
                onClick={() => setFilter(filterParam === f.id ? 'all' : f.id)}
                aria-pressed={filterParam === f.id}
                className={`h-9 shrink-0 whitespace-nowrap border px-4 text-[10px] font-semibold uppercase tracking-[0.16em] transition ${
                  filterParam === f.id
                    ? 'border-[#6B1D35] bg-[#6B1D35] text-white'
                    : 'border-[#ddd3ca] bg-white text-[#5c534d] hover:border-[#6B1D35]'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Grid */}
      <section className="mx-auto max-w-[1500px] px-5 py-8 sm:px-10 sm:py-12 lg:px-16">
        {filtered.length > 0 ? (
          <div className="grid grid-cols-2 gap-x-3 gap-y-8 sm:gap-x-5 sm:gap-y-12 lg:grid-cols-4">
            {filtered.map((product) => (
              <PublicProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="mx-auto max-w-lg py-16 text-center sm:py-24">
            <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.4em] text-[#9b6b45]">
              Nothing found
            </p>
            <h2 className="font-display text-2xl text-[#241a17] sm:text-3xl">
              No pieces match those filters.
            </h2>
            <p className="mx-auto mt-4 max-w-md text-sm leading-7 text-[#74665e]">
              Try a different search or category — or message the boutique on
              WhatsApp and we&apos;ll help you find your look.
            </p>
            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              {hasActive && (
                <button
                  type="button"
                  onClick={clearAll}
                  className="inline-flex h-12 items-center justify-center bg-[#241a17] px-7 text-[10px] font-bold uppercase tracking-[0.22em] text-white transition hover:bg-[#6B1D35]"
                >
                  Clear all filters
                </button>
              )}
              <Link
                to="/"
                className="inline-flex h-12 items-center justify-center gap-2 border border-[#241a17] px-7 text-[10px] font-bold uppercase tracking-[0.22em] text-[#241a17] transition hover:bg-[#241a17] hover:text-white"
              >
                Back home <ArrowRight size={14} />
              </Link>
            </div>
          </div>
        )}
      </section>
    </main>
  );
}
