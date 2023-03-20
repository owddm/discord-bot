import { EmbedBuilder, EmbedData, Colors } from 'discord.js';

export function makeEmbed(embed: EmbedData): EmbedBuilder {
    return new EmbedBuilder()
    .setColor(Colors.Purple)
    .setTitle(embed.title as string)
    .setDescription(embed.description as string)
}

export function makeLines(lines: string[]): string {
    return lines.join('\n');
}