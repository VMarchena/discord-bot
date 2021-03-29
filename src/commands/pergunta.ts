import { Command } from "../ICommands";
import fs from 'fs';

const pergunta: Command = {
  name: "pergunta",
  description: "Question theme from Show do Milhão.",
  async execute(message, args) {
    const channel = message.member?.voice.channel;

    if (channel) {
      const connection = await channel.join();

      const dispatcher = connection.play(fs.createReadStream('src/sounds/pergunta.mp3'))

      dispatcher.on("finish", () => {
        connection.disconnect();
      });
    } else {
      message.reply("You need to join a voice channel first!");
    }
  },
};

module.exports = pergunta;
