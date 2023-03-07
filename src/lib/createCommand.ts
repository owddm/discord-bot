import { SlashCommandBuilder } from '@discordjs/builders';
import { ResponseType } from '../constants';
import Logger from './logger';
import { CommandDefinition, APIPost } from './CommandDefinition';

export function createCommand(command: CommandDefinition): APIPost {
    const builder = new SlashCommandBuilder()
        .setName(command.name)
        .setDescription(command.description)

    switch (command.response) {
        case ResponseType.STATIC:
            return builder
                .toJSON()

        case ResponseType.EDIT:
            if(command.options == undefined) {
                Logger.error(`Error: ${command.name} is of type EDIT with no option name or description`)
            }
            return builder.addStringOption(option =>
                option.setName(command.options?.name as string)
                    .setDescription(command.options?.description as string)
                    .setRequired(true))
                .toJSON();

        default:
            return builder
                .toJSON()
    }
}