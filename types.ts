export enum DuelStatus {
  MATCHMAKING = 'MATCHMAKING',
  PENDING_START = 'PENDING_START', // Matched, waiting for deadline
  LIVE = 'LIVE',
  COMPLETED = 'COMPLETED',
  SETTLED = 'SETTLED'
}

export enum PlayerPosition {
  GKP = 'GKP',
  DEF = 'DEF',
  MID = 'MID',
  FWD = 'FWD'
}

export interface FPLPlayer {
  id: number;
  name: string;
  image: string; // Player face image URL
  teamShort: string; // e.g., MCI, ARS
  position: PlayerPosition;
  price: number;
  totalPoints: number; // Season total
  livePoints: number; // Current GW points
  events: FPLEvent[]; // Goals, assists, etc.
}

export interface FPLEvent {
  type: 'GOAL' | 'ASSIST' | 'CS' | 'YC' | 'RC' | 'BONUS' | 'SAVE';
  minute: number;
  points: number;
}

export interface FPLTeam {
  managerName: string;
  teamName: string;
  fplId: string;
  rank: number;
  players: FPLPlayer[]; // Simplified: Active 11 for the duel
}

export interface Duel {
  id: string;
  gameweek: number;
  stake: number; // Amount wagered by EACH player
  fee: number; // Platform fee
  pot: number; // Total winnable amount (2 * stake - fee)
  status: DuelStatus;
  userTeam: FPLTeam;
  opponentTeam?: FPLTeam; // Hidden until LIVE
  opponentHash?: string; // For anonymity
  createdAt: string;
  deadline: string;
  userScore: number;
  opponentScore: number;
}

export interface User {
  id: string;
  username: string;
  email: string;
  fplId: string;
  isVerified: boolean;
  wallet: {
    available: number;
    locked: number;
    currency: string;
  };
}

export interface Transaction {
  id: string;
  type: 'DEPOSIT' | 'WITHDRAWAL' | 'STAKE_LOCK' | 'WINNINGS' | 'REFUND';
  amount: number;
  date: string;
  status: 'COMPLETED' | 'PENDING' | 'FAILED';
  referenceId?: string; // e.g., Duel ID
}