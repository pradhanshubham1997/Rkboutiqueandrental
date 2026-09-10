import { useState } from 'react';
import { NavLink, Outlet, useLocation, Link } from 'react-router-dom';
import {
  LayoutDashboard, Package, Boxes, ShoppingCart, Receipt, FileText,
  Users, BarChart3, Calendar, RotateCcw, ClipboardList, Menu, X,
  ChevronDown, ChevronRight, Store, RefreshCw, AlertTriangle, ArrowUpRight
} from 'lucide-react';

const sidebarSections = [
  {
    title: 'Overview',
    items: [{ label: 'Dashboard', path: '/dashboard', icon: LayoutDashboard }],
  },
  {
    title: 'Retail',
    items: [
      { label: 'Products', path: '/products', icon: Package },
      { label: 'Inventory', path: '/inventory', icon: Boxes },
      { label: 'Orders', path: '/orders', icon: ShoppingCart },
      { label: 'Billing', path: '/billing', icon: Receipt },
      { label: 'Invoices', path: '/invoices', icon: FileText },
    ],
  },
  {
    title: 'Rental',
    items: [
      { label: 'Rental Inventory', path: '/rental-inventory', icon: Store },
      { label: 'Bookings', path: '/rental-bookings', icon: ClipboardList },
      { label: 'Calendar', path: '/rental-calendar', icon: Calendar },
      { label: 'Active Rentals', path: '/active-rentals', icon: RefreshCw },
      { label: 'Returns', path: '/rental-returns', icon: RotateCcw },
    ],
  },
  {
    title: 'Customers',
    items: [{ label: 'Customers', path: '/customers', icon: Users }],
  },
  {
    title: 'Reports',
    items: [{ label: 'Reports', path: '/reports', icon: BarChart3 }],
  },
];

export default function Layout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    Overview: true, Retail: true, Rental: true, Customers: true, Reports: true,
  });
  const location = useLocation();

  const toggleSection = (title: string) => {
    setExpandedSections(prev => ({ ...prev, [title]: !prev[title] }));
  };

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      {sidebarOpen && (
        <div className="fixed inset-0 bg-black/40 z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />
      )}

      <aside className={`fixed lg:static inset-y-0 left-0 z-50 bg-white border-r border-gray-200 transition-all duration-300 flex flex-col
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}
        ${collapsed ? 'w-16' : 'w-64'}`}>
        <div className="flex items-center justify-between h-16 px-4 border-b border-gray-100">
          {!collapsed && (
            <Link to="/" className="flex items-center gap-2 min-w-0">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-rose-500 to-purple-600 flex items-center justify-center flex-shrink-0">
                <Store className="w-5 h-5 text-white" />
              </div>
              <div className="min-w-0">
                <div className="text-sm font-bold text-gray-900 truncate">RK Boutique</div>
                <div className="text-[10px] text-gray-500 truncate">& Rentals</div>
              </div>
            </Link>
          )}
          {collapsed && (
            <Link to="/" className="w-8 h-8 rounded-lg bg-gradient-to-br from-rose-500 to-purple-600 flex items-center justify-center mx-auto">
              <Store className="w-5 h-5 text-white" />
            </Link>
          )}
          <button onClick={() => setCollapsed(!collapsed)} className="hidden lg:block p-1 hover:bg-gray-100 rounded">
            <ChevronRight className={`w-4 h-4 text-gray-500 transition-transform ${collapsed ? '' : 'rotate-180'}`} />
          </button>
          <button onClick={() => setSidebarOpen(false)} className="lg:hidden p-1 hover:bg-gray-100 rounded">
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto py-3 px-2">
          {sidebarSections.map(section => (
            <div key={section.title} className="mb-2">
              {!collapsed && (
                <button onClick={() => toggleSection(section.title)}
                  className="w-full flex items-center justify-between px-3 py-1.5 text-[11px] font-semibold text-gray-400 uppercase tracking-wider hover:text-gray-600">
                  {section.title}
                  {expandedSections[section.title] ? <ChevronDown className="w-3 h-3" /> : <ChevronRight className="w-3 h-3" />}
                </button>
              )}
              {(collapsed || expandedSections[section.title]) && section.items.map(item => (
                <NavLink key={item.path} to={item.path}
                  className={({ isActive }) => `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all
                    ${isActive ? 'bg-blue-50 text-blue-700' : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'}
                    ${collapsed ? 'justify-center' : ''}`}
                  onClick={() => setSidebarOpen(false)}
                  title={collapsed ? item.label : undefined}>
                  <item.icon className="w-5 h-5 flex-shrink-0" />
                  {!collapsed && <span>{item.label}</span>}
                </NavLink>
              ))}
            </div>
          ))}
        </nav>

        <div className="p-3 border-t border-gray-100 space-y-1">
          <Link to="/"
            className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900"
            onClick={() => setSidebarOpen(false)}>
            <ArrowUpRight className="w-5 h-5 flex-shrink-0" />
            {!collapsed && <span>View Showroom</span>}
          </Link>
        </div>
      </aside>

      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-4 lg:px-6 flex-shrink-0">
          <div className="flex items-center gap-3">
            <button onClick={() => setSidebarOpen(true)} className="lg:hidden p-2 hover:bg-gray-100 rounded-lg">
              <Menu className="w-5 h-5 text-gray-600" />
            </button>
            <div>
              <h1 className="text-lg font-semibold text-gray-900 capitalize">
                {location.pathname.split('/').pop()?.replace(/-/g, ' ') || 'Dashboard'}
              </h1>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold bg-amber-100 text-amber-800 border border-amber-200">
              DEMO MODE
            </span>
            <div className="hidden sm:flex items-center gap-2 text-sm text-gray-500">
              <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-semibold text-xs">RK</div>
              <span className="font-medium">RK Boutique</span>
            </div>
          </div>
        </header>

        <div className="bg-amber-50 border-b border-amber-200 px-4 py-2 text-center text-xs text-amber-800 flex-shrink-0 flex items-center justify-center gap-2">
          <AlertTriangle className="w-3.5 h-3.5" />
          You're viewing a sample business. No real transactions are being processed.
        </div>

        <main className="flex-1 overflow-y-auto">
          <div className="p-4 lg:p-6">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}
