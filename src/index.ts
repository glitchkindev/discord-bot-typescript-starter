import {
    Client,
    SlashCommandBuilder,
    REST,
    Routes,
    Collection,
    MessageFlags,
} from "discord.js";
import { TOKEN, CLIENT_ID } from "./utils/config";
import event from "./events/ready";
import ping from "./commands/ping";
import { SlashCommand } from "./types";

if (!TOKEN || !CLIENT_ID) {
    throw new Error("Discord bot TOKEN is not defined.");
}

const client = new Client({
    intents: [],
});

const slashCommandsArr: SlashCommandBuilder[] = [ping.command];
const slashCommands = new Collection<string, SlashCommand>();
slashCommands.set(ping.command.name, ping);

(async () => {
    try {
        // Construct and prepare an instance of the REST module
        const rest = new REST().setToken(TOKEN);
        console.log(
            `Started refreshing ${slashCommandsArr.length} application (/) commands.`
        );

        // The put method is used to fully refresh all commands in the guild with the current set
        const data = await rest.put(Routes.applicationCommands(CLIENT_ID), {
            body: slashCommandsArr.map((command) => command.toJSON()),
        });

        if (data) {
            console.log(
                `Successfully reloaded ${slashCommandsArr.length} application (/) commands.`
            );
        }
    } catch (error) {
        console.error(error);
    }
})();

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
