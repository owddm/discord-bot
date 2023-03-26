import { CommandCategory, ResponseType } from '../constants';
import { ChatInputCommandInteraction, PermissionsBitField,
	RESTPostAPIChatInputApplicationCommandsJSONBody } from 'discord.js';
import { InputCommandOptions } from './CommandOptions';

export type APIPost = RESTPostAPIChatInputApplicationCommandsJSONBody;

export interface CommandDefinition {
   name: string,
   description: string,
   permissions?: PermissionsBitField,
   category: CommandCategory,
   response: ResponseType,
   options?: InputCommandOptions,
   interaction: (interaction: ChatInputCommandInteraction) =>  Promise<any>
}

