import { Client, Partials, Events, Message, ChannelType, FetchedThreads } from 'discord.js';
import dotenv from 'dotenv';
import { Octokit } from 'octokit';
import Logger, { createCommand } from './lib';
import { commands } from './commands/index';
import express, { Request, Response } from 'express';
import { Webhooks, createNodeMiddleware } from '@octokit/webhooks';
import path from 'path';
import fs from 'fs';
import { githubIssueHandler } from "./handlers/github-api";
import bodyParser from 'body-parser';
import EventSource from 'eventsource';
import { match } from 'assert';
import { guildId } from './constants';
import { makeEmbed } from './lib';

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

export const octokit = new Octokit({ 
	auth: process.env.GITHUB_TOKEN
});

export const githubWebhook = new Webhooks({
	secret: `${process.env.GITHUB_WEBHOOK_SECRET}`,
});

export const app = express();

const port = 3000;

app.listen(port, () => {
	try {
		Logger.info(`app listening on port ${port}`);
	} catch(e) {
		Logger.error(e);
	}
});

app.use(bodyParser.json())

githubWebhook.onAny(({ id, name, payload }) => {
	Logger.info(name, "event received");
	Logger.info(id, "event received");
	Logger.info(payload)
});
  

client.login(process.env.DISCORD_TOKEN)
	.then()
	.catch((e) => {
		Logger.error(e);
		process.exit(1);
	});
	

client.on('disconnect', () => {
    Logger.warn('Client disconnected');
});

client.on(Events.MessageCreate, async (msg: Message) => {
	if(msg.author.bot && msg.webhookId) {
		await githubIssueHandler(msg)
	} else {
		return
	}


});
	
client.on(Events.ClientReady, () => {
	if(client.user == null) {
		console.log('error, client not found');
	} else {
		console.log(`Logged in as ${client.user.username}`);
	}
	
	for (const command of commands) {
		const slashCommand = createCommand(command);
		client.application?.commands.create(slashCommand);
	}

});

client.on(Events.InteractionCreate, async (interaction: any) => {
	if (!interaction.isCommand()) return;

	if(!interaction.guild) {
		Logger.error('bailing because interaction in DM');
		return;
	}

	if(interaction.user.bot && !interaction.webhook) {
		Logger.error('Bailing due to bot message');
	}

	for(const command of commands) {
		if (interaction.commandName == command.name) {
			if(command.interaction == undefined) {
				Logger.error(`Error: ${command.name} has no interaction`);
				break;
			}
			await command.interaction(interaction);
		}
	}
});
