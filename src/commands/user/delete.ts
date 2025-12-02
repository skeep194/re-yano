import { SlashCommandBuilder } from 'discord.js';
import { createSlashCommand } from '../../../type';
import { prismaClient } from '../../util/externalClient';

export default createSlashCommand({
  data: new SlashCommandBuilder()
    .setName('삭제')
    .setDescription('삭제 [이터널 리턴 닉네임] 으로 사용자를 삭제합니다.')
    .addStringOption((option) =>
      option
        .setName('닉네임')
        .setDescription('이터널 리턴 닉네임')
        .setRequired(true)
    ),
  execute: async (interaction) => {
    const erNickname = interaction.options.getString('닉네임');
    const guildId = interaction.guildId;
    const discordUserId = interaction.user.id;

    try {
      if (erNickname == null) {
        throw '이터널 리턴 닉네임을 입력 해 주세요. /삭제 [이터널 리턴 닉네임]';
      }
      const { count } = await prismaClient.discordERUser.deleteMany({
        where: { discordId: discordUserId, 'erNickName': erNickname, guildId: guildId },
      });
      if (count > 0) {
        interaction.reply(
          `${erNickname}(${interaction.user.displayName}) 삭제되었습니다.`
        );
      } else {
        interaction.reply(
          `${erNickname}(${interaction.user.displayName})은 등록되지 않았습니다.`
        );
      }
    } catch (e) {
      if (typeof e === 'string') {
        interaction.reply(e);
      } else {
        console.error(e);
        interaction.reply('알 수 없는 에러 발생');
      }
      return;
    }
  },
});
