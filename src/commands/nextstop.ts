import fs from "fs";
import { Collection } from "discord.js";
import { Command } from "../ICommands";
import { Message } from "discord.js";

enum LineEnum {
  L1 = 'l1',
  L2 = 'l2',
  L4 = 'l4'
}

class NextStopCommand implements Command {
  name: string = "nextstop";
  description: string = "Plays the next stop announcement from Metro Rio's stations";

  announcements = this.getAnnouncements();

  async execute(message: Message, args: string[]): Promise<void> {
    const lineArg = args.shift();
    const stationArg = args.shift();

    if (lineArg == 'list') {
      this.listLines(message);
      return;
    }

    const parsedLine: LineEnum | undefined = this.getLineFromArg(lineArg);
    const line = parsedLine || this.getRandomLine();

    // NOTE(erick): The list station command should only work if a valid line was passed.
    if (parsedLine && stationArg == 'list') {
      this.listStations(message, parsedLine);
      return;
    }

    if (stationArg) {
      await this.playStationAnnouncement(message, line, stationArg);
    } else {
      await this.playRandomAnnouncementForLine(message, line);
    }
  }

  async playStationAnnouncement(message: Message, line: LineEnum, stationName: string): Promise<void> {
    const stations = this.announcements.get(line);
    if (!stations) { return; }

    const station = stations.get(stationName);
    if (!station) {
      const msg = `Station **${stationName}** does not belong to **${line}**. Try \`!nextstop ${line} list\`.`;
      this.outputMessage(message, msg);
      return;
    }

    this.playSound(message, station);
  }

  async playRandomAnnouncementForLine(message: Message, line: LineEnum): Promise<void> {
    const stations = this.announcements.get(line);
    if (!stations) { return; }

    await this.playSound(message, stations.random());
  }

  listLines(message: Message): void {
    var msg = 'Available lines are:\n';
    Object.values(LineEnum).forEach((l) => {
      msg += `\t**${l}**\n`;
    });

    this.outputMessage(message, msg);
  }

  listStations(message: Message, line: LineEnum): void {
    var msg = 'Available stations are:\n';
    const stations = this.announcements.get(line);
    if (!stations) { return; }

    stations.each((_, name) => {
      msg += `\t**${name}**\n`;
    });

    this.outputMessage(message, msg);
  }

  // TODO(erick): Write a more generic implementation of this function
  getRandomLine(): LineEnum {
    const random = Math.random();
    if (random <= 1/3) {
      return LineEnum.L1;
    }

    if (random <= 2/3) {
      return LineEnum.L2;
    }

    return LineEnum.L4;
  }

  getLineFromArg(lineArg: string | undefined): LineEnum | undefined {
    if (lineArg) {
      return Object.values(LineEnum).find(l => l === lineArg);
    }

    return undefined;
  }

  getAnnouncements(): Collection<LineEnum, Collection<string, string>> {
    const result = new Collection<LineEnum, Collection<string, string>>();

    // NOTE(erick): Yes, this could be a for loop. But if you think about
    // it, this code will need to be changed only when they add another
    // line to Metro Rio. And we know that the tectonic plates move faster
    // than the Metro Rio expands.
    result.set(LineEnum.L1, this.getAnnouncementsForLine(LineEnum.L1));
    result.set(LineEnum.L2, this.getAnnouncementsForLine(LineEnum.L2));
    result.set(LineEnum.L4, this.getAnnouncementsForLine(LineEnum.L4));

    return result;
  }

  getAnnouncementsForLine(line: LineEnum): Collection<string, string> {
    const result = new Collection<string, string>();
    const lineFiles = fs
      .readdirSync(`./src/sounds/nextstop/${line}`)
      .filter((file) => file.endsWith(".mp3"));

    lineFiles.forEach((lineFile) => {
      const basename = lineFile.replace('.mp3', '');

      result.set(basename, `./src/sounds/nextstop/${line}/${lineFile}`);
    });

    return result;
  }

  outputMessage(message: Message, msg: string): void {
    message.reply(msg);
  }

  async playSound(message: Message, path: string): Promise<void> {
    const channel = message.member?.voice.channel;

    if (channel) {
      const connection = await channel.join();

      const dispatcher = connection.play(fs.createReadStream(path));

      dispatcher.on("finish", () => {
        connection.disconnect();
      });

    } else {
      message.reply("You need to join a voice channel first!");
    }
  }
}

const nextstop: Command = new NextStopCommand();
module.exports = nextstop;
