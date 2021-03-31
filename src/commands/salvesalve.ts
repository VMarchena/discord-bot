import { Command } from "../ICommands";
import fs from 'fs';

const salvesalve: Command = {
  name: "salvesalve",
  description: "Salve, salve, família! - Classic Flow Podcast greeting",
  async execute(message, args) {
    const channel = message.member?.voice.channel;

    if (channel) {
      const connection = await channel.join();

      const dispatcher = connection.play(fs.createReadStream('src/sounds/salvesalve.mp3'))
     
      dispatcher.on("finish", () => {
        connection.disconnect();
      });
    } else {
      message.reply("You need to join a voice channel first!");
    }
  },
};

module.exports = salvesalve;
