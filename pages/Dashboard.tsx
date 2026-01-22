import React from 'react';
import { 
  TrendingUp, 
  Swords, 
  History,
  AlertCircle,
  ArrowUpRight,
  ArrowRight
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import { useApp } from '../App';
import { CURRENCY_SYMBOL } from '../constants';

const Dashboard: React.FC = () => {
  const { user } = useApp();

  // Mock chart data
  const data = [
    { name: 'GW20', profit: 0 },
    { name: 'GW21', profit: 50 },
    { name: 'GW22', profit: 30 },
    { name: 'GW23', profit: 90 },
    { name: 'GW24', profit: 140 },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold text-white">Dashboard</h2>
          <p className="text-slate-400">Welcome back, {user?.username}.</p>
        </div>
        <Link 
          to="/lobby"
          className="bg-brand-600 hover:bg-brand-500 text-white px-6 py-3 rounded-lg font-semibold flex items-center gap-2 shadow-lg shadow-brand-900/20 transition-all hover:translate-y-[-2px]"
        >
          <Swords size={20} />
          New Duel
        </Link>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-dark-900 border border-slate-800 rounded-xl p-6">
          <div className="flex justify-between items-start mb-4">
            <div className="p-3 bg-emerald-500/10 rounded-lg">
              <TrendingUp className="text-emerald-400 w-6 h-6" />
            </div>
            <span className="text-emerald-400 text-sm font-medium bg-emerald-500/10 px-2 py-1 rounded">+12%</span>
          </div>
          <p className="text-slate-400 text-sm font-medium">Net Profit</p>
          <h3 className="text-3xl font-bold text-white mt-1">{CURRENCY_SYMBOL}340.00</h3>
        </div>

        <div className="bg-dark-900 border border-slate-800 rounded-xl p-6">
          <div className="flex justify-between items-start mb-4">
            <div className="p-3 bg-blue-500/10 rounded-lg">
              <Swords className="text-blue-400 w-6 h-6" />
            </div>
          </div>
          <p className="text-slate-400 text-sm font-medium">Win Rate</p>
          <h3 className="text-3xl font-bold text-white mt-1">68%</h3>
          <p className="text-xs text-slate-500 mt-2">Last 20 Duels</p>
        </div>

        <div className="bg-dark-900 border border-slate-800 rounded-xl p-6">
          <div className="flex justify-between items-start mb-4">
            <div className="p-3 bg-purple-500/10 rounded-lg">
              <History className="text-purple-400 w-6 h-6" />
            </div>
          </div>
          <p className="text-slate-400 text-sm font-medium">Total Duels</p>
          <h3 className="text-3xl font-bold text-white mt-1">42</h3>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Performance Chart */}
        <div className="lg:col-span-2 bg-dark-900 border border-slate-800 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-white mb-6">Performance History</h3>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="colorProfit" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                <XAxis 
                  dataKey="name" 
                  stroke="#475569" 
                  tick={{fill: '#94a3b8', fontSize: 12}} 
                  tickLine={false}
                  axisLine={false}
                />
                <YAxis 
                  stroke="#475569" 
                  tick={{fill: '#94a3b8', fontSize: 12}} 
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(value) => `${CURRENCY_SYMBOL}${value}`}
                />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '8px' }}
                  itemStyle={{ color: '#fff' }}
                />
                <Area 
                  type="monotone" 
                  dataKey="profit" 
                  stroke="#10b981" 
                  strokeWidth={2}
                  fillOpacity={1} 
                  fill="url(#colorProfit)" 
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Active/Recent Duels */}
        <div className="bg-dark-900 border border-slate-800 rounded-xl p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Active & Pending</h3>
          
          <div className="space-y-4">
            {/* Active Duel Card */}
            <div className="bg-gradient-to-br from-slate-800 to-slate-800/50 rounded-lg p-4 border border-brand-500/30 relative overflow-hidden group">
               <div className="absolute top-0 right-0 p-2">
                 <span className="flex h-2 w-2 relative">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
                 </span>
               </div>
               <div className="flex justify-between items-center mb-2">
                 <span className="text-xs font-bold text-brand-400 uppercase tracking-wider">Live Now</span>
                 <span className="text-xs text-slate-400">GW24</span>
               </div>
               <div className="flex justify-between items-center mb-4">
                 <div>
                   <p className="text-sm text-slate-400">Pot Size</p>
                   <p className="text-xl font-bold text-white">{CURRENCY_SYMBOL}90.00</p>
                 </div>
                 <div className="text-right">
                   <p className="text-sm text-slate-400">Score</p>
                   <p className="text-xl font-mono text-white">
                     <span className="text-brand-400">45</span> - 42
                   </p>
                 </div>
               </div>
               <Link to="/duel/active-1" className="w-full py-2 bg-slate-700 hover:bg-slate-600 rounded text-sm text-center block transition-colors">
                 View Duel
               </Link>
            </div>

            {/* Pending Duel */}
            <div className="bg-slate-800/50 rounded-lg p-4 border border-slate-700">
               <div className="flex justify-between items-center mb-2">
                 <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Settled</span>
                 <span className="text-xs text-green-400">Won</span>
               </div>
               <div className="flex justify-between items-center">
                 <div>
                   <p className="text-sm text-slate-300">Vs. Hidden</p>
                   <p className="text-xs text-slate-500">GW23</p>
                 </div>
                 <span className="font-mono text-green-400">+{CURRENCY_SYMBOL}45.00</span>
               </div>
            </div>
          </div>
          
          <Link to="/lobby" className="flex items-center gap-1 text-sm text-brand-400 hover:text-brand-300 mt-4 font-medium">
            View all history <ArrowRight size={16} />
          </Link>
        </div>

      </div>
    </div>
  );
};

export default Dashboard;