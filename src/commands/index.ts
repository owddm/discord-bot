import Logger, { CommandDefinition } from "../lib";
import { cowsay } from './memes/cowsay';
import { chatgpt } from "./general/chatgpt";

export const commands: CommandDefinition[] = [
    cowsay,
    chatgpt,
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
