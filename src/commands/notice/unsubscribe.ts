import { SlashCommandBuilder } from 'discord.js';
import { createSlashCommand } from '../../../type';
import { prismaClient } from '../../util/externalClient';

export default createSlashCommand({
  data: new SlashCommandBuilder()
    .setName('구독취소')
    .setDescription(
      '현재 채널에서 이터널 리턴 공지사항을 더 이상 알려주지 않습니다.'
    ),
  execute: async (interaction) => {
    if (
      (await prismaClient.articleSubscribe.count({
        where: { channelId: interaction.channelId },
      })) > 0
    ) {
      await prismaClient.articleSubscribe.delete({
        where: {
          channelId: interaction.channelId,
        },
      });
    }
    interaction.reply('공지사항 구독이 취소되었습니다.');
  },
});
