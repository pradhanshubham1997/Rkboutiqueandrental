import { useState } from 'react';
import { X, ChevronRight } from 'lucide-react';
import { useApp } from '../context/AppContext';

const tabs = ['All', 'Retail', 'Rental', 'Mixed', 'Pending', 'Confirmed', 'Preparing', 'Delivered', 'Active', 'Cancelled'];
const statusColor: Record<string, string> = {
  paid: 'bg-green-100 text-green-700', confirmed: 'bg-blue-100 text-blue-700',
  preparing: 'bg-amber-100 text-amber-700', delivered: 'bg-green-100 text-green-700',
  pending: 'bg-gray-100 text-gray-700', cancelled: 'bg-red-100 text-red-700',
  partial: 'bg-amber-100 text-amber-700', unpaid: 'bg-red-100 text-red-700',
  rental_active: 'bg-purple-100 text-purple-700', ready: 'bg-teal-100 text-teal-700',
  ready_for_pickup: 'bg-teal-100 text-teal-700', out_for_delivery: 'bg-blue-100 text-blue-700',
  completed: 'bg-green-100 text-green-700', return_pending: 'bg-amber-100 text-amber-700', returned: 'bg-gray-100 text-gray-600',
};
const typeColors: Record<string, string> = {
  retail: 'bg-blue-50 text-blue-700', rental: 'bg-purple-50 text-purple-700', mixed: 'bg-emerald-50 text-emerald-700',
};

const allStatuses = [
  { value: 'pending', label: 'New' },
  { value: 'confirmed', label: 'Confirmed' },
  { value: 'preparing', label: 'Preparing' },
  { value: 'ready', label: 'Ready' },
  { value: 'out_for_delivery', label: 'Out for Delivery' },
  { value: 'ready_for_pickup', label: 'Ready for Pickup' },
  { value: 'delivered', label: 'Delivered' },
  { value: 'picked_up', label: 'Picked Up' },
  { value: 'rental_active', label: 'Rental Active' },
  { value: 'return_pending', label: 'Return Pending' },
  { value: 'returned', label: 'Returned' },
  { value: 'completed', label: 'Completed' },
  { value: 'cancelled', label: 'Cancelled' },
];

