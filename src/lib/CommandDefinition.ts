import { CommandCategory, ResponseType, Roles } from '../constants';
import {
   ChatInputCommandInteraction, Message, PartialUser, PermissionsBitField,
   RESTPostAPIChatInputApplicationCommandsJSONBody, User
} from 'discord.js'
import { InputCommandOptions } from './CommandOptions';

export type APIPost = RESTPostAPIChatInputApplicationCommandsJSONBody;

export interface CommandDefinition {
   name: string,
   description: string,
   permissions?: bigint | PermissionsBitField,
   category: CommandCategory,
   response: ResponseType,
   options?: InputCommandOptions[],
   interaction: (interaction: ChatInputCommandInteraction, user?: User | PartialUser) =>  Promise<any>
}

