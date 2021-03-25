import { Command } from "../ICommands";
import fs from 'fs';

const dialup: Command = {
  name: "dialup",
  description: "sound of a dial up modem connecting to the Internet",
  async execute(message, args) {
    const channel = message.member?.voice.channel;

    if (channel) {
      const connection = await channel.join();

      const dispatcher = connection.play(fs.createReadStream('src/sounds/dialup.mp3'))

      dispatcher.on("finish", () => {
        connection.disconnect();
      });
    } else {
      message.reply("You need to join a voice channel first!");
    }
  },
};

module.exports = dialup;
