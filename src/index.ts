import { Partials, Client } from 'discord.js';
import * as dotenv from 'dotenv'

dotenv.config();
export const client = new Client({
    intents: [
        'Guilds',
        'GuildMembers',
        'GuildPresences',
        'GuildMessages',
        'GuildMessageReactions',
        'GuildEmojisAndStickers',
        'GuildBans',
        'DirectMessages',
        'DirectMessageReactions',
        'DirectMessageTyping',
        'MessageContent',
    ],
    partials: [
        Partials.Channel,
        Partials.Message,
        Partials.User,
        Partials.GuildMember,
        Partials.Reaction,
    ],
});

client.on("ready", () => {
    console.log("Bot is online");
});

client.on("messageCreate", (message) => {
    if (message.content.startsWith("ping")) {
        message.channel.send("pong!");
    }
});


client.login(process.env.DISCORD_TOKEN);