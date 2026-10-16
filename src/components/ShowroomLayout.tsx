import { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate, Outlet } from 'react-router-dom';
import { Search, ShoppingBag, Menu, X, MapPin, Phone, MessageCircle, ChevronUp, LayoutDashboard } from 'lucide-react';
import { useApp } from '../context/AppContext';
import { STORE, buildWhatsAppLink, buildGeneralInquiry } from '../data/store';

const navLinks = [
  { label: 'HOME', to: '/' },
  { label: 'SHOP', to: '/shop' },
  { label: 'RENT', to: '/shop?filter=rental' },
  { label: 'ABOUT', to: '/about' },
  { label: 'CONTACT', to: '/contact' },
];

export default function ShowroomLayout() {
  const { cart } = useApp();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  const submitSearch = (event?: React.FormEvent) => {
    event?.preventDefault();
    const q = searchQuery.trim();
    setSearchOpen(false);
    navigate(q ? `/shop?q=${encodeURIComponent(q)}` : '/shop');
    setSearchQuery('');
  };

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 80);
      setShowBackToTop(window.scrollY > 800);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
    setSearchOpen(false);
    window.scrollTo(0, 0);
  }, [location]);

  const isHome = location.pathname === '/';

  return (
    <div className="min-h-screen bg-ivory">
      {/* Header */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          !isHome || scrolled
            ? 'glass-luxury shadow-[0_1px_0_rgba(107,29,53,0.06)]'
            : 'bg-charcoal/40 backdrop-blur-md'
        }`}
      >
        <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-14 sm:h-16 lg:h-18">
            {/* Mobile menu */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="lg:hidden p-2 transition-colors"
              aria-label="Menu"
            >
              {mobileOpen ? (
                <X size={20} className={!isHome || scrolled ? 'text-charcoal' : 'text-cream'} />
              ) : (
                <Menu size={20} className={!isHome || scrolled ? 'text-charcoal' : 'text-cream'} />
              )}
            </button>

            {/* Desktop nav — left */}
            <nav className="hidden lg:flex items-center gap-7">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  to={link.to}
                  className={`text-[10px] tracking-[0.25em] font-medium font-body uppercase transition-colors duration-300 ${
                    !isHome || scrolled ? 'text-charcoal-muted hover:text-burgundy' : 'text-cream/80 hover:text-cream'
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </nav>

            {/* Logo — center */}
            <Link to="/" className="absolute left-1/2 -translate-x-1/2 text-center group">
              <div className={`text-[8px] tracking-[0.5em] font-body uppercase mb-0.5 transition-colors duration-500 ${
                !isHome || scrolled ? 'text-burgundy/60' : 'text-gold/80'
              }`}>
                Raipur
              </div>
              <h1 className={`text-lg sm:text-xl lg:text-2xl font-display tracking-[0.1em] leading-none transition-colors duration-500 ${
                !isHome || scrolled ? 'text-charcoal' : 'text-cream'
              }`}>
                RK BOUTIQUE
              </h1>
              <div className={`text-[7px] tracking-[0.5em] font-body uppercase mt-0.5 transition-colors duration-500 ${
                !isHome || scrolled ? 'text-burgundy/50' : 'text-gold/60'
              }`}>
                & Rentals
              </div>
            </Link>

            {/* Right actions */}
            <div className="flex items-center gap-3 sm:gap-4">
              <button
                onClick={() => setSearchOpen(!searchOpen)}
                className={`p-2 transition-colors ${!isHome || scrolled ? 'text-charcoal-muted hover:text-burgundy' : 'text-cream/70 hover:text-cream'}`}
                aria-label="Search"
              >
                <Search size={18} strokeWidth={1.5} />
              </button>
              <a
                href={buildWhatsAppLink(buildGeneralInquiry())}
                target="_blank"
                rel="noreferrer"
                aria-label="Chat on WhatsApp"
                title="Chat on WhatsApp"
                className={`hidden p-2 transition-colors sm:block ${!isHome || scrolled ? 'text-charcoal-muted hover:text-burgundy' : 'text-cream/70 hover:text-cream'}`}
              >
                <MessageCircle size={18} strokeWidth={1.5} />
              </a>
              <Link
                to="/cart"
                className={`relative p-2 transition-colors ${!isHome || scrolled ? 'text-charcoal-muted hover:text-burgundy' : 'text-cream/70 hover:text-cream'}`}
                aria-label="Cart"
              >
                <ShoppingBag size={18} strokeWidth={1.5} />
                {cart.length > 0 && (
                  <span className="absolute top-0.5 right-0.5 bg-burgundy text-white text-[8px] font-bold w-3.5 h-3.5 rounded-full flex items-center justify-center">
                    {cart.length}
                  </span>
                )}
              </Link>
              <Link
                to="/dashboard"
                className={`p-2 transition-colors hidden sm:block ${!isHome || scrolled ? 'text-charcoal-muted/30 hover:text-burgundy' : 'text-cream/30 hover:text-cream'}`}
                aria-label="Dashboard"
                title="Admin Dashboard"
              >
                <LayoutDashboard size={16} strokeWidth={1.5} />
              </Link>
            </div>
          </div>
        </div>

        {/* Search overlay */}
        {searchOpen && (
          <div className="absolute top-full left-0 right-0 bg-ivory border-b border-cream animate-fade-in z-50">
            <div className="max-w-2xl mx-auto px-4 py-6">
              <form className="relative" onSubmit={submitSearch}>
                <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-rose" />
                <input
                  type="search"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search lehengas, gowns, sarees..."
                  aria-label="Search the collection"
                  className="w-full pl-11 pr-4 py-3 bg-cream/40 border border-cream text-sm tracking-wide font-body placeholder:text-charcoal-muted/40 focus:border-burgundy transition-colors"
                  autoFocus
                />
              </form>
            </div>
          </div>
        )}

        {/* Mobile menu */}
        {mobileOpen && (
          <div className="lg:hidden bg-ivory border-t border-cream animate-fade-in">
            <nav className="max-w-lg mx-auto px-6 py-8 space-y-5">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  to={link.to}
                  className="block text-sm tracking-[0.2em] font-medium text-charcoal hover:text-burgundy transition-colors font-body uppercase"
                >
                  {link.label}
                </Link>
              ))}
              <div className="line-editorial my-4" />
              <Link to="/cart" className="block text-sm tracking-[0.2em] font-medium text-charcoal hover:text-burgundy transition-colors font-body uppercase">
                CART {cart.length > 0 && `(${cart.length})`}
              </Link>
              <a
                href={buildWhatsAppLink(buildGeneralInquiry())}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-2 py-4 text-[10px] font-semibold uppercase tracking-[0.25em] text-burgundy"
              >
                <MessageCircle size={15} /> WhatsApp Inquiry
              </a>
              <Link to="/dashboard" className="block text-sm tracking-[0.2em] font-medium text-charcoal-muted/50 hover:text-burgundy transition-colors font-body uppercase">
                DASHBOARD
              </Link>
              <div className="pt-4 flex items-center gap-2 text-xs text-charcoal-muted/60 font-body">
                <Phone size={14} />
                <span>{STORE.phoneDisplay}</span>
              </div>
            </nav>
          </div>
        )}
      </header>

      {/* Main content */}
      <main><Outlet /></main>

      {/* Footer */}
      <footer className="bg-charcoal text-cream/70">
        {/* Newsletter */}
        <div className="border-b border-white/[0.06]">
          <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-20 text-center">
            <p className="text-[9px] tracking-[0.5em] uppercase text-rose mb-3 font-body">Stay Connected</p>
            <h3 className="font-display text-2xl sm:text-3xl text-cream mb-3">Join Our Inner Circle</h3>
            <p className="text-sm text-cream/40 mb-8 max-w-md mx-auto font-body">
              First access to new collections, exclusive offers, and styling inspiration.
            </p>
            <div className="flex max-w-md mx-auto">
              <input
                type="email"
                placeholder="Your email"
                className="flex-1 px-5 py-3.5 bg-white/[0.04] border border-white/[0.08] text-cream text-sm font-body placeholder:text-cream/25 focus:border-burgundy/60 transition-colors"
              />
              <button className="px-8 py-3.5 bg-burgundy text-cream text-[10px] tracking-[0.25em] font-medium font-body hover:bg-burgundy-deep transition-colors">
                SUBSCRIBE
              </button>
            </div>
          </div>
        </div>

        {/* Main footer */}
        <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-14 sm:py-16">
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
            <div className="col-span-2 sm:col-span-2 lg:col-span-1">
              <h4 className="font-display text-xl text-cream mb-1">RK BOUTIQUE</h4>
              <p className="text-[8px] tracking-[0.5em] uppercase text-rose/60 mb-4 font-body">& Rentals</p>
              <p className="text-sm text-cream/35 leading-relaxed font-body max-w-xs">
                Curating the finest in Indian ethnic and contemporary fashion for every celebration.
              </p>
            </div>
            <div>
              <h5 className="text-[9px] tracking-[0.3em] uppercase text-cream/30 mb-5 font-body">Collections</h5>
              <ul className="space-y-3">
                {[
                  { label: 'Designer Lehengas', to: '/shop?category=Lehenga' },
                  { label: 'Evening Gowns', to: '/shop?category=Gown' },
                  { label: 'Designer Sarees', to: '/shop?category=Saree' },
                  { label: 'Suits & Sets', to: '/shop?category=Suit' },
                  { label: 'New Arrivals', to: '/shop?filter=new' },
                ].map((item) => (
                  <li key={item.label}>
                    <Link to={item.to} className="text-sm text-cream/45 hover:text-cream transition-colors font-body">{item.label}</Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h5 className="text-[9px] tracking-[0.3em] uppercase text-cream/30 mb-5 font-body">Services</h5>
              <ul className="space-y-3">
                {[
                  { label: 'Rent a Look', to: '/shop?filter=rental' },
                  { label: 'Buy an Outfit', to: '/shop?filter=buy' },
                  { label: 'Our Story', to: '/about' },
                  { label: 'Visit & Contact', to: '/contact' },
                  { label: 'All Products', to: '/shop' },
                ].map((item) => (
                  <li key={item.label}>
                    <Link to={item.to} className="text-sm text-cream/45 hover:text-cream transition-colors font-body">{item.label}</Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h5 className="text-[9px] tracking-[0.3em] uppercase text-cream/30 mb-5 font-body">Visit Us</h5>
              <ul className="space-y-3">
                <li className="flex items-start gap-2 text-sm text-cream/45 font-body">
                  <MapPin size={14} className="mt-0.5 flex-shrink-0 text-rose/60" />
                  <span>{STORE.addressLines[0]},<br />{STORE.addressLines[1]}</span>
                </li>
                <li className="flex items-center gap-2 text-sm text-cream/45 font-body">
                  <Phone size={14} className="flex-shrink-0 text-rose/60" />
                  <span>{STORE.phoneDisplay}</span>
                </li>
                <li>
                  <a
                    href={buildWhatsAppLink(buildGeneralInquiry())}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-2 text-sm text-cream/70 hover:text-cream transition-colors font-body"
                  >
                    <MessageCircle size={14} className="flex-shrink-0 text-rose/60" />
                    <span>Chat on WhatsApp</span>
                  </a>
                </li>
                <li className="flex items-center gap-2 text-sm text-cream/45 font-body">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="flex-shrink-0 text-rose/60"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"/></svg>
                  <span>{STORE.instagram}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/[0.06]">
          <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-5 flex flex-col sm:flex-row justify-between items-center gap-3">
            <p className="text-[9px] tracking-[0.15em] text-cream/20 font-body">
              © 2026 RK BOUTIQUE & RENTALS. ALL RIGHTS RESERVED.
            </p>
            <div className="flex gap-6">
              {[
                { label: 'ABOUT', to: '/about' },
                { label: 'CONTACT', to: '/contact' },
                { label: 'SHOP', to: '/shop' },
              ].map((t) => (
                <Link key={t.label} to={t.to} className="text-[9px] tracking-[0.15em] text-cream/20 hover:text-cream/50 transition-colors font-body">{t.label}</Link>
              ))}
            </div>
          </div>
        </div>
      </footer>

      {/* Back to top */}
      {showBackToTop && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-6 right-6 z-50 w-10 h-10 bg-burgundy text-cream rounded-full flex items-center justify-center shadow-lg hover:bg-burgundy-deep transition-colors animate-fade-up"
          aria-label="Back to top"
        >
          <ChevronUp size={16} />
        </button>
      )}
    </div>
  );
}
