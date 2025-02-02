interface APIResponse<T> {
  code: number;
  message: string;
  data: T;
  topRanks: T;
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
