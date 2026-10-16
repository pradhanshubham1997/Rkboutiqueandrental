import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Heart } from 'lucide-react';
import type { Product } from '../types';
import PublicImage, { cleanSrc } from './PublicImage';

/**
 * PUBLIC-ONLY product card.
 * - `object-contain` so the full garment stays visible at every viewport.
 * - Honest Buy / Rent / Buy-or-Rent badges derived from real product data.
 * - Shows the actual configured sale and/or rental price — never invented.
 */

export function primaryPhoto(product: Product): string {
  return cleanSrc(product.images?.[0]) || cleanSrc(product.image);
}

export function availabilityLabel(product: Product): string {
  if (product.type === 'both') return 'Buy or Rent';
  if (product.type === 'rental') return 'Rent Only';
  return 'Buy Only';
}

export default function PublicProductCard({ product }: { product: Product }) {
  const [liked, setLiked] = useState(false);
  const showSale = product.salePrice > 0;
  const showRent = product.rentalPrice > 0;
  const soldOut = product.available <= 0;

  return (
    <Link to={`/product/${product.id}`} className="group block min-w-0">
      <div className="relative flex aspect-[3/4] items-center justify-center overflow-hidden bg-[#ece4da]">
        <PublicImage
          src={primaryPhoto(product)}
          alt={product.name}
          fit="contain"
          position="center top"
          className="absolute inset-0 h-full w-full p-2 transition duration-700 group-hover:scale-[1.04]"
        />

        <button
          type="button"
          aria-label="Save to wishlist"
          onClick={(event) => {
            event.preventDefault();
            event.stopPropagation();
            setLiked((value) => !value);
          }}
          className="absolute right-3 top-3 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-[#241a17] shadow-sm transition hover:scale-105"
        >
          <Heart size={16} fill={liked ? 'currentColor' : 'none'} />
        </button>

        <div className="absolute bottom-3 left-3 flex flex-wrap gap-1.5">
          <span className="rounded-full bg-white/90 px-3 py-1.5 text-[8px] font-semibold uppercase tracking-[0.18em] text-[#241a17]">
            {availabilityLabel(product)}
          </span>
          {product.newArrival && (
            <span className="rounded-full bg-[#6B1D35] px-3 py-1.5 text-[8px] font-semibold uppercase tracking-[0.18em] text-white">
              New
            </span>
          )}
        </div>
      </div>

      <div className="pt-3 sm:pt-4">
        <h3 className="truncate font-display text-[15px] leading-snug text-[#241a17] sm:text-lg">
          {product.name}
        </h3>
        <p className="mt-0.5 text-[11px] uppercase tracking-[0.14em] text-[#81746d] sm:text-xs">
          {product.category}
        </p>
        <div className="mt-2 flex flex-wrap items-baseline gap-x-3 gap-y-1">
          {showSale && (
            <p className="text-[13px] font-semibold text-[#241a17] sm:text-sm">
              ₹{product.salePrice.toLocaleString('en-IN')}
            </p>
          )}
          {showRent && (
            <p className={`text-[13px] sm:text-sm ${showSale ? 'font-medium text-[#6B1D35]' : 'font-semibold text-[#241a17]'}`}>
              ₹{product.rentalPrice.toLocaleString('en-IN')}
              <span className="font-normal text-[#81746d]"> /day rent</span>
            </p>
          )}
        </div>
        {soldOut && (
          <p className="mt-1 text-[11px] text-[#9b6b45]">
            Currently unavailable — tap to enquire on WhatsApp.
          </p>
        )}
      </div>
    </Link>
  );
}
