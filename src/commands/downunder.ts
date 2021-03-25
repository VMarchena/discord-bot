import { Command } from "../ICommands";
import fs from 'fs';

const downunder: Command = {
  name: "downunder",
  description: "I come from a land down under",
  async execute(message, args) {
    const channel = message.member?.voice.channel;

    if (channel) {
      const connection = await channel.join();

      const dispatcher = connection.play(fs.createReadStream('src/sounds/downunder.mp3'))

      dispatcher.on("finish", () => {
        connection.disconnect();
      });
    } else {
      message.reply("You need to join a voice channel first!");
    }
  },
};

module.exports = downunder;
