import Logger, {CommandDefinition, makeEmbed, InputCommandOptions, makeLines} from '../../lib';
import { CommandCategory, ResponseType } from '../../constants';
import { openai_api } from '../../index';
import { EmbedBuilder, Colors } from "discord.js";

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

		const input = interaction.options.getString(chatgptOptions[0].name)?.trim() ?? 'no text provided';
        const maxChars = 300;
        if(input.length > maxChars) {
            const overMaxEmbed = new EmbedBuilder({
                title: '🚫 Error: Character Limit Exceeded',
                description: makeLines([
                    `Please provide a prompt less than ${maxChars} characters long.`,
                    `You provided ${input.length} characters.`,
                    '',
                    `For prompts longer than the maximum, please visit https://chat.openai.com`
                ]),
                color: Colors.Red,
            })
            await interaction.reply({
                embeds: [overMaxEmbed],
                ephemeral: true,
            });
            return;
        }

        await interaction.deferReply();
        try {
            console.log(`${input.length}`)
            const response = await openai_api.createChatCompletion({
                model: 'gpt-3.5-turbo',
                messages: [{role:'user', content: input}],
            });

            const responseEmbed = new EmbedBuilder({
                title: input,
                description: response.data.choices[0].message?.content,
                footer: {
                    text: 'https://openai.com',
                }
            })
            
            await interaction.followUp({embeds: [responseEmbed]});

        } catch (error) {
            Logger.error(error)
            await interaction.reply('error: ' + error)
        }
    }
}
