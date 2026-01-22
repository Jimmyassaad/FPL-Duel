import { FPLTeam, FPLPlayer, PlayerPosition, Duel, DuelStatus } from '../types';
import { MOCK_PLAYERS, CURRENT_GAMEWEEK } from '../constants';

// Helper to generate a random team from mock players
const generateRandomTeam = (managerName: string, teamName: string): FPLTeam => {
  // Shuffle and pick 11
  const shuffled = [...MOCK_PLAYERS].sort(() => 0.5 - Math.random());
  // Ensure basic structure (simplified for V1 demo)
  const players = shuffled.slice(0, 11); 
  
  return {
    managerName,
    teamName,
    fplId: Math.floor(Math.random() * 1000000).toString(),
    rank: Math.floor(Math.random() * 500000),
    players
  };
};

const calculateTeamScore = (team: FPLTeam): number => {
  return team.players.reduce((acc, player) => acc + player.livePoints, 0);
};

export const fplService = {
  // Simulate fetching user's linked team
  getMyTeam: async (): Promise<FPLTeam> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(generateRandomTeam('You', 'My FPL Team'));
      }, 500);
    });
  },

  // Simulate finding an opponent
  findOpponent: async (rankRange: number): Promise<FPLTeam> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(generateRandomTeam('Opponent', 'Hidden Team'));
      }, 2000); // 2 second mock delay
    });
  },

  // Get active duel data
  getDuelDetails: async (duelId: string): Promise<Duel> => {
    // Return a mock LIVE duel
    const userTeam = generateRandomTeam('You', 'My FPL Team');
    const opponentTeam = generateRandomTeam('Opponent', 'The Contender');

    // Manually adjust scores for excitement
    userTeam.players[0].livePoints = 12; // Captain haul
    
    return {
      id: duelId,
      gameweek: CURRENT_GAMEWEEK,
      stake: 50,
      fee: 5,
      pot: 95,
      status: DuelStatus.LIVE,
      userTeam,
      opponentTeam,
      createdAt: new Date().toISOString(),
      deadline: new Date().toISOString(),
      userScore: calculateTeamScore(userTeam),
      opponentScore: calculateTeamScore(opponentTeam),
    };
  }
};