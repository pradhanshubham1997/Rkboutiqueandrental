import { useState } from 'react';
import { Store, Search } from 'lucide-react';
import { products } from '../data/mockData';

const rentalProducts = products.filter(p => p.type === 'rental' || p.type === 'both');

export default function RentalInventory() {
  const [search, setSearch] = useState('');

  const filtered = rentalProducts.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase()) || p.sku.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-gray-900">Rental Inventory</h2>
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <Store className="w-4 h-4" /> {rentalProducts.length} rental products
        </div>
      </div>

      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        <input type="text" placeholder="Search rental inventory..." value={search} onChange={e => setSearch(e.target.value)}
          className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filtered.map(product => (
          <div key={product.id} className="bg-white rounded-xl border border-gray-200 p-5 hover:shadow-md transition-shadow">
            <div className="flex items-start gap-4 mb-4">
              <img src={product.image} alt={product.name} className="w-16 h-16 rounded-xl object-contain bg-gray-100 flex-shrink-0" />
              <div className="min-w-0">
                <h3 className="font-semibold text-gray-900 truncate">{product.name}</h3>
                <p className="text-xs text-gray-500">{product.sku}</p>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-2 mb-4">
              <div className="bg-blue-50 rounded-lg p-2 text-center">
                <p className="text-xs text-blue-600 font-medium">Total</p>
                <p className="text-lg font-bold text-blue-700">{product.totalStock}</p>
              </div>
              <div className="bg-green-50 rounded-lg p-2 text-center">
                <p className="text-xs text-green-600 font-medium">Available</p>
                <p className="text-lg font-bold text-green-700">{product.available}</p>
              </div>
              <div className="bg-purple-50 rounded-lg p-2 text-center">
                <p className="text-xs text-purple-600 font-medium">Rented</p>
                <p className="text-lg font-bold text-purple-700">{product.rented}</p>
              </div>
            </div>

            <div className="flex items-center justify-between pt-3 border-t border-gray-100">
              <div>
                <p className="text-xs text-gray-500">Rental/Day</p>
                <p className="font-bold text-gray-900">₹{product.rentalPrice.toLocaleString()}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500">Deposit</p>
                <p className="font-bold text-gray-900">₹{product.deposit.toLocaleString()}</p>
              </div>
              <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${product.available > 3 ? 'bg-green-100 text-green-700' : product.available > 0 ? 'bg-amber-100 text-amber-700' : 'bg-red-100 text-red-700'}`}>
                {product.available > 3 ? 'Available' : product.available > 0 ? 'Limited' : 'Unavailable'}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
