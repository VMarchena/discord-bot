import { Command } from "../ICommands";
import fs from 'fs';

const tururu: Command = {
  name: "tururu",
  description: "Naruto - Sadness and Sorrow",
  async execute(message, args) {
    const channel = message.member?.voice.channel;

    if (channel) {
      const connection = await channel.join();

      const dispatcher = connection.play(fs.createReadStream('src/sounds/tururu.mp3'))

      dispatcher.on("finish", () => {
        connection.disconnect();
      });
    } else {
      message.reply("You need to join a voice channel first!");
    }
  },
};

module.exports = tururu;
