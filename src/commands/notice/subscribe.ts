import { SlashCommandBuilder } from 'discord.js';
import { createSlashCommand } from '../../../type';
import { prismaClient } from '../../util/externalClient';

export default createSlashCommand({
  data: new SlashCommandBuilder()
    .setName('구독')
    .setDescription(
      '이터널 리턴 공지사항이 업데이트 되거나 등록되면 이 채널에 알려줍니다.'
    ),
  execute: async (interaction) => {
    if (
      (await prismaClient.articleSubscribe.count({
        where: {
          channelId: interaction.channelId,
        },
      })) > 0
    ) {
      interaction.reply('이미 구독중인 채널입니다.');
      return;
    }
    await prismaClient.articleSubscribe.create({
      data: {
        channelId: interaction.channelId,
      },
    });
    interaction.reply('이 채널에 새로운 공지사항을 알려줍니다.');
  },
});
