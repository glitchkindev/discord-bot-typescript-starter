import { SlashCommandBuilder } from "discord.js";
import { SlashCommand } from "../types";

const user: SlashCommand = {
    command: new SlashCommandBuilder()
        .setName("user")
        .setDescription("Provides information about the user."),
    async execute(interaction) {
        await interaction.reply(
            `This command was run by ${interaction.user.username}.`
        );
    },
};

export default user;