export default function Orders() {
  const { orders, updateOrderStatus } = useApp();
  const [activeTab, setActiveTab] = useState('All');
  const [selectedOrder, setSelectedOrder] = useState<typeof orders[0] | null>(null);

  const filtered = orders.filter(o => {
    if (activeTab === 'All') return true;
    if (activeTab === 'Retail') return o.orderType === 'retail';
    if (activeTab === 'Rental') return o.orderType === 'rental';
    if (activeTab === 'Mixed') return o.orderType === 'mixed';
    if (activeTab === 'Active') return o.orderStatus === 'rental_active';
    return o.orderStatus === activeTab.toLowerCase().replace(' ', '_');
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-gray-900">Orders</h2>
      </div>

      <div className="flex gap-1 overflow-x-auto pb-1 scrollbar-hide">
        {tabs.map(tab => (
          <button key={tab} onClick={() => setActiveTab(tab)}
            className={`px-3 py-2 rounded-lg text-xs font-medium whitespace-nowrap transition-colors ${activeTab === tab ? 'bg-blue-600 text-white' : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50'}`}>
            {tab}
          </button>
        ))}
      </div>

      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="text-left py-3 px-3 text-xs font-semibold text-gray-500 uppercase">Order</th>
                <th className="text-left py-3 px-3 text-xs font-semibold text-gray-500 uppercase">Customer</th>
                <th className="text-center py-3 px-3 text-xs font-semibold text-gray-500 uppercase">Type</th>
                <th className="text-center py-3 px-3 text-xs font-semibold text-gray-500 uppercase">Items</th>
                <th className="text-right py-3 px-3 text-xs font-semibold text-gray-500 uppercase">Amount</th>
                <th className="text-center py-3 px-3 text-xs font-semibold text-gray-500 uppercase">Payment</th>
                <th className="text-center py-3 px-3 text-xs font-semibold text-gray-500 uppercase">Status</th>
                <th className="text-left py-3 px-3 text-xs font-semibold text-gray-500 uppercase">Date</th>
                <th className="w-10"></th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(order => (
                <tr key={order.id} className="border-b border-gray-50 hover:bg-gray-50 cursor-pointer" onClick={() => setSelectedOrder(order)}>
                  <td className="py-3 px-3 font-medium text-gray-900">{order.id}</td>
                  <td className="py-3 px-3 text-gray-600">{order.customerName}</td>
                  <td className="py-3 px-3 text-center">
                    <span className={`inline-flex px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${typeColors[order.orderType]}`}>{order.orderType}</span>
                  </td>
                  <td className="py-3 px-3 text-center text-gray-600">{order.items.length}</td>
                  <td className="py-3 px-3 text-right font-medium text-gray-900">₹{order.total.toLocaleString()}</td>
                  <td className="py-3 px-3 text-center">
                    <span className={`inline-flex px-2 py-0.5 rounded-full text-[10px] font-semibold ${order.paymentStatus === 'paid' ? 'bg-green-100 text-green-700' : order.paymentStatus === 'partial' ? 'bg-amber-100 text-amber-700' : 'bg-red-100 text-red-700'}`}>{order.paymentStatus}</span>
                  </td>
                  <td className="py-3 px-3 text-center">
                    <span className={`inline-flex px-2 py-0.5 rounded-full text-[10px] font-semibold capitalize ${statusColor[order.orderStatus] || 'bg-gray-100 text-gray-700'}`}>{order.orderStatus.replace(/_/g, ' ')}</span>
                  </td>
                  <td className="py-3 px-3 text-gray-500 text-xs">{order.date}</td>
                  <td className="py-3 px-3"><ChevronRight className="w-4 h-4 text-gray-400" /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {selectedOrder && (
        <div className="fixed inset-0 bg-black/40 z-50 flex justify-end" onClick={() => setSelectedOrder(null)}>
          <div className="bg-white w-full max-w-lg h-full overflow-y-auto shadow-xl" onClick={e => e.stopPropagation()}>
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between z-10">
              <h3 className="text-lg font-bold text-gray-900">Order Details</h3>
              <button onClick={() => setSelectedOrder(null)} className="p-2 hover:bg-gray-100 rounded-lg"><X className="w-5 h-5" /></button>
            </div>
            <div className="p-6 space-y-5">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Order ID</p>
                  <p className="font-bold text-gray-900">{selectedOrder.id}</p>
                </div>
                <div className="flex gap-2">
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold capitalize ${typeColors[selectedOrder.orderType]}`}>{selectedOrder.orderType}</span>
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold capitalize ${statusColor[selectedOrder.orderStatus]}`}>{selectedOrder.orderStatus.replace(/_/g, ' ')}</span>
                </div>
              </div>

              <div className="bg-gray-50 rounded-xl p-4 space-y-2">
                <div><p className="text-xs text-gray-500">Customer</p><p className="font-medium">{selectedOrder.customerName}</p></div>
                {selectedOrder.customerPhone && <div><p className="text-xs text-gray-500">Phone</p><p className="font-medium">{selectedOrder.customerPhone}</p></div>}
                {selectedOrder.customerAddress && <div><p className="text-xs text-gray-500">Address</p><p className="font-medium text-sm">{selectedOrder.customerAddress}</p></div>}
              </div>

              <div>
                <p className="text-sm font-semibold text-gray-900 mb-3">Items</p>
                {selectedOrder.items.map((item, i) => (
                  <div key={i} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0">
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="text-sm font-medium text-gray-900">{item.productName}</p>
                        <span className={`px-1.5 py-0.5 text-[9px] font-bold rounded uppercase ${item.type === 'retail' ? 'bg-blue-50 text-blue-600' : 'bg-purple-50 text-purple-600'}`}>{item.type}</span>
                      </div>
                      <p className="text-xs text-gray-500">Qty: {item.quantity} × ₹{item.price.toLocaleString()}</p>
                      {item.rentalStart && item.rentalEnd && (
                        <p className="text-xs text-purple-600 mt-0.5">Rental: {item.rentalStart} → {item.rentalEnd} ({item.rentalDays} days)</p>
                      )}
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-medium text-gray-900">₹{(item.quantity * item.price).toLocaleString()}</p>
                      {item.discount > 0 && <p className="text-xs text-green-600">-₹{item.discount.toLocaleString()}</p>}
                      {item.deposit && item.deposit > 0 && <p className="text-xs text-gray-500">+ ₹{item.deposit.toLocaleString()} deposit</p>}
                    </div>
                  </div>
                ))}
              </div>

              <div className="bg-gray-50 rounded-xl p-4 space-y-2">
                <div className="flex justify-between text-sm"><span className="text-gray-500">Subtotal</span><span className="font-medium">₹{selectedOrder.subtotal.toLocaleString()}</span></div>
                {selectedOrder.discount > 0 && <div className="flex justify-between text-sm"><span className="text-gray-500">Discount</span><span className="font-medium text-green-600">-₹{selectedOrder.discount.toLocaleString()}</span></div>}
                {selectedOrder.rentalCharges > 0 && <div className="flex justify-between text-sm"><span className="text-gray-500">Rental Charges</span><span className="font-medium text-purple-600">₹{selectedOrder.rentalCharges.toLocaleString()}</span></div>}
                {selectedOrder.securityDeposit > 0 && <div className="flex justify-between text-sm"><span className="text-gray-500">Security Deposit</span><span className="font-medium">₹{selectedOrder.securityDeposit.toLocaleString()}</span></div>}
                <div className="flex justify-between text-sm"><span className="text-gray-500">Tax (18%)</span><span className="font-medium">₹{selectedOrder.tax.toLocaleString()}</span></div>
                <div className="flex justify-between text-sm font-bold pt-2 border-t border-gray-200"><span>Grand Total</span><span>₹{selectedOrder.total.toLocaleString()}</span></div>
              </div>

              <div>
                <p className="text-sm font-semibold text-gray-900 mb-3">Update Status</p>
                <div className="grid grid-cols-3 gap-2">
                  {allStatuses.map(s => (
                    <button key={s.value} onClick={() => { updateOrderStatus(selectedOrder.id, s.value as never); setSelectedOrder({ ...selectedOrder, orderStatus: s.value as never }); }}
                      className={`py-2 rounded-lg text-[10px] font-semibold border transition-all ${selectedOrder.orderStatus === s.value ? 'bg-blue-600 text-white border-blue-600' : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50'}`}>
                      {s.label}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <p className="text-sm font-semibold text-gray-900 mb-3">Order Timeline</p>
                <div className="space-y-3">
                  {selectedOrder.timeline.map((t, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <div className={`w-3 h-3 rounded-full mt-1 flex-shrink-0 ${t.done ? 'bg-green-500' : 'bg-gray-300'}`} />
                      <div>
                        <p className={`text-sm font-medium ${t.done ? 'text-gray-900' : 'text-gray-400'}`}>{t.status}</p>
                        {t.date && <p className="text-xs text-gray-500">{t.date}</p>}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
