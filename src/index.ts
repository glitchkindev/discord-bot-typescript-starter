import { Client } from "discord.js";
import { TOKEN } from "./utils/config";
import event from "./events/ready";

const client = new Client({
    intents: [],
});

client.on(event.name, (...args: any) => event.execute(...args));

client.login(TOKEN);
