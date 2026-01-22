import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Duel, DuelStatus, FPLPlayer } from '../types';
import { fplService } from '../services/fplService';
import { 
  Trophy, 
  Timer, 
  Shield, 
  User, 
  AlertCircle
} from 'lucide-react';

const PlayerRow: React.FC<{ player: FPLPlayer; isOpponent?: boolean }> = ({ player, isOpponent }) => {
  // Determine text color based on points (heat map style logic simplified)
  const pointColor = player.livePoints > 8 ? 'text-emerald-400' : player.livePoints > 3 ? 'text-white' : 'text-slate-400';
  
  // Position color mapping for border
  const borderColor = 
    player.position === 'GKP' ? 'border-yellow-600' : 
    player.position === 'DEF' ? 'border-blue-600' : 
    player.position === 'MID' ? 'border-emerald-600' : 'border-red-600';

  return (
    <div className={`flex items-center justify-between py-3 border-b border-slate-800/50 ${isOpponent ? 'flex-row-reverse' : ''}`}>
      <div className={`flex items-center gap-3 ${isOpponent ? 'flex-row-reverse text-right' : ''}`}>
        <div className={`relative w-10 h-10 rounded-full overflow-hidden border-2 bg-slate-800 ${borderColor}`}>
          <img 
            src={player.image} 
            alt={player.name} 
            className="w-full h-full object-cover"
            onError={(e) => {
              (e.target as HTMLImageElement).src = 'https://resources.premierleague.com/premierleague/photos/players/110x140/Photo-Missing.png';
            }}
          />
        </div>
        <div>
           <p className="text-sm font-medium text-white">{player.name}</p>
           <p className="text-xs text-slate-500">{player.teamShort}</p>
        </div>
      </div>
      
      <div className={`flex flex-col ${isOpponent ? 'items-start' : 'items-end'}`}>
        <span className={`font-mono font-bold text-lg ${pointColor}`}>{player.livePoints}</span>
        {player.events.length > 0 && (
          <div className="flex gap-1">
            {player.events.map((e, idx) => (
               <span key={idx} className="text-[10px] px-1 bg-slate-700 rounded text-slate-300">{e.type}</span>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

const LiveDuel: React.FC = () => {
  const { id } = useParams();
  const [duel, setDuel] = useState<Duel | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Load duel data
    fplService.getDuelDetails(id || '').then((data) => {
      setDuel(data);
      setLoading(false);
    });
  }, [id]);

  if (loading) return <div className="text-white p-8">Loading Arena...</div>;
  if (!duel) return <div className="text-white p-8">Duel not found.</div>;

  const scoreDiff = duel.userScore - duel.opponentScore;
  const userWinning = scoreDiff > 0;
  const isTie = scoreDiff === 0;

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      
      {/* Scoreboard Header */}
      <div className="bg-dark-900 border border-slate-700 rounded-2xl p-6 shadow-2xl relative overflow-hidden">
        {/* Background Gradients */}
        <div className={`absolute top-0 left-0 w-1/2 h-1 bg-brand-500 transition-all duration-1000 ${userWinning ? 'opacity-100 shadow-[0_0_20px_rgba(16,185,129,0.5)]' : 'opacity-20'}`}></div>
        <div className={`absolute top-0 right-0 w-1/2 h-1 bg-red-500 transition-all duration-1000 ${!userWinning && !isTie ? 'opacity-100 shadow-[0_0_20px_rgba(239,68,68,0.5)]' : 'opacity-20'}`}></div>

        <div className="flex justify-between items-center relative z-10">
          {/* User Side */}
          <div className="text-left">
             <div className="flex items-center gap-2 mb-1">
               <span className="text-brand-400 text-sm font-bold uppercase tracking-wider">You</span>
               {userWinning && <Trophy size={14} className="text-yellow-400" />}
             </div>
             <h2 className="text-5xl font-mono font-bold text-white tracking-tighter">{duel.userScore}</h2>
             <p className="text-sm text-slate-400">{duel.userTeam.teamName}</p>
          </div>

          {/* Center Status */}
          <div className="flex flex-col items-center">
            <div className="bg-slate-800 px-3 py-1 rounded-full border border-slate-700 flex items-center gap-2 mb-2">
              <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
              <span className="text-xs font-bold text-slate-300 uppercase">Live • GW{duel.gameweek}</span>
            </div>
            <div className={`text-xl font-bold font-mono ${userWinning ? 'text-brand-400' : !isTie ? 'text-red-400' : 'text-slate-400'}`}>
              {isTie ? 'DRAW' : userWinning ? `+${scoreDiff}` : scoreDiff}
            </div>
            <p className="text-xs text-slate-500 mt-1">Pot: ${duel.pot}</p>
          </div>

          {/* Opponent Side */}
          <div className="text-right">
             <div className="flex items-center justify-end gap-2 mb-1">
               {!userWinning && !isTie && <Trophy size={14} className="text-yellow-400" />}
               <span className="text-red-400 text-sm font-bold uppercase tracking-wider">Opponent</span>
             </div>
             <h2 className="text-5xl font-mono font-bold text-white tracking-tighter">{duel.opponentScore}</h2>
             <p className="text-sm text-slate-400">{duel.opponentTeam?.teamName || "Hidden Team"}</p>
          </div>
        </div>
      </div>

      {/* Main Duel Content */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative">
         {/* Vertical Separator for large screens */}
         <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-slate-800 -ml-[0.5px]"></div>

         {/* User Team */}
         <div className="bg-dark-900/50 rounded-xl p-4 border border-slate-800/50">
            <h3 className="text-xs font-bold text-slate-500 uppercase mb-4">Your Squad</h3>
            <div className="space-y-1">
              {duel.userTeam.players.map(p => (
                <PlayerRow key={p.id} player={p} />
              ))}
            </div>
         </div>

         {/* Opponent Team */}
         <div className="bg-dark-900/50 rounded-xl p-4 border border-slate-800/50">
            <h3 className="text-xs font-bold text-slate-500 uppercase mb-4 text-right">Opponent Squad</h3>
            <div className="space-y-1">
              {duel.opponentTeam?.players.map(p => (
                <PlayerRow key={p.id} player={p} isOpponent />
              ))}
            </div>
         </div>
      </div>

      {/* Event Timeline (Placeholder for V1) */}
      <div className="bg-slate-900 rounded-xl p-4 border border-slate-800">
        <div className="flex items-center gap-2 mb-3">
          <Timer size={16} className="text-slate-400" />
          <h3 className="text-sm font-bold text-white">Latest Events</h3>
        </div>
        <div className="space-y-3">
           <div className="flex gap-4 text-sm">
              <span className="font-mono text-slate-500 w-8">88'</span>
              <span className="text-brand-400 font-bold">Goal!</span>
              <span className="text-white">Palmer (You) scores against Crystal Palace (+5)</span>
           </div>
           <div className="flex gap-4 text-sm">
              <span className="font-mono text-slate-500 w-8">54'</span>
              <span className="text-red-400 font-bold">Goal!</span>
              <span className="text-white">Haaland (Opponent) scores against Brentford (+4)</span>
           </div>
        </div>
      </div>

    </div>
  );
};

export default LiveDuel;