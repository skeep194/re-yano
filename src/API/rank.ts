import axios, { HttpStatusCode } from 'axios';
import { getCurrentSeason } from './data';
import { APIErrorMessage } from '../util/constant';
import { getUserByNickname } from './user';

export async function getTopRankers(seasonID?: number, mode: number = 3) {
  if (seasonID == null) {
    seasonID = (await getCurrentSeason())?.seasonID;
  }
  const response = await axios.get<APIResponse<UserRank[]>>(
    `v1/rank/top/${seasonID}/${mode}`
  );
  return response.data.topRanks;
}

export async function getUserRank(
  nickname: string,
  seasonId?: number,
  matchingTeamMode = 3
) {
  if (seasonId == null) {
    seasonId = (await getCurrentSeason())?.seasonID;
  }
  const userId = (await getUserByNickname(nickname)).userId;
  const response = await axios.get<APIResponse<UserOneRank>>(
    `v1/rank/uid/${userId}/${seasonId}/${matchingTeamMode}`
  );
  if (response.data.code === 200) {
    return response.data.userRank;
  }
  switch (response.data.code) {
    case HttpStatusCode.NotFound:
      console.error(
        `[API] getUserRank: eternal return ${userId} user id not found error`
      );
      throw '존재하지 않는 이터널 리턴 유저입니다.';
    default:
      throw 'getUserRank API 에러';
  }
}
