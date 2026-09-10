import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { TrendingUp, ShoppingCart, Package, AlertTriangle, Clock, IndianRupee, Eye } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useApp } from '../context/AppContext';
import { weeklySalesData } from '../data/mockData';

export default function Dashboard() {
  const { orders, invoices } = useApp();
  const recentOrders = orders.slice(0, 6);

  const totalSales = orders.reduce((a, o) => a + o.total, 0);
  const retailSales = orders.filter(o => o.orderType === 'retail').reduce((a, o) => a + o.total, 0);
  const rentalRevenue = orders.filter(o => o.orderType === 'rental' || o.orderType === 'mixed').reduce((a, o) => a + o.rentalCharges, 0);
  const pendingOrders = orders.filter(o => ['pending', 'confirmed', 'preparing'].includes(o.orderStatus)).length;
  const activeRentals = orders.filter(o => o.orderStatus === 'rental_active').length;
  const lowStock = 3;
  const pendingPayments = orders.filter(o => o.paymentStatus === 'unpaid' || o.paymentStatus === 'partial').reduce((a, o) => a + o.total, 0);

  const statCards = [
    { label: "Today's Sales", value: `₹${totalSales.toLocaleString()}`, icon: IndianRupee, color: 'bg-green-50 text-green-700', border: 'border-green-200' },
    { label: 'Retail Sales', value: `₹${retailSales.toLocaleString()}`, icon: ShoppingCart, color: 'bg-blue-50 text-blue-700', border: 'border-blue-200' },
    { label: 'Rental Revenue', value: `₹${rentalRevenue.toLocaleString()}`, icon: TrendingUp, color: 'bg-purple-50 text-purple-700', border: 'border-purple-200' },
    { label: 'Pending Orders', value: pendingOrders.toString(), icon: Package, color: 'bg-amber-50 text-amber-700', border: 'border-amber-200' },
    { label: 'Active Rentals', value: activeRentals.toString(), icon: Clock, color: 'bg-cyan-50 text-cyan-700', border: 'border-cyan-200' },
    { label: 'Low Stock', value: lowStock.toString(), icon: AlertTriangle, color: 'bg-red-50 text-red-700', border: 'border-red-200' },
    { label: 'Pending Payments', value: `₹${pendingPayments.toLocaleString()}`, icon: IndianRupee, color: 'bg-orange-50 text-orange-700', border: 'border-orange-200' },
    { label: 'Invoices', value: invoices.length.toString(), icon: Package, color: 'bg-indigo-50 text-indigo-700', border: 'border-indigo-200' },
  ];

  const statusColor: Record<string, string> = {
    paid: 'bg-green-100 text-green-700', confirmed: 'bg-blue-100 text-blue-700',
    preparing: 'bg-amber-100 text-amber-700', delivered: 'bg-green-100 text-green-700',
    pending: 'bg-gray-100 text-gray-700', cancelled: 'bg-red-100 text-red-700',
    rental_active: 'bg-purple-100 text-purple-700', ready: 'bg-teal-100 text-teal-700',
    ready_for_pickup: 'bg-teal-100 text-teal-700', out_for_delivery: 'bg-blue-100 text-blue-700',
    completed: 'bg-green-100 text-green-700', return_pending: 'bg-amber-100 text-amber-700', returned: 'bg-gray-100 text-gray-600',
  };

  const typeColors: Record<string, string> = {
    retail: 'bg-blue-50 text-blue-700', rental: 'bg-purple-50 text-purple-700', mixed: 'bg-emerald-50 text-emerald-700',
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map(card => (
          <div key={card.label} className={`bg-white rounded-xl border ${card.border} p-4 hover:shadow-sm transition-shadow`}>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-medium text-gray-500 mb-1">{card.label}</p>
                <p className="text-xl font-bold text-gray-900">{card.value}</p>
              </div>
              <div className={`w-10 h-10 rounded-lg ${card.color} flex items-center justify-center`}>
                <card.icon className="w-5 h-5" />
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-xl border border-gray-200 p-5">
          <h3 className="font-semibold text-gray-900 mb-4">Sales Overview</h3>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={weeklySalesData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis dataKey="day" tick={{ fontSize: 12 }} />
              <YAxis tick={{ fontSize: 12 }} />
              <Tooltip formatter={(v: unknown) => `₹${Number(v).toLocaleString()}`} />
              <Bar dataKey="retail" fill="#3b82f6" radius={[4, 4, 0, 0]} name="Retail" />
              <Bar dataKey="rental" fill="#a855f7" radius={[4, 4, 0, 0]} name="Rental" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white rounded-xl border border-gray-200 p-5">
          <h3 className="font-semibold text-gray-900 mb-4">Quick Stats</h3>
          <div className="space-y-3">
            {[
              { label: 'Total Orders', value: orders.length, color: 'text-gray-900' },
              { label: 'Retail Orders', value: orders.filter(o => o.orderType === 'retail').length, color: 'text-blue-600' },
              { label: 'Rental Orders', value: orders.filter(o => o.orderType === 'rental').length, color: 'text-purple-600' },
              { label: 'Mixed Orders', value: orders.filter(o => o.orderType === 'mixed').length, color: 'text-emerald-600' },
            ].map(s => (
              <div key={s.label} className="flex items-center justify-between py-2 border-b border-gray-50 last:border-0">
                <span className="text-sm text-gray-600">{s.label}</span>
                <span className={`text-lg font-bold ${s.color}`}>{s.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-200 p-5">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-semibold text-gray-900">Recent Orders</h3>
          <Link to="/orders" className="text-xs font-medium text-blue-600 hover:text-blue-700">View All</Link>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-100">
                <th className="text-left py-3 px-3 text-xs font-semibold text-gray-500 uppercase">Order</th>
                <th className="text-left py-3 px-3 text-xs font-semibold text-gray-500 uppercase">Customer</th>
                <th className="text-center py-3 px-3 text-xs font-semibold text-gray-500 uppercase">Type</th>
                <th className="text-center py-3 px-3 text-xs font-semibold text-gray-500 uppercase">Items</th>
                <th className="text-right py-3 px-3 text-xs font-semibold text-gray-500 uppercase">Amount</th>
                <th className="text-center py-3 px-3 text-xs font-semibold text-gray-500 uppercase">Payment</th>
                <th className="text-center py-3 px-3 text-xs font-semibold text-gray-500 uppercase">Status</th>
                <th className="text-left py-3 px-3 text-xs font-semibold text-gray-500 uppercase">Date</th>
                <th className="w-10"></th>
              </tr>
            </thead>
            <tbody>
              {recentOrders.map(order => (
                <tr key={order.id} className="border-b border-gray-50 hover:bg-gray-50">
                  <td className="py-3 px-3 font-medium text-gray-900">{order.id}</td>
                  <td className="py-3 px-3 text-gray-600">{order.customerName}</td>
                  <td className="py-3 px-3 text-center">
                    <span className={`inline-flex px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${typeColors[order.orderType]}`}>{order.orderType}</span>
                  </td>
                  <td className="py-3 px-3 text-center text-gray-600">{order.items.length}</td>
                  <td className="py-3 px-3 text-right font-medium text-gray-900">₹{order.total.toLocaleString()}</td>
                  <td className="py-3 px-3 text-center">
                    <span className={`inline-flex px-2 py-0.5 rounded-full text-[10px] font-semibold ${order.paymentStatus === 'paid' ? 'bg-green-100 text-green-700' : order.paymentStatus === 'partial' ? 'bg-amber-100 text-amber-700' : 'bg-red-100 text-red-700'}`}>{order.paymentStatus}</span>
                  </td>
                  <td className="py-3 px-3 text-center">
                    <span className={`inline-flex px-2 py-0.5 rounded-full text-[10px] font-semibold capitalize ${statusColor[order.orderStatus] || 'bg-gray-100 text-gray-700'}`}>{order.orderStatus.replace(/_/g, ' ')}</span>
                  </td>
                  <td className="py-3 px-3 text-gray-500 text-xs">{order.date}</td>
                  <td className="py-3 px-3"><Link to="/orders" className="text-gray-400 hover:text-gray-600"><Eye className="w-4 h-4" /></Link></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
