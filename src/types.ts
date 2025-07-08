import {
    AutocompleteInteraction,
    ClientEvents,
    CommandInteraction,
    SlashCommandBuilder,
    Collection
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

declare module "discord.js" {
    interface Client {
        commands: Collection<string, any>;
    }
}
