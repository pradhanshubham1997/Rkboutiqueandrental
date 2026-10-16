import { useState } from 'react';

/**
 * PUBLIC-ONLY safe image component.
 *
 * Created so public image-fitting fixes never touch dashboard behaviour.
 * - `contain` keeps the whole garment visible (product cards, galleries).
 * - `cover` is only for intentional editorial crops (hero, campaign bands).
 * - Trims URLs (source data occasionally carries stray whitespace).
 * - `referrerPolicy="no-referrer"` avoids hotlink 403s from retailer CDNs.
 * - Graceful branded fallback — never a broken-image icon or zero-height box.
 */

export function cleanSrc(src: string | undefined | null): string {
  return (src ?? '').trim();
}

interface PublicImageProps {
  src: string | undefined | null;
  alt: string;
  fit?: 'contain' | 'cover';
  position?: string;
  className?: string;
  /** Smaller variant served to narrow screens via <picture>. */
  mobileSrc?: string | null;
  eager?: boolean;
}

export default function PublicImage({
  src,
  alt,
  fit = 'cover',
  position = 'center',
  className = '',
  mobileSrc = null,
  eager = false,
}: PublicImageProps) {
  const [failed, setFailed] = useState(false);
  const clean = cleanSrc(src);
  const cleanMobile = cleanSrc(mobileSrc);

  if (!clean || failed) {
    return (
      <div
        role="img"
        aria-label={alt}
        className={`flex items-center justify-center bg-gradient-to-br from-[#3a2327] via-[#6b3a44] to-[#c8a27c] ${className}`}
      >
        <span className="px-6 text-center font-display text-lg italic text-cream/85">
          RK Boutique
        </span>
      </div>
    );
  }

  const img = (
    <img
      src={clean}
      alt={alt}
      loading={eager ? 'eager' : 'lazy'}
      fetchPriority={eager ? 'high' : 'auto'}
      decoding={eager ? 'sync' : 'async'}
      draggable={false}
      referrerPolicy="no-referrer"
      onError={() => setFailed(true)}
      style={{ objectPosition: position }}
      className={`${fit === 'contain' ? 'object-contain' : 'object-cover'} ${className}`}
    />
  );

  if (cleanMobile && !failed) {
    return (
      <picture className="contents">
        <source media="(max-width: 767px)" srcSet={cleanMobile} />
        {img}
      </picture>
    );
  }

  return img;
}
