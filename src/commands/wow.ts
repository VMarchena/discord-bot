import youtube from "../utils/youtubeUtils";
import { Command } from "../ICommands";

const wow: Command = {
  name: "wow",
  description: "* WOOOOOOW *",
  async execute(message, args) {
    const channel = message.member?.voice.channel;

    if (channel) {
      const connection = await channel.join();
      youtube.play(connection, "https://youtu.be/H_MmebNYXDs");
    } else {
      message.reply("You need to join a voice channel first!");
    }
  },
};

module.exports = wow;
