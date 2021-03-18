import { Command } from "../ICommands";
import fs from 'fs';

const respect: Command = {
  name: "cafe",
  description: "Quero cafeeeee. Quero cafeeee.",
  async execute(message, args) {
    const channel = message.member?.voice.channel;

    if (channel) {
      const connection = await channel.join();

      const dispatcher = connection.play(fs.createReadStream('src/sounds/cafe.mp3'))

      dispatcher.on("finish", () => {
        connection.disconnect();
      });
    } else {
      message.reply("You need to join a voice channel first!");
    }
  },
};

module.exports = respect;
