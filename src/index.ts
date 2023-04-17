import { Client, Partials, ClientEvents } from 'discord.js';
import dotenv from 'dotenv';
import Logger, { createCommand } from './lib';
import { commands } from './commands/index';
import { Configuration, OpenAIApi } from 'openai';
import { MessageID } from './constants'
import { roleAdd, roleRemove } from "./handlers/role";
import { roleMessageID } from './commands/general/role_assignment';


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
        Partials.ThreadMember,
    ]
});

export const openai_api: OpenAIApi = new OpenAIApi(new Configuration({
    organization: `${process.env.OPENAI_ORG}`,
    apiKey: `${process.env.OPENAI_TOKEN}`,
}));

client.login(process.env.DISCORD_TOKEN)
    .then()
    .catch((e) => {
        Logger.error(e);
        process.exit(1);
    });

client.on('ready', async() => {
    if(client.user == null) {
        console.log('error, client not found');
    } else {
    console.log(`Logged in as ${client.user.username}`)
    }

    try {
        const existingCommands = await client.application?.commands.fetch()!;
        for (const existingCommand of existingCommands.values()) {
            const commandExists = commands.find((cmd) => cmd.name.includes(existingCommand.name));
            if (!commandExists) {
                await client.application?.commands.delete(existingCommand.id);
                Logger.info(`Deleted old command: ${existingCommand.name}`);
            }
        }
    } catch (error) {
        Logger.error(`Failed to delete old commands: ${error}`);
    }

    for (const command of commands) {
        const slashCommand = createCommand(command);
        client.application?.commands.create(slashCommand);
        Logger.info(`Created command ${slashCommand.name}!`)
    }


});

client.on('messageReactionAdd', async (reaction, user) => {

    if(user.bot || reaction.message.id !== roleMessageID) return;
    if(reaction.message.id == roleMessageID) {
        await roleAdd(reaction, user);
    }
});

client.on('messageReactionRemove', async (reaction, user) => {
    if(user.bot || reaction.message.id !== roleMessageID) return;
    if(reaction.message.id == roleMessageID) {
        await roleRemove(reaction, user);
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
