import axios from 'axios';

export async function getSeasonData() {
  const response = await axios.get<APIResponse<Season[]>>('v2/data/Season');
  return response.data.data;
}

export async function getCurrentSeason() {
  const seasonAll = await getSeasonData();
  return seasonAll[seasonAll.length - 1];
}
