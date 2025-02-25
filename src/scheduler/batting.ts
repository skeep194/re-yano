import { DateTime } from 'luxon';
import { getUserGames } from '../API/user';
import { discordClient, prismaClient } from '../util/externalClient';
import { TextChannel, userMention } from 'discord.js';

export default async function battingCrawler() {
  const observe = await prismaClient.observeRankGame.findMany({
    where: {
      status: 'WATCHING',
    },
    include: {
      systemUser: true,
    },
  });

  for (let i = 0; i < observe.length; i++) {
    const here = observe[i];
    const battleResult = (await getUserGames(here.erId)).filter(
      (value) => value.matchingMode === 3
    );
    let low = 0;
    let high = battleResult.length;
    while (low < high) {
      const mid = Math.floor((low + high) / 2);
      if (
        DateTime.fromISO(battleResult[mid].startDtm) >
        DateTime.fromJSDate(here.createAt)
      ) {
        low = mid + 1;
      } else {
        high = mid;
      }
    }
    low -= 1;
    if (low >= 0) {
      const user = await prismaClient.observeRankGame.update({
        where: { id: here.id },
        data: { status: 'DONE' },
        include: {
          systemUser: true,
        },
      });
      const channel = await discordClient.channels.fetch(here.channelId);
      if (channel?.isSendable()) {
        const isSuccess = here.expectedRank === battleResult[low].gameRank;
        const gainPoint = here.batPoint * 7;
        if (isSuccess) {
          await prismaClient.systemUser.update({
            where: { id: here.systemUserid },
            data: { point: user.systemUser.point + gainPoint },
          });
        }
        channel.send(
          [
            `${userMention(here.systemUser.discordId)}`,
            '[랭크배팅 결과]',
            `${battleResult[low].nickname} - ${battleResult[low].gameRank}등`,
            `예상 - ${here.expectedRank}등`,
            `${isSuccess ? `성공! ${gainPoint} 포인트 획득` : '실패...'}`,
          ].join('\n')
        );
      }
    }
    await new Promise((resolve) => setTimeout(resolve, 500));
  }
  return new Promise((resolve) => setTimeout(resolve, 10000));
}
