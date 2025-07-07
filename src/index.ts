import { Client, Collection, MessageFlags } from "discord.js";
import { TOKEN, CLIENT_ID } from "./utils/config";
import event from "./events/ready";
import ping from "./commands/ping";
import user from "./commands/user";
import { SlashCommand } from "./types";

if (!TOKEN || !CLIENT_ID) {
    throw new Error("Discord bot TOKEN is not defined.");
}

const client = new Client({
    intents: [],
});

const slashCommands = new Collection<string, SlashCommand>();
slashCommands.set(ping.command.name, ping);
slashCommands.set(user.command.name, user);

client.once(event.name, (...args: any) => event.execute(...args));

client.on("interactionCreate", async (interaction) => {
    if (!interaction.isCommand()) return;
    const command = slashCommands.get(interaction.commandName);

    if (!command) {
        console.error(
            `No command matching ${interaction.commandName} was found.`
        );
        return;
    }

    try {
        await command.execute(interaction);
    } catch (error) {
        console.error(error);
        if (interaction.replied || interaction.deferred) {
            await interaction.followUp({
                content: "There was an error while executing this command!",
                flags: MessageFlags.Ephemeral,
            });
        } else {
            await interaction.reply({
                content: "There was an error while executing this command!",
                flags: MessageFlags.Ephemeral,
            });
        }
    }
});

client.login(TOKEN);
