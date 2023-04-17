import {CommandDefinition} from "../../lib";
import {CommandCategory, ResponseType} from "../../constants";
import {CacheType, ChatInputCommandInteraction, MessageActionRowComponentBuilder} from 'discord.js';

export const roleSelect: CommandDefinition = {
    name: 'roles',
    description: 'Creates a messages for users to react & add roles from',
    category: CommandCategory.GENERAL,
    response: ResponseType.STATIC,

    interaction: async (interaction) => {
        await interaction.reply('test');
    }
}
