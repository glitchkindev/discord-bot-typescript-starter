import { Client, Collection } from "discord.js";
import { TOKEN, CLIENT_ID } from "./utils/config";
import event from "./events/ready";
import otherEvent from "./events/interactionCreate";
import { botCommands } from "./utils/command-utils";
import { SlashCommand } from "./types";

if (!TOKEN || !CLIENT_ID) {
    throw new Error("Discord bot TOKEN is not defined.");
}

const client = new Client({
    intents: [],
});

client.commands = new Collection<string, SlashCommand>();
for (const command of botCommands) {
    client.commands.set(command.command.name, command);
}
client.once(event.name, (...args: any) => event.execute(...args));

client.on(otherEvent.name, (...args: any) => otherEvent.execute(...args));

client.login(TOKEN);
