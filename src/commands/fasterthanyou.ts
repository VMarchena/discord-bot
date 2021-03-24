import { Command } from "../ICommands";
import fs from 'fs';

const fasterthanyou: Command = {
  name: "fasterthanyou",
  description: "Fernando is faster than you",
  async execute(message, args) {
    const channel = message.member?.voice.channel;

    if (channel) {
      const connection = await channel.join();

      const dispatcher = connection.play(fs.createReadStream('src/sounds/fasterthanyou.mp3'))

      dispatcher.on("finish", () => {
        connection.disconnect();
      });
    } else {
      message.reply("You need to join a voice channel first!");
    }
  },
};

module.exports = fasterthanyou;
