import {
	Client,
	Partials,
	Events,
	Message,
	ChannelType,
	FetchedThreads,
	TextChannel,
	ThreadAutoArchiveDuration
} from 'discord.js';
import dotenv from 'dotenv';
import { Octokit } from 'octokit';
import Logger, { createCommand } from './lib';
import { commands } from './commands/index';
import express, { Request, Response } from 'express';
import { Webhooks, createNodeMiddleware } from '@octokit/webhooks';
import path from 'path';
import fs from 'fs';
import { githubIssueHandler, updateGithubIssues } from "./handlers/github-api";
import bodyParser from 'body-parser';
import EventSource from 'eventsource';
import { match } from 'assert';
import {Channels, guildId} from './constants';
import { makeEmbed } from './lib';
import {Channel} from "diagnostics_channel";

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
	await githubIssueHandler(msg);
});

client.on(Events.ClientReady, async () => {
	if (client.user == null) {
		console.log('error, client not found');
	} else {
		console.log(`Logged in as ${client.user.username}`);
	}

	// run this function every 24 hours
	// setInterval(() => {

	await updateGithubIssues();
	// }, 1000 * 60 * 60 * 24);

	for (const command of commands) {
		const slashCommand = createCommand(command);
		client.application?.commands.create(slashCommand);
	}

	client.on(Events.InteractionCreate, async (interaction: any) => {
		if (!interaction.isCommand()) return;

		if (!interaction.guild) {
			Logger.error('bailing because interaction in DM');
			return;
		}

		if (interaction.user.bot && !interaction.webhook) {
			Logger.error('Bailing due to bot message');
		}

		for (const command of commands) {
			if (command.interaction == undefined) {
				Logger.error(`Error: ${command.name} has no interaction`);
				break;
			}
			if (interaction.commandName == command.name) {
				await command.interaction(interaction);
			}
		}
	});

	function makeEmbed(arg0: { title: any; description: any; }): import("discord.js").Embed {
		throw new Error('Function not implemented.');
	}
});
