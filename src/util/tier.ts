export interface Tier {
  startMMR: number;
  interval: number;
  name: string;
  matchingRanges?: number[];
  ratingCut?: number;
  isOneInterval?: boolean;
}

export const seasonTier: Record<number, Tier[]> = {
  29: [
    { name: '아이언', interval: 150, startMMR: 0 },
    {
      name: '브론즈',
      interval: 200,
      startMMR: 600,
    },
    {
      name: '실버',
      interval: 250,
      startMMR: 1400,
    },
    {
      name: '골드',
      interval: 300,
      startMMR: 2400,
    },
    {
      name: '플래티넘',
      interval: 350,
      startMMR: 3600,
    },
    {
      name: '다이아몬드',
      interval: 350,
      startMMR: 5000,
    },
    {
      name: '메테오라이트',
      interval: 600,
      startMMR: 6400,
      isOneInterval: true,
    },
    {
      name: '미스릴',
      interval: 0,
      startMMR: 7000,
      isOneInterval: true,
      matchingRanges: [7000, 7500, 8100],
    },
    {
      name: '데미갓',
      interval: 0,
      startMMR: 7700,
      ratingCut: 1000,
      isOneInterval: true,
    },
    {
      name: '이터니티',
      interval: 0,
      startMMR: 7700,
      ratingCut: 300,
      isOneInterval: true,
    },
  ],
  30: [
    { name: '아이언', interval: 150, startMMR: 0 },
    {
      name: '브론즈',
      interval: 200,
      startMMR: 600,
    },
    {
      name: '실버',
      interval: 250,
      startMMR: 1400,
    },
    {
      name: '골드',
      interval: 300,
      startMMR: 2400,
    },
    {
      name: '플래티넘',
      interval: 350,
      startMMR: 3600,
    },
    {
      name: '다이아몬드',
      interval: 350,
      startMMR: 5000,
    },
    {
      name: '메테오라이트',
      interval: 600,
      startMMR: 6400,
      isOneInterval: true,
    },
    {
      name: '미스릴',
      interval: 0,
      startMMR: 7000,
      isOneInterval: true,
      matchingRanges: [7000, 7500, 8100],
    },
    {
      name: '데미갓',
      interval: 0,
      startMMR: 7700,
      ratingCut: 1000,
      isOneInterval: true,
    },
    {
      name: '이터니티',
      interval: 0,
      startMMR: 7700,
      ratingCut: 300,
      isOneInterval: true,
    },
  ],
  31: [
    { name: '아이언', interval: 150, startMMR: 0 },
    {
      name: '브론즈',
      interval: 200,
      startMMR: 600,
    },
    {
      name: '실버',
      interval: 250,
      startMMR: 1400,
    },
    {
      name: '골드',
      interval: 300,
      startMMR: 2400,
    },
    {
      name: '플래티넘',
      interval: 350,
      startMMR: 3600,
    },
    {
      name: '다이아몬드',
      interval: 350,
      startMMR: 5000,
    },
    {
      name: '메테오라이트',
      interval: 700,
      startMMR: 6400,
      isOneInterval: true,
    },
    {
      name: '미스릴',
      interval: 0,
      startMMR: 7100,
      isOneInterval: true,
    },
    {
      name: '데미갓',
      interval: 0,
      startMMR: 7700,
      ratingCut: 1000,
      isOneInterval: true,
    },
    {
      name: '이터니티',
      interval: 0,
      startMMR: 7700,
      ratingCut: 300,
      isOneInterval: true,
    },
  ],
};

export function tierStringFromMMR(mmr: number, season: number, rank?: number) {
  const data = seasonTier[31];
  let result = '';
  data.forEach((value) => {
    // 데미 이터
    if (value.ratingCut != null) {
      if (rank != null && mmr >= value.startMMR && rank <= value.ratingCut) {
        result = value.name;
      }
      return;
    }

    // 미스릴 메라
    if (value.isOneInterval && value.startMMR <= mmr) {
      result = value.name;
      if (value.matchingRanges) {
        let range = 0;
        value.matchingRanges.forEach((value) => {
          if (mmr >= value) {
            range += 1;
          }
        });
        result += ` 매칭 구간 ${range}`;
      }
      return;
    }

    // 다이아 이하
    if (mmr >= value.startMMR && mmr < value.startMMR + value.interval * 4) {
      result = `${value.name} ${4 - Math.floor((mmr - value.startMMR) / value.interval)}`;
    }
  });
  return result;
}
