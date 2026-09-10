import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  ShoppingBag,
  Heart,
  Sparkles,
  ShieldCheck,
  MapPin,
  ChevronRight,
  CalendarDays,
  Menu,
  X,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { products } from '../data/mockData';
import type { Product } from '../types';

/* =========================================================
   ETHNIC WOMEN'S WEAR IMAGE LIBRARY
   ========================================================= */
  //  const ethnicImages = {
  //   hero:
  //     'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=2200&q=95',
  
  //   heroMobile:
  //     'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1200&q=95',
  
  //   // Elegant Indian ethnic / lehenga look
  //   lehenga:
  //     'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=1500&q=95',
  
  //   // Bridal / wedding ethnic look
  //   bridal:
  //     'https://images.unsplash.com/photo-1583391733956-6c78276477e2?auto=format&fit=crop&w=1500&q=95',
  
  //   // Saree
  //   saree:
  //     'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1500&q=95',
  
  //   // Designer evening gown
  //   gown:
  //     'https://images.unsplash.com/photo-1595777457583-95e059d581b8?auto=format&fit=crop&w=1500&q=95',
  
  //   // Reception / wedding celebration
  //   reception:
  //     'https://images.unsplash.com/photo-1606800052052-a08af7148866?auto=format&fit=crop&w=1500&q=95',
  
  //   // Engagement / wedding occasion
  //   engagement:
  //     'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&w=1500&q=95',
  
  //   // Festive ethnic
  //   festive:
  //     'https://images.unsplash.com/photo-1583391733956-6c78276477e2?auto=format&fit=crop&w=1500&q=95',
  
  //   // Party / evening fashion
  //   party:
  //     'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?auto=format&fit=crop&w=1500&q=95',
  
  //   // Lookbook 1 — Lehenga
  //   look1:
  //     'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=1400&q=95',
  
  //   // Lookbook 2 — Bridal
  //   look2:
  //     'https://images.unsplash.com/photo-1583391733956-6c78276477e2?auto=format&fit=crop&w=1400&q=95',
  
  //   // Lookbook 3 — Saree
  //   look3:
  //     'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1400&q=95',
  
  //   // Lookbook 4 — Reception
  //   look4:
  //     'https://images.unsplash.com/photo-1606800052052-a08af7148866?auto=format&fit=crop&w=1400&q=95',
  
  //   // Rental campaign — strong bridal ethnic hero
  //   campaign:
  //     'https://images.unsplash.com/photo-1583391733956-6c78276477e2?auto=format&fit=crop&w=2200&q=95',
  
  //   // Editorial — Indian ethnic fashion
  //   editorial1:
  //     'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1600&q=95',
  
  //   // Editorial — Lehenga
  //   editorial2:
  //     'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=1600&q=95',
  
  //   // Final CTA — premium reception/wedding look
  //   final:
  //     'https://images.unsplash.com/photo-1606800052052-a08af7148866?auto=format&fit=crop&w=2200&q=95',
  // };
  const ethnicImages = {
    hero:
      'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=2200&q=95',
  
    heroMobile:
      'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1200&q=95',
  
    lehenga:
      'https://images.unsplash.com/photo-1583391733956-3750e0ff4e8b?auto=format&fit=crop&w=1500&q=95',
    saree:
      'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1500&q=95',
  
    party:
      'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?auto=format&fit=crop&w=1500&q=95',
  
    // Look 1: Designer White/Gold Indo-Western Lehenga
    look1:
    'https://encrypted-tbn0.gstatic.com/licensed-image?q=tbn:ANd9GcSdPg5EDhvYWBN1Xf3nrssJCdAbIbDcFwK19bcjqHw1xMliuFUJBqCFrf-rDnvNfkiQvui0hEy-3GNK4BI',
  look2:
    'https://encrypted-tbn2.gstatic.com/licensed-image?q=tbn:ANd9GcQm1e4Yk9Kl_tN-i3OeqGcPEgkjXYeghw7uR_eUa7Fb1PQoX2pqcli_cdY24IIxxtPm9tJ6U_QFqbuAUUU',
  look3:
    'https://assets.myntassets.com/w_412,q_50,,dpr_3,fl_progressive,f_webp/assets/images/2025/SEPTEMBER/11/B0jVUZBO_6a348a6062d8469fa2dfdc3ceb322bd8.jpg',
  look4:
    'https://cdn.shopify.com/s/files/1/1109/3312/files/3449-BLACK-2_4a5bf35b-7a4c-4b02-a8a4-7a6aeaced023.jpg?v=1736452716',
  

    campaign:
      'https://images.unsplash.com/photo-1585241645927-c7a8e5840c42?auto=format&fit=crop&w=2200&q=95',
  
    editorial1:
      'https://images.unsplash.com/photo-1610030469983-98e550d6193c?auto=format&fit=crop&w=1600&q=95',
  
    editorial2:
      'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=1600&q=95',
      bridal:
    'https://www.anantexports.in/cdn/shop/files/1000307230.jpg?v=1780146585&width=1500',

  // Indo-Western Heavy Reception Gown
  reception:
    'https://getethnic.com/wp-content/uploads/2020/11/KAMRG11-1.webp',

  // Designer Flare Indian Ethnic Gown
  gown:
    'https://img.faballey.com/images/Product/XLH05425Z/3.jpg',

  // Traditional Festive / Half-Saree Look
  festive:
    'https://www.bullionknot.com/cdn/shop/files/Garima_2-In-1_Half_Saree_Green_Handloom_sequin_handwork1.jpg?v=1765022593&width=1200',

  // Grand Indian Wedding Lehenga & Couple Attire
  wedding:
    'https://getethnic.com/wp-content/uploads/2025/01/Indian-Wedding-Trends-2025-2-812x1024.webp',

  // Mirror Work Green Engagement Lehenga
  engagement:
    'https://images.unsplash.com/photo-1617627143750-d86bc21e42bb?auto=format&fit=crop&w=1500&q=95',

  // Modern Black Sequins Cocktail Gown
  cocktail:
    'https://cdn-appdata.seasonsindia.com/uploads/feature_images/565-00601.jpg',
  
    final:
      'https://images.unsplash.com/photo-1606800052052-a08af7148866?auto=format&fit=crop&w=2200&q=95',
  };
