import { Command } from "../ICommands";
import fs from 'fs';

const lavem: Command = {
  name: "lavem",
  description: "La vem o Homem Macaco correndo atrás de mim...",
  async execute(message, args) {
    const channel = message.member?.voice.channel;

    if (channel) {
      const connection = await channel.join();

      const dispatcher = connection.play(fs.createReadStream('src/sounds/lavem.mp3'))

      dispatcher.on("finish", () => {
        connection.disconnect();
      });
    } else {
      message.reply("You need to join a voice channel first!");
    }
  },
};

module.exports = lavem;
