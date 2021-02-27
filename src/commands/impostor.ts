import youtube from "../utils/youtubeUtils";
import { Command } from "../ICommands";

const impostor: Command = {
  name: "impostor",
  description: "Impostor (from AmongUs!)",
  async execute(message, args) {
    const channel = message.member?.voice.channel;

    if (channel) {
      const connection = await channel.join();
      const onFinish = () => {
        message.channel.send(`https://tenor.com/view/puppyy3533amoung-us-puppyy-kitchen-pantry-amoung-us-impostor-puppyy-amoung-us-impostor-gif-18651428`);
      };
      youtube.play(connection, "https://youtu.be/uG45me0ekts", onFinish);
    } else {
      message.reply("You need to join a voice channel first!");
    }
  },
};

module.exports = impostor;
