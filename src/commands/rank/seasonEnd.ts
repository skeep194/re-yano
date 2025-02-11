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
    const seasonEnd = DateTime.fromSQL(currentSeason.seasonEnd);
    const diff = seasonEnd.diffNow(['days', 'hours']);
    interaction.reply(
      `시즌 종료 - ${seasonEnd.toFormat('yyyy년 MM월 dd일 HH시 mm분')}\n${diff.days}일 ${Math.floor(diff.hours)}시간 남음`
    );
  },
});
