import {CommandDefinition, makeLines} from "../../lib";
import {CommandCategory, ResponseType} from "../../constants";
import {
    ActionRowBuilder,
    StringSelectMenuBuilder,
    EmbedBuilder,
    ButtonStyle,
    ActionRow,
    RoleSelectMenuBuilder,
    Role,
    StringSelectMenuOptionBuilder,
    StringSelectMenuComponent,
    PermissionsBitField,
    SelectMenuBuilder
} from "discord.js";
import {client} from "../../index";

// const getEmojiId = (emoji: string) => {
//     return client.emojis.resolveId(emoji) ?? 'error no emoji found';
// }

export const roleSelect: CommandDefinition = {
    name: 'roles',
    description: 'Creates a messages for users to react & add roles from',
    permissions: PermissionsBitField.Flags.BanMembers,
    category: CommandCategory.GENERAL,
    response: ResponseType.STATIC,

    interaction: async (interaction, user) => {

        const regionEmbed = new EmbedBuilder()
            .setTitle('Select a role')
            .setDescription(makeLines([
                'Select a regional role from the menu',
                '',
            ]))

        const webLangEmbed = new EmbedBuilder()
            .setTitle('Select a role')
            .setDescription(makeLines([
                'Select a web language role from the menu',
                '',
            ]))

        const systemsLangEmbed = new EmbedBuilder()
            .setTitle('Select a role')
            .setDescription(makeLines([
                'Select a systems language role from the menu',
                '',
            ]))

        const frameworksEmbed = new EmbedBuilder()
            .setTitle('Select a role')
            .setDescription(makeLines([
                'Select a framework or library role from the menu',
                '',
            ]))

        const createOption = (label: string): StringSelectMenuOptionBuilder => {
            return new StringSelectMenuOptionBuilder()
                .setLabel(label)
                // .setEmoji(emoji)
        }

        // map all the roles to the buttons and add them to the row

        const regionButtons = regionRole.forEach((region) => {
            return createOption(region)
        });

        const webLangButtons = webLangRoles.map((lang) => {
            return createOption(lang)
        });

        const systemsLangButtons = systemsLangRoles.map((lang) => {
            return createOption(lang)
        });

        const frameworksButtons = frameworksAndLibraries.map((name) => {
            return createOption(name)
        });

       const regionMenu =
           new ActionRowBuilder<StringSelectMenuBuilder>().addComponents(
               new StringSelectMenuBuilder()
               .setOptions(regionButtons)
               .setCustomId('region')
               .setPlaceholder('Select a region')
           )

        const webLangMenu =
            new ActionRowBuilder<StringSelectMenuBuilder>().addComponents(
                new StringSelectMenuBuilder()
                .setOptions(webLangButtons)
                .setCustomId('reg ')
                .setPlaceholder('Select a web lang')
            )

        const systemsLangMenu =
            new ActionRowBuilder<StringSelectMenuBuilder>().addComponents(
                new StringSelectMenuBuilder()
                .setOptions(systemsLangButtons)
                .setCustomId('regin')
                .setPlaceholder('Select a systems lang')
            )

        const frameworksMenu =
            new ActionRowBuilder<StringSelectMenuBuilder>().addComponents(
                new StringSelectMenuBuilder()
                .setOptions(frameworksButtons)
                .setCustomId('rion')
                .setPlaceholder('Select a framework or library')
            )

        await interaction.reply({
            embeds: [regionEmbed],
            components: [regionMenu]
        }).then(async () => {
            client.emit('roleSelect', interaction, user)
        });

        await interaction.followUp({
            embeds: [webLangEmbed],
            components: [webLangMenu]
        });

        await interaction.followUp({
            embeds: [systemsLangEmbed],
            components: [systemsLangMenu]
        });

        await interaction.followUp({
            embeds: [frameworksEmbed],
            components: [frameworksMenu]
        });
    }
}


const regionRole = [
    'Osaka',
    'Kyoto',
    'Kobe',
    'Tokyo',
    'Nagoya',
    'Aichi',
]

const webLangRoles = [
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
]

const systemsLangRoles = [
    'Rust',
    'c_',
    'cpp',
    'python',
]

const frameworksAndLibraries = [
    'react',
    'angular',
    'svelte',
    'dotnet',
    'flutter',
    'vue',
    'solidjs',
]
