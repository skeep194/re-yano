import { SlashCommandBuilder } from 'discord.js';
import { createSlashCommand } from '../../../type';
import { discordClient, prismaClient } from '../../util/externalClient';
import { getUserRank } from '../../API/rank';
import { tierStringFromMMR } from '../../util/tier';
import { getCurrentSeason } from '../../API/data';

export default createSlashCommand({
  data: new SlashCommandBuilder()
    .setName('랭킹')
    .setDescription('이 서버에 등록된 유저 랭킹을 보여줍니다.'),
  execute: async (interaction) => {
    await interaction.deferReply();
    const data = await prismaClient.discordERUser.findMany({
      where: {
        guildId: interaction.guildId,
        discordId: interaction.guildId ? undefined : interaction.user.id,
      },
    });
    if (data.length === 0) {
      interaction.editReply('등록된 사용자가 아직 없습니다.');
      return;
    }
    const season = await getCurrentSeason();

    if (season == null) {
      interaction.editReply('시즌 정보를 불러오는 데 실패했습니다.');
      return;
    }

    const checkExist: Record<string, boolean> = {};

    const result = (
      await Promise.all(
        data.map(async ({ discordId, erNickName }) => {
          const discordUser = await discordClient.users.fetch(discordId);
          const erUser = await getUserRank(erNickName, season.seasonID);
          return {
            discordId: discordUser.id,
            mmr: erUser.mmr,
            message: `${erUser.nickname}(${discordUser.displayName}) - ${erUser.mmr}점 (${tierStringFromMMR(erUser.mmr, season.seasonID, erUser.rank)}), ${erUser.rank}위`,
          };
        })
      )
    )
      .sort((a, b) => b.mmr - a.mmr)
      .filter((value) => {
        if (checkExist[value.discordId] == null) {
          checkExist[value.discordId] = true;
          return true;
        }
        return false;
      })
      .map((value, index) => `${index}. ${value.message}`)
      .join('\n');
    interaction.editReply(result);
  },
});