/* =========================================================
   SAFE IMAGE COMPONENT
   ========================================================= */

function EthnicImage({
  src,
  alt,
  className = '',
  position = 'center',
}: {
  src: string;
  alt: string;
  className?: string;
  position?: string;
}) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div
        className={`absolute inset-0 bg-gradient-to-br from-[#4b252c] via-[#7b4650] to-[#c8a27c] ${className}`}
      />
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      className={className}
      style={{ objectPosition: position }}
      loading="lazy"
      onError={() => setFailed(true)}
    />
  );
}

/* =========================================================
   REVEAL
   ========================================================= */

function SectionReveal({
  children,
  className = '',
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;

    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.08 }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={`transition-all duration-1000 ease-out ${
        visible
          ? 'translate-y-0 opacity-100'
          : 'translate-y-8 opacity-0'
      } ${className}`}
    >
      {children}
    </div>
  );
}

/* =========================================================
   SECTION HEADING
   ========================================================= */

function SectionHeading({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description?: string;
}) {
  return (
    <div className="mx-auto max-w-3xl text-center">
      <p className="mb-4 text-[10px] font-semibold uppercase tracking-[0.4em] text-[#9b6b45]">
        {eyebrow}
      </p>

      <h2 className="font-serif text-2xl leading-[1] tracking-[-0.02em] text-[#241a17] sm:text-4xl lg:text-5xl xl:text-6xl">
        {title}
      </h2>

      {description && (
        <p className="mx-auto mt-6 max-w-2xl text-sm leading-7 text-[#74665e] sm:text-base">
          {description}
        </p>
      )}
    </div>
  );
}

/* =========================================================
   EDITORIAL TILE
   ========================================================= */

function EditorialTile({
  image,
  label,
  title,
  href,
  large = false,
  position = 'center',
}: {
  image: string;
  label: string;
  title: string;
  href: string;
  large?: boolean;
  position?: string;
}) {
  return (
    <Link
      to={href}
      className={`group relative block overflow-hidden bg-[#3d2425] ${
        large
          ? 'min-h-[400px] sm:min-h-[560px] lg:min-h-[740px]'
          : 'min-h-[280px] sm:min-h-[390px] lg:min-h-[460px]'
      }`}
    >
      <EthnicImage
        src={image}
        alt={title}
        position={position}
        className="absolute inset-0 h-full w-full object-cover transition duration-[1400ms] group-hover:scale-105"
      />

      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/15 to-black/5" />

      <div className="absolute bottom-0 left-0 right-0 p-4 text-white sm:p-6 lg:p-9">
        <p className="mb-3 text-[9px] font-semibold uppercase tracking-[0.35em] text-white/70">
          {label}
        </p>

        <h3 className="font-serif text-xl leading-tight sm:text-3xl lg:text-4xl">
          {title}
        </h3>

        <span className="mt-5 inline-flex items-center gap-2 text-[9px] font-semibold uppercase tracking-[0.25em]">
          Explore
          <ArrowRight
            size={14}
            className="transition-transform group-hover:translate-x-1"
          />
        </span>
      </div>
    </Link>
  );
}

/* =========================================================
   LOOKBOOK TILE
   ========================================================= */

