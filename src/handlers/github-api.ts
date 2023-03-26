import {Message, ChannelType, TextChannel, ThreadAutoArchiveDuration } from 'discord.js';
import { Channels } from "../constants";
import Logger, {makeEmbed} from "../lib";
import {client} from "../index";

export const githubIssueHandler = async (msg: Message) => {
    if (msg.channel.type !== ChannelType.GuildText) return;
    if(msg.author.bot) Logger.info('Bailing: User is bot');

    const issuePayload = msg.embeds[0];
    const targetChannel = client.channels.cache.get(Channels.GENERAL) as TextChannel ?? undefined;
    let issueTitle = issuePayload.title?.split('#')[1].replace(/^\d+\s/, '');

    if(issuePayload.title?.includes('New comment')) {
        Logger.info(JSON.stringify(msg.embeds))

        issueTitle = issuePayload.title?.split(':')[1].replace(/^\d+\s/, '').replace(/\s/g, '');
        
        const thread = targetChannel.threads.cache.find((thread) =>
            thread.name == issueTitle
        )

        if(thread == undefined) {
            Logger.error('Thread not found');
            return;
        }

        Logger.info(`sending comment to thread ${thread.id}`);

        const commentEmbed = makeEmbed({
            title: `New comment from ${issuePayload.author?.name}`,
            description: `${issuePayload.description}`,
            url: issuePayload.url!
        })

        thread.send({embeds: [commentEmbed]});

        return;
    }

    Logger.info('Creating new thread');
    // send the thread to the general channel whos ID is stored as an enum in constants.ts

    if(targetChannel == undefined) {
        Logger.error('General channel not found');
        return;
    }

    await targetChannel.threads.create({
        name: issueTitle ?? 'no name provided',
        autoArchiveDuration: ThreadAutoArchiveDuration.OneWeek,
        reason: 'New issuePayload created',
    }).then((thread) => {
        const newIssueEmbed = makeEmbed({
            title: `${issuePayload.author?.name} opened a new issue`,
            description: issuePayload.description ?? 'No description provided',
            url: issuePayload.url!,
        })
        thread.send({embeds: [newIssueEmbed]});
    }).catch((e) => {
        Logger.error(e);
    });
}
