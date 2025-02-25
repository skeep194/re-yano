import { SlashCommandBuilder } from 'discord.js';
import { createSlashCommand } from '../../../type';
import { prismaClient } from '../../util/externalClient';

export default createSlashCommand({
  data: new SlashCommandBuilder()
    .setName('내정보')
    .setDescription('자신이 가진 포인트 정보를 보여줍니다.'),
  execute: async (interaction) => {
    const discordId = interaction.user.id;
    const guildId = interaction.guildId;

    const systemUser = await prismaClient.systemUser.findFirstOrThrow({
      where: {
        discordId: discordId,
        guildId: guildId,
      },
    });

    interaction.reply(`보유 포인트 - ${systemUser.point} 포인트`);
  },
});
