import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, CreditCard, Banknote, Smartphone, Check } from 'lucide-react';
import { useApp } from '../context/AppContext';
import PublicImage, { cleanSrc } from '../components/PublicImage';

export default function Checkout() {
  const { cart, cartTotal, placeOrder } = useApp();
  const navigate = useNavigate();
  const { retailTotal, rentalTotal, depositTotal } = cartTotal();
  const tax = Math.round((retailTotal + rentalTotal) * 0.18);
  const grandTotal = retailTotal + rentalTotal + depositTotal + tax;

  const [form, setForm] = useState({ name: '', phone: '', email: '', address: '', notes: '' });
  const [payment, setPayment] = useState('Cash');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [placed, setPlaced] = useState(false);

  if (cart.length === 0 && !placed) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-32 text-center">
        <h2 className="font-display text-2xl text-charcoal mb-3">Nothing to Checkout</h2>
        <Link to="/shop" className="text-burgundy text-sm font-body hover:text-burgundy-deep transition-colors">Go shopping</Link>
      </div>
    );
  }

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.name.trim()) e.name = 'Required';
    if (!form.phone.trim()) e.phone = 'Required';
    if (!form.address.trim()) e.address = 'Required';
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handlePlace = () => {
    if (!validate()) return;
    const order = placeOrder(form);
    setPlaced(true);
    setTimeout(() => navigate(`/order-confirmation/${order.id}`), 100);
  };

  const inputClass = (field: string) =>
    `w-full px-4 py-3 border text-sm font-body bg-ivory transition-all focus:border-burgundy focus:outline-none ${errors[field] ? 'border-burgundy/40' : 'border-cream'}`;

  return (
    <div className="max-w-[1100px] mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16">
      <Link to="/cart" className="inline-flex items-center gap-2 text-[10px] tracking-[0.15em] text-charcoal-muted/60 hover:text-charcoal font-body uppercase transition-colors mb-8">
        <ArrowLeft size={14} /> Back to Bag
      </Link>
      <h1 className="font-display text-3xl sm:text-4xl text-charcoal mb-10">Checkout</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 lg:gap-12">
        <div className="lg:col-span-2 space-y-8">
          {/* Customer Info */}
          <div className="border border-cream p-6 sm:p-8">
            <h2 className="text-[10px] tracking-[0.25em] text-charcoal font-body uppercase mb-6">Your Details</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-[9px] tracking-[0.15em] text-charcoal-muted/60 font-body uppercase mb-1.5 block">Full Name *</label>
                <input type="text" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="Your name" className={inputClass('name')} />
                {errors.name && <p className="text-[10px] text-burgundy mt-1 font-body">{errors.name}</p>}
              </div>
              <div>
                <label className="text-[9px] tracking-[0.15em] text-charcoal-muted/60 font-body uppercase mb-1.5 block">Phone *</label>
                <input type="tel" value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} placeholder="+91 XXXXX XXXXX" className={inputClass('phone')} />
                {errors.phone && <p className="text-[10px] text-burgundy mt-1 font-body">{errors.phone}</p>}
              </div>
              <div className="sm:col-span-2">
                <label className="text-[9px] tracking-[0.15em] text-charcoal-muted/60 font-body uppercase mb-1.5 block">Email (Optional)</label>
                <input type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} placeholder="your@email.com" className={inputClass('email')} />
              </div>
              <div className="sm:col-span-2">
                <label className="text-[9px] tracking-[0.15em] text-charcoal-muted/60 font-body uppercase mb-1.5 block">Delivery Address *</label>
                <textarea value={form.address} onChange={e => setForm({ ...form, address: e.target.value })} placeholder="Full delivery address" rows={2} className={inputClass('address')} />
                {errors.address && <p className="text-[10px] text-burgundy mt-1 font-body">{errors.address}</p>}
              </div>
              <div className="sm:col-span-2">
                <label className="text-[9px] tracking-[0.15em] text-charcoal-muted/60 font-body uppercase mb-1.5 block">Notes (Optional)</label>
                <textarea value={form.notes} onChange={e => setForm({ ...form, notes: e.target.value })} placeholder="Special requests..." rows={2} className={inputClass('notes')} />
              </div>
            </div>
          </div>

          {/* Payment */}
          <div className="border border-cream p-6 sm:p-8">
            <h2 className="text-[10px] tracking-[0.25em] text-charcoal font-body uppercase mb-6">Payment Method</h2>
            <div className="grid grid-cols-3 gap-3">
              {[
                { id: 'Cash', label: 'Cash', icon: <Banknote size={18} /> },
                { id: 'UPI', label: 'UPI', icon: <Smartphone size={18} /> },
                { id: 'Card', label: 'Card', icon: <CreditCard size={18} /> },
              ].map(m => (
                <button
                  key={m.id}
                  onClick={() => setPayment(m.id)}
                  className={`relative flex flex-col items-center gap-2 p-4 border transition-all duration-300 ${
                    payment === m.id
                      ? 'border-charcoal bg-charcoal/5'
                      : 'border-cream hover:border-charcoal-muted/30'
                  }`}
                >
                  <div className={`${payment === m.id ? 'text-burgundy' : 'text-charcoal-muted/40'}`}>{m.icon}</div>
                  <span className="text-[10px] tracking-[0.15em] font-medium font-body">{m.label}</span>
                  {payment === m.id && <Check size={14} className="text-burgundy absolute top-2 right-2" />}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Summary */}
        <div className="bg-cream/30 border border-cream p-6 h-fit sticky top-24">
          <h2 className="font-display text-xl text-charcoal mb-6">Order Summary</h2>
          <div className="space-y-3 text-sm font-body mb-4">
            {cart.map(item => (
              <div key={`${item.product.id}-${item.mode}`} className="flex items-center gap-3 py-2 border-b border-cream last:border-0">
                <div className="relative w-10 h-12 flex-shrink-0 overflow-hidden bg-cream rounded">
                  <PublicImage src={cleanSrc(item.product.image)} alt="" fit="contain" className="absolute inset-0 h-full w-full p-0.5" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-medium text-charcoal truncate font-body">{item.product.name}</p>
                  <p className="text-[9px] text-charcoal-muted/50 font-body">{item.mode === 'retail' ? 'Buy' : 'Rent'} · Qty: {item.quantity}</p>
                </div>
                <span className="text-xs font-bold whitespace-nowrap font-body">
                  ₹{item.mode === 'retail' ? (item.product.salePrice * item.quantity).toLocaleString() : ((item.product.rentalPrice * (item.rentalDays || 1) + item.product.deposit) * item.quantity).toLocaleString()}
                </span>
              </div>
            ))}
          </div>
          <div className="space-y-2 text-sm font-body pt-3 border-t border-cream">
            {retailTotal > 0 && <div className="flex justify-between"><span className="text-charcoal-muted/60">Retail</span><span className="text-charcoal">₹{retailTotal.toLocaleString()}</span></div>}
            {rentalTotal > 0 && <div className="flex justify-between"><span className="text-charcoal-muted/60">Rental</span><span className="text-charcoal">₹{rentalTotal.toLocaleString()}</span></div>}
            {depositTotal > 0 && <div className="flex justify-between"><span className="text-charcoal-muted/60">Deposit</span><span className="text-charcoal">₹{depositTotal.toLocaleString()}</span></div>}
            <div className="flex justify-between"><span className="text-charcoal-muted/60">Tax (18%)</span><span className="text-charcoal">₹{tax.toLocaleString()}</span></div>
            <div className="flex justify-between font-bold text-base pt-3 border-t border-cream">
              <span className="text-charcoal">Total</span>
              <span className="font-display text-xl text-charcoal">₹{grandTotal.toLocaleString()}</span>
            </div>
          </div>

          <button onClick={handlePlace}
            className="mt-6 w-full py-3.5 bg-burgundy text-cream text-[11px] tracking-[0.2em] font-medium font-body hover:bg-burgundy-deep transition-all btn-luxury flex items-center justify-center gap-2">
            PLACE ORDER — ₹{grandTotal.toLocaleString()}
          </button>
          <p className="text-[9px] text-charcoal-muted/40 text-center mt-3 font-body">Demo mode · No real payment will be processed</p>
        </div>
      </div>
    </div>
  );
}
