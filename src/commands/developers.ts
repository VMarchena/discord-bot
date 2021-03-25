import { Command } from "../ICommands";
import fs from 'fs';

const developers: Command = {
  name: "developers",
  description: "Steve Ballmer's emotional speech asking for developers to join development of apps to his new OS",
  async execute(message, args) {
    const channel = message.member?.voice.channel;

    if (channel) {
      const connection = await channel.join();

      const dispatcher = connection.play(fs.createReadStream('src/sounds/developers.mp3'))

      dispatcher.on("finish", () => {
        connection.disconnect();
      });
    } else {
      message.reply("You need to join a voice channel first!");
    }
  },
};

module.exports = developers;
