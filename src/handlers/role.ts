import Logger from '../lib';
import {
    ActionRowBuilder,
    EmbedBuilder,
    Role,
    StringSelectMenuBuilder,
    Colors
} from 'discord.js';
import { regionEmbed, techEmbed, createMenu } from '../commands/moderation/role_assignment';
import { regionRoles, techRoles, Channels } from '../constants';

const errorEmbed = new EmbedBuilder({
    title: 'Error',
    description: 'Please wait for the interaction to finish before re-selecting',
    color: Colors.Red,
})

export const roleHandler = async (interaction: any) => {
    if(interaction.channel.id !== Channels.ROLE_SELECT) {
        return;
    }

    const regionSelectMenu = createMenu(
        'regionRole',
        'Select a region',
        regionRoles,
        1
    );

    const regionRow = new ActionRowBuilder<StringSelectMenuBuilder>()
        .addComponents(regionSelectMenu);

    const techSelectMenu = createMenu(
        'techRole',
        'Select your favorite technologies',
        techRoles,
        1,
    )

    const techRow = new ActionRowBuilder<StringSelectMenuBuilder>()
        .addComponents(techSelectMenu);

    const member = interaction.member;

    if(!interaction.values || interaction.values[0] === undefined) {
        interaction.reply({
            embeds: [errorEmbed],
            ephemeral: true
        })
        return;
    }
    const choice = interaction.values[0].toLowerCase();

    if(interaction.customId === 'regionRole') {
        console.log(choice)
        const role = interaction.guild.roles.cache.find((role: Role) => role.name === choice);
        try {
            if(member.roles.cache.some((role: Role) => role.name === choice)) {
                await member.roles.remove(role.id);
                await interaction.reply({
                    content: `Removed ${choice} role`,
                    ephemeral: true
                })

                await interaction.message.edit({
                    embeds: [regionEmbed],
                    components: [regionRow],
                })

            } else {
                const regionRolesToRemove = member.roles.cache.filter((role: Role) => regionRoles.map(
                    r => r.toLowerCase()).includes(role.name.toLowerCase())
                );
                for (const role of regionRolesToRemove.values()) {
                    await member.roles.remove(role.id);
                }
                await member.roles.add(role.id);
                await interaction.reply({
                    content: `Added ${choice} role`,
                    ephemeral: true
                })

                await interaction.message.edit({
                    embeds: [regionEmbed],
                    components: [regionRow],
                })
            }
        } catch (e) {
            Logger.error(e);
        }
    }

    if(interaction.customId === 'techRole') {
        try {
            const role = interaction.guild.roles.cache.find((role: Role) => role.name === choice);
            if(member.roles.cache.some((role: Role) => role.name === choice)) {
                await member.roles.remove(role.id);
                await interaction.reply({
                    content: `Removed ${choice} role`,
                    ephemeral: true
                })

                await interaction.message.edit({
                    embeds: [techEmbed],
                    components: [techRow],
                })

            } else {
                await member.roles.add(role.id);
                await interaction.reply({
                    content: `Added ${choice} role`,
                    ephemeral: true
                })

                await interaction.message.edit({
                    embeds: [techEmbed],
                    components: [techRow],
                })
            }
        } catch (e) {
            Logger.error(e);
        }
    }
}
