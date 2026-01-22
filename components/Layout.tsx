import React from 'react';
import { Outlet, NavLink, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Swords, 
  Wallet, 
  UserCircle, 
  LogOut, 
  Menu,
  X,
  TrendingUp
} from 'lucide-react';
import { useApp } from '../App';
import { CURRENCY_SYMBOL } from '../constants';

const Layout: React.FC = () => {
  const { user } = useApp();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);
  const location = useLocation();

  const navItems = [
    { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { name: 'Lobby', path: '/lobby', icon: Swords },
    { name: 'Wallet', path: '/wallet', icon: Wallet },
    { name: 'Profile', path: '/profile', icon: UserCircle },
  ];

  return (
    <div className="min-h-screen bg-dark-950 text-slate-100 flex font-sans">
      
      {/* Sidebar (Desktop) */}
      <aside className="hidden md:flex flex-col w-64 bg-dark-900 border-r border-slate-800 sticky top-0 h-screen">
        <div className="p-6 border-b border-slate-800 flex items-center gap-2">
          <TrendingUp className="text-brand-500 w-8 h-8" />
          <h1 className="text-2xl font-bold tracking-tight text-white">FPL Duel</h1>
        </div>

        <nav className="flex-1 p-4 space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <NavLink
                key={item.path}
                to={item.path}
                className={({ isActive }) => `
                  flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200
                  ${isActive 
                    ? 'bg-brand-500/10 text-brand-400 border border-brand-500/20' 
                    : 'text-slate-400 hover:bg-slate-800 hover:text-white'}
                `}
              >
                <Icon size={20} />
                <span className="font-medium">{item.name}</span>
              </NavLink>
            );
          })}
        </nav>

        {/* User Balance Snippet */}
        <div className="p-4 bg-slate-900/50 mt-auto border-t border-slate-800">
          <div className="bg-slate-800 rounded-lg p-3">
            <p className="text-xs text-slate-400 uppercase font-semibold mb-1">Available Balance</p>
            <p className="text-xl font-bold text-white font-mono">
              {CURRENCY_SYMBOL}{user?.wallet.available.toFixed(2)}
            </p>
          </div>
          <button className="flex items-center gap-2 mt-4 text-slate-500 hover:text-white transition-colors w-full px-2">
             <LogOut size={16} />
             <span className="text-sm">Sign Out</span>
          </button>
        </div>
      </aside>

      {/* Mobile Header & Content */}
      <div className="flex-1 flex flex-col min-w-0">
        <header className="md:hidden bg-dark-900 border-b border-slate-800 p-4 flex justify-between items-center sticky top-0 z-50">
           <div className="flex items-center gap-2">
              <TrendingUp className="text-brand-500 w-6 h-6" />
              <span className="font-bold text-lg">FPL Duel</span>
           </div>
           <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
             {isMobileMenuOpen ? <X /> : <Menu />}
           </button>
        </header>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden fixed inset-0 top-16 bg-dark-900 z-40 p-4">
            <nav className="space-y-4">
              {navItems.map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={({ isActive }) => `
                    flex items-center gap-3 px-4 py-3 rounded-xl block
                    ${isActive ? 'bg-brand-500/10 text-brand-400' : 'text-slate-400'}
                  `}
                >
                  <item.icon size={20} />
                  <span className="font-medium">{item.name}</span>
                </NavLink>
              ))}
            </nav>
          </div>
        )}

        <main className="flex-1 overflow-auto bg-dark-950 p-4 md:p-8">
          <div className="max-w-5xl mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default Layout;