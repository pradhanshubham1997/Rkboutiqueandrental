import { useState } from 'react';
import { Plus, Search } from 'lucide-react';
import { rentalBookings } from '../data/mockData';


const statusFilters: { label: string; value: string }[] = [
  { label: 'All', value: 'all' },
  { label: 'Reserved', value: 'reserved' },
  { label: 'Active', value: 'active' },
  { label: 'Due Today', value: 'due_today' },
  { label: 'Returned', value: 'returned' },
  { label: 'Overdue', value: 'overdue' },
];

const statusColors: Record<string, string> = {
  reserved: 'bg-blue-100 text-blue-700',
  active: 'bg-green-100 text-green-700',
  due_today: 'bg-amber-100 text-amber-700',
  returned: 'bg-gray-100 text-gray-600',
  overdue: 'bg-red-100 text-red-700',
};

const statusLabels: Record<string, string> = {
  reserved: 'Reserved', active: 'Active', due_today: 'Due Today', returned: 'Returned', overdue: 'Overdue',
};

export default function RentalBookings() {
  const [filter, setFilter] = useState('all');
  const [search, setSearch] = useState('');
  const [selectedBooking, setSelectedBooking] = useState<typeof rentalBookings[0] | null>(null);

  const filtered = rentalBookings.filter(b => {
    const matchFilter = filter === 'all' || b.status === filter;
    const matchSearch = b.customerName.toLowerCase().includes(search.toLowerCase()) || b.productName.toLowerCase().includes(search.toLowerCase());
    return matchFilter && matchSearch;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <h2 className="text-xl font-bold text-gray-900">Rental Bookings</h2>
        <button className="inline-flex items-center gap-2 px-4 py-2.5 bg-purple-600 text-white rounded-lg text-sm font-semibold hover:bg-purple-700">
          <Plus className="w-4 h-4" /> New Rental Booking
        </button>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input type="text" placeholder="Search bookings..." value={search} onChange={e => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-purple-500 outline-none" />
        </div>
        <div className="flex gap-1 overflow-x-auto">
          {statusFilters.map(f => (
            <button key={f.value} onClick={() => setFilter(f.value)}
              className={`px-3 py-2 rounded-lg text-xs font-medium whitespace-nowrap ${filter === f.value ? 'bg-purple-600 text-white' : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50'}`}>
              {f.label}
            </button>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase">Booking ID</th>
                <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase">Customer</th>
                <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase">Product</th>
                <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase">Pickup</th>
                <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase">Return</th>
                <th className="text-right py-3 px-4 text-xs font-semibold text-gray-500 uppercase">Amount</th>
                <th className="text-right py-3 px-4 text-xs font-semibold text-gray-500 uppercase">Deposit</th>
                <th className="text-center py-3 px-4 text-xs font-semibold text-gray-500 uppercase">Status</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(booking => (
                <tr key={booking.id} className="border-b border-gray-50 hover:bg-gray-50 cursor-pointer" onClick={() => setSelectedBooking(booking)}>
                  <td className="py-3 px-4 font-medium text-gray-900">{booking.id}</td>
                  <td className="py-3 px-4 text-gray-600">{booking.customerName}</td>
                  <td className="py-3 px-4 text-gray-600">{booking.productName}</td>
                  <td className="py-3 px-4 text-gray-500 text-xs">{booking.pickupDate.split('-').slice(1).join('/')}</td>
                  <td className="py-3 px-4 text-gray-500 text-xs">{booking.returnDate.split('-').slice(1).join('/')}</td>
                  <td className="py-3 px-4 text-right font-medium text-gray-900">₹{booking.rentalAmount.toLocaleString()}</td>
                  <td className="py-3 px-4 text-right text-gray-600">₹{booking.deposit.toLocaleString()}</td>
                  <td className="py-3 px-4 text-center">
                    <span className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-semibold ${statusColors[booking.status]}`}>
                      {statusLabels[booking.status]}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {selectedBooking && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4" onClick={() => setSelectedBooking(null)}>
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-xl" onClick={e => e.stopPropagation()}>
            <h3 className="text-lg font-bold text-gray-900 mb-4">Booking Details</h3>
            <div className="space-y-3">
              <div className="bg-gray-50 rounded-lg p-3"><p className="text-xs text-gray-500">Booking ID</p><p className="font-semibold">{selectedBooking.id}</p></div>
              <div className="bg-gray-50 rounded-lg p-3"><p className="text-xs text-gray-500">Customer</p><p className="font-semibold">{selectedBooking.customerName}</p></div>
              <div className="bg-gray-50 rounded-lg p-3"><p className="text-xs text-gray-500">Product</p><p className="font-semibold">{selectedBooking.productName}</p></div>
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-gray-50 rounded-lg p-3"><p className="text-xs text-gray-500">Pickup</p><p className="font-semibold">{selectedBooking.pickupDate}</p></div>
                <div className="bg-gray-50 rounded-lg p-3"><p className="text-xs text-gray-500">Return</p><p className="font-semibold">{selectedBooking.returnDate}</p></div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-gray-50 rounded-lg p-3"><p className="text-xs text-gray-500">Rental Amount</p><p className="font-bold text-purple-600">₹{selectedBooking.rentalAmount.toLocaleString()}</p></div>
                <div className="bg-gray-50 rounded-lg p-3"><p className="text-xs text-gray-500">Security Deposit</p><p className="font-bold text-green-600">₹{selectedBooking.deposit.toLocaleString()}</p></div>
              </div>
              <div className="flex items-center justify-between bg-gray-50 rounded-lg p-3">
                <span className="text-sm text-gray-500">Status</span>
                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${statusColors[selectedBooking.status]}`}>{statusLabels[selectedBooking.status]}</span>
              </div>
            </div>
            <button onClick={() => setSelectedBooking(null)} className="mt-6 w-full py-2.5 bg-gray-100 rounded-lg text-sm font-semibold text-gray-700 hover:bg-gray-200">Close</button>
          </div>
        </div>
      )}
    </div>
  );
}
