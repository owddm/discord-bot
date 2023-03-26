import { EmbedBuilder, EmbedData, Colors } from 'discord.js';

export function makeEmbed(embed: EmbedData): EmbedBuilder {
	return new EmbedBuilder()
		.setColor(Colors.Purple)
		.setTitle(embed.title!)
		.setDescription(embed.description!)
		.setURL(embed.url ?? '');
}

export function makeLines(lines: string[]): string {
	return lines.join('\n');
}