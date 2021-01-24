const youtube = require("../utils/youtubeUtils");

module.exports = {
  name: "drums",
  description: "Drums sound!",
  async execute(message, args) {
    const { channel } = message.member.voice;
    if (channel) {
      const connection = await channel.join();
      const onFinish = () => {
        message.channel.send(`Ba dum tss`);
      };
      youtube.play(connection, "https://youtu.be/fRs0OqV4uSc", onFinish);
    } else {
      message.reply("You need to join a voice channel first!");
    }
  },
};
