import { CommandCategory, ResponseType } from '../constants';
import {
   ChatInputCommandInteraction, PartialUser,
   RESTPostAPIChatInputApplicationCommandsJSONBody, User, PermissionsString
} from 'discord.js'
import { InputCommandOptions } from './CommandOptions';

export type APIPost = RESTPostAPIChatInputApplicationCommandsJSONBody;

export interface CommandDefinition {
   name: string,
   description: string,
   requiredPermissions?: PermissionsString[],
   category: CommandCategory,
   response: ResponseType,
   options?: InputCommandOptions[],
   interaction: (interaction: ChatInputCommandInteraction, user?: User | PartialUser) =>  Promise<any>
}

