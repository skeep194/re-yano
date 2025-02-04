import { SlashCommandBuilder } from 'discord.js';
import { createSlashCommand } from '../../../type';
import { discordClient, prismaClient } from '../../util/externalClient';
import { getUserStats } from '../../API/user';
import { getUserRank } from '../../API/rank';

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

    const result = (
      await Promise.all(
        data.map(async ({ discordId, erId }) => {
          const discordUser = await discordClient.users.fetch(discordId);
          const erUser = await getUserRank(erId);
          return {
            mmr: erUser.mmr,
            message: `${erUser.nickname}(${discordUser.displayName}) - ${erUser.mmr}점, ${erUser.rank}위`,
          };
        })
      )
    )
      .sort((a, b) => b.mmr - a.mmr)
      .map((value, index) => `${index}. ${value.message}`)
      .join('\n');
    interaction.editReply(result);
  },
});
