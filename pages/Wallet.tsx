import React from 'react';
import { useApp } from '../App';
import { CURRENCY_SYMBOL } from '../constants';
import { CreditCard, Lock, History, ArrowDownLeft, ArrowUpRight } from 'lucide-react';

const Wallet: React.FC = () => {
  const { user } = useApp();

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <h2 className="text-3xl font-bold text-white">Wallet</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Available Balance */}
        <div className="bg-gradient-to-br from-brand-900 to-dark-900 border border-brand-500/30 rounded-xl p-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-32 bg-brand-500/10 rounded-full blur-3xl -mr-16 -mt-16"></div>
          <p className="text-brand-200 font-medium mb-1">Available Funds</p>
          <h3 className="text-4xl font-bold text-white font-mono mb-6">{CURRENCY_SYMBOL}{user?.wallet.available.toFixed(2)}</h3>
          
          <div className="flex gap-3">
            <button className="flex-1 bg-brand-600 hover:bg-brand-500 text-white py-2 rounded-lg font-medium transition-colors">
              Deposit
            </button>
            <button className="flex-1 bg-slate-700 hover:bg-slate-600 text-white py-2 rounded-lg font-medium transition-colors">
              Withdraw
            </button>
          </div>
        </div>

        {/* Locked Balance */}
        <div className="bg-dark-900 border border-slate-800 rounded-xl p-6 flex flex-col justify-between">
           <div>
             <div className="flex items-center gap-2 mb-1 text-slate-400">
               <Lock size={16} />
               <span className="font-medium">Locked in Duels</span>
             </div>
             <h3 className="text-4xl font-bold text-slate-200 font-mono">{CURRENCY_SYMBOL}{user?.wallet.locked.toFixed(2)}</h3>
           </div>
           <p className="text-sm text-slate-500 mt-4">
             These funds are currently active in wagers and cannot be withdrawn until the gameweek is settled.
           </p>
        </div>
      </div>

      {/* Transaction History */}
      <div className="bg-dark-900 border border-slate-800 rounded-xl p-6">
        <div className="flex items-center gap-2 mb-6">
          <History size={20} className="text-slate-400" />
          <h3 className="text-lg font-bold text-white">Recent Transactions</h3>
        </div>

        <div className="space-y-4">
          {/* Mock Transactions */}
          <div className="flex justify-between items-center py-3 border-b border-slate-800 last:border-0">
             <div className="flex items-center gap-4">
               <div className="bg-red-500/10 p-2 rounded-lg">
                 <ArrowUpRight className="text-red-400" size={20} />
               </div>
               <div>
                 <p className="text-white font-medium">Duel Entry Stake (GW24)</p>
                 <p className="text-xs text-slate-500">Feb 12, 14:30</p>
               </div>
             </div>
             <span className="font-mono font-bold text-white">-${50.00}</span>
          </div>

          <div className="flex justify-between items-center py-3 border-b border-slate-800 last:border-0">
             <div className="flex items-center gap-4">
               <div className="bg-emerald-500/10 p-2 rounded-lg">
                 <ArrowDownLeft className="text-emerald-400" size={20} />
               </div>
               <div>
                 <p className="text-white font-medium">Duel Winnings (GW23)</p>
                 <p className="text-xs text-slate-500">Feb 05, 21:00</p>
               </div>
             </div>
             <span className="font-mono font-bold text-emerald-400">+$90.00</span>
          </div>

          <div className="flex justify-between items-center py-3 border-b border-slate-800 last:border-0">
             <div className="flex items-center gap-4">
               <div className="bg-slate-700/30 p-2 rounded-lg">
                 <CreditCard className="text-slate-400" size={20} />
               </div>
               <div>
                 <p className="text-white font-medium">Deposit</p>
                 <p className="text-xs text-slate-500">Feb 01, 09:15</p>
               </div>
             </div>
             <span className="font-mono font-bold text-white">+$200.00</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Wallet;