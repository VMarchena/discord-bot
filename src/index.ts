import fs from "fs";
import Discord from "discord.js";
import { prefix } from "./config.json";
import dotenv from "dotenv";
import { Command } from "./ICommands";
dotenv.config();

const client = new Discord.Client();
const commands = new Discord.Collection<string, Command>();

const commandFiles = fs
  .readdirSync("./src/commands")
  .filter((file) => file.endsWith(".ts"));

for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  commands.set(command.name, command);
}

function outputHelp(message: any) {
  var helpMessage: string = `Hello ${message.author}. These are the available commands:\n`;

  commands.each((command: Command) => {
    helpMessage += `- **${command.name}**: ${command.description}\n`;
  });

  message.channel.send(helpMessage);
}

client.once("ready", () => {
  console.log("Ready!");
});

client.login(process.env.DISCORD_TOKEN);

client.on("message", async (message) => {

  if (!message.content.startsWith(prefix) || message.author.bot) return;

  const args = message.content.slice(prefix.length).trim().split(/ +/);
  const command = args.shift()?.toLowerCase();

  if (command && commands.has(command)) {
    if (command == 'help') {
      outputHelp(message);
    }

    commands.get(command)?.execute(message, args);
  }
});
