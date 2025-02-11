import { SlashCommandBuilder } from 'discord.js';
import { createSlashCommand } from '../../../type';
import { DateTime } from 'luxon';
import { getCurrentSeason } from '../../API/data';

export default createSlashCommand({
  data: new SlashCommandBuilder()
    .setName('시즌종료')
    .setDescription('시즌 종료 일자를 보여줍니다.'),
  execute: async (interaction) => {
    const currentSeason = await getCurrentSeason();
    if (currentSeason == null) {
      interaction.reply('시즌 데이터를 불러오는데 실패했습니다.');
      return;
    }
    // 정식 출시 첫 시즌이 seasonID 18(프리시즌 1)임.
    const seasonDelta = 16;
    const seasonEnd = DateTime.fromSQL(currentSeason.seasonEnd);
    const diff = seasonEnd.diffNow(['days', 'hours']);
    const seasonName =
      currentSeason.seasonID % 2 === 0
        ? '프리'
        : '' + `시즌 ${Math.floor((currentSeason.seasonID - seasonDelta) / 2)}`;
    interaction.reply(
      `${seasonName}\n시즌 종료 - ${seasonEnd.toFormat('yyyy년 MM월 dd일 HH시 mm분')}\n${diff.days}일 ${Math.floor(diff.hours)}시간 남음`
    );
  },
});
