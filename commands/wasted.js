const youtube = require("../utils/youtubeUtils");

module.exports = {
  name: "wasted",
  description: "Wasted GTA sound",
  async execute(message, args) {
    const { channel } = message.member.voice;

    if (channel) {
      const connection = await channel.join();
      youtube.play(connection, "https://youtu.be/K3kFQHKE0LA");
    } else {
      message.reply("You need to join a voice channel first!");
    }
  },
};
