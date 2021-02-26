import youtube from "../utils/youtubeUtils";
import { Command } from "../ICommands";

const fire: Command = {
  name: "fire",
  description: "Fireworks sound!",
  async execute(message, args) {
    const channel = message.member?.voice.channel;

    if (channel) {
      const connection = await channel.join();
      
      const onFinish = () => {
        message.channel.send(
          `PA\nPA PA PA\nPOW\n<:fireworks:801889215721373776>`
        );
      };

      youtube.play(connection, "https://youtu.be/GikXBt0oqWs", onFinish);
    } else {
      message.reply("You need to join a voice channel first!");
    }
  }
}

module.exports = fire;
