import {
    ActionRowBuilder,
    StringSelectMenuBuilder,
    EmbedBuilder,
    PermissionsBitField, Message,
} from 'discord.js';
import { client } from '../../index';
import {CommandDefinition, makeEmbed} from '../../lib';
import { CommandCategory, ResponseType, techRoles, regionRoles } from '../../constants';

export const regionEmbed = makeEmbed({
    title: '🗾 Where in Japan are you based?',
    description: 'Select an item from the dropdown menu to select a region role'
}).toJSON()

export const techEmbed = makeEmbed({
    title: '💻 What technologies do you use?',
    description: 'Select an item from the dropdown menu to select a tech role'
}).toJSON()

export const createMenu = (
    customId: string,
    placeholder: string,
    options: string[],
    maxValues?: number,
    minValues?: number,
) => {
    return new StringSelectMenuBuilder({
        customId: customId,
        placeholder: placeholder,
        minValues: minValues ? minValues : 0,
        maxValues:  maxValues ? maxValues : options.length,
        options: options.map(role => {
            const emoji = client.emojis.cache.find(
                emoji => emoji.name?.toLowerCase() === role.toLowerCase());
            return {
                label: role,
                value: role,
                emoji: emoji?.id ?? '1098273705743884379',
            }
        })
    })
}

export const roleSelect: CommandDefinition = {
    name: 'roles',
    description: 'Creates a messages for users to react & add roles from',
    requiredPermissions: ['BanMembers'],
    category: CommandCategory.MODERATION,
    response: ResponseType.STATIC,

    interaction: async (interaction) => {

        // TODO: placing these menus outside the interaction callback results in a null client error...

        const regionSelectMenu = createMenu(
            'regionRole',
            'Select a region',
            regionRoles,
            1
        );

        const techSelectMenu = createMenu(
            'techRole',
            'Select your favorite technologies',
            techRoles,
            1,
        )

        const regionRow = new ActionRowBuilder<StringSelectMenuBuilder>()
            .addComponents(regionSelectMenu);

        const techRow = new ActionRowBuilder<StringSelectMenuBuilder>()
            .addComponents(techSelectMenu);


        await interaction.channel?.send({
            embeds: [regionEmbed],
            components: [regionRow]
        })

        await interaction.channel?.send({
            embeds: [techEmbed],
            components: [techRow]
        })

        await interaction.reply({
            content: 'Success!',
            ephemeral: true,
        })
    }
}
