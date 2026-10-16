import { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ShoppingBag, CalendarDays, MessageCircle } from 'lucide-react';
import { products } from '../data/mockData';
import { STORE, buildWhatsAppLink, buildGeneralInquiry } from '../data/store';
import PublicImage from '../components/PublicImage';
import { primaryPhoto } from '../components/PublicProductCard';

/**
 * PUBLIC-ONLY brand page. Uses only confirmed business facts (name, city,
 * buy-or-rent offering) plus live catalogue counts — no invented claims.
 */
export default function About() {
  const buyCount = products.filter((p) => p.type !== 'rental').length;
  const rentCount = products.filter((p) => p.type !== 'retail').length;
  const cover = primaryPhoto(products[0]);

  useEffect(() => {
    document.title = 'About Us — RK Boutique & Rentals, Raipur';
  }, []);

  return (
    <main className="bg-[#fbf8f5] pt-20 sm:pt-24">
      <section className="mx-auto max-w-[1500px] px-5 pb-10 pt-8 sm:px-10 sm:pt-12 lg:px-16">
        <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.4em] text-[#9b6b45]">
          Our Story
        </p>
        <h1 className="max-w-3xl font-display text-3xl leading-[1.02] tracking-[-0.02em] text-[#241a17] sm:text-5xl lg:text-6xl">
          Designer styles to buy.{' '}
          <span className="italic text-[#9b6b45]">Signature looks to rent.</span>
        </h1>
        <p className="mt-6 max-w-2xl text-sm leading-8 text-[#74665e] sm:text-base">
          {STORE.name} is a designer showroom in {STORE.city} where you can
          discover occasion wear and choose what suits your moment — take an
          outfit home to own, or rent a signature look for a wedding,
          reception, engagement or celebration and return it afterwards.
        </p>
      </section>

      <section className="mx-auto grid max-w-[1500px] gap-6 px-5 pb-14 sm:px-10 lg:grid-cols-2 lg:px-16">
        <div className="relative min-h-[320px] overflow-hidden bg-[#ece4da] sm:min-h-[480px]">
          <PublicImage
            src={cover}
            alt="Designer outfit from the RK Boutique collection"
            fit="contain"
            position="center top"
            className="absolute inset-0 h-full w-full p-4"
          />
        </div>
        <div className="flex flex-col justify-center border border-[#ddd3ca] bg-white p-8 sm:p-12">
          <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.35em] text-[#9b6b45]">
            How it works
          </p>
          <div className="space-y-7">
            <div className="flex gap-4">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#f1e7de]">
                <ShoppingBag size={18} className="text-[#9b6b45]" />
              </span>
              <div>
                <h2 className="font-display text-xl text-[#241a17]">Buy — discover an outfit to own</h2>
                <p className="mt-2 text-sm leading-7 text-[#74665e]">
                  {buyCount} pieces in the current collection are available for
                  purchase, with sizes, colours and pricing shown on every
                  product page.
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#f1e7de]">
                <CalendarDays size={18} className="text-[#9b6b45]" />
              </span>
              <div>
                <h2 className="font-display text-xl text-[#241a17]">Rent — a designer look for the occasion</h2>
                <p className="mt-2 text-sm leading-7 text-[#74665e]">
                  {rentCount} pieces can be rented for your event dates, with
                  per-day pricing and the refundable deposit shown upfront —
                  wear the moment, then return the outfit.
                </p>
              </div>
            </div>
            <div className="flex gap-4">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#f1e7de]">
                <MessageCircle size={18} className="text-[#9b6b45]" />
              </span>
              <div>
                <h2 className="font-display text-xl text-[#241a17]">Ask — talk to the boutique directly</h2>
                <p className="mt-2 text-sm leading-7 text-[#74665e]">
                  Every product page carries a WhatsApp inquiry action that
                  shares the exact piece, price and your selected options with
                  the store.
                </p>
              </div>
            </div>
          </div>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Link
              to="/shop"
              className="inline-flex h-12 items-center justify-center gap-2 bg-[#241a17] px-7 text-[10px] font-bold uppercase tracking-[0.22em] text-white transition hover:bg-[#6B1D35]"
            >
              Explore Collection <ArrowRight size={14} />
            </Link>
            <a
              href={buildWhatsAppLink(buildGeneralInquiry())}
              target="_blank"
              rel="noreferrer"
              className="inline-flex h-12 items-center justify-center gap-2 border border-[#241a17] px-7 text-[10px] font-bold uppercase tracking-[0.22em] text-[#241a17] transition hover:bg-[#241a17] hover:text-white"
            >
              <MessageCircle size={14} /> WhatsApp Us
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
