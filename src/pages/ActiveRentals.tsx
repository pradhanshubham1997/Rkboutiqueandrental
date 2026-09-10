import { Clock, RefreshCw } from 'lucide-react';
import { rentalBookings } from '../data/mockData';

const activeRentals = rentalBookings.filter(b => b.status === 'active' || b.status === 'due_today' || b.status === 'overdue');

const statusColors: Record<string, string> = {
  active: 'bg-green-100 text-green-700', due_today: 'bg-amber-100 text-amber-700', overdue: 'bg-red-100 text-red-700',
};

export default function ActiveRentals() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-gray-900">Active Rentals</h2>
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <RefreshCw className="w-4 h-4" /> {activeRentals.length} active
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {activeRentals.map(rental => {
          const returnDate = new Date(rental.returnDate);
          const today = new Date('2026-09-10');
          const daysRemaining = Math.ceil((returnDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));

          return (
            <div key={rental.id} className="bg-white rounded-xl border border-gray-200 p-5 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="font-semibold text-gray-900">{rental.productName}</h3>
                  <p className="text-sm text-gray-500">{rental.customerName}</p>
                </div>
                <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${statusColors[rental.status]}`}>
                  {rental.status === 'due_today' ? 'Due Today' : rental.status.charAt(0).toUpperCase() + rental.status.slice(1)}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-3 mb-4">
                <div className="bg-gray-50 rounded-lg p-3">
                  <p className="text-xs text-gray-500">Pickup</p>
                  <p className="font-semibold text-sm">{rental.pickupDate.split('-').slice(1).join('/')}</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-3">
                  <p className="text-xs text-gray-500">Return</p>
                  <p className="font-semibold text-sm">{rental.returnDate.split('-').slice(1).join('/')}</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-3">
                  <p className="text-xs text-gray-500">Rental Amount</p>
                  <p className="font-bold text-sm text-purple-600">₹{rental.rentalAmount.toLocaleString()}</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-3">
                  <p className="text-xs text-gray-500">Security Deposit</p>
                  <p className="font-bold text-sm text-green-600">₹{rental.deposit.toLocaleString()}</p>
                </div>
              </div>

              <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                <div className="flex items-center gap-2 text-sm">
                  <Clock className="w-4 h-4 text-gray-400" />
                  <span className={`font-semibold ${daysRemaining <= 0 ? 'text-red-600' : daysRemaining <= 1 ? 'text-amber-600' : 'text-gray-900'}`}>
                    {daysRemaining <= 0 ? 'Overdue' : `${daysRemaining} Day${daysRemaining !== 1 ? 's' : ''} Left`}
                  </span>
                </div>
                <span className="text-xs text-gray-500">{rental.id}</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
