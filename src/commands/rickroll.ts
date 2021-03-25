import { Command } from "../ICommands";
import fs from 'fs';

const rickroll: Command = {
  name: "rickroll",
  description: "Never gonna give you up. Never gonna let you down.",
  async execute(message, args) {
    const channel = message.member?.voice.channel;

    if (channel) {
      const connection = await channel.join();

      const dispatcher = connection.play(fs.createReadStream('src/sounds/rickroll.mp3'))

      dispatcher.on("finish", () => {
        connection.disconnect();
      });
    } else {
      message.reply("You need to join a voice channel first!");
    }
  },
};

module.exports = rickroll;
