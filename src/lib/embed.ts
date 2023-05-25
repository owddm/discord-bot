import { EmbedBuilder, EmbedData, Colors } from 'discord.js';

export function makeEmbed(embed: EmbedData): EmbedBuilder {
	return new EmbedBuilder({
		color: Colors.Purple,
		...embed,
	});
}

export function makeLines(lines: string[]): string {
	return lines.join('\n');
}
