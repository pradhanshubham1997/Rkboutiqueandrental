import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Heart, Minus, Plus, Truck, Shield, RotateCcw, MessageCircle, Check, ArrowRight, Share2, Expand, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { products } from '../data/mockData';
import { useApp } from '../context/AppContext';
import PublicImage, { cleanSrc } from '../components/PublicImage';
import PublicProductCard from '../components/PublicProductCard';
import { SITE_URL, buildWhatsAppLink, buildProductInquiry } from '../data/store';

export default function ProductDetail() {
  const { id } = useParams();
  const product = products.find(p => p.id === id);
  const { addToCart } = useApp();
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [mode, setMode] = useState<'retail' | 'rental'>('retail');
  const [rentalStart, setRentalStart] = useState('');
  const [rentalEnd, setRentalEnd] = useState('');
  const [added, setAdded] = useState(false);
  const [activeImage, setActiveImage] = useState(0);
  const [lightbox, setLightbox] = useState(false);

  useEffect(() => {
    setActiveImage(0);
    setSelectedSize('');
    setSelectedColor('');
    setQuantity(1);
    setAdded(false);
    setLightbox(false);
    window.scrollTo(0, 0);
  }, [id]);

  useEffect(() => {
    if (product) {
      document.title = `${product.name} — RK Boutique & Rentals, Raipur`;
      const meta = document.querySelector('meta[name="description"]');
      if (meta) {
        meta.setAttribute(
          'content',
          `${product.name} (${product.category}) at RK Boutique & Rentals, Raipur. ` +
            (product.salePrice > 0 ? `Buy at Rs.${product.salePrice.toLocaleString('en-IN')}. ` : '') +
            (product.rentalPrice > 0 ? `Rent at Rs.${product.rentalPrice.toLocaleString('en-IN')}/day. ` : '') +
            'Enquire availability on WhatsApp.',
        );
      }
    }
  }, [product, id]);

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-32 text-center">
        <h2 className="font-display text-2xl text-charcoal mb-4">Product not found</h2>
        <Link to="/shop" className="inline-flex items-center gap-2 text-burgundy text-sm font-body hover:text-burgundy-deep transition-colors">
          <ArrowRight size={14} className="rotate-180" /> Return to Shop
        </Link>
      </div>
    );
  }

  const rentalDays = rentalStart && rentalEnd
    ? Math.max(1, Math.ceil((new Date(rentalEnd).getTime() - new Date(rentalStart).getTime()) / (1000 * 60 * 60 * 24)))
    : 1;
  const rentalTotal = product.rentalPrice * rentalDays;

  const canAdd = mode === 'retail'
    ? product.salePrice > 0 && product.available > 0
    : product.rentalPrice > 0 && product.available > 0;

  const handleAdd = () => {
    if (!canAdd) return;
    addToCart({
      product,
      mode,
      quantity,
      rentalStart: mode === 'rental' ? rentalStart : undefined,
      rentalEnd: mode === 'rental' ? rentalEnd : undefined,
      rentalDays: mode === 'rental' ? rentalDays : undefined,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const allImages = (product.images.length > 0 ? product.images : [product.image])
    .map(cleanSrc)
    .filter(Boolean);
  const safeActive = Math.min(activeImage, Math.max(allImages.length - 1, 0));

  const priceLine =
    mode === 'rental'
      ? `Rs.${product.rentalPrice.toLocaleString('en-IN')}/day rent`
      : `Rs.${product.salePrice.toLocaleString('en-IN')}`;
  const productUrl = `${SITE_URL}/product/${product.id}`;
  const whatsappHref = buildWhatsAppLink(
    buildProductInquiry({
      name: product.name,
      priceLine,
      productUrl,
      mode,
      size: selectedSize || undefined,
      color: selectedColor || undefined,
      rentalStart: mode === 'rental' ? rentalStart || undefined : undefined,
      rentalEnd: mode === 'rental' ? rentalEnd || undefined : undefined,
    }),
  );

  const related = products.filter((p) => p.id !== product.id && p.category === product.category).slice(0, 4);
  const relatedFallback = products.filter((p) => p.id !== product.id).slice(0, 4);
  const relatedList = related.length > 0 ? related : relatedFallback;

  return (
    <div className="min-h-screen bg-ivory">
      {/* Breadcrumb */}
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 pt-6 pb-4">
        <nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-2 text-[10px] tracking-[0.15em] text-charcoal-muted/50 font-body uppercase">
          <Link to="/" className="hover:text-burgundy transition-colors">Home</Link>
          <span>/</span>
          <Link to="/shop" className="hover:text-burgundy transition-colors">Shop</Link>
          <span>/</span>
          <Link to={`/shop?category=${encodeURIComponent(product.category)}`} className="hover:text-burgundy transition-colors">{product.category}</Link>
          <span>/</span>
          <span className="text-charcoal normal-case tracking-normal">{product.name}</span>
        </nav>
        <Link
          to="/shop"
          className="mt-3 inline-flex items-center gap-2 text-[10px] tracking-[0.2em] font-medium text-charcoal-muted hover:text-burgundy transition-colors font-body uppercase"
        >
          <ArrowRight size={13} className="rotate-180" /> Back to collection
        </Link>
      </div>

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 pb-16 sm:pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
          {/* ======== IMAGES ======== */}
          <div className="space-y-4">
            <div className="relative aspect-[3/4] max-h-[78vh] w-full overflow-hidden bg-cream">
              <button
                type="button"
                onClick={() => setLightbox(true)}
                aria-label="Enlarge product photo"
                className="absolute inset-0 z-10 h-full w-full cursor-zoom-in"
              >
                <PublicImage
                  src={allImages[safeActive]}
                  alt={`${product.name} — photo ${safeActive + 1} of ${Math.max(allImages.length, 1)}`}
                  fit="contain"
                  position="center top"
                  className="absolute inset-0 h-full w-full p-2 sm:p-3"
                />
              </button>
              <span className="pointer-events-none absolute bottom-3 right-3 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-ivory/85 text-charcoal-muted">
                <Expand size={15} />
              </span>
              {product.newArrival && (
                <div className="absolute top-4 left-4 bg-burgundy text-cream px-4 py-1.5 text-[9px] tracking-[0.25em] font-body uppercase">
                  New Arrival
                </div>
              )}
              {product.status === 'low_stock' && (
                <div className="absolute top-4 right-14 bg-gold text-charcoal px-4 py-1.5 text-[9px] tracking-[0.25em] font-body uppercase">
                  Almost Gone
                </div>
              )}
              <button className="absolute top-4 right-4 w-10 h-10 bg-ivory/80 rounded-full flex items-center justify-center hover:bg-ivory transition-colors">
                <Heart size={16} className="text-charcoal-muted" />
              </button>
            </div>

            {allImages.length > 1 && (
              <div className="grid grid-cols-4 gap-2">
                {allImages.slice(0, 4).map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImage(i)}
                    aria-label={`View photo ${i + 1}`}
                    className={`relative aspect-square overflow-hidden bg-cream transition-all duration-300 ${
                      safeActive === i ? 'ring-2 ring-burgundy' : 'ring-1 ring-cream hover:ring-rose'
                    }`}
                  >
                    <PublicImage src={img} alt="" fit="contain" position="center top" className="absolute inset-0 h-full w-full p-1" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* ======== DETAILS ======== */}
          <div className="space-y-6 lg:pt-4">
            {/* Type badge */}
            <div className="flex items-center gap-2">
              <span className="text-[9px] tracking-[0.2em] text-burgundy font-body uppercase px-3 py-1 border border-burgundy/20">
                {product.type === 'both' ? 'Buy or Rent' : product.type === 'retail' ? 'Buy Only' : 'Rent Only'}
              </span>
            </div>

            {/* Title */}
            <div>
              <p className="text-[9px] tracking-[0.3em] text-charcoal-muted/50 font-body uppercase mb-2">{product.category}</p>
              <h1 className="font-display text-3xl sm:text-4xl text-charcoal leading-tight mb-2">{product.name}</h1>
              <p className="text-[10px] tracking-[0.15em] text-charcoal-muted/40 font-body">SKU: {product.sku}</p>
            </div>

            {/* Availability — real stock data only */}
            <div className="flex flex-wrap items-center gap-2">
              <span className={`px-3 py-1.5 text-[9px] tracking-[0.2em] font-body uppercase ${
                product.available > 0 ? 'bg-sage/10 text-charcoal' : 'bg-burgundy/10 text-burgundy'
              }`}>
                {product.available > 0
                  ? `${product.available} ${product.available === 1 ? 'piece' : 'pieces'} available`
                  : 'Currently unavailable — enquire below'}
              </span>
              {product.newArrival && (
                <span className="px-3 py-1.5 text-[9px] tracking-[0.2em] font-body uppercase bg-cream/60 text-charcoal-muted">
                  New Arrival
                </span>
              )}
            </div>

            <div className="line-editorial" />

            {/* Description */}
            <p className="text-sm text-charcoal-muted font-body leading-relaxed">{product.description}</p>

            {/* Price */}
            <div className="flex items-baseline gap-6">
              {product.salePrice > 0 && (
                <div>
                  <p className="text-[9px] tracking-[0.2em] text-charcoal-muted/50 font-body uppercase mb-1">Price</p>
                  <p className="font-display text-3xl text-charcoal">₹{product.salePrice.toLocaleString()}</p>
                </div>
              )}
              {product.rentalPrice > 0 && (
                <div>
                  <p className="text-[9px] tracking-[0.2em] text-charcoal-muted/50 font-body uppercase mb-1">Rental</p>
                  <p className="font-display text-3xl text-burgundy">
                    ₹{product.rentalPrice.toLocaleString()}
                    <span className="text-sm text-charcoal-muted font-body">/day</span>
                  </p>
                </div>
              )}
            </div>

            <div className="line-editorial" />

            {/* Size Selection */}
            {product.sizes.length > 0 && (
              <div>
                <h3 className="text-[10px] tracking-[0.2em] text-charcoal font-body uppercase mb-3">Size</h3>
                <div className="flex flex-wrap gap-2">
                  {product.sizes.map(size => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`min-w-[48px] px-4 py-2.5 text-[11px] tracking-[0.1em] font-body font-medium border transition-all duration-300 ${
                        selectedSize === size
                          ? 'border-charcoal bg-charcoal text-cream'
                          : 'border-cream hover:border-charcoal-muted text-charcoal'
                      }`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Color Selection */}
            {product.colors.length > 0 && (
              <div>
                <h3 className="text-[10px] tracking-[0.2em] text-charcoal font-body uppercase mb-3">
                  Color {selectedColor && <span className="text-charcoal-muted/50 normal-case">— {selectedColor}</span>}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {product.colors.map(color => (
                    <button
                      key={color}
                      onClick={() => setSelectedColor(color)}
                      className={`px-4 py-2.5 text-[11px] tracking-[0.1em] font-body font-medium border transition-all duration-300 ${
                        selectedColor === color
                          ? 'border-burgundy bg-burgundy/5 text-burgundy'
                          : 'border-cream hover:border-charcoal-muted text-charcoal'
                      }`}
                    >
                      {color}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Mode Selection */}
            <div>
              <h3 className="text-[10px] tracking-[0.2em] text-charcoal font-body uppercase mb-3">How would you like this?</h3>
              <div className="grid grid-cols-2 gap-3">
                {(product.type === 'retail' || product.type === 'both') && product.salePrice > 0 && (
                  <button
                    onClick={() => setMode('retail')}
                    className={`p-4 border text-left transition-all duration-300 ${
                      mode === 'retail'
                        ? 'border-charcoal bg-charcoal/5'
                        : 'border-cream hover:border-charcoal-muted'
                    }`}
                  >
                    <p className="text-[10px] tracking-[0.15em] text-charcoal-muted font-body uppercase mb-1">Buy</p>
                    <p className="font-display text-xl text-charcoal">₹{product.salePrice.toLocaleString()}</p>
                    <p className="text-[9px] text-charcoal-muted/50 font-body mt-1">One-time purchase</p>
                  </button>
                )}
                {(product.type === 'rental' || product.type === 'both') && product.rentalPrice > 0 && (
                  <button
                    onClick={() => setMode('rental')}
                    className={`p-4 border text-left transition-all duration-300 ${
                      mode === 'rental'
                        ? 'border-burgundy bg-burgundy/5'
                        : 'border-cream hover:border-charcoal-muted'
                    }`}
                  >
                    <p className="text-[10px] tracking-[0.15em] text-charcoal-muted font-body uppercase mb-1">Rent</p>
                    <p className="font-display text-xl text-burgundy">₹{product.rentalPrice.toLocaleString()}<span className="text-xs font-body text-charcoal-muted">/day</span></p>
                    <p className="text-[9px] text-charcoal-muted/50 font-body mt-1">Deposit: ₹{product.deposit.toLocaleString()}</p>
                  </button>
                )}
              </div>
            </div>

            {/* Rental Dates */}
            {mode === 'rental' && (
              <div className="p-5 border border-burgundy/10 bg-burgundy/[0.02] space-y-4">
                <h3 className="text-[10px] tracking-[0.2em] text-charcoal font-body uppercase">Select Rental Dates</h3>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-[9px] tracking-[0.15em] text-charcoal-muted/60 font-body uppercase mb-1.5 block">Pickup</label>
                    <input
                      type="date"
                      value={rentalStart}
                      onChange={e => setRentalStart(e.target.value)}
                      className="w-full px-3 py-2.5 border border-cream text-sm font-body bg-ivory focus:border-burgundy"
                    />
                  </div>
                  <div>
                    <label className="text-[9px] tracking-[0.15em] text-charcoal-muted/60 font-body uppercase mb-1.5 block">Return</label>
                    <input
                      type="date"
                      value={rentalEnd}
                      onChange={e => setRentalEnd(e.target.value)}
                      className="w-full px-3 py-2.5 border border-cream text-sm font-body bg-ivory focus:border-burgundy"
                    />
                  </div>
                </div>
                {rentalStart && rentalEnd && (
                  <div className="p-4 bg-cream/40 space-y-2 text-sm font-body">
                    <div className="flex justify-between"><span className="text-charcoal-muted">Duration</span><span className="font-medium text-charcoal">{rentalDays} day{rentalDays !== 1 ? 's' : ''}</span></div>
                    <div className="flex justify-between"><span className="text-charcoal-muted">Rental</span><span className="font-medium text-charcoal">₹{rentalTotal.toLocaleString()}</span></div>
                    <div className="flex justify-between"><span className="text-charcoal-muted">Security Deposit</span><span className="font-medium text-charcoal">₹{product.deposit.toLocaleString()}</span></div>
                    <div className="flex justify-between font-bold pt-2 border-t border-cream"><span className="text-charcoal">Total</span><span className="text-charcoal">₹{(rentalTotal + product.deposit).toLocaleString()}</span></div>
                  </div>
                )}
              </div>
            )}

            {/* Quantity & Add to Cart */}
            <div className="flex items-center gap-3">
              <div className="flex items-center border border-cream">
                <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="p-3 hover:bg-cream/50 transition-colors">
                  <Minus size={14} className="text-charcoal-muted" />
                </button>
                <span className="w-12 text-center text-sm font-medium font-body text-charcoal">{quantity}</span>
                <button onClick={() => setQuantity(quantity + 1)} className="p-3 hover:bg-cream/50 transition-colors">
                  <Plus size={14} className="text-charcoal-muted" />
                </button>
              </div>

              <button
                onClick={handleAdd}
                disabled={!canAdd || added}
                className={`flex-1 flex items-center justify-center gap-2 py-3.5 text-[11px] tracking-[0.2em] font-medium font-body transition-all duration-300 btn-luxury ${
                  added
                    ? 'bg-sage text-cream'
                    : canAdd
                    ? 'bg-charcoal text-cream hover:bg-burgundy'
                    : 'bg-cream text-charcoal-muted/40 cursor-not-allowed'
                }`}
              >
                {added ? (
                  <><Check size={14} /> ADDED TO BAG</>
                ) : (
                  <><ShoppingBagIcon /> {mode === 'rental' ? 'RENT NOW' : 'ADD TO BAG'}</>
                )}
              </button>

              <button className="p-3.5 border border-cream hover:border-burgundy/30 transition-colors" aria-label="Share">
                <Share2 size={16} className="text-charcoal-muted" />
              </button>
            </div>

            {/* WhatsApp inquiry — message carries real product, price, size & dates */}
            <a
              href={whatsappHref}
              target="_blank"
              rel="noreferrer"
              className="flex w-full items-center justify-center gap-2 border border-burgundy/30 py-3.5 text-[11px] tracking-[0.2em] font-medium font-body text-burgundy transition-all duration-300 hover:bg-burgundy hover:text-cream"
            >
              <MessageCircle size={15} /> ENQUIRE ON WHATSAPP
            </a>

            {/* Trust badges */}
            <div className="grid grid-cols-3 gap-4 pt-4 border-t border-cream">
              {[
                { icon: <Truck size={16} />, label: 'Free Pickup & Delivery' },
                { icon: <Shield size={16} />, label: 'Fully Refundable Deposit' },
                { icon: <RotateCcw size={16} />, label: 'Easy Returns' },
              ].map(b => (
                <div key={b.label} className="flex flex-col items-center gap-2 text-center">
                  <div className="text-burgundy">{b.icon}</div>
                  <span className="text-[9px] tracking-[0.1em] text-charcoal-muted/60 font-body leading-tight">{b.label}</span>
                </div>
              ))}
            </div>

            {/* Care Instructions */}
            {product.careInstructions && (
              <div className="p-5 bg-cream/40 border border-cream">
                <h3 className="text-[10px] tracking-[0.2em] text-charcoal font-body uppercase mb-2">Care Instructions</h3>
                <p className="text-xs text-charcoal-muted font-body leading-relaxed">{product.careInstructions}</p>
              </div>
            )}
          </div>
        </div>

        {/* Related pieces */}
        {relatedList.length > 0 && (
          <div className="mt-14 sm:mt-20">
            <div className="line-editorial mb-8" />
            <div className="flex items-end justify-between gap-4">
              <div>
                <p className="mb-2 text-[10px] font-semibold uppercase tracking-[0.35em] text-burgundy/70 font-body">
                  Complete the look
                </p>
                <h2 className="font-display text-2xl text-charcoal sm:text-3xl">You may also love</h2>
              </div>
              <Link
                to="/shop"
                className="hidden sm:inline-flex items-center gap-2 text-[10px] tracking-[0.2em] font-medium text-charcoal hover:text-burgundy transition-colors font-body uppercase"
              >
                View all <ArrowRight size={14} />
              </Link>
            </div>
            <div className="mt-6 grid grid-cols-2 gap-x-3 gap-y-8 sm:gap-x-5 lg:grid-cols-4">
              {relatedList.map((item) => (
                <PublicProductCard key={item.id} product={item} />
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Lightbox */}
      {lightbox && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`${product.name} photo viewer`}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-charcoal/95 p-4"
          onClick={() => setLightbox(false)}
        >
          <button
            type="button"
            aria-label="Close photo viewer"
            onClick={() => setLightbox(false)}
            className="absolute right-4 top-4 flex h-11 w-11 items-center justify-center rounded-full bg-cream/10 text-cream transition hover:bg-cream/25"
          >
            <X size={20} />
          </button>
          {allImages.length > 1 && (
            <>
              <button
                type="button"
                aria-label="Previous photo"
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveImage((v) => (v - 1 + allImages.length) % allImages.length);
                }}
                className="absolute left-3 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-cream/10 text-cream transition hover:bg-cream/25 sm:left-6"
              >
                <ChevronLeft size={20} />
              </button>
              <button
                type="button"
                aria-label="Next photo"
                onClick={(e) => {
                  e.stopPropagation();
                  setActiveImage((v) => (v + 1) % allImages.length);
                }}
                className="absolute right-3 top-1/2 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-cream/10 text-cream transition hover:bg-cream/25 sm:right-6"
              >
                <ChevronRight size={20} />
              </button>
            </>
          )}
          <div
            className="relative aspect-[3/4] max-h-[88vh] w-full max-w-[640px] overflow-hidden bg-cream/5"
            onClick={(e) => e.stopPropagation()}
          >
            <PublicImage
              src={allImages[safeActive]}
              alt={`${product.name} — enlarged photo ${safeActive + 1} of ${Math.max(allImages.length, 1)}`}
              fit="contain"
              position="center top"
              className="absolute inset-0 h-full w-full p-2"
            />
          </div>
          {allImages.length > 1 && (
            <p className="absolute bottom-5 left-1/2 -translate-x-1/2 text-[10px] tracking-[0.3em] text-cream/60 font-body">
              {safeActive + 1} / {allImages.length}
            </p>
          )}
        </div>
      )}
    </div>
  );
}

function ShoppingBagIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z" />
      <line x1="3" y1="6" x2="21" y2="6" />
      <path d="M16 10a4 4 0 0 1-8 0" />
    </svg>
  );
}
