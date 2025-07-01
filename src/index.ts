import { Client, GatewayIntentBits } from "discord.js";
import { TOKEN } from "./utils/config";

const client = new Client({
    intents: [GatewayIntentBits.Guilds],
});

client.on("ready", (client: Client) => {
    if (!client.user) return;
    console.log(`Logged in as ${client.user.tag}`);
});

client.login(TOKEN);
