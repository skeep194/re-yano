import { SlashCommandBuilder } from 'discord.js';
import { createSlashCommand, SlashCommand } from '../../../type';

export default createSlashCommand({
  data: new SlashCommandBuilder().setName('ping').setDescription('pong'),
  execute: async (interaction) => {
    interaction.reply('pong');
  },
});
