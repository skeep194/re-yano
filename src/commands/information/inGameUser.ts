import { SlashCommandBuilder } from 'discord.js';
import { createSlashCommand } from '../../../type';
import * as cheerio from 'cheerio';

export default createSlashCommand({
  data: new SlashCommandBuilder()
    .setName('동접')
    .setDescription('스팀 기준 동접을 보여줍니다.'),
  execute: async (interaction) => {
    const $ = await cheerio.fromURL('https://steamcommunity.com/app/1049590');
    interaction.reply($('span.apphub_NumInApp').text());
  },
});
