import { SlashCommandBuilder } from 'discord.js';
import { createSlashCommand } from '../../../type';
import { prismaClient } from '../../util/externalClient';
import { getUserByNickname } from '../../API/user';

export default createSlashCommand({
  data: new SlashCommandBuilder()
    .setName('랭크배팅')
    .setDescription(
      '다음 게임이 종료될 때 순위를 맞출 경우 포인트를 획득합니다.'
    )
    .addStringOption((builder) =>
      builder
        .setName('닉네임')
        .setDescription('배팅 할 이터널 리턴 닉네임')
        .setRequired(true)
    )
    .addIntegerOption((builder) =>
      builder
        .setName('예상순위')
        .setDescription('배팅할 이터널 리턴 유저의 예상 순위')
        .setRequired(true)
    )
    .addIntegerOption((builder) =>
      builder
        .setName('배율')
        .setDescription(
          '배팅에 걸 포인트(1 ~ 3 사이의 정수값, 입력하지 않을 시 1)'
        )
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

    const erNickname = interaction.options.getString('닉네임', true);
    const expectedRank = interaction.options.getInteger('예상순위', true);
    const batPoint = interaction.options.getInteger('배율') ?? 1;

    if (!(1 <= expectedRank && expectedRank <= 8)) {
      interaction.reply('예상순위는 1에서 8까지의 정수값이어야 합니다.');
      return;
    }

    if (!(1 <= batPoint && batPoint <= 3)) {
      interaction.reply('배율은 1에서 3까지의 정수값이어야 합니다.');
      return;
    }

    if (systemUser.point < batPoint) {
      interaction.reply('포인트가 부족합니다.');
      return;
    }

    await prismaClient.systemUser.update({
      where: { id: systemUser.id },
      data: { point: systemUser.point - batPoint },
    });

    await prismaClient.observeRankGame.create({
      data: {
        systemUserid: systemUser.id,
        batPoint: batPoint,
        erId: (await getUserByNickname(erNickname)).userNum,
        channelId: interaction.channelId,
        expectedRank: expectedRank,
      },
    });

    interaction.reply(
      `${erNickname}, ${expectedRank}등, ${batPoint}배\n배팅이 등록되었습니다. 게임이 끝나면 알려줍니다.`
    );
  },
});
