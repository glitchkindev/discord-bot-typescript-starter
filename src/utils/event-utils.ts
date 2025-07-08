import fs from "node:fs";
import path from "node:path";
import { BotEvent } from "../types";

function loadEvents(): BotEvent[] {
    const botEvents: BotEvent[] = [];
    const eventsPath = path.join(__dirname, "../events");
    const eventFiles = fs
        .readdirSync(eventsPath)
        .filter((file) => file.endsWith(".js") || file.endsWith(".ts"));

    for (const file of eventFiles) {
        const filePath = path.join(eventsPath, file);
        const eventModule = require(filePath);
        const event: BotEvent = eventModule.default;
        console.log(eventModule);
        botEvents.push(event);
    }
    return botEvents;
}

export const botEvents = loadEvents();