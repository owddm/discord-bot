import Logger, { CommandDefinition } from "../lib";
import { cowsay } from './memes/cowsay';
import { chatgpt } from "./general/chatgpt";
import { roleSelect } from './general/role_assignment';

export const commands: CommandDefinition[] = [
    cowsay,
    chatgpt,
    roleSelect,
]

const commandsObject: { [k: string]: CommandDefinition } = {};

for (const def of commands) {
    for (const name of def.name) {
        if (commandsObject[def.name]) {
            Logger.warn(`Duplicate command/alias inserted: ${name}`);
        }
    }
    commandsObject[def.name] = def;
}
