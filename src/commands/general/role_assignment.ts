import {makeEmbed, CommandDefinition, makeLines} from "../../lib";
import { CommandCategory, ResponseType } from "../../constants";
import { EmbedBuilder } from "discord.js";

export const roleSelect: CommandDefinition = {
    name: 'roles',
    description: 'Creates a messages for users to react & add roles from',
    category: CommandCategory.GENERAL,
    response: ResponseType.STATIC,

    interaction: async (interaction) => {

        const roleEmbed = new EmbedBuilder()
            .setTitle('Select a role')
            .setDescription(makeLines([
                'React to this message to add a role to yourself',
                '',
                'React again to remove the role',
                '',
                '🛠: Volunteer',
            ]))

        await interaction.reply({
            embeds: [roleEmbed],
            fetchReply: true,
        }).then((message) => {
            message.react('🛠');
        });
    }
}
