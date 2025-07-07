import {
    AutocompleteInteraction,
    ClientEvents,
    CommandInteraction,
    SlashCommandBuilder,
} from "discord.js";

export interface BotEvent {
    name: keyof ClientEvents;
    execute: (...args: any[]) => void;
}

export interface SlashCommand {
    command: SlashCommandBuilder;
    execute: (interaction: CommandInteraction) => Promise<void>;
    autocomplete?: (interaction: AutocompleteInteraction) => void;
    cooldown?: number;
}
