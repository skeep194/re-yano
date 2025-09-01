import { Guild, GuildMember } from 'discord.js';
import { discordClient, prismaClient } from '../util/externalClient';

/**
 * 랭킹에 등록되어 있지만 길드를 나간 사용자를 지우는 작업 수행
 */
export default async function deleteUserScheduler() {
  const userAll = await prismaClient.discordERUser.findMany();

  userAll.forEach(async (value) => {
    if (value.guildId != null) {
      let guild: Guild;
      try {
        guild = await discordClient.guilds.fetch(value.guildId);
      } catch(e) {
        console.error('guild fetch fail');
        console.error(e);
        return;
      }
      
      if (!(await guild.members.fetch()).has(value.discordId)) {
        console.log(
          `탈퇴한 사용자 자동 삭제 스케쥴러 동작 - discord id : ${value.discordId}, guild id : ${value.guildId}`
        );
        const {count} = await prismaClient.discordERUser.deleteMany({
          where: { discordId: value.discordId, guildId: value.guildId },
        });
        console.log(`${count}개 데이터 삭제`);
      }
    }
  });
}
