import { Client, Events } from "discord.js";
import { BotEvent } from "../types";

const ready: BotEvent = {
    name: Events.ClientReady,
    once: true,
    execute(client: Client) {
        if (!client.user) return;
        console.log(`Logged in as ${client.user.tag}`);
    },
};

export default ready;
