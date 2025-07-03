import { ClientEvents } from "discord.js";

export interface BotEvent {
    name: keyof ClientEvents;
    execute: (...args: any[]) => void;
}
