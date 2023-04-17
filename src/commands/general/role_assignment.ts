import {CommandDefinition} from "../../lib";
import {CommandCategory, ResponseType} from "../../constants";
import {Emoji, Message} from 'discord.js';

export const roleSelect: CommandDefinition = {
    name: 'roles',
    description: 'Creates a messages for users to react & add roles from',
    category: CommandCategory.GENERAL,
    response: ResponseType.STATIC,

    interaction: async (interaction) => {
       const message =  await interaction.reply({
            content: 'select a role',
            fetchReply: true,
        });

        await message.react(message.client.emojis.cache.get('875215256190873621')!);
    }
}
