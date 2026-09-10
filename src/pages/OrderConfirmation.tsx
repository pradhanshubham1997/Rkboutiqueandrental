import { useParams, Link } from 'react-router-dom';
import { CheckCircle, Package, Calendar, CreditCard, ArrowRight } from 'lucide-react';
import { useApp } from '../context/AppContext';

export default function OrderConfirmation() {
  const { orderId } = useParams();
  const { orders } = useApp();
  const order = orders.find(o => o.id === orderId);

  if (!order) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-32 text-center">
        <h2 className="font-display text-2xl text-charcoal mb-4">Order not found</h2>
        <Link to="/" className="text-burgundy text-sm font-body hover:text-burgundy-deep transition-colors">Return home</Link>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-12 sm:py-20">
      <div className="text-center mb-12">
        <div className="w-16 h-16 bg-sage/10 rounded-full flex items-center justify-center mx-auto mb-5">
          <CheckCircle size={32} className="text-sage" />
        </div>
        <h1 className="font-display text-3xl text-charcoal mb-3">Order Confirmed</h1>
        <p className="text-sm text-charcoal-muted font-body">Thank you for your order. We'll prepare it with care.</p>
      </div>

      <div className="border border-cream p-6 sm:p-8 mb-8">
        <div className="flex items-center justify-between mb-6 pb-5 border-b border-cream">
          <div>
            <p className="text-[9px] tracking-[0.2em] text-charcoal-muted/50 font-body uppercase mb-1">Order Number</p>
            <p className="font-display text-xl text-charcoal">{order.id}</p>
          </div>
          <span className="px-3 py-1.5 bg-cream text-charcoal text-[9px] tracking-[0.15em] font-body uppercase">
            {order.orderStatus.replace(/_/g, ' ')}
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          {[
            { icon: <Package size={14} />, label: 'Type', value: order.orderType },
            { icon: <Calendar size={14} />, label: 'Date', value: order.date },
            { icon: <CreditCard size={14} />, label: 'Payment', value: order.paymentMethod || 'N/A' },
            { icon: null, label: 'Total', value: `₹${order.total.toLocaleString()}` },
          ].map((item, i) => (
            <div key={i} className="bg-cream/30 p-3">
              <div className="flex items-center gap-1.5 text-[9px] tracking-[0.15em] text-charcoal-muted/50 font-body uppercase mb-1">
                {item.icon} {item.label}
              </div>
              <p className="text-sm font-medium text-charcoal font-body capitalize">{item.value}</p>
            </div>
          ))}
        </div>

        <h3 className="text-[10px] tracking-[0.2em] text-charcoal font-body uppercase mb-4">Items</h3>
        <div className="space-y-3 mb-8">
          {order.items.map((item, i) => (
            <div key={i} className="flex items-center justify-between py-3 border-b border-cream last:border-0">
              <div className="flex items-center gap-3">
                <div className="w-10 h-12 bg-cream flex items-center justify-center">
                  <Package size={16} className="text-charcoal-muted/30" />
                </div>
                <div>
                  <p className="text-sm font-medium text-charcoal font-body">{item.productName}</p>
                  <p className="text-[10px] text-charcoal-muted/50 font-body">
                    {item.type === 'retail' ? 'Buy' : 'Rent'} · Qty: {item.quantity}
                    {item.rentalStart && item.rentalEnd && ` · ${item.rentalStart} → ${item.rentalEnd}`}
                  </p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium text-charcoal font-body">₹{(item.price * item.quantity).toLocaleString()}</p>
                {item.deposit && item.deposit > 0 && <p className="text-[10px] text-charcoal-muted/50 font-body">+ ₹{item.deposit.toLocaleString()} deposit</p>}
              </div>
            </div>
          ))}
        </div>

        {/* Timeline */}
        <h3 className="text-[10px] tracking-[0.2em] text-charcoal font-body uppercase mb-4">Order Timeline</h3>
        <div className="space-y-3">
          {order.timeline.map((t, i) => (
            <div key={i} className="flex items-start gap-3">
              <div className={`w-2.5 h-2.5 rounded-full mt-1.5 flex-shrink-0 ${t.done ? 'bg-sage' : 'bg-cream'}`} />
              <div>
                <p className={`text-sm font-body ${t.done ? 'text-charcoal' : 'text-charcoal-muted/40'}`}>{t.status}</p>
                {t.date && <p className="text-[10px] text-charcoal-muted/50 font-body">{t.date}</p>}
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-3 justify-center">
        <Link to="/" className="inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-charcoal text-cream text-[11px] tracking-[0.2em] font-medium font-body hover:bg-burgundy transition-all">
          CONTINUE SHOPPING <ArrowRight size={14} />
        </Link>
        <Link to="/dashboard" className="inline-flex items-center justify-center gap-2 px-8 py-3.5 border border-cream text-charcoal text-[11px] tracking-[0.2em] font-medium font-body hover:bg-cream/50 transition-all">
          VIEW DASHBOARD <ArrowRight size={14} />
        </Link>
      </div>
    </div>
  );
}
