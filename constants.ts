import { FPLPlayer, PlayerPosition } from './types';

export const PLATFORM_FEE_PERCENT = 0.10; // 10% rake
export const CURRENCY_SYMBOL = '$';
export const CURRENT_GAMEWEEK = 24;
export const NEXT_DEADLINE = "2024-05-18T11:00:00Z";

// Mock Data for Players with official PL resource images
export const MOCK_PLAYERS: FPLPlayer[] = [
  { 
    id: 1, 
    name: 'Haaland', 
    image: 'https://resources.premierleague.com/premierleague/photos/players/110x140/p223094.png',
    teamShort: 'MCI', 
    position: PlayerPosition.FWD, 
    price: 14.0, 
    totalPoints: 180, 
    livePoints: 8, 
    events: [{ type: 'GOAL', minute: 23, points: 4 }, { type: 'GOAL', minute: 54, points: 4 }] 
  },
  { 
    id: 2, 
    name: 'Salah', 
    image: 'https://resources.premierleague.com/premierleague/photos/players/110x140/p118748.png',
    teamShort: 'LIV', 
    position: PlayerPosition.MID, 
    price: 13.2, 
    totalPoints: 195, 
    livePoints: 2, 
    events: [] 
  },
  { 
    id: 3, 
    name: 'Saka', 
    image: 'https://resources.premierleague.com/premierleague/photos/players/110x140/p223340.png',
    teamShort: 'ARS', 
    position: PlayerPosition.MID, 
    price: 9.0, 
    totalPoints: 160, 
    livePoints: 5, 
    events: [{ type: 'ASSIST', minute: 12, points: 3 }] 
  },
  { 
    id: 4, 
    name: 'Palmer', 
    image: 'https://resources.premierleague.com/premierleague/photos/players/110x140/p247605.png',
    teamShort: 'CHE', 
    position: PlayerPosition.MID, 
    price: 6.0, 
    totalPoints: 150, 
    livePoints: 12, 
    events: [{ type: 'GOAL', minute: 88, points: 5 }, { type: 'BONUS', minute: 90, points: 3 }, { type: 'CS', minute: 90, points: 1 }] 
  },
  { 
    id: 5, 
    name: 'Watkins', 
    image: 'https://resources.premierleague.com/premierleague/photos/players/110x140/p178301.png',
    teamShort: 'AVL', 
    position: PlayerPosition.FWD, 
    price: 8.5, 
    totalPoints: 140, 
    livePoints: 2, 
    events: [] 
  },
  { 
    id: 6, 
    name: 'Foden', 
    image: 'https://resources.premierleague.com/premierleague/photos/players/110x140/p209244.png',
    teamShort: 'MCI', 
    position: PlayerPosition.MID, 
    price: 8.0, 
    totalPoints: 130, 
    livePoints: 0, 
    events: [] 
  },
  { 
    id: 7, 
    name: 'Saliba', 
    image: 'https://resources.premierleague.com/premierleague/photos/players/110x140/p226274.png',
    teamShort: 'ARS', 
    position: PlayerPosition.DEF, 
    price: 5.5, 
    totalPoints: 100, 
    livePoints: 6, 
    events: [{ type: 'CS', minute: 90, points: 4 }] 
  },
  { 
    id: 8, 
    name: 'Raya', 
    image: 'https://resources.premierleague.com/premierleague/photos/players/110x140/p154561.png',
    teamShort: 'ARS', 
    position: PlayerPosition.GKP, 
    price: 5.0, 
    totalPoints: 110, 
    livePoints: 6, 
    events: [{ type: 'CS', minute: 90, points: 4 }] 
  },
  { 
    id: 9, 
    name: 'Estupinan', 
    image: 'https://resources.premierleague.com/premierleague/photos/players/110x140/p204214.png',
    teamShort: 'BHA', 
    position: PlayerPosition.DEF, 
    price: 5.0, 
    totalPoints: 80, 
    livePoints: 1, 
    events: [] 
  },
  { 
    id: 10, 
    name: 'Porro', 
    image: 'https://resources.premierleague.com/premierleague/photos/players/110x140/p243641.png',
    teamShort: 'TOT', 
    position: PlayerPosition.DEF, 
    price: 5.5, 
    totalPoints: 95, 
    livePoints: 2, 
    events: [] 
  },
  { 
    id: 11, 
    name: 'Gordon', 
    image: 'https://resources.premierleague.com/premierleague/photos/players/110x140/p232826.png',
    teamShort: 'NEW', 
    position: PlayerPosition.MID, 
    price: 6.2, 
    totalPoints: 120, 
    livePoints: 2, 
    events: [] 
  },
];

export const MOCK_USER = {
  id: 'u_123',
  username: 'FPL_Legend',
  email: 'user@example.com',
  fplId: '123456',
  isVerified: true,
  wallet: {
    available: 150.00,
    locked: 50.00,
    currency: 'USD'
  }
};