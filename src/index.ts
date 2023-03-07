import {Client, Partials } from 'discord.js';
import dotenv from 'dotenv';
import Logger, { createCommand} from './lib';
import {commands} from './commands/index';

dotenv.config();

export const client = new Client({
    intents: [
        'Guilds',
        'GuildMembers',
        'GuildPresences',
        'GuildMessages',
        'GuildMessageReactions',
        'GuildEmojisAndStickers',
        'DirectMessages',
        'DirectMessageReactions',
        'DirectMessageTyping',
        'MessageContent',
    ],
    partials: [
        Partials.Channel,
        Partials.Message,
        Partials.GuildMember,
        Partials.Reaction,
        Partials.User,
    ],
});

client.login(process.env.DISCORD_TOKEN)
    .then()
    .catch((e) => {
        Logger.error(e);
        process.exit(1);
    });

client.on('ready', () => {
    if(client.user == null) {
        console.log('error, client not found');
    } else {
    console.log(`Logged in as ${client.user.username}`)
    }

    for (const command of commands) {
        const slashCommand = createCommand(command);
        client.application?.commands.create(slashCommand);
    }

});

client.on('interactionCreate', async (interaction: any) => {
    if (!interaction.isCommand()) return;

    if(!interaction.guild) {
        Logger.error('bailing because interaction in DM');
        return;
    }

    if(interaction.user.bot) {
        Logger.error('Bailing due to bot message');
    }

    for(const command of commands) {
        if (interaction.commandName == command.name) {
            if(command.interaction == undefined) {
                Logger.error(`Error: ${command.name} has no interaction`);
                break;
            }
                await command.interaction(interaction)
        }
    }
});
