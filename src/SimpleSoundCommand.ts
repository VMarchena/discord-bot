import fs from 'fs';
import { Message } from "discord.js";
import { Command } from "./ICommands";;

export type SoundConfigs = {
  description: string;

  messageBefore: string;
  messageAfter: string;
};

export class SimpleSoundCommand implements Command {
  name: string;
  description: string;
  configs: SoundConfigs

  constructor(name: string, configs: SoundConfigs) {
    this.name = name;
    this.description = configs.description;

    this.configs = configs;
  }

  async execute(message: Message, args: string[]): Promise<void> {
    const channel = message.member?.voice.channel;

    if (channel) {
      const connection = await channel.join();

      if (this.configs.messageBefore) {
        message.channel.send(this.configs.messageBefore);
      }

      const dispatcher = connection.play(fs.createReadStream(`src/sounds/${this.name}.mp3`));

      dispatcher.on("finish", () => {
        if (this.configs.messageAfter) {
          message.channel.send(this.configs.messageAfter);
        }

        connection.disconnect();
      });
    } else {
      message.reply("You need to join a voice channel first!");
    }
  }
}
