import { Command } from "../ICommands";

const ping: Command = {
  name: "ping",
  description: "Ping!",
  execute(message, args) {
    message.channel.send("Pong.");
  },
};

module.exports = ping;