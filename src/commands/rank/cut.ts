import { SlashCommandBuilder } from 'discord.js';
import { SlashCommand } from '../../../type';
import { getTopRankers } from '../../API/rank';

export default {
  data: new SlashCommandBuilder()
    .setName('컷')
    .setDescription('이터니티 컷(300등)과 데미갓 컷(1000등)을 보여줍니다.'),
  execute: async (interaction) => {
    const eternityRank = 300;
    const demigodRank = 1000;

    const topUsers = await getTopRankers();
    const eternityCut = topUsers.find(
      (value) => value.rank === eternityRank
    )?.mmr;
    const demigodCut = topUsers.find(
      (value) => value.rank === demigodRank
    )?.mmr;

    interaction.reply(`이터니티 - ${eternityCut}점\n데미갓 - ${demigodCut}점`);
  },
} as SlashCommand;
