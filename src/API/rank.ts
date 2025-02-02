import axios from 'axios';
import { getCurrentSeason } from './data';

export async function getTopRankers(seasonID?: number, mode: number = 3) {
  if (seasonID == null) {
    seasonID = (await getCurrentSeason())?.seasonID;
  }
  const response = await axios.get<APIResponse<UserRank[]>>(
    `v1/rank/top/${seasonID}/${mode}`
  );
  return response.data.topRanks;
}
