import ytdl from "discord-ytdl-core";
import { VoiceConnection } from "discord.js";

const youtube =  {
  play(connection: VoiceConnection, url: string, onFinish = function () {}, seek = 0, timeout = 0 ) {
    const stream = ytdl(url, {
      filter: "audioonly",
      opusEncoded: true,
      seek,
      encoderArgs: ["-af", "bass=g=10,dynaudnorm=f=200"],
    });

    const dispatcher = connection.play(stream, {
      type: "opus",
    });

    if (timeout > 0) {
      setTimeout(() => {
        connection.dispatcher.end();
      }, timeout);
    }
    
    dispatcher.on("finish", () => {
      onFinish();
      connection.disconnect();
    });
  },
};

export default youtube;