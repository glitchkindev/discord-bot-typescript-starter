import fs from "node:fs";
import path from "node:path";
import { SlashCommand } from "../types";

function loadCommands(): SlashCommand[] {
    const botCommands: SlashCommand[] = [];
    const commandsPath = path.join(__dirname, "../commands");
    const commandFiles = fs
        .readdirSync(commandsPath)
        .filter((file) => file.endsWith(".js") || file.endsWith(".ts"));

    for (const file of commandFiles) {
        const filePath = path.join(commandsPath, file);
        const commandModule = require(filePath);
        const command: SlashCommand = commandModule.default;
        botCommands.push(command);
    }
    return botCommands;
}

export const botCommands = loadCommands();
