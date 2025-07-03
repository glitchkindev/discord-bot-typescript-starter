import { SlashCommandBuilder } from "discord.js";
import { SlashCommand } from "../types";

const ping: SlashCommand = {
    command: new SlashCommandBuilder()
        .setName("ping")
        .setDescription("Replies with Pong!"),
    async execute(interaction) {
        await interaction.reply({ content: "Pong!" });
    },
    cooldown: 3,
};

export default ping;
