import Logger, { CommandDefinition, makeEmbed, makeLines, InputCommandOptions } from '../../lib';
import { CommandCategory, ResponseType } from '../../constants';
import { throws } from 'assert';

const repos = new Map ([
	['org', 'https://github.com/owddm/org'],
	['site','https://github.com/owddm/owddm.com'],
	['data', 'https://github.com/owddm/public'],
	['bot', 'https://github.com/owddm/discord-bot'],
	['accounting', 'https://github.com/owddm/accounting'],
	['survey', 'https://github.com/owddm/survey'],
	['presentations', 'https://github.com/owddm/presentations'],
	['legacy_site', 'https://github.com/owddm/owddm.github.io']
]);

const repoOptions: InputCommandOptions[] = [{
	name: 'repo',
	description: 'enter a valid repo name to get it\'s url'
}];

function getRepoUrl(option: string): string {
	const repo = repos.get(option);
	if (repo === undefined) {
		throw Object.assign(new Error(`Error: ${option} not found`), {code: 404});
	}

	return repo;
}

const errorEmbed = makeEmbed({
	title: '🚫 Error: Repository not found',
	description: makeLines([
		'The indicated repository wasn\'t found, please enter one of the following repositories: ',
		'',
		'• org',
		'',
		'• site',
		'',
		'• data',
		'',
		'• bot',
		'',
		'• accounting',
		'',
		'• survey',
		'',
		'• presentations',
		'',
		'• legacy_site'
	])
});


export const repo: CommandDefinition = {
	name: 'repo',
	options: repoOptions,
	description: 'Fetch one of the OWDDM repos.',
	category: CommandCategory.GENERAL,
	response: ResponseType.EDIT,
	interaction: async (interaction) => {
		const input = interaction.options.getString(repoOptions[0].name)?.trim() ?? 'no text provided';
        
		try {
			const response = getRepoUrl(input);

			interaction.reply({
				content: response
			});
		} catch (error) {
			interaction.reply({
				embeds: [errorEmbed]
			});
		}
	}
};
