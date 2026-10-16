import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  ShoppingBag,
  MessageCircle,
  Sparkles,
  ShieldCheck,
  MapPin,
  ChevronRight,
  CalendarDays,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { products } from '../data/mockData';
import PublicProductCard from '../components/PublicProductCard';
import { buildWhatsAppLink, buildGeneralInquiry } from '../data/store';

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
  mobileSrc = null,
  eager = false,
}: {
  src: string;
  alt: string;
  className?: string;
  position?: string;
  mobileSrc?: string | null;
  eager?: boolean;
}) {
  const [failed, setFailed] = useState(false);
  const clean = (src ?? '').trim();
  const cleanMobile = (mobileSrc ?? '').trim();

  if (!clean || failed) {
    return (
      <div
        role="img"
        aria-label={alt}
        className={`absolute inset-0 bg-gradient-to-br from-[#4b252c] via-[#7b4650] to-[#c8a27c] ${className}`}
      />
    );
  }

  const img = (
    <img
      src={clean}
      alt={alt}
      className={className}
      style={{ objectPosition: position }}
      loading={eager ? 'eager' : 'lazy'}
      fetchPriority={eager ? 'high' : 'auto'}
      decoding={eager ? 'sync' : 'async'}
      referrerPolicy="no-referrer"
      onError={() => setFailed(true)}
    />
  );

  if (cleanMobile) {
    return (
      <picture className="contents">
        <source media="(max-width: 767px)" srcSet={cleanMobile} />
        {img}
      </picture>
    );
  }

  return img;
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
   COLLECTION TILE — real catalogue categories only
   Uses actual product photography with object-contain so the
   garment is never cropped, plus a live piece count.
   ========================================================= */

function CollectionTile({
  image,
  label,
  title,
  href,
  count,
  index,
}: {
  image: string;
  label: string;
  title: string;
  href: string;
  count: number;
  index: string;
}) {
  return (
    <Link
      to={href}
      className="group relative block overflow-hidden bg-[#ece4da]"
    >
      <div className="relative aspect-[3/4]">
        <EthnicImage
          src={image}
          alt={`${title} — designer collection at RK Boutique`}
          position="center top"
          className="absolute inset-0 h-full w-full object-contain p-3 transition duration-[1200ms] group-hover:scale-[1.04] sm:p-4"
        />
      </div>

      <div className="absolute left-4 top-4 flex h-9 w-9 items-center justify-center rounded-full bg-[#241a17]/85 text-[9px] font-semibold text-white backdrop-blur-sm">
        {index}
      </div>

      <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/75 via-black/25 to-transparent p-4 pt-12 text-white sm:p-5 sm:pt-14">
        <p className="text-[8px] font-semibold uppercase tracking-[0.3em] text-white/70 sm:text-[9px]">
          {label} · {count} {count === 1 ? 'piece' : 'pieces'}
        </p>
        <div className="mt-1 flex items-center justify-between gap-2">
          <h3 className="font-serif text-lg leading-tight sm:text-2xl">
            {title}
          </h3>
          <ArrowRight
            size={16}
            className="shrink-0 transition-transform group-hover:translate-x-1"
          />
        </div>
      </div>
    </Link>
  );
}

/* Live catalogue helpers — every tile below resolves to real products. */
function categoryPhoto(category: string): string {
  const item = products.find((p) => p.category === category);
  return ((item?.images?.[0] || item?.image || '') as string).trim();
}

function categoryCount(category: string): number {
  return products.filter((p) => p.category === category).length;
}

function filteredPhoto(predicate: (p: (typeof products)[number]) => boolean): string {
  const item = products.find(predicate);
  return ((item?.images?.[0] || item?.image || '') as string).trim();
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
   HOME
   ========================================================= */

export default function Home() {
  const { cart } = useApp();

  const [heroLoaded, setHeroLoaded] = useState(false);

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

      <section className="relative overflow-hidden bg-[#321f20] text-white">

        {/* HERO IMAGE */}

        <EthnicImage
          src={ethnicImages.hero}
          mobileSrc={ethnicImages.heroMobile}
          alt="Indian woman wearing luxury ethnic wedding wear"
          position="center 20%"
          eager
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
            HERO CONTENT
            ================================================= */}

        <div className="relative z-10 mx-auto flex min-h-[86svh] max-w-[1500px] items-end px-5 pb-10 pt-28 sm:px-10 sm:pb-20 md:min-h-screen lg:px-16 lg:pb-24">

          <div className="max-w-4xl">

            <div className="mb-5 flex items-center gap-3 text-[9px] font-semibold uppercase tracking-[0.35em] text-[#f0ddc7] sm:mb-6">
              <span className="h-px w-10 bg-[#f0ddc7]/60" />
              Designer styles to buy · Signature looks to rent
            </div>

            <h1 className="font-serif text-[2.35rem] leading-[0.95] tracking-[-0.03em] sm:text-7xl lg:text-[clamp(5rem,9vw,8.5rem)]">

              Your Next Statement Look Starts Here.

            </h1>

            <p className="mt-6 max-w-xl text-sm leading-7 text-white/80 sm:mt-7 sm:text-base">
              Discover designer styles for every occasion.
              Find your perfect outfit to buy or rent.
            </p>

            <div className="mt-7 flex flex-col gap-3 sm:mt-9 sm:flex-row">

              <Link
                to="/shop"
                className="inline-flex h-12 items-center justify-center gap-3 bg-[#f8f2eb] px-7 text-[9px] font-bold uppercase tracking-[0.25em] text-[#241a17] transition hover:bg-[#ead5bd] sm:h-[52px]"
              >
                Explore Collection
                <ArrowRight size={15} />
              </Link>

              <Link
                to="/shop?filter=rental"
                className="inline-flex h-12 items-center justify-center gap-3 border border-white/40 bg-white/5 px-7 text-[9px] font-bold uppercase tracking-[0.25em] text-white backdrop-blur-sm transition hover:bg-white hover:text-[#241a17] sm:h-[52px]"
              >
                Explore Rental Styles
                <ArrowRight size={15} />
              </Link>

            </div>

            <a
              href={buildWhatsAppLink(buildGeneralInquiry())}
              target="_blank"
              rel="noreferrer"
              className="mt-5 inline-flex items-center gap-2 text-[9px] font-semibold uppercase tracking-[0.25em] text-[#f0ddc7]/90 underline-offset-4 hover:underline"
            >
              <MessageCircle size={13} />
              Questions? Chat on WhatsApp
            </a>

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
            eyebrow="Shop By Collection"
            title="Real pieces, ready to explore."
            description="Every tile below opens the live catalogue — buy or rent, with honest pricing on each piece."
          />

          <div className="mx-auto mt-8 grid max-w-[1500px] grid-cols-2 gap-3 sm:mt-14 sm:gap-4 lg:grid-cols-3">

            <CollectionTile
              image={categoryPhoto('Lehenga')}
              label="Signature"
              title="Designer Lehengas"
              href="/shop?category=Lehenga"
              count={categoryCount('Lehenga')}
              index="01"
            />

            <CollectionTile
              image={categoryPhoto('Saree')}
              label="Timeless"
              title="Sarees"
              href="/shop?category=Saree"
              count={categoryCount('Saree')}
              index="02"
            />

            <CollectionTile
              image={categoryPhoto('Gown')}
              label="Statement"
              title="Gowns"
              href="/shop?category=Gown"
              count={categoryCount('Gown')}
              index="03"
            />

            <CollectionTile
              image={categoryPhoto('Suit')}
              label="Everyday Grace"
              title="Suits & Sets"
              href="/shop?category=Suit"
              count={categoryCount('Suit')}
              index="04"
            />

            <CollectionTile
              image={filteredPhoto((p) => p.type !== 'retail')}
              label="Wear & Return"
              title="Rental Collection"
              href="/shop?filter=rental"
              count={products.filter((p) => p.type !== 'retail').length}
              index="05"
            />

            <CollectionTile
              image={filteredPhoto((p) => p.newArrival)}
              label="Just In"
              title="New Arrivals"
              href="/shop?filter=new"
              count={products.filter((p) => p.newArrival).length}
              index="06"
            />

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
                Browse Before Visiting
              </h3>

              <p className="mt-3 text-sm leading-6 text-[#71645e]">
                Explore real product photos and honest pricing
                online, then come see your favourites in store.
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
                Every Occasion Covered
              </h3>

              <p className="mt-3 text-sm leading-6 text-[#71645e]">
                Weddings, receptions, engagements, parties and
                festive moments — filter the collection your way.
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
                Ask on WhatsApp
              </h3>

              <p className="mt-3 text-sm leading-6 text-[#71645e]">
                Message the boutique directly — product inquiries
                carry the exact piece, price and your options.
              </p>

              <a
                href={buildWhatsAppLink(buildGeneralInquiry())}
                target="_blank"
                rel="noreferrer"
                className="mt-4 inline-flex items-center gap-2 text-[9px] font-bold uppercase tracking-[0.25em] text-[#6B1D35] hover:underline"
              >
                <MessageCircle size={13} />
                Start a chat
              </a>

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
                  <PublicProductCard
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
          BUY VS RENT
          ===================================================== */}

      <SectionReveal>
        <section className="border-t border-[#e2d8d0] bg-[#f1ebe5] px-5 py-16 sm:px-10 sm:py-24 lg:px-16">

          <SectionHeading
            eyebrow="Two Ways To Wear It"
            title="Buy the look, or rent the moment."
          />

          <div className="mx-auto mt-10 grid max-w-[1200px] gap-4 sm:mt-14 md:grid-cols-2">

            <div className="border border-[#ddd3ca] bg-white p-7 sm:p-10">
              <p className="text-[10px] font-semibold uppercase tracking-[0.35em] text-[#9b6b45]">
                Buy
              </p>
              <h3 className="mt-3 font-serif text-2xl leading-tight text-[#241a17] sm:text-3xl">
                Designer styles to buy.
              </h3>
              <p className="mt-4 text-sm leading-7 text-[#74665e]">
                Discover an outfit to own — {products.filter((p) => p.type !== 'rental').length} pieces
                available for purchase, from ₹{Math.min(...products.filter((p) => p.salePrice > 0).map((p) => p.salePrice)).toLocaleString('en-IN')},
                with sizes, colours and care details on every page.
              </p>
              <Link
                to="/shop?filter=buy"
                className="mt-7 inline-flex items-center gap-3 border-b border-[#241a17] pb-2 text-[9px] font-bold uppercase tracking-[0.25em]"
              >
                Shop buyable styles
                <ArrowRight size={14} />
              </Link>
            </div>

            <div className="border border-[#6B1D35]/20 bg-[#2b1a1c] p-7 text-white sm:p-10">
              <p className="text-[10px] font-semibold uppercase tracking-[0.35em] text-[#ead5bd]">
                Rent
              </p>
              <h3 className="mt-3 font-serif text-2xl leading-tight sm:text-3xl">
                Signature looks to rent.
              </h3>
              <p className="mt-4 text-sm leading-7 text-white/75">
                Find a designer outfit for your special occasion without buying
                it — {products.filter((p) => p.type !== 'retail').length} pieces
                for rent, from ₹{Math.min(...products.filter((p) => p.rentalPrice > 0).map((p) => p.rentalPrice)).toLocaleString('en-IN')}/day
                with the refundable deposit shown upfront.
              </p>
              <Link
                to="/shop?filter=rental"
                className="mt-7 inline-flex items-center gap-3 border-b border-[#ead5bd] pb-2 text-[9px] font-bold uppercase tracking-[0.25em] text-[#ead5bd]"
              >
                Explore rental styles
                <ArrowRight size={14} />
              </Link>
            </div>

          </div>

        </section>
      </SectionReveal>

      {/* =====================================================
          BRAND STORY
          ===================================================== */}

      <SectionReveal>
        <section className="px-5 py-16 sm:px-10 sm:py-24 lg:px-16">

          <div className="mx-auto grid max-w-[1200px] items-center gap-8 lg:grid-cols-[1.2fr_0.8fr]">

            <div>
              <p className="mb-4 text-[10px] font-semibold uppercase tracking-[0.4em] text-[#9b6b45]">
                The Boutique
              </p>
              <h2 className="font-serif text-3xl leading-[1.02] tracking-[-0.02em] text-[#241a17] sm:text-4xl lg:text-5xl">
                A Raipur showroom for
                <br />
                <span className="italic text-[#9b6b45]">occasion dressing.</span>
              </h2>
              <p className="mt-6 max-w-xl text-sm leading-8 text-[#74665e] sm:text-base">
                RK Boutique &amp; Rentals curates designer ethnic and
                contemporary wear in the heart of Raipur. Browse the
                collection online, then visit the store — or message us
                on WhatsApp — to find the piece your celebration deserves.
              </p>
              <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                <Link
                  to="/about"
                  className="inline-flex h-12 items-center justify-center gap-2 bg-[#241a17] px-7 text-[10px] font-bold uppercase tracking-[0.22em] text-white transition hover:bg-[#6B1D35]"
                >
                  Our story <ArrowRight size={14} />
                </Link>
                <Link
                  to="/contact"
                  className="inline-flex h-12 items-center justify-center gap-2 border border-[#241a17] px-7 text-[10px] font-bold uppercase tracking-[0.22em] text-[#241a17] transition hover:bg-[#241a17] hover:text-white"
                >
                  Visit & contact
                </Link>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3 border-y border-[#ddd3ca] py-8 lg:grid-cols-1 lg:gap-0 lg:border-y-0 lg:border-l lg:py-2 lg:pl-10">
              {[
                { value: `${products.length}`, label: 'Curated pieces' },
                { value: `${new Set(products.map((p) => p.category)).size}`, label: 'Categories' },
                { value: `${products.filter((p) => p.type !== 'retail').length}`, label: 'Rentable looks' },
              ].map((stat) => (
                <div key={stat.label} className="py-2 text-center lg:py-4 lg:text-left">
                  <p className="font-serif text-3xl text-[#241a17] sm:text-4xl">{stat.value}</p>
                  <p className="mt-1 text-[9px] font-semibold uppercase tracking-[0.25em] text-[#81746d]">{stat.label}</p>
                </div>
              ))}
            </div>

          </div>

        </section>
      </SectionReveal>

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
