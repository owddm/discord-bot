import { CommandDefinition, InputCommandOptions } from '../../lib';
import { CommandCategory, ResponseType } from '../../constants';
import { say } from 'cowsay';

const cowsayOptions: InputCommandOptions = {
	name: 'cowsay',
	description: 'what?'
};

export const cowsay: CommandDefinition = {
	name: 'cowsay',
	description: 'Emulates the famous UNIX program `cowsay`.',
	category: CommandCategory.MEMES,
	options: cowsayOptions,
	response: ResponseType.EDIT,

	interaction: async (interaction) => {

		const text = interaction.options.getString('cowsay') ?? 'no text provided';

		const output = text
			.replace(/\.(cowsay|cs)\s*/, '')
			.replace(/`/g, '');

		await interaction.reply(`\`\`\`${say(({text: output}))}\`\`\``);
	}
};

