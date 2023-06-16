import {Client, Partials, Colors, CacheType, Interaction} from 'discord.js';
import dotenv from 'dotenv';
import Logger, {createCommand, makeLines} from './lib';
import { commands } from './commands/index';
import { Configuration, OpenAIApi } from 'openai';
import { roleHandler } from './handlers/role';

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
		console.log(`Logged in as ${client.user.username}`);
	}

	const existingCommands = await client.application?.commands.fetch();

	if (existingCommands == undefined) {
		return;
	}

	try {
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
		Logger.info(`Created command ${slashCommand.name}!`);
	}


});

client.on('interactionCreate', async (interaction: any) => {

	if(!interaction.guild) {
		Logger.error('bailing because interaction in DM');
		return;
	}

	if(interaction.user.bot) {
		Logger.error('Bailing due to bot message');
	}

	if (interaction.isStringSelectMenu()) {
		await roleHandler(interaction);
	}



	for(const command of commands) {
		if (interaction.commandName == command.name) {
			if(command.interaction == undefined) {
				Logger.error(`Error: ${command.name} has no interaction`);
				break;
			}

			if(command.requiredPermissions) {
				// ignore if user doesn't have permissions
				if(!interaction.member.permissions.has(command.requiredPermissions)) {
					interaction.reply({
						content: makeLines([
							'you do not have sufficient permissions to use this command.',
							'',
							`(missing: ${command.requiredPermissions.join(', ')})`
						]),
						ephemeral: true
					});
					Logger.info(`User ${interaction.member.user.username} doesn't have permissions to run ${command.name}`);
					return;
				}
			}

			Logger.info(`Running command ${command.name}`);
			await command.interaction(interaction);

		}
	}
});
