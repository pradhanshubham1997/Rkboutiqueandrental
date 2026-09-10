import { useState } from 'react';
import { RotateCcw, AlertTriangle, Clock } from 'lucide-react';
import { rentalBookings } from '../data/mockData';

const statusColors: Record<string, string> = {
  due_today: 'bg-amber-100 text-amber-700', overdue: 'bg-red-100 text-red-700', active: 'bg-blue-100 text-blue-700',
};

export default function RentalReturns() {
  const [showReturnModal, setShowReturnModal] = useState<typeof rentalBookings[0] | null>(null);
  const [condition, setCondition] = useState('excellent');

  const dueToday = rentalBookings.filter(b => b.status === 'due_today');
  const overdue = rentalBookings.filter(b => b.status === 'overdue');
  const upcoming = rentalBookings.filter(b => b.status === 'active');

  const ReturnSection = ({ title, items, icon }: { title: string; items: typeof rentalBookings; icon: React.ReactNode }) => (
    <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
      <div className="px-5 py-3 bg-gray-50 border-b border-gray-200 flex items-center gap-2">
        {icon}
        <h3 className="font-semibold text-gray-900">{title}</h3>
        <span className="ml-auto text-xs font-semibold text-gray-500">{items.length}</span>
      </div>
      {items.length === 0 ? (
        <div className="p-8 text-center text-gray-400 text-sm">No records</div>
      ) : (
        <div className="divide-y divide-gray-100">
          {items.map(item => (
            <div key={item.id} className="px-5 py-4 hover:bg-gray-50">
              <div className="flex items-center justify-between mb-2">
                <div>
                  <p className="font-medium text-gray-900">{item.productName}</p>
                  <p className="text-sm text-gray-500">{item.customerName}</p>
                </div>
                <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${statusColors[item.status]}`}>
                  {item.status === 'due_today' ? 'Due Today' : item.status.charAt(0).toUpperCase() + item.status.slice(1)}
                </span>
              </div>
              <div className="flex items-center gap-4 text-xs text-gray-500 mb-3">
                <span>Return: {item.returnDate.split('-').slice(1).join('/')}</span>
                <span>₹{item.rentalAmount.toLocaleString()}</span>
                <span>Deposit: ₹{item.deposit.toLocaleString()}</span>
              </div>
              <button onClick={() => setShowReturnModal(item)}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-blue-600 text-white rounded-lg text-xs font-semibold hover:bg-blue-700">
                <RotateCcw className="w-3.5 h-3.5" /> Process Return
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold text-gray-900">Rental Returns</h2>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <ReturnSection title="Due Today" items={dueToday} icon={<AlertTriangle className="w-4 h-4 text-amber-500" />} />
        <ReturnSection title="Upcoming" items={upcoming} icon={<Clock className="w-4 h-4 text-blue-500" />} />
        <ReturnSection title="Overdue" items={overdue} icon={<AlertTriangle className="w-4 h-4 text-red-500" />} />
      </div>

      {showReturnModal && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4" onClick={() => setShowReturnModal(null)}>
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-xl" onClick={e => e.stopPropagation()}>
            <h3 className="text-lg font-bold text-gray-900 mb-6">Process Rental Return</h3>

            <div className="space-y-3 mb-6">
              <div className="bg-gray-50 rounded-lg p-3"><p className="text-xs text-gray-500">Product</p><p className="font-semibold">{showReturnModal.productName}</p></div>
              <div className="bg-gray-50 rounded-lg p-3"><p className="text-xs text-gray-500">Customer</p><p className="font-semibold">{showReturnModal.customerName}</p></div>
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-gray-50 rounded-lg p-3"><p className="text-xs text-gray-500">Pickup Date</p><p className="font-semibold text-sm">{showReturnModal.pickupDate}</p></div>
                <div className="bg-gray-50 rounded-lg p-3"><p className="text-xs text-gray-500">Return Date</p><p className="font-semibold text-sm">{showReturnModal.returnDate}</p></div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-gray-50 rounded-lg p-3"><p className="text-xs text-gray-500">Rental Amount</p><p className="font-bold text-purple-600">₹{showReturnModal.rentalAmount.toLocaleString()}</p></div>
                <div className="bg-gray-50 rounded-lg p-3"><p className="text-xs text-gray-500">Security Deposit</p><p className="font-bold text-green-600">₹{showReturnModal.deposit.toLocaleString()}</p></div>
              </div>
            </div>

            <div className="mb-6">
              <p className="text-sm font-semibold text-gray-900 mb-3">Product Condition</p>
              <div className="grid grid-cols-2 gap-2">
                {['excellent', 'good', 'minor_damage', 'damaged'].map(c => (
                  <button key={c} onClick={() => setCondition(c)}
                    className={`py-2.5 rounded-lg text-sm font-medium border transition-colors ${condition === c ? 'bg-blue-50 border-blue-300 text-blue-700' : 'bg-white border-gray-200 text-gray-600 hover:bg-gray-50'}`}>
                    {c === 'minor_damage' ? 'Minor Damage' : c.charAt(0).toUpperCase() + c.slice(1)}
                  </button>
                ))}
              </div>
            </div>

            <div className="bg-gray-50 rounded-xl p-4 mb-6">
              <div className="flex justify-between text-sm mb-2"><span className="text-gray-500">Security Deposit</span><span className="font-medium">₹{showReturnModal.deposit.toLocaleString()}</span></div>
              <div className="flex justify-between text-sm mb-2"><span className="text-gray-500">Late Fee</span><span className="font-medium">₹0</span></div>
              <div className="flex justify-between text-sm font-bold pt-2 border-t border-gray-200"><span>Refund</span><span className="text-green-600">₹{showReturnModal.deposit.toLocaleString()}</span></div>
            </div>

            <div className="flex gap-3">
              <button onClick={() => setShowReturnModal(null)} className="flex-1 py-2.5 bg-gray-100 rounded-lg text-sm font-semibold text-gray-700 hover:bg-gray-200">Cancel</button>
              <button onClick={() => setShowReturnModal(null)} className="flex-1 py-2.5 bg-blue-600 rounded-lg text-sm font-semibold text-white hover:bg-blue-700">Complete Return</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
