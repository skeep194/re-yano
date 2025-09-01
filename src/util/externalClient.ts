import { PrismaClient } from '@prisma/client';
import { Client, GatewayIntentBits } from 'discord.js';

export const prismaClient = new PrismaClient();

export const discordClient = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMembers],
});
