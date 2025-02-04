import axios, { HttpStatusCode } from 'axios';
import { APIErrorMessage } from '../util/constant';
import { getCurrentSeason } from './data';

export async function getUserByNickname(nickname: string) {
  const response = await axios.get<APIResponse<UserNickname>>(
    '/v1/user/nickname',
    { params: { query: nickname } }
  );
  if (response.data.code === 200) {
    return response.data.user;
  }
  switch (response.data.code) {
    case HttpStatusCode.NotFound:
      throw '존재하지 않는 이터널 리턴 유저입니다.';
    default:
      throw APIErrorMessage;
  }
}

export async function getUserStats(userNum: number, seasonId?: number) {
  if (seasonId == null) {
    seasonId = (await getCurrentSeason())?.seasonID;
  }
  const response = await axios.get<APIResponse<UserStat[]>>(
    `/v1/user/stats/${userNum}/${seasonId}`
  );
  if (response.data.code === 200) {
    return response.data.userStats;
  }
  switch (response.data.code) {
    case HttpStatusCode.NotFound:
      throw '존재하지 않는 이터널 리턴 유저입니다.';
    default:
      throw APIErrorMessage;
  }
}
