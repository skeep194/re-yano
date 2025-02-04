interface APIResponse<T> {
  code: number;
  message: string;
  data: T;
  topRanks: T;
  user: T;
  userStats: T;
  userRank: T;
}

interface Season {
  seasonID: number;
  seasonName: string;
  seasonStart: string;
  seasonEnd: string;
  isCurrent: number;
}

interface UserRank {
  userNum: number;
  nickname: string;
  rank: number;
  mmr: number;
}

interface UserNickname {
  userNum: number;
  nickname: string;
}

interface UserStat {
  seasonId: number;
  userNum: number;
  matchingMode: number;
  matchingTeamMode: number;
  mmr: number;
  nickname: string;
  rank: number;
  rankSize: number;
  totalGames: number;
  totalWins: number;
  totalTeamKills: number;
  totalDeaths: number;
  escapeCount: number;
  rankPercent: number;
  averageRank: number;
  averageKills: number;
  averageAssistants: number;
  averageHunts: number;
  top1: number;
  top2: number;
  top3: number;
  top5: number;
  top7: number;
  characterStats: CharacterStat[];
}

interface CharacterStat {
  characterCode: number;
  totalGames: number;
  usages: number;
  maxKillings: number;
  top3: number;
  wins: number;
  win3Rate: number;
  averageRank: number;
}

interface UserOneRank {
  userNum: number;
  serverCode: number;
  mmr: number;
  serverRank: number;
  nickname: number;
  rank: number;
}
