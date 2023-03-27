import Logger, { CommandDefinition, InputCommandOptions } from '../../lib';
import { CommandCategory, ResponseType } from '../../constants';
import { openai_api } from '../../index';
import { ErrorEvent } from 'discord.js';

const chatgptOptions: InputCommandOptions = {
	name: 'input',
	description: 'what will you ask?'
};

export const chatgpt: CommandDefinition = {
	name: 'chatgpt',
	description: 'Talk with chatgpt.',
	category: CommandCategory.MEMES,
	options: chatgptOptions,
	response: ResponseType.EDIT,
	interaction: async (interaction) => {

		const input = interaction.options.getString('input') ?? 'no text provided';
        try {
        const response = await openai_api.createChatCompletion({
            model: 'gpt-4',
            messages: [{role: 'assistant', content: input}]  
	    });


        await interaction.reply('response: ' + response.data.choices[0].message)
    } catch (error) {
        Logger.error(error)
        await interaction.reply('error: ' + error)
        }
    }      
}
