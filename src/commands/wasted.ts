import youtube from "../utils/youtubeUtils";
import { Command } from "../ICommands";

const wasted: Command = {
  name: "wasted",
  description: "Wasted GTA sound",
  async execute(message, args) {
    const channel = message.member?.voice.channel;

    if (channel) {
      const connection = await channel.join();
      youtube.play(connection, "https://youtu.be/K3kFQHKE0LA");
    } else {
      message.reply("You need to join a voice channel first!");
    }
  },
};

module.exports = wasted;
