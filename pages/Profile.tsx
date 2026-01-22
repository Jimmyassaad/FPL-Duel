import React from 'react';
import { useApp } from '../App';
import { UserCircle, ShieldCheck, Settings } from 'lucide-react';

const Profile: React.FC = () => {
  const { user } = useApp();

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-dark-900 border border-slate-800 rounded-xl overflow-hidden">
        
        <div className="p-8 border-b border-slate-800 flex items-center gap-6">
          <div className="w-20 h-20 bg-slate-700 rounded-full flex items-center justify-center">
            <UserCircle size={40} className="text-slate-400" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-white">{user?.username}</h2>
            <div className="flex items-center gap-2 text-slate-400 text-sm mt-1">
               <ShieldCheck size={14} className="text-brand-500" />
               <span>Identity Verified</span>
            </div>
          </div>
        </div>

        <div className="p-8 space-y-6">
          
          <div>
            <label className="block text-sm font-medium text-slate-400 mb-1">Email Address</label>
            <div className="p-3 bg-slate-800/50 rounded-lg text-white border border-slate-700">
              {user?.email}
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-400 mb-1">Linked FPL Team ID</label>
            <div className="flex gap-2">
              <div className="flex-1 p-3 bg-slate-800/50 rounded-lg text-white border border-slate-700">
                {user?.fplId}
              </div>
              <button className="px-4 py-2 bg-slate-700 hover:bg-slate-600 text-white rounded-lg text-sm transition-colors">
                Refresh
              </button>
            </div>
            <p className="text-xs text-slate-500 mt-2">
              Your FPL team stats update automatically. Ensure your team ID is correct to avoid disqualification.
            </p>
          </div>

          <div className="pt-6 border-t border-slate-800">
             <h3 className="text-white font-bold mb-4 flex items-center gap-2">
               <Settings size={18} /> Preferences
             </h3>
             <div className="space-y-4">
               <div className="flex items-center justify-between">
                 <span className="text-slate-400">Email Notifications</span>
                 <div className="w-10 h-6 bg-brand-600 rounded-full relative cursor-pointer">
                    <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full"></div>
                 </div>
               </div>
               <div className="flex items-center justify-between">
                 <span className="text-slate-400">Anonymity Mode</span>
                 <div className="w-10 h-6 bg-brand-600 rounded-full relative cursor-pointer">
                    <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full"></div>
                 </div>
               </div>
             </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Profile;