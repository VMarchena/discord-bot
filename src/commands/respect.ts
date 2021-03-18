import { Command } from "../ICommands";
import fs from 'fs';

const respect: Command = {
  name: "respect",
  description: "GTA San Andreas respect sound (mission passed)",
  async execute(message, args) {
    const channel = message.member?.voice.channel;

    if (channel) {
      const connection = await channel.join();

      const dispatcher = connection.play(fs.createReadStream('src/sounds/respect.mp3'))
     
      dispatcher.on("finish", () => {
        connection.disconnect();
      });
    } else {
      message.reply("You need to join a voice channel first!");
    }
  },
};

module.exports = respect;
