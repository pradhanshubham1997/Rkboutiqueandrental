import { Link } from 'react-router-dom';
import { Trash2, Plus, Minus, ArrowRight, ShoppingBag } from 'lucide-react';
import { useApp } from '../context/AppContext';
import PublicImage, { cleanSrc } from '../components/PublicImage';

export default function Cart() {
  const { cart, removeFromCart, updateCartQuantity, cartTotal } = useApp();
  const { retailTotal, rentalTotal, depositTotal } = cartTotal();
  const retailItems = cart.filter(c => c.mode === 'retail');
  const rentalItems = cart.filter(c => c.mode === 'rental');

  if (cart.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-32 text-center">
        <div className="w-20 h-20 bg-cream rounded-full flex items-center justify-center mx-auto mb-6">
          <ShoppingBag size={32} className="text-charcoal-muted/30" />
        </div>
        <h2 className="font-display text-2xl text-charcoal mb-3">Your Bag is Empty</h2>
        <p className="text-sm text-charcoal-muted font-body mb-8">Discover our collection and add something extraordinary.</p>
        <Link
          to="/shop"
          className="inline-flex items-center gap-3 px-8 py-3.5 bg-charcoal text-cream text-[11px] tracking-[0.2em] font-medium font-body hover:bg-burgundy transition-all"
        >
          CONTINUE SHOPPING <ArrowRight size={14} />
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-[1100px] mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
      <h1 className="font-display text-3xl sm:text-4xl text-charcoal mb-2">Your Bag</h1>
      <p className="text-sm text-charcoal-muted/50 font-body mb-10">{cart.length} item{cart.length !== 1 ? 's' : ''} in your bag</p>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 lg:gap-12">
        <div className="lg:col-span-2 space-y-8">
          {/* Retail Items */}
          {retailItems.length > 0 && (
            <div>
              <h2 className="text-[10px] tracking-[0.25em] text-charcoal font-body uppercase mb-4">To Purchase</h2>
              <div className="space-y-4">
                {retailItems.map(item => (
                  <div key={`${item.product.id}-retail`} className="flex gap-4 p-4 bg-cream/30 border border-cream">
                    <Link to={`/product/${item.product.id}`} className="relative w-20 h-24 overflow-hidden flex-shrink-0 bg-cream">
                      <PublicImage src={cleanSrc(item.product.image)} alt={item.product.name} fit="contain" position="center top" className="absolute inset-0 h-full w-full p-1" />
                    </Link>
                    <div className="flex-1 min-w-0">
                      <Link to={`/product/${item.product.id}`} className="font-display text-base text-charcoal hover:text-burgundy transition-colors">
                        {item.product.name}
                      </Link>
                      <p className="text-[9px] tracking-[0.15em] text-charcoal-muted/50 font-body uppercase mt-0.5">{item.product.category}</p>
                      <p className="font-display text-lg text-charcoal mt-2">₹{item.product.salePrice.toLocaleString()}</p>
                      <div className="flex items-center justify-between mt-3">
                        <div className="flex items-center border border-cream">
                          <button onClick={() => updateCartQuantity(item.product.id, 'retail', item.quantity - 1)} className="p-1.5 hover:bg-cream/50 transition-colors"><Minus size={12} className="text-charcoal-muted" /></button>
                          <span className="w-8 text-center text-sm font-medium font-body">{item.quantity}</span>
                          <button onClick={() => updateCartQuantity(item.product.id, 'retail', item.quantity + 1)} className="p-1.5 hover:bg-cream/50 transition-colors"><Plus size={12} className="text-charcoal-muted" /></button>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="font-display text-base">₹{(item.product.salePrice * item.quantity).toLocaleString()}</span>
                          <button onClick={() => removeFromCart(item.product.id, 'retail')} className="text-charcoal-muted/30 hover:text-burgundy transition-colors"><Trash2 size={14} /></button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Rental Items */}
          {rentalItems.length > 0 && (
            <div>
              <h2 className="text-[10px] tracking-[0.25em] text-burgundy font-body uppercase mb-4">For Rental</h2>
              <div className="space-y-4">
                {rentalItems.map(item => (
                  <div key={`${item.product.id}-rental`} className="flex gap-4 p-4 bg-burgundy/[0.02] border border-burgundy/10">
                    <Link to={`/product/${item.product.id}`} className="relative w-20 h-24 overflow-hidden flex-shrink-0 bg-cream">
                      <PublicImage src={cleanSrc(item.product.image)} alt={item.product.name} fit="contain" position="center top" className="absolute inset-0 h-full w-full p-1" />
                    </Link>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <Link to={`/product/${item.product.id}`} className="font-display text-base text-charcoal hover:text-burgundy transition-colors">
                          {item.product.name}
                        </Link>
                        <span className="px-1.5 py-0.5 bg-burgundy/10 text-burgundy text-[8px] tracking-[0.15em] font-body uppercase">Rent</span>
                      </div>
                      <p className="text-[9px] tracking-[0.15em] text-charcoal-muted/50 font-body uppercase mt-0.5">{item.product.category}</p>
                      {item.rentalStart && item.rentalEnd && (
                        <div className="flex items-center gap-2 mt-1 text-[10px] text-charcoal-muted/60 font-body">
                          <span>{item.rentalStart}</span>
                          <span>→</span>
                          <span>{item.rentalEnd}</span>
                          <span className="text-burgundy font-medium">({item.rentalDays} day{item.rentalDays !== 1 ? 's' : ''})</span>
                        </div>
                      )}
                      <div className="mt-2 space-y-0.5 text-[11px] font-body">
                        <div className="flex justify-between"><span className="text-charcoal-muted/60">Rental: ₹{item.product.rentalPrice.toLocaleString()} × {item.rentalDays || 1} days</span><span className="font-medium">₹{(item.product.rentalPrice * (item.rentalDays || 1)).toLocaleString()}</span></div>
                        <div className="flex justify-between"><span className="text-charcoal-muted/60">Security Deposit</span><span className="font-medium">₹{item.product.deposit.toLocaleString()}</span></div>
                      </div>
                      <div className="flex items-center justify-between mt-3">
                        <div className="flex items-center border border-cream">
                          <button onClick={() => updateCartQuantity(item.product.id, 'rental', item.quantity - 1)} className="p-1.5 hover:bg-cream/50 transition-colors"><Minus size={12} className="text-charcoal-muted" /></button>
                          <span className="w-8 text-center text-sm font-medium font-body">{item.quantity}</span>
                          <button onClick={() => updateCartQuantity(item.product.id, 'rental', item.quantity + 1)} className="p-1.5 hover:bg-cream/50 transition-colors"><Plus size={12} className="text-charcoal-muted" /></button>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="font-display text-base text-burgundy">₹{((item.product.rentalPrice * (item.rentalDays || 1) + item.product.deposit) * item.quantity).toLocaleString()}</span>
                          <button onClick={() => removeFromCart(item.product.id, 'rental')} className="text-charcoal-muted/30 hover:text-burgundy transition-colors"><Trash2 size={14} /></button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Order Summary */}
        <div className="bg-cream/30 border border-cream p-6 h-fit sticky top-24">
          <h2 className="font-display text-xl text-charcoal mb-6">Order Summary</h2>
          <div className="space-y-3 text-sm font-body">
            {retailTotal > 0 && (
              <div className="flex justify-between"><span className="text-charcoal-muted/60">Retail</span><span className="text-charcoal">₹{retailTotal.toLocaleString()}</span></div>
            )}
            {rentalTotal > 0 && (
              <div className="flex justify-between"><span className="text-charcoal-muted/60">Rental</span><span className="text-charcoal">₹{rentalTotal.toLocaleString()}</span></div>
            )}
            {depositTotal > 0 && (
              <div className="flex justify-between"><span className="text-charcoal-muted/60">Deposits</span><span className="text-charcoal">₹{depositTotal.toLocaleString()}</span></div>
            )}
            <div className="flex justify-between"><span className="text-charcoal-muted/60">Tax (18%)</span><span className="text-charcoal">₹{Math.round((retailTotal + rentalTotal) * 0.18).toLocaleString()}</span></div>
            <div className="flex justify-between font-bold text-base pt-3 border-t border-cream">
              <span className="text-charcoal">Grand Total</span>
              <span className="font-display text-xl text-charcoal">₹{(retailTotal + rentalTotal + depositTotal + Math.round((retailTotal + rentalTotal) * 0.18)).toLocaleString()}</span>
            </div>
          </div>
          <Link to="/checkout"
            className="mt-6 w-full flex items-center justify-center gap-2 py-3.5 bg-charcoal text-cream text-[11px] tracking-[0.2em] font-medium font-body hover:bg-burgundy transition-all btn-luxury">
            CHECKOUT <ArrowRight size={14} />
          </Link>
          <Link to="/shop" className="mt-3 w-full flex items-center justify-center gap-2 py-3 text-[10px] tracking-[0.15em] font-medium text-charcoal-muted/60 hover:text-charcoal font-body transition-colors">
            CONTINUE SHOPPING
          </Link>
        </div>
      </div>
    </div>
  );
}
