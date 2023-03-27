/* eslint-disable indent */
import { octokit } from '../../index';
import Logger, { InputCommandOptions, CommandDefinition, makeEmbed } from '../../lib';
import { CommandCategory, ResponseType } from '../../constants';


const githubOptions: InputCommandOptions = {
    name: 'issue_title',
    description: 'Name of the issue',
};

export const githubIssueCreate: CommandDefinition = {
    name: 'github',
    description: 'Fetches the github issues',
    category: CommandCategory.GENERAL,
    options: githubOptions,
    response: ResponseType.EDIT,
    interaction: async (interaction) => {
        try {
            const issue_title = interaction.options.getString('issue_number');

        } catch (e) {
            Logger.error(e);
        }
    }
}