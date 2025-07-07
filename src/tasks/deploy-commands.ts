import { SlashCommandBuilder, REST, Routes } from "discord.js";
import { TOKEN, CLIENT_ID } from "../utils/config";
import ping from "../commands/ping";
import user from "../commands/user";

const slashCommandsArr: SlashCommandBuilder[] = [ping.command, user.command];

if (!TOKEN || !CLIENT_ID) {
    throw new Error("Discord bot TOKEN is not defined.");
}

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
