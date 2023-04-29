import Logger from "../lib";
import {MessageReaction, PartialMessageReaction, PartialUser, User} from "discord.js";


export const roleAdd = async (interaction: any) => {
    Logger.info('roleAdd');

    const role = interaction.guild.roles.cache.get(interaction.customId)
}

export const roleRemove = async (reaction: MessageReaction | PartialMessageReaction, user: User | PartialUser) => {

}
