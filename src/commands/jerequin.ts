import { Command } from "../ICommands";
import fs from 'fs';

const jerequin: Command = {
  name: "jerequin",
  description: "Jerquin is br meme",
  async execute(message, args) {
    const channel = message.member?.voice.channel;

    if (channel) {
      const connection = await channel.join();

      const dispatcher = connection.play(fs.createReadStream('src/sounds/jerequin.mp3'));

      dispatcher.on("finish", () => {
        message.channel.send(`<:eggplant:801908816895410196>`);
        connection.disconnect();
      });
    } else {
      message.reply("You need to join a voice channel first!");
    }
  }
};

module.exports = jerequin;
