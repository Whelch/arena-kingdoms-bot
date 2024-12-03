export interface GameState {
  gold: number;
  lives: number;
  shopCosts: number[];
  shopItemCosts: number[];
  shopItems: string[];
  artifactShopItems: string[];
  artifactPriorShopItems: string[];
  artifacts: string[];
  artifactRerollCount: number;
  comp: {
    battleId: null;
    compCount: number;
    compsPerSkirmish: number;
    users: null;
    playerBattleInfos: {
      gold: number;
      lives: number;
      round: number;
      wins: number;
      houseId: string;
      houseDisplayName: string;
      houseProfileImage: string;
      heroRankUid: string;
      artifacts: [];
    }[];
    placements: PlacedCharacter[];
    bench: PlacedCharacter[];
    map: null;
  },
  unitLimit: number;
  benchLimit: number;
  history: number[];
  didWin: boolean;
  isCompleted: boolean;
  houseInfo: {
    HouseId: string;
    DisplayName: string;
    ProfileImage: string;
    CreationSource: null;
  };
  nextRoundPreview: {
    Income: null
  };
  readyDate: string;
  friendMatchId: null;
  runId: string;
  round: number;
  maxRound: number;
}

export interface PlacedCharacter {
  characterType: string;
  x: number;
  y: number;
  skin: null;
  team: number;
  armyId: string;
}

export async function getGameState() {
  const res = await fetch('http://localhost:8080');

  return await res.json() as GameState;
}