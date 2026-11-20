import { useState } from 'react';
import { LayoutDashboard, ShoppingCart, Receipt, Package, ChefHat, Truck, ClipboardList, Menu, X, UtensilsCrossed } from 'lucide-react';
import Dashboard from '@/pages/Dashboard';
import Sales from '@/pages/Sales';
import Expenses from '@/pages/Expenses';
import Inventory from '@/pages/Inventory';
import Recipes from '@/pages/Recipes';
import Suppliers from '@/pages/Suppliers';
import Purchases from '@/pages/Purchases';

const NAV = [
  { id: 'dashboard', label: 'لوحة التحكم', icon: LayoutDashboard },
  { id: 'sales', label: 'المبيعات', icon: ShoppingCart },
  { id: 'expenses', label: 'المصروفات', icon: Receipt },
  { id: 'inventory', label: 'المخزون', icon: Package },
  { id: 'recipes', label: 'الوصفات', icon: ChefHat },
  { id: 'suppliers', label: 'الموردون', icon: Truck },
  { id: 'purchases', label: 'المشتريات', icon: ClipboardList },
] as const;

type PageId = (typeof NAV)[number]['id'];

export default function App() {
  const [page, setPage] = useState<PageId>('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const navigate = (id: PageId) => {
    setPage(id);
    setSidebarOpen(false);
  };

  const sidebar = (
    <div className="flex h-full flex-col">
      <div className="flex items-center gap-3 px-5 py-6">
        <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-600 text-white shadow-lg shadow-emerald-600/30">
          <UtensilsCrossed className="h-5 w-5" />
        </div>
        <div>
          <h1 className="text-lg font-bold text-white">نظام أرباح المطعم</h1>
          <p className="text-xs text-emerald-300/80">إدارة ذكية لمطعمك</p>
        </div>
      </div>
      <nav className="flex-1 space-y-1 px-3 py-2">
        {NAV.map(({ id, label, icon: Icon }) => (
          <button
            key={id}
            onClick={() => navigate(id)}
            className={`flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-semibold transition ${
              page === id
                ? 'bg-emerald-600/20 text-emerald-300 shadow-inner'
                : 'text-slate-400 hover:bg-white/5 hover:text-slate-200'
            }`}
          >
            <Icon className="h-5 w-5" />
            {label}
          </button>
        ))}
      </nav>
      <div className="px-5 py-4 text-xs text-slate-500 border-t border-white/5">
        نظام أرباح المطعم © 2026
      </div>
    </div>
  );

  return (
    <div className="flex min-h-screen bg-slate-50" dir="rtl">
      {/* Desktop sidebar */}
      <aside className="fixed inset-y-0 right-0 z-30 hidden w-64 bg-slate-900 lg:block">{sidebar}</aside>

      {/* Mobile sidebar */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" onClick={() => setSidebarOpen(false)} />
          <aside className="absolute inset-y-0 right-0 w-72 bg-slate-900 shadow-2xl animate-slide-in">{sidebar}</aside>
        </div>
      )}

      <div className="flex min-h-screen flex-1 flex-col lg:mr-64">
        {/* Mobile header */}
        <header className="sticky top-0 z-20 flex items-center justify-between border-b border-slate-100 bg-white/90 px-4 py-3 backdrop-blur lg:hidden">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-600 text-white">
              <UtensilsCrossed className="h-4 w-4" />
            </div>
            <span className="font-bold text-slate-800">نظام أرباح المطعم</span>
          </div>
          <button
            onClick={() => setSidebarOpen(true)}
            className="rounded-lg p-2 text-slate-600 transition hover:bg-slate-100"
          >
            {sidebarOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </header>

        <main className="flex-1 p-4 sm:p-6 lg:p-8">
          {page === 'dashboard' && <Dashboard />}
          {page === 'sales' && <Sales />}
          {page === 'expenses' && <Expenses />}
          {page === 'inventory' && <Inventory />}
          {page === 'recipes' && <Recipes />}
          {page === 'suppliers' && <Suppliers />}
          {page === 'purchases' && <Purchases />}
        </main>
      </div>
    </div>
  );
}
