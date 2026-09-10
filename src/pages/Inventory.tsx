import { useState } from 'react';
import { Search, Plus, Minus, History } from 'lucide-react';
import { inventoryItems } from '../data/mockData';

export default function Inventory() {
  const [search, setSearch] = useState('');
  const [showAdjust, setShowAdjust] = useState(false);

  const filtered = inventoryItems.filter(item =>
    item.productName.toLowerCase().includes(search.toLowerCase()) || item.sku.toLowerCase().includes(search.toLowerCase())
  );

  const stats = {
    totalProducts: inventoryItems.length,
    totalUnits: inventoryItems.reduce((a, b) => a + b.total, 0),
    available: inventoryItems.reduce((a, b) => a + b.available, 0),
    sold: inventoryItems.reduce((a, b) => a + b.sold, 0),
    rented: inventoryItems.reduce((a, b) => a + b.rented, 0),
    lowStock: inventoryItems.filter(i => i.status === 'Low Stock').length,
    outOfStock: inventoryItems.filter(i => i.status === 'Out of Stock').length,
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-gray-900">Inventory</h2>
        <div className="flex gap-2">
          <button onClick={() => setShowAdjust(true)} className="inline-flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50">
            <Plus className="w-4 h-4" /> Stock In
          </button>
          <button onClick={() => setShowAdjust(true)} className="inline-flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50">
            <Minus className="w-4 h-4" /> Adjustment
          </button>
          <button className="inline-flex items-center gap-2 px-4 py-2.5 bg-white border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50">
            <History className="w-4 h-4" /> History
          </button>
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-3">
        {[
          { label: 'Total Products', value: stats.totalProducts, color: 'text-gray-900' },
          { label: 'Total Units', value: stats.totalUnits, color: 'text-gray-900' },
          { label: 'Available', value: stats.available, color: 'text-green-600' },
          { label: 'Sold', value: stats.sold, color: 'text-blue-600' },
          { label: 'Rented', value: stats.rented, color: 'text-purple-600' },
          { label: 'Low Stock', value: stats.lowStock, color: 'text-amber-600' },
          { label: 'Out of Stock', value: stats.outOfStock, color: 'text-red-600' },
        ].map(s => (
          <div key={s.label} className="bg-white rounded-xl border border-gray-200 p-4">
            <p className="text-xs text-gray-500 mb-1">{s.label}</p>
            <p className={`text-2xl font-bold ${s.color}`}>{s.value}</p>
          </div>
        ))}
      </div>

      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        <input type="text" placeholder="Search inventory..." value={search} onChange={e => setSearch(e.target.value)}
          className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none" />
      </div>

      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase">Product</th>
                <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase">SKU</th>
                <th className="text-center py-3 px-4 text-xs font-semibold text-gray-500 uppercase">Total</th>
                <th className="text-center py-3 px-4 text-xs font-semibold text-gray-500 uppercase">Available</th>
                <th className="text-center py-3 px-4 text-xs font-semibold text-gray-500 uppercase">Sold</th>
                <th className="text-center py-3 px-4 text-xs font-semibold text-gray-500 uppercase">Rented</th>
                <th className="text-center py-3 px-4 text-xs font-semibold text-gray-500 uppercase">Status</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(item => (
                <tr key={item.productId} className="border-b border-gray-50 hover:bg-gray-50">
                  <td className="py-3 px-4 font-medium text-gray-900">{item.productName}</td>
                  <td className="py-3 px-4 text-gray-500 font-mono text-xs">{item.sku}</td>
                  <td className="py-3 px-4 text-center text-gray-600">{item.total}</td>
                  <td className="py-3 px-4 text-center font-medium text-green-600">{item.available}</td>
                  <td className="py-3 px-4 text-center text-blue-600">{item.sold}</td>
                  <td className="py-3 px-4 text-center text-purple-600">{item.rented}</td>
                  <td className="py-3 px-4 text-center">
                    <span className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-semibold ${item.status === 'Available' ? 'bg-green-100 text-green-700' : item.status === 'Low Stock' ? 'bg-amber-100 text-amber-700' : 'bg-red-100 text-red-700'}`}>
                      {item.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {showAdjust && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4" onClick={() => setShowAdjust(false)}>
          <div className="bg-white rounded-2xl max-w-md w-full p-6 shadow-xl" onClick={e => e.stopPropagation()}>
            <h3 className="text-lg font-bold text-gray-900 mb-4">Stock Adjustment</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Product</label>
                <select className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:ring-2 focus:ring-blue-500 outline-none">
                  {inventoryItems.map(i => <option key={i.productId}>{i.productName}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Adjustment Type</label>
                <select className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:ring-2 focus:ring-blue-500 outline-none">
                  <option>Stock In</option>
                  <option>Stock Out</option>
                  <option>Damage</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Quantity</label>
                <input type="number" defaultValue={1} min={1} className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:ring-2 focus:ring-blue-500 outline-none" />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Notes</label>
                <textarea className="w-full border border-gray-200 rounded-lg px-3 py-2.5 text-sm focus:ring-2 focus:ring-blue-500 outline-none" rows={2} />
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button onClick={() => setShowAdjust(false)} className="flex-1 py-2.5 bg-gray-100 rounded-lg text-sm font-semibold text-gray-700 hover:bg-gray-200">Cancel</button>
              <button onClick={() => setShowAdjust(false)} className="flex-1 py-2.5 bg-blue-600 rounded-lg text-sm font-semibold text-white hover:bg-blue-700">Apply</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
