import fs from "fs";
import Discord from "discord.js";
import { prefix } from "./config.json";
import dotenv from "dotenv";
import { Command } from "./ICommands";
import { SimpleSoundCommand, SoundConfigs } from "./SimpleSoundCommand";
dotenv.config();

type Commands = Discord.Collection<string, Command>;

function main() {
  const client = new Discord.Client();
  const commands = new Discord.Collection<string, Command>();

  readSounds(commands);
  readCommands(commands);
  initializeClient(client);

  client.on("message", async (message) => {

    if (!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const command = args.shift()?.toLowerCase();

    if (command && commands.has(command)) {
      if (command == 'help') {
        outputHelp(message, commands);
      }

      commands.get(command)?.execute(message, args);
    }

    if (command == 'random') {
      commands.random().execute(message, args);
    }
  });
}

function readSounds(commands: Commands) {
  const descriptionsFilePath = './src/sounds/descriptions.json';
  const descriptions = JSON.parse(fs.readFileSync(descriptionsFilePath).toString());

  for (const [name, configs] of Object.entries<SoundConfigs>(descriptions)) {
    const soundCommand = new SimpleSoundCommand(name, configs);
    commands.set(name, soundCommand);
  }
}

function readCommands(commands: Commands) {
  const commandFiles = fs
    .readdirSync("./src/commands")
    .filter((file) => file.endsWith(".ts"));

  for (const file of commandFiles) {
    const command: Command = require(`./commands/${file}`);

    // NOTE(erick): Add only commands that are not yet present
    if (!commands.has(command.name)) {
      commands.set(command.name, command);
    }
  }
}

function initializeClient(client: Discord.Client) {
  client.once("ready", () => {
    console.log("Ready!");
  });

  if (!process.env.DISCORD_TOKEN) {
    console.error('Failed to read DISCORD_TOKEN!');
    process.exit(1);
  }

  client.login(process.env.DISCORD_TOKEN);
}

function outputHelp(message: Discord.Message, commands: Commands) {
  var helpMessage: string = `Hello <@${message.author.id}>. These are the available commands:\n`;

  commands.each((command: Command) => {
    helpMessage += `!**${command.name}**: ${command.description}\n`;
  });

  message.channel.send(helpMessage);
}

main();
