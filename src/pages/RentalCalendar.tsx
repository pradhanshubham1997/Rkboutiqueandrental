import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { rentalBookings } from '../data/mockData';

const statusColors: Record<string, string> = {
  reserved: 'bg-blue-100 border-blue-300 text-blue-800',
  active: 'bg-green-100 border-green-300 text-green-800',
  due_today: 'bg-amber-100 border-amber-300 text-amber-800',
  overdue: 'bg-red-100 border-red-300 text-red-800',
  returned: 'bg-gray-100 border-gray-300 text-gray-600',
};

export default function RentalCalendar() {
  const [month, setMonth] = useState(8); // September (0-indexed)
  const [year] = useState(2026);
  const [selectedBooking, setSelectedBooking] = useState<typeof rentalBookings[0] | null>(null);

  const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const firstDay = new Date(year, month, 1).getDay();

  const bookings = rentalBookings.filter(b => b.status !== 'returned');

  const getBookingsForDate = (day: number) => {
    const dateStr = `${year}-${String(month + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    return bookings.filter(b => dateStr >= b.pickupDate && dateStr <= b.returnDate);
  };

  const prevMonth = () => setMonth(m => Math.max(0, m - 1));
  const nextMonth = () => setMonth(m => Math.min(11, m + 1));

  const today = 10; // Sep 10, 2026

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-gray-900">Rental Calendar</h2>
        <p className="text-sm text-gray-500">Visual availability by date</p>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 p-5">
        <div className="flex items-center justify-between mb-6">
          <button onClick={prevMonth} className="p-2 hover:bg-gray-100 rounded-lg"><ChevronLeft className="w-5 h-5" /></button>
          <h3 className="text-lg font-bold text-gray-900">{monthNames[month]} {year}</h3>
          <button onClick={nextMonth} className="p-2 hover:bg-gray-100 rounded-lg"><ChevronRight className="w-5 h-5" /></button>
        </div>

        <div className="grid grid-cols-7 gap-px bg-gray-200 rounded-lg overflow-hidden">
          {dayNames.map(d => (
            <div key={d} className="bg-gray-50 py-2 text-center text-xs font-semibold text-gray-500">{d}</div>
          ))}
          {Array.from({ length: firstDay }).map((_, i) => (
            <div key={`empty-${i}`} className="bg-white min-h-[80px]" />
          ))}
          {Array.from({ length: daysInMonth }).map((_, i) => {
            const day = i + 1;
            const dayBookings = getBookingsForDate(day);
            const isToday = day === today && month === 8;
            return (
              <div key={day} className={`bg-white min-h-[80px] p-1 ${isToday ? 'ring-2 ring-blue-500 ring-inset' : ''}`}>
                <div className={`text-xs font-medium mb-1 ${isToday ? 'text-blue-600 font-bold' : 'text-gray-500'}`}>{day}</div>
                <div className="space-y-0.5">
                  {dayBookings.map(b => (
                    <button key={b.id}
                      onClick={() => setSelectedBooking(b)}
                      className={`w-full text-left text-[10px] px-1 py-0.5 rounded border truncate ${statusColors[b.status]}`}>
                      {b.productName.split(' ')[0]}
                    </button>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 p-5">
        <h3 className="font-semibold text-gray-900 mb-4">Active Bookings</h3>
        <div className="space-y-3">
          {bookings.map(b => (
            <div key={b.id} className="flex items-center gap-4 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 cursor-pointer" onClick={() => setSelectedBooking(b)}>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-gray-900">{b.productName}</p>
                <p className="text-xs text-gray-500">{b.customerName}</p>
              </div>
              <div className="text-right text-xs text-gray-500">
                <p>{b.pickupDate.split('-').slice(1).join('/')} → {b.returnDate.split('-').slice(1).join('/')}</p>
              </div>
              <span className={`px-2 py-0.5 rounded-full text-[10px] font-semibold ${statusColors[b.status]}`}>{b.status.replace('_', ' ')}</span>
            </div>
          ))}
        </div>
      </div>

      {selectedBooking && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4" onClick={() => setSelectedBooking(null)}>
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-xl" onClick={e => e.stopPropagation()}>
            <h3 className="text-lg font-bold text-gray-900 mb-4">Booking Details</h3>
            <div className="space-y-3">
              <div className="bg-gray-50 rounded-lg p-3"><p className="text-xs text-gray-500">Product</p><p className="font-semibold">{selectedBooking.productName}</p></div>
              <div className="bg-gray-50 rounded-lg p-3"><p className="text-xs text-gray-500">Customer</p><p className="font-semibold">{selectedBooking.customerName}</p></div>
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-gray-50 rounded-lg p-3"><p className="text-xs text-gray-500">From</p><p className="font-semibold">{selectedBooking.pickupDate}</p></div>
                <div className="bg-gray-50 rounded-lg p-3"><p className="text-xs text-gray-500">To</p><p className="font-semibold">{selectedBooking.returnDate}</p></div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-gray-50 rounded-lg p-3"><p className="text-xs text-gray-500">Amount</p><p className="font-bold text-purple-600">₹{selectedBooking.rentalAmount.toLocaleString()}</p></div>
                <div className="bg-gray-50 rounded-lg p-3"><p className="text-xs text-gray-500">Deposit</p><p className="font-bold text-green-600">₹{selectedBooking.deposit.toLocaleString()}</p></div>
              </div>
            </div>
            <button onClick={() => setSelectedBooking(null)} className="mt-6 w-full py-2.5 bg-gray-100 rounded-lg text-sm font-semibold text-gray-700 hover:bg-gray-200">Close</button>
          </div>
        </div>
      )}
    </div>
  );
}
