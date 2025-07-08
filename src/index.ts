import { Client, Collection } from "discord.js";
import { TOKEN, CLIENT_ID } from "./utils/config";
import { botCommands } from "./utils/command-utils";
import { botEvents } from "./utils/event-utils";
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

for (const event of botEvents) {
    if (event.once === true) {
        client.once(event.name, (...args: any) => event.execute(...args));
    } else {
        client.on(event.name, (...args: any) => event.execute(...args));
    }
}

client.login(TOKEN);
