import { octokit } from "../../index";
import Logger from '../../lib'
import { InputCommandOptions, CommandDefinition, makeEmbed } from "../../lib";
import { CommandCategory, ResponseType } from "../../constants";

const githubOptions: InputCommandOptions = {
	name: 'issue_id',
	description: 'Number tag of the github issue'
};

export const github: CommandDefinition = {
	name: 'github',
	description: 'Fetches the github issues',
	category: CommandCategory.GENERAL,
	options: githubOptions,
	response: ResponseType.EDIT,

	interaction: async (interaction) => {
        try {
        
            const issue_number = interaction.options.getString("issue_id");
            const response = await octokit.request(`GET /repos/nakajimayoshi/test-repo/issues/${issue_number}`, {
                owner: "nakajimayoshi",
                repo: "test-repo",
                issue_number: issue_number,
                headers: {
                    "x-github-api-version": "2022-11-28",
                    Authorization: `token ${process.env.GITHUB_TOKEN}`,
                }
            }).then().catch((e) => {
                Logger.error(e);
            })

            const githubEmbed = makeEmbed({
                title: 'owddm github',
                description: 'response.data.title'
            })

            // console.log(`The status of the response is: ${response.status}`)
            // console.log(`The request URL was: ${response.url}`)
            // console.log(`The x-ratelimit-remaining response header is: ${response.headers["x-ratelimit-remaining"]}`)
            // console.log(`The issue title is: ${response.data.title}`)

            await interaction.reply({ embeds: [githubEmbed] })
        } catch (error) {
            console.log(error);
        
        }
	}
};