function LookbookTile({
  image,
  number,
  title,
}: {
  image: string;
  number: string;
  title: string;
}) {
  return (
    <Link to="/shop" className="group block">
      <div className="relative aspect-[3/4] overflow-hidden bg-[#3d2425]">
        <EthnicImage
          src={image}
          alt={title}
          className="h-full w-full object-contain object-top transition duration-[1200ms] group-hover:scale-105"
        />

        <div className="absolute left-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-[9px] font-semibold text-[#241a17]">
          {number}
        </div>

        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/65 to-transparent p-4 sm:p-6 pt-16 sm:pt-20">
          <p className="font-serif text-lg sm:text-2xl text-white">
            {title}
          </p>
        </div>
      </div>

      <div className="flex items-center justify-between border-b border-[#ddd3ca] py-4">
        <span className="text-[9px] font-semibold uppercase tracking-[0.25em] text-[#74665e]">
          Explore Look
        </span>

        <ArrowRight
          size={16}
          className="text-[#9b6b45] transition-transform group-hover:translate-x-1"
        />
      </div>
    </Link>
  );
}

/* =========================================================
   PRODUCT CARD
   ========================================================= */

function ProductCard({ product }: { product: Product }) {
  const [liked, setLiked] = useState(false);

  const image =
    product.images?.[0] ||
    ethnicImages.lehenga;

  return (
    <Link
      to={`/product/${product.id}`}
      className="group block"
    >
      <div className="relative aspect-[4/5] overflow-hidden bg-[#eee6df] flex items-center justify-center">
        <img
          src={image}
          alt={product.name}
          className="max-h-full max-w-full object-contain transition duration-700 group-hover:scale-105"
          loading="lazy"
        />

        <button
          type="button"
          aria-label="Wishlist"
          onClick={(event) => {
            event.preventDefault();
            event.stopPropagation();
            setLiked((value) => !value);
          }}
          className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-[#241a17] shadow-sm"
        >
          <Heart
            size={16}
            fill={liked ? 'currentColor' : 'none'}
          />
        </button>

        <div className="absolute bottom-4 left-4 rounded-full bg-white/90 px-3 py-2 text-[8px] font-semibold uppercase tracking-[0.2em] text-[#241a17]">
          Rental
        </div>
      </div>

      <div className="pt-4">
        <h3 className="font-serif text-base leading-snug text-[#241a17] sm:text-xl">
          {product.name}
        </h3>

        <p className="mt-1 text-xs text-[#81746d]">
          {product.category}
        </p>

        {product.salePrice && (
          <p className="mt-3 text-xs font-semibold text-[#241a17]">
            ₹{product.salePrice}
          </p>
        )}
      </div>
    </Link>
  );
}

/* =========================================================
   HOME
   ========================================================= */

export default function Home() {
  const { cart } = useApp();

  const [heroLoaded, setHeroLoaded] = useState(false);
  const [mobileMenu, setMobileMenu] = useState(false);

  const featuredProducts = products.slice(0, 8);

  useEffect(() => {
    const image = new Image();

    image.src = ethnicImages.hero;

    image.onload = () => {
      setHeroLoaded(true);
    };
  }, []);

  return (
    <main className="bg-[#fbf8f5] text-[#241a17]">

      {/* =====================================================
          HERO
          ===================================================== */}

      <section className="relative mt-14 min-h-screen overflow-hidden bg-[#321f20] text-white md:mt-0">

        {/* HERO IMAGE */}

        <EthnicImage
          src={ethnicImages.hero}
          alt="Indian woman wearing luxury ethnic wedding wear"
          position="center top"
          className={`absolute inset-0 h-full w-full object-cover transition duration-[1800ms] ${
            heroLoaded
              ? 'scale-100 opacity-100'
              : 'scale-105 opacity-0'
          }`}
        />

        {/* MOBILE IMAGE DEPTH */}

        <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/15 to-black/65" />

        <div className="absolute inset-0 bg-gradient-to-r from-black/55 via-black/15 to-transparent" />

        {/* =================================================
            HERO NAVBAR
            ================================================= */}

        <header className="absolute left-0 right-0 top-0 z-40">

          <div className="mx-auto max-w-[1500px] px-5 pt-4 sm:px-8 lg:px-14">

            <div className="flex h-[68px] items-center justify-between border-b border-white/20">

              {/* LOGO */}

              <Link
                to="/"
                className="group flex items-center gap-3"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-full border border-white/50 bg-white/10 backdrop-blur-md">
                  <span className="font-serif text-lg italic text-[#f3dfc5]">
                    RK
                  </span>
                </div>

                <div>
                  <div className="font-serif text-lg leading-none tracking-wide">
                    RK Rent Dress
                  </div>

                  <div className="mt-1 text-[7px] uppercase tracking-[0.35em] text-white/65">
                    Raipur
                  </div>
                </div>
              </Link>

              {/* DESKTOP NAV */}

              <nav className="hidden items-center gap-8 lg:flex">

                <Link
                  to="/"
                  className="text-[9px] font-semibold uppercase tracking-[0.25em] text-white"
                >
                  Home
                </Link>

                <Link
                  to="/shop"
                  className="text-[9px] font-semibold uppercase tracking-[0.25em] text-white/75 transition hover:text-white"
                >
                  Collection
                </Link>

                <Link
                  to="/shop?filter=rental"
                  className="text-[9px] font-semibold uppercase tracking-[0.25em] text-white/75 transition hover:text-white"
                >
                  Rentals
                </Link>

                <Link
                  to="/shop?category=Lehenga"
                  className="text-[9px] font-semibold uppercase tracking-[0.25em] text-white/75 transition hover:text-white"
                >
                  Lehengas
                </Link>

                <Link
                  to="/shop?category=Gown"
                  className="text-[9px] font-semibold uppercase tracking-[0.25em] text-white/75 transition hover:text-white"
                >
                  Gowns
                </Link>

              </nav>

              {/* RIGHT */}

              <div className="flex items-center gap-3">

                <Link
                  to="/cart"
                  className="relative flex h-10 w-10 items-center justify-center rounded-full border border-white/25 bg-black/10 backdrop-blur-md"
                >
                  <ShoppingBag size={16} />

                  {cart.length > 0 && (
                    <span className="absolute -right-1 -top-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-[#ead5bd] px-1 text-[8px] font-bold text-[#241a17]">
                      {cart.length}
                    </span>
                  )}
                </Link>

                <button
                  type="button"
                  onClick={() => setMobileMenu((value) => !value)}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-white/25 bg-black/10 backdrop-blur-md lg:hidden"
                  aria-label="Menu"
                >
                  {mobileMenu ? (
                    <X size={18} />
                  ) : (
                    <Menu size={18} />
                  )}
                </button>

              </div>
            </div>
          </div>

          {/* MOBILE MENU */}

          {mobileMenu && (
            <div className="border-b border-white/15 bg-[#241719]/95 px-6 py-6 backdrop-blur-xl lg:hidden">

              <nav className="flex flex-col">

                <Link
                  to="/"
                  onClick={() => setMobileMenu(false)}
                  className="border-b border-white/10 py-4 text-[10px] font-semibold uppercase tracking-[0.25em]"
                >
                  Home
                </Link>

                <Link
                  to="/shop"
                  onClick={() => setMobileMenu(false)}
                  className="border-b border-white/10 py-4 text-[10px] font-semibold uppercase tracking-[0.25em]"
                >
                  Collection
                </Link>

                <Link
                  to="/shop?filter=rental"
                  onClick={() => setMobileMenu(false)}
                  className="border-b border-white/10 py-4 text-[10px] font-semibold uppercase tracking-[0.25em]"
                >
                  Rental Collection
                </Link>

                <Link
                  to="/shop?category=Lehenga"
                  onClick={() => setMobileMenu(false)}
                  className="border-b border-white/10 py-4 text-[10px] font-semibold uppercase tracking-[0.25em]"
                >
                  Designer Lehengas
                </Link>

                <Link
                  to="/shop?category=Gown"
                  onClick={() => setMobileMenu(false)}
                  className="py-4 text-[10px] font-semibold uppercase tracking-[0.25em]"
                >
                  Gowns
                </Link>

              </nav>

            </div>
          )}

        </header>

        {/* =================================================
            HERO CONTENT
            ================================================= */}

        <div className="relative z-10 mx-auto flex min-h-screen max-w-[1500px] items-end px-5 pb-14 pt-32 sm:px-10 sm:pb-20 lg:px-16 lg:pb-24">

          <div className="max-w-4xl">

            <div className="mb-6 flex items-center gap-3 text-[9px] font-semibold uppercase tracking-[0.35em] text-[#f0ddc7]">
              <span className="h-px w-10 bg-[#f0ddc7]/60" />
              Designer Ethnic Wear · Raipur
            </div>

            <h1 className="font-serif text-[2.6rem] leading-[0.88] tracking-[-0.03em] sm:text-7xl lg:text-[clamp(5rem,9vw,8.5rem)]">

              Your Dream Look.

              <br />

              <span className="italic text-[#ead5bd]">
                For Your Moment.
              </span>

            </h1>

            <p className="mt-7 max-w-xl text-sm leading-7 text-white/80 sm:text-base">
              Discover designer lehengas, bridal outfits,
              reception gowns, sarees and statement ethnic
              looks — available to rent for your most special moments.
            </p>

            <div className="mt-9 flex flex-col gap-3 sm:flex-row">

              <Link
                to="/shop?filter=rental"
                className="inline-flex h-13 items-center justify-center gap-3 bg-[#f8f2eb] px-7 text-[9px] font-bold uppercase tracking-[0.25em] text-[#241a17] transition hover:bg-[#ead5bd]"
              >
                Explore Rental Collection
                <ArrowRight size={15} />
              </Link>

              <Link
                to="/shop"
                className="inline-flex h-13 items-center justify-center gap-3 border border-white/40 bg-white/5 px-7 text-[9px] font-bold uppercase tracking-[0.25em] text-white backdrop-blur-sm transition hover:bg-white hover:text-[#241a17]"
              >
                View Collection
              </Link>

            </div>

            <div className="mt-10 flex items-center gap-3 text-[8px] uppercase tracking-[0.3em] text-white/65">
              <MapPin size={13} />
              Raipur · Chhattisgarh
            </div>

          </div>
        </div>

        {/* VERTICAL TEXT */}

        <div className="absolute bottom-8 right-7 z-10 hidden text-[8px] uppercase tracking-[0.3em] text-white/55 lg:block [writing-mode:vertical-rl]">
          Bridal · Wedding · Reception · Festive
        </div>

      </section>

      {/* =====================================================
          MARQUEE
          ===================================================== */}

      <div className="overflow-hidden border-b border-[#e2d8d0] bg-[#f7f1eb]">
        <div className="flex min-w-max items-center gap-10 px-6 py-5 text-[9px] font-semibold uppercase tracking-[0.32em] text-[#75665e]">

          <span>Designer Lehengas</span>
          <span>✦</span>

          <span>Bridal Wear</span>
          <span>✦</span>

          <span>Reception Wear</span>
          <span>✦</span>

          <span>Designer Sarees</span>
          <span>✦</span>

          <span>Party Wear</span>
          <span>✦</span>

          <span>Gowns</span>
          <span>✦</span>

          <span>Sangeet Looks</span>
          <span>✦</span>

          <span>Festive Wear</span>
          <span>✦</span>

          <span>Designer Lehengas</span>
          <span>✦</span>

          <span>Bridal Wear</span>

        </div>
      </div>

      {/* =====================================================
          INTRO
          ===================================================== */}

      <SectionReveal>
        <section className="px-5 py-16 sm:px-10 sm:py-32 lg:px-16">

          <div className="mx-auto max-w-4xl text-center">

            <p className="mb-5 text-[10px] font-semibold uppercase tracking-[0.4em] text-[#9b6b45]">
              The RK Experience
            </p>

            <h2 className="font-serif text-3xl leading-[0.95] tracking-[-0.03em] sm:text-5xl lg:text-7xl">
              Dress beautifully.

              <br />

              <span className="italic text-[#9b6b45]">
                Rent effortlessly.
              </span>
            </h2>

            <p className="mx-auto mt-8 max-w-2xl text-sm leading-8 text-[#71645e] sm:text-base">
              Your special occasion deserves something extraordinary.
              Choose a beautifully crafted Indian look for the
              moment — without buying an outfit you may only wear once.
            </p>

          </div>

        </section>
      </SectionReveal>

      {/* =====================================================
          COLLECTION
          ===================================================== */}

      <SectionReveal>
        <section className="px-5 pt-14 pb-16 sm:px-10 sm:pt-0 lg:px-16">

          <SectionHeading
            eyebrow="The RK Edit"
            title="Indian elegance for every celebration."
            description="Explore statement silhouettes curated for weddings, receptions, engagements, parties and festive occasions."
          />

          <div className="mx-auto mt-8 grid max-w-[1500px] gap-3 sm:mt-14 sm:gap-4 md:grid-cols-2">

            <EditorialTile
              image={ethnicImages.lehenga}
              label="01 · Signature"
              title="Designer Lehengas"
              href="/shop?category=Lehenga"
              large
              position="center top"
            />

            <div className="grid gap-4 sm:grid-cols-2">

              <EditorialTile
                image={ethnicImages.bridal}
                label="02 · Bridal"
                title="Bridal Wear"
                href="/shop?category=Bridal"
              />

              <EditorialTile
                image={ethnicImages.saree}
                label="03 · Timeless"
                title="Sarees"
                href="/shop?category=Saree"
              />

              <EditorialTile
                image={ethnicImages.gown}
                label="04 · Statement"
                title="Gowns"
                href="/shop?category=Gown"
              />

              <EditorialTile
                image={ethnicImages.reception}
                label="05 · Evening"
                title="Reception Looks"
                href="/shop?category=Reception"
              />

            </div>

          </div>

        </section>
      </SectionReveal>

      {/* =====================================================
          OCCASIONS
          ===================================================== */}

      <SectionReveal>
        <section className="bg-[#eee5dd] px-5 py-16 sm:px-10 sm:py-32 lg:px-16">

          <SectionHeading
            eyebrow="Dress For The Occasion"
            title="What are you dressing for?"
            description="Find an ethnic look that feels right for the celebration."
          />

          <div className="mx-auto mt-14 grid max-w-[1500px] grid-cols-2 gap-px overflow-hidden border border-[#d8ccc2] bg-[#d8ccc2] md:grid-cols-4">

            {[
              {
                image: ethnicImages.engagement,
                title: 'Engagement',
              },
              {
                image: ethnicImages.bridal,
                title: 'Wedding',
              },
              {
                image: ethnicImages.reception,
                title: 'Reception',
              },
              {
                image: ethnicImages.festive,
                title: 'Festive',
              },
              {
                image: ethnicImages.party,
                title: 'Party Wear',
              },
              {
                image: ethnicImages.saree,
                title: 'Sangeet',
              },
              {
                image: ethnicImages.gown,
                title: 'Cocktail',
              },
              {
                image: ethnicImages.lehenga,
                title: 'Celebration',
              },
            ].map((item) => (
              <Link
                key={item.title}
                to="/shop"
                className="group relative aspect-[4/5] overflow-hidden bg-[#3d2425]"
              >

                <EthnicImage
                  src={item.image}
                  alt={`Indian ethnic ${item.title} wear`}
                  className="h-full w-full object-contain object-top transition duration-[1000ms] group-hover:scale-105"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />

                <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-5 lg:p-7">

                  <h3 className="font-serif text-lg text-white sm:text-2xl lg:text-3xl">
                    {item.title}
                  </h3>

                  <div className="mt-3 flex items-center gap-2 text-[8px] font-semibold uppercase tracking-[0.2em] text-white/75">
                    Explore
                    <ChevronRight size={13} />
                  </div>

                </div>

              </Link>
            ))}

          </div>

        </section>
      </SectionReveal>

      {/* =====================================================
          RENTAL CAMPAIGN
          ===================================================== */}

      <SectionReveal>
        <section className="relative min-h-[500px] overflow-hidden bg-[#301d1f] text-white sm:min-h-[680px]">

          <EthnicImage
            src={ethnicImages.bridal}
            alt="Indian bridal rental fashion"
            className="absolute inset-0 h-full w-full object-cover"
            position="center top"
          />

          <div className="absolute inset-0 bg-black/55" />

          <div className="absolute inset-0 bg-gradient-to-r from-black/65 via-black/25 to-transparent" />

          <div className="relative mx-auto flex min-h-[500px] max-w-[1500px] items-center px-6 py-16 sm:min-h-[680px] sm:px-10 sm:py-24 lg:px-16">

            <div className="max-w-2xl">

              <p className="mb-6 text-[10px] font-semibold uppercase tracking-[0.4em] text-[#ead5bd]">
                The Rental Edit
              </p>

              <h2 className="font-serif text-3xl leading-[0.92] tracking-[-0.03em] sm:text-5xl lg:text-8xl">

                One occasion.

                <br />

                <span className="italic text-[#ead5bd]">
                  One unforgettable look.
                </span>

              </h2>

              <p className="mt-8 max-w-xl text-sm leading-7 text-white/75 sm:text-base">
                Choose a designer ethnic look for your wedding,
                reception, engagement or celebration. Wear the
                moment beautifully, then return the outfit.
              </p>

              <Link
                to="/shop?filter=rental"
                className="mt-9 inline-flex items-center gap-3 bg-white px-7 py-4 text-[9px] font-bold uppercase tracking-[0.25em] text-[#241a17] transition hover:bg-[#ead5bd]"
              >
                Explore Rentals
                <ArrowRight size={15} />
              </Link>

            </div>

          </div>

        </section>
      </SectionReveal>

      {/* =====================================================
          LOOKBOOK
          ===================================================== */}

      <SectionReveal>
        <section className="px-5 py-16 sm:px-10 sm:py-32 lg:px-16">

          <SectionHeading
            eyebrow="RK Lookbook"
            title="Looks worth remembering."
            description="A visual edit of Indian silhouettes, embroidery, textures and statement occasion wear."
          />

          <div className="mx-auto mt-8 grid max-w-[1500px] gap-x-4 gap-y-8 sm:mt-14 sm:gap-x-5 sm:gap-y-12 sm:grid-cols-2 lg:grid-cols-4">

            <LookbookTile
              image={ethnicImages.look1}
              number="01"
              title="The Classic"
            />

            <LookbookTile
              image={ethnicImages.cocktail}
              number="02"
              title="The Statement"
            />

            <LookbookTile
              image={ethnicImages.look3}
              number="03"
              title="The Evening"
            />

            <LookbookTile
              image={ethnicImages.look4}
              number="04"
              title="The Celebration"
            />

          </div>

        </section>
      </SectionReveal>

      {/* =====================================================
          FEATURED LOOK
          ===================================================== */}

      <SectionReveal>
        <section className="px-5 pb-16 sm:px-10 sm:pb-32 lg:px-16">

          <div className="mx-auto grid max-w-[1500px] overflow-hidden bg-[#eee5dd] lg:grid-cols-2">

            <div className="relative min-h-[350px] sm:min-h-[550px] lg:min-h-[700px]">

              <EthnicImage
                src={ethnicImages.editorial1}
                alt="Indian woman wearing designer ethnic outfit"
                className="absolute inset-0 h-full w-full object-cover"
                position="center top"
              />

            </div>

            <div className="flex items-center p-8 sm:p-14 lg:p-20">

              <div className="max-w-lg">

                <p className="mb-5 text-[10px] font-semibold uppercase tracking-[0.4em] text-[#9b6b45]">
                  Featured Look
                </p>

                <h2 className="font-serif text-2xl leading-[1] tracking-[-0.02em] sm:text-4xl lg:text-6xl">
                  For the entrance
                  <br />
                  <span className="italic text-[#9b6b45]">
                    they will remember.
                  </span>
                </h2>

                <p className="mt-7 text-sm leading-8 text-[#71645e]">
                  A statement Indian silhouette designed for
                  weddings, receptions and the moments when
                  you want every detail to feel special.
                </p>

                <Link
                  to="/shop"
                  className="mt-9 inline-flex items-center gap-3 border-b border-[#241a17] pb-2 text-[9px] font-bold uppercase tracking-[0.25em]"
                >
                  Explore the collection
                  <ArrowRight size={14} />
                </Link>

              </div>

            </div>

          </div>

        </section>
      </SectionReveal>

      {/* =====================================================
          ETHNIC EDIT
          ===================================================== */}

      <SectionReveal>
        <section className="bg-[#f1ebe5] px-5 py-16 sm:px-10 sm:py-32 lg:px-16">

          <div className="mx-auto grid max-w-[1500px] items-center gap-12 lg:grid-cols-[0.75fr_1.25fr]">

            <div>

              <p className="mb-5 text-[10px] font-semibold uppercase tracking-[0.4em] text-[#9b6b45]">
                The Ethnic Edit
              </p>

              <h2 className="font-serif text-3xl leading-[0.95] tracking-[-0.03em] sm:text-5xl lg:text-6xl">

                Indian elegance,

                <br />

                <span className="italic text-[#9b6b45]">
                  reimagined.
                </span>

              </h2>

              <p className="mt-7 max-w-md text-sm leading-8 text-[#71645e]">
                Intricate embroidery, rich fabrics, flowing
                silhouettes and contemporary Indian styling —
                curated for every celebration.
              </p>

              <Link
                to="/shop"
                className="mt-8 inline-flex items-center gap-3 border-b border-[#241a17] pb-2 text-[9px] font-bold uppercase tracking-[0.25em]"
              >
                View all looks
                <ArrowRight size={14} />
              </Link>

            </div>

            <div className="grid grid-cols-2 gap-4">

              <div className="mt-12 aspect-[3/4] overflow-hidden">

                <EthnicImage
                  src={ethnicImages.editorial1}
                  alt="Indian women's ethnic wear"
                  className="h-full w-full object-cover transition duration-700 hover:scale-105"
                />

              </div>

              <div className="aspect-[3/4] overflow-hidden">

                <EthnicImage
                  src={ethnicImages.editorial2}
                  alt="Indian designer ethnic wear"
                  className="h-full w-full object-cover transition duration-700 hover:scale-105"
                />

              </div>

            </div>

          </div>

        </section>
      </SectionReveal>

      {/* =====================================================
          EXPERIENCE
          ===================================================== */}

      <SectionReveal>
        <section className="px-5 py-16 sm:px-10 sm:py-32 lg:px-16">

          <SectionHeading
            eyebrow="The RK Experience"
            title="Everything you need for your moment."
          />

          <div className="mx-auto mt-10 grid max-w-[1200px] border-y border-[#ddd3ca] sm:mt-14 md:grid-cols-3">

            <div className="border-b border-[#ddd3ca] px-5 py-8 text-center sm:px-7 sm:py-10 md:border-b-0 md:border-r">

              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[#f1e7de]">
                <Sparkles
                  size={20}
                  className="text-[#9b6b45]"
                />
              </div>

              <h3 className="mt-5 font-serif text-xl sm:mt-6 sm:text-2xl">
                Curated Looks
              </h3>

              <p className="mt-3 text-sm leading-6 text-[#71645e]">
                Beautiful Indian silhouettes selected for
                weddings, parties and celebrations.
              </p>

            </div>

            <div className="border-b border-[#ddd3ca] px-7 py-10 text-center md:border-b-0 md:border-r">

              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[#f1e7de]">
                <CalendarDays
                  size={20}
                  className="text-[#9b6b45]"
                />
              </div>

              <h3 className="mt-6 font-serif text-2xl">
                Occasion Ready
              </h3>

              <p className="mt-3 text-sm leading-6 text-[#71645e]">
                Find the right look for your exact celebration
                and make your entrance unforgettable.
              </p>

            </div>

            <div className="px-7 py-10 text-center">

              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[#f1e7de]">
                <ShieldCheck
                  size={20}
                  className="text-[#9b6b45]"
                />
              </div>

              <h3 className="mt-6 font-serif text-2xl">
                Rental Made Simple
              </h3>

              <p className="mt-3 text-sm leading-6 text-[#71645e]">
                Choose your outfit, enquire about availability
                and get ready for your special occasion.
              </p>

            </div>

          </div>

        </section>
      </SectionReveal>

      {/* =====================================================
          PRODUCTS
          ===================================================== */}

      {featuredProducts.length > 0 && (
        <SectionReveal>

          <section className="bg-[#f7f2ed] px-5 py-16 sm:px-10 sm:py-32 lg:px-16">

            <div className="mx-auto max-w-[1500px]">

              <div className="flex flex-col justify-between gap-4 sm:gap-6 sm:flex-row sm:items-end">

                <div>

                  <p className="mb-4 text-[10px] font-semibold uppercase tracking-[0.4em] text-[#9b6b45]">
                    Shop The Collection
                  </p>

                  <h2 className="font-serif text-2xl tracking-[-0.02em] sm:text-4xl lg:text-5xl">
                    Your next look starts here.
                  </h2>

                </div>

                <Link
                  to="/shop"
                  className="inline-flex items-center gap-2 text-[9px] font-bold uppercase tracking-[0.25em]"
                >
                  View all
                  <ArrowRight size={14} />
                </Link>

              </div>

              <div className="mt-8 grid grid-cols-2 gap-x-3 gap-y-8 sm:mt-12 sm:gap-x-4 sm:gap-y-12 lg:grid-cols-4">

                {featuredProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                  />
                ))}

              </div>

            </div>

          </section>

        </SectionReveal>
      )}

      {/* =====================================================
          FINAL CTA
          ===================================================== */}

      <section className="relative min-h-[500px] overflow-hidden bg-[#301d1f] text-white sm:min-h-[680px]">

        <EthnicImage
          src={ethnicImages.festive}
          alt="Indian woman in elegant ethnic occasion wear"
          className="absolute inset-0 h-full w-full object-cover"
          position="center top"
        />

        <div className="absolute inset-0 bg-black/60" />

        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-black/25" />

        <div className="relative mx-auto flex min-h-[500px] max-w-[1200px] items-center justify-center px-6 py-16 text-center sm:min-h-[680px] sm:py-24">

          <div>

            <p className="mb-6 text-[10px] font-semibold uppercase tracking-[0.4em] text-white/70">
              RK Rent Dress · Raipur
            </p>

            <h2 className="font-serif text-3xl leading-[0.9] tracking-[-0.03em] sm:text-6xl lg:text-8xl">

              Find the look.

              <br />

              <span className="italic text-[#ead5bd]">
                Own the moment.
              </span>

            </h2>

            <p className="mx-auto mt-7 max-w-lg text-sm leading-7 text-white/75">
              Explore designer ethnic wear for weddings,
              receptions, engagements, parties and every
              moment worth dressing for.
            </p>

            <div className="mt-9 flex flex-col justify-center gap-3 sm:flex-row">

              <Link
                to="/shop?filter=rental"
                className="inline-flex items-center justify-center gap-3 bg-white px-8 py-4 text-[9px] font-bold uppercase tracking-[0.25em] text-[#241a17] transition hover:bg-[#ead5bd]"
              >
                Explore Rentals
                <ArrowRight size={15} />
              </Link>

              <Link
                to="/shop"
                className="inline-flex items-center justify-center gap-3 border border-white/40 px-8 py-4 text-[9px] font-bold uppercase tracking-[0.25em] text-white transition hover:bg-white hover:text-[#241a17]"
              >
                View Collection
              </Link>

            </div>

          </div>

        </div>

      </section>

      {/* =====================================================
          FLOATING CART
          ===================================================== */}

      {cart.length > 0 && (
        <Link
          to="/cart"
          className="fixed bottom-5 right-5 z-50 flex items-center gap-3 rounded-full bg-[#241a17] px-5 py-3 text-white shadow-xl transition hover:scale-105"
        >
          <ShoppingBag size={17} />

          <span className="text-[9px] font-semibold uppercase tracking-[0.18em]">
            {cart.length}{' '}
            {cart.length === 1 ? 'Item' : 'Items'}
          </span>
        </Link>
      )}

    </main>
  );
}