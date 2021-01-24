const fs = require("fs");
const Discord = require("discord.js");
const { prefix } = require("./config.json");
const dotenv = require('dotenv');
dotenv.config();

const client = new Discord.Client();
client.commands = new Discord.Collection();

const commandFiles = fs
  .readdirSync("./commands")
  .filter((file) => file.endsWith(".js"));

for (const file of commandFiles) {
  const command = require(`./commands/${file}`);
  client.commands.set(command.name, command);
}

client.once("ready", () => {
  console.log("Ready!");
});

client.login(process.env.DISCORD_TOKEN);

client.on("message", async (message) => {
  if (!message.content.startsWith(prefix) || message.author.bot) return;

  const args = message.content.slice(prefix.length).trim().split(/ +/);
  const command = args.shift().toLowerCase();

  if (command === "ping") {
    client.commands.get("ping").execute(message, args);
  } else if (command === "fire") {
    client.commands.get("fire").execute(message, args);
  } else if (command === "jerequin") {
    client.commands.get("jerequin").execute(message, args);
  } else if (command === "drums") {
    client.commands.get("drums").execute(message, args);
  }
});
