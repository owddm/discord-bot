import Logger, { CommandDefinition, makeEmbed, InputCommandOptions } from '../../lib';
import { CommandCategory, ResponseType } from '../../constants';
import { openai_api } from '../../index';
import {imagesFromBase64Response} from "../../lib/openai";

const chatgptOptions: InputCommandOptions[] = [{
    name: 'prompt',
    description: 'what will you ask?'
}];

export const chatgpt: CommandDefinition = {
	name: 'chat',
	description: 'Talk with chatgpt.',
	category: CommandCategory.GENERAL,
	options: chatgptOptions,
	response: ResponseType.EDIT,
	interaction: async (interaction) => {

		const input = interaction.options.getString(chatgptOptions[0].name) ?? 'no text provided';
        await interaction.deferReply();
        try {

            const response = await openai_api.createChatCompletion({
                messages: [{role:'user', content: input}],
            });


            const reponseEmbed = makeEmbed({
                title: `${input}`,
                description: response.data.choices[0].message?.content,
                url: 'https://openai.com',
            });

            await interaction.reply({embeds: [reponseEmbed]});

        } catch (error) {
            Logger.error(error)
            await interaction.reply('error: ' + error)
        }
    }
}
