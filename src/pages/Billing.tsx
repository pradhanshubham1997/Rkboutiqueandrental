import { useState } from 'react';
import { Search, ShoppingCart, Trash2, Plus, Minus, CheckCircle, User } from 'lucide-react';
import { products } from '../data/mockData';
import { useApp } from '../context/AppContext';

interface BillItem { product: typeof products[0]; quantity: number; mode: 'retail' | 'rental'; discount: number; }

export default function Billing() {
  const { addToCart } = useApp();
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('All');
  const [billItems, setBillItems] = useState<BillItem[]>([]);
  const [showSuccess, setShowSuccess] = useState(false);
  const [taxRate] = useState(18);
  const [customerName, setCustomerName] = useState('');

  const categories = ['All', ...new Set(products.map(p => p.category))];
  const filtered = products.filter(p => {
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase());
    const matchCat = category === 'All' || p.category === category;
    return matchSearch && matchCat && p.available > 0;
  });

  const addItem = (product: typeof products[0], mode: 'retail' | 'rental') => {
    setBillItems(prev => {
      const key = `${product.id}-${mode}`;
      const existing = prev.find(b => `${b.product.id}-${b.mode}` === key);
      if (existing) return prev.map(b => `${b.product.id}-${b.mode}` === key ? { ...b, quantity: b.quantity + 1 } : b);
      return [...prev, { product, quantity: 1, mode, discount: 0 }];
    });
  };

  const updateQty = (id: string, mode: string, delta: number) => {
    setBillItems(prev => prev.map(b => `${b.product.id}-${b.mode}` === `${id}-${mode}` ? { ...b, quantity: Math.max(0, b.quantity + delta) } : b).filter(b => b.quantity > 0));
  };

  const removeItem = (id: string, mode: string) => setBillItems(prev => prev.filter(b => !(b.product.id === id && b.mode === mode)));

  const retailSubtotal = billItems.filter(b => b.mode === 'retail').reduce((a, b) => a + (b.product.salePrice * b.quantity) - b.discount, 0);
  const rentalSubtotal = billItems.filter(b => b.mode === 'rental').reduce((a, b) => a + (b.product.rentalPrice * b.quantity), 0);
  const depositTotal = billItems.filter(b => b.mode === 'rental').reduce((a, b) => a + (b.product.deposit * b.quantity), 0);
  const subtotal = retailSubtotal + rentalSubtotal;
  const tax = Math.round(subtotal * taxRate / 100);
  const total = subtotal + tax + depositTotal;

  const generateBill = () => {
    billItems.forEach(item => {
      addToCart({ product: item.product, mode: item.mode, quantity: item.quantity });
    });
    setShowSuccess(true);
    setTimeout(() => { setShowSuccess(false); setBillItems([]); setCustomerName(''); }, 3000);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-gray-900">Billing / POS</h2>
        <div className="flex items-center gap-2 text-sm text-gray-500">
          <ShoppingCart className="w-4 h-4" /> {billItems.length} items
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <input type="text" placeholder="Search products..." value={search} onChange={e => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 border border-gray-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 outline-none" />
          </div>
          <div className="flex gap-2 overflow-x-auto pb-1">
            {categories.map(cat => (
              <button key={cat} onClick={() => setCategory(cat)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium whitespace-nowrap ${category === cat ? 'bg-blue-600 text-white' : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50'}`}>
                {cat}
              </button>
            ))}
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
            {filtered.map(product => (
              <div key={product.id} className="bg-white rounded-xl border border-gray-200 p-3 hover:shadow-md transition-shadow">
                <img src={product.image} alt={product.name} className="w-full h-24 object-contain rounded-lg bg-gray-100 mb-2" />
                <p className="text-sm font-medium text-gray-900 truncate">{product.name}</p>
                <p className="text-xs text-gray-500 mb-2">{product.available} in stock</p>
                <div className="flex gap-1">
                  {product.salePrice > 0 && (
                    <button onClick={() => addItem(product, 'retail')} className="flex-1 py-1.5 bg-blue-600 text-white rounded-lg text-[10px] font-semibold hover:bg-blue-700">
                      Buy ₹{product.salePrice.toLocaleString()}
                    </button>
                  )}
                  {product.rentalPrice > 0 && (
                    <button onClick={() => addItem(product, 'rental')} className="flex-1 py-1.5 bg-purple-600 text-white rounded-lg text-[10px] font-semibold hover:bg-purple-700">
                      Rent ₹{product.rentalPrice.toLocaleString()}
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-5 h-fit sticky top-4">
          <h3 className="font-semibold text-gray-900 mb-3 pb-3 border-b border-gray-100">Current Bill</h3>

          <div className="mb-3">
            <div className="flex items-center gap-2 bg-gray-50 rounded-lg px-3 py-2">
              <User className="w-4 h-4 text-gray-400" />
              <input type="text" placeholder="Customer name" value={customerName} onChange={e => setCustomerName(e.target.value)}
                className="flex-1 bg-transparent text-sm outline-none" />
            </div>
          </div>

          {billItems.length === 0 ? (
            <div className="text-center py-12 text-gray-400">
              <ShoppingCart className="w-10 h-10 mx-auto mb-2 opacity-50" />
              <p className="text-sm">Add products to start billing</p>
            </div>
          ) : (
            <>
              <div className="space-y-3 max-h-64 overflow-y-auto mb-4">
                {billItems.map(item => (
                  <div key={`${item.product.id}-${item.mode}`} className="flex items-center gap-3 py-2 border-b border-gray-50 last:border-0">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-1.5">
                        <p className="text-sm font-medium text-gray-900 truncate">{item.product.name}</p>
                        <span className={`px-1 py-0.5 text-[8px] font-bold rounded ${item.mode === 'retail' ? 'bg-blue-50 text-blue-600' : 'bg-purple-50 text-purple-600'}`}>
                          {item.mode === 'retail' ? 'BUY' : 'RENT'}
                        </span>
                      </div>
                      <p className="text-xs text-gray-500">₹{item.mode === 'retail' ? item.product.salePrice.toLocaleString() : `${item.product.rentalPrice.toLocaleString()}/day`}</p>
                    </div>
                    <div className="flex items-center gap-1">
                      <button onClick={() => updateQty(item.product.id, item.mode, -1)} className="w-6 h-6 rounded bg-gray-100 flex items-center justify-center"><Minus className="w-3 h-3" /></button>
                      <span className="w-6 text-center text-sm font-medium">{item.quantity}</span>
                      <button onClick={() => updateQty(item.product.id, item.mode, 1)} className="w-6 h-6 rounded bg-gray-100 flex items-center justify-center"><Plus className="w-3 h-3" /></button>
                    </div>
                    <p className="text-sm font-medium text-gray-900 w-20 text-right">
                      ₹{item.mode === 'retail' ? ((item.product.salePrice * item.quantity) - item.discount).toLocaleString() : (item.product.rentalPrice * item.quantity).toLocaleString()}
                    </p>
                    <button onClick={() => removeItem(item.product.id, item.mode)} className="text-red-400 hover:text-red-600"><Trash2 className="w-4 h-4" /></button>
                  </div>
                ))}
              </div>

              <div className="space-y-2 pt-3 border-t border-gray-100">
                {retailSubtotal > 0 && <div className="flex justify-between text-sm"><span className="text-gray-500">Retail</span><span className="font-medium">₹{retailSubtotal.toLocaleString()}</span></div>}
                {rentalSubtotal > 0 && <div className="flex justify-between text-sm"><span className="text-gray-500">Rental</span><span className="font-medium">₹{rentalSubtotal.toLocaleString()}</span></div>}
                {depositTotal > 0 && <div className="flex justify-between text-sm"><span className="text-gray-500">Deposit</span><span className="font-medium">₹{depositTotal.toLocaleString()}</span></div>}
                <div className="flex justify-between text-sm"><span className="text-gray-500">Tax ({taxRate}%)</span><span className="font-medium">₹{tax.toLocaleString()}</span></div>
                <div className="flex justify-between text-lg font-bold pt-2 border-t border-gray-200"><span>Total</span><span>₹{total.toLocaleString()}</span></div>
              </div>

              <div className="mt-4 space-y-2">
                <p className="text-xs font-semibold text-gray-500 uppercase">Payment</p>
                <div className="flex gap-2">
                  {['Cash', 'UPI', 'Card'].map(m => (
                    <button key={m} className="flex-1 py-2 border border-gray-200 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 hover:border-blue-300">{m}</button>
                  ))}
                </div>
              </div>

              <button onClick={generateBill}
                className="w-full mt-4 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-xl hover:shadow-lg transition-all">
                Generate Bill
              </button>
            </>
          )}
        </div>
      </div>

      {showSuccess && (
        <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4" onClick={() => setShowSuccess(false)}>
          <div className="bg-white rounded-2xl p-8 max-w-sm w-full text-center shadow-xl" onClick={e => e.stopPropagation()}>
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="w-10 h-10 text-green-600" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">Bill Generated!</h3>
            <p className="text-sm text-gray-500 mb-1">Order total: ₹{total.toLocaleString()}</p>
            <p className="text-sm text-gray-500">Items: {billItems.length}</p>
          </div>
        </div>
      )}
    </div>
  );
}
