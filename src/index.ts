import { Client, SlashCommandBuilder, REST, Routes } from "discord.js";
import { TOKEN, CLIENT_ID } from "./utils/config";
import event from "./events/ready";
import ping from "./commands/ping";

if (!TOKEN || !CLIENT_ID) {
    throw new Error("Discord bot TOKEN is not defined.");
}

const client = new Client({
    intents: [],
});

const slashCommands : SlashCommandBuilder[] = [ping.command];

(async () => {
    try {
        // Construct and prepare an instance of the REST module
        const rest = new REST().setToken(TOKEN);
        console.log(
            `Started refreshing ${slashCommands.length} application (/) commands.`
        );

        // The put method is used to fully refresh all commands in the guild with the current set
        const data = await rest.put(Routes.applicationCommands(CLIENT_ID), {
            body: slashCommands.map((command) => command.toJSON()),
        });

        if (data) {
            console.log(
                `Successfully reloaded ${slashCommands.length} application (/) commands.`
            );
        }
    } catch (error) {
        console.error(error);
    }
})();


client.once(event.name, (...args: any) => event.execute(...args));

client.login(TOKEN);
