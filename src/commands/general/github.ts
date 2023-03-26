/* eslint-disable indent */
import { octokit } from '../../index';
import { InputCommandOptions, CommandDefinition, makeEmbed } from '../../lib';
import { CommandCategory, ResponseType } from '../../constants';

const githubOptions: InputCommandOptions = {
	name: 'issue_name',
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
        
            const issue_number = Number(interaction.options.getString('issue_id'));
            const response = await octokit.rest.issues.get({
                owner: 'nakajimayoshi',
                repo: 'test-repo',
                issue_number: issue_number
            });

            const githubEmbed = makeEmbed({
                title: `#${response.data.number}: ${response.data.title}`,
                description: response.data.title
            });

            await interaction.reply({ embeds: [githubEmbed] });
        } catch (error) {
            console.log(error);
        }
	}
};

