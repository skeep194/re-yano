import { SlashCommandBuilder } from 'discord.js';
import { createSlashCommand } from '../../../type';
import { discordClient, prismaClient } from '../../util/externalClient';

export default createSlashCommand({
  data: new SlashCommandBuilder()
    .setName('포인트랭킹')
    .setDescription('서버의 포인트 랭킹을 보여줍니다.'),
  execute: async (interaction) => {
    await interaction.deferReply();
    const guildId = interaction.guildId;
    const allUser = await prismaClient.systemUser.findMany({
      where: { guildId: guildId },
      orderBy: { point: 'desc' },
    });

    if (allUser.length === 0) {
      interaction.reply('서버에 등록된 사용자가 없습니다.');
      return;
    }

    const result = (
      await Promise.all(
        allUser.map(async (value, index) => {
          const fetchUser = await discordClient.users.fetch(value.discordId);
          return `${index}. ${fetchUser.displayName} - ${value.point} 포인트`;
        })
      )
    ).join('\n');
    interaction.editReply(result);
  },
});
