import { SlashCommandBuilder } from 'discord.js';
import { createSlashCommand } from '../../../type';
import { getUserStats } from '../../API/user';
import { prismaClient } from '../../util/externalClient';
import { getUserRank } from '../../API/rank';

export default createSlashCommand({
  data: new SlashCommandBuilder()
    .setName('검색')
    .setDescription('검색 [디스코드 유저]로 이터널 리턴 유저를 검색합니다.')
    .addUserOption((builder) =>
      builder
        .setName('사용자')
        .setDescription('이터널 리턴 유저를 검색할 디스코드 유저')
        .setRequired(true)
    ),
  execute: async (interaction) => {
    const discordUser = interaction.options.getUser('사용자');
    if (discordUser == null) {
      interaction.reply('필수 파라미터 [디스코드 유저]가 없습니다.');
      return;
    }
    const serverUser = await prismaClient.discordERUser.findMany({
      where: { discordId: discordUser.id, guildId: interaction.guildId },
    });
    if (serverUser.length === 0) {
      interaction.reply('등록되지 않은 사용자입니다.');
      return;
    }
    const result = (
      await Promise.all(
        serverUser.map(async (value) => {
          const erUserStat = await getUserStats(value.erId);
          const erUserRank = await getUserRank(value.erId);
          return (
            `${erUserRank.nickname}\n` +
            erUserStat
              .map((value) =>
                [
                  `${value.mmr}점(${value.rank}위)`,
                  `판수 - ${value.totalGames}`,
                  `우승 횟수 - ${value.totalWins}`,
                  `평균 순위 - ${value.averageRank}`,
                  `top1 - ${value.top1 * 100}%`,
                  `top2 - ${value.top2 * 100}%`,
                  `top3 - ${value.top3 * 100}%`,
                ].join('\n')
              )
              .join('\n\n')
          );
        })
      )
    ).join('\n--------------------\n');
    interaction.reply(result);
  },
});
