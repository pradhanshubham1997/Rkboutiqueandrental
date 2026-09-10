import { useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { TrendingUp, ShoppingCart, AlertTriangle, RotateCcw } from 'lucide-react';
import { monthlySalesData, topSellingProducts, mostRentedProducts, inventoryItems, rentalBookings } from '../data/mockData';

const tabs = ['Retail Reports', 'Inventory Reports', 'Rental Reports'];
const COLORS = ['#3b82f6', '#a855f7', '#10b981', '#f59e0b', '#ef4444'];

export default function Reports() {
  const [activeTab, setActiveTab] = useState('Retail Reports');

  const retailStats = [
    { label: 'Total Sales', value: '₹28,45,000', icon: TrendingUp, color: 'text-green-600' },
    { label: 'Orders', value: '342', icon: ShoppingCart, color: 'text-blue-600' },
    { label: 'Avg Order Value', value: '₹8,317', icon: TrendingUp, color: 'text-purple-600' },
  ];

  const inventoryStats = [
    { label: 'Stock Value', value: '₹12,45,000', color: 'text-gray-900' },
    { label: 'Low Stock Items', value: inventoryItems.filter(i => i.status === 'Low Stock').length, color: 'text-amber-600' },
    { label: 'Out of Stock', value: inventoryItems.filter(i => i.status === 'Out of Stock').length, color: 'text-red-600' },
  ];

  const rentalStats = [
    { label: 'Rental Revenue', value: '₹1,85,000', icon: TrendingUp, color: 'text-purple-600' },
    { label: 'Active Rentals', value: rentalBookings.filter(b => b.status === 'active').length.toString(), icon: RotateCcw, color: 'text-blue-600' },
    { label: 'Overdue', value: rentalBookings.filter(b => b.status === 'overdue').length.toString(), icon: AlertTriangle, color: 'text-red-600' },
    { label: 'Deposits Held', value: '₹68,500', color: 'text-green-600' },
  ];

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-bold text-gray-900">Reports</h2>

      <div className="flex gap-1 overflow-x-auto pb-1">
        {tabs.map(tab => (
          <button key={tab} onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap ${activeTab === tab ? 'bg-blue-600 text-white' : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50'}`}>
            {tab}
          </button>
        ))}
      </div>

      {activeTab === 'Retail Reports' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {retailStats.map(s => (
              <div key={s.label} className="bg-white rounded-xl border border-gray-200 p-5">
                <p className="text-sm text-gray-500 mb-1">{s.label}</p>
                <p className={`text-2xl font-bold ${s.color}`}>{s.value}</p>
              </div>
            ))}
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-5">
            <h3 className="font-semibold text-gray-900 mb-4">Monthly Sales Trend</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={monthlySalesData}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="month" tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} tickFormatter={v => `₹${(v / 1000).toFixed(0)}K`} />
                <Tooltip formatter={(v: unknown) => `₹${Number(v).toLocaleString()}`} />
                <Bar dataKey="sales" fill="#3b82f6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-white rounded-xl border border-gray-200 p-5">
            <h3 className="font-semibold text-gray-900 mb-4">Best Selling Products</h3>
            <div className="space-y-3">
                {topSellingProducts.map((p, idx) => (
                  <div key={p.name} className="flex items-center gap-4">
                    <div className="w-8 h-8 rounded-lg flex items-center justify-center text-sm font-bold text-white" style={{ background: COLORS[idx] }}>{idx + 1}</div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900">{p.name}</p>
                    <div className="mt-1 h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div className="h-full bg-blue-500 rounded-full" style={{ width: `${(p.sold / topSellingProducts[0].sold) * 100}%` }} />
                    </div>
                  </div>
                  <span className="text-sm font-semibold text-gray-600">{p.sold} sold</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeTab === 'Inventory Reports' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {inventoryStats.map(s => (
              <div key={s.label} className="bg-white rounded-xl border border-gray-200 p-5">
                <p className="text-sm text-gray-500 mb-1">{s.label}</p>
                <p className={`text-2xl font-bold ${s.color}`}>{s.value}</p>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white rounded-xl border border-gray-200 p-5">
              <h3 className="font-semibold text-gray-900 mb-4">Stock Distribution</h3>
              <ResponsiveContainer width="100%" height={250}>
                <PieChart>
                  <Pie data={[
                    { name: 'Available', value: inventoryItems.reduce((a, b) => a + b.available, 0) },
                    { name: 'Sold', value: inventoryItems.reduce((a, b) => a + b.sold, 0) },
                    { name: 'Rented', value: inventoryItems.reduce((a, b) => a + b.rented, 0) },
                  ]} dataKey="value" cx="50%" cy="50%" outerRadius={80}                   label={({ name, percent }: { name?: string; percent?: number }) => `${name ?? ''} ${((percent ?? 0) * 100).toFixed(0)}%`}>
                    <Cell fill="#10b981" />
                    <Cell fill="#3b82f6" />
                    <Cell fill="#a855f7" />
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>

            <div className="bg-white rounded-xl border border-gray-200 p-5">
              <h3 className="font-semibold text-gray-900 mb-4">Fast Moving Products</h3>
              <div className="space-y-3">
                {topSellingProducts.map((p) => (
                  <div key={p.name} className="flex items-center justify-between py-2 border-b border-gray-50 last:border-0">
                    <span className="text-sm text-gray-700">{p.name}</span>
                    <span className="text-sm font-semibold text-green-600">{p.sold} units</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'Rental Reports' && (
        <div className="space-y-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {rentalStats.map(s => (
              <div key={s.label} className="bg-white rounded-xl border border-gray-200 p-5">
                <p className="text-sm text-gray-500 mb-1">{s.label}</p>
                <p className={`text-2xl font-bold ${s.color}`}>{s.value}</p>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-white rounded-xl border border-gray-200 p-5">
              <h3 className="font-semibold text-gray-900 mb-4">Most Rented Products</h3>
              <ResponsiveContainer width="100%" height={280}>
                <BarChart data={mostRentedProducts} layout="vertical">
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis type="number" tick={{ fontSize: 12 }} />
                  <YAxis dataKey="name" type="category" width={150} tick={{ fontSize: 11 }} />
                  <Tooltip />
                  <Bar dataKey="rented" fill="#a855f7" radius={[0, 4, 4, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="bg-white rounded-xl border border-gray-200 p-5">
              <h3 className="font-semibold text-gray-900 mb-4">Rental Status Summary</h3>
              <div className="space-y-4">
                {[
                  { label: 'Reserved', value: rentalBookings.filter(b => b.status === 'reserved').length, color: 'bg-blue-500' },
                  { label: 'Active', value: rentalBookings.filter(b => b.status === 'active').length, color: 'bg-green-500' },
                  { label: 'Due Today', value: rentalBookings.filter(b => b.status === 'due_today').length, color: 'bg-amber-500' },
                  { label: 'Overdue', value: rentalBookings.filter(b => b.status === 'overdue').length, color: 'bg-red-500' },
                  { label: 'Returned', value: rentalBookings.filter(b => b.status === 'returned').length, color: 'bg-gray-400' },
                ].map(s => (
                  <div key={s.label} className="flex items-center gap-3">
                    <div className={`w-3 h-3 rounded-full ${s.color}`} />
                    <span className="text-sm text-gray-700 flex-1">{s.label}</span>
                    <span className="text-sm font-bold text-gray-900">{s.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
