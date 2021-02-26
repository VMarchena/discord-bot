import Discord from "discord.js";

export interface Command {
    name: string;
    description: string;
    execute(message: Discord.Message, args: string[]): void;
}