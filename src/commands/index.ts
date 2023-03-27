import Logger, { CommandDefinition } from "../lib";
import { cowsay } from './memes/cowsay';

export const commands: CommandDefinition[] = [
    cowsay,
]

const commandsObject: { [k: string]: CommandDefinition } = {};

for (const def of commands) {
    for (const name of (def.name)) {
        if (commandsObject[name]) {
            Logger.warn(`Duplicate command/alias inserted: ${name}`);
        }
        commandsObject[name] = def;
    }
}
