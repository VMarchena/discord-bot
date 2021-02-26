import youtube from "../utils/youtubeUtils";
import { Command } from "../ICommands";

const impostor: Command = {
  name: "impostor",
  description: "Impostor (from AmongUs!)",
  async execute(message, args) {
    const channel = message.member?.voice.channel;

    if (channel) {
      const connection = await channel.join();
      youtube.play(connection, "https://youtu.be/uG45me0ekts");
    } else {
      message.reply("You need to join a voice channel first!");
    }
  },
};

module.exports = impostor;
