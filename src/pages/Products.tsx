import { useState } from 'react';
import { Search, Plus, Tag } from 'lucide-react';
import { products } from '../data/mockData';

const typeColors: Record<string, string> = {
  retail: 'bg-blue-100 text-blue-700',
  rental: 'bg-purple-100 text-purple-700',
  both: 'bg-green-100 text-green-700',
};

export default function Products() {
  const [search, setSearch] = useState('');
  const [filter, setFilter] = useState('all');
  const [selectedProduct, setSelectedProduct] = useState<typeof products[0] | null>(null);

  const filtered = products.filter(p => {
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase()) || p.sku.toLowerCase().includes(search.toLowerCase());
    const matchFilter = filter === 'all' || p.type === filter;
    return matchSearch && matchFilter;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <h2 className="text-xl font-bold text-gray-900">Products</h2>
        <button className="inline-flex items-center gap-2 px-4 py-2.5 bg-blue-600 text-white rounded-lg text-sm font-semibold hover:bg-blue-700 transition-colors">
          <Plus className="w-4 h-4" /> Add Product
        </button>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input type="text" placeholder="Search products..." value={search} onChange={e => setSearch(e.target.value)}
            className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none" />
        </div>
        <div className="flex gap-2">
          {['all', 'retail', 'rental', 'both'].map(type => (
            <button key={type} onClick={() => setFilter(type)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${filter === type ? 'bg-blue-600 text-white' : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50'}`}>
              {type === 'all' ? 'All' : type === 'both' ? 'Retail + Rental' : type.charAt(0).toUpperCase() + type.slice(1)}
            </button>
          ))}
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase">Product</th>
                <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase">SKU</th>
                <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase">Category</th>
                <th className="text-left py-3 px-4 text-xs font-semibold text-gray-500 uppercase">Type</th>
                <th className="text-right py-3 px-4 text-xs font-semibold text-gray-500 uppercase">Sale Price</th>
                <th className="text-right py-3 px-4 text-xs font-semibold text-gray-500 uppercase">Rental Price</th>
                <th className="text-center py-3 px-4 text-xs font-semibold text-gray-500 uppercase">Stock</th>
                <th className="text-center py-3 px-4 text-xs font-semibold text-gray-500 uppercase">Available</th>
                <th className="text-center py-3 px-4 text-xs font-semibold text-gray-500 uppercase">Status</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(product => (
                <tr key={product.id} className="border-b border-gray-50 hover:bg-gray-50 cursor-pointer" onClick={() => setSelectedProduct(product)}>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-3">
                      <img src={product.image} alt={product.name} className="w-10 h-10 rounded-lg object-contain bg-gray-100" />
                      <span className="font-medium text-gray-900">{product.name}</span>
                    </div>
                  </td>
                  <td className="py-3 px-4 text-gray-500 font-mono text-xs">{product.sku}</td>
                  <td className="py-3 px-4 text-gray-600">{product.category}</td>
                  <td className="py-3 px-4">
                    <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-semibold ${typeColors[product.type]}`}>
                      <Tag className="w-3 h-3" />
                      {product.type === 'both' ? 'Retail + Rental' : product.type.charAt(0).toUpperCase() + product.type.slice(1)}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-right font-medium text-gray-900">{product.salePrice > 0 ? `₹${product.salePrice.toLocaleString()}` : '-'}</td>
                  <td className="py-3 px-4 text-right font-medium text-gray-900">{product.rentalPrice > 0 ? `₹${product.rentalPrice.toLocaleString()}` : '-'}</td>
                  <td className="py-3 px-4 text-center text-gray-600">{product.totalStock}</td>
                  <td className="py-3 px-4 text-center text-gray-600">{product.available}</td>
                  <td className="py-3 px-4 text-center">
                    <span className={`inline-flex px-2.5 py-0.5 rounded-full text-xs font-semibold ${product.status === 'active' ? 'bg-green-100 text-green-700' : product.status === 'low_stock' ? 'bg-amber-100 text-amber-700' : 'bg-red-100 text-red-700'}`}>
                      {product.status === 'active' ? 'Active' : product.status === 'low_stock' ? 'Low Stock' : 'Out of Stock'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {selectedProduct && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4" onClick={() => setSelectedProduct(null)}>
          <div className="bg-white rounded-2xl max-w-lg w-full p-6 shadow-xl" onClick={e => e.stopPropagation()}>
            <div className="flex items-start gap-4 mb-4">
              <img src={selectedProduct.image} alt={selectedProduct.name} className="w-20 h-20 rounded-xl object-contain bg-gray-100" />
              <div>
                <h3 className="text-lg font-bold text-gray-900">{selectedProduct.name}</h3>
                <p className="text-sm text-gray-500">{selectedProduct.sku} · {selectedProduct.category}</p>
                <span className={`inline-flex items-center gap-1 mt-1 px-2.5 py-0.5 rounded-full text-xs font-semibold ${typeColors[selectedProduct.type]}`}>
                  {selectedProduct.type === 'both' ? 'Retail + Rental' : selectedProduct.type.charAt(0).toUpperCase() + selectedProduct.type.slice(1)}
                </span>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="bg-gray-50 rounded-lg p-3"><p className="text-gray-500 text-xs mb-1">Sale Price</p><p className="font-bold text-gray-900">₹{selectedProduct.salePrice.toLocaleString()}</p></div>
              <div className="bg-gray-50 rounded-lg p-3"><p className="text-gray-500 text-xs mb-1">Rental Price</p><p className="font-bold text-gray-900">₹{selectedProduct.rentalPrice.toLocaleString()}</p></div>
              <div className="bg-gray-50 rounded-lg p-3"><p className="text-gray-500 text-xs mb-1">Security Deposit</p><p className="font-bold text-gray-900">₹{selectedProduct.deposit.toLocaleString()}</p></div>
              <div className="bg-gray-50 rounded-lg p-3"><p className="text-gray-500 text-xs mb-1">Total Stock</p><p className="font-bold text-gray-900">{selectedProduct.totalStock}</p></div>
              <div className="bg-gray-50 rounded-lg p-3"><p className="text-gray-500 text-xs mb-1">Available</p><p className="font-bold text-green-600">{selectedProduct.available}</p></div>
              <div className="bg-gray-50 rounded-lg p-3"><p className="text-gray-500 text-xs mb-1">Sold</p><p className="font-bold text-blue-600">{selectedProduct.sold}</p></div>
            </div>
            <button onClick={() => setSelectedProduct(null)} className="mt-6 w-full py-2.5 bg-gray-100 rounded-lg text-sm font-semibold text-gray-700 hover:bg-gray-200">Close</button>
          </div>
        </div>
      )}
    </div>
  );
}
