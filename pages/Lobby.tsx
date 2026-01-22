import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ShieldCheck, 
  Clock, 
  Users, 
  AlertTriangle,
  Lock,
  Search
} from 'lucide-react';
import { useApp } from '../App';
import { CURRENCY_SYMBOL, PLATFORM_FEE_PERCENT, NEXT_DEADLINE, CURRENT_GAMEWEEK } from '../constants';
import { fplService } from '../services/fplService';

const Lobby: React.FC = () => {
  const { user, updateBalance } = useApp();
  const navigate = useNavigate();
  
  const [selectedStake, setSelectedStake] = useState<number | null>(null);
  const [isMatching, setIsMatching] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const STAKE_TIERS = [5, 10, 25, 50, 100];

  const handleFindMatch = async () => {
    if (!selectedStake) return;
    if (user && user.wallet.available < selectedStake) {
      setError("Insufficient funds. Please deposit to continue.");
      return;
    }
    
    setError(null);
    setIsMatching(true);

    try {
      // Simulate funds locking
      updateBalance(selectedStake, 'LOCK');
      
      // Simulate API call delay
      await fplService.findOpponent(50000); 
      
      // Navigate to the "matched/live" duel view (using a mock ID)
      navigate('/duel/new-match-123');
    } catch (e) {
      setError("Failed to find opponent. Please try again.");
      setIsMatching(false);
      updateBalance(selectedStake, 'UNLOCK'); // Refund lock on failure
    }
  };

  const calculatePot = (stake: number) => {
    const total = stake * 2;
    const fee = total * PLATFORM_FEE_PERCENT;
    return total - fee;
  };

  if (isMatching) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] text-center space-y-6 animate-fade-in">
        <div className="relative">
          <div className="w-24 h-24 border-4 border-slate-700 border-t-brand-500 rounded-full animate-spin"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <Users className="text-slate-500 animate-pulse" size={32} />
          </div>
        </div>
        <div>
          <h2 className="text-2xl font-bold text-white mb-2">Finding Opponent...</h2>
          <p className="text-slate-400 max-w-md mx-auto">
            Matching you with a player of similar FPL rank and history. 
            Estimated time: 12s
          </p>
        </div>
        <div className="bg-slate-800/50 p-4 rounded-lg border border-slate-700 max-w-sm w-full">
           <div className="flex justify-between text-sm mb-2">
             <span className="text-slate-400">Stake Locked</span>
             <span className="text-white font-mono">{CURRENCY_SYMBOL}{selectedStake}</span>
           </div>
           <div className="flex justify-between text-sm">
             <span className="text-slate-400">Searching Range</span>
             <span className="text-brand-400">Rank ± 50k</span>
           </div>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-white mb-2">Enter the Arena</h2>
        <p className="text-slate-400">Select your stake for Gameweek {CURRENT_GAMEWEEK}. Anonymous matching active.</p>
      </div>

      {/* Gameweek Info */}
      <div className="bg-brand-900/20 border border-brand-500/30 rounded-xl p-6 flex items-start gap-4">
        <Clock className="text-brand-400 flex-shrink-0 mt-1" />
        <div>
          <h3 className="text-brand-100 font-semibold">Deadline Approaching</h3>
          <p className="text-brand-200/70 text-sm mt-1">
            Teams lock automatically on <strong>{new Date(NEXT_DEADLINE).toLocaleDateString()}</strong> at <strong>{new Date(NEXT_DEADLINE).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</strong>.
            Matches confirmed before this time cannot be cancelled.
          </p>
        </div>
      </div>

      {/* Stake Selection */}
      <div className="space-y-4">
        <label className="text-sm font-medium text-slate-300 ml-1">Select Stake Amount</label>
        <div className="grid grid-cols-3 md:grid-cols-5 gap-4">
          {STAKE_TIERS.map((amount) => (
            <button
              key={amount}
              onClick={() => {
                setSelectedStake(amount);
                setError(null);
              }}
              className={`
                relative p-4 rounded-xl border-2 transition-all duration-200 text-center
                ${selectedStake === amount 
                  ? 'bg-brand-600/20 border-brand-500 shadow-[0_0_20px_rgba(16,185,129,0.2)]' 
                  : 'bg-dark-900 border-slate-700 hover:border-slate-500 hover:bg-slate-800'}
              `}
            >
              <div className="text-2xl font-bold text-white mb-1">{CURRENCY_SYMBOL}{amount}</div>
              <div className="text-xs text-slate-400">Win {CURRENCY_SYMBOL}{calculatePot(amount)}</div>
              {selectedStake === amount && (
                <div className="absolute -top-3 -right-3 bg-brand-500 text-dark-950 rounded-full p-1">
                  <ShieldCheck size={16} />
                </div>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Summary & Action */}
      <div className="bg-dark-900 border border-slate-800 rounded-xl p-6 space-y-4">
        <div className="flex justify-between items-center py-2 border-b border-slate-800">
          <span className="text-slate-400">Entry Fee</span>
          <span className="text-white font-mono">
            {selectedStake ? `${CURRENCY_SYMBOL}${selectedStake}.00` : '-'}
          </span>
        </div>
        <div className="flex justify-between items-center py-2 border-b border-slate-800">
          <span className="text-slate-400">Potential Winnings (after 10% fee)</span>
          <span className={`font-mono font-bold ${selectedStake ? 'text-emerald-400' : 'text-slate-600'}`}>
             {selectedStake ? `${CURRENCY_SYMBOL}${calculatePot(selectedStake).toFixed(2)}` : '-'}
          </span>
        </div>
        
        {error && (
          <div className="bg-red-500/10 border border-red-500/50 rounded-lg p-3 flex items-center gap-3 text-red-400 text-sm">
            <AlertTriangle size={16} />
            {error}
          </div>
        )}

        <button
          disabled={!selectedStake}
          onClick={handleFindMatch}
          className={`
            w-full py-4 rounded-lg font-bold text-lg flex items-center justify-center gap-2 transition-all
            ${selectedStake 
              ? 'bg-brand-600 hover:bg-brand-500 text-white shadow-lg shadow-brand-900/20' 
              : 'bg-slate-800 text-slate-500 cursor-not-allowed'}
          `}
        >
          {selectedStake ? <><Search size={20} /> Find Opponent</> : 'Select Stake to Continue'}
        </button>
        
        <div className="flex items-center justify-center gap-2 text-xs text-slate-500 mt-4">
          <Lock size={12} />
          <span>Funds are securely locked upon matching. Fair play guaranteed.</span>
        </div>
      </div>
    </div>
  );
};

export default Lobby;