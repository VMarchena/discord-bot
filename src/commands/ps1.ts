import { Command } from "../ICommands";
import fs from 'fs';

const ps1: Command = {
  name: "ps1",
  description: "Playstation one sound",
  async execute(message, args) {
    const channel = message.member?.voice.channel;

    if (channel) {
      const connection = await channel.join();

      const dispatcher = connection.play(fs.createReadStream('src/sounds/ps1.mp3'))
     
      dispatcher.on("finish", () => {
        connection.disconnect();
      });
    } else {
      message.reply("You need to join a voice channel first!");
    }
  },
};

module.exports = ps1;
