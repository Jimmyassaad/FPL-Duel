import React, { useState, createContext, useContext, useEffect } from 'react';
import { HashRouter, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { User } from './types';
import { MOCK_USER } from './constants';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import Lobby from './pages/Lobby';
import LiveDuel from './pages/LiveDuel';
import Wallet from './pages/Wallet';
import Profile from './pages/Profile';

// --- Global Context ---
interface AppState {
  user: User | null;
  refreshUser: () => void;
  updateBalance: (amount: number, type: 'DEPOSIT' | 'WITHDRAW' | 'LOCK' | 'UNLOCK') => void;
}

const AppContext = createContext<AppState | undefined>(undefined);

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error("useApp must be used within AppProvider");
  return context;
};

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(MOCK_USER);

  const refreshUser = () => {
    // In a real app, fetches from API
    setUser({ ...user! });
  };

  const updateBalance = (amount: number, type: 'DEPOSIT' | 'WITHDRAW' | 'LOCK' | 'UNLOCK') => {
    if (!user) return;
    const newWallet = { ...user.wallet };
    
    switch (type) {
      case 'DEPOSIT':
        newWallet.available += amount;
        break;
      case 'WITHDRAW':
        newWallet.available -= amount;
        break;
      case 'LOCK':
        newWallet.available -= amount;
        newWallet.locked += amount;
        break;
      case 'UNLOCK':
        newWallet.locked -= amount;
        newWallet.available += amount; // Simplified for refund/win
        break;
    }
    setUser({ ...user, wallet: newWallet });
  };

  return (
    <AppContext.Provider value={{ user, refreshUser, updateBalance }}>
      <HashRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Navigate to="/dashboard" replace />} />
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="lobby" element={<Lobby />} />
            <Route path="duel/:id" element={<LiveDuel />} />
            <Route path="wallet" element={<Wallet />} />
            <Route path="profile" element={<Profile />} />
          </Route>
        </Routes>
      </HashRouter>
    </AppContext.Provider>
  );
};

export default App;