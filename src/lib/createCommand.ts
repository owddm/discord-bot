import {SlashCommandBuilder} from '@discordjs/builders';
import {ResponseType} from '../constants';
import Logger from './logger';
import {APIPost, CommandDefinition} from './CommandDefinition';

function addStringOption(builder: SlashCommandBuilder, name: string, description: string) {
	return builder.addStringOption(option =>
		option.setName(name)
			.setDescription(description)
			.setRequired(true)
	);
}

export function createCommand(command: CommandDefinition): APIPost {
	const builder = new SlashCommandBuilder()
		.setName(command.name)
		.setDescription(command.description);

	if (command.options) {
		command.options.forEach(option => {
			addStringOption(builder, option.name, option.description);
		});
	} else if (command.response !== ResponseType.STATIC) {
		Logger.error(`Error: ${command.name} is of type ${command.response} with no option name or description`);
	}

	return builder.toJSON();
}
