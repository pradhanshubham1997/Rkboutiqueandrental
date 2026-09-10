import { useState } from 'react';
import { Search, Users, ShoppingCart, RotateCcw, Star, AlertTriangle, X, Phone, Mail } from 'lucide-react';
import { customers } from '../data/mockData';
import { rentalBookings, initialOrders } from '../data/mockData';

const typeColors: Record<string, string> = {
  retail: 'bg-blue-100 text-blue-700', rental: 'bg-purple-100 text-purple-700', both: 'bg-green-100 text-green-700',
};

export default function Customers() {
  const [search, setSearch] = useState('');
  const [selectedCustomer, setSelectedCustomer] = useState<typeof customers[0] | null>(null);

  const filtered = customers.filter(c => c.name.toLowerCase().includes(search.toLowerCase()));

  const stats = {
    total: customers.length,
    retail: customers.filter(c => c.type === 'retail' || c.type === 'both').length,
    rental: customers.filter(c => c.type === 'rental' || c.type === 'both').length,
    repeat: customers.filter(c => c.retailOrders + c.rentalOrders > 2).length,
    outstanding: customers.reduce((a, b) => a + b.outstanding, 0),
  };

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold text-gray-900">Customers</h2>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
        {[
          { label: 'Total Customers', value: stats.total, icon: Users, color: 'text-gray-900' },
          { label: 'Retail Customers', value: stats.retail, icon: ShoppingCart, color: 'text-blue-600' },
          { label: 'Rental Customers', value: stats.rental, icon: RotateCcw, color: 'text-purple-600' },
          { label: 'Repeat Customers', value: stats.repeat, icon: Star, color: 'text-amber-600' },
          { label: 'Outstanding', value: `₹${stats.outstanding.toLocaleString()}`, icon: AlertTriangle, color: 'text-red-600' },
        ].map(s => (
          <div key={s.label} className="bg-white rounded-xl border border-gray-200 p-4">
            <p className="text-xs text-gray-500 mb-1">{s.label}</p>
            <p className={`text-xl font-bold ${s.color}`}>{s.value}</p>
          </div>
        ))}
      </div>

      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        <input type="text" placeholder="Search customers..." value={search} onChange={e => setSearch(e.target.value)}
          className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none" />
      </div>

      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase">Customer</th>
                <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase">Type</th>
                <th className="text-center py-3 px-4 text-xs font-semibold text-gray-500 uppercase">Retail Orders</th>
                <th className="text-center py-3 px-4 text-xs font-semibold text-gray-500 uppercase">Rental Orders</th>
                <th className="text-right py-3 px-4 text-xs font-semibold text-gray-500 uppercase">Total Spent</th>
                <th className="text-right py-3 px-4 text-xs font-semibold text-gray-500 uppercase">Outstanding</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(customer => (
                <tr key={customer.id} className="border-b border-gray-50 hover:bg-gray-50 cursor-pointer" onClick={() => setSelectedCustomer(customer)}>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-400 to-purple-400 flex items-center justify-center text-white font-semibold text-xs">
                        {customer.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{customer.name}</p>
                        <p className="text-xs text-gray-500">{customer.phone}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <span className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-semibold ${typeColors[customer.type]}`}>
                      {customer.type === 'both' ? 'Retail + Rental' : customer.type.charAt(0).toUpperCase() + customer.type.slice(1)}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-center text-gray-600">{customer.retailOrders}</td>
                  <td className="py-3 px-4 text-center text-gray-600">{customer.rentalOrders}</td>
                  <td className="py-3 px-4 text-right font-medium text-gray-900">₹{customer.totalSpent.toLocaleString()}</td>
                  <td className="py-3 px-4 text-right">
                    <span className={`font-medium ${customer.outstanding > 0 ? 'text-red-600' : 'text-gray-600'}`}>
                      {customer.outstanding > 0 ? `₹${customer.outstanding.toLocaleString()}` : '-'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {selectedCustomer && (
        <div className="fixed inset-0 bg-black/40 z-50 flex justify-end" onClick={() => setSelectedCustomer(null)}>
          <div className="bg-white w-full max-w-lg h-full overflow-y-auto shadow-xl" onClick={e => e.stopPropagation()}>
            <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
              <h3 className="text-lg font-bold text-gray-900">Customer Profile</h3>
              <button onClick={() => setSelectedCustomer(null)} className="p-2 hover:bg-gray-100 rounded-lg"><X className="w-5 h-5" /></button>
            </div>
            <div className="p-6 space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-blue-400 to-purple-400 flex items-center justify-center text-white font-bold text-xl">
                  {selectedCustomer.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                  <h4 className="text-lg font-bold text-gray-900">{selectedCustomer.name}</h4>
                  <span className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-semibold ${typeColors[selectedCustomer.type]}`}>
                    {selectedCustomer.type === 'both' ? 'Retail + Rental' : selectedCustomer.type.charAt(0).toUpperCase() + selectedCustomer.type.slice(1)}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="bg-gray-50 rounded-lg p-3 flex items-center gap-2"><Phone className="w-4 h-4 text-gray-400" /><div><p className="text-xs text-gray-500">Phone</p><p className="text-sm font-medium">{selectedCustomer.phone}</p></div></div>
                <div className="bg-gray-50 rounded-lg p-3 flex items-center gap-2"><Mail className="w-4 h-4 text-gray-400" /><div><p className="text-xs text-gray-500">Email</p><p className="text-sm font-medium">{selectedCustomer.email}</p></div></div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="bg-gray-50 rounded-lg p-3"><p className="text-xs text-gray-500">Total Spent</p><p className="text-lg font-bold text-gray-900">₹{selectedCustomer.totalSpent.toLocaleString()}</p></div>
                <div className="bg-gray-50 rounded-lg p-3"><p className="text-xs text-gray-500">Outstanding</p><p className={`text-lg font-bold ${selectedCustomer.outstanding > 0 ? 'text-red-600' : 'text-green-600'}`}>{selectedCustomer.outstanding > 0 ? `₹${selectedCustomer.outstanding.toLocaleString()}` : 'None'}</p></div>
              </div>

              <div>
                <h5 className="font-semibold text-gray-900 mb-3">Retail History</h5>
                <div className="space-y-2">
                  {initialOrders.filter(o => o.customerId === selectedCustomer.id).slice(0, 3).map((o) => (
                    <div key={o.id} className="bg-gray-50 rounded-lg p-3 flex items-center justify-between">
                      <div><p className="text-sm font-medium">{o.id}</p><p className="text-xs text-gray-500">{o.date}</p></div>
                      <span className="font-medium text-sm">₹{o.total.toLocaleString()}</span>
                    </div>
                  ))}
                  {initialOrders.filter(o => o.customerId === selectedCustomer.id).length === 0 && <p className="text-sm text-gray-400">No retail orders</p>}
                </div>
              </div>

              <div>
                <h5 className="font-semibold text-gray-900 mb-3">Rental History</h5>
                <div className="space-y-2">
                  {rentalBookings.filter(b => b.customerId === selectedCustomer.id).slice(0, 3).map(b => (
                    <div key={b.id} className="bg-gray-50 rounded-lg p-3 flex items-center justify-between">
                      <div><p className="text-sm font-medium">{b.productName}</p><p className="text-xs text-gray-500">{b.pickupDate} → {b.returnDate}</p></div>
                      <span className="font-medium text-sm">₹{b.rentalAmount.toLocaleString()}</span>
                    </div>
                  ))}
                  {rentalBookings.filter(b => b.customerId === selectedCustomer.id).length === 0 && <p className="text-sm text-gray-400">No rental bookings</p>}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
