import { Command } from "../ICommands";
import youtube from "../utils/youtubeUtils";

const jerequin: Command = {
  name: "jerequin",
  description: "Jerquin is br meme",
  async execute(message, args) {
    const channel = message.member?.voice.channel;

    if (channel) {
      const connection = await channel.join();

      const onFinish = () => {
        message.channel.send(`<:eggplant:801908816895410196>`);
      };

      youtube.play(connection, "https://youtu.be/9-lorxvAeYc", onFinish, 318, 10000);
    } else {
      message.reply("You need to join a voice channel first!");
    }
  }
};

module.exports = jerequin;
