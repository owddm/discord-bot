import { EmbedBuilder, EmbedData, Colors } from 'discord.js';

export function makeEmbed(embed: EmbedData): EmbedBuilder {
	const embedBuilder = new EmbedBuilder()
		.setColor(Colors.Purple)
		.setTitle(embed.title!)
		.setDescription(embed.description!)
		.setURL(embed.url ?? '');

	if(embed.image) {
		embedBuilder.setImage(embed.image.url!);
	}

	return embedBuilder;
}

export function makeLines(lines: string[]): string {
	return lines.join('\n');
}
