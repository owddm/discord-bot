import {CommandDefinition, makeLines} from "../../lib";
import {CommandCategory, ResponseType} from "../../constants";
import {
    ActionRowBuilder,
    StringSelectMenuBuilder,
    EmbedBuilder,
    ButtonStyle,
    ActionRow,
    RoleSelectMenuBuilder,
    Role, StringSelectMenuOptionBuilder, StringSelectMenuComponent, StringSelectMenuBuilder, PermissionsBitField
} from "discord.js";
import {client} from "../../index";

const getEmojiId = (emoji: string) => {
    return client.emojis.resolveId(emoji);
}

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

        const createOption = (label: string, emoji: string): StringSelectMenuOptionBuilder => {
            return new StringSelectMenuOptionBuilder()
                .setLabel(label)
                .setEmoji(emoji)
        }

        // map all the roles to the buttons and add them to the row

        const regionButtons = regionRole.map((region) => {
            return createOption(region, getEmojiId(region))
        });

        const webLangButtons = webLangRoles.map((lang) => {
            return createOption(lang, getEmojiId(lang))
        });

        const systemsLangButtons = systemsLangRoles.map((lang) => {
            return createOption(lang, getEmojiId(lang))
        });

        const frameworksButtons = frameworksAndLibraries.map((name) => {
            return createOption(name, getEmojiId(name))
        });

        const regionRow = new ActionRowBuilder<StringSelectMenuBuilder>()
            .addComponents(regionButtons)

        const webLangRow = new ActionRowBuilder<StringSelectMenuBuilder>()
            .addComponents(webLangButtons)

        const systemsLangRow = new ActionRowBuilder<StringSelectMenuBuilder>()
            .addComponents(systemsLangButtons)

        const frameworksRow = new ActionRowBuilder<StringSelectMenuBuilder>()
            .addComponents(frameworksButtons)


        // await interaction.reply({
        //     embeds: [regionEmbed],
        //     components: [regionRow]
        // });
        //
        // await interaction.followUp({
        //     embeds: [webLangEmbed],
        //     components: [webLangRow]
        // });
        //
        // await interaction.followUp({
        //     embeds: [systemsLangEmbed],
        //     components: [systemsLangRow]
        // });

        await interaction.reply({
            embeds: [frameworksEmbed],
            components: [frameworksRow, systemsLangRow]
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
