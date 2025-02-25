// Require the necessary discord.js classes
import { Events, MessageFlags } from 'discord.js';
import { token, erAPIKey } from './config.json';
import { deployCommands, readAllCommands } from './src/commands';
import axios from 'axios';
import { discordClient, prismaClient } from './src/util/externalClient';
import './src/scheduler';

// axios setting for bser API
axios.defaults.baseURL = 'https://open-api.bser.io';
axios.defaults.headers.common['Content-Type'] = 'application/json';
axios.defaults.headers.common['x-api-key'] = erAPIKey;
axios.defaults.validateStatus = () => true;
axios.interceptors.response.use((response) => {
  if (response.data.status === 429) {
    throw '너무 많은 요청을 보냈습니다. 잠시 후 다시 시도 해 주세요.';
  }
  return response;
});

// When the client is ready, run this code (only once).
// The distinction between `client: Client<boolean>` and `readyClient: Client<true>` is important for TypeScript developers.
// It makes some properties non-nullable.
discordClient.once(Events.ClientReady, (readyClient) => {
  console.log(`Ready! Logged in as ${readyClient.user.tag}`);
});

const { commands, commandCollection } = readAllCommands();

discordClient.on(Events.InteractionCreate, async (interaction) => {
  if (!interaction.isChatInputCommand()) return;

  const command = commandCollection.get(interaction.commandName);

  if (!command) {
    console.error(`No command matching ${interaction.commandName} was found.`);
    return;
  }

  const guildId = interaction.guildId;
  const discordId = interaction.user.id;

  try {
    if (
      (await prismaClient.systemUser.count({
        where: { guildId: guildId, discordId: discordId },
      })) === 0
    ) {
      await prismaClient.systemUser.create({
        data: {
          discordId: discordId,
          guildId: guildId,
        },
      });
    }
    await command.execute(interaction);
  } catch (error) {
    console.error(error);
    if (interaction.replied || interaction.deferred) {
      await interaction.followUp({
        content: error as string,
        flags: MessageFlags.Ephemeral,
      });
    } else {
      await interaction.reply({
        content: error as string,
        flags: MessageFlags.Ephemeral,
      });
    }
  }
});

// Log in to Discord with your client's token
discordClient.login(token);

deployCommands(commands);
