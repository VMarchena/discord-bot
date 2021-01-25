const ytdl = require("discord-ytdl-core");

module.exports = {
  play(connection, url, onFinish = function () {}, seek = 0, timeout = 0 ) {
    let stream = ytdl(url, {
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
