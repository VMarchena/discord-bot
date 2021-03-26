import { Command } from "../ICommands";
import fs from 'fs';

const jabulani: Command = {
  name: "jabulani",
  description: "Jabulaaaaaaaaaniiiiiiiii",
  async execute(message, args) {
    const channel = message.member?.voice.channel;

    if (channel) {
      const connection = await channel.join();

      const dispatcher = connection.play(fs.createReadStream('src/sounds/jabulani.mp3'));

      dispatcher.on("finish", () => {
        connection.disconnect();
      });
    } else {
      message.reply("You need to join a voice channel first!");
    }
  }
};

module.exports = jabulani;
