import { Collection, REST, Routes } from 'discord.js';
import { clientId, token } from '../../config.json';
import fs from 'node:fs';
import path from 'node:path';
import { SlashCommand } from '../../type';

export const readAllCommands = () => {
  const commands: unknown[] = [];
  const commandCollection = new Collection<string, SlashCommand>();
  // Grab all the command folders from the commands directory you created earlier
  const foldersPath = __dirname;
  const commandFolders = fs.readdirSync(foldersPath);

  for (const folder of commandFolders) {
    if (folder === 'index.js') {
      continue;
    }
    // Grab all the command files from the commands directory you created earlier
    const commandsPath = path.join(foldersPath, folder);
    const commandFiles = fs
      .readdirSync(commandsPath)
      .filter((file) => file.endsWith('.js'));
    // Grab the SlashCommandBuilder#toJSON() output of each command's data for deployment
    for (const file of commandFiles) {
      const filePath = path.join(commandsPath, file);
      const command = require(filePath).default as SlashCommand;
      if ('data' in command && 'execute' in command) {
        commands.push(command.data.toJSON());
        commandCollection.set(command.data.name, command);
      } else {
        console.log(
          `[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`
        );
      }
    }
  }
  return { commands, commandCollection };
};

// Construct and prepare an instance of the REST module
const rest = new REST().setToken(token);

// and deploy your commands!
export const deployCommands = async (commands: unknown[]) => {
  try {
    console.log(
      `Started refreshing ${commands.length} application (/) commands.`
    );

    // The put method is used to fully refresh all commands in the guild with the current set
    const data = (await rest.put(Routes.applicationCommands(clientId), {
      body: commands,
    })) as unknown[];

    console.log(
      `Successfully reloaded ${data.length} application (/) commands.`
    );
  } catch (error) {
    // And of course, make sure you catch and log any errors!
    console.error(error);
  }
};
