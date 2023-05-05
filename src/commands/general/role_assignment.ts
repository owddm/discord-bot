import {CommandDefinition, makeLines} from "../../lib";
import {CommandCategory, ResponseType} from "../../constants";
import {
    ActionRowBuilder,
    StringSelectMenuBuilder,
    EmbedBuilder,
    ButtonStyle,
    ActionRow,
    RoleSelectMenuBuilder,
    PermissionsBitField,
    RoleManager,
    ButtonBuilder,
    Role,
    GuildEmoji,
    AttachmentBuilder,
    ContextMenuCommandBuilder,
    Message,
} from "discord.js";
import {client} from "../../index";
import { Roles } from "../../constants";

// const getEmojiId = (emoji: string) => {
//     return client.emojis.resolveId(emoji) ?? 'error no emoji found';
// }
const createRoleButton = (role: string): ButtonBuilder => {

    const emoji = client.emojis.cache.find(emoji => emoji.name?.toLowerCase() === role.toLowerCase());
    console.log(emoji?.id)
    return new ButtonBuilder()
        .setCustomId(role)
        .setLabel(role)
        .setStyle(ButtonStyle.Primary)
        .setEmoji(emoji ? emoji.id : '1098273705743884379')
}
const generateActionRows = (roles: string[], rolesPerRow = 5): ActionRowBuilder<ButtonBuilder>[] => {
    const actionRows: ActionRowBuilder<ButtonBuilder>[] = [];
    for (let i = 0; i < roles.length; i += rolesPerRow) {
        const row = new ActionRowBuilder<ButtonBuilder>();
        for (let j = i; j < i + rolesPerRow && j < roles.length; j++) {
            row.addComponents(createRoleButton(roles[j]));
        }
        actionRows.push(row);
    }
    return actionRows;
};

export const roleSelect: CommandDefinition = {
    name: 'roles',
    description: 'Creates a messages for users to react & add roles from',
    permissions: PermissionsBitField.Flags.BanMembers,
    category: CommandCategory.GENERAL,
    response: ResponseType.STATIC,

    interaction: async (interaction) => {
        const regionEmbed = new EmbedBuilder()
            .setTitle('🗾 Where in Japan are you based?')
            .setDescription('Select an item from the dropdown menu to select a region role')

        const techEmbed = new EmbedBuilder()
            .setTitle('💻 What technologies do you use?')
            .setDescription('Select an item from the dropdown menu to select a tech role')
            .addFields()

        const regionSelectMenu = new StringSelectMenuBuilder()
            .setCustomId('region')
            .setPlaceholder('Select a region')
            .setMaxValues(1)
            .addOptions(regionRoles.map(role => {
                const emoji = client.emojis.cache.find(emoji => emoji.name?.toLowerCase() === role.toLowerCase());
                return {
                    label: role,
                    value: role,
                    emoji: emoji?.id ?? '1098273705743884379',
                }
            }))

        const techSelectMenu = new StringSelectMenuBuilder()
            .setCustomId('tech')
            .setPlaceholder('Select a tech')
            .addOptions(techRoles.map(role => {
                const emoji = client.emojis.cache.find(emoji => emoji.name?.toLowerCase() === role.toLowerCase());
                return {
                    label: role,
                    value: role,
                    emoji: emoji?.id ?? '1098273705743884379',
                }
            }))

        await interaction.channel?.send({
            embeds: [regionEmbed],
            components: [
                new ActionRowBuilder<StringSelectMenuBuilder>().addComponents(regionSelectMenu),
            ],
        })

        await new Promise(resolve => setTimeout(resolve, 1000));

        await interaction.channel?.send({
            embeds: [techEmbed],
            components: [
                new ActionRowBuilder<StringSelectMenuBuilder>().addComponents(techSelectMenu),
            ],
        })

        await interaction.reply({
            content: 'Success!',
            ephemeral: true,
        })


        // const embed = new EmbedBuilder()
        //     .setTitle('Role Assignment')
        //     .setDescription('Rep your region and favorite technologies by selecting the roles below!')
        //     .setColor('#00ff00')
        //
        // const actionRows = generateActionRows(roles)
        //
        // await interaction.reply({
        //     embeds: [embed],
        //     components: [actionRows[0]],
        // })
        //
        // for (let i = 1; i < actionRows.length; i++) {
        //     await interaction.followUp({
        //         components: [actionRows[i]],
        //     });
        // }



    }
}

const regionRoles = [
    'Osaka',
    'Kyoto',
    'Kobe',
    'Tokyo',
    'Aichi',
    'Abroad'
]

const techRoles = [
    'ts',
    'js',
    'csharp',
    'java',
    'kotlin',
    'php',
    'dart',
    'html',
    'css',
    'ruby',
    'rust',
    'c',
    'cpp',
    'python',
    'react',
    'angular',
    'svelte',
    'dotnet',
    'flutter',
    'vue',
    'solidjs',
]
