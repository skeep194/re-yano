import { SlashCommandBuilder } from 'discord.js';
import { createSlashCommand } from '../../../type';
import { getUserByNickname } from '../../API/user';
import { prismaClient } from '../../util/externalClient';

export default createSlashCommand({
  data: new SlashCommandBuilder()
    .setName('등록')
    .setDescription('등록 [이터널 리턴 닉네임] 으로 사용자를 등록합니다.')
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
    let erUserId: number;
    try {
      if (erNickname == null) {
        throw '이터널 리턴 닉네임을 입력 해 주세요. /등록 [이터널 리턴 닉네임]';
      }
      erUserId = (await getUserByNickname(erNickname)).userNum;
      if (
        (await prismaClient.discordERUser.count({
          where: { erId: erUserId, guildId: guildId, discordId: discordUserId },
        })) === 0
      ) {
        await prismaClient.discordERUser.create({
          data: { discordId: discordUserId, guildId: guildId, erId: erUserId },
        });
      }
      interaction.reply(
        `${erNickname}(${interaction.user.displayName}) 등록되었습니다.`
      );
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
