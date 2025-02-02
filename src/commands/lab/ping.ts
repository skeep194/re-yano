import { SlashCommandBuilder } from 'discord.js';
import { SlashCommand } from '../../../type';

export default {
  data: new SlashCommandBuilder().setName('ping').setDescription('pong'),
  execute: async (interaction) => {
    interaction.reply('pong');
  },
} as SlashCommand;
