const youtube = require("../utils/youtubeUtils");

module.exports = {
  name: "jerequin",
  description: "Jerquin is br meme",
  async execute(message, args) {
    const { channel } = message.member.voice;
    if (channel) {
      const connection = await channel.join();
      const onFinish = () => {
        message.channel.send(`<:eggplant:801908816895410196>`);
      };
      youtube.play(connection, "https://youtu.be/9-lorxvAeYc", onFinish, 318);
      setTimeout(() => {
        connection.dispatcher.end();
      }, 10000);
    } else {
      message.reply("You need to join a voice channel first!");
    }
  },
};
