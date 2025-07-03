import { Client, Events } from "discord.js";
import { BotEvent } from "../types";

export default {
    name: Events.ClientReady,
    execute(client: Client) {
        if (!client.user) return;
        console.log(`Logged in as ${client.user.tag}`);
    },
} as BotEvent;
