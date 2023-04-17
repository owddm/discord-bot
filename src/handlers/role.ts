import Logger from "../lib";
import {MessageReaction, PartialMessageReaction, PartialUser, User} from "discord.js";

// future: use roles map to match reaction to role
const roles = new Map([
    ['🛠', 'Volunteer'],
])

export const roleAdd = async (reaction: MessageReaction | PartialMessageReaction, user: User | PartialUser) => {
        const volunteerRole = 'Volunteer'

        const role = reaction.message.guild?.roles.cache.find(r => r.name === volunteerRole);

        if(!role) {
            Logger.error('volunteer role not found');
            return;
        }
        const member = reaction.message.guild?.members.cache.find(m => m.id === user.id);

        await member?.roles.add(role);
}

export const roleRemove = async (reaction: MessageReaction | PartialMessageReaction, user: User | PartialUser) => {
    const volunteerRole = 'Volunteer'

    const role = reaction.message.guild?.roles.cache.find(r => r.name === volunteerRole);

    if(!role) {
        Logger.error('volunteer role not found');
        return;
    }

    const member = reaction.message.guild?.members.cache.find(m => m.id === user.id);

    if(member?.roles.cache.has(role.id)) {
        member.roles.remove(role);
    }
}
