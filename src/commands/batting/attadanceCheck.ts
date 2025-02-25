import { SlashCommandBuilder } from 'discord.js';
import { createSlashCommand } from '../../../type';
import { prismaClient } from '../../util/externalClient';
import { DateTime } from 'luxon';

export default createSlashCommand({
  data: new SlashCommandBuilder()
    .setName('출석체크')
    .setDescription(
      '하루에 한 번 출석체크를 하면 5포인트를 획득할 수 있습니다.'
    ),
  execute: async (interaction) => {
    const discordId = interaction.user.id;
    const guildId = interaction.guildId;

    const systemUser = await prismaClient.systemUser.findFirstOrThrow({
      where: {
        discordId: discordId,
        guildId: guildId,
      },
    });

    const availTime = DateTime.fromJSDate(systemUser.lastAttendanceTime)
      .plus({ days: 1 })
      .startOf('day');

    if (availTime < DateTime.now()) {
      await prismaClient.systemUser.updateMany({
        where: {
          discordId: discordId,
          guildId: guildId,
        },
        data: {
          point: systemUser.point + 5,
        },
      });
      interaction.reply(
        `출석체크 성공! 5포인트를 획득했습니다.\n현재 보유 - ${systemUser.point + 5} 포인트`
      );
    } else {
      interaction.reply('오늘 이미 출석체크를 했습니다.');
    }
  },
});
